"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LOGO } from "@/lib/brandColors";
import HeroScatter from "@/components/HeroScatter";

const BRICKS = [
  { tone: "bg-brand-amber shadow-[inset_0_-4px_0_var(--color-brand-amber-600)]", pos: "left-[1%] top-[82%]", size: "h-7 w-12", studs: 2, rotate: "8deg", delay: "0s" },
  { tone: "bg-brand-blue shadow-[inset_0_-4px_0_var(--color-brand-blue-600)]", pos: "right-[2%] top-[6%]", size: "h-6 w-10", studs: 2, rotate: "-10deg", delay: ".6s" },
  { tone: "bg-brand-green shadow-[inset_0_-4px_0_var(--color-brand-green-700)]", pos: "left-[46%] top-[90%]", size: "h-6 w-10", studs: 2, rotate: "-6deg", delay: "1.2s" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden pt-10 pb-18 md:pt-14 md:pb-24"
      style={{
        background:
          "radial-gradient(900px 600px at 80% 20%, #fff 0%, transparent 60%), radial-gradient(1000px 700px at 2% 98%, var(--color-brand-yellow-50), transparent 72%), linear-gradient(180deg, #cfe9ff 0%, #e9f5ff 45%, #fff 100%)",
      }}
    >
        <HeroScatter set="a" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        {BRICKS.map((b, i) => (
          <motion.div
            key={i}
            animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: Number(b.delay.replace("s", "")) }}
            className={`absolute rounded-md opacity-45 ${b.tone} ${b.pos} ${b.size}`}
            style={{ transform: `rotate(${b.rotate})` }}
          >
            <div className="absolute inset-x-0 -top-[7px] flex justify-center gap-1.5">
              {Array.from({ length: b.studs }).map((_, s) => (
                <span key={s} className={`h-[9px] w-[9px] rounded-full ${b.tone.split(" ")[0]}`} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-10 px-4 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-12 md:px-6">
        <div>
          {/* Comic-style stacked headline: white outline + drop shadow, each
              line in a logo colour, slightly tilted like a sticker. */}
          <h1 className="flex -rotate-3 flex-col font-heading text-[3.1rem] leading-[0.95] font-bold uppercase tracking-tight sm:text-7xl md:text-[5.4rem]">
            {[
              ["Build it.", LOGO.blue],
              ["Learn it.", LOGO.yellow],
              ["Play it.", LOGO.orange],
            ].map(([line, color]) => (
              <span
                key={line}
                className="text-comic"
                style={{ color, "--comic-stroke": "#fff", "--comic-shadow": "rgba(13,31,53,0.25)" } as React.CSSProperties}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-lg text-lg font-semibold text-brand-navy-700">
            Fun STEM kits that inspire the{" "}
            <strong className="text-brand-amber">next generation of creators</strong>.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
            <Link
              href="/shop"
              className="btn-brick flex items-center justify-center gap-2.5 rounded-btn bg-brand-amber px-7 py-4 font-heading text-base font-semibold text-white"
              style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
            >
              Shop STEM Kits
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/how-it-works"
              className="btn-brick flex items-center justify-center gap-2.5 rounded-btn border-2 border-line bg-white px-7 py-4 font-heading text-base font-semibold text-brand-navy"
              style={{ "--btn-brick-shadow": "#d9e2f2" } as React.CSSProperties}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-blue text-xs text-white">▶</span>
              See how it works
            </Link>
          </div>

        </div>

        <div className="relative mx-auto aspect-[1/0.95] w-full max-w-[460px] md:max-w-[620px]">
          {/* Wooden signpost, as in the mockup. */}
          <div aria-hidden className="pointer-events-none absolute -top-2 right-0 z-20 rotate-[6deg] md:-right-6 md:-top-4">
            <div
              className="speech-bubble rounded-xl border-[3px] border-[#7a4a1f] px-4 py-2.5 text-center font-heading text-base font-bold uppercase leading-[1.05] shadow-[4px_6px_0_rgba(13,31,53,0.18)] sm:px-5 sm:text-xl"
              style={{ background: "repeating-linear-gradient(0deg, #f4c27a 0 9px, #eab468 9px 11px)" }}
            >
              <span style={{ color: LOGO.blue }}>STEM</span> <span style={{ color: LOGO.orange }}>Fun</span>
              <br />
              <span style={{ color: LOGO.red }}>Brighter</span>
              <br />
              <span style={{ color: LOGO.green }}>Tomorrow!</span>
            </div>
            <div className="mx-auto h-8 w-3 rounded-b bg-[#a8692f] shadow-[inset_-3px_0_0_rgba(0,0,0,0.15)] sm:h-12" />
          </div>
          {/* Soft layered spotlight instead of a brick/stud plate — the logo
              itself already reads as a chunky brick icon, so a second brick
              texture behind it just competed. A blurred radial glow plus a
              thin ring gives depth without fighting the mark. */}
          <div
            aria-hidden
            className="absolute inset-[6%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--color-brand-blue-50) 0%, var(--color-brand-amber-50) 60%, transparent 78%)",
              filter: "blur(18px)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-[14%] rounded-full border-2 opacity-30"
            style={{ borderColor: "var(--color-brand-blue)" }}
          />
          <div
            aria-hidden
            className="absolute inset-[22%] rounded-full border-2 opacity-20"
            style={{ borderColor: "var(--color-brand-amber)" }}
          />

          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -14, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-14%] grid place-items-center"
          >
            <div className="relative h-full w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.3)]">
              <Image
                src="/brand/xtronic-logo-transparent.png"
                alt="XTRONIC KIDS"
                fill
                priority
                sizes="620px"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
