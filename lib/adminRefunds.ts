import { paypalFetch } from "@/lib/paypal";
import { getStripe } from "@/lib/stripe";

// Provider calls behind the admin Refund / Cancel buttons. Each returns a
// short human-readable failure reason (shown in the admin UI), or null on
// success. Full refunds only.

async function paypalError(res: Response, fallback: string): Promise<string> {
  try {
    const body = (await res.json()) as { message?: string; details?: { description?: string }[] };
    return body.details?.[0]?.description ?? body.message ?? fallback;
  } catch {
    return fallback;
  }
}

/** Refunds a PayPal checkout order in full. `paypalOrderId` is Order.providerReference. */
export async function refundPaypalOrder(paypalOrderId: string): Promise<string | null> {
  const orderRes = await paypalFetch(`/v2/checkout/orders/${paypalOrderId}`);
  if (!orderRes.ok) return paypalError(orderRes, "Couldn't find this order in PayPal.");

  const order = (await orderRes.json()) as {
    purchase_units?: { payments?: { captures?: { id: string; status: string }[] } }[];
  };
  const capture = order.purchase_units?.[0]?.payments?.captures?.find((c) => c.status === "COMPLETED");
  if (!capture) return "PayPal has no completed payment to refund for this order (it may already be refunded).";

  const res = await paypalFetch(`/v2/payments/captures/${capture.id}/refund`, {
    method: "POST",
    body: JSON.stringify({ note_to_payer: "Refund from XTRONIC KIDS" }),
  });
  return res.ok ? null : paypalError(res, "PayPal refused the refund.");
}

/** Refunds a Stripe PaymentIntent in full. */
export async function refundStripeOrder(paymentIntentId: string): Promise<string | null> {
  try {
    await getStripe().refunds.create({ payment_intent: paymentIntentId });
    return null;
  } catch (err) {
    return err instanceof Error ? err.message : "Stripe refused the refund.";
  }
}

/** Cancels a PayPal subscription so no further payments are taken. */
export async function cancelPaypalSubscription(paypalSubscriptionId: string): Promise<string | null> {
  const res = await paypalFetch(`/v1/billing/subscriptions/${paypalSubscriptionId}/cancel`, {
    method: "POST",
    body: JSON.stringify({ reason: "Cancelled by XTRONIC KIDS" }),
  });
  // 422 = already cancelled/expired in PayPal, which is the state we want.
  return res.ok || res.status === 422 ? null : paypalError(res, "PayPal refused the cancellation.");
}

/** Refunds the most recent completed payment on a PayPal subscription. */
export async function refundLatestSubscriptionPayment(
  paypalSubscriptionId: string,
  since: Date
): Promise<string | null> {
  const start = new Date(since.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const end = new Date().toISOString();
  const listRes = await paypalFetch(
    `/v1/billing/subscriptions/${paypalSubscriptionId}/transactions?start_time=${start}&end_time=${end}`
  );
  if (!listRes.ok) return paypalError(listRes, "Couldn't load this subscription's payments from PayPal.");

  const { transactions = [] } = (await listRes.json()) as {
    transactions?: { id: string; status: string; time: string }[];
  };
  const latest = transactions
    .filter((t) => t.status === "COMPLETED")
    .sort((a, b) => b.time.localeCompare(a.time))[0];
  if (!latest) return "No completed payment found to refund (it may already be refunded).";

  const res = await paypalFetch(`/v1/payments/sale/${latest.id}/refund`, {
    method: "POST",
    body: JSON.stringify({}),
  });
  return res.ok ? null : paypalError(res, "PayPal refused the refund.");
}
