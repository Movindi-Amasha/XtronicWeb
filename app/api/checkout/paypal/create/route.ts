import { NextResponse } from "next/server";
import { isPaypalConfigured, paypalFetch } from "@/lib/paypal";
import { computeOrderTotals, type CartLineInput } from "@/lib/orderTotals";
import type { ShippingMethod } from "@/lib/shipping";

interface CreateBody {
  items: CartLineInput[];
  shippingMethod: ShippingMethod;
}

export async function POST(request: Request) {
  if (!isPaypalConfigured()) {
    return NextResponse.json(
      { error: "PayPal is not configured on this server yet." },
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
    const amount = (totals.totalCents / 100).toFixed(2);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const res = await paypalFetch("/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify({
        intent: "CAPTURE",
        application_context: {
          brand_name: "XTRONIC KIDZ",
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
          return_url: `${siteUrl}/checkout/success`,
          cancel_url: `${siteUrl}/checkout`,
        },
        purchase_units: [
          {
            amount: {
              currency_code: "AUD",
              value: amount,
              breakdown: {
                item_total: {
                  currency_code: "AUD",
                  value: (totals.subtotalCents / 100).toFixed(2),
                },
                shipping: {
                  currency_code: "AUD",
                  value: (totals.shippingCents / 100).toFixed(2),
                },
              },
            },
            items: totals.lineItems.map((item) => ({
              name: item.name,
              quantity: String(item.qty),
              unit_amount: {
                currency_code: "AUD",
                value: (item.priceCents / 100).toFixed(2),
              },
            })),
          },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json({ error: `PayPal order create failed: ${detail}` }, { status: 502 });
    }

    const order = (await res.json()) as { id: string };
    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
