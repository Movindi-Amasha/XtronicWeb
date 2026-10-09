import { LOGO } from "@/lib/brandColors";

// Inner-page hero backdrop (after the client's reference): a bright sky, a
// big fluffy white cloud behind the heading/text, a smiling doodle sun near
// the kids, a few faint white hand-drawn tool doodles, leaves in the corner
// and a soft white wave into the page. Logo colours only. Sits behind content
// (-z-10; the hero section is `isolate`).
//
// `split` is the breakpoint where the hero goes side-by-side (text left,
// kids right); below it the cloud sits behind the stacked text instead.

const NAVY = "#0D1F35";

/** Circles along the edge of a rounded rectangle; filled white they read as one fluffy cloud. */
function cloudBumps(w: number, h: number, pad: number, step: number, rMin: number, rMax: number) {
  const pts: [number, number][] = [];
  for (let x = pad; x <= w - pad; x += step) pts.push([x, pad], [x, h - pad]);
  for (let y = pad + step; y < h - pad; y += step) pts.push([pad, y], [w - pad, y]);
  return pts.map(([cx, cy], i) => ({ cx, cy, r: rMin + (rMax - rMin) * (0.5 + 0.5 * Math.sin(i * 2.3)) }));
}

function Cloud({ w, h, pad, step, rMin, rMax, className }: { w: number; h: number; pad: number; step: number; rMin: number; rMax: number; className: string }) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={className}
      style={{ filter: `drop-shadow(0 14px 24px color-mix(in srgb, ${LOGO.blue} 22%, transparent))`, overflow: "visible" }}
    >
      <g fill="#fff">
        <rect x={pad} y={pad} width={w - pad * 2} height={h - pad * 2} />
        {cloudBumps(w, h, pad, step, rMin, rMax).map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />
        ))}
      </g>
    </svg>
  );
}

function Sun({ className }: { className: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" className="scatter-spin absolute inset-0 h-full w-full [animation-duration:24s]">
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x="47" y="2" width="6" height="16" rx="3" fill={LOGO.yellow} transform={`rotate(${i * 36} 50 50)`} />
        ))}
      </svg>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <circle cx="50" cy="50" r="27" fill={LOGO.yellow} />
        <circle cx="50" cy="50" r="27" fill="none" stroke={LOGO.orange} strokeWidth="2.5" opacity="0.6" />
        <circle cx="41" cy="46" r="3" fill={NAVY} />
        <circle cx="59" cy="46" r="3" fill={NAVY} />
        <path d="M39 56c5 7 17 7 22 0" stroke={NAVY} strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="35" cy="55" r="3.5" fill={LOGO.orange} opacity="0.45" />
        <circle cx="65" cy="55" r="3.5" fill={LOGO.orange} opacity="0.45" />
      </svg>
    </div>
  );
}

// Hand-drawn doodles for the sky: thin white line icons plus a few yellow
// scribbles near the sun. `on` = shown side-by-side (desk) or stacked (mob).
type Doodle = { el: React.ReactNode; className: string; delay: number; color?: "yellow"; on: "desk" | "mob" };

const D = {
  gear: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />,
  sparkle: <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />,
  plane: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />,
  bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9z" />,
  bulb: <path d="M9 18h6M10 22h4M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />,
  atom: (
    <>
      <circle cx="12" cy="12" r="1.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" />
    </>
  ),
  ruler: <path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2" />,
  note: <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />,
  star: <path d="M12 2l3 6.5 7 .9-5.1 4.8 1.3 6.8L12 17.8 5.8 21l1.3-6.8L2 9.4l7-.9z" />,
  swirl: <path d="M2 19c4-2 5-9 10-9 3 0 4 4 1 4s-3-6 3-9c2-1 4-1 6 0M22 5l-3-2.5M22 5l-2.5 3" />,
};

const DOODLES: Doodle[] = [
  { el: D.swirl, className: "left-[57%] top-[3%] h-10 w-12", delay: 0.3, color: "yellow", on: "desk" },
  { el: D.bolt, className: "left-[65%] top-[7%] h-8 w-8", delay: 0.9, on: "desk" },
  { el: D.sparkle, className: "right-[24%] top-[4%] h-7 w-7", delay: 0.6, on: "desk" },
  { el: D.bulb, className: "right-[2.5%] top-[5%] h-10 w-10", delay: 1.4, on: "desk" },
  { el: D.gear, className: "right-[2%] top-[32%] h-11 w-11", delay: 0, on: "desk" },
  { el: D.atom, className: "right-[3%] top-[52%] h-10 w-10", delay: 2.1, on: "desk" },
  { el: D.plane, className: "right-[4%] bottom-[20%] h-10 w-10", delay: 1.8, on: "desk" },
  { el: D.ruler, className: "left-[53%] bottom-[10%] h-9 w-9", delay: 1.2, on: "desk" },
  { el: D.star, className: "left-[51%] top-[30%] h-6 w-6", delay: 0.5, color: "yellow", on: "desk" },
  { el: D.note, className: "right-[30%] bottom-[7%] h-8 w-8", delay: 2.4, on: "desk" },
  { el: D.sparkle, className: "right-[5%] top-[62%] h-6 w-6", delay: 0.4, on: "mob" },
  { el: D.bolt, className: "left-[5%] top-[63%] h-7 w-7", delay: 1, on: "mob" },
  { el: D.plane, className: "right-[4%] bottom-[16%] h-8 w-8", delay: 1.6, on: "mob" },
  { el: D.star, className: "left-[30%] top-[62%] h-5 w-5", delay: 0.7, color: "yellow", on: "mob" },
];

/** A little stack of toy bricks with a turning gear behind it (bottom-left corner). */
function Bricks({ className }: { className: string }) {
  const shade = (c: string) => `color-mix(in srgb, ${c} 72%, black)`;
  const light = (c: string) => `color-mix(in srgb, ${c} 75%, white)`;
  const brick = (x: number, y: number, w: number, h: number, c: string, studs: number) => (
    <g>
      {Array.from({ length: studs }, (_, i) => {
        const sx = x + (w / studs) * (i + 0.5) - 8;
        return <rect key={i} x={sx} y={y - 7} width="16" height="9" rx="3" fill={light(c)} stroke={shade(c)} strokeWidth="1.5" />;
      })}
      <rect x={x} y={y} width={w} height={h} rx="5" fill={c} />
      <rect x={x} y={y + h - 7} width={w} height="7" rx="3" fill={shade(c)} opacity="0.55" />
      <rect x={x + 5} y={y + 4} width={w - 10} height="3" rx="1.5" fill="#fff" opacity="0.35" />
    </g>
  );
  return (
    <svg viewBox="0 0 170 130" className={className} style={{ filter: "drop-shadow(0 8px 10px rgba(13,31,53,0.18))" }}>
      <g className="scatter-spin [animation-duration:14s]" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path
          d="M46 14l4 8 9-2 1 9 9 2-3 9 7 6-7 6 3 9-9 2-1 9-9-2-4 8-5-7-8 4-3-9-9-1 2-9-8-5 6-7-4-8 9-3 1-9 9 2z"
          fill={LOGO.orange}
        />
        <circle cx="45" cy="47" r="9" fill="#fff" />
      </g>
      {brick(14, 92, 142, 34, LOGO.blue, 4)}
      {brick(48, 60, 76, 32, LOGO.yellow, 2)}
      <g transform="rotate(12 138 52)">{brick(112, 40, 50, 26, LOGO.red, 2)}</g>
    </svg>
  );
}

export default function HeroScene({ split = "md" }: { split?: "md" | "lg" }) {
  const desk = split === "lg" ? "hidden lg:block" : "hidden md:block";
  const mob = split === "lg" ? "lg:hidden" : "md:hidden";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${LOGO.lightBlue} 55%, white) 0%, color-mix(in srgb, ${LOGO.lightBlue} 30%, white) 45%, color-mix(in srgb, ${LOGO.lightBlue} 10%, white) 100%)`,
        }}
      />
      {/* soft background clouds + bright glow behind the kids */}
      <div className="absolute right-[8%] top-[6%] h-16 w-40 rounded-full bg-white/70 blur-xl" />
      <div className="absolute right-[34%] top-[30%] hidden h-12 w-32 rounded-full bg-white/60 blur-xl md:block" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[90%] w-[60%] rounded-full bg-white/50 blur-[70px]" />

      {/* sun */}
      <Sun className={`absolute left-[49%] top-[4%] h-24 w-24 xl:h-28 xl:w-28 ${desk}`} />

      {/* hand-drawn doodles in the sky */}
      {DOODLES.map((dd, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="none"
          stroke={dd.color === "yellow" ? LOGO.yellow : "#fff"}
          strokeWidth={dd.color === "yellow" ? 2.4 : 1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`scatter-float absolute opacity-90 ${dd.className} ${dd.on === "desk" ? desk : mob}`}
          style={{ animationDelay: `${dd.delay}s` }}
        >
          {dd.el}
        </svg>
      ))}

      {/* the big cloud behind the text */}
      <Cloud w={760} h={500} pad={80} step={62} rMin={46} rMax={72} className={`absolute left-[-3%] top-[4%] h-[90%] w-[56%] ${desk}`} />
      <Cloud w={400} h={420} pad={56} step={50} rMin={34} rMax={54} className={`absolute left-[-6%] top-[1%] h-[60%] w-[112%] ${mob}`} />

      {/* toy bricks + turning gear in the bottom-left corner */}
      <Bricks className="absolute bottom-1 left-1 h-20 w-[6.5rem] md:bottom-2 md:left-[1.5%] md:h-28 md:w-36" />

      {/* soft white wave into the page */}
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-10 w-full md:h-16">
        <path d="M0 40C240 85 480 85 720 55S1200 5 1440 35V90H0Z" fill="#fff" opacity="0.55" />
        <path d="M0 52C240 95 480 95 720 66S1200 18 1440 46V90H0Z" fill={`color-mix(in srgb, ${LOGO.blue} 4%, white)`} />
      </svg>
    </div>
  );
}
