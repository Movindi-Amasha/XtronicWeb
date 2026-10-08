"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PERKS = [
  { icon: "📦", label: "New STEM kit monthly" },
  { icon: "💸", label: "15% off everything" },
  { icon: "⚡", label: "Early access to new kits" },
  { icon: "📘", label: "Fun learning guides" },
];

export default function SubscriptionBand() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError(null);

    try {
      const res = await fetch("/api/subscribe/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      window.location.href = data.approveUrl;
    } catch (err) {
      setState("idle");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="subscribe" className="relative mx-auto max-w-[1200px] overflow-hidden px-4 pt-24 md:px-6">
      <div
        className="relative overflow-hidden rounded-[40px] p-7 md:p-12"
        style={{ background: "var(--color-brand-navy)" }}
      >
        <div
          aria-hidden
          className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(31,111,229,0.55), transparent 65%)" }}
        />
        <div className="relative grid gap-10 md:grid-cols-[1fr_1.25fr] md:items-center">
        <div className="relative mx-auto aspect-square w-full max-w-[320px]">
          <div className="absolute inset-0 rotate-[-4deg] rounded-[30px] bg-white p-7 shadow-[0_14px_0_var(--color-brand-amber),0_30px_60px_-20px_rgba(0,0,0,0.5)]">
            <Image
              src="/brand/xtronic-logo-transparent.png"
              alt="XTRONIC KIDS Club"
              fill
              sizes="320px"
              className="object-contain p-10"
            />
          </div>
          <span className="absolute -right-1 -top-1.5 rotate-[8deg] rounded-[20px_20px_20px_4px] bg-brand-amber px-4.5 py-3.5 text-center shadow-[0_6px_0_var(--color-brand-amber-600)]">
            <span className="font-heading text-xs font-bold leading-tight text-white">
              New kit
              <br />
              every month!
            </span>
          </span>
        </div>

        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand-yellow">
            XTRONIC Club
          </span>
          <h2 className="mt-2 text-[clamp(30px,3.6vw,44px)] font-bold leading-tight text-white">
            Keep the learning going, <span className="text-brand-yellow">every month</span>
          </h2>
          <p className="mt-3 max-w-md text-[17px] font-semibold text-brand-blue-50/80">
            A fresh STEM project delivered to your door, plus member-only
            perks. Pause or cancel anytime.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PERKS.map((perk) => (
              <li
                key={perk.label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/7 px-3.5 py-3 text-[15px] font-extrabold text-white"
              >
                <span className="text-xl">{perk.icon}</span>
                {perk.label}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <p className="font-heading text-4xl font-bold text-brand-yellow">
              $19.99 <span className="text-base font-body font-normal text-brand-blue-50/70">/month</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="club-email" className="sr-only">
              Email address
            </label>
            <input
              id="club-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-btn border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus-visible:outline-brand-yellow"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="btn-brick shrink-0 rounded-btn bg-brand-yellow px-7 py-3 font-heading text-sm font-semibold text-brand-navy disabled:opacity-60"
              style={{ "--btn-brick-shadow": "var(--color-brand-yellow-600)" } as React.CSSProperties}
            >
              {state === "loading" ? "Redirecting…" : "Join the Club →"}
            </button>
          </form>
          {error && (
            <p role="alert" className="mt-2 text-xs font-bold text-brand-yellow">
              {error}
            </p>
          )}
          <p className="mt-2 text-xs font-semibold text-brand-blue-50/60">
            You&apos;ll be redirected to PayPal to approve the monthly payment.
            Already a member?{" "}
            <Link href="/club/manage" className="font-bold text-brand-blue-50 underline hover:text-white">
              Pause or cancel here
            </Link>
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
