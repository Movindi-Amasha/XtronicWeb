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
- **Step 4 (shop page, filters, product detail pages) — done.** `/shop` (`app/shop/page.tsx` + `components/ShopCatalog.tsx`, client-side category filter synced to `?category=` + sort dropdown) and `/shop/[slug]` (`app/shop/[slug]/page.tsx`, static-generated per product, Product/Offer/AggregateRating JSON-LD, quantity stepper in `components/AddToCartBox.tsx`, related-products row). "Quick View" now opens `components/QuickViewModal.tsx` (see below) rather than navigating.
- **Content pages — done.** `/why-xtronic`, `/how-it-works`, `/parents-guide`, `/schools` (bundle cards + `components/SchoolQuoteForm.tsx`, now posts to `/api/quote` — see below), `/cart` (real cart page, see Step 5), `/help/[topic]` (faq, shipping-returns, safety, privacy, terms — static content in one dynamic route).
- **Step 2 (Prisma + DB) — moved from SQLite to real Postgres (Neon, via Vercel's Storage tab) for production.** This was forced by reality, not planned ahead of time: SQLite's local-file approach cannot work on Vercel at all — serverless functions have no persistent disk between invocations, so the live site hit `Error code 14: Unable to open the database file` the first time an API route tried to query it. Fixed by provisioning Postgres through Vercel's Storage → Create Database flow (Neon-backed), which auto-populates a long list of env vars (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `POSTGRES_*`, `PG*`) — only `DATABASE_URL` (the pooled/pgbouncer one) is actually used; `schema.prisma`'s `datasource db` is just `provider = "postgresql"` / `url = env("DATABASE_URL")`, no `directUrl`. (A `directUrl` pointing at `DATABASE_URL_UNPOOLED` was tried first, per Prisma's usual Neon guidance, but that direct/non-pooled host was unreachable — `P1001: Can't reach database server` — removed again rather than chase it further; the pooled connection works fine for this project's needs.) Models unchanged: `Order`, `SchoolQuote`, `NewsletterSubscriber`, `Coupon`, plus `payhere` added to the `PaymentProvider` enum (see PayHere note below). **Products are still static** in `lib/products.ts`, not migrated to the DB. `lib/db.ts` is the Prisma client singleton. `prisma`/`@prisma/client` pinned to `^6` (same reason as before — 7.x+ requires a driver-adapter rewrite). `prisma/seed.ts` still isn't wired to a runnable command.
  - **This local dev machine/sandbox cannot reach the Neon database at all** — `prisma db push` run locally fails fast with `P1001` against both the pooled and unpooled hosts, almost certainly because outbound port 5432 is blocked in this environment (not a problem with the connection string or Neon itself). Practical consequence: schema changes can't be pushed to this database from local `npx prisma db push`/`generate` the way they could with the old SQLite file. Worked around by adding a `vercel-build` script (`package.json`) — Vercel automatically prefers `vercel-build` over `build` when present, with no dashboard config needed — that runs `prisma db push --accept-data-loss && next build`, so schema sync happens as part of every Vercel deploy instead. `--accept-data-loss` skips the interactive confirmation prompt that would otherwise block a non-interactive CI build; fine while there's no real production data to lose, but **this should become a proper `prisma migrate deploy` + versioned migrations workflow before this ever holds real customer orders**, since `db push --accept-data-loss` will silently apply destructive schema changes with no safety net. Local `npm run build`/`npm run dev` are unaffected by any of this — no page does a DB query at static-generation time, so the build itself doesn't need DB connectivity; only runtime API routes (`/admin/orders`, checkout capture, etc.) do, which only ever worked against this Postgres DB on Vercel itself during this session, never fully verified from local dev.
- **Step 5 (cart store/drawer) — done.** `lib/cartStore.ts` (Zustand + localStorage persistence, `skipHydration: true` + `components/CartHydration.tsx` rehydrates on mount to avoid an SSR hydration mismatch). `components/CartDrawer.tsx` (focus-trapped, ESC to close, free-shipping progress bar), `components/CartToast.tsx` ("Added to cart ✓"). Header/MobileBottomBar cart badges are now live counts. `/cart` (`app/cart/page.tsx`) is a full real cart page (client component — its `title` metadata lives in `app/cart/layout.tsx` since client pages can't export `metadata`).
- **Step 6 (checkout) — PayPal-only, live-tested in sandbox and working.** Deliberate decision: the client is routing ALL card payments through PayPal's own guest card button rather than running a separate Stripe integration — PayPal's Buttons SDK already shows a standalone "Debit or Credit Card" option by default (no code needed to enable it), so one provider covers both "pay with PayPal" and "pay with card." `/checkout` (`components/checkout/CheckoutForm.tsx`) now shows a single Payment panel — `components/checkout/PaypalPaymentSection.tsx` only. `components/checkout/StripePaymentSection.tsx`, `api/checkout/stripe/route.ts`, `api/webhooks/stripe/route.ts`, and `lib/stripe.ts` still exist in the repo but are **no longer referenced by any page** — ask before deleting them outright if this comes up again, since removing them also means dropping the `stripe` npm package and the Stripe env vars from `.env.example`/README; that's a bigger cleanup than just the UI change already made. `lib/orderTotals.ts` still recomputes totals server-side from `lib/products.ts` for the PayPal path — never trusts client-sent prices, per CLAUDE.md 6.1. **Verified working end-to-end**: a real sandbox checkout completed and landed in the `Order` table as `status: paid`, `paymentProvider: paypal`, with a real PayPal `providerReference`. (One snag along the way: the first sandbox business account hit `PAYEE_ACCOUNT_LOCKED_OR_CLOSED` on checkout — a PayPal sandbox-account bug, not a code issue; fixed by creating a fresh sandbox business account + app rather than troubleshooting the broken one.) **Fixed a real redirect bug**: `api/checkout/paypal/create/route.ts` created orders with no `application_context` at all — no `return_url`/`cancel_url`/`brand_name`. PayPal's JS SDK normally completes via an in-page popup (our `onApprove` callback calls `/api/checkout/paypal/capture` and routes to `/checkout/success` itself), but without a return URL, its fallback-to-full-redirect path (triggered by third-party-cookie blocking, which most browsers now do by default, or other popup-blocked conditions) had nowhere correct to send the browser back to — the user got stuck on a PayPal-hosted page needing a manual click, matching a report of "the PayPal window cuts off and doesn't come back." Fixed by adding `application_context: { brand_name, shipping_preference: "NO_SHIPPING", user_action: "PAY_NOW", return_url, cancel_url }` using `NEXT_PUBLIC_SITE_URL` (now set in `.env`). Also hardened `/checkout/success` (`app/checkout/success/page.tsx`) for the redirect-fallback case: PayPal appends `?token=<orderId>` when it redirects the full page back directly, which means our own `onApprove` handler never ran and the order was never captured — that page now detects a `token` query param and calls the capture API itself client-side (wrapped in `Suspense` per the `useSearchParams` convention already used in `ShopCatalog`), showing a brief "Finishing up your order…" state, before falling back to the error state if capture fails. The capture route's `db.order.upsert` keyed on `providerReference` is already idempotent, so this is safe even if both the normal `onApprove` path and this fallback both end up calling capture for the same order.
- **PayHere added as a second payment option alongside PayPal — code-complete, not yet real-tested (no sandbox account created yet).** The client's business is Sri Lanka-based (see the `/why-xtronic` real-history note above), so PayHere — a Sri Lankan gateway with its own sandbox at sandbox.payhere.lk — was added at the user's request. Checkout now shows a 2-column Payment step again: PayPal (with its built-in card button) + PayHere. Architecture: `lib/payhere.ts` (server-only — uses Node's `crypto` for MD5, so it must never be imported from a client component) exports `isPayhereConfigured()`, `computeCheckoutHash()` (the signed hash PayHere's `startPayment()` requires), and `verifyNotifySignature()` (validates the `notify_url` webhook payload the same way). `api/checkout/payhere/create/route.ts` recomputes totals server-side via the same `lib/orderTotals.ts` used by PayPal, generates an order id, and returns a signed payload for the client. `components/checkout/PayHerePaymentSection.tsx` dynamically loads PayHere's JS SDK (`https://www.payhere.lk/lib/payhere.js`) and calls `window.payhere.startPayment()` — note it reads `NEXT_PUBLIC_PAYHERE_MERCHANT_ID`/`NEXT_PUBLIC_PAYHERE_ENV` directly rather than importing anything from `lib/payhere.ts`, for the crypto-import reason above. `api/webhooks/payhere/route.ts` is PayHere's authoritative confirmation path (`notify_url`, sent as form-encoded POST, not JSON) — verifies the signature, then `db.order.upsert`s and sends the confirmation email, same idempotent-by-`providerReference` pattern as the PayPal capture route. **Currency decision**: PayHere's sandbox reliably supports LKR without special merchant approval (unlike USD), so `audCentsToLkrAmount()` converts the AUD total using a static reference rate (`LKR_PER_AUD = 195` in `lib/payhere.ts`) — same "refresh before go-live" caveat as the display-currency table in `lib/currency.ts`. Required a Prisma migration: added `payhere` to the `PaymentProvider` enum in `schema.prisma` (ran via `npx prisma db push`, since this project uses the db-push workflow, not migration files). **This broke the Vercel deploy** — `npx prisma generate` had only ever been run manually in this local environment, so Vercel kept serving a stale cached Prisma Client (generated before `payhere` was added to the enum) and failed TypeScript checking on `api/webhooks/payhere/route.ts`'s `paymentProvider: "payhere"`. Fixed by adding `"postinstall": "prisma generate"` to `package.json` scripts — the standard fix for Prisma + Vercel, since nothing else forces client regeneration on a fresh/cached install there. Any future schema.prisma enum/model change should "just work" on the next deploy now, without needing a reminder to regenerate manually. Also added `phone`/`address`/`city`/`postcode` as actually-controlled form fields on `CheckoutForm.tsx` — they existed as inputs before but were never wired to state (nothing read their values), which went unnoticed while only PayPal (which doesn't need them client-side) was in use; PayHere's required fields forced fixing that. Still needed before this can be tested end-to-end: a PayHere sandbox account + merchant ID/secret (same pattern as the PayPal sandbox setup — can be created independently of the client's live account for testing).
- PayPal webhook signature verification is still stubbed with a TODO (needs `PAYPAL_WEBHOOK_ID` + a call to PayPal's verify-webhook-signature endpoint) — not required for the capture flow to work, since capture happens synchronously via the API call, but would matter for reconciling async refunds/disputes later.
- **Local `.env` now has real sandbox PayPal keys and admin credentials.** `PAYPAL_CLIENT_ID`/`NEXT_PUBLIC_PAYPAL_CLIENT_ID`/`PAYPAL_CLIENT_SECRET` are sandbox keys from a PayPal Developer account (not the client's live business account — those come later at go-live). `ADMIN_USER=admin` / `ADMIN_PASSWORD=admin` for local dev convenience — the site owner should change these before any real deployment. `.env` is gitignored and was never committed.
- **Currency selector — partially done.** `lib/currency.ts` + `lib/currencyStore.ts` + `components/CurrencySelector.tsx` (header, desktop only) let shoppers switch the *displayed* price (`lib/useDisplayPrice.ts`, wired into `ProductCard`, `AddToCartBox`, `QuickViewModal`). Exchange rates are a **static hardcoded table**, not a live daily-refreshed rate (no cron route built). Cart/Checkout/Order totals are still always in AUD — checkout does not charge in the selected display currency yet. This is an intentional scope cut, not a bug: converting the actual charge currency needs Stripe/PayPal presentment-currency wiring in the checkout API routes, not just a display formatter.
- **Quick View modal — done.** `lib/quickViewStore.ts` + `components/QuickViewModal.tsx` (focus-trapped like the cart drawer). `ProductCard`'s "Quick View" button now opens this instead of navigating (falls back to a real link to the PDP if JS never runs).
- **Emails — wired up via Resend, done.** `lib/email.ts` is the shared client: `isEmailConfigured()` (checks `RESEND_API_KEY`, same "gracefully do nothing if unconfigured" pattern as `lib/paypal.ts`'s `isPaypalConfigured()`), `sendEmail()` (never throws — a failed/unconfigured send returns `false` rather than breaking the caller's flow), and template builders (`orderConfirmationEmail`, `newsletterCouponEmail`, `quoteAcknowledgementEmail`, `quoteOwnerNotificationEmail`) that return `{subject, html}`. User-submitted fields (name/organisation/email/message in the quote emails) are run through a local `escapeHtml()` before being interpolated into the HTML body — these come straight from a public form. Wired into: `api/checkout/paypal/capture/route.ts` (sends the buyer an order confirmation — guarded by an `isNewlyPaid` check against the existing DB row so a duplicate capture call, e.g. from the `/checkout/success` redirect-fallback path, can't double-send), `api/newsletter/route.ts` (sends the welcome coupon code), and `api/quote/route.ts` (sends an acknowledgement to the requester, plus a notification to `ORDER_NOTIFICATION_EMAIL` if that's set). `EMAIL_FROM` is optional — defaults to Resend's shared `onboarding@resend.dev` test address, which sends with no domain verification needed; the client should set `EMAIL_FROM` to something on their own verified domain before going live, since the shared address is dev-only. Not done: PayPal webhook-driven emails for refunds/disputes (only the synchronous capture path sends mail right now).
- **Admin page — done.** `/admin/orders` lists Orders and SchoolQuotes from the DB. Gated by `middleware.ts` (HTTP Basic Auth via `ADMIN_USER`/`ADMIN_PASSWORD`) — **returns 503 and is fully inaccessible until those two env vars are set**, by design (never silently open).
- **Not started:** GST-registered Stripe Tax / multi-jurisdiction tax, a live FX-refresh cron route, Vitest/Playwright test suites, coupon redemption at checkout (coupons are issued but nothing currently applies them to an order total).
- **Product photography — done, now multi-image with a swipeable gallery.** `scripts/build-product-photos.mjs` builds `public/products/<slug>/main.jpg` from each product's original source art in `product/<file>.svg`, trimmed/padded/brightness-boosted and composited onto a `1200×900` `#E8F4FE` canvas. It now ALSO looks in a per-product subfolder — `product/<folder>/` (`4wd`, `plane`, `yatch`, `robot`, `Butterfly` — note these don't all match the slug or the base filename, see the `SOURCES` array) — for any additional `.svg` angles the user drops in, and renders each into `2.jpg`, `3.jpg`, ... in filename order. Re-run `node scripts/build-product-photos.mjs` any time new files are added to one of those subfolders. `lib/productImages.ts` (`getProductImages(slug)`) lists whatever image files actually exist for a slug at build time via `fs.readdirSync` (main.jpg first, then natural-sorted) — nothing is hardcoded, so dropping in more images and rebuilding is the entire workflow. `components/ProductGallery.tsx` (client component, used only on the PDP via `app/shop/[slug]/page.tsx`) renders that list as a swipeable carousel: drag/touch via Pointer Events with a `calc(% + px)` transform (no ref reads during render — an earlier version read `ref.current` inside the render body for a width calculation and tripped the `react-hooks/refs` lint rule; fixed by switching to raw pixel offsets composed with CSS `calc()` instead of converting to a percentage in JS), prev/next buttons, dot indicators, and ArrowLeft/ArrowRight keyboard support — degrades to a plain single image with no controls when a product only has one photo. Each slide reuses `ProductImage` internally so a missing/broken file still falls back to the emoji placeholder tile rather than a broken image icon. (Note: while writing the base photo script, chaining `.extend()` directly into `.modulate().resize()` in one sharp pipeline silently produced the wrong output dimensions — a libvips quirk — fixed by materializing an intermediate `.toBuffer()` between them; keep that split if this script is touched again.)
- Logo currently lives at `public/brand/xtronic-logo.jpeg` (source file was a JPEG, not PNG — code references the `.jpeg` path, not the `.png` path this doc originally specified).
- Radius scale from DESIGN.md is wired up as exact Tailwind utilities in `app/globals.css` (`--radius-card: 28px`, `--radius-btn: 11px`, `--radius-btn-xs: 8px`) → use `rounded-card` / `rounded-btn` / `rounded-btn-xs` / `rounded-full` in components, not Tailwind's default `rounded-xl`/`rounded-2xl`/`rounded-3xl` scale, to stay on the documented scale exactly. Interactive elements on navy bands (footer, schools quote CTA) use `focus-visible:outline-brand-amber` instead of the global default blue-deep focus ring, per DESIGN.md's dark-theme focus rule.
- **`/why-xtronic` — rebuilt as the site's about/company page, using the client's real brand history.** The client's previous site (xtronic.cc/about-us) documents real history: started 2018 as "Digicocoon," rebranded to "Ravana PCB" (Feb 2022) then "XTRONIC" (Jul 2022), founder/CEO Thimith Navodya, and — notably — that old page itself lists a 2026 "XTRONIC Junior Five Kit Box" as an upcoming reboot, which is what this whole project actually is. The "Our Story" section on `/why-xtronic` now tells that real timeline (adapted/summarized, not copy-pasted) and credits the founder by name, rather than generic placeholder copy. Deliberately did NOT import that old site's AU-unrelated details (it lists a phone number with a non-AU country code and a personal Gmail contact address) since CLAUDE.md's brief fixes this project's market/operations as Australia/AUD — kept the narrative to "ships from Australia" (operational) rather than any claim about where the company itself is headquartered, so it doesn't contradict the real founding facts. If the client wants real contact details (phone/email) published anywhere on this site, that's an open decision for them, not assumed. Also restyled the reasons grid from plain bordered cards to the same color-blocked bento tone system (`navy`/`surface`/`amber`, some `lg:col-span-2`) used in `components/FeatureBento.tsx`, dropped its emoji icons in favor of a small mono uppercase eyebrow label, and brought headings/table header onto the current Doto/Geist-Mono system — this page hadn't been touched since before the dot-matrix redesign and was visually stale relative to the rest of the site.
- **Footer payment badges — real logos, not text.** `components/PaymentIcons.tsx` renders Visa/Mastercard/Amex/PayPal/Apple Pay/Google Pay/Afterpay as actual inline SVG brand marks (each on a small white chip so they read against the dark footer), replacing the old plain-text chip list. Path data was sourced once from the `simple-icons` npm package (MIT/CC0-licensed, accurate official brand SVGs) and copied directly into this file as hardcoded string constants — the package itself was installed only long enough to read the `.svg` files out of `node_modules` and was then uninstalled, so it's not a runtime dependency (no reason to ship 25MB of unrelated brand icons for 7 logos). One deliberate deviation: Afterpay's official brand hex (`#B2FCE4`) is a pale mint meant for use as a background fill, not an icon's own color — using it directly on a white chip would be nearly invisible, so that one icon is rendered in black (Afterpay's standard monochrome mark) instead of its literal brand hex. If any of these 7 icons are ever regenerated, re-derive from `simple-icons` the same way rather than hand-drawing new paths.
- **Home page product section — replaced.** The original full "Featured Kits" grid (category tabs + all 5 full `ProductCard`s, `components/FeaturedKits.tsx`, deleted) sat directly under the hero/signal-grid and largely duplicated `/shop`, which already has the same catalog with tabs AND sorting (`components/ShopCatalog.tsx` — unaffected, still the full experience). It's replaced by `components/ProductLineup.tsx`: a compact single "Five kits. One workshop." band — 5 small `aspect-[4/5]` photo tiles (name + price on a bottom gradient scrim, no rating/spec pills/add-to-cart) in a `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` row, each linking straight to its PDP, plus one "Explore All Kits →" link to `/shop`. Deliberately lighter/quieter than a full product grid — the full shopping experience (filter, sort, quick view, add to cart) lives only on `/shop` now, not duplicated on the home page.
- **Design system rebuild (dot-matrix / board reference) — in progress.** Fonts switched to `next/font/google` Doto (display headings, `font-heading`/`font-pixel`), Geist (body, `font-body`), Geist Mono (uppercase UI chrome — nav, buttons, labels, `font-mono`), replacing the earlier Baloo 2/Nunito/Silkscreen set — see `app/layout.tsx` + `app/globals.css` theme tokens. `--font-heading` is Doto site-wide (every h1-h6, page titles, hero, section titles, product names) — but **price text is the one deliberate exception**: every component that renders `formatPriceAUD()`/`useDisplayPrice()` as a prominent number (`ProductCard`, `AddToCartBox`, `QuickViewModal`, cart/checkout totals) explicitly uses `font-body` instead of inheriting `font-heading`, because Doto's numerals read poorly at a glance for something a shopper needs to scan quickly. If a new price display is added anywhere, give it `font-body` explicitly rather than leaving it to inherit the heading font. Product emoji (`product.emoji`, e.g. "☀️") were removed from product name headings (`ProductCard`, `QuickViewModal`, the PDP `h1`) — the `emoji` field still exists on `Product` and is still used only as the `ProductImage` fallback icon (shown if a real photo fails to load) and was NOT removed from that role. Small product-icon badges in `CartDrawer`, `app/cart/page.tsx`, and `CheckoutForm`'s order summary were upgraded from a plain emoji span to a real `ProductImage` thumbnail using `item.image`, now that real product photos exist (see below) — a strict improvement, not just an emoji removal. `Header` and `Footer` are now solid `bg-brand-navy` (dropped the old light blue/amber gradient header) for nav→hero→footer continuity. `Hero` has a masked radial dot-grid background and a subtitle line inside the `<h1>`. New home sections: `components/SignalGrid.tsx` (48×48 dot-matrix rendered from the actual product artwork — the SVGs in `product/` at the repo root wrap embedded raster illustrations, not flat vectors, so `scripts/rasterize-products.mjs` trims to content bounds, pads 6%, boosts brightness/saturation and floors HSL lightness before sampling, or the dark shadow tones in the source art blend into the navy section background. The script writes both `lib/generated/signalGrids.json` — per-cell hex colors, used to render the live DOM grid — and a same-fidelity `public/generated/signal/<slug>.png` per kit (currently unused by any page, kept as a byproduct in case it's useful as a placeholder product image later). Centered under the section heading in a bordered panel with the product name overlaid in white at the bottom; selector buttons sit below. Auto-advances through the 5 kits every ~4.8s with a direct staggered per-cell dissolve between products (deterministically seeded per-cell delay, not `Math.random()`, to avoid an SSR/CSR hydration mismatch). A mid-transition stop on the XTRONIC logo was tried and reverted — added too much lag for the payoff. Deliberately has **no** continuous per-cell animation — an earlier version flickered every lit cell's opacity independently forever and that, combined with ~3000+ simultaneously-animating DOM nodes at a higher resolution, was both laggy and made the shape unreadable ("random pieces"). The only always-on motion is one cheap full-panel sweep overlay. Collapses to an instant swap under `prefers-reduced-motion`. Re-run the script if the source SVGs in `product/` change.), `components/FeatureBento.tsx` (replaces the old `WhyChoose`/`HowItWorks` — both deleted — as one color-blocked bento grid with 2-col-span tiles), `components/SpecsSection.tsx` (dl/dt/dd kit specs), `components/StatementBand.tsx` (large pull-quote on a dark band), `components/SignupBand.tsx` (large two-column gold newsletter band — `components/NewsletterForm.tsx` now takes a `variant: "footer" | "band"` prop rather than being duplicated). `DESIGN.md` still describes the previous ("Nothing"-derived, light-canvas) system and needs a rewrite to match this once it's confirmed against the reference. Not yet done: any Lineup-style bento product-card treatment beyond the existing `FeaturedKits` grid.
