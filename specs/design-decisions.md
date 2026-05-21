# ajrojasfuentes.dev — Design Decisions Document

> **Version:** 1.0  
> **Status:** Approved — Complementary to `specs.md`  
> **Date:** 2026-05-21  
> **Purpose:** This document records the architectural, technological, and UX design decisions made during the development of `ajrojasfuentes.dev`. Each decision is justified with rationale, trade-offs, and consequences.  

---

## Table of Contents

1. [Architecture Decisions](#1-architecture-decisions)
2. [Technology Stack Decisions](#2-technology-stack-decisions)
3. [Performance Decisions](#3-performance-decisions)
4. [User Experience (UX) Decisions](#4-user-experience-ux-decisions)
5. [Accessibility Decisions](#5-accessibility-decisions)
6. [Security Decisions](#6-security-decisions)
7. [Content & Data Decisions](#7-content--data-decisions)
8. [Development Workflow Decisions](#8-development-workflow-decisions)
9. [Deferred Decisions (YAGNI)](#9-deferred-decisions-yagni)

---

## 1. Architecture Decisions

### AD-01: MVSD-Lite over Full MVSD

**Context:** The project requires clean architecture for a read-intensive, build-time-rendered portfolio. Full MVSD (with Commands, Aggregates, Events) is designed for systems with write operations and transactional persistence.

**Decision:** Use MVSD-Lite — a pragmatic, scaled-down application retaining Modular structure, Vertical Slices, Query-only CQRS, and DDD Contracts, while removing Commands, Aggregates, Events, and Transactional Outbox.

**Rationale:**
- The portfolio is read-only at runtime. No user mutations, no transactions, no cross-module communication.
- Full MVSD would introduce unnecessary abstractions (Command Bus, Event Store) with zero benefit.
- MVSD-Lite retains the structural discipline (ports, adapters, handlers) that signals engineering maturity.

**Trade-offs:**
- **Pro:** Lighter codebase, faster builds, easier to understand for a single-developer project.
- **Con:** If future requirements introduce user-generated content or real-time updates, a migration to full CQRS/ES may be needed.

**Consequences:**
- All features are Query Slices (no Commands).
- No domain aggregates — pure data projection.
- No event bus — modules are completely isolated.

---

### AD-02: Astro 6 Islands Architecture over Next.js / Nuxt / Remix

**Context:** The portfolio must achieve 95+ Lighthouse Performance with interactive elements (filters, command palette, 3D scenes).

**Decision:** Use Astro 6 with its Islands Architecture as the meta-framework.

**Rationale:**
- Astro ships zero JavaScript by default. Only islands marked with `client:*` directives are hydrated.
- Next.js App Router ships React Server Components but still hydrates the entire page for interactivity.
- Nuxt and Remix are SPA-centric and cannot match Astro's selective hydration granularity.
- Astro's Content Collections API provides type-safe, Zod-validated Markdown out of the box.

**Trade-offs:**
- **Pro:** Unmatched performance for static content; native Markdown/MDX support; simpler mental model.
- **Con:** Islands cannot easily share state (by design — this is actually a feature enforcing isolation).

**Consequences:**
- All interactive components are explicitly marked with `client:visible`, `client:idle`, or `client:load`.
- Static content (timelines, grids, cards) ships as pure HTML.
- No global React context or state management is needed or justified.

---

### AD-03: Query-Only CQRS (No Commands, No Events)

**Context:** MVSD-Lite specifies Query-only CQRS. The portfolio has no user mutations.

**Decision:** Implement only the Query side of CQRS. No Command handlers, no domain events, no event bus.

**Rationale:**
- Every operation is a read: "Get all projects," "Get featured publications," "Get profile."
- There are no writes at runtime: no user comments, no form submissions that mutate domain state, no real-time updates.
- The only "write" is the contact form, which is handled as an Astro Server Action calling an external API (Resend) — it does not mutate domain state.

**Trade-offs:**
- **Pro:** Eliminates enormous complexity (Event Store, Outbox, Projections, Sagas).
- **Con:** If a blog with comments or an AI chat assistant is added later, a Command side will need to be introduced.

**Consequences:**
- All Application layer code lives in `features/[slice-name]/` folders containing Query DTO, Handler, and Response DTO.
- No `commands/`, `events/`, or `aggregates/` directories exist.

---

### AD-04: Port-Adapter Pattern for Content Access

**Context:** All content data originates from Astro Content Collections (Markdown files). The Application layer must not depend on Astro's API.

**Decision:** Define pure TypeScript port interfaces (`IProjectRepository`, `IPublicationRepository`, etc.) in the Domain layer. Implement them with `AstroContent*Adapter` in the Infrastructure layer. Astro pages instantiate the concrete adapter and inject it into handlers.

**Rationale:**
- Dependency Inversion (SOLID-D): High-level modules (handlers) depend on abstractions (ports), not concrete implementations.
- Testability: Handlers can be unit-tested with `InMemory*Adapter` without a file system or Astro build.
- Swappability: If content moves from Markdown files to a CMS or database, only the adapter changes — handlers remain untouched.

**Trade-offs:**
- **Pro:** Full decoupling from Astro; testable without build system; future-proof.
- **Con:** Slight boilerplate (interface + 2 implementations per repository).

**Consequences:**
- `AstroContentProjectAdapter` is the ONLY file in the codebase that imports from `astro:content`.
- All handlers receive `IProjectRepository` via constructor parameter.
- InMemory adapters live in `src/modules/[name]/infrastructure/InMemory/` for test isolation.

---

### AD-05: No Global State Management (Zustand, Redux, Jotai)

**Context:** React islands need state (file explorer tree, open tabs, filter state, command palette query).

**Decision:** Use React `useState` + `useContext` inside islands. No global state library.

**Rationale:**
- Per KISS: "Never reach for global state management — component state is sufficient for islands."
- Islands are intentionally isolated. Sharing state between them is an anti-pattern in Astro's architecture.
- The only "shared" state is session persistence (`sessionStorage` for tabs, `localStorage` for theme), which is handled by individual islands.

**Trade-offs:**
- **Pro:** Zero additional bundle size; no state management library to learn or maintain; enforces island isolation.
- **Con:** If a future feature genuinely requires cross-island state, a lightweight context or Astro's built-in `transition:persist` may be needed.

**Consequences:**
- `FileExplorer.tsx` manages its own tree state.
- `TabManager.tsx` manages its own tab state.
- `ProjectFilter.tsx` manages its own filter state.
- No `store.ts`, `Provider.tsx`, or `useStore()` hooks exist.

---

### AD-06: No SSR at Launch (SSG by Default)

**Context:** The portfolio is entirely static content. There is no user-specific data or real-time requirements.

**Decision:** Use `output: "hybrid"` (SSG default) with only the contact form endpoint using server logic.

**Rationale:**
- SSG is simpler, faster, and cheaper than SSR.
- All content is known at build time (Markdown files).
- The contact form is the only runtime server logic, and Astro Server Actions handle it within the hybrid model.

**Trade-offs:**
- **Pro:** Fastest possible page loads; CDN-deployable; no cold starts; no server runtime costs.
- **Con:** Content updates require a rebuild and redeploy (acceptable for a personal portfolio).

**Consequences:**
- All pages are pre-rendered HTML at build time.
- The contact form API route (`/api/contact`) is the only server-rendered endpoint.
- If a blog or AI chat is added later, specific routes can opt into SSR without affecting the rest of the site.

---

## 2. Technology Stack Decisions

### TD-01: React 19 over Vue / Svelte / Solid

**Context:** Astro supports multiple UI frameworks for islands. The choice affects ecosystem compatibility, bundle size, and developer experience.

**Decision:** Use React 19 for all interactive islands.

**Rationale:**
- Shadcn/UI (our UI primitive source) is React-native.
- Framer Motion (our animation library) is React-native.
- React Three Fiber (our 3D library) is React-native.
- React 19's Server Components and concurrent features improve island performance.
- Using a single UI framework across all islands minimizes bundle overhead and mental context switching.

**Trade-offs:**
- **Pro:** Cohesive ecosystem; largest community; most third-party libraries; best hiring signal.
- **Con:** Larger bundle size than Svelte or Solid (mitigated by Astro's selective hydration).

**Consequences:**
- All `.tsx` islands use React 19 patterns.
- No Vue, Svelte, or Solid components exist in the codebase.

---

### TD-02: Zod 4 over Zod 3 / Yup / Joi

**Context:** Content schemas must be validated at build time with excellent TypeScript integration.

**Decision:** Use Zod 4 (major version upgrade from Zod 3).

**Rationale:**
- Zod 4 has a ~2.7KB core (smaller than v3).
- Built-in `z.email()` and `z.url()` — no regex maintenance.
- Native TypeScript inference with better error messages.
- Astro Content Collections natively supports Zod schemas.

**Trade-offs:**
- **Pro:** Smaller bundle, better DX, built-in validators.
- **Con:** Zod 4 is newer; community examples are still predominantly v3 (mitigated by Astro's official support).

**Consequences:**
- All schemas use Zod 4 syntax.
- Types are derived with `z.infer<typeof Schema>`.
- No manual TypeScript interfaces duplicate schema shapes.

---

### TD-03: Tailwind CSS 4.3 over Tailwind 3.x / CSS Modules / Styled Components

**Context:** Styling must be utility-first, theme-switchable, and build-time optimized.

**Decision:** Use Tailwind CSS 4.3 with CSS-native configuration.

**Rationale:**
- Tailwind 4.3 is a major rewrite with CSS-native configuration (no `tailwind.config.js`).
- Zero-runtime design tokens (all tokens are CSS custom properties consumed by `@theme`).
- ~5x faster build than Tailwind 3.x.
- Native support for container queries and `@property`.

**Trade-offs:**
- **Pro:** Fastest build, no JS config file, native CSS features.
- **Con:** Different configuration model from Tailwind 3 (learning curve for developers familiar with `tailwind.config.js`).

**Consequences:**
- Configuration lives in CSS (`@theme` block in `tokens.css`), not JavaScript.
- No `tailwind.config.js` or `tailwind.config.ts` exists in the project.
- All utility classes reference CSS custom properties for theme switching.

---

### TD-04: Shadcn/UI over Material UI / Chakra / Ant Design

**Context:** UI primitives must be accessible, customizable, and owned by the project (not imported at runtime).

**Decision:** Use Shadcn/UI — a collection of accessible, unstyled primitives built on Radix UI that are copy-pasted into the codebase.

**Rationale:**
- Shadcn components are "owned" — the code lives in `src/components/ui/` and is fully editable.
- No runtime dependency on a component library (`npm install @shadcn/ui` is not a thing — it's an installer).
- Radix UI handles all ARIA logic, focus management, and keyboard navigation.
- Tailwind CSS handles all styling.
- This combination provides accessibility without lock-in.

**Trade-offs:**
- **Pro:** Full ownership; no version conflicts; no bundle bloat from unused components; accessible by default.
- **Con:** Components must be manually updated when Radix or Shadcn releases improvements (mitigated by Dependabot).

**Consequences:**
- `src/components/ui/` contains owned copies of `button.tsx`, `dialog.tsx`, `tabs.tsx`, etc.
- No `@shadcn/ui` import exists in runtime code.
- Components can be customized without fighting a library's opinionated styles.

---

### TD-05: Framer Motion over GSAP / Anime.js / CSS Animations Only

**Context:** The portfolio requires scroll-triggered animations, layout transitions, physics-based springs, and gesture animations.

**Decision:** Use Framer Motion for all animations.

**Rationale:**
- Framer Motion is React-native and integrates seamlessly with Astro islands.
- `AnimatePresence` handles mount/unmount transitions (essential for tabs, modals, command palette).
- `useInView` hook provides simple IntersectionObserver integration for scroll-triggered animations.
- Physics-based springs and layout animations are first-class.
- Bundle size is reasonable (~25KB gzipped) when imported as named exports.

**Trade-offs:**
- **Pro:** Best-in-class React animation DX; handles complex transitions with minimal code.
- **Con:** Larger bundle than pure CSS animations (mitigated by selective hydration and named exports only).

**Consequences:**
- All animations use Framer Motion variants from `motion-variants.ts`.
- No GSAP, Anime.js, or Lottie dependencies exist.
- CSS animations are used only where they are simpler (e.g., hover states, sidebar transitions per KISS).

---

### TD-06: R3F + Spline over Pure Three.js / Babylon.js

**Context:** The hero requires a subtle 3D element. Some project detail pages may include interactive 3D visualizations.

**Decision:** Use React Three Fiber (R3F) for interactive 3D and Spline for static 3D embeds.

**Rationale:**
- R3F provides declarative Three.js inside React — the same mental model as the rest of the UI.
- Spline provides zero-code static 3D scenes that don't need to communicate with React state.
- Both load as `client:idle` islands, ensuring they never block the critical render path.
- Pure Three.js would require imperative DOM manipulation, which breaks React's declarative model.

**Trade-offs:**
- **Pro:** Declarative 3D; component-based; integrates with React state; Spline for non-technical designers.
- **Con:** R3F bundle is not tiny (~100KB + Three.js). This is acceptable because it loads lazily (`client:idle`).

**Consequences:**
- 3D scenes are visual enhancements, never requirements.
- Pages degrade gracefully without WebGL.
- Only two islands use 3D: `HeroScene.tsx` and `AwardScene.tsx`.

---

## 3. Performance Decisions

### PD-01: Zero-JS-by-Default Strategy

**Context:** Lighthouse Performance target is ≥ 95. Total Blocking Time must be < 50ms. JS bundle must be < 80KB.

**Decision:** Ship static content as pure HTML. Only hydrate React islands where interactivity is required. Use `client:visible`, `client:idle`, and `client:load` directives strategically.

**Rationale:**
- Astro's default behavior (zero JS) aligns perfectly with the portfolio's content-heavy nature.
- Most of the page (timelines, cards, text) requires no JavaScript.
- Only 5–8 islands need hydration: FileExplorer, TabManager, CommandPalette, Filters, ContactForm, TypewriterTitle, HeroScene.

**Trade-offs:**
- **Pro:** Minimal JS payload; fastest Time to Interactive; excellent Lighthouse scores.
- **Con:** Islands cannot share client-side state (by design — no global store).

**Consequences:**
- `client:visible` for timelines and filters (hydrate when scrolled into view).
- `client:idle` for 3D scenes and typing animation (hydrate after main thread is free).
- `client:load` for command palette and tab manager (hydrate immediately, but rendered as empty initially).

---

### PD-02: Self-Hosted Fonts over Google Fonts CDN

**Context:** Fonts must load quickly and not cause layout shift. Privacy is a secondary concern.

**Decision:** Self-host all fonts (Geist, Geist Mono, JetBrains Mono) in `public/fonts/` as `.woff2` (with `.woff` fallback).

**Rationale:**
- Eliminates external requests to Google Fonts (faster, more reliable, no tracking).
- `woff2` files are preloaded in `<head>` for critical render path.
- Font-display: swap prevents invisible text during load.
- Fallback font stack (`system-ui`, `monospace`) matches metrics to minimize CLS.

**Trade-offs:**
- **Pro:** Faster loads; no external dependency; privacy-respecting; works offline.
- **Con:** Repository size increases by ~500KB (acceptable for a portfolio).

**Consequences:**
- No `<link href="https://fonts.googleapis.com">` exists in the codebase.
- `@font-face` declarations are in `typography.css`.
- `<link rel="preload">` for Geist and JetBrains Mono is in `BaseLayout.astro`.

---

### PD-03: CSS Scroll Progress over JavaScript Scroll Handler

**Context:** The spec requires a reading progress indicator at the top of the editor area.

**Decision:** Use CSS `animation-timeline: scroll()` — zero JavaScript.

**Rationale:**
- KISS principle: "Never reach for a library when a CSS property solves it."
- `animation-timeline: scroll()` is supported in modern browsers and gracefully degrades (no progress bar in older browsers).
- Zero runtime cost; no event listeners; no `requestAnimationFrame`.

**Trade-offs:**
- **Pro:** Zero JS; native browser implementation; smooth 60fps.
- **Con:** Not supported in older browsers (Firefox < 115, Safari < 16.5) — graceful degradation to no progress bar.

**Consequences:**
- The progress bar is implemented purely in CSS (`ide-chrome.css`).
- No React component or JS utility manages scroll progress.

---

### PD-04: Astro `<Image>` Component over Raw `<img>`

**Context:** All images must be optimized for performance and must not cause layout shift.

**Decision:** Use Astro's built-in `<Image>` component for all images. Never use raw `<img>`.

**Rationale:**
- `<Image>` automatically generates WebP and AVIF formats.
- It creates responsive srcsets for different viewport sizes.
- It requires explicit `width` and `height`, preventing CLS.
- It handles lazy loading by default.

**Trade-offs:**
- **Pro:** Automatic optimization; zero configuration; prevents CLS.
- **Con:** `<Image>` only works with local images or specific remote patterns. External images must be configured in `astro.config.ts`.

**Consequences:**
- All images in the project use `<Image>`.
- External preview images (e.g., from GitHub) are downloaded at build time or configured as allowed remote patterns.

---

## 4. User Experience (UX) Decisions

### UXD-01: IDE Metaphor as Primary Interface Paradigm

**Context:** The portfolio must immediately signal "software professional" to technical evaluators.

**Decision:** Build the entire interface as an elevated IDE (VS Code-inspired) with Activity Bar, File Explorer, Tabs, Breadcrumb, Editor Area, and Status Bar.

**Rationale:**
- The IDE is the natural habitat of a software engineer. Using it as a portfolio metaphor is self-referential and authentic.
- It differentiates the portfolio from generic template-based sites.
- It demonstrates UI engineering skill (building a complex chrome with proper responsive behavior).

**Trade-offs:**
- **Pro:** Unique, memorable, technically impressive; aligns with the author's identity.
- **Con:** Non-technical visitors may need a moment to understand the metaphor (mitigated by familiar icons and clear labels).

**Consequences:**
- All content renders inside an "editor" area.
- Navigation is file-tree-based rather than traditional menu-based.
- The interface requires careful responsive design (collapsible sidebar, bottom nav on mobile).

---

### UXD-02: Content Opens as Tabs, Not Pages

**Context:** The IDE metaphor implies files open in tabs within the editor.

**Decision:** Clicking a content item in the File Explorer opens it as a new tab in the editor area, rather than navigating to a new page.

**Rationale:**
- Reinforces the IDE metaphor.
- Allows multiple content items to be open simultaneously (e.g., comparing two projects).
- Session persistence via `sessionStorage` means tabs survive reloads.
- Astro View Transitions handle the actual navigation smoothly.

**Trade-offs:**
- **Pro:** Familiar to developers; supports multi-tasking; persistent sessions.
- **Con:** Non-developers may find tab management unfamiliar (mitigated by clear close buttons and breadcrumb).

**Consequences:**
- `TabManager.tsx` island manages open tabs, active tab, and history.
- Each tab has a close button (×) and keyboard navigation.
- Tabs persist in `sessionStorage`.

---

### UXD-03: Global Command Palette (Cmd/Ctrl+K)

**Context:** Power users (technical evaluators) expect keyboard-driven navigation.

**Decision:** Implement a global Command Palette accessible via Cmd/Ctrl+K from any page.

**Rationale:**
- Essential for keyboard-centric users (developers, researchers).
- Fuzzy search across all content provides faster navigation than browsing.
- Opens selected item as a new tab, consistent with the IDE metaphor.

**Trade-offs:**
- **Pro:** Fast navigation; impressive DX signal; accessible via keyboard.
- **Con:** Adds a non-trivial React island (`client:load`) to every page (mitigated by rendering it empty until triggered).

**Consequences:**
- `CommandPalette.tsx` island is present on all pages but hidden until activated.
- Search index is generated at build time and passed as a prop.
- Focus trapping and keyboard navigation are fully implemented.

---

### UXD-04: URL-Persistent Filter State

**Context:** Users expect to share filtered views (e.g., "all AI/ML projects" or "2024 publications").

**Decision:** All filter state is synchronized with URL query parameters from day one.

**Rationale:**
- Shareable deep links are a core requirement (O2: Career Centralization).
- Back/forward buttons work correctly.
- Filter state survives page reloads without `localStorage`.
- Retrofitting URL state into an existing filter component is painful (R-05).

**Trade-offs:**
- **Pro:** Shareable links; browser history integration; no localStorage needed for filters.
- **Con:** Slightly more complex filter island logic (mitigated by `URLSearchParams` native API).

**Consequences:**
- `ProjectFilter.tsx` and `PublicationFilter.tsx` use `URLSearchParams` + `history.replaceState()`.
- Filter state is read from URL on mount and written to URL on change.

---

### UXD-05: 3D as Progressive Enhancement, Not Foundation

**Context:** The hero has a 3D element. Some projects may include 3D visualizations.

**Decision:** Build every section fully without 3D, then layer in 3D. If 3D causes LCP regression or fails on low-end devices, remove it without ceremony.

**Rationale:**
- The IDE aesthetic is strong enough to stand alone without 3D.
- 3D elements are visual enhancements, never requirements.
- `client:idle` ensures 3D never blocks the critical render path.
- Graceful degradation is mandatory (static fallback for no WebGL).

**Trade-offs:**
- **Pro:** Performance-first; resilient to device limitations; no broken experiences.
- **Con:** 3D has less visual impact than if it were central to the design.

**Consequences:**
- All content sections are fully functional with JavaScript disabled.
- 3D scenes have CSS-generated static fallbacks.
- Lighthouse scores are not compromised by 3D overhead.

---

## 5. Accessibility Decisions

### A11YD-01: `prefers-reduced-motion` as Global Guard

**Context:** Animations must not cause discomfort or seizures for users with vestibular disorders.

**Decision:** All animations check `prefers-reduced-motion: reduce` and either disable or simplify when active. This is enforced via a centralized `useReducedMotionVariants` hook.

**Rationale:**
- WCAG 2.1 AA requires respect for user motion preferences.
- A centralized hook is more robust than checking in each component individually.
- The hook returns empty transition objects, which Framer Motion treats as instant state changes.

**Trade-offs:**
- **Pro:** Single point of enforcement; no component can accidentally forget the guard.
- **Con:** Slightly less "wow factor" for users who have reduced motion enabled (by design).

**Consequences:**
- All animated components import and use `useReducedMotionVariants`.
- CSS animations also have `@media (prefers-reduced-motion: reduce)` overrides.

---

### A11YD-02: Keyboard Navigation on All Interactive Elements

**Context:** Many users navigate exclusively via keyboard (Tab, Shift+Tab, Enter, Space, Arrow keys, Escape).

**Decision:** Every interactive element (buttons, links, tabs, filters, command palette) must be fully keyboard-navigable. Focus indicators must be visible and clearly styled.

**Rationale:**
- WCAG 2.1 AA requires keyboard accessibility.
- The IDE metaphor implies keyboard-centric interaction (developers use keyboards).
- Shadcn/Radix primitives handle most ARIA logic automatically.

**Trade-offs:**
- **Pro:** Accessible to all users; aligns with IDE power-user expectations.
- **Con:** Requires careful focus management in custom islands (e.g., CommandPalette focus trapping).

**Consequences:**
- `TabManager` supports Ctrl+Tab/Ctrl+Shift+Tab navigation.
- `CommandPalette` traps focus and supports Arrow keys + Enter.
- `FileExplorer` supports Arrow key navigation and Enter to open.
- No focusable element has `outline: none` without a custom focus style.

---

### A11YD-03: Color Contrast ≥ 4.5:1 for Body Text

**Context:** The Tokyo Night-inspired color palette must meet WCAG 2.1 AA contrast requirements.

**Decision:** All text colors are verified against their backgrounds to meet ≥ 4.5:1 for body text and ≥ 3:1 for large text/UI components. This is enforced during design system creation and checked in CI.

**Rationale:**
- WCAG 2.1 AA is a hard requirement.
- The Tokyo Night palette is naturally high-contrast, but custom adjustments may be needed for specific combinations.
- Automated checks (axe DevTools, Lighthouse) catch regressions.

**Trade-offs:**
- **Pro:** Accessible to users with low vision or color blindness.
- **Con:** May slightly limit aesthetic choices (mitigated by the palette already being high-contrast).

**Consequences:**
- `tokens.css` defines all colors with verified contrast ratios.
- `text-muted` (`#484f58` on `#0d1117`) meets 4.5:1.
- `text-secondary` (`#8b949e` on `#0d1117`) meets 4.5:1.

---

## 6. Security Decisions

### SECD-01: No Secrets in Repository

**Context:** API keys (Resend) and environment variables must not be exposed.

**Decision:** All credentials live in `.env` (gitignored). `.env.example` is committed with placeholder values. `astro:env` enforces type-safe, client/server-separated access.

**Rationale:**
- Hardcoded secrets in repositories are a common and serious security vulnerability.
- `astro:env` automatically strips server-only variables from client bundles.
- `.env.example` documents required variables for new developers.

**Trade-offs:**
- **Pro:** Prevents accidental secret exposure; automatic client/server segregation.
- **Con:** New developers must manually create `.env` from `.env.example`.

**Consequences:**
- `RESEND_API_KEY` is never referenced in client-side code.
- Build fails if a required env var is missing.
- Git pre-commit hooks scan for common secret patterns (AWS keys, private tokens).

---

### SECD-02: Content Schema Validation Prevents Injection

**Context:** Markdown content could theoretically contain malicious HTML or scripts.

**Decision:** Astro Content Collections validate all frontmatter via Zod at build time. Markdown bodies are rendered by Astro's safe renderer (no raw HTML injection from content authors).

**Rationale:**
- Zod schemas enforce strict types and formats, rejecting unexpected data.
- Astro's Markdown renderer escapes unsafe HTML by default.
- MDX components are explicitly imported and controlled — no arbitrary component execution.

**Trade-offs:**
- **Pro:** Content authors cannot accidentally or maliciously inject scripts.
- **Con:** Raw HTML in Markdown is escaped (by design — content should be semantic, not presentational).

**Consequences:**
- All `.md` files pass Zod validation before being included in the build.
- No `<script>` or `<iframe>` tags from Markdown are executed.

---

## 7. Content & Data Decisions

### CDD-01: Content as Markdown Files, Not Database

**Context:** The portfolio content is static, structured, and author-maintained.

**Decision:** All content lives in `src/content/` as Markdown files with YAML frontmatter. No database (PostgreSQL, SQLite, Astro DB) at launch.

**Rationale:**
- YAGNI: There is no dynamic data, no user-generated content, no real-time requirements.
- Markdown is the native content format for developers (GitHub, documentation).
- Git provides version control, diffing, and review workflows for content.
- Adding a project requires zero code changes — just one `.md` file.

**Trade-offs:**
- **Pro:** Simplest possible solution; version-controlled; no database ops; no ORM.
- **Con:** Content updates require a rebuild and redeploy (acceptable for a portfolio).

**Consequences:**
- `src/content/projects/`, `publications/`, `certifications/`, `awards/`, `about/` contain all data.
- Content Collections API provides type-safe access.
- Future migration to a headless CMS requires only adapter changes.

---

### CDD-02: `profile.md` as Singleton

**Context:** The home page hero requires personal data (name, bio, titles, social links) that should exist exactly once.

**Decision:** `src/content/about/profile.md` is a singleton. The build script validates that exactly one file exists at this path.

**Rationale:**
- Profile data is global — there is only one author.
- A singleton enforces this constraint at build time.
- Prevents accidental duplication or omission of profile information.

**Trade-offs:**
- **Pro:** Enforces data integrity; clear single source of truth.
- **Con:** None significant.

**Consequences:**
- Build fails if `profile.md` is missing or duplicated.
- All pages reference the same profile data.

---

### CDD-03: `featured` Flag with `featuredOrder`

**Context:** Featured projects, awards, and publications must be curated and ordered.

**Decision:** Use a `featured: boolean` flag with an optional `featuredOrder: number` field. Max 6 featured projects, 3 featured awards, 3 featured publications.

**Rationale:**
- Boolean flag makes it easy to mark items as featured.
- `featuredOrder` provides explicit control over display order.
- Max limits prevent content authors from marking everything as featured.

**Trade-offs:**
- **Pro:** Simple, explicit, content-driven curation.
- **Con:** Requires discipline from content authors to set `featuredOrder` thoughtfully.

**Consequences:**
- `GetFeaturedProjectsHandler` filters by `featured: true` and sorts by `featuredOrder`.
- Build validation enforces max limits.

---

## 8. Development Workflow Decisions

### DWD-01: `pnpm content:new` Scaffold CLI

**Context:** Adding content must be frictionless and error-free.

**Decision:** Build a `scripts/new-content.ts` CLI that scaffolds content files from templates with pre-filled fields, auto-generated slugs, and the current date.

**Rationale:**
- The highest-leverage DX improvement in the codebase (R-07).
- Eliminates copy-paste errors and incorrect frontmatter.
- Enforces correct slug format (`/^[a-z0-9-]+$/`).
- Pre-fills `startDate` with current month (YYYY-MM).

**Trade-offs:**
- **Pro:** Fast, error-free content creation; enforces conventions.
- **Con:** Requires maintaining templates when schemas change.

**Consequences:**
- `pnpm content:new project "My Project"` generates a valid `.md` file.
- All team members (including the author) use the CLI for consistency.

---

### DWD-02: Conventional Commits with Branch Naming Convention

**Context:** Git history must be readable and CI/CD must trigger correctly.

**Decision:** Use Conventional Commits (`feat:`, `fix:`, `content:`, `chore:`) with branch naming: `feature/*`, `fix/*`, `content/*`, `chore/*`.

**Rationale:**
- Readable git history for debugging and release notes.
- Branch naming convention makes PR purpose immediately clear.
- Enables automated changelog generation if needed in the future.

**Trade-offs:**
- **Pro:** Clean history; clear intent; automation-ready.
- **Con:** Slightly more typing for commit messages (mitigated by IDE snippets).

**Consequences:**
- All commits follow the format.
- Branch protection rules enforce PR-based merges to `main`.

---

### DWD-03: Pre-commit Hooks for Quality Gates

**Context:** Code must be formatted and linted before reaching CI.

**Decision:** Use Husky + lint-staged to run ESLint and Prettier on staged files only during pre-commit.

**Rationale:**
- Catches errors before they reach CI (faster feedback loop).
- Staged-files-only keeps the hook fast (< 10 seconds).
- Full CI runs on push for comprehensive validation.

**Trade-offs:**
- **Pro:** Fast local feedback; consistent code style; no "fix formatting" commits.
- **Con:** Occasional frustration when a quick commit is blocked by a lint error (by design — quality over speed).

**Consequences:**
- No unformatted or unlinted code is committed.
- CI pipeline focuses on tests and build, not basic formatting.

---

## 9. Deferred Decisions (YAGNI)

### DD-01: Blog Section

**Decision:** Schema and folder structure are prepared (`src/content/writing/`, `post.schema.ts`), but no routes, UI, or content at launch.

**Rationale:** YAGNI — no current requirement for a blog. The architecture supports adding it as a new module with zero changes to existing code.

**Integration Path (when ready):**
1. Create `src/content/writing/` collection.
2. Create `src/modules/writing/` module.
3. Create `src/pages/writing/index.astro` and `[slug].astro`.
4. Add to IDE file explorer tree.

---

### DD-02: AI Chat Assistant

**Decision:** Architecture is documented (`src/modules/chat/`), but not built.

**Rationale:** YAGNI — no current requirement. The portfolio's own content (Markdown files) can be used as a knowledge base when the feature is needed.

**Integration Path (when ready):**
1. Create `src/modules/chat/` module.
2. Create `src/pages/api/chat.ts` Astro Server Action.
3. Install `@ai-sdk/vercel` + `openai`.
4. Create `src/islands/chat/ChatWidget.tsx` (`client:load`).

---

### DD-03: Internationalization (i18n)

**Decision:** Folder naming convention is i18n-ready (`content/about/` can become `content/en/about/` + `content/es/about/`), but no actual i18n implementation at launch.

**Rationale:** YAGNI — primary audience is English-speaking technical evaluators. The architecture supports i18n as a future addition.

**Integration Path (when ready):**
1. Rename content folders to locale-prefixed paths.
2. Add `@astrojs/i18n` integration.
3. Update `content/config.ts` to read from locale-prefixed paths.
4. Add language selector island to IDE Shell.

---

### DD-04: CV/Resume PDF Auto-Generation

**Decision:** Not built at launch. A manual PDF is placed in `public/cv/`.

**Rationale:** YAGNI — the portfolio itself is the primary deliverable. PDF generation can be added later as an Astro endpoint.

**Integration Path (when ready):**
1. Create `src/pages/cv.pdf.ts` Astro endpoint.
2. Use React-PDF or similar renderer to generate PDF from content data.
3. Eliminates manual PDF maintenance.

---

### DD-05: Real-Time GitHub Stats

**Decision:** Not built at launch. Static snapshot in content files.

**Rationale:** YAGNI — GitHub stars and citation counts change slowly. An API call is not justified by the value gain.

**Integration Path (when ready):**
1. Create a scheduled GitHub Action that fetches stats and writes to a content file.
2. Or use a serverless function to fetch stats at request time.

---

*Document Version: 1.0 | Status: Approved | Last Updated: 2026-05-21*
