export const FREE_SHIPPING_THRESHOLD_CENTS = 7500; // A$75

// XTRONIC KIDZ currently only sells into Australia and Sri Lanka.
export const SHIPPING_RATES = {
  "au-standard": { label: "AU Standard", cents: 995, freeOverThreshold: true },
  "au-express": { label: "AU Express", cents: 1495, freeOverThreshold: false },
  "sl-standard": { label: "Sri Lanka Standard", cents: 1995, freeOverThreshold: false },
} as const;

export type ShippingMethod = keyof typeof SHIPPING_RATES;

export function getShippingCostCents(method: ShippingMethod, subtotalCents: number): number {
  const rate = SHIPPING_RATES[method];
  if (rate.freeOverThreshold && subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) {
    return 0;
  }
  return rate.cents;
}

export function amountUntilFreeShippingCents(subtotalCents: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents);
}
