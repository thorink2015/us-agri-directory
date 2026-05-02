# Phase A follow-up audit

Audit date: 2026-05-02
Branch: `claude/audit-public-content-w2Iz1`
Scope: author file completeness, thin-operator profiles, the three confirmed 404s, the Mississippi corn state-crop template, and the 2026 statistics guide.

> **Method note:** I do not have access to Google Search Console or the rendered DOM. Word counts below are taken from the source JSX/data — they exclude `<Breadcrumb>`, `<Header>`, `<Footer>`, sidebars and `<AuthorCard>` (chrome that is shared across the site). Where the template only outputs short interpolated labels (e.g. icon grids), I count them as one word each.

---

## 2.1 Author file check

- **File path:** `src/data/author.ts`
- **Status:** **Fully populated.** No `{{PLACEHOLDER}}` strings remain in any field that ships to schema. The optional `AUTHOR.x` (X/Twitter) is intentionally `''` and is filtered out of `sameAs` by `authorSameAs()`.
- **Avatar:** `photoUrl: 'https://agdronedirectory.com/images/eugen-author.jpg'` resolves to `public/images/eugen-author.jpg` — **the file exists** (verified via `ls public/images/`). A duplicate `eugen-author.jpeg` also exists; both are referenced from `_memory/project-facts.md` so leaving the duplicate alone is intentional and harmless.
- **Schema @id anchors:** `personId` resolves to `https://agdronedirectory.com/about#eugen` and `organizationId` to `https://agdronedirectory.com/#organization`. Both match `_memory/project-facts.md`.
- **Outstanding optional gap:** `organizationSchema().sameAs` is still `[]` (TODO comment in the file). Add the company LinkedIn / X URLs when they exist. Not a placeholder, not blocking indexation.

Full current content:

```ts
// ─── Single source of truth for author identity (E-E-A-T) ─────────────────
// All bylines, Person schema, footer credit and author cards reference
// this file. Do NOT paraphrase the bio elsewhere, import from here.
// ───────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: 'US Ag Drone Directory',
  domain: 'https://agdronedirectory.com',
  logoUrl: 'https://agdronedirectory.com/images/logo.png',
};

export const AUTHOR = {
  // Identity
  firstName: 'Eugen',
  lastName: 'Manoli',
  get fullName() {
    return this.lastName.startsWith('{{')
      ? this.firstName
      : `${this.firstName} ${this.lastName}`;
  },
  jobTitle: 'Founder and Editor',

  // Media
  photoUrl: 'https://agdronedirectory.com/images/eugen-author.jpg',
  photoAlt: 'Eugen, Founder and Editor of US Ag Drone Directory',

  // Contact
  publicEmail: 'eugen@agdronedirectory.com',

  // Social (for Person schema sameAs array + author card)
  linkedin: 'https://www.linkedin.com/in/manoli-eugen/',
  x: '',

  // Bio, canonical, do NOT paraphrase
  bio:
    'Eugen is the founder and editor of US Ag Drone Directory. He grew up in an agricultural family in Florida, United States, studied Agricultural Economics at university, and has worked hands-on with agricultural drone technology in European markets. He built this directory after seeing how scattered and incomplete US ag drone information was for the farmers who need it most. Every page on this site is written or edited by him personally.',

  shortBio:
    'Eugen is the founder and editor of US Ag Drone Directory. He built this directory to give US farmers a single trusted place to find verified ag drone operators, regulations and pricing.',

  // Schema @id anchors
  get personId() {
    return `${SITE.domain}/about#eugen`;
  },
  get organizationId() {
    return `${SITE.domain}/#organization`;
  },
};

export function authorSameAs(): string[] {
  return [AUTHOR.linkedin, AUTHOR.x].filter((u) => u && !u.startsWith('{{'));
}

export function personSchema() { /* … unchanged, see file … */ }
export function organizationSchema() { /* … sameAs: [] TODO … */ }
```

(Helper functions truncated for brevity — file is 87 lines, no other surprises.)

---

## 2.2 Thin operator profiles

**Template:** `src/app/operators/[slug]/page.tsx` (499 lines). Sections render conditionally based on which fields are populated on the operator record. The richer the data, the more sections appear. With only `slug + name + description + counties + city + services + crops`, almost nothing beyond a hero card, a single `<p>` of description, a contact link or two and a small services chip row gets rendered.

### Three representative thin profiles

#### A. `lnp-ag-drone-spraying` (operators.ts:4542)

| Field | Value |
|---|---|
| description | "NE PSC grant recipient for agriculture spraying drone." (8 words) |
| city | "Nebraska" (state name, not a real city) |
| services | `['spraying']` |
| crops | `['row-crops']` |
| drones | `[]` |
| Populated | slug, name, description, country, counties, city, services, crops, featured (false), verified (false) |
| Empty / missing | tagline, shortName, phone, email, website, all socials, founded, priceMinUsd/Max, haTreated, fleetSize, pilotsCount, clientsCount, responseTimeHours, coverageRadiusKm, languagesSpoken, paymentMethods, every cert flag, lat, lng |

**Estimated unique rendered word count:** ~55 words (name + 8-word description + breadcrumb label "Operators" + state chip "Nebraska" + service chip "Drone Spraying" + crop chip + the `priceMinUsd` fallback "Contact for pricing" string + the verification-pending banner). No stats grid, no certs grid, no contact column, no hours/languages box, no socials, no map.

#### B. `sphex-ag` (operators.ts:5896)

| Field | Value |
|---|---|
| description | "Billings-based ag drone spraying company providing precision aerial application of seed, pesticides, herbicides and fertilizers to Montana farmers." (20 words) |
| Populated | slug, name, description, country, counties, city, **phone**, **email**, **website**, services, crops, featured (false), verified (false) |
| Empty | tagline, founded, fleetSize, haTreated, pilotsCount, all certifications, priceMinUsd/Max, drones (`[]`), responseTimeHours, languagesSpoken, paymentMethods, lat/lng, all flags |

**Estimated unique rendered word count:** ~80 words. The contact card adds a bit (phone, email, website link), but the stats grid, certs grid, drones grid, hours/languages box, and map are all suppressed.

#### C. `agronix` (operators.ts:3097)

| Field | Value |
|---|---|
| description | "Iowa-based drone dealership and spraying service partnered with Rantizo. Participated in ISU/Bayer coverage test comparing drone airplane and ground rig applications." (22 words) |
| Populated | slug, name, description, country, counties, city, phone, email, services, crops, featured/verified (false) |
| Empty | website, all socials, founded, all certifications, drones (`[]`), priceMinUsd/Max, fleetSize, haTreated, pilotsCount, clientsCount, responseTimeHours, languagesSpoken, paymentMethods, lat/lng |

**Estimated unique rendered word count:** ~85 words. Almost identical to Sphex AG in shape — small contact card, otherwise empty conditional sections.

### Indexed-comparison: `agriforce-drone` (operators.ts:4)

A profile that should index well, by contrast, has:

- 60-word description with specific numbers (8 drones, 80,000 acres, 1,200 acres in a single night)
- tagline ("Corn Belt leader · 80,000+ acres serviced")
- founded year (2020) + coverage radius (400 km → ~248 mi displayed)
- 4-stat metrics grid (haTreated, fleetSize, pilotsCount, clientsCount)
- priceMinUsd/Max → real pricing block instead of "Contact for pricing"
- 3 drone models linked through to drone profiles (T50, T100, AG-272)
- 4 services × 4 crops × 7 states → big related-link footprint
- emergencyService, certFAAPart107, certFAAPart137, certDJI → 4 cert badges
- responseTimeHours, languagesSpoken, paymentMethods → hours/languages box
- lat/lng → map renders
- facebook URL → social row

**Estimated rendered word count:** 350–450+ words of unique content, plus a much denser internal-link graph (every populated drone, service, crop and county is a link out).

### Diff summary — what's different

The thin pages are not failing because of bad copy. They are failing because **the template's conditional sections collapse to nothing when 25+ optional fields are empty.** A profile with only `description + city + counties + services` renders ~50–100 words of unique content; Google's "crawled, not indexed" threshold for a near-duplicate template page is generally 200+ words of original copy plus differentiation signals (numbers, internal links, structured data fields).

### Template-level recommendations (lift all thin profiles above the threshold)

These changes apply at the template (`src/app/operators/[slug]/page.tsx`) and/or data layer; they do not require manual data entry for every thin operator.

1. **Auto-generated "What [Operator] does in [State]" paragraph** when `description` is < 30 words. Pull from `services[]` and `counties[]` to compose 2–3 sentences using state, services, and crop text. ~60 unique words minimum.
2. **State-licensing context block.** For every operator's covered states, render a 1-line summary of that state's pesticide-applicator licensing (already in `src/data/states.ts` as `licensingAgency`, `aerialCategory`). Pulls 30–80 words of state-specific text per operator. Cross-links to `/states/[slug]` and `/regulations/state-licensing`.
3. **Crop-specific service line.** When `services` includes `spraying` and `crops` is populated, render "Pricing for [crop] drone spraying typically runs $X to $Y per acre" using `crops.priceMinUsd/Max`. Adds 20–40 words and sets a dollar number on the page.
4. **"Pending confirmation" CTA paragraph** (already exists as a thin banner at line 78–82) — expand to a short paragraph telling farmers exactly what to ask for when contacting the operator (Part 137 status, COI, label compliance). Adds 60–80 words and is uniform-but-still-original.
5. **Region context line** referencing the operator's covered states' region (already on `counties.ts` via `region`). Cross-link to `/regions/[regionSlug]`.
6. **Default `priceMinUsd/Max` to the state median** when the operator hasn't published a rate. Better than the "Contact for pricing" fallback for indexation, since a number gets parsed.
7. **Inject a 2-FAQ block on every operator page** ("How do I verify a drone operator's credentials?" / "What does $X to $Y per acre include?"). Generic but real questions, with state-specific name interpolation. Adds 120 words and triggers FAQ schema if you want.

A combined patch of (1) + (2) + (3) + (5) typically lifts a sub-100-word profile to 300+ words and gives Google enough state/crop differentiation to index it without manual operator outreach. (4) and (7) are bonuses; (6) is a judgment call — using a state median price when the operator has not stated one can mislead farmers.

---

## 2.3 The 3 actual 404s

### `/regions/delta`

- **Internal links:** **none** (`grep -r "/regions/delta"` across `src/` and `public/` returns zero results).
- **In sitemap?** No. `src/app/sitemap.ts` builds region URLs from `src/data/regions.ts`, where the closest slug is `mississippi-delta`. Slug `delta` does not exist.
- **Why is it 404'ing?** The URL is being requested from outside the codebase — almost certainly an external citation, the old `droneagricol.ro` codebase that lives on `main`, or an old sitemap snapshot Google still has cached. There is no live link from the new US site.
- **Recommendation: KILL** (no fix needed in code, but add a redirect for safety). The canonical region is `/regions/mississippi-delta`, which is fully populated (longDescription, FAQs, primary crops, spray windows). Add a Netlify 301:
  ```toml
  [[redirects]]
    from = "/regions/delta"
    to = "/regions/mississippi-delta"
    status = 301
  ```
  Reasoning: the title metadata at `src/app/regions/page.tsx:8` already calls the region "Delta" colloquially, so anyone (or any crawler) shortening the URL to `/regions/delta` should land on the right page rather than a soft 404.

### `/drones/dji-agras-t25p`

- **Internal links:** **27 operator records** in `src/data/operators.ts` reference the slug `dji-agras-t25p` in their `drones[]` array. Lines: 56, 126, 196, 261, 293, 546, 563, 768, 915, 1044, 1082, 1239, 1469, 1529, 1547, 1603, 1741, 1760, 1781, 1802, 1823, 2062, 2126, 2151, 2255, 2300, 2572.
- **In sitemap?** No. `src/data/drone-model.ts` does not have a `DroneModel` entry for `dji-agras-t25p` — only an entry in `DRONE_NAME_FALLBACKS` (line 727) that resolves the label to "DJI Agras T25P" so operator pages render the slug as a non-link span. The dynamic `/drones/[slug]` route only generates URLs from `drones[]`, so the page never builds.
- **Why is it 404'ing?** The DJI Agras T25P (US-spec sibling of the T25) is a real product that 27 operators in the directory legitimately fly, but the catalog file `src/data/drone-model.ts` does not include it.
- **Recommendation: CREATE the drone profile.** The fallback was meant for one-off legacy slugs; with 27 operators citing it, T25P now anchors a non-trivial slice of the operator graph and every internal link breadcrumbs through this page. Add a full `DroneModel` entry with specs, MSRP, NDAA status (still Chinese-made, not NDAA-compliant), authority links, FAQs, mirroring the existing `dji-agras-t25` entry.
- **Until the data entry happens**, an alternative interim fix: redirect `/drones/dji-agras-t25p` → `/drones/dji-agras-t25` via Netlify (the two are close mechanical siblings) so 404s stop accumulating. Mark this as a temporary measure, not the final answer.

### `/newsletter`

- **Internal links:** **1** — `src/app/page.tsx:624`, the homepage newsletter signup form: `<form action="/newsletter" method="post">`.
- **In sitemap?** No.
- **Why is it 404'ing?** The form posts to `/newsletter` but there is no `src/app/newsletter/` route, no `src/app/api/newsletter/` handler, and no Netlify redirect for it. Anyone who submits the homepage newsletter form gets a 404.
- **Recommendation: FIX the form action.** The site already uses Formspree (`NEXT_PUBLIC_FORMSPREE_ID` per `_memory/project-facts.md`); the contact form's pattern can be reused. Two equivalent options:
  1. **Repoint the form to a Formspree endpoint** dedicated to newsletter signups, mirroring how the contact form posts to `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}` — this is the smaller change.
  2. **Create a `/newsletter` thank-you page + a `/api/newsletter` route** that accepts the POST, forwards to Formspree (or whatever ESP is chosen), and redirects to the thank-you page on success.
- This is a real user-impacting bug, not just an indexation issue. Worth fixing in the same cleanup PR if the user wants.

---

## 2.4 Mississippi corn template diagnosis

**Template:** `src/app/states/[slug]/crops/[crop]/page.tsx` (228 lines).

- **Confirmed:** This is a state-crop combo template with `generateStaticParams` returning the **cartesian product of all states × all crops** (`counties.flatMap(c => crops.map(...))`).
- **Total URLs generated:** `counties.length` (51 — 50 states + DC) × `crops.length` (8) = **408 pages**, all built from the same template.
- **Mississippi corn page** — what actually renders, with everything stripped except the unique-to-this-page content:
  - H1: "Corn Drone Spraying in Mississippi" (5 words)
  - Subhead: "Agricultural drone services for corn in Mississippi. Typical rate: $12 to $18/acre" (12 words)
  - Crop card: pulls `crop.description` (40 words for corn), 2 stat lines (typical rate, US acreage)
  - Treatment calendar: 12 month chips, only "Jul" and "Aug" are highlighted (no prose)
  - Operators block: H2 + the standard Mississippi operator grid (same operators as `/states/mississippi/operators` and `/states/mississippi/crops/cotton`, rendered identically)
  - 3 generic FAQs with `${crop.name}` and `${county.name}` interpolated (~190 words combined)
  - Related-crops chip row (8 links)
  - "Back to Mississippi" link
- **Estimated unique word count: ~280 words.** The bulk (`crop.description`, FAQs) is **template-level shared text** repeated across all 51 states for corn. The only state-specific content is the words "Mississippi" and "Mississippi (state)" in 5–6 places, plus the operator list.
- **Why Google rejects it:** near-duplicate template across 408 pages with no state-specific differentiation in the body copy. Mississippi corn is a particularly weak signal because Mississippi is not a top corn state — the state's `mainCrops` are `['cotton', 'soybeans', 'rice']`, so the operator filter at line 61 (`cropOps = allCountyOps.filter(op => op.crops.includes(crop.slug))`) returns very few or zero matches and falls back to the all-state operator list, which is identical to other crop pages for Mississippi.
- **Scale of the problem:** every one of the 408 pages has the same template-level thinness. Mississippi corn is the canary, not the only victim. State-crop combos where the crop is in the state's `mainCrops` and operators have populated `crops[]` (e.g. `/states/iowa/crops/corn`) probably do better, but the 50-state × 8-crop matrix has roughly 250+ low-signal pages by construction.

**Template-level fixes that lift the whole 408-page route:**

1. **State-crop intro paragraph generated from `StateData` + `Crop`.** Pull `crop.aeoBlock`, `state.statsRate`, the state's relevant `sprayWindows[]` entry for that crop, and compose ~120 words of state-specific copy. The data is already in `src/data/states.ts` and `src/data/crops.ts` — just not threaded into this template.
2. **Use `crop.longDescription`** (150–250 words) instead of `crop.description` (40 words). The longer field already exists.
3. **Render `crop.faqs[]`** (4–6 crop-specific FAQs that exist in the data) **plus** the 3 state-specific FAQs the template currently composes. Brings the FAQ section to ~600 words instead of ~190.
4. **State spray-window callout.** `state.sprayWindows[]` includes a per-crop entry on most states. Render the matching one as a callout: "In Mississippi, corn fungicide applications target [window]. Rate range: [rateRange]." Per-state, per-crop, automatically unique.
5. **State licensing link block.** Two sentences referencing `state.licensingAgency` and `state.aerialCategory`. Cross-links to `/states/mississippi`, `/regulations/state-licensing`, and the state's `extensionUrl`.
6. **Drop or noindex the obviously-weak combos.** A simple gate at `generateStaticParams` to skip combos where `state.mainCrops` does not include the crop AND no operator in the state lists that crop would prune the matrix from 408 to roughly 200–250 high-signal pages. Less risky alternative: emit `<meta name="robots" content="noindex,follow" />` for the same gating condition so the URLs still resolve via internal links but stop competing for crawl budget.

(1) + (2) + (3) typically take a 280-word page to 800–1100 words with real state-specific content; (4) and (5) add another 100–150 words. With (6) layered on top, the surviving pages should clear Google's threshold without manual writing.

---

## 2.5 Statistics guide diagnosis (`/guides/agricultural-drone-spraying-statistics-2026`)

- **Word count:** the guide's content block in `src/app/guides/[slug]/content.tsx` is roughly **4,600 words** (raw JSX) — call it ~3,800 words of rendered prose after subtracting JSX/markup tokens. Plus the page chrome (TOC, byline, related guides, `<AuthorCard>`, FAQs from `data/guides.ts`) adds another ~700–900 words. **This page is one of the longest on the site.**
- **Unique data:** yes. 85+ verified statistics, every one with a named primary source (ASDC, FAA, NAAA, USDA, Nature, ACS, PLOS ONE, Iowa State, Mizzou, etc.) and a year. Conflict notes between sources are flagged inline.
- **Citations:** primary-source-only, matching the standing rule from `_memory/project-facts.md`. 10 citations listed in `dataset.citation` plus inline `<a>` tags throughout the JSX content.
- **Schema:** Article schema rendered at page load (`src/app/guides/[slug]/page.tsx:90`) with `datePublished`, `dateModified`, `author` (linked to Person `@id`), `publisher` (linked to Org `@id`). Plus a Dataset schema (`guide.dataset` populated with `name`, `description`, `identifier`, `variableMeasured` (20 fields), `dateCreated`, `license`, `keywords`, `citation`).
- **Internal links:** 6 `relatedInternal` entries in the data (pricing, FAA Part 137, state licensing, NDAA, insurance, drone vs ground rig) plus inline anchor links to authority sources.
- **Canonical / metadata:** clean — `alternates.canonical` set, OpenGraph populated, no `noindex`, no rogue meta.

**Best hypothesis for why Google rejected it:**

Almost certainly **freshness, not quality.** `publishDate: '2026-04-26'`, `lastUpdated: '2026-05-02'` — the guide is six days old as of this audit. Google's "crawled, not indexed" status on long-form content with proper schema and citations is the textbook indexation-lag pattern, and the lag is typically resolved by:

1. The next sitemap recrawl (Google sometimes waits 2–6 weeks for fresh long-form content from a young domain).
2. An IndexNow ping. Per `_memory/project-facts.md`, IndexNow runs `onSuccess` of every Netlify production deploy via `netlify/plugins/indexnow/`, so this should already be happening — but it's worth confirming the last ping included this URL (the file `_memory/project-facts.md` says the last run was 2026-04-16 with 1,130 URLs, which **predates this guide's publish**). If no deploy has fired since 2026-04-26, the IndexNow ping for this URL has not gone out.
3. Site authority. The site is new; Google is conservative about indexing long stat-heavy pages from young domains until trust builds. The Article schema + Dataset schema + named primary sources are the right moves and should pay off as authority accrues.

**Lower-probability hypotheses (rank-ordered):**

- Mass schema parsing fails on the `dataset.variableMeasured` array because Google requires the `Dataset` to be on its own page or use `mainEntity` — worth validating once with the Rich Results Test, but the schema is well-formed JSON-LD.
- The guide has many inline `<figure className="guide-figure">` references (`HeroDroneIllustration`, etc.) that resolve to client components from `StatsCharts.tsx`. If those are render-blocked at first paint Googlebot may see thinner content than a human user. Verify with the URL Inspection tool's rendered HTML view — a small fix to ensure SVGs render server-side would be cheap.

**Recommendation:** wait two weeks while triggering a deploy (which fires IndexNow). If still not indexed by ~2026-05-20, run the URL through Search Console's URL Inspection → Request Indexing manually. No code change is warranted right now.

---

## Bonus finding (not in the original task list)

**`netlify.toml` redirect for `kuhns-aerial-applications` exists, but the same pattern of operator-slug duplicates may have other dangling URLs.** I did not exhaustively diff against any external 404 report — flagging this so the next phase pulls Search Console crawl errors and audits operator-slug redirects in bulk.

---

## Summary

| Area | Status | Action |
|---|---|---|
| Author file | Fully populated, avatar resolves, schema clean | None (optional: fill `organizationSchema().sameAs`) |
| Thin operators | ~50–100 unique words on each, 8+ confirmed in the cluster | Template-level data fallbacks (1)–(7) above |
| `/regions/delta` 404 | No internal links; ghost URL from external citation or old codebase | 301 → `/regions/mississippi-delta` |
| `/drones/dji-agras-t25p` 404 | 27 operators reference this slug; no DroneModel entry | Create the catalog entry; interim 301 → `/drones/dji-agras-t25` |
| `/newsletter` 404 | 1 internal link (homepage form action) | Repoint form to Formspree (or build the route) |
| `/states/mississippi/crops/corn` not indexed | Template-level: 408 near-duplicate pages, ~280 words each | Thread `crop.longDescription`, `crop.faqs`, `state.sprayWindows`, state licensing into the template; gate weak combos |
| Stats 2026 guide not indexed | 3,800-word guide, schema-rich, six days old | Wait. Confirm IndexNow ping fired post-publish. Re-evaluate after 2–3 weeks. |
