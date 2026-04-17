# Tools SEO/AEO Optimization: All 6 Calculators

Apply these specs to every tool page. For the 3 that already exist from the previous spec (spray-cost-calculator, roi-calculator, coverage-calculator), update the meta/schema/AEO to match. For the 3 new ones (acreage-converter, drone-comparison, treatment-calendar), this is the full spec.

## Shared requirements for ALL 6 tool pages

**Schema per page (all 6):**
- SoftwareApplication (name, applicationCategory: "Agriculture", operatingSystem: "Web", offers: {price: "0", priceCurrency: "USD"})
- Article with author + publisher @id refs
- FAQPage (3 to 5 questions each)
- BreadcrumbList: Home > Tools > [Tool Name]

**Page structure (all 6):**
1. H1 (keyword-rich, question format when natural)
2. Byline + last reviewed date
3. AEO block (green left-border callout, 2 to 3 sentences with numbers, AI-citable)
4. The interactive calculator (client component)
5. "How this works" or "How we calculated this" explainer (2 to 3 paragraphs, builds topical depth for Google)
6. FAQ with FAQPage schema (3 to 5 Q&A)
7. Related tools links (link to the other 5 tools)
8. Internal links to relevant content pages
9. Author card

**Nav:** All 6 tools appear under the "Tools" dropdown in site nav.

**Tools index page (`/tools`):**
- H1: Free Agricultural Drone Tools and Calculators
- AEO block: "Six free tools for farmers and drone operators covering spray cost estimation, buy vs hire ROI analysis, field coverage time, acreage conversion, drone model comparison, and seasonal treatment planning. All calculators use 2026 university extension and manufacturer data."
- Grid of 6 cards with name, 1-sentence description, and link
- FAQPage schema with 3 general questions about the tools

---

## Tool 1: Spray Cost Calculator (EXISTS, update meta/AEO)

**URL:** `/tools/spray-cost-calculator`
**Title:** `Drone Spraying Cost Calculator (2026 Rates) | Ag Drone Directory`
**Meta:** `Estimate your drone spraying cost per acre. Enter acres, crop, and state for a 2026 rate estimate based on Iowa State Extension and regional operator data.`
**H1:** `How Much Will Drone Spraying Cost on Your Farm?`
**Primary keyword:** drone spraying cost calculator
**Secondary:** drone spraying cost per acre calculator, ag drone cost estimator, crop spraying price calculator
**AEO block:** Drone crop spraying costs $12 to $35 per acre in 2026 depending on crop, region, and terrain. This calculator uses the 2026 Iowa State Custom Rate Survey benchmark of $12.50 per acre average plus regional and crop-specific adjustments from university extension data. Enter your acres, crop, and state for an instant estimate.

---

## Tool 2: Buy vs. Hire ROI Calculator (EXISTS, update meta/AEO)

**URL:** `/tools/roi-calculator`
**Title:** `Should I Buy a Spray Drone or Hire an Operator? ROI Calculator`
**Meta:** `Compare owning a spray drone versus hiring a custom operator. Includes USDA EQIP cost-share, financing, and break-even acreage from MU Extension data.`
**H1:** `Buy a Drone or Hire an Operator? Find Your Break-Even`
**Primary keyword:** drone spraying ROI calculator
**Secondary:** buy vs hire drone calculator, spray drone break even acres, drone ownership cost calculator, is buying a spray drone worth it
**AEO block:** University of Missouri Extension research puts the break-even for DJI Agras T50 ownership at approximately 980 acres per year of custom application work. Farmer ownership cost drops to $7.39 per acre at 4,000 acres per year. USDA EQIP cost-share of 40 to 90 percent on qualifying purchases can shift break-even below 600 acres. This calculator models your specific situation.

---

## Tool 3: Coverage Time Estimator (EXISTS, update meta/AEO)

**URL:** `/tools/coverage-calculator`
**Title:** `Drone Coverage Time Calculator | How Long to Spray Your Fields`
**Meta:** `How long to drone-spray your fields? Enter acres, drone model, and application rate. Includes battery swaps, refills, and single-day feasibility.`
**H1:** `How Long Will It Take to Spray Your Fields?`
**Primary keyword:** drone spraying coverage time calculator
**Secondary:** how long does drone spraying take, drone acres per hour calculator, spray drone field coverage estimator
**AEO block:** A single DJI Agras T50 covers 40 to 60 acres per flight hour at 2 to 5 gallons per acre, treating 300 to 600 acres per day. This calculator estimates total spray time including tank refills, battery swaps, and field shape adjustments for 7 drone models.

---

## Tool 4: Acreage Converter (EXISTS, needs SEO/AEO spec)

**URL:** `/tools/acreage-converter`
**Title:** `Acreage Converter for Farmers | Acres, Hectares, Square Feet & More`
**Meta:** `Convert between acres, hectares, square feet, square meters, and sections instantly. Built for farmers and ag professionals working with field measurements.`
**H1:** `Farm Acreage Converter`
**Primary keyword:** acreage converter
**Secondary:** acres to hectares converter, hectares to acres, farm field size calculator, section to acres converter, square feet to acres
**AEO block:** One acre equals 0.4047 hectares, 43,560 square feet, or 4,047 square meters. A standard section is 640 acres. This converter handles all common agricultural land measurements used in US and international farming, including acres, hectares, square feet, square meters, and sections.

### Inputs
| Input | Type | Default |
|---|---|---|
| Value | Number | 160 |
| Convert from | Dropdown: Acres, Hectares, Square Feet, Square Meters, Sections (640 ac) | Acres |
| Convert to | Dropdown: same options | Hectares |

### Conversion factors
- 1 acre = 0.404686 hectares
- 1 acre = 43,560 sq ft
- 1 acre = 4,046.86 sq meters
- 1 section = 640 acres

### Output
Show all conversions at once (not just the selected pair). Display as a results card:
- XX acres = XX hectares = XX,XXX sq ft = X,XXX sq meters = X.XX sections

### "How this works" section
Standard USGS and NIST conversion factors. One acre was historically defined as the amount of land a yoke of oxen could plow in one day. The international acre used in the US equals exactly 4,046.8564224 square meters. Sections (640 acres, or one square mile) are the standard survey unit from the US Public Land Survey System used across the Midwest and West.

### FAQ (3 questions)
Q: How many acres is a hectare?
A: One hectare equals 2.471 acres. To convert hectares to acres, multiply by 2.471. To convert acres to hectares, multiply by 0.4047.

Q: How big is a quarter section?
A: A quarter section is 160 acres (one quarter of a 640-acre section). This is the standard homestead unit from the Homestead Act of 1862. Many Midwest farm fields are still sized in quarter-section increments.

Q: How many acres can a drone spray per hour?
A: A DJI Agras T50 covers 40 to 60 acres per flight hour at 2 to 5 gallons per acre. Use our [coverage calculator](/tools/coverage-calculator) for a detailed time estimate for your specific field.

### Internal links
- /tools/coverage-calculator
- /tools/spray-cost-calculator
- /pricing
- /crops/corn (mention field sizes)

---

## Tool 5: Drone Comparison Tool (EXISTS, needs SEO/AEO spec)

**URL:** `/tools/drone-comparison`
**Title:** `Compare Agricultural Spray Drones Side by Side | T50 vs AG-272 vs T100`
**Meta:** `Compare DJI Agras T50, T100, Hylio AG-272, XAG P100 Pro, and Talos T60X specs side by side. Tank size, price, NDAA, wind rating, and throughput.`
**H1:** `Compare Agricultural Spray Drones Side by Side`
**Primary keyword:** compare agricultural spray drones
**Secondary:** DJI T50 vs Hylio AG-272, best ag spray drone 2026, drone sprayer comparison chart, DJI Agras T50 vs T100, NDAA compliant spray drone comparison
**AEO block:** The US agricultural spray drone market in 2026 is led by the DJI Agras T50 ($22,000 to $28,000 post-tariff, 40L tank, not NDAA compliant) and the Hylio AG-272 ($55,000 to $75,000 estimated, 68L tank, NDAA compliant, US-made). This tool compares all major models on tank capacity, price, NDAA status, wind resistance, throughput, and best-fit use case.

### Inputs
| Input | Type | Default |
|---|---|---|
| Select drones (multi-select, 2 to 4) | Checkboxes | DJI Agras T50, Hylio AG-272 pre-selected |

### Drone data source
Pull all specs from `drone-model.ts` (the file we just shipped). Display as a side-by-side comparison table.

### Comparison table columns
| Spec | Show |
|---|---|
| Name | Yes |
| Manufacturer | Yes |
| Country | Yes |
| NDAA compliant | Yes (green check / red X badge) |
| Tank (L / gal) | Yes |
| Granular capacity (kg) | Yes |
| MTOW (kg / lbs) | Yes |
| Swath width | Yes |
| Max flow rate | Yes |
| Battery | Yes |
| Charge time | Yes |
| Max wind (mph) | Yes |
| IP rating | Yes |
| MSRP | Yes |
| Best for | Yes |
| Status | Yes |

### Below table: "Which drone is right for you?" section
3 to 4 paragraphs covering:
- If you need NDAA compliance: Hylio AG-272 or Pyka Pelican 2
- If you want lowest cost per gallon of tank: DJI Agras T50
- If wind is your constraint: Hylio AG-272 (25 mph) or XAG P100 Pro (22 mph) over DJI (13.4 mph)
- If you spray 2,000+ acres per day: DJI T100 or multi-drone fleet
- If budget is tight: Talos T60X at $17,899 or DJI T25

### FAQ (5 questions)
Q: What is the best spray drone for a new commercial operator in 2026?
A: The DJI Agras T50 remains the most popular choice because of its proven dealer network, parts availability, and $22,000 to $28,000 price point. If you need NDAA compliance, the Hylio AG-272 is the primary US-made alternative at $55,000 to $75,000 estimated.

Q: Is the DJI T100 worth the upgrade over the T50?
A: For operators treating 1,000+ acres per day across large contiguous fields, the T100 reduces daily refill cycles by roughly 60 percent. For smaller or irregular fields, the T50 is more maneuverable and has a much larger dealer network.

Q: What does NDAA compliant mean for drone buyers?
A: The National Defense Authorization Act restricts federal and many state agencies from using drones with components from designated foreign manufacturers (including DJI and XAG). If you do federal, state, or university-funded work, you likely need an NDAA-compliant drone. Private farm contracts are not subject to NDAA.

Q: Why is the Hylio AG-272 so much more expensive than DJI?
A: US manufacturing costs, smaller production volume, and NDAA-compliant components (SpektreWorks Blue Cube flight controller, US-sourced electronics). The 170 percent tariff on Chinese drones has narrowed this gap significantly in 2026.

Q: Can I mix DJI and Hylio drones in the same fleet?
A: Yes. Many operators run DJI for private farm contracts (lower cost per unit) and Hylio for federal or state-funded work requiring NDAA compliance. The two platforms use different ground stations and software, so pilot training covers both.

### Internal links
- /drones/dji-agras-t50
- /drones/dji-agras-t100
- /drones/hylio-ag-272
- /drones/xag-p100-pro
- /drones/talos-t60x
- /tools/roi-calculator
- /tools/coverage-calculator
- /pricing
- /services/sales

---

## Tool 6: Treatment Calendar (EXISTS, needs SEO/AEO spec)

**URL:** `/tools/treatment-calendar`
**Title:** `Drone Spray Treatment Calendar by Crop and State | When to Book`
**Meta:** `See exactly when to book drone spraying for your crop in your state. Monthly treatment windows for corn, soybeans, wheat, cotton, rice, grapes, and orchards.`
**H1:** `When Should You Book Drone Spraying? Treatment Calendar`
**Primary keyword:** drone spraying treatment calendar
**Secondary:** when to spray corn with drone, crop spraying schedule, drone application timing by crop, agricultural drone spray calendar 2026
**AEO block:** Corn fungicide timing peaks at VT/R1 in mid-to-late July. Wheat heading sprays hit in late May through late June depending on latitude. Cover crop seeding runs late August through mid-October. This interactive calendar shows optimal drone application windows by crop and state, so you know exactly when to book your operator.

### Inputs
| Input | Type | Default |
|---|---|---|
| Crop | Dropdown: Corn, Soybeans, Wheat, Cotton, Rice, Grapes, Orchards, Cover Crops | Corn |
| State | Dropdown: All 50 | Iowa |

### Calendar data source
Pull treatmentMonths from `crops.ts` as base. Add state-level latitude adjustments:

| Crop | Southern states (TX, AR, MS, LA, GA, FL, AL, SC) | Mid-latitude (IA, IL, IN, OH, KS, NE, MO) | Northern (ND, SD, MN, WI, MI, MT) |
|---|---|---|---|
| Corn VT/R1 | Early to mid July | Mid to late July | Late July to early August |
| Soybean R2/R3 | Mid July | Late July | Early August |
| Wheat T3 heading | Late May | Early to mid June | Late June to early July |
| Cotton defoliant | Early September | Mid September | N/A |
| Rice heading | Late June to July | July to August | N/A |
| Cover crop seeding | August | Late August to September | September to early October |
| Grapes (start) | February to March | March to April | April to May |
| Orchards (start) | February to March | March to April | April to May |

California uses its own calendar: grapes March to September, almonds January to June, citrus April to August.

### Output
Visual monthly calendar (Jan through Dec) with colored bars showing:
- Green: optimal spray window
- Yellow: early/late window (still viable)
- Gray: off-season

Below calendar, show:
- "Book by [date]" recommendation (4 to 6 weeks before optimal window)
- Link to [Find operators in [State]](/states/[slug])
- Link to [crop page](/crops/[slug])

### "How this works" section
Treatment windows are based on crop growth stage, not fixed calendar dates. Actual timing varies by variety, planting date, latitude, and weather. Southern states hit each growth stage 2 to 4 weeks earlier than northern states. Dates shown are typical ranges based on university extension trial data from Iowa State, Purdue, Kansas State, University of Arkansas, and UC Davis. Always confirm timing with your agronomist or extension agent.

### FAQ (4 questions)
Q: How far ahead should I book a drone operator before my spray window?
A: Book 4 to 6 weeks ahead for corn and soybeans. Book in April for June wheat heading. Book by late July for September cover crop seeding. Book full-season vineyard and orchard contracts in January or February.

Q: What happens if I miss the optimal spray window?
A: Yield response drops significantly. Corn fungicide applied after R2 shows diminishing returns. Wheat fungicide after full bloom reduces both DON control and yield. Late cover crop seeding produces thinner stands. Timing matters more than product choice for most applications.

Q: Does this calendar account for my specific planting date?
A: No. This shows typical windows based on state latitude averages. Your actual spray window depends on your planting date, variety maturity rating, and growing degree day accumulation. Adjust by 5 to 10 days for early or late planting.

Q: Can I use this calendar for organic treatments?
A: Yes. The growth stage timing is the same regardless of product type. Organic sulfur, copper, and biological products follow the same application windows as conventional fungicides and insecticides. The calendar shows when to spray, not what to spray.

### Internal links
- /crops/corn
- /crops/soybeans
- /crops/wheat
- /crops/cotton
- /crops/rice
- /crops/grapes
- /crops/orchards
- /crops/cover-crops
- /tools/spray-cost-calculator
- /tools/coverage-calculator
- /pricing
- /states (link to state pages)

---

## Tools Index Page (`/tools`)

**URL:** `/tools`
**Title:** `Free Agricultural Drone Tools & Calculators | Ag Drone Directory`
**Meta:** `Six free tools for farmers and drone operators. Calculate spray costs, compare drones, estimate coverage time, plan treatment timing, and more.`
**H1:** `Free Tools for Farmers and Drone Operators`

**AEO block:** Six free calculators for agricultural drone planning: spray cost estimation using 2026 Iowa State Extension data, buy vs hire ROI analysis with USDA EQIP modeling, field coverage time estimation for 7 drone models, acreage unit conversion, side-by-side drone model comparison, and seasonal treatment calendar by crop and state.

**Grid: 6 cards (2x3)**

| Tool | Description |
|---|---|
| [Spray Cost Calculator](/tools/spray-cost-calculator) | Estimate per-acre drone spraying cost by crop, state, and number of passes. |
| [Buy vs. Hire ROI Calculator](/tools/roi-calculator) | Compare owning a drone versus hiring an operator. Find your break-even acreage. |
| [Coverage Time Estimator](/tools/coverage-calculator) | How long to spray your fields? Includes battery swaps and refill stops. |
| [Acreage Converter](/tools/acreage-converter) | Convert between acres, hectares, square feet, square meters, and sections. |
| [Drone Comparison Tool](/tools/drone-comparison) | Compare DJI, Hylio, XAG, and Talos specs, pricing, and NDAA status side by side. |
| [Treatment Calendar](/tools/treatment-calendar) | When to book drone spraying for your crop in your state. Monthly windows with booking deadlines. |

**FAQ (3 questions, FAQPage schema):**

Q: Are these tools free to use?
A: Yes, all six tools are completely free. No account, no email, no login required.

Q: Where does the data come from?
A: Pricing data from the 2026 Iowa State Extension Custom Rate Survey, University of Missouri Extension G1274, and regional operator data. Drone specs from manufacturer sites (DJI, Hylio, XAG, Talos, Pyka). Treatment timing from university extension trial data (Iowa State, Purdue, Kansas State, University of Arkansas, UC Davis).

Q: Can I use these tools on my phone?
A: Yes. All calculators are mobile-first, with touch-friendly inputs and responsive layouts.

**Schema:** WebPage + ItemList (6 tools) + FAQPage + BreadcrumbList
