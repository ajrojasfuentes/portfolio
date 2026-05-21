# ajrojasfuentes.dev — Engineering Development Plan

> **Version:** 1.0  
> **Status:** Approved for Execution  
> **Date:** 2026-05-21  
> **Author:** OpenCode Agent  
> **Domain:** `ajrojasfuentes.dev`  
> **Architecture:** MVSD-Lite (Modular · Vertical Slices · Query-CQRS · DDD Contracts)  
> **Stack:** Astro 6 · React 19 · Framer Motion · R3F · Spline · TypeScript 5 · Zod 4 · Tailwind CSS 4.3 · Shadcn/UI  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Development Phases Overview](#2-development-phases-overview)
3. [Phase 0: Foundation & Tooling](#phase-0-foundation--tooling)
4. [Phase 1: Design System & Global Styles](#phase-1-design-system--global-styles)
5. [Phase 2: Content Schemas & Validation](#phase-2-content-schemas--validation)
6. [Phase 3: Shared Kernel & Domain Types](#phase-3-shared-kernel--domain-types)
7. [Phase 4: IDE Shell Chrome](#phase-4-ide-shell-chrome)
8. [Phase 5: Home Page — Hero](#phase-5-home-page--hero)
9. [Phase 6: Home Page — Deep Content](#phase-6-home-page--deep-content)
10. [Phase 7: Projects Module](#phase-7-projects-module)
11. [Phase 8: Publications Module](#phase-8-publications-module)
12. [Phase 9: Certifications & Awards Modules](#phase-9-certifications--awards-modules)
13. [Phase 10: Contact & Server Actions](#phase-10-contact--server-actions)
14. [Phase 11: Testing, CI/CD & Launch](#phase-11-testing-cicd--launch)
15. [Phase 12: Post-Launch Stabilization](#phase-12-post-launch-stabilization)
16. [Cross-Cutting Concerns](#cross-cutting-concerns)
17. [Risk Register](#risk-register)
18. [Appendix A: Dependencies Reference](#appendix-a-dependencies-reference)

---

## 1. Executive Summary

This document provides a comprehensive, engineering-grade development plan for the construction of `ajrojasfuentes.dev`, a high-performance personal portfolio website. The plan is structured into **13 phases** (0–12), each containing specific steps, tasks, requirements covered, verifiable objectives, and design decisions.

### Guiding Principles

- **Schema-First (R-01):** All Zod schemas are written and validated before any UI component is constructed.
- **IDE Shell First (R-02):** The `IDELayout` and `IDEShell` island are built before any content section to prevent cascading layout rework.
- **Infrastructure as Code:** Every configuration, every script, and every pipeline is versioned and reproducible.
- **Zero-JS-by-Default:** Astro Islands Architecture with selective hydration (`client:visible`, `client:idle`, `client:load`) is the backbone of the performance strategy.
- **Content as Code:** All professional data lives in Markdown files with compile-time schema enforcement.
- **Test-Driven for Handlers:** Every Query Handler has a corresponding Vitest unit test using an InMemory adapter before integration.

### Success Criteria

| Criterion | Target | Measurement |
|---|---|---|
| Lighthouse Performance | ≥ 95 | PageSpeed Insights |
| Lighthouse Accessibility | ≥ 90 | PageSpeed Insights |
| Lighthouse Best Practices | ≥ 95 | PageSpeed Insights |
| Lighthouse SEO | ≥ 95 | PageSpeed Insights |
| Total Blocking Time | < 50ms | Chrome DevTools |
| JavaScript Bundle (islands) | < 80KB | `astro build` output |
| Build Pipeline Duration | < 90s | GitHub Actions runner |
| Content Addition Friction | 1 file, 0 code changes | Manual verification |

---

## 2. Development Phases Overview

| Phase | Name | Duration Estimate | Key Deliverable |
|---|---|---|---|
| **0** | Foundation & Tooling | 2–3 days | Project scaffold, CI/CD, dev tooling |
| **1** | Design System & Global Styles | 2–3 days | `tokens.css`, `typography.css`, theme toggle, `BaseLayout` |
| **2** | Content Schemas & Validation | 2 days | All 7 Zod schemas, `_templates/`, `pnpm validate` |
| **3** | Shared Kernel & Domain Types | 1–2 days | `z.infer<>` types, utilities, shared UI primitives |
| **4** | IDE Shell Chrome | 4–5 days | `IDELayout`, `IDEShell` island (ActivityBar, FileExplorer, TabManager, Breadcrumb, StatusBar, CommandPalette) |
| **5** | Home Page — Hero | 3–4 days | Hero section, TypewriterTitle, 3D fallback scene |
| **6** | Home Page — Deep Content | 4–5 days | AnimatedTimeline (academic + professional), MilestonesGrid, SkillsMap, Contact section structure |
| **7** | Projects Module | 4–5 days | `IProjectRepository`, Query Slices, gallery, filters, detail pages |
| **8** | Publications Module | 3–4 days | `IPublicationRepository`, Editorial/Personal tabs, BibTeX export |
| **9** | Certifications & Awards | 2–3 days | Grids, filters, verified badges, featured awards |
| **10** | Contact & Server Actions | 2–3 days | Contact form, Resend mock/test mode, Astro Server Action |
| **11** | Testing, CI/CD & Launch | 3–4 days | Vitest + Playwright, GitHub Actions, Lighthouse CI, content population, domain binding |
| **12** | Post-Launch Stabilization | 2 days | Performance audit, accessibility audit, SEO validation, documentation finalization |

**Total Estimated Duration:** 34–43 days (single-developer, full-time equivalent)

---

## Phase 0: Foundation & Tooling

> **Duration Estimate:** 2–3 days  
> **Goal:** A production-grade project scaffold with all tooling, CI/CD, and quality gates operational from day one.

### Step 0.1: Astro 6 Project Initialization

**Tasks:**
1. Initialize Astro 6 project using `pnpm create astro@latest` with TypeScript strict template.
2. Configure `astro.config.ts` with site URL (`https://ajrojasfuentes.dev`), `output: "hybrid"`, and required integrations.
3. Install core dependencies: `astro@^6.x`, `@astrojs/react@^4.x`, `@astrojs/mdx`, `@astrojs/sitemap`.
4. Install React 19: `react@^19.x`, `react-dom@^19.x`.
5. Configure `tsconfig.json` extending `astro/tsconfigs/strictest` with path aliases: `@/*` → `src/*`, `@content/*` → `src/content/*`, `@sk/*` → `src/shared-kernel/*`.
6. Verify `pnpm dev` boots successfully in < 5 seconds.

**Requirements Covered:**
- FR-CONTENT-04 (Zod validation at build time — infra ready)
- NFR-Build (CI pipeline infrastructure)

**Objectives (Checklist):**
- [ ] `pnpm dev` starts successfully with no errors
- [ ] TypeScript strict mode is active (`strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`)
- [ ] Path aliases resolve correctly in VS Code and during build
- [ ] `astro.config.ts` is committed and documented

**Design Decisions:**
- **Decision 0.1.1:** Use `output: "hybrid"` from day one. Even though SSG is the default mode, hybrid output allows Server Actions (contact form) without a later config change. The overhead is negligible for a static site.
- **Decision 0.1.2:** Path aliases use `@/` for `src/` (industry standard), `@content/` for content files, and `@sk/` for shared-kernel utilities. This keeps imports readable and avoids deep relative paths (`../../../../`).
- **Decision 0.1.3:** `astro.config.ts` (not `.mjs`) to leverage TypeScript intellisense and type-checking on the config itself.

### Step 0.2: Tailwind CSS 4.3 Integration

**Tasks:**
1. Install `tailwindcss@^4.3` and `@tailwindcss/vite`.
2. Configure Tailwind via Vite plugin in `astro.config.ts` (no `tailwind.config.js` — Tailwind 4 uses CSS-native configuration).
3. Create `src/styles/globals.css` with `@import "tailwindcss"`, `@theme` block, and base resets.
4. Verify Tailwind utility classes work in a test `.astro` component.

**Requirements Covered:**
- NFR-Performance (utility-first engine)

**Objectives (Checklist):**
- [ ] Tailwind classes compile correctly in dev and build
- [ ] No `tailwind.config.js` exists (Tailwind 4 native CSS config)
- [ ] `globals.css` is imported in `BaseLayout.astro`

**Design Decisions:**
- **Decision 0.2.1:** Tailwind 4.3 is used specifically for its CSS-native configuration via `@theme`, zero-runtime design tokens, and ~5x faster build. This eliminates the need for a separate JS config file.
- **Decision 0.2.2:** All design tokens (colors, spacing, typography) will live as CSS custom properties in `src/styles/tokens.css`, consumed by Tailwind's `@theme` directive. This enables runtime theme switching without JavaScript frameworks.

### Step 0.3: Shadcn/UI Setup

**Tasks:**
1. Initialize Shadcn/UI in the project (`npx shadcn@latest init`).
2. Install base Radix UI peer dependencies.
3. Configure `components.json` to output to `src/components/ui/`.
4. Install initial primitives: `button`, `dialog`, `tabs`, `tooltip`, `toast`, `badge`, `sheet`.
5. Verify each primitive is a copy-pasteable, owned file in the codebase (not a runtime import).

**Requirements Covered:**
- FR-SHELL (CommandPalette, dialogs, tabs)
- FR-HOME (Toast for contact form, Tooltip for skills)
- NFR-Accessibility (Radix UI ARIA primitives)

**Objectives (Checklist):**
- [ ] All Shadcn components live in `src/components/ui/`
- [ ] No runtime imports from `@shadcn/ui` package (only local files)
- [ ] Each component is accessible via keyboard navigation
- [ ] `button`, `dialog`, `tabs`, `tooltip`, `toast`, `badge`, `sheet` are installed and functional

**Design Decisions:**
- **Decision 0.3.1:** Shadcn/UI is treated as a "copy-paste component library" — the code lives in the project and is fully owned. This avoids lock-in and allows customization of ARIA logic and styling without fighting a library's opinions.
- **Decision 0.3.2:** Only primitives needed for the IDE shell and content sections are installed initially. Additional components (e.g., `dropdown-menu`, `select`) are added on demand per YAGNI.

### Step 0.4: Development Tooling & Quality Gates

**Tasks:**
1. Install ESLint `eslint@^9.x` with `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`.
2. Configure ESLint with custom rules: no cross-module imports, no `any`, no direct Content Collections API in pages, no non-null assertions, no inline styles.
3. Install Prettier `prettier@^3.x` with `prettier-plugin-astro` and `prettier-plugin-tailwindcss`.
4. Install Husky `husky@^9.x` and `lint-staged@^15.x`.
5. Configure `.husky/pre-commit` to run `lint-staged`.
6. Configure `lint-staged` to run `eslint --fix` and `prettier --write` on staged files only.
7. Verify the pre-commit hook runs successfully on a test commit.

**Requirements Covered:**
- NFR-Maintainability (auto-formatting, type safety)
- RULE T-01, T-02, T-03, T-06 (TypeScript strict enforcement)
- RULE A-01 (no cross-module imports)
- RULE A-02 (no direct Content Collections API in pages)

**Objectives (Checklist):**
- [ ] ESLint catches `any` usage, cross-module imports, and direct `getCollection()` in pages
- [ ] Prettier formats `.astro`, `.tsx`, `.ts`, `.css` files correctly
- [ ] Pre-commit hook runs in < 10 seconds
- [ ] A commit with intentional lint errors is blocked by the hook

**Design Decisions:**
- **Decision 0.4.1:** ESLint is configured with a custom rule to enforce RULE A-01 (no imports from `../../../modules/X` inside `modules/Y`). This is implemented via `eslint-plugin-import` with a `no-restricted-paths` configuration.
- **Decision 0.4.2:** The pre-commit hook is intentionally lightweight (staged files only) to maintain developer velocity. Full CI runs on push.

### Step 0.5: Vitest & Playwright Testing Infrastructure

**Tasks:**
1. Install Vitest `vitest@^2.x` with `@vitest/ui`, `jsdom` environment, and `@testing-library/react` for React island unit tests.
2. Configure `vitest.config.ts` with Astro-specific settings, path alias resolution, and `jsdom` environment.
3. Install Playwright `@playwright/test@^1.x` and run `npx playwright install` for browser binaries.
4. Configure `playwright.config.ts` with base URL, test directory (`tests/e2e/`), and screenshot-on-failure.
5. Create a sample Vitest test (e.g., testing the `cn` utility) and verify it passes.
6. Create a sample Playwright test (e.g., verifying the home page loads) and verify it passes.

**Requirements Covered:**
- NFR-Build (test execution in CI)

**Objectives (Checklist):**
- [ ] `pnpm test` runs Vitest successfully
- [ ] `pnpm test:e2e` runs Playwright successfully
- [ ] Sample unit test passes
- [ ] Sample E2E test passes

**Design Decisions:**
- **Decision 0.5.1:** Vitest is chosen over Jest for its native Vite integration (Astro uses Vite), faster execution, and better ESM support. The `jsdom` environment is sufficient for React island unit tests.
- **Decision 0.5.2:** Playwright is chosen over Cypress for its faster execution, multi-browser support, and superior handling of static sites (Astro SSG output).

### Step 0.6: GitHub Actions CI/CD Pipeline

**Tasks:**
1. Create `.github/workflows/ci.yml` with the pipeline: `pnpm install` → `pnpm type-check` → `pnpm lint` → `pnpm test` → `pnpm build`.
2. Create `.github/workflows/preview.yml` for Vercel preview deployments on PRs.
3. Configure branch protection on `main`: require PR reviews, require passing CI.
4. Add `dependabot.yml` for weekly minor/patch dependency updates.
5. Verify the CI pipeline runs successfully on a test push.

**Requirements Covered:**
- NFR-Build (automated CI/CD)
- RULE G-01 (main always production-ready)
- RULE G-03 (conventional commits enforced via PR process)

**Objectives (Checklist):**
- [ ] CI pipeline completes in < 90 seconds
- [ ] Build fails on TypeScript error, lint error, or test failure
- [ ] PR previews are generated on every pull request
- [ ] Branch protection rules are active on `main`

**Design Decisions:**
- **Decision 0.6.1:** The CI pipeline follows the exact order recommended by Astro: type-check first (fastest feedback), then lint, then tests, then build (slowest). This minimizes wasted compute on failing builds.
- **Decision 0.6.2:** Vercel is integrated via GitHub Actions (not just the native Vercel Git integration) to ensure the CI pipeline must pass before deployment. The native integration is disabled; deployment is triggered only by the Actions workflow.

### Step 0.7: Environment Variables & Secrets Management

**Tasks:**
1. Create `.env.example` with all required variables: `RESEND_API_KEY`, `PUBLIC_SITE_URL`, `PUBLIC_GA_ID`.
2. Configure `astro:env` schema in `astro.config.ts` for type-safe environment variables.
3. Verify `astro:env` provides IntelliSense and build-time validation for env vars.
4. Document the process for adding real credentials (`.env` file or Vercel dashboard).

**Requirements Covered:**
- FR-CONTACT (contact form infrastructure)

**Objectives (Checklist):**
- [ ] `.env.example` is committed and documented
- [ ] `.env` is gitignored
- [ ] `astro:env` provides type-safe access to env vars in code
- [ ] Build fails if a required env var is missing

**Design Decisions:**
- **Decision 0.7.1:** `astro:env` (Astro's built-in environment variable system) is used instead of `dotenv` or manual `process.env` access. This provides type safety, build-time validation, and automatic client/server variable segregation.
- **Decision 0.7.2:** All environment variables prefixed with `PUBLIC_` are automatically available in the browser. Server-only variables (e.g., `RESEND_API_KEY`) have no prefix and are stripped from client bundles by Astro.

---

## Phase 1: Design System & Global Styles

> **Duration Estimate:** 2–3 days  
> **Goal:** A complete, token-driven design system that enables rapid, consistent UI development across all sections.

### Step 1.1: CSS Custom Properties & Tailwind `@theme`

**Tasks:**
1. Create `src/styles/tokens.css` with the complete Tokyo Night-inspired color system (all 20+ custom properties from the spec).
2. Define `@theme` block consuming these custom properties for Tailwind 4.3.
3. Define spacing scale, border radius scale, and shadow tokens.
4. Create `src/styles/typography.css` with font-face declarations for Geist, Geist Mono, and JetBrains Mono (all self-hosted paths in `public/fonts/`).
5. Define the complete type scale (`--text-xs` through `--text-3xl`) in `tokens.css`.
6. Verify all tokens are accessible via Tailwind utilities (e.g., `text-token-blue`, `bg-surface-0`).

**Requirements Covered:**
- FR-CONTENT (content rendering styles)
- NFR-Performance (self-hosted fonts, zero Google Fonts)
- NFR-Accessibility (contrast ratios ≥ 4.5:1)

**Objectives (Checklist):**
- [ ] All 20+ color tokens are defined in `tokens.css`
- [ ] Tailwind utilities for all tokens work correctly
- [ ] Font files are placed in `public/fonts/` and loaded via `@font-face`
- [ ] No Google Fonts requests at runtime (verified in Network tab)
- [ ] Contrast ratios meet WCAG 2.1 AA (verified via browser DevTools or axe)

**Design Decisions:**
- **Decision 1.1.1:** The color system is inspired by Tokyo Night but adjusted for portfolio context. The semantic token metaphor (blue = keywords/projects, purple = types/certifications, etc.) reinforces the IDE aesthetic while providing functional section identification.
- **Decision 1.1.2:** All colors are defined as CSS custom properties (`--color-*`), not Tailwind theme extensions. This enables runtime theme switching (dark/light) by toggling a single `data-theme` attribute, with zero JavaScript state management.
- **Decision 1.1.3:** Font files are self-hosted in `public/fonts/` as `.woff2` (with `.woff` fallback). This eliminates external requests, improves privacy, and ensures fonts load even on restricted networks.

### Step 1.2: Light/Dark Theme Toggle

**Tasks:**
1. Implement theme toggle logic: `data-theme="dark"` (default) or `data-theme="light"` on `<html>`.
2. Define `[data-theme="light"]` overrides in `tokens.css` for all surface, text, and token colors.
3. Create a ThemeToggle React island (client-side only) that toggles the attribute and persists preference in `localStorage`.
4. Add theme toggle button to the IDE Status Bar (per spec).
5. Ensure `prefers-color-scheme` is respected on first visit (before user toggles).
6. Verify no flash of unstyled content (FOUC) on theme switch.

**Requirements Covered:**
- FR-SHELL-07 (Status Bar theme toggle)
- NFR-Accessibility (respects user preferences)

**Objectives (Checklist):**
- [ ] Dark theme is default
- [ ] Light theme fully renders with all token overrides
- [ ] Theme preference persists across sessions via `localStorage`
- [ ] `prefers-color-scheme: light` is respected on first visit
- [ ] No FOUC on theme switch
- [ ] Toggle button is accessible (keyboard, screen reader)

**Design Decisions:**
- **Decision 1.2.1:** Theme switching uses a single `data-theme` attribute on `<html>` combined with CSS custom properties. This is the KISS-compliant approach — no React Context, no theme provider, no hydration mismatch. The attribute is set via a tiny inline script in `<head>` (before render) to prevent FOUC.
- **Decision 1.2.2:** The ThemeToggle island only handles user interaction and `localStorage` persistence. The actual color application is pure CSS. This decouples the interactive toggle from the styling system.

### Step 1.3: BaseLayout & Global Styles

**Tasks:**
1. Create `src/layouts/BaseLayout.astro` with:
   - HTML5 boilerplate
   - `<head>` with meta tags (charset, viewport, description)
   - Astro `<ViewTransitions />` component (enabled globally from day one per R-06)
   - Global CSS imports (`globals.css`, `tokens.css`, `typography.css`)
   - Inline critical CSS for above-the-fold content
   - Font preloading (`<link rel="preload">` for Geist and JetBrains Mono)
2. Create `src/styles/ide-chrome.css` with base styles for the IDE layout grid (Activity Bar, Sidebar, Editor, Status Bar).
3. Implement CSS scroll progress indicator using `animation-timeline: scroll()` (zero JS).
4. Verify `BaseLayout` renders correctly in both dark and light themes.

**Requirements Covered:**
- FR-CONTENT-02 (Astro View Transitions)
- FR-CONTENT-03 (reading progress indicator, zero JS)
- FR-SHELL (IDE chrome layout foundation)
- NFR-Performance (critical CSS inline, font preloading)
- NFR-SEO (meta tags foundation)

**Objectives (Checklist):**
- [ ] `BaseLayout.astro` is the root layout for all pages
- [ ] Astro `<ViewTransitions />` is present and functional
- [ ] Reading progress bar appears at top of editor area
- [ ] Fonts are preloaded in `<head>`
- [ ] No layout shift on initial load (CLS < 0.05)

**Design Decisions:**
- **Decision 1.3.1:** Astro View Transitions are enabled in `BaseLayout.astro` on day one (R-06). This provides smooth, GPU-accelerated page transitions for all navigations with zero additional effort. It is one of Astro 6's highest-value features.
- **Decision 1.3.2:** The reading progress indicator uses CSS `animation-timeline: scroll()` (not an IntersectionObserver or scroll event listener). This is a zero-JS solution that works natively in modern browsers and gracefully degrades in older ones.
- **Decision 1.3.3:** Critical CSS (IDE chrome grid, base typography, theme variables) is inlined in `<head>` to ensure the layout is painted before any external stylesheets load. Non-critical styles (animations, component-specific) are loaded via `<link rel="stylesheet">`.

### Step 1.4: Motion Variant System

**Tasks:**
1. Create `src/styles/motion-variants.ts` with all reusable Framer Motion variants:
   - `fadeUpVariants` (cards, content reveals)
   - `staggerContainerVariants` (lists of cards)
   - `timelineLineVariants` (vertical line grow)
   - `timelineNodeVariants` (node pop-in)
   - `tabSlideVariants` (tab enter/exit)
2. Create a `useReducedMotionVariants` hook that returns empty transition objects when `prefers-reduced-motion: reduce` is active.
3. Verify all animation components use the hook and variants file.

**Requirements Covered:**
- FR-HOME (timeline animations)
- FR-SHELL (tab animations)
- NFR-Accessibility (`prefers-reduced-motion`)

**Objectives (Checklist):**
- [ ] All animation variants are defined in a single file
- [ ] `useReducedMotionVariants` hook works correctly
- [ ] Animations are disabled when `prefers-reduced-motion: reduce` is set
- [ ] No component defines its own animation variants inline

**Design Decisions:**
- **Decision 1.4.1:** All Framer Motion animations are centralized in `motion-variants.ts` per DRY. This ensures consistency (same easing, same durations) and makes global animation adjustments trivial.
- **Decision 1.4.2:** The `useReducedMotionVariants` hook is the single point of accessibility enforcement. Every animated component uses it. This is more robust than checking `prefers-reduced-motion` in each component individually.

---

## Phase 2: Content Schemas & Validation

> **Duration Estimate:** 2 days  
> **Goal:** Establish the immovable data contract that all content, UI, and infrastructure depends on.

### Step 2.1: Zod 4 Schema Definitions

**Tasks:**
1. Create `src/shared-kernel/schemas/project.schema.ts` with all fields per spec (title, slug, tagline, status, category, tags, dates, URLs, featured, techStack, highlights, paperUrl, doi, architecture).
2. Create `src/shared-kernel/schemas/publication.schema.ts` with all fields (title, authors, type, channel, dates, DOI, arxivId, abstract, tags, citationCount, featured, isEditorial).
3. Create `src/shared-kernel/schemas/certification.schema.ts` (title, issuer, type, issueDate, expiryDate, verifyUrl, badgeImage, verified).
4. Create `src/shared-kernel/schemas/award.schema.ts` (title, issuer, date, category, description, featured, mediaUrl).
5. Create `src/shared-kernel/schemas/experience.schema.ts` (role, company, companyUrl, type, location, startDate, endDate, techStack, highlights).
6. Create `src/shared-kernel/schemas/education.schema.ts` (institution, degree, field, startDate, endDate, gpa, thesis, honors).
7. Create `src/shared-kernel/schemas/profile.schema.ts` (name, titles, bio, location, email, socialLinks, avatar, lastUpdated).
8. Verify all schemas use Zod 4 features: `z.email()`, `z.url()`, `z.string().regex()`, `z.enum()`, `z.array()`, `z.boolean().default()`.

**Requirements Covered:**
- FR-CONTENT-04 (Zod validation at build time)
- O5 (Compile-time Correctness)
- RULE C-01, C-02, C-03 (content rules)
- RULE T-04 (types derived from Zod)

**Objectives (Checklist):**
- [ ] All 7 schemas are written and committed
- [ ] `z.infer<typeof Schema>` produces correct TypeScript types for all schemas
- [ ] Schema files contain no UI or framework imports
- [ ] All date fields use `YYYY-MM` regex validation
- [ ] All slug fields use URL-safe regex (`/^[a-z0-9-]+$/`)
- [ ] `featured` fields have sensible defaults (`false`)

**Design Decisions:**
- **Decision 2.1.1:** Zod 4 is used instead of v3 for its smaller bundle (~2.7KB core), built-in `z.email()` and `z.url()`, native TypeScript inference, and significantly improved error messages. These features directly improve DX and reduce boilerplate.
- **Decision 2.1.2:** Schemas are the single source of truth. All TypeScript interfaces are derived via `z.infer<>`. No manually written interface duplicates a schema. This is enforced by ESLint (no hand-written content types in other files).
- **Decision 2.1.3:** `featured` fields default to `false` and `featuredOrder` is optional. This prevents accidental featured content and ensures the build doesn't fail for missing order on non-featured items.

### Step 2.2: Astro Content Collections Registration

**Tasks:**
1. Create `src/content/config.ts` registering all 7 schemas as Astro Content Collections.
2. Verify `astro check` passes with the registered collections.
3. Test that adding a Markdown file with invalid frontmatter fails the build with a precise Zod error message.

**Requirements Covered:**
- FR-CONTENT-04 (Astro Content Collections integration)
- O5 (Build fails on schema violation)

**Objectives (Checklist):**
- [ ] `src/content/config.ts` imports and registers all 7 schemas
- [ ] `astro check` passes with no errors
- [ ] Invalid frontmatter produces a clear, actionable error message with file path and field name
- [ ] Valid frontmatter passes silently

**Design Decisions:**
- **Decision 2.2.1:** Astro Content Collections provide the integration point between Zod schemas and the file system. The `getCollection()` and `getEntry()` APIs are type-safe and validated at build time. This is the only place in the codebase where Astro's content API is directly referenced.

### Step 2.3: Content Templates & Scaffold CLI

**Tasks:**
1. Create `content/_templates/project.md` with all fields pre-filled with type hints and comments.
2. Create `content/_templates/publication.md`, `certification.md`, `award.md`, `experience.md`, `education.md`, and `profile.md` with the same pattern.
3. Create `scripts/new-content.ts` CLI that:
   - Accepts arguments: `pnpm content:new [type] [name]`
   - Reads the appropriate template
   - Replaces placeholders with the provided name and auto-generated slug
   - Pre-fills `startDate` with current month (YYYY-MM)
   - Writes to the correct content directory
4. Create `scripts/validate-content.ts` that runs Zod validation against all content files without a full Astro build.
5. Add both scripts to `package.json`.
6. Test the CLI by scaffolding a sample project and running validation.

**Requirements Covered:**
- O3 (Extreme Maintainability)
- RULE C-07 (templates as starting points)
- DX mandate (highest-leverage DX improvement)

**Objectives (Checklist):**
- [ ] `pnpm content:new project "My Project"` scaffolds a valid `.md` file
- [ ] `pnpm content:new` works for all 7 content types
- [ ] `pnpm validate` runs Zod validation against all content in < 5 seconds
- [ ] Validation errors show exact file, field, and violation
- [ ] Template files contain helpful comments explaining each field

**Design Decisions:**
- **Decision 2.3.1:** The `new-content.ts` scaffold CLI is built in the first sprint (R-07) because it is the highest-leverage DX improvement in the codebase. It eliminates copy-paste errors, ensures correct frontmatter structure, and pre-fills sensible defaults.
- **Decision 2.3.2:** `validate-content.ts` runs independently of `astro build` to provide fast feedback during content authoring. A content writer can run `pnpm validate` after editing files without waiting for a full SSG build.

### Step 2.4: Sample Content Population

**Tasks:**
1. Create one realistic, complete sample file for each content type:
   - `src/content/projects/ml-pipeline-orchestrator.md`
   - `src/content/publications/icml-2024-nas-paper.md`
   - `src/content/certifications/aws-ml-specialty.md`
   - `src/content/awards/best-paper-icml-2024.md`
   - `src/content/about/experience/cern-research-engineer.md`
   - `src/content/about/education/msc-computer-science.md`
   - `src/content/about/profile.md` (singleton)
2. Ensure each sample file passes `pnpm validate`.
3. Verify `astro build` succeeds with the sample content.

**Requirements Covered:**
- FR-PROJ, FR-PUB, FR-CERT, FR-AWD, FR-HOME (content data)
- O3 (Adding content = one .md file)

**Objectives (Checklist):**
- [ ] 7 sample content files exist and are realistic
- [ ] All sample files pass `pnpm validate`
- [ ] `astro build` succeeds with sample content
- [ ] Content files demonstrate all schema features (optional fields, arrays, enums)

**Design Decisions:**
- **Decision 2.4.1:** Sample content files are realistic (not lorem ipsum) to serve as living documentation. They demonstrate proper use of all schema fields, including optional ones, and provide a reference for future content authors.
- **Decision 2.4.2:** The sample project (`ml-pipeline-orchestrator`) includes a `paperUrl` and `doi` to demonstrate the cross-section bridge between Projects and Publications.

---

## Phase 3: Shared Kernel & Domain Types

> **Duration Estimate:** 1–2 days  
> **Goal:** A robust shared-kernel layer providing types, utilities, and shared UI primitives used across all modules.

### Step 3.1: Domain Type Derivation

**Tasks:**
1. Create `src/shared-kernel/types/Project.ts` exporting `type Project = z.infer<typeof ProjectSchema>`.
2. Repeat for `Publication.ts`, `Certification.ts`, `Award.ts`, `Experience.ts`, `Education.ts`, and `Profile.ts`.
3. Verify no type is manually written — all derived from Zod schemas.
4. Create `src/shared-kernel/types/index.ts` for clean barrel exports.

**Requirements Covered:**
- RULE T-04 (types derived from Zod)
- DRY principle (single source of truth)

**Objectives (Checklist):**
- [ ] All domain types are derived via `z.infer<>`, never manually written
- [ ] Type files have zero runtime imports (pure types)
- [ ] IntelliSense works correctly across the project

**Design Decisions:**
- **Decision 3.1.1:** Domain type files contain only `export type` declarations. They have zero runtime cost and serve as compile-time contracts. This enforces the DRY principle absolutely — if a schema changes, the type updates automatically.

### Step 3.2: Utility Functions

**Tasks:**
1. Create `src/shared-kernel/utils/date.ts` with:
   - `parseDate(dateString: string)` → Date object
   - `formatDate(date: Date)` → "Month Year" string
   - `sortByDateDesc(a, b)` → comparison function for arrays
   - `isExpired(endDate: string)` → boolean
2. Create `src/shared-kernel/utils/slug.ts` with:
   - `toSlug(title: string)` → URL-safe slug
   - `isValidSlug(slug: string)` → boolean (regex test)
3. Create `src/shared-kernel/utils/sort.ts` with generic sort utilities.
4. Create `src/shared-kernel/utils/bibtex.ts` with:
   - `generateBibTeX(publication: Publication)` → formatted BibTeX string
   - `copyToClipboard(text: string)` → Promise<void>
5. Create `src/shared-kernel/utils/cn.ts` — Tailwind class merge utility (`clsx` + `tailwind-merge`).
6. Write Vitest unit tests for all utility functions.

**Requirements Covered:**
- FR-PUB-04 (BibTeX export)
- FR-CONTACT-04 (copy-to-clipboard)
- NFR-Maintainability (shared utilities)

**Objectives (Checklist):**
- [ ] All utility functions have 100% unit test coverage
- [ ] `cn()` merges Tailwind classes correctly (last class wins)
- [ ] `generateBibTeX()` produces valid BibTeX for all publication types
- [ ] Date utilities handle edge cases (invalid dates, "present" end dates)

**Design Decisions:**
- **Decision 3.2.1:** The `cn()` utility is the single class-merge function used across the project. It combines `clsx` (conditional classes) with `tailwind-merge` (conflict resolution). Every component uses it instead of template literals.
- **Decision 3.2.2:** `generateBibTeX()` handles all publication types (journal, conference, book-chapter, preprint, etc.) with appropriate BibTeX entry types (`@article`, `@inproceedings`, `@book`, `@unpublished`). This ensures the exported citation is academically correct.

### Step 3.3: Shared UI Primitives

**Tasks:**
1. Create `src/shared-kernel/ui/SectionHeader.astro` — reusable section header with title and accent color.
2. Create `src/shared-kernel/ui/EmptyState.astro` — displayed when no content matches filters.
3. Create `src/shared-kernel/ui/LoadingSkeleton.astro` — minimal HTML-only skeleton for islands (never a JS spinner).
4. Create `src/shared-kernel/ui/ErrorBoundary.tsx` — React error boundary for islands (graceful degradation).
5. Create `src/shared-kernel/ui/Icons.tsx` — centralized icon components (not re-imported from Lucide per-component).

**Requirements Covered:**
- FR-CONTENT (content rendering)
- NFR-Performance (no JS spinners)
- NFR-Accessibility (error boundaries)

**Objectives (Checklist):**
- [ ] Shared UI components are Astro-native where possible (zero JS)
- [ ] `Icons.tsx` exports all icons used in the project
- [ ] `LoadingSkeleton` renders static HTML only
- [ ] `ErrorBoundary` catches React island crashes and shows fallback UI

**Design Decisions:**
- **Decision 3.3.1:** Loading states use static HTML skeletons, not animated spinners. This aligns with the zero-JS-by-default strategy and looks more native to the IDE aesthetic (a VS Code panel doesn't show spinners).
- **Decision 3.3.2:** Icons are centralized in `Icons.tsx` per DRY. This makes it trivial to replace an icon library or adjust icon sizing globally. Lucide React is used as the source, but all icons are re-exported through the project's own component.

---

## Phase 4: IDE Shell Chrome

> **Duration Estimate:** 4–5 days  
> **Goal:** The complete IDE chrome that serves as the visual container for all content sections.

### Step 4.1: IDELayout Structure

**Tasks:**
1. Create `src/layouts/IDELayout.astro` extending `BaseLayout.astro`.
2. Implement the IDE chrome grid structure:
   - Title Bar (38px)
   - Activity Bar (36px, far-left)
   - Sidebar (draggable 220px–400px)
   - Editor Area (flex-1)
   - Status Bar (26px)
3. Wire up CSS grid/flexbox layout matching the spec ASCII art exactly.
4. Ensure the layout is responsive: collapsible on tablet, bottom nav on mobile.
5. Verify `IDELayout` renders correctly with sample content in the editor slot.

**Requirements Covered:**
- FR-SHELL-01 (persistent IDE chrome)
- FR-SHELL-09 (responsive sidebar)

**Objectives (Checklist):**
- [ ] IDE chrome renders with correct dimensions (38px title bar, 36px activity bar, etc.)
- [ ] Editor area correctly receives and renders Astro slot content
- [ ] Sidebar is resizable on desktop (drag handle)
- [ ] Sidebar collapses to icon rail on tablet
- [ ] Mobile view replaces chrome with bottom navigation

**Design Decisions:**
- **Decision 4.1.1:** The IDE chrome uses CSS Grid for the top-level layout and Flexbox for internal panel arrangements. Grid provides precise control over the fixed-width Activity Bar and flexible Editor Area. Flexbox handles the vertical stacking of Title Bar → Content → Status Bar.
- **Decision 4.1.2:** Sidebar resizing is implemented via a native drag handle using `onPointerDown` and `onPointerMove` events (not a library). The width is clamped between 220px and 400px and persisted in `localStorage`.

### Step 4.2: ActivityBar & Section Navigation

**Tasks:**
1. Create `src/islands/shell/ActivityBar.tsx` React island.
2. Implement icon buttons for: Explorer, Search, About, Projects, Certifications, Publications, Awards.
3. Active section highlighted with the section's accent color (teal, blue, purple, orange, red).
4. Implement "Settings" gear icon at bottom for theme toggle.
5. Ensure full keyboard navigation (Tab, Enter, Arrow keys).
6. Add ARIA labels and roles for screen readers.

**Requirements Covered:**
- FR-SHELL-02 (Activity Bar icons)
- FR-SHELL-07 (Status Bar context)
- NFR-Accessibility (keyboard, ARIA)

**Objectives (Checklist):**
- [ ] All 7 section icons render with correct section accent color
- [ ] Active section is visually distinct
- [ ] Keyboard navigation works (Tab to focus, Enter to activate)
- [ ] ARIA labels describe each button's purpose
- [ ] Theme toggle is accessible from ActivityBar

**Design Decisions:**
- **Decision 4.2.1:** The ActivityBar is a React island (`client:load`) because it manages active section state and responds to keyboard input. However, its initial render is server-rendered as a static list of links, so there is no layout shift on hydration.
- **Decision 4.2.2:** Section colors are not hardcoded in the component. They are derived from CSS custom properties (`--color-section-projects`, etc.) so the component is theme-aware without JavaScript logic.

### Step 4.3: FileExplorer

**Tasks:**
1. Create `src/islands/shell/FileExplorer.tsx` React island.
2. Implement dynamic tree rendering of all content items, organized by section (folder).
3. File-type icons per content type (📗 for about, 📘 for projects, etc.).
4. Expand/collapse folders with animated transitions (CSS `max-height`, not Framer Motion per KISS).
5. Clicking an item opens it as a new tab in the editor area.
6. Sync open/close state with `sessionStorage`.
7. Implement search/filter within the file explorer.

**Requirements Covered:**
- FR-SHELL-03 (File Explorer tree)
- FR-SHELL-04 (open as tab)
- FR-SHELL-09 (sidebar behavior)

**Objectives (Checklist):**
- [ ] File Explorer renders complete content tree
- [ ] Folders expand/collapse with smooth animation
- [ ] Clicking a file opens a tab
- [ ] Tree state persists across page reloads via `sessionStorage`
- [ ] Search/filter filters the tree in real-time

**Design Decisions:**
- **Decision 4.3.1:** FileExplorer is a React island (`client:load`) because it manages complex tree state (open folders, selection, search query) and requires interactivity. The tree data is passed as a prop from the Astro page (build-time), so the island never fetches data.
- **Decision 4.3.2:** Folder expand/collapse uses CSS `max-height` transitions per KISS, not Framer Motion `AnimatePresence`. This is simpler, lighter, and sufficient for a sidebar tree.

### Step 4.4: TabManager

**Tasks:**
1. Create `src/islands/shell/TabManager.tsx` React island.
2. Implement tab bar with: open, close (×), active state with colored underline.
3. Keyboard navigation between tabs (Ctrl+Tab, Ctrl+Shift+Tab).
4. Session persistence via `sessionStorage`.
5. Handle dynamic tab titles and icons based on content type.
6. Implement tab overflow with horizontal scrolling.

**Requirements Covered:**
- FR-SHELL-05 (tab open/close/keyboard/active state)
- FR-SHELL-04 (content opens as tab)

**Objectives (Checklist):**
- [ ] Tabs open when File Explorer items are clicked
- [ ] Tabs close with × button or middle-click
- [ ] Active tab has colored underline matching section accent
- [ ] Ctrl+Tab cycles through tabs
- [ ] Open tabs persist across page reloads via `sessionStorage`
- [ ] Tab overflow is scrollable

**Design Decisions:**
- **Decision 4.4.1:** Tab state is managed with React `useState` + `useContext` inside the island per KISS. No global state library (Zustand, Redux) is used. The state is synced to `sessionStorage` for persistence.
- **Decision 4.4.2:** The tab bar is rendered as empty HTML on initial server render, then hydrated to its actual state. This prevents hydration mismatches (the server doesn't know `sessionStorage` state).

### Step 4.5: Breadcrumb & StatusBar

**Tasks:**
1. Create `src/islands/shell/Breadcrumb.tsx` React island (or Astro component if no interactivity needed).
2. Render clickable path: `portfolio / projects / my-project.md`.
3. Each segment is a navigation link.
4. Create `src/islands/shell/StatusBar.tsx` React island.
5. Display: current section label, estimated reading time, last updated date, theme toggle.
6. Reading time calculated from word count of active content.
7. Update StatusBar on scroll-spy for home page sections.

**Requirements Covered:**
- FR-SHELL-06 (breadcrumb path)
- FR-SHELL-07 (status bar info)
- FR-HOME-08 (scroll-spy reflection)

**Objectives (Checklist):**
- [ ] Breadcrumb shows correct path with clickable segments
- [ ] StatusBar shows current section, reading time, last updated
- [ ] Reading time is accurate (±10% of actual reading time)
- [ ] Theme toggle in StatusBar works
- [ ] Scroll-spy updates StatusBar as user scrolls through home page

**Design Decisions:**
- **Decision 4.5.1:** The Breadcrumb is a simple presentational component (can be Astro-native) because it has no interactive state beyond links. The StatusBar is a React island because it must respond to scroll events and tab changes.
- **Decision 4.5.2:** Reading time is calculated at build time by Astro pages and passed as a prop to the StatusBar. The island only displays the pre-calculated value, eliminating client-side computation.

### Step 4.6: CommandPalette

**Tasks:**
1. Create `src/islands/shell/CommandPalette.tsx` React island.
2. Implement Cmd/Ctrl+K keyboard shortcut trigger.
3. Fuzzy search across all content items and sections.
4. Open selected item as a new tab.
5. Implement modal overlay with focus trapping.
6. Ensure full keyboard navigation (Arrow keys, Enter, Escape).

**Requirements Covered:**
- FR-SHELL-08 (Command Palette)
- NFR-Accessibility (keyboard navigation)

**Objectives (Checklist):**
- [ ] Cmd/Ctrl+K opens the palette from any page
- [ ] Fuzzy search returns relevant results across all content types
- [ ] Selecting an item opens it as a new tab
- [ ] Palette closes on Escape or clicking overlay
- [ ] Focus is trapped inside the palette while open
- [ ] Arrow keys navigate results, Enter selects

**Design Decisions:**
- **Decision 4.6.1:** The CommandPalette is a `client:load` island because it must be immediately responsive to the global Cmd+K shortcut. However, it renders as an empty, hidden container initially. The search index is passed as a prop from the Astro page (build-time generated), so the island never fetches data.
- **Decision 4.6.2:** Fuzzy search is implemented with a lightweight custom function (not a library like Fuse.js) because the dataset is small (< 200 items). This keeps the bundle under budget.

---

## Phase 5: Home Page — Hero

> **Duration Estimate:** 3–4 days  
> **Goal:** A compelling, animated hero section that immediately signals technical identity.

### Step 5.1: Hero Section Structure

**Tasks:**
1. Create `src/modules/home/ui/HeroSection.astro`.
2. Implement full/near-full viewport block.
3. Render name in Geist Mono 52px with letter-spacing.
4. Render brief professional bio paragraph (max 3 sentences, Geist sans 16px, text-secondary).
5. Render social/professional links as icon buttons (GitHub, LinkedIn, Scholar, ORCID, ResearchGate).
6. Render primary CTAs: "View Projects" (token-blue bg) and "Download CV" (outline button).
7. Render location/milestone badges inline.

**Requirements Covered:**
- FR-HOME-01 (hero section content)

**Objectives (Checklist):**
- [ ] Hero renders name, bio, social links, CTAs, and badges
- [ ] Layout matches spec ASCII art
- [ ] All content is driven by `profile.md` frontmatter (no hardcoded text)
- [ ] CTA buttons link to correct routes

**Design Decisions:**
- **Decision 5.1.1:** The HeroSection is an Astro component (not a React island) because the content is static. The only interactivity (typing animation) is isolated in a separate island. This keeps the critical render path free of JavaScript.

### Step 5.2: TypewriterTitle Animation

**Tasks:**
1. Create `src/islands/animations/TypewriterTitle.tsx` React island.
2. Implement cycling discipline titles (Data Automation & AI Engineer, Computer Engineer, Scientific Researcher) every 3 seconds.
3. Use Framer Motion `AnimatePresence` for text swap with fade/slide transition.
4. Ensure `prefers-reduced-motion` disables the cycling (shows static first title).
5. Mount with `client:idle` to avoid blocking critical render.

**Requirements Covered:**
- FR-HOME-01 (animated discipline titles)
- NFR-Accessibility (`prefers-reduced-motion`)

**Objectives (Checklist):**
- [ ] Title cycles through all 3 disciplines every 3 seconds
- [ ] Transition is smooth (fade + slide)
- [ ] Animation respects `prefers-reduced-motion`
- [ ] Island mounts with `client:idle`

**Design Decisions:**
- **Decision 5.2.1:** `TypewriterTitle` uses Framer Motion `AnimatePresence` with a simple opacity + y-offset transition. The "typewriter" effect is simulated via the text swap, not character-by-character typing (which is heavier and less readable). This provides the kinetic energy of a typewriter with superior performance.
- **Decision 5.2.2:** The island uses `client:idle` because the hero is readable without the animation (static first title is server-rendered). The animation is enhancement, not requirement.

### Step 5.3: 3D Hero Element (R3F Fallback)

**Tasks:**
1. Create `src/islands/scenes/HeroScene.tsx` React island with R3F.
2. Implement a lightweight scene: floating geometric shapes (icosahedron, torus) with slow rotation.
3. Use ` drei` helpers (`OrbitControls` disabled, auto-rotation enabled).
4. Ensure scene is responsive to container size.
5. Mount with `client:idle`.
6. Verify scene degrades gracefully if WebGL is unavailable (static fallback image).

**Requirements Covered:**
- FR-HOME-07 (3D hero element)
- NFR-Performance (`client:idle`)

**Objectives (Checklist):**
- [ ] 3D scene renders floating geometric shapes
- [ ] Scene auto-rotates slowly
- [ ] `client:idle` mounting confirmed (doesn't block LCP)
- [ ] Graceful fallback if WebGL is unavailable
- [ ] Scene does not cause layout shift

**Design Decisions:**
- **Decision 5.3.1:** The R3F fallback scene uses extremely simple geometry (low-poly shapes, no textures, no lighting calculations beyond basic materials). This keeps the WebGL overhead minimal and ensures 60fps on mid-range devices.
- **Decision 5.3.2:** A static CSS-generated fallback (gradient or SVG shapes) is displayed while the R3F canvas loads. If WebGL fails, the fallback remains visible. This ensures the hero area never looks broken.

### Step 5.4: Scroll Indicator & Initial Animations

**Tasks:**
1. Implement scroll indicator at bottom of hero ("Scroll to explore ↓").
2. Add entry animations for hero elements:
   - Name: fade-in + slide-up, 400ms ease-out
   - Badges: stagger reveal, 100ms delay per badge
   - Social icons: stagger reveal from left, 60ms delay each
   - CTA buttons: appear last, subtle scale-up
3. All animations use centralized `motion-variants.ts` and `useReducedMotionVariants`.
4. Verify animations trigger correctly on page load and respect reduced motion.

**Requirements Covered:**
- FR-HOME-01 (hero animations)
- NFR-Accessibility (`prefers-reduced-motion`)

**Objectives (Checklist):**
- [ ] All hero elements animate in on load with correct stagger timing
- [ ] Animations use centralized variants
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Scroll indicator is visible and functional

**Design Decisions:**
- **Decision 5.4.1:** Hero entry animations are applied to the static Astro-rendered HTML via CSS `@keyframes` where possible (name fade-in, badge stagger). Only the discipline title cycling requires React/Framer Motion. This hybrid approach minimizes JavaScript while maintaining visual polish.

---

## Phase 6: Home Page — Deep Content

> **Duration Estimate:** 4–5 days  
> **Goal:** The academic timeline, experience timeline, milestones grid, skills map, and contact section structure.

### Step 6.1: AnimatedTimeline Component

**Tasks:**
1. Create `src/islands/animations/AnimatedTimeline.tsx` React island.
2. Implement vertical timeline with:
   - Line that animates in on scroll (`scaleY` from 0 to 1)
   - Nodes that pop in sequentially with spring animations
   - Cards that slide in from alternating sides (left/right desktop, all-right mobile)
3. Support expand/collapse of highlights using Framer Motion `AnimatePresence`.
4. Left border accent in section color.
5. Mount with `client:visible` (hydrates when scrolled into view).
6. Write Vitest tests for timeline logic (sorting, filtering).

**Requirements Covered:**
- FR-HOME-02 (Academic Timeline)
- FR-HOME-03 (Professional Experience Timeline)
- NFR-Performance (`client:visible`)
- NFR-Accessibility (`prefers-reduced-motion`)

**Objectives (Checklist):**
- [ ] Timeline line animates in on scroll
- [ ] Nodes pop in with spring physics
- [ ] Cards slide from alternating sides
- [ ] Expand/collapse works with layout animation
- [ ] `client:visible` hydration confirmed
- [ ] Reduced motion respected
- [ ] Unit tests pass

**Design Decisions:**
- **Decision 6.1.1:** `AnimatedTimeline` is the most complex React component in the project. It is built in isolation during this phase (R-03) with full Vitest testing before integration into the home page. This prevents cascading bugs.
- **Decision 6.1.2:** The timeline uses `IntersectionObserver` (via Framer Motion's `useInView`) to trigger animations only when the element enters the viewport. This prevents unnecessary animation calculations for off-screen content.
- **Decision 6.1.3:** The same `AnimatedTimeline` component is reused for both Academic and Professional timelines. The visual differences (badge styles, border colors) are controlled via props, not duplicated code.

### Step 6.2: Academic Timeline Integration

**Tasks:**
1. Create `src/modules/about/features/get-education-list/` Query Slice:
   - `GetEducationListQuery.ts`
   - `GetEducationListHandler.ts`
   - `GetEducationListResponse.ts`
   - `GetEducationListHandler.test.ts`
2. Create `AstroContentEducationAdapter` implementing `IEducationRepository`.
3. Create `InMemoryEducationAdapter` for tests.
4. Integrate timeline into home page via Astro page (`src/pages/index.astro`).
5. Pass sorted education entries to `AnimatedTimeline` island.
6. Verify CERN card gets special visual treatment (if present in data).

**Requirements Covered:**
- FR-HOME-02 (Academic Timeline)
- FR-PROJ-04 (cross-section bridge)

**Objectives (Checklist):**
- [ ] Query Slice returns sorted education entries
- [ ] Timeline renders academic data correctly
- [ ] Handler unit tests pass
- [ ] Adapter maps Content Collection entries to domain objects correctly

**Design Decisions:**
- **Decision 6.2.1:** The education timeline uses the same `AnimatedTimeline` component as the experience timeline, differentiated only by data and minor styling props. This maximizes reuse and minimizes maintenance.

### Step 6.3: Professional Experience Timeline Integration

**Tasks:**
1. Create `src/modules/about/features/get-experience-timeline/` Query Slice.
2. Create `AstroContentExperienceAdapter` and `InMemoryExperienceAdapter`.
3. Integrate into home page.
4. Verify cards show: role (token-blue), company (linked), date range, type badge, tech stack pills, expandable highlights.
5. Ensure CERN card has special treatment: wider card, institution logo area, international flag indicator.

**Requirements Covered:**
- FR-HOME-03 (Professional Experience Timeline)

**Objectives (Checklist):**
- [ ] Experience timeline renders with correct visual treatment
- [ ] Tech stack pills are interactive (hover glow)
- [ ] CERN card has distinct visual styling
- [ ] Expandable highlights work correctly

**Design Decisions:**
- **Decision 6.3.1:** The CERN card's special treatment is implemented via a conditional style prop on the timeline card component, not a separate component. The condition checks for `company === "CERN"` (or a `special: true` flag in the content schema). This keeps the component generic while allowing content-driven exceptions.

### Step 6.4: MilestonesGrid

**Tasks:**
1. Create `src/modules/home/features/get-milestones/` Query Slice.
2. Create `src/modules/home/ui/MilestonesGrid.astro`.
3. Implement responsive grid: 3 columns desktop, 2 tablet, 1 mobile.
4. Each card: icon, title, date, context badge.
5. Stagger reveal on scroll using `IntersectionObserver` + CSS animations.
6. Hover effect: `translateY(-4px)`, subtle box-shadow glow in section accent color.
7. Integrate into home page.

**Requirements Covered:**
- FR-HOME-04 (Milestones Grid)
- FR-AWD-03 (Featured awards appear in Milestones)

**Objectives (Checklist):**
- [ ] Grid renders curated milestones from content data
- [ ] Responsive layout works at all breakpoints
- [ ] Cards stagger-reveal on scroll
- [ ] Hover lift and glow effect work
- [ ] Featured awards from Awards module appear correctly

**Design Decisions:**
- **Decision 6.4.1:** Milestones are curated via a `featured: true` flag in content files (awards, experience, education). The `GetMilestonesHandler` aggregates featured items from multiple collections. This is a cross-collection read operation, which is acceptable in MVSD-Lite because there are no aggregates or transactions — it's a pure data projection.

### Step 6.5: SkillsMap

**Tasks:**
1. Create `src/modules/home/features/get-skills-map/` Query Slice.
2. Create `src/modules/home/ui/SkillsMap.astro`.
3. Implement tag cloud grouped by domain: Languages, Data Engineering, AI/ML, Software Architecture, Research Tools, Cloud & Infra.
4. Each tag is an interactive pill with hover glow in category color.
5. Shadcn Tooltip on hover with brief context note.
6. Verify all skills are sourced from content data, not hardcoded.

**Requirements Covered:**
- FR-HOME-05 (Skills / Tech Stack)

**Objectives (Checklist):**
- [ ] Skills are grouped by domain category
- [ ] Each tag is an interactive pill
- [ ] Hover glow matches category color
- [ ] Tooltip shows context note
- [ ] Data is sourced from `profile.md` or aggregated from projects

**Design Decisions:**
- **Decision 6.5.1:** The skills data is stored in `profile.md` as a structured YAML frontmatter array grouped by category. This keeps the skills maintainable via content editing rather than code changes. Alternatively, skills can be auto-aggregated from project `techStack` fields via a Query Handler.

### Step 6.6: Contact Section Structure

**Tasks:**
1. Create `src/modules/home/ui/ContactSection.astro`.
2. Render email with copy-to-clipboard functionality.
3. Render location.
4. Render social/professional links as styled icon buttons.
5. Render contact form structure (name, email, subject, message fields) — functionality added in Phase 10.
6. Integrate into home page footer area.
7. Verify accessible at `/#contact`.

**Requirements Covered:**
- FR-HOME-06 (Contact Section)
- FR-CONTACT-01 (footer area)

**Objectives (Checklist):**
- [ ] Contact section renders in home page footer
- [ ] Email copy-to-clipboard works
- [ ] Social links are correct and accessible
- [ ] Form structure is present (functionality in Phase 10)
- [ ] Deep link `/#contact` scrolls to section

**Design Decisions:**
- **Decision 6.6.1:** The contact form is a React island (`client:visible`) mounted within the static Astro contact section. This isolates the form's interactivity (validation, submission) while keeping the surrounding content static.

---

## Phase 7: Projects Module

> **Duration Estimate:** 4–5 days  
> **Goal:** A complete, filterable project gallery with detail pages.

### Step 7.1: Domain & Infrastructure Layer

**Tasks:**
1. Create `src/modules/projects/domain/IProjectRepository.ts` with `findAll()`, `findFeatured()`, `findBySlug()`.
2. Create `src/modules/projects/infrastructure/AstroContentProjectAdapter.ts` implementing the port.
3. Create `src/modules/projects/infrastructure/InMemoryProjectAdapter.ts` for tests.
4. Verify `AstroContentProjectAdapter` uses `getCollection("projects")` and maps entries to `Project` domain objects.
5. Write unit tests for both adapters.

**Requirements Covered:**
- RULE A-01, A-04, A-05, A-06 (architecture rules)
- O6 (Evolution-Ready)

**Objectives (Checklist):**
- [ ] `IProjectRepository` interface is small and focused
- [ ] `AstroContentProjectAdapter` implements all methods correctly
- [ ] `InMemoryProjectAdapter` works identically for tests
- [ ] No Astro imports in domain or handler files
- [ ] Adapter is only instantiated in Astro pages

**Design Decisions:**
- **Decision 7.1.1:** `IProjectRepository` follows Interface Segregation (SOLID-I). It only knows about projects — not certifications, not publications. This keeps the interface stable and the module isolated.
- **Decision 7.1.2:** The InMemory adapter is not just a test utility — it is a legitimate implementation of the port. This validates that the port interface is complete and that handlers are truly decoupled from Astro.

### Step 7.2: Query Slices

**Tasks:**
1. Create `GetAllProjects` Query Slice with filtering logic (category, status, tags, search).
2. Create `GetFeaturedProjects` Query Slice with `limit` and `category` parameters.
3. Create `GetProjectBySlug` Query Slice.
4. Each slice: Query DTO, Handler, Response DTO, Handler test.
5. Handlers contain only orchestration (sort, filter, map) — no framework code.
6. Verify all handlers work with both `AstroContentProjectAdapter` and `InMemoryProjectAdapter`.

**Requirements Covered:**
- FR-PROJ-01 (project gallery)
- FR-PROJ-02 (filters)
- FR-PROJ-05 (featured projects)
- O5 (Compile-time Correctness)

**Objectives (Checklist):**
- [ ] `GetAllProjectsHandler` filters by category, status, tags, and search text
- [ ] `GetFeaturedProjectsHandler` returns ordered featured projects
- [ ] `GetProjectBySlugHandler` returns null for missing slugs
- [ ] All handlers have 100% unit test coverage
- [ ] Handlers contain zero framework imports

**Design Decisions:**
- **Decision 7.2.1:** Filter logic in `GetAllProjectsHandler` is case-insensitive and matches against title, tagline, and tags. The search query is trimmed and split into tokens (AND logic). This provides a robust search experience without requiring a search index library.
- **Decision 7.2.2:** Featured projects are sorted by `featuredOrder` (ascending). If `featuredOrder` is missing, they fall back to `startDate` (descending). This provides predictable ordering even when content authors forget to set the order field.

### Step 7.3: Projects Gallery UI

**Tasks:**
1. Create `src/modules/projects/ui/ProjectsGallery.astro`.
2. Implement responsive masonry or grid layout.
3. Each card: preview image, title, tagline, status badge, category tag, tech stack icon row.
4. Create `src/modules/projects/ui/ProjectCard.astro`.
5. Implement "Pinned" section at top for featured projects.
6. Integrate into `src/pages/projects/index.astro`.

**Requirements Covered:**
- FR-PROJ-01 (gallery layout)
- FR-PROJ-05 (featured/pinned section)

**Objectives (Checklist):**
- [ ] Gallery renders all projects from handler response
- [ ] Cards are responsive (3-col → 2-col → 1-col)
- [ ] Featured projects appear in "Pinned" section
- [ ] Preview images use Astro `<Image>` component
- [ ] Card hover states are visible and accessible

**Design Decisions:**
- **Decision 7.3.1:** The gallery uses CSS Grid with `auto-fill` and `minmax()` for responsive columns. This provides a true masonry-like effect without the JavaScript overhead of a masonry library.
- **Decision 7.3.2:** Project cards are Astro components (static) because they have no interactive state. The filter panel (Step 7.4) is the only interactive element on the page.

### Step 7.4: ProjectFilter Island

**Tasks:**
1. Create `src/islands/filters/ProjectFilter.tsx` React island.
2. Implement filters: category dropdown, status dropdown, tags multi-select, text search, featured toggle.
3. Synchronize filter state with URL query parameters (`?category=ai-ml&tags=python`).
4. Use `URLSearchParams` directly — no state management library.
5. Mount with `client:visible`.
6. Verify filter state persists on page reload.

**Requirements Covered:**
- FR-PROJ-02 (filter panel)
- R-05 (URL-persistent filters from day one)

**Objectives (Checklist):**
- [ ] All filters work independently and in combination
- [ ] URL updates in real-time as filters change
- [ ] Filter state persists on page reload
- [ ] Filter panel uses Shadcn DropdownMenu and Badge components
- [ ] Clear filters button resets all state

**Design Decisions:**
- **Decision 7.4.1:** URL-persistent filter state is implemented from day one (R-05) using `URLSearchParams` and `history.replaceState()`. This avoids the painful retrofitting that would occur if URL state were added later.
- **Decision 7.4.2:** The filter island receives the full project list as a prop and filters client-side. This is acceptable because the dataset is small (< 100 projects). For larger datasets, server-side filtering via Query parameters would be preferred.

### Step 7.5: Project Detail Pages

**Tasks:**
1. Create `src/pages/projects/[slug].astro` dynamic route.
2. Create `src/modules/projects/ui/ProjectDetail.astro`.
3. Render README-style documentation: header metadata, preview image, Markdown body.
4. Integrate Shiki syntax highlighting (custom IDE theme).
5. Render Mermaid diagrams (build-time rendering).
6. Render KaTeX math equations.
7. Show GitHub and demo links.
8. Show "View Paper" button if `paperUrl` or `doi` exists.
9. Right sidebar (desktop): tech stack, links, status, dates, related projects.

**Requirements Covered:**
- FR-PROJ-03 (detail page)
- FR-PROJ-04 (cross-section bridge)
- FR-CONTENT-01 (Markdown rendering)

**Objectives (Checklist):**
- [ ] Detail page renders at `/projects/[slug]`
- [ ] Markdown body renders with Shiki, Mermaid, and KaTeX
- [ ] GitHub/demo links are visible and functional
- [ ] "View Paper" button appears conditionally
- [ ] Right sidebar shows metadata on desktop
- [ ] Related projects are suggested based on category/tags

**Design Decisions:**
- **Decision 7.5.1:** The project detail page uses Astro's built-in Markdown/MDX rendering via the `<Content />` component from `astro:content`. This provides Shiki, Mermaid, and KaTeX integration out of the box when configured in `astro.config.ts`.
- **Decision 7.5.2:** The "View Paper" button creates a cross-section bridge between Projects and Publications. This demonstrates the portfolio's interconnected data model and helps academic visitors navigate between related content.

---

## Phase 8: Publications Module

> **Duration Estimate:** 3–4 days  
> **Goal:** An academic-grade publications section with editorial/personal segmentation and BibTeX export.

### Step 8.1: Domain & Infrastructure Layer

**Tasks:**
1. Create `src/modules/publications/domain/IPublicationRepository.ts` with `findAll()`, `findEditorial()`, `findPersonal()`, `findBySlug()`.
2. Create `AstroContentPublicationAdapter` and `InMemoryPublicationAdapter`.
3. Verify correct handling of `isEditorial` flag.

**Requirements Covered:**
- FR-PUB-02 (Editorial/Personal segmentation)
- RULE A-01, A-04 (architecture)

**Objectives (Checklist):**
- [ ] `IPublicationRepository` has focused, small interface
- [ ] `findEditorial()` returns only peer-reviewed publications
- [ ] `findPersonal()` returns only non-peer-reviewed publications
- [ ] Adapter maps Content Collection entries correctly

**Design Decisions:**
- **Decision 8.1.1:** The `IPublicationRepository` has separate methods for `findEditorial()` and `findPersonal()` rather than a single `findAll()` with a filter parameter. This makes the interface more explicit and the caller's intent clearer. It also allows the adapter to optimize the query if needed (though both currently filter in memory).

### Step 8.2: Query Slices

**Tasks:**
1. Create `GetAllPublications` Query Slice with filters (type, year, isEditorial, search).
2. Create `GetPublicationBySlug` Query Slice.
3. Each slice has full test coverage.

**Requirements Covered:**
- FR-PUB-01 (publication list)
- FR-PUB-03 (filters)
- FR-PUB-05 (total count)

**Objectives (Checklist):**
- [ ] Handler filters by type, year range, and search text
- [ ] `isEditorial` filter correctly segments publications
- [ ] Total count is returned in response
- [ ] All handlers tested with InMemory adapter

**Design Decisions:**
- **Decision 8.2.1:** The `GetAllPublicationsHandler` returns both the filtered list and the total count. This avoids a second query for the count display in the section header.

### Step 8.3: Publications List UI

**Tasks:**
1. Create `src/modules/publications/ui/PublicationList.astro`.
2. Implement academic-style list format grouped by year (descending).
3. Each entry: citation-format line (own name bolded), title, channel, year, type badge.
4. Action links: DOI, arXiv, PDF, URL.
5. Shadcn Tabs for Editorial / Personal segmentation at top.
6. Integrate into `src/pages/publications/index.astro`.

**Requirements Covered:**
- FR-PUB-01 (list format)
- FR-PUB-02 (Editorial/Personal tabs)
- FR-PUB-05 (total count)

**Objectives (Checklist):**
- [ ] Publications are grouped by year descending
- [ ] Own name is bolded in author list
- [ ] All external links (DOI, arXiv, PDF) are present
- [ ] Editorial/Personal tabs switch content without page reload
- [ ] Total count displays correctly

**Design Decisions:**
- **Decision 8.3.1:** The publication list is an Astro component because it has no interactive state beyond the tabs (which are Shadcn primitives). The filter island (Step 8.4) handles all dynamic filtering.
- **Decision 8.3.2:** Author names are bolded by comparing against the profile name stored in `profile.md`. This is done at build time by the handler, not client-side.

### Step 8.4: PublicationFilter Island

**Tasks:**
1. Create `src/islands/filters/PublicationFilter.tsx`.
2. Implement filters: type, year range, tags/keywords, text search.
3. URL-persistent state via `URLSearchParams`.
4. Mount with `client:visible`.

**Requirements Covered:**
- FR-PUB-03 (filters)
- R-05 (URL-persistent filters)

**Objectives (Checklist):**
- [ ] All publication filters work correctly
- [ ] URL state persists on reload
- [ ] Filters combine logically (AND)

**Design Decisions:**
- **Decision 8.4.1:** Year range filter uses two dropdowns (from, to) with pre-populated year options derived from the content data. This is more user-friendly than a text input and prevents invalid ranges.

### Step 8.5: Publication Detail & BibTeX Export

**Tasks:**
1. Create `src/pages/publications/[slug].astro`.
2. Create `src/modules/publications/ui/PublicationDetail.astro`.
3. Render full abstract, complete author list, venue details, all links.
4. Implement BibTeX export button:
   - Uses `generateBibTeX()` utility from shared-kernel
   - Copies to clipboard via `copyToClipboard()`
   - Shows Shadcn Toast confirmation
5. Render BibTeX in a Shadcn Dialog with Shiki syntax highlighting (`bibtex` language).

**Requirements Covered:**
- FR-PUB-04 (detail page + BibTeX export)
- FR-CONTENT-01 (Shiki highlighting)

**Objectives (Checklist):**
- [ ] Detail page renders full publication metadata
- [ ] BibTeX export button copies correct citation to clipboard
- [ ] Dialog shows formatted BibTeX with syntax highlighting
- [ ] Toast confirms successful copy
- [ ] BibTeX is academically correct for all publication types

**Design Decisions:**
- **Decision 8.5.1:** The BibTeX dialog uses Shiki for syntax highlighting because it is already configured for the project's Markdown rendering. No additional library is needed.
- **Decision 8.5.2:** The copy-to-clipboard functionality uses the modern `navigator.clipboard.writeText()` API with a fallback to `document.execCommand('copy')` for older browsers. The fallback is wrapped in a try-catch to prevent crashes.

---

## Phase 9: Certifications & Awards Modules

> **Duration Estimate:** 2–3 days  
> **Goal:** Grid-based sections for certifications and awards with filtering and verification states.

### Step 9.1: Certifications Module

**Tasks:**
1. Create `ICertificationRepository`, adapters, and `GetAllCertifications` Query Slice.
2. Create `CertificationCard.astro` with: badge image, title, issuer, type, issue date, validity window, "Verify" link.
3. Implement group/filter by type (certification, badge, course, specialization, degree) and by issuer.
4. Show verification checkmark for `verified: true`.
5. Visually distinguish expired certifications (but do not hide).
6. Integrate into `src/pages/certifications/index.astro`.

**Requirements Covered:**
- FR-CERT-01 (grid cards)
- FR-CERT-02 (group/filter)
- FR-CERT-03 (verified badge)
- FR-CERT-04 (expired distinction)

**Objectives (Checklist):**
- [ ] Certification grid renders all items
- [ ] Filter by type and issuer works
- [ ] Verified checkmark is visible and accessible
- [ ] Expired certifications have distinct styling
- [ ] "Verify" link opens issuer verification page

**Design Decisions:**
- **Decision 9.1.1:** Expired certifications are styled with reduced opacity and a subtle "Expired" badge, but remain visible. This is more honest and useful than hiding them — it shows the full career timeline.
- **Decision 9.1.2:** The verification checkmark uses the section accent color (purple for certifications) to maintain visual consistency with the IDE token metaphor.

### Step 9.2: Awards Module

**Tasks:**
1. Create `IAwardRepository`, adapters, and `GetAllAwards` / `GetFeaturedAwards` Query Slices.
2. Create `AwardCard.astro` with: title, issuer, date, category badge, description, optional media link.
3. Implement filter/group by category (academic, professional, competition, research, open-source).
4. Ensure featured awards appear in Home Milestones section.
5. Integrate into `src/pages/awards/index.astro`.

**Requirements Covered:**
- FR-AWD-01 (awards grid)
- FR-AWD-02 (filter/group)
- FR-AWD-03 (featured awards in milestones)

**Objectives (Checklist):**
- [ ] Awards grid renders all items
- [ ] Filter by category works
- [ ] Featured awards appear in Home Milestones
- [ ] Media links open correctly

**Design Decisions:**
- **Decision 9.2.1:** Awards use the same grid system as certifications and milestones for visual consistency. The category badge uses the section accent color (red for awards) to reinforce the IDE token metaphor.
- **Decision 9.2.2:** The `GetFeaturedAwardsHandler` is called by both the Awards page and the Home page. This demonstrates the reusability of Query Slices across different Delivery layers.

---

## Phase 10: Contact & Server Actions

> **Duration Estimate:** 2–3 days  
> **Goal:** A functional contact form with Astro Server Actions, Resend integration, and client-side validation.

### Step 10.1: Contact Form Island

**Tasks:**
1. Create `src/islands/contact/ContactForm.tsx`.
2. Implement form fields: name, email, subject, message.
3. Client-side validation using Zod schema (shared `contact.schema.ts`).
4. Real-time field validation with error messages.
5. Framer Motion shake animation on validation errors.
6. Accessible form labels, focus management, and error announcements.

**Requirements Covered:**
- FR-HOME-06 (contact form structure)
- FR-CONTACT-02 (client-side validation)
- NFR-Accessibility (form accessibility)

**Objectives (Checklist):**
- [ ] All fields validate in real-time
- [ ] Error messages are clear and actionable
- [ ] Shake animation plays on submit with errors
- [ ] Form is fully keyboard-navigable
- [ ] Screen readers announce validation errors

**Design Decisions:**
- **Decision 10.1.1:** Client-side validation uses the same Zod schema as server-side validation (`contact.schema.ts`). This ensures consistency and eliminates the possibility of client/server validation drift.
- **Decision 10.1.2:** The shake animation uses Framer Motion's `animate` prop with a rapid x-offset oscillation. It is suppressed when `prefers-reduced-motion` is active (errors shown statically).

### Step 10.2: Astro Server Action & Resend Integration

**Tasks:**
1. Create `src/pages/api/contact.ts` Astro API endpoint (Server Action).
2. Implement server-side Zod validation of form data.
3. Create `src/lib/resend.ts` Resend client singleton.
4. Implement mock/test mode for Resend:
   - If `RESEND_API_KEY` is missing or `NODE_ENV === "development"`, log email to console instead of sending.
   - When real credentials are added to `.env`, the same code path calls Resend API.
5. Handle success: return 200 with success message.
6. Handle errors: return 400/500 with actionable error messages.
7. Integrate with Shadcn Toast for user feedback.

**Requirements Covered:**
- FR-HOME-06 (contact form submission)
- FR-CONTACT-02 (Astro Server Action)
- NFR-Build (Resend email delivery)

**Objectives (Checklist):**
- [ ] Server Action validates form data correctly
- [ ] Mock mode logs email to console (no Resend key needed)
- [ ] Real mode sends email via Resend API (when key provided)
- [ ] Switching from mock to real requires only adding `RESEND_API_KEY` to `.env`
- [ ] Success shows animated checkmark + Toast
- [ ] Error shows inline field errors or global error message

**Design Decisions:**
- **Decision 10.2.1:** The Resend integration has a built-in mock/test mode. When `RESEND_API_KEY` is missing, the Server Action logs the email content to the console and returns a success response. This allows full development and testing of the contact form without a Resend account. Adding real credentials is a single `.env` change with zero code modifications.
- **Decision 10.2.2:** The Resend client is a singleton in `src/lib/resend.ts` that is imported only by the Server Action. It is never imported by client-side code, preventing accidental API key exposure.

### Step 10.3: Contact Section Final Integration

**Tasks:**
1. Integrate `ContactForm` island into `ContactSection.astro`.
2. Verify the contact section is accessible at `/#contact`.
3. Test full flow: fill form → submit → see success feedback.
4. Verify email copy-to-clipboard functionality.

**Requirements Covered:**
- FR-CONTACT-01 (footer area)
- FR-CONTACT-03 (social links)
- FR-CONTACT-04 (email copy-to-clipboard)

**Objectives (Checklist):**
- [ ] Contact form submits successfully in mock mode
- [ ] Success feedback is visible and animated
- [ ] Email copy-to-clipboard works
- [ ] Social links open in new tabs

**Design Decisions:**
- **Decision 10.3.1:** The contact section is part of the home page (footer area) and also accessible via deep link `/#contact`. This provides two entry points without duplicating content.

---

## Phase 11: Testing, CI/CD & Launch

> **Duration Estimate:** 3–4 days  
> **Goal:** Comprehensive test coverage, automated CI/CD, Lighthouse validation, and production deployment.

### Step 11.1: Unit Test Coverage

**Tasks:**
1. Write Vitest unit tests for all Query Handlers (one test file per slice).
2. Write unit tests for all utility functions (`date.ts`, `slug.ts`, `sort.ts`, `bibtex.ts`, `cn.ts`).
3. Write unit tests for adapters (both AstroContent and InMemory).
4. Aim for 100% coverage on handlers and utilities.
5. Run `pnpm test` and verify all tests pass.

**Requirements Covered:**
- NFR-Maintainability (test coverage)
- RULE A-04 (handlers testable)

**Objectives (Checklist):**
- [ ] Every Query Handler has a corresponding `.test.ts` file
- [ ] All utility functions are tested
- [ ] Both adapter implementations are tested
- [ ] `pnpm test` passes with 100% handler coverage

**Design Decisions:**
- **Decision 11.1.1:** Unit tests use InMemory adapters exclusively. This makes tests fast (< 100ms per suite) and independent of the file system or Astro build. It also validates that the port interfaces are complete and the handlers are truly decoupled.

### Step 11.2: E2E Test Suite

**Tasks:**
1. Write Playwright E2E tests for critical user journeys:
   - **Navigation:** File explorer, tabs, command palette, breadcrumb
   - **Home page:** Hero, timelines, milestones, skills, contact form
   - **Content pages:** Projects filter, publication detail, certification grid, award grid
   - **Contact form:** Validation, submission, success feedback
2. Configure Playwright to run against the production build (`astro build` + `astro preview`).
3. Verify tests run in headless mode in CI.

**Requirements Covered:**
- FR-SHELL (navigation)
- FR-HOME (home page content)
- FR-PROJ, FR-PUB, FR-CERT, FR-AWD (content sections)
- FR-CONTACT (contact form)

**Objectives (Checklist):**
- [ ] Navigation E2E tests pass
- [ ] Home page E2E tests pass
- [ ] Content pages E2E tests pass
- [ ] Contact form E2E test passes
- [ ] All E2E tests run in CI

**Design Decisions:**
- **Decision 11.2.1:** E2E tests run against the production build, not the dev server. This catches issues that only appear in the optimized build (e.g., tree-shaking problems, hydration mismatches).

### Step 11.3: GitHub Actions CI/CD Finalization

**Tasks:**
1. Finalize `.github/workflows/ci.yml` with the complete pipeline:
   - `pnpm install` (frozen lockfile)
   - `pnpm type-check`
   - `pnpm lint`
   - `pnpm test`
   - `pnpm test:e2e`
   - `pnpm build`
   - Deploy to Vercel (production or preview)
2. Add Lighthouse CI to the pipeline (threshold: 90 across all categories).
3. Verify the pipeline runs successfully on a test PR.
4. Verify production deploy triggers on push to `main`.

**Requirements Covered:**
- NFR-Build (CI pipeline < 90s)
- NFR-Performance (Lighthouse ≥ 90)
- RULE G-01 (main always production-ready)

**Objectives (Checklist):**
- [ ] CI pipeline completes in < 90 seconds
- [ ] Build fails on any failing test
- [ ] Lighthouse CI runs and reports scores
- [ ] Production deploy succeeds on `main` push
- [ ] PR preview deploy succeeds on every pull request

**Design Decisions:**
- **Decision 11.3.1:** Lighthouse CI is integrated directly into the GitHub Actions pipeline, not as a separate service. This ensures performance regressions block deployment.
- **Decision 11.3.2:** The pipeline uses `pnpm install --frozen-lockfile` to ensure reproducible builds. Any discrepancy between `package.json` and `pnpm-lock.yaml` fails the build.

### Step 11.4: SEO & Metadata Finalization

**Tasks:**
1. Implement per-page `<title>`, `<meta name="description">`, and Open Graph tags.
2. Implement JSON-LD structured data:
   - `ScholarlyArticle` for publications
   - `SoftwareApplication` / `CreativeWork` for projects
   - `Person` for the profile
3. Verify `sitemap.xml` is auto-generated by `@astrojs/sitemap`.
4. Verify `robots.txt` is open to all crawlers.
5. Add static Open Graph images per section in `public/images/og/`.
6. Test OG tags with a social sharing debugger (e.g., Facebook Sharing Debugger).

**Requirements Covered:**
- FR-CONTENT (SEO)
- NFR-SEO (structured metadata)

**Objectives (Checklist):**
- [ ] Every page has unique `<title>` and `<meta description>`
- [ ] OG tags render correctly for all sections
- [ ] JSON-LD is valid and complete for publications and projects
- [ ] `sitemap.xml` includes all routes
- [ ] `robots.txt` allows all crawlers
- [ ] OG images display correctly in social sharing debuggers

**Design Decisions:**
- **Decision 11.4.1:** Open Graph images are static PNGs in `public/images/og/` rather than dynamically generated. This simplifies the build and avoids runtime image generation dependencies. Each section has a unique OG image.

### Step 11.5: Content Population & Domain Binding

**Tasks:**
1. Populate all content sections with real data (projects, publications, certifications, awards, experience, education, profile).
2. Verify `pnpm validate` passes with real content.
3. Verify `pnpm build` succeeds with real content.
4. Bind custom domain `ajrojasfuentes.dev` in Vercel dashboard.
5. Configure DNS records for the domain.
6. Verify HTTPS is enabled and redirects HTTP to HTTPS.
7. Test all routes on the production domain.

**Requirements Covered:**
- O2 (Career Centralization)
- O3 (Extreme Maintainability)
- O4 (Peak Performance)

**Objectives (Checklist):**
- [ ] All content sections populated with real data
- [ ] `pnpm validate` passes
- [ ] `pnpm build` succeeds
- [ ] Domain `ajrojasfuentes.dev` resolves correctly
- [ ] HTTPS is enforced
- [ ] All routes return 200 (no 404s for valid content)

**Design Decisions:**
- **Decision 11.5.1:** Content population happens just before launch, not during development. This ensures the content is fresh and accurate, and it validates that the content workflow (add `.md` → validate → build → deploy) works end-to-end.

---

## Phase 12: Post-Launch Stabilization

> **Duration Estimate:** 2 days  
> **Goal:** Performance audit, accessibility audit, SEO validation, and documentation finalization.

### Step 12.1: Performance Audit

**Tasks:**
1. Run Lighthouse on production domain for all pages.
2. Verify Performance score ≥ 95, Accessibility ≥ 90, Best Practices ≥ 95, SEO ≥ 95.
3. Analyze Core Web Vitals (LCP, INP, CLS) via Chrome DevTools and Web Vitals extension.
4. Identify and fix any regressions.
5. Document performance baseline.

**Requirements Covered:**
- O4 (Peak Performance)
- NFR-Performance (all metrics)

**Objectives (Checklist):**
- [ ] Lighthouse scores meet targets on all pages
- [ ] Core Web Vitals are within targets (LCP < 1.2s, TBT < 50ms, CLS < 0.05)
- [ ] JavaScript bundle is < 80KB total
- [ ] Performance baseline is documented

**Design Decisions:**
- **Decision 12.1.1:** Performance audit is performed on the production domain (not localhost) to measure real-world conditions (CDN, compression, DNS, etc.).

### Step 12.2: Accessibility Audit

**Tasks:**
1. Run axe DevTools on all pages.
2. Test keyboard navigation on all interactive elements.
3. Test with VoiceOver (macOS) and NVDA (Windows) if possible.
4. Verify `prefers-reduced-motion` disables all animations.
5. Verify color contrast meets WCAG 2.1 AA.
6. Fix any accessibility issues.

**Requirements Covered:**
- NFR-Accessibility (WCAG 2.1 AA)

**Objectives (Checklist):**
- [ ] axe DevTools reports zero critical or serious issues
- [ ] All interactive elements are keyboard-navigable
- [ ] Screen reader testing passes
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Color contrast ratios meet targets

**Design Decisions:**
- **Decision 12.2.1:** Accessibility is treated as a launch gate, not a nice-to-have. Any WCAG 2.1 AA violation blocks launch.

### Step 12.3: Documentation Finalization

**Tasks:**
1. Update `README.md` with project overview, tech stack, architecture summary, and setup instructions.
2. Verify `AGENTS.md` is up-to-date with build steps, test commands, and coding conventions.
3. Document the content workflow: how to add a new project, publication, etc.
4. Document the deployment process.
5. Final review of all spec documents.

**Requirements Covered:**
- DX (Developer Experience)
- NFR-Maintainability (documentation)

**Objectives (Checklist):**
- [ ] `README.md` is comprehensive and professional
- [ ] `AGENTS.md` accurately reflects the project structure
- [ ] Content workflow is documented
- [ ] Deployment process is documented

**Design Decisions:**
- **Decision 12.3.1:** Documentation is treated as a first-class deliverable. It is written for both human contributors and AI coding agents (via `AGENTS.md`).

---

## Cross-Cutting Concerns

### Performance
- Zero-JS-by-default with selective island hydration (`client:visible`, `client:idle`, `client:load`).
- Self-hosted fonts, Astro `<Image>` component, critical CSS inline.
- CSS scroll progress indicator (`animation-timeline: scroll()`).
- Framer Motion imported as named exports only.

### Accessibility
- Keyboard navigation on all interactive elements.
- `prefers-reduced-motion` respected globally.
- Color contrast ≥ 4.5:1 for body text.
- ARIA labels, roles, and focus management.
- Screen reader testing (VoiceOver, NVDA).

### Security
- No secrets committed (`.env` gitignored, `.env.example` committed).
- Resend API key server-only (never in client bundles).
- Content schemas prevent injection (Zod validation).
- `pnpm audit` runs in CI; high-severity vulnerabilities block deployment.

### SEO
- Per-page `<title>`, `<meta description>`, OG tags.
- JSON-LD structured data (`ScholarlyArticle`, `SoftwareApplication`, `Person`).
- Auto-generated `sitemap.xml` and `robots.txt`.
- Static OG images per section.

### Maintainability
- Content as code: one `.md` file per item, zero component changes.
- Schema-first: Zod schemas are the single source of truth.
- DRY: centralized variants, utilities, icons, tokens.
- SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.

---

## Risk Register

| ID | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| R-01 | 3D scene causes LCP regression | High | Medium | R3F fallback is lightweight; if regression occurs, 3D is removed without ceremony |
| R-02 | Astro 6 breaking changes during development | Medium | Low | Pin exact versions in `package.json`; review Astro release notes weekly |
| R-03 | Tailwind 4.3 configuration changes | Low | Low | Tailwind 4 uses CSS-native config; minimal migration risk |
| R-04 | Content author creates invalid frontmatter | Medium | High | `pnpm validate` in CI catches errors before deploy; CLI scaffolds correct templates |
| R-05 | Cross-module coupling creeps in | Medium | Medium | ESLint custom rule enforces no cross-module imports; code reviews catch violations |
| R-06 | React islands grow too large | High | Medium | Size budget via `rollupOptions.output.manualChunks`; Lighthouse CI enforces JS budget |
| R-07 | Resend API rate limits or downtime | Low | Low | Mock mode works without Resend; free tier (3,000/month) is more than sufficient |
| R-08 | Domain propagation delays | Low | Low | Configure DNS early; use Vercel preview URLs for testing before domain is live |

---

## Appendix A: Dependencies Reference

### Core Framework
| Package | Version | Purpose |
|---|---|---|
| `astro` | ^6.x | Meta-framework, SSG, routing, content collections |
| `react` | ^19.x | Interactive islands |
| `react-dom` | ^19.x | React DOM renderer |
| `typescript` | ^5.x | Type safety |

### Styling
| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | ^4.3 | Utility-first CSS |
| `@tailwindcss/vite` | latest | Tailwind Vite plugin |

### UI & Accessibility
| Package | Version | Purpose |
|---|---|---|
| `@radix-ui/*` | latest | Accessible primitives (peer deps of Shadcn) |
| `shadcn/ui` | latest | Component installer |

### Animation & 3D
| Package | Version | Purpose |
|---|---|---|
| `framer-motion` | ^11.x | Layout animations, transitions |
| `@react-three/fiber` | ^8.x | Declarative Three.js |
| `@react-three/drei` | ^9.x | R3F helpers |
| `three` | ^0.x | WebGL library |
| `@splinetool/react-spline` | ^2.x | Spline 3D embeds |

### Validation & Utilities
| Package | Version | Purpose |
|---|---|---|
| `zod` | ^4.x | Schema validation |
| `clsx` | latest | Conditional class names |
| `tailwind-merge` | latest | Tailwind class conflict resolution |

### Testing
| Package | Version | Purpose |
|---|---|---|
| `vitest` | ^2.x | Unit testing |
| `@testing-library/react` | latest | React component testing |
| `@playwright/test` | ^1.x | E2E testing |

### Dev Tooling
| Package | Version | Purpose |
|---|---|---|
| `eslint` | ^9.x | Static analysis |
| `@typescript-eslint/*` | latest | TypeScript ESLint rules |
| `prettier` | ^3.x | Code formatting |
| `prettier-plugin-astro` | latest | Astro formatting |
| `prettier-plugin-tailwindcss` | latest | Tailwind class sorting |
| `husky` | ^9.x | Git hooks |
| `lint-staged` | ^15.x | Staged file linting |

### Infrastructure
| Service | Purpose |
|---|---|
| GitHub | Version control, CI/CD |
| Vercel | Static deployment, Edge CDN |
| Resend | Email delivery (contact form) |

---

*Plan Version: 1.0 | Status: Approved for Execution | Last Updated: 2026-05-21*
