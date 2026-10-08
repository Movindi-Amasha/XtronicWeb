"use client";

import Link from "next/link";
import ProductImage from "./ProductImage";
import KitFeatures from "./KitFeatures";
import LineIcon from "./LineIcon";
import type { Product } from "@/lib/products";
import { LOGO } from "@/lib/brandColors";
import { useCartStore } from "@/lib/cartStore";
import { useQuickViewStore } from "@/lib/quickViewStore";
import { useDisplayPrice } from "@/lib/useDisplayPrice";

// Each card takes the next logo colour for its border and photo backdrop.
const TONES = [LOGO.orange, LOGO.blue, LOGO.yellow, LOGO.green, LOGO.red];

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
      className="group flex flex-col overflow-hidden rounded-card border-[3px] bg-white shadow-[0_10px_30px_-14px_rgba(14,30,63,0.25)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-16px_rgba(14,30,63,0.35)]"
      style={{ borderColor: tone }}
    >
      <Link
        href={`/shop/${product.slug}`}
        aria-label={product.name}
        className="relative block aspect-square w-full overflow-hidden"
        style={{
          background: `radial-gradient(circle at 50% 40%, #fff 0%, color-mix(in srgb, ${tone} 22%, white) 55%, color-mix(in srgb, ${tone} 45%, white) 100%)`,
        }}
      >
        <div className="relative h-full w-full p-3 transition-transform duration-300 group-hover:scale-105 sm:p-5">
          <ProductImage src={product.image} alt={product.name} emoji={product.emoji} />
        </div>
        <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-brand-navy shadow sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
          Age {product.age}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            openQuickView(product.slug);
          }}
          className="absolute right-3 top-3 hidden rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-navy opacity-0 shadow transition-opacity group-hover:opacity-100 sm:block"
        >
          Quick View
        </button>
      </Link>

      <div className="flex flex-1 flex-col items-center gap-2 p-3 text-center sm:p-4">
        <h3 className="font-heading text-[15px] font-semibold leading-tight text-brand-navy sm:text-lg">
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="flex items-center gap-1 text-xs text-brand-navy" aria-label={`Rated ${product.rating} out of 5`}>
          <span aria-hidden className="text-brand-amber">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))}
          </span>
          <span className="text-muted">({product.reviewCount})</span>
        </div>

        {product.features && (
          <div className="w-full border-t border-dashed border-line pt-2.5">
            <KitFeatures features={product.features} />
          </div>
        )}

        <p className="mt-auto pt-1 font-body text-lg font-extrabold leading-tight text-brand-navy sm:text-xl">
          {priceParts ? (
            <>
              <span className="block text-[10px] font-bold uppercase tracking-wide text-muted sm:text-xs">{priceParts[1]}</span>
              <span className="whitespace-nowrap">{priceParts[2]}</span>
            </>
          ) : (
            <span className="whitespace-nowrap">{displayPrice}</span>
          )}
        </p>

        <div className="flex w-full items-center gap-2">
          <Link
            href={`/shop/${product.slug}`}
            className="btn-brick flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-btn bg-brand-amber px-2 py-2.5 font-heading text-[13px] font-semibold text-white sm:text-sm"
            style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
          >
            <span className="truncate">View Product</span>
            <span aria-hidden className="hidden sm:inline">→</span>
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
            aria-label={`Add ${product.name} to cart`}
            className="btn-brick flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-brand-navy text-white transition-colors hover:bg-brand-blue"
            style={{ "--btn-brick-shadow": "var(--color-brand-navy-700)" } as React.CSSProperties}
          >
            <LineIcon name="cart" size={18} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}
