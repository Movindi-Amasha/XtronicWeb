const SPECS = [
  { term: "Age Range", desc: "6 years and up, light adult supervision recommended for ages 6–7" },
  { term: "Build Time", desc: "30–90 minutes depending on kit" },
  { term: "Power Source", desc: "Direct sunlight or AA batteries, no charging cables" },
  { term: "Materials", desc: "Laser-cut basswood, ABS plastic, monocrystalline solar cells" },
  { term: "Tools Required", desc: "None, every kit snaps, screws or clips together by hand" },
  { term: "Warranty", desc: "Lifetime replacement on missing or broken small parts" },
];

export default function SpecsSection() {
  return (
    <section
      aria-labelledby="specs-heading"
      className="mx-auto max-w-[1260px] px-4 py-16 md:px-6"
    >
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-blue-600">
            Every kit, at a glance
          </p>
          <h2
            id="specs-heading"
            className="mt-2 font-heading text-3xl font-bold text-brand-navy md:text-4xl"
          >
            Built the same way, every time.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-brand-navy-700">
            Whatever kit lands on your desk, it ships to the same safety and
            build standard, no exceptions.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-2">
          {SPECS.map((spec) => (
            <div key={spec.term} className="border-b border-line pb-4">
              <dt className="font-mono text-xs font-medium uppercase tracking-wide text-brand-blue-600">
                {spec.term}
              </dt>
              <dd className="mt-1.5 text-sm text-brand-navy-700">{spec.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
