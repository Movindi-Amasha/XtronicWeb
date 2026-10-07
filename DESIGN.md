---
version: alpha
name: XTRONIC KIDS
description: |
  A stark, color-blocked design system for XTRONIC KIDS, restructured from a
  minimalist tech-brand reference system (dark charcoal/off-white blocking,
  gold accent, monospace/uppercase UI text, flat shadow-free elevation) with
  the palette fully replaced by the XTRONIC brand (CLAUDE.md Section 2) and
  the reference's plain dot-matrix decoration reinterpreted as a laser-cut
  plywood joinery pattern — small interlocking board-edge tabs, echoing the
  actual DIY kits (visible laser-cut panel edges, bright painted graphics,
  exposed mechanical joints). Structure carried over as-is: spacing scale,
  elevation strategy (color-blocking, no shadows), component box model
  (heights/padding), uppercase treatment for UI chrome, breakpoints. Radius
  scale is sharpened toward the reference's flat aesthetic but keeps one
  pill tier for primary CTAs — a deliberate hybrid, not a full copy, so the
  brand doesn't lose its friendly signature entirely. Typography sizes/
  weights/line-heights are kept from the source; font *family* stays
  CLAUDE.md's Baloo 2 (display) / Nunito (text) — the source system's custom
  faces (NType82, Ndot, LatteraMonoLL) aren't licensed for this project.
source:
  adaptedFrom: "Minimalist tech-brand reference system (see git history)"
  colorSubstitution: "CLAUDE.md Section 2 — XTRONIC KIDS brand palette"
  adaptedAt: 2026-09-30
  tokensMeasured: false
colors:
  primary: "#FFA707"
  canvas: "#F8FAFC"
  surface-alt: "#0D1F35"
  on-primary: "#0D1F35"
  ink: "#0D1F35"
  body: "#5B6B80"
  muted: "#E2E8F0"
  faint: "#FFFFFF"
  neutral-1: "#E8F4FE"
typography:
  display-lg:
    fontFamily: "brand display font"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0px
  display-md:
    fontFamily: "brand display font"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0px
    textTransform: uppercase
  heading-md:
    fontFamily: "brand display font"
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: 0px
    textTransform: uppercase
  heading-md-strong:
    fontFamily: "brand display font"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0px
  heading-sm:
    fontFamily: "brand display font"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: 0px
    textTransform: uppercase
  body-xl:
    fontFamily: "brand text font"
    fontSize: 20px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0px
    textTransform: uppercase
  body-lg:
    fontFamily: "brand text font"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0px
  body-md:
    fontFamily: "brand text font"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0px
  label-md:
    fontFamily: "brand text font"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.43
    letterSpacing: 0.4px
    textTransform: uppercase
  label-sm:
    fontFamily: "brand text font"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: 0.4px
    textTransform: uppercase
  label-xs:
    fontFamily: "brand text font"
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0.4px
    textTransform: uppercase
rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 16px
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
  section: 40px
  band: 52px
elevationStrategy: color-blocking
themes:
  derived: light   # light canvas is dominant; dark is the navy accent-band theme
  light:
    bg: "#F8FAFC"
    surface: "#FFFFFF"
    surfaceRaised: "#FFFFFF"
    text: "#0D1F35"
    textMuted: "#5B6B80"
    border: "#E2E8F0"
    accent: "#0358B2"
    accentFg: "#FFFFFF"
    focusRing: "#0358B2"
    elevation: shadow
  dark:
    bg: "#0D1F35"
    surface: "#1E3350"
    surfaceRaised: "#1E3350"
    text: "#FFFFFF"
    textMuted: "#E8F4FE"
    border: "#1E3350"
    accent: "#FFA707"
    accentFg: "#0D1F35"
    focusRing: "#FFA707"
    elevation: "border+surface"
  contrastFailures:
    - "light: default 'text' color reused as a button label on brand-amber must resolve to navy (#0D1F35), never white — amber fails white-text contrast per CLAUDE.md's own rule."
gradients:
  - context: hero / section dividers
    kind: pattern
    value: "board-joint-grid — see Section 6 Depth & Elevation for the concrete pattern definition"
components:
  button-secondary:
    typography: "{typography.label-sm}"
    textColor: "{colors.faint}"
    height: 60px
    padding: "20px 40px 20px 40px"
    rounded: "{rounded.sm}"
    backgroundColor: "{colors.surface-alt}"
  button-primary:
    typography: "{typography.body-md}"
    textColor: "{colors.ink}"
    height: 40px
    padding: "12px 16px 12px 16px"
    rounded: "{rounded.full}"
    backgroundColor: "{colors.primary}"
  button-filled:
    typography: "{typography.label-xs}"
    textColor: "{colors.faint}"
    height: 48px
    padding: "16px 16px 16px 16px"
    rounded: "{rounded.sm}"
    backgroundColor: "rgba(255, 255, 255, 0.08)"
  button-filled-sm:
    typography: "{typography.body-md}"
    textColor: "{colors.ink}"
    height: 40px
    padding: "12px 16px 12px 16px"
    rounded: "{rounded.xs}"
    backgroundColor: "{colors.faint}"
  button-secondary-sm:
    typography: "{typography.body-md}"
    textColor: "{colors.faint}"
    height: 40px
    padding: "12px 16px 12px 16px"
    rounded: "{rounded.xs}"
    backgroundColor: "{colors.surface-alt}"
  button-text:
    typography: "{typography.label-md}"
    textColor: "{colors.body}"
    height: 21px
  navigation:
    typography: "{typography.label-xs}"
    textColor: "{colors.surface-alt}"
    height: 44px
  footer:
    typography: "{typography.body-md}"
    textColor: "{colors.faint}"
    padding: "112px 32px 32px 32px"
    backgroundColor: "{colors.surface-alt}"
  link:
    typography: "{typography.body-md}"
    textColor: "{colors.surface-alt}"
  link-sm:
    typography: "{typography.label-xs}"
    textColor: "{colors.surface-alt}"
    padding: "8px 16px 8px 16px"
states:
  button-disabled:
    target: button
    state: disabled
    opacity: 0.4
  button-hover:
    target: button
    state: hover
    opacity: 0.85
    transform: "translateY(-2px)"
  other-hover:
    target: other
    state: hover
    textColor: "{colors.body}"
  input-focus:
    target: input
    state: focus
    outline: "{colors.accent-1} solid 2px"
    outlineColor: "#0358B2"
    outlineWidth: 2px
  other-focus:
    target: other
    state: focus
    outline: "#0358B2 solid 2px"
    outlineColor: "#0358B2"
    outlineWidth: 2px
  link-hover:
    target: link
    state: hover
    textColor: "{colors.body}"
    backgroundColor: "{colors.neutral-1}"
breakpoints:
  - width: 375
    containerWidth: 343
    gridColumns: 4
    navLinksVisible: 0
    menuToggleVisible: true
    headingPx: 32
    bodyPx: 16
    sectionPaddingX: 16
  - width: 768
    containerWidth: 704
    gridColumns: 4
    navLinksVisible: 0
    menuToggleVisible: true
    headingPx: 40
    bodyPx: 16
    sectionPaddingX: 24
  - width: 1024
    containerWidth: 960
    gridColumns: 4
    navLinksVisible: 6
    menuToggleVisible: false
    headingPx: 40
    bodyPx: 16
    sectionPaddingX: 24
  - width: 1280
    containerWidth: 1216
    gridColumns: 4
    navLinksVisible: 6
    menuToggleVisible: false
    headingPx: 48
    bodyPx: 16
    sectionPaddingX: 24
  - width: 1440
    containerWidth: 1260
    gridColumns: 4
    navLinksVisible: 6
    menuToggleVisible: false
    headingPx: 48
    bodyPx: 16
    sectionPaddingX: 24
coverage:
  statesFound: 11
  gradientsFound: 1
  rolesUnassigned: 1
  archetypesUnnamed: 0
  archetypesDetected: 0
  responsiveMeasured: true
  stylesheetsBlocked: true
  semanticRampDeclared: false
---

# XTRONIC KIDS Design System

> Colors in this document are governed by **CLAUDE.md Section 2** and take
> precedence over anything below (per CLAUDE.md Section 0). Everything else
> — type scale, spacing, radius, elevation approach, component box model,
> breakpoints — is the design mechanics to follow.

## 1. Visual Theme & Atmosphere

This is a deliberate pivot away from XTRONIC's earlier soft, heavily-rounded,
drop-shadowed look toward something starker and more product-honest: stark
color-blocking between a light canvas and deep navy bands, a single
high-signal amber accent, flat shadow-free surfaces, and uppercase/technical
UI chrome (nav, buttons, badges) that reads like a spec sheet or a parts
list — appropriate for a brand that's fundamentally about kids assembling
real laser-cut hardware. The reference system's plain dot-matrix decoration
is reinterpreted as a **board-joint grid**: a repeating pattern of small
interlocking tabs and slots, the way laser-cut plywood panels actually join
together on the real kits. Headings and body copy stay legible and
non-shouty (no uppercase, normal weight) so the site still reads warm to
parents and clear to kids — the uppercase/technical treatment is reserved
for chrome (buttons, nav, labels, spec pills), not for the friendly voice of
the copy itself.

**Key Characteristics**
- Stark color-blocking: light canvas (`{colors.canvas}`) sections against
  deep navy (`{colors.surface-alt}`) bands — no gradients on backgrounds
  other than the signature hero gradient reserved by CLAUDE.md.
- One high-signal accent (`{colors.primary}` — brand amber) used sparingly:
  primary CTA fills and brand moments only.
- Flat, shadow-free elevation. Depth comes from color contrast and a thin
  `border+surface` treatment on dark bands, not `box-shadow`.
- Uppercase, letter-spaced, bold text for **UI chrome only** — nav links,
  button labels, spec-pill badges, section eyebrows. Headings and body copy
  stay normal-case for warmth and kid-readability.
- Board-joint grid as the decorative motif (hero backgrounds, section
  dividers) instead of a plain dot pattern — see Section 6.
- Mostly sharp, minimal-radius surfaces (`{rounded.xs}`–`{rounded.md}`),
  with the pill radius (`{rounded.full}`) reserved for primary CTA buttons
  only — the one rounded signature carried over from the previous look.
- Generous vertical rhythm between sections (`{spacing.band}` = 52px).

## 2. Color Palette & Roles

Full brand definitions live in CLAUDE.md Section 2 — this maps that palette
onto the system's structural roles.

### Primary
- **Brand Accent** (`{colors.primary}` — `#FFA707`, brand-amber): Primary
  CTA fills, active states, brand-mark emphasis. Text on this is always
  brand-navy (`{colors.on-primary}`) — never white, per CLAUDE.md's
  contrast rule.

### Surfaces & Backgrounds
- **Canvas** (`{colors.canvas}` — `#F8FAFC`): Default page background —
  dominant, light, spacious.
- **Surface Alt / Ink** (`{colors.surface-alt}` — `#0D1F35`, brand-navy):
  Dark accent bands (footer, hero, schools section), *and* the default dark
  text/nav/link color on light backgrounds — same dual role the source
  system used its near-black for.

### Text & Hierarchy
- **Body** (`{colors.body}` — `#5B6B80`, muted): Secondary body copy, text
  on dark bands where full white would be too stark.
- **Muted** (`{colors.muted}` — `#E2E8F0`, line): Captions, dividers,
  de-emphasized borders on light surfaces.
- **Faint** (`{colors.faint}` — `#FFFFFF`): Text on dark bands, white card
  fills.
- **On Primary** (`{colors.on-primary}` — `#0D1F35`, brand-navy): Text on
  the amber accent — mandatory per CLAUDE.md, never white-on-amber.

### Neutral / Decorative
- **Neutral 1** (`{colors.neutral-1}` — `#E8F4FE`, brand-blue-50): Light
  tinted secondary surface, hover fill behind links.

## 3. Typography Rules

### Font Family

The type **scale** below (sizes, weights, line-heights, uppercase
treatment) is kept from the source system. The actual font **family**
follows CLAUDE.md Section 2: **Baloo 2** (or Fredoka) for display/heading
roles, **Nunito** (or Inter) for text/label roles. The source system's
custom faces (NType82, Ndot, LatteraMonoLL, Geist) aren't used — treat
every "brand display font" below as Baloo 2 and every "brand text font" as
Nunito.

- **Display role**: brand display font (Baloo 2 / Fredoka)
- **Text / label role**: brand text font (Nunito / Inter)

### Hierarchy

| Role | Size | Weight | Line Height | Tracking | Case | Notes |
|---|---|---|---|---|---|---|
| Display Large | 48px | 700 | 1.0 | 0 | normal | Hero headline |
| Display Medium | 40px | 700 | 1.0 | 0 | UPPERCASE | Large section titles |
| Heading MD Strong | 32px | 700 | 1.0 | 0 | normal | Strong section headings |
| Heading MD | 32px | 500 | 1.1 | 0 | UPPERCASE | Section headings |
| Heading SM | 20px | 700 | 1.08 | 0 | UPPERCASE | Small headings, card titles |
| Body XL | 20px | 800 | 1.0 | 0 | UPPERCASE | Emphasized stat/price callouts |
| Body Large | 18px | 400 | 1.4 | 0 | normal | Large body copy |
| Body MD | 16px | 400 | 1.4 | 0 | normal | Standard body copy |
| Label MD | 14px | 700 | 1.43 | 0.4px | UPPERCASE | Button/nav labels |
| Label SM | 12px | 700 | 1.33 | 0.4px | UPPERCASE | Spec pills, badges |
| Label XS | 11px | 700 | 1.1 | 0.4px | UPPERCASE | Micro-labels, footnotes |

### Principles
- **Uppercase is a chrome signal, not a voice.** Reserve
  `text-transform: uppercase` for nav, buttons, labels and pills — actual
  sentences (headlines, body copy, descriptions) stay normal-case. This is
  the one deliberate deviation from the source system, made for
  kid-readability.
- **Weight carries hierarchy**, not size alone — Heading MD (32px/500) and
  Heading MD Strong (32px/700) share a size but read differently.
- **Positive letter-spacing on label roles** (`0.4px`) gives the
  spec-sheet/technical feel on small uppercase text — the reference
  system's negative tracking doesn't survive the font swap cleanly, so this
  is a light positive-tracking analog instead.
- **Never invent intermediate sizes**; use weight and letter-spacing to
  differentiate within a size instead.

## 4. Component Stylings

### Buttons

**Primary Button**
- Background: `{colors.primary}` (`#FFA707`)
- Text Color: `{colors.on-primary}` (`#0D1F35`) — mandatory, never white
- Font: `{typography.body-md}`, 16px/400
- Padding: `12px 16px`
- Height: 40px
- Border Radius: `{rounded.full}` — the one pill signature kept
- Hover: opacity 0.85 + `translateY(-2px)`
- Disabled: opacity 0.4

**Secondary Button (Navy)**
- Background: `{colors.surface-alt}` (`#0D1F35`)
- Text Color: `{colors.faint}` (`#FFFFFF`)
- Font: `{typography.label-sm}`, 12px/700, uppercase, 0.4px tracking
- Padding: `20px 40px`
- Height: 60px
- Border Radius: `{rounded.sm}` (8px)

**Filled Button**
- Background: `rgba(255, 255, 255, 0.08)` (translucent overlay — for use
  on dark bands only)
- Text Color: `{colors.faint}` (`#FFFFFF`)
- Font: `{typography.label-xs}`, 11px/700, uppercase
- Padding: `16px`
- Height: 48px
- Border Radius: `{rounded.sm}` (8px)

**Filled Small Button**
- Background: `{colors.faint}` (`#FFFFFF`)
- Text Color: `{colors.on-primary}` (`#0D1F35`)
- Font: `{typography.body-md}`, 16px/400
- Padding: `12px 16px`
- Height: 40px
- Border Radius: `{rounded.xs}` (4px)

**Text Button**
- Background: transparent
- Text Color: `{colors.body}` (`#5B6B80`)
- Font: `{typography.label-md}`, 14px/700, uppercase, 0.4px tracking
- Height: 21px
- Hover: opacity 0.7

### Navigation

**Global Navigation**
- Background: transparent
- Text Color: `{colors.surface-alt}` (`#0D1F35`)
- Font: `{typography.label-xs}`, 11px/700, uppercase
- Height: 44px
- Hover: text color → `{colors.body}`
- Focus: `2px solid #0358B2` outline

### Links

**Standard Link**
- Text Color: `{colors.surface-alt}` (`#0D1F35`)
- Font: `{typography.body-md}`, 16px/400, normal case
- Hover: text color → `{colors.body}`, background → `{colors.neutral-1}`

**Small Link**
- Text Color: `{colors.surface-alt}` (`#0D1F35`)
- Font: `{typography.label-xs}`, 11px/700, uppercase
- Padding: `8px 16px`
- Height: 28px

### Footer

- Background: `{colors.surface-alt}` (`#0D1F35`)
- Text Color: `{colors.faint}` (`#FFFFFF`)
- Font: `{typography.body-md}`, 16px/400, normal case (footer copy is
  still a sentence, not chrome)
- Padding: `112px 32px 32px 32px`
- Border Radius: `{rounded.none}` (sharp, full-bleed)

## 5. Layout Principles

### Spacing System

Base unit: `{spacing.xs}` (8px).

| Scale | Value |
|---|---|
| `{spacing.xxs}` | 4px |
| `{spacing.xs}` | 8px |
| `{spacing.sm}` | 12px |
| `{spacing.md}` | 16px |
| `{spacing.lg}` | 20px |
| `{spacing.xl}` | 24px |
| `{spacing.xxl}` | 28px |
| `{spacing.xxxl}` | 32px |
| `{spacing.section}` | 40px |
| `{spacing.band}` | 52px |

### Grid & Container

- **Max-width:** 1260px, matching CLAUDE.md's existing container convention.
- **Grid columns:** 4-column grid at all breakpoints.
- **Section padding:** full-bleed color blocks (dark navy bands span edge
  to edge); internal content padding creates the safe area
  (`{spacing.xxxl}` = 32px on desktop).

### Whitespace Philosophy

Sections stack with large vertical gaps (`{spacing.band}` = 52px) so
alternating canvas/navy blocks read as distinct, deliberate zones rather
than a continuous scroll. Horizontal padding stays minimal at section
level; color does the structural work, not borders.

### Border Radius Scale

- `{rounded.none}` = 0px — Footer, images, most flat surfaces.
- `{rounded.xs}` = 4px — Small/filled buttons, inputs.
- `{rounded.sm}` = 8px — Secondary and filled buttons, board-joint tabs
  (see below).
- `{rounded.md}` = 16px — Cards and panels (a deliberate concession to
  the source's all-sharp aesthetic — full 0px cards read too austere for a
  kids' brand).
- `{rounded.full}` = 9999px — **Primary CTA buttons only.** The one pill
  signature kept from the previous look; don't apply it elsewhere.

### Border Widths

Thin (1px) only, and used sparingly — most separation comes from color
contrast, not strokes. Where a border does appear (card edges on light
surfaces), use `{colors.muted}` (`#E2E8F0`).

## 6. Depth & Elevation

**Color-blocking, not shadows.** Depth comes from adjacent surface color
changes (canvas ↔ navy), not `box-shadow`. The one exception: white cards
floating on a navy band use a thin `border+surface` treatment (a subtle
light border) instead of a shadow to read as "lifted."

### Board-joint grid (the reinterpreted decorative motif)

Where the reference system used a plain dot-matrix pattern, use a
**board-joint grid** instead — small alternating tabs/slots referencing how
laser-cut plywood panels actually interlock on the real kits:

```css
background-image:
  repeating-linear-gradient(90deg, currentColor 0 6px, transparent 6px 24px),
  repeating-linear-gradient(0deg, currentColor 0 6px, transparent 6px 24px);
background-size: 24px 24px;
opacity: 0.06; /* on light canvas, using brand-navy as currentColor */
/* on a dark navy band, use brand-blue-50 as currentColor at opacity 0.08 */
```

Use this at low opacity behind hero copy or as a section-divider strip —
never at full strength, it's texture, not content.

| Level | Treatment | Use |
|---|---|---|
| Flat (Base) | Solid surface color, no shadow | Cards, buttons, content blocks |
| Blocked Contrast | Adjacent canvas ↔ navy color change | Section boundaries |
| Board-Joint Texture | Low-opacity repeating tab pattern | Hero backdrop, dividers |
| Lifted (dark band only) | 1px light border, no shadow | White cards on navy bands |

### Opacity Levels

- **0.85** — Button hover (paired with a small `translateY(-2px)` lift).
- **0.4** — Disabled state.
- **0.08** — Translucent white overlay for filled buttons on dark bands.
- **0.06–0.08** — Board-joint texture opacity.

### Z-index / Layering

- `10` — Dropdowns, inline overlays.
- `999` — Sticky header, mobile bottom bar (matches CLAUDE.md convention).
- `9998–9999` — Cart drawer, quick-view modal, toasts.

## 7. Do's and Don'ts

### Do
- **Use brand amber sparingly and only for primary actions.** Text on it is
  always brand-navy.
- **Let color-blocking do the structural work.** Alternate canvas and navy
  bands instead of adding shadows or borders for separation.
- **Reserve uppercase for chrome** — nav, buttons, labels, pills. Never
  uppercase a full sentence of body copy or a headline.
- **Keep the board-joint texture subtle** (6–8% opacity) — it's a material
  cue, not a pattern to notice consciously.
- **Reserve the pill radius for primary CTAs only** — every other surface
  stays sharp-to-modest (`{rounded.xs}`–`{rounded.md}`).
- **Maintain the 52px section rhythm** between major blocks.

### Don't
- **Don't add box-shadows.** Depth is color contrast and, on dark bands
  only, a thin light border.
- **Don't put white text on amber or green** — CLAUDE.md's contrast rule
  stands regardless of this system's monochrome leanings.
- **Don't round everything.** Mixing the pill radius onto cards or badges
  dilutes it as a CTA signal — keep cards/panels at `{rounded.md}` or
  sharper.
- **Don't uppercase headings or paragraphs.** That's reserved for UI
  chrome, not the brand's voice.
- **Don't scale the board-joint grid up** into a loud, visible pattern —
  it should read as material texture at a glance, not decoration.

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Container | Columns | Heading | Menu Toggle |
|---|---|---|---|---|---|
| Mobile | 375px | 343px | 4 | 32px | Yes |
| Tablet | 768px | 704px | 4 | 40px | Yes |
| Desktop Small | 1024px | 960px | 4 | 40px | No |
| Desktop Medium | 1280px | 1216px | 4 | 48px | No |
| Desktop Large | 1440px | 1260px | 4 | 48px | No |

Note: the source system measured no mobile menu toggle at any breakpoint
(a phone brand's nav is short enough to always show). XTRONIC's nav has six
links plus cart/search/CTA — a hamburger below 1024px is a practical
necessity, not a stylistic choice; kept from the existing site rather than
copied from the source.

### Touch Targets

Minimum 40px (matches CLAUDE.md's ≥44px rule when padding is included);
secondary buttons run 60px tall for extra-comfortable tap targets.

### Collapsing Strategy

- **Mobile/Tablet (375–768px):** Hamburger menu, single-column card grids,
  section padding drops to 16–24px.
- **Desktop (1024px+):** Full nav visible, 4-column grid capacity, section
  padding settles at 24px internal / 32px on band interiors.
- Typography steps at the same breakpoints as the existing site
  (32px → 40px → 48px headings) — no fluid scaling.

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Brand Amber (`{colors.primary}` — `#FFA707`), navy text
- **Page Background:** `#F8FAFC` — dominant, light
- **Dark Bands (footer, hero, schools):** Brand Navy (`{colors.surface-alt}`
  — `#0D1F35`), white or blue-50 text
- **Body Text:** Brand Navy on light; white/blue-50 on navy
- **Secondary Text:** Muted (`{colors.body}` — `#5B6B80`)
- **Borders/Dividers:** `{colors.muted}` (`#E2E8F0`)

### Iteration Guide

1. **Block color first.** Canvas vs. navy band — decide which before
   touching any component.
2. **Chrome is uppercase, voice is not.** Nav/buttons/labels: uppercase,
   letter-spaced, bold. Headlines/body: normal case, normal tracking.
3. **No shadows, ever.** If something needs to look lifted, it's either a
   navy band (contrast) or a white card with a 1px light border (on navy
   only).
4. **Pill radius is precious.** Only primary CTA buttons get
   `{rounded.full}`. Everything else: `{rounded.xs}` to `{rounded.md}`.
5. **Board-joint texture at 6–8% opacity, nowhere else.** Don't reuse it as
   a loud background.
6. **52px between sections**, 32px internal padding on band interiors.
7. **Focus rings stay `#0358B2` on light, `#FFA707` on navy bands** —
   matching the existing site's established focus convention.

## 10. Known Gaps

- **No semantic status colors tokenized here** — use CLAUDE.md's
  `brand-green` family for success/in-stock states, same as before.
- **Board-joint grid is a CSS approximation**, not lifted from real
  product photography — swap in an actual laser-cut-edge texture/SVG later
  if a higher-fidelity version is wanted.
- **Transition timings unspecified** — keep motion subtle, respect
  `prefers-reduced-motion`.
- **This is a structural pivot from the site's current rounded/shadowed
  look** — applying it will visibly change existing components (cards lose
  their `shadow-lg`, most radii shrink). Treat as a decision to confirm
  before a full site pass, not a drop-in.
