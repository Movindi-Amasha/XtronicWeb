import Image from "next/image";
import NewsletterForm from "./NewsletterForm";

const PERKS = ["🎁 Exclusive Offers", "🆕 New Product Updates", "🔧 Fun STEM Activities", "💡 Parenting Tips"];

export default function SignupBand() {
  return (
    <section aria-labelledby="signup-heading" className="bg-brand-navy py-14">
      <div className="mx-auto max-w-[1260px] px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="flex items-center gap-4">
            <div className="relative hidden h-28 w-28 shrink-0 sm:block">
              <Image
                src="/mascot/waving.png"
                alt=""
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
            <div>
              <h2
                id="signup-heading"
                className="font-heading text-2xl font-bold text-white md:text-3xl"
              >
                Join the <span className="text-brand-amber">XTRONIC KIDZ</span> Community
              </h2>
              <p className="mt-2 max-w-sm text-sm text-brand-blue-50/80">
                Get the latest kits, fun ideas and special offers, plus an
                instant 10% off your first order.
              </p>
            </div>
          </div>

          <NewsletterForm variant="footer" />
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/10 pt-6 font-mono text-xs font-medium uppercase tracking-wide text-brand-blue-50/70">
          {PERKS.map((perk) => (
            <span key={perk}>{perk}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
