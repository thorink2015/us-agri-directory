# Homepage Rewrite v2

## Meta
- URL slug: `/`
- Primary keyword: agricultural drone spraying services
- Secondary keywords: drone spraying near me, find drone sprayer, ag drone operators by state, drone crop spraying cost
- Title tag: `Find Drone Spraying Services Near You | US Ag Drone Directory`
- Meta description: `Search {{operatorCount}}+ verified ag drone operators in all 50 states. Compare per-acre rates from $12, check FAA credentials, and contact operators directly.`
- Canonical: `https://agdronedirectory.com/`

## Navigation Menu (site-wide, not just homepage)

Desktop: `Operators | Services | Crops | States | Drones | Pricing | Tools | Blog`
Mobile hamburger: same items, stacked.

"Tools" dropdown (or sub-nav on the /tools page):
- Spray Cost Calculator
- ROI: Buy vs. Hire Calculator
- Coverage Time Estimator

"List Your Business" green CTA button on the right side of nav, always visible.

## Schema
- Organization (@id: /#organization)
- Person (@id: /about#eugen)
- WebSite (@id: /#website) with SearchAction targeting the /operators search
- FAQPage (5 questions, section 8)
- BreadcrumbList: Home (root only)

---

## SECTION 1: Hero

**Badge (dynamic):** `{{operatorCount}} verified operators | {{stateCount}} states`

**H1:** `Drone Spraying Services Across All 50 States`

**Subhead:**
The US directory of verified agricultural drone operators. Search by state, crop, or service type. Every operator listed holds FAA Part 107 and Part 137 credentials. No booking fees, no commissions. Contact operators directly.

**Search bar:** State dropdown (all 50 states) + Service type dropdown (from services.ts slugs) + green "Search Operators" button

**Below search, inline links:**
Top states: [Iowa](/states/iowa) | [Texas](/states/texas) | [California](/states/california) | [Illinois](/states/illinois) | [Arkansas](/states/arkansas) | [Kansas](/states/kansas) | [View all states](/states)

---

## SECTION 2: AEO Block (green left-border callout, under H1)

US agricultural drone spraying covered an estimated 10.3 million acres in 2024, with per-acre rates ranging from $12 on flat Midwest row crops to $35 on California hillside vineyards. The 2026 Iowa State Custom Rate Survey established the first university benchmark at $12.50 per acre average for drone application. This directory lists {{operatorCount}}+ operators across all 50 states with FAA Part 107 and Part 137 credentials verified.

---

## SECTION 3: Stats Row (4 cards, dynamic)

| Value | Label |
|---|---|
| {{operatorCount}}+ | Verified operators |
| {{stateCount}} | States covered |
| 10.3M+ | Acres drone-sprayed in 2024 |
| $12.50/acre | Iowa State 2026 avg rate |

Small source line: Acreage: American Spray Drone Coalition. Pricing: Iowa State Extension 2026 Custom Rate Survey.

---

## SECTION 4: Browse by State (clickable US map + state grid)

**H2:** Find drone operators in your state

**Option A (preferred):** Interactive US map, states color-coded by operator density (green = 10+, yellow = 5 to 9, gray = 1 to 4). Click a state to go to /states/[slug].

**Option B (fallback if map is too heavy for CWV):** 6-column grid of all 50 state names as links, grouped by region. Each state shows operator count badge.

**Tier 1 states (larger font or highlighted):** Iowa, Illinois, Indiana, Texas, California, Arkansas, Kansas, Nebraska, Ohio, North Carolina

This section is the most important internal linking block on the homepage. Every state page gets a link from here.

---

## SECTION 5: Browse by Service (top 6 cards, 2x3 grid)

**H2:** Agricultural drone services

| Service | Rate | 1-line from services.ts description | Link |
|---|---|---|---|
| Pesticide Spraying | $12 to $22/acre | Fungicides, insecticides, herbicides on row crops, vineyards, orchards. | /services/spraying |
| Cover Crop Seeding | $12 to $18/acre | Aerial broadcast seeding into standing corn and soybeans. | /services/seeding |
| Crop Mapping | $2 to $8/acre | Orthomosaics, elevation models, NDVI for precision farming. | /services/mapping |
| Crop Monitoring | $3 to $10/acre | Multispectral scouting to detect stress before visual symptoms. | /services/monitoring |
| Granular Spreading | $10 to $18/acre | Urea, gypsum, lime, and seed on fields too wet for ground rigs. | /services/spreading |
| Drone Sales | $18K to $75K | New and used DJI Agras, Hylio, XAG from authorized dealers. | /services/sales |

[View all services](/services)

---

## SECTION 6: Browse by Crop (8 compact cards, 2x4 grid)

**H2:** Operators by crop

Each card: crop icon from crops.ts + name + spray window months + price range + "Find operators" link.

| Crop | Window | Rate | Link |
|---|---|---|---|
| Corn | Jul to Aug | $12 to $18 | /crops/corn |
| Soybeans | Jul to Sep | $12 to $18 | /crops/soybeans |
| Wheat | May to Jun | $12 to $16 | /crops/wheat |
| Cotton | Jun to Oct | $14 to $20 | /crops/cotton |
| Rice | May to Aug | $14 to $22 | /crops/rice |
| Grapes | Mar to Sep | $18 to $30 | /crops/grapes |
| Orchards | Mar to Aug | $20 to $35 | /crops/orchards |
| Cover Crops | Aug to Oct | $12 to $18 | /crops/cover-crops |

---

## SECTION 7: Tools and Calculators (3 cards, high-value traffic section)

**H2:** Free tools for farmers and operators

| Tool | Description | Link |
|---|---|---|
| Spray Cost Calculator | Enter your acres, crop, and state. Get an instant per-acre cost estimate with regional pricing data. | /tools/spray-cost-calculator |
| Buy vs. Hire ROI Calculator | Compare owning a drone versus hiring a custom operator. Includes USDA EQIP cost-share and financing scenarios. | /tools/roi-calculator |
| Coverage Time Estimator | How long will it take to spray your fields? Enter acres, drone model, and application rate. | /tools/coverage-calculator |

These pages get bookmarked, linked to, and cited by AI engines. They need prominent homepage placement.

---

## SECTION 8: FAQ (FAQPage schema, 5 questions)

**H2:** Common questions about drone spraying

**Q: How much does drone crop spraying cost per acre?**
A: Row crop applications (corn, soybeans, wheat) run $12 to $18 per acre for application only, with the farmer supplying the chemical. Vineyard and orchard work runs $18 to $35 per acre because of terrain and more passes per season. The 2026 Iowa State Custom Rate Survey established the first university benchmark at $12.50 per acre average.

**Q: Is drone crop spraying legal in the United States?**
A: Yes. Commercial drone spraying requires three credentials: FAA Part 107 remote pilot certificate, FAA Part 137 agricultural aircraft operator certificate, and a state commercial pesticide applicator license with aerial endorsement. Every operator in this directory holds all three.

**Q: How many acres can a drone spray per day?**
A: A single DJI Agras T50 covers 40 to 60 acres per flight hour, or 300 to 600 acres per day. Two-drone crews hit 600 to 1,000 acres per day during peak season. The DJI Agras T100 at 100 liters per flight pushes daily throughput higher on large contiguous fields.

**Q: Does USDA offer cost-share for drone spraying or drone purchases?**
A: Yes. USDA NRCS EQIP Practice Code 595 (Precision Agriculture) offers 40 to 90 percent cost-share on qualifying drone purchases. Cover crop seeding by drone qualifies under Practice Standard 340 at $25 to $55 per acre. Beginning farmers and socially disadvantaged producers qualify for higher rates.

**Q: How far ahead should I book a drone operator?**
A: Corn fungicide in July: book 4 to 6 weeks out. Wheat heading in June: book in April. Full-season vineyard and orchard contracts: sign in January or February. Cover crop seeding: book by late July for September slots.

---

## SECTION 9: Popular Drones (4 cards, single row)

**H2:** Agricultural spray drones

| Drone | Tank | Price | NDAA | Link |
|---|---|---|---|---|
| DJI Agras T50 | 40L | $22K to $28K | No | /drones/dji-agras-t50 |
| DJI Agras T100 | 100L | Contact dealer | No | /drones/dji-agras-t100 |
| Hylio AG-272 | 68L | $55K to $75K est. | Yes | /drones/hylio-ag-272 |
| Talos T60X | 50L | From $17,899 | Unconfirmed | /drones/talos-t60x |

[View all drones](/drones)

---

## SECTION 10: Latest from the Blog (3 cards, pulls from blog data)

**H2:** Guides and news

Pull the 3 most recent blog posts. Each card: title, publication date, 1-sentence excerpt, "Read more" link.

If no blog posts exist yet, render this section with 3 placeholder cards linking to:
- /pricing (as "2026 Drone Spraying Pricing Guide")
- /regulations/faa-part-137 (as "How to Get FAA Part 137 for Drone Spraying")
- /start-a-drone-business (as "How to Start a Drone Spraying Business")

---

## SECTION 11: Operator CTA

**H2:** Are you a drone operator?

List your business for free. Reach farmers searching for drone services in your state. No commission, no booking fee.

[List Your Business](/list-your-business) (green CTA button)

---

## SECTION 12: Footer byline

"Edited by {{authorName}}. Every page personally researched and updated. Last reviewed {{lastReviewedDate}}."

---

## Internal links from homepage (25+)

**State pages (10):** iowa, texas, california, illinois, arkansas, kansas, nebraska, ohio, north-carolina + /states index
**Service pages (6):** spraying, seeding, mapping, monitoring, spreading, sales
**Crop pages (8):** corn, soybeans, wheat, cotton, rice, grapes, orchards, cover-crops
**Drone pages (4):** dji-agras-t50, dji-agras-t100, hylio-ag-272, talos-t60x
**Tool pages (3):** spray-cost-calculator, roi-calculator, coverage-calculator
**Other (4):** /pricing, /list-your-business, /about, /blog or placeholder guides
**Total: 35+ internal links**

---

## Dynamic slots

| Slot | Source |
|---|---|
| {{operatorCount}} | operators array length or database count |
| {{stateCount}} | unique states from operator data |
| {{authorName}} | AUTHOR.name from src/data/author.ts |
| {{lastReviewedDate}} | manually set or build date |

---

## Acceptance checklist

- [ ] Title tag <= 60 chars, primary keyword in first 40 chars
- [ ] Meta description <= 155 chars, includes dynamic operator count and CTA verb
- [ ] H1 unique, targets "drone spraying services" intent
- [ ] AEO block: 3 sentences, contains numbers, AI-citable
- [ ] Stats row uses single consistent operator count source
- [ ] State grid or map links to all 50 state pages
- [ ] Service, crop, drone sections pull data dynamically from .ts files
- [ ] Tools section prominently links to all 3 calculators
- [ ] FAQ has FAQPage schema, 5 Q&A pairs
- [ ] 25+ internal links across all page types
- [ ] Schema: Organization + Person + WebSite + SearchAction + FAQPage
- [ ] No Romanian words, no double dashes, no em dashes
- [ ] Author byline and last-reviewed date present
- [ ] Nav menu includes: Operators, Services, Crops, States, Drones, Pricing, Tools, Blog
- [ ] "List Your Business" CTA in nav bar
