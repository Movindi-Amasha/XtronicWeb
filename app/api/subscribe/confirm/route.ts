import { NextResponse } from "next/server";
import { isPaypalConfigured, paypalFetch } from "@/lib/paypal";
import { db } from "@/lib/db";
import { sendEmail, clubWelcomeEmail } from "@/lib/email";

interface ConfirmBody {
  subscriptionId: string;
}

interface PaypalSubscription {
  id: string;
  status: string;
  subscriber?: { email_address?: string };
}

// Called by the /club/success page right after PayPal redirects back —
// PayPal's redirect carries no reliable payment status of its own, so this
// re-checks the subscription's real status with PayPal directly before
// marking it active, the same pattern the one-time checkout capture uses.
export async function POST(request: Request) {
  if (!isPaypalConfigured()) {
    return NextResponse.json(
      { error: "PayPal is not configured on this server yet." },
      { status: 503 }
    );
  }

  let body: ConfirmBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.subscriptionId) {
    return NextResponse.json({ error: "Missing subscriptionId" }, { status: 400 });
  }

  try {
    const res = await paypalFetch(`/v1/billing/subscriptions/${body.subscriptionId}`);
    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json({ error: `PayPal lookup failed: ${detail}` }, { status: 502 });
    }

    const subscription = (await res.json()) as PaypalSubscription;
    const isActive = subscription.status === "ACTIVE";

    const existing = await db.clubSubscription.findUnique({
      where: { paypalSubscriptionId: subscription.id },
    });
    const wasAlreadyActive = existing?.status === "active";

    await db.clubSubscription.upsert({
      where: { paypalSubscriptionId: subscription.id },
      update: isActive ? { status: "active", startedAt: existing?.startedAt ?? new Date() } : {},
      create: {
        email: subscription.subscriber?.email_address ?? "unknown@example.com",
        status: isActive ? "active" : "pending",
        paypalSubscriptionId: subscription.id,
        priceCents: 1999,
        currency: "AUD",
        startedAt: isActive ? new Date() : null,
      },
    });

    if (isActive && !wasAlreadyActive) {
      const email = subscription.subscriber?.email_address ?? existing?.email;
      if (email) {
        const { subject, html } = clubWelcomeEmail();
        await sendEmail({ to: email, subject, html });
      }
    }

    return NextResponse.json({ status: subscription.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Confirmation failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
