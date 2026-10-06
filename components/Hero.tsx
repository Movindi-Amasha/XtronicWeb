"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const STATS = [
  { value: "5", label: "STEM Kits" },
  { value: "6+", label: "Min Age" },
  { value: "4.9", label: "Parent Rating" },
  { value: "AU", label: "Wide Delivery" },
];

const MARQUEE_ITEMS = [
  "☀️ Solar Powered",
  "🤖 Voice AI Ready",
  "✈️ Snap-Together Build",
  "🔊 Sound Frequency",
  "🧠 STEM Certified",
  "🔋 Battery-Free",
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-brand-navy pb-0">
      {/* Workshop-themed background — designed with a calm, plain zone
          across the center (where the text and logo sit) and all the
          colorful detail (gears, solar panels, blueprints, robot) pushed
          to the edges/corners, so it adds brand-matching color without
          fighting the content. A navy tint keeps white text readable
          while still letting the corner detail read vividly. */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/brand/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-brand-navy/50" />
      </div>

      {/* Scattered confetti dots/stars — cheap flat decoration, like the
          reference, instead of a busy photographic background. */}
      <span aria-hidden className="absolute left-[8%] top-16 h-2 w-2 rounded-full bg-brand-blue/40" />
      <span aria-hidden className="absolute left-[18%] top-40 text-sm text-brand-amber/50">✦</span>
      <span aria-hidden className="absolute right-[6%] top-24 h-2.5 w-2.5 rounded-full bg-brand-amber/40" />
      <span aria-hidden className="absolute right-[14%] bottom-28 text-base text-brand-blue-50/30">✦</span>
      <span aria-hidden className="absolute left-[4%] bottom-20 h-1.5 w-1.5 rounded-full bg-white/30" />
      <span aria-hidden className="absolute right-[3%] top-1/2 h-2 w-2 rounded-full bg-brand-amber/40" />

      <div className="relative z-10 mx-auto grid max-w-[1160px] gap-12 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-6 md:py-24">
        <div className="relative text-left">
          <motion.span
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-blue-50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-amber" />
            Learn &bull; Build &bull; Play
          </motion.span>

          <motion.h1
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 mt-5 font-pixel text-4xl leading-[1.15] font-bold text-white sm:text-5xl md:text-6xl"
          >
            MAKE LEARNING
            <br />
            <span className="text-brand-amber">COME ALIVE.</span>
            <span className="mt-3 block font-body font-normal text-base text-brand-blue-50/70 sm:text-lg">
              Screen-free STEM kits, built by hand, powered by curiosity.
            </span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 mt-5 max-w-md text-base text-brand-blue-50/70"
          >
            Hands-on robotics and solar engineering kits designed to ignite
            curious minds, snap-together, screen-free, and built to last for
            kids 6 and up.
          </motion.p>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/shop"
              className="rounded-btn bg-brand-amber px-6 py-3 text-center font-mono text-sm font-medium uppercase tracking-wide text-brand-navy transition-opacity hover:opacity-90 focus-visible:outline-brand-amber"
            >
              Explore All Kits
            </Link>
            <Link
              href="/schools"
              className="rounded-btn border border-white/20 bg-white/5 px-6 py-3 text-center font-mono text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            >
              For Schools &amp; Teachers →
            </Link>
          </motion.div>

          {/* Mascot playing with a kit — tucked behind the CTA buttons and
              stats row (both given relative z-10 above so their opaque
              backgrounds/text occlude it), peeking out through the gaps
              around them rather than floating off in the side margin. */}
          <motion.div
            aria-hidden
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-6 top-[400px] z-0 hidden h-52 w-52 opacity-95 lg:block"
          >
            <Image
              src="/mascot/playing-with-robot.png"
              alt=""
              fill
              sizes="256px"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-10 mt-10 grid grid-cols-4 gap-4 border-t border-white/10 pt-6"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-pixel text-xl text-white sm:text-2xl">{stat.value}</p>
                <p className="mt-1 font-mono text-[10px] font-medium uppercase tracking-wide text-brand-blue-50/60 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative z-10 mx-auto aspect-square w-full max-w-[320px] md:max-w-[400px]"
          >
          {/* A deliberate solid-ish blob behind the logo, like the
              reference's organic color shape, instead of a photo backdrop. */}
          <div
            aria-hidden
            className="absolute inset-[-8%] rounded-full bg-gradient-to-br from-brand-blue/35 via-brand-blue-deep/25 to-brand-amber/20 blur-xl"
          />
          <div
            aria-hidden
            className="absolute inset-[6%] rounded-full bg-gradient-to-br from-brand-blue/20 via-white/10 to-brand-amber/15 blur-md"
          />

          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <Image
              src="/brand/xtronic-logo-transparent.png"
              alt="XTRONIC KIDZ"
              fill
              priority
              sizes="400px"
              className="object-contain"
              style={{
                filter:
                  "drop-shadow(0 0 1px rgba(255,255,255,0.75)) drop-shadow(0 0 3px rgba(255,255,255,0.4))",
              }}
            />
          </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Gold ticker band — full-bleed section divider */}
      <div className="relative w-full overflow-hidden bg-brand-amber py-2.5">
        <div className="animate-marquee flex w-max items-center gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              aria-hidden={i >= MARQUEE_ITEMS.length}
              className="whitespace-nowrap font-mono text-xs font-medium uppercase tracking-wide text-brand-navy"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
