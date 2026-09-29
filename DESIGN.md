---
version: alpha
name: XTRONIC KIDZ
description: |
  A playful-but-polished design system for XTRONIC KIDZ, adapted from a
  refined-minimalism reference system with the color palette fully replaced
  by the XTRONIC brand (Section 2 of CLAUDE.md). The reference system was
  dark-canvas-first (black backgrounds, white cards); XTRONIC KIDZ flips this
  to light-canvas-first (soft off-white pages, white cards) with brand navy
  reserved for accent bands, the footer, and headings/body text — mirroring
  how the reference used its near-black "surface-alt" for alternating section
  bands. Structure, type scale, spacing, radii, and component shapes are
  unchanged from the source system; only color roles and a handful of
  light/dark pairings that depended on a dark canvas were corrected.
source:
  adaptedFrom: "Apple-inspired reference design system (see git history)"
  colorSubstitution: "CLAUDE.md Section 2 — XTRONIC KIDZ brand palette"
  adaptedAt: 2026-09-29
  tokensMeasured: false
colors:
  primary: "#038CF2"
  canvas: "#F8FAFC"
  surface: "#FFFFFF"
  surface-alt: "#0D1F35"
  on-primary: "#FFFFFF"
  ink: "#FFFFFF"
  body: "#E8F4FE"
  muted: "#5B6B80"
  faint: "#4A6076"
  hairline: "#E2E8F0"
  accent-1: "#0358B2"
  accent-2: "#FFA707"
  neutral-1: "#E8F4FE"
typography:
  display-xxl:
    fontFamily: "SF Pro Display"
    fontSize: 96px
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: -1.44px
  display-xl:
    fontFamily: "SF Pro Display"
    fontSize: 80px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -1.2px
  display-lg:
    fontFamily: "SF Pro Display"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: -0.28px
  display-md:
    fontFamily: "SF Pro Display"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.14px
  display-md-tight:
    fontFamily: "SF Pro Display"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.14px
  display-sm:
    fontFamily: "SF Pro Display"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0px
  heading-md:
    fontFamily: "SF Pro Display"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.13
    letterSpacing: 0.13px
  heading-sm:
    fontFamily: "SF Pro Display"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: 0.2px
  heading-sm-tight:
    fontFamily: "SF Pro Display"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.2px
  body-xl:
    fontFamily: "SF Pro Display"
    fontSize: 21px
    fontWeight: 600
    lineHeight: 1.38
    letterSpacing: 0.23px
  body-xl-tight:
    fontFamily: "SF Pro Display"
    fontSize: 21px
    fontWeight: 600
    lineHeight: 1.19
    letterSpacing: 0.23px
  body-xl-2:
    fontFamily: "SF Pro Display"
    fontSize: 21px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.23px
  body-lg:
    fontFamily: "SF Pro Text"
    fontSize: 19px
    fontWeight: 500
    lineHeight: 1.21
    letterSpacing: 0.23px
  body-lg-strong:
    fontFamily: "SF Pro Display"
    fontSize: 19px
    fontWeight: 600
    lineHeight: 1.21
    letterSpacing: 0.23px
  body-md:
    fontFamily: "SF Pro Text"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.47
    letterSpacing: -0.37px
  button-md:
    fontFamily: "SF Pro Text"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 2.12
    letterSpacing: 0px
  button-sm:
    fontFamily: "SF Pro Text"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.29
    letterSpacing: -0.22px
  label:
    fontFamily: "SF Pro Text"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.24
    letterSpacing: -0.37px
  caption:
    fontFamily: "SF Pro Text"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: -0.12px
rounded:
  none: 0px
  xs: 8px
  sm: 11px
  md: 28px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 28px
  xxxl: 32px
  section: 36px
  band: 40px
borderWidths:
  thin: 1px
elevationStrategy: color-blocking
themes:
  derived: light   # light is the dominant XTRONIC canvas; dark is the navy accent-band theme
  light:
    bg: "#F8FAFC"
    surface: "#E8F4FE"
    surfaceRaised: "#FFFFFF"
    text: "#0D1F35"
    textMuted: "#5B6B80"
    border: "#E2E8F0"
    accent: "#038CF2"
    accentFg: "#FFFFFF"
    focusRing: "#0358B2"
    elevation: shadow
  dark:
    bg: "#0D1F35"
    surface: "#FFFFFF"
    surfaceRaised: "#FFFFFF"
    text: "#FFFFFF"
    textMuted: "#E8F4FE"
    border: "#1E3350"
    accent: "#038CF2"
    accentFg: "#FFFFFF"
    focusRing: "#FFA707"
    elevation: "border+surface"
  contrastFailures:
    - "dark: default 'text' (#FFFFFF) on 'surface' (#FFFFFF) = 1:1 (needs 4.5:1) — never set white text directly on a white surface card inside a navy band; pair white surface cards with brand-navy (#0D1F35) text instead, as in card-featured."
components:
  button-filled:
    textColor: "rgba(255, 255, 255, 0.92)"
    border: "3px solid rgba(255, 255, 255, 0.08)"
    height: 42px
    padding: "0px 14px 0px 14px"
    fontSize: 17px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 2.41
    rounded: "{rounded.sm}"
    backgroundColor: "{colors.surface-alt}"
  button-primary:
    textColor: "{colors.ink}"
    height: 20px
    padding: "11px 21px 11px 21px"
    fontSize: 17px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 1.18
    rounded: 980px
    backgroundColor: "{colors.primary}"
  button-filled-sm:
    typography: "{typography.button-sm}"
    textColor: "{colors.surface-alt}"
    height: 36px
    padding: "8px 15px 8px 15px"
    rounded: "{rounded.xs}"
    backgroundColor: "{colors.body}"
  button-primary-sm:
    textColor: "{colors.ink}"
    height: 16px
    padding: "6px 10px 6px 10px"
    fontSize: 12px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 1.33
    rounded: 120px
    backgroundColor: "{colors.primary}"
  button-icon:
    textColor: "{colors.body}"
    height: 36px
    fontSize: 17px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 1.47
    rounded: "50%"
    backgroundColor: "rgba(13, 31, 53, 0.72)"
  card:
    textColor: "{colors.body}"
    padding: "72px 0px 120px 0px"
    fontSize: 17px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 1.47
    rounded: "{rounded.md}"
    backgroundColor: "{colors.surface-alt}"
  card-featured:
    textColor: "{colors.surface-alt}"
    fontSize: 17px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 1.47
    rounded: "{rounded.md}"
    backgroundColor: "{colors.surface}"
  card-sm:
    textColor: "{colors.surface-alt}"
    border: "1px solid {colors.hairline}"
    fontSize: 17px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 1.47
    rounded: "{rounded.md}"
  badge-text:
    textColor: "{colors.surface-alt}"
    height: 44px
    fontSize: 17px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 1.47
  badge-text-2:
    typography: "{typography.button-sm}"
    textColor: "{colors.muted}"
    height: 44px
  navigation:
    textColor: "{colors.surface-alt}"
    height: 44px
    fontSize: 17px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 1.47
  footer:
    textColor: "rgba(255, 255, 255, 0.72)"
    fontSize: 12px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 1.33
    backgroundColor: "{colors.surface-alt}"
  link:
    textColor: "{colors.surface-alt}"
    fontSize: 17px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 1.47
  link-lg:
    textColor: "rgb(2, 114, 200)"
    fontSize: 17px
    fontFamily: "SF Pro Text"
    fontWeight: 400
    lineHeight: 1.47
    rounded: "{rounded.md}"
    backgroundColor: "transparent"
states:
  button-focus-visible:
    target: button
    state: focus-visible
    opacity: 1
  link-hover:
    target: link
    state: hover
    textDecoration: none
  link-focus:
    target: link
    state: focus
    outline: none
  nav-hover:
    target: nav
    state: hover
    opacity: 1
  button-hover:
    target: button
    state: hover
    opacity: 1
  button-active:
    target: button
    state: active
    outline: none
  other-hover:
    target: other
    state: hover
    textColor: "{colors.canvas}"
  other-focus-visible:
    target: other
    state: focus-visible
    outline: none
  link-focus-visible:
    target: link
    state: focus-visible
    outline: none
  link-disabled:
    target: link
    state: disabled
    textDecoration: none
  other-focus:
    target: other
    state: focus
    outline: none
  card-focus-visible:
    target: card
    state: focus-visible
    outlineWidth: 6px
  button-disabled:
    target: button
    state: disabled
    opacity: 0.32
  other-disabled:
    target: other
    state: disabled
    textColor: "{colors.muted}"
breakpoints:
  - width: 375
    containerWidth: 328
    gridColumns: 3
    navLinksVisible: 58
    menuToggleVisible: true
    headingPx: 32
    bodyPx: 17
    sectionPaddingX: 0
  - width: 768
    containerWidth: 672
    gridColumns: 3
    navLinksVisible: 51
    menuToggleVisible: true
    headingPx: 40
    bodyPx: 17
    sectionPaddingX: 0
  - width: 1024
    containerWidth: 896
    gridColumns: 3
    navLinksVisible: 126
    menuToggleVisible: true
    headingPx: 40
    bodyPx: 17
    sectionPaddingX: 0
  - width: 1280
    containerWidth: 1120
    gridColumns: 3
    navLinksVisible: 126
    menuToggleVisible: true
    headingPx: 48
    bodyPx: 17
    sectionPaddingX: 0
  - width: 1440
    containerWidth: 1260
    gridColumns: 3
    navLinksVisible: 127
    menuToggleVisible: true
    headingPx: 48
    bodyPx: 17
    sectionPaddingX: 0
coverage:
  statesFound: 61
  gradientsFound: 0
  rolesUnassigned: 3
  archetypesUnnamed: 0
  archetypesDetected: 0
  responsiveMeasured: true
  stylesheetsBlocked: false
  semanticRampDeclared: false
---

# XTRONIC KIDZ Design System

> Colors in this document are governed by **CLAUDE.md Section 2** and take
> precedence over anything below (per CLAUDE.md Section 0). Everything else
> here — type scale, spacing, radii, component shapes, elevation approach,
> breakpoints — is the design mechanics to follow.

## 1. Visual Theme & Atmosphere

XTRONIC KIDZ pairs a bright, high-contrast product presentation with a
playful, trustworthy tone. The site runs light-canvas-first — soft off-white
pages (`#F8FAFC`) with white cards — punctuated by deep brand-navy accent
bands (`#0D1F35`) used the way the source system used near-black bands: to
segment long pages, anchor the footer, and give the eye a resting point
between bright product sections. Brand blue (`#038CF2`) is the sole
chromatic anchor for calls-to-action and interactive moments; amber
(`#FFA707`) and green (`#57B12D`, used at implementation time per CLAUDE.md,
not tokenized here) layer in as tag/badge accents on top of this neutral
structure. Large, bold headings and decisive whitespace keep the focus on
product imagery, while secondary content recedes into muted navy-grays.

**Key Characteristics:**
- Light off-white canvas with white card surfaces for a clean, airy read
- Brand blue (`#038CF2`) used sparingly for primary calls-to-action, links, and focus states
- Generous whitespace and controlled pacing drive attention to product imagery
- Heavy reliance on typography weight and scale for hierarchy, color layered on top for brand warmth
- Sharp edges on small cards and dividers; pill-shaped buttons and inputs create visual interest
- Subtle opacity shifts and hover states rather than dramatic color transitions
- Navy accent bands (`{colors.surface-alt}` — `#0D1F35`) provide visual rhythm and house the footer

## 2. Color Palette & Roles

Full brand definitions live in CLAUDE.md Section 2 — this maps that palette
onto the system's structural roles.

### Primary
- **Brand Blue** (`{colors.primary}` — `#038CF2`): Primary calls-to-action, link focus states, active indicators, and brand accent moments. The dominant chromatic anchor.

### Accent Colors
- **Accent 1 / Brand Blue Deep** (`{colors.accent-1}` — `#0358B2`): Decorative and secondary-emphasis use — icon strokes, subtle highlights.
- **Accent 2 / Brand Amber** (`{colors.accent-2}` — `#FFA707`): Decorative use — CTA badges, sale/promo accents, layered on top of this neutral structure per CLAUDE.md.

### Interactive
- **Primary Button Fill** (`{colors.primary}` — `#038CF2`): Primary filled buttons and interactive states.

### Neutral Scale
- **Canvas** (`{colors.canvas}` — `#F8FAFC`): Default page background — the dominant surface.
- **Surface** (`{colors.surface}` — `#FFFFFF`): Card and panel backgrounds; primary heading/body text color when placed on a navy band.
- **Surface Alt / Brand Navy** (`{colors.surface-alt}` — `#0D1F35`): Navy accent-band backgrounds (footer, alternating sections) *and* the default dark text color used on light backgrounds (headings, nav, links, body copy).
- **Body** (`{colors.body}` — `#E8F4FE`, brand-blue-50): Text color on navy bands; light secondary-surface tint.
- **Muted** (`{colors.muted}` — `#5B6B80`): Captions, secondary text, and supporting labels on light backgrounds.
- **Faint** (`{colors.faint}` — `#4A6076`, derived navy tint): Tertiary text and disabled copy — one step dimmer than muted; not in the base CLAUDE.md palette, derived per CLAUDE.md Section 0's tint/shade rule.

### Surface & Borders
- **Hairline** (`{colors.hairline}` — `#E2E8F0`, CLAUDE.md `line`): 1px dividers and subtle borders on light surfaces.
- **Neutral 1** (`{colors.neutral-1}` — `#E8F4FE`): Light tinted secondary surface/container background.

## 3. Typography Rules

### Font Family

The type **scale** below (sizes, weights, line-heights, tracking) is kept
as-is from the source system. The actual font **family** used in
implementation follows CLAUDE.md Section 2, not the names below:
headings in a rounded geometric sans (**Baloo 2** or **Fredoka**), body in
**Inter** or **Nunito**. Treat every "SF Pro Display" reference below as
"the brand display font" and every "SF Pro Text" reference as "the brand
text font."

- **Display role**: brand display font (Baloo 2 / Fredoka)
  - Fallback: ui-rounded, "Baloo 2", system-ui, sans-serif
- **Text role**: brand text font (Inter / Nunito)
  - Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Display XXL | 96px | 600 | 1.04 | −1.44px | Ultra-large hero statements |
| Display XL | 80px | 600 | 1.05 | −1.2px | Major section headlines |
| Display Large | 56px | 600 | 1.07 | −0.28px | Large section headers |
| Display Medium | 48px | 600 | 1.08 | −0.14px | Mid-size display text |
| Display Medium Tight | 48px | 600 | 1.0 | −0.14px | Compact display variant |
| Display Small | 40px | 600 | 1.0 | 0px | Smaller display headlines |
| Heading Medium | 32px | 600 | 1.13 | 0.13px | Primary page headings |
| Heading Small | 28px | 600 | 1.14 | 0.2px | Secondary headings |
| Heading Small Tight | 28px | 600 | 1.0 | 0.2px | Compact heading variant |
| Body XL | 21px | 600 | 1.38 | 0.23px | Large body emphasis |
| Body XL Tight | 21px | 600 | 1.19 | 0.23px | Compact body XL |
| Body XL 2 | 21px | 600 | 1.0 | 0.23px | Ultra-compact body variant |
| Body Large Strong | 19px | 600 | 1.21 | 0.23px | Strong body copy |
| Body Large | 19px | 500 | 1.21 | 0.23px | Secondary body text |
| Body Medium | 17px | 600 | 1.47 | −0.37px | Primary body copy |
| Label | 17px | 600 | 1.24 | −0.37px | Form labels and metadata |
| Button Medium | 17px | 400 | 2.12 | 0px | Standard button text |
| Button Small | 14px | 400 | 1.29 | −0.22px | Small button text |
| Caption | 12px | 600 | 1.33 | −0.12px | Fine print and captions |

### Principles
- **Negative tracking on display sizes** creates visual tightness; keep it even though the font family changed, it still reads as premium/considered.
- **Weight contrast drives hierarchy**: heavy 600-weight heads anchor sections; 400-weight body and buttons recede.
- **Line-height varies by role**: display text sits tight (1.0–1.08), body copy opens to 1.47 for readability.
- **Never invent intermediate sizes**; use weight and line-height to refine emphasis instead.

## 4. Component Stylings

### Buttons

**Primary Button**
- Background: `{colors.primary}` (`#038CF2`)
- Text Color: `{colors.ink}` (`#FFFFFF`) — safe per CLAUDE.md contrast rule (≥16px bold)
- Padding: `11px 21px`
- Font: `{typography.button-md}` (17px, 400 weight)
- Border Radius: `{rounded.full}` (9999px — pill shape)
- Focus Visible: `2px solid {colors.accent-1}` (`#0358B2`) outline

**Filled Button (Navy)**
- Background: `{colors.surface-alt}` (`#0D1F35`)
- Text Color: `rgba(255, 255, 255, 0.92)`
- Padding: `0px 14px`
- Border Radius: `{rounded.sm}` (11px)
- Border: `3px solid rgba(255, 255, 255, 0.08)`
- Height: 42px
- Focus Visible: `2px solid {colors.accent-1}` outline

**Filled Small Button**
- Background: `{colors.body}` (`#E8F4FE`)
- Text Color: `{colors.surface-alt}` (`#0D1F35`) — *corrected from the source's dark-canvas-only `canvas` reference, which is no longer a dark color here*
- Padding: `8px 15px`
- Border Radius: `{rounded.xs}` (8px)
- Height: 36px

**Primary Small Button**
- Background: `{colors.primary}` (`#038CF2`)
- Text Color: `{colors.ink}` (`#FFFFFF`)
- Padding: `6px 10px`
- Border Radius: `{rounded.full}` (120px — pill shape)
- Height: 16px

**Icon Button**
- Background: `rgba(13, 31, 53, 0.72)` (translucent navy)
- Text Color: `{colors.body}` (`#E8F4FE`)
- Height/Width: 36px
- Border Radius: 50% (circular)
- Focus Visible: `2px solid {colors.accent-1}` outline

### Cards & Containers

**Card Default (Navy)**
- Background: `{colors.surface-alt}` (`#0D1F35`)
- Text Color: `{colors.body}` (`#E8F4FE`)
- Border Radius: `{rounded.md}` (28px)
- Padding: `72px 0px 120px 0px`
- Hover State: slight scale lift
- Focus Visible: outline color `#FFFFFF`; outline-width 6px

**Card Featured (White)**
- Background: `{colors.surface}` (`#FFFFFF`)
- Text Color: `{colors.surface-alt}` (`#0D1F35`)
- Border Radius: `{rounded.md}` (28px)
- Hover State: slight scale lift
- Focus Visible: outline color `#0D1F35`; outline-width 6px

**Card Small**
- Background: transparent (sits on the light canvas)
- Text Color: `{colors.surface-alt}` (`#0D1F35`) — *corrected from the source's `body` reference for the same dark-canvas reason as Filled Small Button*
- Border: `1px solid {colors.hairline}` (`#E2E8F0`)
- Border Radius: `{rounded.md}` (28px)

### Navigation

**Global Navigation**
- Background: transparent
- Text Color: `{colors.surface-alt}` (`#0D1F35`)
- Height: 44px
- Hover State: underline; opacity 1
- Focus Visible: `2px solid {colors.accent-1}` outline

### Badges

**Badge Text**
- Text Color: `{colors.surface-alt}` (`#0D1F35`) — *corrected from `body` for the same reason as above*
- Height: 44px

**Badge Text 2**
- Text Color: `{colors.muted}` (`#5B6B80`)
- Height: 44px

### Links

**Link Default**
- Text Color: `{colors.surface-alt}` (`#0D1F35`)
- Hover State: underline
- Focus Visible: `2px solid {colors.accent-1}` outline

**Link Default Large**
- Text Color: `#0272C8` (brand-blue-600 — CLAUDE.md's AA-safe blue for text under 16px/non-bold)
- Border Radius: `{rounded.md}` (28px)
- Hover State: underline

### Footer

- Background: `{colors.surface-alt}` (`#0D1F35`) — *flipped from the source's light footer, per CLAUDE.md Section 4.7 ("Footer (navy)")*
- Text Color: `rgba(255, 255, 255, 0.72)` — *flipped to light text to match the navy background*
- Font: caption scale (12px)

## 5. Layout Principles

### Spacing System

**Base Unit:** `{spacing.xs}` (8px)

**Scale:**
- `{spacing.xxs}` = 4px — Tight micro-spacing between inline elements
- `{spacing.xs}` = 8px — Small gaps between components
- `{spacing.sm}` = 12px — Compact section spacing
- `{spacing.md}` = 16px — Standard padding for components
- `{spacing.lg}` = 20px — Medium section separation
- `{spacing.xl}` = 24px — Large component padding
- `{spacing.xxl}` = 28px — Generous internal spacing
- `{spacing.xxxl}` = 32px — Large margins between blocks
- `{spacing.section}` = 36px — Section-level spacing
- `{spacing.band}` = 40px — Page band / hero padding

### Grid & Container

- **Content Max Width:** 1260px at 1440px breakpoint; 1120px at 1280px; 896px at 1024px.
- **Column Count:** 3 columns across all breakpoints.
- **Section Padding:** 0px horizontal; full-width sections with internal column layout.

### Whitespace Philosophy

Large hero sections dominate above the fold, with generous breathing room
around product imagery and headlines. Navy accent bands (`{colors.surface-alt}`)
segment content into distinct zones — used the way the source system used
its near-black bands, just inverted in dominance (light is now the base,
navy is the accent, not the other way around). Vertical spacing between
sections stays generous — `{spacing.band}` (40px) or larger.

### Border Radius Scale

- `{rounded.none}` = 0px — Sharp edges on dividers, some borders
- `{rounded.xs}` = 8px — Small buttons, compact components
- `{rounded.sm}` = 11px — Medium buttons (navy filled variant)
- `{rounded.md}` = 28px — Primary card containers, featured surfaces
- `{rounded.full}` = 9999px — Pill-shaped buttons, text inputs, circular icon buttons

### Border Widths

- **Thin:** `1px` — Inputs, hairline dividers, card-small borders

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Base) | No shadow; background color only | Body sections, badges, flat text layers |
| Lifted (Card Hover) | Transform scale; subtle motion | Interactive card hover state |
| Focus State | 2px solid outline (`{colors.accent-1}` on light, `{colors.accent-2}` on navy) | Keyboard focus on buttons, links, controls |
| Modal / Overlay | Z-index: 9995–9998; full-screen backdrop or sidebar | Modal dialogs, quick-view, quote modal |
| Sticky / Fixed | Z-index: 999 | Navigation bar, mobile bottom bar |

**Shadow Philosophy:** Primarily **color-blocking**, matching CLAUDE.md's
`shadow-lg shadow-brand-blue/10` motif — soft, brand-tinted shadows rather
than heavy neutral drop shadows. Depth comes from surface color changes
(white → navy) and soft brand-tinted shadow, not hard drop shadows.
Interactive elevation is communicated through transform scale on hover
(`hover:-translate-y-1` per CLAUDE.md) and focus outline strokes.

**Focus ring color differs by context**: `{colors.accent-1}` (brand-blue-deep)
on light backgrounds per CLAUDE.md's explicit assignment; `{colors.accent-2}`
(brand-amber) on navy bands, where blue-on-blue would be too low-contrast to
serve as a visible focus indicator.

### Opacity Levels

- **92%** (0.92) — Near-opaque text on filled navy buttons
- **72%** (0.72) — Footer text on navy, translucent icon-button backgrounds
- **36%** (0.36) — Disabled states

### Z-index / Layering

- **Base / Content:** 1–4
- **Sticky / Fixed Navigation:** 999 — header, mobile bottom bar
- **Modal / Overlay:** 9995–9998 — cart drawer, quick-view, school quote modal

## 7. Do's and Don'ts

### Do
- **Use brand blue** (`{colors.primary}` — `#038CF2`) sparingly and intentionally for primary calls-to-action, focus states, and interactive moments.
- **Leverage typography weight and scale** to drive hierarchy.
- **Employ generous whitespace** around product imagery and hero headlines.
- **Apply navy accent bands** (`{colors.surface-alt}` — `#0D1F35`) to segment long pages, house the footer, and provide visual rhythm.
- **Use pill-shaped buttons and inputs** (`{rounded.full}`) for primary interactive elements.
- **Stack cards with 28px radius** (`{rounded.md}`) on featured products and feature blocks.
- **Implement focus outlines** for keyboard accessibility — brand-blue-deep on light, brand-amber on navy.
- **Keep borders minimal and subtle** — hairline gray (`{colors.hairline}` — `#E2E8F0`) only when necessary.
- **Never put white text on amber or green** (CLAUDE.md rule) — use brand-navy text on amber, brand-green-700 for green text on white.

### Don't
- **Avoid overusing color** beyond brand blue as the primary anchor; amber/green are decorative badge accents, not backgrounds for large text blocks.
- **Don't mix multiple border-radius values** on the same component family.
- **Avoid heavy neutral drop shadows** as the primary depth cue — use brand-tinted soft shadows and color-blocking instead.
- **Don't crowd sections** with excessive padding or nested components.
- **Avoid justified text** on body copy.
- **Don't apply heavy opacity** (`< 0.36`) to primary interactive elements.
- **Avoid sharp corners** on primary buttons and cards — pill shapes and 28px radius are the signature.
- **Don't reuse `body` (`#E8F4FE`) as text color on the light canvas** — it's light-on-light. Use `surface-alt` (`#0D1F35`) for text on light backgrounds, and `body` only for text on navy bands.

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Viewport Width | Content Column | Grid Columns | Heading (Largest) | Body Text | Section Padding-X |
|---|---|---|---|---|---|---|
| Mobile | 375px | 328px | 3 | 32px | 17px | 0px |
| Tablet | 768px | 672px | 3 | 40px | 17px | 0px |
| Desktop Small | 1024px | 896px | 3 | 40px | 17px | 0px |
| Desktop Medium | 1280px | 1120px | 3 | 48px | 17px | 0px |
| Desktop Large | 1440px | 1260px | 3 | 48px | 17px | 0px |

### Touch Targets

- **Minimum Touch Size:** 44px × 44px — matches CLAUDE.md's ≥44px rule for mobile.
- Buttons: 36px–42px height (small to standard)
- Icon buttons: 36px × 36px (circular)
- Navigation items: 44px vertical height

### Collapsing Strategy

- **Mobile (375px):** Single-column layout; hamburger → slide-in drawer; sticky bottom bar with Shop/Search/Cart/Order Kit.
- **Tablet (768px):** Column expands to 672px; headings grow to 40px.
- **Desktop (1024px+):** Full 3-column grid; content column grows to 896px–1260px; all navigation links visible.

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA / Brand Accent:** Brand Blue (`{colors.primary}` — `#038CF2`)
- **Page Background / Canvas:** `#F8FAFC` — the dominant surface across the site
- **Card & Panel Background:** White (`{colors.surface}` — `#FFFFFF`) for featured cards; Navy (`{colors.surface-alt}` — `#0D1F35`) for accent-band cards and the footer
- **Heading & Primary Text:** Navy (`#0D1F35`) on light backgrounds; White (`#FFFFFF`) on navy backgrounds
- **Body Text:** Navy (`#0D1F35`) on light backgrounds; Body tint (`#E8F4FE`) on navy backgrounds
- **Secondary / Caption Text:** Muted (`{colors.muted}` — `#5B6B80`) or Faint (`{colors.faint}` — `#4A6076`)
- **Borders & Dividers:** Hairline (`{colors.hairline}` — `#E2E8F0`) — 1px only

### Iteration Guide

1. **Contrast first, per background.** On the light canvas (`#F8FAFC`)/white surface, text is navy (`#0D1F35`). On a navy band, text is white or the body tint (`#E8F4FE`). Never cross the two.
2. **Typography drives hierarchy.** Use the 14-size hierarchy in Section 3. Never invent intermediate sizes.
3. **Spacing is additive.** Start with `{spacing.md}` (16px) as default padding; scale up to `{spacing.band}` (40px) for section dividers.
4. **Button radius matches role.** Pill-shaped primary buttons (`{rounded.full}`); navy filled buttons (`{rounded.sm}` = 11px); small buttons (`{rounded.xs}` = 8px).
5. **Cards use 28px radius.** Exceptions: badge text (0px), small card borders (28px with 1px hairline stroke).
6. **Color-blocking + soft brand shadow over heavy shadows.** Lift depth through background color shifts (white ↔ navy) and `shadow-brand-blue/10`, not gray drop shadows.
7. **Focus outlines are mandatory.** `2px solid` brand-blue-deep on light backgrounds, brand-amber on navy — every interactive element, on `:focus-visible`.
8. **Mobile-first breakpoints.** Test all five: 375px, 768px, 1024px, 1280px, 1440px.
9. **Opacity for subtlety.** 0.72 for footer text and translucent overlays; 0.36 for disabled states.
10. **Amber and green are accents, never large-text backgrounds with white text** — per CLAUDE.md's contrast rule, use navy text on amber, brand-green-700 for green text on white.

## 10. Known Gaps

- **No semantic status colors tokenized here.** Use CLAUDE.md's `brand-green`/`brand-green-700`/`brand-green-50` for success/in-stock states — not part of this file's base token set.
- **Transition timings not specified.** Durations and easing curves aren't covered; keep motion subtle and respect `prefers-reduced-motion` per CLAUDE.md.
- **No gradient tokens** beyond CLAUDE.md's signature hero gradient (`linear-gradient(135deg, #038CF2 0%, #038CF2 50%, #FFA707 50%, #FFA707 100%)`), which is reserved for the hero/X motif only, not general use.
- **Dark mode (OS-level) is out of scope.** The "dark" theme in this file is the navy *accent-band* theme, not a full-site dark mode toggle.
- **Border styles limited to solid 1px.** Dashed/dotted borders aren't part of this system.
