import { LOGO } from "@/lib/brandColors";

/** Big wrapped present with a bow, drawn in the logo colours. Decorative. */
export default function GiftBox({
  className = "",
  box = LOGO.red,
  lid = "#FF4D4C",
  ribbon = LOGO.yellow,
  tag = true,
}: {
  className?: string;
  box?: string;
  lid?: string;
  ribbon?: string;
  tag?: boolean;
}) {
  const id = `gift-dots-${box.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={className} fill="none" strokeLinejoin="round">
      {/* shadow */}
      <ellipse cx="100" cy="188" rx="70" ry="8" fill="rgba(13,31,53,0.15)" />
      {/* box */}
      <rect x="32" y="88" width="136" height="96" rx="10" fill={box} stroke="#0D1F35" strokeWidth="3" />
      <rect x="32" y="88" width="136" height="96" rx="10" fill={`url(#${id})`} />
      <rect x="140" y="88" width="28" height="96" rx="0" fill="rgba(0,0,0,0.12)" />
      {/* lid */}
      <rect x="22" y="66" width="156" height="30" rx="8" fill={lid} stroke="#0D1F35" strokeWidth="3" />
      {/* ribbon */}
      <rect x="88" y="66" width="24" height="118" fill={ribbon} stroke="#0D1F35" strokeWidth="3" />
      <rect x="22" y="74" width="156" height="14" fill={ribbon} stroke="#0D1F35" strokeWidth="3" />
      {/* bow */}
      <path d="M100 66c-18-30-56-34-56-12 0 18 30 16 56 12Z" fill={ribbon} stroke="#0D1F35" strokeWidth="3" />
      <path d="M100 66c18-30 56-34 56-12 0 18-30 16-56 12Z" fill={ribbon} stroke="#0D1F35" strokeWidth="3" />
      <path d="M92 66c-6 10-14 20-24 26M108 66c6 10 14 20 24 26" stroke="#0D1F35" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="64" r="10" fill={LOGO.orange} stroke="#0D1F35" strokeWidth="3" />
      {/* XTRONIC tag */}
      {tag && (<g transform="rotate(-8 60 140)">
        <rect x="40" y="124" width="44" height="28" rx="6" fill="#fff" stroke="#0D1F35" strokeWidth="2.5" />
        <text x="62" y="143" textAnchor="middle" fontFamily="var(--font-fredoka), sans-serif" fontWeight="700" fontSize="13" fill={LOGO.blue}>
          X<tspan fill={LOGO.orange}>K</tspan>
        </text>
      </g>)}
      <defs>
        <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="9" r="3" fill="rgba(255,255,255,0.35)" />
        </pattern>
      </defs>
    </svg>
  );
}
