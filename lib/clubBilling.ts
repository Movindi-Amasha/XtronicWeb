import { db } from "@/lib/db";
import { isPaypalConfigured, paypalFetch } from "@/lib/paypal";

export interface PaypalSubscriptionBilling {
  status?: string;
  billing_info?: {
    last_payment?: { time?: string };
    next_billing_time?: string;
  };
}

export async function fetchPaypalSubscription<T extends PaypalSubscriptionBilling>(
  paypalSubscriptionId: string
): Promise<T | null> {
  if (!isPaypalConfigured()) return null;
  try {
    const res = await paypalFetch(`/v1/billing/subscriptions/${paypalSubscriptionId}`);
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

/** The payment dates the shipping queue runs on, as reported by PayPal. */
export function billingFields(subscription: PaypalSubscriptionBilling) {
  const lastPaid = subscription.billing_info?.last_payment?.time;
  const nextBilling = subscription.billing_info?.next_billing_time;
  return {
    ...(lastPaid ? { lastPaidAt: new Date(lastPaid) } : {}),
    nextBillingAt: nextBilling ? new Date(nextBilling) : null,
  };
}

/** Re-reads a subscription's payment dates from PayPal into our DB. */
export async function syncClubBilling(paypalSubscriptionId: string): Promise<boolean> {
  const subscription = await fetchPaypalSubscription(paypalSubscriptionId);
  if (!subscription) return false;
  await db.clubSubscription.updateMany({
    where: { paypalSubscriptionId },
    data: billingFields(subscription),
  });
  return true;
}

export interface ShippingQueueItem<T> {
  subscription: T;
  due: boolean;
  /** When the kit is (or was) owed; null if PayPal hasn't told us yet. */
  shipBy: Date | null;
}

type QueueFields = {
  status: string;
  createdAt: Date;
  startedAt: Date | null;
  lastPaidAt: Date | null;
  nextBillingAt: Date | null;
  lastShippedAt: Date | null;
};

/**
 * Active members, kits owed now first (longest waiting on top), then upcoming
 * ones by next billing date. A kit is owed when the member has never been
 * shipped one, has paid since the last shipment, or their billing date has
 * passed since the last shipment (covers renewals if the webhook missed one).
 */
export function clubShippingQueue<T extends QueueFields>(subscriptions: T[], now = new Date()): ShippingQueueItem<T>[] {
  const items = subscriptions
    .filter((s) => s.status === "active")
    .map((s): ShippingQueueItem<T> => {
      const shipped = s.lastShippedAt;
      if (!shipped) return { subscription: s, due: true, shipBy: s.startedAt ?? s.createdAt };
      if (s.lastPaidAt && s.lastPaidAt > shipped) return { subscription: s, due: true, shipBy: s.lastPaidAt };
      if (s.nextBillingAt && s.nextBillingAt <= now && s.nextBillingAt > shipped) {
        return { subscription: s, due: true, shipBy: s.nextBillingAt };
      }
      return { subscription: s, due: false, shipBy: s.nextBillingAt };
    });

  const time = (d: Date | null) => d?.getTime() ?? Number.POSITIVE_INFINITY;
  return items.sort((a, b) => Number(b.due) - Number(a.due) || time(a.shipBy) - time(b.shipBy));
}
