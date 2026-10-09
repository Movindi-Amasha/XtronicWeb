import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CreationsCarousel from "@/components/CreationsCarousel";
import SignupBand from "@/components/SignupBand";
import { LOGO, band } from "@/lib/brandColors";
import SubscriptionBand from "@/components/SubscriptionBand";
import LineIcon, { type LineIconName } from "@/components/LineIcon";
import Doodled from "@/components/Doodled";
import GiftBox from "@/components/GiftBox";
import HeroScene from "@/components/HeroScene";

export const metadata: Metadata = {
  title: "How It Works: Build, Learn & Play STEM Kits",
  description:
    "From unboxing to mastering the STEM concepts behind your build, here's how an XTRONIC KIDS kit works, step by step.",
  alternates: { canonical: "/how-it-works" },
};

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
  // First tile is drawn (GiftBox) rather than a photo.
  { image: "", label: "Open the Box", position: "" },
  { image: "/products/voice-robot/2.jpg", label: "Check the Parts" },
  { image: "/products/voice-robot/3.jpg", label: "Build Step by Step" },
  { image: "/products/voice-robot/4.jpg", label: "Test & Play" },
];

// anim = looping icon animation (globals.css) that acts the skill out.
const SKILLS: { icon: LineIconName; title: string; desc: string; color: string; anim: string }[] = [
  { icon: "flask", title: "Science", desc: "Understand how things work in the real world.", color: LOGO.blue, anim: "anim-bob" },
  { icon: "cog", title: "Technology", desc: "Explore electronics, solar power and more.", color: LOGO.yellow, anim: "anim-spin" },
  { icon: "wrench", title: "Engineering", desc: "Build and create working models.", color: LOGO.red, anim: "anim-twist" },
  { icon: "puzzle", title: "Problem Solving", desc: "Think, test and find solutions.", color: LOGO.green, anim: "anim-flip" },
  { icon: "palette", title: "Creativity", desc: "Use imagination to make new ideas.", color: LOGO.lightBlue, anim: "anim-sway" },
  { icon: "rocket", title: "Confidence", desc: "Feel proud after completing a project.", color: LOGO.orange, anim: "anim-launch" },
];

const CREATIONS = [
  { href: "/shop/voice-robot", image: "/products/voice-robot/4.jpg", title: "Voice-Controlled Robot" },
  { href: "/shop/solar-speedboat", image: "/products/solar-speedboat/4.jpg", title: "Solar-Powered Yacht" },
  { href: "/shop/wooden-taxiing-aircraft", image: "/products/wooden-taxiing-aircraft/4.jpg", title: "Wooden Taxiing Aircraft" },
  { href: "/shop/solar-4wd-rover", image: "/products/solar-4wd-rover/4.jpg", title: "Solar 4WD Rover" },
  { href: "/shop/solar-butterfly", image: "/products/solar-butterfly/4.jpg", title: "Solar Butterfly" },
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
      <div className="relative speech-bubble rounded-[46%] border-[3px] border-brand-navy bg-white px-6 py-4 text-center font-heading font-bold leading-[1.05] shadow-[5px_6px_0_rgba(13,31,53,0.15)]">
        {children}
        <span
          className={`absolute -bottom-3 h-6 w-6 rotate-45 border-r-[3px] border-b-[3px] border-brand-navy bg-white ${tail === "left" ? "left-8" : "right-8"}`}
        />
      </div>
    </div>
  );
}

function SectionHeading({
  children,
  sub,
  center = false,
  doodles = center ? "center" : "left",
}: {
  children: React.ReactNode;
  sub?: string;
  center?: boolean;
  doodles?: "left" | "right" | "center" | "split";
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <Doodled preset={doodles}>
        <h2 className="text-[clamp(28px,4vw,42px)] font-bold leading-tight tracking-tight text-brand-navy">{children}</h2>
      </Doodled>
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
    <svg aria-hidden viewBox="0 0 32 16" width="32" height="16" className={`arrow-nudge ${className}`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h26M21 2l7 6-7 6" />
    </svg>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative isolate overflow-hidden pt-10 pb-14 md:pt-14 md:pb-20"
        style={{
          background:
            "radial-gradient(900px 500px at 85% 10%, #d6ecff, transparent 70%), radial-gradient(700px 500px at 0% 100%, var(--color-brand-yellow-50), transparent 70%), linear-gradient(180deg, #e9f5ff, #fff)",
        }}
      >
        <HeroScene />
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
              className="mt-4 ribbon-shine inline-block -rotate-2 rounded-xl px-5 py-2.5 font-heading text-lg font-bold text-white shadow-[0_6px_0_rgba(13,31,53,0.18)] sm:text-2xl"
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
              src="/kids/duo-building-car.png"
              alt="Boy and girl building a robot car together"
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

        <div className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-10 lg:pr-48 xl:pr-56">
          {BOX_TO_PLAY.map((tile, i) => (
            <figure key={tile.label} className="group relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card border-4 border-white bg-brand-blue-50 shadow-[0_10px_30px_-12px_rgba(14,30,63,0.25)]">
                {tile.image ? (
                  <Image
                    src={tile.image}
                    alt={tile.label}
                    fill
                    sizes="(min-width: 1024px) 240px, 50vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${tile.position ?? ""}`}
                  />
                ) : (
                  <div className="grid h-full place-items-center" style={{ background: "radial-gradient(circle at 50% 45%, #fff 0%, #e3f1ff 75%)" }}>
                    <GiftBox className="gift-hop h-[78%] w-[78%]" box="#1E88E5" lid="#42A5F5" ribbon={LOGO.yellow} />
                  </div>
                )}
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

          <SpeechBubble className="right-2 top-1/2 hidden -translate-y-1/2 rotate-[-6deg] text-xl lg:block xl:text-2xl" tail="left">
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
      <section aria-labelledby="learn-heading" className="band mx-auto max-w-[1200px] px-4 pt-20 md:px-6" style={band("sunset")}>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <div id="learn-heading">
              <SectionHeading doodles="split" sub="Every kit is a hands-on learning experience that builds real skills.">
                <span style={{ color: LOGO.blue }}>What</span> <span style={{ color: LOGO.orange }}>Kids</span>{" "}
                <span style={{ color: LOGO.blue }}>Learn</span>
              </SectionHeading>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
              {SKILLS.map((skill) => (
                <li
                  key={skill.title}
                  className="group flex flex-col items-center rounded-card border-2 px-3 py-5 text-center transition-[translate] duration-300 hover:-translate-y-1.5"
                  style={{
                    background: `linear-gradient(170deg, color-mix(in srgb, ${skill.color} 32%, white) 0%, color-mix(in srgb, ${skill.color} 8%, white) 75%)`,
                    borderColor: `color-mix(in srgb, ${skill.color} 55%, white)`,
                    boxShadow: `0 6px 0 color-mix(in srgb, ${skill.color} 35%, white)`,
                  }}
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:scale-110"
                    style={{ background: skill.color }}
                  >
                    <span className={`inline-block ${skill.anim}`}>
                      <LineIcon name={skill.icon} size={26} strokeWidth={2.2} />
                    </span>
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold text-brand-navy">{skill.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-muted">{skill.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[280px] lg:max-w-[340px]">
            <div
              aria-hidden
              className="scatter-spin absolute inset-[2%] rounded-full [animation-duration:40s]"
              style={{
                background: `repeating-conic-gradient(color-mix(in srgb, ${LOGO.yellow} 45%, transparent) 0 10deg, transparent 10deg 20deg)`,
                maskImage: "radial-gradient(circle, #000 30%, transparent 70%)",
              }}
            />
            <div aria-hidden className="absolute inset-[16%] rounded-full" style={{ background: `radial-gradient(circle, #fff 0%, color-mix(in srgb, ${LOGO.yellow} 35%, white) 60%, transparent 75%)` }} />
            <Image
              src="/kids/girl-butterfly.png"
              alt="Girl holding up the solar butterfly she built"
              fill
              sizes="340px"
              className="object-contain object-bottom drop-shadow-[0_14px_18px_rgba(13,31,53,0.2)]"
            />
          </div>
        </div>
      </section>

      {/* ── Creations carousel ── */}
      <section aria-labelledby="creations-heading" className="mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
        <div id="creations-heading">
          <SectionHeading doodles="right" sub="See every kit built, powered up and ready to play.">
            <span style={{ color: LOGO.blue }}>Real Builds,</span> <span style={{ color: LOGO.orange }}>Real Creations</span>
          </SectionHeading>
        </div>
        <div className="mt-8">
          <CreationsCarousel items={CREATIONS} />
        </div>
      </section>

      {/* ── Subscription band (same animated design + sign-up form as the homepage) ── */}
      <SubscriptionBand />

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
            <Image src="/kids/girl-idea.png" alt="" fill sizes="224px" className="object-contain object-bottom" />
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
