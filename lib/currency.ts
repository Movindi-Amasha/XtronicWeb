// Static reference rates (AUD base). Refresh from a live FX source via a
// daily cron route once one is wired up — see CLAUDE.md Section 6.3.
// Checkout always charges in AUD regardless of the selected display
// currency; this only affects the price shown while browsing.
export const SUPPORTED_CURRENCIES = ["AUD", "USD", "NZD", "GBP", "EUR", "CAD", "SGD"] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number];

const AUD_EXCHANGE_RATES: Record<CurrencyCode, number> = {
  AUD: 1,
  USD: 0.65,
  NZD: 1.08,
  GBP: 0.51,
  EUR: 0.6,
  CAD: 0.9,
  SGD: 0.87,
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
