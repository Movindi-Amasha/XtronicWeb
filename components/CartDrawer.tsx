"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  useCartStore,
  cartSubtotalCents,
  type CartItem,
} from "@/lib/cartStore";
import { formatPriceAUD } from "@/lib/products";
import { amountUntilFreeShippingCents, FREE_SHIPPING_THRESHOLD_CENTS } from "@/lib/shipping";

function LineItem({ item }: { item: CartItem }) {
  const { updateQty, removeItem } = useCartStore();

  return (
    <li className="flex gap-3 py-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-btn bg-brand-blue-50">
        <span className="flex h-full w-full items-center justify-center text-2xl">
          {item.emoji}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-bold text-brand-navy">{item.name}</p>
        <p className="text-sm text-muted">{formatPriceAUD(item.priceCents)}</p>
        <div className="mt-1 flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-line px-1.5 py-0.5">
            <button
              type="button"
              aria-label={`Decrease quantity of ${item.name}`}
              onClick={() => updateQty(item.slug, item.qty - 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-brand-navy hover:bg-brand-blue-50"
            >
              −
            </button>
            <span className="w-4 text-center text-sm font-bold text-brand-navy">
              {item.qty}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${item.name}`}
              onClick={() => updateQty(item.slug, item.qty + 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-brand-navy hover:bg-brand-blue-50"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.slug)}
            className="text-xs font-bold text-muted hover:text-brand-navy"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export default function CartDrawer() {
  const { items, isOpen, closeCart } = useCartStore();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const subtotal = cartSubtotalCents(items);
  const remaining = amountUntilFreeShippingCents(subtotal);
  const progressPct = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD_CENTS) * 100
  );

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeCart();
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
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998]">
      <div
        aria-hidden
        onClick={closeCart}
        className="absolute inset-0 bg-brand-navy/50 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-surface"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-heading text-lg font-bold text-brand-navy">
            Your Cart {items.length > 0 && `(${items.length})`}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-brand-navy hover:bg-brand-blue-50"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="text-4xl">🛒</span>
            <p className="font-bold text-brand-navy">Your cart is empty</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white"
            >
              Explore All Kits
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-5 py-4">
              {remaining > 0 ? (
                <p className="text-xs font-semibold text-brand-navy-700">
                  {formatPriceAUD(remaining)} away from free delivery
                </p>
              ) : (
                <p className="text-xs font-semibold text-brand-green-700">
                  🎉 You&apos;ve unlocked free delivery!
                </p>
              )}
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-brand-green transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map((item) => (
                <LineItem key={item.slug} item={item} />
              ))}
            </ul>

            <div className="border-t border-line px-5 py-4">
              <div className="flex items-center justify-between text-sm font-bold text-brand-navy">
                <span>Subtotal</span>
                <span>{formatPriceAUD(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Shipping and taxes calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 block rounded-full bg-brand-blue px-6 py-3.5 text-center text-base font-bold uppercase tracking-wide text-white hover:opacity-90"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
