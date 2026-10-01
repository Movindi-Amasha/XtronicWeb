import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail, newsletterCouponEmail } from "@/lib/email";

function generateCouponCode(): string {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `WELCOME10-${suffix}`;
}

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const existing = await db.newsletterSubscriber.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ code: existing.couponCode, alreadySubscribed: true });
  }

  const code = generateCouponCode();

  await db.$transaction([
    db.newsletterSubscriber.create({ data: { email, couponCode: code } }),
    db.coupon.create({ data: { code, percentOff: 10 } }),
  ]);

  const { subject, html } = newsletterCouponEmail({ code });
  await sendEmail({ to: email, subject, html });

  return NextResponse.json({ code, alreadySubscribed: false });
}
