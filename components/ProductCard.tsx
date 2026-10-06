"use client";

import Link from "next/link";
import ProductImage from "./ProductImage";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";
import { useQuickViewStore } from "@/lib/quickViewStore";
import { useDisplayPrice } from "@/lib/useDisplayPrice";

type Tone = "blue" | "amber";

const TONES: Tone[] = ["amber", "blue"];

const BORDER: Record<Tone, string> = {
  blue: "border-brand-blue",
  amber: "border-brand-amber",
};

const MEDIA_BG: Record<Tone, string> = {
  blue: "bg-brand-blue-50",
  amber: "bg-brand-amber-50",
};

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const openQuickView = useQuickViewStore((s) => s.open);
  const displayPrice = useDisplayPrice(product.priceCents);
  const tone = TONES[index % TONES.length];

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-card border-4 bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${BORDER[tone]}`}
    >
      <Link
        href={`/shop/${product.slug}`}
        className={`relative block aspect-square w-full overflow-hidden ${MEDIA_BG[tone]}`}
      >
        <div aria-hidden className="board-joint board-joint-dark absolute inset-0" />
        <div className="relative h-full w-full p-6 transition-transform duration-300 group-hover:scale-105">
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

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="min-w-0 truncate font-body text-lg font-extrabold text-brand-navy sm:text-xl">
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
            aria-label={`Add ${product.name} to cart`}
            className="btn-brick flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-brand-navy text-white transition-colors hover:bg-brand-blue"
            style={{ "--btn-brick-shadow": "var(--color-brand-navy-700)" } as React.CSSProperties}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
              <circle cx="10" cy="20.5" r="1.3" />
              <circle cx="17" cy="20.5" r="1.3" />
              <path d="M15 9h4M17 7v4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
