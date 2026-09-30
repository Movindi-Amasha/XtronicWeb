export default function SchoolsSection() {
  return (
    <section
      aria-labelledby="schools-heading"
      className="bg-brand-navy py-16 text-white"
    >
      <div className="mx-auto grid max-w-[1260px] gap-8 px-4 md:grid-cols-2 md:items-center md:px-6">
        <div>
          <h2
            id="schools-heading"
            className="font-heading text-3xl font-extrabold md:text-4xl"
          >
            Schools, STEM Clubs & Educators
          </h2>
          <p className="mt-4 max-w-md text-white/72">
            Bring hands-on STEM to your classroom with 10-pack and 30-pack
            bundles, free lesson plan downloads, and a dedicated quote for
            larger orders.
          </p>
          <ul className="mt-6 space-y-2 text-sm font-semibold text-brand-blue-50">
            <li>📦 10-pack bundle — 15% off</li>
            <li>📦 30-pack bundle — 25% off</li>
            <li>🧩 Mixed Classroom Discovery Pack</li>
            <li>📄 Free downloadable lesson plans</li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4 rounded-card bg-white/10 p-8">
          <p className="font-heading text-xl font-bold">
            Ordering for a class or club?
          </p>
          <p className="text-sm text-white/72">
            Tell us what you need and we&apos;ll put together a custom quote
            within one business day.
          </p>
          <button
            type="button"
            className="rounded-full bg-brand-amber px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-navy transition-transform hover:-translate-y-0.5 focus-visible:outline-brand-amber"
          >
            Request School Quote
          </button>
        </div>
      </div>
    </section>
  );
}
