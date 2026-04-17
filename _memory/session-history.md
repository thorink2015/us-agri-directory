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

## 2026-04-16 — Tools SEO + Pricing page + Homepage v2 + Nav (PR #21, merged)

- **Types:** `DroneModel` + `Region` interfaces added to `src/data/types.ts`
- **Drone page:** `drones/[slug]/page.tsx` — specs table, AEO block, FAQPage/BreadcrumbList/Article schemas, Byline, AuthorCard
- **Region page:** `regions/[slug]/page.tsx` — sprayWindows table, keyInsights, FAQAccordion, schemas
- **Nav:** flat 8-item nav + Tools dropdown (3 calculators); SearchBar with state+service dropdowns
- **Homepage:** full 12-section rewrite — 5 schemas, 50-state grid, 35+ internal links
- **Pricing:** full 9-section pillar rewrite — service/regional/crop rate tables, fees, history, drone vs alternatives, USDA cost-share, FAQ, authority links
- **Tools index `/tools`:** AEO block, FAQAccordion, 4 schemas (BreadcrumbList/ItemList/FAQPage/WebPage)
- **Spray cost calculator:** rebuilt PriceCalculator — 50-state dropdown, regional multipliers, low/high range, passes, chemical toggle; full page SEO (4 schemas, Byline, AuthorCard, FAQAccordion)
- **ROI calculator:** full page SEO — new H1, AEO, 4 schemas, MU Extension explainer, FAQAccordion
- **Coverage calculator:** full page SEO — new H1, AEO, 4 schemas, FAQAccordion
- **Acreage converter:** rebuilt HectareCalculator from Romanian → English (acres/ha/sqft/sqm/sections); full page SEO
- **Drone comparison:** fixed broken `@/data/drone-models` import; spec table from live drone-model.ts data, 4-scenario guide, FAQAccordion (5 Q&As)
- **Treatment calendar:** new H1, AEO, 4 schemas, booking deadlines on each entry, crop link chips, FAQAccordion

## 2026-04-17 — State page template + 3 proof states (PR #22, draft)

- **`src/data/types.ts`:** added `StateData` interface (28 fields)
- **`src/data/states.ts`:** Iowa, Texas, California full data objects + `getStateData(slug)` helper
- **`src/app/states/[slug]/page.tsx`:** dual-mode template — 11-section rich layout for proof states, fallback counties-based template for remaining 47 states
- **`src/app/states/page.tsx`:** index updated with featured proof-state cards, AEO block, green-dot indicators, BreadcrumbList schema
- **Fix:** wrapped spray windows section in conditional to handle empty `sprayWindows` arrays gracefully
- **PR #22** open as draft on `claude/add-drone-model-context-NVSMF` → `main`, head `0a7d930`, 0 CI check runs (no CI configured), ready to flip to ready-for-review + merge

## What's next (see pending-items.md for detail)

1. Eugen fills bio placeholders (last name, country, field, LinkedIn, photo)
2. Research files research-03, research-04, research-05 unblock regulations hub, grants pages, pricing rewrite, homepage rewrite
3. Remaining 47 state data objects (Corn Belt / Great Plains / Delta+Southeast / West Coast+Mountain / Northeast batches) — **blocked on `research-03-state-licensing.md`**; template is ready and tested
