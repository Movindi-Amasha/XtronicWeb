"use client";

import { useCurrencyStore } from "./currencyStore";
import { convertFromAudCents, formatMoney } from "./currency";

/** Formats an AUD-cents price in the shopper's selected display currency.
 * Checkout always charges in AUD regardless of what's shown here. */
export function useDisplayPrice(audCents: number): string {
  const currency = useCurrencyStore((s) => s.currency);
  return formatMoney(convertFromAudCents(audCents, currency), currency);
}
