"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function StatementBand() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="statement-heading"
      className="relative overflow-hidden bg-brand-navy py-20"
    >
      <figure className="relative mx-auto max-w-[760px] px-4 text-center md:px-6">
        <span aria-hidden className="font-pixel text-5xl text-brand-amber">
          &ldquo;
        </span>

        <motion.blockquote
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          id="statement-heading"
          className="mt-2 font-heading text-2xl leading-snug font-bold text-white sm:text-3xl md:text-4xl"
        >
          Instructions are genuinely clear enough for a 6 year old with light
          supervision. Great build quality.
        </motion.blockquote>

        <figcaption className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-blue-50/70">
          James T. &middot; Verified Buyer
        </figcaption>
      </figure>
    </section>
  );
}
