import { Suspense } from "react";
import type { Metadata } from "next";
import ShopCatalog from "@/components/ShopCatalog";

export const metadata: Metadata = {
  title: "STEM Kits",
  description:
    "Browse solar energy, robotics & electronics, and wooden mechanics STEM kits for kids 6+.",
};

export default function ShopPage() {
  return (
    <section className="mx-auto max-w-[1260px] px-4 py-12 md:px-6 md:py-16">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-extrabold text-brand-navy md:text-5xl">
          STEM Kits
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-brand-navy-700">
          Solar-powered builds, voice-controlled robots and laser-cut wooden
          mechanics, every kit designed to turn screen time into hands-on
          discovery.
        </p>
      </div>

      <div className="mt-10">
        <Suspense fallback={null}>
          <ShopCatalog />
        </Suspense>
      </div>
    </section>
  );
}
