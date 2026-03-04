# hao-portfolio

Hao's personal portfolio website — a Next.js (App Router) + MDX project.

## Overview
This repository contains the source of a personal website that presents a blog and project pages. The site uses Next.js (App Router), MDX for content, and Tailwind/PostCSS for styling.

## Key Features
- MDX-based blog and project content under the `content/` directory
- App Router pages and layouts in `src/app`
- Reusable UI components in `src/components`
- Simple static/media hosting under `public/media`
- Vercel-friendly configuration and analytics included in `package.json`
- UI primitives and component patterns via shadcn (`shadcn/ui`)

## Tech stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS, PostCSS
- Content: MDX files parsed at build/runtime
- UI primitives: shadcn (shadcn/ui)
- Languages: TypeScript, React

## Repository layout (short)
- [src/app](src/app) — Next.js App Router pages and layouts
- [src/components](src/components) — UI components (nav, blog-list, project-card, etc.)
- [src/lib](src/lib) — MDX components and utility functions
- [content](content) — MDX content (posts, projects)
- [public/media](public/media) — static assets used by posts/pages
- [package.json](package.json) — scripts and dependency manifest

## Local development
1. Install dependencies:

```bash
pnpm install
```

2. Start development server (default: http://localhost:3000):

```bash
pnpm dev
```

3. Build and run production:

```bash
pnpm build
pnpm start
```

4. Linting:

```bash
pnpm lint
```

## Adding content
- Add blog posts as MDX files under `content/posts/`.
- Recommended frontmatter fields: `title`, `date`, `description`, `tags` (and `location` if used).
- For projects, add entries under `content/projects/` (or a directory you prefer) and use `src/components/project-card.tsx` to control display.

## Deployment
- Recommended: Deploy on Vercel for native Next.js support.
- `@vercel/analytics` is already listed in `package.json` for optional analytics.

## Scripts (from `package.json`)
- `dev` — runs the Next.js dev server
- `build` — builds the production output
- `start` — starts the built app
- `lint` — run ESLint

## Notes & Maintenance
- The project uses the App Router; pages live in `src/app` instead of the legacy `pages/` directory.
- Static media and post assets are placed under `public/media`.
- Keep dependencies up to date via `pnpm update` and test builds locally before deploying.

## Contributing
- Create a branch, open a PR with changes, and include a brief description of updates.

---
Updated to reflect the current repository structure and scripts (pages in `src/app`, content in `content/`, static assets in `public/media`).
