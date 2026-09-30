import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 503 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const lineItems = intent.metadata.lineItems ?? "[]";

    await db.order.upsert({
      where: { providerReference: intent.id },
      update: { status: "paid" },
      create: {
        paymentProvider: "stripe",
        providerReference: intent.id,
        status: "paid",
        currency: intent.currency.toUpperCase(),
        subtotalCents: intent.amount,
        shippingCents: 0,
        totalCents: intent.amount,
        email: intent.receipt_email ?? "unknown@example.com",
        shippingAddress: "{}",
        lineItems,
      },
    });
  }

  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as Stripe.PaymentIntent;
    await db.order.updateMany({
      where: { providerReference: intent.id },
      data: { status: "failed" },
    });
  }

  return NextResponse.json({ received: true });
}
