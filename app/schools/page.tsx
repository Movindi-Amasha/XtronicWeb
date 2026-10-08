import type { Metadata } from "next";
import Image from "next/image";
import SchoolQuoteForm from "@/components/SchoolQuoteForm";
import SignupBand from "@/components/SignupBand";
import Doodled from "@/components/Doodled";
import LineIcon, { type LineIconName } from "@/components/LineIcon";
import { LOGO } from "@/lib/brandColors";

export const metadata: Metadata = {
  title: "Schools & STEM Clubs: Bulk Kits & Quotes",
  description:
    "Bulk STEM kit bundles, free lesson plans and custom quotes for schools, teachers and STEM clubs across Australia and Sri Lanka.",
  alternates: { canonical: "/schools" },
};

const BUNDLES: { name: string; discount: string; desc: string; icon: LineIconName; color: string; badge?: string }[] = [
  { name: "10-Pack Bundle", discount: "15% off", desc: "Any single kit, 10 units, perfect for a classroom set.", icon: "package", color: LOGO.blue },
  { name: "30-Pack Bundle", discount: "25% off", desc: "Any single kit, 30 units, ideal for a full year group.", icon: "family", color: LOGO.orange, badge: "Best Value" },
  { name: "Classroom Discovery Pack", discount: "Mixed set", desc: "One of each kit across Solar, Robotics and Wooden Mechanics categories.", icon: "puzzle", color: LOGO.green },
];

const HERO_CHECKS = ["Bulk Discounts", "Free Lesson Plans", "Quotes Within 1 Day", "Ships to AU & Sri Lanka"];

const WHY: { icon: LineIconName; title: string; desc: string; color: string }[] = [
  { icon: "noScreen", title: "Screen-Free", desc: "Hands-on builds, no apps or logins.", color: LOGO.red },
  { icon: "book", title: "Lesson Plans", desc: "Mapped to the STEM concepts in each kit.", color: LOGO.blue },
  { icon: "shield", title: "Safety Tested", desc: "Child-safe parts, lifetime replacements.", color: LOGO.green },
  { icon: "family", title: "Group Friendly", desc: "Great for teams, clubs and classrooms.", color: LOGO.yellow },
];

const STEPS: { icon: LineIconName; title: string; desc: string; color: string }[] = [
  { icon: "send", title: "Send a Request", desc: "Tell us your class size, kits and timeframe.", color: LOGO.blue },
  { icon: "clock", title: "Get Your Quote", desc: "We reply with a custom quote within one business day.", color: LOGO.orange },
  { icon: "truck", title: "Kits Delivered", desc: "Bundles ship with lesson plans ready to go.", color: LOGO.green },
];

function SectionHeading({ children, sub, preset = "left" }: { children: React.ReactNode; sub?: string; preset?: "left" | "right" | "center" | "split" }) {
  return (
    <div className={preset === "center" ? "text-center" : ""}>
      <Doodled preset={preset}>
        <h2 className="text-[clamp(28px,4vw,42px)] font-bold leading-tight tracking-tight">{children}</h2>
      </Doodled>
      {sub && <p className="mt-1.5 font-semibold text-muted sm:text-lg">{sub}</p>}
    </div>
  );
}

export default function SchoolsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-10 pb-12 md:pt-12 md:pb-16"
        style={{ background: "radial-gradient(900px 500px at 80% 20%, #fff 0%, transparent 60%), linear-gradient(180deg, #cfe9ff 0%, #e9f5ff 55%, #f8fafc 100%)" }}
      >
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-8 px-4 md:grid-cols-[1.1fr_1fr] md:px-6">
          <div>
            <h1 className="-rotate-2 font-heading text-[clamp(48px,8vw,92px)] font-bold uppercase leading-[0.92] tracking-tight">
              <span className="text-comic block" style={{ color: LOGO.blue, "--comic-stroke": "#fff", "--comic-shadow": "rgba(13,31,53,0.25)" } as React.CSSProperties}>
                Schools
              </span>
              <span className="text-comic block" style={{ color: LOGO.yellow, "--comic-stroke": LOGO.blue, "--comic-shadow": "rgba(1,119,222,0.3)" } as React.CSSProperties}>
                &amp; Clubs
              </span>
            </h1>
            <p
              className="mt-4 ribbon-shine inline-block -rotate-2 rounded-xl px-5 py-2.5 font-heading text-lg font-bold text-white shadow-[0_6px_0_rgba(13,31,53,0.18)] sm:text-xl"
              style={{ background: `linear-gradient(90deg, ${LOGO.red}, ${LOGO.orange})` }}
            >
              Hands-On STEM for Every Classroom!
            </p>
            <p className="mt-5 max-w-lg text-base font-semibold text-brand-navy-700 sm:text-lg">
              Bring hands-on STEM to your classroom with bulk bundles, free lesson plans, and a dedicated quote
              for larger orders.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {HERO_CHECKS.map((label, i) => (
                <li key={label} className="flex items-center gap-1.5 text-sm font-extrabold text-brand-navy">
                  <span className="grid h-5.5 w-5.5 place-items-center rounded-full text-white" style={{ background: i % 2 ? LOGO.orange : LOGO.green }}>
                    <LineIcon name="check" size={13} strokeWidth={3} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <a
              href="#quote"
              className="btn-brick mt-6 inline-flex items-center gap-2 rounded-btn bg-brand-amber px-7 py-4 font-heading text-base font-semibold text-white"
              style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
            >
              Request a Quote <span aria-hidden>→</span>
            </a>
          </div>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-[500px]">
            <div aria-hidden className="absolute inset-[4%] rounded-full" style={{ background: "radial-gradient(circle, #fff 0%, #d6ecff 60%, transparent 75%)" }} />
            <Image src="/kids/duo-circuit-mat.png" alt="Two kids exploring a circuit mat together" fill priority sizes="(min-width: 768px) 500px, 90vw" className="object-contain drop-shadow-[0_16px_20px_rgba(13,31,53,0.22)]" />
            <div
              aria-hidden
              className="absolute -top-2 right-0 rotate-[8deg] speech-bubble rounded-[44%] border-[3px] border-brand-navy bg-white px-4 py-2.5 text-center font-heading text-base font-bold leading-[1.05] shadow-[4px_5px_0_rgba(13,31,53,0.15)] sm:text-lg"
            >
              <span style={{ color: LOGO.blue }}>Learn</span>{" "}
              <span style={{ color: LOGO.orange }}>Together!</span>
              <span className="absolute -bottom-2.5 left-6 h-5 w-5 rotate-45 border-r-[3px] border-b-[3px] border-brand-navy bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bundles ── */}
      <section aria-labelledby="bundles-heading" className="mx-auto max-w-[1200px] px-4 pt-16 md:px-6">
        <div id="bundles-heading">
          <SectionHeading preset="center" sub="Bulk pricing for classrooms, clubs and whole year groups.">
            <span style={{ color: LOGO.blue }}>Classroom</span> <span style={{ color: LOGO.orange }}>Bundles</span>
          </SectionHeading>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {BUNDLES.map((b) => (
            <li
              key={b.name}
              className="group relative flex flex-col items-center rounded-card border-[3px] bg-white px-5 pt-8 pb-6 text-center shadow-[0_10px_30px_-14px_rgba(14,30,63,0.25)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-16px_rgba(14,30,63,0.35)]"
              style={{ borderColor: b.color }}
            >
              {b.badge && (
                <span className="absolute -top-3 right-4 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase text-white shadow" style={{ background: LOGO.red }}>
                  {b.badge}
                </span>
              )}
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                style={{ background: b.color }}
              >
                <LineIcon name={b.icon} size={30} strokeWidth={2.2} />
              </span>
              <span className="mt-4 rounded-full px-3 py-1 font-heading text-sm font-bold" style={{ color: b.color, background: `color-mix(in srgb, ${b.color} 14%, white)` }}>
                {b.discount}
              </span>
              <h3 className="mt-2 font-heading text-xl font-bold text-brand-navy">{b.name}</h3>
              <p className="mt-1 text-sm font-semibold text-muted">{b.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Why schools + lesson plans ── */}
      <section aria-labelledby="why-schools-heading" className="mx-auto max-w-[1200px] px-4 pt-16 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div id="why-schools-heading">
              <SectionHeading preset="split" sub="Built for real classrooms and busy teachers.">
                <span style={{ color: LOGO.blue }}>Why Schools</span> <span style={{ color: LOGO.orange }}>Choose Us</span>
              </SectionHeading>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
              {WHY.map((w) => (
                <li key={w.title} className="group flex flex-col items-center rounded-card border-2 border-line bg-white px-3 py-5 text-center transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_30px_-14px_rgba(14,30,63,0.3)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" style={{ background: w.color }}>
                    <LineIcon name={w.icon} size={26} strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold text-brand-navy">{w.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-muted">{w.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="relative overflow-hidden rounded-[26px] p-6 text-brand-navy shadow-[0_10px_0_var(--color-brand-yellow-600)] sm:p-7" style={{ background: "linear-gradient(160deg, #FFE27A, #FFD03A)" }}>
            <span style={{ color: LOGO.blue }}>
              <LineIcon name="book" size={40} strokeWidth={2} />
            </span>
            <h3 className="mt-2 text-[26px] font-bold leading-tight" style={{ color: LOGO.blue }}>
              Free Lesson Plans Included
            </h3>
            <p className="mt-2 font-bold">
              Every bundle order comes with downloadable lesson plans mapped to the STEM concepts in each kit,
              available once your order is confirmed.
            </p>
          </aside>
        </div>
      </section>

      {/* ── How ordering works ── */}
      <section aria-labelledby="order-steps-heading" className="mx-auto max-w-[1200px] px-4 pt-16 md:px-6">
        <div id="order-steps-heading">
          <SectionHeading preset="center" sub="Three simple steps from request to classroom.">
            <span style={{ color: LOGO.blue }}>How Ordering</span> <span style={{ color: LOGO.orange }}>Works</span>
          </SectionHeading>
        </div>
        <ol className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative flex flex-col items-center rounded-card border-[3px] bg-white px-5 pt-9 pb-6 text-center" style={{ borderColor: s.color }}>
              <span className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white font-heading text-sm font-bold text-white shadow-md" style={{ background: s.color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative" style={{ color: s.color }}>
                {s.icon === "clock" ? (
                  // Clock with a ticking hand.
                  <svg aria-hidden viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 12h-3.5" />
                    <path className="anim-spin" d="M12 12V5.5" style={{ transformOrigin: "12px 12px", transformBox: "view-box" }} />
                  </svg>
                ) : (
                  <span className={`inline-block ${s.icon === "send" ? "anim-send" : s.icon === "truck" ? "anim-drive" : ""}`}>
                    <LineIcon name={s.icon} size={36} strokeWidth={2} />
                  </span>
                )}
              </span>
              <h3 className="mt-3 text-lg font-semibold" style={{ color: s.color }}>{s.title}</h3>
              <p className="mt-1 text-sm font-semibold text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Quote form ── */}
      <section id="quote" aria-labelledby="quote-heading" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 pt-16 md:px-6">
        <div className="grid items-start gap-6 rounded-[32px] border-2 border-line p-4 sm:gap-8 sm:p-10 lg:grid-cols-[1fr_1.4fr]" style={{ background: "linear-gradient(120deg, #e9f5ff 0%, #fff 55%, var(--color-brand-yellow-50) 100%)" }}>
          <div>
            <div id="quote-heading">
              <SectionHeading preset="right" sub="Ordering for a class, club or whole school? Tell us what you need and we'll put together a custom quote within one business day.">
                <span style={{ color: LOGO.blue }}>Request a</span> <span style={{ color: LOGO.orange }}>Quote</span>
              </SectionHeading>
            </div>
            <div className="relative mx-auto mt-6 hidden h-56 w-56 overflow-hidden rounded-full border-4 border-white shadow-[0_8px_0_rgba(13,31,53,0.15)] lg:block" style={{ background: "radial-gradient(circle at 50% 35%, #fff 0%, #eaf5ff 70%, #cfe9ff 100%)" }}>
              <Image src="/kids/girl-drawing.png" alt="" fill sizes="224px" className="translate-y-[4%] scale-110 object-contain object-bottom" />
            </div>
          </div>
          <SchoolQuoteForm />
        </div>
      </section>

      <SignupBand />
    </>
  );
}
