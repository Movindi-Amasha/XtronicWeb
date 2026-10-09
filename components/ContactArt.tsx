import { LOGO } from "@/lib/brandColors";

// Contact page illustration: envelopes fly into a mailbox, whose flag pops up
// with each delivery. CSS animations in globals.css (.mail-fly, .mail-flag).

const NAVY = "#0D1F35";

function Envelope({ delay, color }: { delay: number; color: string }) {
  return (
    <g className="mail-fly" style={{ animationDelay: `${delay}s` }}>
      <rect x="-22" y="-15" width="44" height="30" rx="5" fill="#fff" stroke={NAVY} strokeWidth="2.4" />
      <path d="M-22 -12l22 15 22-15" fill="none" stroke={NAVY} strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="0" cy="6" r="5" fill={color} />
    </g>
  );
}

export function MailboxScene({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 240 150" className={className}>
      {/* dotted flight path */}
      <path d="M10 40C60 0 110 10 150 60" fill="none" stroke={LOGO.blue} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 8" opacity="0.6" />
      {/* post + box */}
      <rect x="168" y="96" width="12" height="52" rx="3" fill="#C38447" stroke={NAVY} strokeWidth="2.4" />
      <path d="M140 64a24 24 0 0 1 24-24h28a24 24 0 0 1 24 24v36h-76z" fill={LOGO.red} stroke={NAVY} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M164 40a24 24 0 0 1 24 24v36" fill="none" stroke="#fff" strokeWidth="3" opacity="0.35" />
      <rect x="146" y="70" width="28" height="7" rx="3.5" fill={NAVY} />
      {/* flag */}
      <g className="mail-flag" style={{ transformBox: "view-box", transformOrigin: "214px 84px" }}>
        <rect x="211" y="44" width="6" height="42" rx="3" fill={NAVY} />
        <path d="M217 46h18l-5 8 5 8h-18z" fill={LOGO.yellow} stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      </g>
      <Envelope delay={0} color={LOGO.orange} />
      <Envelope delay={1.6} color={LOGO.blue} />
      <Envelope delay={3.2} color={LOGO.green} />
    </svg>
  );
}
