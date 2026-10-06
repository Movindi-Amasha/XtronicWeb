import Link from "next/link";
import ProductImage from "./ProductImage";
import { products, formatPriceAUD } from "@/lib/products";

type Tone = "blue" | "amber" | "red";

const TONES: Tone[] = ["red", "blue", "amber", "blue", "red"];

const BORDER: Record<Tone, string> = {
  blue: "border-brand-blue",
  amber: "border-brand-amber",
  red: "border-brand-amber",
};

const BADGE: Record<Tone, string> = {
  blue: "bg-brand-blue",
  amber: "bg-brand-amber text-brand-navy",
  red: "bg-brand-amber",
};

export default function ProductLineup() {
  return (
    <section
      aria-labelledby="lineup-heading"
      className="mx-auto max-w-[1260px] px-4 pt-16 pb-8 md:px-6"
    >
      <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div className="mx-auto sm:mx-0">
          <h2
            id="lineup-heading"
            className="font-heading text-3xl font-bold text-brand-navy md:text-4xl"
          >
            Meet Our <span className="text-brand-amber">5 STEM Kits</span>
          </h2>
          <p className="mt-2 text-sm text-brand-navy-700">
            Explore our first 5 amazing kits. Build, learn and have fun!
          </p>
        </div>
        <Link
          href="/shop"
          className="mx-auto font-mono text-sm font-bold uppercase tracking-wide text-brand-blue hover:text-brand-blue-600 sm:mx-0"
        >
          View All Products →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {products.map((product, i) => {
          const tone = TONES[i % TONES.length];
          return (
            <div
              key={product.slug}
              className={`flex flex-col overflow-hidden rounded-card border-4 bg-surface shadow-sm transition-transform hover:-translate-y-1 ${BORDER[tone]}`}
            >
              <div className="relative aspect-square">
                <span
                  className={`absolute left-2 top-2 z-10 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-white ${BADGE[tone]}`}
                >
                  New
                </span>
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  emoji={product.emoji}
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-heading text-base font-bold text-brand-navy">
                  {product.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-brand-amber-600" aria-label={`Rated ${product.rating} out of 5`}>
                  {"★".repeat(Math.round(product.rating))}
                  <span className="ml-1 text-brand-navy-700">({product.reviewCount})</span>
                </p>
                <p className="mt-2 font-body text-lg font-extrabold text-brand-navy">
                  {formatPriceAUD(product.priceCents)}
                </p>
                <Link
                  href={`/shop/${product.slug}`}
                  className="mt-3 rounded-full bg-brand-amber px-4 py-2.5 text-center font-mono text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                >
                  View Product →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
