import Link from "next/link";
import CreationsCarousel from "./CreationsCarousel";
import { products } from "@/lib/products";
import { LOGO } from "@/lib/brandColors";
import Doodled from "@/components/Doodled";

// Each kit's "in action" photo (public/products/<slug>/4.jpg).
const CREATIONS = products
  .filter((p) => p.category !== "Bundles & Gifts")
  .map((p) => ({ href: `/shop/${p.slug}`, image: `/products/${p.slug}/4.jpg`, title: p.name }));

export default function WorksGallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
      <div className="relative text-center">
        <Doodled preset="center"><h2 id="gallery-heading" className="text-[clamp(30px,4vw,44px)] font-bold tracking-tight" style={{ color: LOGO.blue }}>
          Our Works <span style={{ color: LOGO.orange }}>Gallery</span>
        </h2></Doodled>
        <p className="mt-1 text-lg font-semibold text-muted">Every kit built, powered up and ready to play.</p>
        <Link
          href="/how-it-works"
          className="btn-brick mt-5 inline-flex items-center gap-2 rounded-btn bg-brand-yellow px-5 py-2.5 font-heading text-sm font-semibold text-brand-navy lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2"
          style={{ "--btn-brick-shadow": "var(--color-brand-yellow-600)" } as React.CSSProperties}
        >
          See More Creations <span aria-hidden>→</span>
        </Link>
      </div>
      <div className="mt-8">
        <CreationsCarousel items={CREATIONS} />
      </div>
    </section>
  );
}
