"use client";

import Link from "next/link";
import { useCartStore, cartSubtotalCents } from "@/lib/cartStore";
import { formatPriceAUD } from "@/lib/products";
import { amountUntilFreeShippingCents, FREE_SHIPPING_THRESHOLD_CENTS } from "@/lib/shipping";
import { gstComponentCents } from "@/lib/pricing";

export default function CartPage() {
  const { items, updateQty, removeItem } = useCartStore();
  const subtotal = cartSubtotalCents(items);
  const remaining = amountUntilFreeShippingCents(subtotal);
  const progressPct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_CENTS) * 100);
  const gst = gstComponentCents(subtotal);

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[50vh] max-w-[720px] flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <span className="text-5xl">🛒</span>
        <h1 className="mt-4 font-heading text-3xl font-extrabold text-brand-navy">
          Your cart is empty
        </h1>
        <p className="mt-2 max-w-sm text-brand-navy-700">
          Looks like you haven&apos;t added any kits yet. Browse the full
          catalog to find your next build.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-brand-blue px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
        >
          Explore All Kits
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1000px] px-4 py-12 md:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-brand-navy">
        Your Cart
      </h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
        <ul className="flex flex-col divide-y divide-line rounded-card border border-line bg-surface">
          {items.map((item) => (
            <li key={item.slug} className="flex gap-4 p-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-btn bg-brand-blue-50 text-3xl">
                {item.emoji}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Link
                  href={`/shop/${item.slug}`}
                  className="font-bold text-brand-navy hover:text-brand-blue"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-muted">{formatPriceAUD(item.priceCents)} each</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-line px-2 py-1">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => updateQty(item.slug, item.qty - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-brand-navy hover:bg-brand-blue-50"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-brand-navy">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => updateQty(item.slug, item.qty + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-brand-navy hover:bg-brand-blue-50"
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
              <span className="font-heading font-bold text-brand-navy">
                {formatPriceAUD(item.priceCents * item.qty)}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex h-fit flex-col gap-4 rounded-card border border-line bg-surface p-6">
          {remaining > 0 ? (
            <div>
              <p className="text-xs font-semibold text-brand-navy-700">
                {formatPriceAUD(remaining)} away from free delivery
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-brand-green transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-xs font-semibold text-brand-green-700">
              🎉 You&apos;ve unlocked free delivery!
            </p>
          )}

          <div className="flex flex-col gap-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-brand-navy-700">
              <span>Subtotal</span>
              <span>{formatPriceAUD(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Includes GST</span>
              <span>{formatPriceAUD(gst)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div className="flex justify-between border-t border-line pt-4 font-heading text-lg font-extrabold text-brand-navy">
            <span>Total</span>
            <span>{formatPriceAUD(subtotal)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-2 rounded-full bg-brand-blue px-6 py-3.5 text-center text-base font-bold uppercase tracking-wide text-white hover:opacity-90"
          >
            Checkout
          </Link>
          <Link
            href="/shop"
            className="text-center text-sm font-bold text-brand-navy hover:text-brand-blue"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
