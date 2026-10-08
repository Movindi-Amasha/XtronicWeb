import Image from "next/image";
import NewsletterForm from "./NewsletterForm";

export default function SignupBand() {
  return (
    <section aria-labelledby="signup-heading" className="mx-auto max-w-[1200px] px-4 pt-24 pb-24 md:px-6">
      <div
        className="relative flex flex-wrap items-center justify-between gap-7 overflow-hidden rounded-[32px] px-5 py-8 sm:px-7 sm:py-10 text-white shadow-[0_10px_0_var(--color-brand-blue-600)] sm:px-12"
        style={{ background: "linear-gradient(120deg, var(--color-brand-blue), var(--color-brand-blue-600))" }}
      >
        <div aria-hidden className="studs-texture" />
        <div className="relative flex items-center gap-4">
          <div className="relative hidden h-24 w-24 shrink-0 sm:block">
            <Image src="/mascot/waving.png" alt="" fill sizes="96px" className="object-contain" />
          </div>
          <div className="max-w-sm">
            <h2 id="signup-heading" className="text-[clamp(26px,3vw,36px)] font-bold text-white">
              Join the <span className="text-brand-yellow">XTRONIC</span> community
            </h2>
            <p className="mt-1.5 font-bold opacity-90">
              Get 10% off your first order, plus free STEM activities and
              new-kit news.
            </p>
          </div>
        </div>
        <div className="relative w-full sm:w-auto">
          <NewsletterForm variant="band" />
        </div>
      </div>
    </section>
  );
}
