import crypto from "node:crypto";

export function isPayhereConfigured(): boolean {
  return Boolean(process.env.PAYHERE_MERCHANT_ID && process.env.PAYHERE_MERCHANT_SECRET);
}

/** The classic Checkout API form-POST target — www required in live, per PayHere's docs. */
export function getPayhereActionUrl(): string {
  return process.env.PAYHERE_ENV === "live"
    ? "https://www.payhere.lk/pay/checkout"
    : "https://sandbox.payhere.lk/pay/checkout";
}

function hashedSecret(): string {
  const secret = process.env.PAYHERE_MERCHANT_SECRET;
  if (!secret) throw new Error("PAYHERE_MERCHANT_SECRET is not set.");
  return crypto.createHash("md5").update(secret).digest("hex").toUpperCase();
}

/** Hash PayHere requires on the client-side startPayment() call. */
export function computeCheckoutHash({
  orderId,
  amount,
  currency,
}: {
  orderId: string;
  amount: string;
  currency: string;
}): string {
  const merchantId = process.env.PAYHERE_MERCHANT_ID;
  if (!merchantId) throw new Error("PAYHERE_MERCHANT_ID is not set.");
  const raw = `${merchantId}${orderId}${amount}${currency}${hashedSecret()}`;
  return crypto.createHash("md5").update(raw).digest("hex").toUpperCase();
}

/** Verifies the md5sig PayHere sends with its notify_url webhook payload. */
export function verifyNotifySignature(params: {
  merchant_id: string;
  order_id: string;
  payhere_amount: string;
  payhere_currency: string;
  status_code: string;
  md5sig: string;
}): boolean {
  const raw = `${params.merchant_id}${params.order_id}${params.payhere_amount}${params.payhere_currency}${params.status_code}${hashedSecret()}`;
  const expected = crypto.createHash("md5").update(raw).digest("hex").toUpperCase();
  return expected === params.md5sig.toUpperCase();
}
