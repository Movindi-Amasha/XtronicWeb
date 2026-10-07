"use client";

import Image from "next/image";
import Link from "next/link";
import ProductImage from "./ProductImage";
import { products, formatPriceAUD } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";

const BUNDLES = products.filter((p) => p.category === "Bundles & Gifts");

export default function SpecialsSection() {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <section id="specials" aria-labelledby="specials-heading" className="mx-auto max-w-[1200px] px-4 pt-24 md:px-6">
      <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand-amber">
        Bundles &amp; extras
      </span>
      <h2 id="specials-heading" className="mt-2 text-[clamp(32px,4vw,48px)] font-bold tracking-tight text-brand-navy">
        Special <span className="text-highlight">products</span>
      </h2>
      <p className="mt-2.5 text-lg font-semibold text-muted">
        Better value, more fun and the perfect presents.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-[3fr_1.15fr]">
        <div className="grid gap-5 sm:grid-cols-3">
          {BUNDLES.map((product) => (
            <div
              key={product.slug}
              className="flex flex-col overflow-hidden rounded-card border-2 border-line bg-white transition-transform hover:-translate-y-1.5"
            >
              <Link href={`/shop/${product.slug}`} className="relative block aspect-square bg-brand-blue-50">
                <div className="relative h-full w-full p-4">
                  <ProductImage src={product.image} alt={product.name} emoji={product.emoji} />
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-heading text-base leading-tight text-brand-navy">
                  <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                </h3>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-body text-lg font-bold text-brand-navy">
                    {formatPriceAUD(product.priceCents)}
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
                    className="btn-brick flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-brand-amber text-white"
                    style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside
          className="relative flex flex-col gap-3.5 overflow-hidden rounded-[26px] p-7 text-brand-navy shadow-[0_10px_0_var(--color-brand-yellow-600)]"
          style={{ background: "linear-gradient(160deg, var(--color-brand-yellow), #ffb000)" }}
        >
          <h3 className="relative text-[28px] font-bold leading-tight">
            Looking for a <span className="text-brand-blue-600">gift?</span>
          </h3>
          <p className="relative font-bold">
            Give a STEM adventure they&apos;ll remember. Free gift wrap and a
            personal note on every order.
          </p>
          <ul className="relative grid gap-1.5 font-extrabold">
            {["Birthdays", "Christmas", "School holidays", "Rainy weekends"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid h-5.5 w-5.5 place-items-center rounded-md bg-white text-xs text-brand-green">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <Link
            href="/shop/gift-wrap-card"
            className="btn-brick relative mt-1.5 inline-flex w-fit items-center gap-2 rounded-btn bg-brand-blue px-6 py-3 font-heading text-sm font-semibold text-white"
            style={{ "--btn-brick-shadow": "var(--color-brand-blue-600)" } as React.CSSProperties}
          >
            Shop the Gift Pack →
          </Link>
          <div aria-hidden className="pointer-events-none absolute -right-3 -bottom-4 h-32 w-32 rotate-[-8deg] opacity-95">
            <Image src="/mascot/holding-gift.png" alt="" fill sizes="128px" className="object-contain" />
          </div>
        </aside>
      </div>
    </section>
  );
}
