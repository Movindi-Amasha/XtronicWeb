import { NextResponse } from "next/server";
import { isPaypalConfigured, paypalFetch } from "@/lib/paypal";
import { db } from "@/lib/db";

interface CaptureBody {
  orderId: string;
}

interface PaypalCaptureResponse {
  id: string;
  status: string;
  payer?: { email_address?: string };
  purchase_units?: Array<{
    payments?: { captures?: Array<{ amount?: { value: string; currency_code: string } }> };
    shipping?: { address?: Record<string, string> };
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
    const totalCents = amount ? Math.round(parseFloat(amount.value) * 100) : 0;

    await db.order.upsert({
      where: { providerReference: captured.id },
      update: { status: "paid" },
      create: {
        paymentProvider: "paypal",
        providerReference: captured.id,
        status: "paid",
        currency: amount?.currency_code ?? "AUD",
        subtotalCents: totalCents,
        shippingCents: 0,
        totalCents,
        email: captured.payer?.email_address ?? "unknown@example.com",
        shippingAddress: JSON.stringify(
          captured.purchase_units?.[0]?.shipping?.address ?? {}
        ),
        lineItems: "[]",
      },
    });

    return NextResponse.json({ status: captured.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Capture failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
