import { LOGO } from "@/lib/brandColors";

// Detail pieces for the inner-page hero sky (placed per page by HeroScene).
// Flat, logo-coloured, navy-outlined to match ToyBricks. Motion is CSS
// (globals.css: .mini-cloud, .balloon-bob, .loop-plane, .led-blink,
// .craft-spin) so reduced-motion users get a still picture.

const NAVY = "#0D1F35";
const spin = { transformBox: "fill-box", transformOrigin: "center" } as const;

/** Small, soft, distant cloud that drifts slowly. */
export function MiniCloud({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 100 48" className={`mini-cloud ${className}`} style={{ animationDelay: `${-delay}s` }}>
      <path d="M20 46h62a14 14 0 0 0 2-28 20 20 0 0 0-37-8 15 15 0 0 0-26 9A12 12 0 0 0 20 46z" fill="#fff" opacity="0.9" />
    </svg>
  );
}

/** Striped hot-air balloon bobbing in the breeze. */
export function Balloon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 60 92" className={`balloon-bob ${className}`} style={{ filter: "drop-shadow(0 8px 10px rgba(13,31,53,0.18))" }}>
      <defs>
        <clipPath id="balloon-env">
          <path d="M30 2C47 2 58 14 58 30c0 16-14 26-20 34H22C16 56 2 46 2 30 2 14 13 2 30 2z" />
        </clipPath>
      </defs>
      <g clipPath="url(#balloon-env)">
        <rect width="60" height="70" fill={LOGO.red} />
        <path d="M30 0c-10 14-10 44-4 66h8c6-22 6-52-4-66z" fill={LOGO.yellow} />
        <path d="M6 0c-8 18-6 46 8 66h-14V0zM54 0c8 18 6 46-8 66h14V0z" fill={LOGO.yellow} />
        <ellipse cx="19" cy="20" rx="6" ry="11" fill="#fff" opacity="0.35" />
      </g>
      <path d="M30 2C47 2 58 14 58 30c0 16-14 26-20 34H22C16 56 2 46 2 30 2 14 13 2 30 2z" fill="none" stroke={NAVY} strokeWidth="2" />
      <rect x="21" y="62" width="18" height="4" rx="2" fill={LOGO.blue} stroke={NAVY} strokeWidth="1.5" />
      <path d="M23 66l2 10M37 66l-2 10" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="21" y="76" width="18" height="13" rx="3" fill="#D9A066" stroke={NAVY} strokeWidth="2" />
      <path d="M21 81h18M27 76v13M33 76v13" stroke={NAVY} strokeWidth="1" opacity="0.45" />
    </svg>
  );
}

// Loop-the-loop flight path (px, inside a 220 x 110 box).
const LOOP = "M0 86C40 86 70 42 105 36C142 30 152 70 125 79C98 88 90 52 120 40C152 27 190 30 220 16";

/** Paper plane flying a loop along a faint dotted trail. Fixed 220 x 110 px box. */
export function LoopPlane({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`h-[110px] w-[220px] ${className}`}>
      <svg viewBox="0 0 220 110" className="absolute inset-0 h-full w-full overflow-visible">
        <path d={LOOP} fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 7" opacity="0.95" />
      </svg>
      <svg viewBox="0 0 40 26" className="loop-plane absolute left-0 top-0 h-[26px] w-10" style={{ offsetPath: `path("${LOOP}")` }}>
        <path d="M2 3l36 10-26 2z" fill="#fff" stroke={NAVY} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M2 23l36-10-26 2z" fill={`color-mix(in srgb, ${LOGO.lightBlue} 45%, white)`} stroke={NAVY} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 15l26-2" stroke={NAVY} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function gearPath(cx: number, cy: number, r: number, teeth: number) {
  const pts: string[] = [];
  for (let i = 0; i < teeth * 4; i++) {
    const a = (i / (teeth * 4)) * Math.PI * 2;
    const rr = i % 4 < 2 ? r : r * 0.8;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

/** Kit parts laid out like a builder's workbench: gear, battery, LED, solar panel, screwdriver, wheel. */
export function PartsRow({ className = "" }: { className?: string }) {
  const shadow = (cx: number, rx: number) => <ellipse cx={cx} cy="113" rx={rx} ry="5" fill="rgba(13,31,53,0.13)" />;
  return (
    <svg aria-hidden viewBox="0 0 560 120" className={className} style={{ filter: "drop-shadow(0 6px 8px rgba(13,31,53,0.12))" }}>
      {shadow(52, 34)}
      <g className="craft-spin [animation-duration:10s]" style={spin}>
        <path d={gearPath(52, 74, 36, 10)} fill={LOGO.orange} stroke={NAVY} strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="52" cy="74" r="11" fill="#fff" stroke={NAVY} strokeWidth="2.2" />
      </g>
      {shadow(140, 42)}
      <rect x="102" y="86" width="70" height="26" rx="8" fill={LOGO.green} stroke={NAVY} strokeWidth="2.2" />
      <rect x="102" y="86" width="22" height="26" rx="8" fill={NAVY} />
      <rect x="172" y="92" width="8" height="14" rx="3" fill={LOGO.yellow} stroke={NAVY} strokeWidth="2" />
      <path d="M150 99h10M155 94v10" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <rect x="128" y="89" width="38" height="4" rx="2" fill="#fff" opacity="0.35" />
      {shadow(212, 16)}
      <path d="M206 96v16M218 96v14l4 3" stroke="#9AA6B2" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle className="led-blink" cx="212" cy="82" r="17" fill={LOGO.red} opacity="0.3" />
      <path d="M201 96V84a11 11 0 0 1 22 0v12z" fill={LOGO.red} stroke={NAVY} strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="198" y="94" width="28" height="5" rx="2" fill={LOGO.red} stroke={NAVY} strokeWidth="2" />
      <ellipse cx="207" cy="83" rx="2.5" ry="5" fill="#fff" opacity="0.55" />
      {shadow(296, 46)}
      <path d="M296 72l-14 40M296 72l14 40" stroke={NAVY} strokeWidth="3" strokeLinecap="round" />
      <g transform="rotate(-14 296 60)">
        <rect x="250" y="40" width="92" height="44" rx="4" fill="#B8C2CC" stroke={NAVY} strokeWidth="2.2" />
        <rect x="255" y="45" width="82" height="34" rx="2" fill={LOGO.blue} />
        <path d="M275.5 45v34M296 45v34M316.5 45v34M255 56.3h82M255 67.6h82" stroke={`color-mix(in srgb, ${LOGO.lightBlue} 70%, white)`} strokeWidth="1.4" />
        <path d="M258 48l20 0-12 14" stroke="#fff" strokeWidth="2" opacity="0.5" fill="none" strokeLinecap="round" />
      </g>
      {shadow(404, 52)}
      <g transform="rotate(-12 404 98)">
        <rect x="352" y="90" width="50" height="16" rx="8" fill={LOGO.red} stroke={NAVY} strokeWidth="2.2" />
        <path d="M362 90v16M372 90v16M382 90v16" stroke={LOGO.yellow} strokeWidth="2.6" />
        <rect x="400" y="95" width="46" height="6" rx="2" fill="#B8C2CC" stroke={NAVY} strokeWidth="1.8" />
        <path d="M446 95l8 3-8 3z" fill="#B8C2CC" stroke={NAVY} strokeWidth="1.8" strokeLinejoin="round" />
      </g>
      {shadow(512, 30)}
      <g className="craft-spin [animation-duration:8s]" style={spin}>
        <circle cx="512" cy="80" r="31" fill={NAVY} />
        <circle cx="512" cy="80" r="31" fill="none" stroke="#2c3e57" strokeWidth="5" strokeDasharray="5 5" />
        <circle cx="512" cy="80" r="17" fill={LOGO.yellow} stroke={NAVY} strokeWidth="2" />
        <circle cx="512" cy="80" r="6" fill="#fff" stroke={NAVY} strokeWidth="2" />
        <path d="M512 63v8M512 89v8M495 80h8M521 80h8" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
