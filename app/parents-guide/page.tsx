import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SignupBand from "@/components/SignupBand";
import Doodled from "@/components/Doodled";
import LineIcon, { type LineIconName } from "@/components/LineIcon";
import { LOGO } from "@/lib/brandColors";

export const metadata: Metadata = {
  title: "Parents' Guide: Age Guidance & Safety Tips",
  description:
    "Everything parents need to know about XTRONIC KIDS kits: age guidance, safety notes, STEM concepts explained, and tips for a smooth first build.",
  alternates: { canonical: "/parents-guide" },
};

const AGE_GUIDANCE: { age: string; title: string; note: string; color: string; icon: LineIconName }[] = [
  { age: "6–7", title: "Little Builders", note: "Best with light adult supervision for the first build.", color: LOGO.blue, icon: "family" },
  { age: "8–10", title: "Young Engineers", note: "Most kids can build independently using the illustrated guide.", color: LOGO.orange, icon: "wrench" },
  { age: "11+", title: "Master Makers", note: "Fully independent, including the Smart Voice-Controlled Robot Kit.", color: LOGO.green, icon: "rocket" },
];

// Concepts with an `image` get large feature cards; `sound` adds animated sound waves.
const CONCEPTS: { term: string; def: string; icon: LineIconName; color: string; image?: string; sound?: boolean }[] = [
  { term: "Photovoltaics", def: "How solar cells convert sunlight directly into electricity.", icon: "sun", color: LOGO.yellow },
  { term: "Mechanics", def: "Gears, levers and linkages that turn motion into movement.", icon: "cog", color: LOGO.blue },
  { term: "Sound Frequency", def: "How sensors detect claps or voice commands as sound waves.", icon: "mic", color: LOGO.red, image: "/products/voice-robot/cutout.png", sound: true },
  { term: "Buoyancy", def: "Why a hull shape keeps a boat floating and stable on water.", icon: "globe", color: LOGO.lightBlue },
  { term: "Aerodynamics", def: "How wing and propeller shape affect lift and thrust.", icon: "send", color: LOGO.orange, image: "/kids/boy-plane.png" },
];

const SAFETY: { icon: LineIconName; text: string }[] = [
  { icon: "x", text: "Contains small parts: not suitable for children under 3 years." },
  { icon: "family", text: "Adult supervision is recommended during assembly." },
  { icon: "shield", text: "Every kit meets Australian toy safety standards." },
  { icon: "book", text: "Read the safety notice included with your kit before building." },
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

/** Small looping animation that acts out each concept. */
function ConceptVisual({ term, color, icon }: { term: string; color: string; icon: LineIconName }) {
  const circle = "relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.14)]";
  if (term === "Photovoltaics")
    return (
      <span className={circle} style={{ background: color }}>
        <span className="anim-sun">
          <LineIcon name="sun" size={28} strokeWidth={2.2} />
        </span>
        <span className="anim-flicker absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-white shadow" style={{ color: LOGO.yellow }}>
          <LineIcon name="zap" size={14} strokeWidth={2.6} />
        </span>
      </span>
    );
  if (term === "Mechanics")
    return (
      <span className={circle} style={{ background: color }}>
        <span className="anim-spin">
          <LineIcon name="cog" size={28} strokeWidth={2.2} />
        </span>
        <span className="anim-spin-rev absolute -right-2 -bottom-1 grid h-7 w-7 place-items-center rounded-full bg-white shadow" style={{ color }}>
          <LineIcon name="cog" size={18} strokeWidth={2.4} />
        </span>
      </span>
    );
  if (term === "Buoyancy")
    return (
      <span className={`${circle} overflow-hidden`} style={{ background: color }}>
        <span className="anim-bob -mt-2">
          <LineIcon name="send" size={22} strokeWidth={2.4} />
        </span>
        <svg aria-hidden viewBox="0 0 80 12" className="anim-wave absolute bottom-2 left-0 h-3 w-[calc(100%+24px)]" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
          <path d="M0 6c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0 8-4 12 0 8 4 12 0 8-4 12 0" />
        </svg>
      </span>
    );
  return (
    <span className={circle} style={{ background: color }}>
      <LineIcon name={icon} size={26} strokeWidth={2.2} />
    </span>
  );
}

function SectionHeading({ children, sub, preset = "left" }: { children: React.ReactNode; sub?: string; preset?: "left" | "right" | "center" | "split" }) {
  return (
    <div className={preset === "center" ? "text-center" : ""}>
      <Doodled preset={preset}>
        <h2 className="text-[clamp(28px,4vw,42px)] font-bold leading-tight tracking-tight">{children}</h2>
      </Doodled>
      {sub && <p className="mt-1.5 font-semibold text-muted sm:text-lg">{sub}</p>}
    </div>
  );
}

export default function ParentsGuidePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-10 pb-12 md:pt-12 md:pb-16"
        style={{ background: "radial-gradient(900px 500px at 80% 20%, #fff 0%, transparent 60%), linear-gradient(180deg, #cfe9ff 0%, #e9f5ff 55%, #f8fafc 100%)" }}
      >
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-8 px-4 md:grid-cols-[1.1fr_1fr] md:px-6">
          <div>
            <h1 className="-rotate-2 font-heading text-[clamp(48px,8vw,92px)] font-bold uppercase leading-[0.92] tracking-tight">
              <span className="text-comic block" style={{ color: LOGO.blue, "--comic-stroke": "#fff", "--comic-shadow": "rgba(13,31,53,0.25)" } as React.CSSProperties}>
                Parents&apos;
              </span>
              <span className="text-comic block" style={{ color: LOGO.yellow, "--comic-stroke": LOGO.blue, "--comic-shadow": "rgba(1,119,222,0.3)" } as React.CSSProperties}>
                Guide
              </span>
            </h1>
            <p
              className="mt-4 ribbon-shine inline-block -rotate-2 rounded-xl px-5 py-2.5 font-heading text-lg font-bold text-white shadow-[0_6px_0_rgba(13,31,53,0.18)] sm:text-xl"
              style={{ background: `linear-gradient(90deg, ${LOGO.red}, ${LOGO.orange})` }}
            >
              Everything You Need Before the First Build!
            </p>
            <p className="mt-5 max-w-lg text-base font-semibold text-brand-navy-700 sm:text-lg">
              Age guidance, safety information and the STEM concepts behind every kit, everything you need before
              your child&apos;s first build.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[["Age Guidance", "#ages"], ["STEM Concepts", "#concepts"], ["Safety", "#safety"], ["FAQs", "#faq"]].map(([label, href]) => (
                <a key={href} href={href} className="rounded-btn border-2 border-line bg-white px-4 py-2 text-sm font-extrabold text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-[5/4] w-full max-w-[460px]">
            <div aria-hidden className="absolute inset-[4%] rounded-full" style={{ background: "radial-gradient(circle, #fff 0%, #d6ecff 60%, transparent 75%)" }} />
            <Image src="/kids/girl-magnifier.png" alt="Girl taking a closer look through a magnifying glass" fill priority sizes="(min-width: 768px) 460px, 90vw" className="object-contain drop-shadow-[0_16px_20px_rgba(13,31,53,0.2)]" />
            <div
              aria-hidden
              className="absolute -top-2 right-0 rotate-[8deg] speech-bubble rounded-[44%] border-[3px] border-brand-navy bg-white px-4 py-2.5 text-center font-heading text-base font-bold leading-[1.05] shadow-[4px_5px_0_rgba(13,31,53,0.15)] sm:text-lg"
            >
              <span style={{ color: LOGO.blue }}>Learn</span>
              <br />
              <span style={{ color: LOGO.red }}>Together!</span>
              <span className="absolute -bottom-2.5 left-6 h-5 w-5 rotate-45 border-r-[3px] border-b-[3px] border-brand-navy bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Age guidance ── */}
      <section id="ages" aria-labelledby="ages-heading" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 pt-16 md:px-6">
        <div id="ages-heading">
          <SectionHeading preset="center" sub="How much help to expect at each age.">
            <span style={{ color: LOGO.blue }}>Age</span> <span style={{ color: LOGO.orange }}>Guidance</span>
          </SectionHeading>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {AGE_GUIDANCE.map((row) => (
            <li key={row.age} className="group overflow-hidden rounded-card border-[3px] bg-white text-center shadow-[0_10px_30px_-14px_rgba(14,30,63,0.25)] transition-[translate] duration-300 hover:-translate-y-1.5" style={{ borderColor: row.color }}>
              <div className="relative grid h-32 place-items-center" style={{ background: `radial-gradient(circle at 50% 40%, #fff 0%, color-mix(in srgb, ${row.color} 22%, white) 75%)` }}>
                <span className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-[inset_0_-5px_0_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" style={{ background: row.color }}>
                  <LineIcon name={row.icon} size={38} strokeWidth={2} />
                </span>
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full px-4 py-1 font-heading text-2xl font-bold text-white shadow" style={{ background: row.color }}>
                  {row.age}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold text-brand-navy">{row.title}</h3>
                <p className="mt-1 text-sm font-semibold text-muted">{row.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── STEM concepts ── */}
      <section id="concepts" aria-labelledby="concepts-heading" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 pt-16 md:px-6">
        <div id="concepts-heading">
          <SectionHeading preset="split" sub="The real science your child learns while building.">
            <span style={{ color: LOGO.blue }}>STEM Concepts,</span> <span style={{ color: LOGO.orange }}>Explained</span>
          </SectionHeading>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {CONCEPTS.filter((c) => c.image).map((c) => (
            <div
              key={c.term}
              className="group relative flex min-h-[200px] items-center overflow-hidden rounded-card border-[3px] bg-white p-5 pr-[46%] shadow-[0_10px_30px_-14px_rgba(14,30,63,0.25)] transition-[translate] duration-300 hover:-translate-y-1.5"
              style={{ borderColor: c.color }}
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.14)]" style={{ background: c.color }}>
                  <LineIcon name={c.icon} size={22} strokeWidth={2.2} />
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-brand-navy">{c.term}</h3>
                <p className="mt-1 text-sm font-semibold text-muted">{c.def}</p>
              </div>
              <div
                aria-hidden
                className="absolute inset-y-0 right-0 w-[44%] overflow-hidden"
                style={{ background: `radial-gradient(circle at 60% 55%, #fff 0%, color-mix(in srgb, ${c.color} 18%, white) 75%)` }}
              >
                {c.sound && (
                  <>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="sound-ring absolute left-1/2 top-[52%] h-20 w-20 sm:h-24 sm:w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px]"
                        style={{ borderColor: c.color, animationDelay: `${i * 0.6}s` }}
                      />
                    ))}
                    <span className="absolute left-2 top-3 z-10 -rotate-12 rounded-[40%] border-[3px] border-brand-navy bg-white px-2.5 py-1 font-heading text-sm font-bold shadow-[3px_3px_0_rgba(13,31,53,0.15)]" style={{ color: c.color }}>
                      CLAP!
                    </span>
                  </>
                )}
                {!c.sound && (
                  <>
                    {[18, 34, 50].map((top, i) => (
                      <span key={top} className="anim-wind absolute right-2 h-[3px] w-10 rounded-full" style={{ top: `${top}%`, background: c.color, animationDelay: `${i * 0.5}s` }} />
                    ))}
                  </>
                )}
                <Image
                  src={c.image!}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 260px, 45vw"
                  className={`object-contain transition-transform duration-300 group-hover:scale-105 ${c.sound ? "object-center p-2 sm:p-6" : "anim-fly object-bottom pt-3"}`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CONCEPTS.filter((c) => !c.image).map((c, i, all) => (
            <div
              key={c.term}
              className={`group flex flex-col items-center rounded-card border-2 border-line bg-white px-3 py-5 text-center transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_30px_-14px_rgba(14,30,63,0.3)] ${i === all.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">
                <ConceptVisual term={c.term} color={c.color} icon={c.icon} />
              </span>
              <h3 className="mt-3 text-[15px] font-semibold text-brand-navy">{c.term}</h3>
              <p className="mt-1 text-xs font-semibold text-muted">{c.def}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Safety + FAQ ── */}
      <section aria-label="Safety and questions" className="mx-auto max-w-[1200px] px-4 pt-16 md:px-6">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div id="safety" className="scroll-mt-24 rounded-[26px] p-6 text-brand-navy shadow-[0_10px_0_var(--color-brand-yellow-600)] sm:p-7" style={{ background: "linear-gradient(160deg, #FFE27A, #FFD03A)" }}>
            <h2 className="flex items-center gap-2 text-[clamp(26px,3vw,34px)] font-bold leading-tight" style={{ color: LOGO.blue }}>
              <span style={{ color: LOGO.red }}>
                <LineIcon name="shield" size={32} strokeWidth={2.2} />
              </span>
              Safety First
            </h2>
            <ul className="mt-4 grid gap-3">
              {SAFETY.map((s) => (
                <li key={s.text} className="flex items-start gap-3 font-bold">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white shadow" style={{ color: LOGO.red }}>
                    <LineIcon name={s.icon} size={16} strokeWidth={2.4} />
                  </span>
                  <span className="pt-1">{s.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="faq" className="scroll-mt-24">
            <SectionHeading preset="right">
              <span style={{ color: LOGO.blue }}>Parent</span> <span style={{ color: LOGO.orange }}>FAQs</span>
            </SectionHeading>
            <div className="mt-6 grid gap-3">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border-2 border-line bg-white px-5 py-4 transition-colors open:border-brand-blue">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-extrabold text-brand-navy [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-blue-50 text-lg leading-none text-brand-blue transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm font-semibold text-muted">{faq.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="btn-brick inline-flex items-center gap-2 rounded-btn bg-brand-amber px-6 py-3 font-heading text-sm font-semibold text-white"
                style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
              >
                Explore All Kits <span aria-hidden>→</span>
              </Link>
              <Link href="/help/faq" className="inline-flex items-center gap-1.5 rounded-btn border-2 border-brand-blue px-5 py-2.5 font-heading text-sm font-semibold text-brand-blue hover:bg-brand-blue hover:text-white">
                See all FAQs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SignupBand />
    </>
  );
}
