import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description: "From unboxing to mastering the STEM concepts behind your build, here's how an XTRONIC KIDZ kit works.",
};

const STEPS = [
  {
    n: 1,
    title: "Unbox & Discover",
    icon: "📦",
    desc: "Open your kit and lay out every part using the illustrated guide. Each piece is numbered and labelled, nothing to guess.",
    detail: "No tools beyond what's in the box. Every kit is pre-sorted into labelled bags so nothing gets lost before you even start.",
  },
  {
    n: 2,
    title: "Build & Connect",
    icon: "🔧",
    desc: "Snap, screw and wire the pieces together, no glue, no mess. Step-by-step photos guide every stage.",
    detail: "Snap-fit connectors and pre-threaded screws mean builds typically take 30–90 minutes depending on the kit.",
  },
  {
    n: 3,
    title: "Power Up",
    icon: "⚡",
    desc: "Charge it with sunlight or batteries and watch it come to life for the first time.",
    detail: "Solar kits work best in direct sun or under a bright lamp; electronic kits use standard AA/AAA batteries (not included).",
  },
  {
    n: 4,
    title: "Play & Master",
    icon: "🎉",
    desc: "Test, tweak and master the STEM concepts behind the build, then take it apart and build it again.",
    detail: "Every kit includes a short 'how it works' explainer so kids connect what they built to the real-world science behind it.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-brand-navy py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-4 md:px-6">
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">
            How It Works
          </h1>
          <p className="mt-4 text-brand-blue-50/80">
            Four simple steps from box to build to genuine STEM understanding.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-4 py-16 md:px-6">
        <div className="flex flex-col gap-8">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex flex-col gap-4 rounded-card bg-surface p-6 border border-line sm:flex-row sm:items-start sm:gap-6"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-blue text-3xl text-white">
                {step.icon}
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-brand-blue-600">
                  Step {step.n}
                </span>
                <h2 className="mt-1 font-heading text-xl font-bold text-brand-navy">
                  {step.title}
                </h2>
                <p className="mt-2 text-brand-navy-700">{step.desc}</p>
                <p className="mt-2 text-sm text-muted">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <h2 className="font-heading text-2xl font-extrabold text-brand-navy">
            Ready to unbox your first kit?
          </h2>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-brand-amber px-7 py-3.5 text-base font-bold uppercase tracking-wide text-brand-navy transition-transform hover:-translate-y-0.5 hover:opacity-90"
          >
            Explore All Kits
          </Link>
        </div>
      </section>
    </>
  );
}
