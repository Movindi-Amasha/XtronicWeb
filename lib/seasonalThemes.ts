import { LOGO } from "./brandColors";

// Seasonal site themes: a themed top banner (rotating messages, countdown,
// decorated edge), falling particles, animated characters (SeasonScene), a
// hat on the header logo, stickers on product cards and a page tint. Each one switches on by itself during
// its dates (Sri Lanka time), and the admin can force one on or off at
// /admin/theme. Client-safe: no server imports here.

export type ThemeId = "halloween" | "singles-day" | "christmas" | "easter";

export type Particle = "leaf" | "snow" | "confetti" | "petal";
export type Edge = "bunting" | "lights" | "confetti" | "eggs";

export interface SeasonalTheme {
  id: ThemeId;
  name: string;
  /** Short line shown when no custom message is set in admin. */
  message: string;
  /** More lines the banner rotates through after `message`. */
  lines: string[];
  /** Small sticker on product cards. */
  sticker: string;
  /** Banner countdown: to a Sri Lanka date/time, with its label. */
  countdown?: { month: number; day: number; hour: number; minute: number; label: string; done: string };
  title: string;
  cta: { label: string; href: string };
  /** Banner background, text colour and the CTA pill colours. */
  bg: string;
  fg: string;
  ctaBg: string;
  ctaFg: string;
  particle: Particle;
  particleColors: string[];
  edge: Edge;
  /** Human-readable dates, shown in admin. */
  when: string;
}

export const THEMES: Record<ThemeId, SeasonalTheme> = {
  halloween: {
    id: "halloween",
    name: "Halloween",
    title: "Spooky STEM season!",
    message: "Build something that glows, spins and surprises this Halloween.",
    lines: ["Trick or treat? Treat them to a kit they build themselves.", "Solar spooks, robot monsters and flapping bats: all hands-on."],
    sticker: "Spooky pick",
    countdown: { month: 10, day: 31, hour: 0, minute: 0, label: "Halloween in", done: "Happy Halloween!" },
    cta: { label: "Shop kits", href: "/shop" },
    bg: `linear-gradient(90deg, #0D1F35 0%, #1d2547 55%, #0D1F35 100%)`,
    fg: "#fff",
    ctaBg: LOGO.orange,
    ctaFg: "#fff",
    particle: "leaf",
    particleColors: [LOGO.orange, LOGO.yellow, LOGO.red],
    edge: "bunting",
    when: "24–31 October",
  },
  "singles-day": {
    id: "singles-day",
    name: "11.11",
    title: "11.11 is here!",
    message: "Our biggest STEM kit deals of the year, for three days only.",
    lines: ["Stock up on birthdays and Christmas gifts early.", "Free island-wide delivery on orders over Rs 7,000."],
    sticker: "11.11 Deal",
    countdown: { month: 11, day: 11, hour: 23, minute: 59, label: "Ends in", done: "Last chance!" },
    cta: { label: "See the deals", href: "/shop" },
    bg: `linear-gradient(90deg, ${LOGO.blue} 0%, ${LOGO.lightBlue} 100%)`,
    fg: "#fff",
    ctaBg: LOGO.yellow,
    ctaFg: "#0D1F35",
    particle: "confetti",
    particleColors: [LOGO.red, LOGO.yellow, LOGO.green, LOGO.orange, LOGO.lightBlue],
    edge: "confetti",
    when: "9–11 November",
  },
  christmas: {
    id: "christmas",
    name: "Christmas",
    title: "Merry Christmas!",
    message: "Give a gift they build themselves. Order early for island-wide delivery.",
    lines: ["Wrapped with a card on request, delivered across Sri Lanka.", "Screen-free fun for the whole holiday."],
    sticker: "Gift idea",
    countdown: { month: 12, day: 25, hour: 0, minute: 0, label: "Christmas in", done: "Merry Christmas!" },
    cta: { label: "Shop gifts", href: "/shop?category=Bundles+%26+Gifts" },
    bg: `linear-gradient(90deg, #c81f1e 0%, ${LOGO.red} 50%, #c81f1e 100%)`,
    fg: "#fff",
    ctaBg: "#fff",
    ctaFg: LOGO.red,
    particle: "snow",
    particleColors: [`color-mix(in srgb, ${LOGO.lightBlue} 55%, white)`, `color-mix(in srgb, ${LOGO.blue} 35%, white)`],
    edge: "lights",
    when: "1–26 December",
  },
  easter: {
    id: "easter",
    name: "Easter",
    title: "Happy Easter!",
    message: "Fill their basket with something to build, not just something sweet.",
    lines: ["Egg hunt! Find the 5 hidden eggs around the site.", "Solar butterflies and flying planes for spring adventures."],
    sticker: "Easter treat",
    cta: { label: "Shop kits", href: "/shop" },
    bg: `linear-gradient(90deg, color-mix(in srgb, ${LOGO.yellow} 30%, white) 0%, color-mix(in srgb, ${LOGO.green} 22%, white) 100%)`,
    fg: "#0D1F35",
    ctaBg: LOGO.green,
    ctaFg: "#fff",
    particle: "petal",
    particleColors: [`color-mix(in srgb, ${LOGO.yellow} 70%, white)`, `color-mix(in srgb, ${LOGO.green} 55%, white)`, `color-mix(in srgb, ${LOGO.lightBlue} 50%, white)`],
    edge: "eggs",
    when: "the week before Easter Sunday to Easter Monday",
  },
};

export const THEME_IDS = Object.keys(THEMES) as ThemeId[];

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && value in THEMES;
}

/** Today's date in Sri Lanka as [year, month (1–12), day]. */
function colomboDate(now: Date): [number, number, number] {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const [y, m, d] = parts.split("-").map(Number);
  return [y, m, d];
}

/** Easter Sunday (Gregorian, "Anonymous" algorithm) as [month, day]. */
function easterSunday(year: number): [number, number] {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return [month, day];
}

const dayNumber = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d) / 86_400_000;

/** The theme whose dates include `now` (Sri Lanka time), if any. */
export function themeForDate(now: Date): ThemeId | null {
  const [y, m, d] = colomboDate(now);
  if (m === 10 && d >= 24) return "halloween";
  if (m === 11 && d >= 9 && d <= 11) return "singles-day";
  if (m === 12 && d <= 26) return "christmas";
  const [em, ed] = easterSunday(y);
  const offset = dayNumber(y, m, d) - dayNumber(y, em, ed);
  if (offset >= -7 && offset <= 1) return "easter";
  return null;
}

/** What the admin chose: follow the dates, show nothing, or force one theme. */
export type ThemeMode = "auto" | "off" | ThemeId;

export interface ThemeSetting {
  mode: ThemeMode;
  /** Replaces the theme's default banner message when set. */
  message?: string;
}

export function resolveTheme(setting: ThemeSetting | null, now: Date): ThemeId | null {
  const mode = setting?.mode ?? "auto";
  if (mode === "off") return null;
  if (mode === "auto") return themeForDate(now);
  return mode;
}

/** A Sri Lanka (UTC+5:30) wall-clock time as a Date. */
export function colomboTime(year: number, month: number, day: number, hour = 0, minute = 0): Date {
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - 5.5 * 3_600_000);
}
