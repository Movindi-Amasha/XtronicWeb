"use client";

import Image from "next/image";
import Link from "next/link";
import ProductImage from "./ProductImage";
import LineIcon from "./LineIcon";
import { products, type Product } from "@/lib/products";
import { LOGO } from "@/lib/brandColors";
import { useCartStore } from "@/lib/cartStore";
import { useDisplayPrice } from "@/lib/useDisplayPrice";
import Doodled from "@/components/Doodled";

const KITS_TOTAL_CENTS = products
  .filter((p) => p.category !== "Bundles & Gifts")
  .reduce((sum, p) => sum + p.priceCents, 0);

// Copy and button label per bundle/extra; the bundle's "was" price is the
// five kits bought separately, so the saving is always real.
const SPECIALS: Record<string, { blurb: string; cta: string; badge?: string; compareAtCents?: number }> = {
  "stem-bundle-5in1": { blurb: "Get all 5 kits and save!", cta: "View Bundle", badge: "Best Value", compareAtCents: KITS_TOTAL_CENTS },
  "gift-wrap-card": { blurb: "Perfect for birthdays!", cta: "View Gift Pack" },
  "tools-accessories-pack": { blurb: "Extra tools and parts.", cta: "View Accessories" },
};

const GIFT_OCCASIONS = ["Birthdays", "Christmas", "School Holidays", "STEM Gift", "Weekend Fun"];

function Price({ cents, className = "" }: { cents: number; className?: string }) {
  return <span className={className}>{useDisplayPrice(cents)}</span>;
}

function SpecialCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const special = SPECIALS[product.slug];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-card border-2 border-line bg-white text-center shadow-[0_10px_30px_-14px_rgba(14,30,63,0.2)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-16px_rgba(14,30,63,0.3)]">
      {special.badge && (
        <span className="absolute left-0 top-3 z-10 rounded-r-full px-3 py-1 text-[11px] font-extrabold uppercase text-white shadow" style={{ background: LOGO.red }}>
          {special.badge}
        </span>
      )}
      <Link href={`/shop/${product.slug}`} aria-label={product.name} className="relative block aspect-[4/3] bg-brand-blue-50">
        <div className="relative h-full w-full p-3 transition-transform duration-300 group-hover:scale-105">
          <ProductImage src={product.image} alt={product.name} emoji={product.emoji} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col items-center gap-1 p-4">
        <h3 className="font-heading text-base font-semibold leading-tight text-brand-navy">
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="text-xs font-semibold text-muted">{special.blurb}</p>
        <p className="mt-1 flex flex-wrap items-baseline justify-center gap-x-2">
          {special.compareAtCents && special.compareAtCents > product.priceCents && (
            <Price cents={special.compareAtCents} className="text-sm font-bold text-muted line-through" />
          )}
          <Price cents={product.priceCents} className="font-body text-lg font-extrabold text-brand-navy" />
        </p>
        <div className="mt-auto flex w-full items-center gap-2 pt-2">
          <Link
            href={`/shop/${product.slug}`}
            className="btn-brick flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-btn bg-brand-amber px-2 py-2.5 font-heading text-[13px] font-semibold text-white sm:text-sm"
            style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
          >
            <span className="truncate">{special.cta}</span> <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            onClick={() =>
              addItem({ slug: product.slug, name: product.name, emoji: product.emoji, image: product.image, priceCents: product.priceCents })
            }
            data-add-to-cart
            aria-label={`Add ${product.name} to cart`}
            className="btn-brick flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-brand-navy text-white hover:bg-brand-blue"
            style={{ "--btn-brick-shadow": "var(--color-brand-navy-700)" } as React.CSSProperties}
          >
            <LineIcon name="cart" size={18} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SpecialsSection() {
  const specials = Object.keys(SPECIALS)
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <section id="specials" aria-labelledby="specials-heading" className="mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
      <Doodled preset="right"><h2 id="specials-heading" className="text-[clamp(30px,4vw,44px)] font-bold tracking-tight" style={{ color: LOGO.blue }}>
        Our Special <span style={{ color: LOGO.orange }}>Products</span>
      </h2></Doodled>
      <p className="mt-1 text-lg font-semibold text-muted">Unique kits and bundles for extra fun and learning!</p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[3fr_1.2fr]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {specials.map((product) => (
            <SpecialCard key={product.slug} product={product} />
          ))}
        </div>

        <aside
          className="relative flex flex-col gap-3 overflow-hidden rounded-[26px] p-6 text-brand-navy shadow-[0_10px_0_var(--color-brand-yellow-600)] sm:p-7"
          style={{ background: `linear-gradient(160deg, #FFD54A, ${LOGO.yellow})` }}
        >
          <h3 className="relative text-[28px] font-bold leading-tight">
            Looking for a <span style={{ color: LOGO.blue }}>Gift?</span>
          </h3>
          <p className="relative max-w-[240px] font-bold">Give a STEM adventure they&apos;ll remember!</p>
          <ul className="relative grid gap-1.5 font-extrabold">
            {GIFT_OCCASIONS.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid h-5.5 w-5.5 place-items-center rounded-md bg-white" style={{ color: LOGO.green }}>
                  <LineIcon name="check" size={14} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <Link
            href="/shop?category=Bundles+%26+Gifts"
            className="btn-brick relative mt-1.5 inline-flex w-fit items-center gap-2 rounded-btn bg-brand-blue px-6 py-3 font-heading text-sm font-semibold text-white"
            style={{ "--btn-brick-shadow": "var(--color-brand-blue-600)" } as React.CSSProperties}
          >
            Find a Gift →
          </Link>
          <div aria-hidden className="pointer-events-none absolute -right-3 -bottom-3 h-36 w-36 rotate-[-6deg]">
            <Image src="/kids/girl-butterfly.png" alt="" fill sizes="144px" className="object-contain object-bottom" />
          </div>
        </aside>
      </div>
    </section>
  );
}
