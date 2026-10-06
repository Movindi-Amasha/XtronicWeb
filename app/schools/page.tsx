import type { Metadata } from "next";
import Image from "next/image";
import SchoolQuoteForm from "@/components/SchoolQuoteForm";

export const metadata: Metadata = {
  title: "Schools & Clubs",
  description:
    "Bulk STEM kit bundles, lesson plans and custom quotes for schools and STEM clubs.",
};

const BUNDLES = [
  {
    name: "10-Pack Bundle",
    discount: "15% off",
    desc: "Any single kit, 10 units, perfect for a classroom set.",
  },
  {
    name: "30-Pack Bundle",
    discount: "25% off",
    desc: "Any single kit, 30 units, ideal for a full year group.",
  },
  {
    name: "Classroom Discovery Pack",
    discount: "Mixed set",
    desc: "One of each kit across Solar, Robotics and Wooden Mechanics categories.",
  },
];

const BORDERS = ["border-brand-blue", "border-brand-amber", "border-brand-blue"];

export default function SchoolsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-blue-50 py-16">
        <span aria-hidden className="absolute left-[7%] top-8 text-xl text-brand-blue/40">✦</span>
        <span aria-hidden className="absolute right-[9%] top-6 h-2.5 w-2.5 rounded-full bg-brand-amber/35" />
        <span aria-hidden className="absolute left-[5%] bottom-10 h-2 w-2 rounded-full bg-brand-amber/35" />
        <span aria-hidden className="absolute right-[13%] bottom-8 text-lg text-brand-blue/35">✦</span>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center md:flex-row-reverse md:px-6 md:text-right">
          <div className="flex-1">
            <h1 className="font-heading text-4xl font-bold text-brand-navy md:text-5xl">
              Schools, <span className="text-brand-blue">STEM Clubs</span> &amp; Educators
            </h1>
            <p className="mt-4 text-brand-navy-700">
              Bring hands-on STEM to your classroom with bulk bundles, free
              lesson plans, and a dedicated quote for larger orders.
            </p>
          </div>
          <div className="relative h-56 w-56 shrink-0 sm:h-72 sm:w-72 md:h-80 md:w-80">
            <Image
              src="/mascot/holding-gift.png"
              alt=""
              fill
              sizes="320px"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {BUNDLES.map((bundle, i) => (
            <div
              key={bundle.name}
              className={`flex flex-col gap-2 rounded-card border-4 bg-surface p-6 text-center shadow-sm ${BORDERS[i % BORDERS.length]}`}
            >
              <span className="mx-auto rounded-full bg-brand-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-navy">
                {bundle.discount}
              </span>
              <h3 className="mt-2 font-heading text-lg font-bold text-brand-navy">
                {bundle.name}
              </h3>
              <p className="text-sm text-brand-navy-700">{bundle.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 rounded-card bg-brand-blue-50 p-6 text-center">
          <p className="font-heading text-lg font-bold text-brand-navy">
            📄 Free lesson plans included
          </p>
          <p className="max-w-md text-sm text-brand-navy-700">
            Every bundle order comes with downloadable lesson plans mapped to
            the STEM concepts in each kit, available once your order is
            confirmed.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-center font-heading text-2xl font-extrabold text-brand-navy">
            Request a Custom Quote
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-brand-navy-700">
            Ordering for a class, club or whole school? Tell us what you need
            and we&apos;ll put together a custom quote within one business
            day.
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <SchoolQuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
