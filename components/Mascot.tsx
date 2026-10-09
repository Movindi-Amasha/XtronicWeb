import Image from "next/image";
import { LOGO } from "@/lib/brandColors";

// The XTRONIC robot mascot (public/robot/*). Used sparingly, in the spots the
// client's mockups put him: standing at a section edge, peeking over a card,
// or flying past. Always a decent size and never squeezed in beside a kid.
// Motion lives in globals.css (.robot-bob, .robot-peek, .robot-fly).

const POSES = {
  waving: { src: "/robot/robot-waving.png", w: 1253, h: 1572 },
  cheer: { src: "/robot/robot-cheer.png", w: 1187, h: 1581 },
  balloon: { src: "/robot/robot-balloon.png", w: 1600, h: 1041 },
  building: { src: "/robot/robot-building.png", w: 1600, h: 1041 },
  gifts: { src: "/robot/robot-gifts.png", w: 1600, h: 1041 },
  bricks: { src: "/robot/robot-bricks.png", w: 1600, h: 1041 },
} as const;

export type MascotPose = keyof typeof POSES;

export default function Mascot({
  pose,
  className = "",
  motion = "bob",
  flip = false,
  sizes = "220px",
  bubble,
  bubbleSide = "left",
}: {
  pose: MascotPose;
  /** Position + height (width follows the image). */
  className?: string;
  motion?: "bob" | "peek" | "fly" | "none";
  flip?: boolean;
  sizes?: string;
  /** Optional speech bubble: [first line (blue), second line (red)]. */
  bubble?: [string, string];
  bubbleSide?: "left" | "right";
}) {
  const p = POSES[pose];
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <div className={`relative h-full w-fit ${motion === "none" ? "" : `robot-${motion}`}`}>
        <Image
          src={p.src}
          alt=""
          width={p.w}
          height={p.h}
          sizes={sizes}
          className={`h-full w-auto max-w-none object-contain drop-shadow-[0_14px_16px_rgba(13,31,53,0.25)] ${flip ? "-scale-x-100" : ""}`}
        />
        {bubble && (
          <div
            className={`speech-bubble absolute -top-4 whitespace-nowrap rounded-[44%] border-[3px] border-brand-navy bg-white px-3.5 py-2 text-center font-heading text-sm font-bold leading-[1.05] shadow-[4px_5px_0_rgba(13,31,53,0.15)] sm:text-base ${
              bubbleSide === "left" ? "right-[78%] -rotate-[7deg]" : "left-[78%] rotate-[7deg]"
            }`}
          >
            <span style={{ color: LOGO.blue }}>{bubble[0]}</span>
            <br />
            <span style={{ color: LOGO.red }}>{bubble[1]}</span>
            <span
              className={`absolute -bottom-2.5 h-5 w-5 rotate-45 border-r-[3px] border-b-[3px] border-brand-navy bg-white ${bubbleSide === "left" ? "right-5" : "left-5"}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
