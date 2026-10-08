import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CreationsCarousel from "@/components/CreationsCarousel";
import SignupBand from "@/components/SignupBand";
import { LOGO } from "@/lib/brandColors";

export const metadata: Metadata = {
  title: "How It Works: Build, Learn & Play STEM Kits",
  description:
    "From unboxing to mastering the STEM concepts behind your build, here's how an XTRONIC KIDS kit works, step by step.",
  alternates: { canonical: "/how-it-works" },
};

// Line icons (Lucide-style, 24px grid), drawn in currentColor.
const ICONS = {
  flask: (
    <>
      <path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3" />
      <path d="M7 15h10" />
    </>
  ),
  cog: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  puzzle: (
    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
  ),
  palette: (
    <>
      <circle cx="13.5" cy="6.5" r="1" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="1" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="1" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 11.996 2z" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
  package: (
    <>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </>
  ),
  percent: (
    <>
      <path d="M19 5 5 19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </>
  ),
  zap: (
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  ),
  book: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />,
};

function LineIcon({ name, size = 24 }: { name: keyof typeof ICONS; size?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

// Same five steps as the homepage, with the hover animations from
// globals.css (step-card / step-icon-*). Pink and purple from the design are
// swapped for the logo red and yellow, as on the homepage feature strip.
const STEPS = [
  { icon: "📦", anim: "hop", title: "Choose Your Kit", desc: "Pick a STEM kit that interests your child: robots, solar vehicles or nature inspired.", color: LOGO.blue },
  { icon: "🔧", anim: "twist", title: "Build It", desc: "Follow the easy step-by-step picture guide. All parts are included in the box.", color: LOGO.orange },
  { icon: "💡", anim: "glow", title: "Discover How It Works", desc: "Learn the real science of motors, solar power and circuits behind your creation.", color: LOGO.green },
  { icon: "🎮", anim: "mash", title: "Play & Experiment", desc: "Test your creation and see it in action. Try different ways and have fun!", color: LOGO.red },
  { icon: "🏆", anim: "cheer", title: "Create Again!", desc: "Improve, customise and build new ideas. The learning never ends!", color: LOGO.yellow },
];

const BOX_TO_PLAY = [
  // The prop art has the mascot's sneakers at the top; crop to the box.
  { image: "/mascot/gift-box-prop.png", label: "Open the Box", position: "object-bottom" },
  { image: "/products/voice-robot/2.jpg", label: "Check the Parts" },
  { image: "/products/voice-robot/3.jpg", label: "Build Step by Step" },
  { image: "/products/voice-robot/4.jpg", label: "Test & Play" },
];

const SKILLS: { icon: keyof typeof ICONS; title: string; desc: string; color: string }[] = [
  { icon: "flask", title: "Science", desc: "Understand how things work in the real world.", color: LOGO.blue },
  { icon: "cog", title: "Technology", desc: "Explore electronics, solar power and more.", color: LOGO.yellow },
  { icon: "wrench", title: "Engineering", desc: "Build and create working models.", color: LOGO.red },
  { icon: "puzzle", title: "Problem Solving", desc: "Think, test and find solutions.", color: LOGO.green },
  { icon: "palette", title: "Creativity", desc: "Use imagination to make new ideas.", color: LOGO.lightBlue },
  { icon: "rocket", title: "Confidence", desc: "Feel proud after completing a project.", color: LOGO.orange },
];

const CREATIONS = [
  { href: "/shop/voice-robot", image: "/products/voice-robot/4.jpg", title: "Voice-Controlled Robot" },
  { href: "/shop/solar-speedboat", image: "/products/solar-speedboat/4.jpg", title: "Solar-Powered Yacht" },
  { href: "/shop/wooden-taxiing-aircraft", image: "/products/wooden-taxiing-aircraft/4.jpg", title: "Wooden Taxiing Aircraft" },
  { href: "/shop/solar-4wd-rover", image: "/products/solar-4wd-rover/4.jpg", title: "Solar 4WD Rover" },
  { href: "/shop/solar-butterfly", image: "/products/solar-butterfly/4.jpg", title: "Solar Butterfly" },
];

const PERKS: { icon: keyof typeof ICONS; title: string; desc: string; color: string }[] = [
  { icon: "package", title: "Monthly STEM Kit", desc: "New project each month", color: LOGO.orange },
  { icon: "percent", title: "Exclusive Discounts", desc: "15% off for members", color: LOGO.red },
  { icon: "zap", title: "Early Access", desc: "To new products", color: LOGO.yellow },
  { icon: "book", title: "Fun Learning Guides", desc: "And activities", color: LOGO.blue },
];

const FAQS = [
  {
    q: "What age are the kits suitable for?",
    a: "Most kits are designed for ages 6+, and the Smart Voice-Controlled Robot Kit is 7+. Younger builders can join in with a grown-up. See the Parents' Guide for more detail.",
  },
  {
    q: "Are the kits safe for children?",
    a: "Yes. Parts are non-toxic and child-safe. All kits contain small parts, so they're not suitable for children under 3, and we recommend adult supervision during assembly, especially for kits with batteries or moving parts.",
  },
  {
    q: "Do I need extra tools?",
    a: "No tools needed: everything to build your kit is in the box. Solar kits run on sunshine (or a bright lamp); electronic kits use standard AA/AAA batteries, which aren't included.",
  },
  {
    q: "Do you offer a subscription plan?",
    a: "Yes! The XTRONIC Club is $19.99/month and includes a new STEM kit every month, 15% off everything and early access to new kits. You can pause or cancel anytime.",
  },
];

/** Comic-style speech bubble, tilted, with a little tail. */
function SpeechBubble({ children, className = "", tail = "left" }: { children: React.ReactNode; className?: string; tail?: "left" | "right" }) {
  return (
    <div className={`pointer-events-none absolute z-10 ${className}`} aria-hidden>
      <div className="relative rounded-[46%] border-[3px] border-brand-navy bg-white px-6 py-4 text-center font-heading font-bold leading-[1.05] shadow-[5px_6px_0_rgba(13,31,53,0.15)]">
        {children}
        <span
          className={`absolute -bottom-3 h-6 w-6 rotate-45 border-r-[3px] border-b-[3px] border-brand-navy bg-white ${tail === "left" ? "left-8" : "right-8"}`}
        />
      </div>
    </div>
  );
}

function SectionHeading({ children, sub, center = false }: { children: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-[clamp(28px,4vw,42px)] font-bold leading-tight tracking-tight text-brand-navy">{children}</h2>
      {sub && <p className="mt-1.5 text-base font-semibold text-muted sm:text-lg">{sub}</p>}
    </div>
  );
}

function Star({ className, color }: { className: string; color: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`pointer-events-none absolute ${className}`} fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

function Arrow({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 16" width="32" height="16" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h26M21 2l7 6-7 6" />
    </svg>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-10 pb-14 md:pt-14 md:pb-20"
        style={{
          background:
            "radial-gradient(900px 500px at 85% 10%, #d6ecff, transparent 70%), radial-gradient(700px 500px at 0% 100%, var(--color-brand-yellow-50), transparent 70%), linear-gradient(180deg, #e9f5ff, #fff)",
        }}
      >
        <Star className="left-[4%] top-8 h-7 w-7 rotate-12" color={LOGO.yellow} />
        <Star className="left-[46%] top-6 hidden h-6 w-6 -rotate-12 md:block" color={LOGO.blue} />
        <Star className="right-[38%] bottom-10 hidden h-5 w-5 md:block" color={LOGO.red} />

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-8 px-4 md:grid-cols-[1.1fr_1fr] md:px-6">
          <div>
            <h1 className="font-heading text-[clamp(56px,10vw,112px)] font-bold uppercase leading-[0.92] tracking-tight">
              <span
                className="text-comic block"
                style={{ color: LOGO.blue, "--comic-stroke": "#fff", "--comic-shadow": "rgba(13,31,53,0.28)" } as React.CSSProperties}
              >
                How it
              </span>
              <span
                className="text-comic block"
                style={{ color: LOGO.yellow, "--comic-stroke": LOGO.blue, "--comic-shadow": "rgba(1,119,222,0.35)" } as React.CSSProperties}
              >
                works
              </span>
            </h1>
            <p
              className="mt-4 inline-block -rotate-2 rounded-xl px-5 py-2.5 font-heading text-lg font-bold text-white shadow-[0_6px_0_rgba(13,31,53,0.18)] sm:text-2xl"
              style={{ background: `linear-gradient(90deg, ${LOGO.red}, ${LOGO.orange})` }}
            >
              From Box to Brilliant Creations!
            </p>
            <p className="mt-6 max-w-lg text-base font-semibold text-brand-navy-700 sm:text-lg">
              Our STEM kits are designed to be simple, fun and educational. Follow these easy steps to
              build, learn and explore the world of science and technology.
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[460px]">
            <div
              aria-hidden
              className="absolute inset-[8%] rounded-full"
              style={{ background: "radial-gradient(circle, #fff 0%, #d6ecff 60%, transparent 75%)" }}
            />
            <Image
              src="/mascot/playing-with-robot.png"
              alt="XTRONIC mascot building a robot"
              fill
              priority
              sizes="(min-width: 768px) 460px, 90vw"
              className="object-contain drop-shadow-[0_20px_25px_rgba(13,31,53,0.25)]"
            />
            <SpeechBubble className="-top-2 right-0 rotate-[8deg] text-lg sm:text-2xl" tail="left">
              <span style={{ color: LOGO.blue }}>Small Steps</span>
              <br />
              <span style={{ color: LOGO.red }}>Big Ideas!</span>
            </SpeechBubble>
          </div>
        </div>
      </section>

      {/* ── 5 Simple Steps ── */}
      <section aria-labelledby="steps-heading" className="relative mx-auto max-w-[1200px] px-4 pt-16 md:px-6">
        <Star className="left-2 top-14 hidden h-8 w-8 -rotate-12 md:block" color={LOGO.yellow} />
        <Star className="right-4 top-12 hidden h-7 w-7 rotate-12 md:block" color={LOGO.blue} />
        <div id="steps-heading">
          <SectionHeading center>
            <span style={{ color: LOGO.blue }}>5</span> Simple Steps to a{" "}
            <span className="underline decoration-[5px] underline-offset-[6px]" style={{ color: LOGO.orange, textDecorationColor: LOGO.yellow }}>
              Big Adventure!
            </span>
          </SectionHeading>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-[repeat(5,minmax(0,1fr))]">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative flex">
              <div
                className="step-card relative flex w-full cursor-default flex-col items-center rounded-card border-[3px] bg-white px-4 pt-9 pb-6 text-center shadow-[0_10px_30px_-14px_rgba(14,30,63,0.25)] transition-[translate,scale,box-shadow] duration-300 ease-out hover:z-10 hover:-translate-y-2 hover:scale-[1.05] hover:shadow-[0_24px_40px_-16px_rgba(14,30,63,0.35)]"
                style={{ borderColor: step.color }}
              >
                <span
                  className="step-badge absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white font-heading text-sm font-bold text-white shadow-md"
                  style={{ background: step.color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`step-icon-${step.anim} block text-5xl`}>{step.icon}</span>
                <h3 className="mt-3 text-lg font-semibold leading-tight" style={{ color: step.color }}>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-muted">{step.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <Arrow
                  color={STEPS[i + 1].color}
                  className="absolute top-1/2 -right-[22px] z-20 hidden h-4 w-8 -translate-y-1/2 lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* ── From Box to Play ── */}
      <section aria-labelledby="box-heading" className="relative mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div id="box-heading">
            <SectionHeading sub="See what's inside and how easy it is to get started.">
              <span style={{ color: LOGO.blue }}>From Box</span> to <span style={{ color: LOGO.orange }}>Play!</span>
            </SectionHeading>
          </div>
        </div>

        <div className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-10 lg:pr-44 xl:pr-52">
          {BOX_TO_PLAY.map((tile, i) => (
            <figure key={tile.label} className="group relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card border-4 border-white bg-brand-blue-50 shadow-[0_10px_30px_-12px_rgba(14,30,63,0.25)]">
                <Image
                  src={tile.image}
                  alt={tile.label}
                  fill
                  sizes="(min-width: 1024px) 240px, 50vw"
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${tile.position ?? ""}`}
                />
              </div>
              <figcaption
                className="relative -mt-4 mx-auto w-fit rounded-btn px-4 py-1.5 text-center font-heading text-xs font-semibold text-white shadow-md sm:text-sm"
                style={{ background: LOGO.blue }}
              >
                {i + 1}. {tile.label}
              </figcaption>
              {i < BOX_TO_PLAY.length - 1 && (
                <Arrow color={LOGO.orange} className="absolute top-[38%] -right-[38px] hidden lg:block" />
              )}
            </figure>
          ))}

          <SpeechBubble className="-right-2 top-1/2 hidden -translate-y-1/2 rotate-[-6deg] text-2xl lg:block xl:text-3xl" tail="left">
            <span style={{ color: LOGO.blue }}>Learn</span>
            <br />
            <span style={{ color: LOGO.green }}>Create</span>
            <br />
            <span style={{ color: LOGO.red }}>Explore</span>
            <br />
            <span style={{ color: LOGO.orange }}>Discover</span>
          </SpeechBubble>
        </div>
      </section>

      {/* ── What Kids Learn ── */}
      <section aria-labelledby="learn-heading" className="mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <div id="learn-heading">
              <SectionHeading sub="Every kit is a hands-on learning experience that builds real skills.">
                <span style={{ color: LOGO.blue }}>What</span> <span style={{ color: LOGO.orange }}>Kids</span>{" "}
                <span style={{ color: LOGO.blue }}>Learn</span>
              </SectionHeading>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
              {SKILLS.map((skill) => (
                <li
                  key={skill.title}
                  className="group flex flex-col items-center rounded-card border-2 border-line bg-white px-3 py-5 text-center transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_30px_-14px_rgba(14,30,63,0.3)]"
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ color: skill.color, background: `color-mix(in srgb, ${skill.color} 14%, white)` }}
                  >
                    <LineIcon name={skill.icon} size={28} />
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold text-brand-navy">{skill.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-muted">{skill.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-[32px] lg:max-w-[340px] border-4 border-white shadow-[0_20px_40px_-18px_rgba(14,30,63,0.4)]">
            <Image
              src="/products/solar-butterfly/4.jpg"
              alt="Solar-powered butterfly kit, built and flapping in the sun"
              fill
              sizes="340px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Creations carousel ── */}
      <section aria-labelledby="creations-heading" className="mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
        <div id="creations-heading">
          <SectionHeading sub="See every kit built, powered up and ready to play.">
            <span style={{ color: LOGO.blue }}>Real Builds,</span> <span style={{ color: LOGO.orange }}>Real Creations</span>
          </SectionHeading>
        </div>
        <div className="mt-8">
          <CreationsCarousel items={CREATIONS} />
        </div>
      </section>

      {/* ── Subscription band ── */}
      <section aria-labelledby="club-heading" className="mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
        <div
          className="relative grid items-center gap-6 overflow-hidden rounded-[32px] border-2 border-line p-6 sm:p-8 lg:grid-cols-[220px_1fr_auto] lg:gap-8"
          style={{ background: "linear-gradient(120deg, #e9f5ff, #fff 55%, var(--color-brand-yellow-50))" }}
        >
          <Star className="right-6 top-5 h-7 w-7 rotate-12" color={LOGO.yellow} />
          <div className="relative mx-auto h-44 w-44 lg:h-52 lg:w-52">
            <Image src="/mascot/holding-gift.png" alt="" fill sizes="208px" className="object-contain" />
          </div>
          <div>
            <h2 id="club-heading" className="text-[clamp(26px,3.2vw,36px)] font-bold leading-tight">
              <span style={{ color: LOGO.blue }}>XTRONIC Club</span>{" "}
              <span style={{ color: LOGO.orange }}>Subscription</span>
            </h2>
            <p className="mt-1.5 max-w-xl font-semibold text-muted">
              Keep the learning going! Get a new kit, activities and exclusive member benefits delivered
              every month for $19.99.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-4">
              {PERKS.map((perk) => (
                <li key={perk.title} className="flex flex-col items-center rounded-2xl border-2 border-line bg-white px-2 py-3 text-center">
                  <span style={{ color: perk.color }}>
                    <LineIcon name={perk.icon} size={26} />
                  </span>
                  <strong className="mt-1.5 text-[13px] font-extrabold text-brand-navy">{perk.title}</strong>
                  <span className="text-[11px] font-semibold text-muted">{perk.desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/#subscribe"
            className="btn-brick inline-flex items-center justify-center gap-2 rounded-btn bg-brand-amber px-7 py-4 font-heading text-base font-semibold text-white"
            style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
          >
            Subscribe Now <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section aria-labelledby="faq-heading" className="mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_260px]">
          <div>
            <div id="faq-heading">
              <SectionHeading>
                <span style={{ color: LOGO.blue }}>Frequently Asked</span>{" "}
                <span style={{ color: LOGO.orange }}>Questions</span>
              </SectionHeading>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group self-start rounded-2xl border-2 border-line bg-white px-5 py-4 transition-colors open:border-brand-blue"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-extrabold text-brand-navy [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span
                      aria-hidden
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-blue-50 text-lg leading-none text-brand-blue transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm font-semibold text-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="relative mx-auto h-64 w-56">
            <SpeechBubble className="-top-6 -right-4 rotate-[6deg] text-base" tail="left">
              <span style={{ color: LOGO.blue }}>Still have</span>
              <br />
              <span style={{ color: LOGO.blue }}>questions?</span>
              <br />
              <span style={{ color: LOGO.red }}>We&apos;re here</span>
              <br />
              <span style={{ color: LOGO.red }}>to help!</span>
            </SpeechBubble>
            <Image src="/mascot/thinking.png" alt="" fill sizes="224px" className="object-contain object-bottom" />
            <Link
              href="/help/faq"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-btn bg-brand-blue px-4 py-2 font-heading text-sm font-semibold text-white shadow-md hover:bg-brand-blue-600"
            >
              See all FAQs →
            </Link>
          </div>
        </div>
      </section>

      <SignupBand />
    </>
  );
}
