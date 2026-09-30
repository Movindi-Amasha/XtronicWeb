"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore, cartItemCount } from "@/lib/cartStore";
import CurrencySelector from "./CurrencySelector";

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
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const cartCount = cartItemCount(items);

  return (
    <header className="sticky top-0 z-[999] border-b border-white/10 bg-brand-navy/95 backdrop-blur">
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
            <span className="font-heading text-lg font-bold tracking-tight text-white">
              XTRONIC KIDZ
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-wide text-brand-blue-50/60">
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
              className="font-mono text-xs font-medium uppercase tracking-wide text-brand-blue-50/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CurrencySelector className="hidden lg:flex" />

          <button
            type="button"
            aria-label="Search products"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 sm:flex"
          >
            🔍
          </button>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Cart, ${cartCount} items`}
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 sm:flex"
          >
            🛒
            {cartCount > 0 && (
              <span
                aria-hidden
                className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-amber text-[11px] font-bold uppercase tracking-wide text-brand-navy"
              >
                {cartCount}
              </span>
            )}
          </button>

          <Link
            href="/shop"
            className="hidden rounded-btn bg-brand-amber px-5 py-2.5 font-mono text-sm font-medium uppercase tracking-wide text-brand-navy transition-opacity hover:opacity-90 sm:inline-block"
          >
            Order Kit
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-brand-navy px-4 pb-4 lg:hidden">
          <nav aria-label="Mobile primary" className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-btn px-3 py-3 font-mono text-sm font-medium uppercase tracking-wide text-white hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-btn bg-brand-amber px-5 py-3 text-center font-mono text-sm font-medium uppercase tracking-wide text-brand-navy"
            >
              Order Kit
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
