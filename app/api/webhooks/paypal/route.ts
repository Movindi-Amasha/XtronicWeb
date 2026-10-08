import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isPaypalConfigured, paypalFetch } from "@/lib/paypal";

interface PaypalWebhookEvent {
  event_type: string;
  resource: {
    id?: string;
    supplementary_data?: { related_ids?: { order_id?: string } };
    billing_agreement_id?: string;
  };
}

const SIGNATURE_HEADERS = {
  auth_algo: "paypal-auth-algo",
  cert_url: "paypal-cert-url",
  transmission_id: "paypal-transmission-id",
  transmission_sig: "paypal-transmission-sig",
  transmission_time: "paypal-transmission-time",
} as const;

// Asks PayPal whether this delivery really came from PayPal for our webhook.
// Without this anyone could POST a fake PAYMENT.CAPTURE.COMPLETED and mark an
// order paid, or activate/cancel a Club subscription.
async function isGenuinePaypalEvent(request: Request, event: unknown): Promise<boolean> {
  const headers: Record<string, string> = {};
  for (const [field, header] of Object.entries(SIGNATURE_HEADERS)) {
    const value = request.headers.get(header);
    if (!value) return false;
    headers[field] = value;
  }

  const res = await paypalFetch("/v1/notifications/verify-webhook-signature", {
    method: "POST",
    body: JSON.stringify({
      ...headers,
      webhook_id: process.env.PAYPAL_WEBHOOK_ID,
      webhook_event: event,
    }),
  });
  if (!res.ok) return false;

  const { verification_status } = (await res.json()) as { verification_status?: string };
  return verification_status === "SUCCESS";
}

export async function POST(request: Request) {
  // Fail closed: with no webhook id there is no way to tell real events from
  // forged ones. Checkout capture and /club/success already confirm payments
  // directly with PayPal, so the webhook is only the background sync.
  if (!isPaypalConfigured() || !process.env.PAYPAL_WEBHOOK_ID) {
    return NextResponse.json(
      { error: "PayPal webhooks are not configured on this server yet." },
      { status: 503 }
    );
  }

  const event = (await request.json()) as PaypalWebhookEvent;

  if (!(await isGenuinePaypalEvent(request, event))) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

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
