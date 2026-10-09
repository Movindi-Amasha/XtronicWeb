const SCATTER_SETS = {
  a: [
    { symbol: "✦", className: "left-[8%] top-[18%] text-3xl text-brand-amber scatter-spin" },
    { symbol: "●", className: "left-[12%] top-[68%] text-xl text-brand-blue scatter-float" },
    { symbol: "✧", className: "right-[8%] top-[25%] text-4xl text-brand-green scatter-drift" },
    { symbol: "•", className: "right-[16%] top-[76%] text-3xl text-brand-amber scatter-float" },
  ],
} as const;

export default function HeroScatter({ set }: { set: keyof typeof SCATTER_SETS }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {SCATTER_SETS[set].map(({ symbol, className }, index) => (
        <span key={index} className={`absolute ${className}`}>
          {symbol}
        </span>
      ))}
    </div>
  );
}