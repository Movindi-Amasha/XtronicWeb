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

/** "From a simple idea to a brighter future": a glowing idea bulb with a gear
 *  turning inside, and a rocket launching out of it along a dotted trail. */
export function StoryArt() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden>
      {/* soft glow + rays */}
      <circle className="story-glow" style={spinOrigin} cx="92" cy="98" r="62" fill={LOGO.yellow} opacity="0.22" />
      <g className="craft-spin [animation-duration:30s]" style={spinOrigin}>
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x="89" y="18" width="6" height="16" rx="3" fill={LOGO.yellow} opacity="0.7" transform={`rotate(${i * 30} 92 98)`} />
        ))}
      </g>
      {/* bulb */}
      <path d="M92 50a40 40 0 0 0-24 72c6 5 8 10 8 16h32c0-6 2-11 8-16a40 40 0 0 0-24-72z" fill={LOGO.yellow} stroke={NAVY} strokeWidth="3" strokeLinejoin="round" />
      <path d="M70 80a26 26 0 0 1 18-18" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.6" fill="none" />
      <path className="craft-spin [animation-duration:6s]" style={spinOrigin} d={gearPath(92, 98, 17, 8)} fill={LOGO.orange} stroke={NAVY} strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="92" cy="98" r="6" fill="#fff" stroke={NAVY} strokeWidth="2.4" />
      <rect x="76" y="138" width="32" height="9" rx="3" fill="#B8C2CC" stroke={NAVY} strokeWidth="2.4" />
      <rect x="78" y="147" width="28" height="9" rx="3" fill="#B8C2CC" stroke={NAVY} strokeWidth="2.4" />
      <path d="M86 162h12" stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
      {/* dotted trail from the bulb to the rocket */}
      <path d="M126 76C150 60 160 40 190 30" fill="none" stroke={LOGO.blue} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8" />
      {/* rocket */}
      <g className="story-rocket">
        <g transform="translate(196 26) rotate(45)">
          <path className="join-flame" style={spinOrigin} d="M-6 18c0 9 6 13 6 13s6-4 6-13z" fill={LOGO.orange} />
          <path d="M0-24c9 7 12 18 10 34H-10C-12-6-9-17 0-24z" fill="#fff" stroke={NAVY} strokeWidth="2.6" strokeLinejoin="round" />
          <circle cx="0" cy="-6" r="5" fill={LOGO.lightBlue} stroke={NAVY} strokeWidth="2.4" />
          <path d="M-10 2l-8 10 9-2zM10 2l8 10-9-2z" fill={LOGO.red} stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
          <path d="M-8 10h16v6H-8z" fill={LOGO.blue} stroke={NAVY} strokeWidth="2" />
        </g>
      </g>
      <Sparkle x={30} y={40} s={8} color={LOGO.blue} delay={0} />
      <Sparkle x={168} y={110} s={7} color={LOGO.orange} delay={0.7} />
      <Sparkle x={210} y={150} s={6} color={LOGO.green} delay={1.4} />
      <Sparkle x={36} y={160} s={6} color={LOGO.red} delay={1} />
    </svg>
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

// Kits that ride the conveyor belt one after another (CraftArt).
const BELT_KITS = ["solar-4wd-rover", "voice-robot", "wooden-taxiing-aircraft", "solar-speedboat", "solar-butterfly"];
/** Seconds each kit spends crossing the belt; the cycle repeats every BELT_KITS.length × this. */
const BELT_STEP = 4.5;
// Next's image optimiser, so the small belt pictures aren't the full-size cut-outs.
const beltSrc = (slug: string) => `/_next/image?url=${encodeURIComponent(`/products/${slug}/cutout.png`)}&w=256&q=75`;

/** Meshing gears turn while the kits ride along a moving conveyor belt, one after another. */
export function CraftArt() {
  const cycle = BELT_KITS.length * BELT_STEP;
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 420 120" preserveAspectRatio="xMinYMid meet" className="absolute inset-0 h-full w-full">
        <path className="craft-spin" style={spinOrigin} d={gearPath(62, 60, 36, 10)} fill={LOGO.orange} stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="62" cy="60" r="11" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
        <path className="craft-spin-rev" style={spinOrigin} d={gearPath(118, 34, 22, 8)} fill={LOGO.blue} stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="118" cy="34" r="7" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
        <path className="craft-spin-rev" style={spinOrigin} d={gearPath(116, 88, 16, 7)} fill={LOGO.yellow} stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="116" cy="88" r="5" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
        {/* kits riding the belt: each enters at the left end, travels across and drops off the right */}
        {BELT_KITS.map((slug, i) => (
          <g
            key={slug}
            className="belt-ride"
            style={{ animationDuration: `${cycle}s`, animationDelay: `${i * BELT_STEP - cycle}s` }}
          >
            <image href={beltSrc(slug)} x="0" y="44" width="76" height="54" preserveAspectRatio="xMidYMax meet" className="belt-bump" />
          </g>
        ))}
        {/* conveyor belt */}
        <rect x="160" y="96" width="250" height="16" rx="8" fill={NAVY} />
        <path className="craft-belt" d="M170 104H400" stroke={LOGO.yellow} strokeWidth="7" strokeDasharray="8 8" />
        {[176, 394].map((x) => (
          <circle key={x} className="craft-spin" style={spinOrigin} cx={x} cy="104" r="9" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeDasharray="4 3" />
        ))}
        <Sparkle x={168} y={24} s={6} color={LOGO.yellow} delay={0.4} />
        <Sparkle x={400} y={20} s={5} color={LOGO.blue} delay={1.2} />
      </svg>
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
