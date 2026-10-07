import { NextResponse } from "next/server";
import { isPaypalConfigured, paypalFetch } from "@/lib/paypal";
import { db } from "@/lib/db";

const CLUB_PRICE_CENTS = 1999;

interface CreateBody {
  email: string;
}

export async function POST(request: Request) {
  if (!isPaypalConfigured() || !process.env.PAYPAL_CLUB_PLAN_ID) {
    return NextResponse.json(
      { error: "The Club subscription is not configured on this server yet." },
      { status: 503 }
    );
  }

  let body: CreateBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const res = await paypalFetch("/v1/billing/subscriptions", {
      method: "POST",
      body: JSON.stringify({
        plan_id: process.env.PAYPAL_CLUB_PLAN_ID,
        subscriber: { email_address: email },
        application_context: {
          brand_name: "XTRONIC KIDS",
          user_action: "SUBSCRIBE_NOW",
          return_url: `${siteUrl}/club/success`,
          cancel_url: `${siteUrl}/#subscribe`,
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json({ error: `PayPal subscription create failed: ${detail}` }, { status: 502 });
    }

    const subscription = (await res.json()) as {
      id: string;
      links: { rel: string; href: string }[];
    };

    await db.clubSubscription.create({
      data: {
        email,
        status: "pending",
        paypalSubscriptionId: subscription.id,
        priceCents: CLUB_PRICE_CENTS,
        currency: "AUD",
      },
    });

    const approveLink = subscription.links.find((l) => l.rel === "approve")?.href;
    if (!approveLink) {
      return NextResponse.json({ error: "PayPal did not return an approval link" }, { status: 502 });
    }

    return NextResponse.json({ approveUrl: approveLink });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Subscription signup failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
