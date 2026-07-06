# PAR5 Website Architecture — v2 (Consolidated)

**This document supersedes the original Cursor architecture plan.** It merges that original plan with every design/technical decision made since. Nothing here should be treated as a "proposal" — this is the current source of truth. If any other document (design brief, visual spec) conflicts with this file on a technical/structural point, this file wins; on visual/design points, the design brief and visual spec win.

---

## Change Log (what's different from the original plan, and why)

| Area | Original plan said | Now | Reason |
|---|---|---|---|
| CSS config | `tailwind.config.ts` + `globals.css` (Tailwind v3 style) | Single `@theme` block inside `src/styles/globals.css` (Tailwind v4) | `create-next-app` scaffolded v4, which is current stable and drops the JS config file entirely |
| Typography | Inter/Geist only, no serif | **Fraunces** (headlines only) + **Inter** (body/UI) + **IBM Plex Mono** (tiny data labels only) | All-sans felt "hard tech"; serif headlines add warmth without sacrificing UI clarity |
| Accent color | Placeholder blue (`#0066FF`), then placeholder `#A6FF00` | **`#8FFF00`** (lime green — exact hex sampled from the real PAR5 logo files, confirmed final) | Blue rejected outright — never use it |
| Logo assets | Legacy "PAR5 MEDIA" source SVGs, "5" digit same color as rest of wordmark | **`PAR5_logo_black_green5.svg` / `PAR5_logo_white_green5.svg`** — "MEDIA" removed, "5" recolored to accent green | Company is "PAR5," not "PAR5 Media"; green "5" ties numeral to the flag icon — see §2.5 |
| Complimentary offer name | "Complimentary Digital Growth Blueprint" / "Business Growth Assessment" (earlier drafts) | **"Digital Sales System"** | Locked as final naming |
| Mobile navigation | Full-screen overlay nav | **Bottom tab bar** — Home / Solutions / Insights / My System / Tap In, custom line icons, no emoji | Reads as native premium app; matches Porsche/Apple-configurator feel |
| Pricing calculator | Guided 3-step flow (need → package → estimate) | **Replaced entirely by the "Build My System" configurator** — persistent floating panel + standalone review page | Feels like configuring a product, not filling in a form; bigger differentiator |
| State management | No global state library at launch | **Approved exception**: React Context + `useReducer` for the Build My System feature only, isolated to its own folder | The floating panel needs state that persists across route changes — still no Redux/Zustand |
| `/build-my-system` route | Qualification/scoping form | **Standalone review page** — summary of selections from the floating panel, adjustable, cost totals, CTA into `/tap-in` | Floating panel is the always-available widget; this page is the considered, full-screen moment before booking |
| Solutions routes | 3 routes implied | **Confirmed: 3 routes**, with 4 outcome-language categories used as *content grouping within* those pages (and in Build My System), not as separate routes — see mapping below |

---

## Design North Star

The site should feel **product-grade**, not agency-grade: restrained motion, generous whitespace, confident typography, and one clear action per viewport. Every page earns its existence with a single job. The homepage is a **lobby** — it routes visitors, it does not explain everything.

**Reference aesthetic:** Apple (clarity), Linear (precision), Stripe (trust), Arc (personality without noise) — filtered through "Editorial Technology": a cross between an editorial magazine and a high-end engineering firm.

**Avoid:** gradient overload, glassmorphism, neon accents used as a wash (accent is a precision detail, not a fill), dashboard UI patterns, feature-grid clutter, long scroll dumps, emoji anywhere in UI copy.

**Before writing any code for a given phase:** think like a product designer, not a software engineer. Prioritize user experience, visual hierarchy, conversion, and emotional response over technical complexity. Every component should justify its existence. If a section does not contribute to the user's journey, remove it.

---

## Engineering Principles (Long-Term Maintainability)

This project is intended to evolve over **several years**. All architectural decisions prioritize **maintainability, modularity, and readability** over clever code.

### Core rules
- **Prefer boring, explicit code** over abstractions that save lines but obscure intent
- **One file, one job** — components, lib modules, and sections should be easy to locate by name
- **No premature generalization** — build the specific thing needed; extract only when a second use case appears
- **Lean dependencies** — every npm package must earn its place
- **Replaceability over reusability** — major features are isolated so they can be redesigned or swapped without rippling through the app

### Isolated feature modules

Every major feature lives in its own folder with a narrow public API (`index.ts`). Pages import features; features never import pages or other features laterally.

| Feature | Folder | Replaceable without touching |
|---|---|---|
| Build My System configurator | `src/components/features/build-my-system/` | Solution pages, homepage, `/build-my-system` page |
| Showcase carousel | `src/components/features/showcase-carousel/` | `/showcase`, homepage hero background |
| Booking flow | `src/components/features/booking-flow/` | `/tap-in` page only |
| Service page template | `src/components/features/service-page/` | Individual `/solutions/*` pages |
| Animation wrappers | `src/components/motion/` | Any section that opts in |
| Form submission | `src/lib/forms/` + `src/app/tap-in/actions.ts` | Form UI components |
| MDX content layer | `src/lib/content/` | Insights/showcase pages |

**Feature folder structure (standard):**
```
src/components/features/{feature-name}/
├── index.ts              # Public API — only export what pages need
├── {FeatureName}.tsx     # Main component
├── types.ts              # Feature-local types
├── constants.ts          # Feature-local copy/config (optional)
└── use{FeatureName}.ts   # Feature-local hook (optional, client only)
```

**Dependency direction (strict):**
```
app pages → sections → features → ui primitives → lib utilities (no upward imports)
app pages → features (directly, where a page is thin)
```
- `ui/` never imports from `features/` or `sections/`
- `lib/` never imports React components
- `features/` never import other `features/` — shared logic goes in `lib/` or `ui/`

### State management policy

**No global state library at launch, with one named exception.**

| Concern | Approach |
|---|---|
| Form state | React `useState` + `useActionState` in form components |
| Form validation | Zod schemas in `src/lib/forms/schemas.ts` |
| Form submission | Server Actions → GAS adapter |
| Mobile bottom tab bar active state | Local/derived from route, no extra state needed |
| Motion preferences | `useReducedMotion` hook |
| **Build My System selections** | **React Context + `useReducer`**, scoped entirely to `src/components/features/build-my-system/`, with its own provider mounted in the root layout. This is the sole approved exception to "no global state" — nothing else in the app depends on or reaches into this provider. |
| Content | Build-time static (MDX); no runtime content fetching at launch |

### Dependency policy

**Approved (installed):**
`next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `framer-motion`, `zod`, `clsx`, `tailwind-merge`, `class-variance-authority`, `gray-matter`, `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`

**Explicitly excluded unless justified later:**
Redux, Zustand, Jotai (state need is covered by the Build My System exception above — do not generalize this into broader global state), shadcn/ui or Radix-heavy kits, Swiper/Embla, lodash, axios.

---

## 1. Folder Structure

```
par5/
├── .env.local.example
├── .env.local
├── next.config.ts
├── postcss.config.mjs          # Tailwind v4: @tailwindcss/postcss plugin
├── tsconfig.json
├── eslint.config.mjs
├── package.json
├── docs/                        # Source-of-truth documents (this file + design brief + visual spec)
├── public/
│   ├── fonts/                   # Self-hosted Fraunces + Inter + IBM Plex Mono variable fonts
│   ├── images/
│   │   ├── brand/                # PAR5_logo_black_green5.svg, PAR5_logo_white_green5.svg — see §2.5
│   │   ├── pages/
│   │   └── showcase/
│   ├── icons/                    # Custom line icons for bottom tab bar (no emoji)
│   └── og/
├── content/
│   ├── insights/                 # MDX articles
│   └── showcase/                 # Case study MDX (optional at launch)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout: fonts, metadata, BuildMySystemProvider
│   │   ├── page.tsx               # Homepage (lobby)
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── opengraph-image.tsx
│   │   ├── solutions/
│   │   │   ├── page.tsx           # Solutions hub — "Choose Your Goal"
│   │   │   ├── websites/page.tsx           # Build Your Presence
│   │   │   ├── sales-conversion/page.tsx   # Grow Your Revenue
│   │   │   └── admin-systems/page.tsx      # Run Your Business + Automate Your Operations
│   │   ├── process/page.tsx
│   │   ├── showcase/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── insights/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── build-my-system/
│   │   │   └── page.tsx           # Standalone review page (see §3, §7)
│   │   ├── tap-in/
│   │   │   ├── page.tsx
│   │   │   └── actions.ts
│   │   └── api/
│   │       └── health/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   ├── MobileTabBar.tsx    # Bottom tab bar (renamed from MobileNav — reflects the pattern)
│   │   │   ├── PageShell.tsx
│   │   │   └── Section.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── LinkButton.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── FormField.tsx
│   │   │   ├── Divider.tsx
│   │   │   └── Container.tsx
│   │   ├── motion/
│   │   │   ├── FadeIn.tsx
│   │   │   ├── StaggerChildren.tsx
│   │   │   ├── PageTransition.tsx
│   │   │   └── MotionProvider.tsx
│   │   ├── content/
│   │   │   ├── MDXComponents.tsx
│   │   │   ├── Prose.tsx
│   │   │   ├── ArticleCard.tsx
│   │   │   └── ShowcaseCard.tsx
│   │   ├── forms/
│   │   │   ├── TapInForm.tsx
│   │   │   ├── FormSuccess.tsx
│   │   │   └── FormError.tsx
│   │   ├── features/
│   │   │   ├── build-my-system/
│   │   │   │   ├── index.ts
│   │   │   │   ├── BuildMySystemProvider.tsx   # Context + useReducer
│   │   │   │   ├── BuildMySystemButton.tsx     # "Build My System" CTA used on service listings
│   │   │   │   ├── FloatingPanel.tsx           # Persistent site-wide "My System" panel
│   │   │   │   ├── types.ts
│   │   │   │   └── constants.ts                # Service catalog, pricing data
│   │   │   ├── showcase-carousel/
│   │   │   ├── booking-flow/
│   │   │   └── service-page/
│   │   └── sections/
│   │       ├── home/
│   │       ├── solutions/
│   │       ├── process/
│   │       └── shared/
│   ├── lib/
│   │   ├── cn.ts
│   │   ├── metadata.ts
│   │   ├── routes.ts
│   │   ├── content/
│   │   │   ├── mdx.ts
│   │   │   ├── insights.ts
│   │   │   └── showcase.ts
│   │   ├── forms/
│   │   │   ├── schemas.ts
│   │   │   ├── submit.ts
│   │   │   └── types.ts
│   │   └── whatsapp.ts
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   └── useReducedMotion.ts
│   ├── styles/
│   │   └── globals.css           # Tailwind v4 @theme block — single source of design tokens
│   └── types/
│       ├── content.ts
│       └── forms.ts
└── scripts/
    └── validate-env.mjs
```

---

## 2. Solutions Route Mapping (resolves the 3-vs-4 conflict)

**Three routes, confirmed:**

| Route | Maps to outcome categories | Content |
|---|---|---|
| `/solutions/websites` | **Build Your Presence** | Landing pages, business websites, premium websites, online stores |
| `/solutions/admin-systems` | **Run Your Business** + **Automate Your Operations** | CRM systems, client portals, dashboards, AI chatbots, AI voice, workflow automation, lead scraping |
| `/solutions/sales-conversion` | **Grow Your Revenue** | SEO, social media, content, paid ads |

The four outcome-language categories are **not** separate routes — they're the grouping/labeling system used *within* these three pages (for organizing services and pricing tiers) and as the category selector in the Build My System configurator's first step ("What do you need?").

---

## 2.5 Logo Assets (finalized)

**Source of truth: `PAR5_logo_black_green5.svg` and `PAR5_logo_white_green5.svg`**, stored in `public/images/brand/`.

**History:** original source files were legacy "PAR5 MEDIA" branding with a black/blue accent. Corrected in two edits:
1. The "MEDIA" wordmark (a separate, distinctly-colored SVG group) was removed entirely — company is "PAR5," never "PAR5 Media."
2. Accent color corrected from placeholder to the real hex sampled directly from the source files: **`#8FFF00`**.

**Current finalized mark consists of:**
- The "PAR5" wordmark, bold sans
- A golf-flag icon (flagstick + triangular flag) sitting above the wordmark
- A curved underline/swoosh beneath the full lockup
- The "5" digit is colored in the accent green (`#8FFF00`) — a deliberate detail tying the numeral to the flag icon; "P," "A," "R" remain in the primary text color (black or white depending on variant)

**Two variants, use by background:**
- `PAR5_logo_black_green5.svg` — black wordmark/flag-stick/swoosh, for use on light (`--color-bg`) backgrounds
- `PAR5_logo_white_green5.svg` — white wordmark/flag-stick/swoosh, for use on dark (`--color-inverse-bg`) backgrounds or dark hero sections

Both variants share the same green flag triangle and green "5" — only the primary text/line color swaps.

**Usage notes:**
- These are the files `SiteHeader` and `SiteFooter` reference directly — do not regenerate or re-derive the logo from scratch.
- The flag icon + swoosh are retained as part of the primary lockup for now. If a plainer wordmark-only variant is needed later (e.g. for a favicon or very small UI placements), derive it by removing the flag/swoosh groups from these same files — don't design a new mark from scratch.
- Favicon (`app/icon.tsx` per §1) should use just the flag triangle at small scale, not the full lockup, if the full wordmark doesn't read clearly at 16–32px.

---



Replaces the pricing calculator entirely.

**Interaction model:**
1. Every service listed anywhere on the site (solution pages, homepage previews) has a single **"Build My System"** button.
2. Clicking it adds that service to global state (Context + `useReducer`) and animates it into a **persistent floating panel** ("My System") that follows the user across all routes.
3. The floating panel shows: selected services, estimated implementation cost, estimated monthly cost, remove-item action, and a "Continue" button.
4. "Continue" navigates to **`/build-my-system`** — a standalone, full-screen review page: complete summary, ability to adjust selections, cost totals, final CTA into `/tap-in`.

This should feel like configuring a Porsche or an Apple product — assembling something considered, not filling in a form.

**Technical notes:**
- `BuildMySystemProvider` mounts once in the root layout, wraps the whole app.
- Service catalog (name, category, price range) lives in `constants.ts` within the feature folder — not scattered across page components — so pricing updates happen in one place.
- The floating panel persists across route changes because it lives above the route tree, in the provider.

---

## 4. Routing Architecture

| Route | Purpose | Primary CTA |
|---|---|---|
| `/` | Lobby | Tap In |
| `/solutions` | Hub — "Choose Your Goal" | Tap In |
| `/solutions/websites` | Build Your Presence | Tap In / Build My System |
| `/solutions/sales-conversion` | Grow Your Revenue | Tap In / Build My System |
| `/solutions/admin-systems` | Run Your Business + Automate Your Operations | Tap In / Build My System |
| `/process` | How PAR5 works | Tap In |
| `/showcase` | Proof / case studies | Tap In |
| `/showcase/[slug]` | Single case study | Tap In |
| `/insights` | Thought leadership index | Tap In |
| `/insights/[slug]` | Article detail | Tap In |
| `/build-my-system` | **Standalone** configurator review page | Tap In |
| `/tap-in` | **Primary conversion hub** | Form / WhatsApp / Calendar |

**Route constants** live in `src/lib/routes.ts`:
```typescript
export const ROUTES = {
  home: '/',
  solutions: '/solutions',
  solutionsWebsites: '/solutions/websites',
  solutionsSalesConversion: '/solutions/sales-conversion',
  solutionsAdminSystems: '/solutions/admin-systems',
  process: '/process',
  showcase: '/showcase',
  insights: '/insights',
  buildMySystem: '/build-my-system',
  tapIn: '/tap-in',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

export const PRIMARY_CTA = ROUTES.tapIn;

// Desktop top navigation — Tap In stays a button, not a nav link
export const NAV_ROUTES = [
  { label: 'Solutions', href: ROUTES.solutions },
  { label: 'Process', href: ROUTES.process },
  { label: 'Showcase', href: ROUTES.showcase },
  { label: 'Insights', href: ROUTES.insights },
] as const;

// Mobile bottom tab bar — custom line icons, no emoji
export const TAB_ROUTES = [
  { label: 'Home', href: ROUTES.home, icon: 'home' },
  { label: 'Solutions', href: ROUTES.solutions, icon: 'grid' },
  { label: 'Insights', href: ROUTES.insights, icon: 'book' },
  { label: 'My System', href: ROUTES.buildMySystem, icon: 'package' },
  { label: 'Tap In', href: ROUTES.tapIn, icon: 'target' },
] as const;
```

---

## 5. Shared Layout Strategy

### Root Layout (`src/app/layout.tsx`)
- Loads self-hosted Fraunces + Inter + IBM Plex Mono via `next/font/local`
- Wraps all pages in: `BuildMySystemProvider` → `MotionProvider` → `SiteHeader` → `{children}` → `SiteFooter` → `MobileTabBar` (mobile only)

### Header behavior
- **Desktop:** minimal nav (per `NAV_ROUTES`) + primary "Tap In" button. Sticky, backdrop blur on scroll, no heavy shadow at rest.
- **Mobile:** no header nav links — navigation lives entirely in the bottom tab bar (per `TAB_ROUTES`). Header on mobile shows logo only (+ maybe a compact Tap In icon).

### Bottom Tab Bar (`MobileTabBar.tsx`)
- Fixed to viewport bottom, native-app feel
- Custom-drawn line icons only — **no emoji, ever**
- Active route gets the accent-colored icon/label treatment
- "My System" tab shows a small badge/count if the floating panel has active selections

### Footer
- Compact: logo, 4 link columns max, legal line. No newsletter signup at launch.

---

## 6. Animation Strategy

**Principle:** Motion confirms hierarchy and signals quality — it never decorates.

### Global rules
- Respect `prefers-reduced-motion`
- No infinite loops (except the intentional slow hero-grid drift and showcase filmstrip, both of which pause/freeze under reduced-motion)
- No parallax on mobile beyond the hero background treatment
- No scroll-jacking
- Max 3 animated elements visible in a single viewport

### Patterns
| Pattern | Component | Usage |
|---|---|---|
| Entry fade + 8px Y | `FadeIn` | Section headings, cards |
| Stagger 80ms | `StaggerChildren` | Card grids, nav items |
| Page crossfade | `PageTransition` | Route changes (~200ms) |
| Hover lift 6–8px + tilt | `Card` | Interactive preview cards |
| Slow multi-depth drift | Hero background grid | Homepage only — see visual spec §2 |
| Gentle roll / marquee | Showcase filmstrip (mobile) | `/showcase`, homepage "Recent Work" |
| Floating panel enter | Build My System panel | Item added → panel slides/fades in |

---

## 7. Mobile-First Strategy

- Design at **375px** first, scale up: `sm:640`, `md:768`, `lg:1024`, `xl:1280`
- Single-column default; 2-column grids at `md:`; 3-column at `lg:`
- Touch targets minimum **44×44px**
- Body text never below 16px on mobile (prevents iOS zoom on input focus)
- Bottom tab bar reserves safe-area padding for iOS home indicator
- Forms: single column, native input types, required fields only Name + Email
- No hero/section taller than 60vh on mobile where avoidable (hero background grid is the deliberate exception, scoped per visual spec)
- Lighthouse mobile target: **95+** performance (raised from 90+), **100** accessibility

---

## 8. Typography System

### Fonts (self-hosted via `next/font/local`)
- **Fraunces** — headlines and section titles (`display`, `h1`, `h2`, `h3`) only. Never in buttons, labels, or body copy.
- **Inter** — body copy, UI labels, nav, buttons, form fields.
- **IBM Plex Mono** — tiny data labels only: pricing figures, category tags, eyebrow labels. Sparing use, precision detail.

### Scale (fluid, mobile-first)

| Token | Mobile | Desktop | Usage |
|---|---|---|---|
| `display` | 2.25rem | 3.5rem | Homepage hero only |
| `h1` | 1.875rem | 2.75rem | Page titles |
| `h2` | 1.5rem | 2rem | Section headings |
| `h3` | 1.25rem | 1.5rem | Card titles |
| `body` | 1rem | 1.0625rem | Body copy |
| `body-lg` | 1.125rem | 1.25rem | Lead paragraphs |
| `caption` | 0.875rem | 0.875rem | Labels, meta |
| `eyebrow` | 0.75rem | 0.8125rem | Uppercase tracking, section labels |

### Rules
- Max line length: 65ch for body
- Heading letter-spacing slightly tight (`-0.02em` on display)
- Body line-height 1.6; headings 1.15–1.25
- No more than 2 type sizes per viewport section

---

## 9. Colour System

Near-monochrome with one accent — **90% neutral, 10% accent.**

| Token | Value | Purpose |
|---|---|---|
| `--color-bg` | `#FAFAFA` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, header |
| `--color-text-primary` | `#0A0A0A` | Headlines, body |
| `--color-text-secondary` | `#525252` | Supporting copy |
| `--color-text-muted` | `#A3A3A3` | Captions, placeholders |
| `--color-border` | `#E5E5E5` | Dividers, input borders |
| `--color-accent` | **`#8FFF00`** (lime green — sampled directly from the PAR5 logo source files, confirmed final) | Primary buttons, links, focus rings, active states, process-timeline progress line only. **Never blue. Never a full-surface wash.** |
| `--color-inverse-bg` | `#0A0A0A` | Inverse sections (sparingly) |
| `--color-inverse-text` | `#FAFAFA` | Text on inverse |

### Design token architecture (Tailwind v4 — single source of truth)

Tailwind v4 uses **CSS-native configuration.** There is no `tailwind.config.ts`. All tokens live directly in `src/styles/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-bg: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text-primary: #0A0A0A;
  --color-text-secondary: #525252;
  --color-text-muted: #A3A3A3;
  --color-border: #E5E5E5;
  --color-accent: #8FFF00; /* lime green — confirmed final, never blue, ~10% viewport max */
  --color-inverse-bg: #0A0A0A;
  --color-inverse-text: #FAFAFA;

  --font-fraunces: 'Fraunces', serif;       /* headlines only */
  --font-inter: 'Inter', sans-serif;         /* body/UI */
  --font-mono: 'IBM Plex Mono', monospace;   /* tiny data labels only */

  /* fluid type scale, container widths, etc. — see §8, §7 */
}
```

Every colour/font token defined in `@theme` is automatically available as both a CSS variable and a Tailwind utility class (`bg-accent`, `text-fraunces`, etc.) — no separate JS mapping layer needed. Components always use semantic classes; never hardcode hex values.

---

## 10. Performance Strategy

- **Static Generation (SSG)** for all marketing pages and MDX content
- **Server Actions** for forms only
- React Server Components by default; `'use client'` only on: forms, motion, mobile tab bar active state, Build My System provider/panel, interactive cards
- `next/image` everywhere; `priority` only on above-fold hero
- Self-hosted WOFF2 fonts, `font-display: swap`, Latin subset only
- No carousel libraries; build the minimal showcase carousel in `showcase-carousel/`
- Core Web Vitals: LCP < 2.5s mobile, INP < 200ms, CLS < 0.1
- `scripts/validate-env.mjs` runs pre-build; ESLint + TypeScript strict mode

---

## 11. SEO Strategy

- Per-page `generateMetadata()` via `src/lib/metadata.ts`
- Structured data: `Organization` (home), `Article` (`/insights/[slug]`), `BreadcrumbList` (nested solution pages)
- `src/app/sitemap.ts`, `src/app/robots.ts`
- One `<h1>` per page, `lang="en"`
- MDX frontmatter: `title`, `description`, `publishedAt`, `updatedAt`, `tags`, `ogImage`

---

## 12. Deployment Strategy

**Platform:** Vercel.

**Required env vars:**
```
GOOGLE_APPS_SCRIPT_URL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=27760546197
NEXT_PUBLIC_BOOKING_EMBED_URL=
```

**Google Apps Script setup:** Google Sheet with columns `timestamp`, `formType`, `name`, `email`, `company`, `phone`, `serviceInterest`, `message`, `sourcePage`. Apps Script deployed as Web App (execute as: Me, access: Anyone). Browser never calls GAS directly — always through the Server Action adapter.

---

## 13. Implementation Phases

### Phase 1 — Foundation
- **1a** ✅ Complete — Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind v4 + ESLint scaffolded, approved dependencies installed, folder skeleton built, demo content cleared, build verified clean.
- **1b** — Design tokens: `@theme` block in `globals.css` (all tokens in §9/§8/§7), plus `src/lib/routes.ts` with `ROUTES`, `PRIMARY_CTA`, `NAV_ROUTES`, `TAB_ROUTES`. Outline the `@theme` mapping before writing code.
- **1c** — Layout shell: root layout with font loading + `BuildMySystemProvider` mount, `SiteHeader`, `SiteFooter`, `MobileTabBar`, `PageShell`, `Section`, minimal `Button`/`LinkButton`/`Container`.

### Phase 2 — Homepage
- Hero (blurred moving 3D grid background per visual spec), announcement bar (quiet, "Digital Sales System" offer), four preview cards → Solutions/Process/Showcase/Insights, single `CTABand` → Tap In. Sign off on hero specifically before proceeding.

### Phase 3 — Build My System
- `BuildMySystemProvider` (Context + `useReducer`), `FloatingPanel`, `BuildMySystemButton`, standalone `/build-my-system` review page. Build and approve in isolation with 2–3 stub services before wiring into real solution pages.

### Phase 4 — Remaining Static Pages
- `/solutions` hub + 3 detail pages (per §2 mapping), `/process`, `/showcase`, `/insights` — one at a time, wiring real Build My System buttons into service listings.

### Phase 5 — Forms & Content
- Zod schemas, Server Actions, GAS adapter, `/tap-in` (form + WhatsApp button + booking embed — no separate contact form elsewhere), MDX pipeline for `/insights`.

### Phase 6 — Polish & Ship
- Motion pass, SEO (sitemap/robots/JSON-LD/OG), mobile QA, Vercel deployment + env configuration.

**Phase exit discipline:** at the end of every phase, summarize what was built and explicitly flag any judgment call not fully specified in this doc or the design brief/visual spec, before proceeding to the next phase.
