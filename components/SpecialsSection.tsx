"use client";

import Link from "next/link";
import ProductImage from "./ProductImage";
import LineIcon from "./LineIcon";
import GiftBox from "./GiftBox";
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
// `ribbon` = the colour each card is "wrapped" in.
const SPECIALS: Record<string, { blurb: string; cta: string; badge?: string; compareAtCents?: number; ribbon: string }> = {
  "stem-bundle-5in1": { blurb: "Get all 5 kits and save!", cta: "View Bundle", badge: "Best Value", compareAtCents: KITS_TOTAL_CENTS, ribbon: LOGO.red },
  "gift-wrap-card": { blurb: "Perfect for birthdays!", cta: "View Gift Pack", badge: "Gift Ready", ribbon: "#E91E8C" },
  "tools-accessories-pack": { blurb: "Extra tools and parts.", cta: "View Accessories", badge: "Must Have", ribbon: LOGO.blue },
};

const GIFT_OCCASIONS: { label: string; color: string }[] = [
  { label: "Birthdays", color: LOGO.red },
  { label: "Christmas", color: LOGO.green },
  { label: "School Holidays", color: LOGO.orange },
  { label: "STEM Gift", color: LOGO.blue },
  { label: "Weekend Fun", color: "#E91E8C" },
];

/** A ribbon bow, sat on top of a "wrapped" card. */
function Bow({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 50" className={className} fill="none" strokeLinejoin="round">
      <path d="M60 44C46 16 14 10 14 30c0 14 26 14 46 14Z" fill={color} stroke="#0D1F35" strokeWidth="3" />
      <path d="M60 44c14-28 46-34 46-14 0 14-26 14-46 14Z" fill={color} stroke="#0D1F35" strokeWidth="3" />
      <circle cx="60" cy="42" r="8" fill="#fff" stroke="#0D1F35" strokeWidth="3" />
    </svg>
  );
}

function Price({ cents, className = "" }: { cents: number; className?: string }) {
  return <span className={className}>{useDisplayPrice(cents)}</span>;
}

function SpecialCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const special = SPECIALS[product.slug];

  return (
    <div className="group relative mt-5 flex flex-col rounded-card border-[3px] bg-white text-center shadow-[0_10px_30px_-14px_rgba(14,30,63,0.2)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-16px_rgba(14,30,63,0.3)]" style={{ borderColor: special.ribbon }}>
      {/* Wrapped-present look: bow on top, ribbon down the photo. */}
      <Bow color={special.ribbon} className="bow-wiggle absolute -top-7 left-1/2 z-20 h-11 w-24 -translate-x-1/2" />
      {special.badge && (
        <span className="absolute left-0 top-4 z-10 rounded-r-full px-3 py-1 text-[11px] font-extrabold uppercase text-white shadow" style={{ background: special.ribbon }}>
          {special.badge}
        </span>
      )}
      {special.compareAtCents && special.compareAtCents > product.priceCents && (
        <span className="sticker-spin absolute -right-3 -top-3 z-20 grid h-16 w-16 place-items-center rounded-full border-[3px] border-white text-center font-heading text-[11px] font-bold leading-tight text-white shadow-lg" style={{ background: LOGO.orange }}>
          SAVE
          <br />
          <Price cents={special.compareAtCents - product.priceCents} className="text-[12px]" />
        </span>
      )}
      <Link href={`/shop/${product.slug}`} aria-label={product.name} className="relative block aspect-[4/3] overflow-hidden rounded-t-[19px]" style={{ background: `radial-gradient(circle at 50% 40%, #fff 0%, color-mix(in srgb, ${special.ribbon} 14%, white) 75%)` }}>
        <span aria-hidden className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 opacity-25" style={{ background: special.ribbon }} />
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
    <section id="specials" aria-labelledby="specials-heading" className="confetti-bg mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
      <Doodled preset="right"><h2 id="specials-heading" className="text-[clamp(30px,4vw,44px)] font-bold tracking-tight" style={{ color: LOGO.blue }}>
        Our Special <span style={{ color: LOGO.orange }}>Products</span>
      </h2></Doodled>
      <p className="mt-1 text-lg font-semibold text-muted">Unique kits and bundles for extra fun and learning!</p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[3fr_1.2fr]">
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
          {specials.map((product) => (
            <SpecialCard key={product.slug} product={product} />
          ))}
        </div>

        <aside
          className="relative flex flex-col gap-3 overflow-hidden rounded-[26px] p-6 pt-9 text-brand-navy shadow-[0_10px_0_var(--color-brand-yellow-600)] sm:p-7 sm:pt-10"
          style={{ background: `linear-gradient(160deg, #FFE27A, ${LOGO.yellow})` }}
        >
          {/* Ribbon wrapped around the panel, with a bow where it crosses. */}
          <span aria-hidden className="absolute inset-y-0 right-14 w-5" style={{ background: LOGO.red, opacity: 0.85 }} />
          <span aria-hidden className="absolute inset-x-0 top-5 h-5" style={{ background: LOGO.red, opacity: 0.85 }} />
          <Bow color={LOGO.red} className="bow-wiggle absolute -top-1 right-1 h-12 w-28" />
          <span aria-hidden className="doodle absolute left-[55%] top-16 text-white/90">
            <LineIcon name="sparkles" size={22} strokeWidth={2.4} />
          </span>

          <h3 className="relative mt-3 text-[28px] font-bold leading-tight">
            Looking for a <span style={{ color: LOGO.blue }}>Gift?</span>
          </h3>
          <p className="relative max-w-[220px] font-bold">Give a STEM adventure they&apos;ll remember!</p>
          <ul className="relative flex max-w-[240px] flex-wrap gap-1.5">
            {GIFT_OCCASIONS.map((o) => (
              <li key={o.label} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[13px] font-extrabold shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: o.color }} />
                {o.label}
              </li>
            ))}
          </ul>
          <Link
            href="/shop?category=Bundles+%26+Gifts"
            className="btn-brick relative mt-2 inline-flex w-fit items-center gap-2 rounded-btn bg-brand-blue px-6 py-3 font-heading text-sm font-semibold text-white"
            style={{ "--btn-brick-shadow": "var(--color-brand-blue-600)" } as React.CSSProperties}
          >
            Find a Gift <span aria-hidden>→</span>
          </Link>
          <GiftBox className="gift-hop pointer-events-none absolute -right-3 -bottom-3 h-32 w-32 sm:h-36 sm:w-36" box="#1E88E5" lid="#42A5F5" ribbon={LOGO.red} />
        </aside>
      </div>
    </section>
  );
}
