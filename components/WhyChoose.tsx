"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const REASONS = [
  {
    icon: "📵",
    title: "Screen-Free Interactive Fun",
    desc: "Real hands-on building and play, away from the screen.",
    bg: "bg-brand-blue-50",
  },
  {
    icon: "🎓",
    title: "Curriculum-Aligned STEM",
    desc: "Mechanics, photovoltaics and sound frequency, taught through play.",
    bg: "bg-brand-amber-50",
  },
  {
    icon: "🔁",
    title: "Lifetime Replacement Guarantee",
    desc: "Missing a small part? We'll replace it, no questions asked.",
    bg: "bg-brand-green-50",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Independent or Together",
    desc: "Perfect for solo discovery or parent-child bonding time.",
    bg: "bg-brand-blue-50",
  },
];

export default function WhyChoose() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="why-choose-heading"
      className="relative mx-auto max-w-[1260px] overflow-hidden px-4 py-16 md:px-6"
    >
      {/* Logo watermark that eases in as this section scrolls into view */}
      <motion.div
        aria-hidden
        initial={reduceMotion ? undefined : { opacity: 0, scale: 0.85, rotate: -6 }}
        whileInView={reduceMotion ? undefined : { opacity: 0.06, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-[520px] w-[520px] -translate-y-1/2"
      >
        <Image src="/brand/xtronic-logo-transparent.png" alt="" fill className="object-contain" />
      </motion.div>

      <h2
        id="why-choose-heading"
        className="text-center font-heading text-3xl font-extrabold text-brand-navy md:text-4xl"
      >
        Why Choose XTRONIC KIDZ
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {REASONS.map((reason) => (
          <div
            key={reason.title}
            className="flex flex-col gap-3 rounded-card bg-surface p-6 shadow-lg shadow-brand-blue/10 transition-transform hover:-translate-y-1"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${reason.bg}`}
              aria-hidden
            >
              {reason.icon}
            </span>
            <h3 className="font-heading text-lg font-bold text-brand-navy">
              {reason.title}
            </h3>
            <p className="text-sm text-brand-navy-700">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
