"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { products, type ProductCategory } from "@/lib/products";

const CHIPS: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All kits", value: "all" },
  { label: "☀️ Solar", value: "Solar Energy" },
  { label: "✈️ Wooden Mechanics", value: "Wooden Mechanics" },
  { label: "🤖 Robotics", value: "Robotics & Electronics" },
];

export default function ProductLineup() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const kits = products.filter((p) => p.category !== "Bundles & Gifts");
  const shown = filter === "all" ? kits : kits.filter((p) => p.category === filter);

  return (
    <section id="kits" aria-labelledby="lineup-heading" className="mx-auto max-w-[1200px] px-4 pt-24 md:px-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-2 inline-block text-xs font-extrabold uppercase tracking-[0.1em] text-brand-amber">
            Our collection
          </span>
          <h2 id="lineup-heading" className="text-[clamp(32px,4vw,48px)] font-bold tracking-tight text-brand-navy">
            Meet our <span className="text-highlight">kits</span>
          </h2>
          <p className="mt-2.5 text-lg font-semibold text-muted">
            Each kit is a complete adventure: build it, discover how it works, then play.
          </p>
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
          {CHIPS.map((chip) => (
            <button
              key={chip.value}
              type="button"
              onClick={() => setFilter(chip.value)}
              className={`shrink-0 whitespace-nowrap rounded-btn border-2 px-4 py-2.5 text-sm font-extrabold transition-colors ${
                filter === chip.value
                  ? "border-brand-navy bg-brand-navy text-white"
                  : "border-line bg-white text-brand-navy hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-5">
        {shown.map((product, i) => (
          <ProductCard key={product.slug} product={product} index={i} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/shop"
          className="btn-brick group inline-flex w-full items-center justify-center gap-2.5 rounded-btn bg-brand-blue px-8 py-4 font-heading text-base font-semibold text-white sm:w-auto"
          style={{ "--btn-brick-shadow": "var(--color-brand-blue-600)" } as React.CSSProperties}
        >
          Explore all kits
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
