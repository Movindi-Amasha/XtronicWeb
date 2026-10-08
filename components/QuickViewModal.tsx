"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuickViewStore } from "@/lib/quickViewStore";
import { useCartStore } from "@/lib/cartStore";
import { getProductBySlug } from "@/lib/products";
import { useDisplayPrice } from "@/lib/useDisplayPrice";
import ProductImage from "./ProductImage";

export default function QuickViewModal() {
  const openSlug = useQuickViewStore((s) => s.openSlug);
  const close = useQuickViewStore((s) => s.close);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const [qty, setQty] = useState(1);
  const [lastSlug, setLastSlug] = useState(openSlug);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const product = openSlug ? getProductBySlug(openSlug) : undefined;
  const displayPrice = useDisplayPrice((product?.priceCents ?? 0) * qty);

  // Reset quantity when a different product opens — computed during render
  // (React's recommended pattern) instead of in an effect, to avoid an
  // extra cascading render.
  if (openSlug !== lastSlug) {
    setLastSlug(openSlug);
    setQty(1);
  }

  useEffect(() => {
    if (!product) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [product, close]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      <div
        aria-hidden
        onClick={close}
        className="absolute inset-0 bg-brand-navy/50 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-card border border-line bg-surface"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-xl text-brand-navy shadow hover:bg-brand-blue-50"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-card bg-brand-blue-50">
            <ProductImage src={product.image} alt={product.name} emoji={product.emoji} />
            <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-3 py-1 text-xs font-bold text-brand-navy shadow">
              Age {product.age}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-blue-600">
                {product.categoryLabel}
              </p>
              <h2 className="mt-1 font-heading text-2xl font-extrabold text-brand-navy">
                {product.name}
              </h2>
            </div>

            <div
              className="flex items-center gap-2 text-sm text-brand-navy"
              aria-label={`Rated ${product.rating} out of 5`}
            >
              <span aria-hidden className="text-brand-amber">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </span>
              <span className="text-muted">({product.reviewCount})</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.stemConcepts.map((concept) => (
                <span
                  key={concept}
                  className="rounded-full bg-brand-green-50 px-2.5 py-1 text-xs font-bold text-brand-green-700"
                >
                  {concept}
                </span>
              ))}
              <span className="rounded-full bg-brand-amber-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-brand-navy">
                ⏱ {product.buildTime}
              </span>
            </div>

            <ul className="flex flex-col gap-1.5 text-sm text-brand-navy-700">
              {product.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-brand-blue">✓</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-body text-2xl font-extrabold text-brand-navy">
                  {displayPrice}
                </span>
                <div className="flex items-center gap-3 rounded-full border border-line px-2 py-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-brand-navy hover:bg-brand-blue-50"
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm font-bold text-brand-navy">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-brand-navy hover:bg-brand-blue-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                data-add-to-cart
                type="button"
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
                  close();
                  openCart();
                }}
                className="w-full rounded-full bg-brand-blue px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
              >
                Add to Cart
              </button>

              <Link
                href={`/shop/${product.slug}`}
                onClick={close}
                className="text-center text-sm font-bold text-brand-navy hover:text-brand-blue"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
