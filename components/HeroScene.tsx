import { LOGO } from "@/lib/brandColors";
import ToyBricks from "./ToyBricks";
import { Balloon, LoopPlane, MiniCloud, PartsRow } from "./HeroDecor";

// Inner-page hero backdrop (after the client's reference): a bright sky with
// soft white glows, a few white hand-drawn doodles and a soft white wave into
// the page, plus per-page details placed in that page's empty areas: a
// loop-the-loop paper plane, a hot-air balloon, small drifting clouds and kit
// parts laid along the bottom like a workbench. Logo colours only. Sits behind
// content (-z-10; the hero section is `isolate`). The cloud behind the text,
// the sun and (on wider screens) the bricks come from HeroCloud.
//
// `split` is the breakpoint where the hero goes side-by-side (text left,
// kids right); the per-page details only show from there up.

type Doodle = { el: React.ReactNode; className: string; delay: number; color?: "yellow"; on: "desk" | "mob" };

const D = {
  sparkle: <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />,
  plane: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />,
  bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9z" />,
  bulb: <path d="M9 18h6M10 22h4M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />,
  star: <path d="M12 2l3 6.5 7 .9-5.1 4.8 1.3 6.8L12 17.8 5.8 21l1.3-6.8L2 9.4l7-.9z" />,
};

const DOODLES: Doodle[] = [
  { el: D.bulb, className: "right-[2.5%] top-[5%] h-10 w-10", delay: 1.4, on: "desk" },
  { el: D.plane, className: "right-[4%] bottom-[24%] h-10 w-10", delay: 1.8, on: "desk" },
  { el: D.sparkle, className: "right-[5%] top-[62%] h-6 w-6", delay: 0.4, on: "mob" },
  { el: D.bolt, className: "left-[5%] top-[63%] h-7 w-7", delay: 1, on: "mob" },
  { el: D.plane, className: "right-[4%] bottom-[16%] h-8 w-8", delay: 1.6, on: "mob" },
  { el: D.star, className: "left-[30%] top-[62%] h-5 w-5", delay: 0.7, color: "yellow", on: "mob" },
];

// Where each page's details sit (desktop), chosen around that page's own
// cloud, sun, speech bubble, mascot and kids so nothing collides.
type Decor = { balloon?: string; loop?: string; clouds: string[]; parts?: string };

const DECOR = {
  // Text cloud starts low here, so the open sky is top-left; the boy fills the right.
  shop: {
    balloon: "left-[4%] top-[4%] h-24 w-16",
    loop: "left-[14%] top-[1%]",
    clouds: ["left-[33%] top-[4%] w-24", "left-[46%] top-[12%] w-16"],
    parts: "left-[38%] bottom-[1%] w-[26%]",
  },
  how: {
    balloon: "right-[3%] top-[30%] h-24 w-16",
    loop: "left-[57%] top-[1%]",
    clouds: ["right-[9%] top-[1%] w-20"],
    parts: "left-[50%] bottom-[2%] w-[40%]",
  },
  // About has the mascot standing at the right edge, so the balloon floats left of the bubble.
  about: {
    balloon: "left-[52%] top-[30%] h-20 w-14",
    loop: "left-[57%] top-[1%]",
    clouds: ["right-[22%] top-[2%] w-20"],
    parts: "left-[50%] bottom-[2%] w-[34%]",
  },
  schools: {
    balloon: "right-[3%] top-[33%] h-24 w-16",
    loop: "left-[61%] top-[1%]",
    clouds: ["right-[9%] top-[1%] w-20"],
    parts: "left-[54%] bottom-[2%] w-[38%]",
  },
  parents: {
    balloon: "right-[3%] top-[30%] h-24 w-16",
    loop: "left-[62%] top-[0%]",
    clouds: ["right-[9%] top-[1%] w-20"],
    parts: "left-[54%] bottom-[2%] w-[38%]",
  },
  contact: {
    balloon: "right-[3%] top-[34%] h-24 w-16",
    loop: "left-[55%] top-[1%]",
    clouds: ["right-[24%] top-[3%] w-20"],
    parts: "left-[52%] bottom-[1%] w-[30%]",
  },
  gallery: {
    balloon: "right-[3%] top-[44%] h-24 w-16",
    clouds: ["left-[50%] top-[6%] w-20", "right-[8%] top-[2%] w-16"],
  },
} satisfies Record<string, Decor>;

export type HeroDecorKey = keyof typeof DECOR;

export default function HeroScene({ split = "md", decor }: { split?: "md" | "lg"; decor?: HeroDecorKey }) {
  const desk = split === "lg" ? "hidden lg:block" : "hidden md:block";
  const mob = split === "lg" ? "lg:hidden" : "md:hidden";
  const d: Decor | undefined = decor ? DECOR[decor] : undefined;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${LOGO.lightBlue} 55%, white) 0%, color-mix(in srgb, ${LOGO.lightBlue} 30%, white) 45%, color-mix(in srgb, ${LOGO.lightBlue} 10%, white) 100%)`,
        }}
      />
      {/* soft background glows (the big one brightens the area behind the kids) */}
      <div className="absolute right-[8%] top-[6%] h-16 w-40 rounded-full bg-white/70 blur-xl" />
      <div className="absolute right-[34%] top-[30%] hidden h-12 w-32 rounded-full bg-white/60 blur-xl md:block" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[90%] w-[60%] rounded-full bg-white/50 blur-[70px]" />

      {/* small distant clouds drifting */}
      {d?.clouds.map((c, i) => <MiniCloud key={c} className={`absolute ${c} ${desk}`} delay={i * 5} />)}

      {/* hand-drawn doodles */}
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

      {/* paper plane looping on a dotted trail, and a hot-air balloon */}
      {d?.loop && <LoopPlane className={`absolute ${d.loop} ${desk}`} />}
      {d?.balloon && <Balloon className={`absolute ${d.balloon} ${desk}`} />}

      {/* soft white wave into the page */}
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-10 w-full md:h-16">
        <path d="M0 40C240 85 480 85 720 55S1200 5 1440 35V90H0Z" fill="#fff" opacity="0.55" />
        <path d="M0 52C240 95 480 95 720 66S1200 18 1440 46V90H0Z" fill={`color-mix(in srgb, ${LOGO.blue} 4%, white)`} />
      </svg>

      {/* kit parts resting along the bottom like a workbench */}
      {d?.parts && <PartsRow className={`absolute ${d.parts} ${desk}`} />}

      {/* toy bricks in the bottom-left corner on phones (on wider screens they sit on the text cloud: HeroCloud) */}
      <ToyBricks className={`absolute bottom-1 left-1 h-20 w-[6.5rem] ${mob}`} />
    </div>
  );
}
