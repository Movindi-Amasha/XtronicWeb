"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LineIcon, { type LineIconName } from "./LineIcon";
import { LOGO } from "@/lib/brandColors";
import Doodled from "@/components/Doodled";
import GiftBox from "./GiftBox";
import Mascot from "./Mascot";
import { CLUB_PRICE_LABEL } from "@/lib/club";

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
        {/* Robot flying in on his balloon (top-right, as in the mockup) */}
        <Mascot pose="balloon" motion="fly" className="absolute right-6 top-5 hidden h-28 lg:block xl:h-32" sizes="200px" />

        <div className="relative grid items-center gap-8 md:grid-cols-[0.9fr_1.4fr]">
          {/* Kid unboxing his monthly kit (the photo carries its own "New Kit
              Every Month!" bubble): a tilted photo card on a yellow back plate,
              with a light sweep and a few twinkling stars. */}
          <div className="relative mx-auto w-full max-w-[400px] pt-3 pb-4">
            <div aria-hidden className="absolute inset-x-4 top-6 bottom-1 rotate-[5deg] rounded-[30px]" style={{ background: LOGO.yellow }} />
            <figure className="group relative -rotate-[3deg] overflow-hidden rounded-[28px] shadow-[0_22px_34px_-14px_rgba(13,31,53,0.55)] transition-transform duration-500 hover:rotate-0">
              <div className="relative aspect-[1252/1067]">
                <Image
                  src="/kids/boy-unboxing-kit.jpg"
                  alt="Excited boy opening his monthly XTRONIC KIDS kit box"
                  fill
                  sizes="(min-width: 768px) 400px, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span aria-hidden className="club-sheen pointer-events-none absolute inset-y-0 -left-1/4 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
            </figure>
            {[
              { c: LOGO.yellow, pos: "-left-2 top-1/3", d: "0s" },
              { c: "#fff", pos: "left-6 -bottom-1", d: "0.9s" },
              { c: LOGO.green, pos: "-right-2 bottom-1/4", d: "1.7s" },
            ].map((st) => (
              <span key={st.pos} aria-hidden className={`club-twinkle absolute ${st.pos} h-5 w-5`} style={{ color: st.c, animationDelay: st.d }}>
                <LineIcon name="sparkles" size={20} strokeWidth={2.6} />
              </span>
            ))}
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
                {CLUB_PRICE_LABEL} <span className="font-body text-base font-semibold text-muted">/month</span>
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
