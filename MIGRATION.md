# MOOD Beauty V2 — Migration Documentation & Progress

> **Source project:** `dorosh-studio-next-js` (Next.js 13.5.6 + MUI 5)
> **Target project:** `mood-beauty-v2` (Next.js 16.1.6 + Tailwind CSS 4 + Radix UI)
> **Start date:** 2026-02-06
> **Status:** 🚧 In Progress

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
- [ ] **3.2** Services index (`/services`) — category grid with images
- [ ] **3.3** Services: Permanent Make-up (`/services/permanent-make-up`) — category info page
- [ ] **3.4** Services: Powder Brows (`/services/permanent-make-up/powder-brows`)
- [ ] **3.5** Services: Hairstroke (`/services/permanent-make-up/hairstroke`)
- [ ] **3.6** Services: Velvet Lips (`/services/permanent-make-up/velvet-lips`)
- [ ] **3.7** Services: Wimpernkranz (`/services/permanent-make-up/wimpernkranz`)
- [ ] **3.8** Services: Nails (`/services/nails`)
- [ ] **3.9** Services: Lashes & Brows (`/services/lashes-und-brows`)
- [ ] **3.10** Preisliste (`/preisliste`) — price list with PriceMenu component
- [x] **3.11** Über uns (`/ueber-uns`) — about page with parallax, galleries, lists ✅ 2026-02-06
- [x] **3.12** Impressum (`/impressum`) — legal page ✅ 2026-02-06
- [x] **3.13** Datenschutz (`/datenschutz`) — privacy policy page ✅ 2026-02-06
- [ ] **3.14** Booking (`/booking`) — booking form page (UI only, logic in Phase 4)
- [ ] **3.15** Termin stornieren (`/termin-stornieren/[token]`) — appointment cancellation

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

---

## Phase 4: Booking Logic & Forms 📋

The most complex part — multi-step booking form with state management.

### Checklist

- [ ] **4.1** `BookingFormContainer` — main orchestrator (stepper, state, navigation)
- [ ] **4.2** `CategoryForm` — service category selection
- [ ] **4.3** `SubCategoryForm` — sub-category selection
- [ ] **4.4** `ServiceSelectionForm` — specific service selection
- [ ] **4.5** `ServicesList` — list of available services
- [ ] **4.6** `AddServiceQuestion` — "add another service?" step
- [ ] **4.7** `EmployeeSelectionStep` — employee selection (any/specific/multiple)
- [ ] **4.8** `CalendarForm` — date picker with available slots
- [ ] **4.9** `CalendarOverview` — week view calendar
- [ ] **4.10** `CustomerForm` — customer data input (name, email, phone, message)
- [ ] **4.11** `Confirmation` — booking confirmation view
- [ ] **4.12** `SelectedServicesSummary` — summary of selected services
- [ ] **4.13** `AppointmentCancellation` — cancellation flow with token
- [ ] **4.14** `PriceMenu` — expandable price list (Radix Accordion)

### Notes
- BookingFormContainer has ~15 state variables and complex step logic
- Calendar uses `dayjs` library — keep it
- Form validation is manual (no form library) — preserve as-is
- Employee selection has 3 modes: any, specific, multiple
- Google Analytics tracking at each funnel step — preserve all tracking calls

---

## Phase 5: API Routes, Services & Infrastructure 🔧

### Checklist

- [ ] **5.1** API: `/api/qr-track` — QR scan tracking proxy
- [ ] **5.2** API: `/api/coupon-qr-track` — coupon QR tracking proxy
- [ ] **5.3** API: `/api/ga-track` — GA scan tracking proxy
- [ ] **5.4** API: `/api/ga1-track` — GA1 tracking proxy
- [ ] **5.5** API: `/api/ga2-track` — GA2 tracking proxy
- [ ] **5.6** API: `/api/link-track` — link click tracking proxy
- [ ] **5.7** Route: `/ig` — Instagram bio redirect with tracking
- [ ] **5.8** Service: `services.service` — fetch public services
- [ ] **5.9** Service: `calendar.service` — fetch time slots & nearest slots
- [ ] **5.10** Service: `appointments.service` — create/get/cancel appointments
- [ ] **5.11** Lib: `ga.js` — Google Analytics 4 event tracking (full booking funnel)
- [ ] **5.12** Lib: `gtm.js` — Google Ads conversion tracking
- [ ] **5.13** Component: `AnalyticsScripts` — GA/GTM script injection
- [ ] **5.14** Component: `PhoneTrackingHandler` — phone click tracking
- [ ] **5.15** Component: `LocalBusinessSchema` — JSON-LD structured data
- [ ] **5.16** Component: `PerformanceMonitor` — web vitals monitoring
- [ ] **5.17** `robots.ts` — robots.txt generation
- [ ] **5.18** `sitemap.ts` — sitemap.xml generation
- [ ] **5.19** `middleware.ts` — empty middleware (manifest fix)
- [ ] **5.20** Utils: `formatters` — time, price, date formatters
- [ ] **5.21** Utils: `slugify` — URL slug generation
- [ ] **5.22** Utils: `performance` — performance measurement
- [ ] **5.23** Constants: `enums` — booking enums
- [ ] **5.24** Constants: `errors` — error codes
- [ ] **5.25** Constants: `staticData` — categories and services static data

### Notes
- All API routes proxy to `http://127.0.0.1:3500/` (local backend)
- `REACT_APP_API_URL` used for client-side service calls
- GA tracking only fires on production (`moodbeauty.de`)
- Google Ads conversion ID: `AW-11025863414/yj9bCIWyoLobEPalxYkp`

---

## Phase 6: Final Polish & QA ✅

- [x] **6.1** Copy all images from old `public/images/` to new project ✅ 2026-02-06
- [ ] **6.2** Verify all routes match exactly (no broken links)
- [ ] **6.3** Test responsive design (mobile, tablet, desktop)
- [ ] **6.4** Test booking flow end-to-end
- [ ] **6.5** Test cookie banner functionality
- [ ] **6.6** Verify all metadata and SEO tags
- [ ] **6.7** Verify analytics tracking (GA4, GTM, Google Ads)
- [ ] **6.8** Performance audit (Lighthouse)
- [ ] **6.9** Accessibility audit
- [ ] **6.10** Cross-browser testing

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

---

## File Mapping (Old → New)

| Old Path | New Path | Status |
|----------|----------|--------|
| `src/theme.js` | `src/app/globals.css` (CSS vars) | ✅ Done |
| `src/app/layout.js` | `src/app/layout.tsx` | ✅ Done |
| `src/app/page.js` | `src/app/page.tsx` | ✅ Done |
| `src/app/booking/page.js` | `src/app/booking/page.tsx` | ⬜ Pending |
| `src/app/services/page.js` | `src/app/services/page.tsx` | ⬜ Pending |
| `src/app/services/*/page.js` | `src/app/services/*/page.tsx` | ⬜ Pending |
| `src/app/preisliste/page.js` | `src/app/preisliste/page.tsx` | ⬜ Pending |
| `src/app/ueber-uns/page.js` | `src/app/ueber-uns/page.tsx` | ✅ Done |
| `src/app/impressum/page.js` | `src/app/impressum/page.tsx` | ✅ Done |
| `src/app/datenschutz/page.js` | `src/app/datenschutz/page.tsx` | ✅ Done |
| `src/app/termin-stornieren/[token]/page.js` | `src/app/termin-stornieren/[token]/page.tsx` | ⬜ Pending |
| `src/app/ig/route.js` | `src/app/ig/route.ts` | ⬜ Pending |
| `src/app/api/*/route.js` | `src/app/api/*/route.ts` | ⬜ Pending |
| `src/app/robots.js` | `src/app/robots.ts` | ⬜ Pending |
| `src/app/sitemap.js` | `src/app/sitemap.ts` | ⬜ Pending |
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
| `src/components/PriceMenu/PriceMenu.js` | `src/components/PriceMenu/PriceMenu.tsx` | ⬜ Pending |
| `src/components/BookingForm/*.js` | `src/components/BookingForm/*.tsx` | ⬜ Pending |
| `src/components/AppointmentCancellation/AppointmentCancellation.js` | `src/components/AppointmentCancellation/AppointmentCancellation.tsx` | ⬜ Pending |
| `src/components/Analytics/AnalyticsScripts.js` | `src/components/Analytics/AnalyticsScripts.tsx` | ✅ Done |
| `src/components/PhoneTrackingHandler/PhoneTrackingHandler.js` | `src/components/PhoneTrackingHandler/PhoneTrackingHandler.tsx` | ✅ Done |
| `src/components/StructuredData/LocalBusinessSchema.js` | `src/components/StructuredData/LocalBusinessSchema.tsx` | ✅ Done |
| `src/components/PerformanceMonitor/PerformanceMonitor.js` | `src/components/PerformanceMonitor/PerformanceMonitor.tsx` | ⬜ Pending |
| `src/components/CategoryCardInfo/CategoryCardInfo.js` | `src/components/CategoryCardInfo/CategoryCardInfo.tsx` | ⬜ Pending |
| `src/components/CategoryInfo/CategoryInfo.js` | `src/components/CategoryInfo/CategoryInfo.tsx` | ⬜ Pending |
| `src/components/SubCategoryCardInfo/SubCategoryCardInfo.js` | `src/components/SubCategoryCardInfo/SubCategoryCardInfo.tsx` | ⬜ Pending |
| `src/components/AboutSection/AboutSection.js` | `src/components/AboutSection/AboutSection.tsx` | ⬜ Pending |
| `src/components/MosaicGallery/MosaicGallery.js` | `src/components/MosaicGallery/MosaicGallery.tsx` | ✅ Done |
| `src/services/services.service.js` | `src/services/services.service.ts` | ✅ Done |
| `src/services/calendar.service.js` | `src/services/calendar.service.ts` | ⬜ Pending |
| `src/services/appointments.service.js` | `src/services/appointments.service.ts` | ⬜ Pending |
| `src/lib/ga.js` | `src/lib/ga.ts` | ⬜ Pending |
| `src/lib/gtm.js` | `src/lib/gtm.ts` | ✅ Done |
| `src/constants/enums.js` | `src/constants/enums.ts` | ⬜ Pending |
| `src/constants/errors.js` | `src/constants/errors.ts` | ⬜ Pending |
| `src/constants/staticData.js` | `src/constants/staticData.ts` | ✅ Done |
| `src/utils/formatters.js` | `src/utils/formatters.ts` | ✅ Done |
| `src/utils/slugify.js` | `src/utils/slugify.ts` | ⬜ Pending |
| `src/utils/performance.js` | `src/utils/performance.ts` | ⬜ Pending |
| `src/middleware.js` | `src/middleware.ts` | ⬜ Pending |

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
- 🚧 Next: Phase 3.2+ — remaining pages (Services, Preisliste, etc.)
