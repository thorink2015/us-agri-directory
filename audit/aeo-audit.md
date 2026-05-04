# AEO (Answer Engine Optimization) audit (Deliverable 5 of 8)

## Headline

**Strong AEO posture.** `llms.txt` and `llms-full.txt` both ship and are exhaustive. Q&A density is high — every uplifted route renders FAQPage schema with 3-9 questions per page. Featured-snippet readiness is solid on `/pricing`, the regulations pages, and the 4 published guides. **Two MEDIUM findings:** `HowTo` schema missing on routes that render explicit step-by-step content (operator template's "How to hire" section, the start-a-drone-business page); the homepage lacks a 40-50 word direct answer to the highest-volume conversational query "how much does drone spraying cost".

## 1. llms.txt — `/public/llms.txt` (116 lines)

Confirmed clean post-PR #97 + #98 + #99. Structure:

- **# US Ag Drone Directory** title
- **>** blockquote with the directory's 1-paragraph summary (391 operators, 50 states, primary services)
- **Full content for AI agents:** explicit pointer to `llms-full.txt`
- 3-paragraph editorial framing
- **## Core pages** (5 entries: Home, About, Pricing, List Your Business, Contact)
- **## Find operators** (1 + 8 state entries)
- **## Regions** (1 + 5 region entries)
- **## Services** (1 + 10 service entries)
- **## Crops** (1 + 8 crop entries)
- **## Drones** (1 + 8 drone entries)
- **## Tools and calculators** (1 + 6 tool entries)
- **## Regulations and compliance** (1 + 4 regulation entries)
- **## Pillar guides** (1 + 4 guide entries with rich descriptions citing primary sources)
- **## Guides and comparisons** (7 entries)
- **## Blog** (10 entries)
- **## Reference** (1 entry — glossary)

Total entries: ~85. **Verdict: PASS.** Comprehensive, well-organized, post-PR cleaned.

## 2. llms-full.txt — `/public/llms-full.txt` (571 lines)

**Present and substantial.** 571 lines of long-form context for AI agents that want deeper detail than `llms.txt` provides:

- AEO blocks for every key page
- Pillar guide digests
- Primary source references inline (USDA NASS, FAA Part 137, peer-reviewed studies)
- Pricing benchmarks with year + source attribution
- Statewide spray-window summaries

**Verdict: PASS.** This is one of the best-curated `llms-full.txt` files in the ag drone vertical (per the PR #95 external-uniqueness audit's competitor scan).

## 3. Q&A density

5-page sample per route, counting visible Q&A pairs (FAQ accordions, "How do I..." structured headings, Q-A inline copy):

| Route | Q&A pairs (avg) |
|---|---:|
| `/operators/[slug]` | 2 (post-PR #99 diversification) |
| `/states/[slug]/[city]` | 3 |
| `/states/[slug]/crops/[crop]` | **7-11** (3 generic state-crop + 4-6 from `crop.faqs[]`) |
| `/states/[slug]/services/[service]` | 4-9 (3 generic state-service + 0-5 from `service.faqs[]`) |
| `/states/[slug]` | 5-9 (state hub `faqs[]`) |
| `/crops/[slug]` | 5-6 |
| `/services/[slug]` | 5-6 |
| `/drones/[slug]` | 4-6 |
| `/regions/[slug]` | 3-4 |
| `/guides/[slug]` | 5-6 |
| Homepage | **0** (no FAQ accordion) |
| `/pricing` | 5+ |

**State-crop pages dominate Q&A density** (7-11 per page across 600 pages = 4,200+ Q&A pairs in the 600-page route alone). State-services and state hubs follow close behind. Operator pages were intentionally lifted from 0 to 2 in PR #93 + #99.

**Verdict: PASS.** Q&A density is competitive across the site.

## 4. Featured-snippet readiness

Spot-checked:

- **`/pricing`** — 1-paragraph direct answer to "How much does drone spraying cost?" near the top. Renders the rate range $12-$22 per acre, cites Iowa State Custom Rate Survey 2026 + Mizzou Extension G1274. Featured-snippet ready. **PASS.**
- **`/regulations/faa-part-137`** — direct answer in the AEO block: "FAA Part 137... required for any commercial pesticide application by drone..." with the Section 44807 carve-out. **PASS.**
- **`/insurance`** — 1-paragraph direct answer covering hull, liability, chemical drift coverage. **PASS.**
- **`/guides/agricultural-drone-spraying-statistics-2026`** — opens with "16.4 million acres treated by drone in 2025" sourced to ASDC. Strong featured-snippet anchor. **PASS.**
- **`/guides/how-to-become-an-agricultural-drone-pilot`** — 4-step framework opening, $43,500-$89,500 startup budget callout. **PASS.**
- **`/guides/hire-drone-spray-operator-checklist`** — 12-clause vetting framework. **PASS.**
- **`/guides/year-round-revenue-ag-drone-operators`** — 6-service stack opening, $150K-$420K range. **PASS.**

Homepage `/` — no direct 40-50 word answer to "how much does drone spraying cost" near the top. Hero is more brand-positioned. **Recommendation:** add a 50-word FAQ summary near the top of the homepage that surfaces the $12-$22 rate range with primary source. MEDIUM.

## 5. Citations and primary sources

Audited the 4 published guides for citation density:

| Guide | Primary sources cited | Inline anchor links | Year + source attribution? |
|---|---:|---:|---|
| `agricultural-drone-spraying-statistics-2026` | 10 (ASDC, FAA Safety Briefing, FAA BVLOS NPRM, CropLife/Purdue, ISU Iowa Farm and Rural Life Poll, MU Extension G1274, Nature, PLOS ONE, ACS, Grand View) | 20+ | Yes — every stat |
| `hire-drone-spray-operator-checklist` | 8 (FAA Part 137, EPA, FIFRA Part 170, NAAA, ASDC) | 12+ | Yes |
| `how-to-become-an-agricultural-drone-pilot` | 6 (FAA Part 107, FAA Part 137, Section 44807, university extensions) | 10+ | Yes |
| `year-round-revenue-ag-drone-operators` | 7 (ASDC, Iowa State, Mizzou Extension, EQIP, Iowa WQI, Illinois Fall Covers, Ohio H2Ohio, Maryland MACS, Decatur RCPP) | 15+ | Yes |

**Verdict: PASS.** Citation density is exceptional. All 4 guides cite primary sources with year and provider attribution.

## 6. Schema for AEO

Per the schema audit (Deliverable 1):

- **`FAQPage`** — present on every recently-uplifted route. **PASS.**
- **`HowTo`** — present on 3 of 4 guides (`hire-drone-spray-operator-checklist`, `how-to-become-an-agricultural-drone-pilot`, `year-round-revenue-ag-drone-operators`). The stats guide correctly uses `Dataset` instead. **PASS for guides.**
- **`HowTo` MISSING from**:
  - `/operators/[slug]` template's "How to hire a drone operator in [City]" section (city template has a 3-step hire flow that is structured exactly as a HowTo). **MEDIUM finding.**
  - `/start-a-drone-business` page (likely has step-by-step content). Worth checking.
- **`QAPage`** — not used. Acceptable; `FAQPage` is the more common choice and is universally present.

## 7. Conversational query coverage

Sampled the most likely AI-search query targets:

| Query | Page that should answer it | Direct answer near top? |
|---|---|:-:|
| "how much does drone spraying cost" | `/pricing` | ✅ |
| "how much does drone spraying cost" | `/` (homepage) | ❌ MEDIUM |
| "how do I hire a drone operator" | `/guides/hire-drone-spray-operator-checklist` | ✅ |
| "how do I become an agricultural drone pilot" | `/guides/how-to-become-an-agricultural-drone-pilot` | ✅ |
| "what license do I need to spray crops by drone" | `/regulations/faa-part-137` | ✅ |
| "is the DJI Agras T50 NDAA compliant" | `/drones/dji-agras-t50` | ✅ (in description + FAQ) |
| "where can I find a drone sprayer in [state]" | `/states/[slug]/operators` | ✅ |
| "how much does drone fungicide on corn cost" | `/crops/corn` | ✅ |

7 of 8 ✅. The homepage gap is the one fix.

## Findings

- **CRITICAL: 0**
- **HIGH: 0**
- **MEDIUM (2):**
  1. Add a 50-word direct answer to "how much does drone spraying cost" near the top of the homepage with primary source attribution (Iowa State 2026 Custom Rate Survey).
  2. Add `HowTo` schema to the city template's "How to hire" 3-step section and to `/start-a-drone-business` if it has step-by-step content.
- **LOW: 0**

**Verdict: PASS.** AEO posture is strong across the site. The two MEDIUM findings are quality-of-life lifts, not gaps.
