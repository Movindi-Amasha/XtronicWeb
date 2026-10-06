import Image from "next/image";

type Tone = "blue" | "yellow";

const TONE_STYLES: Record<Tone, string> = {
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow text-brand-navy",
};

const STEPS: { n: string; icon: string; title: string; desc: string; tone: Tone }[] = [
  { n: "1", icon: "📦", title: "Choose your kit", desc: "Pick a robot, car, boat, plane or butterfly.", tone: "blue" },
  { n: "2", icon: "🔧", title: "Build it", desc: "Follow the colourful picture guide step by step.", tone: "yellow" },
  { n: "3", icon: "💡", title: "Discover", desc: "Learn the science of motors, solar and circuits.", tone: "blue" },
  { n: "4", icon: "🎮", title: "Play & test", desc: "Race it, sail it, fly it and experiment.", tone: "yellow" },
  { n: "5", icon: "🏆", title: "Create again", desc: "Remix parts into brand-new inventions.", tone: "blue" },
];

export default function HowItWorksSteps() {
  return (
    <section id="how" aria-labelledby="how-it-works-heading" className="mx-auto max-w-[1200px] px-4 pt-24 md:px-6">
      <div
        className="rounded-[40px] px-5 py-14 sm:px-10 md:py-16"
        style={{ background: "linear-gradient(180deg, var(--color-brand-blue-50), #fff)" }}
      >
        <div className="relative flex flex-col items-center text-center">
          <div className="pointer-events-none absolute -top-10 right-0 hidden h-28 w-28 sm:block md:-top-14 md:right-[6%] md:h-36 md:w-36">
            <Image src="/mascot/pointing.png" alt="" fill sizes="144px" className="object-contain" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand-amber">
            Simple as 1-2-3-4-5
          </span>
          <h2 id="how-it-works-heading" className="mt-2 text-[clamp(32px,4vw,48px)] font-bold tracking-tight text-brand-navy">
            How it <span className="text-brand-blue">works</span>
          </h2>
          <p className="mt-2.5 text-lg font-semibold text-muted">
            From box to brilliant creation in one afternoon.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="relative rounded-card border-2 border-line bg-white px-4 py-7 text-center shadow-[0_10px_30px_-12px_rgba(14,30,63,0.18)]"
            >
              <span
                className={`absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-[10px] font-heading text-sm font-bold text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)] ${TONE_STYLES[step.tone]}`}
              >
                {step.n}
              </span>
              <span className="mb-2.5 block text-4xl">{step.icon}</span>
              <h3 className="text-[18px] font-semibold text-brand-navy">{step.title}</h3>
              <p className="mt-1.5 text-[14.5px] font-semibold text-muted">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-1/2 -right-[18px] hidden h-1 w-4 -translate-y-1/2 rounded bg-[repeating-linear-gradient(90deg,var(--color-brand-blue)_0_4px,transparent_4px_7px)] lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
