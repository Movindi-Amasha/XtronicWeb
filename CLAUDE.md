@AGENTS.md

# CLAUDE.md — XTRONIC KIDZ Store

> Project brief for Claude Code. Read this whole file before writing code.
> Tagline: **Learn • Build • Play** — STEM robotics & solar engineering kits for kids 6+.
> Home market: Australia (AUD), shipping internationally.

---

## 0. How to use this file with DESIGN.md

- A `DESIGN.md` file may also exist in the repo root. Use it for **layout, component patterns, spacing, typography scale, motion and page structure**.
- **Colors always come from Section 2 of this file.** If `DESIGN.md` defines any other color tokens (primary, secondary, accent, backgrounds, text, borders), map them onto the tokens below and discard the originals. Where DESIGN.md names a role that has no equivalent here, derive it from the nearest brand color (tint/shade), never introduce a new hue.
- If DESIGN.md and this file conflict on anything other than color, follow DESIGN.md and leave a short note in `docs/decisions.md`.
- The logo lives at `public/brand/xtronic-logo.png` (the user will add it). Use it as-is — do not recolor or redraw it.

---

## 1. Role & quality bar

Act as a principal frontend engineer + UI/UX designer for playful, high-converting kids' ed-tech e-commerce. The site must feel energetic, 3D-tactile and friendly for kids, while reading as safe, trustworthy and polished to parents, teachers and school administrators. Production-ready: typed, accessible (WCAG 2.2 AA), mobile-first, fast (Lighthouse ≥ 90 on mobile for Performance, Accessibility, Best Practices, SEO).

---

## 2. Brand palette (sampled directly from the logo)

These hex values were pixel-sampled from the uploaded logo and **replace** the palette in the original brief.

| Token | Hex | Source in logo | Use |
|---|---|---|---|
| `brand-blue` | `#038CF2` | Blue half of the 3D "X" | Primary buttons, active nav, links, "Learn" badge |
| `brand-blue-600` | `#0272C8` | Shade of above | Button hover/pressed |
| `brand-blue-deep` | `#0358B2` | Gear inside the "O" | Focus rings, secondary emphasis, icon strokes |
| `brand-blue-50` | `#E8F4FE` | Tint | Section backgrounds, card tints |
| `brand-amber` | `#FFA707` | Yellow/orange half of the "X" | CTA badges, "Build" tag, price accents, sale banners |
| `brand-amber-600` | `#F29A0A` | "BUILD" text | Amber hover, amber text on white (bold/large only) |
| `brand-amber-50` | `#FFF4E0` | Tint | Highlight banners, promo strips |
| `brand-green` | `#57B12D` | "PLAY" text & gamepad | "Play" badge, In Stock, success toasts, solar/eco tags |
| `brand-green-700` | `#3F8A1E` | Shade | Green text on white (AA-safe) |
| `brand-green-50` | `#EEF8E9` | Tint | Success backgrounds |
| `brand-navy` | `#0D1F35` | "TRONIC" wordmark & robot face | Headings, body text, footer background |
| `brand-navy-700` | `#1E3350` | Tint | Secondary text on light |
| `surface` | `#FFFFFF` | — | Cards |
| `canvas` | `#F8FAFC` | — | Page background |
| `line` | `#E2E8F0` | — | Borders, dividers |
| `muted` | `#5B6B80` | — | Captions, meta text |

**Contrast rules**
- White text on `brand-blue` is fine for buttons ≥ 16px bold; for smaller text use `brand-blue-600`.
- Never put white text on `brand-amber` or `brand-green`. Use `brand-navy` text on amber; use `brand-green-700` for green text on white.
- Signature gradient (hero/X motif only): `linear-gradient(135deg, #038CF2 0%, #038CF2 50%, #FFA707 50%, #FFA707 100%)` — mirrors the split "X".

Expose these as Tailwind v4 `@theme` tokens in `app/globals.css` (e.g. `--color-brand-blue: #038CF2;`) so classes like `bg-brand-blue` work everywhere. No hard-coded hex values in components.

**Typography:** headings in a rounded geometric sans (e.g. `Baloo 2` or `Fredoka` via `next/font`), body in `Inter` or `Nunito`. Wordmark style is bold, rounded, uppercase.

**Visual motifs:** `rounded-2xl`/`rounded-3xl`, soft shadows (`shadow-lg shadow-brand-blue/10`), lift-on-hover (`hover:-translate-y-1`), pill micro-badges with emoji/icons (☀️ Solar Powered, 🤖 Voice AI, Age 6+, Easy Snap-Together), subtle circuit-trace line decorations like those on the logo. Respect `prefers-reduced-motion`.

---

## 3. Tech stack

- **Next.js 15 (App Router) + TypeScript (strict) + Tailwind CSS v4**
- **State:** Zustand (cart, persisted to localStorage), React Hook Form + Zod (forms)
- **Payments:** Stripe (Payment Element + Checkout Sessions) and PayPal (JS SDK + Orders v2 REST API) — see Section 6
- **Database:** Prisma + PostgreSQL (SQLite allowed for local dev) for products, orders, school quotes, newsletter subscribers, coupons
- **Email:** Resend (order confirmations, quote acknowledgements, 10% coupon)
- **Icons:** `lucide-react`; product images as optimized placeholders via `next/image` until real photos exist
- **Testing:** Vitest (unit), Playwright (checkout E2E using Stripe and PayPal sandbox)
- **Lint/format:** ESLint + Prettier

---

## 4. Site architecture

```
app/
  page.tsx                     Home (all landing sections)
  shop/page.tsx                STEM Kits — full catalog with filters
  shop/[slug]/page.tsx         Product detail page
  why-xtronic/page.tsx
  how-it-works/page.tsx
  schools/page.tsx             Schools & Clubs tier + quote form
  parents-guide/page.tsx
  cart/page.tsx                Full cart (drawer is the primary UI)
  checkout/page.tsx            Address → shipping → payment
  checkout/success/page.tsx
  checkout/cancelled/page.tsx
  help/[topic]/page.tsx        FAQ, shipping-returns, safety, privacy, terms
  api/
    checkout/stripe/route.ts           create PaymentIntent / Checkout Session
    checkout/paypal/create/route.ts    create PayPal order
    checkout/paypal/capture/route.ts   capture PayPal order
    webhooks/stripe/route.ts
    webhooks/paypal/route.ts
    quote/route.ts                     school quote submissions
    newsletter/route.ts                subscribe + issue coupon
lib/
  products.ts   pricing.ts   currency.ts   shipping.ts   tax.ts
  stripe.ts     paypal.ts    db.ts         email.ts
components/     (Header, CartDrawer, ProductCard, QuickViewModal, SchoolQuoteModal, ...)
```

### Header / navbar
Logo + "Learn • Build • Play" · Home · STEM Kits · Why XTRONIC · How It Works · Schools & Clubs · Parents' Guide · 🔍 Search (instant client-side search over products) · 🛒 Cart with live count badge (opens drawer) · "Order Kit" CTA (amber). Sticky, shrinks on scroll. Mobile: hamburger → slide-in drawer; plus a **sticky bottom bar** with Shop, Search, Cart, Order Kit.

### Home sections (in order)
1. **Hero** — "MAKE LEARNING COME ALIVE." / "Hands-on STEM robotics and solar engineering kits designed to ignite curious minds. Learn • Build • Play." CTAs: [Explore All Kits] (blue) and [For Schools & Teachers] (outline). Trust badges: 🛡️ 100% Child-Safe Materials · ⚡ Battery-Free Solar Tech · 🇦🇺 Fast Australia-Wide Delivery · ⭐ Rated 4.9/5 by Parents. Show the logo artwork prominently.
2. **Featured Kits grid** with category tabs: All · Solar Energy · Robotics & Electronics · Wooden Mechanics. Cards: image, name, category, spec pills, age, stars, price, [Add to Cart], [Quick View].
3. **How It Works** — 1 Unbox & Discover · 2 Build & Connect · 3 Power Up · 4 Play & Master.
4. **Why Choose XTRONIC KIDZ** — Screen-Free Interactive Fun · Curriculum-Aligned STEM (Mechanics, Photovoltaics, Sound Frequency) · Lifetime Replacement Guarantee on missing small parts · Independent discovery or parent-child bonding.
5. **Schools, STEM Clubs & Educators** — 10-pack / 30-pack bundles, lesson plan downloads (PDF placeholders), [Request School Quote] modal.
6. **Parent Reviews** — accessible carousel, names, star ratings, "Verified Buyer" badge.
7. **Footer** (navy) — newsletter with instant 10% coupon, Help/FAQ/Shipping & Returns/Safety, socials (YouTube, Instagram, TikTok), accepted-payment icons (Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, Afterpay), ABN placeholder.

---

## 5. Product catalog (seed data)

Store in the database; seed from `prisma/seed.ts`. Prices are in **AUD cents**, GST-inclusive.

| slug | Name | Category (filter) | Age | Price | Build time |
|---|---|---|---|---|---|
| `solar-4wd-rover` | ☀️ Solar 4-Wheel Drive DIY Rover | Solar Energy | 6+ | 2995 | 45–60 min |
| `wooden-taxiing-aircraft` | ✈️ Wooden Taxiing Aircraft Kit | Wooden Mechanics | 6+ | 2495 | 30–45 min |
| `solar-speedboat` | 🛥️ Solar-Powered Yacht / Speedboat | Solar Energy | 6+ | 3295 | 30–45 min |
| `voice-robot` | 🤖 Smart Voice-Controlled Robot Kit | Robotics & Electronics | 7+ | 3995 | 60–90 min |
| `solar-butterfly` | 🦋 Solar-Powered Flapping Butterfly | Solar Energy | 6+ | 2295 | 30–45 min |

Detail fields per product: subtitle/category label (e.g. "Solar Mechanics & Clean Energy"), highlights (from the brief), STEM concepts, what's in the box, build time, age, weight/dimensions (for shipping), SKU, stock count, rating, review count, images.

Highlights from the brief:
- Rover — dual-angle solar panel, four-wheel gearbox, battery-free outdoor driving.
- Aircraft — laser-cut basswood, high-speed mini propeller, electric circuit switch.
- Speedboat — waterproof buoyancy hull, direct-sun drive motor, dual-blade twin screw.
- Robot — responds to clap/voice triggers, bi-directional gear system, flashing LED eyes.
- Butterfly — realistic wing-flutter linkage, micro solar cell, desk display stand.

**School bundles:** 10-pack (−15%) and 30-pack (−25%) of any kit, plus a mixed "Classroom Discovery Pack". Show as separate purchasable variants and also route to the quote form for larger orders.

---

## 6. Payments (core requirement)

Offer both **Stripe** and **PayPal** at checkout, as two clearly labelled options on one payment step.

### 6.1 Stripe — cards & international methods
- Use the **Payment Element** with `automatic_payment_methods: { enabled: true }` so methods switch on from the Stripe Dashboard without code changes. Target methods: Visa/Mastercard/Amex, Apple Pay, Google Pay, Link, **Afterpay/Clearpay** (AU/NZ/UK), **Klarna**, and local methods where available.
- Server creates the PaymentIntent in `api/checkout/stripe/route.ts`. **Always recompute the total server-side** from product IDs + quantities + shipping + coupon — never trust client prices.
- Use an idempotency key per checkout attempt.
- Handle 3-D Secure via `stripe.confirmPayment` with `return_url` → `/checkout/success`.
- Webhook `payment_intent.succeeded` / `payment_intent.payment_failed` → update order status, decrement stock, send confirmation email. Verify signatures with `STRIPE_WEBHOOK_SECRET`.

### 6.2 PayPal — PayPal balance, Pay Later, cards via PayPal
- Use `@paypal/react-paypal-js` with the PayPal Buttons (enable `paylater` funding; show Pay Later messaging on product and cart pages where eligible).
- Flow: client calls `api/checkout/paypal/create` → server creates order via Orders v2 (`intent: CAPTURE`) with server-computed amounts and itemised breakdown → buyer approves → client calls `api/checkout/paypal/capture` → server captures and marks order paid.
- Webhook `PAYMENT.CAPTURE.COMPLETED` / `DENIED` / `REFUNDED` → reconcile order status; verify with PayPal's webhook signature verification endpoint.
- Sandbox by default; switch with `PAYPAL_ENV=live`.

### 6.3 Multi-currency & international
- Base currency **AUD**. Support display + charge in USD, NZD, GBP, EUR, CAD, SGD (configurable list in `lib/currency.ts`).
- Currency selector in header/footer; default from `Accept-Language` / geo header, persisted in a cookie.
- Store FX rates in the DB, refreshed daily by a cron route; round to `.95` price endings per currency. Charge in the displayed currency (both Stripe and PayPal support presentment currencies).
- Hide Afterpay when currency/country is unsupported.

### 6.4 Tax, shipping, coupons
- **GST:** AU orders — prices include 10% GST; show the GST component on the order summary and invoice. International orders — GST-free export; leave hooks (or enable Stripe Tax) for other jurisdictions.
- **Shipping (`lib/shipping.ts`):** AU Standard (free over A$75), AU Express, NZ, International Standard, International Express. Rates driven by a config table, calculated from cart weight.
- **Coupons:** `WELCOME10` style codes issued by the newsletter (single-use, 10%), validated server-side. School bundle pricing never stacks with coupons.

### 6.5 Order model & security
- `Order` with status: `pending → paid → fulfilled → shipped → delivered` (+ `failed`, `refunded`, `cancelled`), payment provider, provider reference, currency, amounts, line items snapshot, shipping address, email.
- Never store raw card data (PCI scope stays with Stripe/PayPal). No secrets in client bundles — only `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `NEXT_PUBLIC_PAYPAL_CLIENT_ID` are public.
- Rate-limit checkout, quote and newsletter routes. Add CSP headers allowing Stripe and PayPal domains.
- Provide a minimal protected `/admin/orders` page (basic auth via env) listing orders and quote requests.

### 6.6 Environment variables — create `.env.example`
```
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
PAYPAL_CLIENT_ID=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_WEBHOOK_ID=
PAYPAL_ENV=sandbox
RESEND_API_KEY=
ORDER_NOTIFICATION_EMAIL=
ADMIN_USER=
ADMIN_PASSWORD=
```
Never ask for or commit real keys. The site owner fills these in.

---

## 7. Interactive features

- **Cart drawer:** slide-in from right, focus-trapped, ESC to close; line items with +/− quantity, remove, subtotal, shipping estimate, free-shipping progress bar ("A$12.05 away from free delivery"), [Checkout]. Toast on add ("Added to cart ✓" in green). Cart persists across reloads.
- **Filters & tabs:** All / Solar Energy / Robotics & Electronics / Wooden Mechanics, plus sort (featured, price, age). URL-synced (`?category=solar`).
- **Quick-View modal:** gallery, specs, what's in the box, age rating, build time, STEM concepts, quantity + Add to Cart.
- **School Quote modal:** name, school/organisation, role, email, phone, state/country, kits of interest, quantity, timeframe, message. Zod validation, stored in DB, emailed to owner, success state.
- **Newsletter:** email → issues unique 10% code, shown immediately and emailed.
- **Mobile:** sticky bottom bar, ≥ 44px touch targets, drawer menus, no horizontal scroll.

---

## 8. Accessibility, SEO & trust

- Semantic landmarks, skip link, visible focus rings (`brand-blue-deep`), alt text, labelled form controls, `aria-live` for cart updates, keyboard-operable carousel and modals.
- Metadata per page, Open Graph images, `Product` + `Offer` + `AggregateRating` JSON-LD, `Organization` JSON-LD, sitemap and robots.
- Child-safety messaging: choking-hazard notice for small parts on relevant products (Australian standard wording placeholder), safety policy page, privacy policy that states no data is collected from children.

---

## 9. Build order

1. Scaffold Next.js + Tailwind v4, add brand tokens (Section 2), fonts, and base layout. If `DESIGN.md` exists, read it now and apply Section 0.
2. Prisma schema + seed the 5 products and bundles.
3. Header, footer, mobile bar, home sections with static data.
4. Shop page, filters, product cards, quick-view, product detail pages.
5. Cart store + drawer + cart page.
6. Checkout: address → shipping → payment step with Stripe Payment Element and PayPal Buttons side by side.
7. API routes, webhooks, order lifecycle, emails.
8. Currency selector + FX, GST display, coupons.
9. Schools page + quote modal, newsletter, admin page.
10. Accessibility pass, SEO, Playwright E2E for both payment providers in sandbox, README with setup and go-live steps (webhook URLs, switching to live keys, enabling Afterpay/Klarna in Stripe Dashboard, PayPal live app).

## 10. Definition of done

- `npm run build` passes with zero type errors; lint clean.
- A test purchase completes end-to-end in **both** Stripe test mode and PayPal sandbox, order marked `paid` via webhook, confirmation email sent.
- Cart, filters, quick-view, quote form and newsletter all work on a 375px viewport.
- Every color in the UI traces back to a token in Section 2.

---

## 11. Content rules

- Never mention Claude, AI, or any code-generation tool anywhere in user-facing content, code comments, commit-visible copy, metadata, or docs shipped with the project.

## Progress notes

- **Step 1 (scaffold + tokens + fonts + layout) — done.** Next.js 16 App Router, TypeScript, Tailwind v4. Brand tokens live in `app/globals.css` as `@theme` vars (`bg-brand-blue`, `text-brand-navy`, etc). Fonts: Baloo 2 (heading) + Nunito (body) via `next/font/google`.
- **Step 3 (header, footer, mobile bar, home sections with static data) — done.** See `components/Header.tsx`, `Footer.tsx`, `MobileBottomBar.tsx`, and the home sections (`Hero`, `FeaturedKits`, `HowItWorks`, `WhyChoose`, `SchoolsSection`, `ParentReviews`) assembled in `app/page.tsx`. Product seed data lives in `lib/products.ts` (matches Section 5 exactly). Cart badge/search/add-to-cart are visual stubs only — no state yet.
- **Not started:** Step 2 (Prisma + DB), Step 4 (shop page, filters, product detail, quick-view), Step 5 (cart store/drawer), Steps 6–10 (checkout, payments, currency, schools quote backend, a11y/SEO pass, tests).
- Product photography isn't in yet — `public/products/<slug>/main.jpg` are expected paths (see `lib/products.ts`); `components/ProductImage.tsx` falls back to an emoji placeholder tile until each file exists, so the site never shows a broken image icon.
- Logo currently lives at `public/brand/xtronic-logo.jpeg` (source file was a JPEG, not PNG — code references the `.jpeg` path, not the `.png` path this doc originally specified).
- Radius scale from DESIGN.md is wired up as exact Tailwind utilities in `app/globals.css` (`--radius-card: 28px`, `--radius-btn: 11px`, `--radius-btn-xs: 8px`) → use `rounded-card` / `rounded-btn` / `rounded-btn-xs` / `rounded-full` in components, not Tailwind's default `rounded-xl`/`rounded-2xl`/`rounded-3xl` scale, to stay on the documented scale exactly. Interactive elements on navy bands (footer, schools quote CTA) use `focus-visible:outline-brand-amber` instead of the global default blue-deep focus ring, per DESIGN.md's dark-theme focus rule.
