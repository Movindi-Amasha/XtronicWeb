import Image from "next/image";

type Tone = "blue" | "amber" | "red";

const TONE_STYLES: Record<Tone, string> = {
  blue: "bg-brand-blue",
  amber: "bg-brand-amber text-brand-navy",
  red: "bg-brand-amber",
};

const STEPS: { n: string; icon: string; title: string; desc: string; tone: Tone }[] = [
  { n: "01", icon: "📦", title: "Choose Your Kit", desc: "Pick a STEM kit that interests your child.", tone: "blue" },
  { n: "02", icon: "🔧", title: "Build It", desc: "Follow the easy step-by-step instructions.", tone: "amber" },
  { n: "03", icon: "💡", title: "Discover How It Works", desc: "Learn the real science and technology behind it.", tone: "red" },
  { n: "04", icon: "▶️", title: "Play & Experiment", desc: "Test your creation and see it in action.", tone: "blue" },
  { n: "05", icon: "🏆", title: "Create Again!", desc: "Improve, customise and build new ideas.", tone: "amber" },
];

export default function HowItWorksSteps() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="mx-auto max-w-[1260px] px-4 pt-8 pb-16 md:px-6"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative h-32 w-32">
          <Image
            src="/mascot/pointing.png"
            alt=""
            fill
            sizes="128px"
            className="object-contain"
          />
        </div>
        <h2
          id="how-it-works-heading"
          className="mt-1 font-heading text-3xl font-bold text-brand-navy md:text-4xl"
        >
          5 Simple Steps to a <span className="text-brand-amber">Big Adventure!</span>
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((step, i) => (
          <div key={step.n} className="relative flex flex-col items-center gap-3 rounded-card border-2 border-line bg-surface p-5 text-center">
            <span
              className={`absolute -top-4 flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs font-bold text-white shadow-sm ${TONE_STYLES[step.tone]}`}
            >
              {step.n}
            </span>
            <span className="mt-4 text-3xl">{step.icon}</span>
            <h3 className="font-heading text-sm font-bold text-brand-navy">{step.title}</h3>
            <p className="text-xs text-brand-navy-700">{step.desc}</p>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl text-brand-navy/30 lg:block"
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
