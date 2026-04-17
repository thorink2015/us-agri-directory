# Calculator Specs: 3 Interactive Tools

Build all 3 as client-side React components (`'use client'`) with server-rendered page wrappers for SEO. Each tool page gets: AEO block, the interactive calculator, a "How we calculated this" explainer section, FAQ with FAQPage schema, Article + BreadcrumbList + SoftwareApplication schema, byline, author card.

---

## Tool 1: Spray Cost Calculator

**URL:** `/tools/spray-cost-calculator`
**Title tag:** `Drone Spraying Cost Calculator (2026 Rates) | Ag Drone Directory`
**Meta description:** `Estimate your drone spraying cost per acre. Enter acres, crop, and state for an instant quote range based on 2026 university and operator data.`
**H1:** `Drone Spray Cost Calculator`
**Primary keyword:** drone spraying cost calculator

### AEO Block
Drone crop spraying costs $12 to $35 per acre in 2026 depending on crop, region, and terrain. This calculator uses the 2026 Iowa State Custom Rate Survey benchmark of $12.50 per acre average plus regional and crop-specific adjustments from university extension data and operator pricing.

### Inputs

| Input | Type | Options/Range | Default |
|---|---|---|---|
| Total acres | Number input | 10 to 10,000 | 160 |
| Crop type | Dropdown | Corn, Soybeans, Wheat, Cotton, Rice, Grapes/Vineyards, Orchards, Cover Crops, Other | Corn |
| State | Dropdown | All 50 states | Iowa |
| Number of passes per season | Number input | 1 to 15 | 1 |
| Who supplies chemical? | Toggle | Farmer supplies / Operator supplies | Farmer supplies |

### Pricing Data (hardcoded lookup from research-04)

**Base rate by crop ($/acre, application only):**
- Corn: 14 to 17
- Soybeans: 12 to 16
- Wheat: 12 to 16
- Cotton: 14 to 18
- Rice: 15 to 20
- Grapes/Vineyards: 18 to 30
- Orchards: 15 to 21
- Cover Crops: 12 to 18
- Other: 13 to 18

**Regional multiplier (applied to base rate):**
Map each state to a region, apply multiplier:
- Corn Belt states (IA, IL, IN, OH, MO, MI, WI, MN): 1.0 (baseline)
- Great Plains (KS, NE, ND, SD, MT, WY, CO, OK, NM): 0.95
- Texas: 1.0
- Delta (AR, LA, MS): 1.05
- California: 1.4
- Southeast (GA, AL, FL, SC, NC, VA, WV): 1.15
- Pacific NW (WA, OR, ID): 1.1
- Northeast (PA, NY, NJ, CT, MA, ME, NH, VT, RI, DE, MD): 1.2
- Mountain (UT, NV, AZ): 1.15
- Other/default: 1.1

**Chemical cost estimate (if operator supplies, add per acre):**
- Fungicide: $10 to $20/acre
- Herbicide: $8 to $15/acre
- Insecticide: $8 to $18/acre
- Defoliant: $6 to $12/acre
- Cover crop seed: $10 to $18/acre
Use crop type to determine chemical category. For "operator supplies" toggle, add midpoint of range.

### Formula
```
lowRate = cropBaseLow * regionalMultiplier
highRate = cropBaseHigh * regionalMultiplier
totalLow = lowRate * acres * passes
totalHigh = highRate * acres * passes
If operator supplies chemical: add chemicalMidpoint * acres * passes
```

### Outputs (displayed as a results card)

- Estimated per-acre rate: $XX to $XX
- Total cost for [acres] acres, [passes] pass(es): $X,XXX to $X,XXX
- If operator supplies chemical: "Includes estimated chemical cost of $XX/acre"
- If farmer supplies: "Application only. Chemical cost is additional."
- Small note: "Based on 2026 Iowa State Extension and regional operator data. Actual quotes may vary."

### Below calculator: "How we calculated this"

Rates based on the 2026 Iowa State Custom Rate Survey ($12.50/acre average, $8 to $16 range) with crop-specific adjustments from University of Missouri Extension G1274, Indiana Prairie Farmer operator data, and regional pricing analysis. Vineyard and orchard rates reflect UC Davis and Washington State University extension data. Calculator provides estimates only. Contact operators directly for actual quotes.

### FAQ (3 questions, FAQPage schema)

Q: How accurate is this calculator?
A: It uses 2026 university extension benchmarks and regional operator data. Actual quotes vary by field layout, distance from operator base, field accessibility, and time of season. Use this as a starting range, then contact operators for firm quotes.

Q: Does this include the cost of the chemical product?
A: By default, no. Toggle "Operator supplies chemical" to add an estimated chemical cost. Most farmers supply their own product and pay the operator for application only.

Q: Why does California cost so much more than Iowa?
A: Terrain complexity (steep vineyard slopes, dense orchard canopy), CDPR regulatory overhead, and 8 to 12 spray passes per season versus 1 to 2 for Midwest row crops.

---

## Tool 2: Buy vs. Hire ROI Calculator

**URL:** `/tools/roi-calculator`
**Title tag:** `Buy a Drone or Hire an Operator? ROI Calculator | Ag Drone Directory`
**Meta description:** `Should you buy a spray drone or hire a custom operator? Compare ownership cost versus custom hire rates with USDA EQIP cost-share and financing.`
**H1:** `Buy vs. Hire: Drone ROI Calculator`
**Primary keyword:** drone spraying ROI calculator

### AEO Block
University of Missouri Extension research puts the break-even for DJI Agras T40 ownership at approximately 980 acres per year of custom application work. Farmer ownership cost drops from $12.27 per acre at 1,000 acres to $7.39 per acre at 4,000 acres per year. USDA EQIP cost-share of 40 to 90 percent on qualifying purchases can shift break-even below 600 acres.

### Inputs

| Input | Type | Options/Range | Default |
|---|---|---|---|
| Annual acres you plan to spray | Number input | 100 to 10,000 | 1,000 |
| Drone model | Dropdown | DJI Agras T50 ($25,000), DJI Agras T25 ($18,000), Hylio AG-272 ($65,000), Talos T60X ($18,000) | DJI Agras T50 |
| Ownership years | Dropdown | 3, 5, 7 | 5 |
| EQIP cost-share (%) | Slider | 0 to 75 | 0 |
| Interest rate (%) | Number input | 0 to 15 | 7 |
| Custom hire rate ($/acre) | Number input | 8 to 40 | 14 |
| Batteries included | Number input | 2 to 8 | 4 |
| Battery cost each ($) | Number input | 500 to 3,000 | 1,200 |

### Constants (from MU Extension G1274)
- Annual insurance: $1,200
- Annual maintenance and repairs: 8% of drone purchase price
- Generator fuel per acre: $0.43
- Battery replacement: every 500 charge cycles (estimate 2 years at heavy use)
- Pilot labor: $0 (owner-operator assumed)

### Formula
```
droneNetCost = dronePrice * (1 - eqipPct/100) + (batteries * batteryCost)
annualPayment = droneNetCost * (rate * (1+rate)^years) / ((1+rate)^years - 1)  // standard amortization
annualInsurance = 1200
annualMaintenance = dronePrice * 0.08
annualFuel = acres * 0.43
annualBatteryReplace = (batteries * batteryCost) / 2  // replaced every ~2 years
totalAnnualOwnership = annualPayment + annualInsurance + annualMaintenance + annualFuel + annualBatteryReplace
ownershipCostPerAcre = totalAnnualOwnership / acres

annualHireCost = acres * customHireRate
hireCostPerAcre = customHireRate

savings = annualHireCost - totalAnnualOwnership
breakEvenAcres = totalAnnualOwnership / customHireRate  // excluding per-acre variable costs, simplified
```

### Outputs

**Results card with two columns: "Own" vs "Hire"**

| | Own | Hire |
|---|---|---|
| Annual cost | $XX,XXX | $XX,XXX |
| Cost per acre | $XX.XX | $XX.XX |
| 5-year total | $XXX,XXX | $XXX,XXX |

**Verdict line (bold):**
- If savings > 0: "Owning saves you $X,XXX per year ($X.XX per acre) at {{acres}} acres."
- If savings < 0: "Hiring is $X,XXX per year cheaper at {{acres}} acres. Break-even is approximately {{breakEvenAcres}} acres per year."
- If close (within 10%): "At {{acres}} acres, owning and hiring cost about the same. Ownership makes sense if you value scheduling control and plan to grow acreage."

**EQIP callout (if eqipPct > 0):** "EQIP cost-share reduces your drone purchase from $XX,XXX to $XX,XXX, lowering break-even to {{breakEvenAcres}} acres per year."

### FAQ (3 questions)

Q: What is the real break-even for owning a spray drone?
A: University of Missouri Extension puts it at roughly 980 acres per year at a $16/acre custom hire rate with no EQIP cost-share. With 50% EQIP, break-even drops to approximately 600 acres. Below 500 acres per year, hiring is almost always cheaper.

Q: Does this calculator include chemical costs?
A: No. Chemical cost is the same whether you own or hire, so it cancels out. This compares only the application cost: owning your equipment versus paying someone else to apply.

Q: Should I buy a T50 or a T25 to start?
A: If you will spray over 1,000 acres per year, the T50 daily throughput advantage pays for itself. Under 800 acres, the T25 saves $5,000 to $8,000 upfront with identical spray quality.

---

## Tool 3: Coverage Time Estimator

**URL:** `/tools/coverage-calculator`
**Title tag:** `Drone Coverage Time Calculator | How Long to Spray Your Fields`
**Meta description:** `How long will it take to drone-spray your fields? Enter acres, drone model, and application rate for an instant time estimate with battery swaps and refills.`
**H1:** `How Long Will It Take to Spray Your Fields?`
**Primary keyword:** drone spraying coverage time calculator

### AEO Block
A single DJI Agras T50 covers 40 to 60 acres per flight hour at 2 to 5 gallons per acre, treating 300 to 600 acres per day. Field shape, application rate, battery swap time, and tank refill logistics determine actual coverage. This calculator estimates total time including all stops.

### Inputs

| Input | Type | Options/Range | Default |
|---|---|---|---|
| Total acres | Number input | 10 to 5,000 | 160 |
| Drone model | Dropdown | DJI Agras T50 (40L), DJI Agras T100 (100L), DJI Agras T25 (20L), Hylio AG-272 (68L), Hylio AG-230 (30L), XAG P100 Pro (50L), Talos T60X (50L) | DJI Agras T50 |
| Application rate (gpa) | Dropdown | 2, 3, 5, 10, 15 | 3 |
| Field shape | Dropdown | Square/rectangular, Irregular, Narrow/strip | Square/rectangular |
| Fleet size | Number input | 1 to 5 | 1 |

### Drone performance data (from research-04 specs)

| Model | Tank (gal) | Acres/tank at 3 gpa | Flight time (min) | Charge time (min) | Swap/refill (min) |
|---|---|---|---|---|---|
| DJI T50 | 10.6 | 3.5 | 8 | 10 | 3 |
| DJI T100 | 26.4 | 8.8 | 10 | 9 | 4 |
| DJI T25 | 5.3 | 1.8 | 7 | 10 | 3 |
| Hylio AG-272 | 18 | 6.0 | 9 | 28 | 4 |
| Hylio AG-230 | 8 | 2.7 | 8 | 28 | 3 |
| XAG P100 Pro | 13.2 | 4.4 | 9 | 15 | 3 |
| Talos T60X | 13.2 | 4.4 | 9 | 12 | 3 |

### Formula
```
acresPerTank = tankGallons / applicationRateGpa
tanksNeeded = ceil(acres / acresPerTank)
totalFlightTime = tanksNeeded * flightTimeMin
totalChargeTime = tanksNeeded * chargeTimeMin  // assumes rotating batteries
totalSwapTime = tanksNeeded * swapRefillMin
shapeMultiplier = { square: 1.0, irregular: 1.15, narrow: 1.25 }
grossMinutes = (totalFlightTime + totalSwapTime) * shapeMultiplier
// charge time overlaps with flight if enough batteries, so only add if charge > flight
chargeBottleneck = max(0, totalChargeTime - totalFlightTime)
totalMinutes = grossMinutes + chargeBottleneck
totalMinutesWithFleet = totalMinutes / fleetSize
hours = floor(totalMinutesWithFleet / 60)
minutes = totalMinutesWithFleet % 60
```

### Outputs

- Estimated total time: X hours, XX minutes
- Tank refills needed: XX
- Battery swaps: XX
- Effective acres per hour: XX
- **Single-day verdict:**
  - Under 8 hours: "Completable in a single spray day."
  - 8 to 14 hours: "Tight for a single day. Consider adding a second drone or splitting across two days."
  - Over 14 hours: "Multi-day job. A fleet of {{recommended}} drones would complete this in one day."

### FAQ (3 questions)

Q: Why does field shape affect spray time?
A: Irregular and narrow fields require more turns, slower flight lines, and more overlap at edges. A square 160-acre field sprays 15 to 25 percent faster than the same acreage in an L-shaped or strip configuration.

Q: How many batteries do I need to spray all day?
A: For a T50 running 8 hours, plan on 4 to 6 batteries rotating through the charger. With the DJI rapid charging hub, 4 batteries keep a single drone running continuously. Hylio AG-272 longer charge times (28 min) mean you need 6 to 8 batteries for continuous operation.

Q: Does adding a second drone really cut time in half?
A: Close to it, yes. A 2-drone crew shares the same water and chemical supply station, so refill logistics run in parallel. Actual improvement is roughly 1.8x to 1.9x (not a perfect 2x) because of shared logistics bottlenecks.

---

## Shared elements for all 3 calculator pages

**Schema per page:**
- SoftwareApplication (name, applicationCategory: "Agriculture", operatingSystem: "Web")
- Article with author and publisher @id refs
- BreadcrumbList: Home > Tools > [Calculator Name]
- FAQPage

**Internal links per page:**
- /pricing
- /services/spraying
- /crops/corn (or relevant crop)
- /drones/dji-agras-t50
- The other 2 calculator pages
- /list-your-business
- /states (link to operator search)

**Byline and author card:** same pattern as all content pages.

**Mobile:** All inputs stack vertically. Results card is full-width. Touch-friendly number inputs with +/- steppers.
