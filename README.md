# hao-portfolio

Hao's personal website (Hao's World) — a Next.js (App Router) + MDX project.

**Production:** [https://hao-world.vercel.app](https://hao-world.vercel.app)

## Overview
This repository contains the source of a personal website with Notes, Craft, About, and Trace. The site uses Next.js (App Router), MDX for content, and Tailwind/PostCSS for styling.

## Key Features
- MDX-based notes (`content/posts`) and craft entries (`content/projects`) under the `content/` directory
- Public routes: `/notes`, `/craft`, `/about`, `/trace`
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
- [content](content) — MDX content (`posts` → Notes, `projects` → Craft)
- [public/media](public/media) — static assets used by posts/pages
- [package.json](package.json) — scripts and dependency manifest

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

Fill in `DATABASE_URL` and `NEXT_PUBLIC_SOCKET_ACCESS_KEY`. For Trace local dev, `NEXT_PUBLIC_SOCKET_ACCESS_KEY` must match `ACCESS_KEY` in [hao-portfolio-socket](https://github.com/coolKIH/hao-portfolio-socket).

3. Start the development server (default: http://localhost:3000):

```bash
pnpm dev
```

4. Build and run production:

```bash
pnpm build
pnpm start
```

5. Linting:

```bash
pnpm lint
```

### Trace (Footprints) local dev

The `/trace` page uses SSR for the initial message list and WebSockets for live updates. Local development requires **both** repositories:

| Repo | Command | URL |
|---|---|---|
| `hao-portfolio` (this repo) | `pnpm dev` | http://localhost:3000 |
| `hao-portfolio-socket` | `pnpm dev` | ws://localhost:8080 |

In development, the client connects to `ws://localhost:8080` with an `accessKey` query param. Production uses `wss://hao-portfolio-socket.onrender.com` with origin-based auth.

Use a **separate dev database** for local work so test messages do not appear in production. Point both repos' `DATABASE_URL` at the same dev Postgres instance.

## Adding content
- Add notes as MDX files under `content/posts/` (served at `/notes`).
- Or scaffold a new post with a timestamped filename and frontmatter template:

```bash
pnpm new:post "Your Post Title"
```

- Recommended frontmatter fields: `title`, `date`, `description`, `tags` (and `location` if used).
- For craft entries, add MDX under `content/projects/` (served at `/craft`) and use `src/components/project-card.tsx` to control display.

## Deployment
- Recommended: Deploy on Vercel for native Next.js support.
- `@vercel/analytics` is already listed in `package.json` for optional analytics.

## Scripts (from `package.json`)
- `dev` — runs the Next.js dev server
- `build` — builds the production output
- `start` — starts the built app
- `lint` — run ESLint
- `new:post` — create a new notes post MDX file with frontmatter template

## Related repositories

- [hao-portfolio-socket](https://github.com/coolKIH/hao-portfolio-socket) — WebSocket server for the Trace (Footprints) guestbook, deployed on Render.com

## Notes & Maintenance
- The project uses the App Router; pages live in `src/app` instead of the legacy `pages/` directory.
- Static media and post assets are placed under `public/media`.
- Keep dependencies up to date via `pnpm update` and test builds locally before deploying.

## Contributing
- Create a branch, open a PR with changes, and include a brief description of updates.

---
Updated to reflect the current repository structure and scripts (pages in `src/app`, content in `content/`, static assets in `public/media`).
