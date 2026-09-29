"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { categories, products, type ProductCategory } from "@/lib/products";

const TABS: Array<ProductCategory | "All"> = ["All", ...categories];

export default function FeaturedKits() {
  const [active, setActive] = useState<ProductCategory | "All">("All");

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section
      id="featured-kits"
      aria-labelledby="featured-kits-heading"
      className="mx-auto max-w-[1260px] px-4 py-16 md:px-6"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <h2
          id="featured-kits-heading"
          className="font-heading text-3xl font-extrabold text-brand-navy md:text-4xl"
        >
          Featured STEM Kits
        </h2>
        <p className="max-w-xl text-brand-navy-700">
          Solar-powered builds, voice-controlled robots and laser-cut wooden
          mechanics — pick a category to explore.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Filter kits by category"
        className="mt-8 flex flex-wrap justify-center gap-2"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              active === tab
                ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                : "bg-surface text-brand-navy border border-line hover:bg-brand-blue-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
