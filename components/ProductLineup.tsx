"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { products, type ProductCategory } from "@/lib/products";
import LineIcon, { type LineIconName } from "./LineIcon";
import { LOGO } from "@/lib/brandColors";
import Doodled from "@/components/Doodled";

function ViewAllButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/shop"
      className={`group items-center justify-center gap-2 rounded-btn border-2 border-brand-amber bg-white px-5 py-2.5 font-heading text-sm font-semibold text-brand-amber transition-colors hover:bg-brand-amber hover:text-white ${className}`}
    >
      View All Products
      <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}

// Filter chips under the heading; each takes its own colour when selected.
const CHIPS: { label: string; value: ProductCategory | "all"; icon: LineIconName; color: string }[] = [
  { label: "All Kits", value: "all", icon: "sparkles", color: LOGO.blue },
  { label: "Robotics", value: "Robotics & Electronics", icon: "cog", color: LOGO.red },
  { label: "Solar", value: "Solar Energy", icon: "sun", color: LOGO.yellow },
  { label: "Wooden Mechanics", value: "Wooden Mechanics", icon: "wrench", color: LOGO.orange },
];

export default function ProductLineup() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const allKits = products.filter((p) => p.category !== "Bundles & Gifts");
  const kits = filter === "all" ? allKits : allKits.filter((p) => p.category === filter);

  return (
    <section id="kits" aria-labelledby="lineup-heading" className="mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
      <div className="relative text-center">
        <Doodled preset="center"><h2 id="lineup-heading" className="text-[clamp(32px,4.4vw,52px)] font-bold uppercase tracking-tight" style={{ color: LOGO.blue }}>
          Meet our <span style={{ color: LOGO.orange }}>kits</span>
        </h2></Doodled>
        <p className="mt-1.5 text-lg font-semibold text-muted">
          Explore our amazing kits. Build, learn and have fun!
        </p>
        <ViewAllButton className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:inline-flex" />
      </div>

      <div role="tablist" aria-label="Filter kits" className="mt-6 flex flex-wrap justify-center gap-2.5">
        {CHIPS.map((chip) => {
          const active = filter === chip.value;
          return (
            <button
              key={chip.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(chip.value)}
              className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-extrabold transition-all duration-300 ${active ? "scale-105 text-white shadow-[0_6px_0_rgba(13,31,53,0.18)]" : "bg-white hover:-translate-y-0.5"}`}
              style={active ? { background: chip.color, borderColor: chip.color } : { borderColor: `color-mix(in srgb, ${chip.color} 35%, white)`, color: chip.color }}
            >
              <LineIcon name={chip.icon} size={18} strokeWidth={2.4} />
              <span className={active ? "" : "text-brand-navy"}>{chip.label}</span>
            </button>
          );
        })}
      </div>

      <div key={filter} className="kits-fade mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
        {kits.map((product) => (
          <ProductCard key={product.slug} product={product} index={allKits.indexOf(product)} showRating={false} />
        ))}
      </div>

      <div className="mt-8 flex justify-center lg:hidden">
        <ViewAllButton className="flex w-full sm:inline-flex sm:w-auto" />
      </div>
    </section>
  );
}
