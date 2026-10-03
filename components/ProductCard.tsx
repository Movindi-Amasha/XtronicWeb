"use client";

import Link from "next/link";
import ProductImage from "./ProductImage";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";
import { useQuickViewStore } from "@/lib/quickViewStore";
import { useDisplayPrice } from "@/lib/useDisplayPrice";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const openQuickView = useQuickViewStore((s) => s.open);
  const displayPrice = useDisplayPrice(product.priceCents);

  return (
    <div className="group flex flex-col overflow-hidden rounded-card bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-canvas"
      >
        <div className="relative h-full w-full p-4 transition-transform duration-300 group-hover:scale-105">
          <ProductImage
            src={product.image}
            alt={product.name}
            emoji={product.emoji}
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-navy shadow">
          Age {product.age}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            openQuickView(product.slug);
          }}
          className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-navy opacity-0 shadow transition-opacity group-hover:opacity-100"
        >
          Quick View
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-mono text-[11px] font-medium uppercase tracking-wide text-brand-blue-600">
          {product.categoryLabel}
        </p>
        <h3 className="font-heading text-xl leading-tight text-brand-navy">
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="flex items-center gap-1 text-sm text-brand-navy" aria-label={`Rated ${product.rating} out of 5`}>
          <span aria-hidden className="text-brand-amber">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))}
          </span>
          <span className="text-muted">({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-body text-xl font-extrabold text-brand-navy">
            {displayPrice}
          </span>
          <button
            type="button"
            onClick={() =>
              addItem({
                slug: product.slug,
                name: product.name,
                emoji: product.emoji,
                image: product.image,
                priceCents: product.priceCents,
              })
            }
            className="rounded-full bg-brand-navy px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-blue"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
