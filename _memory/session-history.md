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

## 2026-04-16 — Domain migration + GA4 + search engine setup

- Domain migrated from `usagdronedirectory.com` → `agdronedirectory.com` across all 27 source files
- GA4 stream G-9TG0D7BHZV wired to agdronedirectory.com (hostname guards updated)
- layout.tsx: added Yandex + Baidu verification env-var slots alongside existing Google/Bing
- scripts/check-cloudflare.sh: full zone audit script for Cloudflare
- Cloudflare creds saved to .env.cloudflare.local (gitignored)
- Netlify env vars still needed: NEXT_PUBLIC_GA_MEASUREMENT_ID=G-9TG0D7BHZV, GSC/Bing/Yandex verification codes

## What's next (see pending-items.md for detail)

1. Eugen fills bio placeholders (last name, country, field, LinkedIn, photo)
2. Research files research-03, research-04, research-05 unblock regulations hub, grants pages, pricing rewrite, homepage rewrite
3. State page template + 50 state pages (build-plan Session 11 — behind approval gate)
