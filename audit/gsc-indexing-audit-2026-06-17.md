# Google Search Console indexing audit — 2026-06-17

Source: GSC "Why pages aren't indexed" + a Product Rich Results error,
exported by Eugen. This doc triages every bucket into **expected**
(no action), **fixed in this PR**, or **strategic follow-up**.

Totals from the report: noindex 267, alternate-canonical 9, page-with-
redirect 7, not-found 5, crawled-not-indexed 250, discovered-not-indexed
194.

---

## A. FIXED in this PR

### A1. Product rich-results error (real bug, HIGH)
**GSC:** "Either 'offers', 'review', or 'aggregateRating' should be
specified" — invalid Product, example `/drones/dji-agras-t100`.

**Cause:** `src/app/drones/[slug]/page.tsx` always rendered the `Product`
JSON-LD. The `offers` node is only added when a numeric MSRP is parseable
from the free-form `drone.msrpUsd`. Quote-only models ("Not published;
contact dealer", "Pending", "quote-based") produced a `Product` with no
offers / review / aggregateRating, which Google rejects. A stale code
comment claimed this "still passes Rich Results validation" — it does not.

**Scope:** ~8 of 17 drones have non-parseable prices and were all
emitting an invalid Product (GSC had only surfaced the T100 so far):
t100, hylio-ag-230, xag-p100-pro, the four "Pending" models, and
eavision/leadingedge quote-only entries.

**Fix:** Build the Product (with Offer) only when a price is parseable and
render the `<script>` conditionally (`msrpLowest != null`). We have no
review/rating data and will not fabricate it, so quote-only models simply
ship no Product node. They keep FAQPage + BreadcrumbList + Article schema.

### A2. Two genuine 404s → 301 (LOW)
`/states/california/southern-california` and `/states/west-virginia/weston`
are not in `src/data/cities.ts` (southern-california was dropped in PR #97
as an invalid city; weston was never seeded). Added `force` 301s to the
state hub in `netlify.toml` so Google drops the 404s and keeps any equity.

---

## B. EXPECTED — no action (explained for Eugen)

### B1. "Page with redirect" (7) — all intentional
- `http://`, `https://www.`, `http://www.` → canonical single-hop 301 to
  `https://agdronedirectory.com` (netlify.toml). Correct.
- `/drones/hylio-ag272` → `/drones/hylio-ag-272` (typo redirect). Correct.
- `/operators/kuhn-s-aerial-applications-llc`,
  `/operators/flying-cowboy-photography`,
  `/operators/american-drone-llc` → 301s to the canonical/renamed operator
  slugs (dedup + rename, all in netlify.toml). Correct and healthy.

"Page with redirect" is GSC noting the old URL forwards. It is not an
error.

### B2. "Alternate page with proper canonical tag" (9) — canonical working
- `/list-your-business?claim=<slug>` (8) — the per-operator claim deep
  links. They canonicalize to `/list-your-business`. Working as designed.
- `/operators?q={search_term_string}` — Google crawled the literal
  WebSite SearchAction `urlTemplate`. It canonicalizes to `/operators`.
  Harmless; left as-is.

### B3. Most "Excluded by noindex" (267) — by design
Thin (state × crop) and (state × service) combos and sparse
state-operator / city pages are deliberately `noindex` via
`src/lib/indexing-gates.ts` (PRs #94/#96/#97/#101). The sitemap already
excludes them; Google finds them through on-page links and correctly
drops them. This is the thin-content gate doing its job, not a problem.

### B4. Stale 404s that already redirect / now resolve
- `/regions/delta` → 301 to `/regions/mississippi-delta` (netlify.toml).
- `/newsletter` → 301 to `/` (netlify.toml).
- `/drones/dji-agras-t25p` — page exists now (added PR #91).
These were last crawled before the fix shipped; they clear on recrawl.

### B5. `*/opengraph-image` in "crawled - not indexed"
City OG image endpoints (e.g. `/states/michigan/traverse-city/
opengraph-image`) already carry an `X-Robots-Tag: noindex` header
(netlify.toml lines 79-87). They are images, not pages; this bucket is
benign and clears on recrawl.

---

## C. STRATEGIC follow-ups (not code bugs — need content / judgement)

### C1. Important hubs in "crawled - currently not indexed"
State hubs (massachusetts, wisconsin, washington, connecticut, idaho) and
region hubs (mississippi-delta, california) plus `/services/emergency`
were crawled but not indexed. This is a thin-content signal on hubs that
should rank. Recommend a one-time content lift on the weakest state hubs
(the Alaska <700-word issue in `pending-items.md` is the same class).
Not template-fixable; needs copy in `states.ts` / `regions.ts`.

### C2. Crawl budget on the 4 "umbrella" crops
`alfalfa`, `pasture`, `potatoes`, `row-crops` generate ~50 state combos
each (~200 URLs), virtually all `noindex`. They are correctly gated, but
the state-hub still links them, so Google keeps recrawling ~200 dead-end
URLs. Options to evaluate (each has trade-offs, so flagged not done):
  - Stop rendering links to noindex'd combos from the state hub (cuts
    discovery, but also removes them from the on-site browse path).
  - Or drop these 4 umbrella crops from the (state × crop) generation
    entirely and keep only their `/crops/<slug>` hub pages.

### C3. New-site crawl maturation
194 "discovered - not indexed" + much of the 250 "crawled - not indexed"
is normal queue/maturation for a ~1,400-URL site that is still gaining
authority. Expect gradual improvement; prioritise C1 (hub quality) and
internal links to accelerate it.

---

## Verification
- `npm run build` clean.
- Quote-only drone pages emit no Product node; priced drones still do.
- The two dropped-city URLs 301 to their state hub.
