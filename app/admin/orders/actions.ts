"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { isAdminAuthorization } from "@/lib/adminAuth";
import { syncClubBilling } from "@/lib/clubBilling";

export async function markClubKitShipped(formData: FormData) {
  if (!isAdminAuthorization((await headers()).get("authorization"))) {
    throw new Error("Unauthorized");
  }

  const id = String(formData.get("subscriptionId") ?? "");
  const sub = await db.clubSubscription.findUnique({ where: { id } });
  if (!sub) throw new Error("Subscription not found");

  await db.clubSubscription.update({ where: { id }, data: { lastShippedAt: new Date() } });
  // Pull the latest payment dates so the member drops into "Upcoming" with
  // the right next date, even if a renewal webhook was missed.
  if (sub.paypalSubscriptionId) await syncClubBilling(sub.paypalSubscriptionId);

  revalidatePath("/admin/orders");
}
