"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { isAdminAuthorization, type AdminActionResult } from "@/lib/adminAuth";
import { syncClubBilling } from "@/lib/clubBilling";
import {
  cancelPaypalSubscription,
  refundLatestSubscriptionPayment,
  refundPaypalOrder,
  refundStripeOrder,
} from "@/lib/adminRefunds";

// Server Actions are reachable by direct POST from any route, so each one
// re-checks the admin login instead of trusting the /admin middleware.
async function requireAdmin() {
  if (!isAdminAuthorization((await headers()).get("authorization"))) {
    throw new Error("Unauthorized");
  }
}

function refresh(orderId?: string) {
  revalidatePath("/admin/orders");
  if (orderId) revalidatePath(`/admin/orders/${orderId}`);
}

export async function markClubKitShipped(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("subscriptionId") ?? "");
  const sub = await db.clubSubscription.findUnique({ where: { id } });
  if (!sub) throw new Error("Subscription not found");

  await db.clubSubscription.update({ where: { id }, data: { lastShippedAt: new Date() } });
  // Pull the latest payment dates so the member drops into "Upcoming" with
  // the right next date, even if a renewal webhook was missed.
  if (sub.paypalSubscriptionId) await syncClubBilling(sub.paypalSubscriptionId);

  refresh();
}

const REFUNDABLE_ORDER_STATUSES = ["paid", "fulfilled", "shipped", "delivered"];

export async function refundOrderAction(_prev: AdminActionResult, formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();

  const id = String(formData.get("orderId") ?? "");
  // PayHere has no refund API wired up: the admin refunds in PayHere's portal
  // and this just records it.
  const manual = formData.get("manual") === "1";

  const order = await db.order.findUnique({ where: { id } });
  if (!order) return { error: "Order not found." };
  if (!REFUNDABLE_ORDER_STATUSES.includes(order.status)) {
    return { error: `This order is ${order.status}, so it can't be refunded.` };
  }

  if (!manual) {
    if (!order.providerReference) return { error: "This order has no payment reference to refund." };
    const failure =
      order.paymentProvider === "paypal"
        ? await refundPaypalOrder(order.providerReference)
        : order.paymentProvider === "stripe"
          ? await refundStripeOrder(order.providerReference)
          : "PayHere refunds must be made in the PayHere merchant portal.";
    if (failure) return { error: failure };
  }

  await db.order.update({ where: { id }, data: { status: "refunded" } });
  refresh(id);
  return { ok: manual ? "Marked as refunded." : "Refunded in full. The customer will see it in a few days." };
}

type SubscriptionMode = "cancel" | "cancel_refund" | "refund";

export async function manageClubSubscriptionAction(
  _prev: AdminActionResult,
  formData: FormData
): Promise<AdminActionResult> {
  await requireAdmin();

  const id = String(formData.get("subscriptionId") ?? "");
  const mode = String(formData.get("mode") ?? "") as SubscriptionMode;
  if (!["cancel", "cancel_refund", "refund"].includes(mode)) return { error: "Unknown action." };

  const sub = await db.clubSubscription.findUnique({ where: { id } });
  if (!sub?.paypalSubscriptionId) return { error: "Subscription not found in PayPal." };

  if (mode !== "refund" && sub.status !== "cancelled") {
    const failure = await cancelPaypalSubscription(sub.paypalSubscriptionId);
    if (failure) return { error: failure };
    await db.clubSubscription.update({
      where: { id },
      data: { status: "cancelled", cancelledAt: new Date() },
    });
  }

  if (mode !== "cancel") {
    const failure = await refundLatestSubscriptionPayment(sub.paypalSubscriptionId, sub.createdAt);
    refresh();
    if (failure) {
      return { error: mode === "cancel_refund" ? `Cancelled, but the refund failed: ${failure}` : failure };
    }
    return { ok: mode === "refund" ? "Latest payment refunded." : "Cancelled and latest payment refunded." };
  }

  refresh();
  return { ok: "Cancelled. No further payments will be taken." };
}
