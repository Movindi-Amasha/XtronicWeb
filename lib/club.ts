import { formatPrice } from "./products";
import { formatUsd, lkrCentsToUsdCents } from "./paypalCurrency";

// XTRONIC Club monthly price. Shown in LKR; billed through PayPal, which
// can't charge rupees, so the PayPal plan (PAYPAL_CLUB_PLAN_ID) must be a
// USD plan for CLUB_PAYPAL_USD_CENTS a month. Change both together.
export const CLUB_PRICE_CENTS = 250000; // Rs 2,500
export const CLUB_PAYPAL_USD_CENTS = lkrCentsToUsdCents(CLUB_PRICE_CENTS);

export const CLUB_PRICE_LABEL = formatPrice(CLUB_PRICE_CENTS);
export const CLUB_PAYPAL_LABEL = formatUsd(CLUB_PAYPAL_USD_CENTS);
