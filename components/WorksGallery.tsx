"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductImage from "./ProductImage";
import { products } from "@/lib/products";

const KITS = products.filter((p) => p.category !== "Bundles & Gifts");

export default function WorksGallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="mx-auto max-w-[1200px] px-4 pt-24 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="relative hidden h-20 w-20 shrink-0 sm:block">
            <Image src="/mascot/magnifying-glass.png" alt="" fill sizes="80px" className="object-contain" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand-amber">
              See them in action
            </span>
            <h2 id="gallery-heading" className="mt-2 text-[clamp(32px,4vw,48px)] font-bold tracking-tight text-brand-navy">
              Every kit, <span className="text-brand-amber">up close</span>
            </h2>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="grid h-12 w-12 place-items-center rounded-btn border-2 border-line bg-white transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next"
            className="grid h-12 w-12 place-items-center rounded-btn border-2 border-line bg-white transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-8 flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {KITS.map((kit) => (
          <Link
            key={kit.slug}
            href={`/shop/${kit.slug}`}
            className="relative aspect-[4/5] shrink-0 basis-[calc((100%-60px)/4)] overflow-hidden rounded-card bg-brand-blue-50"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="absolute inset-0 p-6">
              <ProductImage src={kit.image} alt={kit.name} emoji={kit.emoji} />
            </div>
            <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_10px_30px_-12px_rgba(14,30,63,0.18)]">
              <span>
                <strong className="block font-heading text-sm leading-tight text-brand-navy">{kit.name}</strong>
                <small className="text-xs font-bold text-muted">{kit.categoryLabel}</small>
              </span>
            </figcaption>
          </Link>
        ))}
      </div>
    </section>
  );
}
