import type { Metadata } from "next";
import Link from "next/link";
import SignupBand from "@/components/SignupBand";
import HeroScene from "@/components/HeroScene";
import Doodled from "@/components/Doodled";
import LineIcon from "@/components/LineIcon";
import { LOGO, band } from "@/lib/brandColors";

export const metadata: Metadata = {
  title: "Our Works Gallery | XTRONIC KIDS",
  description:
    "Explore the robots, solar builds and creative STEM projects young makers create with XTRONIC KIDS kits.",
  alternates: { canonical: "/gallery" },
};

const COLLECTIONS = [
  {
    id: "robot-builds",
    title: "Robot Builds",
    subtitle: "Little engineers, big ideas.",
    color: LOGO.blue,
    emoji: "🤖",
    projects: ["Robots in action", "Meet the machine", "Build-day moment"],
  },
  {
    id: "solar-creations",
    title: "Solar Creations",
    subtitle: "Powered by sunshine and curiosity.",
    color: LOGO.orange,
    emoji: "☀️",
    projects: ["Sun-powered adventures", "Ready to roll", "A bright idea"],
  },
  {
    id: "young-makers",
    title: "Young Makers",
    subtitle: "The proud smiles behind every creation.",
    color: LOGO.green,
    emoji: "✨",
    projects: ["Proud project reveal", "Making it together", "Future inventor"],
  },
];

function PhotoPlaceholder({ title, color, emoji }: { title: string; color: string; emoji: string }) {
  return (
    <div
      className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[18px] border-2 border-dashed bg-white/75"
      style={{ borderColor: `color-mix(in srgb, ${color} 42%, white)` }}
      role="img"
      aria-label={`${title} photo placeholder`}
    >
      <div aria-hidden className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 15% 20%, color-mix(in srgb, ${color} 15%, white), transparent 45%), radial-gradient(circle at 85% 85%, color-mix(in srgb, ${LOGO.yellow} 18%, white), transparent 42%)` }} />
      <span aria-hidden className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      <span aria-hidden className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-brand-yellow" />
      <span className="relative flex flex-col items-center gap-2 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-white bg-white/90 text-3xl shadow-sm" aria-hidden>
          {emoji}
        </span>
        <span className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-brand-navy/55">Photo coming soon</span>
      </span>
      <span className="absolute bottom-3 right-4 font-mono text-[10px] font-bold tracking-widest text-brand-navy/35" aria-hidden>
        IMAGE PLACEHOLDER
      </span>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#e9f5ff] to-white pt-12 pb-14 md:pt-20 md:pb-20">
        <HeroScene decor="gallery" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-9 px-4 md:grid-cols-[1.05fr_0.95fr] md:px-6">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue shadow-sm">
              <LineIcon name="sparkles" size={16} /> Made by curious minds
            </p>
            <Doodled preset="left">
              <h1 className="font-heading text-[clamp(44px,7vw,78px)] font-bold leading-[0.95] tracking-tight">
                <span className="text-comic block" style={{ color: LOGO.blue, "--comic-stroke": "#fff", "--comic-shadow": "rgba(13,31,53,0.18)" } as React.CSSProperties}>Our Works</span>
                <span className="text-comic block" style={{ color: LOGO.orange, "--comic-stroke": "#fff", "--comic-shadow": "rgba(13,31,53,0.18)" } as React.CSSProperties}>Gallery!</span>
              </h1>
            </Doodled>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-brand-navy-700 sm:text-xl">
              Tiny hands, big imaginations. Take a peek at the robots, solar builds and brilliant ideas made with XTRONIC KIDS.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#gallery-collections" className="btn-brick inline-flex items-center gap-2 rounded-btn bg-brand-amber px-5 py-3 font-heading font-semibold text-white" style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}>
                Explore the gallery <span aria-hidden>↓</span>
              </a>
              <Link href="/shop" className="inline-flex items-center gap-2 rounded-btn border-2 border-white bg-white/90 px-5 py-3 font-heading font-semibold text-brand-blue shadow-sm transition-transform hover:-translate-y-0.5">
                Find your next kit <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div aria-hidden className="absolute -left-4 top-8 h-20 w-20 rounded-[26px] bg-brand-yellow/80 rotate-[-12deg]" />
            <div aria-hidden className="absolute -right-3 bottom-4 h-24 w-24 rounded-full bg-brand-green/15" />
            <div className="relative rotate-[1deg] rounded-[30px] border-[5px] border-white bg-white p-2 shadow-[0_22px_55px_-22px_rgba(13,31,53,0.3)]">
              <PhotoPlaceholder title="Featured XTRONIC creation" color={LOGO.blue} emoji="🚀" />
            </div>
            <div className="scatter-float absolute -right-2 -top-5 grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-brand-amber text-2xl text-white shadow-lg sm:-right-5 sm:top-2" aria-hidden>
              ✦
            </div>
            <div className="absolute -bottom-5 left-5 rotate-[-4deg] rounded-xl border-2 border-white bg-white px-4 py-2 font-heading text-sm font-bold text-brand-navy shadow-md sm:left-10">
              <span style={{ color: LOGO.blue }}>Build</span> <span style={{ color: LOGO.orange }}>•</span> <span style={{ color: LOGO.green }}>Learn</span> <span style={{ color: LOGO.orange }}>•</span> Play!
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pt-12 md:px-6" aria-label="Gallery highlights">
        <div className="grid grid-cols-1 gap-3 rounded-[24px] border border-white bg-white/80 p-4 shadow-[0_12px_35px_-25px_rgba(13,31,53,0.35)] sm:grid-cols-3 sm:p-5">
          {[
            { icon: "package" as const, title: "Hands-on builds", detail: "Made one piece at a time", color: LOGO.blue },
            { icon: "bulb" as const, title: "Bright ideas", detail: "Curiosity in action", color: LOGO.orange },
            { icon: "family" as const, title: "Made together", detail: "A little help, lots of joy", color: LOGO.green },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 rounded-2xl px-3 py-2 sm:justify-center">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-blue-50" style={{ color: item.color }}>
                <LineIcon name={item.icon} size={23} strokeWidth={2} />
              </span>
              <span><strong className="block font-heading text-sm text-brand-navy">{item.title}</strong><span className="text-xs font-semibold text-muted">{item.detail}</span></span>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery-collections" className="band mt-10 px-4 pt-16 md:px-6" style={band("sky")}>
        <div className="relative mx-auto max-w-[1200px]">
          <Doodled preset="center">
            <h2 className="text-center text-[clamp(30px,4vw,44px)] font-bold tracking-tight text-brand-navy">
              A little inspiration, <span style={{ color: LOGO.blue }}>a lot of imagination</span>
            </h2>
          </Doodled>
          <p className="mx-auto mt-2 max-w-2xl text-center font-semibold text-muted">Browse the kinds of moments we can&apos;t wait to fill with your young maker&apos;s creations.</p>
          <nav aria-label="Gallery collections" className="mt-6 flex flex-wrap justify-center gap-2">
            {COLLECTIONS.map((collection) => (
              <a key={collection.id} href={`#${collection.id}`} className="rounded-full border-2 border-white bg-white/85 px-4 py-2 text-sm font-extrabold shadow-sm transition-transform hover:-translate-y-0.5" style={{ color: collection.color }}>
                {collection.emoji} {collection.title}
              </a>
            ))}
          </nav>

          <div className="mt-10 space-y-12">
            {COLLECTIONS.map((collection) => (
              <section key={collection.id} id={collection.id} aria-labelledby={`${collection.id}-heading`} className="scroll-mt-28 rounded-[28px] border border-white/80 bg-white/60 p-4 shadow-[0_15px_45px_-35px_rgba(13,31,53,0.35)] sm:p-6">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 id={`${collection.id}-heading`} className="font-heading text-2xl font-bold sm:text-3xl" style={{ color: collection.color }}>{collection.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-muted">{collection.subtitle}</p>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider" style={{ color: collection.color, background: `color-mix(in srgb, ${collection.color} 10%, white)` }}>Photo slots open</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {collection.projects.map((project, index) => (
                    <article key={project} className="group rounded-[22px] border border-white bg-white p-2.5 shadow-[0_8px_22px_-16px_rgba(13,31,53,0.35)] transition-[translate,scale,box-shadow] duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_18px_32px_-20px_rgba(13,31,53,0.4)]">
                      <PhotoPlaceholder title={project} color={collection.color} emoji={collection.emoji} />
                      <div className="flex items-center justify-between gap-2 px-2 pb-1 pt-3">
                        <div><h4 className="font-heading text-sm font-bold text-brand-navy">{project}</h4><p className="mt-0.5 text-xs font-semibold text-muted">Your next creation could be here</p></div>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold text-white" style={{ background: collection.color }}>{String(index + 1).padStart(2, "0")}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pt-16 md:px-6">
        <div className="relative overflow-hidden rounded-[30px] border-2 border-white bg-gradient-to-br from-brand-amber-50 via-white to-brand-blue-50 px-6 py-8 text-center shadow-[0_18px_45px_-30px_rgba(13,31,53,0.35)] sm:px-10 sm:py-10">
          <span className="scatter-float absolute left-[8%] top-5 text-3xl text-brand-amber" aria-hidden>✦</span>
          <span className="scatter-drift absolute right-[8%] top-8 text-3xl text-brand-blue" aria-hidden>✧</span>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-brand-amber">Ready, set, create!</p>
          <h2 className="mt-2 text-[clamp(26px,4vw,38px)] font-bold leading-tight text-brand-navy">Your next masterpiece starts with a kit.</h2>
          <p className="mx-auto mt-2 max-w-xl font-semibold text-muted">Choose a project, build it together, and make a memory worth sharing.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn-brick rounded-btn bg-brand-blue px-5 py-3 font-heading font-semibold text-white" style={{ "--btn-brick-shadow": "var(--color-brand-blue-600)" } as React.CSSProperties}>Shop STEM Kits →</Link>
            <Link href="/how-it-works" className="rounded-btn border-2 border-white bg-white px-5 py-3 font-heading font-semibold text-brand-navy shadow-sm hover:text-brand-blue">See how it works</Link>
          </div>
        </div>
      </section>

      <SignupBand />
    </>
  );
}
