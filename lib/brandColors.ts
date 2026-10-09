// Exact colours sampled from public/brand/xtronic-logo-transparent.png, for
// the brighter "logo palette" sections (feature strip, How It Works page).
// Orange is the site's brand amber.
export const LOGO = {
  red: "#F52C2B",
  blue: "#0177DE",
  lightBlue: "#019CF8",
  yellow: "#FDAB05",
  green: "#47A723",
  orange: "#FF7A1F",
} as const;

const tint = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, white)`;

/**
 * Full-width pastel section backgrounds, mixed from the logo colours only.
 * Use with the `band` class: <section className="band …" style={band("sky")}>.
 */
export const BANDS = {
  sky: `linear-gradient(160deg, ${tint(LOGO.lightBlue, 20)} 0%, ${tint(LOGO.lightBlue, 8)} 45%, ${tint(LOGO.yellow, 18)} 100%)`,
  sunset: `linear-gradient(140deg, ${tint(LOGO.yellow, 20)} 0%, ${tint(LOGO.red, 10)} 35%, ${tint(LOGO.blue, 10)} 70%, ${tint(LOGO.green, 12)} 100%)`,
  mint: `linear-gradient(160deg, ${tint(LOGO.green, 14)} 0%, ${tint(LOGO.lightBlue, 10)} 55%, ${tint(LOGO.yellow, 14)} 100%)`,
  peach: `linear-gradient(160deg, ${tint(LOGO.orange, 15)} 0%, ${tint(LOGO.yellow, 12)} 50%, ${tint(LOGO.lightBlue, 12)} 100%)`,
} as const;

export function band(name: keyof typeof BANDS): React.CSSProperties {
  return { "--band": BANDS[name] } as React.CSSProperties;
}
