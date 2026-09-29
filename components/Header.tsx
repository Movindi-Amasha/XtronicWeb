"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "STEM Kits" },
  { href: "/why-xtronic", label: "Why XTRONIC" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/schools", label: "Schools & Clubs" },
  { href: "/parents-guide", label: "Parents' Guide" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = 0;

  return (
    <header
      className="sticky top-0 z-[999] border-b-2 border-transparent bg-gradient-to-r from-brand-blue-50 via-surface to-brand-amber-50 shadow-sm shadow-brand-navy/5 backdrop-blur"
      style={{
        borderImage: "linear-gradient(to right, #038CF2, #FFA707) 1",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1260px] items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-11 w-14 shrink-0 overflow-hidden">
            <Image
              src="/brand/xtronic-logo-transparent.png"
              alt=""
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-heading text-lg font-extrabold tracking-tight text-brand-navy">
              XTRONIC KIDZ
            </span>
            <span className="text-[11px] font-semibold text-muted">
              Learn &bull; Build &bull; Play
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-brand-navy transition-colors hover:text-brand-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search products"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-brand-navy transition-colors hover:bg-brand-blue-50 sm:flex"
          >
            🔍
          </button>

          <button
            type="button"
            aria-label={`Cart, ${cartCount} items`}
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-brand-navy transition-colors hover:bg-brand-blue-50 sm:flex"
          >
            🛒
            {cartCount > 0 && (
              <span
                aria-hidden
                className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-amber text-[11px] font-bold text-brand-navy"
              >
                {cartCount}
              </span>
            )}
          </button>

          <Link
            href="/shop"
            className="hidden rounded-full bg-brand-amber px-5 py-2.5 text-sm font-bold text-brand-navy shadow-lg shadow-brand-blue/10 transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            Order Kit
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-brand-navy hover:bg-brand-blue-50 lg:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-surface px-4 pb-4 lg:hidden">
          <nav aria-label="Mobile primary" className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-brand-navy hover:bg-brand-blue-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-brand-amber px-5 py-3 text-center text-base font-bold text-brand-navy"
            >
              Order Kit
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
