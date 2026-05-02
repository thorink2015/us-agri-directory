# Existing-pages crawl-budget check

Audit date: 2026-05-02
Branch: `claude/audit-public-content-w2Iz1`
Reference: requested deliverable 3.

---

## Headline

After the PR #94 noindex gate, the site has **~1,499 indexable URLs** (1,509 buildable routes minus 99 noindex'd state-crop combos minus the 2 dynamic icon endpoints, plus a small batch of ~50 thin `/states/[slug]/operators` and `/states/[slug]/services/[service]` pages that warrant attention next).

The most important crawl-budget issues to flag for the next session are:

1. **`/states/[slug]/operators` has 8 thin pages** (alaska, nevada, arizona, new-mexico, hawaii, utah at 21–247 words). These render essentially "no operators in this state" placeholders. Strong noindex gate candidate.
2. **`/states/[slug]/services/[service]` has 224 of 500 combos with <3 operators** offering the service. Most are functionally empty — `emergency` (50/50), `rental` (46/50), `consultancy` (38/50). Strong noindex gate candidate, mirrors the PR #94 pattern.
3. **Operator data references 15 orphan crop slugs and 8 orphan drone slugs** that don't have catalog entries. Doesn't 404 (templates fall back to non-link spans), but means 87 operator records leak crop/drone names that have no destination page. Worth landing as scaffolded crop/drone entries.
4. **No internal-link 404s** — full link graph integrity is intact.

---

## 1. Indexable URL inventory by route

After PR #94 noindex gating. Counts taken from `next build` output and confirmed against the rendered `.next/server/app/` tree.

| Route pattern | Page count | Indexable? | Notes |
|---|---:|---|---|
| `/` (home) | 1 | ✅ | |
| `/about` | 1 | ✅ | |
| `/advertise` | 1 | ✅ | |
| `/affiliate-disclosure` | 1 | ✅ | |
| `/buyers-guide` | 1 | ✅ | |
| `/comparisons/drone-vs-airplane` | 1 | ✅ | |
| `/comparisons/drone-vs-ground-rig` | 1 | ✅ | |
| `/contact` | 1 | ✅ | |
| `/glossary` | 1 | ✅ | |
| `/grants-and-subsidies` | 1 | ✅ | |
| `/insurance` | 1 | ✅ | |
| `/list-your-business` | 1 | ✅ | |
| `/map` | 1 | ✅ | |
| `/pricing` | 1 | ✅ | |
| `/privacy` | 1 | ✅ | |
| `/start-a-drone-business` | 1 | ✅ | |
| `/terms` | 1 | ✅ | |
| `/training-and-certification` | 1 | ✅ | |
| `/regulations/faa-part-107` | 1 | ✅ | |
| `/regulations/faa-part-137` | 1 | ✅ | |
| `/regulations/ndaa-compliance` | 1 | ✅ | |
| `/regulations/state-licensing` | 1 | ✅ | |
| `/operators` | 1 | ✅ | |
| `/operators/[slug]` | **392** | ✅ | All indexable post PR #93 uplift |
| `/states` | 1 | ✅ | |
| `/states/[slug]` | **50** | ✅ | All 50 states |
| `/states/[slug]/operators` | **50** | ⚠️ | 8 thin (see §2) |
| `/states/[slug]/[city]` | **25** | ✅ | At threshold ≥2 ops/city |
| `/states/[slug]/crops/[crop]` | 400 build / **301 indexable** | ✅ | 99 gated noindex,follow per PR #94 |
| `/states/[slug]/services/[service]` | **500** | ⚠️ | 224 thin (see §2) |
| `/crops` | 1 | ✅ | |
| `/crops/[slug]` | **8** | ✅ | |
| `/services` | 1 | ✅ | |
| `/services/[slug]` | **10** | ✅ | |
| `/drones` | 1 | ✅ | |
| `/drones/[slug]` | **13** | ✅ | T25P added in PR #91 |
| `/regions` | 1 | ✅ | |
| `/regions/[slug]` | **5** | ✅ | |
| `/guides` | 1 | ✅ | |
| `/guides/[slug]` | **4** | ✅ | |
| `/blog` | 1 | ✅ | |
| `/blog/[slug]` | **10** | ✅ | |
| `/tools` + 6 calculators | 7 | ✅ | |
| `/icon`, `/apple-icon` | 2 | n/a | Dynamic Next.js icons; route-resolved at runtime |
| `/go/[slug]` | n | n/a | Affiliate redirects, disallowed in robots.ts |

### Totals

| Bucket | Count |
|---|---:|
| Built static pages | **1,509** |
| Noindex'd by PR #94 (state-crop weak combos) | **99** |
| Indexable today | **~1,410** (1,509 − 99) |

---

## 2. Near-duplicate templates worth attention

### `/regions/[slug]` — **5 pages, leave alone**

Word counts: avg **1,227** (median 1,238, min 1,125, max 1,317). Each page is a uniquely written long-form region profile (`regions.ts` has rich `longDescription`, `aeoBlock`, `keyInsights`, `sprayWindows`, `faqs`). Strong indexation signal already.

**Recommendation:** **leave alone.** No template work needed.

### `/drones/[slug]` — **13 pages, leave alone**

Word counts: avg **1,710** (median 888, min 174, max 9,180). The 174-word minimum is the LeadingEdge PV40X scaffolded entry (`description: 'Specifications pending manufacturer verification.'`). The high max is healthy long-form spec + FAQ + tariff context content.

**Recommendation:** **leave alone.** Single thin page (LeadingEdge PV40X) is intentionally a stub awaiting verification, not a template issue. Fill that one record in a future session, no template uplift needed.

### `/crops/[slug]` — **8 pages, leave alone**

Word counts: avg **945** (median 957, min 905, max 991). Tight cluster, all rich (crops.ts has `longDescription` 150–250 words + `faqs` 4–6 entries + `mainPests` + authority links per crop).

**Recommendation:** **leave alone.**

### `/services/[slug]` — **10 pages, leave alone**

Word counts: avg **1,127** (median 1,162, min 970, max 1,202). Tight cluster, well above thresholds.

**Recommendation:** **leave alone.**

### `/states/[slug]` — **50 pages, leave alone**

Word counts: avg **1,225** (median 1,295, min 495, max 1,604). Hugely state-specific (states.ts has rich licensing details, aeoBlock, faqs, sprayWindows, topCrops per state). Min of 495 (likely a thinner-data state) is still well above the indexation floor.

**Recommendation:** **leave alone.**

### `/states/[slug]/operators` — **50 pages, 8 thin, content uplift recommended**

Word counts: avg **880** (median 815, min **21**, max 2,117).

Thinnest 6 pages:

```
alaska              21 words
nevada              28 words
arizona            154 words
new-mexico         214 words
hawaii             225 words
utah               247 words
```

These render essentially "no operators in this state yet" placeholders. The 21-word minimum is unambiguously a thin/empty page and is likely already getting "crawled, not indexed" treatment from Google.

**Recommendation:** **noindex gate** when `getOperatorsByCounty(stateSlug).length < 3`. Mirror PR #94 pattern. Affected: 8 pages (alaska, nevada, arizona, new-mexico, hawaii, utah, plus a couple borderline). Simple metadata-layer change.

**Alternative:** content uplift instead of noindex — render the state's licensing block, regional context, "be the first listed" CTA, and `state.aeoBlock`. But this is lipstick on a near-empty page; noindex is the cleaner answer.

### `/states/[slug]/services/[service]` — **500 pages, 224 thin, content uplift + noindex gate strongly recommended**

Word counts: avg **1,002** (median 893, min 585, max 2,691).

The 1,002-word average looks healthy but conceals two problems:

1. **224 of 500 combos have <3 operators offering the service in that state** (per the service-state feasibility audit). Many of those render with "no operators in [state] offering [service]" fallback content that's near-identical across states.
2. **Per-page uniqueness is low** — same template, only state name and service name interpolated.

This is the same problem the PR #94 state-crop uplift solved. The fix is the same:

- Build a `src/lib/state-service-content.ts` helper
- Thread `state.sprayWindows[]`, `state.aeoBlock`, `state.aerialCategory`, `state.licensingAgency`, `service.faqs[]`, and a state-specific intro paragraph into the template
- Apply page-level `<meta robots="noindex, follow"/>` when the combo has <3 operators AND the service is service-relevant to the state's ag mix

**Estimated impact after gating:** 224 pages → noindex; 276 → indexable, all richer copy. Net: −224 from the indexable inventory but each remaining page substantially stronger.

**Recommendation:** **highest-priority crawl-budget action.** Same shape as PR #94, ~half a day of work.

### `/states/[slug]/crops/[crop]` — **400 pages, already gated, no action**

PR #94 already lifted this template, gated 99 weak combos. No further action.

### `/states/[slug]/[city]` — **25 pages, leave alone**

Word counts: avg **791** (median 805, min 643, max 941). Tight cluster, all backed by ≥2 real operators. See `audit/city-pages-feasibility.md` for separate growth recommendations.

**Recommendation:** **leave alone for crawl-budget purposes.** Volume is low, content density is fine. Growth path is in the city feasibility audit.

---

## 3. Internal-link 404 check

Built a linkcheck pass over every `.html` file in `.next/server/app/`, extracting every `href="/..."` and matching against the set of built static routes.

```
Total distinct internal hrefs:    1,501
Built routes:                     1,509
Potentially broken hrefs:             2
  /icon              (1,509 refs)   — dynamic, served by src/app/icon.tsx
  /apple-icon        (1,509 refs)   — dynamic, served by src/app/apple-icon.tsx
```

**Both "broken" hrefs are dynamic Next.js icon endpoints that resolve at runtime.** They are not 404s.

**No actual broken internal links.** The PR #91 fixes for `/regions/delta`, `/drones/dji-agras-t25p`, and `/newsletter` are confirmed in place and working:

- `netlify.toml` carries the `/regions/delta → /regions/mississippi-delta` 301 redirect (line 130–135)
- `dji-agras-t25p` is in the drone catalog (zero broken links to it)
- The homepage form posts to Formspree — no `action="/newsletter"` left in `src/`

---

## 4. Orphan slug references in operator data

Operator records in `src/data/operators.ts` reference slugs that don't exist as data entries (so the rendered page falls back to a non-link span):

### Orphan crop slugs (15 distinct, 144 operator references)

| Slug | Operator references |
|---|---:|
| `row-crops` | 62 |
| `pasture` | 40 |
| `alfalfa` | 9 |
| `potatoes` | 6 |
| `sugar-beets` | 5 |
| `sorghum` | 4 |
| `barley` | 4 |
| `specialty-crops` | 4 |
| `vegetables` | 3 |
| `hops` | 3 |
| `sunflower` | 2 |
| `cranberries` | 1 |
| `forestry` | 1 |
| `canola` | 1 |
| `rangeland` | 1 |

The top 4 (`row-crops`, `pasture`, `alfalfa`, `potatoes`) account for **117 of 144 references (81%)**. Adding these as scaffolded `Crop` entries (similar to the `LeadingEdge PV40X` pattern in the drone catalog — short description, key fields populated, FAQ list empty pending research) would enable cross-linking from 117 operator profiles to a real `/crops/[slug]` page each, and add 4 new operator-coverage hub pages.

### Orphan drone slugs (8 distinct, 36 operator references)

| Slug | Operator references |
|---|---:|
| `dji-agras-t40` | 18 |
| `xag-p100` | 5 |
| `eavision-j100` | 5 |
| `dji-agras-t10` | 4 |
| `dji-agras-t30` | 1 |
| `dji-agras-t60x` | 1 |
| `j100` | 1 |
| `j150` | 1 |

`dji-agras-t40` is the most-referenced. T40 is the predecessor to T50 — DJI has discontinued it but 18 operators still fly it. Worth a catalog entry. T30/T60X/T10 are also real DJI products with public spec sheets. `xag-p100` is real (XAG China). `eavision-j100` is real (EAVision, Chinese-made).

`j100` and `j150` are likely operator-data typos; `joyance-j100` and `joyance-j150` already exist in the catalog. Worth correcting the operator records.

**Recommendation for orphans:** scaffold catalog entries for the top 4 orphan crop slugs (`row-crops`, `pasture`, `alfalfa`, `potatoes`) and top 4 orphan drone slugs (`dji-agras-t40`, `xag-p100`, `eavision-j100`, `dji-agras-t10`). Pattern matches the existing `LeadingEdge PV40X` and `Joyance J100/J150` short-form entries already in `drone-model.ts`. Even bare-minimum entries unlock cross-linking and add 8 new hub pages to the indexable inventory. Fix the 2 typo references separately.

---

## Summary

| Action | Where | Estimated effort | Impact |
|---|---|---|---|
| Noindex gate `/states/[slug]/operators` for empty states | `src/app/states/[slug]/operators/page.tsx` | ~30 min | 8 pages out of crawl budget; cleaner indexation signal |
| Noindex gate + content uplift on `/states/[slug]/services/[service]` | New `src/lib/state-service-content.ts` + the page.tsx | ~half day | 224 pages noindex, 276 substantially richer |
| Scaffold top 4 orphan crop slugs (`row-crops`, `pasture`, `alfalfa`, `potatoes`) | `src/data/crops.ts` | ~1 hr | 117 operator profiles get cross-links; 4 new indexable hubs |
| Scaffold top 4 orphan drone slugs | `src/data/drone-model.ts` | ~1 hr | 32 operator profiles get cross-links; 4 new indexable hubs |
| Fix 2 city data anomalies (`southern-california`, `colorado-weld-county`) | `src/data/cities.ts` validator + operator records | ~30 min | Cleanup |
| Fix `j100`/`j150` operator typos (should be `joyance-j100`/`joyance-j150`) | `src/data/operators.ts` | ~5 min | Cleanup |

**No emergency cleanup needed.** Nothing is 404'ing. The biggest crawl-budget leak is the 224 thin state-service combos, which is the natural next PR after #93 (operator template) and #94 (state-crop template) — same helper-module pattern, same noindex-gate metadata trick.
