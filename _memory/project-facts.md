# Project facts

> Verified facts only. No guesses. Update when facts change or new
> facts are learned. Keep entries short; link to source files instead
> of duplicating content.

Last updated: 2026-04-16

## Project identity

- **Site name:** US Ag Drone Directory
- **Production domain:** `https://usagdronedirectory.com`
- **Repo:** `thorink2015/usss-terra`
- **Working branch:** `claude/add-drone-operators-directory-T0YnN`
  - **Never push to other branches without explicit user approval.**
- **Main branch:** contains the OLD Romanian `droneagricol.ro` codebase
  plus research file uploads. Do NOT merge main → working branch.
- **Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, deployed to Netlify
- **Data:** TypeScript files in `src/data/` — no database, no CMS

## Author (E-E-A-T)

- **Single source of truth:** `src/data/author.ts` — import `AUTHOR`,
  `SITE`, `personSchema()`, `organizationSchema()` from here. Never
  paraphrase the bio elsewhere.
- **Known placeholders** still awaiting real values from Eugen:
  - `{{LAST_NAME}}` — real last name (or confirm first-name-only)
  - `{{LINKEDIN_URL}}` — e.g. `https://linkedin.com/in/...`
  - `{{X_URL}}` — optional
  - `{{COUNTRY_REGION}}` — country/region Eugen grew up in (used in bio)
  - `{{FIELD_OF_STUDY}}` — university field (used in bio)
- **Photo:** expected at `/public/images/eugen-author.jpg` (400×400+).
  Components (`Byline`, `AuthorCard`) render an initial-letter avatar
  fallback until the file is uploaded.
- **Public email:** `eugen@usagdronedirectory.com` (unconfirmed — Eugen
  should verify this address is actually monitored before launch)

## Cloudflare account

- **Zone ID:** `4ef2d92cf7fc7fc3a77fab5f02fd6d9d`
- **Account ID:** `6e0bb81b1001dd62f0acd077858aa822`
- **API Token & Origin CA Key:** stored in `.env.cloudflare.local` (gitignored — never commit)
- **New domain being set up:** `agdronedirectory.com` (2026-04-16 — user asked to verify CF settings)
- **Audit script:** `scripts/check-cloudflare.sh` — reads credentials from `.env.cloudflare.local`

## Environment variables (set in Netlify dashboard)

| Name | Purpose | Status |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 tracking | To be replaced with Plausible |
| `NEXT_PUBLIC_FORMSPREE_ID` | Contact form endpoint | Set |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible Analytics site ID | **Not yet set — blocked on Eugen** |

## Schema @id anchors (every JSON-LD on the site references these)

- Organization: `https://usagdronedirectory.com/#organization`
- Person (Eugen): `https://usagdronedirectory.com/about#eugen`
- WebSite: `https://usagdronedirectory.com/#website`

These are canonicalized in `src/data/author.ts` via `AUTHOR.personId`
and `AUTHOR.organizationId` getters.

## IndexNow

- **Key file:** `/public/fda036483ac24950a15f668bc047a4bf.txt` (32-char hex)
- **Ping script:** `npm run indexnow:ping` → `scripts/ping-indexnow.mjs`
- **Second legacy key file** also exists at `/public/7e4a1f2b3c9d8e5f.txt`
  — left in place for backward compat, not actively used

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
