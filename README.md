# ajrojasfuentes.dev

> A high-performance, dynamic personal portfolio engineered with Astro 7, React 19, Tailwind CSS 4.3, and a Modular Vertical Slices (MVSD-Lite) architecture.

[![Astro](https://img.shields.io/badge/Astro-7.x-BC52EE?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Zod](https://img.shields.io/badge/Zod-4.x-3E67B1)](https://zod.dev)

---

## 🚀 What This Is

`ajrojasfuentes.dev` is the personal portfolio of Anthony Rojas Fuentes, a professional operating at the intersection of **AI Engineering**, **Data Platform Engineering**, **Computer Engineering**, and **Scientific Research**.

This is not a generic template. It is a carefully engineered digital product designed to communicate technical excellence, deep aesthetic consideration, and architectural rigor. Every technical decision — from the MVSD-Lite component architecture to the MDX-driven content collections and native Canvas 2D interactive backgrounds — is a deliberate part of the portfolio statement.

**Live:** [https://ajrojasfuentes.dev](https://ajrojasfuentes.dev)

---

## ✨ Core Features & Design

### Premium Visual Experience

- **Interactive Canvas Backgrounds** — Custom-built `NebulaBackground` and `KnowledgeGraphBackground` utilizing native Canvas 2D. They react to mouse movements and scale dynamically based on device pixel ratio (DPI).
- **Scroll-Triggered Reveals** — Smooth, physics-based scroll animations powered by Framer Motion.
- **Glassmorphism & Depth** — Extensive use of modern CSS features, backdrop filters, 3D tilt cards, and glowing accents to create a layered, premium feel.
- **Fluid Typography & Responsive Grids** — Flawless scaling from ultra-wide desktops down to mobile devices, ensuring perfect readability and layout structure everywhere.

### Content Sections

| Section             | Description                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **Home (Hero)**     | Dynamic greeting, titles, and bio driven entirely by a `profile.mdx` configuration.       |
| **Experience**      | An interactive, custom-built chronological timeline detailing roles and responsibilities. |
| **Projects**        | 3D-tilt gallery cards showcasing selected work, tech stacks, and links.                   |
| **Publications**    | Research and editorial pieces organized cleanly by venue and type.                        |
| **Certifications**  | Verified credentials and badges displayed in a responsive grid.                           |
| **Accomplishments** | Honors, awards, and recognitions highlighted with dedicated metrics.                      |

### Performance First

- **Zero-JS-by-default** — Astro Islands Architecture with selective hydration. Most of the site ships as pure HTML/CSS.
- **Optimized Mobile Experience** — The heavy Canvas backgrounds dynamically reduce particle and node density on mobile screens to save battery and maintain 60FPS.

---

## 🏗️ Architecture & Principles

This project strictly adheres to **MVSD-Lite** (Modular Vertical Slices) combined with modern software engineering principles (**SOLID, DRY, KISS, YAGNI**).

### Modular Vertical Slices

The monolithic `index` page acts purely as an orchestration layer. The actual UI logic is cleanly separated into autonomous modules:

- `src/modules/home/Hero.astro`
- `src/modules/experience/ExperienceSection.astro`
- `src/modules/projects/ProjectsSection.astro`
- `src/modules/publications/PublicationsSection.astro`
- `src/modules/certifications/CertificationsSection.astro`
- `src/modules/accomplishments/AccomplishmentsSection.astro`

### Content as Code (MDX + Zod)

All data rendered on the site lives in `src/content/` as MDX files.

- **Type Safety:** Every piece of content is strictly validated at build time against Zod schemas defined in `src/content.config.ts`.
- **Easy Maintenance:** Adding a new project, job, or updating the hero biography is as simple as creating or editing an `.mdx` file. Zero component changes are required.

---

## 🛠️ Tech Stack

| Layer              | Technology                                      | Role                                                    |
| ------------------ | ----------------------------------------------- | ------------------------------------------------------- |
| **Meta-framework** | [Astro 7](https://astro.build)                  | SSG, routing, Islands Architecture, Content Collections |
| **Interactive UI** | [React 19](https://react.dev)                   | Interactive components (Timelines, Canvas, Tilt Cards)  |
| **Animations**     | [Framer Motion](https://www.framer.com/motion/) | Scroll reveals and physics springs                      |
| **Type Safety**    | [TypeScript 5](https://www.typescriptlang.org)  | Strict mode across the entire codebase                  |
| **Validation**     | [Zod](https://zod.dev)                          | Schema validation for all content                       |
| **Styling**        | [Tailwind CSS 4.3](https://tailwindcss.com)     | Utility-first CSS, custom tokens, zero-runtime overhead |
| **Icons**          | [Lucide React](https://lucide.dev)              | Clean, consistent SVG iconography                       |

---

## 📂 Directory Structure

```
ajrojasfuentes.dev/
├── public/                 # Static assets (fonts, images, cv)
├── src/
│   ├── components/         # Reusable UI primitives (React & Astro)
│   ├── content/            # MDX data collections (about, projects, etc.)
│   ├── layouts/            # Base HTML shells and global metadata
│   ├── lib/                # Shared utilities, constants, and content fetchers
│   ├── modules/            # Vertical slices for each portfolio section
│   ├── pages/              # Astro routes (index.astro orchestrator)
│   └── styles/             # Global CSS and Tailwind variables
├── astro.config.ts         # Astro configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # Strict TypeScript configuration
└── package.json
```

---

## 💻 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x LTS
- **pnpm** (Recommended package manager)

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

The dev server will be available at `http://localhost:4321`.

### Available Scripts

```bash
pnpm dev          # Start local development server
pnpm build        # Build for production
pnpm preview      # Preview the production build locally
pnpm type-check   # Run strict TypeScript and Astro type checking
pnpm validate     # Validate MDX content against Zod schemas
```

---

## 🛡️ Best Practices & Quality Assurance

- **Build-Time Correctness:** The CI/CD pipeline enforces `pnpm type-check`. If a content file is missing a required field, or if a component receives the wrong prop, the build fails immediately.
- **Accessibility:** Semantic HTML tags (`<section>`, `<nav>`, `<main>`), proper contrast ratios, and `prefers-reduced-motion` hooks are implemented to ensure an inclusive experience.
- **Garbage Collection:** Residual dependencies, unused 3D libraries, and obsolete test files have been strictly purged to keep the repository and node_modules as lightweight as possible.

---

## 📜 License

MIT — See [LICENSE](./LICENSE) for details.

---

_Engineered with discipline, architected for scalability, and built for performance._
