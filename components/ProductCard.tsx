"use client";

import Link from "next/link";
import ProductImage from "./ProductImage";
import KitFeatures from "./KitFeatures";
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
  // "LKR 7,790.95" doesn't fit a narrow card on one line, so non-AUD prices
  // show the currency code as a small label above the number.
  const priceParts = displayPrice.match(/^([A-Z]{3})\s+(.+)$/);

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-card border-[3px] bg-surface sm:border-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${BORDER[tone]}`}
    >
      <Link
        href={`/shop/${product.slug}`}
        aria-label={product.name}
        className={`relative block aspect-square w-full overflow-hidden ${MEDIA_BG[tone]}`}
      >
        <div aria-hidden className="board-joint board-joint-dark absolute inset-0" />
        <div className="relative h-full w-full p-3 transition-transform sm:p-6 duration-300 group-hover:scale-105">
          <ProductImage
            src={product.image}
            alt={product.name}
            emoji={product.emoji}
          />
        </div>
        <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-[10px] sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs font-bold text-brand-navy shadow">
          Age {product.age}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            openQuickView(product.slug);
          }}
          className="absolute right-3 top-3 hidden rounded-full bg-white/90 sm:block px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-navy opacity-0 shadow transition-opacity group-hover:opacity-100"
        >
          Quick View
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
        <p className="line-clamp-1 font-mono text-[10px] font-medium uppercase tracking-wide text-brand-blue-600 sm:text-[11px]">
          {product.categoryLabel}
        </p>
        <h3 className="font-heading text-[15px] leading-tight text-brand-navy sm:text-xl">
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="flex items-center gap-1 text-xs text-brand-navy sm:text-sm" aria-label={`Rated ${product.rating} out of 5`}>
          <span aria-hidden className="text-brand-amber">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))}
          </span>
          <span className="text-muted">({product.reviewCount})</span>
        </div>

        {product.features && (
          <div className="mt-1 border-t border-dashed border-line pt-2.5">
            <KitFeatures features={product.features} />
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-2 sm:pt-3">
          <span className="min-w-0 font-body text-base font-extrabold leading-tight text-brand-navy sm:text-xl">
            {priceParts ? (
              <>
                <span className="block text-[10px] font-bold uppercase tracking-wide text-muted sm:text-xs">
                  {priceParts[1]}
                </span>
                <span className="whitespace-nowrap">{priceParts[2]}</span>
              </>
            ) : (
              <span className="whitespace-nowrap">{displayPrice}</span>
            )}
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
            className="btn-brick flex h-10 w-10 shrink-0 sm:h-11 sm:w-11 items-center justify-center rounded-btn bg-brand-navy text-white transition-colors hover:bg-brand-blue"
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
