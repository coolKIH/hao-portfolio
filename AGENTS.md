# Agent Guide — hao-portfolio workspace

Instructions for AI agents working in this multi-repository workspace.

## Start here

1. **Read `README.md`** in the repo you are changing before editing code.
2. Check **both repos** when the task touches Trace (Footprints): frontend changes often have socket implications.
3. Prefer **minimal, focused diffs** — match existing naming, types, and patterns.

## Workspace layout

| Repo | Role | Stack | Deploy |
|---|---|---|---|
| `hao-portfolio` | Website (Notes, Craft, Trace UI) | Next.js 16, MDX, Tailwind, shadcn | Vercel |
| `hao-portfolio-socket` | Trace WebSocket server | Node.js, ws, pg | Render |

Open via `hao-portfolio.code-workspace` for both folders in one Cursor window.

## Local development workflow

### Frontend only (notes, craft, about)

```bash
cd hao-portfolio
cp .env.example .env.local   # fill DATABASE_URL if Trace SSR is needed
pnpm install && pnpm dev     # http://localhost:3000
```

### Full Trace local dev (both repos)

```bash
# Terminal 1 — socket
cd hao-portfolio-socket
cp .env.example .env         # DATABASE_URL, ACCESS_KEY, PORT
pnpm dev                     # ws://localhost:8080

# Terminal 2 — frontend
cd hao-portfolio
cp .env.example .env.local     # DATABASE_URL, NEXT_PUBLIC_SOCKET_ACCESS_KEY
pnpm dev                     # http://localhost:3000
```

**Rules:**
- `NEXT_PUBLIC_SOCKET_ACCESS_KEY` (frontend) must equal `ACCESS_KEY` (socket).
- Use a **dev database** separate from production; both repos share the same dev `DATABASE_URL`.
- In development, Trace connects to `ws://localhost:8080`; production uses Render.
- Restart `pnpm dev` after changing `NEXT_PUBLIC_*` env vars.
- Package manager is **pnpm only** (`preinstall` enforces this).

### New notes post

```bash
pnpm new:post "Post Title"
```

Creates a timestamped MDX file under `content/posts/` with frontmatter template (served at `/notes`).

## Environment & secrets

- **Never commit** `.env`, `.env.local`, or credentials.
- **Do commit** `.env.example` when adding new variables.
- Frontend: `.env.local` (Next.js convention).
- Socket: `.env` (dotenv default).
- `.gitignore` hides env files; `.vscode/settings.json` sets `explorer.excludeGitIgnore: false` so they remain visible in the editor.

## Making changes

- Read surrounding code before writing; reuse existing abstractions.
- Comments only for non-obvious logic.
- Add tests only when they cover meaningful behavior (not requested by default).

### Key files

| Area | Location |
|---|---|
| Trace WebSocket client | `src/components/trace/trace-client.tsx` |
| Trace SSR page | `src/app/trace/page.tsx` |
| DB pool (frontend) | `src/lib/db.ts` |
| Socket server | `hao-portfolio-socket/index.js` |
| Notes content (`/notes`) | `content/posts/*.mdx` |
| Craft content (`/craft`) | `content/projects/*.mdx` |
| New post scaffold | `scripts/new-post.mjs` |
| Production origin allowlist | `ALLOWED_ORIGIN` in `index.js` |

### Trace changes checklist

When modifying Trace behavior, verify:

- [ ] Frontend code (`trace-client.tsx`, `trace/page.tsx`)
- [ ] Socket server (`index.js`) if protocol, auth, or DB logic changed
- [ ] `.env.example` in **both** repos if env vars changed
- [ ] `ALLOWED_ORIGIN` in socket if the Vercel production URL changed
- [ ] README / AGENTS.md if setup or workflow changed

## Keeping documentation in sync

**After completing a code change**, before closing the task, **ask the user**:

> 这次改动是否需要同步更新 README / AGENTS.md？如果涉及环境变量，是否也要更新 `.env.example`？

Do not silently skip this — even a brief prompt is enough. If the user declines, move on.

### What to update

| Change type | Update |
|---|---|
| New env variable | `.env.example` in affected repo(s) — a **config template**, not prose docs |
| Local dev / setup steps | `README.md` in affected repo(s) |
| Agent workflow, commit habits, pitfalls | `AGENTS.md` |
| New script or npm command | `README.md` + this file if agents should know |
| Trace protocol, auth, or ports | Both READMEs; both `.env.example` if env vars changed |
| New feature or page | `README.md` Key Features / layout section |
| DB schema change | Socket `README.md` (SQL) + this file (pitfalls) |

**Terminology:** treat `README.md` and `AGENTS.md` as documentation; treat `.env.example` as the committed env-var template developers copy to `.env` / `.env.local`.

### When docs likely need updating

- Added or renamed environment variables
- Changed local vs production URLs or ports
- New dependency on a second repo or external service
- Changed blog post workflow or content structure
- New deployment target or changed hosting

### When docs can usually wait

- Pure styling / copy tweaks
- Internal refactors with no behavior change
- One-off bug fixes that restore documented behavior

## Before committing

### 1. Inspect the diff

```bash
git status
git diff
git log -5 --oneline   # match existing commit message style
```

### 2. Code review (self-review before commit)

- Re-read every changed file; confirm the diff does only what was intended.
- Run `pnpm lint` in `hao-portfolio` when TS/TSX changed.
- Check edited files for linter errors.
- Confirm **no secrets** appear in the diff (`.env`, keys, connection strings).
- If env vars were added, update `.env.example` in the affected repo(s).
- **Ask the user** whether README / AGENTS.md should be updated, and whether `.env.example` needs changes if env vars were touched (see [Keeping documentation in sync](#keeping-documentation-in-sync)).

### 3. Split commits when appropriate

Use **separate commits** for unrelated concerns:

| Type | Examples | Prefix |
|---|---|---|
| Feature / fix | Trace WebSocket behavior, new page | `feat:`, `fix:` |
| Refactor | Rename, restructure without behavior change | `refactor:` |
| Chore | pnpm config, editor settings, gitignore | `chore:` |
| Docs | README, AGENTS.md | `docs:` |

**Split when:**
- A PR mixes a user-facing fix with tooling/config changes.
- Two repos have changes — **commit and push each repo separately**.
- Docs-only changes can stand alone from code changes.

**Keep together when:**
- A feature requires tightly coupled files (e.g., `.env.example` + code that reads the new var).

### 4. Commit message style

Follow recent history: short prefix + imperative summary, focus on **why**.

```
fix(trace): connect to local WebSocket server in development.
```

### 5. Push

- Only push when the user asks.
- Both repos push independently to their own `origin/main`.

## Deployment notes

- **hao-portfolio** → Vercel auto-builds on push to `main`.
- **hao-portfolio-socket** → Render auto-deploys on push (if configured).
- Production Trace uses origin-based auth; local dev uses `ACCESS_KEY`.
- Changing `ALLOWED_ORIGIN` in socket requires a Render redeploy; update docs if the Vercel URL changes.

## New machine setup

1. Clone both repos; open `hao-portfolio.code-workspace` in Cursor.
2. `pnpm install` in each repo.
3. Copy `.env.example` → `.env.local` / `.env` and fill in values.
4. `gh auth login` then `gh auth setup-git` for HTTPS push.
5. Create dev database (separate from production); run `footprints` schema SQL.

## Service restarts

| Change | Restart |
|---|---|
| `NEXT_PUBLIC_*` in `.env.local` | Frontend `pnpm dev` |
| `ACCESS_KEY` / `DATABASE_URL` in socket `.env` | Socket `pnpm dev` |
| Trace client or socket `index.js` | Hot reload usually suffices; restart if connection acts stale |

## Common pitfalls

| Issue | Cause | Fix |
|---|---|---|
| `accessKey=undefined` | Missing `NEXT_PUBLIC_SOCKET_ACCESS_KEY` in `.env.local` | Add key, restart `pnpm dev` |
| Socket connection blocked | Key mismatch or wrong origin | Sync `ACCESS_KEY` / `NEXT_PUBLIC_SOCKET_ACCESS_KEY` |
| Empty Trace on dev | New DB without `footprints` table | Run schema SQL from socket README |
| Can't see `.env.local` in tree | Gitignore hiding | Already configured; use Cmd+P to open |
| `git push` asks for password | Git not wired to `gh` | Run `gh auth setup-git` |
| Docs drift from code | Setup changed but README not updated | Follow [Keeping documentation in sync](#keeping-documentation-in-sync) |
