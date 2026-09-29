"use client";

import Link from "next/link";

const ITEMS = [
  { href: "/shop", label: "Shop", icon: "🛍️" },
  { href: "/shop?focus=search", label: "Search", icon: "🔍" },
  { href: "/cart", label: "Cart", icon: "🛒" },
  { href: "/shop", label: "Order Kit", icon: "⚡" },
];

export default function MobileBottomBar() {
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-[999] flex border-t border-line bg-surface/95 backdrop-blur md:hidden"
    >
      {ITEMS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-brand-navy"
          style={{ minHeight: 44 }}
        >
          <span aria-hidden className="text-lg">
            {item.icon}
          </span>
          <span className="text-[11px] font-semibold">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
