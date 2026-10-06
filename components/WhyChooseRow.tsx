import Image from "next/image";
import Link from "next/link";

type Tone = "blue" | "yellow" | "amber" | "green";

const TONE_STYLES: Record<Tone, string> = {
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow text-brand-navy",
  amber: "bg-brand-amber",
  green: "bg-brand-green",
};

const ITEMS: { icon: string; title: string; desc: string; tone: Tone }[] = [
  { icon: "🔬", title: "Real STEM skills", desc: "Science, technology, engineering and maths, learned by doing.", tone: "blue" },
  { icon: "🧩", title: "Creative thinking", desc: "Open-ended builds that build problem-solving muscles.", tone: "yellow" },
  { icon: "📵", title: "Screen-free play", desc: "Hours of focused, hands-on fun away from devices.", tone: "amber" },
  { icon: "🛡️", title: "Safe & durable", desc: "Non-toxic, child-safe parts that stand up to real play.", tone: "green" },
];

const STATS = [
  { value: "5", label: "STEM kits" },
  { value: "4.9/5", label: "Parent rating" },
  { value: "6+", label: "Suitable ages" },
];

export default function WhyChooseRow() {
  return (
    <section id="why" aria-labelledby="why-choose-heading" className="mx-auto max-w-[1200px] px-4 pt-24 md:px-6">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand-amber">
            More than a toy
          </span>
          <h2 id="why-choose-heading" className="mt-2 text-[clamp(32px,4vw,48px)] font-bold tracking-tight text-brand-navy">
            Why parents choose <span className="text-brand-blue">XTRONIC</span>
          </h2>
          <p className="mt-2.5 text-lg font-semibold text-muted">
            Designed with teachers, tested by kids, loved by parents.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex gap-3.5 rounded-card border-2 border-transparent bg-canvas p-4.5 transition-colors hover:border-line hover:bg-white"
              >
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.12)] ${TONE_STYLES[item.tone]}`}>
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-brand-navy">{item.title}</h3>
                  <p className="mt-1 text-[14.5px] font-semibold text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="relative overflow-hidden rounded-[32px] p-9 text-white shadow-[0_12px_0_var(--color-brand-blue-600),0_24px_60px_-20px_rgba(14,30,63,0.28)]"
            style={{ background: "linear-gradient(150deg, var(--color-brand-blue), var(--color-brand-blue-600))" }}
          >
            <div aria-hidden className="studs-texture" />
            <div className="relative grid grid-cols-3 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/12 p-4 text-center backdrop-blur-sm">
                  <strong className="block font-heading text-2xl text-brand-yellow">{s.value}</strong>
                  <span className="text-[13px] font-bold opacity-90">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="relative mt-7 font-heading text-2xl font-semibold leading-tight">
              &ldquo;Learning today for a <span className="text-brand-yellow">brighter tomorrow</span>.&rdquo;
            </p>
            <Link
              href="/shop"
              className="btn-brick relative mt-6 inline-flex items-center gap-2 rounded-btn bg-brand-yellow px-6 py-3 font-heading text-sm font-semibold text-brand-navy"
              style={{ "--btn-brick-shadow": "var(--color-brand-yellow-600)" } as React.CSSProperties}
            >
              Start building →
            </Link>
          </div>

          <div className="pointer-events-none absolute -top-8 -right-5 z-20 hidden h-28 w-28 rotate-6 sm:block">
            <Image src="/mascot/thumbs-up-confetti.png" alt="" fill sizes="112px" className="object-contain drop-shadow-[0_10px_14px_rgba(14,30,63,0.35)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
