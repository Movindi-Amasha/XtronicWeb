"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import LineIcon, { type LineIconName } from "./LineIcon";
import { categories, products, type ProductCategory } from "@/lib/products";
import { LOGO } from "@/lib/brandColors";
import { useDisplayPrice } from "@/lib/useDisplayPrice";

type SortKey = "featured" | "price-low" | "price-high" | "age";

const SORT_LABELS: Record<SortKey, string> = {
  featured: "Featured",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
  age: "Age: Youngest First",
};

const CATEGORY_ICONS: Record<ProductCategory | "All", { icon: LineIconName; color: string; label: string }> = {
  All: { icon: "sparkles", color: LOGO.blue, label: "All Products" },
  "Robotics & Electronics": { icon: "cog", color: LOGO.red, label: "Robotics" },
  "Solar Energy": { icon: "sun", color: LOGO.yellow, label: "Solar Powered" },
  "Wooden Mechanics": { icon: "wrench", color: LOGO.orange, label: "Wooden Mechanics" },
  "Bundles & Gifts": { icon: "gift", color: LOGO.green, label: "Bundles & Gifts" },
};

const TABS: Array<ProductCategory | "All"> = ["All", ...categories];
const AGES = [...new Set(products.map((p) => p.age))];
// Slider ceiling: the dearest product, rounded up to the next $10.
const PRICE_CEILING_CENTS = Math.ceil(Math.max(...products.map((p) => p.priceCents)) / 1000) * 1000;
const KIT_COUNT = products.filter((p) => p.category !== "Bundles & Gifts").length;

function FilterHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-heading text-lg font-bold text-brand-navy">{children}</h3>;
}

function BundlePromo() {
  return (
    <Link
      href="/shop/stem-bundle-5in1"
      className="group relative col-span-2 flex min-h-[220px] flex-col justify-between overflow-hidden rounded-card sm:col-span-1 sm:min-h-[320px] border-[3px] p-5 text-brand-navy shadow-[0_10px_30px_-14px_rgba(14,30,63,0.25)] transition-[translate] duration-300 hover:-translate-y-1.5"
      style={{ borderColor: LOGO.yellow, background: "linear-gradient(160deg, #e9f5ff 0%, #fff7dc 100%)" }}
    >
      <p className="relative z-10 max-w-[60%] -rotate-3 font-heading text-[26px] font-bold leading-[1.05] sm:max-w-none sm:text-[28px]">
        <span style={{ color: LOGO.blue }}>Collect</span>
        <br />
        <span style={{ color: LOGO.blue }}>All {KIT_COUNT} Kits!</span>
        <span className="mt-1 block text-sm font-semibold text-muted">for a complete STEM adventure</span>
      </p>
      <div className="absolute right-[-4%] bottom-4 h-40 w-40 sm:right-[-8%] sm:bottom-14 sm:h-44 sm:w-44 transition-transform duration-300 group-hover:scale-105">
        <Image src="/products/solar-butterfly/cutout.png" alt="" fill sizes="176px" className="object-contain" />
      </div>
      <span
        className="btn-brick relative z-10 inline-flex w-fit items-center gap-2 rounded-btn bg-brand-amber px-5 py-2.5 font-heading text-sm font-semibold text-white"
        style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
      >
        View Bundle <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

export default function ShopCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const activeTab: ProductCategory | "All" =
    categoryParam && (categories as string[]).includes(categoryParam)
      ? (categoryParam as ProductCategory)
      : "All";
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const [sort, setSort] = useState<SortKey>("featured");
  const [ages, setAges] = useState<string[]>([]);
  const [maxPriceCents, setMaxPriceCents] = useState(PRICE_CEILING_CENTS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const maxPriceLabel = useDisplayPrice(maxPriceCents);

  function setCategory(tab: ProductCategory | "All") {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "All") {
      params.delete("category");
    } else {
      params.set("category", tab);
    }
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  }

  function toggleAge(age: string) {
    setAges((current) => (current.includes(age) ? current.filter((a) => a !== age) : [...current, age]));
  }

  const filtered = useMemo(() => {
    let list = activeTab === "All" ? products : products.filter((p) => p.category === activeTab);

    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query)
      );
    }
    if (ages.length) list = list.filter((p) => ages.includes(p.age));
    list = list.filter((p) => p.priceCents <= maxPriceCents);

    const sorted = [...list];
    if (sort === "price-low") sorted.sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "price-high") sorted.sort((a, b) => b.priceCents - a.priceCents);
    if (sort === "age") sorted.sort((a, b) => a.age.localeCompare(b.age));
    return sorted;
  }, [activeTab, sort, query, ages, maxPriceCents]);

  const showPromo = !query && (activeTab === "All" || activeTab === "Bundles & Gifts");
  const filtersActive = ages.length > 0 || maxPriceCents < PRICE_CEILING_CENTS;

  const sidebar = (
    <div className="flex flex-col gap-6 rounded-card border-2 border-line bg-white p-5">
      <div>
        <FilterHeading>Categories</FilterHeading>
        <ul role="tablist" aria-label="Filter by category" className="mt-3 flex flex-col gap-1">
          {TABS.map((tab) => {
            const meta = CATEGORY_ICONS[tab];
            const count = tab === "All" ? products.length : products.filter((p) => p.category === tab).length;
            const active = activeTab === tab;
            return (
              <li key={tab}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(tab)}
                  className={`flex w-full items-center gap-3 rounded-xl border-l-4 px-3 py-2.5 text-left text-sm font-bold transition-colors ${
                    active ? "border-brand-blue bg-brand-blue-50 text-brand-navy" : "border-transparent text-brand-navy-700 hover:bg-canvas"
                  }`}
                >
                  <span style={{ color: meta.color }}>
                    <LineIcon name={meta.icon} size={20} strokeWidth={2.2} />
                  </span>
                  <span className="flex-1">{meta.label}</span>
                  <span className="text-xs text-muted">({count})</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-line pt-5">
        <FilterHeading>Age Range</FilterHeading>
        <div className="mt-3 flex flex-col gap-2">
          {AGES.map((age) => (
            <label key={age} className="flex cursor-pointer items-center gap-2.5 text-sm font-bold text-brand-navy-700">
              <input
                type="checkbox"
                checked={ages.includes(age)}
                onChange={() => toggleAge(age)}
                className="h-4.5 w-4.5 rounded border-line accent-brand-blue"
              />
              {age === "All ages" ? age : `${age} years`}
              <span className="text-xs text-muted">({products.filter((p) => p.age === age).length})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-line pt-5">
        <FilterHeading>Price Range</FilterHeading>
        <input
          type="range"
          min={0}
          max={PRICE_CEILING_CENTS}
          step={500}
          value={maxPriceCents}
          onChange={(e) => setMaxPriceCents(Number(e.target.value))}
          aria-label="Maximum price"
          className="mt-4 w-full accent-brand-blue"
        />
        <p className="mt-1 text-sm font-bold text-brand-navy-700">Up to {maxPriceLabel}</p>
      </div>

      {filtersActive && (
        <button
          type="button"
          onClick={() => {
            setAges([]);
            setMaxPriceCents(PRICE_CEILING_CENTS);
          }}
          className="rounded-btn border-2 border-line px-4 py-2 text-sm font-bold text-brand-navy hover:border-brand-blue hover:text-brand-blue"
        >
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
      <aside className="hidden lg:block">{sidebar}</aside>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-[clamp(28px,3.4vw,38px)] font-bold tracking-tight" style={{ color: LOGO.blue }}>
              <span style={{ color: LOGO.orange }}>
                <LineIcon name="star" size={30} strokeWidth={2.2} />
              </span>
              Our STEM Kits
            </h2>
            <p className="mt-0.5 text-sm font-semibold text-muted" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "product" : "products"} to build, learn and explore
              {query && <> matching &ldquo;{query}&rdquo;</>}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="flex items-center gap-1.5 rounded-btn-xs border-2 border-line bg-white px-3 py-2 text-sm font-bold text-brand-navy lg:hidden"
            >
              <LineIcon name="filter" size={16} /> Filters{filtersActive && " •"}
            </button>
            <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
              <span className="hidden sm:inline">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort by"
                className="rounded-btn-xs border-2 border-line bg-white px-3 py-2 text-sm font-bold text-brand-navy focus-visible:outline-brand-blue-deep"
              >
                {Object.entries(SORT_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {filtersOpen && <div className="mt-4 lg:hidden">{sidebar}</div>}

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-card border-2 border-dashed border-line bg-white p-10 text-center font-semibold text-muted">
            No products match those filters.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {filtered.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
            {showPromo && <BundlePromo />}
          </div>
        )}
      </div>
    </div>
  );
}
