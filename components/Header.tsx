"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore, cartItemCount } from "@/lib/cartStore";
import CurrencySelector from "./CurrencySelector";

const NAV_LINKS = [
  { href: "/shop", label: "STEM Kits" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-xtronic", label: "Why XTRONIC" },
  { href: "/schools", label: "Schools & Clubs" },
  { href: "/parents-guide", label: "Parents' Guide" },
  { href: "/#subscribe", label: "Club" },
];

function isLinkActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const cartCount = cartItemCount(items);
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  }

  return (
    <header className="sticky top-0 z-[999] border-b border-line bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1260px] items-center gap-3 px-4 md:px-6 xl:gap-4">
        <Link href="/" aria-label="XTRONIC KIDS — Home" className="flex shrink-0 items-center gap-2">
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src="/brand/xtronic-logo-transparent.png"
              sizes="48px"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative hidden h-8 w-32 shrink-0 sm:block">
            <Image
              src="/brand/xtronic-wordmark.png"
              sizes="160px"
              alt="XTRONIC KIDS"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <nav aria-label="Primary" className="mx-auto hidden items-center gap-0.5 lg:flex xl:gap-1">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-btn px-2.5 py-2 font-body text-sm font-extrabold transition-colors xl:px-3 ${
                  active
                    ? "bg-brand-blue-50 text-brand-blue"
                    : "text-brand-navy hover:bg-brand-blue-50 hover:text-brand-blue"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <form
            onSubmit={handleSearch}
            className="hidden items-center gap-2 rounded-btn border-2 border-line bg-canvas px-3 focus-within:border-brand-blue focus-within:bg-white md:flex lg:hidden xl:flex"
          >
            <span aria-hidden className="text-muted">
              🔍
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search STEM kits…"
              aria-label="Search for STEM kits"
              className="h-11 w-44 bg-transparent text-sm font-bold text-brand-navy placeholder:text-muted placeholder:font-semibold focus:outline-none xl:w-32 2xl:w-48"
            />
          </form>

          <CurrencySelector className="hidden lg:flex" />

          <button
            type="button"
            onClick={openCart}
            aria-label={`Cart, ${cartCount} items`}
            className="relative flex h-11 w-11 items-center justify-center rounded-btn bg-brand-yellow-50 text-xl text-brand-navy transition-colors hover:bg-brand-yellow-50/70"
          >
            🛒
            {cartCount > 0 && (
              <span
                aria-hidden
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-brand-amber text-[11px] font-bold text-white"
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-btn text-2xl text-brand-navy hover:bg-brand-blue-50 lg:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-white px-4 pb-4 lg:hidden">
          <nav aria-label="Mobile primary" className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-btn px-3 py-3 text-sm font-extrabold hover:bg-brand-blue-50 ${
                    active ? "text-brand-blue" : "text-brand-navy"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="btn-brick mt-2 rounded-btn bg-brand-amber px-5 py-3 text-center font-heading text-sm font-bold text-white"
              style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
            >
              Shop STEM Kits
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
