"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { LOGO } from "@/lib/brandColors";
import { formatPrice, getProductBySlug } from "@/lib/products";

// "Watch it come together": a pinned homepage section where the Solar 4WD
// Rover assembles from its parts as you scroll (framer-motion useScroll +
// useTransform). Parts fly in from all around and snap into place with a
// little sparkle; scrolling back up takes it apart again. The drawing
// follows the real kit: red body with yellow flames, rear fins with
// cut-outs, a blue star decal, light-blue base and rims, black tyres and a
// navy solar panel. Reduced-motion users see the finished car and the steps.

const NAVY = "#0D1F35";
const TYRE = "#1c2333";
const BASE = `color-mix(in srgb, ${LOGO.lightBlue} 55%, white)`;
const RIM = `color-mix(in srgb, ${LOGO.lightBlue} 75%, white)`;
const PANEL = "#16264a";

const STEPS = [
  { title: "Base plate", desc: "The light-blue chassis everything clips onto.", at: [0.06, 0.2] },
  { title: "Motor & gears", desc: "A small DC motor and gears turn the wheels.", at: [0.2, 0.34] },
  { title: "Four wheels", desc: "Grippy tyres press onto the axles.", at: [0.34, 0.5] },
  { title: "Racer body", desc: "The flame-painted body slots on top.", at: [0.5, 0.64] },
  { title: "Solar panel", desc: "Clip it on and connect the wires to the motor.", at: [0.64, 0.78] },
] as const;
const DONE_AT = 0.8;

type From = { x: number; y: number; r?: number };

// Computed SVG coordinates are rounded so server and browser render identical
// numbers (Math.cos can differ in the last digit between engines).
const n = (v: number) => Math.round(v * 100) / 100;

/** Motion values that fly a part in from `from` (scattered) to its place over [a, b]. */
function usePart(p: MotionValue<number>, [a, b]: readonly [number, number], from: From) {
  const x = useTransform(p, [a, b], [from.x, 0], { clamp: true });
  const y = useTransform(p, [a, b], [from.y, 0], { clamp: true });
  const rotate = useTransform(p, [a, b], [from.r ?? 0, 0], { clamp: true });
  const scale = useTransform(p, [a, b], [0.8, 1], { clamp: true });
  return { x, y, rotate, scale, transformBox: "fill-box" as const, transformOrigin: "center" };
}

/** A sparkle that pops where a part snaps in, as it lands at `at`. */
function Snap({ p, at, cx, cy, color }: { p: MotionValue<number>; at: number; cx: number; cy: number; color: string }) {
  const k = useTransform(p, [at - 0.02, at, at + 0.035], [0, 1, 0], { clamp: true });
  const r = useTransform(k, [0, 1], [8, 34]);
  return (
    <motion.g style={{ opacity: k }}>
      <motion.circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="3" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <path
            key={i}
            d={`M${n(cx + Math.cos(a) * 22)} ${n(cy + Math.sin(a) * 22)}L${n(cx + Math.cos(a) * 40)} ${n(cy + Math.sin(a) * 40)}`}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
    </motion.g>
  );
}

function Wheel({ cx, cy, far = false }: { cx: number; cy: number; far?: boolean }) {
  const r = 44;
  return (
    <g opacity={far ? 0.75 : 1}>
      <circle cx={cx} cy={cy} r={r} fill={TYRE} stroke={NAVY} strokeWidth="2.5" />
      {/* chunky tread */}
      {Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2;
        return (
          <rect
            key={i}
            x={n(cx + Math.cos(a) * (r - 2) - 3)}
            y={n(cy + Math.sin(a) * (r - 2) - 4)}
            width="6"
            height="8"
            rx="1.5"
            fill="#0b101b"
            transform={`rotate(${n((a * 180) / Math.PI + 90)} ${n(cx + Math.cos(a) * (r - 2))} ${n(cy + Math.sin(a) * (r - 2))})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r - 13} fill={far ? "#7fb9e0" : RIM} stroke={NAVY} strokeWidth="2" />
      {/* five spokes, like the kit's rims */}
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return (
          <path
            key={i}
            d={`M${n(cx + Math.cos(a - 0.22) * 8)} ${n(cy + Math.sin(a - 0.22) * 8)}L${n(cx + Math.cos(a - 0.12) * 28)} ${n(cy + Math.sin(a - 0.12) * 28)}L${n(cx + Math.cos(a + 0.12) * 28)} ${n(cy + Math.sin(a + 0.12) * 28)}L${n(cx + Math.cos(a + 0.22) * 8)} ${n(cy + Math.sin(a + 0.22) * 8)}z`}
            fill={TYRE}
          />
        );
      })}
      <circle cx={cx} cy={cy} r="8" fill="#fff" stroke={NAVY} strokeWidth="2" />
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2 + 0.63;
        return <circle key={i} cx={n(cx + Math.cos(a) * 14)} cy={n(cy + Math.sin(a) * 14)} r="1.8" fill={NAVY} />;
      })}
      <circle cx={cx} cy={cy} r="3" fill={NAVY} />
    </g>
  );
}

function gearPath(cx: number, cy: number, r: number, teeth: number) {
  const pts: string[] = [];
  for (let i = 0; i < teeth * 4; i++) {
    const a = (i / (teeth * 4)) * Math.PI * 2;
    const rr = i % 4 < 2 ? r : r * 0.78;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

function Star({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const rr = i % 2 ? r * 0.45 : r;
    return `${n(cx + Math.cos(a) * rr)},${n(cy + Math.sin(a) * rr)}`;
  });
  return <path d={`M${pts.join("L")}Z`} fill={fill} stroke={NAVY} strokeWidth="1.4" strokeLinejoin="round" />;
}

function Stage({ p, still }: { p: MotionValue<number>; still: boolean }) {
  const s = (i: number) => STEPS[i].at;
  // Parts start scattered far out around the stage and fly in.
  const base = usePart(p, s(0), { x: -320, y: 60, r: -14 });
  const motor = usePart(p, s(1), { x: 300, y: -150, r: 50 });
  const wheelBL = usePart(p, s(2), { x: -330, y: -40, r: -300 });
  const wheelBR = usePart(p, s(2), { x: 320, y: -80, r: 300 });
  const wheelFL = usePart(p, [s(2)[0] + 0.03, s(2)[1]], { x: -300, y: 120, r: -360 });
  const wheelFR = usePart(p, [s(2)[0] + 0.03, s(2)[1]], { x: 300, y: 130, r: 360 });
  const body = usePart(p, s(3), { x: 0, y: -300, r: -10 });
  const panel = usePart(p, s(4), { x: 280, y: -240, r: 28 });
  const wire = useTransform(p, [s(4)[0] + 0.06, s(4)[1]], [0, 1], { clamp: true });
  const wireShow = useTransform(wire, (v) => (v > 0.01 ? 1 : 0));

  // Finale: the sun comes out and the car rolls forward. Its nose points
  // left, so it drives left with the wheels turning anticlockwise, kicking
  // up dust, with speed lines behind it.
  const sun = useTransform(p, [DONE_AT - 0.04, DONE_AT + 0.04], [0, 1], { clamp: true });
  const drive = useTransform(p, [DONE_AT, 1], [0, -70], { clamp: true });
  const spin = useTransform(p, [DONE_AT, 1], [0, -540], { clamp: true });
  const sunSpin = useTransform(p, [DONE_AT, 1], [0, 180], { clamp: true });
  const gearSpin = useTransform(p, [DONE_AT, 1], [0, 900], { clamp: true });
  const glow = useTransform(p, [DONE_AT - 0.02, DONE_AT + 0.06], [0, 0.9], { clamp: true });
  const go = useTransform(p, [DONE_AT + 0.02, DONE_AT + 0.08], [0, 1], { clamp: true });
  const dust = useTransform(p, [DONE_AT, 1], [0, 1], { clamp: true });
  const dustX = useTransform(dust, [0, 1], [0, 46]);
  const dustR = useTransform(dust, [0, 1], [4, 14]);

  // Part styles apply only while animating (the still version shows the finished car).
  const st = <T extends object>(v: T) => (still ? undefined : v);
  const turn = still ? undefined : { transformBox: "fill-box" as const, transformOrigin: "center", rotate: spin };

  return (
    <svg viewBox="0 0 640 400" className="h-full w-full overflow-visible" role="img" aria-label="Solar 4WD Rover assembling from its parts">
      {/* blueprint grid on the "workbench" */}
      <g opacity="0.35">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={`v${i}`} d={`M${40 + i * 48} 60V340`} stroke={LOGO.lightBlue} strokeWidth="1" strokeDasharray="2 6" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <path key={`h${i}`} d={`M40 ${80 + i * 52}H616`} stroke={LOGO.lightBlue} strokeWidth="1" strokeDasharray="2 6" />
        ))}
      </g>

      {/* sun + rays to the panel */}
      <motion.g style={still ? undefined : { opacity: sun }}>
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "center", rotate: still ? 0 : sunSpin }}>
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <path key={i} d={`M${n(560 + Math.cos(a) * 38)} ${n(52 + Math.sin(a) * 38)}L${n(560 + Math.cos(a) * 52)} ${n(52 + Math.sin(a) * 52)}`} stroke={LOGO.yellow} strokeWidth="5" strokeLinecap="round" />;
          })}
        </motion.g>
        <circle cx="560" cy="52" r="30" fill={LOGO.yellow} stroke={NAVY} strokeWidth="2.5" />
        <path d="M549 50q2 3 4 0M567 50q2 3 4 0M552 62q8 7 16 0" stroke={NAVY} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M520 80L420 160M535 92L455 165" stroke={LOGO.yellow} strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
      </motion.g>

      {/* ground shadow */}
      <ellipse cx="320" cy="350" rx="230" ry="14" fill={NAVY} opacity="0.12" />

      {/* finale: speed lines and dust behind the car */}
      {!still && (
        <motion.g style={{ opacity: go }}>
          {[250, 280, 312].map((y, i) => (
            <motion.path key={y} d={`M${560 + i * 10} ${y}h${50 - i * 8}`} stroke={i === 1 ? LOGO.orange : LOGO.lightBlue} strokeWidth="4" strokeLinecap="round" style={{ x: dustX }} />
          ))}
          <motion.circle cx="500" cy="336" r={dustR} fill="#e9dcc8" style={{ x: dustX }} />
          <motion.circle cx="520" cy="328" r={dustR} fill="#f3eadb" style={{ x: dustX }} />
          <motion.circle cx="262" cy="338" r={dustR} fill="#f3eadb" style={{ x: dustX }} />
        </motion.g>
      )}

      <motion.g style={still ? undefined : { x: drive }}>
        {/* far-side wheels (behind everything) */}
        <motion.g style={st(wheelBL)}>
          <motion.g style={turn}>
            <Wheel cx={206} cy={300} far />
          </motion.g>
        </motion.g>
        <motion.g style={st(wheelBR)}>
          <motion.g style={turn}>
            <Wheel cx={456} cy={300} far />
          </motion.g>
        </motion.g>

        {/* 1. base plate: light-blue board with diamond cut-outs and a blue rear tab */}
        <motion.g style={st(base)}>
          <path d="M520 258h44q8 0 8 8v4h-52z" fill={LOGO.blue} stroke={NAVY} strokeWidth="2" />
          <rect x="532" y="261" width="20" height="6" rx="3" fill="#fff" stroke={NAVY} strokeWidth="1.2" />
          <path d="M70 268h60l14-10h300l14 10h70q10 0 10 10v6q0 8-10 8H70q-10 0-10-8v-6q0-10 10-10z" fill={BASE} stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M96 274l10 6-10 6-10-6zM540 274l10 6-10 6-10-6zM300 276l12 5-12 5-12-5z" fill="#fff" stroke={NAVY} strokeWidth="1.5" />
          <path d="M150 262h290" stroke="#fff" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" />
          <path d="M62 290h516" stroke="#8a5a2b" strokeOpacity="0.5" strokeWidth="2" />
        </motion.g>

        {/* 2. motor + gears */}
        <motion.g style={st(motor)}>
          <rect x="378" y="226" width="58" height="32" rx="8" fill="#c7cfd8" stroke={NAVY} strokeWidth="2.2" />
          <rect x="378" y="226" width="14" height="32" rx="5" fill="#9aa6b2" stroke={NAVY} strokeWidth="2" />
          <path d="M392 234h40" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
          <circle cx="372" cy="236" r="3" fill={LOGO.red} />
          <circle cx="372" cy="248" r="3" fill={NAVY} />
          <motion.path d={gearPath(446, 250, 13, 10)} fill={LOGO.orange} stroke={NAVY} strokeWidth="1.8" style={still ? undefined : { transformBox: "fill-box", transformOrigin: "center", rotate: gearSpin }} />
          <motion.path d={gearPath(470, 272, 20, 14)} fill={LOGO.yellow} stroke={NAVY} strokeWidth="1.8" style={turn} />
          <circle cx="470" cy="272" r="5" fill="#fff" stroke={NAVY} strokeWidth="1.5" />
        </motion.g>

        {/* 4. racer body */}
        <motion.g style={st(body)}>
          {/* white side wing under the body */}
          <path d="M330 262l40-16h70l-24 16z" fill="#fff" stroke={NAVY} strokeWidth="1.8" strokeLinejoin="round" />
          {/* rear fins with cut-out windows */}
          <path d="M470 160L478 112q4-10 14-8l18 4-8 52z" fill={LOGO.red} stroke={NAVY} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M484 120l16 3-3 20-15-1z" fill="#fff" stroke={NAVY} strokeWidth="1.4" />
          <path
            d="M86 262L110 246L232 214L330 200L470 158L506 132L540 132L528 176L520 206L516 262z"
            fill={LOGO.red}
            stroke={NAVY}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* yellow flames along the nose and sides */}
          <path d="M100 254L150 238L230 222L296 214L250 236L314 232L246 252L292 256L196 262H96z" fill={LOGO.yellow} stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M430 206l40-8-14 22 30-4-24 26 26 2-40 18h-30z" fill={LOGO.yellow} stroke={NAVY} strokeWidth="1.4" strokeLinejoin="round" />
          {/* cut-out windows with white trim */}
          <path d="M346 214l46-6-10 22-44 6z" fill={NAVY} stroke="#fff" strokeWidth="2" />
          <path d="M150 244l40-10-8 12z" fill={NAVY} />
          <path d="M120 252l30-8-6 8z" fill={NAVY} />
          <path d="M502 144l22-2-6 16-18 2z" fill="#fff" stroke={NAVY} strokeWidth="1.5" />
          {/* blue star decal */}
          <Star cx={496} cy={186} r={12} fill={LOGO.blue} />
          {/* number plate */}
          <rect x="250" y="232" width="34" height="16" rx="4" fill="#fff" stroke={NAVY} strokeWidth="1.6" transform="rotate(-8 267 240)" />
          <text x="267" y="244.5" textAnchor="middle" fontFamily="var(--font-fredoka), sans-serif" fontWeight="700" fontSize="11" fill={LOGO.blue} transform="rotate(-8 267 240)">
            XK
          </text>
          <path d="M120 250L330 206" stroke="#fff" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
          {/* headlight */}
          <circle cx="100" cy="252" r="4" fill={LOGO.yellow} stroke={NAVY} strokeWidth="1.4" />
        </motion.g>

        {/* 5. solar panel + wires */}
        <motion.path d="M424 196C450 214 452 224 436 232" fill="none" stroke={LOGO.red} strokeWidth="3" strokeLinecap="round" style={still ? undefined : { pathLength: wire, opacity: wireShow }} />
        <motion.path d="M416 198C436 220 420 236 392 236" fill="none" stroke={NAVY} strokeWidth="3" strokeLinecap="round" style={still ? undefined : { pathLength: wire, opacity: wireShow }} />
        <motion.g style={st(panel)}>
          <path d="M226 206L430 168L436 180L232 218z" fill="#2c3e57" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
          <path d="M224 196L428 158L432 170L228 208z" fill={PANEL} stroke={NAVY} strokeWidth="2.4" strokeLinejoin="round" />
          {[0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875].map((t) => (
            <path key={t} d={`M${n(224 + 204 * t)} ${n(196 - 38 * t)}l4 12`} stroke={`color-mix(in srgb, ${LOGO.lightBlue} 55%, ${PANEL})`} strokeWidth="1.2" />
          ))}
          <path d="M226 202L430 164" stroke="#dfe7ef" strokeWidth="1.4" strokeDasharray="5 3" />
          <motion.path d="M246 198L330 182" stroke="#fff" strokeWidth="3" strokeLinecap="round" style={still ? { opacity: 0.6 } : { opacity: glow }} />
        </motion.g>

        {/* near-side wheels (in front) */}
        <motion.g style={st({ x: wheelFL.x, y: wheelFL.y, scale: wheelFL.scale })}>
          <motion.g style={still ? undefined : { transformBox: "fill-box", transformOrigin: "center", rotate: wheelFL.rotate }}>
            <motion.g style={turn}>
              <Wheel cx={190} cy={306} />
            </motion.g>
          </motion.g>
        </motion.g>
        <motion.g style={st({ x: wheelFR.x, y: wheelFR.y, scale: wheelFR.scale })}>
          <motion.g style={still ? undefined : { transformBox: "fill-box", transformOrigin: "center", rotate: wheelFR.rotate }}>
            <motion.g style={turn}>
              <Wheel cx={440} cy={306} />
            </motion.g>
          </motion.g>
        </motion.g>
      </motion.g>

      {/* a sparkle as each part clicks into place */}
      {!still && (
        <>
          <Snap p={p} at={s(0)[1]} cx={320} cy={276} color={LOGO.lightBlue} />
          <Snap p={p} at={s(1)[1]} cx={420} cy={244} color={LOGO.orange} />
          <Snap p={p} at={s(2)[1]} cx={190} cy={306} color={LOGO.green} />
          <Snap p={p} at={s(2)[1]} cx={440} cy={306} color={LOGO.green} />
          <Snap p={p} at={s(3)[1]} cx={300} cy={214} color={LOGO.red} />
          <Snap p={p} at={s(4)[1]} cx={330} cy={186} color={LOGO.yellow} />
        </>
      )}
    </svg>
  );
}

function StepList({ active, done }: { active: number; done: boolean }) {
  return (
    <ol className="mt-5 flex flex-col gap-1.5">
      {STEPS.map((step, i) => {
        const isActive = !done && i === active;
        const isDone = done || i < active;
        return (
          <li
            key={step.title}
            className={`flex items-start gap-3 rounded-2xl px-3 py-2 transition-colors duration-300 ${isActive ? "bg-white shadow-[0_8px_20px_-12px_rgba(13,31,53,0.35)]" : ""}`}
          >
            <span
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full font-heading text-sm font-bold text-white transition-colors duration-300"
              style={{ background: isDone || isActive ? [LOGO.blue, LOGO.orange, LOGO.green, LOGO.red, LOGO.yellow][i] : "#cbd5e1" }}
            >
              {isDone && !isActive ? "✓" : i + 1}
            </span>
            <span>
              <strong className={`block font-heading text-base font-bold transition-colors ${isActive || isDone ? "text-brand-navy" : "text-brand-navy/40"}`}>{step.title}</strong>
              <span className={`block overflow-hidden text-sm font-semibold text-muted transition-[max-height,opacity] duration-300 ${isActive ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}>
                {step.desc}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function RoverAssembly() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(false);
  const bar = useTransform(scrollYProgress, [0, DONE_AT], [0, 1], { clamp: true });
  const product = getProductBySlug("solar-4wd-rover");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setDone(v >= DONE_AT);
    const i = STEPS.findLastIndex((s) => v >= s.at[0]);
    setActive(Math.max(0, i));
  });

  const heading = (
    <>
      <p className="font-heading text-sm font-bold uppercase tracking-[0.16em]" style={{ color: LOGO.orange }}>
        Inside the box
      </p>
      <h2 id="assembly-heading" className="mt-1 text-[clamp(30px,4vw,46px)] font-bold leading-[1.05] tracking-tight" style={{ color: LOGO.blue }}>
        Watch it <span style={{ color: LOGO.orange }}>come together</span>
      </h2>
      <p className="mt-2 max-w-md font-semibold text-muted">Scroll to build the Solar 4WD Rover, one part at a time.</p>
    </>
  );

  const finale = (
    <motion.div
      initial={false}
      animate={{ opacity: done || reduce ? 1 : 0, y: done || reduce ? 0 : 16 }}
      transition={{ duration: 0.35 }}
      className={`mt-5 flex flex-wrap items-center gap-3 ${done || reduce ? "" : "pointer-events-none"}`}
      aria-hidden={!(done || reduce)}
    >
      <p className="font-heading text-2xl font-bold" style={{ color: LOGO.green }}>
        Ready to roll! ☀️
      </p>
      <Link
        href="/shop/solar-4wd-rover"
        tabIndex={done || reduce ? undefined : -1}
        className="btn-brick inline-flex items-center gap-2 rounded-btn bg-brand-amber px-5 py-2.5 font-heading text-sm font-semibold text-white"
        style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
      >
        Shop the Solar Rover{product ? ` · ${formatPrice(product.priceCents)}` : ""} <span aria-hidden>→</span>
      </Link>
    </motion.div>
  );

  // Reduced motion: no pinning or flying parts, just the finished car and the steps.
  if (reduce) {
    return (
      <section aria-labelledby="assembly-heading" className="mx-auto grid max-w-[1200px] items-center gap-8 px-4 pt-20 md:grid-cols-[0.9fr_1.1fr] md:px-6">
        <div>
          {heading}
          <StepList active={STEPS.length} done />
          {finale}
        </div>
        <div className="aspect-[8/5]">
          <Stage p={scrollYProgress} still />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="assembly-heading" className="relative mt-16 h-[300vh]">
      <div className="sticky top-20 flex h-[calc(100vh-80px)] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-4 px-4 md:grid-cols-[0.85fr_1.15fr] md:gap-8 md:px-6">
          <div className="order-2 md:order-1">
            <div className="hidden md:block">{heading}</div>
            {/* progress through the build */}
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white shadow-inner md:mt-6">
              <motion.div className="h-full origin-left rounded-full" style={{ scaleX: bar, background: `linear-gradient(90deg, ${LOGO.blue}, ${LOGO.green})` }} />
            </div>
            <div className="hidden md:block">
              <StepList active={active} done={done} />
            </div>
            {/* phones: just the current step */}
            <div className="mt-3 md:hidden">
              {!done && <p className="font-heading text-lg font-bold text-brand-navy">{`${active + 1}. ${STEPS[active].title}`}</p>}
              {!done && <p className="text-sm font-semibold text-muted">{STEPS[active].desc}</p>}
            </div>
            {finale}
          </div>
          <div className="order-1 md:order-2">
            <div className="md:hidden">{heading}</div>
            <div className="relative mx-auto mt-2 aspect-[8/5] w-full max-w-[640px]">
              <div aria-hidden className="absolute inset-[8%] rounded-full bg-white/70 blur-2xl" />
              <div className="relative h-full w-full">
                <Stage p={scrollYProgress} still={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
