import { NextResponse } from "next/server";
import { isPayhereConfigured, computeCheckoutHash, audCentsToLkrAmount } from "@/lib/payhere";
import { computeOrderTotals, type CartLineInput } from "@/lib/orderTotals";
import type { ShippingMethod } from "@/lib/shipping";

interface CreateBody {
  items: CartLineInput[];
  shippingMethod: ShippingMethod;
}

export async function POST(request: Request) {
  if (!isPayhereConfigured()) {
    return NextResponse.json(
      { error: "PayHere is not configured on this server yet." },
      { status: 503 }
    );
  }

  let body: CreateBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.items?.length || !body.shippingMethod) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const totals = computeOrderTotals(body.items, body.shippingMethod);
    const orderId = `XK-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const amount = audCentsToLkrAmount(totals.totalCents);
    const currency = "LKR";
    const hash = computeCheckoutHash({ orderId, amount, currency });

    return NextResponse.json({
      merchantId: process.env.PAYHERE_MERCHANT_ID,
      orderId,
      amount,
      currency,
      hash,
      itemsDescription: totals.lineItems.map((item) => item.name).join(", "),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
