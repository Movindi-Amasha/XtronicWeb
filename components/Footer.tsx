import Image from "next/image";
import Link from "next/link";
import PaymentIcons, { PayHereBadge } from "./PaymentIcons";
import CurrencySelector from "./CurrencySelector";
import Doodled from "./Doodled";
import { LOGO } from "@/lib/brandColors";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Quick Links",
    links: [
      { href: "/", label: "Home" },
      { href: "/shop", label: "STEM Kits" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/#gallery", label: "Our Works" },
      { href: "/#specials", label: "Special Products" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/help/shipping-returns", label: "Shipping & Returns" },
      { href: "/help/faq", label: "FAQ" },
      { href: "/help/safety", label: "Safety & Quality" },
      { href: "/#subscribe", label: "Subscription" },
      { href: "/club/manage", label: "Manage Club Membership" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/why-xtronic", label: "Our Story" },
      { href: "/schools", label: "Schools & Clubs" },
      { href: "/parents-guide", label: "Parents' Guide" },
      { href: "/help/privacy", label: "Privacy Policy" },
    ],
  },
];

// Social links aren't wired up yet; add each account's URL here.
const SOCIALS = [
  { label: "YouTube", color: "#FF0000", path: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.8 15V9l5.7 3-5.7 3Z" },
  { label: "Instagram", color: "#E1306C", path: "M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.7-.1-4-1.4-4.1-4.1C3.7 15 3.6 14.7 3.6 12s0-3 .1-4.1c.1-2.7 1.4-4 4.1-4.1 1.1-.1 1.4-.1 4.2-.1Z" },
  { label: "Facebook", color: "#1877F2", path: "M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v1.9H8v3.1h2.6V21H14v-9.4h2.6l.4-3.1Z" },
  { label: "TikTok", color: "#0D1F35", path: "M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-1.8-2.5V9.7a5.7 5.7 0 1 0 4.9 5.7V9a7.3 7.3 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5Z" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 pb-16 md:pb-0" style={{ background: "linear-gradient(180deg, rgba(232,244,255,0.9), rgba(255,246,220,0.9))" }}>
      <div className="mx-auto grid max-w-[1260px] grid-cols-2 gap-x-6 gap-y-10 px-4 pt-14 pb-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
        <div className="col-span-2 md:col-span-1">
          <div className="relative h-14 w-40">
            <Image src="/brand/xtronic-logo-transparent.png" sizes="160px" alt="XTRONIC KIDS" fill className="object-contain object-left" />
          </div>
          <p className="mt-3 max-w-xs text-sm font-semibold text-muted">
            XTRONIC KIDS is a STEM brand inspiring young minds through hands-on learning and fun. Learn &middot;
            Build &middot; Play.
          </p>
          <div className="mt-4 flex gap-2.5">
            {SOCIALS.map((s) => (
              <span
                key={s.label}
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)] transition-transform duration-200 hover:-translate-y-1 hover:-rotate-6"
                style={{ background: s.color }}
              >
                <svg aria-hidden viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </span>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-heading text-base font-bold text-brand-navy">{col.title}</h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-bold text-muted transition-colors hover:text-brand-blue">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 md:col-span-4 lg:col-span-1">
          <h3 className="font-heading text-base font-bold text-brand-navy">We Accept</h3>
          <div className="mt-3">
            <PaymentIcons />
          </div>
          <div className="mt-3">
            <PayHereBadge />
          </div>
          <div className="mt-6 hidden lg:block">
            <Doodled preset="split">
              <p className="font-heading text-2xl font-bold leading-tight">
                <span style={{ color: LOGO.blue }}>Small Hands</span>
                <br />
                <span style={{ color: LOGO.red }}>Big Ideas!</span>
              </p>
            </Doodled>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1260px] flex-col gap-3 border-t border-line px-4 py-4 text-xs font-bold text-muted md:flex-row md:items-center md:justify-between md:px-6">
        <span>© 2026 XTRONIC KIDS. All rights reserved. Shipping to Australia &amp; Sri Lanka.</span>
        <span className="flex items-center gap-4">
          <CurrencySelector className="flex" />
          <Link href="/help/terms" className="hover:text-brand-blue">
            Terms &amp; Conditions
          </Link>
          <span aria-hidden>|</span>
          <Link href="/help/privacy" className="hover:text-brand-blue">
            Privacy Policy
          </Link>
        </span>
      </div>

      {/* Colourful wave along the very bottom, as in the mockups. */}
      <svg aria-hidden viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-6 w-full md:h-8">
        <path d="M0 22c240-26 480 26 720 0s480-26 720 0v18H0z" fill={LOGO.blue} />
        <path d="M0 30c240-20 480 20 720 0s480-20 720 0v10H0z" fill={LOGO.yellow} opacity="0.95" />
        <path d="M0 35c240-12 480 12 720 0s480-12 720 0v5H0z" fill={LOGO.orange} />
      </svg>
    </footer>
  );
}
