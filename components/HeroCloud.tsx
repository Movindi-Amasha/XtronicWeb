import { LOGO } from "@/lib/brandColors";
import ToyBricks from "./ToyBricks";

const NAVY = "#0D1F35";

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


// The white cloud behind an inner-page hero's text. It lives *inside* the
// text block (which must be `relative isolate`), so it always wraps that
// page's own heading, ribbon, paragraph and buttons, whatever their size.
// Each page has its own bump layout so no two clouds look the same.
//
// Bumps are circles centred on the cloud's edges. Their diameters are a % of
// the cloud's width (aspect-ratio keeps them round), so neighbouring bumps
// overlap by the same amount on any text length or screen size: a fluffy
// outline instead of a scalloped one. One drop-shadow shades the whole shape.

/** [position along the edge in %, diameter as % of the cloud's width] */
type Bump = [number, number];
type Shape = { t: Bump[]; b: Bump[]; l: Bump[]; r: Bump[] };

const SHAPES = {
  shop: {
    t: [[6, 20], [19, 24], [33, 19], [47, 25], [61, 20], [75, 24], [90, 19]],
    b: [[5, 24], [20, 28], [36, 22], [52, 30], [68, 24], [84, 28], [96, 20]],
    l: [[30, 26], [68, 30]],
    r: [[26, 20], [56, 24], [84, 20]],
  },
  contact: {
    t: [[8, 22], [23, 18], [38, 25], [54, 20], [70, 24], [86, 19]],
    b: [[6, 26], [24, 30], [43, 24], [62, 30], [81, 26], [96, 20]],
    l: [[34, 28], [72, 26]],
    r: [[28, 22], [64, 24]],
  },
  how: {
    t: [[8, 22], [22, 18], [36, 26], [51, 20], [65, 24], [80, 19], [93, 22]],
    b: [[7, 28], [23, 24], [40, 30], [57, 22], [73, 28], [90, 24]],
    l: [[34, 28], [72, 26]],
    r: [[30, 22], [66, 20]],
  },
  about: {
    t: [[5, 18], [18, 24], [32, 20], [46, 22], [60, 26], [75, 19], [89, 23]],
    b: [[9, 26], [27, 30], [46, 24], [64, 30], [83, 26], [97, 18]],
    l: [[44, 30]],
    r: [[22, 20], [52, 24], [82, 20]],
  },
  schools: {
    t: [[9, 24], [24, 19], [38, 25], [53, 20], [68, 24], [83, 20], [95, 18]],
    b: [[6, 24], [21, 30], [38, 24], [55, 30], [72, 24], [89, 28]],
    l: [[24, 24], [52, 28], [80, 26]],
    r: [[20, 20], [50, 24], [80, 20]],
  },
  parents: {
    t: [[7, 20], [21, 25], [36, 19], [50, 24], [64, 20], [78, 25], [92, 19]],
    b: [[10, 30], [29, 24], [47, 30], [65, 26], [84, 30]],
    l: [[30, 28], [70, 26]],
    r: [[34, 22], [72, 20]],
  },
} satisfies Record<string, Shape>;

export type CloudShape = keyof typeof SHAPES;

// How far each bump pokes out past the edge (fraction of its diameter).
// Top bumps poke out least so the cloud stays clear of the header.
const OUT = { t: 0.24, b: 0.32, l: 0.36, r: 0.36 } as const;

function place(edge: "t" | "b" | "l" | "r", at: number): React.CSSProperties {
  const o = `${OUT[edge] * 100}%`;
  if (edge === "t") return { left: `${at}%`, top: 0, translate: `-50% -${o}` };
  if (edge === "b") return { left: `${at}%`, bottom: 0, translate: `-50% ${o}` };
  if (edge === "l") return { top: `${at}%`, left: 0, translate: `-${o} -50%` };
  return { top: `${at}%`, right: 0, translate: `${o} -50%` };
}

export default function HeroCloud({ shape, className = "" }: { shape: CloudShape; className?: string }) {
  const s: Shape = SHAPES[shape];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 -inset-x-4 -top-3 -bottom-5 sm:-inset-x-8 md:-left-12 md:-right-6 md:-top-1 md:-bottom-5 ${className}`}
      style={{ filter: `drop-shadow(0 16px 26px color-mix(in srgb, ${LOGO.blue} 24%, transparent))` }}
    >
      <div className="absolute inset-0 rounded-[40px] bg-white" />
      {(["t", "b", "l", "r"] as const).flatMap((edge) =>
        s[edge].map(([at, d], i) => (
          <span key={`${edge}${i}`} className="absolute aspect-square rounded-full bg-white" style={{ width: `${d}%`, ...place(edge, at) }} />
        )),
      )}
      {/* sun sitting on the cloud's top-right shoulder (wide screens) */}
      <Sun className="absolute right-0 top-0 hidden h-20 w-20 translate-x-[55%] -translate-y-[20%] md:block xl:h-24 xl:w-24" />
      {/* toy bricks resting on the cloud's bottom-left edge, clear of the text */}
      <ToyBricks className="absolute bottom-0 left-14 hidden h-20 w-[6.5rem] translate-y-[78%] md:block" />
    </div>
  );
}
