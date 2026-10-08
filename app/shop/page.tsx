import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ShopCatalog from "@/components/ShopCatalog";
import SignupBand from "@/components/SignupBand";
import LineIcon, { type LineIconName } from "@/components/LineIcon";
import { products } from "@/lib/products";
import { LOGO } from "@/lib/brandColors";
import Doodled from "@/components/Doodled";

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
];

const EASY_POINTS = ["Engaging Projects", "Designed with Teachers", "Step-by-Step Guides", "Build Real Skills", "Perfect for Home or School"];

const GIFT_OCCASIONS: { icon: LineIconName; label: string; color: string }[] = [
  { icon: "gift", label: "Birthday Gifts", color: LOGO.red },
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
        className="relative overflow-hidden pt-10 pb-12 md:pt-12 md:pb-16"
        style={{
          background:
            "radial-gradient(900px 500px at 80% 20%, #fff 0%, transparent 60%), linear-gradient(180deg, #cfe9ff 0%, #e9f5ff 55%, #f8fafc 100%)",
        }}
      >
        <div className="relative mx-auto grid max-w-[1260px] items-center gap-8 px-4 md:px-6 lg:grid-cols-[1.15fr_1fr_auto]">
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

          <div className="relative mx-auto aspect-square w-full max-w-[380px]">
            <div aria-hidden className="absolute inset-[6%] rounded-full" style={{ background: "radial-gradient(circle, #fff 0%, #d6ecff 60%, transparent 75%)" }} />
            <Image
              src="/kids/boy-goggles-building.png"
              alt="Boy in safety goggles building a robot car"
              fill
              priority
              sizes="380px"
              className="object-contain drop-shadow-[0_18px_22px_rgba(13,31,53,0.25)]"
            />
            <div
              aria-hidden
              className="absolute -top-2 -left-2 -rotate-[8deg] speech-bubble rounded-[44%] border-[3px] border-brand-navy bg-white px-4 py-2.5 text-center font-heading text-base font-bold uppercase leading-[1.05] shadow-[4px_5px_0_rgba(13,31,53,0.15)] sm:text-lg"
            >
              <span style={{ color: LOGO.red }}>Real</span>
              <br />
              <span style={{ color: LOGO.orange }}>STEM</span>
              <br />
              <span style={{ color: LOGO.blue }}>Learning</span>
              <span className="absolute -bottom-2.5 right-7 h-5 w-5 rotate-45 border-r-[3px] border-b-[3px] border-brand-navy bg-white" />
            </div>
          </div>

          <ul aria-hidden className="hidden flex-col gap-3 lg:flex">
            {HERO_PILLS.map((pill) => (
              <li key={pill.label} className="flex items-center gap-3 rounded-full bg-white py-1.5 pr-7 pl-1.5 font-heading text-lg font-bold uppercase text-brand-navy shadow-[0_8px_20px_-10px_rgba(14,30,63,0.35)]">
                <span className="grid h-12 w-12 place-items-center rounded-full text-white" style={{ background: pill.color }}>
                  <LineIcon name={pill.icon} size={24} strokeWidth={2.2} />
                </span>
                {pill.label}
              </li>
            ))}
          </ul>
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
          <div className="overflow-x-auto rounded-card border-2 border-line bg-white">
            <table className="w-full min-w-[680px] border-collapse text-center text-sm">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 w-36 bg-white p-3" />
                  {KITS.map((kit) => (
                    <th key={kit.slug} className="border-l border-line p-3 align-bottom">
                      <Link href={`/shop/${kit.slug}`} className="group flex flex-col items-center gap-2">
                        <span className="relative h-16 w-20">
                          <Image src={kit.image} alt="" fill sizes="80px" className="object-contain transition-transform group-hover:scale-110" />
                        </span>
                        <span className="font-heading text-[13px] font-semibold leading-tight text-brand-navy group-hover:text-brand-blue">
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
                    <th scope="row" className="sticky left-0 z-10 bg-inherit p-3 text-left shadow-[4px_0_6px_-4px_rgba(14,30,63,0.15)]">
                      <span className="flex items-center gap-2 text-[13px] font-bold" style={{ color: LOGO.blue }}>
                        <LineIcon name={row.icon} size={18} strokeWidth={2.2} />
                        {row.label}
                      </span>
                    </th>
                    {KITS.map((kit) => (
                      <td key={kit.slug} className="border-l border-line p-3">
                        <Mark value={row.value(kit)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

      {/* ── Gift band ── */}
      <section aria-labelledby="gift-heading" className="mx-auto max-w-[1260px] px-4 pt-20 md:px-6">
        <div
          className="relative grid items-center gap-6 overflow-hidden rounded-[32px] border-2 border-line p-6 sm:p-8 lg:grid-cols-[1fr_200px]"
          style={{ background: "linear-gradient(120deg, #fff 0%, #e9f5ff 60%, var(--color-brand-yellow-50) 100%)" }}
        >
          <div>
            <Doodled preset="right"><h2 id="gift-heading" className="text-[clamp(26px,3.2vw,36px)] font-bold leading-tight" style={{ color: LOGO.blue }}>
              Need a <span style={{ color: LOGO.red }}>Special Gift?</span>
            </h2></Doodled>
            <p className="mt-1 font-semibold text-muted">Our STEM kits are perfect for birthdays, holidays and special occasions!</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {GIFT_OCCASIONS.map((o, i) => (
                <li key={o.label} className={i === GIFT_OCCASIONS.length - 1 ? "col-span-2 sm:col-span-1" : ""}>
                  <Link
                    href="/shop?category=Bundles+%26+Gifts"
                    className="group flex flex-col items-center gap-2 rounded-2xl border-2 border-line bg-white px-2 py-4 text-center transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_26px_-14px_rgba(14,30,63,0.3)]"
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" style={{ color: o.color }}>
                      <LineIcon name={o.icon} size={32} strokeWidth={2} />
                    </span>
                    <span className="text-[13px] font-extrabold text-brand-navy">{o.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto hidden h-48 w-44 lg:block">
            <Image src="/kids/girl-hugging-robot.png" alt="" fill sizes="176px" className="object-contain object-bottom" />
          </div>
        </div>
      </section>

      <SignupBand />
    </>
  );
}
