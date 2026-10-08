import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isPaypalConfigured, paypalFetch } from "@/lib/paypal";
import { verifyClubManageToken } from "@/lib/clubAccess";

// Lists the signed-in member's subscriptions, with the next billing date
// pulled live from PayPal.
export async function POST(request: Request) {
  let token: string | undefined;
  try {
    token = (await request.json()).token;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = verifyClubManageToken(token);
  if (!email) {
    return NextResponse.json({ error: "This link has expired. Request a new one." }, { status: 401 });
  }

  const subscriptions = await db.clubSubscription.findMany({
    where: { email: { equals: email, mode: "insensitive" }, status: { not: "pending" } },
    orderBy: { createdAt: "desc" },
  });

  const withBilling = await Promise.all(
    subscriptions.map(async (sub) => {
      let nextBillingAt: string | null = null;
      if (sub.status === "active" && sub.paypalSubscriptionId && isPaypalConfigured()) {
        try {
          const res = await paypalFetch(`/v1/billing/subscriptions/${sub.paypalSubscriptionId}`);
          if (res.ok) {
            const data = (await res.json()) as { billing_info?: { next_billing_time?: string } };
            nextBillingAt = data.billing_info?.next_billing_time ?? null;
          }
        } catch {
          // Billing date is a nice-to-have; show the membership without it.
        }
      }
      return {
        id: sub.id,
        status: sub.status,
        priceCents: sub.priceCents,
        currency: sub.currency,
        startedAt: sub.startedAt,
        cancelledAt: sub.cancelledAt,
        nextBillingAt,
      };
    })
  );

  return NextResponse.json({ email, subscriptions: withBilling });
}
