"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const TRUST_BADGES = [
  "🛡️ 100% Child-Safe",
  "⚡ Battery-Free Solar",
  "🇦🇺 Fast AU Delivery",
  "⭐ 4.9/5 by Parents",
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
    <section
      className="relative overflow-hidden bg-brand-navy pb-0"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(3,140,242,0.35), transparent 55%), radial-gradient(circle at 85% 15%, rgba(255,167,7,0.28), transparent 50%), radial-gradient(circle at 50% 100%, rgba(87,177,45,0.15), transparent 50%)",
      }}
    >
      <div className="mx-auto max-w-[1000px] px-4 pb-16 pt-20 text-center md:px-6 md:pt-28">
        {/* Logo mark, front and center, appears first */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto aspect-[100/65] w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px]"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 scale-125 rounded-full bg-brand-blue/30 blur-3xl"
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
              sizes="300px"
              className="object-cover object-top drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
            />
          </motion.div>
        </motion.div>

        <motion.span
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm"
        >
          ☀️ Learn &bull; Build &bull; Play
        </motion.span>

        <motion.h1
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 font-heading text-6xl font-extrabold leading-[0.95] text-white sm:text-7xl md:text-8xl"
        >
          MAKE LEARNING
          <br />
          <span className="text-brand-amber">COME ALIVE.</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mx-auto mt-6 max-w-lg text-lg text-brand-blue-50/80"
        >
          Hands-on STEM robotics and solar engineering kits designed to
          ignite curious minds. Learn &bull; Build &bull; Play.
        </motion.p>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/shop"
            className="rounded-full bg-brand-amber px-7 py-3.5 text-center text-base font-bold text-brand-navy shadow-lg shadow-brand-amber/30 transition-transform hover:-translate-y-1 focus-visible:outline-brand-amber"
          >
            Explore All Kits
          </Link>
          <Link
            href="/schools"
            className="rounded-full border-2 border-white/40 px-7 py-3.5 text-center text-base font-bold text-white transition-colors hover:bg-white/10"
          >
            For Schools & Teachers
          </Link>
        </motion.div>

        <motion.ul
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {TRUST_BADGES.map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold text-brand-blue-50 backdrop-blur-sm"
            >
              {badge}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Scrolling marquee ribbon — flush, full-bleed, one continuous flex track with
          the list duplicated so the -50% translate loop is seamless */}
      <div className="relative w-full overflow-hidden border-y border-white/10 bg-white/5 py-3">
        <div className="animate-marquee flex w-max items-center gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              aria-hidden={i >= MARQUEE_ITEMS.length}
              className="whitespace-nowrap text-sm font-bold text-brand-blue-50/80"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
