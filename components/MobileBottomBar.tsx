"use client";

import Link from "next/link";
import { useCartStore, cartItemCount } from "@/lib/cartStore";

const ITEMS = [
  { href: "/shop", label: "Shop", icon: "🛍️" },
  { href: "/shop?focus=search", label: "Search", icon: "🔍" },
  { href: "/cart", label: "Cart", icon: "🛒" },
  { href: "/shop", label: "Order Kit", icon: "⚡" },
];

export default function MobileBottomBar() {
  const items = useCartStore((s) => s.items);
  const cartCount = cartItemCount(items);

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-[999] flex border-t border-line bg-surface/95 backdrop-blur md:hidden"
    >
      {ITEMS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-brand-navy"
          style={{ minHeight: 44 }}
        >
          <span aria-hidden className="relative inline-block text-lg" {...(item.label === "Cart" ? { "data-cart-target": "" } : {})}>
            {item.icon}
            {item.label === "Cart" && cartCount > 0 && (
              <span
                key={cartCount}
                aria-hidden
                className="badge-pop absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-amber text-[9px] font-bold uppercase tracking-wide text-white"
              >
                {cartCount}
              </span>
            )}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
