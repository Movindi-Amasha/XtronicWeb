"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LOGO } from "@/lib/brandColors";
import { useSeasonStore } from "@/lib/seasonStore";
import { THEMES } from "@/lib/seasonalThemes";

// Small seasonal touches that sit on existing components: a hat on the
// header logo and a sticker on product cards. They read the active theme
// from useSeasonStore (set by SeasonalTheme) and render nothing otherwise.

const NAVY = "#0D1F35";

const HATS = {
  halloween: (
    <svg viewBox="0 0 60 44">
      <path d="M8 38h44" stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
      <path d="M8 38h44" stroke="#3b2a5c" strokeWidth="3" strokeLinecap="round" />
      <path d="M17 37L30 4c3-2 8 3 9 6l-2 2 6 25z" fill="#3b2a5c" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 32h25" stroke={LOGO.orange} strokeWidth="4" />
      <rect x="27" y="29" width="7" height="6" rx="1" fill={LOGO.yellow} stroke={NAVY} strokeWidth="1.2" />
    </svg>
  ),
  christmas: (
    <svg viewBox="0 0 60 44">
      <path d="M10 34C16 16 30 4 46 10c4 2 6 8 6 14l-6-4C40 16 34 22 34 34z" fill={LOGO.red} stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      <rect x="6" y="31" width="34" height="9" rx="4.5" fill="#fff" stroke={NAVY} strokeWidth="2" />
      <circle cx="52" cy="26" r="5" fill="#fff" stroke={NAVY} strokeWidth="2" />
    </svg>
  ),
  "singles-day": (
    <svg viewBox="0 0 60 44">
      <path d="M16 40L32 2l16 38z" fill={LOGO.blue} stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      <path d="M22 26l20-6M19 33l26-6M27 14l9-3" stroke={LOGO.yellow} strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="3" r="4" fill={LOGO.red} stroke={NAVY} strokeWidth="1.6" />
    </svg>
  ),
  easter: (
    <svg viewBox="0 0 60 44">
      <path d="M20 40C14 20 14 4 20 2s10 18 8 38zM36 40c0-20 6-36 12-36s4 18-6 36z" fill="#fff" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 10c1 10 3 20 5 28M46 10c-3 10-6 20-8 28" stroke={LOGO.red} strokeOpacity="0.45" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M12 40h36" stroke={LOGO.green} strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
} as const;

/** Seasonal hat perched on the header logo (place inside its relative box). */
export function SeasonHat() {
  const season = useSeasonStore((s) => s.season);
  return (
    <AnimatePresence>
      {season && (
        <motion.span
          key={season}
          aria-hidden
          className="pointer-events-none absolute -top-4 left-1/2 z-10 w-9 -translate-x-1/2"
          initial={{ y: -30, rotate: -30, opacity: 0 }}
          animate={{ y: 0, rotate: -12, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.4 }}
        >
          {HATS[season]}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

const STICKER_STYLE = {
  halloween: { bg: "#3b2a5c", fg: "#fff", ring: LOGO.orange },
  christmas: { bg: LOGO.red, fg: "#fff", ring: "#fff" },
  "singles-day": { bg: LOGO.yellow, fg: NAVY, ring: LOGO.red },
  easter: { bg: LOGO.green, fg: "#fff", ring: LOGO.yellow },
} as const;

/** Seasonal sticker for a product card's photo (place inside its relative box). */
export function SeasonSticker({ index = 0 }: { index?: number }) {
  const season = useSeasonStore((s) => s.season);
  if (!season) return null;
  const st = STICKER_STYLE[season];
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute bottom-2 right-2 z-10 rounded-full border-2 px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wide shadow-md sm:bottom-3 sm:right-3 sm:text-[11px]"
      style={{ background: st.bg, color: st.fg, borderColor: st.ring }}
      initial={{ scale: 0, rotate: -40 }}
      animate={{ scale: 1, rotate: [-8, 4, -8] }}
      transition={{ scale: { type: "spring", stiffness: 400, damping: 14, delay: 0.3 + index * 0.08 }, rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
    >
      {THEMES[season].sticker}
    </motion.span>
  );
}
