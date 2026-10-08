"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LineIcon, { type LineIconName } from "./LineIcon";
import { LOGO } from "@/lib/brandColors";

const PERKS: { icon: LineIconName; title: string; desc: string; color: string }[] = [
  { icon: "package", title: "Monthly STEM Kit", desc: "New project each month", color: LOGO.orange },
  { icon: "percent", title: "Exclusive Discounts", desc: "15% off everything", color: LOGO.red },
  { icon: "zap", title: "Early Access", desc: "To new kits", color: LOGO.yellow },
  { icon: "book", title: "Fun Learning Guides", desc: "And activities", color: LOGO.blue },
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
    <section id="subscribe" aria-labelledby="club-heading" className="relative mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
      <div
        className="relative grid items-center gap-8 overflow-hidden rounded-[36px] border-2 border-line p-6 sm:p-10 md:grid-cols-[0.9fr_1.4fr]"
        style={{ background: "linear-gradient(120deg, #e9f5ff 0%, #fff 50%, var(--color-brand-yellow-50) 100%)" }}
      >
        <div className="relative mx-auto aspect-square w-full max-w-[320px]">
          <div className="absolute inset-0 rotate-[-4deg] overflow-hidden rounded-[30px] border-4 border-white bg-white shadow-[0_12px_0_var(--color-brand-amber),0_30px_60px_-24px_rgba(14,30,63,0.45)]">
            <Image
              src="/mascot/banner-toys.png"
              alt="XTRONIC mascot with a new monthly kit"
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <span
            aria-hidden
            className="absolute -right-2 -top-3 rotate-[8deg] rounded-[44%] border-[3px] border-brand-navy bg-white px-4 py-2.5 text-center font-heading text-sm font-bold leading-tight shadow-[4px_5px_0_rgba(13,31,53,0.15)] sm:text-base"
          >
            <span style={{ color: LOGO.red }}>New Kit</span>
            <br />
            <span style={{ color: LOGO.blue }}>Every Month!</span>
          </span>
        </div>

        <div>
          <h2 id="club-heading" className="text-[clamp(28px,3.6vw,42px)] font-bold leading-tight">
            <span style={{ color: LOGO.blue }}>XTRONIC Club</span>
            <br />
            <span style={{ color: LOGO.orange }}>Subscription</span>
          </h2>
          <p className="mt-2 max-w-lg font-semibold text-muted">
            Keep the learning going! A fresh STEM kit, activities and member-only perks delivered every
            month. Pause or cancel anytime.
          </p>

          <ul className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {PERKS.map((perk) => (
              <li key={perk.title} className="flex flex-col items-center rounded-2xl border-2 border-line bg-white px-2 py-3 text-center">
                <span style={{ color: perk.color }}>
                  <LineIcon name={perk.icon} size={26} />
                </span>
                <strong className="mt-1.5 text-[13px] font-extrabold leading-tight text-brand-navy">{perk.title}</strong>
                <span className="text-[11px] font-semibold text-muted">{perk.desc}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 font-heading text-4xl font-bold" style={{ color: LOGO.orange }}>
            $19.99 <span className="font-body text-base font-semibold text-muted">/month</span>
          </p>

          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3 sm:flex-row">
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
              className="min-w-0 flex-1 rounded-btn border-2 border-line bg-white px-4 py-3 text-sm font-bold text-brand-navy placeholder:text-muted focus:border-brand-blue focus:outline-none"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="btn-brick shrink-0 rounded-btn bg-brand-amber px-7 py-3 font-heading text-sm font-semibold text-white disabled:opacity-60"
              style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
            >
              {state === "loading" ? "Redirecting…" : "Subscribe Now →"}
            </button>
          </form>
          {error && (
            <p role="alert" className="mt-2 text-xs font-bold text-brand-red">
              {error}
            </p>
          )}
          <p className="mt-2 text-xs font-semibold text-muted">
            You&apos;ll be redirected to PayPal to approve the monthly payment. Already a member?{" "}
            <Link href="/club/manage" className="font-bold text-brand-blue underline hover:text-brand-blue-600">
              Pause or cancel here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
