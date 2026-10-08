import { LOGO } from "@/lib/brandColors";

// Little hand-drawn-style decorations (stars, rockets, sparkles, paper planes,
// bulbs) scattered around section headings, as in the design mockups. Wrap a
// heading in <Doodled> and pick a layout preset; everything is decorative and
// hidden from screen readers.

type Kind = "star" | "rocket" | "sparkle" | "plane" | "bulb" | "dots";

function Doodle({ kind, color }: { kind: Kind; color: string }) {
  switch (kind) {
    case "star":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" fill={color} stroke="#0D1F35" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" fill={color}>
          <path d="M12 1c.6 5.6 2.4 8.4 9 11-6.6 2.6-8.4 5.4-9 11-.6-5.6-2.4-8.4-9-11 6.6-2.6 8.4-5.4 9-11z" />
        </svg>
      );
    case "rocket":
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 44c3-1 5-3 7-6" stroke={LOGO.orange} strokeWidth="2.5" strokeDasharray="1 4" />
          <path d="M30 6c6-2 11-1 12 0 1 1 2 6 0 12L28 32l-12-12z" fill={color} stroke="#0D1F35" strokeWidth="1.8" />
          <circle cx="32" cy="16" r="3.5" fill="#fff" stroke="#0D1F35" strokeWidth="1.8" />
          <path d="M16 20l-6 1-4 6 7-1M28 32l-1 6-6 4 1-7" fill={LOGO.blue} stroke="#0D1F35" strokeWidth="1.8" />
          <path d="M18 30c-3 1-5 4-6 7 3-1 6-3 7-6" fill={LOGO.yellow} stroke="#0D1F35" strokeWidth="1.6" />
        </svg>
      );
    case "plane":
      return (
        <svg viewBox="0 0 48 32" className="h-full w-full" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 28c8-2 12-8 20-10" strokeDasharray="2 4" />
          <path d="M24 16 46 4 38 26l-7-6-7-4z" fill="#fff" />
          <path d="M31 20l15-16" />
        </svg>
      );
    case "bulb":
      return (
        <svg viewBox="0 0 32 32" className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 1v3M4 6l2 2M28 6l-2 2M1 16h3M31 16h-3" stroke={color} strokeWidth="2.2" />
          <path d="M11 22c0-3-4-5-4-10a9 9 0 0 1 18 0c0 5-4 7-4 10z" fill={color} stroke="#0D1F35" strokeWidth="1.6" />
          <path d="M12 26h8M13 30h6" stroke="#0D1F35" strokeWidth="1.8" />
        </svg>
      );
    case "dots":
      return (
        <svg viewBox="0 0 40 12" className="h-full w-full" fill={color}>
          <circle cx="4" cy="6" r="2.5" />
          <circle cx="16" cy="6" r="2" />
          <circle cx="27" cy="6" r="1.5" />
          <circle cx="36" cy="6" r="1" />
        </svg>
      );
  }
}

type Placement = { kind: Kind; color: string; className: string; mobile?: boolean };

// Positions are relative to the heading box. Items without `mobile` only show
// from sm up, so phones get one or two small doodles that stay inside the
// screen.
const PRESETS: Record<"left" | "right" | "center" | "split", Placement[]> = {
  left: [
    { kind: "rocket", color: LOGO.red, className: "-right-14 -top-6 h-10 w-10 rotate-6" },
    { kind: "star", color: LOGO.yellow, className: "-right-6 top-1 h-5 w-5 -rotate-12", mobile: true },
    { kind: "sparkle", color: LOGO.lightBlue, className: "-right-24 top-6 h-4 w-4" },
  ],
  right: [
    { kind: "plane", color: LOGO.blue, className: "-right-20 -top-2 h-8 w-12" },
    { kind: "sparkle", color: LOGO.yellow, className: "-right-6 -top-3 h-5 w-5", mobile: true },
    { kind: "star", color: LOGO.orange, className: "-right-28 top-7 h-4 w-4 rotate-12" },
  ],
  center: [
    { kind: "star", color: LOGO.yellow, className: "-left-12 -top-3 h-7 w-7 -rotate-12" },
    { kind: "sparkle", color: LOGO.lightBlue, className: "-left-4 -top-4 h-4 w-4", mobile: true },
    { kind: "rocket", color: LOGO.red, className: "-right-14 -top-6 h-10 w-10 rotate-6" },
    { kind: "star", color: LOGO.blue, className: "-right-4 -top-3 h-4 w-4 rotate-12", mobile: true },
  ],
  split: [
    { kind: "bulb", color: LOGO.yellow, className: "-left-11 -top-5 h-8 w-8 -rotate-12" },
    { kind: "sparkle", color: LOGO.orange, className: "-right-5 -top-4 h-5 w-5", mobile: true },
    { kind: "plane", color: LOGO.blue, className: "-right-20 top-0 h-8 w-12" },
    { kind: "dots", color: LOGO.lightBlue, className: "-right-28 top-9 h-2 w-8" },
  ],
};

export default function Doodled({
  children,
  preset = "left",
  className = "",
}: {
  children: React.ReactNode;
  preset?: keyof typeof PRESETS;
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      {PRESETS[preset].map((d, i) => (
        <span
          key={i}
          aria-hidden
          className={`doodle pointer-events-none absolute ${d.mobile ? "block" : "hidden sm:block"} ${d.className}`}
          style={{ animationDelay: `${i * 0.7}s` }}
        >
          <Doodle kind={d.kind} color={d.color} />
        </span>
      ))}
    </div>
  );
}
