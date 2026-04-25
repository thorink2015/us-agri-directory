# Known issues and fixes

> Every time a bug, error, or gotcha is encountered and resolved,
> append a dated entry here. Do not delete old entries — they prevent
> recurrence.

## CI / GitHub Actions gotchas

### 2026-04-25 — Node.js 20 deprecation warning on scraper workflow
**Symptom:** Annotation on every Scrape Contacts workflow run:
> Node.js 20 actions are deprecated. The following actions are running on Node.js 20 and may not work as expected: actions/checkout@v4, actions/setup-node@v4, actions/upload-artifact@v4. Actions will be forced to run with Node.js 24 by default starting June 2nd, 2026.
**Cause:** GitHub deprecated Node.js 20 for JavaScript actions on 2025-09-19. v4 of these three actions still ships a Node 20 entry binary.
**Fix:** Bump in `.github/workflows/*.yml`:
- `actions/checkout@v5` (Node 24)
- `actions/setup-node@v5` (Node 24)
- `actions/upload-artifact@v7` (Node 24)
**Trap:** `actions/upload-artifact@v5` is **still on Node 20**. The Node-24 cutover for upload-artifact landed in v6 (Dec 2025) and v7 (Feb 2026). Bumping checkout/setup-node to v5 silences two of three warnings but leaves `upload-artifact@v5` flagged. v7 is input-compatible with v4/v5 for our four inputs (`name`, `path`, `if-no-files-found`, `retention-days`); it adds new optional inputs (`compression-level`, `overwrite`, `include-hidden-files`, `archive`) that default to safe values. Refs: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/ , https://github.com/actions/upload-artifact/releases
**Prevention:** Whenever a new workflow is added or warnings reappear, check each action's release page individually — a v5 of one action is not equivalent to v5 of another. Always pull the latest major of `actions/checkout`, `actions/setup-node`, `actions/upload-artifact`, `actions/download-artifact`, `actions/cache` rather than copying older snippets.

## API / tooling gotchas

### 2026-04-14 — "Stream idle timeout - partial response received"
**Symptom:** Claude Code API times out when making very large file
writes (big translations, 12+ article rewrites in one go).
**Fix:** Work in batches of 1–3 items per commit. After each batch,
commit + push + wait for user "next". This is documented in CLAUDE.md
as a hard rule.

### 2026-04-21 — Post-compaction rate limits on long-form guide content
**Symptom:** After a context compaction, the first attempt to `Write`
a full 5,000-word TSX guide body hits "API Error" / rate limit before
the stream completes. Subsequent "continue from batch 2" attempts
repeat the failure because the retry still tries to emit the full
body.
**Cause:** A single turn trying to emit 20k+ tokens of content is
fragile across the compaction boundary. The "smaller batches" fix in
CLAUDE.md only works if each batch is actually tiny — one file at a
time was still too big for 5,000-word guide bodies.
**Fix:** Use the **sentinel append loop** documented in
`code-patterns.md § Long-form content rollout`. Insert one H2 section
per turn via `Edit`, commit, push, stop. The diff per turn is
500–1,500 tokens instead of 20k+, which survives compaction cleanly.
**Prevention:** For any new pillar guide, scaffold `content.tsx` with
`{/* GUIDE-INSERT-POINT: <slug> */}` as the first commit, before
writing any body content.

### 2026-04-15 — "File has not been read yet" error on Edit tool
**Symptom:** `Edit` tool fails with `File has not been read yet. Read it first before writing to it.`
**Cause:** Edit requires a prior `Read` of the same file in the same
session.
**Fix:** Call `Read` on the file first, then `Edit`. For new files,
use `Write` instead.

### Git push fails with "could not read Password"
**Symptom:** Random `fatal: could not read Password for 'http://local_proxy@127.0.0.1:PORT'`
**Cause:** Transient proxy auth flake in the sandbox.
**Fix:** Retry the push immediately. If it fails again, retry with
exponential backoff (2s, 4s, 8s). The commit itself succeeded — only
the push failed.

## Build / runtime gotchas

### 2026-04-15 — lucide-react v1.8.0 is a legacy fork with limited icons
**Symptom:** `Module '"lucide-react"' has no exported member 'Linkedin'.`
**Cause:** The package.json pins `lucide-react: ^1.8.0`, which is an
older fork. The modern `lucide-react` uses v0.x versioning and exports
hundreds more icons including `Linkedin`, `Twitter`, `Github`, etc.
**Fix:** Before importing any lucide icon, verify it's available:
```bash
node -e "const L = require('lucide-react'); console.log(Object.keys(L).includes('IconName'))"
```
For social icons (LinkedIn, X, GitHub), use `ExternalLink` as a
neutral fallback until the package is upgraded.
**Known-good icons in v1.8.0:** Plane, ArrowRight, Search, Mail,
ExternalLink, Link, Link2, MapPin, Calendar, CheckCircle, AlertTriangle,
BookOpen, Users, Shield, Globe, Target, TrendingUp, Leaf, Droplets,
Eye, Map, Sprout, BarChart3, ChevronDown.

### 2026-04-15 — Next.js ESLint errors block production builds
**Symptom:** Build succeeds at "Compiled successfully" but then fails
at "Linting and checking validity of types" with errors like:
- `react/no-unescaped-entities` (unescaped apostrophes in JSX text)
- `@typescript-eslint/no-unused-vars` (unused imports/variables)
**Fix options:**
1. Escape apostrophes: `'` → `&apos;` inside JSX text nodes
2. For unused exports referenced elsewhere but not in that file, add
   `// eslint-disable-next-line @typescript-eslint/no-unused-vars`
**Never fix by disabling ESLint globally.** Fix the individual issues.
**Before committing JSX content with apostrophes, run** `npm run build`
**locally if possible** — this catches both issues pre-push.

### `useState` / `useEffect` in server components
**Symptom:** Build errors about hooks in server components.
**Fix:** Add `'use client'` directive at the top of any interactive
component. Split tool pages into `page.tsx` (server, for metadata +
schema) + `Calculator.tsx` (client, for interactive state).

### Sitemap missing new pages
**Symptom:** New pages return 200 but aren't indexed.
**Fix:** Add the URL pattern to `src/app/sitemap.ts`. For dynamic
routes, map over the data source (e.g. `regions.map(r => ({ url: ... }))`).

### 2026-04-17 — Netlify production branch pointed at stale working branch
**Symptom:** Merges to `main` don't trigger Netlify deploys. Live site stays frozen at old commit.
**Cause:** Netlify "Production branch" was set to `claude/add-drone-operators-directory-T0YnN` (the original working branch), not `main`. Every PR was merged into `main` but Netlify never saw those commits.
**Fix:** Netlify dashboard → Project configuration → Build & deploy → Branches → change Production branch to `main` → Save.
**Prevention:** After any project-level branch rename or migration, verify Netlify's production branch matches the branch receiving PR merges.

### 2026-04-17 — Region interface missing icon/tagline/totalAcres fields
**Symptom:** TypeScript build error: `Property 'icon' does not exist on type 'Region'` in `regions/page.tsx`. Netlify build fails silently; live site freezes.
**Cause:** `regions/page.tsx` referenced three fields that weren't declared in the `Region` interface in `types.ts`.
**Fix:** Add fields to interface (optional), populate in `regions.ts`, add nullish fallbacks in template. Run `npm run build` locally before pushing to catch this class of error early.

## Data / content gotchas

### Romanian URLs in canonicals or internal links
**Symptom:** Canonical or hardcoded link pointing to `/judete`, `/operatori`,
`/culturi`, `/servicii`, `/drone`, `/ghid`, `/unelte`, `/despre`,
`/preturi-pulverizare-drona`, `/orase`, `/adauga-operator`, or
domain `terradron.ro` / `droneagricol.ro`.
**Fix:** Replace with the English slug (`/states`, `/operators`,
`/crops`, `/services`, `/drones`, `/guides`, `/tools`, `/about`,
`/pricing`, etc.) and `agdronedirectory.com`. Scan with:
`Grep "(/judete|/operatori|/culturi|/servicii|/drone/|/unelte|/ghid|/despre|/preturi|/orase|/adauga-operator|terradron|droneagricol)"`

### Schema `@id` collisions
Every Person/Organization `@id` is defined **once** on the homepage
(via `HomeSchema`). Everywhere else, reference by `@id` — don't inline
the full object again. See `src/data/author.ts` factories.

## E-E-A-T gotchas

### Fabricating author credentials
**Never** claim Eugen holds a Part 137 certificate, is a licensed
applicator, or has US credentials he doesn't have. The `/about` page
explicitly states "What this site is not" for a reason.

### Paraphrasing the canonical bio
**Do not** rewrite or paraphrase `AUTHOR.bio` or `AUTHOR.shortBio` in
other files. Import from `src/data/author.ts`.
