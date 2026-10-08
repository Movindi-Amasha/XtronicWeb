import Image from "next/image";
import Link from "next/link";
import LineIcon from "./LineIcon";
import { LOGO } from "@/lib/brandColors";
import Doodled from "@/components/Doodled";

// anim = which step-icon-* hover animation (globals.css) the icon plays.
const STEPS = [
  { icon: "📦", anim: "hop", title: "Choose Your Kit", color: LOGO.blue },
  { icon: "🔧", anim: "twist", title: "Build It", color: LOGO.orange },
  { icon: "💡", anim: "glow", title: "Discover How It Works", color: LOGO.green },
  { icon: "🎮", anim: "mash", title: "Play & Experiment", color: LOGO.red },
  { icon: "🏆", anim: "cheer", title: "Create Again!", color: LOGO.yellow },
];

export default function HowItWorksSteps() {
  return (
    <section id="how" aria-labelledby="how-it-works-heading" className="mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
      <div
        className="relative grid items-center gap-8 overflow-hidden rounded-[32px] border-2 border-line px-5 py-10 sm:px-8 lg:grid-cols-[1fr_340px] lg:py-8"
        style={{ background: "linear-gradient(120deg, #fff 0%, #fff 55%, #e9f5ff 100%)" }}
      >
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Doodled preset="left"><h2 id="how-it-works-heading" className="text-[clamp(30px,4vw,44px)] font-bold tracking-tight" style={{ color: LOGO.blue }}>
                How It <span style={{ color: LOGO.orange }}>Works</span>
              </h2></Doodled>
              <p className="mt-1 text-lg font-semibold text-muted">From box to brilliant creations!</p>
            </div>
            <span className="hidden -rotate-12 text-brand-blue/70 sm:block">
              <LineIcon name="send" size={44} strokeWidth={1.6} />
            </span>
          </div>

          <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-2">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative flex sm:justify-center">
                <div className="step-card relative flex w-full cursor-default items-center gap-4 rounded-card border-2 border-line bg-white p-3 transition-[translate,scale,box-shadow,border-color] duration-300 ease-out hover:z-10 hover:-translate-y-1.5 hover:scale-[1.06] hover:shadow-[0_18px_30px_-14px_rgba(14,30,63,0.35)] sm:flex-col sm:gap-2 sm:border-transparent sm:bg-transparent sm:px-1 sm:py-3 sm:text-center sm:hover:border-line sm:hover:bg-white">
                  <span
                    className="step-badge flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-heading text-[11px] font-bold text-white shadow"
                    style={{ background: step.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`step-icon-${step.anim} block text-4xl`}>{step.icon}</span>
                  <h3 className="text-[15px] font-semibold leading-tight text-brand-navy">{step.title}</h3>
                </div>
                {i < STEPS.length - 1 && (
                  <svg
                    aria-hidden
                    viewBox="0 0 24 12"
                    width="20"
                    height="10"
                    className="absolute top-[38%] -right-[14px] z-20 hidden sm:block"
                    fill="none"
                    stroke={STEPS[i + 1].color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6h18M15 1l5 5-5 5" />
                  </svg>
                )}
              </li>
            ))}
          </ol>

          <Link
            href="/how-it-works"
            className="mt-6 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-brand-blue hover:text-brand-blue-600"
          >
            See the full guide <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[300px] lg:max-w-none">
          <div aria-hidden className="absolute inset-[6%] rounded-full" style={{ background: "radial-gradient(circle, #fff 0%, #d6ecff 60%, transparent 75%)" }} />
          <Image
            src="/mascot/playing-with-robot.png"
            alt="XTRONIC mascot building a robot"
            fill
            sizes="340px"
            className="object-contain drop-shadow-[0_16px_20px_rgba(13,31,53,0.25)]"
          />
          <div
            aria-hidden
            className="absolute -top-2 right-0 rotate-[8deg] rounded-[44%] border-[3px] border-brand-navy bg-white px-4 py-2.5 text-center font-heading text-base font-bold leading-[1.05] shadow-[4px_5px_0_rgba(13,31,53,0.15)]"
          >
            <span style={{ color: LOGO.blue }}>Small Hands</span>
            <br />
            <span style={{ color: LOGO.red }}>Big Ideas!</span>
            <span className="absolute -bottom-2.5 left-6 h-5 w-5 rotate-45 border-r-[3px] border-b-[3px] border-brand-navy bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
