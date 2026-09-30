"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { categories, products, type ProductCategory } from "@/lib/products";

const TABS: Array<ProductCategory | "All"> = ["All", ...categories];

type SortKey = "featured" | "price-low" | "price-high" | "age";

const SORT_LABELS: Record<SortKey, string> = {
  featured: "Featured",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
  age: "Age: Youngest First",
};

export default function ShopCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const activeTab: ProductCategory | "All" =
    categoryParam && (categories as string[]).includes(categoryParam)
      ? (categoryParam as ProductCategory)
      : "All";

  const [sort, setSort] = useState<SortKey>("featured");

  function setCategory(tab: ProductCategory | "All") {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "All") {
      params.delete("category");
    } else {
      params.set("category", tab);
    }
    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop", { scroll: false });
  }

  const filtered = useMemo(() => {
    const list =
      activeTab === "All" ? products : products.filter((p) => p.category === activeTab);

    const sorted = [...list];
    if (sort === "price-low") sorted.sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "price-high") sorted.sort((a, b) => b.priceCents - a.priceCents);
    if (sort === "age") sorted.sort((a, b) => a.age.localeCompare(b.age));
    return sorted;
  }, [activeTab, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Filter kits by category"
          className="flex flex-wrap gap-2"
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setCategory(tab)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                activeTab === tab
                  ? "bg-brand-blue text-white hover:opacity-90"
                  : "border border-line bg-surface text-brand-navy hover:bg-brand-blue-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-btn-xs border border-line bg-surface px-3 py-2 text-sm font-semibold text-brand-navy focus-visible:outline-brand-blue-deep"
          >
            {Object.entries(SORT_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "kit" : "kits"} found
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
