"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import type { ShippingMethod } from "@/lib/shipping";

const PAYHERE_SCRIPT_URL = "https://www.payhere.lk/lib/payhere.js";
const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID;
const isSandbox = process.env.NEXT_PUBLIC_PAYHERE_ENV !== "live";

declare global {
  interface Window {
    payhere?: {
      startPayment: (payment: Record<string, unknown>) => void;
      onCompleted?: (orderId: string) => void;
      onDismissed?: () => void;
      onError?: (error: string) => void;
    };
  }
}

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
  const clearCart = useCartStore((s) => s.clearCart);
  const [error, setError] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!merchantId) return;
    if (window.payhere) {
      const t = setTimeout(() => setScriptReady(true), 0);
      return () => clearTimeout(t);
    }
    const script = document.createElement("script");
    script.src = PAYHERE_SCRIPT_URL;
    script.async = true;
    script.onload = () => setScriptReady(true);
    document.body.appendChild(script);
  }, []);

  if (!merchantId) {
    return (
      <div className="rounded-card border border-dashed border-line bg-canvas p-5 text-sm text-muted">
        PayHere isn&apos;t configured yet — add{" "}
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
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not start PayHere checkout");

      const [firstName, ...rest] = name.trim().split(" ");
      const lastName = rest.join(" ") || firstName;

      window.payhere!.onCompleted = () => {
        clearCart();
        router.push("/checkout/success");
      };
      window.payhere!.onDismissed = () => setLoading(false);
      window.payhere!.onError = (err: string) => {
        setError(err);
        setLoading(false);
      };

      window.payhere!.startPayment({
        sandbox: isSandbox,
        merchant_id: merchantId,
        notify_url: `${window.location.origin}/api/webhooks/payhere`,
        order_id: data.orderId,
        items: data.itemsDescription,
        amount: data.amount,
        currency: data.currency,
        hash: data.hash,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        city,
        country: "Australia",
      });
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
      <button
        type="button"
        onClick={handlePay}
        disabled={!scriptReady || loading}
        className="w-full rounded-btn bg-brand-navy px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Opening PayHere…" : "Pay with PayHere"}
      </button>
    </div>
  );
}
