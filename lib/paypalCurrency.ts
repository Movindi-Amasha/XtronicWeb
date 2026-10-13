// PayPal can't take payments in LKR (it isn't one of PayPal's supported
// currencies), so PayPal orders are charged in USD, converted from the LKR
// prices shown on the site. PayPal then converts USD to the buyer's own card
// currency where needed. Static reference rate: update it when the rupee moves.
export const PAYPAL_CURRENCY = "USD";
export const LKR_PER_USD = 300;

/** LKR cents → USD cents, rounded to the nearest cent. */
export function lkrCentsToUsdCents(lkrCents: number): number {
  return Math.round(lkrCents / LKR_PER_USD);
}

export function formatUsd(usdCents: number): string {
  return `US$${(usdCents / 100).toFixed(2)}`;
}
