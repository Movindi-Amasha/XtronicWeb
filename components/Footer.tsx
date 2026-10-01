import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import PaymentIcons, { PayHereBadge } from "./PaymentIcons";

const HELP_LINKS = [
  { href: "/help/faq", label: "FAQ" },
  { href: "/help/shipping-returns", label: "Shipping & Returns" },
  { href: "/help/safety", label: "Safety" },
  { href: "/help/privacy", label: "Privacy" },
  { href: "/help/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-navy text-white/72">
      <div className="mx-auto max-w-[1260px] px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h2 className="font-heading text-xl font-bold text-white">
              XTRONIC KIDZ
            </h2>
            <p className="mt-1 font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-blue-50">
              Learn &bull; Build &bull; Play
            </p>
            <p className="mt-4 max-w-sm text-sm text-white/72">
              Hands-on STEM robotics and solar engineering kits designed to
              ignite curious minds, 6 years and up.
            </p>

            <NewsletterForm />
          </div>

          <div>
            <h3 className="font-mono text-sm font-medium uppercase tracking-wide text-white">
              Help
            </h3>
            <ul className="mt-3 space-y-2">
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-xs font-medium uppercase tracking-wide text-white/72 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-medium uppercase tracking-wide text-white">
              Follow Along
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-white/72">
              <li>YouTube</li>
              <li>Instagram</li>
              <li>TikTok</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 font-mono text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>ABN 00 000 000 000 &middot; Australia-wide shipping</p>
          <PaymentIcons />
        </div>
        <div className="mt-4 flex md:justify-end">
          <PayHereBadge />
        </div>
      </div>

      {/* Oversized brand-colored wordmark signature, echoing the split-color
          "X" of the logo (blue/amber). */}
      <div className="overflow-hidden bg-brand-navy py-6">
        <p
          aria-hidden
          className="pointer-events-none select-none text-center font-pixel font-bold leading-none"
          style={{ fontSize: "clamp(3rem, 14vw, 9rem)" }}
        >
          <span className="text-brand-amber">XTRONIC</span>{" "}
          <span className="text-brand-blue">KIDZ</span>
        </p>
      </div>
    </footer>
  );
}
