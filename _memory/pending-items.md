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

Done (PR #100/#101 — full technical SEO + AEO + perf audit + critical fixes):

- ✅ 8 audit files in `audit/` (schema, indexing-config, meta,
  performance, AEO, internal-link-graph, http-security,
  onpage-issues).
- ✅ **CRITICAL** (PR #101 commit 1): sitemap noindex filter via
  new `src/lib/indexing-gates.ts`. Sitemap **1,903 → 1,419** URLs
  (-484 noindex'd pages excluded). Page templates and sitemap
  share predicates so no more drift.
- ✅ **HIGH** (commit 2): drone catalog Product schema with brand,
  model, additionalProperty, offers (when MSRP parseable). All 17
  drone pages now ship 4 JSON-LD blocks (FAQPage, BreadcrumbList,
  Article, Product).
- ✅ **HIGH** (commit 3): state-operators CollectionPage + ItemList
  schema across all 50 pages. Was zero-schema; now 2 JSON-LD blocks.
- ✅ **HIGH** (commit 4): per-city dynamic og:image generation.
  216 city pages each generate a unique 1200×630 PNG with city +
  state + top crop/service + operator count + brand chrome.

Still pending — MEDIUM and LOW from PR #100 audits (post-launch polish):

- MEDIUM: state-crop and state-service routes missing `BreadcrumbList`
  schema (1,100 pages).
- ✅ Operator template now emits `LocalBusiness` (PR #120 commit
  `94b4280`, 2026-05-13). Adds `hasCredential` (FAA Part 137) when
  `verified && certFAAPart137`. Geo + priceRange Rich Results
  available on the ~250 operators with full address+lat+lng.
- MEDIUM: homepage missing `WebSite` + `SearchAction` schema.
- MEDIUM: per-route og:image generation for state, crop, service,
  operator routes (cities done in PR #101).
- MEDIUM: 19 orphan pages — 17 sparse-state /states/[slug]/operators
  (PR #97 noindex'd; still no inbound links from state hub).
- MEDIUM: `/operators/agnomy` anomaly to investigate.
- MEDIUM: homepage 50-word direct-answer to "how much does drone
  spraying cost".
- MEDIUM: `HowTo` schema on city template's "How to hire" 3-step
  section.
- MEDIUM: state-hub HTML weight averaging 206 KB (raw, gzip-friendly
  but worth investigating if LCP regresses).
- MEDIUM: 16 long-H1 pages (descriptive, accurate; just truncation).
- LOW (15 across 8 audits): see audit files for individual items.

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

## Blocked on Eugen — The Premium Acre launch (2026-07-17)

- ✅ **Stripe Payment Links** — DONE 2026-07-17. Eugen supplied both
  links in chat; hardcoded in `src/lib/premium-acre.ts` (founding $17
  on /join, regular $49 on /subscribe). The
  `NEXT_PUBLIC_STRIPE_PREMIUM_ACRE_URL` env var is retired (was never
  set in Netlify).
- Optional: a real close date for the founding offer. The page
  currently says "Founding member offer" with no date; a hard date is
  a one-line copy edit on the founder card.
- **The five bonus documents are NOT built/hosted yet** (Eugen,
  2026-07-17: "i didnt put them anywhere yet"). The page therefore
  promises no day-one delivery: the "What happens after I join?" FAQ
  says the newsletter kicks off "in the next week or so" with the
  first issue + welcome bonuses. Once Eugen produces the documents
  (drafts exist in his Claude Desktop sessions), update that FAQ if
  the timeline language goes stale.

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

- ✅ `/advertise` sitemap gap — fixed in PR #118 (2026-05-06,
  Tier 1 sweep). Robots.ts already permitted; page had no
  noindex; one-line addition to `src/app/sitemap.ts` `staticPages`.

## Open decisions before May-16 freeze ends (Tier 2 gating)

These three answers unblock the operator-research batch run.
Recommendations are in `_research/import-script-extension-spec.md`
(2026-05-06).

1. **Working branch for Tier 2 deliverables.** `T0YnN` is fully
   merged into main per `_handoff/branch-audit-2026-05-06.md`;
   recommend a fresh branch (e.g. `claude/research-batches-2026-05`)
   rather than resurrecting the merged one.
2. **Citation persistence.** `audit/research-plan` deliverables
   include a `Source URL` column. Recommended: add
   `sourceUrl?: string` to the `Operator` interface and render in
   the profile footer (one schema line + one `<a>`).
3. **Geocoding.** New operators land without `lat`/`lng` today.
   Recommended: wire Nominatim (1 req/sec, cached) with a static
   gazetteer fallback. Drops nothing if you defer.

## Actionable findings from 2026-05-06 Tier 1 audits

These are concrete, freeze-safe data-side moves that came out of
the eight audit files committed in PR #118.

- **`Applied Ag` is the only ultra-thin operator.** `city` blank,
  `services` and `drones` empty, no contact. Either flesh out
  (add city, contact, services tags) or remove from
  `src/data/operators.ts`. See
  `audit/indexing-gates-review-2026-05-06.md`.
- **Re-tag existing operators for `mapping` and `consultancy`.**
  44 (state, service) pages are at count = 2, one operator away
  from indexed. Bulk of the near-thresholds are mapping and
  consultancy — services many operators offer but don't tag.
  Likely flips 15–20 state-service pages to indexed without new
  research. Same audit file.
- **Three near-threshold states for state-operators index.**
  Wyoming (8 ops, needs 1), Utah (7, needs 2), Wisconsin (7,
  needs 2). Tier 2 batch should prioritize these for
  highest-leverage flips.
- **Drop Nebraska City, NE from Batch 4.** Recount shows it now
  has 3 ops (covered_well). See
  `audit/research-plan/priority-batches-recount-2026-05-06.md`.
- **~20 likely-real operator misses in `_research/` files.** Names
  in the dedupe audit (Kuhn's Aerial Applications, Application
  Insight, SkySkopes, Saxon Aerospace, etc.) appear in research
  but not in `operators.ts`. Re-import after the May-16 script
  extension lands. See
  `audit/research-plan/dedupe-audit-2026-05-06.md`.
- **`operators-batch-4b-mountain-west.md` (no -v2) parses to 0
  rows.** Format differs from -v2; either delete (if superseded)
  or re-extract.
- **Regenerate `existing-operators-name-list.txt`** before the
  next research prompt fires. Current snapshot is missing 6 ops
  from `operators.ts`. One-liner in the dedupe-audit file.
- **Romanian-URL redirects from `_handoff/launch-checklist.md`
  Part 6 are not implemented.** No `_redirects` file exists;
  `netlify.toml` only handles HTTPS canonicalization. Verify
  Search Console for any Romanian-URL impressions; if zero,
  mark Part 6 not-applicable.
- **`_handoff/launch-checklist.md` page counts are stale**
  (says 8 crops + 9 drones; actual 12 + 17). Total "~120+ pages"
  should be ~1,200+. Plus 5 missing static routes (`/advertise`,
  `/get-matched`, `/affiliate-disclosure`, `/map`, `/guides` hub
  + 4 guide slugs).
- **Stale draft PR #106** (research priority list) closed without
  merge; orphan source branch `claude/build-priority-list-K0o2R`
  can be deleted after confirming `-e3WZt` (the merged sibling)
  has the same content.

## Follow-ups from 2026-06-10 FINAL-merged CSV import

- **142 CSV rows matched existing operators** and were NOT merged into
  their profiles (only linked in the CSV's new `directory_url` column).
  Many carry contact_name / phone / email the existing records lack.
  Decide whether to run a contact-enrichment pass on those 142.
- **47 of the 221 new profiles are noindex-gated** (ultra-thin: no
  city, contact or website — mostly FAA 44807 docket rows). They flip
  to indexed automatically once contact/city data is added to
  `operators.ts`.
- New entries carry `pendingConfirmation: true`. Flip to
  `verified: true` per operator only after Eugen's review.

## Follow-up from 2026-06-11 worth-it guide (Eugen to verify)

- **Part 108 status check.** `/guides/is-drone-spraying-worth-it`
  (whats-new-2026 section) says the FAA Part 108 BVLOS rule "carried a
  final rule deadline of March 16, 2026" per Eugen's research pack,
  which predates that deadline. Today is past it. Eugen should confirm
  whether the final rule actually published and drop one corrected
  sentence if so; the same March 16 framing also exists in the
  statistics guide ("final rule expected Spring 2026" in llms-full.txt).
  Do not invent the outcome.

## Formspree inbox triage — Phase 2/3 pending (2026-07-20)

Deliverables from Phase 1 live under
`_research/formspree-processing-2026-07-20/`. Follow-up batches:

### Phase 2 — new operator records to create (`create-new` in triage)

Per the 1-3 batch rule, do these in 3 batches. See
`_research/formspree-processing-2026-07-20/01-list-your-business.csv`
and `09-dedup-audit.md` for the second-pass audit results.

- **Batch A (3 new, zero-collision confirmed):** Viewpoint Agriculture
  (Sebring, FL), EcoAg Aerial Imaging (Rochester, NY), AG Fertilizer
  LLC (Bastrop, TX).
- **Batch B (1 new + 2 thin-record enrichments):** Leigh Low Aerial
  Services LLC (Mauston, WI + IL); enrich `heartland-sky` (line 8487)
  with phone/email/full-description/services/drones/crops, add
  `nebraska` to counties, flip pendingConfirmation off and verified
  on; enrich `wolverine-drone-services-llc` (line 3446) with email +
  ownerName Jeff Whiting + description + crops + $15/ac.
- **Batch C — BLOCKED on Eugen:** Elevated Ag Drone Services (Auburn
  AL, GA, MS). Possible collision with `elevated-agriculture-llc`
  (line 10815, blank FAA-docket record). Decide before creating:
  enrich in place + rename, or create fresh slug
  `elevated-ag-drone-services` and delete the blank record. See
  `09-dedup-audit.md § FLAGGED — possible collision`.
- **Batch B enrichments (2 thin records):**
  - `heartland-sky` (line 8487) — flip
    `pendingConfirmation: true` → false, add owner phone
    6413529089, email heartlandskyllc@gmail.com, full crops
    list, drones ['dji-agras-t50'], services list, expand
    counties to add 'nebraska', price $14-$18/acre. Do NOT set
    certFAAPart137 (form language is ambiguous on 137).
  - `wolverine-drone-services-llc` (line 3446) — add email
    jeffwhiting@wolverinedroneservices.com, ownerName "Jeff
    Whiting", replace description with the two-sentence form
    submission text, add crops list, price $15/acre. Keep
    existing facebook URL. Do NOT set certFAAPart137 without
    owner confirmation.

### Phase 3 — owner-submitted updates (`update-existing`)

See `02-listing-update.csv` + `09-dedup-audit.md`.

- `croptech-solutions` (line 2018) — Randy Biebel. Phone + website
  already match; additive edits: email, +2 drones (add
  dji-agras-t40), +2 services (spreading, training), expanded
  crops (add alfalfa, pasture, potatoes, row-crops), priceMinUsd 15.
- `volitant-technologies` (line 366) — LOCATION CORRECTION.
  Overwrite city ('Birmingham' → 'Dunbar'), counties (7 SE states →
  ['nebraska']). Add phone, email, website; expand drones/crops/
  services; priceMinUsd 13. Preserve description prose.
- `altitude-agri-services` (line 6478) — safe additive edit ONLY:
  add email kurt.b@altitudeagriservices.com. DO NOT overwrite city
  (form Kennewick vs record Richland — both Tri-Cities WA). Eugen
  replies to Kurt to confirm.

### Phase 4-6 — Eugen (not Claude Code)

- Import `07-newsletter-import.csv` (40 emails) to beehiiv Tank Mix
  audience.
- Import `05-premium-acre-signup.csv` (7 emails) to beehiiv
  Premium Acre audience.
- After Phase 2/3 profiles ship, send `08-email-listing-live.md`
  template to each of the 10 operators (7 new/enriched + 3
  updated).
- Route 27 farmer leads (`03-get-matched-lead.csv` +
  `04-exit-intent-lead.csv`) to state operators.
- Forward Gary Langford's Embry-Riddle quote request
  (`06-operator-quote-request.csv`) to the Embry-Riddle contact.
- Reply personally to Western Valley Insurance (CA) about
  insurance partnerships — not a drone-operator listing.

## Optional polish (not blocking)

- Netlify post-deploy GitHub Action to auto-run IndexNow ping
- OG image generation (currently stubbed to `/images/og-default.jpg`)
- Dark mode (not in scope unless requested)
