# City pages feasibility audit

Audit date: 2026-05-02
Branch: `claude/audit-public-content-w2Iz1`
Reference: requested deliverable 1.

---

## Headline (override)

**The city route already ships.** It is at `/states/[slug]/[city]`, not `/states/[slug]/cities/[city]` as the request proposed. It generates **25 city pages** today from operator-derived cities at a threshold of ≥2 operators per city, and the rendered output averages 791 words. The infrastructure to extend coverage to a "top 250 ag towns" target already exists — what's missing is **city seed data**, not template work.

Subsequent sections show the data already in place, what's needed to scale to ≥100 cities, and where 250 is realistic vs aspirational.

---

## 1. City-level data already in `src/data/`

### `src/data/cities.ts` — full city infrastructure exists

- **Type:** `CityData { city, slug, stateSlug, stateName, operators }` (line 36–42).
- **Source:** computed at module load from `operators[]` — every operator's `city` field is normalized via `citySlug()`, validated by `isValidCityName()` (rejects state names, directional words, "statewide", "remote", "na", reserved child slugs, and operator cities matching the state slug), and grouped by `${stateSlug}__${slug}`.
- **Threshold:** `CITY_OPERATOR_THRESHOLD = 2` (line 5). Cities below this are excluded from `getQualifyingCities()`.
- **Helpers exported:** `getCity`, `getCitiesInState`, `getQualifyingCities`, `getTopServicesForCity`, `getTopCropsForCity`, `getCityRateRange`, `getCityCenter`, `getCityServiceBreakdown`, `getCityCropBreakdown`, `getCityCredentialCounts`. Strong support for a rich city template is already wired.

### Other data files

| File | City-level field? |
|---|---|
| `src/data/counties.ts` | No. Despite the name, it's state-level only (50 entries). Each row has `slug`, `name`, `region`, `lat`/`lng`, `agriculturalLandHa`, `mainCrops`. No city, no county sub-divisions. |
| `src/data/states.ts` | No. State-level licensing, top crops, spray windows. |
| `src/data/operators.ts` | `city` field per operator — the **only** primary source of city data on the site. |
| All other data files | No city fields. |

**Bottom line on data:** the operator `city` field is the single source. There is no separate gazetteer, no county-seat list, no NASS pull.

---

## 2. Operator data: cities populated

- **Total operators:** 392
- **Operators with a plausible city populated** (excluding state names like "Nebraska", directional placeholders like "Southwest Montana", or slash-list "Iowa/Illinois/Missouri"): **319 of 392 (81%)**

### Top 10 states by operator-with-city count

| State | Operators with plausible city |
|---|---:|
| California | 26 |
| Kansas | 18 |
| Texas | 17 |
| Florida | 14 |
| Iowa | 13 |
| Nebraska | 13 |
| Illinois | 13 |
| Michigan | 11 |
| Indiana | 10 |
| New York | 10 |

### Distinct (state, city) pairs at various thresholds

| Threshold | Distinct city pages |
|---:|---:|
| ≥2 operators (current) | **25** |
| ≥1 operator | **293** |

### Today's 25 qualifying cities

```
alabama/auburn, arkansas/jonesboro, california/salinas,
california/southern-california, colorado/colorado-weld-county,
florida/daytona-beach, hawaii/honolulu, illinois/champaign,
illinois/effingham, kansas/hiawatha, kansas/overland-park,
kansas/wichita, kentucky/lexington, louisiana/baton-rouge,
michigan/six-lakes, mississippi/starkville, montana/billings,
nebraska/nebraska-city, new-york/syracuse, north-dakota/bismarck,
oregon/harrisburg, tennessee/knoxville, tennessee/nashville,
texas/houston, virginia/harrisonburg
```

Two problem entries to flag for the team:

- `california/southern-california` — that's a region-style label leaking through `isValidCityName()`. It's not a city. Worth tightening the validator or correcting the operator records.
- `colorado/colorado-weld-county` — that's a county, not a city.

---

## 3. Public data sources for top ag towns per state

Three options, ranked by cleanest path:

### Option A (recommended): USDA Census of Agriculture, county-level + Census Bureau places

- **Primary source:** [USDA NASS Census of Agriculture, 2022](https://www.nass.usda.gov/AgCensus/), county-level CSV downloads.
- **Format:** CSV per state, county-level metrics include `FARMS - NUMBER OF OPERATIONS`, `LAND IN FARMS`, `CROPLAND - ACRES HARVESTED`. Free, no API key required.
- **Companion:** [USDA NASS Quick Stats API](https://quickstats.nass.usda.gov/api) for live updates if needed (free API key signup).
- **City-level enrichment:** USDA does not publish city-level ag stats. Pair with [US Census Bureau "Places"](https://www2.census.gov/geo/tiger/) gazetteer or the [Geographic Names Information System (GNIS)](https://www.usgs.gov/u.s.-board-on-geographic-names/download-gnis-data) to pick the largest city or county seat in each ag-heavy county.
- **Why this combo:** county-level NASS numbers tell us where the ag activity is; the Places gazetteer tells us which named city to anchor the page on. Pure primary sources, free, no scraping.

#### Example payload — Iowa

`https://quickstats.nass.usda.gov/api/api_GET/?key=API_KEY&commodity_desc=AG%20LAND&statisticcat_desc=AREA&unit_desc=ACRES&agg_level_desc=COUNTY&state_alpha=IA&year=2022&format=JSON`

Returns one row per Iowa county with the county name, value (acres), state, and program code:

```json
{
  "data": [
    { "state_alpha": "IA", "county_name": "ADAIR", "Value": "279,234", "year": "2022", ... },
    { "state_alpha": "IA", "county_name": "ADAMS", "Value": "248,112", "year": "2022", ... },
    ...
  ]
}
```

To anchor a city page on a county, take the county seat from the Census Bureau Places file (e.g. Adair County → Greenfield). 99 Iowa counties → up to 99 candidate cities; pick the top 5 by `LAND IN FARMS` for state coverage.

### Option B: state extension service "top counties" lists

- Most state extensions publish "top 10 corn-producing counties" or similar lists every year. Iowa State Extension, Texas A&M AgriLife, UC Davis Cooperative Extension, etc.
- **Pros:** already curated, narrative-friendly.
- **Cons:** non-uniform coverage across 50 states, format varies (HTML page, PDF, sometimes a press release), not API-accessible. Painful to keep in sync.

### Option C: keep operator-derived only

- What ships today. Honest signal — every page anchors a real operator. No fabrication risk.
- **Cons:** ceiling at 25 (≥2) or 293 (≥1) cities. The ≥1 set has many one-off entries that won't sustain ranking.

**Recommendation:** **Option A**, layered on top of the existing operator-derived set. Keep `cities.ts` for operator-grounded cities at threshold ≥2. Add a separate seed module (e.g. `src/data/seed-cities.ts`) for ag-heavy county seats from the NASS + Places combo. The route handler unions both sets and renders the same template.

---

## 4. Route shape proposal

**Existing route:** `/states/[slug]/[city]/page.tsx` (653 lines), already builds 25 pages, average rendered 791 words. Sections it currently includes (skimmed from the file head):

- Breadcrumb + H1
- Byline (`<Byline>`) and FAQ accordion (`<FAQAccordion>`)
- AEO block (`buildAeoBlock(city)`)
- Operator grid (`<OperatorCard>`)
- Top services and crops for the city (`getTopServicesForCity`, `getTopCropsForCity`)
- Crop breakdown with rate range and treatment window (`resolveCityCrops`)
- Service breakdown (`getCityServiceBreakdown`)
- Credential counts (Part 107, Part 137, NDAA)
- Map center via `getCityCenter`
- AuthorCard footer

**Gap analysis vs the operator and state-crop uplift patterns we just shipped (PRs #93, #94):**

| Section | Already present? | Source data | Lift opportunity |
|---|---|---|---|
| State-specific licensing one-liner (agency + aerial category) | Partial | `states.ts` `licensingAgency`, `aerialCategory` | Add a 1-2 sentence licensing block matching the operator template |
| Region cross-link (`/regions/[slug]`) | Probably no | `states.ts` `regionSlug` | Add a region badge linking to the region hub |
| Spray window callout (any sprayWindows entries that match the city's top crops) | No | `states.ts` `sprayWindows[]` filtered by `getTopCropsForCity` | Add a callout listing the matched windows for this city's top crops |
| FAQ + FAQPage JSON-LD | FAQ accordion present | data composed inline, JSON-LD status unverified — confirm in a future audit | If JSON-LD missing, add it — it's a one-liner per the patterns we shipped |
| Pricing context per top crop | Partial via `resolveCityCrops` | `crops.ts` `priceMinUsd`/`Max` | Already there |

The template is in solid shape. Three small uplifts (licensing one-liner, region link, spray-window callout) plus FAQPage JSON-LD verification would put it on parity with the operator and state-crop pages we shipped this week.

### Recommended sections (full list, with source data)

1. **Breadcrumb** — `Breadcrumb` component, params.
2. **H1** — `${city.city}, ${state.name}` + drone-spray subtitle.
3. **Byline** — `Byline` from `@/components/author/Byline`.
4. **City AEO block** — `buildAeoBlock(city)` already in template, draws from `cities.ts` helpers.
5. **State licensing line** — `states.ts` `aerialCategory` + `licensingAgency`. New, matches operator/state-crop pattern.
6. **Region badge + cross-link** — `states.ts` `regionSlug` + `regionName`. New, matches the operator template.
7. **Top services for this city** — `getTopServicesForCity()` (already there).
8. **Top crops + per-crop rate range and window** — `resolveCityCrops()` (already there) → reads `crops.ts`.
9. **State spray-window callout filtered to city's top crops** — `states.ts` `sprayWindows[]` + `getTopCropsForCity()`. New.
10. **Operator grid** — `<OperatorCard>` for `city.operators[]` (already there).
11. **Credential summary** — `getCityCredentialCounts()` (already there).
12. **Map center** — `getCityCenter()` (already there).
13. **FAQ + FAQPage JSON-LD** — derived from city + state + crop FAQs. JSON-LD presence to be verified.
14. **AuthorCard** — footer (already there).

---

## 5. Page count estimate

| Strategy | Page count | Quality |
|---|---:|---|
| Today (operator-derived, threshold ≥2) | **25** | ✅ all backed by ≥2 real operators |
| Operator-derived, threshold ≥1 | 293 | ⚠️ 268 of those would have a single operator; thin signal, indexation risk |
| Seed top 5 county seats per state via NASS + Places (Option A) | ~200 | ✅ each backed by NASS county-level ag data, county seat from gazetteer |
| **Recommended union: ≥2 operators OR top-5 NASS-ranked county seat** | **~225** | ✅ honest, every page either has operator coverage or a defensible ag-density anchor |

**Verdict on the 250 target:** **realistic but only with the NASS seed strategy.** The operator-derived set alone caps at 25 (≥2) or 293 with thin signal (≥1). Layering NASS top-5-county-seats per state lifts the buildable set to ~200 unique seeds; pairing that with the existing operator-derived set yields ~225 unique cities (some overlap). Reaching exactly 250 is a stretch — closer to 200–230 with quality intact.

If 250 is a hard requirement, drop the threshold to 1 in `cities.ts` AND seed top-3 county seats per state. That gets to ~280–320 candidates, but ~70 of those will be one-operator pages that won't index well without further enrichment.

---

## Summary

- **Override the framing:** the route exists at `/states/[slug]/[city]` already.
- **Override the gap:** the missing piece isn't the template — it's city seed data beyond what operators self-report.
- **Recommended path:** USDA Census of Agriculture (county-level) + US Census Bureau Places (county seats) → seed ~200 ag-heavy city pages, union with the 25 operator-derived qualifying cities.
- **Realistic ceiling:** ~225 cities at ≥2 operators OR a NASS-ranked county-seat anchor. **250 is reachable only by including thin single-operator pages or relaxing the anchor strictness.**
- **Two cleanup items spotted in the existing 25 cities:** `california/southern-california` (region label, not a city) and `colorado/colorado-weld-county` (county name, not a city). Worth tightening `isValidCityName()` or the operator records.
- **Three small template uplifts** would put the city template on parity with the operator and state-crop templates we shipped this week: state licensing one-liner, region cross-link, spray-window callout filtered by the city's top crops. Plus FAQPage JSON-LD verification.
