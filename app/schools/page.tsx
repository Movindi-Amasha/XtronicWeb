import type { Metadata } from "next";
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
    desc: "Any single kit, 10 units — perfect for a classroom set.",
  },
  {
    name: "30-Pack Bundle",
    discount: "25% off",
    desc: "Any single kit, 30 units — ideal for a full year group.",
  },
  {
    name: "Classroom Discovery Pack",
    discount: "Mixed set",
    desc: "One of each kit across Solar, Robotics and Wooden Mechanics categories.",
  },
];

export default function SchoolsPage() {
  return (
    <>
      <section className="bg-brand-navy py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-4 md:px-6">
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">
            Schools, STEM Clubs & Educators
          </h1>
          <p className="mt-4 text-brand-blue-50/80">
            Bring hands-on STEM to your classroom with bulk bundles, free
            lesson plans, and a dedicated quote for larger orders.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {BUNDLES.map((bundle) => (
            <div
              key={bundle.name}
              className="flex flex-col gap-2 rounded-card bg-surface p-6 text-center border border-line"
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
            the STEM concepts in each kit — available once your order is
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
