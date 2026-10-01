import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  sendEmail,
  quoteAcknowledgementEmail,
  quoteOwnerNotificationEmail,
} from "@/lib/email";

interface QuoteBody {
  name?: string;
  school?: string;
  role?: string;
  email?: string;
  phone?: string;
  state?: string;
  kitsInterest?: string;
  quantity?: string;
  timeframe?: string;
  message?: string;
}

export async function POST(request: Request) {
  let body: QuoteBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.name || !body.school || !body.email) {
    return NextResponse.json(
      { error: "Name, school and email are required" },
      { status: 400 }
    );
  }

  const quote = await db.schoolQuote.create({
    data: {
      name: body.name,
      school: body.school,
      role: body.role,
      email: body.email,
      phone: body.phone,
      state: body.state,
      kitsInterest: body.kitsInterest ?? "Not specified",
      quantity: body.quantity,
      timeframe: body.timeframe,
      message: body.message,
    },
  });

  const ack = quoteAcknowledgementEmail({ name: body.name });
  await sendEmail({ to: body.email, subject: ack.subject, html: ack.html });

  const ownerEmail = process.env.ORDER_NOTIFICATION_EMAIL;
  if (ownerEmail) {
    const notification = quoteOwnerNotificationEmail({
      name: body.name,
      organisation: body.school,
      email: body.email,
      message: body.message ?? "(no message)",
    });
    await sendEmail({ to: ownerEmail, subject: notification.subject, html: notification.html });
  }

  return NextResponse.json({ id: quote.id });
}
