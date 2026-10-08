"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useCartStore,
  cartSubtotalCents,
} from "@/lib/cartStore";
import { formatPriceAUD } from "@/lib/products";
import {
  SHIPPING_RATES,
  getShippingCostCents,
  type ShippingMethod,
} from "@/lib/shipping";
import { gstComponentCents } from "@/lib/pricing";
import PaypalPaymentSection from "./PaypalPaymentSection";
import PayHerePaymentSection from "./PayHerePaymentSection";
import ProductImage from "@/components/ProductImage";

export default function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("au-standard");
  const [readyForPayment, setReadyForPayment] = useState(false);

  const subtotal = cartSubtotalCents(items);
  const shippingCents = getShippingCostCents(shippingMethod, subtotal);
  const total = subtotal + shippingCents;
  const gst = gstComponentCents(total);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-4xl">🛒</p>
        <h1 className="mt-4 font-heading text-2xl font-extrabold text-brand-navy">
          Your cart is empty
        </h1>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-brand-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Explore All Kits
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="font-heading text-lg font-bold text-brand-navy">
            Contact & Shipping
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="email" className="text-sm font-bold text-brand-navy">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="name" className="text-sm font-bold text-brand-navy">
                Full name
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="phone" className="text-sm font-bold text-brand-navy">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="address" className="text-sm font-bold text-brand-navy">
                Address
              </label>
              <input
                id="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="city" className="text-sm font-bold text-brand-navy">
                City
              </label>
              <input
                id="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="postcode" className="text-sm font-bold text-brand-navy">
                Postcode
              </label>
              <input
                id="postcode"
                required
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-brand-navy">
            Shipping Method
          </h2>
          <div className="mt-4 flex flex-col gap-2">
            {(Object.entries(SHIPPING_RATES) as [ShippingMethod, (typeof SHIPPING_RATES)[ShippingMethod]][]).map(
              ([key, rate]) => {
                const cost = getShippingCostCents(key, subtotal);
                return (
                  <label
                    key={key}
                    className={`flex cursor-pointer items-center justify-between rounded-btn border px-4 py-3 text-sm ${
                      shippingMethod === key
                        ? "border-brand-blue bg-brand-blue-50"
                        : "border-line"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === key}
                        onChange={() => setShippingMethod(key)}
                      />
                      <span className="font-semibold text-brand-navy">{rate.label}</span>
                    </span>
                    <span className="font-bold text-brand-navy">
                      {cost === 0 ? "Free" : formatPriceAUD(cost)}
                    </span>
                  </label>
                );
              }
            )}
          </div>
        </div>

        {!readyForPayment ? (
          <button
            type="button"
            disabled={!email || !name || !phone || !address || !city}
            onClick={() => setReadyForPayment(true)}
            className="w-full rounded-full bg-brand-blue px-6 py-3.5 text-base font-bold uppercase tracking-wide text-white disabled:opacity-50 hover:opacity-90 sm:w-fit"
          >
            Continue to Payment
          </button>
        ) : (
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-navy">Payment</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-card border border-line p-5">
                <p className="mb-4 text-sm font-bold text-brand-navy">
                  Pay with PayPal or Card
                </p>
                <PaypalPaymentSection
                  shippingMethod={shippingMethod}
                  email={email}
                  name={name}
                  phone={phone}
                  address={address}
                  city={city}
                  postcode={postcode}
                />
              </div>
              <div className="rounded-card border border-line p-5">
                <p className="mb-4 text-sm font-bold text-brand-navy">Pay with PayHere</p>
                <PayHerePaymentSection
                  shippingMethod={shippingMethod}
                  email={email}
                  name={name}
                  phone={phone}
                  address={address}
                  city={city}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <aside className="flex h-fit flex-col gap-4 rounded-card border border-line bg-surface p-6">
        <h2 className="font-heading text-lg font-bold text-brand-navy">Order Summary</h2>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.slug} className="flex items-center gap-3 text-sm">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-btn bg-brand-blue-50">
                <ProductImage src={item.image} alt={item.name} emoji={item.emoji} sizes="40px" />
              </span>
              <span className="flex-1 font-semibold text-brand-navy">
                {item.name} <span className="text-muted">&times;{item.qty}</span>
              </span>
              <span className="font-bold text-brand-navy">
                {formatPriceAUD(item.priceCents * item.qty)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-brand-navy-700">
            <span>Subtotal</span>
            <span>{formatPriceAUD(subtotal)}</span>
          </div>
          <div className="flex justify-between text-brand-navy-700">
            <span>Shipping</span>
            <span>{shippingCents === 0 ? "Free" : formatPriceAUD(shippingCents)}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Includes GST</span>
            <span>{formatPriceAUD(gst)}</span>
          </div>
        </div>
        <div className="flex justify-between border-t border-line pt-4 font-body text-lg font-extrabold text-brand-navy">
          <span>Total</span>
          <span>{formatPriceAUD(total)}</span>
        </div>
      </aside>
    </div>
  );
}
