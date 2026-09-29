import Link from "next/link";

const HELP_LINKS = [
  { href: "/help/faq", label: "FAQ" },
  { href: "/help/shipping-returns", label: "Shipping & Returns" },
  { href: "/help/safety", label: "Safety" },
  { href: "/help/privacy", label: "Privacy" },
  { href: "/help/terms", label: "Terms" },
];

const PAYMENT_ICONS = [
  "Visa",
  "Mastercard",
  "Amex",
  "PayPal",
  "Apple Pay",
  "Google Pay",
  "Afterpay",
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white/72">
      <div className="mx-auto max-w-[1260px] px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h2 className="font-heading text-xl font-extrabold text-white">
              XTRONIC KIDZ
            </h2>
            <p className="mt-1 text-sm font-semibold text-brand-blue-50">
              Learn &bull; Build &bull; Play
            </p>
            <p className="mt-4 max-w-sm text-sm text-white/72">
              Hands-on STEM robotics and solar engineering kits designed to
              ignite curious minds, 6 years and up.
            </p>

            <form className="mt-6 flex max-w-sm gap-2" aria-label="Newsletter signup">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email"
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus-visible:outline-brand-amber"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-brand-amber px-4 py-2.5 text-sm font-bold text-brand-navy focus-visible:outline-brand-amber"
              >
                Get 10% Off
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Help
            </h3>
            <ul className="mt-3 space-y-2">
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/72 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Follow Along
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-white/72">
              <li>YouTube</li>
              <li>Instagram</li>
              <li>TikTok</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>ABN 00 000 000 000 &middot; Australia-wide shipping</p>
          <ul className="flex flex-wrap gap-3">
            {PAYMENT_ICONS.map((name) => (
              <li
                key={name}
                className="rounded-md border border-white/15 px-2 py-1"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
