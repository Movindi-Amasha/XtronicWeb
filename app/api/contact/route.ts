import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

interface ContactBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  topic?: unknown;
  message?: unknown;
}

const TOPICS = new Set([
  "Order help",
  "Product question",
  "School or club enquiry",
  "Returns or replacement parts",
  "Something else",
]);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const topic = typeof body.topic === "string" ? body.topic : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    !name || name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    phone.length > 40 ||
    !TOPICS.has(topic) ||
    message.length < 10 || message.length > 4000
  ) {
    return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }

  const recipient = process.env.ORDER_NOTIFICATION_EMAIL;
  if (!recipient) {
    return NextResponse.json({ error: "Contact messages are not configured." }, { status: 503 });
  }

  const sent = await sendEmail({
    to: recipient,
    subject: `Website contact: ${topic}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0e1e3f">
        <h1 style="color:#1f6fe5">New XTRONIC KIDS contact message</h1>
        <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space:pre-wrap;border-radius:12px;background:#f4f8ff;padding:16px">${escapeHtml(message)}</div>
      </div>
    `,
  });

  if (!sent) {
    return NextResponse.json({ error: "The message could not be delivered." }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
