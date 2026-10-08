import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isPaypalConfigured, paypalFetch } from "@/lib/paypal";
import { verifyClubManageToken } from "@/lib/clubAccess";
import { syncClubBilling } from "@/lib/clubBilling";

type Action = "pause" | "resume" | "cancel";

// PayPal endpoint, the status a membership must currently have, and the
// status we record once PayPal accepts the change.
const ACTIONS = {
  pause: { path: "suspend", from: "active", to: "suspended", reason: "Paused by member" },
  resume: { path: "activate", from: "suspended", to: "active", reason: "Resumed by member" },
  cancel: { path: "cancel", from: null, to: "cancelled", reason: "Cancelled by member" },
} as const;

export async function POST(request: Request) {
  if (!isPaypalConfigured()) {
    return NextResponse.json({ error: "PayPal is not configured on this server yet." }, { status: 503 });
  }

  let body: { token?: string; subscriptionId?: string; action?: Action };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = verifyClubManageToken(body.token);
  if (!email) {
    return NextResponse.json({ error: "This link has expired. Request a new one." }, { status: 401 });
  }

  const action = body.action && ACTIONS[body.action];
  if (!action || !body.subscriptionId) {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  // Scoped to the signed-in email so one member can't touch another's plan.
  const sub = await db.clubSubscription.findFirst({
    where: { id: body.subscriptionId, email: { equals: email, mode: "insensitive" } },
  });
  if (!sub?.paypalSubscriptionId) {
    return NextResponse.json({ error: "Membership not found" }, { status: 404 });
  }
  if (sub.status === "cancelled" || (action.from && sub.status !== action.from)) {
    return NextResponse.json({ error: `This membership is ${sub.status}.` }, { status: 409 });
  }

  const res = await paypalFetch(`/v1/billing/subscriptions/${sub.paypalSubscriptionId}/${action.path}`, {
    method: "POST",
    body: JSON.stringify({ reason: action.reason }),
  });
  if (!res.ok) {
    const detail = await res.text();
    console.error(`PayPal ${action.path} failed for ${sub.paypalSubscriptionId}:`, detail);
    return NextResponse.json({ error: "PayPal couldn't make that change. Please try again." }, { status: 502 });
  }

  await db.clubSubscription.update({
    where: { id: sub.id },
    data: { status: action.to, ...(action.to === "cancelled" ? { cancelledAt: new Date() } : {}) },
  });
  // Resuming moves the next billing date; keep the shipping queue accurate.
  await syncClubBilling(sub.paypalSubscriptionId);

  return NextResponse.json({ status: action.to });
}
