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

Still pending:

1. **Noindex gate on `/states/[slug]/operators` empty states** —
   8 thin pages (alaska 21 words, nevada 28, arizona 154, etc.).
   ~30 min of work, mirrors the same metadata-layer pattern.
2. **Scaffold top 4 orphan crop slugs** (`row-crops`, `pasture`,
   `alfalfa`, `potatoes`) and **top 4 orphan drone slugs**
   (`dji-agras-t40`, `xag-p100`, `eavision-j100`, `dji-agras-t10`)
   — ~2 hr, unlocks 117+ operator cross-links and 8 new hubs.
3. **City pages: layer USDA NASS county-level + Census Bureau
   Places seed data on the operator-derived set** — ~1 day,
   lifts 25 → ~225.
4. **Two minor data cleanups** — tighten `cities.ts`
   `isValidCityName()` to reject `southern-california` / county
   names; fix `j100` / `j150` operator-data typos to
   `joyance-j100` / `joyance-j150`.
5. **Fill `organizationSchema().sameAs`** when company social
   accounts exist (also tracked above).
6. **Pull a Search Console crawl-error export** and audit operator
   slug duplicates / orphan pages in bulk (flagged in the PR #90
   audit "bonus finding" section).

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
