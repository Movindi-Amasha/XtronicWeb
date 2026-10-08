type Tone = "blue" | "yellow" | "amber" | "green";

const TONE_STYLES: Record<Tone, string> = {
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow text-brand-navy",
  amber: "bg-brand-amber",
  green: "bg-brand-green",
};

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
  sprout: (
    <>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
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

const ITEMS: { icon: string; label: string; tone: Tone }[] = [
  { icon: "6+", label: "Ages 6+", tone: "blue" },
  { icon: "atom", label: "STEM Learning", tone: "yellow" },
  { icon: "wrench", label: "Hands-On Build", tone: "amber" },
  { icon: "noScreen", label: "Screen-Free Fun", tone: "blue" },
  { icon: "star", label: "Builds Confidence", tone: "yellow" },
  { icon: "family", label: "Family Activity", tone: "amber" },
  { icon: "sprout", label: "Eco Solar Power", tone: "green" },
  { icon: "gift", label: "Gift Ready", tone: "blue" },
];

export default function FeatureIconsRow() {
  return (
    <section aria-label="Why families choose XTRONIC KIDS" className="relative z-20 mx-auto -mt-9 max-w-[1200px] px-4 md:px-6">
      <div className="grid grid-cols-4 gap-2 rounded-card border-2 border-line bg-white p-5 shadow-[0_10px_30px_-12px_rgba(14,30,63,0.18)] sm:p-6 md:grid-cols-8">
        {ITEMS.map((item) => (
          <div key={item.label} className="group flex flex-col items-center gap-2.5 text-center">
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.12)] transition-transform group-hover:-translate-y-1 group-hover:-rotate-6 ${TONE_STYLES[item.tone]}`}
            >
              {ICONS[item.icon] ? (
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[item.icon]}
                </svg>
              ) : (
                item.icon
              )}
            </span>
            <p className="font-body text-[13.5px] font-extrabold leading-snug text-brand-navy">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
