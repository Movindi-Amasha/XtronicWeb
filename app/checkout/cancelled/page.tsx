import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
};

export default function CheckoutCancelledPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <span className="text-5xl">😕</span>
      <h1 className="mt-4 font-heading text-3xl font-extrabold text-brand-navy">
        Checkout cancelled
      </h1>
      <p className="mt-2 text-brand-navy-700">
        No worries — your cart is still saved. You can pick up where you left
        off whenever you&apos;re ready.
      </p>
      <Link
        href="/cart"
        className="mt-6 inline-block rounded-full bg-brand-blue px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
      >
        Return to Cart
      </Link>
    </section>
  );
}
