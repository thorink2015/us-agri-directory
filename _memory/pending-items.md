# Pending items

> What's blocked and what unblocks it. When an item moves from pending
> to done, move it into `session-history.md` and delete it here.

Last updated: 2026-04-15

## Blocked on Eugen's input

### Author identity

Author placeholders filled and photo uploaded 2026-04-24 (see
`project-facts.md § Author (E-E-A-T)`). Optional items remaining
(not blockers):

- `AUTHOR.x` (X/Twitter URL) — optional, leave blank if not used
- `organizationSchema().sameAs` — add company LinkedIn / X when
  those accounts exist

## Phase A follow-up (from PR #90 audit, 2026-05-02)

Findings written to `audit/phase-a-followup-audit.md`. Three 404
fixes shipped 2026-05-02 (this PR), four remaining items below.

Done (PR #91 — three 404s):

- ✅ `/regions/delta` 301 → `/regions/mississippi-delta` (force=true
  in `netlify.toml`)
- ✅ `dji-agras-t25p` full catalog entry in `src/data/drone-model.ts`
  (mirrors T25 specs, US-spec variant noted, NDAA non-compliance
  called out, 6 FAQs, 5 authority links). Removed the no-longer-
  needed fallback label from `DRONE_NAME_FALLBACKS`.
- ✅ Homepage newsletter form rewired to Formspree via the new
  `src/components/ui/HomepageNewsletterForm.tsx` client component
  (mirrors Footer + ContactForm + ExitIntentPopup pattern). Hidden
  `_form_type=newsletter-homepage` plus `_subject` so the inbox can
  distinguish from the footer signup.

Done (PR #93 — operator template uplift):

- ✅ Thin operator profile uplift via `src/lib/operator-content.ts`
  helpers and 5 new sections in `src/app/operators/[slug]/page.tsx`
  (auto paragraph, region context line, crop pricing context,
  state licensing context, 2-FAQ block + FAQPage JSON-LD). Verified
  rendered word counts on three canaries: lnp-ag-drone-spraying
  40 → 448, sphex-ag 51 → 462, agronix 51 → 495. Rich profile
  (agriforce-drone) 164 → 735, no regression. Pattern documented
  in `_memory/code-patterns.md`.

Done (PR #94 — state-crop template uplift):

- ✅ State-crop combo template uplift via
  `src/lib/state-crop-content.ts` helpers and 6 new/rewired sections
  in `src/app/states/[slug]/crops/[crop]/page.tsx` (state-specific
  intro paragraph, spray-window callout, crop.longDescription
  swap, state licensing block, combined 7–11 FAQ block, FAQPage
  JSON-LD, page-level noindex gate). Audit's stated 408 combos was
  actually 50 × 8 = **400** combos (counties.ts has 50 entries,
  not 51). Build-time log emits the noindex-gate distribution.
  Verified word counts: mississippi/corn 1934→2753, iowa/corn
  774→1656, texas/cotton 834→1732 (all clear the 700-word target).
  99 of 400 combos correctly emit `<meta robots="noindex,follow">`.

Done (PR #95 — three feasibility audits, audit-only):

- ✅ `audit/city-pages-feasibility.md` — city route already exists
  at `/states/[slug]/[city]`; realistic ceiling ~225 cities with
  USDA NASS + Census Places seed data.
- ✅ `audit/service-state-feasibility.md` — service-state route
  exists, 500 pages, 276 of 500 combos at ≥3 ops, recommended
  uplift pattern (now shipped in PR #96 below).
- ✅ `audit/crawl-budget-check.md` — ~1,499 indexable URLs after
  PR #94. Zero internal 404s. Three follow-up issues flagged.

Done (PR #96 — service-state template uplift):

- ✅ Service-state combo template uplift via
  `src/lib/state-service-content.ts` helpers and 8 new/rewired
  sections in `src/app/states/[slug]/services/[service]/page.tsx`
  (state-specific intro paragraph, service AEO callout, crop
  affinity callout for the 6 crop-binding services, state
  licensing block, authority links section, combined 4–9 FAQ
  block + FAQPage JSON-LD, page-level noindex gate). 224 of 500
  combos correctly noindex'd post-build (emergency=50, rental=46,
  consultancy=38, mapping=24, monitoring=19, spreading=17,
  training=11, sales=8, seeding=7, spraying=4). Verified word
  counts: iowa/spraying 1554→1946 (+25%), ohio/mapping 893→1401
  (+57%), iowa/spreading 930→1372 (+48%), alaska/emergency
  605→1101 (+82%, noindex). Pattern documented in
  `_memory/code-patterns.md`.

Done (PR #97 — cleanup batch):

- ✅ Noindex gate on thin `/states/[slug]/operators` pages.
  Threshold of <9 operators captures the 8 audit-flagged plus
  Wisconsin (also 7 ops/399 words). 9 states gated:
  alaska, arizona, hawaii, nevada, new-mexico, rhode-island,
  utah, wisconsin, wyoming.
- ✅ Scaffolded 4 orphan crop slugs in `src/data/crops.ts`:
  `row-crops` (240M acres umbrella), `pasture` (650M acres),
  `alfalfa` (16M acres), `potatoes` (1M acres). Full Crop
  entries with 5 FAQs each, 4-5 authority links each, primary
  sources (USDA NASS, university extension).
- ✅ Scaffolded 4 orphan drone slugs in
  `src/data/drone-model.ts`: `dji-agras-t40`, `dji-agras-t10`,
  `xag-p100`, `eavision-j100`. Full DroneModel entries mirroring
  the dji-agras-t25/t25p shape from PR #91. NDAA non-compliance
  called out for all four (Chinese-made). Removed corresponding
  fallback labels.
- ✅ Tightened `cities.ts` `isValidCityName()` — rejects multi-
  state separators, parentheticals, county/region suffixes,
  regional prefixes, embedded state abbreviations, all-caps
  placeholders, digits. 25 → 23 qualifying cities; the 2
  dropped are the audit-flagged anomalies (`southern-california`,
  `colorado-weld-county`).
- ✅ Fixed `j100` / `j150` operator slug typos in
  `src/data/operators.ts` (rafter-7-agritech now references
  `joyance-j100` / `joyance-j150`). Removed the j100/j150
  fallbacks from DRONE_NAME_FALLBACKS now that no operator
  references them.

Done (PR #98 — city seed data):

- ✅ 196 ag-relevant US cities seeded from USDA NASS + Census
  Bureau Places into `src/data/seed-cities.ts`. 48 of 50 states
  covered; per-state cap of 5; lower counts for weak-ag states
  (Hawaii 1, Alaska 1, MA/NH/CT/DE 2; UT/AZ/WV/MD/NJ/VT/ME/WY 3).
- ✅ Merged into `src/data/cities.ts` via two-pass buildCityIndex
  with `isSeed` flag. Qualifying cities: **23 → 216**.
- ✅ City template extended for graceful 0-operator handling:
  AEO/FAQ branches, county callout, statewide operator fallback
  (up to 12 in the grid), crop table fallback to county.mainCrops.
  All 216 pages clear 700-word threshold.
- ✅ Noindex gate at metadata layer for seeded cities with 0
  direct ops AND <3 statewide operators. **1 of 216** pages
  gated (alaska/palmer).

Done (PR #99 — content quality audits, audit-only):

- ✅ `audit/internal-duplication.md` — 4 PASS, 1 WARN (operators
  41.3% mean). Helper script committed at
  `tools/content-audits/duplicate_check.py`.
- ✅ `audit/external-uniqueness.md` — 9 of 9 strategic Google
  searches returned zero competitor hits across 5 routes.
- ✅ `audit/rankability-check.md` — 1,758 unique titles. Operators
  FAIL (no external authority links + ultra-thin word counts);
  cities WARN (no external authority links).

Done (PR #100 — operator + city template fixes per PR #99 audits):

- ✅ Diversified operator auto-paragraph (6 lead variants × 3 locality
  × 3 licensing = ~18 prose combinations per state), FAQ wording
  (3 question + 3 answer variants per FAQ), and per-state licensing
  block sentence (3 variants). All keyed on hash(operator.slug) or
  hash(operator.slug + state.slug) so same-state peers diverge
  deterministically. Operator route mean similarity: **41.3% → 19.5%**
  (PASS). 1 ultra-thin operator (`applied-ag`) noindex'd.
- ✅ Added per-operator authority-links block (state regulator URL,
  state extension URL, FAA Part 137, NAAA, optional NDAA Section
  848). Operator rankability authority-link check: **FAIL → PASS**
  (5/5 sampled pass post-fix).
- ✅ Added authority-links section to city template. City rankability
  authority-link check: **FAIL → PASS** (5/5 sampled).

Still pending:

1. **Fill `organizationSchema().sameAs`** when company social
   accounts exist.
2. **Pull a Search Console crawl-error export** and audit operator
   slug duplicates / orphan pages in bulk (flagged in the PR #90
   audit "bonus finding" section).
3. **City H1 tonal review** — current "Agricultural Drone Services
   in [City], [State]" vs alternative "Drone Spraying in [City],
   [State]". Both keyword-relevant; current framing is broader
   since city pages surface multiple services. Cosmetic.
4. **Alaska state hub content lift** — single state hub at 521
   words, fails the 700 threshold. Not template-fixable; needs a
   one-time content pass on `states.ts` Alaska entry.

## Blocked on research files

See `_research/README.md` for what's uploaded and what's missing.

| Research file | Unblocks |
|---|---|
| `research-03-state-licensing.md` | 50 state page template (build-plan Session 11), `/regulations/state-licensing` |
| `research-04-usda-programs.md` | `/grants` pillar, insurance page, training page, `/pricing` rewrite |
| `research-05-keyword-map.md` | Homepage rewrite, `/pricing` pillar rewrite |
| `operators-batch-2-southeast.md` | Southeast operator seed data (plan references Batch 2 but not uploaded) — other 7 batches fully imported (PR #38) |

## Blocked on external account setup (Eugen handles)

- ✅ Yandex Webmaster — verified
- ✅ Bing Webmaster Tools — connected via Google import (auto-verified + sitemap imported)
- ✅ IndexNow — auto-pings on every production deploy (1130 URLs, HTTP 200)
- Google Search Console — verify domain + submit sitemap `https://agdronedirectory.com/sitemap.xml`
- Sign up for Plausible Analytics → share domain ID so we can wire
  `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and swap out GA4
- Sign up for rank tracker (SerpRobot or Wincher) with 50 seed keywords
- Set up Cloudflare for performance + bot management

## Ready to build when unblocked

- ✅ Homepage full rewrite — shipped 2026-04-16
- ✅ `/pricing` pillar rewrite — shipped 2026-04-16
- ✅ All 6 tool pages SEO/AEO treatment — shipped 2026-04-16
- ✅ State page template + 3 proof states (IA, TX, CA) — shipped 2026-04-17 (PR #22 draft)
- `/regulations` hub + FAA sub-page + EPA sub-page (needs research-01, research-02)
- Remaining 47 state data objects — template ready, **blocked on research-03-state-licensing.md**
- Grants / insurance / training pages (needs research-04)
- `/start-a-drone-business` pillar (needs all research files)
- Blog posts 1-10 (build-plan says "written in full by me" — Eugen writes these)

## Known gaps to patch

- `/advertise` (merged PR #58, 2026-04-21) is NOT listed in
  `src/app/sitemap.ts` `staticPages`. Append
  `{ url: `${BASE_URL}/advertise`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 }`
  in the next small batch. Flagged by `standing-rules.md` §3.1.

## Optional polish (not blocking)

- Netlify post-deploy GitHub Action to auto-run IndexNow ping
- OG image generation (currently stubbed to `/images/og-default.jpg`)
- Dark mode (not in scope unless requested)
