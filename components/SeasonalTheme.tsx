"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LOGO } from "@/lib/brandColors";
import { THEMES, isThemeId, type Edge, type Particle, type SeasonalTheme as Theme, type ThemeId } from "@/lib/seasonalThemes";

// The active seasonal theme (chosen on the server, see lib/siteTheme.ts):
// a top banner with a decorated bottom edge, plus a few gently falling
// particles. Shoppers can close the banner (remembered per theme). Add
// ?theme-preview=<id> (or =off) to any URL to preview a theme in your own
// browser without switching it on for everyone.

const NAVY = "#0D1F35";
const DISMISS_KEY = "xtronic-theme-dismissed";

function Icon({ id }: { id: ThemeId }) {
  switch (id) {
    case "halloween":
      return (
        <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" aria-hidden>
          <path d="M20 9c1-4 4-6 6-5" fill="none" stroke={LOGO.green} strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="20" cy="24" rx="16" ry="12" fill={LOGO.orange} stroke={NAVY} strokeWidth="2" />
          <path d="M14 13c-3 4-3 18 0 22M26 13c3 4 3 18 0 22" fill="none" stroke={NAVY} strokeWidth="1.5" opacity="0.35" />
          <path d="M12 21l4-3 2 4zM28 21l-4-3-2 4zM13 28c4 4 10 4 14 0l-3 1-2-2-2 2-2-2-2 2z" fill={NAVY} />
        </svg>
      );
    case "singles-day":
      return (
        <span className="grid h-8 shrink-0 place-items-center rounded-lg px-2 font-heading text-sm font-bold" style={{ background: LOGO.yellow, color: NAVY }}>
          11.11
        </span>
      );
    case "christmas":
      return (
        <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" aria-hidden>
          <path d="M20 4l5 9h-3l6 9h-3l7 10H8l7-10h-3l6-9h-3z" fill={LOGO.green} stroke={NAVY} strokeWidth="1.8" strokeLinejoin="round" />
          <rect x="17" y="32" width="6" height="5" rx="1" fill="#C38447" stroke={NAVY} strokeWidth="1.5" />
          <circle cx="16" cy="20" r="1.8" fill={LOGO.yellow} />
          <circle cx="24" cy="25" r="1.8" fill="#fff" />
          <circle cx="18" cy="28" r="1.8" fill={LOGO.yellow} />
          <path d="M20 1l1.2 2.4 2.6.4-1.9 1.8.5 2.6L20 7l-2.4 1.2.5-2.6-1.9-1.8 2.6-.4z" fill={LOGO.yellow} />
        </svg>
      );
    case "easter":
      return (
        <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" aria-hidden>
          <path d="M20 3c8 0 14 12 14 21a14 14 0 0 1-28 0C6 15 12 3 20 3z" fill={LOGO.yellow} stroke={NAVY} strokeWidth="2" />
          <path d="M7 20l5-3 4 3 4-3 4 3 4-3 5 3" fill="none" stroke={LOGO.blue} strokeWidth="2.4" strokeLinejoin="round" />
          <circle cx="14" cy="28" r="2" fill={LOGO.red} />
          <circle cx="20" cy="30" r="2" fill={LOGO.green} />
          <circle cx="26" cy="28" r="2" fill={LOGO.red} />
        </svg>
      );
  }
}

/** Decorated strip along the banner's bottom edge (repeats across the width). */
function EdgeStrip({ edge }: { edge: Edge }) {
  const tile = {
    bunting: (
      <>
        <path d="M0 1h48" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" />
        <path d="M2 1l8 11 8-11z" fill={LOGO.orange} />
        <path d="M18 1l8 11 8-11z" fill={LOGO.yellow} />
        <path d="M34 1l7 10 7-10z" fill={LOGO.green} />
      </>
    ),
    lights: (
      <>
        <path d="M0 2q12 6 24 0t24 0" fill="none" stroke={NAVY} strokeOpacity="0.55" strokeWidth="1.2" />
        <rect x="10" y="4" width="3" height="2.5" fill={NAVY} />
        <ellipse className="theme-twinkle" cx="11.5" cy="10" rx="3" ry="4" fill={LOGO.yellow} />
        <rect x="35" y="4" width="3" height="2.5" fill={NAVY} />
        <ellipse className="theme-twinkle [animation-delay:0.8s]" cx="36.5" cy="10" rx="3" ry="4" fill={LOGO.green} />
      </>
    ),
    confetti: (
      <>
        <rect x="3" y="3" width="6" height="3" rx="1" fill={LOGO.yellow} transform="rotate(20 6 4)" />
        <circle cx="17" cy="9" r="2" fill={LOGO.red} />
        <rect x="26" y="2" width="5" height="3" rx="1" fill={LOGO.green} transform="rotate(-25 28 3)" />
        <circle cx="40" cy="6" r="2" fill="#fff" />
      </>
    ),
    eggs: (
      <>
        <ellipse cx="8" cy="7" rx="4" ry="5.5" fill={LOGO.lightBlue} />
        <path d="M4 7l2-1.5 2 1.5 2-1.5 2 1.5" fill="none" stroke="#fff" strokeWidth="1.2" />
        <ellipse cx="24" cy="7" rx="4" ry="5.5" fill={LOGO.orange} />
        <circle cx="24" cy="6" r="1.2" fill="#fff" />
        <ellipse cx="40" cy="7" rx="4" ry="5.5" fill={LOGO.red} />
        <path d="M36 8h8" stroke="#fff" strokeWidth="1.2" />
      </>
    ),
  }[edge];
  return (
    <svg aria-hidden className="block h-[14px] w-full" preserveAspectRatio="none">
      <defs>
        <pattern id={`theme-edge-${edge}`} width="48" height="14" patternUnits="userSpaceOnUse">
          {tile}
        </pattern>
      </defs>
      <rect width="100%" height="14" fill={`url(#theme-edge-${edge})`} />
    </svg>
  );
}

function ParticleShape({ kind, color }: { kind: Particle; color: string }) {
  switch (kind) {
    case "leaf":
      return (
        <svg viewBox="0 0 20 20" className="h-full w-full">
          <path d="M3 17C3 8 9 3 17 3c0 8-5 14-14 14z" fill={color} />
          <path d="M4 16L14 6" stroke={NAVY} strokeOpacity="0.3" strokeWidth="1" />
        </svg>
      );
    case "snow":
      return (
        <svg viewBox="0 0 20 20" className="h-full w-full" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
          <path d="M10 1v18M2.2 5.5l15.6 9M2.2 14.5l15.6-9" />
        </svg>
      );
    case "confetti":
      return <span className="block h-full w-1/2 rounded-sm" style={{ background: color }} />;
    case "petal":
      return (
        <svg viewBox="0 0 20 20" className="h-full w-full">
          <ellipse cx="10" cy="10" rx="5" ry="8" fill={color} />
        </svg>
      );
  }
}

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 41 + 7) % 100,
  size: 10 + ((i * 7) % 4) * 3,
  dur: 11 + ((i * 5) % 7),
  delay: -((i * 2.3) % 14),
  sway: i % 2 ? 40 : -40,
  mobile: i % 2 === 0,
}));

function Particles({ theme }: { theme: Theme }) {
  return (
    <div aria-hidden className="theme-particles pointer-events-none fixed inset-0 z-[50] overflow-hidden">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`theme-fall absolute -top-8 opacity-70 ${p.mobile ? "" : "hidden md:block"}`}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              "--sway": `${p.sway}px`,
            } as React.CSSProperties
          }
        >
          <ParticleShape kind={theme.particle} color={theme.particleColors[i % theme.particleColors.length]} />
        </span>
      ))}
    </div>
  );
}

export default function SeasonalTheme({ themeId, message }: { themeId: ThemeId | null; message?: string }) {
  // Server choice first (so the banner is in the HTML with no layout jump),
  // then a preview from the URL or a dismissal from this browser on mount.
  const [shown, setShown] = useState<ThemeId | null>(themeId);
  const [customMessage, setCustomMessage] = useState(message);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("theme-preview");
    let id = themeId;
    if (preview === "off") id = null;
    else if (isThemeId(preview)) id = preview;
    let wasDismissed = false;
    try {
      wasDismissed = id !== null && localStorage.getItem(DISMISS_KEY) === id && !preview;
    } catch {
      // storage blocked: just show the banner
    }
    /* eslint-disable react-hooks/set-state-in-effect -- reads browser-only state once on mount */
    setShown(id);
    if (id !== themeId) setCustomMessage(undefined);
    setDismissed(wasDismissed);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [themeId]);

  if (!shown) return null;
  const theme = THEMES[shown];

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, theme.id);
    } catch {
      // ignore
    }
  }

  return (
    <>
      {!dismissed && (
        <div role="region" aria-label={`${theme.name} announcement`} style={{ background: theme.bg, color: theme.fg }}>
          <div className="relative mx-auto flex max-w-[1260px] items-center justify-center gap-3 px-10 pt-2 pb-1 text-sm sm:gap-4 md:px-6">
            <Icon id={theme.id} />
            <p className="min-w-0 leading-tight">
              <strong className="font-heading text-[15px] font-bold">{theme.title}</strong>{" "}
              <span className="hidden font-semibold opacity-90 md:inline">{customMessage ?? theme.message}</span>
            </p>
            <Link
              href={theme.cta.href}
              className="shrink-0 rounded-full px-3.5 py-1.5 font-heading text-xs font-bold whitespace-nowrap shadow-[0_3px_0_rgba(13,31,53,0.25)] transition-transform hover:-translate-y-0.5"
              style={{ background: theme.ctaBg, color: theme.ctaFg }}
            >
              {theme.cta.label} →
            </Link>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close announcement"
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-lg leading-none opacity-75 hover:opacity-100 md:right-4"
            >
              ×
            </button>
          </div>
          <EdgeStrip edge={theme.edge} />
        </div>
      )}
      <Particles theme={theme} />
    </>
  );
}
