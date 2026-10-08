"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { useCartStore } from "@/lib/cartStore";
import type { ShippingMethod } from "@/lib/shipping";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export default function PaypalPaymentSection({
  shippingMethod,
  email,
  name,
  phone,
  address,
  city,
  postcode,
}: {
  shippingMethod: ShippingMethod;
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
}) {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!clientId) {
    return (
      <div className="rounded-card border border-dashed border-line bg-canvas p-5 text-sm text-muted">
        PayPal isn&apos;t configured yet. Add{" "}
        <code className="font-mono">PAYPAL_CLIENT_ID</code>,{" "}
        <code className="font-mono">PAYPAL_CLIENT_SECRET</code> and{" "}
        <code className="font-mono">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> to
        your environment to enable this.
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{ clientId, currency: "AUD", enableFunding: "paylater" }}
    >
      {error && (
        <p role="alert" className="mb-3 text-sm font-bold text-red-600">
          {error}
        </p>
      )}
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={async () => {
          const res = await fetch("/api/checkout/paypal/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
              shippingMethod,
            }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Could not start PayPal checkout");
          return data.orderId;
        }}
        onApprove={async (data) => {
          const res = await fetch("/api/checkout/paypal/capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.orderID,
              items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
              shippingMethod,
              // The checkout form's own fields — PayPal's own payer email
              // and shipping info aren't reliable (we don't even collect
              // shipping through PayPal; shipping_preference is NO_SHIPPING),
              // so this is the single source of truth for who to contact
              // and where to ship, same as the PayHere flow already does.
              email,
              name,
              phone,
              address,
              city,
              postcode,
            }),
          });
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            setError(err.error ?? "Payment could not be captured.");
            return;
          }
          clearCart();
          router.push("/checkout/success");
        }}
        onError={() => setError("PayPal checkout failed. Please try again.")}
      />
    </PayPalScriptProvider>
  );
}
