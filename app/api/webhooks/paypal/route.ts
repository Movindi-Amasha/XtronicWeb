import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface PaypalWebhookEvent {
  event_type: string;
  resource: { id?: string; supplementary_data?: { related_ids?: { order_id?: string } } };
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

  return NextResponse.json({ received: true });
}
