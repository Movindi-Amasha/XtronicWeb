import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Used by the success page to poll for an order's status after a redirect
// back from a provider (like PayHere) that doesn't pass payment status in
// the return URL itself — the notify_url webhook is the actual source of
// truth, this just reads what it already wrote.
export async function GET(request: Request) {
  const ref = new URL(request.url).searchParams.get("ref");
  if (!ref) {
    return NextResponse.json({ error: "Missing ref" }, { status: 400 });
  }

  const order = await db.order.findUnique({ where: { providerReference: ref } });
  return NextResponse.json({ status: order?.status ?? "pending" });
}
