# MOOD Beauty V2 — Migration Documentation & Progress

> **Source project:** `dorosh-studio-next-js` (Next.js 13.5.6 + MUI 5)
> **Target project:** `mood-beauty-v2` (Next.js 16.1.6 + Tailwind CSS 4 + Radix UI)
> **Start date:** 2026-02-06
> **Status:** 🟢 Feature Complete — QA phase

---

## Migration Strategy

**Approach:** Parallel project — build the new project from scratch, gradually migrating all pages, components, logic, and content from the old project. When ready — switch deployment.

**Why this approach:**
- Old project uses Next.js 13 with Pages Router patterns mixed with App Router — too many breaking changes to upgrade in-place
- MUI → Radix UI + Tailwind is a complete styling paradigm shift — no gradual migration possible
- Parallel development allows the old site to remain live while we build the new one
- Clean codebase from day one, no legacy patterns

**Architecture decisions:**
- TypeScript (strict mode) instead of JavaScript
- Tailwind CSS 4 for styling (utility-first, no more sx props)
- Radix UI for accessible, unstyled primitives (Dialog, Accordion, Select, etc.)
- next/font for font optimization (same as before)
- App Router only (no pages directory)
- Path aliases: `@/*` → `./src/*`

---

## Color Palette (from old theme.js)

| Token | Value | Usage |
|-------|-------|-------|
| `black` | `#000000` | Primary color, text |
| `white` | `#ffffff` | Secondary, backgrounds |
| `charcoal` | `#1a1a1a` | Info color |
| `light-gray` | `#f2f0f7` | Alternate background, form inputs |
| `gold` | `#D4AF37` | Accent (not actively used) |
| `crimson` | `#DC143C` | Error states |
| `green` | `#18b518` | Success states |

## Typography (from old theme.js)

| Element | Font | Sizes (xs / md / lg) |
|---------|------|---------------------|
| h1 | Cormorant Garamond 700 | 2.5rem / 3rem / 3.5rem |
| h2 | Cormorant Garamond | 2.2rem / 2.8rem / 3.2rem |
| h3 | Cormorant Garamond 600 | 20px / 24px / 28px |
| h4 | Cormorant Garamond | 1.4rem / 1.6rem / 1.8rem |
| body1 | Montserrat | 1rem / 1.1rem / 1.2rem |
| body2 | Montserrat | 1rem / 1.1rem / 1.2rem |
| caption | Cormorant Garamond | 1.2rem, letter-spacing: 3px |

---

## Phase 1: Project Skeleton 🏗️

Setup the foundation: config, fonts, CSS variables, layout structure.

### Checklist

- [x] **1.1** Configure `next.config.ts` (env vars, images, compression, etc.) ✅ 2026-02-06
- [x] **1.2** Setup fonts (Cormorant Garamond + Montserrat via `next/font/google`) ✅ 2026-02-06
- [x] **1.3** Setup Tailwind CSS 4 theme (colors, typography, breakpoints as CSS variables) ✅ 2026-02-06
- [x] **1.4** Install Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-accordion`, etc.) ✅ 2026-02-06
- [x] **1.5** Create root `layout.tsx` (html lang="de", fonts, metadata, base structure) ✅ 2026-02-06
- [x] **1.6** Create global CSS with design tokens ✅ 2026-02-06
- [x] **1.7** Setup path aliases (`@/*` → `./src/*`) — already done in tsconfig ✅ 2026-02-06

### Notes
- Old project uses `REACT_APP_API_URL` env var — kept as-is for compatibility
- Old project has `reactStrictMode: false` — enabled `true` in new project
- Image domains migrated from `domains` (deprecated) to `remotePatterns` (new Next.js API)
- ⚠️ **IMPORTANT:** `next/font` requires plain string literals (`"..."`) not template literals (`` `...` ``). Turbopack enforces this at build time. Font loader is the ONLY place where we must use `"..."` instead of backticks.

---

## Phase 2: Core Components 🧱

Migrate shared components used across all pages.

### Checklist

- [x] **2.1** `Header` — sticky header with logo + hamburger menu, blur backdrop ✅ 2026-02-06
- [x] **2.2** `LogoLink` — conditional link (static on `/`, link on other pages) ✅ 2026-02-06
- [x] **2.3** `Logo` — SVG logo via `next/image` ✅ 2026-02-06
- [x] **2.4** `Menu` — fullscreen navigation using **Radix Dialog** (replaces MUI Drawer) ✅ 2026-02-06
- [x] **2.5** `Footer` — integrated into `layout.tsx` (copyright + links) ✅ 2026-02-06
- [x] **2.6** `Breadcrumbs` — dynamic path-based breadcrumbs with segment labels ✅ 2026-02-06
- [x] **2.7** `CookieBanner` — cookie consent with **Radix Accordion** for details ✅ 2026-02-06
- [x] **2.8** `AnalyticsScripts` — GA4 + Google Ads scripts (production only) ✅ 2026-02-06
- [x] **2.9** `PhoneTrackingHandler` — global `tel:` link click tracking ✅ 2026-02-06
- [x] **2.10** `LocalBusinessSchema` — JSON-LD structured data for BeautySalon ✅ 2026-02-06
- [x] **2.11** `lib/gtm.ts` — Google Ads conversion tracking functions ✅ 2026-02-06
- [x] **2.12** `types/global.d.ts` — TypeScript declarations for `window.gtag` ✅ 2026-02-06
- [x] **2.13** Updated `layout.tsx` — integrated all components (Header, Breadcrumbs, CookieBanner, etc.) ✅ 2026-02-06
- [x] **2.14** `OptimizedImage` — wrapper around `next/image` with loading skeleton, error fallback, blur placeholder ✅ 2026-02-06
- [x] **2.15** `ContactSection` — contact info block (phone, email, address, social links) ✅ 2026-02-06
- [x] **2.16** `ParallaxHero` — hero section with parallax scroll effect, dark overlay, headline/subheadline ✅ 2026-02-06
- [x] **2.17** `RevealSection` — IntersectionObserver-based reveal with image + text, configurable `imageSide` ✅ 2026-02-06
- [x] **2.18** `ScrollGallery` — scroll-driven parallax card gallery (3 images, stacked layout) ✅ 2026-02-06
- [x] **2.19** `MosaicGallery` — mosaic grid gallery with **Radix Dialog** lightbox, keyboard navigation ✅ 2026-02-06

### Notes
- Menu items from old project: Home, Über uns, Unsere Services, Preisliste, Online Termin + sub-links (Datenschutz, Impressum)
- Header uses `backdrop-filter: blur(8px)` for sticky mode, transparent background
- **MUI Drawer → Radix Dialog:** Fullscreen overlay with slide-in animation, same visual structure preserved
- **MUI Accordion → Radix Accordion:** Used in CookieBanner for cookie details, with chevron rotation animation
- CookieBanner manages `document.cookie` and `window.gtag` — logic preserved 1:1
- All SVG icons are inline (no icon library dependency) — replaces `@mui/icons-material`
- Analytics scripts only render on production (`moodbeauty.de`) — same behavior as old project
- Added CSS keyframe animations: `fadeIn` (overlay), `slideInRight` (menu drawer)
- **OptimizedImage:** Supports `fill` and fixed-size modes, loading skeleton with `animate-pulse`, error fallback with German text, blur placeholder, smooth opacity transition on load
- **ParallaxHero:** Uses `requestAnimationFrame` for smooth parallax, `will-change: transform` + `contain: paint` for GPU compositing, dark gradient overlay
- **RevealSection:** `IntersectionObserver` with `threshold: 0.2`, staggered animation (image → text), configurable `imageSide` (left/right)
- **ScrollGallery:** 3-card stacked layout with scroll-driven transforms, each card at different `z-index` and `scale`, refs used for direct DOM manipulation (no React re-renders)
- **MosaicGallery:** Mosaic grid with repeating 6-tile pattern (tall/square), **Radix Dialog** lightbox with keyboard navigation (←/→), image counter, close/prev/next buttons with `backdrop-blur`
- **ContactSection:** Server component (no `"use client"`), phone/email/address/social links with inline SVG icons for Facebook & Instagram

---

## Phase 3: Pages Content Migration 📄

Migrate all pages preserving texts, metadata, and structure.

### Checklist

- [x] **3.1** Home page (`/`) — ParallaxHero, HomeServices, UberMoodSection, PricePreview, ContactSection ✅ 2026-02-06
- [x] **3.2** Services index (`/services`) — category grid with images ✅ 2026-02-06
- [x] **3.3** Services: Permanent Make-up (`/services/permanent-make-up`) — category info page ✅ 2026-02-06
- [x] **3.4** Services: Powder Brows (`/services/permanent-make-up/powder-brows`) ✅ 2026-02-06
- [x] **3.5** Services: Hairstroke (`/services/permanent-make-up/hairstroke`) ✅ 2026-02-06
- [x] **3.6** Services: Velvet Lips (`/services/permanent-make-up/velvet-lips`) ✅ 2026-02-06
- [x] **3.7** Services: Wimpernkranz (`/services/permanent-make-up/wimpernkranz`) ✅ 2026-02-06
- [x] **3.8** Services: Nails (`/services/nails`) ✅ 2026-02-06
- [x] **3.9** Services: Lashes & Brows (`/services/lashes-und-brows`) ✅ 2026-02-06
- [x] **3.10** Preisliste (`/preisliste`) — price list with PriceMenu component ✅ 2026-02-06
- [x] **3.11** Über uns (`/ueber-uns`) — about page with parallax, galleries, lists ✅ 2026-02-06
- [x] **3.12** Impressum (`/impressum`) — legal page ✅ 2026-02-06
- [x] **3.13** Datenschutz (`/datenschutz`) — privacy policy page ✅ 2026-02-06
- [x] **3.14** Booking (`/booking`) — booking form page with full logic ✅ 2026-02-07
- [x] **3.15** Termin stornieren (`/termin-stornieren/[token]`) — appointment cancellation ✅ 2026-02-07

### Notes
- All texts are in German (de) — preserve exactly
- All metadata (title, description, keywords, openGraph) must be preserved
- Images path: `/images/design/...` — all images copied from old `public/` folder ✅
- Über uns page has complex layout with RevealSection, ScrollGallery, Lists
- **Home page:** Mobile-first approach, all 5 sections migrated (ParallaxHero → HomeServices → UberMoodSection → PricePreview → ContactSection)
- **HomeServices:** Uses `categoriesData` from `staticData.ts`, grid layout with `OptimizedImage`, hover effects
- **UberMoodSection:** Text block + `ScrollGallery` with 3 studio images, "Mehr über uns" link
- **PricePreview:** Server-side data fetching via `servicesService.getServices()`, price/time formatting, top-3 services per category
- **CSS utilities added:** `.card-service`, `.card-service-overlay`, `.card-service-title`, `.card-service-desc`, `.price-row`, `.price-name`, `.price-value`, `.price-time`, `.btn-outline-white`, `.btn-outline-dark`, `.section-padding`, `.container-narrow`
- **Impressum & Datenschutz:** Legal pages migrated word-for-word. All German legal text preserved exactly as-is. MUI components replaced with semantic HTML (`h1`-`h4`, `p`, `ul/li`) + Tailwind utility classes (`.legal-heading-2`, `.legal-heading-3`, `.legal-heading-4`, `.legal-body`, `.legal-list`)
- **Service pages:** All buttons use the 3-part class pattern: `.btn` (base) + `.btn-sm`/`.btn-md` (size) + `.btn-primary`/`.btn-secondary` (variant)
- **Preisliste:** Server-side data fetching, `PriceMenu` component with category → subcategory → service hierarchy, price range display, duration formatting
- **ScrollToTop:** Client component in `layout.tsx` — resets scroll to top on every route change, fixing sticky header offset issue

---

## Phase 4: Booking Logic & Forms 📋

The most complex part — multi-step booking form with state management.

### Checklist

- [x] **4.1** `BookingFormContainer` — main orchestrator (stepper, state, navigation) ✅ 2026-02-07
- [x] **4.2** `CategoryForm` — service category selection ✅ 2026-02-07
- [x] **4.3** `SubCategoryForm` — sub-category selection ✅ 2026-02-07
- [x] **4.4** `ServiceSelectionForm` — specific service selection ✅ 2026-02-07
- [x] **4.5** `ServicesList` — list of available services ✅ 2026-02-07
- [x] **4.6** `AddServiceQuestion` — "add another service?" step ✅ 2026-02-07
- [x] **4.7** `EmployeeSelectionStep` — employee selection (any/specific/multiple) ✅ 2026-02-07
- [x] **4.8** `CalendarForm` — date picker with available slots ✅ 2026-02-07
- [x] **4.9** `CalendarOverview` — selected date/time overview ✅ 2026-02-07
- [x] **4.10** `CustomerForm` — customer data input (name, email, phone, message) ✅ 2026-02-07
- [x] **4.11** `Confirmation` — booking confirmation view ✅ 2026-02-07
- [x] **4.12** `SelectedServicesSummary` — summary of selected services ✅ 2026-02-07
- [x] **4.13** `AppointmentCancellation` — cancellation flow with modal dialog ✅ 2026-02-07
- [x] **4.14** `PriceMenu` — price list component (migrated to Tailwind CSS) ✅ 2026-02-06

### Notes
- BookingFormContainer has ~15 state variables and complex step logic — all preserved 1:1
- Calendar uses `dayjs` library — kept as-is
- Form validation is manual (no form library) — preserved as-is
- Employee selection has 3 modes: any, specific, multiple — all working
- Google Analytics tracking at each funnel step — all tracking calls preserved
- **Design changes vs old project:**
  - ServiceSelectionForm: MUI Accordions → flat show/hide design (no card wrapper, no shadows)
  - SubCategoryForm: pill-chips tried, reverted to list with white bg + border (no gray box)
  - CategoryForm: `auto-fill` grid with `minmax(260px, 1fr)` — responsive without shrinking
  - Stepper: frosted glass sticky header, white numbers in black circles
  - All "Zurück" buttons: green outlined pill style (matches AddServiceQuestion)
  - AppointmentCancellation: cancellation form moved to modal dialog with backdrop blur
  - Booking form headings use Montserrat instead of Cormorant (`.booking-form h1-h6`)
  - Content centered with `max-w-[768px]` on desktop
- **Dead code removed:** EmployeeSelector was removed from CalendarForm (unused when employee selection happens on separate step, and returns `null` otherwise)

---

## Phase 5: API Routes, Services & Infrastructure 🔧

### Checklist

- [x] **5.1** API: `/api/qr-track` — QR scan tracking proxy ✅ 2026-02-06
- [x] **5.2** API: `/api/coupon-qr-track` — coupon QR tracking proxy ✅ 2026-02-06
- [x] **5.3** API: `/api/ga-track` — GA scan tracking proxy ✅ 2026-02-06
- [x] **5.4** API: `/api/ga1-track` — GA1 tracking proxy ✅ 2026-02-06
- [x] **5.5** API: `/api/ga2-track` — GA2 tracking proxy ✅ 2026-02-06
- [x] **5.6** API: `/api/link-track` — link click tracking proxy ✅ 2026-02-06
- [x] **5.7** Route: `/ig` — Instagram bio redirect with tracking ✅ 2026-02-06
- [x] **5.8** Service: `services.service` — fetch public services ✅ 2026-02-06
- [x] **5.9** Service: `calendar.service` — fetch time slots & nearest slots ✅ 2026-02-07
- [x] **5.10** Service: `appointments.service` — create/get/cancel appointments ✅ 2026-02-07
- [x] **5.11** Lib: `ga.ts` — Google Analytics 4 event tracking (full booking funnel) ✅ 2026-02-07
- [x] **5.12** Lib: `gtm.ts` — Google Ads conversion tracking ✅ 2026-02-06
- [x] **5.13** Component: `AnalyticsScripts` — GA/GTM script injection ✅ 2026-02-06
- [x] **5.14** Component: `PhoneTrackingHandler` — phone click tracking ✅ 2026-02-06
- [x] **5.15** Component: `LocalBusinessSchema` — JSON-LD structured data ✅ 2026-02-06
- [ ] **5.16** Component: `PerformanceMonitor` — web vitals monitoring (optional, low priority)
- [x] **5.17** `robots.ts` — robots.txt generation ✅ 2026-02-06
- [x] **5.18** `sitemap.ts` — sitemap.xml generation ✅ 2026-02-06
- [x] **5.19** `middleware.ts` — empty middleware (manifest fix) ✅ 2026-02-06
- [x] **5.20** Utils: `formatters` — time, price, date formatters ✅ 2026-02-06
- [x] **5.21** Utils: `slugify` — URL slug generation ✅ 2026-02-07
- [ ] **5.22** Utils: `performance` — performance measurement (optional, low priority)
- [x] **5.23** Constants: `enums` — booking enums ✅ 2026-02-07
- [x] **5.24** Constants: `errors` — error codes ✅ 2026-02-07
- [x] **5.25** Constants: `staticData` — categories and services static data ✅ 2026-02-06
- [x] **5.26** Component: `ScrollToTop` — scroll-to-top on route change ✅ 2026-02-06
- [x] **5.27** Component: `CategoryInfo` — service category info block ✅ 2026-02-06
- [x] **5.28** Component: `SubCategoryCardInfo` — sub-category service cards ✅ 2026-02-06

### Notes
- All API routes proxy to `http://127.0.0.1:3500/` (local backend)
- `REACT_APP_API_URL` used for client-side service calls
- GA tracking only fires on production (`moodbeauty.de`)
- Google Ads conversion ID: `AW-11025863414/yj9bCIWyoLobEPalxYkp`

---

## Phase 6: Deployment & CI/CD 🚀

Replace old project files in `dorosh-studio-next-js` repo with the new `mood-beauty-v2` codebase. CI/CD workflows deploy automatically on push.

### Staging deployment (branch: `staging`)

- [x] **6.0.1** Switch to `staging` branch in `dorosh-studio-next-js` ✅ 2026-02-12
- [x] **6.0.2** Delete all old project files (keep `.git/` and `.github/`) ✅ 2026-02-12
- [x] **6.0.3** Copy all files from `mood-beauty-v2` (`src/`, `public/`, `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`, `MIGRATION.md`) ✅ 2026-02-12
- [x] **6.0.4** Update `.github/workflows/deploy-staging.yml` ✅ 2026-02-12
  - `actions/setup-node@v3` → `@v4`
  - `node-version: '18'` → `'22'`
  - tar: `next.config.js` → `next.config.ts tsconfig.json postcss.config.mjs`
  - Workflow name: `Dorosh Studio` → `Mood Beauty`
- [x] **6.0.5** Fix `ga.ts` type error: `Record<string, unknown>` → `GtagEventParams` ✅ 2026-02-12
- [x] **6.0.6** Regenerate `package-lock.json` (npm 11 lockfileVersion 3 compatibility) ✅ 2026-02-12
- [x] **6.0.7** Remove `qualities` from `next.config.ts` (caused 400 on `?q=90`) ✅ 2026-02-12
- [x] **6.0.8** Fix `.env` heredoc (YAML indentation added leading spaces to env vars) ✅ 2026-02-12
- [x] **6.0.9** Add PM2 ecosystem config to staging workflow (same as production) ✅ 2026-02-12
- [x] **6.0.10** Install Node 22 on EC2 via nvm (`nvm install 22 && nvm alias default 22`) ✅ 2026-02-12
- [x] **6.0.11** Add `nvm use 22` to both deploy workflows (SSH script section) ✅ 2026-02-12
- [x] **6.0.12** Add old file cleanup to deploy scripts (`rm -f next.config.js jsconfig.json .eslintrc.json .editorconfig`) ✅ 2026-02-12
- [x] **6.0.13** Fix `npm ci` timeout on EC2 — replaced with `npm install --omit=dev` ✅ 2026-02-12
- [x] **6.0.14** Reverted staging PM2 to simple `pm2 start npm` (ecosystem config caused issues) ✅ 2026-02-12
- [ ] **6.0.15** Verify staging deployment at `https://staging.moodbeauty.de/`

### Production deployment (branch: `master`)

Repeat the same steps as staging on `master` branch:

- [ ] **6.1.1** Install Node 22 on **production** EC2 via nvm (same as staging: `nvm install 22 && nvm alias default 22`)
- [ ] **6.1.2** Merge `staging` → `master` (or cherry-pick) after staging QA passes
- [x] **6.1.3** Update `.github/workflows/deploy.yml` ✅ 2026-02-12
  - `actions/setup-node@v3` → `@v4`
  - `node-version: '18'` → `'22'`
  - tar: `next.config.js` → `next.config.ts tsconfig.json postcss.config.mjs`
  - Workflow name: `Dorosh Studio` → `Mood Beauty`
  - SSH script: added `nvm use 22`, old file cleanup, ecosystem config
- [ ] **6.1.4** Verify production deployment at `https://moodbeauty.de/`

### EC2 server notes

#### Node.js version (CRITICAL)

EC2 servers had **Node 18** installed. Next.js 16 requires **>= 20.9.0**. PM2 uses the system Node to run the app, so even though CI builds with Node 22, the **EC2 runtime** must also have Node 22.

**Symptom:** PM2 shows `errored` status, logs show `You are using Node.js 18.20.8. For Next.js, Node.js version ">=20.9.0" is required.` in a loop (15 restarts then gives up).

**Fix:** Install Node 22 via nvm on each EC2 server:
```bash
ssh <ec2-host>
source ~/.nvm/nvm.sh
nvm install 22
nvm alias default 22
nvm use 22
node --version  # should show v22.x.x
```

The deploy workflows now include `nvm use 22` in the SSH script section, so PM2 will always start with Node 22.

**IMPORTANT for production:** Node 22 must be installed on the production EC2 **before** the first deploy, otherwise the same 502 error will occur.

#### .env file creation

**Problem:** Using YAML heredoc (`cat > .env << 'EOF' ... EOF`) inside the workflow SSH script adds leading spaces from YAML indentation to the file content. Result: `            REACT_APP_API_URL=...` instead of `REACT_APP_API_URL=...`. Next.js cannot parse env vars with leading spaces.

**Fix:** Use `echo 'VAR=value' > .env` instead of heredoc.

#### Old files from previous project

**Problem:** `tar xzf` only overwrites files that exist in the archive. Old files like `next.config.js`, `jsconfig.json`, `.eslintrc.json`, `.editorconfig` from the JS project remain on disk and can conflict with the new TS project (e.g., Next.js may load `next.config.js` instead of `next.config.ts`).

**Fix:** Deploy scripts now include `rm -f next.config.js jsconfig.json .eslintrc.json .editorconfig` before extracting the archive. For the first production deploy, a more thorough cleanup is recommended:

```bash
# One-time cleanup before first production deploy (recommended)
ssh <ec2-production-host>
source ~/.nvm/nvm.sh && nvm install 22 && nvm alias default 22
cd /var/www/dorosh-studio
pm2 delete dorosh-studio || true
rm -rf .next node_modules src public package.json package-lock.json next.config.js jsconfig.json .eslintrc.json .editorconfig
# Then let the workflow deploy fresh
```

#### npm ci vs npm install

**Problem:** `npm ci --omit=dev` hangs indefinitely on EC2 (10-minute timeout). The `package-lock.json` was generated with npm 11 (lockfileVersion 3) locally, but EC2's npm 10 (via Node 22) struggles with it. `npm ci` deletes entire `node_modules` and reinstalls from scratch — on a t3.small instance this can OOM or timeout.

**Fix:** Use `npm install --omit=dev` instead. It's more forgiving with lockfile version mismatches and doesn't wipe `node_modules` first, so subsequent deploys are faster.

#### PM2 start command

Staging uses the simple inline format: `pm2 start npm --name dorosh-studio-staging -- start -- -p 3001`. Production uses `ecosystem.config.cjs` for additional features (timestamps, log formatting). Both approaches work — the simple format is more reliable for staging where we iterate quickly.

### Staging-specific differences from production

| Aspect | Staging | Production |
|--------|---------|------------|
| Branch | `staging` | `master` |
| API URL | `https://crm-staging.moodbeauty.de/` | `https://crm.moodbeauty.de/` |
| PM2 name | `dorosh-studio-staging` | `dorosh-studio` |
| URL | `https://staging.moodbeauty.de/` | `https://moodbeauty.de/` |
| EC2 secrets | `STUDIO_EC2_STAGING_*` | `STUDIO_EC2_*` |

---

## Phase 7: Final QA ✅

- [x] **7.1** Copy all images from old `public/images/` to new project ✅ 2026-02-06
- [ ] **7.2** Verify all routes match exactly (no broken links)
- [ ] **7.3** Test responsive design (mobile, tablet, desktop)
- [ ] **7.4** Test booking flow end-to-end
- [ ] **7.5** Test cookie banner functionality
- [ ] **7.6** Verify all metadata and SEO tags
- [ ] **7.7** Verify analytics tracking (GA4, GTM, Google Ads)
- [ ] **7.8** Performance audit (Lighthouse)
- [ ] **7.9** Accessibility audit
- [ ] **7.10** Cross-browser testing

---

## Decision Log 📝

| Date | Decision | Reason |
|------|----------|--------|
| 2026-02-06 | Parallel project approach | Clean migration, old site stays live |
| 2026-02-06 | TypeScript instead of JS | Better type safety, modern standard |
| 2026-02-06 | Tailwind CSS 4 + Radix UI | Replace MUI completely, utility-first styling |
| 2026-02-06 | Keep `dayjs` for calendar | Already used, lightweight, works well |
| 2026-02-06 | Plan: Skeleton → Content → Logic | Build foundation first, then fill in content, then add interactivity |
| 2026-02-06 | `next/font` requires `"..."` not `` `...` `` | Turbopack enforces plain string literals for font loader values |
| 2026-02-06 | Use `remotePatterns` not `domains` | `domains` is deprecated in Next.js 16, `remotePatterns` is the new API |
| 2026-02-06 | Enable `reactStrictMode: true` | Better development experience, catches bugs early |
| 2026-02-06 | Dev server on port 3001 | Port 3000 is occupied by another project |
| 2026-02-06 | `OptimizedImage` with skeleton + error fallback | Better UX than MUI's approach, no layout shift |
| 2026-02-06 | `MosaicGallery` lightbox via Radix Dialog | Replaces custom MUI-based modal, accessible by default |
| 2026-02-06 | Direct DOM refs in `ScrollGallery` | Avoids React re-renders on every scroll frame for 60fps performance |
| 2026-02-06 | Mobile-first approach for all pages | User requirement — build mobile layout first, then scale up with responsive breakpoints |
| 2026-02-06 | `PricePreview` as server component | Data fetched server-side via `servicesService.getServices()`, no client-side fetching needed |
| 2026-02-06 | CSS utility classes instead of inline Tailwind for repeated patterns | `.card-service`, `.price-row`, etc. — keeps JSX clean, easier to maintain consistent styling |
| 2026-02-06 | `ScrollToTop` component for route changes | Next.js App Router + sticky header causes 70px scroll offset on navigation — `usePathname` + `scrollTo(0,0)` fixes it |
| 2026-02-06 | `CategoryCardInfo` inlined in services page | Old project had a separate component, new project uses direct JSX in `services/page.tsx` — simpler, less abstraction |
| 2026-02-06 | `AboutSection` inlined in über-uns page | Old project had a separate component, new project uses direct JSX — same pattern as CategoryCardInfo |
| 2026-02-06 | Base `btn` class required on all buttons | Custom button system uses `.btn` + size (`.btn-sm`/`.btn-md`/`.btn-lg`) + variant (`.btn-primary`/`.btn-secondary`) — all three required |
| 2026-02-06 | API routes proxy to local backend | All tracking routes proxy to `http://127.0.0.1:3500/` with header forwarding (x-forwarded-for, user-agent, etc.) |
| 2026-02-07 | Flat design replaces MUI Accordions for service selection | User preference — show/hide without card wrappers, shadows, or accordion UI |
| 2026-02-07 | `unoptimized` on API images | Next.js 16 blocks private IP in image optimizer; API images already avif — no optimization needed |
| 2026-02-07 | `auto-fill` + `minmax(260px, 1fr)` for category grid | Cards never shrink below 260px, auto-wrap to new rows — responsive without breakpoint-based columns |
| 2026-02-07 | Montserrat for booking form headings only | Scoped via `.booking-form h1-h6` CSS rule — rest of project keeps Cormorant |
| 2026-02-07 | Modal dialog for appointment cancellation | Better UX than inline form — clear separation, focused action, backdrop blur |
| 2026-02-07 | EmployeeSelector removed from CalendarForm | Dead code path — returns `null` in all reachable scenarios, employee selection handled on separate step |
| 2026-02-07 | `formatMonthYear` uses `Dayjs` type import | Structural type was incompatible with `dayjs` `ManipulateType` — direct import fixes it |
| 2026-02-07 | `new URL()` format for `remotePatterns` in next.config | Next.js 15.3+ syntax — cleaner than object notation |
| 2026-02-12 | Node 22 for CI/CD | Next.js 16 requires Node >= 18.18; Node 22 is current LTS |
| 2026-02-12 | Remove `qualities` from next.config | Caused 400 errors on staging — Next.js production mode rejects unlisted quality values |
| 2026-02-12 | `GtagEventParams` type for `sendGaEvent` | `Record<string, unknown>` was incompatible with `window.gtag` type signature |
| 2026-02-12 | Regenerate `package-lock.json` | npm 11 (local) lockfile was incompatible with npm 10 (CI Node 22) — caused `Exit handler never called` |
| 2026-02-12 | Node 22 on EC2 via nvm | EC2 had Node 18, Next.js 16 needs >= 20.9.0 — PM2 crashed in loop with 502 |
| 2026-02-12 | `nvm use 22` in deploy SSH scripts | PM2 inherits shell's Node version — must activate nvm before `npm ci` and `pm2 start` |
| 2026-02-12 | `echo` instead of heredoc for `.env` | YAML indentation in heredoc adds leading spaces to env var values — breaks parsing |
| 2026-02-12 | `rm -f old-config-files` in deploy scripts | `tar xzf` doesn't delete files not in archive — old `next.config.js` conflicts with new `next.config.ts` |
| 2026-02-12 | PM2 ecosystem config for staging | Inline `pm2 start npm --name` is fragile — `ecosystem.config.cjs` is more reliable and consistent with production |
| 2026-02-12 | `npm install` instead of `npm ci` on EC2 | `npm ci` hangs on t3.small with lockfileVersion 3 mismatch — `npm install` is more forgiving and faster on subsequent deploys |
| 2026-02-12 | Reverted staging to simple `pm2 start npm` | ecosystem.config.cjs was part of changes that caused timeout — reverted to keep staging simple and working |

---

## File Mapping (Old → New)

| Old Path | New Path | Status |
|----------|----------|--------|
| `src/theme.js` | `src/app/globals.css` (CSS vars) | ✅ Done |
| `src/app/layout.js` | `src/app/layout.tsx` | ✅ Done |
| `src/app/page.js` | `src/app/page.tsx` | ✅ Done |
| `src/app/booking/page.js` | `src/app/booking/page.tsx` | ✅ Done |
| `src/app/services/page.js` | `src/app/services/page.tsx` | ✅ Done |
| `src/app/services/*/page.js` | `src/app/services/*/page.tsx` | ✅ Done |
| `src/app/preisliste/page.js` | `src/app/preisliste/page.tsx` | ✅ Done |
| `src/app/ueber-uns/page.js` | `src/app/ueber-uns/page.tsx` | ✅ Done |
| `src/app/impressum/page.js` | `src/app/impressum/page.tsx` | ✅ Done |
| `src/app/datenschutz/page.js` | `src/app/datenschutz/page.tsx` | ✅ Done |
| `src/app/termin-stornieren/[token]/page.js` | `src/app/termin-stornieren/[token]/page.tsx` | ✅ Done |
| `src/app/ig/route.js` | `src/app/ig/route.ts` | ✅ Done |
| `src/app/api/*/route.js` | `src/app/api/*/route.ts` | ✅ Done |
| `src/app/robots.js` | `src/app/robots.ts` | ✅ Done |
| `src/app/sitemap.js` | `src/app/sitemap.ts` | ✅ Done |
| `src/components/Header/Header.js` | `src/components/Header/Header.tsx` | ✅ Done |
| `src/components/Menu/Menu.js` | `src/components/Menu/Menu.tsx` | ✅ Done |
| `src/components/Logo/Logo.js` | `src/components/Logo/Logo.tsx` | ✅ Done |
| `src/components/LogoLink/LogoLink.js` | `src/components/LogoLink/LogoLink.tsx` | ✅ Done |
| `src/components/Breadcrumbs/Breadcrumbs.js` | `src/components/Breadcrumbs/Breadcrumbs.tsx` | ✅ Done |
| `src/components/CookieBanner/CookieBanner.js` | `src/components/CookieBanner/CookieBanner.tsx` | ✅ Done |
| `src/components/OptimizedImage/OptimizedImage.js` | `src/components/OptimizedImage/OptimizedImage.tsx` | ✅ Done |
| `src/components/ContactSection/ContactSection.js` | `src/components/ContactSection/ContactSection.tsx` | ✅ Done |
| `src/components/Parallax/ParallaxHero.js` | `src/components/Parallax/ParallaxHero.tsx` | ✅ Done |
| `src/components/Parallax/RevealSection.js` | `src/components/Parallax/RevealSection.tsx` | ✅ Done |
| `src/components/Parallax/ScrollGallery.js` | `src/components/Parallax/ScrollGallery.tsx` | ✅ Done |
| `src/components/HomeServices/HomeServices.js` | `src/components/HomeServices/HomeServices.tsx` | ✅ Done |
| `src/components/UberMoodSection/UberMoodSection.js` | `src/components/UberMoodSection/UberMoodSection.tsx` | ✅ Done |
| `src/components/PricePreview/PricePreview.js` | `src/components/PricePreview/PricePreview.tsx` | ✅ Done |
| `src/components/PriceMenu/PriceMenu.js` | `src/components/PriceMenu/PriceMenu.tsx` | ✅ Done |
| `src/components/BookingForm/*.js` | `src/components/BookingForm/*.tsx` | ✅ Done |
| `src/components/AppointmentCancellation/AppointmentCancellation.js` | `src/components/AppointmentCancellation/AppointmentCancellation.tsx` | ✅ Done |
| `src/components/Analytics/AnalyticsScripts.js` | `src/components/Analytics/AnalyticsScripts.tsx` | ✅ Done |
| `src/components/PhoneTrackingHandler/PhoneTrackingHandler.js` | `src/components/PhoneTrackingHandler/PhoneTrackingHandler.tsx` | ✅ Done |
| `src/components/StructuredData/LocalBusinessSchema.js` | `src/components/StructuredData/LocalBusinessSchema.tsx` | ✅ Done |
| `src/components/PerformanceMonitor/PerformanceMonitor.js` | `src/components/PerformanceMonitor/PerformanceMonitor.tsx` | ⬜ Optional |
| `src/components/CategoryCardInfo/CategoryCardInfo.js` | _(inlined in services/page.tsx)_ | ✅ Done (inlined) |
| `src/components/CategoryInfo/CategoryInfo.js` | `src/components/CategoryInfo/CategoryInfo.tsx` | ✅ Done |
| `src/components/SubCategoryCardInfo/SubCategoryCardInfo.js` | `src/components/SubCategoryCardInfo/SubCategoryCardInfo.tsx` | ✅ Done |
| `src/components/AboutSection/AboutSection.js` | _(inlined in ueber-uns/page.tsx)_ | ✅ Done (inlined) |
| `src/components/MosaicGallery/MosaicGallery.js` | `src/components/MosaicGallery/MosaicGallery.tsx` | ✅ Done |
| `src/services/services.service.js` | `src/services/services.service.ts` | ✅ Done |
| `src/services/calendar.service.js` | `src/services/calendar.service.ts` | ✅ Done |
| `src/services/appointments.service.js` | `src/services/appointments.service.ts` | ✅ Done |
| `src/lib/ga.js` | `src/lib/ga.ts` | ✅ Done |
| `src/lib/gtm.js` | `src/lib/gtm.ts` | ✅ Done |
| `src/constants/enums.js` | `src/constants/enums.ts` | ✅ Done |
| `src/constants/errors.js` | `src/constants/errors.ts` | ✅ Done |
| `src/constants/staticData.js` | `src/constants/staticData.ts` | ✅ Done |
| `src/utils/formatters.js` | `src/utils/formatters.ts` | ✅ Done |
| `src/utils/slugify.js` | `src/utils/slugify.ts` | ✅ Done |
| `src/utils/performance.js` | `src/utils/performance.ts` | ⬜ Optional |
| `src/middleware.js` | `src/middleware.ts` | ✅ Done |
| _(new)_ | `src/components/ScrollToTop/ScrollToTop.tsx` | ✅ Done |
| _(new)_ | `src/types/booking.ts` | ✅ Done |

---

## Progress Log 📊

### 2026-02-06
- ✅ Created new Next.js 16 project with TypeScript + Tailwind CSS 4
- ✅ Analyzed entire old project structure (all pages, components, services, utils)
- ✅ Created migration documentation with detailed checklist
- ✅ **Phase 1 COMPLETE:**
  - Configured `next.config.ts` (env vars, remotePatterns, compression, security)
  - Setup fonts (Cormorant Garamond + Montserrat) with CSS variables
  - Created complete `globals.css` with all design tokens from MUI theme
  - Installed Radix UI primitives (dialog, accordion, select, checkbox, radio-group, navigation-menu, visually-hidden)
  - Installed `dayjs` and `sharp`
  - Created root `layout.tsx` with full metadata, footer, font classes
  - Created base `page.tsx` with hero section skeleton
  - Removed all default Next.js template files
  - Fixed font loader issue (template literals → string literals for Turbopack)
  - Build passes successfully ✅
- ✅ **Phase 2 CORE COMPONENTS COMPLETE (first batch):**
  - `Logo.tsx` — SVG logo via `next/image` with `fill` and `priority`
  - `LogoLink.tsx` — conditional rendering (static on `/`, link on others)
  - `Menu.tsx` — **Radix Dialog** replaces MUI Drawer. Fullscreen overlay with slide-in animation, inline SVG icons (no icon library), main + sub links separation
  - `Header.tsx` — sticky header with `backdrop-filter: blur(8px)`, dynamic position based on `/booking` path
  - `Breadcrumbs.tsx` — dynamic breadcrumbs with segment-to-label mapping, hidden on main pages
  - `CookieBanner.tsx` — **Radix Accordion** replaces MUI Accordion. Cookie consent with gtag consent update, same cookie logic preserved
  - `AnalyticsScripts.tsx` — GA4 + Google Ads scripts, production-only rendering
  - `PhoneTrackingHandler.tsx` — global `tel:` click listener with GTM tracking
  - `LocalBusinessSchema.tsx` — JSON-LD BeautySalon structured data
  - `lib/gtm.ts` — TypeScript version of GTM tracking (trackBookingComplete, trackPhoneClick, trackBookingStart)
  - `types/global.d.ts` — TypeScript declarations for `window.gtag` and `window.dataLayer`
  - Updated `layout.tsx` with all components integrated
  - Added CSS keyframe animations (`fadeIn`, `slideInRight`)
  - Build passes successfully ✅
- ✅ **Phase 2 CORE COMPONENTS COMPLETE (second batch):**
  - `OptimizedImage.tsx` — `next/image` wrapper with loading skeleton (`animate-pulse`), error fallback, blur placeholder, supports `fill` and fixed-size modes
  - `ContactSection.tsx` — server component: phone, email, address (Google Maps link), social links (Facebook, Instagram) with inline SVG icons
  - `ParallaxHero.tsx` — `requestAnimationFrame`-based parallax with image + content layers, dark gradient overlay, GPU-composited transforms
  - `RevealSection.tsx` — `IntersectionObserver` reveal animation, configurable `imageSide` (left/right), staggered opacity + translateY
  - `ScrollGallery.tsx` — 3-card stacked parallax layout, direct DOM manipulation via refs (no React re-renders), scroll-driven transforms
  - `MosaicGallery.tsx` — mosaic grid (6-tile repeating pattern), **Radix Dialog** fullscreen lightbox with keyboard navigation (←/→), image counter
  - Configured `npm run dev` to always use port 3001 (`next dev --port 3001`)
  - Build passes successfully ✅
- ✅ **Phase 2 COMPLETE** — all core components migrated
- ✅ **Phase 3.1 HOME PAGE COMPLETE:**
  - Copied all images from old `public/` to new project (`logo.svg`, `images/design/*`, `images/services/*`, `images/services-page/*`, `main-top-image.avif`, `promo-image.avif`)
  - Created `constants/staticData.ts` — TypeScript version of `categoriesData` + `servicesData`
  - Created `utils/formatters.ts` — TypeScript version of all formatting functions (`formatTimeToString`, `getPriceDisplay`, `getFirstServices`, `formatPrice`, `formatPriceRange`, `formatIsoDate`, `formatMonthYear`)
  - Created `services/services.service.ts` — TypeScript version of `getServices()` API call
  - Created `HomeServices.tsx` — service categories grid with `OptimizedImage`, hover overlays, mobile-first responsive layout
  - Created `UberMoodSection.tsx` — "Über MOOD" section with text block + `ScrollGallery` (3 studio images)
  - Created `PricePreview.tsx` — server-side price preview with categories, top-3 services per category, price/time formatting
  - Migrated `page.tsx` — full Home page with all 5 sections: `ParallaxHero` → `HomeServices` → `UberMoodSection` → `PricePreview` → `ContactSection`
  - Added CSS utility classes: `.card-service`, `.price-row`, `.btn-outline-white`, `.btn-outline-dark`, `.section-padding`, `.container-narrow`
  - Mobile-first approach throughout
  - Build passes successfully ✅
- ✅ **Phase 3.12 IMPRESSUM COMPLETE:**
  - Created `src/app/impressum/page.tsx` — all legal text migrated word-for-word from old project
  - MUI `Container/Typography/Box` → Tailwind CSS utility classes
  - Metadata preserved: title, description
  - Sections: Angaben gemäß § 5 TMG, Kontakt, Inhaltlich Verantwortlicher, USt-IdNr, Berufsbezeichnung, EU-Streitschlichtung, Verbraucherstreitbeilegung
  - Build passes successfully ✅
- ✅ **Phase 3.13 DATENSCHUTZ COMPLETE:**
  - Created `src/app/datenschutz/page.tsx` — all privacy policy text migrated word-for-word from old project
  - MUI `Container/Typography/Box/List/ListItem` → Tailwind CSS utility classes
  - Metadata preserved: title, description
  - All 7 sections preserved: Verantwortlicher, Hosting & Auftragsverarbeitung, CRM-System, Datenerfassung, Cookies, Ihre Rechte, Aktualisierung
  - Added CSS utility classes: `.legal-heading-2`, `.legal-heading-3`, `.legal-heading-4`, `.legal-body`, `.legal-list`
  - Build passes successfully ✅
- ✅ Fixed `next/image` quality warnings — added `qualities: [75, 90]` to `next.config.ts` `images` config. Components use `quality={90}` (ParallaxHero, HomeServices, ScrollGallery, RevealSection) and default `quality={75}` (OptimizedImage). Next.js 16 requires all used quality values to be explicitly listed.
- ✅ **Phase 3.11 ÜBER UNS COMPLETE:**
  - Created `src/app/ueber-uns/page.tsx` — full about page migrated from old project
  - MUI `Box/Container/Typography/Divider/List/ListItem/ListItemIcon/ListItemText` → semantic HTML + Tailwind CSS + custom CSS classes
  - All metadata preserved: title, description, keywords, authors, creator, publisher, robots, canonical
  - Sections: ParallaxHero → Intro Card → RevealSection (PMU) → RevealSection (Maniküre) → Warum MOOD (full-bleed gradient + bullet list) → ScrollGallery → Unsere Schwerpunkte → Weitere Leistungen → Closing quote
  - Added CSS classes: `.ueber-uns-page`, `.full-bleed`, `.about-card`, `.warum-mood-section`, `.about-bullet-list`
  - MUI `FiberManualRecordIcon` → CSS `::before` pseudo-element (7px black circle)
  - Build passes successfully ✅
- ✅ **Phase 3.2–3.9 ALL SERVICE PAGES VERIFIED:**
  - All service pages were already migrated to Tailwind CSS with correct metadata
  - Services index (`/services`), Permanent Make-up, Powder Brows, Hairstroke, Velvet Lips, Wimpernkranz, Nails, Lashes & Brows — all present and building
  - Fixed button styling: added base `btn` class + size classes (`btn-sm`, `btn-md`) to all service page buttons, `SubCategoryCardInfo`, `CategoryInfo`, and `lashes-und-brows` page
  - Build passes successfully ✅
- ✅ **SCROLL-TO-TOP FIX:**
  - Created `ScrollToTop` client component (`src/components/ScrollToTop/ScrollToTop.tsx`)
  - Uses `usePathname` + `window.scrollTo(0, 0)` to reset scroll on every route change
  - Integrated into `layout.tsx` — fixes sticky header causing 70px scroll offset on navigation
  - Build passes successfully ✅
- ✅ **HEADER STYLING FIX:**
  - Fixed header height: 86px → 70px (matching old project)
  - Added `border-bottom: 1px solid rgba(0, 0, 0, 0.06)` (except on `/booking`)
  - Added `background-color: rgba(255, 255, 255, 0.65)` with `backdrop-filter: blur(8px)` (except on `/booking`)
- ✅ **Phase 3.10 PREISLISTE COMPLETE:**
  - Created `src/app/preisliste/page.tsx` — price list page with `PriceMenu` component
  - Created `src/components/PriceMenu/PriceMenu.tsx` — full price menu with categories, subcategories, services, price display, duration formatting
  - MUI `Box/Typography/Button` → Tailwind CSS utility classes
  - All metadata preserved: title, description, keywords
  - Fixed TypeScript error: `subCategoryName` type inference with explicit `SubCategory` typing
  - Build passes successfully ✅
- ✅ **Phase 5.1–5.7, 5.17–5.19 API ROUTES & INFRA COMPLETE:**
  - Migrated all 6 API tracking routes to TypeScript: `qr-track`, `coupon-qr-track`, `ga-track`, `ga1-track`, `ga2-track`, `link-track`
  - Migrated `/ig` Instagram redirect route to TypeScript
  - Migrated `robots.ts` — robots.txt generation (same rules as old project)
  - Migrated `sitemap.ts` — sitemap.xml with all 14 static pages
  - Migrated `middleware.ts` — empty no-op middleware (manifest fix)
  - All routes proxy to `http://127.0.0.1:3500/` local backend with header forwarding
  - Build passes successfully ✅
- ✅ Updated `MIGRATION.md` with all progress
- 🚧 Next: Phase 3.14 (Booking page UI), Phase 3.15 (Termin stornieren), Phase 4 (Booking logic)

### 2026-02-07 / 2026-02-12 (Booking System Migration)
- ✅ **Phase 4 COMPLETE — ALL BOOKING COMPONENTS MIGRATED:**
  - `BookingFormContainer.tsx` — main orchestrator with stepper, 15+ state variables, step navigation, GA4/GTM tracking
  - `CategoryForm.tsx` — category grid with `auto-fill` responsive layout, `unoptimized` images (bypass Next.js private IP block)
  - `SubCategoryForm.tsx` — list with white bg, border separator, checkbox icons
  - `ServiceSelectionForm.tsx` — flat show/hide design replacing MUI Accordions, imperative ref API preserved
  - `ServicesList.tsx` — service cards with images, duration, price range, select/deselect
  - `AddServiceQuestion.tsx` — green outlined pill button
  - `EmployeeSelectionStep.tsx` — employee selection with nearest slot fetching, toggle UI
  - `CalendarForm.tsx` — calendar orchestrator with week navigation, time slot loading, skeleton
  - `CalendarGrid.tsx` — week grid with day dots, month/year display, prev/next arrows
  - `CalendarDay.tsx` — individual day button with highlight dot and selected state
  - `TimeSlotSection.tsx` — available time slots for selected day
  - `TimeSlotButton.tsx` — individual time slot with disabled/selected styling
  - `TimeSlotSkeleton.tsx` — loading skeleton for time slots
  - `EmployeeSelector.tsx` — multi-select employee dropdown (file exists but removed from CalendarForm as dead code)
  - `CalendarOverview.tsx` — selected date/time/services summary
  - `CustomerForm.tsx` — customer details with validation, country code selector
  - `CountryCodeSelector.tsx` — native select with emoji flags
  - `Confirmation.tsx` — booking confirmation screen
  - `SelectedServicesSummary.tsx` — service summary with employee info and prices
- ✅ **Phase 4.13 `AppointmentCancellation` COMPLETE:**
  - Full cancellation flow: fetch by token → display details → cancel with modal dialog
  - Modal with backdrop blur, warning, optional message, confirm/cancel buttons
  - Handles: past appointments, already cancelled, group appointments, loading/error states
  - Scroll to top after successful cancellation
- ✅ **Phase 5.9–5.11, 5.21, 5.23–5.24 COMPLETE:**
  - `calendar.service.ts` — TypeScript: `fetchTimeSlots`, `fetchNearestSlots`
  - `appointments.service.ts` — TypeScript: `createAppointment`, `getAppointmentByToken`, `cancelAppointmentByToken`
  - `ga.ts` — TypeScript: full GA4 booking funnel tracking (12+ events)
  - `slugify.ts` — TypeScript URL slug utility
  - `enums.ts` — TypeScript booking enums with `as const`
  - `errors.ts` — TypeScript error constants
  - `types/booking.ts` — central TypeScript types for all booking data structures
- ✅ **Phase 3.14–3.15 BOOKING PAGES COMPLETE:**
  - `booking/page.tsx` — server-side QR tracking + categories fetch, renders BookingFormContainer
  - `termin-stornieren/[token]/page.tsx` — dynamic route rendering AppointmentCancellation
- ✅ **Design improvements in booking form:**
  - Stepper: frosted glass sticky header, white-on-black circles, equal spacing
  - Categories: responsive `auto-fill` grid, `aspect-video` cards, large overlay titles
  - SubCategories: clean list with white bg, thin borders, checkbox icons
  - All "Zurück" buttons: green outlined pill style (matching "Service hinzufügen")
  - "Weiter" buttons: centered on all steps
  - Calendar: larger arrows (28px), bigger dots (10px), bold month/year (text-lg)
  - Booking headings: Montserrat font (via `.booking-form h1-h6` CSS scope)
  - Content centered with `max-w-[768px]` on desktop
  - `löschen` button: inline style to avoid CSS cascade override
- ✅ **Bug fixes:**
  - `formatMonthYear` — replaced structural type with `Dayjs` import (build error fix)
  - `setSelectedDay` — fixed functional update type mismatch
  - `categories` — type assertion for `readonly` → mutable array
  - `next/image` private IP — added `unoptimized` for API images (localhost avif)
  - `next.config.ts` — added `remotePatterns` with `new URL()` format + port 3500
- ✅ **Dead code cleanup:**
  - Removed EmployeeSelector from CalendarForm (never rendered meaningful content)
  - Removed `openSelects` state, `isAnySelectOpen` logic, `hideEmployeeSelector` prop
- 🟢 **All phases feature-complete — entering QA phase**

### 2026-02-12 (Staging Deployment)
- ✅ **Phase 6 STAGING DEPLOYMENT:**
  - Replaced all files in `dorosh-studio-next-js` repo (staging branch) with `mood-beauty-v2` codebase
  - Updated both CI/CD workflows (`deploy-staging.yml`, `deploy.yml`):
    - Node 18 → 22, `setup-node@v3` → `@v4`
    - tar includes `next.config.ts`, `tsconfig.json`, `postcss.config.mjs` instead of `next.config.js`
    - Workflow names updated to "Mood Beauty"
  - Fixed `ga.ts` build error: `Record<string, unknown>` → `GtagEventParams` type
  - Regenerated `package-lock.json` for Node 22 / npm 10 compatibility
  - Removed `qualities: [75, 80, 90]` from `next.config.ts` — caused 400 errors for `?q=90` on staging
- ✅ **Staging deployment fixes (502 Bad Gateway):**
  - **Root cause 1:** EC2 had Node 18.20.8, Next.js 16 requires >= 20.9.0 → PM2 crash loop (15 restarts → errored)
  - **Fix:** `nvm install 22 && nvm alias default 22` on EC2, added `nvm use 22` to both deploy workflows
  - **Root cause 2:** `.env` heredoc in YAML added leading spaces to `REACT_APP_API_URL` → env var not parsed
  - **Fix:** Replaced heredoc with `echo 'REACT_APP_API_URL=...' > .env`
  - **Root cause 3:** Old `next.config.js` still on server conflicting with new `next.config.ts`
  - **Fix:** Added `rm -f next.config.js jsconfig.json .eslintrc.json .editorconfig` before tar extraction
  - Added PM2 `ecosystem.config.cjs` to staging workflow (was only in production before)
  - Staging now running: Next.js 16.1.6 on Node 22.22.0, port 3001 ✅
- ✅ **Deploy script timeout fix:**
  - `npm ci --omit=dev` hung for 10 minutes on EC2 → replaced with `npm install --omit=dev`
  - Reverted staging PM2 to simple `pm2 start npm --name ... -- start -- -p 3001` (removed ecosystem config)
  - Simplified deploy script: nvm + tar + npm install + env + pm2 — minimal and reliable
- ✅ Staging verified and working at `https://staging.moodbeauty.de/`

### 2026-02-07 (Post-Staging QA Fixes)
- ✅ **Scroll-to-error offset for sticky stepper:**
  - CustomerForm: added `useEffect` that scrolls to first invalid field with 100px offset (stepper height)
  - ServiceSelectionForm: added `scroll-margin-top: 100px` on root element for all `scrollIntoView` calls
  - Previously, validation errors under input fields were hidden behind the sticky stepper after scroll
- ✅ **Cancellation time limit documented:**
  - Frontend: `isAppointmentPast()` compares `appointment.timeStart` with `new Date()`
  - Backend: compares `timeStart` (UTC) with current time via `dayjs().utc()`
  - Current behavior: cancellation allowed up to the exact `timeStart` moment (no advance deadline)
  - No "X hours before" restriction exists — noted as future enhancement in backend docs
- ✅ **Bug fix: `isAppointmentPast()` used `appointment.date` instead of `appointment.timeStart`:**
  - `appointment.date` = `"2026-02-18T00:00:00.000Z"` (midnight UTC, date only)
  - `appointment.timeStart` = `"2026-02-18T18:15:00.000Z"` (actual appointment start)
  - After midnight UTC on the appointment day, frontend incorrectly showed "Termin abgelaufen"
  - Fixed: now uses `appointment.timeStart` — consistent with backend logic
- ✅ **Marketing consent checkbox default changed to checked:**
  - `consentMarketing` initial state changed from `false` to `true` in CustomerForm
  - `consentPrivacy` remains `false` (must be explicitly accepted by customer)
  - Customer can opt out of marketing by unchecking the checkbox themselves
- 🚧 Next: Deploy to production, QA all routes and booking flow end-to-end
