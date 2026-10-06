import Image from "next/image";
import Link from "next/link";
import PaymentIcons, { PayHereBadge } from "./PaymentIcons";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "STEM Kits" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/schools", label: "Schools & Clubs" },
];

const HELP_LINKS = [
  { href: "/help/shipping-returns", label: "Shipping & Returns" },
  { href: "/help/faq", label: "FAQ" },
  { href: "/schools", label: "Schools & Clubs" },
];

const ABOUT_LINKS = [
  { href: "/why-xtronic", label: "Our Story" },
  { href: "/why-xtronic", label: "Why XTRONIC KIDZ" },
  { href: "/help/safety", label: "Safety & Quality" },
  { href: "/help/privacy", label: "Privacy Policy" },
];

const SOCIALS = [
  { label: "YouTube", icon: "▶️" },
  { label: "Instagram", icon: "📸" },
  { label: "Facebook", icon: "👍" },
  { label: "TikTok", icon: "🎵" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-navy text-white/72">
      {/* Wavy blue/amber top edge, echoing the mockup's hand-drawn divider */}
      <svg aria-hidden viewBox="0 0 1200 40" preserveAspectRatio="none" className="block h-8 w-full">
        <path d="M0 0 L0 22 Q 150 40 300 22 T 600 22 T 900 22 T 1200 22 L1200 0 Z" fill="var(--color-brand-blue)" />
        <path d="M0 0 L0 12 Q 150 28 300 12 T 600 12 T 900 12 T 1200 12 L1200 0 Z" fill="var(--color-brand-amber)" />
      </svg>

      <div className="mx-auto max-w-[1260px] px-4 py-12 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="relative h-16 w-16 rounded-full bg-white p-2">
              <Image
                src="/brand/xtronic-logo-transparent.png"
                alt="XTRONIC KIDZ"
                fill
                className="object-contain p-1"
              />
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/72">
              Fun STEM building kits that help kids learn science, technology,
              engineering and creativity through hands-on play.
            </p>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map((s) => (
                <span
                  key={s.label}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm"
                >
                  {s.icon}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wide text-brand-amber">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/72 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wide text-brand-amber">
              Help
            </h3>
            <ul className="mt-3 space-y-2">
              {HELP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/72 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wide text-brand-amber">
              About
            </h3>
            <ul className="mt-3 space-y-2">
              {ABOUT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/72 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 font-mono text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>ABN 00 000 000 000 &middot; Shipping to Australia &amp; Sri Lanka</p>
          <PaymentIcons />
        </div>
        <div className="mt-4 flex md:justify-end">
          <PayHereBadge />
        </div>
      </div>
    </footer>
  );
}
