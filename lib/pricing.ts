// Prices in lib/products.ts are AUD, GST-inclusive (per CLAUDE.md Section 6.4).
const GST_RATE = 0.1;

export function gstComponentCents(totalCents: number): number {
  return Math.round(totalCents - totalCents / (1 + GST_RATE));
}
