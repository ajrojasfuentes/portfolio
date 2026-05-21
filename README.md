# ajrojasfuentes.dev

> A high-performance, IDE-inspired personal portfolio built with Astro 6, React 19, and MVSD-Lite architecture.

[![Astro](https://img.shields.io/badge/Astro-6.x-BC52EE?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Zod](https://img.shields.io/badge/Zod-4.x-3E67B1)](https://zod.dev)

---

## What This Is

`ajrojasfuentes.dev` is a personal portfolio website for a professional operating at the intersection of **Data Automation & AI Engineering**, **Computer Engineering**, and **Scientific Research**. It is not a template — it is an engineered product that communicates technical excellence through both its content and its construction.

The interface is inspired by a modern IDE (VS Code visual grammar), elevated into a premium personal brand. Every technical decision — from the MVSD-Lite architecture to the Zod-validated content schemas to the zero-JS-by-default delivery strategy — is itself part of the portfolio statement.

**Live:** [https://ajrojasfuentes.dev](https://ajrojasfuentes.dev)

---

## Core Features

### IDE-Inspired Interface
- **Activity Bar** — Section icons with color-coded accents (Projects = blue, Publications = orange, etc.)
- **File Explorer** — Dynamic tree of all content items, organized by section
- **Tab Bar** — Content opens as editor tabs with session persistence
- **Breadcrumb** — Spatial orientation: `portfolio / projects / my-project.md`
- **Status Bar** — Context-aware info: reading time, last updated, theme toggle
- **Command Palette** — Global Cmd/Ctrl+K fuzzy search across all content

### Content Sections
| Section | Route | Description |
|---|---|---|
| **Home** | `/` | Hero, Academic Timeline, Experience Timeline, Milestones, Skills, Contact |
| **Projects** | `/projects` | Filterable gallery with full README detail pages |
| **Certifications** | `/certifications` | Verified badges and credentials |
| **Publications** | `/publications` | Editorial/Personal segmented, BibTeX export |
| **Awards** | `/awards` | Academic, professional, competition recognitions |

### Performance
- **95+ Lighthouse** Performance, Accessibility, Best Practices, SEO
- **Zero-JS-by-default** — Astro Islands Architecture with selective hydration
- **< 80KB** total JavaScript bundle (islands only)
- **Self-hosted fonts** — Geist, Geist Mono, JetBrains Mono (zero Google Fonts)

### Architecture
- **MVSD-Lite** — Modular Vertical Slices with Query-only CQRS and DDD Contracts
- **Schema-first content** — All Markdown validated via Zod 4 at build time
- **Compile-time correctness** — Build fails on any schema violation or TypeScript error
- **Content as code** — Adding a project = one `.md` file. Zero component changes.

---

## Tech Stack

| Layer | Technology | Role |
|---|---|---|
| **Meta-framework** | [Astro 6](https://astro.build) | SSG, routing, Islands Architecture, Content Collections |
| **Interactive Layer** | [React 19](https://react.dev) | Islands of interactivity (filters, command palette, tabs) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Scroll-triggered reveals, layout transitions, physics springs |
| **3D Graphics** | [R3F](https://docs.pmnd.rs/react-three-fiber) + [Spline](https://spline.design) | Interactive and static 3D elements |
| **Type Safety** | [TypeScript 5](https://www.typescriptlang.org) | Strict mode across entire codebase |
| **Validation** | [Zod 4](https://zod.dev) | Schema validation for all content collections |
| **Styling** | [Tailwind CSS 4.3](https://tailwindcss.com) | CSS-native configuration, zero-runtime tokens |
| **UI Primitives** | [Shadcn/UI](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) | Accessible, owned component primitives |
| **Deployment** | [Vercel](https://vercel.com) | Edge CDN, preview deploys, custom domain |
| **Email** | [Resend](https://resend.com) | Contact form delivery (mock mode in dev) |

---

## Architecture Overview

This project follows **MVSD-Lite** — a pragmatic, scaled-down application of MVSD (Modular Vertical Slices with DDD Contracts) adapted for a read-intensive, build-time-rendered frontend.

### The Five Layers

```
Delivery (Astro Pages) → Application (Query Slices) → Domain (Port Interfaces)
                                              ↑
Infrastructure (Astro Adapters) --------------┘
UI (React Islands + Astro Components)
```

**Layer 1 — Delivery (Astro Pages):** Instantiates adapters, handlers, and passes DTOs to UI components.

**Layer 2 — Application (Query Slices):** Self-contained vertical slices: `Query DTO → Handler → Response DTO`. No framework imports.

**Layer 3 — Domain (Port Interfaces):** Pure TypeScript interfaces. Zero framework dependencies.

**Layer 4 — Infrastructure (Adapters):** Only layer that knows about Astro Content Collections and the file system.

**Layer 5 — UI (React Islands + Astro Components):** Pure presentational. Receives typed DTOs as props. Never fetches data.

### Key Architectural Principles

- **Single Responsibility:** One file = one thing. No component fetches AND renders.
- **Open/Closed:** New section = new module. Existing modules untouched.
- **Dependency Inversion:** Handlers depend on port interfaces. Concrete types appear only in Astro pages.
- **No Global State:** Islands use React `useState` + `useContext`. No Zustand, Redux, or Jotai.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20.x LTS
- **pnpm** ≥ 9.x (specified in `packageManager` field)
- **Git** ≥ 2.40

### Installation

```bash
# Clone the repository
git clone https://github.com/ajrojasfuentes/ajrojasfuentes.dev.git
cd ajrojasfuentes.dev

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The dev server starts at `http://localhost:4321`.

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | For production | Email delivery API key |
| `PUBLIC_SITE_URL` | Yes | Full domain URL (e.g., `https://ajrojasfuentes.dev`) |
| `PUBLIC_GA_ID` | No | Google Analytics ID (optional) |

**Note:** The contact form works in mock mode without `RESEND_API_KEY`. It logs emails to the console in development.

---

## Development Workflow

### Available Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm type-check   # TypeScript check + Astro check
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm test         # Vitest unit tests
pnpm test:e2e     # Playwright E2E tests
pnpm validate     # Zod content validation (no full build)
pnpm content:new  # Scaffold new content file
```

### Adding Content

```bash
# Scaffold a new project
pnpm content:new project "My New Project"

# This creates:
# src/content/projects/my-new-project.md
# with all fields pre-filled and commented

# Validate all content
pnpm validate
```

### Content Structure

All content lives in `src/content/` as Markdown files with YAML frontmatter:

```
src/content/
├── about/
│   ├── profile.md              # Singleton: personal info
│   ├── experience/             # Work history
│   └── education/              # Academic background
├── projects/                   # Project portfolios
├── certifications/             # Badges and credentials
├── publications/               # Academic and personal writing
└── awards/                     # Recognitions and honors
```

Every content file is validated against a Zod 4 schema at build time. Any violation fails the build with a precise error message.

---

## Project Structure

```
ajrojasfuentes.dev/
├── .github/workflows/          # CI/CD pipelines
├── .vscode/                    # Recommended extensions and settings
├── public/
│   ├── fonts/                  # Self-hosted fonts (Geist, JetBrains Mono)
│   ├── images/                 # Project previews, badges, awards, OG images
│   └── cv/                     # Downloadable resume
├── src/
│   ├── content/                # All Markdown content files
│   │   ├── config.ts           # Astro Content Collections registry
│   │   └── _templates/         # Content scaffolding templates
│   ├── shared-kernel/
│   │   ├── types/              # Domain types (derived from Zod schemas)
│   │   ├── schemas/            # Zod 4 validation schemas
│   │   └── utils/              # Date, slug, sort, BibTeX, class merge
│   ├── modules/
│   │   ├── home/               # Hero, milestones, skills, contact
│   │   ├── about/              # Profile, experience, education
│   │   ├── projects/           # Gallery, filters, detail pages
│   │   ├── certifications/     # Grid, verification
│   │   ├── publications/       # List, BibTeX export
│   │   └── awards/             # Grid, featured
│   ├── islands/                # React islands (shell, animations, filters, 3D)
│   ├── layouts/
│   │   ├── BaseLayout.astro    # HTML shell, meta, fonts, theme
│   │   └── IDELayout.astro     # IDE chrome wrapper
│   ├── components/ui/          # Shadcn/UI owned primitives
│   ├── pages/                  # Astro routes
│   ├── styles/                 # Tokens, typography, IDE chrome, motion variants
│   └── lib/                    # Resend client singleton
├── tests/
│   ├── unit/                   # Handler tests, utility tests
│   ├── e2e/                    # Playwright critical journeys
│   └── fixtures/               # Mock data for InMemory adapters
├── scripts/
│   ├── new-content.ts          # Content scaffold CLI
│   └── validate-content.ts     # Fast Zod validation
├── astro.config.ts             # Astro configuration
├── tailwind.config.ts          # Tailwind 4.3 paths
├── tsconfig.json             # TypeScript strict + path aliases
├── vitest.config.ts            # Unit test configuration
├── playwright.config.ts        # E2E test configuration
└── package.json
```

---

## Design System

### Color Palette (Tokyo Night Inspired)

| Token | Dark Mode | Light Mode | Usage |
|---|---|---|---|
| `--color-bg-base` | `#0d1117` | `#ffffff` | Deepest background |
| `--color-bg-surface-0` | `#161b22` | `#f6f8fa` | Sidebar, panels |
| `--color-text-primary` | `#e6edf3` | `#1f2328` | Main content text |
| `--color-text-secondary` | `#8b949e` | `#57606a` | Secondary labels |
| `--color-token-blue` | `#79c0ff` | `#0969da` | Projects accent |
| `--color-token-purple` | `#d2a8ff` | `#8250df` | Certifications accent |
| `--color-token-teal` | `#39d353` | `#1a7f37` | About accent |
| `--color-token-orange` | `#ffa657` | `#bc4c00` | Publications accent |
| `--color-token-red` | `#ff7b72` | `#cf222e` | Awards accent |

All colors are CSS custom properties consumed by Tailwind 4.3's `@theme` directive. Theme switching is done via a single `data-theme` attribute on `<html>`.

### Typography

| Purpose | Font |
|---|---|
| Display / Headers | Geist Mono, JetBrains Mono, monospace |
| Body text | Geist, Inter, system-ui, sans-serif |
| UI chrome | JetBrains Mono, Fira Code, monospace |
| Code blocks | JetBrains Mono, monospace |

All fonts are self-hosted. Zero Google Fonts requests at runtime.

---

## Testing

### Unit Tests (Vitest)

```bash
pnpm test
```

- **Handlers:** Every Query Handler has a corresponding `.test.ts` using `InMemoryAdapter`.
- **Utilities:** `date.ts`, `slug.ts`, `sort.ts`, `bibtex.ts`, `cn.ts` — 100% coverage.
- **Adapters:** Both `AstroContent` and `InMemory` implementations are tested.

### E2E Tests (Playwright)

```bash
pnpm test:e2e
```

- **Navigation:** File explorer, tabs, command palette, breadcrumb
- **Home page:** Hero, timelines, milestones, skills, contact form
- **Content pages:** Projects filter, publication detail, certification grid, award grid
- **Contact form:** Validation, submission, success feedback

E2E tests run against the production build (`astro build` + `astro preview`).

---

## CI/CD Pipeline

```
git push
  → GitHub Actions
    → pnpm install
    → pnpm type-check
    → pnpm lint
    → pnpm test
    → pnpm test:e2e
    → pnpm build
    → Lighthouse CI (threshold: 90)
    → Vercel Deploy
```

- **Branch protection:** Direct commits to `main` are forbidden. All changes via PR with passing CI.
- **PR previews:** Every pull request gets a unique preview URL.
- **Production deploy:** Automatic on merge to `main`.
- **Lighthouse CI:** Performance regressions block deployment.

---

## Accessibility

- **WCAG 2.1 AA** compliant
- Full keyboard navigation (Tab, Enter, Space, Arrow keys, Escape)
- `prefers-reduced-motion` respected globally — all animations disable
- Color contrast ≥ 4.5:1 for body text
- Visible focus indicators on all interactive elements
- Screen reader tested (VoiceOver, NVDA)
- Semantic HTML and ARIA roles throughout

---

## Roadmap

### Phase 2 (Documented, Not Built)
- **AI Chat Assistant** — Conversational interface trained on portfolio content
- **Blog / Technical Writing** — Long-form articles and tutorials
- **Internationalization (ES/EN)** — Spanish and English content
- **CV PDF Auto-Generation** — Styled PDF generated from content data

These features are explicitly deferred per YAGNI. The MVSD-Lite architecture supports adding each as a new module with **zero changes to existing code**.

---

## License

MIT — See [LICENSE](./LICENSE) for details.

---

## Acknowledgments

- **Astro** for the Islands Architecture that makes this performance possible
- **Shadcn/UI** and **Radix UI** for accessible, ownable primitives
- **Framer Motion** for the animation system
- **Tokyo Night** theme for the color palette inspiration

---

*Built with discipline, architected for growth, and deployed with zero manual steps.*

*Portfolio Version: 2.0 | Architecture: MVSD-Lite | Domain: ajrojasfuentes.dev*
