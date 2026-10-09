import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ShopCatalog from "@/components/ShopCatalog";
import SignupBand from "@/components/SignupBand";
import GiftBox from "@/components/GiftBox";
import LineIcon, { type LineIconName } from "@/components/LineIcon";
import { products } from "@/lib/products";
import { LOGO } from "@/lib/brandColors";
import Doodled from "@/components/Doodled";
import HeroScene from "@/components/HeroScene";
import CompareScroller from "@/components/CompareScroller";

export const metadata: Metadata = {
  title: "Shop STEM Robotics & Solar Kits for Kids",
  description:
    "Browse solar energy, robotics & electronics, and wooden mechanics STEM kits for kids 6+. Screen-free building kits shipped across Australia and Sri Lanka.",
  alternates: { canonical: "/shop" },
};

const HERO_CHECKS = ["Hands-On Learning", "Screen-Free Fun", "Perfect for Ages 6+", "Great for Gifts"];

const HERO_PILLS: { icon: LineIconName; label: string; color: string }[] = [
  { icon: "wrench", label: "Build", color: LOGO.yellow },
  { icon: "bulb", label: "Learn", color: LOGO.blue },
  { icon: "gamepad", label: "Play", color: LOGO.red },
];

const KITS = products.filter((p) => p.category !== "Bundles & Gifts");

// Compare table rows, worked out from each kit's own data so it stays true as
// kits are added or changed.
const COMPARE_ROWS: { icon: LineIconName; label: string; value: (p: (typeof KITS)[number]) => boolean | string }[] = [
  { icon: "sun", label: "Solar Powered", value: (p) => Boolean(p.features?.includes("solar")) },
  { icon: "mic", label: "Voice Control", value: (p) => Boolean(p.features?.includes("speak")) },
  { icon: "move", label: "Moves", value: (p) => Boolean(p.features?.some((f) => ["move", "drive", "float", "race"].includes(f))) },
  { icon: "clock", label: "Build Time", value: (p) => p.buildTime },
  { icon: "smile", label: "Age Suitable", value: (p) => p.age },
  { icon: "star", label: "Skill Level", value: (p) => p.skillLevel ?? "—" },
];

const EASY_POINTS = ["Engaging Projects", "Designed with Teachers", "Step-by-Step Guides", "Build Real Skills", "Perfect for Home or School"];

const GIFT_OCCASIONS: { icon: LineIconName; label: string; color: string }[] = [
  { icon: "gift", label: "Birthday Gifts", color: "#E91E8C" },
  { icon: "tree", label: "Christmas Gifts", color: LOGO.green },
  { icon: "sun", label: "School Holidays", color: LOGO.yellow },
  { icon: "flask", label: "STEM Gifts", color: LOGO.blue },
  { icon: "heart", label: "Weekend Fun", color: LOGO.orange },
];

function Mark({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="text-xs font-bold text-brand-navy">{value}</span>;
  return value ? (
    <span className="mx-auto grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: LOGO.green }} aria-label="Yes">
      <LineIcon name="check" size={14} strokeWidth={3} />
    </span>
  ) : (
    <span className="mx-auto grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: LOGO.red }} aria-label="No">
      <LineIcon name="x" size={13} strokeWidth={3} />
    </span>
  );
}

export default function ShopPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative isolate overflow-hidden pt-10 pb-12 md:pt-12 md:pb-16"
        style={{
          background:
            "radial-gradient(900px 500px at 80% 20%, #fff 0%, transparent 60%), linear-gradient(180deg, #cfe9ff 0%, #e9f5ff 55%, #f8fafc 100%)",
        }}
      >
        <HeroScene split="lg" />
        <div className="relative mx-auto grid max-w-[1260px] items-center gap-8 px-4 md:px-6 lg:static lg:min-h-[520px] lg:grid-cols-2">
          <div>
            <h1 className="-rotate-2 font-heading text-[clamp(56px,9vw,104px)] font-bold uppercase leading-[0.92] tracking-tight">
              <span className="text-comic" style={{ color: LOGO.blue, "--comic-stroke": "#fff", "--comic-shadow": "rgba(13,31,53,0.25)" } as React.CSSProperties}>
                STEM{" "}
              </span>
              <span className="text-comic" style={{ color: LOGO.yellow, "--comic-stroke": LOGO.blue, "--comic-shadow": "rgba(1,119,222,0.3)" } as React.CSSProperties}>
                Kits
              </span>
            </h1>
            <p
              className="mt-3 ribbon-shine inline-block -rotate-2 rounded-xl px-5 py-2 font-heading text-lg font-bold uppercase text-white shadow-[0_6px_0_rgba(13,31,53,0.18)] sm:text-xl"
              style={{ background: `linear-gradient(90deg, ${LOGO.red}, ${LOGO.orange})` }}
            >
              Build · Learn · Have Fun!
            </p>
            <p className="mt-5 max-w-lg text-base font-semibold text-brand-navy-700 sm:text-lg">
              Explore our amazing range of STEM building kits, designed to inspire creativity, problem solving
              and a love for technology.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {HERO_CHECKS.map((label, i) => (
                <li key={label} className="flex items-center gap-1.5 text-sm font-extrabold text-brand-navy">
                  <span
                    className="grid h-5.5 w-5.5 place-items-center rounded-full text-white"
                    style={{ background: i % 2 ? LOGO.orange : LOGO.green }}
                  >
                    <LineIcon name="check" size={13} strokeWidth={3} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* The cut-out's right edge (his hand) and bottom (table) are straight
              crops, so on desktop the picture is pinned to the screen's right
              edge and the hero's bottom; pills float on its left side. */}
          <div className="relative -mr-4 -mb-12 ml-auto aspect-[303/264] w-[92%] max-w-[460px] md:-mr-6 md:-mb-16 lg:absolute lg:right-0 lg:bottom-0 lg:m-0 lg:aspect-auto lg:h-[94%] lg:w-[50%] lg:max-w-none">
            <div aria-hidden className="absolute inset-[8%] rounded-full lg:right-[-10%]" style={{ background: "radial-gradient(circle, #fff 0%, #d6ecff 60%, transparent 75%)" }} />
            <Image
              src="/kids/boy-goggles-building.png"
              alt="Boy in safety goggles building a robot car"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 92vw"
              className="object-contain object-right-bottom drop-shadow-[0_18px_22px_rgba(13,31,53,0.25)]"
            />
            <div
              aria-hidden
              className="absolute top-0 left-0 -rotate-[8deg] speech-bubble rounded-[44%] border-[3px] border-brand-navy bg-white px-4 py-2.5 text-center font-heading text-base font-bold uppercase leading-[1.05] shadow-[4px_5px_0_rgba(13,31,53,0.15)] sm:text-lg lg:left-[22%] lg:top-[2%]"
            >
              <span style={{ color: LOGO.red }}>Real</span>
              <br />
              <span style={{ color: LOGO.orange }}>STEM</span>
              <br />
              <span style={{ color: LOGO.blue }}>Learning</span>
              <span className="absolute -bottom-2.5 right-7 h-5 w-5 rotate-45 border-r-[3px] border-b-[3px] border-brand-navy bg-white" />
            </div>

            <ul aria-hidden className="absolute top-[36%] left-0 z-10 hidden flex-col gap-3 lg:flex">
              {HERO_PILLS.map((pill, i) => (
                <li
                  key={pill.label}
                  className="scatter-float flex items-center gap-3 rounded-full bg-white py-1.5 pr-7 pl-1.5 font-heading text-lg font-bold uppercase text-brand-navy shadow-[0_8px_20px_-10px_rgba(14,30,63,0.35)]"
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full text-white" style={{ background: pill.color }}>
                    <LineIcon name={pill.icon} size={24} strokeWidth={2.2} />
                  </span>
                  {pill.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Catalogue ── */}
      <section aria-label="STEM kit catalogue" className="mx-auto max-w-[1260px] px-4 pt-10 md:px-6">
        <Suspense fallback={null}>
          <ShopCatalog />
        </Suspense>
      </section>

      {/* ── Compare ── */}
      <section aria-labelledby="compare-heading" className="mx-auto max-w-[1260px] px-4 pt-20 md:px-6">
        <Doodled preset="split"><h2 id="compare-heading" className="text-[clamp(28px,3.6vw,40px)] font-bold tracking-tight" style={{ color: LOGO.blue }}>
          Compare Our <span style={{ color: LOGO.orange }}>STEM Kits</span>
        </h2></Doodled>
        <p className="mt-1 text-lg font-semibold text-muted">Find the perfect kit for your child&apos;s interests!</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* 3 kits per view (2 on phones); arrows/dots page through the rest. */}
          <CompareScroller count={KITS.length}>
            <table
              className="border-collapse text-center text-sm [table-layout:fixed]"
              style={{ width: `calc(var(--label) + (100cqw - var(--label)) / var(--visible) * ${KITS.length})` }}
            >
              <colgroup>
                <col style={{ width: "var(--label)" }} />
                {KITS.map((kit) => (
                  <col key={kit.slug} style={{ width: "calc((100cqw - var(--label)) / var(--visible))" }} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-white p-2 sm:p-3" />
                  {KITS.map((kit) => (
                    <th key={kit.slug} className="snap-start border-l border-line p-2 align-bottom sm:p-3">
                      <Link href={`/shop/${kit.slug}`} className="group flex flex-col items-center gap-2">
                        <span className="relative h-12 w-16 sm:h-16 sm:w-20">
                          <Image src={kit.image} alt="" fill sizes="80px" className="object-contain transition-transform group-hover:scale-110" />
                        </span>
                        <span className="font-heading text-[11px] font-semibold leading-tight text-brand-navy group-hover:text-brand-blue sm:text-[13px]">
                          {kit.name}
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-line bg-white even:bg-canvas">
                    <th scope="row" className="sticky left-0 z-10 bg-inherit p-2 text-left shadow-[4px_0_6px_-4px_rgba(14,30,63,0.15)] sm:p-3">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold sm:gap-2 sm:text-[13px]" style={{ color: LOGO.blue }}>
                        <span className="shrink-0 [&_svg]:size-4 sm:[&_svg]:size-[18px]">
                          <LineIcon name={row.icon} size={18} strokeWidth={2.2} />
                        </span>
                        {row.label}
                      </span>
                    </th>
                    {KITS.map((kit) => (
                      <td key={kit.slug} className="border-l border-line p-2 sm:p-3">
                        <Mark value={row.value(kit)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CompareScroller>

          <aside
            className="relative overflow-hidden rounded-[26px] p-6 text-brand-navy shadow-[0_10px_0_var(--color-brand-yellow-600)]"
            style={{ background: "linear-gradient(160deg, #FFE27A, #FFD03A)" }}
          >
            <h3 className="max-w-[170px] text-[26px] font-bold leading-tight sm:max-w-[200px]" style={{ color: LOGO.blue }}>
              STEM Learning Made Easy!
            </h3>
            <ul className="relative z-10 mt-4 grid gap-2 font-extrabold">
              {EASY_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2 text-[15px]">
                  <span className="grid h-5.5 w-5.5 shrink-0 place-items-center rounded-full text-white" style={{ background: LOGO.green }}>
                    <LineIcon name="check" size={13} strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            {/* Circle badge: the cut-out ends in a flat crop, which tucks into the circle. */}
            <div aria-hidden className="pointer-events-none absolute right-4 top-4 h-24 w-24 overflow-hidden rounded-full lg:top-auto lg:bottom-5 lg:right-5 lg:h-24 lg:w-24 border-4 border-white shadow-[0_6px_0_rgba(13,31,53,0.15)] sm:h-28 sm:w-28" style={{ background: "radial-gradient(circle at 50% 35%, #fff 0%, #eaf5ff 70%, #cfe9ff 100%)" }}>
              <Image src="/kids/boy-thumbs-up.png" alt="" fill sizes="112px" className="translate-y-[8%] scale-110 object-contain object-bottom" />
            </div>
          </aside>
        </div>
      </section>

      {/* ── Gift band: a gift-wrapped panel with occasion tags hanging from a string ── */}
      <section aria-labelledby="gift-heading" className="mx-auto max-w-[1260px] px-4 pt-20 md:px-6">
        <div
          className="relative overflow-hidden rounded-[32px] px-5 pt-10 pb-8 shadow-[0_12px_0_#c9d9ee,0_30px_60px_-30px_rgba(14,30,63,0.4)] sm:px-10 lg:pb-10"
          style={{ background: "linear-gradient(135deg, #eaf5ff 0%, #ffffff 45%, #fff6dc 100%)" }}
        >
          {/* Ribbon wrapped round the panel + bow where it crosses */}
          <span aria-hidden className="absolute inset-x-0 top-0 h-3" style={{ background: `repeating-linear-gradient(90deg, ${LOGO.red} 0 40px, ${LOGO.yellow} 40px 80px, ${LOGO.blue} 80px 120px, ${LOGO.green} 120px 160px)` }} />
          <span aria-hidden className="doodle absolute left-6 top-10 hidden md:block" style={{ color: LOGO.yellow }}>
            <LineIcon name="star" size={26} strokeWidth={2.4} />
          </span>
          <span aria-hidden className="doodle absolute right-[38%] top-8 hidden lg:block [animation-delay:1s]" style={{ color: LOGO.blue }}>
            <LineIcon name="sparkles" size={22} strokeWidth={2.4} />
          </span>

          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              <div className="text-center lg:text-left">
                <Doodled preset="split">
                  <h2 id="gift-heading" className="text-[clamp(28px,3.6vw,40px)] font-bold leading-tight" style={{ color: LOGO.blue }}>
                    Need a <span style={{ color: LOGO.red }}>Special Gift?</span>
                  </h2>
                </Doodled>
                <p className="mt-1 font-semibold text-muted">Our STEM kits are perfect for birthdays, holidays and special occasions!</p>
              </div>

              {/* Gift tags on a string */}
              <div className="relative mt-6">
                <svg aria-hidden viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 hidden h-8 w-full sm:block">
                  <path d="M0 6 Q 500 46 1000 6" stroke="#8a5a2b" strokeWidth="3" fill="none" strokeDasharray="2 6" strokeLinecap="round" />
                </svg>
                <ul className="relative grid grid-cols-2 gap-x-3 gap-y-5 pt-2 sm:grid-cols-5 sm:pt-5">
                  {GIFT_OCCASIONS.map((o, i) => (
                    <li key={o.label} className={i === GIFT_OCCASIONS.length - 1 ? "col-span-2 sm:col-span-1" : ""}>
                      <Link
                        href="/shop?category=Bundles+%26+Gifts"
                        className="gift-tag group relative mx-auto flex max-w-[150px] flex-col items-center gap-1.5 rounded-b-2xl rounded-t-[40px] border-[3px] bg-white px-2 pt-6 pb-3 text-center shadow-[0_10px_20px_-12px_rgba(14,30,63,0.45)]"
                        style={{ borderColor: o.color, animationDelay: `${i * 0.4}s` }}
                      >
                        {/* tag hole + string */}
                        <span aria-hidden className="absolute -top-4 left-1/2 h-5 w-[3px] -translate-x-1/2 bg-[#8a5a2b] sm:-top-6 sm:h-7" />
                        <span aria-hidden className="absolute top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 bg-[#f8fafc]" style={{ borderColor: o.color }} />
                        <span
                          className="grid h-12 w-12 place-items-center rounded-full text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12"
                          style={{ background: o.color }}
                        >
                          <LineIcon name={o.icon} size={24} strokeWidth={2.2} />
                        </span>
                        <span className="text-[13px] font-extrabold text-brand-navy">{o.label}</span>
                        <span className="text-[11px] font-extrabold" style={{ color: o.color }}>
                          Shop gifts →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Girl hugging her robot next to a stack of presents */}
            <div aria-hidden className="relative mx-auto h-60 w-80">
              <div className="absolute bottom-0 left-0 h-[92%] w-44">
                <Image src="/kids/girl-hugging-robot.png" alt="" fill sizes="176px" className="object-contain object-bottom" />
              </div>
              <GiftBox className="gift-hop absolute bottom-0 right-0 h-32 w-32" box="#1E88E5" lid="#42A5F5" ribbon={LOGO.red} />
              <GiftBox className="gift-hop absolute bottom-[104px] right-6 h-24 w-24 [animation-delay:1.2s]" box="#E91E8C" lid="#FF5CB0" ribbon={LOGO.yellow} tag={false} />
              <span className="doodle absolute right-28 top-2" style={{ color: LOGO.red }}>
                <LineIcon name="heart" size={26} strokeWidth={2.4} />
              </span>
            </div>
          </div>
        </div>
      </section>

      <SignupBand />
    </>
  );
}
