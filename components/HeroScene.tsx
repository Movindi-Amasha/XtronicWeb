import { LOGO } from "@/lib/brandColors";
import ToyBricks from "./ToyBricks";

// Inner-page hero backdrop (after the client's reference): a bright sky with
// soft white glows, white hand-drawn STEM doodles, toy bricks in the corner on
// phones and a soft white wave into the page. Logo colours only. Sits behind
// content (-z-10; the hero section is `isolate`). The cloud behind the text,
// the sun and (on wider screens) the bricks come from HeroCloud, which sizes
// itself to each page's own text.
//
// `split` is the breakpoint where the hero goes side-by-side (text left,
// kids right); it decides which doodles show.


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

      {/* toy bricks in the bottom-left corner on phones (on wider screens they sit on the text cloud: HeroCloud) */}
      <ToyBricks className={`absolute bottom-1 left-1 h-20 w-[6.5rem] ${mob}`} />

      {/* soft white wave into the page */}
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-10 w-full md:h-16">
        <path d="M0 40C240 85 480 85 720 55S1200 5 1440 35V90H0Z" fill="#fff" opacity="0.55" />
        <path d="M0 52C240 95 480 95 720 66S1200 18 1440 46V90H0Z" fill={`color-mix(in srgb, ${LOGO.blue} 4%, white)`} />
      </svg>
    </div>
  );
}
