import { LOGO } from "@/lib/brandColors";

// "Scan the QR" illustration: a phone held over the kit's QR code, with a
// scan line sweeping the code and a tick popping up on screen. CSS motion in
// globals.css (.qr-scanline, .qr-tick, .qr-phone).

const NAVY = "#0D1F35";

// 9x9 module pattern (1 = dark), finder squares drawn separately.
const MODULES = [
  "000101000",
  "000010000",
  "000111000",
  "101100110",
  "010011011",
  "110101100",
  "000110010",
  "000011101",
  "000101011",
];

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="21" height="21" rx="3" fill={NAVY} />
      <rect x={x + 3} y={y + 3} width="15" height="15" rx="2" fill="#fff" />
      <rect x={x + 6} y={y + 6} width="9" height="9" rx="1.5" fill={NAVY} />
    </g>
  );
}

function QrCode({ x, y }: { x: number; y: number }) {
  // 63 x 63 code: 9 modules of 7px
  return (
    <g transform={`translate(${x} ${y})`}>
      {MODULES.flatMap((row, r) =>
        [...row].map((c, k) =>
          c === "1" ? <rect key={`${r}-${k}`} x={k * 7} y={r * 7} width="6" height="6" rx="1" fill={NAVY} /> : null,
        ),
      )}
      <Finder x={0} y={0} />
      <Finder x={42} y={0} />
      <Finder x={0} y={42} />
    </g>
  );
}

export default function QrScan({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 150" className={className}>
      {/* kit box corner with the QR sticker */}
      <rect x="10" y="22" width="112" height="116" rx="12" fill={`color-mix(in srgb, ${LOGO.orange} 30%, #f6d3a8)`} stroke={NAVY} strokeWidth="2.5" />
      <path d="M10 46h112" stroke={NAVY} strokeWidth="2" opacity="0.3" />
      <rect x="26" y="54" width="80" height="80" rx="8" fill="#fff" stroke={NAVY} strokeWidth="2.2" />
      <QrCode x={34.5} y={62.5} />
      {/* scan line sweeping the code */}
      <g className="qr-scanline">
        <rect x="28" y="60" width="76" height="3" rx="1.5" fill={LOGO.lightBlue} />
        <rect x="28" y="60" width="76" height="14" fill={LOGO.lightBlue} opacity="0.18" />
      </g>
      {/* phone hovering over it */}
      <g className="qr-phone">
        <rect x="118" y="12" width="66" height="122" rx="12" fill={NAVY} />
        <rect x="123" y="22" width="56" height="100" rx="6" fill={`color-mix(in srgb, ${LOGO.lightBlue} 22%, white)`} />
        <rect x="143" y="16" width="16" height="3" rx="1.5" fill="#33475f" />
        {/* viewfinder corners */}
        <path d="M131 40v-8h8M171 32h8v8M179 92v8h-8M139 100h-8v-8" fill="none" stroke={LOGO.blue} strokeWidth="3" strokeLinecap="round" />
        <g className="qr-tick" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <circle cx="151" cy="66" r="15" fill={LOGO.green} />
          <path d="M144 66l5 5 9-10" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <rect x="131" y="108" width="40" height="7" rx="3.5" fill={LOGO.orange} />
      </g>
    </svg>
  );
}
