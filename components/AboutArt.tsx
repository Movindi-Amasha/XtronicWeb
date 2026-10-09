import Image from "next/image";
import { LOGO } from "@/lib/brandColors";

// Small looping illustrations for the About page cards. Pure SVG + CSS
// animations (globals.css: .mission-*, .vision-*, .craft-*, .join-*), so they
// work in server components and stop for reduced-motion users.

const NAVY = "#0D1F35";
const spinOrigin = { transformBox: "fill-box", transformOrigin: "center" } as const;

/** Square-toothed gear outline centred on (cx, cy). */
function gearPath(cx: number, cy: number, r: number, teeth: number) {
  const pts: string[] = [];
  for (let i = 0; i < teeth * 4; i++) {
    const a = (i / (teeth * 4)) * Math.PI * 2;
    const rr = i % 4 < 2 ? r : r * 0.8;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

function Sparkle({ x, y, s, color, delay }: { x: number; y: number; s: number; color: string; delay: number }) {
  return (
    <path
      className="anim-twinkle"
      style={{ ...spinOrigin, animationDelay: `${delay}s` }}
      d={`M${x} ${y - s}c${s * 0.15} ${s * 0.6} ${s * 0.4} ${s * 0.85} ${s} ${s}c-${s * 0.6} ${s * 0.15} -${s * 0.85} ${s * 0.4} -${s} ${s}c-${s * 0.15} -${s * 0.6} -${s * 0.4} -${s * 0.85} -${s} -${s}c${s * 0.6} -${s * 0.15} ${s * 0.85} -${s * 0.4} ${s} -${s}z`}
      fill={color}
    />
  );
}

/** Dart flies in and thunks into a bullseye; a ripple spreads from the hit. */
export function MissionArt() {
  return (
    <svg viewBox="0 0 220 120" className="h-full w-full" aria-hidden>
      <g className="mission-thunk" style={spinOrigin}>
        <circle cx="132" cy="62" r="44" fill={LOGO.red} stroke={NAVY} strokeWidth="3" />
        <circle cx="132" cy="62" r="34" fill="#fff" />
        <circle cx="132" cy="62" r="24" fill={LOGO.red} />
        <circle cx="132" cy="62" r="14" fill="#fff" />
        <circle cx="132" cy="62" r="6" fill={LOGO.red} />
      </g>
      <circle className="mission-ripple" style={spinOrigin} cx="132" cy="62" r="44" fill="none" stroke={LOGO.red} strokeWidth="3" />
      <g className="mission-dart">
        <path d="M70 62h58" stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
        <path d="M128 62l-9-5v10z" fill={NAVY} />
        <path d="M70 62l-12-10h10l8 10zM70 62l-12 10h10l8-10z" fill={LOGO.orange} stroke={NAVY} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      <Sparkle x={196} y={20} s={7} color={LOGO.yellow} delay={0} />
      <Sparkle x={70} y={22} s={5} color={LOGO.blue} delay={0.8} />
      <Sparkle x={200} y={100} s={5} color={LOGO.orange} delay={1.5} />
    </svg>
  );
}

/** Telescope scans a twinkling sky while a shooting star streaks past. */
export function VisionArt() {
  return (
    <svg viewBox="0 0 220 120" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="vision-trail" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor={LOGO.yellow} />
        </linearGradient>
      </defs>
      <path d="M176 18a14 14 0 1 0 12 22 11 11 0 1 1-12-22z" fill={LOGO.yellow} />
      {[
        [120, 22, 5, 0],
        [150, 48, 4, 0.6],
        [196, 70, 5, 1.2],
        [100, 50, 3.5, 1.8],
        [205, 24, 3.5, 0.9],
      ].map(([x, y, s, d], i) => (
        <Sparkle key={i} x={x} y={y} s={s} color={i % 2 ? "#fff" : LOGO.yellow} delay={d} />
      ))}
      <g className="vision-shoot">
        <path d="M90 14l44 18" stroke="url(#vision-trail)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="134" cy="32" r="3.5" fill={LOGO.yellow} />
      </g>
      <g className="vision-scan" style={{ transformBox: "view-box", transformOrigin: "62px 78px" }}>
        <g transform="rotate(-28 62 78)">
          <rect x="34" y="68" width="78" height="20" rx="6" fill={LOGO.blue} stroke={NAVY} strokeWidth="2.5" />
          <rect x="52" y="68" width="8" height="20" fill={LOGO.orange} />
          <rect x="84" y="68" width="8" height="20" fill={LOGO.orange} />
          <rect x="108" y="64" width="12" height="28" rx="3" fill={LOGO.lightBlue} stroke={NAVY} strokeWidth="2.5" />
          <rect x="22" y="72" width="14" height="12" rx="3" fill={NAVY} />
        </g>
      </g>
      <path d="M62 82l-18 34M62 82l2 34M62 82l20 34" stroke={NAVY} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="62" cy="80" r="5" fill={NAVY} />
    </svg>
  );
}

/** Meshing gears turn while the rover drives along a moving conveyor belt. */
export function CraftArt() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 420 120" preserveAspectRatio="xMinYMid meet" className="absolute inset-0 h-full w-full">
        <path className="craft-spin" style={spinOrigin} d={gearPath(62, 60, 36, 10)} fill={LOGO.orange} stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="62" cy="60" r="11" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
        <path className="craft-spin-rev" style={spinOrigin} d={gearPath(118, 34, 22, 8)} fill={LOGO.blue} stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="118" cy="34" r="7" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
        <path className="craft-spin-rev" style={spinOrigin} d={gearPath(116, 88, 16, 7)} fill={LOGO.yellow} stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="116" cy="88" r="5" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
        {/* conveyor belt */}
        <rect x="160" y="96" width="250" height="16" rx="8" fill={NAVY} />
        <path className="craft-belt" d="M170 104H400" stroke={LOGO.yellow} strokeWidth="7" strokeDasharray="8 8" />
        {[176, 394].map((x) => (
          <circle key={x} className="craft-spin" style={spinOrigin} cx={x} cy="104" r="9" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeDasharray="4 3" />
        ))}
        <Sparkle x={168} y={24} s={6} color={LOGO.yellow} delay={0.4} />
        <Sparkle x={400} y={20} s={5} color={LOGO.blue} delay={1.2} />
      </svg>
      <div className="anim-drive absolute bottom-[14%] right-[6%] h-[62%] w-[34%] max-w-[150px]">
        <Image src="/products/solar-4wd-rover/cutout.png" alt="" fill sizes="150px" className="object-contain object-bottom" />
      </div>
    </div>
  );
}

const CONFETTI = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 41) % 100}%`,
  w: 6 + (i % 3) * 2,
  h: 9 + (i % 2) * 4,
  color: [LOGO.red, LOGO.blue, LOGO.green, "#fff", LOGO.orange][i % 5],
  delay: (i * 0.55) % 6,
  dur: 6 + (i % 4),
}));

/** Falling confetti + a rocket that launches across the panel (Join Our Mission). */
export function JoinCelebration() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className="club-confetti absolute top-0 block rounded-sm"
          style={{ left: c.left, width: c.w, height: c.h, background: c.color, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }}
        />
      ))}
      <svg viewBox="0 0 60 60" className="join-rocket absolute h-12 w-12 sm:h-14 sm:w-14">
        <g transform="rotate(45 30 30)">
          <path className="join-flame" style={spinOrigin} d="M24 46c0 8 6 12 6 12s6-4 6-12z" fill={LOGO.orange} />
          <path d="M30 4c9 7 12 18 10 34H20C18 22 21 11 30 4z" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="30" cy="22" r="5" fill={LOGO.lightBlue} stroke={NAVY} strokeWidth="2.5" />
          <path d="M20 30l-8 10 9-2zM40 30l8 10-9-2z" fill={LOGO.red} stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 38h16v6H22z" fill={LOGO.blue} stroke={NAVY} strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
