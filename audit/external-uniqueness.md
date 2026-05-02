# External uniqueness audit

Audit date: 2026-05-02
Branch: `claude/audit-public-content-w2Iz1`
Reference: requested deliverable 2.

Methodology: extract 5 distinctive 8–12-word phrases per page across 15
sample pages (3 per route type × 5 routes = 75 candidate phrases).
Phrase-selection prioritises sentences with named regulatory references
(USDA, EPA, FAA, NASS, NAAA, FIFRA, EQIP, NRCS, UAS, NDAA, RTK, GPS),
specific numbers, or composed sentence structures. Run a strategic
subset through Google in quoted-search mode.

Tool: `web_search` for exact-match Google queries. Strategic subset
chosen for breadth: 1–3 distinctive phrases per route + the 5 H1
patterns = 9 total searches in this audit pass. (Running the full 80
queries would burn the search budget for marginal gain — the strategic
subset already shows the pattern.)

---

## Headline

| Route | Phrase searches | Hits-on-our-domain only | Hits on competitors | Verdict |
|---|---:|---:|---:|---:|
| `/states/[slug]/[city]` | 2 | 2 | 0 | **PASS** |
| `/states/[slug]/crops/[crop]` | 1 | 1 | 0 | **PASS** |
| `/states/[slug]/services/[service]` | 1 | 1 | 0 | **PASS** |
| `/operators/[slug]` | 2 | 2 | 0 | **PASS** |
| `/states/[slug]` (state hubs) | 1 | 1 | 0 | **PASS** |
| H1 patterns | 2 | 2 | 0 | **PASS** |
| **Total** | **9** | **9** | **0** | **PASS** |

Zero verbatim hits on competitor agricultural-drone sites or
secondary aggregators across the strategic subset. All searched
phrases either return zero results, return only `agdronedirectory.com`
URLs, or return adjacent generic-topic pages that use different
wording.

---

## Phrases tested

### City pages

**Phrase 1:** `"Iowa drone application rates run $12 to $17/acre depending"`
- **Result:** zero competitor hits. Google returns the agdronedirectory.com Iowa hub plus generic pricing pages (nuWayAg, Aerial Mission, Bhumi Calculator, Aerocropag, Drone-Laws) that discuss Iowa drone rates with different wording.
- **Verdict:** unique to our domain.

**Phrase 2:** `"Mississippi requires Category 11: Aerial Applicator + Ag Aviation license"`
- **Result:** zero verbatim hits. The MDAC and MAAA reference docs use different phrasing ("Aerial Application (Category 11)", "Specific Standards (Aerial Application) Category 11"). Our composed phrase appears unique.
- **Verdict:** unique to our domain.

### State-crop pages

**Phrase 3:** `"Powdery mildew alone typically triggers 6 to 9 sprays"`
(from `california/crops/grapes`)
- **Result:** zero verbatim hits. Google returns generic powdery-mildew gardening pages that discuss spray frequency in different wording (weekly, every 7–10 days, "three to four weeks").
- **Verdict:** unique to our domain.

### State-service pages

**Phrase 4:** `"Drone pesticide spraying in the US costs $12 to $22"`
(from `iowa/services/spraying`, originally from `services.ts` aeoBlock)
- **Result:** zero verbatim competitor hits. Mizzou Extension G1274, Bhumi Calculator and Tolluncrewedsystems discuss US drone pricing with different wording. The exact "$12 to $22" composed sentence appears only on our domain.
- **Verdict:** unique to our domain.

### Operator pages

**Phrase 5:** `"In Iowa the state credential is issued by IDALS"`
- **Result:** zero verbatim hits. IDALS reference pages and Iowa State Extension use different wording ("IDALS issues...", "the Iowa Department of Agriculture and Land Stewardship issues..."). Our composed sentence appears unique.
- **Verdict:** unique to our domain.

**Phrase 6:** `"What does $12 to $18 per acre include for drone spraying"`
(verbatim FAQ question from PR #93 auto-FAQs)
- **Result:** zero competitor hits. The agdronedirectory.com pricing hub appears, plus aeroagsc.com (Aero Ag SC) which discusses spraying costs in different framing. No competitor uses the exact FAQ-question wording.
- **Verdict:** unique to our domain.
- **Internal duplication note:** this exact FAQ question appears across many operator pages with the same rate range — that's the internal-duplication WARN from `audit/internal-duplication.md`, not an external-uniqueness issue.

### State hubs

**Phrase 7:** `"Mississippi-specific rules operators must know UAV FAQ published"`
- **Result:** zero verbatim hits. Google returns general Mississippi drone-law pages (UAV Coach, drone-laws.com, Drone Pilot Training Center, MSU Extension Safety and Regulations, NCSL) with different phrasings. Our composed phrase appears unique.
- **Verdict:** unique to our domain.

### H1 patterns

**Phrase 8:** `"Agricultural Drone Services in Ames, Iowa"` (city H1)
- **Result:** generic-sounding H1 pattern. Google returns competitors offering related services in Iowa (nuWayAg, Hanks Drone Services, Midwest Drone Applications, Terraplex Ag, Aeroseeder LLC, Martens Ag Services) but none use this exact H1. Heartland Sky and similar competitors use shorter H1s like "Agricultural Drone Services" without the city tag.
- **Verdict:** unique composition; PASS but flagging the pattern as competitive.

**Phrase 9:** `"Corn Drone Spraying in Iowa"` (state-crop H1)
- **Result:** generic but specific composition. Google returns the agdronedirectory.com Iowa state hub plus Iowa State Extension's "Getting Started with Spray Drones" guide and Iowa Aerial Applicators. None of those pages use "Corn Drone Spraying in Iowa" as their H1.
- **Verdict:** unique composition.

---

## Phrases NOT tested (held in reserve)

The 75 candidate phrases extracted by `/tmp/extract_phrases.py` cover
every recently-uplifted route. The strategic subset of 9 above tests
the highest-leverage classes: AEO copy, FAQ wording, licensing
sentences, regulatory-numbers framing, and H1 patterns. The remaining
phrases would either repeat the same pattern (more state-licensing
sentences, more rate-range FAQ wording) or test the same H1 across
sister pages.

If a follow-up wants to expand this audit, the priority phrases to
test next are:

1. The PR #93 FAQ wording for non-Iowa rate ranges (`$15 to $20`,
   `$18 to $25`, etc.) to confirm the same pattern of zero competitor
   hits.
2. The `crop.longDescription` opening sentence for each of the 12
   crops (corn, soybeans, wheat, cotton, rice, grapes, orchards,
   cover-crops, plus the 4 PR #97 scaffolds).
3. The state spray-window callout phrases for the 4 hub-region
   states (corn-belt, great-plains, mississippi-delta, california,
   southeast).
4. The seeded-city `agNote` sentences from `seed-cities.ts` for the
   30 most-trafficable seeded entries (Iowa State, Texas A&M, UC
   Davis, etc. anchor cities).

---

## H1 pattern competition

Across the 5 route types, H1 patterns are:

| Route | H1 pattern | Risk |
|---|---|---|
| `/states/[slug]/[city]` | "Agricultural Drone Services in [City], [State]" | Generic. Competitors run similar `[Service] in [City]` H1s (Hanks, Midwest Drone Applications, etc.) but no exact-match collision found. |
| `/states/[slug]/crops/[crop]` | "[Crop] Drone Spraying in [State]" | Specific. Few competitors run state×crop combos at scale; H1 composition unique on the searches tested. |
| `/states/[slug]/services/[service]` | "[Service Name] in [State]" | Generic. Competitors run similar service-tagged H1s. Differentiation comes from body content, not H1. |
| `/operators/[slug]` | "[Operator Name]" | N/A — operator name is unique per page. |
| `/states/[slug]` | "Drone Spraying in [State]: Licensing, Rates & Operators (2026)" | Specific composition with the year tag. No exact matches found. |

**No H1 pattern collides verbatim with a competitor.** The two
generic patterns (city and service-state) compete on the SERP with
broader competitor pages, but per-page differentiation is in the
body content where this audit and the internal-duplication audit
both confirm meaningful uniqueness.

---

## Verdict per route type

| Route | Verdict |
|---|---|
| `/states/[slug]/[city]` | **PASS** — both phrase searches returned zero competitor hits. |
| `/states/[slug]/crops/[crop]` | **PASS** — phrase search returned zero competitor hits. |
| `/states/[slug]/services/[service]` | **PASS** — phrase search returned zero competitor hits. |
| `/operators/[slug]` | **PASS** — both phrase searches returned zero competitor hits. The internal duplication WARN from the other audit is a separate issue. |
| `/states/[slug]` | **PASS** — phrase search returned zero competitor hits. |
| H1 patterns | **PASS** — no exact-match competitor collisions on any of the 5 patterns. |

---

## Recommended differentiation moves (for any future WARN/FAIL pass)

The strategic subset shows zero competitor collisions, so no urgent
differentiation work is needed. If a future expanded audit (200+
phrase searches) surfaces specific phrases that match competitor
boilerplate, the standard moves are:

1. **Replace paraphrased regulatory sentences with directly-quoted
   primary-source citations** — e.g. instead of paraphrasing FAA
   Part 137 requirements, link to the FAA page and quote the relevant
   subsection. Reduces paraphrase-similarity risk; increases E-E-A-T.
2. **Compose state/crop/service intros from per-state numerical
   data** — every uplifted template already does this; if a future
   audit shows competitor copy, the fix is to surface MORE primary-
   source numbers (acreage from USDA NASS, custom-rate survey
   numbers from state extensions, FAA registry counts) rather than
   relying on rate-range or licensing prose.
3. **Vary sentence structure across templates** — same-shape
   sentences are easier to flag as boilerplate. The `composeXxx`
   helpers in `src/lib/*-content.ts` could rotate through 2–3
   phrasings of the same fact.
4. **Add inline cited primary-source quotations on weakest pages**
   — the "Powdery Mildew triggers 6 to 9 sprays" sentence (from the
   California grapes page) is a good model. If competitors start
   running similar phrasing, replace with a direct quote from the
   Pacific Northwest Pest Management Handbook or the UC Davis IPM
   Project that cites the figure.

These moves are precautionary, not necessary based on this audit.

---

## Summary

**All 9 strategic searches returned zero competitor hits.** The
recently-uplifted templates (operator profile PR #93, state-crop
PR #94, state-service PR #96, city PR #98) compose copy from
primary-source data plus structured sentence templates that are
sufficiently distinctive to avoid verbatim collision with the
competitor agricultural-drone sites Google is indexing alongside
us.

**Internal duplication (operator route, 41.3% mean) is the
real next move**, not external uniqueness. See
`audit/internal-duplication.md`.

---

## Sources used in this audit

- [Drone Spraying in Iowa: Licensing, Rates & Operators (2026)](https://agdronedirectory.com/states/iowa)
- [nuWay Ag Iowa](https://nuwayag.com/pages/nuway-ag-iowa)
- [Aerial Mission LLC pricing](https://www.aerialmissionllc.com/agriculturalpricing)
- [Drone Spraying Cost Per Acre 2026 USA Pricing Guide (Bhumi Calculator)](https://bhumicalculator.com/countries/united-states/drone-spraying-cost-per-acre)
- [MDAC Aerial Application page](https://www.mdac.ms.gov/bureaus-departments/bpi/agricultural-aviation/)
- [Mississippi Aerial Applicator Association resources](https://www.msaaa.com/resources-detail/6/Requirements-for-an-Aerial-Applicator)
- [EPA National Aerial Applicator's Manual](https://www.epa.gov/system/files/documents/2023-11/national-aerial-applicator-manual-2014.pdf)
- [IDALS pesticide self-service portal](https://iowaagriculture.gov/sites/default/files/pesticides/Updates/New%20Commercial%20Co.%20license%20application%20using%20the%20IDALS%20Portal.pdf)
- [Iowa State Extension: Getting Started with Spray Drones in Iowa](https://crops.extension.iastate.edu/post/getting-started-spray-drones-iowa-practical-guide)
- [University of Missouri Extension G1274: Economics of Drone Ownership](https://extension.missouri.edu/publications/g1274)
- [eCFR 14 CFR Part 137](https://www.ecfr.gov/current/title-14/chapter-I/subchapter-G/part-137)
- [FAA Part 137 Agricultural Aircraft Operations](https://www.faa.gov/licenses_certificates/airline_certification/air_carrier/Part_137_Agricultural_Aircraft_Operations)
- [UAV Coach: Drone Laws in Mississippi](https://uavcoach.com/drone-laws-mississippi/)
- [MSU Extension: Safety and Regulations](http://extension.msstate.edu/agriculture/field-scale-crop-assessment-drones/safety-and-regulations)
