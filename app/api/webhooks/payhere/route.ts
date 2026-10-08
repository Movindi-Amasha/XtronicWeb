import { NextResponse } from "next/server";
import { verifyNotifySignature } from "@/lib/payhere";
import { db } from "@/lib/db";
import { sendEmail, orderConfirmationEmail } from "@/lib/email";

// PayHere posts this as application/x-www-form-urlencoded, not JSON. Per
// PayHere's docs, the standard notify params don't include the buyer's
// email — custom_1 carries it through instead, since we set it ourselves
// when submitting the checkout form.
export async function POST(request: Request) {
  const form = await request.formData();
  const get = (key: string) => String(form.get(key) ?? "");

  const merchant_id = get("merchant_id");
  const order_id = get("order_id");
  const payhere_amount = get("payhere_amount");
  const payhere_currency = get("payhere_currency");
  const status_code = get("status_code");
  const md5sig = get("md5sig");
  const email = get("custom_1") || "unknown@example.com";

  if (!merchant_id || !order_id || !md5sig) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const valid = verifyNotifySignature({
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
  });

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // status_code: 2 = success, 0 = pending, -1 = cancelled, -2 = failed, -3 = chargedback
  if (status_code === "2") {
    // The real order (email, shipping address, line items, AUD totals) was
    // already saved as "pending" by /api/checkout/payhere/create — this
    // notify payload doesn't carry enough to reconstruct any of that, so the
    // normal path is just flipping that existing row to "paid". The `create`
    // fallback below only fires if that pending row is somehow missing.
    const existing = await db.order.findUnique({ where: { providerReference: order_id } });
    const isNewlyPaid = !existing || existing.status !== "paid";
    const totalCents = existing?.totalCents ?? Math.round(parseFloat(payhere_amount) * 100);
    const currency = existing?.currency ?? payhere_currency ?? "LKR";
    const resolvedEmail = existing?.email && existing.email !== "unknown@example.com" ? existing.email : email;

    await db.order.upsert({
      where: { providerReference: order_id },
      update: { status: "paid", email: resolvedEmail },
      create: {
        paymentProvider: "payhere",
        providerReference: order_id,
        status: "paid",
        currency: payhere_currency || "LKR",
        subtotalCents: totalCents,
        shippingCents: 0,
        totalCents,
        email: resolvedEmail,
        shippingAddress: "{}",
        lineItems: "[]",
      },
    });

    if (isNewlyPaid) {
      const { subject, html } = orderConfirmationEmail({
        orderId: order_id,
        totalCents,
        currency,
      });
      await sendEmail({ to: resolvedEmail, subject, html });
    }
  }

  return NextResponse.json({ received: true });
}
