"use client";

import { useRef, useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import type { ShippingMethod } from "@/lib/shipping";

const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID;

export default function PayHerePaymentSection({
  shippingMethod,
  email,
  name,
  phone,
  address,
  city,
}: {
  shippingMethod: ShippingMethod;
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
}) {
  const items = useCartStore((s) => s.items);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (!merchantId) {
    return (
      <div className="rounded-card border border-dashed border-line bg-canvas p-5 text-sm text-muted">
        PayHere isn&apos;t configured yet. Add{" "}
        <code className="font-mono">PAYHERE_MERCHANT_ID</code>,{" "}
        <code className="font-mono">PAYHERE_MERCHANT_SECRET</code> and{" "}
        <code className="font-mono">NEXT_PUBLIC_PAYHERE_MERCHANT_ID</code> to
        your environment to enable this.
      </div>
    );
  }

  async function handlePay() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/payhere/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
          shippingMethod,
          email,
          name,
          phone,
          address,
          city,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not start PayHere checkout");

      const form = formRef.current;
      if (!form) return;

      const [firstName, ...rest] = name.trim().split(" ");
      const lastName = rest.join(" ") || firstName;

      const fields: Record<string, string> = {
        merchant_id: data.merchantId,
        return_url: data.returnUrl,
        cancel_url: data.cancelUrl,
        notify_url: data.notifyUrl,
        order_id: data.orderId,
        items: data.itemsDescription,
        currency: data.currency,
        amount: data.amount,
        hash: data.hash,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        city,
        country: "Australia",
        // PayHere's notify_url callback doesn't include the buyer's email
        // directly — custom_1/custom_2 are the documented way to carry
        // merchant-defined data through the round trip.
        custom_1: email,
      };

      form.innerHTML = "";
      for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value ?? "";
        form.appendChild(input);
      }
      form.action = data.actionUrl;
      form.submit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "PayHere checkout failed");
      setLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <p role="alert" className="mb-3 text-sm font-bold text-red-600">
          {error}
        </p>
      )}
      {/* Fields are injected and this form is submitted (full-page POST
          redirect to PayHere) on click — this is PayHere's documented
          Checkout API integration, not the JS popup SDK. */}
      <form ref={formRef} method="post" />
      <button
        type="button"
        onClick={handlePay}
        disabled={loading}
        className="w-full rounded-btn bg-brand-navy px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Redirecting to PayHere…" : "Pay with PayHere"}
      </button>
    </div>
  );
}
