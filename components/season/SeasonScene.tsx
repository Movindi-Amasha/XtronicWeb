"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { LOGO } from "@/lib/brandColors";
import type { ThemeId } from "@/lib/seasonalThemes";

// Animated characters for each seasonal theme (framer-motion). They live in
// fixed corners/edges, above the page but below the header, and only the
// playful ones take clicks. Reduced-motion users get none of them.
//   Halloween: draggable ghost whose eyes follow the cursor, bats, a spider,
//              a witch flying on her broom, a pile of glowing pumpkins
//   Christmas: Santa's sleigh flying over, a waving snowman
//   11.11:     a confetti burst on arrival, a balloon you can pop
//   Easter:    a hopping bunny and an egg hunt (5 eggs to find)

const NAVY = "#0D1F35";
// Clear of the phone bottom bar (md:hidden, ~60px tall).
const CORNER_BOTTOM = "bottom-[76px] md:bottom-6";

function Bubble({ text, side = "left" }: { text: string; side?: "left" | "right" }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0, y: 6 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 520, damping: 20 }}
      className={`absolute -top-9 whitespace-nowrap rounded-full border-2 border-brand-navy bg-white px-3 py-1 font-heading text-sm font-bold text-brand-navy shadow-md ${side === "left" ? "right-1/2" : "left-1/2"}`}
    >
      {text}
    </motion.span>
  );
}

/** Briefly shows a speech bubble after a click. */
function useBubble(ms = 1600) {
  const [text, setText] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function say(t: string) {
    setText(t);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setText(null), ms);
  }
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  return [text, say] as const;
}

/* ───────────── Halloween ───────────── */

function Ghost() {
  const ref = useRef<HTMLDivElement>(null);
  const ex = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ey = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const [bubble, say] = useBubble();

  // Eyes follow the cursor.
  useEffect(() => {
    function move(e: PointerEvent) {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.4);
      const d = Math.hypot(dx, dy) || 1;
      ex.set((dx / d) * 3);
      ey.set((dy / d) * 3);
    }
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [ex, ey]);

  return (
    <motion.div
      ref={ref}
      drag
      dragSnapToOrigin
      dragElastic={0.5}
      whileHover={{ scale: 1.08, rotate: -6 }}
      whileDrag={{ scale: 1.15, rotate: 8 }}
      onTap={() => say(["Boo!", "Build a robot!", "Hehe!"][Math.floor(Math.random() * 3)])}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 0.95, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
      className={`pointer-events-auto fixed right-3 z-[60] h-[72px] w-[60px] cursor-grab touch-none active:cursor-grabbing md:right-8 md:h-[92px] md:w-[76px] ${CORNER_BOTTOM}`}
      aria-label="Friendly ghost (drag me!)"
      role="img"
    >
      <AnimatePresence>{bubble && <Bubble text={bubble} />}</AnimatePresence>
      <motion.svg
        viewBox="0 0 76 92"
        className="h-full w-full drop-shadow-[0_10px_12px_rgba(13,31,53,0.25)]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M38 3C18 3 6 19 6 40v44l9-7 8 8 8-8 7 8 7-8 8 8 8-8 9 7V40C70 19 58 3 38 3z" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
        <motion.g style={{ x: ex, y: ey }}>
          <ellipse cx="28" cy="36" rx="5" ry="7" fill={NAVY} />
          <ellipse cx="48" cy="36" rx="5" ry="7" fill={NAVY} />
          <circle cx="29.5" cy="33.5" r="1.6" fill="#fff" />
          <circle cx="49.5" cy="33.5" r="1.6" fill="#fff" />
        </motion.g>
        <ellipse cx="38" cy="52" rx="5" ry="4" fill={NAVY} />
        <ellipse cx="20" cy="47" rx="4" ry="2.5" fill={LOGO.orange} opacity="0.45" />
        <ellipse cx="56" cy="47" rx="4" ry="2.5" fill={LOGO.orange} opacity="0.45" />
      </motion.svg>
    </motion.div>
  );
}

function Bat({ top, delay, scale = 1 }: { top: string; delay: number; scale?: number }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 z-[55]"
      style={{ top }}
      initial={{ x: "-12vw" }}
      animate={{ x: ["-12vw", "112vw"], y: [0, 30, -20, 25, -10, 0] }}
      transition={{ duration: 8, delay, repeat: Infinity, repeatDelay: 12, ease: "linear" }}
    >
      <svg viewBox="0 0 60 30" style={{ width: 54 * scale }}>
        <motion.path
          d="M30 14C24 4 12 2 2 8c6 1 9 4 10 8 4-3 9-2 12 2 2-3 4-4 6-4zM30 14c6-10 18-12 28-6-6 1-9 4-10 8-4-3-9-2-12 2-2-3-4-4-6-4z"
          fill={NAVY}
          style={{ originY: 0.5 }}
          animate={{ scaleY: [1, -0.6, 1] }}
          transition={{ duration: 0.28, repeat: Infinity }}
        />
        <ellipse cx="30" cy="16" rx="5" ry="7" fill={NAVY} />
        <circle cx="28" cy="14" r="1.2" fill={LOGO.yellow} />
        <circle cx="32" cy="14" r="1.2" fill={LOGO.yellow} />
      </svg>
    </motion.div>
  );
}

function Spider() {
  const [up, setUp] = useState(false);
  return (
    <motion.div
      className="pointer-events-auto fixed right-[14%] top-0 z-[60] hidden w-8 cursor-pointer flex-col items-center md:flex"
      aria-hidden
      onHoverStart={() => setUp(true)}
      onHoverEnd={() => setTimeout(() => setUp(false), 900)}
      onTap={() => setUp((u) => !u)}
    >
      {/* the header (above) hides the top of the thread */}
      <motion.span
        className="block w-px bg-brand-navy/50"
        animate={{ height: up ? 70 : [150, 175, 150] }}
        transition={up ? { type: "spring", stiffness: 120, damping: 14 } : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg viewBox="0 0 40 34" className="-mt-1 w-8" animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 2.2, repeat: Infinity }}>
        <path d="M14 14L3 6M14 18L1 18M14 22L4 30M26 14l11-8M26 18h13M26 22l10 8" stroke={NAVY} strokeWidth="2" strokeLinecap="round" fill="none" />
        <ellipse cx="20" cy="19" rx="8" ry="9" fill={NAVY} />
        <circle cx="17" cy="16" r="2.4" fill="#fff" />
        <circle cx="23" cy="16" r="2.4" fill="#fff" />
        <circle cx="17.5" cy="16.5" r="1.1" fill={NAVY} />
        <circle cx="23.5" cy="16.5" r="1.1" fill={NAVY} />
        <path d="M17 23q3 2 6 0" stroke={LOGO.orange} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  );
}

/** A witch on her broomstick flying across the screen now and then, with a cat riding behind her. */
function Witch() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-[16vh] z-[55]"
      initial={{ x: "112vw" }}
      animate={{ x: ["112vw", "-30vw"], y: [0, -30, 10, -22, 0], rotate: [-4, 3, -3, 4, -4] }}
      transition={{ duration: 12, delay: 6, repeat: Infinity, repeatDelay: 14, ease: "linear" }}
    >
      <svg viewBox="0 0 230 120" className="w-40 md:w-56">
        {/* sparkle trail behind (she flies left, so the trail is on the right) */}
        <g fill={LOGO.yellow}>
          <circle cx="222" cy="78" r="2" opacity="0.5" />
          <circle cx="210" cy="70" r="2.6" opacity="0.7" />
          <circle cx="200" cy="82" r="1.6" opacity="0.6" />
        </g>
        {/* broom: handle + bristles */}
        <path d="M20 84L176 70" stroke="#8a5a2b" strokeWidth="5" strokeLinecap="round" />
        <path d="M168 62l40-6-2 30-38-6z" fill="#E0A94A" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
        <path d="M176 64l26-3M176 70l28 0M176 76l26 3" stroke="#a8742b" strokeWidth="1.6" />
        <path d="M166 62v18" stroke={LOGO.red} strokeWidth="4" />
        {/* black cat sitting on the broom, facing the way they fly; its tail
            curls up from its back end and sways gently */}
        <motion.path
          d="M163 67c7 0 11-4 10-11s3-9 7-7"
          stroke={NAVY}
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
          style={{ transformBox: "view-box", transformOrigin: "163px 67px" }}
          animate={{ rotate: [-6, 8, -6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <ellipse cx="155" cy="64" rx="10" ry="7.5" fill={NAVY} />
        <path d="M150 70l-2 4M160 70l1 4" stroke={NAVY} strokeWidth="3" strokeLinecap="round" />
        <circle cx="145" cy="56" r="6.5" fill={NAVY} />
        <path d="M140 52l0-8 5 5zM146 50l4-6 1 7z" fill={NAVY} />
        <circle cx="142.5" cy="55.5" r="1.4" fill={LOGO.yellow} />
        <circle cx="147" cy="55.5" r="1.4" fill={LOGO.yellow} />
        {/* witch: cape fluttering behind */}
        <motion.path
          d="M96 50q30 6 40 26l-30-4z"
          fill="#3b2a5c"
          stroke={NAVY}
          strokeWidth="1.8"
          strokeLinejoin="round"
          style={{ transformBox: "view-box", transformOrigin: "96px 50px" }}
          animate={{ rotate: [0, -14, 0], scaleX: [1, 1.12, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
        {/* dress + legs */}
        <path d="M78 52q14-4 26 4l4 26H80z" fill="#3b2a5c" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
        <path d="M80 82l-10 14M94 82l-4 16" stroke="#2c3e57" strokeWidth="4" strokeLinecap="round" />
        <path d="M64 96h8l2 4h-12zM84 98h8l1 4H82z" fill={NAVY} />
        <path d="M82 84h20" stroke={LOGO.orange} strokeWidth="3" />
        {/* arms holding the broom */}
        <path d="M84 60l-18 20" stroke="#3b2a5c" strokeWidth="5" strokeLinecap="round" />
        <circle cx="66" cy="81" r="3.6" fill="#8fd18a" stroke={NAVY} strokeWidth="1.4" />
        {/* head: green face, orange hair, big hat */}
        <path d="M86 40q-10 8-6 22M98 40q10 8 8 20" stroke={LOGO.orange} strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="90" cy="42" r="10" fill="#8fd18a" stroke={NAVY} strokeWidth="2" />
        <circle cx="86" cy="41" r="1.6" fill={NAVY} />
        <path d="M80 44l-5 3 6 0z" fill="#8fd18a" stroke={NAVY} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M84 47q3 2 6 0" stroke={NAVY} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M70 33q22-4 42 2" stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
        <path d="M78 33L92 4q4-4 6 2l6 28z" fill="#3b2a5c" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
        <path d="M80 29h24" stroke={LOGO.orange} strokeWidth="4" />
        <rect x="88" y="26" width="6" height="6" rx="1" fill={LOGO.yellow} stroke={NAVY} strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

function Pumpkin({ size, delay, tilt = 0 }: { size: number; delay: number; tilt?: number }) {
  return (
    <svg viewBox="0 0 80 70" style={{ width: size, rotate: `${tilt}deg` }} className="drop-shadow-[0_6px_6px_rgba(13,31,53,0.25)]">
      <path d="M40 14c2-8 6-10 10-10" stroke="#3f7d22" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M46 10c6-4 12-2 14 3-6 2-10 1-14-3z" fill={LOGO.green} />
      <ellipse cx="22" cy="40" rx="16" ry="25" fill="#e8661a" stroke={NAVY} strokeWidth="2" />
      <ellipse cx="58" cy="40" rx="16" ry="25" fill="#e8661a" stroke={NAVY} strokeWidth="2" />
      <ellipse cx="40" cy="40" rx="18" ry="27" fill={LOGO.orange} stroke={NAVY} strokeWidth="2" />
      {/* glowing jack-o'-lantern face */}
      <motion.g
        fill={LOGO.yellow}
        animate={{ opacity: [1, 0.55, 0.95, 0.7, 1] }}
        transition={{ duration: 1.8, delay, repeat: Infinity }}
      >
        <path d="M24 32l8-8 6 9zM56 32l-8-8-6 9z" />
        <path d="M38 40h4l-2 5z" />
        <path d="M22 48q18 14 36 0l-4 7-5-4-4 5-4-5-5 4z" />
      </motion.g>
    </svg>
  );
}

/** A little pile of jack-o'-lanterns in the bottom-left corner. */
function Pumpkins() {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed left-2 z-[55] flex items-end md:left-5 ${CORNER_BOTTOM}`}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 110, damping: 13 }}
    >
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
        <Pumpkin size={64} delay={0} tilt={-6} />
      </motion.div>
      <div className="-ml-3 hidden md:block">
        <Pumpkin size={44} delay={0.6} tilt={8} />
      </div>
      <div className="-ml-2">
        <Pumpkin size={34} delay={1.1} tilt={-4} />
      </div>
    </motion.div>
  );
}

/* ───────────── Christmas ───────────── */

function Sleigh() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-[22vh] z-[55]"
      initial={{ x: "-30vw" }}
      animate={{ x: ["-30vw", "115vw"], y: [0, -26, 6, -18, 0] }}
      transition={{ duration: 11, delay: 2, repeat: Infinity, repeatDelay: 16, ease: "linear" }}
    >
      <svg viewBox="0 0 260 70" className="w-40 md:w-56">
        {/* sparkle trail */}
        <g fill={LOGO.yellow}>
          <circle cx="4" cy="44" r="2" opacity="0.5" />
          <circle cx="16" cy="38" r="2.5" opacity="0.7" />
          <circle cx="28" cy="46" r="1.6" opacity="0.6" />
        </g>
        {/* sleigh + Santa */}
        <path d="M40 46h58c6 0 10-6 10-12V26h-8v8H52c-6 0-12 4-12 12z" fill={LOGO.red} stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
        <path d="M36 56h70q8 0 10-8" fill="none" stroke={LOGO.yellow} strokeWidth="3" strokeLinecap="round" />
        <path d="M48 46v10M96 46v10" stroke={NAVY} strokeWidth="2" />
        <rect x="56" y="14" width="22" height="22" rx="6" fill={LOGO.red} stroke={NAVY} strokeWidth="2" />
        <circle cx="67" cy="12" r="7" fill="#F6D2B5" stroke={NAVY} strokeWidth="1.6" />
        <path d="M60 12q7 14 14 0" fill="#fff" stroke={NAVY} strokeWidth="1.2" />
        <path d="M60 8q7-12 16-2l-16 2z" fill={LOGO.red} stroke={NAVY} strokeWidth="1.4" />
        <circle cx="77" cy="6" r="2.5" fill="#fff" />
        <rect x="82" y="22" width="14" height="12" rx="2" fill={LOGO.green} stroke={NAVY} strokeWidth="1.5" />
        <path d="M89 22v12M82 28h14" stroke={LOGO.yellow} strokeWidth="2" />
        {/* reins */}
        <path d="M100 28q30 6 62 0" stroke={NAVY} strokeWidth="1.2" fill="none" />
        {/* two reindeer, legs galloping */}
        {[160, 212].map((x, i) => (
          <g key={x}>
            <ellipse cx={x} cy="34" rx="18" ry="9" fill="#B87A45" stroke={NAVY} strokeWidth="2" />
            <circle cx={x + 18} cy="22" r="7" fill="#B87A45" stroke={NAVY} strokeWidth="2" />
            <path d={`M${x + 16} 15l-4-9M${x + 14} 9l-5-2M${x + 21} 15l3-9M${x + 23} 9l5-2`} stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx={x + 25} cy="23" r="2.4" fill={i === 1 ? LOGO.red : NAVY} />
            <motion.path
              d={`M${x - 10} 40l-4 12M${x - 2} 41l2 12M${x + 6} 41l-3 12M${x + 12} 40l4 12`}
              stroke={NAVY}
              strokeWidth="2.2"
              strokeLinecap="round"
              animate={{ rotate: [-8, 8, -8] }}
              style={{ originX: `${x}px`, originY: "40px" }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

function Snowman() {
  const [bubble, say] = useBubble();
  return (
    <motion.div
      className={`pointer-events-auto fixed left-3 z-[60] w-[62px] cursor-pointer md:left-6 md:w-[78px] ${CORNER_BOTTOM}`}
      initial={{ y: 120 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 90, damping: 12 }}
      whileHover={{ rotate: -4, scale: 1.05 }}
      onTap={() => say(["Brrr!", "Ho ho ho!", "Let it snow!"][Math.floor(Math.random() * 3)])}
      role="img"
      aria-label="Waving snowman"
    >
      <AnimatePresence>{bubble && <Bubble text={bubble} side="right" />}</AnimatePresence>
      <svg viewBox="0 0 80 100" className="w-full drop-shadow-[0_10px_12px_rgba(13,31,53,0.22)]">
        <circle cx="40" cy="72" r="24" fill="#fff" stroke={NAVY} strokeWidth="2.4" />
        <circle cx="40" cy="36" r="17" fill="#fff" stroke={NAVY} strokeWidth="2.4" />
        <rect x="27" y="10" width="26" height="6" rx="2" fill={NAVY} />
        <rect x="31" y="-6" width="18" height="18" rx="3" fill={NAVY} />
        <rect x="31" y="6" width="18" height="4" fill={LOGO.red} />
        <circle cx="34" cy="33" r="2.2" fill={NAVY} />
        <circle cx="46" cy="33" r="2.2" fill={NAVY} />
        <path d="M40 38l12 3-12 2z" fill={LOGO.orange} />
        <path d="M33 44q7 4 14 0" stroke={NAVY} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M23 50q17 8 34 0l-2 7q-15 5-30 0z" fill={LOGO.red} stroke={NAVY} strokeWidth="1.5" />
        <path d="M51 54l6 14 6-2-7-13" fill={LOGO.red} stroke={NAVY} strokeWidth="1.5" />
        <circle cx="40" cy="66" r="2.4" fill={NAVY} />
        <circle cx="40" cy="78" r="2.4" fill={NAVY} />
        <path d="M17 66L2 58M6 61l-3-6" stroke="#8a5a2b" strokeWidth="2.4" strokeLinecap="round" />
        <motion.path
          d="M63 64l13-14M71 55l6 1"
          stroke="#8a5a2b"
          strokeWidth="2.4"
          strokeLinecap="round"
          style={{ originX: "63px", originY: "64px" }}
          animate={{ rotate: [0, -24, 0, -24, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.5 }}
        />
      </svg>
    </motion.div>
  );
}

/* ───────────── 11.11 ───────────── */

const CONFETTI_COLORS = [LOGO.red, LOGO.yellow, LOGO.green, LOGO.blue, LOGO.orange, LOGO.lightBlue];

/** One burst of confetti flying up from a point and tumbling down. */
function Burst({ x, y, count = 26, spread = 1 }: { x: string; y: string; count?: number; spread?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed z-[70]" style={{ left: x, top: y }}>
      {Array.from({ length: count }, (_, i) => {
        const angle = (-Math.PI / 2) + ((i / count) - 0.5) * Math.PI * 0.9 * spread;
        const power = 160 + ((i * 47) % 140);
        const dx = Math.cos(angle) * power;
        const dy = Math.sin(angle) * power;
        return (
          <motion.span
            key={i}
            className="absolute block h-2.5 w-1.5 rounded-[1px]"
            style={{ background: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{ x: [0, dx, dx * 1.2], y: [0, dy, dy + 360], rotate: [0, 360, 720], opacity: [1, 1, 0] }}
            transition={{ duration: 2.4, times: [0, 0.35, 1], ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

function ArrivalConfetti() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("xtronic-1111-burst")) return;
      sessionStorage.setItem("xtronic-1111-burst", "1");
    } catch {
      // storage blocked: still celebrate once on this page
    }
    const t = setTimeout(() => setShow(true), 700);
    const end = setTimeout(() => setShow(false), 4000);
    return () => {
      clearTimeout(t);
      clearTimeout(end);
    };
  }, []);
  if (!show) return null;
  return (
    <>
      <Burst x="8vw" y="92vh" spread={0.6} />
      <Burst x="92vw" y="92vh" spread={0.6} />
    </>
  );
}

function Balloon() {
  const [popped, setPopped] = useState(false);
  const [burst, setBurst] = useState<{ x: number; y: number } | null>(null);
  function pop(e: React.MouseEvent) {
    setBurst({ x: e.clientX, y: e.clientY });
    setPopped(true);
    setTimeout(() => setBurst(null), 2600);
    setTimeout(() => setPopped(false), 9000);
  }
  return (
    <>
      <AnimatePresence>
        {!popped && (
          <motion.button
            type="button"
            onClick={pop}
            aria-label="Pop the 11.11 balloon"
            className={`fixed right-3 z-[60] w-[56px] md:right-8 md:w-[70px] ${CORNER_BOTTOM}`}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: [0, -12, 0], opacity: 1, rotate: [-3, 3, -3] }}
            exit={{ scale: 1.6, opacity: 0, transition: { duration: 0.18 } }}
            transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 4, repeat: Infinity }, opacity: { duration: 0.6 } }}
            whileHover={{ scale: 1.08 }}
          >
            <svg viewBox="0 0 70 120" className="w-full drop-shadow-[0_10px_12px_rgba(13,31,53,0.25)]">
              <path d="M35 4C17 4 5 18 5 36c0 22 18 38 30 42 12-4 30-20 30-42C65 18 53 4 35 4z" fill={LOGO.red} stroke={NAVY} strokeWidth="2.2" />
              <ellipse cx="22" cy="24" rx="6" ry="10" fill="#fff" opacity="0.35" />
              <path d="M31 78l4 6 4-6z" fill={LOGO.red} stroke={NAVY} strokeWidth="1.6" />
              <text x="35" y="44" textAnchor="middle" fontFamily="var(--font-fredoka), sans-serif" fontWeight="700" fontSize="17" fill="#fff">11.11</text>
              <path d="M35 84q-8 10 0 18t0 16" stroke={NAVY} strokeWidth="1.4" fill="none" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
      {burst && <Burst x={`${burst.x}px`} y={`${burst.y}px`} count={22} spread={2} />}
    </>
  );
}

/* ───────────── Easter ───────────── */

function Bunny() {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed left-0 z-[55] ${CORNER_BOTTOM}`}
      initial={{ x: "-15vw" }}
      animate={{ x: ["-15vw", "110vw"] }}
      transition={{ duration: 10, delay: 1.5, repeat: Infinity, repeatDelay: 14, ease: "linear" }}
    >
      <motion.svg
        viewBox="0 0 70 60"
        className="w-14 md:w-[72px]"
        animate={{ y: [0, -34, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "easeOut" }}
      >
        <ellipse cx="30" cy="40" rx="20" ry="14" fill="#fff" stroke={NAVY} strokeWidth="2" />
        <circle cx="10" cy="38" r="5" fill="#fff" stroke={NAVY} strokeWidth="1.8" />
        <circle cx="50" cy="28" r="11" fill="#fff" stroke={NAVY} strokeWidth="2" />
        <path d="M46 19C42 4 44 0 47 1s4 8 3 18M53 19c2-14 6-17 8-15s-1 10-5 16" fill="#fff" stroke={NAVY} strokeWidth="2" />
        <path d="M47 8c0 4 1 7 1.5 10M57 7c-1 4-2 7-3 11" stroke={LOGO.red} strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
        <circle cx="54" cy="26" r="2" fill={NAVY} />
        <circle cx="60" cy="30" r="2" fill={LOGO.red} opacity="0.7" />
        <path d="M20 52l-3 6M38 52l3 6" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  );
}

const EGG_GOAL = 5;
const EGG_KEY = "xtronic-egg-hunt";
const EGG_COLORS = [
  [LOGO.lightBlue, "#fff"],
  [LOGO.orange, LOGO.yellow],
  [LOGO.green, "#fff"],
  [LOGO.red, LOGO.yellow],
  [LOGO.yellow, LOGO.blue],
];

function Egg({ colors }: { colors: string[] }) {
  return (
    <svg viewBox="0 0 40 50" className="w-full drop-shadow-[0_6px_8px_rgba(13,31,53,0.25)]">
      <path d="M20 2c10 0 18 16 18 28a18 18 0 0 1-36 0C2 18 10 2 20 2z" fill={colors[0]} stroke={NAVY} strokeWidth="2" />
      <path d="M3 26l6-4 5 4 6-4 6 4 5-4 6 4" fill="none" stroke={colors[1]} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="13" cy="37" r="2.4" fill={colors[1]} />
      <circle cx="20" cy="40" r="2.4" fill={colors[1]} />
      <circle cx="27" cy="37" r="2.4" fill={colors[1]} />
    </svg>
  );
}

/** Eggs peek in from the screen edges now and then; tap to collect all 5. */
function EggHunt() {
  const [found, setFound] = useState(0);
  const [egg, setEgg] = useState<{ id: number; side: "left" | "right"; top: number } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [burst, setBurst] = useState<{ x: number; y: number; id: number } | null>(null);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore progress from this browser once
      setFound(Math.min(EGG_GOAL, Number(localStorage.getItem(EGG_KEY)) || 0));
    } catch {
      // storage blocked: start from zero
    }
  }, []);

  // Every ~11s an egg peeks out for 6s, until all are found.
  useEffect(() => {
    if (found >= EGG_GOAL) return;
    let hide: ReturnType<typeof setTimeout>;
    const peek = () => {
      setEgg({ id: Date.now(), side: Math.random() < 0.5 ? "left" : "right", top: 22 + Math.random() * 50 });
      hide = setTimeout(() => setEgg(null), 6000);
    };
    const first = setTimeout(peek, 3500);
    const loop = setInterval(peek, 11000);
    return () => {
      clearTimeout(first);
      clearInterval(loop);
      clearTimeout(hide);
    };
  }, [found]);

  function collect(e: React.MouseEvent) {
    const next = Math.min(EGG_GOAL, found + 1);
    setFound(next);
    setEgg(null);
    setBurst({ x: e.clientX, y: e.clientY, id: Date.now() });
    setTimeout(() => setBurst(null), 2500);
    setToast(next >= EGG_GOAL ? "You found all 5 eggs! Happy Easter! 🐣" : `Egg found! ${next} of ${EGG_GOAL}`);
    setTimeout(() => setToast(null), next >= EGG_GOAL ? 5000 : 2200);
    try {
      localStorage.setItem(EGG_KEY, String(next));
    } catch {
      // ignore
    }
  }

  return (
    <>
      <AnimatePresence>
        {egg && found < EGG_GOAL && (
          <motion.button
            key={egg.id}
            type="button"
            onClick={collect}
            aria-label="Collect the Easter egg"
            className="fixed z-[60] w-10 md:w-12"
            style={{ top: `${egg.top}vh`, [egg.side]: 0 }}
            initial={{ x: egg.side === "left" ? -60 : 60, rotate: egg.side === "left" ? 30 : -30 }}
            animate={{ x: egg.side === "left" ? -10 : 10, rotate: [0, -10, 10, -6, 0] }}
            exit={{ x: egg.side === "left" ? -60 : 60, opacity: 0 }}
            transition={{ x: { type: "spring", stiffness: 160, damping: 14 }, rotate: { duration: 1.2, repeat: Infinity, repeatDelay: 0.8 } }}
            whileHover={{ scale: 1.15 }}
          >
            <Egg colors={EGG_COLORS[found % EGG_COLORS.length]} />
          </motion.button>
        )}
      </AnimatePresence>
      {burst && <Burst key={burst.id} x={`${burst.x}px`} y={`${burst.y}px`} count={found >= EGG_GOAL ? 40 : 16} spread={2} />}
      <AnimatePresence>
        {toast && (
          <motion.p
            role="status"
            className="fixed left-1/2 top-24 z-[1000] -translate-x-1/2 rounded-full border-2 border-white bg-brand-green px-5 py-2 font-heading text-sm font-bold text-white shadow-lg"
            initial={{ y: -30, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            {toast}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────── Scene ───────────── */

export default function SeasonScene({ season }: { season: ThemeId }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- characters are browser-only decoration
  useEffect(() => setMounted(true), []);
  if (!mounted || reduce) return null;

  switch (season) {
    case "halloween":
      return (
        <>
          <Ghost />
          <Bat top="20vh" delay={3} />
          <Bat top="30vh" delay={4.2} scale={0.7} />
          <Spider />
          <Witch />
          <Pumpkins />
        </>
      );
    case "christmas":
      return (
        <>
          <Sleigh />
          <Snowman />
        </>
      );
    case "singles-day":
      return (
        <>
          <ArrivalConfetti />
          <Balloon />
        </>
      );
    case "easter":
      return (
        <>
          <Bunny />
          <EggHunt />
        </>
      );
  }
}
