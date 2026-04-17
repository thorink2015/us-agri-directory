# Session history

> Chronological log of what's been shipped. One line per batch. Add
> new entries at the **bottom**. Use ISO dates (YYYY-MM-DD).

## 2026-04-11 through 2026-04-14 — URL migration (earlier sessions)

- **Batch 1:** Removed Romanian locale/labels, swapped header/footer copy
- **Batch 2:** Calculator slug renames (calculator-pret-pulverizare → spray-cost-calculator, etc.) + 301 redirects
- **Batch 3:** `/operatori` → `/operators` + child redirects
- **Batch 4:** `/judete` → `/states` + all child routes
- **Batch 5:** Final Romanian cleanup (/culturi → /crops, /servicii → /services, /drone → /drones, /ghid → /guides, /unelte → /tools, /despre → /about, /adauga-operator → /list-your-business, /preturi-pulverizare-drona → /pricing) + fixed terradron.ro hardcoded domain + CountyPageSchema Romanian text

## 2026-04-15 — Content quality + E-E-A-T

- **Batch A:** Fixed tools hub broken links, built ROI + coverage calculators with AEO blocks + SoftwareApplication schema
- **Batch B:** 10 service pages — AEO blocks + authority links + Service/FAQ/Breadcrumb schemas
- **Batch C:** 8 crop pages — AEO blocks + authority links + Article schema
- **Batch D1-D5:** `/about` E-E-A-T scaffold (later superseded by G2) + `/glossary` with 57 terms (A-Z) + DefinedTermSet schema
- **Batch E1-E3:** 5 regional hubs — Corn Belt, Great Plains, Delta, California, Southeast — with AEO blocks, stats rows, regional insights, state/crop/operator cross-linking
- **Batch F1:** robots.txt expanded to 27 crawlers (ClaudeBot, xAI, Mistral, Applebot-Extended, etc.)
- **Batch F4:** Canonical URL audit — verified 35/35 pages clean
- **Batch F5:** IndexNow ping script (`npm run indexnow:ping`) + key file
- **Batch G1:** `src/data/author.ts` single source of truth + Byline/AuthorCard/ReviewerSlot components
- **Batch G2:** `/about` rewritten to 8-section E-E-A-T structure with Person + Organization JSON-LD
- **Batch G3:** Homepage HomeSchema rewritten to emit canonical Person + Organization + WebSite with @id cross-refs
- **Batch G4a-c:** Byline + AuthorCard + Article schema @id refs on all crop / service / region pages
- **Batch G5:** Footer updated to canonical Eugen credit line
- **Organizational:** Added `/_research/` folder with 13 research + planning docs
- **Organizational:** Added `/_memory/` folder (this one) + CLAUDE.md rewrite

## 2026-04-16 — Domain fix + accessibility + search engine setup

- **Domain:** replaced `usagdronedirectory.com` → `agdronedirectory.com` across 31 src files, scripts, and memory files (production domain confirmed via Netlify)
- **netlify.toml:** fixed www → non-www redirect (was pointing to `terradron.ro`)
- **Accessibility:** FAA badge contrast 3.0:1→6.4:1, "Price on request" 2.2:1→4.6:1 (both now WCAG AA); removed Romanian text from CountyCard
- **Performance:** browserslist bump (firefox≥92, safari≥15.4) removes ~11 KiB legacy polyfills; GTM preconnect now conditional
- **Cloudflare:** added `scripts/check-cloudflare.sh` zone audit script
- **PRs:** consolidated draft PRs #7 + #8 into #9; merged squash to `claude/add-drone-operators-directory-T0YnN`
- **IndexNow:** Netlify Build Plugin auto-pings on every production deploy; 1130 URLs accepted HTTP 200 on first live run
- **Yandex:** verified ✓
- **Bing:** connected via Google Search Console import ✓

## 2026-04-16 — Content cleanup + final audit

- Deleted orphaned Romanian data: `regions-moldova.ts`, `wine-regions.ts`, `cities.ts`
- Emptied `blog-posts.ts` (12 Romanian-slug posts removed) + `blog/content.tsx`
- Emptied `guides.ts` (9 Romanian-slug guides removed) + `guides/content.tsx`
- Removed `country:'RO'|'MD'` field from Guide interface; fixed guide page template (removed .country refs, fixed TerraDron.ro → agdronedirectory.com in JSON-LD)
- Deleted 2 stale IndexNow key files (`fda036483ac24950a15f668bc047a4bf.txt`, `7e4a1f2b3c9d8e5f.txt`)
- Fixed dead link: `/guides/fonduri-afir-drone` → `/guides` in roi-calculator/page.tsx
- Updated memory: project-facts.md (IndexNow key, branch record), session-history.md

## 2026-04-17 — Netlify deploy fix

- **Root cause found:** `regions/page.tsx` used `r.icon`, `r.tagline`, `r.totalAcres` — fields missing from the `Region` interface. TypeScript build error silently failed every Netlify deploy after PR #20 merged, freezing live site at `@5230f70` (Apr 16 13:06).
- **Fix (PR #23):** Added `icon`, `tagline`, `totalAcres` to `Region` interface + populated all 5 regions + nullish fallbacks in template. Build now passes: 1192 static pages, 0 errors.
- **Netlify branch fix:** Production branch changed from `claude/add-drone-operators-directory-T0YnN` → `main` in Netlify dashboard. All future merges to `main` now auto-deploy.
- PRs #22 (state pages) and #23 (build fix) both merged to `main`.

## What's next (see pending-items.md for detail)

1. Eugen fills bio placeholders (last name, country, field, LinkedIn, photo)
2. Research files research-03, research-04, research-05 unblock regulations hub, grants pages, pricing rewrite, homepage rewrite
3. State page template + 50 state pages (build-plan Session 11 — behind approval gate)
