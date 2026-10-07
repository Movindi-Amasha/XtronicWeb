import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parents' Guide: Age Guidance & Safety Tips",
  description:
    "Everything parents need to know about XTRONIC KIDS kits: age guidance, safety notes, STEM concepts explained, and tips for a smooth first build.",
  alternates: { canonical: "/parents-guide" },
};

const AGE_GUIDANCE = [
  { age: "6–7", note: "Best with light adult supervision for the first build." },
  { age: "8–10", note: "Most kids can build independently using the illustrated guide." },
  { age: "11+", note: "Fully independent, including the Smart Voice-Controlled Robot Kit." },
];

const CONCEPTS = [
  { term: "Photovoltaics", def: "How solar cells convert sunlight directly into electricity." },
  { term: "Mechanics", def: "Gears, levers and linkages that turn motion into movement." },
  { term: "Sound Frequency", def: "How sensors detect claps or voice commands as sound waves." },
  { term: "Buoyancy", def: "Why a hull shape keeps a boat floating and stable on water." },
  { term: "Aerodynamics", def: "How wing and propeller shape affect lift and thrust." },
];

const FAQS = [
  {
    q: "Do kits need batteries?",
    a: "Solar kits are battery-free. Robotics and electronic kits use standard AA/AAA batteries, not included in the box.",
  },
  {
    q: "What if a part goes missing?",
    a: "Every kit is covered by our Lifetime Replacement Guarantee. Contact us and we'll post a free replacement part.",
  },
  {
    q: "Can these be reused after building once?",
    a: "Yes, every kit is designed to be taken apart and rebuilt as many times as you like.",
  },
];

export default function ParentsGuidePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-blue-50 py-16">
        <span aria-hidden className="absolute left-[9%] top-8 text-lg text-brand-amber/40">✦</span>
        <span aria-hidden className="absolute right-[7%] top-12 h-2.5 w-2.5 rounded-full bg-brand-blue/30" />
        <span aria-hidden className="absolute left-[13%] bottom-8 h-2 w-2 rounded-full bg-brand-blue/30" />
        <span aria-hidden className="absolute right-[11%] bottom-10 text-xl text-brand-amber/35">✦</span>
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 text-center md:px-6">
          <div>
            <h1 className="font-heading text-4xl font-bold text-brand-navy md:text-5xl">
              Parents&apos; <span className="text-brand-blue">Guide</span>
            </h1>
            <p className="mt-4 text-brand-navy-700">
              Age guidance, safety information and the STEM concepts behind
              every kit, everything you need before your child&apos;s first
              build.
            </p>
          </div>
          <div className="relative h-56 w-56 shrink-0 sm:h-72 sm:w-72 md:h-80 md:w-80">
            <Image
              src="/mascot/sitting-reading.png"
              alt=""
              fill
              sizes="320px"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-4 py-16 md:px-6">
        <h2 className="font-heading text-2xl font-bold text-brand-navy">
          Age Guidance
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {AGE_GUIDANCE.map((row) => (
            <div
              key={row.age}
              className="rounded-card bg-surface p-5 border border-line"
            >
              <p className="font-heading text-2xl font-extrabold text-brand-blue">
                {row.age}
              </p>
              <p className="mt-2 text-sm text-brand-navy-700">{row.note}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-heading text-2xl font-bold text-brand-navy">
          STEM Concepts, Explained
        </h2>
        <dl className="mt-4 flex flex-col gap-4">
          {CONCEPTS.map((c) => (
            <div
              key={c.term}
              className="rounded-card bg-brand-blue-50 p-5"
            >
              <dt className="font-heading font-bold text-brand-navy">{c.term}</dt>
              <dd className="mt-1 text-sm text-brand-navy-700">{c.def}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-14 font-heading text-2xl font-bold text-brand-navy">
          Safety First
        </h2>
        <div className="mt-4 rounded-card bg-brand-amber-50 p-6">
          <p className="text-sm text-brand-navy-700">
            All kits contain small parts and are not suitable for children
            under 3 years. Adult supervision is recommended during assembly.
            Every kit meets Australian toy safety standards. Read the safety
            notice included with your kit before building.
          </p>
        </div>

        <h2 className="mt-14 font-heading text-2xl font-bold text-brand-navy">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-card border border-line bg-surface p-5"
            >
              <summary className="cursor-pointer font-bold text-brand-navy">
                {faq.q}
              </summary>
              <p className="mt-2 text-sm text-brand-navy-700">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-block rounded-full bg-brand-blue px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
          >
            Explore All Kits
          </Link>
        </div>
      </section>
    </>
  );
}
