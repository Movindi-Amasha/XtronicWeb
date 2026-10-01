"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";

function SuccessContent() {
  const clearCart = useCartStore((s) => s.clearCart);
  const searchParams = useSearchParams();
  // PayPal appends ?token=<orderId> when it redirects the full page back here
  // directly (its fallback path when a popup can't be used) — in that case
  // our in-app onApprove handler never ran, so the order was never captured.
  // Capture it here instead of just trusting the redirect happened.
  const token = searchParams.get("token");
  const [state, setState] = useState<"idle" | "capturing" | "done" | "error">(
    token ? "capturing" : "done"
  );

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    fetch("/api/checkout/paypal/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: token }),
    })
      .then((res) => {
        if (cancelled) return;
        setState(res.ok ? "done" : "error");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (state === "done") clearCart();
  }, [state, clearCart]);

  if (state === "capturing") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <h1 className="font-heading text-2xl font-bold text-brand-navy">
          Finishing up your order&hellip;
        </h1>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <h1 className="font-heading text-2xl font-bold text-brand-navy">
          We couldn&apos;t confirm that payment
        </h1>
        <p className="mt-2 text-brand-navy-700">
          If you were charged, contact us with your PayPal receipt and we&apos;ll
          sort it out, otherwise no order was placed.
        </p>
        <Link
          href="/checkout"
          className="mt-6 inline-block rounded-full bg-brand-blue px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
        >
          Back to Checkout
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <span className="text-5xl">🎉</span>
      <h1 className="mt-4 font-heading text-3xl font-extrabold text-brand-navy">
        Order confirmed!
      </h1>
      <p className="mt-2 text-brand-navy-700">
        Thanks for your order. A confirmation email is on its way. We&apos;ll
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

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
