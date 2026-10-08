import Link from "next/link";
import ProductCard from "./ProductCard";
import { products } from "@/lib/products";
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

export default function ProductLineup() {
  const kits = products.filter((p) => p.category !== "Bundles & Gifts");

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

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
        {kits.map((product, i) => (
          <ProductCard key={product.slug} product={product} index={i} />
        ))}
      </div>

      <div className="mt-8 flex justify-center lg:hidden">
        <ViewAllButton className="flex w-full sm:inline-flex sm:w-auto" />
      </div>
    </section>
  );
}
