import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import ShopCatalog from "@/components/ShopCatalog";

export const metadata: Metadata = {
  title: "Shop STEM Robotics & Solar Kits for Kids",
  description:
    "Browse solar energy, robotics & electronics, and wooden mechanics STEM kits for kids 6+. Screen-free building kits shipped across Australia and Sri Lanka.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <section className="relative overflow-hidden px-4 py-12 md:px-6 md:py-16">
      <span aria-hidden className="absolute left-[6%] top-6 text-xl text-brand-amber/50">✦</span>
      <span aria-hidden className="absolute right-[8%] top-10 h-2.5 w-2.5 rounded-full bg-brand-blue/30" />
      <span aria-hidden className="absolute left-[12%] bottom-4 h-2 w-2 rounded-full bg-brand-amber/30" />
      <span aria-hidden className="absolute right-[4%] bottom-10 text-lg text-brand-blue/40">✦</span>

      <div className="mx-auto max-w-[1260px]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <h1 className="font-heading text-4xl font-bold text-brand-navy md:text-5xl">
              Our <span className="text-brand-blue">STEM Kits</span>
            </h1>
            <p className="mt-3 max-w-xl text-brand-navy-700">
              Solar-powered builds, voice-controlled robots and laser-cut wooden
              mechanics, every kit designed to turn screen time into hands-on
              discovery.
            </p>
          </div>
          <div className="relative h-56 w-56 shrink-0 sm:h-72 sm:w-72 md:h-80 md:w-80">
            <Image
              src="/mascot/magnifying-glass.png"
              alt=""
              fill
              sizes="320px"
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-10">
          <Suspense fallback={null}>
            <ShopCatalog />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
