"use client";

import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCartStore } from "@/lib/cartStore";
import type { ShippingMethod } from "@/lib/shipping";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

function PayButton() {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (submitError) {
      setError(submitError.message ?? "Payment failed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handlePay} className="flex flex-col gap-4">
      <PaymentElement />
      {error && (
        <p role="alert" className="text-sm font-bold text-red-600">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full rounded-full bg-brand-blue px-6 py-3.5 text-base font-bold uppercase tracking-wide text-white disabled:opacity-60 hover:opacity-90"
      >
        {submitting ? "Processing..." : "Pay with Card"}
      </button>
    </form>
  );
}

export default function StripePaymentSection({
  shippingMethod,
  email,
}: {
  shippingMethod: ShippingMethod;
  email: string;
}) {
  const items = useCartStore((s) => s.items);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cartKey = useMemo(
    () => JSON.stringify(items.map((i) => [i.slug, i.qty])),
    [items]
  );

  useEffect(() => {
    if (!publishableKey || !email || items.length === 0) return;

    let cancelled = false;
    fetch("/api/checkout/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
        shippingMethod,
        email,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Could not start checkout");
        if (!cancelled) setClientSecret(data.clientSecret);
      })
      .catch((err) => !cancelled && setError(err.message));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartKey, shippingMethod, email]);

  if (!publishableKey) {
    return (
      <div className="rounded-card border border-dashed border-line bg-canvas p-5 text-sm text-muted">
        Card payments aren&apos;t configured yet — add{" "}
        <code className="font-mono">STRIPE_SECRET_KEY</code> and{" "}
        <code className="font-mono">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to
        your environment to enable this.
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="text-sm font-bold text-red-600">
        {error}
      </p>
    );
  }

  if (!clientSecret) {
    return <p className="text-sm text-muted">Loading payment form...</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PayButton />
    </Elements>
  );
}
