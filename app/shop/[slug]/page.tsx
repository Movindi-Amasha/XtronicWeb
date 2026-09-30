import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import AddToCartBox from "@/components/AddToCartBox";
import { getProductBySlug, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.highlights.join(" "),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.highlights.join(" "),
    image: `https://xtronic-web.vercel.app${product.image}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <section className="mx-auto max-w-[1260px] px-4 py-10 md:px-6 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
        <Link href="/shop" className="hover:text-brand-blue">
          STEM Kits
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-navy">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-card bg-brand-blue-50">
          <ProductImage src={product.image} alt={product.name} emoji={product.emoji} />
          <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1.5 text-sm font-bold text-brand-navy shadow">
            Age {product.age}
          </span>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-blue-600">
              {product.categoryLabel}
            </p>
            <h1 className="mt-1 font-heading text-3xl font-extrabold text-brand-navy md:text-4xl">
              {product.emoji} {product.name}
            </h1>
          </div>

          <div
            className="flex items-center gap-2 text-sm text-brand-navy"
            aria-label={`Rated ${product.rating} out of 5 from ${product.reviewCount} reviews`}
          >
            <span aria-hidden className="text-brand-amber">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </span>
            <span className="text-muted">
              {product.rating} · {product.reviewCount} reviews
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.stemConcepts.map((concept) => (
              <span
                key={concept}
                className="rounded-full bg-brand-green-50 px-3 py-1 text-xs font-bold text-brand-green-700"
              >
                {concept}
              </span>
            ))}
            <span className="rounded-full bg-brand-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-navy">
              ⏱ Build time {product.buildTime}
            </span>
          </div>

          <ul className="flex flex-col gap-2 text-sm text-brand-navy-700">
            {product.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-brand-blue">✓</span>
                {h}
              </li>
            ))}
          </ul>

          <AddToCartBox product={product} />
        </div>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-xl font-bold text-brand-navy">
            What&apos;s in the Box
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-brand-navy-700">
            {product.whatsInTheBox.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-green">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-card bg-brand-amber-50 p-6">
          <h2 className="font-heading text-xl font-bold text-brand-navy">
            ⚠️ Safety Notice
          </h2>
          <p className="mt-3 text-sm text-brand-navy-700">
            Contains small parts. Not suitable for children under 3 years.
            Adult supervision recommended during assembly. Meets Australian
            toy safety standards.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-brand-navy">
            You Might Also Like
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
