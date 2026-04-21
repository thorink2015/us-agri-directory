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

## 2026-04-17 — State page template + 3 proof states (PR #22, merged)

- **`src/data/types.ts`:** added `StateData` interface (28 fields)
- **`src/data/states.ts`:** Iowa, Texas, California full data objects + `getStateData(slug)` helper
- **`src/app/states/[slug]/page.tsx`:** dual-mode template — 11-section rich layout for proof states, fallback counties-based template for remaining 47 states
- **`src/app/states/page.tsx`:** index updated with featured proof-state cards, AEO block, green-dot indicators, BreadcrumbList schema
- **Fix:** wrapped spray windows section in conditional to handle empty `sprayWindows` arrays gracefully
- **PR #22** merged to `main`

## 2026-04-17 — Netlify deploy fix (PR #23, merged)

- **Root cause found:** `regions/page.tsx` used `r.icon`, `r.tagline`, `r.totalAcres` — fields missing from the `Region` interface. TypeScript build error silently failed every Netlify deploy after PR #20 merged, freezing live site at `@5230f70` (Apr 16 13:06).
- **Fix (PR #23):** Added `icon`, `tagline`, `totalAcres` to `Region` interface + populated all 5 regions + nullish fallbacks in template. Build now passes: 1192 static pages, 0 errors.
- **Netlify branch fix:** Production branch changed from `claude/add-drone-operators-directory-T0YnN` → `main` in Netlify dashboard. All future merges to `main` now auto-deploy.
- PRs #22 (state pages) and #23 (build fix) both merged to `main`.

## 2026-04-17 — About / Contact / List-your-business / Glossary batch

- **`/about`:** added 3-question FAQ (free listing, monetization, update cadence) + AboutPage + FAQPage JSON-LD on top of existing E-E-A-T structure
- **`/contact`:** ContactPage + BreadcrumbList schema, Open Graph metadata, @id link to organization node
- **`/list-your-business`:** rewritten with AEO block, `What you get` / `Requirements` / `How it works` H2 sections, 3-question FAQ, WebPage + FAQPage + BreadcrumbList schema. SubmitForm now renders checkbox grids for crops (from `crops.ts`) and drone models (from `drone-model.ts`), replacing the free-text drones field.
- **`/glossary`:** expanded from 55 to 62 terms (Buffer Zone, CSP, Hull Insurance, IP Rating, MTOW, NDVI, NDRE); added `relatedLink` internal pointers on EQIP/Part 107/Part 137/Part 44807/NDAA/CSP/Hull Insurance; added WebPage schema alongside existing DefinedTermSet + BreadcrumbList.
- Drop-folder spec `_research/about-contact-listing-glossary-spec.md` removed post-integration.

## 2026-04-17 — Blog posts 1-5 batch

- **Template upgrade:** `src/app/blog/[slug]/page.tsx` rewritten to emit Article + BreadcrumbList + conditional FAQPage JSON-LD with AUTHOR.personId / organizationId @id refs; renders AEO block, Byline, FAQAccordion, AuthorCard, related articles.
- **BlogPost interface:** `aeoBlock?`, `faqs?` fields added in `src/data/types.ts`.
- **5 guide posts shipped** (all 2026-04-16, author Eugen, category guide):
  - Post 1: `/blog/corn-fungicide-drone-spraying-guide` — VT/R1 timing, Beck's PFR trial data, drone vs ground rig economics
  - Post 2: `/blog/faa-part-137-drone-guide` — 7-step process, 44807 exemption, DIY vs consultant
  - Post 3: `/blog/cover-crop-seeding-drone-guide` — species list, timing by region, EQIP Practice 340 cost-share
  - Post 4: `/blog/dji-vs-hylio-which-spray-drone` — T50 vs AG-272 price/tank/wind/NDAA/dealer/swarm
  - Post 5: `/blog/drone-spraying-state-license-guide` — 50-state baseline, 6 drone-specific credential states, reciprocity
- Drop-folder `_research/blog-posts-1-5.md` removed post-integration.

## 2026-04-17 — Blog posts 6-10 batch

- 5 more posts shipped on the same template (Article + BreadcrumbList + FAQPage schema, AEO block, Byline, AuthorCard):
  - Post 6: `/blog/drone-spraying-pricing-trends-2026` — 30-45% rate compression 2022→2026, Iowa State $12.50 benchmark, profitability floor math
  - Post 7: `/blog/ndaa-chinese-drones-what-farmers-need-to-know` — NDAA scope, 170% tariffs, Countering CCP Drones Act status, US alternatives, mixed-fleet strategy (category: legislation)
  - Post 8: `/blog/drone-spraying-rice-guide` — Arkansas Delta 100% aerial, UArk 7% yield response at R4-R6, fleet ops, state licensing quirks
  - Post 9: `/blog/vineyard-drone-spraying-guide` — UC Davis hillside runoff data, 8-12 pass program, California CDPR overhead, organic niche, T25P/T50 fit
  - Post 10: `/blog/first-1000-acres-drone-operator` — MU Extension break-even math, 5 customer-acquisition channels, cover crop revenue bridge, drone #2 timing
- Drop-folder `_research/blog-posts-6-10.md` removed post-integration.

## 2026-04-17 — Homepage V1 design revert (batch 1 of 3)

- **Batch 1 (top half of page):** reverted hero/AEO/stats/trust/services to V1 visual language while preserving V2 SEO content (5 JSON-LD blocks, FAQ, metadata).
  - Hero: restored V1 H1 ("Find a Drone Spraying Service Near Your Farm" with gold accent on "Drone Spraying Service") and V1 subhead, dropped V2's 3 inline bullet stats
  - `SearchBar`: removed the service-type dropdown; now single state dropdown + "Find Operators" button
  - AEO block: removed Byline (photo + byline + updated date) from homepage — author still on /about and in schema
  - Stats row: added Lucide SVG icons (ShieldCheck, MapPin, Sprout, DollarSign) above each number; added source line
  - New "Why farmers use this directory" section with 4 trust cards and green circle checkmark icons
  - Services: replaced emoji icons with Lucide (Droplets, Sprout, Map, Radar, Settings, ShoppingCart); all 6 cards link to `/services/[slug]` using the real slug set
- Pushed to branch `claude/revert-homepage-design-v1-ZYGY0` (not main — branch specified by session)
- Build: `npm run build` zero errors
- Batches 2 and 3 cover sections below Services (crops, tools, FAQ, drones, blog, CTA)

## 2026-04-17 — Homepage V1 design revert (batch 2 of 3)

- **Batch 2 (middle sections):** reordered and rebuilt crops, operators, states, how-it-works.
  - Crops: repositioned above operators, H2 changed to "Drone services by crop type" with subhead "Find operators with hands-on experience in your production system"; card layout unchanged
  - Featured operators: new section with 3 `OperatorCard`s (capped via `getFeaturedOperators().slice(0,3)`), right-aligned "View all operators" link
  - States: replaced the full region-grouped 50-state grid with a compact 8-card row sorted by operator count; full 50-state grid still lives on `/states` and in footer
  - How it works: restored V1's 3-step section (Search your area / Compare operators / Contact and book) with green "Step N" badges, circle icons, and "Find an Operator" CTA
- Build: `npm run build` zero errors (1214 pages generated)
- Batch 3 covers tools, FAQ, drones, blog, newsletter + operator CTA, footer

## 2026-04-17 — Homepage V1 design revert (batch 3 of 3)

- **Batch 3 (final sections):** tools expansion, blog wiring, newsletter band, footer byline removal.
  - Tools section: expanded from 3 to 6 cards in a 3-col grid (Spray Cost, ROI, Coverage Time, Acreage Converter, Drone Comparison, Treatment Calendar); each links to `/tools/[slug]`; Lucide icons (Ruler, GitCompare, CalendarDays)
  - Blog section: replaced hardcoded 3-post list with live `blogPosts` data sorted by `publishedAt` desc (top 3); each card links to `/blog/[slug]`
  - Newsletter: new compact section between blog and operator CTA (Mail icon + label + email input + Subscribe button, posts to `/newsletter`)
  - Footer byline: removed the visible "Edited by Eugen" strip from the homepage (AUTHOR still in schema + on `/about`); removed unused `LAST_REVIEWED` constant and `AUTHOR` import
  - FAQ content / Popular drones / Operator CTA unchanged (already matched spec)
- Verification: no `--`/`—`/`–` on the page; no "Edited by"/author-photo references; FAQPage schema intact; 16 `Link href` declarations (52+ rendered links after iteration)
- Build: `npm run build` zero errors (1214 pages)
- Pushed to `claude/revert-homepage-design-v1-ZYGY0`; draft PR #32 updated, marked ready for review

## 2026-04-18 — Operator data import (260 new operators, PR #38)

- Parsed 7 research batch files (`_research/operators-batch-*.md`) via `scripts/import-operators.ts`
- Field-mapped raw rows → `Operator` objects; deduped vs 131 existing + cross-batch; category-filtered
- Near-dupe check: removed 2 confirmed punctuation/spacing duplicates
- Appended 260 net-new operators in 3 batches of 90/90/80; total **131 → 391 operators**
- Zero TypeScript errors; committed + pushed to `claude/restore-operator-batches-5Kuiz`; draft PR #38 created

## 2026-04-18 — Master audit phase 4 content quality (branch claude/remove-garbage-files-aDHms)

- **Step 1 dashes:** 3 hits in `src/data/operators.ts`; fixed 2 en-dashes in batch-import comments; left 1 real URL (`birkeys.com/--precision-farming-drones`)
- **Step 2 Romanian:** zero hits across src/
- **Step 3 AI patterns:** 2 operator descriptions reworded (`wide range of` → `Stocks`; `Comprehensive` → `Carries full`)
- **Step 4 placeholders:** 5 `{{PLACEHOLDER}}` in `src/data/author.ts` intentionally pending Eugen's bio data; already defensively filtered at render (author.ts:56, about/page.tsx:42); no fabrication
- **Step 5 operator count:** OG image `130+ verified operators` → dynamic `${operators.length}+` (now 391+)
- **Step 6 pricing:** pricing page crop table aligned to `crops.ts` canonical (corn $12-$18, soybeans $12-$18, cotton $14-$20, rice $14-$22, orchards $20-$35). One blog post reference to orchards updated from `$15 to $21` → `$20 to $35`
- **Step 7 drone specs:** services.ts sales description and aeoBlock had stale prices (T50 $18K-$25K, AG-272 $35K-$45K). Updated to canonical (T50 $22K-$28K post-tariff, AG-272 $55K-$75K). Tank (40L, 68L) and NDAA flags already consistent across buyers-guide, homepage, drone-model.ts
- **Step 8 schema spot-check:** all 8 pages (homepage, iowa, corn, spraying, dji-agras-t50, blog-post-1, spray-cost-calculator, faa-part-107) emit correct JSON-LD types (Article/FAQPage/BreadcrumbList + WebSite/Organization/Person on homepage, SoftwareApplication on tools). No fixes needed.
- **Step 9 Google Rich Results fixes:**
  - Homepage featured operators: `itemProp="name"` on anchor was returning the href URL per HTML microdata rules. Added explicit `<meta itemProp="name" content={operator.name}>` inside the `<article>` and removed `itemProp="name"` from the `<Link>`. Verified rendered HTML now outputs business names (e.g. "AgriForce Drone Services LLC") not URLs.
  - Operator pages: `OperatorSchema.tsx` now always emits `PostalAddress` with `addressLocality` (city), `addressRegion` (state abbreviation from `getStateAbbr(counties)`), `addressCountry: "US"`, and `streetAddress` when available.
  - Operator pages: added `image` field with site-level fallback `${SITE.domain}/og-image.png`.
- Commits on `claude/remove-garbage-files-aDHms`: b8135d2 (dashes), 26db07e (AI patterns), 4e3076c (dynamic count), ab54e37 (pricing), b9843a7 (drone specs), 44ad737 (Google schema)

## 2026-04-21 — City-level pages template (batch 1, branch claude/city-level-pages-template-vcGAG)

- **`src/data/cities.ts`:** new aggregator. Buckets operators by `city + counties[0]` (primary state). Filters out junk: city == state name (Nebraska/Texas/etc), directional/statewide (Central/Southern/Statewide), and reserved child slugs (operators/services/crops). Threshold = 2+ operators per city (only 2 cities cleared 3+ after filtering, so fell back to 2+ as instructed). Helpers: `getCity`, `getQualifyingCities`, `getCitiesInState`, `getTopServicesForCity`, `getTopCropsForCity`, `getCityRateRange`, `getCityCenter`.
- **`src/app/states/[slug]/[city]/page.tsx`:** new programmatic route, `dynamicParams = false`. Title: `Drone Spraying Services in [City], [State] | Ag Drone Directory`. H1: `Agricultural Drone Services in [City], [State]`. AEO block built from real city data (operator count + min/max per-acre rate + top crop + top 3 service labels) — every block unique. Reuses `OperatorCard`, `Breadcrumb`, `Byline`, `AuthorCard`. Schemas: BreadcrumbList (Home > States > State > City), LocalBusiness with averaged GeoCoordinates, ItemList of operators. Sections: stats row, operator grid, nearby cities (other qualifying cities in state), state-link CTA, related crop links to `/states/[state]/crops/[crop]` for top 2 crops.
- **`src/app/sitemap.ts`:** wired `cityPages` from `getQualifyingCities()` (priority 0.7, monthly).
- **Generated:** 26 city pages. Top: Auburn AL (3), Salinas CA (3), then 24 cities at 2 ops (Baton Rouge LA, Houston TX, Harrisonburg VA, Nashville TN, Knoxville TN, Starkville MS, Lexington KY, Daytona Beach FL, Jonesboro AR, Weston WV, Syracuse NY, Champaign IL, Effingham IL, Six Lakes MI, Overland Park KS, Hiawatha KS, Wichita KS, Nebraska City NE, etc).
- **Build:** `npm run build` clean, zero errors.

## 2026-04-21 — City pages internal-linking (batch 2)

- **`src/app/states/[slug]/page.tsx`:** new "Browse by city" section in both the rich proof-state template (after the operator grid, before spray windows) and the fallback county-based template (after the operator grid, before crops). Renders only when `getCitiesInState(slug)` returns ≥1 city. Each entry links to `/states/[state]/[city]` with operator count chip.
- **`src/app/states/page.tsx`:** added one sentence to the intro paragraph: "In states with multiple operators per city, you can also browse by city."
- **Internal-linking verified:** 21 distinct states gained the city block, covering all 26 city pages. Every city page uplinks 3 ways (breadcrumb text, breadcrumb JSON-LD, "View all operators in [State]" CTA + the state link near the H1). Zero orphans.
- **Build:** `npm run build` clean.

## What's next (see pending-items.md for detail)

1. Eugen fills bio placeholders (last name, country, field, LinkedIn, photo)
2. Research files research-03, research-04, research-05 unblock regulations hub, grants pages, pricing rewrite, homepage rewrite
3. Remaining 47 state data objects (Corn Belt / Great Plains / Delta+Southeast / West Coast+Mountain / Northeast batches) — **blocked on `research-03-state-licensing.md`**; template is ready and tested
