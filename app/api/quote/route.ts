import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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

  // TODO: email the owner via Resend once RESEND_API_KEY / ORDER_NOTIFICATION_EMAIL are configured.

  return NextResponse.json({ id: quote.id });
}
