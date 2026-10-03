// Static reference rate (AUD base). Refresh from a live FX source via a
// daily cron route once one is wired up — see CLAUDE.md Section 6.3.
// Checkout always charges in AUD regardless of the selected display
// currency; this only affects the price shown while browsing.
// XTRONIC KIDZ currently only sells into Australia and Sri Lanka, so the
// display-currency picker is scoped to just those two markets.
export const SUPPORTED_CURRENCIES = ["AUD", "LKR"] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number];

// Same reference rate as lib/payhere.ts's LKR_PER_AUD — keep the two in sync.
const AUD_EXCHANGE_RATES: Record<CurrencyCode, number> = {
  AUD: 1,
  LKR: 195,
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  AUD: "A$",
  LKR: "Rs",
};

export const CURRENCY_FLAGS: Record<CurrencyCode, string> = {
  AUD: "🇦🇺",
  LKR: "🇱🇰",
};

export function isSupportedCurrency(value: string): value is CurrencyCode {
  return (SUPPORTED_CURRENCIES as readonly string[]).includes(value);
}

/** Converts AUD cents to the target currency and rounds the display price to end in .95. */
export function convertFromAudCents(audCents: number, currency: CurrencyCode): number {
  if (currency === "AUD") return audCents;
  const converted = (audCents / 100) * AUD_EXCHANGE_RATES[currency];
  const roundedDollars = Math.floor(converted) + 0.95;
  return Math.round(roundedDollars * 100);
}

export function formatMoney(cents: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
