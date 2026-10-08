import { NextResponse } from "next/server";
import {
  isPayhereConfigured,
  computeCheckoutHash,
  audCentsToLkrAmount,
  getPayhereActionUrl,
} from "@/lib/payhere";
import { computeOrderTotals, type CartLineInput } from "@/lib/orderTotals";
import type { ShippingMethod } from "@/lib/shipping";
import { db } from "@/lib/db";

interface CreateBody {
  items: CartLineInput[];
  shippingMethod: ShippingMethod;
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
}

export async function POST(request: Request) {
  if (!isPayhereConfigured()) {
    return NextResponse.json(
      { error: "PayHere is not configured on this server yet." },
      { status: 503 }
    );
  }

  let body: CreateBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.items?.length || !body.shippingMethod) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const totals = computeOrderTotals(body.items, body.shippingMethod);
    const orderId = `XK-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const amount = audCentsToLkrAmount(totals.totalCents);
    const currency = "LKR";
    const hash = computeCheckoutHash({ orderId, amount, currency });

    // PayHere's notify_url webhook only ever sends back merchant_id, order_id,
    // amount, currency, status_code and our custom_1/custom_2 fields (which
    // are capped at ~100 chars each — nowhere near enough for a full address
    // plus line items). So the full order is recorded as "pending" right now,
    // while we still have the real checkout-form data, keyed by this same
    // orderId — the webhook then just flips its status to "paid", rather
    // than trying to reconstruct the order from a handful of short fields.
    await db.order.create({
      data: {
        paymentProvider: "payhere",
        providerReference: orderId,
        status: "pending",
        currency: "AUD",
        subtotalCents: totals.subtotalCents,
        shippingCents: totals.shippingCents,
        totalCents: totals.totalCents,
        email: body.email || "unknown@example.com",
        shippingAddress: JSON.stringify({
          name: body.name ?? "",
          line1: body.address ?? "",
          line2: "",
          city: body.city ?? "",
          state: "",
          postcode: "",
          country: "Sri Lanka",
          phone: body.phone ?? "",
        }),
        lineItems: JSON.stringify(totals.lineItems),
      },
    });

    // notify_url must be a publicly reachable address (PayHere's own docs: it
    // can never be localhost) — always build these from the configured site
    // URL, never from the browser's origin.
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    return NextResponse.json({
      actionUrl: getPayhereActionUrl(),
      merchantId: process.env.PAYHERE_MERCHANT_ID,
      orderId,
      amount,
      currency,
      hash,
      itemsDescription: totals.lineItems.map((item) => item.name).join(", "),
      returnUrl: `${siteUrl}/checkout/success?payhere_order=${orderId}`,
      cancelUrl: `${siteUrl}/checkout`,
      notifyUrl: `${siteUrl}/api/webhooks/payhere`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
