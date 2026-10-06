import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description: "From unboxing to mastering the STEM concepts behind your build, here's how an XTRONIC KIDZ kit works.",
};

type Tone = "blue" | "amber";

const TONE_STYLES: Record<Tone, string> = {
  blue: "bg-brand-blue",
  amber: "bg-brand-amber text-brand-navy",
};

const STEPS: { n: number; title: string; icon: string; desc: string; detail: string; tone: Tone }[] = [
  {
    n: 1,
    title: "Unbox & Discover",
    icon: "📦",
    desc: "Open your kit and lay out every part using the illustrated guide. Each piece is numbered and labelled, nothing to guess.",
    detail: "No tools beyond what's in the box. Every kit is pre-sorted into labelled bags so nothing gets lost before you even start.",
    tone: "blue",
  },
  {
    n: 2,
    title: "Build & Connect",
    icon: "🔧",
    desc: "Snap, screw and wire the pieces together, no glue, no mess. Step-by-step photos guide every stage.",
    detail: "Snap-fit connectors and pre-threaded screws mean builds typically take 30–90 minutes depending on the kit.",
    tone: "amber",
  },
  {
    n: 3,
    title: "Power Up",
    icon: "⚡",
    desc: "Charge it with sunlight or batteries and watch it come to life for the first time.",
    detail: "Solar kits work best in direct sun or under a bright lamp; electronic kits use standard AA/AAA batteries (not included).",
    tone: "blue",
  },
  {
    n: 4,
    title: "Play & Master",
    icon: "🎉",
    desc: "Test, tweak and master the STEM concepts behind the build, then take it apart and build it again.",
    detail: "Every kit includes a short 'how it works' explainer so kids connect what they built to the real-world science behind it.",
    tone: "amber",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-blue-50 py-16">
        <span aria-hidden className="absolute left-[10%] top-8 text-lg text-brand-blue/40">✦</span>
        <span aria-hidden className="absolute right-[6%] top-6 h-2.5 w-2.5 rounded-full bg-brand-amber/35" />
        <span aria-hidden className="absolute left-[4%] bottom-10 h-2 w-2 rounded-full bg-brand-amber/35" />
        <span aria-hidden className="absolute right-[12%] bottom-6 text-xl text-brand-blue/35">✦</span>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center md:flex-row-reverse md:px-6 md:text-right">
          <div className="flex-1">
            <h1 className="font-heading text-4xl font-bold text-brand-navy md:text-5xl">
              How It <span className="text-brand-blue">Works</span>
            </h1>
            <p className="mt-4 text-brand-navy-700">
              Four simple steps from box to build to genuine STEM understanding.
            </p>
          </div>
          <div className="relative h-64 w-64 shrink-0 sm:h-80 sm:w-80 md:h-[22rem] md:w-[22rem]">
            <Image
              src="/mascot/mascot-pointing-robot.png"
              alt=""
              fill
              sizes="352px"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-4 py-16 md:px-6">
        <div className="flex flex-col gap-10">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="relative flex flex-col gap-4 rounded-card border-2 border-line bg-surface p-6 shadow-sm sm:flex-row sm:items-start sm:gap-6"
            >
              <span
                className={`absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-bold shadow-sm ${TONE_STYLES[step.tone]}`}
              >
                {step.n}
              </span>
              <span className="mt-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-canvas text-3xl sm:mt-0">
                {step.icon}
              </span>
              <div>
                <h2 className="font-heading text-xl font-bold text-brand-navy">
                  {step.title}
                </h2>
                <p className="mt-2 text-brand-navy-700">{step.desc}</p>
                <p className="mt-2 text-sm text-muted">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-heading text-2xl font-bold text-brand-navy">
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
