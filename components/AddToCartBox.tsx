"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";
import { useDisplayPrice } from "@/lib/useDisplayPrice";

export default function AddToCartBox({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const displayPrice = useDisplayPrice(product.priceCents * qty);

  return (
    <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="font-body text-3xl font-extrabold text-brand-navy">
          {displayPrice}
        </span>
        <div className="flex items-center gap-3 rounded-full border border-line px-2 py-1">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold uppercase tracking-wide text-brand-navy hover:bg-brand-blue-50"
          >
            −
          </button>
          <span className="w-6 text-center font-bold text-brand-navy" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold uppercase tracking-wide text-brand-navy hover:bg-brand-blue-50"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        data-add-to-cart
        onClick={() => {
          addItem(
            {
              slug: product.slug,
              name: product.name,
              emoji: product.emoji,
              image: product.image,
              priceCents: product.priceCents,
            },
            qty
          );
          openCart();
        }}
        className="w-full rounded-full bg-brand-blue px-6 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
      >
        Add to Cart
      </button>
      <p className="text-center text-xs text-muted">
        Free shipping on Australian orders over $75
      </p>
    </div>
  );
}
