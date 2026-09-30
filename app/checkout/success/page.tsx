"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <span className="text-5xl">🎉</span>
      <h1 className="mt-4 font-heading text-3xl font-extrabold text-brand-navy">
        Order confirmed!
      </h1>
      <p className="mt-2 text-brand-navy-700">
        Thanks for your order — a confirmation email is on its way. We&apos;ll
        let you know as soon as it ships.
      </p>
      <Link
        href="/shop"
        className="mt-6 inline-block rounded-full bg-brand-blue px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
      >
        Keep Exploring Kits
      </Link>
    </section>
  );
}
