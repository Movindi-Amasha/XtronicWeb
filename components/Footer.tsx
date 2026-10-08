import Image from "next/image";
import Link from "next/link";
import PaymentIcons, { PayHereBadge } from "./PaymentIcons";

const SHOP_LINKS = [
  { href: "/shop", label: "STEM Kits" },
  { href: "/shop/stem-bundle-5in1", label: "Bundles" },
  { href: "/shop/gift-wrap-card", label: "Gift Pack" },
  { href: "/#subscribe", label: "Subscription" },
];

const HELP_LINKS = [
  { href: "/help/shipping-returns", label: "Shipping & Returns" },
  { href: "/help/faq", label: "FAQ" },
  { href: "/help/safety", label: "Safety & Quality" },
  { href: "/schools", label: "Schools & Clubs" },
];

const ABOUT_LINKS = [
  { href: "/why-xtronic", label: "Our Story" },
  { href: "/why-xtronic", label: "Why XTRONIC" },
  { href: "/help/privacy", label: "Privacy Policy" },
  { href: "/help/terms", label: "Terms" },
];

const SOCIALS = [
  { label: "YouTube", icon: "▶", tone: "bg-brand-red" },
  { label: "Instagram", icon: "◎", tone: "bg-brand-amber" },
  { label: "Facebook", icon: "f", tone: "bg-brand-blue" },
  { label: "TikTok", icon: "♪", tone: "bg-brand-navy-700" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-line bg-canvas">
      <div className="mx-auto grid max-w-[1260px] grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:px-6">
        <div className="col-span-2 md:col-span-1">
          <div className="relative h-10 w-40">
            <Image
              src="/brand/xtronic-wordmark.png"
              alt="XTRONIC KIDS"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm font-semibold text-muted">
            XTRONIC KIDS is a STEM brand inspiring young minds through
            hands-on learning and fun. Learn &middot; Build &middot; Play.
          </p>
          <div className="mt-4 flex gap-2">
            {SOCIALS.map((s) => (
              <span
                key={s.label}
                aria-label={s.label}
                className={`flex h-9 w-9 items-center justify-center rounded-btn text-sm font-bold text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)] ${s.tone}`}
              >
                {s.icon}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold text-brand-navy">Shop</h3>
          <ul className="mt-3 space-y-2">
            {SHOP_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm font-bold text-muted hover:text-brand-blue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold text-brand-navy">Help</h3>
          <ul className="mt-3 space-y-2">
            {HELP_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm font-bold text-muted hover:text-brand-blue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold text-brand-navy">About</h3>
          <ul className="mt-3 space-y-2">
            {ABOUT_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm font-bold text-muted hover:text-brand-blue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <PaymentIcons />
          </div>
          <div className="mt-3">
            <PayHereBadge />
          </div>
        </div>
      </div>

      <div className="relative bg-brand-navy text-white/80">
        <div
          aria-hidden
          className="absolute inset-x-0 -top-[6px] h-[6px]"
          style={{
            background:
              "linear-gradient(90deg, var(--color-brand-blue) 0 25%, var(--color-brand-yellow) 25% 50%, var(--color-brand-amber) 50% 75%, var(--color-brand-green) 75%)",
          }}
        />
        <div className="mx-auto flex max-w-[1260px] flex-col gap-2 px-4 py-4 text-xs font-bold md:flex-row md:items-center md:justify-between md:px-6">
          <span>© 2026 XTRONIC KIDS. All rights reserved. Shipping to Australia &amp; Sri Lanka.</span>
          <span>
            <Link href="/help/terms" className="hover:text-white">
              Terms
            </Link>{" "}
            &middot;{" "}
            <Link href="/help/privacy" className="hover:text-white">
              Privacy
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
