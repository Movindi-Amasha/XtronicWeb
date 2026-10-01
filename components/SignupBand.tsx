import NewsletterForm from "./NewsletterForm";

export default function SignupBand() {
  return (
    <section aria-labelledby="signup-heading" className="bg-brand-amber py-16">
      <div className="mx-auto grid max-w-[1260px] gap-8 px-4 md:grid-cols-2 md:items-center md:px-6">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-navy/70">
            Join the workshop
          </p>
          <h2
            id="signup-heading"
            className="mt-2 font-heading text-3xl font-bold text-brand-navy md:text-4xl"
          >
            Get 10% off your first kit.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-brand-navy/80">
            New builds, school bundle drops and a one-time welcome code,
            straight to your inbox.
          </p>
        </div>

        <NewsletterForm variant="band" />
      </div>
    </section>
  );
}
