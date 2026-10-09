"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore, cartItemCount } from "@/lib/cartStore";
import CurrencySelector from "./CurrencySelector";
import LineIcon from "./LineIcon";

// Mockup nav (minus "Our Works"), plus the two extra pages this site has (Schools, Parents' Guide).
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "STEM Kits" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-xtronic", label: "About Us" },
  { href: "/schools", label: "Schools & Clubs" },
  { href: "/parents-guide", label: "Parents' Guide" },
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
    <header className="sticky top-0 z-[999] border-b border-line bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1260px] items-center gap-3 px-4 md:px-6 xl:gap-4">
        <Link href="/" aria-label="XTRONIC KIDS — Home" className="group/logo flex shrink-0 items-center gap-2">
          <div className="relative h-12 w-12 shrink-0 transition-transform duration-300 ease-out group-hover/logo:-rotate-12 group-hover/logo:scale-110">
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
                className={`relative whitespace-nowrap px-2 py-2 font-body text-[13.5px] font-extrabold transition-colors after:absolute after:inset-x-2 after:-bottom-0.5 after:h-[3px] after:rounded-full after:bg-brand-blue after:transition-transform after:duration-300 xl:px-2.5 ${
                  active
                    ? "text-brand-blue after:scale-x-100"
                    : "text-brand-navy after:scale-x-0 hover:text-brand-blue hover:after:scale-x-100"
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
            className="hidden items-center rounded-full border-2 border-line bg-white py-1 pr-1 pl-4 focus-within:border-brand-blue md:flex lg:hidden xl:flex"
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search STEM kits…"
              aria-label="Search for STEM kits"
              className="h-8 w-40 bg-transparent text-sm font-bold text-brand-navy placeholder:text-muted placeholder:font-semibold focus:outline-none xl:w-28 2xl:w-44"
            />
            <button type="submit" aria-label="Search" className="grid h-8 w-8 place-items-center rounded-full text-brand-navy transition-colors hover:bg-brand-blue hover:text-white">
              <svg aria-hidden viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </button>
          </form>

                    <Link
            href="/club/manage"
            aria-label="My account"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-brand-navy transition-colors hover:bg-brand-blue-50 hover:text-brand-blue sm:flex"
          >
            <svg aria-hidden viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
          </Link>

          <button
            type="button"
            onClick={openCart}
            data-cart-target
            aria-label={`Cart, ${cartCount} items`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-brand-navy transition-colors hover:bg-brand-blue-50 hover:text-brand-blue"
          >
            <LineIcon name="cart" size={26} strokeWidth={2.2} />
            {cartCount > 0 && (
              <span
                key={cartCount}
                aria-hidden
                className="badge-pop absolute -right-0.5 top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-brand-red text-[11px] font-bold text-white"
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
            <div className="flex items-center justify-between px-3 py-2 text-sm font-extrabold text-brand-navy">
              Currency
              <CurrencySelector className="flex" />
            </div>
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
