# Schema audit (Deliverable 1 of 8)

Audit date: 2026-05-02
Branch: `claude/audit-public-content-w2Iz1`

## Headline

Schema coverage is **broad and clean**. Every route ships at least 2 JSON-LD blocks; the highest-traffic routes (operator, city, state-hub) ship 4. No JSON-LD parse errors found across a 1908-page sample. **One MEDIUM** — operator pages render `ProfessionalService` but skip `LocalBusiness`, dropping geo + opening-hours + priceRange Rich Results eligibility on operators with full address/lat/lng data. **Two LOW** — `WebSite` with `SearchAction` only ships on `/search` (not `/`); `AggregateRating` and `Review` schemas are zero across the site (no review data populated yet).

## Coverage table

50-page sample per route (or full population if smaller):

| Route | Population | Schema types rendered |
|---|---:|---|
| `/` (homepage) | 1 | `BreadcrumbList`, `WebPage` |
| `/operators/[slug]` | 392 | `ProfessionalService`, `FAQPage` |
| `/states/[slug]/[city]` | 216 | `BreadcrumbList`, `LocalBusiness`, `ItemList`, `FAQPage` |
| `/states/[slug]/crops/[crop]` | 600 | `FAQPage` |
| `/states/[slug]/services/[service]` | 500 | `FAQPage` |
| `/states/[slug]/operators` | 50 | (none — no JSON-LD on this list page) |
| `/states/[slug]` (state hubs) | 50 | `Article`, `FAQPage`, `BreadcrumbList`, `ItemList` (49/50) |
| `/crops/[slug]` | 12 | `FAQPage`, `BreadcrumbList`, `Article` |
| `/services/[slug]` | 10 | `Service`, `Article`, `FAQPage`, `BreadcrumbList` |
| `/drones/[slug]` | 17 | `FAQPage`, `BreadcrumbList`, `Article` |
| `/regions/[slug]` | 5 | `FAQPage`, `BreadcrumbList`, `Article` |
| `/guides/[slug]` | 4 | `Article`, `BreadcrumbList`, `FAQPage`, `HowTo` (3/4), `Dataset` (1/4) |
| `/blog/[slug]` | 10 | `Article`, `BreadcrumbList`, `FAQPage` |
| Static pages (about, contact, etc.) | 27 | `BreadcrumbList` (21/27), `FAQPage` (11/27), `WebPage` (9/27), `Article` (6/27), `Person` (2/27), `Organization` (2/27), `AboutPage`, `ContactPage`, `WebSite`, `DefinedTermSet`, `HowTo`, `CollectionPage`, `ItemList` |

## Validation

Sampled 1 page per route type and parsed every JSON-LD block. **Zero JSON parse errors across 1908 pages.** Spot-checked the `agriforce-drone` operator page, the `iowa/ames` city page, and the `agricultural-drone-spraying-statistics-2026` guide:

- All `BreadcrumbList` blocks have well-formed `itemListElement` with `position`, `name`, `item`.
- All `FAQPage` blocks have well-formed `mainEntity` with `Question` + `Answer` + `text`.
- `LocalBusiness` blocks on city pages include `@id`, `name`, `description`, `url`, `areaServed`, `address`, optional `geo`, optional `priceRange`, `publisher` referencing the Organization `@id`.
- `Article` blocks on guides/state hubs include `headline`, `description`, `url`, `mainEntityOfPage`, `datePublished`, `dateModified`, `author` ({@id} reference), `publisher` ({@id} reference).
- `ProfessionalService` on operator pages includes `@id`, `name`, `description`, `url`, `image`, `address`, `areaServed`, `priceRange`.

## Schema gaps

### Operator pages — `ProfessionalService` instead of `LocalBusiness` (MEDIUM)

The operator template emits `@type: "ProfessionalService"`. Operators with a populated `address`, `lat`, `lng`, `phone` and `priceMinUsd`/`priceMaxUsd` would qualify for `LocalBusiness` Rich Results. `ProfessionalService` is a subtype of `LocalBusiness` but Google's Local Business rich result historically requires the more specific `LocalBusiness` (or one of its named sub-types like `Plumber`, `Restaurant`). Recommend changing top-level `@type` to `["LocalBusiness", "ProfessionalService"]` or `LocalBusiness` only. ~250 operators have populated address+geo data and would gain Rich Results eligibility.

### Operator pages — no `AggregateRating` / `Review` (LOW)

The operator template has no rating or review surface. If/when Eugen ships review data (PR #97 followup mentioned this), schema can be added. Not blocking now.

### City pages — `Place` / `AdministrativeArea` (LOW)

City pages render `LocalBusiness` describing the directory's coverage of that city. They could additionally emit a `Place` with `geo` coordinates from `getCityCenter()` (averaged operator lat/lng). Adds Knowledge Graph signal for city queries. Optional.

### State-crop and state-service routes — `BreadcrumbList` and `Article` skip (MEDIUM)

These two big routes (1,100 pages combined) render only `FAQPage`. They lack `BreadcrumbList`. Pages have a visible breadcrumb in HTML but no structured-data version. Adding `BreadcrumbList` is ~10 lines per template, lifts breadcrumb display in SERP.

### State-operators (`/states/[slug]/operators`) — no schema at all (HIGH)

The 50 state-operators list pages render zero JSON-LD. They have a visible operator grid but no `ItemList` schema describing it, no `BreadcrumbList`, no `WebPage`. Adding `ItemList` listing the operators by name + url + position would lift Rich Results eligibility. (9 of 50 are noindex'd post-PR #97 anyway, so this is for the indexable 41.)

### Homepage — `WebSite` with `SearchAction` (MEDIUM)

The homepage `/` has `BreadcrumbList` + `WebPage` but no `WebSite` schema with `SearchAction`. The `SearchAction` is what enables Google to display a sitelinks search box for the brand. The static page audit shows `WebSite` is present somewhere (1 of 27 pages — likely `/glossary` or similar), but not on `/`. Adding the `WebSite` + `SearchAction` schema to the root layout would attach it to every page, with `/` as the canonical URL.

### Drones — `Product` instead of `Article` (HIGH)

Drone catalog pages (`/drones/[slug]`) render `Article` schema. They should render `Product` with `brand`, `model`, `manufacturer`, `offers` (showing MSRP), and `aggregateRating` (when reviews exist). 17 drone pages. Article-only schema misses the Product Rich Result that catalog pages typically win on.

### Tools — `SoftwareApplication` (MEDIUM)

The 6 tools (`/tools/spray-cost-calculator`, `/tools/roi-calculator`, `/tools/coverage-calculator`, `/tools/acreage-converter`, `/tools/drone-comparison`, `/tools/treatment-calendar`) — none of these surface `SoftwareApplication` schema in the static-page sample. Adding it would surface the calculator with stars/reviews/feature list in SERP.

### Guides — `HowTo` only on 3 of 4 (LOW)

3 of 4 guides have `HowTo` schema; 1 doesn't. The agricultural-drone-spraying-statistics-2026 guide has `Dataset` schema (excellent) but no `HowTo` — appropriate, it's a stats reference, not a how-to. The 4 guides are correctly tagged.

## Schema duplication

**Zero duplicate schema blocks found** across the sampled pages. Every route's JSON-LD set is distinct. No double-emitted `Organization` or `Person` blocks, no double `BreadcrumbList`.

## `@id` consistency

Verified across 5 sampled pages with author bylines:

- Organization `@id`: `https://agdronedirectory.com/#organization` — consistent across all checked pages.
- Person `@id`: `https://agdronedirectory.com/about#eugen` — consistent across all checked pages.
- Article schema on guides correctly references `author: { @id: "...about#eugen" }` and `publisher: { @id: "...#organization" }`.
- ProfessionalService on operator pages correctly references `publisher: { @id: "...#organization" }`.

## Findings

- **HIGH (2):** drones missing `Product` schema; state-operators pages have no schema at all.
- **MEDIUM (3):** operator pages should use `LocalBusiness` instead of `ProfessionalService`; state-crop and state-service routes missing `BreadcrumbList`; homepage missing `WebSite` + `SearchAction`.
- **LOW (3):** operators no `AggregateRating`/`Review`, city pages could add `Place`, tools missing `SoftwareApplication`.
- **CRITICAL: 0**

**Verdict: WARN.** Schema coverage is competitive; no blocker for indexation or Rich Results, but several high-value Rich Result types are leaving money on the table.
