import crypto from "node:crypto";

// Static reference rate — same caveat as lib/currency.ts: refresh from a
// live FX source before go-live. PayHere's sandbox reliably supports LKR
// without extra merchant approval, unlike USD/other currencies, so the
// checkout amount is converted to LKR specifically for this provider.
const LKR_PER_AUD = 195;

export const PAYHERE_SCRIPT_URL = "https://www.payhere.lk/lib/payhere.js";

export function isPayhereConfigured(): boolean {
  return Boolean(process.env.PAYHERE_MERCHANT_ID && process.env.PAYHERE_MERCHANT_SECRET);
}

export function isPayhereSandbox(): boolean {
  return process.env.PAYHERE_ENV !== "live";
}

/** Converts AUD cents to an LKR amount string formatted as PayHere expects (2 decimals). */
export function audCentsToLkrAmount(audCents: number): string {
  const lkr = (audCents / 100) * LKR_PER_AUD;
  return lkr.toFixed(2);
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
