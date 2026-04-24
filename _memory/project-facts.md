# Project facts

> Verified facts only. No guesses. Update when facts change or new
> facts are learned. Keep entries short; link to source files instead
> of duplicating content.

Last updated: 2026-04-15

## Project identity

- **Site name:** US Ag Drone Directory
- **Production domain:** `https://agdronedirectory.com`
- **Repo:** `thorink2015/usss-terra`
- **Working branch:** `claude/add-drone-operators-directory-T0YnN`
  - **Domain submission branch:** `claude/setup-domain-submission-KXRq7` (open PRs for Netlify/IndexNow/SEO work)
  - **Never push to other branches without explicit user approval.**
- **Main branch:** contains the OLD Romanian `droneagricol.ro` codebase
  plus research file uploads. Do NOT merge main → working branch.
- **Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, deployed to Netlify
- **Data:** TypeScript files in `src/data/` — no database, no CMS

## Author (E-E-A-T)

- **Single source of truth:** `src/data/author.ts` — import `AUTHOR`,
  `SITE`, `personSchema()`, `organizationSchema()` from here. Never
  paraphrase the bio elsewhere.
- **Filled as of 2026-04-24:** firstName Eugen, lastName Manoli,
  LinkedIn `https://www.linkedin.com/in/manoli-eugen/`, job title
  "Founder and Editor", bio has Florida / United States and
  Agricultural Economics populated.
- **Photo:** `/public/images/eugen-author.jpg` (39 KB, uploaded
  2026-04-24). `Byline` and `AuthorCard` render the real image;
  initial-letter fallback still in place for safety if the file
  goes missing.
- **Public email:** `eugen@agdronedirectory.com` (active).
- **Optional still blank:** `AUTHOR.x` (X/Twitter URL — optional,
  filtered out of `sameAs` by `authorSameAs()`).
- **Organization `sameAs`** in `organizationSchema()` is still an
  empty array. Add the company LinkedIn + X URLs when they exist.

## Environment variables (set in Netlify dashboard)

| Name | Purpose | Status |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 tracking | To be replaced with Plausible |
| `NEXT_PUBLIC_FORMSPREE_ID` | Contact form endpoint | Set |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible Analytics site ID | **Not yet set — blocked on Eugen** |

## Schema @id anchors (every JSON-LD on the site references these)

- Organization: `https://agdronedirectory.com/#organization`
- Person (Eugen): `https://agdronedirectory.com/about#eugen`
- WebSite: `https://agdronedirectory.com/#website`

These are canonicalized in `src/data/author.ts` via `AUTHOR.personId`
and `AUTHOR.organizationId` getters.

## IndexNow

- **Active key:** `199aa73a01c74f6786948b45aaec2d17`
- **Key file:** `/public/199aa73a01c74f6786948b45aaec2d17.txt`
- **Ping script:** `scripts/ping-indexnow.mjs` — auto-runs via Netlify Build Plugin on every production deploy
- **Netlify plugin:** `netlify/plugins/indexnow/` — fires `onSuccess`, logs warning on failure (never fails the deploy)
- **Last run result:** 1130 URLs submitted, HTTP 200 accepted (2026-04-16)

## Conventions Eugen cares about

- **Work in small batches** (1–3 items per commit, max). Batch and
  push, wait for "next". Avoids API timeouts.
- **English only** — no Romanian content. hreflang NOT needed.
- **Honest copy** — `/about` explicitly states what the site is NOT
  (not a Part 137 operator, not legal advice). Do NOT fabricate
  credentials for Eugen.
- **Primary sources only** — every regulatory/pricing fact cites FAA,
  EPA, USDA, or land-grant extension. No secondary aggregators.
- **One author, visible byline** — every content page renders `<Byline>`
  under H1 + `<AuthorCard>` at footer.

## Internal folders (not served by the site)

- `_research/` — 13 research + planning docs (see `_research/README.md`)
- `_memory/` — this folder. Claude Code self-maintained knowledge base.
- Both can be deleted with `rm -rf _research _memory` before launch.

## `_research/` drop-folder workflow (2026-04-17)

Eugen uses `_research/` as a drop folder for any files he wants Claude
Code to work with. Standard flow per batch:

1. Look in `_research/` for the new files Eugen dropped
2. Read + analyze them
3. Apply the changes / integrate content into the right destination
   (e.g. `src/data/`, `src/app/...`, `public/images/`, etc.)
4. Move or delete the source files out of `_research/` once integrated,
   so the folder only holds un-processed drops
5. Commit + push per the small-batches rule

Do not leave processed drop files sitting in `_research/`.
