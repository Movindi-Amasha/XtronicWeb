import Image from "next/image";
import Link from "next/link";
import LineIcon, { type LineIconName } from "./LineIcon";
import { products } from "@/lib/products";
import { LOGO } from "@/lib/brandColors";

const ITEMS: { icon: LineIconName; title: string; desc: string; color: string }[] = [
  { icon: "flask", title: "STEM Skills", desc: "Science, technology, engineering and maths.", color: LOGO.blue },
  { icon: "puzzle", title: "Creative Thinking", desc: "Encourages problem solving.", color: LOGO.orange },
  { icon: "noScreen", title: "Screen-Free Play", desc: "Hands-on activities away from devices.", color: LOGO.green },
  { icon: "star", title: "Build Confidence", desc: "Feel proud after completing a project.", color: LOGO.yellow },
  { icon: "family", title: "Family Fun", desc: "Build together and make memories.", color: LOGO.red },
];

const STATS = [
  // Counted from the catalogue so it stays right as new kits are added.
  { value: String(products.filter((p) => p.category !== "Bundles & Gifts").length), label: "STEM kits" },
  { value: "4.9/5", label: "Parent rating" },
  { value: "6+", label: "Suitable ages" },
];

export default function WhyChooseRow() {
  return (
    <section id="why" aria-labelledby="why-choose-heading" className="mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
      <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 id="why-choose-heading" className="text-[clamp(30px,4vw,44px)] font-bold tracking-tight" style={{ color: LOGO.blue }}>
            Why <span style={{ color: LOGO.orange }}>XTRONIC</span>?
          </h2>
          <p className="mt-1 text-lg font-semibold text-muted">More than a toy. It&apos;s a learning experience.</p>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {ITEMS.map((item) => (
              <li
                key={item.title}
                className="group flex flex-col items-center rounded-card border-2 border-line bg-white px-3 py-5 text-center transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_30px_-14px_rgba(14,30,63,0.3)]"
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  style={{ background: item.color }}
                >
                  <LineIcon name={item.icon} size={26} strokeWidth={2.2} />
                </span>
                <h3 className="mt-3 text-[15px] font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-1 text-xs font-semibold text-muted">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative overflow-hidden rounded-[32px] p-6 text-white shadow-[0_12px_0_var(--color-brand-blue-600),0_24px_60px_-20px_rgba(14,30,63,0.28)] sm:p-8"
          style={{ background: `linear-gradient(150deg, ${LOGO.lightBlue}, ${LOGO.blue})` }}
        >
          <div aria-hidden className="studs-texture" />
          <div className="relative grid grid-cols-[1fr_auto] items-end gap-2">
            <p className="font-heading text-[clamp(26px,3vw,34px)] font-bold leading-[1.05]">
              Learning
              <br />
              Today <span className="text-brand-yellow">for a</span>
              <br />
              <span className="text-brand-yellow">Brighter</span>
              <br />
              Tomorrow!
            </p>
            <div className="relative h-36 w-28 sm:h-44 sm:w-36">
              <Image src="/mascot/thumbs-up-confetti.png" alt="" fill sizes="144px" className="object-contain object-bottom drop-shadow-[0_10px_14px_rgba(14,30,63,0.35)]" />
            </div>
          </div>
          <div className="relative mt-5 grid grid-cols-3 gap-2">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/15 px-2 py-3 text-center backdrop-blur-sm">
                <strong className="block font-heading text-xl text-brand-yellow">{s.value}</strong>
                <span className="text-[12px] font-bold opacity-90">{s.label}</span>
              </div>
            ))}
          </div>
          <Link
            href="/shop"
            className="btn-brick relative mt-5 inline-flex items-center gap-2 rounded-btn bg-brand-yellow px-6 py-3 font-heading text-sm font-semibold text-brand-navy"
            style={{ "--btn-brick-shadow": "var(--color-brand-yellow-600)" } as React.CSSProperties}
          >
            Start building →
          </Link>
        </div>
      </div>
    </section>
  );
}
