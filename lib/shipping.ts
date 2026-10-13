// All prices are LKR cents. XTRONIC KIDS delivers only within Sri Lanka:
// one flat island-wide rate, free once the order reaches the threshold.
export const FREE_SHIPPING_THRESHOLD_CENTS = 700000; // Rs 7,000

export const SHIPPING_RATES = {
  "lk-standard": { label: "Island-wide Delivery", cents: 50000, freeOverThreshold: true },
} as const;

export type ShippingMethod = keyof typeof SHIPPING_RATES;

export const DEFAULT_SHIPPING_METHOD: ShippingMethod = "lk-standard";

export function isShippingMethod(value: unknown): value is ShippingMethod {
  return typeof value === "string" && value in SHIPPING_RATES;
}

export function getShippingCostCents(method: ShippingMethod, subtotalCents: number): number {
  const rate = SHIPPING_RATES[method] ?? SHIPPING_RATES[DEFAULT_SHIPPING_METHOD];
  if (rate.freeOverThreshold && subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) {
    return 0;
  }
  return rate.cents;
}

export function amountUntilFreeShippingCents(subtotalCents: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents);
}
