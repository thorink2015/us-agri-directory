# Claude Code Prompt: Homepage V1 Design Restoration

## Task

Refactor the homepage (`src/app/page.tsx` and related components) to restore V1's design language while keeping V2's SEO content. This is a design revert with content merge, not a full rewrite.

## Step 0: Orientation

1. Run `git log --oneline -20 src/app/page.tsx` to find the V1 homepage commit (before the V2 rewrite).
2. Run `git log --oneline -20 src/components/` to find V1 components that may have been replaced.
3. Read the current `src/app/page.tsx` to understand V2's structure.
4. Check if V1 components still exist in the codebase or need restoration from git history. Look for: HeroSection, WhySection, HowItWorks, FeaturedOperators, StatsRow, ServiceCards, or similar V1 component names.
5. Read `src/data/operators.ts`, `src/data/services.ts`, `src/data/crops.ts` to understand data sources.

## Step 1: Hero Section

Restore V1 hero design:
- Dark green background (#1a5632 or match V1)
- Green pill badge above H1: "{{operatorCount}}+ verified ag drone operators listed"
- H1: "Find a **Drone Spraying Service** Near Your Farm" with "Drone Spraying Service" in yellow/gold
- Subhead in white: "Search verified ag drone operators across all 50 states. Compare services, check credentials, and book the right pilot for your fields."
- Single state dropdown + green "Find Operators" button (remove the second service-type dropdown from V2)
- Below search bar, add top states links in light text: "Top states: Iowa | Texas | California | Illinois | Arkansas | Kansas | View all states" with pipe separators. Each links to /states/[slug].
- Remove the 3 inline bullet stats from V1 ("131+ operators listed | All 50 states covered | 425K+ acres serviced"). The top states links replace them.

## Step 2: Remove Author Elements from Homepage

- Remove the author photo (eugen-author.jpg) from the homepage
- Remove the "By Eugen, Founder and Editor" byline
- Remove the "Updated April 16, 2026" date line
- Keep these elements in schema/structured data and on /about page, just not visible on homepage

## Step 3: AEO Block

The green left-border AEO callout currently sits between hero and stats. Keep it but remove the author photo and byline from it. Content stays:

"US agricultural drone spraying covered an estimated 10.3 million acres in 2024, with per-acre rates ranging from $12 on flat Midwest row crops to $35 on California hillside vineyards. The 2026 Iowa State Custom Rate Survey established the first university benchmark at $12.50 per acre average for drone application. This directory lists {{operatorCount}}+ operators across all 50 states with FAA Part 107 and Part 137 credentials verified."

If the AEO block looks too prominent without the author element, reduce its visual weight but keep it visible (not hidden).

## Step 4: Stats Row

Keep V1's 4-card design with small green SVG icons above each number. Values:
- {{operatorCount}}+ / Verified operators
- {{stateCount}} / States covered
- 10.3M+ / Acres drone-sprayed in 2024
- $12.50/acre / Iowa State 2026 avg rate

Small source line: "Acreage: American Spray Drone Coalition. Pricing: Iowa State Extension 2026 Custom Rate Survey."

## Step 5: Why Farmers Use This Directory

Restore V1's trust section. 4 cards with green circle checkmark icons (not emoji).

Cards:
1. **Verified operators only** - Every listed operator holds a valid FAA Part 107 certificate and Part 137 agricultural exemption. We confirm credentials so you don't have to chase paperwork.
2. **Search by crop and location** - Filter operators by your state, county, crop type, and service needed. Whether you grow corn in Iowa or grapes in Napa, find someone who knows your operation.
3. **Transparent pricing** - See estimated per-acre rates before you reach out. No guessing, no surprise quotes. Know what drone spraying costs in your area before you pick up the phone.
4. **Direct contact** - Reach operators directly by phone, email, or web form. No intermediaries, no platform fees, no commission taken from either side.

## Step 6: Services Section

Restore V1's icon design. Replace all emoji icons with clean single-color SVG icons (use Lucide React or custom SVGs in the site's green brand color).

H2: "Drone services for every operation"
Subhead: "From corn fungicide to vineyard treatments and aerial imaging"

Add a small "All services" link/button in the header area linking to /services.

6 cards, each with: SVG icon, service name, 1-line description, price range. Use the ACTUAL service slugs from services.ts so links work correctly.

| Service | Slug | Icon suggestion | Description | Price |
|---|---|---|---|---|
| Drone Spraying | spraying | Droplets | Fungicides, herbicides, insecticides, defoliants | $12 to $22/acre |
| Cover Crop Seeding | seeding | Sprout | Broadcast cereal rye, ryegrass, and clover blends | $12 to $18/acre |
| Aerial Mapping | mapping | Map | NDVI maps, orthomosaics, and prescription files | $2 to $8/acre |
| Crop Monitoring | monitoring | ScanEye or Radar | Pest pressure, disease, stress identification | $3 to $10/acre |
| Granular Spreading | spreading | Settings or Cog | Urea, gypsum, lime, and cover crop seed | $10 to $18/acre |
| Drone Sales | sales | ShoppingCart | New and used ag drones from authorized dealers | $18K to $75K |

Each card links to /services/[slug]. Pull names and prices from services.ts data where possible.

## Step 7: Crops Section

Keep V2's crop card design (it's better than V1 for this section). 8 compact cards with crop image/emoji, name, spray window, price range, and "Find operators" link. No changes to content or layout.

## Step 8: Featured Operators

Restore V1's operator card design but cap at exactly 3 cards (not 6). Filter by `featured: true` from operator data. If more than 3 are featured, take the first 3.

H2: "Featured operators this season"
Subhead: "Verified, insured, and actively booking"
Right link: "View all operators" pointing to /operators.

## Step 9: States Section (major simplification)

Replace the massive region-grouped state grid with a compact single section.

H2: "Find drone services in your state"

Show a horizontal row of 6 to 8 top states (by operator count). Each shows state name + operator count in a small card or inline link. Right-aligned "All states" link pointing to /states.

The full 50-state grid stays in the footer (collapsible) and on the /states page.

## Step 10: How It Works

Restore V1's 3-step section. Place it after featured operators / states.

H2: "How it works"
Subhead: "Find the right drone applicator in 3 steps"

3 cards with green "Step N" badges:
1. **Search your area** - Enter your state, county, or zip code. Add your crop type and the service you need: fungicide spraying, cover crop seeding, or aerial mapping.
2. **Compare operators** - Browse operator profiles side by side. Review equipment, certifications, coverage area, per-acre rates, and farmer ratings.
3. **Contact and book** - Reach out directly to operators that fit your needs. Request quotes, ask questions, and schedule your application window.

Green "Find an Operator" CTA button below, linking to /operators.

## Step 11: Tools Section

Keep V2's tools section as-is. 3 calculator cards. No changes.

## Step 12: FAQ

Keep V2's FAQ content (5 questions). Restore V1's accordion design if it differs from current. Ensure FAQPage schema is applied.

## Step 13: Drones Section

Keep V2's drone section as-is. 4 model cards in a row. No changes.

## Step 14: Blog Section

Keep V2's blog section as-is. 3 cards. No changes.

## Step 15: Newsletter + Operator CTA

Restore V1's newsletter section design (left side: copy + bullet points, right side: email input + subscribe button).

Below or alongside it, keep V2's operator CTA block (green background, "Grow your drone business. Get listed free." copy with 3 checkmark bullet points and CTA button).

## Step 16: Footer

Remove the visible "Edited by Eugen. Every page personally researched and updated." text from the footer.

Keep: copyright line "© 2026 US Ag Drone Directory", 4-column link grid, newsletter mini-form, collapsible all-50-states grid, Privacy/Terms links.

## Final Section Order on Page

1. Hero
2. AEO block (green left-border, no author)
3. Stats row
4. Why farmers use this directory
5. Services
6. Crops
7. Featured operators (3 max)
8. States (compact row)
9. How it works
10. Tools
11. FAQ
12. Drones
13. Blog
14. Newsletter + Operator CTA
15. Footer

## Rules

- No double dashes anywhere ("--" or em dashes). Use "to" for ranges.
- No emoji as SERVICE icons. Replace 💧🌱🗺️📡⚙️🛒 with Lucide React SVG icons in the site's green brand color. Crop icons (🌽🫘🌾🍇🍎🌱 etc) from crops.ts data are fine to keep since they represent actual crops.
- No author photo on homepage.
- No "Edited by" visible text on homepage or footer.
- All dynamic values (operatorCount, stateCount) must render correctly.
- Maintain all existing schema markup.
- Do not break any existing internal links.
- If V1 components cannot be found in git history, build them fresh to match this spec. Do not fall back to V2 design.
- Run `npm run build` after all changes to verify zero errors.
- Commit: `refactor: homepage V1 design restoration with V2 SEO content`
- Push to main.
