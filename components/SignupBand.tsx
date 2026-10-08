import NewsletterForm from "./NewsletterForm";
import LineIcon, { type LineIconName } from "./LineIcon";
import { LOGO } from "@/lib/brandColors";

const PERKS: { icon: LineIconName; label: string; color: string }[] = [
  { icon: "tag", label: "Exclusive Offers", color: LOGO.red },
  { icon: "bell", label: "New Product Updates", color: LOGO.yellow },
  { icon: "sparkles", label: "Fun STEM Activities", color: LOGO.orange },
  { icon: "heart", label: "Parenting Tips", color: LOGO.green },
];

export default function SignupBand() {
  return (
    <section aria-labelledby="signup-heading" className="mx-auto max-w-[1200px] px-4 pt-20 pb-24 md:px-6">
      <div
        className="relative grid items-center gap-7 overflow-hidden rounded-[32px] px-6 py-9 text-white shadow-[0_10px_0_var(--color-brand-blue-600)] sm:px-10 lg:grid-cols-[auto_1fr_auto] lg:gap-10"
        style={{ background: `linear-gradient(120deg, ${LOGO.blue}, var(--color-brand-blue-600))` }}
      >
        <div aria-hidden className="studs-texture" />
        <span aria-hidden className="relative hidden -rotate-12 text-white/80 lg:block">
          <LineIcon name="send" size={56} strokeWidth={1.5} />
        </span>
        <div className="relative">
          <h2 id="signup-heading" className="text-[clamp(24px,2.8vw,34px)] font-bold leading-tight text-white">
            Join the <span className="text-brand-yellow">XTRONIC</span> Community
          </h2>
          <p className="mt-1 font-bold opacity-90">Get 10% off your first order, plus the latest kits, fun ideas and special offers.</p>
          <div className="mt-4 max-w-md">
            <NewsletterForm variant="band" />
          </div>
        </div>
        <ul className="relative grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-extrabold">
          {PERKS.map((perk) => (
            <li key={perk.label} className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white shadow" style={{ color: perk.color }}>
                <LineIcon name={perk.icon} size={18} strokeWidth={2.2} />
              </span>
              {perk.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
