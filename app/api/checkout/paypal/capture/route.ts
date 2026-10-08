import { NextResponse } from "next/server";
import { isPaypalConfigured, paypalFetch } from "@/lib/paypal";
import { db } from "@/lib/db";
import { sendEmail, orderConfirmationEmail } from "@/lib/email";
import { computeOrderTotals, type CartLineInput } from "@/lib/orderTotals";
import type { ShippingMethod } from "@/lib/shipping";

interface CaptureBody {
  orderId: string;
  items?: CartLineInput[];
  shippingMethod?: ShippingMethod;
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  postcode?: string;
}

interface PaypalCaptureResponse {
  id: string;
  status: string;
  payer?: { email_address?: string };
  purchase_units?: Array<{
    payments?: { captures?: Array<{ amount?: { value: string; currency_code: string } }> };
  }>;
}

export async function POST(request: Request) {
  if (!isPaypalConfigured()) {
    return NextResponse.json(
      { error: "PayPal is not configured on this server yet." },
      { status: 503 }
    );
  }

  let body: CaptureBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  try {
    const res = await paypalFetch(`/v2/checkout/orders/${body.orderId}/capture`, {
      method: "POST",
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json({ error: `PayPal capture failed: ${detail}` }, { status: 502 });
    }

    const captured = (await res.json()) as PaypalCaptureResponse;
    const amount = captured.purchase_units?.[0]?.payments?.captures?.[0]?.amount;
    const currency = amount?.currency_code ?? "AUD";

    // Note: /checkout/success's redirect-fallback path (PayPal's full-page
    // redirect when a popup is blocked) calls this route with only orderId —
    // no checkout-form fields, since that's a fresh page load with no access
    // to the form's state. That rarer path still falls back gracefully below
    // (PayPal's own payer email, no shipping/line items) rather than erroring.
    //
    // The checkout form's own fields are the source of truth for who to
    // contact and where to ship — never PayPal's payer email (that's just
    // whichever email the buyer's PayPal account happens to be under, which
    // can easily differ from the one they actually typed at checkout) and
    // never a "shipping" object from PayPal (we never collect one; this
    // integration sets shipping_preference: NO_SHIPPING since the checkout
    // page's own address fields already cover it).
    const email = body.email || captured.payer?.email_address || "unknown@example.com";

    // Recompute from the canonical catalog — same pattern as /create and as
    // PayHere's route — rather than trust whatever PayPal says we charged,
    // so line items and the subtotal/shipping split are always real and
    // match what's actually in the Order record.
    let totals;
    try {
      totals = body.items?.length && body.shippingMethod
        ? computeOrderTotals(body.items, body.shippingMethod)
        : null;
    } catch {
      totals = null;
    }
    const totalCents = totals
      ? totals.totalCents
      : amount
        ? Math.round(parseFloat(amount.value) * 100)
        : 0;

    const shippingAddress = JSON.stringify({
      name: body.name ?? "",
      line1: body.address ?? "",
      line2: "",
      city: body.city ?? "",
      state: "",
      postcode: body.postcode ?? "",
      country: "Australia",
      phone: body.phone ?? "",
    });

    const existing = await db.order.findUnique({
      where: { providerReference: captured.id },
    });
    const isNewlyPaid = !existing || existing.status !== "paid";

    await db.order.upsert({
      where: { providerReference: captured.id },
      update: { status: "paid" },
      create: {
        paymentProvider: "paypal",
        providerReference: captured.id,
        status: "paid",
        currency,
        subtotalCents: totals?.subtotalCents ?? totalCents,
        shippingCents: totals?.shippingCents ?? 0,
        totalCents,
        email,
        shippingAddress,
        lineItems: JSON.stringify(totals?.lineItems ?? []),
      },
    });

    if (isNewlyPaid) {
      const { subject, html } = orderConfirmationEmail({
        orderId: captured.id,
        totalCents,
        currency,
      });
      await sendEmail({ to: email, subject, html });
    }

    return NextResponse.json({ status: captured.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Capture failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
