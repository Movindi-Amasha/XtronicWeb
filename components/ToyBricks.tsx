import { LOGO } from "@/lib/brandColors";

/** A little stack of toy bricks with a turning gear behind it (bottom-left corner). */
export default function ToyBricks({ className }: { className: string }) {
  const shade = (c: string) => `color-mix(in srgb, ${c} 72%, black)`;
  const light = (c: string) => `color-mix(in srgb, ${c} 75%, white)`;
  const brick = (x: number, y: number, w: number, h: number, c: string, studs: number) => (
    <g>
      {Array.from({ length: studs }, (_, i) => {
        const sx = x + (w / studs) * (i + 0.5) - 8;
        return <rect key={i} x={sx} y={y - 7} width="16" height="9" rx="3" fill={light(c)} stroke={shade(c)} strokeWidth="1.5" />;
      })}
      <rect x={x} y={y} width={w} height={h} rx="5" fill={c} />
      <rect x={x} y={y + h - 7} width={w} height="7" rx="3" fill={shade(c)} opacity="0.55" />
      <rect x={x + 5} y={y + 4} width={w - 10} height="3" rx="1.5" fill="#fff" opacity="0.35" />
    </g>
  );
  return (
    <svg viewBox="0 0 170 130" className={className} style={{ filter: "drop-shadow(0 8px 10px rgba(13,31,53,0.18))" }}>
      <g className="scatter-spin [animation-duration:14s]" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path
          d="M46 14l4 8 9-2 1 9 9 2-3 9 7 6-7 6 3 9-9 2-1 9-9-2-4 8-5-7-8 4-3-9-9-1 2-9-8-5 6-7-4-8 9-3 1-9 9 2z"
          fill={LOGO.orange}
        />
        <circle cx="45" cy="47" r="9" fill="#fff" />
      </g>
      {brick(14, 92, 142, 34, LOGO.blue, 4)}
      {brick(48, 60, 76, 32, LOGO.yellow, 2)}
      <g transform="rotate(12 138 52)">{brick(112, 40, 50, 26, LOGO.red, 2)}</g>
    </svg>
  );
}
