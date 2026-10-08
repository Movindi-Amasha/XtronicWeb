import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SignupBand from "@/components/SignupBand";
import LineIcon, { type LineIconName } from "@/components/LineIcon";
import { LOGO } from "@/lib/brandColors";

export const metadata: Metadata = {
  title: "About Us: Our Story & Why Parents Choose Us",
  description:
    "The story behind XTRONIC KIDS and why parents, teachers and kids choose us for safe, screen-free, hands-on STEM learning at home and in the classroom.",
  alternates: { canonical: "/why-xtronic" },
};

// ── Facts shown on this page. Only real, checkable details go here. ──

const MILESTONES: { year: string; title: string; desc: string; icon: LineIconName; color: string }[] = [
  { year: "2018", title: "Where It Began", desc: "Started as Digicocoon, a small kit-building venture for makers and students.", icon: "bulb", color: LOGO.yellow },
  { year: "Growth", title: "Word Spread", desc: "Sales grew fivefold within a few years.", icon: "rocket", color: LOGO.red },
  { year: "Early 2022", title: "Ravana PCB", desc: "First rebrand, growing into coding, electronics and robotics.", icon: "cog", color: LOGO.blue },
  { year: "Late 2022", title: "XTRONIC", desc: "Rebranded to XTRONIC, a full development platform.", icon: "zap", color: LOGO.orange },
  { year: "Today", title: "XTRONIC KIDS", desc: "Rebuilt from the ground up for builders aged 6 and up.", icon: "smile", color: LOGO.green },
  { year: "Next", title: "Brighter Future", desc: "More kits to inspire young creators.", icon: "star", color: LOGO.lightBlue },
];

const VALUES: { icon: LineIconName; title: string; desc: string; color: string }[] = [
  { icon: "bulb", title: "Creativity", desc: "Encourage new ideas and imagination.", color: LOGO.red },
  { icon: "book", title: "Education", desc: "Make learning simple and fun.", color: LOGO.blue },
  { icon: "shield", title: "Quality", desc: "Child-safety tested, with lifetime part replacement.", color: LOGO.green },
  { icon: "family", title: "Community", desc: "Support kids, schools and families.", color: LOGO.yellow },
  { icon: "leaf", title: "Sustainability", desc: "Solar-powered kits for a brighter planet.", color: LOGO.orange },
];

// Countries we actually ship to (see /help/shipping-returns).
const REGIONS = [
  { flag: "🇦🇺", name: "Australia", detail: "Standard 3–5 business days · Express 1–2" },
  { flag: "🇱🇰", name: "Sri Lanka", detail: "Standard 7–14 business days" },
];

// Add team members here as { name, role, desc, photo } (photo under /public).
const TEAM: { name: string; role: string; desc: string; photo?: string }[] = [
  { name: "Thimith Navodya", role: "Founder & CEO", desc: "Building hands-on electronics kits since 2018, now for curious kids." },
];

// Add real awards here as { title, org, year, image? }; the section stays hidden while empty.
const AWARDS: { title: string; org: string; year: string; image?: string }[] = [];

// Real product build photos: parts laid out, mid-build, finished.
const BEHIND_THE_SCENES = [
  "/products/voice-robot/2.jpg",
  "/products/solar-4wd-rover/2.jpg",
  "/products/wooden-taxiing-aircraft/2.jpg",
  "/products/solar-speedboat/2.jpg",
  "/products/voice-robot/3.jpg",
  "/products/solar-butterfly/3.jpg",
  "/products/wooden-taxiing-aircraft/3.jpg",
  "/products/stem-bundle-5in1/main.jpg",
];

// ── Building blocks ──

function Heading({ icon, color, children, sub }: { icon: LineIconName; color: string; children: React.ReactNode; sub?: string }) {
  return (
    <div>
      <h2 className="flex items-center gap-2.5 text-[clamp(28px,3.6vw,40px)] font-bold leading-tight tracking-tight">
        <span style={{ color }}>
          <LineIcon name={icon} size={34} strokeWidth={2.2} />
        </span>
        {children}
      </h2>
      {sub && <p className="mt-1 font-semibold text-muted sm:text-lg">{sub}</p>}
    </div>
  );
}

function InfoCard({ icon, color, title, children, className = "" }: { icon: LineIconName; color: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-card border-2 border-line bg-white p-5 shadow-[0_10px_30px_-16px_rgba(14,30,63,0.25)] ${className}`}>
      <h3 className="flex items-center gap-2 text-xl font-bold" style={{ color: LOGO.blue }}>
        <span style={{ color }}>
          <LineIcon name={icon} size={28} strokeWidth={2.2} />
        </span>
        {title}
      </h3>
      <div className="mt-2 text-sm font-semibold text-muted">{children}</div>
    </div>
  );
}

function Star({ className, color }: { className: string; color: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute ${className}`} style={{ color }}>
      <LineIcon name="star" size={28} strokeWidth={2.2} />
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-10 pb-12 md:pt-12 md:pb-16"
        style={{ background: "radial-gradient(900px 500px at 80% 20%, #fff 0%, transparent 60%), linear-gradient(180deg, #cfe9ff 0%, #e9f5ff 55%, #f8fafc 100%)" }}
      >
        <Star className="left-[3%] top-6" color={LOGO.yellow} />
        <Star className="left-[44%] top-10 hidden md:block" color={LOGO.blue} />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-8 px-4 md:grid-cols-[1.05fr_1fr] md:px-6">
          <div>
            <h1 className="-rotate-2 font-heading text-[clamp(56px,9vw,104px)] font-bold uppercase leading-[0.92] tracking-tight">
              <span className="text-comic" style={{ color: LOGO.blue, "--comic-stroke": "#fff", "--comic-shadow": "rgba(13,31,53,0.25)" } as React.CSSProperties}>
                About{" "}
              </span>
              <span className="text-comic" style={{ color: LOGO.yellow, "--comic-stroke": LOGO.blue, "--comic-shadow": "rgba(1,119,222,0.3)" } as React.CSSProperties}>
                Us
              </span>
            </h1>
            <p
              className="mt-4 inline-block -rotate-2 rounded-xl px-5 py-2.5 font-heading text-lg font-bold leading-tight text-brand-navy shadow-[0_6px_0_rgba(13,31,53,0.15)] sm:text-2xl"
              style={{ background: `linear-gradient(90deg, #FFD54A, ${LOGO.yellow})` }}
            >
              Building a Brighter Future
              <br />
              Through Creativity and STEM
            </p>
            <p className="mt-6 max-w-lg text-base font-semibold text-brand-navy-700 sm:text-lg">
              At XTRONIC KIDS, we believe every child has a bright idea. Our mission is to inspire the next
              generation of innovators through hands-on STEM learning, fun and creativity.
            </p>
          </div>

          <div className="relative mx-auto aspect-[5/4] w-full max-w-[520px]">
            <div aria-hidden className="absolute inset-[6%] rounded-full" style={{ background: "radial-gradient(circle, #fff 0%, #d6ecff 60%, transparent 75%)" }} />
            <Image src="/mascot/mascot-handshake-robot.png" alt="XTRONIC mascot with a robot kit" fill priority sizes="(min-width: 768px) 520px, 90vw" className="object-contain drop-shadow-[0_18px_22px_rgba(13,31,53,0.25)]" />
            <div className="absolute -bottom-2 -left-2 h-24 w-28 sm:h-28 sm:w-36">
              <Image src="/products/solar-speedboat/main.jpg" alt="" fill sizes="144px" className="rounded-2xl border-4 border-white object-cover shadow-lg" />
            </div>
            <div
              aria-hidden
              className="absolute -top-3 right-0 rotate-[8deg] rounded-[44%] border-[3px] border-brand-navy bg-white px-4 py-2.5 text-center font-heading text-base font-bold leading-[1.05] shadow-[4px_5px_0_rgba(13,31,53,0.15)] sm:text-xl"
            >
              <span style={{ color: LOGO.blue }}>Small Hands</span>
              <br />
              <span style={{ color: LOGO.red }}>Big Ideas!</span>
              <span className="absolute -bottom-2.5 left-6 h-5 w-5 rotate-45 border-r-[3px] border-b-[3px] border-brand-navy bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Story + Mission / Vision / What we do ── */}
      <section aria-labelledby="story-heading" className="mx-auto max-w-[1200px] px-4 pt-16 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="grid items-center gap-6 sm:grid-cols-[1fr_220px]">
            <div>
              <div id="story-heading">
                <Heading icon="star" color={LOGO.orange} sub="From a simple idea to a brighter future.">
                  <span style={{ color: LOGO.blue }}>Our Story</span>
                </Heading>
              </div>
              <p className="mt-4 text-[15px] font-semibold leading-relaxed text-brand-navy-700">
                XTRONIC KIDS carries on a project that started back in 2018 as Digicocoon, a small kit-building
                venture for makers and students. Word spread fast, sales grew fivefold within a few years, and the
                project went through two rebrands: first to Ravana PCB in early 2022, then to XTRONIC later that year.
              </p>
              <p className="mt-3 text-[15px] font-semibold leading-relaxed text-brand-navy-700">
                XTRONIC KIDS is the next chapter, rebuilt from the ground up for builders aged 6 and up. No apps, no
                logins, just solar panels, gearboxes and wires that actually do something the moment you finish.
              </p>
              <a
                href="#journey"
                className="btn-brick mt-5 inline-flex items-center gap-2 rounded-btn bg-brand-blue px-6 py-3 font-heading text-sm font-semibold text-white"
                style={{ "--btn-brick-shadow": "var(--color-brand-blue-600)" } as React.CSSProperties}
              >
                Our Journey <span aria-hidden>→</span>
              </a>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-[28px] border-4 border-white shadow-[0_20px_40px_-18px_rgba(14,30,63,0.4)]">
              <Image src="/products/voice-robot/3.jpg" alt="Robot kit mid-build" fill sizes="260px" className="object-cover" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard icon="target" color={LOGO.red} title="Our Mission">
              To inspire and empower children with innovative STEM kits that build real skills, creativity and
              confidence.
            </InfoCard>
            <InfoCard icon="eye" color={LOGO.blue} title="Our Vision">
              A world where every child has access to hands-on STEM learning and the chance to turn their ideas
              into reality.
            </InfoCard>
            <InfoCard icon="cog" color={LOGO.blue} title="What We Do" className="relative overflow-hidden sm:col-span-2">
              <p className="sm:pr-36">
                We design, develop and deliver high-quality STEM building kits that combine science, technology,
                engineering and creativity, so kids learn through real hands-on experience, not screen time.
              </p>
              <div className="absolute -right-3 -bottom-3 hidden h-28 w-36 sm:block">
                <Image src="/products/solar-4wd-rover/cutout.png" alt="" fill sizes="144px" className="object-contain" />
              </div>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* ── Journey timeline ── */}
      <section id="journey" aria-labelledby="journey-heading" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-4 pt-16 md:px-6">
        <div id="journey-heading">
          <Heading icon="heart" color={LOGO.red} sub="Key milestones in our growth and innovation.">
            <span style={{ color: LOGO.blue }}>Our</span> <span style={{ color: LOGO.orange }}>Journey</span>
          </Heading>
        </div>
        <ol className="relative mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          <span aria-hidden className="absolute inset-x-4 top-[58px] hidden border-t-2 border-dashed border-brand-blue/40 lg:block" />
          {MILESTONES.map((m) => (
            <li key={m.title} className="relative flex flex-col items-center text-center">
              <span style={{ color: m.color }}>
                <LineIcon name={m.icon} size={30} strokeWidth={2.2} />
              </span>
              <span className="relative z-10 mt-2 rounded-full px-3 py-1 font-heading text-xs font-bold text-white shadow" style={{ background: LOGO.blue }}>
                {m.year}
              </span>
              <div className="mt-3 w-full flex-1 rounded-2xl border-2 border-line bg-white px-3 py-3">
                <h3 className="text-sm font-bold text-brand-navy">{m.title}</h3>
                <p className="mt-1 text-xs font-semibold text-muted">{m.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Values + where we ship ── */}
      <section aria-labelledby="values-heading" className="mx-auto max-w-[1200px] px-4 pt-16 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div id="values-heading">
              <Heading icon="heart" color={LOGO.red} sub="The values that guide everything we do.">
                <span style={{ color: LOGO.blue }}>Our Core</span> <span style={{ color: LOGO.orange }}>Values</span>
              </Heading>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {VALUES.map((v, i) => (
                <li
                  key={v.title}
                  className={`group flex flex-col items-center rounded-card px-3 py-5 text-center text-white shadow-[0_10px_24px_-14px_rgba(14,30,63,0.5)] transition-[translate] duration-300 hover:-translate-y-1.5 ${i === VALUES.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
                  style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${v.color}, white 15%), ${v.color})` }}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    <LineIcon name={v.icon} size={36} strokeWidth={2} />
                  </span>
                  <h3 className="mt-2 font-heading text-[17px] font-bold">{v.title}</h3>
                  <p className="mt-1 text-xs font-bold opacity-95">{v.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-card border-2 border-line p-5 sm:p-6" style={{ background: "linear-gradient(160deg, #e9f5ff, #fff)" }}>
            <Heading icon="globe" color={LOGO.blue} sub="Shipping STEM adventures to young innovators.">
              <span style={{ color: LOGO.blue }}>Our Reach</span>
            </Heading>
            <ul className="mt-5 grid gap-3">
              {REGIONS.map((r) => (
                <li key={r.name} className="flex items-center gap-3 rounded-2xl border-2 border-line bg-white p-3">
                  <span className="text-3xl" aria-hidden>
                    {r.flag}
                  </span>
                  <span>
                    <strong className="block font-heading text-brand-navy">{r.name}</strong>
                    <span className="text-xs font-semibold text-muted">{r.detail}</span>
                  </span>
                  <span className="ml-auto" style={{ color: LOGO.green }}>
                    <LineIcon name="truck" size={24} />
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/help/shipping-returns" className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-brand-blue hover:text-brand-blue-600">
              Shipping details <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Team + behind the scenes ── */}
      <section aria-labelledby="team-heading" className="mx-auto max-w-[1200px] px-4 pt-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div id="team-heading">
              <Heading icon="family" color={LOGO.blue} sub="The passionate people behind XTRONIC KIDS.">
                <span style={{ color: LOGO.blue }}>Our Team</span>
              </Heading>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {TEAM.map((m) => (
                <li key={m.name} className="overflow-hidden rounded-card border-2 border-line bg-white text-center shadow-[0_10px_24px_-16px_rgba(14,30,63,0.3)]">
                  <div className="relative grid aspect-square place-items-center" style={{ background: "linear-gradient(160deg, #e9f5ff, #fff7dc)" }}>
                    {m.photo ? (
                      <Image src={m.photo} alt={m.name} fill sizes="240px" className="object-cover" />
                    ) : (
                      // Initials until a real photo is added to TEAM.
                      <span className="grid h-24 w-24 place-items-center rounded-full border-4 border-white font-heading text-3xl font-bold text-white shadow-md" style={{ background: LOGO.blue }}>
                        {m.name.split(" ").map((w) => w[0]).join("")}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-heading font-bold text-brand-navy">{m.name}</h3>
                    <p className="text-xs font-extrabold" style={{ color: LOGO.orange }}>
                      {m.role}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-muted">{m.desc}</p>
                  </div>
                </li>
              ))}
              <li className="flex flex-col items-center justify-center rounded-card border-2 border-dashed border-line bg-white p-4 text-center">
                <span style={{ color: LOGO.blue }}>
                  <LineIcon name="heart" size={32} />
                </span>
                <p className="mt-2 font-heading font-bold text-brand-navy">Questions?</p>
                <p className="text-xs font-semibold text-muted">Our support team is here to help.</p>
                <Link href="/help/faq" className="mt-2 text-xs font-extrabold text-brand-blue hover:underline">
                  Get in touch →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <Heading icon="cog" color={LOGO.blue} sub="Inside the kits: parts, builds and finished models.">
                <span style={{ color: LOGO.blue }}>Behind the Scenes</span>
              </Heading>
              <Link href="/shop" className="rounded-btn border-2 border-brand-blue px-4 py-2 font-heading text-sm font-semibold text-brand-blue hover:bg-brand-blue hover:text-white">
                See More →
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {BEHIND_THE_SCENES.map((src) => (
                <li key={src} className="group relative aspect-square overflow-hidden rounded-2xl border-[3px] border-white shadow-[0_8px_20px_-12px_rgba(14,30,63,0.4)]">
                  <Image src={src} alt="" fill sizes="(min-width: 640px) 160px, 45vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Awards + join ── */}
      <section aria-label="Awards and community" className="mx-auto max-w-[1200px] px-4 pt-16 md:px-6">
        <div className={`grid gap-6 ${AWARDS.length ? "lg:grid-cols-[1.6fr_1fr]" : ""}`}>
          {AWARDS.length > 0 && (
            <div>
              <Heading icon="star" color={LOGO.yellow} sub="Proud to be recognised for our commitment to STEM education.">
                <span style={{ color: LOGO.blue }}>Awards &amp; Recognition</span>
              </Heading>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {AWARDS.map((a) => (
                  <li key={a.title} className="rounded-card border-2 border-line bg-white p-4">
                    <h3 className="text-sm font-bold text-brand-navy">{a.title}</h3>
                    <p className="text-xs font-semibold text-muted">
                      {a.org} · {a.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className="relative grid items-center gap-4 overflow-hidden rounded-[28px] p-6 sm:grid-cols-[1fr_auto] sm:p-8"
            style={{ background: "linear-gradient(140deg, #FFE27A, #FFD03A)" }}
          >
            <div>
              <h2 className="flex items-center gap-2 text-[clamp(26px,3vw,34px)] font-bold leading-tight" style={{ color: LOGO.blue }}>
                <span style={{ color: LOGO.red }}>
                  <LineIcon name="rocket" size={32} strokeWidth={2.2} />
                </span>
                Join Our <span style={{ color: LOGO.orange }}>Mission</span>
              </h2>
              <p className="mt-1 font-bold text-brand-navy">Let&apos;s build a brighter future together. Be part of the XTRONIC KIDS community!</p>
              <Link
                href="/#subscribe"
                className="btn-brick mt-4 inline-flex items-center gap-2 rounded-btn bg-brand-amber px-6 py-3 font-heading text-sm font-semibold text-white"
                style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
              >
                Join the Community <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="relative mx-auto h-36 w-32">
              <Image src="/mascot/waving.png" alt="" fill sizes="128px" className="object-contain object-bottom" />
            </div>
          </div>
        </div>
      </section>

      <SignupBand />
    </>
  );
}
