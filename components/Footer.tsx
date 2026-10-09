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
      { href: "/gallery", label: "Our Works" },
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

const SOCIALS = [
  { label: "YouTube", href: "https://www.youtube.com/", color: "#FF0000", path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" },
  { label: "Instagram", href: "https://www.instagram.com/", color: "#E1306C", path: "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.3-3.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" },
  { label: "Facebook", href: "https://www.facebook.com/", color: "#1877F2", path: "M13.5 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.4H7.5v3.2h2.8V21h3.2Z" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", color: "#0A66C2", path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-x-clip pb-16 md:pb-0" style={{ background: "linear-gradient(180deg, rgba(232,244,255,0.9), rgba(255,246,220,0.9))" }}>
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
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                title={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)] transition-transform duration-200 hover:-translate-y-1 hover:-rotate-6"
                style={{ background: s.color }}
              >
                <svg aria-hidden viewBox="0 0 24 24" width="17" height="17" fill="currentColor" focusable="false">
                  <path d={s.path} />
                </svg>
              </a>
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
