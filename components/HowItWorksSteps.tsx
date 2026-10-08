import Image from "next/image";

type Tone = "blue" | "yellow";

const TONE_STYLES: Record<Tone, string> = {
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow text-brand-navy",
};

// anim = which step-icon-* animation (globals.css) the icon plays on hover.
const STEPS: { n: string; icon: string; anim: string; title: string; desc: string; tone: Tone }[] = [
  { n: "1", anim: "hop", icon: "📦", title: "Choose your kit", desc: "Pick a robot, car, boat, plane or butterfly.", tone: "blue" },
  { n: "2", anim: "twist", icon: "🔧", title: "Build it", desc: "Follow the colourful picture guide step by step.", tone: "yellow" },
  { n: "3", anim: "glow", icon: "💡", title: "Discover", desc: "Learn the science of motors, solar and circuits.", tone: "blue" },
  { n: "4", anim: "mash", icon: "🎮", title: "Play & test", desc: "Race it, sail it, fly it and experiment.", tone: "yellow" },
  { n: "5", anim: "cheer", icon: "🏆", title: "Create again", desc: "Remix parts into brand-new inventions.", tone: "blue" },
];

export default function HowItWorksSteps() {
  return (
    <section id="how" aria-labelledby="how-it-works-heading" className="mx-auto max-w-[1200px] px-4 pt-24 md:px-6">
      <div
        className="rounded-[32px] px-5 py-10 sm:rounded-[40px] sm:px-10 sm:py-14 md:py-16"
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

        <ol className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="step-card relative flex cursor-default items-center gap-4 rounded-card border-2 border-line bg-white py-4 pr-4 pl-5 text-left transition-[translate,scale,box-shadow,border-color] duration-300 ease-out hover:z-10 hover:-translate-y-2 hover:scale-[1.06] hover:border-brand-blue hover:shadow-[0_24px_40px_-16px_rgba(31,111,229,0.4)] sm:block sm:px-4 sm:py-7 sm:text-center shadow-[0_10px_30px_-12px_rgba(14,30,63,0.18)]"
            >
              <span
                className={`step-badge absolute -top-2 -left-2 flex h-7 w-7 items-center sm:-top-4 sm:left-1/2 sm:h-8 sm:w-8 sm:-translate-x-1/2 justify-center rounded-[10px] font-heading text-sm font-bold text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)] ${TONE_STYLES[step.tone]}`}
              >
                {step.n}
              </span>
              <span className={`step-icon-${step.anim} block shrink-0 text-3xl sm:mb-2.5 sm:text-4xl`}>{step.icon}</span>
              <div>
                <h3 className="text-[17px] font-semibold text-brand-navy sm:text-[18px]">{step.title}</h3>
                <p className="mt-0.5 text-[14px] font-semibold text-muted sm:mt-1.5 sm:text-[14.5px]">{step.desc}</p>
              </div>
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
