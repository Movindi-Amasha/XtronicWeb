import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why XTRONIC",
  description:
    "The story behind XTRONIC KIDZ and why parents, teachers and kids choose us for hands-on STEM learning.",
};

type Tone = "navy" | "surface" | "amber";

const REASONS: { eyebrow: string; title: string; desc: string; tone: Tone; span?: 1 | 2 }[] = [
  {
    eyebrow: "No Screens",
    title: "Screen-Free Interactive Fun",
    desc: "Every kit is a hands-on build, no app, no screen, no login. Just tools, parts and a project to finish.",
    tone: "navy",
    span: 2,
  },
  {
    eyebrow: "Real Concepts",
    title: "Curriculum-Aligned STEM",
    desc: "Mechanics, photovoltaics and sound frequency, taught through play rather than worksheets.",
    tone: "surface",
  },
  {
    eyebrow: "Guarantee",
    title: "Lifetime Replacement",
    desc: "Lost a screw or snapped a part mid-build? We'll post a free replacement, no receipts, no fuss.",
    tone: "amber",
  },
  {
    eyebrow: "Together or Solo",
    title: "Independent or Together",
    desc: "Clear enough for solo discovery from age 6+, and just as good for a weekend parent-child project.",
    tone: "surface",
    span: 2,
  },
];

const TONE_STYLES: Record<Tone, string> = {
  navy: "bg-brand-navy text-white",
  surface: "bg-surface text-brand-navy border border-line",
  amber: "bg-brand-amber text-brand-navy",
};

const COMPARISON = [
  { label: "Screen time", xtronic: "Zero, fully hands-on", typical: "Often required for setup/app" },
  { label: "Skill built", xtronic: "Real mechanics & electronics", typical: "Varies, often passive" },
  { label: "Replacement parts", xtronic: "Free for life", typical: "Rarely offered" },
  { label: "Age range", xtronic: "6+ with adult help if needed", typical: "Often 10+" },
];

const VALUES = [
  "Ships to Australia & Sri Lanka",
  "Child-safety tested materials",
  "Lifetime part replacement",
  "STEM-curriculum aligned",
];

export default function WhyXtronicPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy py-20 text-center text-white">
        <div className="relative mx-auto max-w-2xl px-4 md:px-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-blue-50/60">
            About XTRONIC KIDZ
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold md:text-5xl">
            Why XTRONIC KIDZ
          </h1>
          <p className="mt-4 text-brand-blue-50/80">
            We build kits the way we&apos;d want them built for our own kids,
            safe, screen-free, and genuinely educational.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-4 py-16 text-center md:px-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-blue-600">
          Our Story
        </p>
        <h2 className="mt-2 font-heading text-2xl font-bold text-brand-navy md:text-3xl">
          Years of hands-on electronics, rebuilt for curious kids.
        </h2>
        <p className="mt-5 text-brand-navy-700">
          XTRONIC KIDZ carries on a project that started back in 2018 as
          Digicocoon, a small kit-building venture for makers and students.
          Word spread fast, sales grew fivefold within a few years, and the
          project went through two rebrands, first to Ravana PCB in early
          2022, then to XTRONIC later that same year, growing into a full
          development platform for coding, electronics and robotics along
          the way.
        </p>
        <p className="mt-4 text-brand-navy-700">
          XTRONIC KIDZ is that same project&apos;s next chapter, rebuilt from
          the ground up for builders aged 6 and up. No apps, no logins, just
          solar panels, gearboxes and wires that actually do something the
          moment you finish building them. Founded and still led by Thimith
          Navodya, XTRONIC KIDZ ships across Australia and Sri Lanka, is
          tested for child safety, and comes with a lifetime guarantee on small parts,
          because a missing screw shouldn&apos;t be the reason a build never
          gets finished.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {VALUES.map((value) => (
            <span
              key={value}
              className="rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs font-medium uppercase tracking-wide text-brand-navy"
            >
              {value}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1260px] px-4 py-16 md:px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-brand-navy md:text-3xl">
          What Makes Us Different
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className={`flex flex-col gap-3 rounded-card p-6 ${TONE_STYLES[reason.tone]} ${
                reason.span === 2 ? "lg:col-span-2" : ""
              }`}
            >
              <p className="font-mono text-[10px] font-medium uppercase tracking-wide opacity-70">
                {reason.eyebrow}
              </p>
              <h3 className="font-heading text-lg font-bold">{reason.title}</h3>
              <p className="text-sm opacity-80">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-blue-50/60 py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-brand-navy md:text-3xl">
            XTRONIC KIDZ vs. a Typical STEM Toy
          </h2>
          <div className="mt-8 overflow-hidden rounded-card border border-line bg-surface">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-brand-navy text-white">
                  <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide">&nbsp;</th>
                  <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide">XTRONIC KIDZ</th>
                  <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide">Typical Kit</th>
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
        <h2 className="font-heading text-2xl font-bold text-brand-navy md:text-3xl">
          Ready to see it in action?
        </h2>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-btn bg-brand-blue px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
        >
          Explore All Kits
        </Link>
      </section>
    </>
  );
}
