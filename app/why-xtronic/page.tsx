import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why XTRONIC",
  description:
    "Why parents, teachers and kids choose XTRONIC KIDZ for hands-on STEM learning.",
};

const REASONS = [
  {
    icon: "📵",
    title: "Screen-Free Interactive Fun",
    desc: "Every kit is a hands-on build — no app, no screen, no login. Just tools, parts and a project to finish.",
  },
  {
    icon: "🎓",
    title: "Curriculum-Aligned STEM",
    desc: "Mechanics, photovoltaics and sound frequency, taught through play rather than worksheets — concepts kids actually remember.",
  },
  {
    icon: "🔁",
    title: "Lifetime Replacement Guarantee",
    desc: "Lost a screw or snapped a part mid-build? Tell us and we'll post a free replacement — no receipts, no fuss.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Independent or Together",
    desc: "Clear enough for solo discovery from age 6+, and just as good for a parent-child project on a weekend afternoon.",
  },
];

const COMPARISON = [
  { label: "Screen time", xtronic: "Zero — fully hands-on", typical: "Often required for setup/app" },
  { label: "Skill built", xtronic: "Real mechanics & electronics", typical: "Varies, often passive" },
  { label: "Replacement parts", xtronic: "Free for life", typical: "Rarely offered" },
  { label: "Age range", xtronic: "6+ with adult help if needed", typical: "Often 10+" },
];

export default function WhyXtronicPage() {
  return (
    <>
      <section className="bg-brand-navy py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-4 md:px-6">
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">
            Why XTRONIC KIDZ
          </h1>
          <p className="mt-4 text-brand-blue-50/80">
            We build kits the way we&apos;d want them built for our own kids —
            safe, screen-free, and genuinely educational.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col gap-3 rounded-card bg-surface p-6 border border-line"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue-50 text-2xl">
                {reason.icon}
              </span>
              <h3 className="font-heading text-lg font-bold text-brand-navy">
                {reason.title}
              </h3>
              <p className="text-sm text-brand-navy-700">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-blue-50/60 py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-center font-heading text-3xl font-extrabold text-brand-navy">
            XTRONIC KIDZ vs. a Typical STEM Toy
          </h2>
          <div className="mt-8 overflow-hidden rounded-card border border-line bg-surface">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-brand-navy text-white">
                  <th className="px-4 py-3 font-bold">&nbsp;</th>
                  <th className="px-4 py-3 font-bold">XTRONIC KIDZ</th>
                  <th className="px-4 py-3 font-bold">Typical Kit</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-bold text-brand-navy">{row.label}</td>
                    <td className="px-4 py-3 text-brand-green-700">{row.xtronic}</td>
                    <td className="px-4 py-3 text-muted">{row.typical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 py-16 text-center md:px-6">
        <h2 className="font-heading text-2xl font-extrabold text-brand-navy md:text-3xl">
          Ready to see it in action?
        </h2>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-brand-blue px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
        >
          Explore All Kits
        </Link>
      </section>
    </>
  );
}
