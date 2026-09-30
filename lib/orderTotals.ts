import { getProductBySlug } from "@/lib/products";
import { getShippingCostCents, type ShippingMethod } from "@/lib/shipping";

export interface CartLineInput {
  slug: string;
  qty: number;
}

export interface ResolvedLineItem {
  slug: string;
  name: string;
  priceCents: number;
  qty: number;
  lineTotalCents: number;
}

export interface OrderTotals {
  lineItems: ResolvedLineItem[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
}

/**
 * Recomputes cart totals from the canonical product catalog — never trust
 * prices sent by the client. Throws if a slug/quantity is invalid.
 */
export function computeOrderTotals(
  lines: CartLineInput[],
  shippingMethod: ShippingMethod
): OrderTotals {
  if (lines.length === 0) {
    throw new Error("Cart is empty");
  }

  const lineItems: ResolvedLineItem[] = lines.map(({ slug, qty }) => {
    const product = getProductBySlug(slug);
    if (!product) throw new Error(`Unknown product: ${slug}`);
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
      throw new Error(`Invalid quantity for ${slug}`);
    }
    return {
      slug: product.slug,
      name: product.name,
      priceCents: product.priceCents,
      qty,
      lineTotalCents: product.priceCents * qty,
    };
  });

  const subtotalCents = lineItems.reduce((sum, i) => sum + i.lineTotalCents, 0);
  const shippingCents = getShippingCostCents(shippingMethod, subtotalCents);
  const totalCents = subtotalCents + shippingCents;

  return { lineItems, subtotalCents, shippingCents, totalCents };
}
