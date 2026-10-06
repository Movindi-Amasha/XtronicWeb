type Tone = "blue" | "yellow" | "amber" | "green";

const TONE_STYLES: Record<Tone, string> = {
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow text-brand-navy",
  amber: "bg-brand-amber",
  green: "bg-brand-green",
};

const ITEMS: { icon: string; label: string; tone: Tone }[] = [
  { icon: "6+", label: "Ages 6+", tone: "blue" },
  { icon: "⚛", label: "STEM Learning", tone: "yellow" },
  { icon: "🔧", label: "Hands-On Build", tone: "amber" },
  { icon: "📵", label: "Screen-Free Fun", tone: "blue" },
  { icon: "⭐", label: "Builds Confidence", tone: "yellow" },
  { icon: "👨‍👩‍👧", label: "Family Activity", tone: "amber" },
  { icon: "🌱", label: "Eco Solar Power", tone: "green" },
  { icon: "🎁", label: "Gift Ready", tone: "blue" },
];

export default function FeatureIconsRow() {
  return (
    <section aria-label="Why families choose XTRONIC KIDZ" className="relative z-20 mx-auto -mt-9 max-w-[1200px] px-4 md:px-6">
      <div className="grid grid-cols-4 gap-2 rounded-card border-2 border-line bg-white p-5 shadow-[0_10px_30px_-12px_rgba(14,30,63,0.18)] sm:p-6 md:grid-cols-8">
        {ITEMS.map((item) => (
          <div key={item.label} className="group flex flex-col items-center gap-2.5 text-center">
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.12)] transition-transform group-hover:-translate-y-1 group-hover:-rotate-6 ${TONE_STYLES[item.tone]}`}
            >
              {item.icon}
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
