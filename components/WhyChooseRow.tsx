"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Tone = "blue" | "amber" | "red";

const TONE_STYLES: Record<Tone, string> = {
  blue: "bg-brand-blue-50 text-brand-blue",
  amber: "bg-brand-amber-50 text-brand-amber-600",
  red: "bg-brand-amber-50 text-brand-amber",
};

const ITEMS: { icon: string; title: string; desc: string; tone: Tone }[] = [
  { icon: "🧠", title: "STEM Skills", desc: "Science, technology, engineering & more.", tone: "blue" },
  { icon: "💭", title: "Creative Thinking", desc: "Encourages problem solving.", tone: "amber" },
  { icon: "📵", title: "Screen-Free Play", desc: "Hands-on activities, no screens needed.", tone: "red" },
  { icon: "⭐", title: "Build Confidence", desc: "Feel proud after completing a project.", tone: "blue" },
  { icon: "👨‍👩‍👧", title: "Family Fun", desc: "Build together and make memories.", tone: "amber" },
];

export default function WhyChooseRow() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="why-choose-heading"
      className="mx-auto max-w-[1260px] px-4 py-16 md:px-6"
    >
      <div className="relative">
        <div className="max-w-xl">
          <h2
            id="why-choose-heading"
            className="font-heading text-3xl font-bold text-brand-navy md:text-4xl"
          >
            Why <span className="text-brand-blue">Kidz XTRONIC</span>?
          </h2>
          <p className="mt-2 text-sm text-brand-navy-700">
            More than a toy. It&apos;s a learning experience.
          </p>
        </div>

        {/* Peeking mascot — anchored to the TOP of this wrapper (not the
            short heading block's bottom) so a bigger character has room:
            head/shoulders/thumbs-up hands land in the gap above the badge
            row below, torso dips behind it (cards render on top, z-10). */}
        <motion.div
          aria-hidden
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-0 hidden h-64 w-64 sm:block md:right-6 md:h-72 md:w-72"
        >
          <Image
            src="/mascot/thumbs-up-confetti.png"
            alt=""
            fill
            sizes="288px"
            className="object-contain object-top"
          />
        </motion.div>
      </div>

      <div className="relative z-10 mt-10 sm:mt-28 md:mt-32 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-2 rounded-card border border-line bg-surface p-4 text-center">
            <span className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${TONE_STYLES[item.tone]}`}>
              {item.icon}
            </span>
            <h3 className="font-heading text-sm font-bold text-brand-navy">{item.title}</h3>
            <p className="text-xs text-brand-navy-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
