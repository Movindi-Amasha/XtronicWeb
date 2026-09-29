const STEPS = [
  { n: 1, title: "Unbox & Discover", desc: "Open your kit and explore every part with the illustrated guide.", icon: "📦" },
  { n: 2, title: "Build & Connect", desc: "Snap, screw and wire the pieces together — no glue, no mess.", icon: "🔧" },
  { n: 3, title: "Power Up", desc: "Charge it with sunlight or batteries and watch it come to life.", icon: "⚡" },
  { n: 4, title: "Play & Master", desc: "Test, tweak and master the STEM concepts behind the build.", icon: "🎉" },
];

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-brand-blue-50/60 py-16"
    >
      <div className="mx-auto max-w-[1260px] px-4 md:px-6">
        <h2
          id="how-it-works-heading"
          className="text-center font-heading text-3xl font-extrabold text-brand-navy md:text-4xl"
        >
          How It Works
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex flex-col items-center gap-3 rounded-card bg-surface p-6 text-center shadow-lg shadow-brand-navy/10 ring-1 ring-brand-navy/5 transition-transform hover:-translate-y-1"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-2xl text-white">
                {step.icon}
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-brand-blue-600">
                Step {step.n}
              </span>
              <h3 className="font-heading text-lg font-bold text-brand-navy">
                {step.title}
              </h3>
              <p className="text-sm text-brand-navy-700">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
