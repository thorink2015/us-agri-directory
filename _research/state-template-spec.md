# State Page Template + 3 Proof States

## Template Structure (all 50 states)

**URL:** `/states/[slug]`
**Title pattern:** `Drone Spraying in [State] | Operators, Rates & Licensing | Ag Drone Directory`
**Meta pattern:** `Find {{count}} verified drone spraying operators in [State]. [Crop] rates from $[low]/acre. [State licensing fact]. Search by crop and county.`
**H1 pattern:** `Drone Spraying Services in [State]`

### Schema
- Article with author + publisher @id
- FAQPage (5 questions)
- BreadcrumbList: Home > States > [State]
- ItemList (operators)

### Sections (in order)
1. H1 + byline + last reviewed
2. AEO block (3 sentences: operator count, rate range, key licensing fact)
3. Stats row (4 cards: operators, typical rate, top crop, licensing agency)
4. Operator grid (from data, or "No operators yet" + list-your-business CTA)
5. H2: Rates in [State] (crop x rate table)
6. H2: [State] licensing requirements (the differentiator section)
7. H2: Top crops for drone spraying in [State] (3 to 5 crops with links)
8. H2: Region (link to /regions/[slug])
9. FAQ (5 state-specific, FAQPage schema)
10. CTA: search or list your business
11. Internal links (neighboring states, crops, region, pricing, tools)

### Internal links per page (min 12)
- 2 to 4 neighboring states
- 2 to 3 relevant crop pages
- /pricing
- /services/spraying
- /regulations/state-licensing
- /tools/spray-cost-calculator
- /tools/treatment-calendar
- /list-your-business
- Region page

---

## PROOF STATE 1: IOWA

**URL:** `/states/iowa`
**Title:** `Drone Spraying in Iowa | Operators, Rates & Licensing | Ag Drone Directory`
**Meta:** `Find verified drone spraying operators in Iowa. Corn and soybean rates from $12/acre. Category 11 aerial license plus consultant required.`
**H1:** `Drone Spraying Services in Iowa`

### AEO Block
Iowa is the benchmark state for US agricultural drone spraying, with the 2026 Iowa State Custom Rate Survey establishing the first university standard at $12.50 per acre average from 47 responses. Operators must hold FAA Part 107, Part 137, and an IDALS Category 11 (Aerial Application) license, plus Iowa uniquely requires an in-state aerial applicator consultant. Corn fungicide at VT/R1 and cover crop seeding are the two dominant drone services.

### Stats
| Operators | Rate | Top crop | Agency |
|---|---|---|---|
| {{iowaCount}} | $12 to $17/acre | Corn | IDALS |

### Rates in Iowa
| Crop | $/acre | Window |
|---|---|---|
| Corn fungicide | $12 to $17 | Late Jul to early Aug |
| Soybean fungicide | $12 to $16 | Mid-Jul to mid-Aug |
| Cover crop seeding | $12 to $18 | Late Aug to mid-Oct |
| Wheat heading | $12 to $16 | Late May to mid-Jun |

Source: Iowa State Extension 2026 Custom Rate Survey.

### Iowa Licensing

**Category:** 11 (Aerial Application) under IDALS.

**Exams:** Core + Category 11. Private: $15/3yr.

**Unique rule: aerial applicator consultant.** Every aerial applicator on agricultural land must work with an Iowa-resident consultant holding Category 11 plus a commercial license or dealer license. The consultant must meet in person daily, maintain a 3-year compliance checklist, and verify compliance with Iowa rules, FAA regs, and Iowa DOT requirements.

**Aircraft registration:** All drones must be registered with Iowa DOT before aerial application. Unregistered aircraft make the pesticide license inactive.

**Reciprocity:** IL, MN, MO, NE, SD, WI. Iowa residents cannot use reciprocal licensing and must test in-state.

**Renewal:** 3-year cycle. Annual C-CIC training or re-exam.

**Links:**
- IDALS Pesticide Bureau: iowaagriculture.gov/pesticide-bureau
- Iowa State Custom Rate Survey: extension.iastate.edu/agdm/crops/pdf/a3-10.pdf

### Top Crops
1. **Corn** (12.9M acres): VT/R1 fungicide is the #1 drone use case nationally. Tar spot years produce 15 to 25 bu/acre responses. [Corn](/crops/corn)
2. **Soybeans** (9.4M acres): R2/R3 fungicide for frogeye leaf spot, white mold. [Soybeans](/crops/soybeans)
3. **Cover crops**: NRCS EQIP $25 to $55/acre cost-share. Drone seeding into standing crops gives 3 to 4 weeks extra establishment. [Cover Crops](/crops/cover-crops)

### Region
Iowa is in the [Corn Belt](/regions/corn-belt), the most competitive drone spray market in the US.

### FAQ
**Q: What does drone spraying cost in Iowa?**
A: The 2026 Iowa State Custom Rate Survey puts the average at $12.50/acre with a range of $8 to $16. This is the lowest benchmark in the country due to flat terrain, large fields, and high operator density.

**Q: What licenses do I need to spray crops by drone in Iowa?**
A: FAA Part 107, FAA Part 137 (with Section 44807 exemption for drones over 55 lbs), and IDALS Category 11 (Aerial Application) commercial pesticide applicator license. Iowa also requires an in-state aerial applicator consultant, which is unique nationally.

**Q: What is the aerial applicator consultant requirement?**
A: Iowa law requires every aerial applicator to work with an Iowa-resident consultant who holds Category 11 certification. The consultant meets with you daily in person, maintains compliance records for 3 years, and verifies you follow Iowa rules, FAA regulations, and Iowa DOT aircraft registration requirements.

**Q: When is the busiest drone spray season in Iowa?**
A: Last two weeks of July through first week of August, when corn VT/R1 and soybean R2/R3 fungicide windows overlap. Cover crop seeding creates a second peak from late August through September. Book 4 to 6 weeks ahead for July slots.

**Q: Does Iowa have reciprocal licensing with neighboring states?**
A: Yes, with IL, MN, MO, NE, SD, and WI. However, Iowa residents cannot use reciprocal licensing from other states and must test in Iowa. Out-of-state operators can apply their reciprocal license to work in Iowa.

### Internal Links
- [Illinois](/states/illinois), [Minnesota](/states/minnesota), [Missouri](/states/missouri), [Nebraska](/states/nebraska)
- /crops/corn, /crops/soybeans, /crops/cover-crops
- /regions/corn-belt, /pricing, /services/spraying
- /tools/spray-cost-calculator, /tools/treatment-calendar
- /regulations/state-licensing, /list-your-business

---

## PROOF STATE 2: TEXAS

**URL:** `/states/texas`
**Title:** `Drone Spraying in Texas | Operators, Rates & Licensing | Ag Drone Directory`
**Meta:** `Find verified drone spraying operators in Texas. Cotton and corn rates from $12/acre. TDA Category 9 aerial license required plus use-category exam.`
**H1:** `Drone Spraying Services in Texas`

### AEO Block
Texas is the largest agricultural state by acreage, with cotton (5 to 6 million acres), corn, wheat, sorghum, and cattle operations creating year-round drone demand. TDA requires Category 9 (Aerial Application) plus at least one additional use-category exam, making the minimum three exams. Regulated herbicide counties require spray permits, a restriction unique to Texas.

### Stats
| Operators | Rate | Top crop | Agency |
|---|---|---|---|
| {{texasCount}} | $12 to $20/acre | Cotton | TDA |

### Rates in Texas
| Crop | $/acre | Window |
|---|---|---|
| Cotton insecticide | $14 to $18 | Jul to Aug |
| Cotton defoliant | $14 to $20 | Sep to Oct |
| Corn fungicide | $14 to $17 | Jul to early Aug |
| Wheat heading | $12 to $16 | Late May to early Jun |
| Cover crop seeding | $12 to $18 | Aug to Oct |
| Pasture/rangeland | $16 to $25 | Variable |

### Texas Licensing

**Category:** 9 (Aerial Application) under TDA. Not standalone; must also certify in at least one use category (e.g., 1A Field Crop, 1C Pasture and Rangeland). Minimum 3 exams.

**Exams:** General Standards + Category 9 + at least one use category. $64 per exam via PSI/Metro testing. Commercial license $200/year.

**CE:** 5 CEUs annually for both commercial license and aerial category. Must include Laws and Regulations, Drift Minimization, and Pesticide Safety. Excess CEUs do not carry over.

**Unique rule: regulated herbicide counties.** Texas maintains a list of counties where spray permits are required when applying regulated herbicides. Operators must obtain permits before application in these counties.

**Record keeping:** Must document product name, EPA reg number, application rate, FAA N-number, weather conditions, and spray permit (if applicable) for 2 years.

**Reciprocity:** 10 states, but all reciprocal applicants must pass the TDA Laws and Regulations exam.

**Resource:** Texas A&M AgriLife Extension publishes a detailed drone licensing guide (updated May 2025).

**Links:**
- TDA Pesticide Categories: texasagriculture.gov/Regulatory-Programs/Pesticides
- Texas A&M Drone Licensing Guide: www-aes.tamu.edu

### Top Crops
1. **Cotton** (5 to 6M acres): Defoliant in Sep/Oct is the top drone use. Rolling Plains and South Texas. [Cotton](/crops/cotton)
2. **Corn**: Standard VT/R1 fungicide window. Texas Panhandle and Central TX. [Corn](/crops/corn)
3. **Wheat**: Winter wheat heading in late May. [Wheat](/crops/wheat)
4. **Pasture/rangeland**: Brush control (mesquite, cedar) where ground rigs cannot reach.

### Region
Texas spans the [Great Plains](/regions/great-plains) (panhandle and west) and borders the [Mississippi Delta](/regions/mississippi-delta) (east). Wind resistance is critical for Texas operations.

### FAQ
**Q: What does drone spraying cost in Texas?**
A: Row crop rates run $12 to $17/acre. Cotton defoliant runs $14 to $20. Pasture and rangeland brush control is $16 to $25. Texas is a large state with significant regional variation.

**Q: How many exams do I need for a Texas drone spray license?**
A: Minimum 3: General Standards, Category 9 (Aerial Application), plus at least one use category (1A Field Crop, 1C Pasture, etc.). Each exam is $64 through PSI/Metro testing centers.

**Q: What are regulated herbicide counties?**
A: TDA designates certain counties where spray permits are required before applying regulated herbicides (primarily 2,4-D and dicamba). This applies to all aerial application including drones. Check the TDA regulated herbicide county list before booking work in unfamiliar counties.

**Q: Can I use my Texas license in other states?**
A: Texas has reciprocal agreements with 10 states. However, all reciprocal applicants entering Texas must pass the TDA Laws and Regulations exam regardless. Check TDA for the current reciprocity list.

**Q: Is wind a problem for drone spraying in Texas?**
A: Yes. Daily averages exceed 15 mph across much of Texas for half the year. DJI Agras T50 (rated 13.4 mph) is often grounded by afternoon. Operators running Hylio AG-272 (25 mph) or XAG P100 Pro (22 mph) have wider daily windows. Most Texas operators spray at dawn and early morning.

### Internal Links
- [Oklahoma](/states/oklahoma), [New Mexico](/states/new-mexico), [Arkansas](/states/arkansas), [Louisiana](/states/louisiana)
- /crops/cotton, /crops/corn, /crops/wheat
- /regions/great-plains, /pricing, /services/spraying
- /tools/spray-cost-calculator, /tools/treatment-calendar
- /regulations/state-licensing, /list-your-business

---

## PROOF STATE 3: CALIFORNIA

**URL:** `/states/california`
**Title:** `Drone Spraying in California | Operators, Rates & CDPR Licensing | Ag Drone Directory`
**Meta:** `Find verified drone spraying operators in California. Vineyard and orchard rates from $15/acre. CDPR Unmanned Pest Control Aircraft Pilot Certificate required.`
**H1:** `Drone Spraying Services in California`

### AEO Block
California is the highest-value drone spray market in the US at $15 to $35 per acre, driven by 900,000 acres of wine grapes and 1.5 million acres of almonds. CDPR requires the Unmanned Pest Control Aircraft Pilot Certificate (Apprentice or Journeyman tier) in addition to a QAC or QAL, FAA Part 107, and Part 137. Every application must be reported to the County Agricultural Commissioner.

### Stats
| Operators | Rate | Top crop | Agency |
|---|---|---|---|
| {{californiaCount}} | $15 to $35/acre | Wine grapes | CDPR (CalEPA) |

### Rates in California
| Crop | $/acre | Window |
|---|---|---|
| Vineyard fungicide (per pass) | $18 to $30 | Mar to Sep (8 to 12 passes) |
| Almond dormant oil | $15 to $21 | Jan to Feb |
| Almond/pistachio fungicide | $15 to $21 | Mar to Jun |
| Citrus insecticide | $18 to $25 | Apr to Aug |
| Walnut fungicide | $20 to $30 | Apr to Jul |
| Full-season vineyard program | $180 to $300/acre/year | 8 to 12 passes |

### California Licensing

**Credential:** CDPR Unmanned Pest Control Aircraft Pilot Certificate. Entirely separate from the Manned Aircraft Pilot Certificate. Tiers: Apprentice, Journeyman, Private Applicator.

**Additional requirements:**
- Qualified Applicator Certificate (QAC) for certified operators, or Qualified Applicator License (QAL) for licensed business owners
- FAA Part 107 + Part 137
- County Agricultural Commissioner registration in each county of operation
- Restricted Material Permits for applicable products
- Same-day Notice of Intent filing for some products

**Fees:** QAC application $320 + exams. Pilot certificate $265 application, $115 per exam. 70% passing score.

**Renewal:** 2-year cycle. CE hours vary by credential.

**Reporting:** Every pesticide application must be reported to the County Agricultural Commissioner. This is unique to California and adds significant administrative overhead per job.

**Links:**
- CDPR: cdpr.ca.gov
- UC Davis Vineyard IPM: ipm.ucanr.edu/agriculture/grape
- UC IPM Orchard Management: ipm.ucanr.edu/agriculture/apple

### Top Crops
1. **Wine grapes** (900K acres): 8 to 12 fungicide passes per season. Hillside blocks over 15% slope cannot use airblast. [Grapes](/crops/grapes)
2. **Almonds** (1.5M acres): Dormant oil + early season fungicide. Central Valley. [Orchards](/crops/orchards)
3. **Pistachios**: Similar program to almonds. Growing drone adoption.
4. **Citrus**: Asian citrus psyllid management requires frequent low-volume insecticide.
5. **Walnuts**: Dense mid-season canopy limits drone penetration; hybrid programs with airblast.

### Region
California is its own [region](/regions/california) due to unique crop mix, CDPR regulatory complexity, and pricing structure.

### FAQ
**Q: What does drone spraying cost in California?**
A: $15 to $35 per acre per pass, the highest in the US. A full-season 10-pass vineyard program runs $180 to $300 per acre per year. Rates reflect steep terrain, dense canopy, CDPR compliance overhead, and 8 to 12 passes per season.

**Q: What extra licenses do drone operators need in California?**
A: Beyond FAA Part 107 and Part 137, California requires the CDPR Unmanned Pest Control Aircraft Pilot Certificate (Apprentice or Journeyman), a QAC or QAL, and County Agricultural Commissioner registration in each county. This is the most complex state licensing stack in the US.

**Q: Why is California so much more expensive than the Midwest?**
A: Three factors. Steep vineyard slopes and dense orchard canopy slow throughput. CDPR reporting (County Ag Commissioner, Restricted Material Permits, Notice of Intent filings) adds administrative cost per job. And 8 to 12 passes per season versus 1 to 2 for Midwest row crops multiplies everything.

**Q: Can drones spray organic vineyards in California?**
A: Yes. OMRI-approved sulfur, copper hydroxide, Regalia, and other organic products apply well at 10 to 20 gpa carrier. Organic vineyard spraying is one of the fastest-growing drone niches in California because lower drift and targeted coverage reduce impact on cover crops and beneficial insects.

**Q: When should I book a drone operator for my California vineyard?**
A: Sign a full-season contract by January or February. Mid-season one-off sprays during powdery mildew spikes are nearly impossible to source without a pre-existing operator relationship. Multi-year contracts trim 10 to 15 percent off spot pricing.

### Internal Links
- [Oregon](/states/oregon), [Washington](/states/washington), [Nevada](/states/nevada), [Arizona](/states/arizona)
- /crops/grapes, /crops/orchards
- /regions/california, /pricing, /services/spraying
- /tools/spray-cost-calculator, /tools/treatment-calendar
- /regulations/state-licensing, /list-your-business

---

## Data architecture for scaling to 50 states

Create `src/data/states.ts` with a `StateData` interface:

```
slug, name, abbreviation, region (slug ref), licensingAgency, licensingAgencyUrl,
aerialCategory (string), examsRequired (string), examFees (string),
uniqueRules (string[]), reciprocityStates (string[]), renewalCycle (string),
ceRequirements (string), droneSpecificCredential (boolean),
droneGuidanceUrl (string | null), extensionUrl (string),
topCrops (array of {slug, name, acreage, notes}),
rateRange (string), sprayWindows (array from crops),
neighboringStates (slug[]), lastReviewedAt
```

Once these 3 proof pages are approved, scaling to 50 is a data-fill exercise using research-03 (state licensing batches 1 and 2). Each state page renders the same template with state-specific data.
