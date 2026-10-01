"use client";

import { motion, useReducedMotion } from "framer-motion";

type Tone = "navy" | "surface" | "amber";

type Tile = {
  eyebrow: string;
  title: string;
  desc: string;
  icon: string;
  tone: Tone;
  span?: 1 | 2;
};

const TILES: Tile[] = [
  {
    eyebrow: "Step 01–02",
    title: "Unbox & Build",
    desc: "Open the kit and snap, screw and wire the pieces together, guided by the illustrated manual. No glue, no mess.",
    icon: "📦",
    tone: "navy",
    span: 2,
  },
  {
    eyebrow: "Step 03",
    title: "Power Up",
    desc: "Charge it with sunlight or batteries and watch it come to life.",
    icon: "⚡",
    tone: "surface",
  },
  {
    eyebrow: "Step 04",
    title: "Play & Master",
    desc: "Test, tweak and master the STEM concepts behind the build.",
    icon: "🎉",
    tone: "amber",
  },
  {
    eyebrow: "Why XTRONIC",
    title: "Curriculum-Aligned STEM",
    desc: "Mechanics, photovoltaics and sound frequency, taught through play.",
    icon: "🎓",
    tone: "amber",
    span: 2,
  },
  {
    eyebrow: "Guarantee",
    title: "Lifetime Part Replacement",
    desc: "Missing a small part? We'll replace it, no questions asked.",
    icon: "🔁",
    tone: "navy",
    span: 2,
  },
  {
    eyebrow: "Together or Solo",
    title: "Built for Bonding",
    desc: "Perfect for independent discovery or parent-child build time.",
    icon: "👨‍👩‍👧",
    tone: "surface",
    span: 2,
  },
  {
    eyebrow: "Why XTRONIC",
    title: "Screen-Free Fun",
    desc: "Real hands-on building and play, away from the screen.",
    icon: "📵",
    tone: "surface",
  },
];

const TONE_STYLES: Record<Tone, string> = {
  navy: "bg-brand-navy text-white",
  surface: "bg-surface text-brand-navy border border-line",
  amber: "bg-brand-amber text-brand-navy",
};

export default function FeatureBento() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="feature-bento-heading"
      className="mx-auto max-w-[1260px] px-4 py-16 md:px-6"
    >
      <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-blue-600">
        How it works &amp; why it matters
      </p>
      <h2
        id="feature-bento-heading"
        className="mt-2 font-heading text-3xl font-bold text-brand-navy md:text-4xl"
      >
        Built to be unboxed, not scrolled.
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((tile, i) => (
          <motion.div
            key={tile.title}
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={`flex flex-col gap-3 rounded-card p-6 ${TONE_STYLES[tile.tone]} ${
              tile.span === 2 ? "lg:col-span-2" : ""
            }`}
          >
            <span aria-hidden className="text-2xl">
              {tile.icon}
            </span>
            <p className="font-mono text-[10px] font-medium uppercase tracking-wide opacity-70">
              {tile.eyebrow}
            </p>
            <h3 className="font-heading text-lg font-bold">{tile.title}</h3>
            <p className="text-sm opacity-80">{tile.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
