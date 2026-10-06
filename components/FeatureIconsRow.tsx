type Tone = "blue" | "amber" | "red";

const TONE_STYLES: Record<Tone, string> = {
  blue: "bg-brand-blue",
  amber: "bg-brand-amber",
  red: "bg-brand-amber",
};

const ITEMS: { icon: string; label: string; tone: Tone }[] = [
  { icon: "🧒", label: "Age 6+ Suitable", tone: "blue" },
  { icon: "🔬", label: "STEM Learning", tone: "amber" },
  { icon: "🔧", label: "Hands-On Building", tone: "red" },
  { icon: "📵", label: "Screen-Free Fun", tone: "blue" },
  { icon: "⭐", label: "Builds Confidence", tone: "amber" },
  { icon: "👨‍👩‍👧", label: "Family Activity", tone: "red" },
  { icon: "🍃", label: "Eco-Friendly Solar", tone: "blue" },
  { icon: "🎁", label: "Gift Ready", tone: "amber" },
];

export default function FeatureIconsRow() {
  return (
    <section
      aria-label="Why families choose XTRONIC KIDZ"
      className="mx-auto max-w-[1260px] px-4 py-10 md:px-6"
    >
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2 text-center">
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white shadow-sm ${TONE_STYLES[item.tone]}`}
            >
              {item.icon}
            </span>
            <p className="font-body text-xs font-bold leading-snug text-brand-navy">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
