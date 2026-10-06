"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore, cartItemCount } from "@/lib/cartStore";
import CurrencySelector from "./CurrencySelector";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "STEM Kits" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-xtronic", label: "Why XTRONIC" },
  { href: "/schools", label: "Schools & Clubs" },
  { href: "/parents-guide", label: "Parents' Guide" },
];

function isLinkActive(pathname: string, href: string): boolean {
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
    <header className="sticky top-0 z-[999] border-b border-line bg-white">
      <div className="mx-auto flex h-20 max-w-[1260px] items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-14 w-14 shrink-0">
            <Image
              src="/brand/xtronic-logo-transparent.png"
              alt="XTRONIC KIDZ"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`pb-1 font-body text-sm font-bold transition-colors ${
                  active
                    ? "border-b-2 border-brand-blue text-brand-blue"
                    : "border-b-2 border-transparent text-brand-navy hover:text-brand-blue"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for STEM kits..."
              aria-label="Search for STEM kits"
              className="w-48 rounded-full border border-line bg-canvas py-2 pl-4 pr-9 text-sm text-brand-navy placeholder:text-muted focus-visible:outline-brand-blue lg:w-60"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-brand-blue"
            >
              🔍
            </button>
          </form>

          <CurrencySelector className="hidden lg:flex" />

          <Link
            href="/parents-guide"
            aria-label="Parents' guide"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-xl text-brand-navy transition-colors hover:bg-canvas sm:flex"
          >
            👤
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Cart, ${cartCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl text-brand-navy transition-colors hover:bg-canvas"
          >
            🛒
            <span
              aria-hidden
              className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-amber text-[11px] font-bold text-white"
            >
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-brand-navy hover:bg-canvas lg:hidden"
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
                  className={`rounded-btn px-3 py-3 text-sm font-bold hover:bg-canvas ${
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
              className="mt-2 rounded-btn bg-brand-amber px-5 py-3 text-center font-mono text-sm font-bold uppercase tracking-wide text-white"
            >
              Shop STEM Kits
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
