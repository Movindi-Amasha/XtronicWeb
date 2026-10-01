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
      {/* Dot-grid texture, spatially faded toward the mascot side — echoes the
          reference's masked radial dot field rather than a flat repeat. */}
      <div
        aria-hidden
        className="board-joint board-joint-dark pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse at 70% 50%, #000 10%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 50%, #000 10%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1160px] gap-12 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-6 md:py-24">
        <div className="text-left">
          <motion.span
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-blue-50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-amber" />
            Learn &bull; Build &bull; Play
          </motion.span>

          <motion.h1
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-pixel text-4xl leading-[1.15] font-bold text-white sm:text-5xl md:text-6xl"
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
            className="mt-5 max-w-md text-base text-brand-blue-50/70"
          >
            Hands-on robotics and solar engineering kits designed to ignite
            curious minds, snap-together, screen-free, and built to last for
            kids 6 and up.
          </motion.p>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
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

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-4 gap-4 border-t border-white/10 pt-6"
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

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative mx-auto aspect-[100/65] w-full max-w-[360px] md:max-w-[440px]"
        >
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
              sizes="440px"
              className="object-cover object-top"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Gold ticker band — full-bleed section divider, matching the reference's
          confident solid-color marquee rather than a subtle translucent strip */}
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
