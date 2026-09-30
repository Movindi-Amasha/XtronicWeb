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
    <div className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-transform hover:-translate-y-1.5 hover:border-brand-blue/40">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-brand-blue-50"
      >
        <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-105">
          <ProductImage
            src={product.image}
            alt={product.name}
            emoji={product.emoji}
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-3 py-1 text-xs font-bold text-brand-navy shadow">
          Age {product.age}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-blue-600">
            {product.categoryLabel}
          </p>
          <h3 className="mt-1 font-heading text-lg font-bold leading-snug text-brand-navy">
            <Link href={`/shop/${product.slug}`}>
              {product.emoji} {product.name}
            </Link>
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {product.stemConcepts.slice(0, 2).map((concept) => (
            <span
              key={concept}
              className="rounded-full bg-brand-green-50 px-2.5 py-1 text-[11px] font-bold text-brand-green-700"
            >
              {concept}
            </span>
          ))}
          <span className="rounded-full bg-brand-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-navy">
            ⏱ {product.buildTime}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm text-brand-navy" aria-label={`Rated ${product.rating} out of 5`}>
          <span aria-hidden className="text-brand-amber">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))}
          </span>
          <span className="text-muted">({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-heading text-xl font-extrabold text-brand-navy">
            {displayPrice}
          </span>
          <div className="flex gap-2">
            <Link
              href={`/shop/${product.slug}`}
              onClick={(e) => {
                e.preventDefault();
                openQuickView(product.slug);
              }}
              className="rounded-btn-xs border border-line px-3 py-2 text-xs font-bold uppercase tracking-wide text-brand-navy transition-colors hover:bg-brand-blue-50"
            >
              Quick View
            </Link>
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
              className="rounded-full bg-brand-blue px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
