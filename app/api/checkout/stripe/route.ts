import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { computeOrderTotals, type CartLineInput } from "@/lib/orderTotals";
import type { ShippingMethod } from "@/lib/shipping";

interface CheckoutBody {
  items: CartLineInput[];
  shippingMethod: ShippingMethod;
  email: string;
}

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured on this server yet." },
      { status: 503 }
    );
  }

  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.email || !body.items?.length || !body.shippingMethod) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const totals = computeOrderTotals(body.items, body.shippingMethod);
    const stripe = getStripe();

    const idempotencyKey = `${body.email}-${JSON.stringify(body.items)}-${totals.totalCents}`;

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: totals.totalCents,
        currency: "aud",
        receipt_email: body.email,
        automatic_payment_methods: { enabled: true },
        metadata: {
          email: body.email,
          shippingMethod: body.shippingMethod,
          lineItems: JSON.stringify(totals.lineItems),
        },
      },
      { idempotencyKey }
    );

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      totalCents: totals.totalCents,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
