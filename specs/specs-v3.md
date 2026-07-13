# Technical Specification & Plan v3.0
**Project:** ajrojasfuentes.dev - Professional Portfolio  
**Author:** Anthony Rojas Fuentes  
**Architecture:** Minimalist One-Pager (Content-Driven)  
**Aesthetic:** "Research Console" (Dark Lab/Instrument Interface)

---

## 1. Executive Summary

This document outlines the v3.0 technical specification and development plan for the `ajrojasfuentes.dev` professional portfolio. The project is pivoting away from the heavy, multi-page MVSD-Lite architecture and "Elevated IDE" aesthetic toward a highly efficient, minimalist, single-page application (SPA-feel via Astro). 

The goal is to present Anthony's expertise in Data Automation, AI Engineering, and Scientific Research through a "Research Console" design that is visually striking yet exceptionally easy to maintain.

## 2. Core Engineering Principles

The architecture and implementation are strictly guided by the following principles:

1.  **KISS (Keep It Simple, Stupid):** Eliminate complex architectural abstractions (Query Handlers, Adapters, Repositories). Astro natively handles content beautifully; we will use the framework as intended.
2.  **YAGNI (You Aren't Gonna Need It):** We will only build what is immediately required to showcase the content. No blog infrastructure, multi-page routing, or chatbot integrations unless actively needed.
3.  **DRY (Don't Repeat Yourself):** Design tokens exist only in CSS. Content schemas are defined once in Zod.
4.  **SoC (Separation of Concerns):** Content lives in `.mdx` files. Layout lives in Astro. Interactive components live in React. Styling lives in Tailwind.
5.  **SOLID & Architecture Minimalism:** Components should do one thing well. The architecture will rely entirely on Astro's native Content Collections for data fetching and React for isolated interactivity.

## 3. Technology Stack

The stack has been updated to the absolute latest stable releases to maximize developer experience (DX) and performance.

*   **Meta-Framework:** Astro 7
    *   *Why:* Unmatched performance for content-heavy sites, excellent native MDX and Content Collections support.
*   **UI Library:** React v19.2.7
    *   *Why:* Used exclusively for interactive "Islands" (animations, contact forms, 3D elements).
*   **Styling:** Tailwind CSS v4.3.2
    *   *Why:* CSS-native configuration with zero runtime overhead.
*   **Animations & Interactions:** Framer Motion (Latest)
    *   *Why:* Scroll-triggered reveals, micro-interactions, and fluid layout transitions.
*   **3D Enhancements:** React Three Fiber (R3F) / Three.js
    *   *Why:* To replace simple canvas effects with highly performant, WebGL-accelerated 3D elements (e.g., interactive data-node backgrounds, 3D tilt cards) to increase visual impact.
*   **Content Validation:** Zod 4 + MDX
    *   *Why:* Compile-time type safety for all portfolio content.
*   **CI/CD & Deployment:** GitHub Actions & Vercel
    *   *Why:* Fully automated deployment pipeline with automated testing and preview environments.

## 4. UI/UX Design: "The Research Console"

The visual aesthetic abandons the VS Code/IDE metaphor in favor of a **"Research Console"**. This design language evokes scientific instruments, data lab monitoring, and high-tech telemetry.

### Core Visual Elements:
*   **Theme:** Deep dark mode (`#090D16` backgrounds) with distinct, glowing neon accents indicating different data domains (Teal for Home, Amber for Projects, Violet for Publications).
*   **Layout:** A single-page, vertically scrolling experience.
*   **Typography:** Space Grotesk (Display) and IBM Plex Sans/Mono (Body & Data) to emphasize the engineering and data-science nature of the work.
*   **Visual Enhancements:**
    *   **Data Node Backgrounds:** An R3F-driven interactive particle network running in the background (`client:idle`), symbolizing data pipelines and neural networks.
    *   **3D Tilt Cards:** Project and live-system cards that react to mouse movement using 3D transforms.
    *   **Scroll Reveals:** Framer Motion will handle staggered opacity/translation reveals as the user scrolls down the page.
    *   **Glassmorphism:** Subtle use of backdrop-blur for the sticky navigation and floating elements.

## 5. Content Architecture (Content-Driven Approach)

Data will be strictly managed via Astro 7 Content Collections using `src/content.config.ts` and Zod schemas.

### Collections:
1.  **Projects (`/content/projects/*.mdx`)**: Automation systems and applied AI prototypes.
2.  **Publications (`/content/publications/*.mdx`)**: Peer-reviewed articles and preprints.
3.  **Experience (`/content/experience/*.mdx`)**: Career timeline and roles.
4.  **Certifications (`/content/certifications/*.mdx`)**: Earned credentials.
5.  **Accomplishments (`/content/accomplishments/*.mdx`)**: Awards and open-source contributions.

*All content will be fetched server-side by Astro at build time and passed as static props to React Islands.*

## 6. Development Plan & Phasing

### Phase 1: Foundation & DevOps
1. Initialize Astro 7 project with React 19 and Tailwind 4.3.
2. Set up GitHub Actions CI workflow (lint, typecheck, build).
3. Connect repository to Vercel for continuous deployment.
4. Define global CSS tokens, fonts, and base styles.

### Phase 2: Content Modeling
1. Set up `src/content.config.ts`.
2. Define strict Zod schemas for all collections.
3. Migrate existing placeholder data into `.mdx` files.
4. Implement a utility to query and sort content at build time.

### Phase 3: Layout & Core UI (One-Pager)
1. Build the global `BaseLayout.astro`.
2. Implement the Sticky Navigation component (with Intersection Observer for scroll state).
3. Build the Hero Section and About Section.
4. Build the core grids for Projects, Publications, Experience, and Certifications.

### Phase 4: Interactivity & 3D Polish (The "Wow" Factor)
1. Implement Framer Motion `Reveal` wrappers for smooth scrolling entry animations.
2. Replace the 2D canvas background with a highly optimized `React Three Fiber` node-network background.
3. Add 3D Tilt effects to Project Cards and the "Live Systems" widget.
4. Implement the "Copy Email" and interactive Contact form elements.

### Phase 5: Optimization & Launch
1. Audit performance (Lighthouse goal: 95+).
2. Ensure strict `prefers-reduced-motion` compliance.
3. Optimize all images and 3D assets.
4. Final responsive design audit (Mobile/Tablet/Desktop).
5. Production release.

---
*This specification prioritizes execution speed, visual impact, and long-term maintainability over over-engineered abstractions.*
