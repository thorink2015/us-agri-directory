# Romanian Content Audit

Audit date: 2026-05-02
Branch: `claude/audit-public-content-w2Iz1`
Scope: public-facing files and configs in the US Ag Drone Directory codebase, scanned for any leftover content from the prior TerraDron.ro / DroneAgricol.ro Romanian project.

## llms.txt

- Status: **clean**
- Location: `public/llms.txt`
- Notes: Fully US-focused. References `agdronedirectory.com`, all 50 US states, FAA Part 107/137, USDA NRCS, US per-acre USD pricing, US-relevant drone models. No Romanian, TerraDron, DroneAgricol, EUR, lei, hectar, Moldova references found.
- Full current content:

  ```
  # US Ag Drone Directory

  > Free directory of 391 verified agricultural drone operators across all 50 US states. Find spraying, seeding, mapping, and crop monitoring services by state, crop, or drone model. Published pricing, regulations, and interactive tools for farmers and operators.

  **Full content for AI agents:** [llms-full.txt](https://agdronedirectory.com/llms-full.txt). Deeper AEO blocks, pillar guide digests, and primary sources for all key pages.

  US Ag Drone Directory publishes the only public, primary-source-cited index of commercial agricultural drone operators in the United States. Every operator listing is filtered for FAA Part 107 and Part 137 certification status, state commercial pesticide applicator licensing with aerial category endorsement, and verifiable fleet and insurance data. Pricing benchmarks cite the 2026 Iowa State Custom Rate Survey, Kansas State Extension, UC Davis Cooperative Extension, and USDA NRCS cost-share rates. The site is built for farmers comparing operators and operators benchmarking their market, not for investors or press coverage.

  ## Core pages
  - [Home](https://agdronedirectory.com/): hub with pricing benchmarks, state rollups, and operator search
  - [About](https://agdronedirectory.com/about): editorial policy, author identity, what the site is and is not
  - [Pricing](https://agdronedirectory.com/pricing): 2026 USD per-acre benchmarks by crop, region, and service
  - [List Your Business](https://agdronedirectory.com/list-your-business): free operator submission form
  - [Contact](https://agdronedirectory.com/contact): editorial contact and corrections

  ## Find operators
  - [All operators](https://agdronedirectory.com/operators): searchable index of 391 verified US operators
  - [States hub](https://agdronedirectory.com/states): entry point to all 50 state pages
  - [Iowa](https://agdronedirectory.com/states/iowa): Corn Belt anchor, 2026 Iowa State benchmark at $12.50 per acre
  - [Texas](https://agdronedirectory.com/states/texas): cotton defoliant, wheat heading, TDA aerial license
  - [California](https://agdronedirectory.com/states/california): vineyards, orchards, CDPR Unmanned Pest Control Aircraft Pilot Certificate
  - [Illinois](https://agdronedirectory.com/states/illinois): dense Corn Belt operator supply, rate compression
  - [Kansas](https://agdronedirectory.com/states/kansas): Great Plains wheat fungicide, airplane vs drone crossover
  - [Nebraska](https://agdronedirectory.com/states/nebraska): irrigated corn and soybean fungicide at scale
  - [Tennessee](https://agdronedirectory.com/states/tennessee): Mid-South cotton, soybean, and tobacco operator base
  - [Alabama](https://agdronedirectory.com/states/alabama): Southeast cotton, peanuts, and forestry applications

  ## Regions
  - [Regions hub](https://agdronedirectory.com/regions): five multi-state market profiles
  - [Corn Belt](https://agdronedirectory.com/regions/corn-belt): IA, IL, IN, OH, MO, MI, WI, MN, KY, TN
  - [Great Plains](https://agdronedirectory.com/regions/great-plains): KS, NE, ND, SD, MT, WY, CO, OK, NM, TX
  - [Mid-South](https://agdronedirectory.com/regions/mid-south): AR, MS, LA, TN, AL, GA
  - [Southeast](https://agdronedirectory.com/regions/southeast): FL, SC, NC, VA, WV, and Northeast states
  - [West](https://agdronedirectory.com/regions/west): CA, WA, OR, ID, NV, UT, AZ, AK, HI

  ## Services
  - [Services hub](https://agdronedirectory.com/services): all 10 service pages
  - [Drone pesticide spraying](https://agdronedirectory.com/services/spraying): $12 to $22 per acre, Part 137 required
  - [Aerial cover crop seeding](https://agdronedirectory.com/services/seeding): $12 to $18 per acre, USDA NRCS EQIP eligible
  - [Agricultural drone mapping](https://agdronedirectory.com/services/mapping): $2 to $8 per acre, Part 107 only
  - [Crop health monitoring](https://agdronedirectory.com/services/monitoring): $3 to $10 per acre per flight, multispectral NDVI and NDRE
  - [Dry granular spreading](https://agdronedirectory.com/services/spreading): $10 to $18 per acre, urea and cover crop seed
  - [Ag drone pilot training](https://agdronedirectory.com/services/training): $500 to $4,500 per course, FAA and state prep
  - [Agricultural drone rental](https://agdronedirectory.com/services/rental): $2,000 to $8,000 per week, insurance required
  - [Agricultural drone sales](https://agdronedirectory.com/services/sales): new and used, DJI, Hylio, XAG dealers
  - [Ag drone business consultancy](https://agdronedirectory.com/services/consultancy): $100 to $300 per hour, Part 137 prep
  - [Emergency spray services](https://agdronedirectory.com/services/emergency): $18 to $35 per acre, rapid response for outbreaks

  ## Crops
  - [Crops hub](https://agdronedirectory.com/crops): all 8 crop pages
  - [Corn](https://agdronedirectory.com/crops/corn): VT/R1 fungicide, 90 million acres, 5 to 8 bu yield response
  - [Soybeans](https://agdronedirectory.com/crops/soybeans): R2/R3 fungicide, 87 million acres, white mold and frogeye leaf spot
  - [Wheat](https://agdronedirectory.com/crops/wheat): T3 heading fungicide, 45 million acres, Fusarium head blight
  - [Cotton](https://agdronedirectory.com/crops/cotton): September to October defoliant, 10 million Delta acres
  - [Rice](https://agdronedirectory.com/crops/rice): 100 percent aerial treated, 2.5 million acres in AR, LA, MS, CA
  - [Grapes and vineyards](https://agdronedirectory.com/crops/grapes): 8 to 12 passes per season, hillside blocks, UC Davis data
  - [Orchards](https://agdronedirectory.com/crops/orchards): apple, cherry, almond, walnut, 5 million US acres
  - [Cover crops](https://agdronedirectory.com/crops/cover-crops): 15 million acres, USDA NRCS Practice Standard 340

  ## Drones
  - [Drones hub](https://agdronedirectory.com/drones): all 8 drone model pages
  - [DJI Agras T50](https://agdronedirectory.com/drones/dji-agras-t50): 40L tank, $22,000 to $28,000 post-tariff, not NDAA
  - [DJI Agras T100](https://agdronedirectory.com/drones/dji-agras-t100): 100L tank, launched July 2025, 175 kg MTOW
  - [DJI Agras T25](https://agdronedirectory.com/drones/dji-agras-t25): 20L tank, compact spray platform
  - [Hylio AG-272](https://agdronedirectory.com/drones/hylio-ag-272): 68L tank, $55,000 to $75,000, NDAA compliant, Richmond TX
  - [Hylio AG-230](https://agdronedirectory.com/drones/hylio-ag-230): smaller Hylio platform, NDAA compliant
  - [XAG P100 Pro](https://agdronedirectory.com/drones/xag-p100-pro): 40L tank, 22 mph wind rating
  - [Talos T60X](https://agdronedirectory.com/drones/talos-t60x): US-made alternative spray platform
  - [Pyka Pelican Spray](https://agdronedirectory.com/drones/pyka-pelican-2): crewed-class autonomous ag aircraft

  ## Tools and calculators
  - [Tools hub](https://agdronedirectory.com/tools): all 6 interactive tools
  - [Spray cost calculator](https://agdronedirectory.com/tools/spray-cost-calculator): per-acre cost estimates by crop, region, service
  - [ROI calculator](https://agdronedirectory.com/tools/roi-calculator): break-even acreage for new drone ownership
  - [Coverage calculator](https://agdronedirectory.com/tools/coverage-calculator): acres per day by drone model and field conditions
  - [Acreage converter](https://agdronedirectory.com/tools/acreage-converter): acres to hectares and back with field-size presets
  - [Drone comparison](https://agdronedirectory.com/tools/drone-comparison): side-by-side specs for DJI, Hylio, XAG, Talos, Pyka
  - [Treatment calendar](https://agdronedirectory.com/tools/treatment-calendar): state and crop spray-window planner

  ## Regulations and compliance
  - [Regulations hub](https://agdronedirectory.com/regulations): FAA, EPA, and state licensing overview
  - [FAA Part 107](https://agdronedirectory.com/regulations/faa-part-107): remote pilot certificate, exam, airspace
  - [FAA Part 137](https://agdronedirectory.com/regulations/faa-part-137): agricultural aircraft operator certificate, 44807 exemption
  - [State pesticide licensing](https://agdronedirectory.com/regulations/state-licensing): aerial category endorsement by state
  - [NDAA compliance](https://agdronedirectory.com/regulations/ndaa-compliance): DJI vs Hylio, federal and state procurement rules

  ## Pillar guides
  - [Guides hub](https://agdronedirectory.com/guides): long-form farmer-side playbooks on hiring, vetting, and working with drone spray operators
  - [How to hire a drone spray operator: the farmer&apos;s complete vetting checklist](https://agdronedirectory.com/guides/hire-drone-spray-operator-checklist): verify Part 137, Part 107, state aerial applicator license, insurance with chemical drift endorsement, label compliance, contract clauses, and nine red flags worth walking away over. 18-minute read, $13 ASDC 2025 rate benchmark, 40 CFR 170.9(c) farmer liability.
  - [Year round revenue for ag drone operators: how to fill your calendar in the off season](https://agdronedirectory.com/guides/year-round-revenue-ag-drone-operators): how US operators stack six services (liquid spray, cover crop seeding, NDVI mapping, livestock thermal, granular spreading, non-ag RGB) to earn $150K to $420K per year. 20-minute read, 16.4M drone-sprayed acres in 2025 (ASDC), $12.50 per acre Iowa State benchmark, $7.39 Mizzou cost base, state cost-share rates (EQIP, Iowa WQI, Illinois Fall Covers, Ohio H2Ohio, Maryland MACS, Decatur RCPP), and the 12-month calendar that actually works.
  - [How to become an agricultural drone pilot in the US: a step-by-step 2026 guide](https://agdronedirectory.com/guides/how-to-become-an-agricultural-drone-pilot): the full licensing path for a commercial ag drone pilot. Part 107, Section 44807 exemption, Part 137 Agricultural Aircraft Operator Certificate, state pesticide applicator license. 18-minute read, $43,500 to $89,500 startup budget, 3 to 6 months to first paid flight, $12 to $35 per acre earnings by region, and the four patterns that separate operators who build a business from the ones who quit.
  - [Agricultural drone spraying statistics 2026: US market report](https://agdronedirectory.com/guides/agricultural-drone-spraying-statistics-2026): 85+ verified ag drone spraying stats with named primary sources, year, and tier rating. 22-minute read, 16.4M US acres treated by drone in 2025 (ASDC, +58.7% YoY), 1,710 FAA Part 137 UAS operators (FAA Safety Briefing, Sept 2025), $13/acre average price (down from $21 in 2024), peer-reviewed environmental data (46 to 75% pesticide cut, 90 to 99% operator exposure cut), 9-firm market-size spread, 20-row citable mega-table emitted as a Dataset schema for AI engines and Google Dataset Search.

  ## Guides and comparisons
  - [Buyers guide](https://agdronedirectory.com/buyers-guide): how to pick DJI, Hylio, XAG, Talos for your operation
  - [Start a drone business](https://agdronedirectory.com/start-a-drone-business): 6 to 9 month path from decision to first customer
  - [Grants and subsidies](https://agdronedirectory.com/grants-and-subsidies): USDA EQIP, BFRDP, state precision ag grants
  - [Insurance](https://agdronedirectory.com/insurance): hull, liability, chemical drift coverage
  - [Training and certification](https://agdronedirectory.com/training-and-certification): Part 107, Part 137, state applicator prep
  - [Drone vs ground rig](https://agdronedirectory.com/comparisons/drone-vs-ground-rig): when each wins on cost, compaction, access
  - [Drone vs airplane](https://agdronedirectory.com/comparisons/drone-vs-airplane): sub-500-acre crossover on wheat and cotton

  ## Blog
  - [How to get to your first 1,000 acres](https://agdronedirectory.com/blog/first-1000-acres-drone-operator): realistic year 1 and year 2 path for new operators
  - [Drone spraying for vineyards: 2026 wine grape guide](https://agdronedirectory.com/blog/vineyard-drone-spraying-guide): $18 to $30 per acre, 8 to 12 passes, hillside runoff data
  - [Why rice is the perfect crop for drone spraying](https://agdronedirectory.com/blog/drone-spraying-rice-guide): 100 percent aerial treated, 7 percent yield gain
  - [The DJI question: NDAA, tariffs and your farm](https://agdronedirectory.com/blog/ndaa-chinese-drones-what-farmers-need-to-know): legal status, 170 percent tariff, federal vs private
  - [Why drone spray rates dropped 30 to 45 percent in three years](https://agdronedirectory.com/blog/drone-spraying-pricing-trends-2026): rate compression explained
  - [What pesticide license do you need to spray by drone](https://agdronedirectory.com/blog/drone-spraying-state-license-guide): 50-state aerial category reference
  - [DJI Agras T50 vs Hylio AG-272: the 2026 comparison](https://agdronedirectory.com/blog/dji-vs-hylio-which-spray-drone): cost, NDAA, wind resistance side by side
  - [Cover crop seeding by drone: complete 2026 guide](https://agdronedirectory.com/blog/cover-crop-seeding-drone-guide): EQIP cost-share and cereal rye timing
  - [How to get FAA Part 137 for agricultural drone spraying](https://agdronedirectory.com/blog/faa-part-137-drone-guide): 90 to 180 day process, operations manual, 44807 petition
  - [Corn fungicide by drone: what university data shows](https://agdronedirectory.com/blog/corn-fungicide-drone-spraying-guide): VT/R1 timing and yield response data

  ## Reference
  - [Glossary](https://agdronedirectory.com/glossary): agricultural drone terms, FAA codes, agronomic abbreviations
  ```

## robots.txt

- Status: **clean** (file is generated dynamically by `src/app/robots.ts`, not present as a static file in `/public`)
- Source: `src/app/robots.ts`
- Notes: Sitemap pointer is `https://agdronedirectory.com/sitemap.xml`. Disallow list is internal-only (`/_memory/`, `/_research/`, `/_handoff/`, `/api/`, `/go/`). No Romanian / TerraDron references.

## sitemap.xml

- Status: **clean** (file is generated dynamically by `src/app/sitemap.ts`, not a static file in `/public`)
- Source: `src/app/sitemap.ts`
- Notes: `BASE_URL = 'https://agdronedirectory.com'`. URL list is composed from US data sources (operators, counties, crops, services, regions, blog posts, guides, qualifying cities). No Romanian slugs surfaced in spot inspection.

## Other files with foreign content

| File path | Issue found | Snippet |
|---|---|---|
| `public/humans.txt` | **Entire file is the old TerraDron.ro Romanian project profile.** Contains TerraDron, Romania, Moldova, Romanian, contact@terradron.ro. Full rewrite required. | `Title: Fondator & Editor` / `Contact: contact@terradron.ro` / `Location: Romania` / `Name: TerraDron.ro` / `Description: Directorul operatorilor de drone agricole din Romania si Moldova` / `Language: Romanian` |
| `public/.well-known/security.txt` | Email contact and canonical URL still point at terradron.ro; preferred language `ro, en`. Full rewrite required. | `Contact: mailto:contact@terradron.ro` / `Preferred-Languages: ro, en` / `Canonical: https://terradron.ro/.well-known/security.txt` |
| `public/images/README.md` | Internal image-spec doc references DroneAgricol.ro brand, instructs Romanian alt tags, references future `og.droneagricol.ro` service. Not customer-facing but stale. Partial rewrite. | `Design: Green background (#2D6A4F), white text "DroneAgricol.ro", drone icon` / `Always include descriptive alt tags in Romanian` / `Or use a service like og.droneagricol.ro (future)` |
| `package.json` | `name` field is generic placeholder `"directory-agri"`; no `description`. Not Romanian, but not aligned with the US Ag Drone Directory brand. Optional partial edit. | `"name": "directory-agri"` |
| `README.md` | Default unedited Next.js boilerplate; no project description at all. Not Romanian, but does not introduce the US Ag Drone Directory project. Optional rewrite. | `This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`]…` |

### Files that mention "Romanian" but are internal/intentional (not customer-facing, leave as-is)

| File path | Why it is OK |
|---|---|
| `CLAUDE.md` | Master rules file; mentions "Romanian codebase" as context for the branch-discipline rule that forbids merging `main`. This is meta/internal guidance. |
| `build-plan-v2.md` | Internal build plan documenting the Romanian-to-US migration (URL redirect map, "Romanian-free" acceptance criteria). Reference document, not shipped. |
| `tools/contact-scraper/README.md` | Internal tool doc referencing the Romanian directory only as one example input source for the scraper. |
| `_memory/*` | Self-maintained memory system; expected to discuss the Romanian origin. Excluded by `robots.ts` disallow rule. |
| `_research/*`, `_handoff/*` | Research/handoff materials, also disallowed in robots.ts. |

### Files explicitly checked and confirmed clean

- `public/llms.txt` — clean (full content above)
- `public/llms-full.txt` — clean (only matches were legitimate US/international ag context: hectares conversion, China ag drones treating hectares; no Romania/TerraDron strings)
- `public/ads.txt` — single Google AdSense pub line, clean
- `public/199aa73a01c74f6786948b45aaec2d17.txt` — IndexNow verification key, clean
- `public/affiliate-assets/pilot-institute/pilot-institute-logo.svg` — image asset (excluded from text scan per task scope)
- `public/images/eugen-author.jpeg` / `eugen-author.jpg` — image assets (excluded)
- `src/app/robots.ts` — clean
- `src/app/sitemap.ts` — clean
- `src/app/layout.tsx`, `src/app/manifest.ts`, `src/app/opengraph-image.tsx` — no matches for TerraDron / Romania / Moldova / DroneAgricol / `.ro`
- `src/data/*.ts` (operators, author, blog-posts, crops, drone-model, guides, services, regions, states, counties, cities, faqs, glossary, types, affiliates, us-states-svg) — no Romanian operator names, EU regulatory refs, or non-US content. No matches for the audit token list.
- No `EUR`, `lei`, or standalone `hectar` (Romanian spelling) tokens found anywhere under `src/` or `public/`.

## Summary

- **Total files needing cleanup: 3** (customer-facing) **+ 2 optional** (internal but stale).
- **Files that need full rewrite:**
  - `public/humans.txt` — every field is Romanian project metadata; rewrite as US Ag Drone Directory profile.
  - `public/.well-known/security.txt` — every field references terradron.ro; rewrite with US contact, canonical `https://agdronedirectory.com/.well-known/security.txt`, `Preferred-Languages: en`.
- **Files that need partial edits:**
  - `public/images/README.md` — replace `DroneAgricol.ro` brand reference, change "alt tags in Romanian" to English, drop `og.droneagricol.ro` placeholder.
  - `package.json` (optional) — set a meaningful `name` (e.g. `us-ag-drone-directory`) and add a `description` field.
  - `README.md` (optional) — replace default `create-next-app` boilerplate with a one-paragraph description of the US Ag Drone Directory project.
- **No code or data changes needed.** All Romanian/TerraDron remnants are confined to plain-text public files and one internal markdown doc; the Next.js source tree, data layer, and dynamic robots/sitemap are already clean.
