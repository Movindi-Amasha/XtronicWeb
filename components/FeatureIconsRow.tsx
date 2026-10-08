import { LOGO } from "@/lib/brandColors";

// Colour order follows the reference design, with its pink and purple swapped
// for the logo's red.
// Line icons (Lucide-style, 24px grid) drawn in currentColor so they pick up
// each tile's text colour. Emoji rendered differently on every OS and clashed
// with the flat brick tiles.
const ICONS: Record<string, React.ReactNode> = {
  atom: (
    <>
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  noScreen: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M11 18h2" />
      <path d="M3.5 3.5l17 17" />
    </>
  ),
  star: (
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  ),
  family: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01M15 9h.01" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </>
  ),
};

const ITEMS: { icon: string; title: string; sub: string; color: string }[] = [
  { icon: "smile", title: "6+", sub: "Age Suitable", color: LOGO.red },
  { icon: "atom", title: "STEM", sub: "Learning", color: LOGO.blue },
  { icon: "wrench", title: "Hands-On", sub: "Building", color: LOGO.green },
  { icon: "noScreen", title: "Screen-Free", sub: "Fun", color: LOGO.orange },
  { icon: "gift", title: "Gift", sub: "Ready", color: LOGO.red },
  { icon: "star", title: "Builds", sub: "Confidence", color: LOGO.yellow },
  { icon: "family", title: "Family", sub: "Fun", color: LOGO.red },
  { icon: "leaf", title: "Eco-Friendly", sub: "Solar Power", color: LOGO.lightBlue },
];

export default function FeatureIconsRow() {
  return (
    <section aria-label="Why families choose XTRONIC KIDS" className="relative z-20 mx-auto -mt-9 max-w-[1200px] px-4 md:px-6 xl:max-w-[1320px]">
      <ul className="grid grid-cols-4 gap-x-2 gap-y-5 rounded-card border-2 border-line bg-white px-3 py-5 shadow-[0_10px_30px_-12px_rgba(14,30,63,0.18)] sm:p-6 lg:grid-cols-8 lg:gap-x-1 lg:px-4">
        {ITEMS.map((item) => (
          <li
            key={item.title + item.sub}
            className="group flex flex-col items-center gap-2 text-center xl:flex-row xl:justify-center xl:gap-2.5 xl:text-left"
          >
            <span
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.14),0_6px_14px_-6px_rgba(14,30,63,0.35)] transition-transform group-hover:-translate-y-1 group-hover:-rotate-6 sm:h-14 sm:w-14 xl:h-12 xl:w-12"
              style={{ background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${item.color}, white 22%), ${item.color} 70%)` }}
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[item.icon]}
              </svg>
            </span>
            <p className="whitespace-nowrap font-body text-[12px] leading-tight text-brand-navy sm:text-[13px]">
              <strong className={`block font-heading font-semibold ${item.title === "6+" ? "text-lg leading-none sm:text-xl" : ""}`}>
                {item.title}
              </strong>
              <span className="font-bold text-muted">{item.sub}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
