export const FREE_SHIPPING_THRESHOLD_CENTS = 7500; // A$75

export const SHIPPING_RATES = {
  "au-standard": { label: "AU Standard", cents: 995, freeOverThreshold: true },
  "au-express": { label: "AU Express", cents: 1495, freeOverThreshold: false },
  nz: { label: "New Zealand", cents: 1995, freeOverThreshold: false },
  "intl-standard": { label: "International Standard", cents: 2495, freeOverThreshold: false },
  "intl-express": { label: "International Express", cents: 3995, freeOverThreshold: false },
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
