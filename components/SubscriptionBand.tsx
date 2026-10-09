"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LineIcon, { type LineIconName } from "./LineIcon";
import { LOGO } from "@/lib/brandColors";
import Doodled from "@/components/Doodled";
import GiftBox from "./GiftBox";

const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  w: 6 + (i % 3) * 2,
  h: 10 + (i % 2) * 4,
  color: [LOGO.yellow, "#fff", LOGO.red, LOGO.green, LOGO.orange][i % 5],
  delay: (i * 0.45) % 6,
  dur: 6 + (i % 4),
}));

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
        className="relative overflow-hidden rounded-[36px] p-6 text-white shadow-[0_14px_0_#0a5bb0,0_40px_70px_-30px_rgba(1,119,222,0.6)] sm:p-10"
        style={{ background: `radial-gradient(600px 400px at 100% 0%, rgba(253,171,5,0.55), transparent 60%), radial-gradient(500px 400px at 0% 100%, rgba(245,44,43,0.35), transparent 60%), linear-gradient(135deg, ${LOGO.blue} 0%, ${LOGO.lightBlue} 100%)` }}
      >
        <div aria-hidden className="studs-texture opacity-60" />
        {/* Falling confetti */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className="club-confetti absolute top-0 block rounded-sm"
              style={{ left: c.left, width: c.w, height: c.h, background: c.color, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }}
            />
          ))}
        </div>
        {/* Floating presents */}
        <GiftBox className="gift-hop pointer-events-none absolute -right-4 -bottom-4 hidden h-32 w-32 md:block" box={LOGO.yellow} lid="#FFC94A" ribbon={LOGO.red} tag={false} />
        <GiftBox className="gift-hop pointer-events-none absolute right-24 -bottom-6 hidden h-20 w-20 [animation-delay:1.2s] lg:block" box={LOGO.red} lid="#FF4D4C" ribbon={LOGO.yellow} tag={false} />

        <div className="relative grid items-center gap-8 md:grid-cols-[0.9fr_1.4fr]">
          {/* Kid on a badge, with orbiting stars and a spinning stamp */}
          <div className="relative mx-auto aspect-square w-full max-w-[340px]">
            <div aria-hidden className="club-orbit absolute inset-0">
              {[LOGO.yellow, LOGO.orange, "#fff", LOGO.green].map((c, i) => (
                <span key={i} className="absolute h-4 w-4" style={{ color: c, left: `${50 + 48 * Math.cos((i * Math.PI) / 2)}%`, top: `${50 + 48 * Math.sin((i * Math.PI) / 2)}%`, translate: "-50% -50%" }}>
                  <LineIcon name="star" size={16} strokeWidth={2.6} />
                </span>
              ))}
            </div>
            <div className="absolute inset-[8%] overflow-hidden rounded-full border-[6px] border-white shadow-[0_12px_0_rgba(13,31,53,0.18)]" style={{ background: "radial-gradient(circle at 50% 35%, #fff 0%, #fff6d6 65%, #ffe39a 100%)" }}>
              <Image src="/kids/boy-cheering.png" alt="Boy cheering next to the robot car he built" fill sizes="340px" className="translate-y-[6%] scale-110 object-contain object-bottom" />
            </div>
            <div aria-hidden className="club-stamp absolute -top-1 -right-1 grid h-24 w-24 place-items-center rounded-full border-4 border-white text-center font-heading text-[11px] font-bold uppercase leading-tight text-white shadow-lg sm:h-28 sm:w-28 sm:text-xs" style={{ background: LOGO.red }}>
              New kit
              <br />
              every
              <br />
              month!
            </div>
          </div>

          <div>
            <Doodled preset="left">
              <h2 id="club-heading" className="text-[clamp(28px,3.6vw,44px)] font-bold leading-tight">
                <span className="text-white">XTRONIC Club</span>
                <br />
                <span style={{ color: LOGO.yellow }}>Subscription</span>
              </h2>
            </Doodled>
            <p className="mt-2 max-w-lg font-semibold text-white/90">
              Keep the learning going! A fresh STEM kit, activities and member-only perks delivered every
              month. Pause or cancel anytime.
            </p>

            <ul className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {PERKS.map((perk, i) => (
                <li
                  key={perk.title}
                  className="group scatter-float flex flex-col items-center rounded-2xl bg-white px-2 py-3 text-center shadow-[0_6px_0_rgba(13,31,53,0.15)] transition-transform hover:-rotate-2 hover:scale-105"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full text-white transition-transform group-hover:rotate-12" style={{ background: perk.color }}>
                    <LineIcon name={perk.icon} size={22} strokeWidth={2.2} />
                  </span>
                  <strong className="mt-1.5 text-[13px] font-extrabold leading-tight text-brand-navy">{perk.title}</strong>
                  <span className="text-[11px] font-semibold text-muted">{perk.desc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="club-price inline-flex items-baseline gap-1 rounded-2xl bg-white px-4 py-2 font-heading text-4xl font-bold shadow-[0_6px_0_rgba(13,31,53,0.18)]" style={{ color: LOGO.orange }}>
                $19.99 <span className="font-body text-base font-semibold text-muted">/month</span>
              </p>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wide">Cancel anytime</span>
            </div>

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
                className="min-w-0 flex-1 rounded-btn border-2 border-white/70 bg-white px-4 py-3 text-sm font-bold text-brand-navy placeholder:text-muted focus:border-brand-yellow focus:outline-none"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="btn-brick shrink-0 rounded-btn bg-brand-yellow px-7 py-3 font-heading text-sm font-semibold text-brand-navy disabled:opacity-60"
                style={{ "--btn-brick-shadow": "var(--color-brand-yellow-600)" } as React.CSSProperties}
              >
                {state === "loading" ? "Redirecting…" : "Subscribe Now →"}
              </button>
            </form>
            {error && (
              <p role="alert" className="mt-2 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-brand-red">
                {error}
              </p>
            )}
            <p className="mt-2 text-xs font-semibold text-white/85">
              You&apos;ll be redirected to PayPal to approve the monthly payment. Already a member?{" "}
              <Link href="/club/manage" className="font-bold text-white underline hover:text-brand-yellow">
                Pause or cancel here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
