import Link from "next/link";
import ProductImage from "./ProductImage";
import { products, formatPriceAUD } from "@/lib/products";

export default function ProductLineup() {
  return (
    <section
      aria-labelledby="lineup-heading"
      className="mx-auto max-w-[1260px] px-4 py-16 md:px-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-blue-600">
            The lineup
          </p>
          <h2
            id="lineup-heading"
            className="mt-2 font-heading text-3xl font-bold text-brand-navy md:text-4xl"
          >
            Five kits. One workshop.
          </h2>
        </div>
        <Link
          href="/shop"
          className="font-mono text-sm font-medium uppercase tracking-wide text-brand-blue hover:text-brand-blue-600"
        >
          Explore All Kits →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/shop/${product.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-card bg-brand-blue-50 transition-transform hover:-translate-y-1"
          >
            <ProductImage
              src={product.image}
              alt={product.name}
              emoji={product.emoji}
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent px-3 pb-3 pt-8">
              <p className="font-body text-xs font-bold leading-snug text-white">
                {product.name}
              </p>
              <p className="mt-0.5 font-body text-xs font-semibold text-brand-blue-50/80">
                {formatPriceAUD(product.priceCents)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
