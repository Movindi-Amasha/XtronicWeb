import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface PaypalWebhookEvent {
  event_type: string;
  resource: {
    id?: string;
    supplementary_data?: { related_ids?: { order_id?: string } };
    billing_agreement_id?: string;
  };
}

// Note: full signature verification requires calling PayPal's
// /v1/notifications/verify-webhook-signature endpoint with PAYPAL_WEBHOOK_ID.
// Wire that in once PAYPAL_WEBHOOK_ID is set — left as a TODO so this route
// doesn't hard-fail while payments aren't configured yet.
export async function POST(request: Request) {
  const event = (await request.json()) as PaypalWebhookEvent;

  if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
    const orderId = event.resource.supplementary_data?.related_ids?.order_id;
    if (orderId) {
      await db.order.updateMany({
        where: { providerReference: orderId },
        data: { status: "paid" },
      });
    }
  }

  if (event.event_type === "PAYMENT.CAPTURE.DENIED") {
    const orderId = event.resource.supplementary_data?.related_ids?.order_id;
    if (orderId) {
      await db.order.updateMany({
        where: { providerReference: orderId },
        data: { status: "failed" },
      });
    }
  }

  if (event.event_type === "PAYMENT.CAPTURE.REFUNDED") {
    const orderId = event.resource.supplementary_data?.related_ids?.order_id;
    if (orderId) {
      await db.order.updateMany({
        where: { providerReference: orderId },
        data: { status: "refunded" },
      });
    }
  }

  // Club subscription lifecycle — keeps our DB in sync with PayPal's own
  // recurring billing state, including renewals and failed/cancelled
  // payments that happen automatically with no customer visiting the site.
  if (event.event_type === "BILLING.SUBSCRIPTION.ACTIVATED" && event.resource.id) {
    await db.clubSubscription.updateMany({
      where: { paypalSubscriptionId: event.resource.id },
      data: { status: "active", startedAt: new Date() },
    });
  }

  if (
    (event.event_type === "BILLING.SUBSCRIPTION.CANCELLED" ||
      event.event_type === "BILLING.SUBSCRIPTION.EXPIRED") &&
    event.resource.id
  ) {
    await db.clubSubscription.updateMany({
      where: { paypalSubscriptionId: event.resource.id },
      data: { status: "cancelled", cancelledAt: new Date() },
    });
  }

  if (event.event_type === "BILLING.SUBSCRIPTION.SUSPENDED" && event.resource.id) {
    await db.clubSubscription.updateMany({
      where: { paypalSubscriptionId: event.resource.id },
      data: { status: "suspended" },
    });
  }

  // A recurring charge for an existing subscription — PayPal sends this on
  // every renewal, not just the first payment. billing_agreement_id is the
  // subscription id for this event type.
  if (event.event_type === "PAYMENT.SALE.COMPLETED" && event.resource.billing_agreement_id) {
    await db.clubSubscription.updateMany({
      where: { paypalSubscriptionId: event.resource.billing_agreement_id, status: { not: "active" } },
      data: { status: "active" },
    });
  }

  return NextResponse.json({ received: true });
}
