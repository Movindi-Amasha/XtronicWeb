import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail, clubManageLinkEmail } from "@/lib/email";
import { createClubManageToken } from "@/lib/clubAccess";

// Emails a sign-in link to /club/manage. Always answers the same way whether
// or not the email has a membership, so the form can't be used to discover
// who is a member.
export async function POST(request: Request) {
  let email: string;
  try {
    email = String((await request.json()).email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  if (!email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const membership = await db.clubSubscription.findFirst({
    where: { email: { equals: email, mode: "insensitive" }, status: { not: "pending" } },
    select: { id: true },
  });

  if (membership) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const url = `${siteUrl}/club/manage?token=${encodeURIComponent(createClubManageToken(email))}`;
    await sendEmail({ to: email, ...clubManageLinkEmail({ url }) });
  }

  return NextResponse.json({ ok: true });
}
