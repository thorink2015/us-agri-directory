# Operator Updates Batch 001

## Instructions for Claude Code

You know this codebase. Find files yourself, don't ask. References below use operator slugs only (the path segment after `/operators/`), so locate the matching entries in the operators data file and update in place.

### Hard rules

1. **Do not break anything that currently works.** Do not refactor, do not "improve" unrelated code, do not change schema fields not listed here, do not touch unrelated operators, do not modify routing or layout for pages outside the scope of this batch.

2. **Reuse existing patterns.** New badges, fields, filters, and pages must follow the same structure and styling as existing equivalents (look at how Featured, Part 137, NDAA Compliant badges are implemented and match that pattern).

3. **Small, atomic commits.** One commit per operator update, one commit per global change (badges, drone additions, filters). Clear commit messages.

4. **If unsure, choose the safer option.** If you can't find a clear pattern to follow, leave it alone and flag it in the verification report at the end. Do not invent a solution.

5. **Verify before committing each change.** Build locally, check the affected page renders, check the slug returns 200.

---

## 1. NEW GLOBAL FEATURES

### 1.1 Add a "Verified" badge

Add a new visual badge for operators where `verified: true`. Distinct from any existing badge on the directory. Reuse the same component pattern as Featured / FAA Part 137 / NDAA Compliant badges, but visually unique (different icon and color, e.g. a checkmark shield or seal in the brand green, with "Verified Operator" label).

Show the Verified badge on:
- Operator card (listing pages, state pages, services pages, homepage feature)
- Operator profile page header
- Any place where Featured or Part 137 badges appear

Add `verified: boolean` to the operator schema if it doesn't exist yet. Default false.

### 1.2 Add `pendingConfirmation` rendering

Add `pendingConfirmation: boolean` to the operator schema if it doesn't exist yet. Default false.

When `pendingConfirmation: true`, render a small neutral notice at the top of the operator profile page (above the about section):

> "This profile was built from public records and is awaiting verification by the operator."

Style it subtle and grey, small font. Hide automatically when `pendingConfirmation` flips to false.

An operator should never have both `verified: true` and `pendingConfirmation: true` at the same time. If both are set, treat `pendingConfirmation` as the source of truth and remove `verified`.

### 1.3 New tag fields

Add to operator schema if not present, all defaulting to false:

- `veteranOwned: boolean`
- `nonProfit: boolean`
- `womenLed: boolean`

For each, add a small badge to the operator card and profile (same component pattern as existing badges, distinct icon and color). Add filter checkboxes in the operator listing sidebar.

### 1.4 Empty contact info handling

When an operator profile has empty `phone` and empty `email`, replace the blank contact section with:

> "Contact info not yet provided. If this is your business, claim your listing to add direct contact details."

Link "claim your listing" to the existing operator-claim form.

### 1.5 New drone models

Add to drones data file with specs from the manufacturer site. Create `/drones/[slug]` pages following the existing template.

| Slug | Name | Manufacturer | Source URL |
|---|---|---|---|
| `joyance-j100` | Joyance J100 | Joyance | joyance.com |
| `joyance-j150` | Joyance J150 | Joyance | joyance.com |
| `ceres-air-c31` | Ceres Air C31 (Black Betty Stacked) | Ceres Air | search ceresair.com |
| `leadingedge-pv40x` | LeadingEdge PV40X | LeadingEdge Aerial Technologies | leadingedge-aerial.com |

If you can't fetch reliable specs, create the drone entry with name + manufacturer only and flag it in the report for manual completion. Do not invent specs.

---

## 2. BUG FIXES

### 2.1 Duplicate slugs: Kuhn's Aerial Applications

Two entries exist:
- `kuhn-s-aerial-applications-llc`
- `kuhns-aerial-applications`

Pick the more complete one as canonical. Delete the other. Add a 301 redirect from the deleted slug to the canonical one. Update sitemap.

### 2.2 Repo-wide duplicate sweep

Scan the operators data file for any other duplicate operators (variants of slug, name, or website). Report findings before merging or deleting. Do not auto-merge.

### 2.3 Broken slug / 404: American Drone

`american-drone-llc` returns 404. See section 4.3 below to rebuild under slug `american-drone`.

---

## 3. UPDATE EXISTING OPERATORS

For each operator below, find the entry in the data file, update only the listed fields, and set `lastUpdated` to today's date.

### 3.1 `usar-drone-team`

```
verified: true
email: usardroneteam@gmail.com
veteranOwned: true
nonProfit: true
descriptionAddition: "Veteran-based non-profit drone services group."
```

### 3.2 `rafter-7-agritech`

```
verified: true
ownerName: Rodney "Rod" Brents
phone: 325-513-4135
email: rafter7.rod@gmail.com
statesCovered: Texas, Oklahoma, New Mexico
drones: Joyance J100, Joyance J150
services: spraying, brush control (Brush Bullet), pasture management, right-of-way, solar farm spraying
crops: cotton, corn, pasture, rangeland
tagline: "No job too big or too small"
description: "Texas-based operator covering TX, OK, and NM. Retired ag teacher who combines traditional ranching with drone technology."
website: rafter7agritech.com
```

Remove any older drone references that don't match the Joyance fleet.

### 3.3 `pro-ag-solutions`

```
verified: true
ownerName: Cory Palm (Chief Pilot)
email: proagsolutionsnd@gmail.com
founded: 2021
statesCovered: North Dakota, Minnesota, South Dakota
licensedIn: ND, MN, SD
drones: DJI Agras T30, DJI Agras T40, DJI Agras T50, DJI Agras T60x, Ceres Air C31 (Black Betty Stacked)
services: row crop spraying, pasture spraying, CRP, aquatic spraying, right-of-way spraying, multispectral imaging, multispectral mapping, soil sampling, cover crop spreading, seed spreading, fertilizer spreading
certifications: FAA Part 137 licensed
teamSize: 6 licensed Part 107 pilots, 4 ground operations personnel
description: "Pro Ag Solutions was founded in 2021 by Cory Palm. Cory has an Associates Degree in Ag Aviation, then worked as an Agronomist for 20 years before stepping back into aerial application using drones. Starting with just a trailer and a DJI T30, Pro Ag Solutions has grown into a full fleet of drones and support vehicles."
```

Remove any Rantizo affiliation, mention, or partnership reference from this entry.

### 3.4 `cover-crop-innovations`

```
verified: true
email: covercropinnovations@gmail.com
phone: 978-430-0415
address: 65 Central Street, Concord, Massachusetts 01742
city: Concord
state: Massachusetts
website: covercropinnovations.com
```

### 3.5 `swift-aeroseed`

```
pendingConfirmation: true
email: molly@swiftaeroseed.com
coFounders: Molly Cheatum, Bill Chain
city: Carlisle
state: Pennsylvania
county: Cumberland
services: aerial cover crop seeding, native grass and broadleaf seeding, meadow and grass buffer seeding, wildlife habitat seeding, multispecies seed mixes, conservation cost-share program connection
drones: LeadingEdge PV40X
crops: corn, wheat, soybeans, pasture, wildlife habitat
partnerships: King's Agriseed
awards: Pennsylvania Agricultural Innovation Grant ($52,000)
womenLed: true
description: "Pennsylvania-based agricultural drone seeding company specializing in regenerative cover crop establishment, native grass and habitat seeding. Co-founded by Molly Cheatum and Bill Chain."
```

### 3.6 RENAME: Flying Cowboy Photography to Flying Cowboy Ag Services

Find the existing operator under the slug containing "flying-cowboy" (probably `flying-cowboy-photography`). Rename the entry to `Flying Cowboy Ag Services`, update the slug to `flying-cowboy-ag-services`, and add a 301 redirect from the old slug.

```
verified: true
name: Flying Cowboy Ag Services
ownerExperience: 11 years flying drones, 21 years applying pesticides
city: Robinson
state: Texas
county: Texas (verify)
services: spraying, spreading, monitoring, mapping, training, sales, seeding
crops: corn, soybeans, wheat, cotton, rice, grapes, orchards, cover crops
drones: DJI Agras T50
pricePerAcre: 12
website: flyingcowboyphoto.com
phone: 254-315-6877
email: FlyingCowboyPhoto@gmail.com
description: "Flying Cowboy Ag Services offers the most precise custom applications in Central Texas. 11 years flying drones, 21 years applying pesticides."
featuredCredential: "21 years pesticide application experience"
```

Display the `featuredCredential` prominently in the profile page header or top of the about section, not buried.

---

## 4. ADD NEW OPERATORS

### 4.1 `fortis-aerial`

```
verified: true
name: Fortis Aerial
ownerName: Curtis
ownerType: Single owner/operator
city: Runnells
state: Iowa
county: Polk (verify)
services: spraying
crops: corn, soybeans, grapes, orchards, cover crops
drones: DJI Agras T50
pricePerAcre: 15
website: fortisaerial.com
phone: 515-993-0848
email: curtis@fortisaerial.com
description: "Single owner/operator servicing Central Iowa. We help with pasture management, hobby farms, and large row crop fungicide applications."
```

### 4.2 `hazel-hill-drone-services`

```
verified: true
name: Hazel Hill Drone Services LLC
city: Arbela
state: Missouri
county: Scotland (verify)
statesCovered: Missouri, Iowa
services: spraying, spreading, seeding
crops: corn, soybeans, wheat, orchards, cover crops
drones: DJI Agras T100
pricePerAcre: 15
website: hazelhilldroneservices.com
phone: 660-460-7477
email: hazelhilldroneservices@gmail.com
licensedAndInsured: true
founded: 2023
description: "Hazel Hill Drone Services LLC provides professional agricultural drone spraying across Northeast Missouri and surrounding areas. We specialize in precision application of herbicides, fungicides, pesticides, and fertilizers using advanced drone technology. Our services help farmers reduce crop damage, improve efficiency, and spray fields that traditional equipment can't reach. Fast scheduling, reliable service, and results you can trust. Fully Licensed and Insured since 2023."
```

### 4.3 `american-drone` (rebuild after 404 fix)

Slug: `american-drone`. Add a 301 redirect from `american-drone-llc` to `american-drone`.

Source: public profiles only (Brownfield Ag News, Farm News, The Business News, Leader-Telegram, ProfitProAG). Mark `pendingConfirmation: true`.

```
pendingConfirmation: true
name: American Drone LLC
ownerName: Jeramy Williams (CEO and Founder)
city: Marshfield
state: Wisconsin
county: Marathon (verify)
founded: 2020
statesCovered: Wisconsin and surrounding states
services: custom liquid application, custom dry application, cover crop seeding, crop monitoring, drone sales, drone training
businessType: Operator and Dealer
drones: DJI Agras (models pending), XAG (models pending), DJI Agras T100
crops: corn, soybeans, cranberry marshes, orchards, forestry
credentials: Largest custom drone applicator in Wisconsin, largest ag drone dealer in Wisconsin, FAA Part 108 testimony in Washington DC, partnership with ProfitProAG
website: americandrone.us
email: jeramy@americandrone.us
phone: 262-443-9177
description: "Wisconsin-based agricultural drone applicator and dealer founded by Jeramy Williams in 2020. Provides custom liquid and dry applications, cover crop seeding, and crop monitoring across Wisconsin and surrounding states. Also a full-service drone dealer offering equipment, training, and licensing support for farmers and new operators."
```

---

## 5. POST-COMMIT VERIFICATION

After all commits, run:

1. Curl every operator slug listed above. Confirm 200, not 404, not 500.
2. Confirm 301 redirects work for the renamed and deleted slugs (Kuhn's, American Drone, Flying Cowboy).
3. Confirm new drone pages render at `/drones/joyance-j100`, `/drones/joyance-j150`, `/drones/ceres-air-c31`, `/drones/leadingedge-pv40x`.
4. Confirm Verified badge appears on every operator with `verified: true` (cards, listings, profile headers).
5. Confirm `pendingConfirmation` notice appears on Swift Aeroseed and American Drone profiles only.
6. Confirm Veteran-Owned, Non-Profit, Women-Led badges appear on the right operators (USAR, Swift Aeroseed).
7. Confirm new filter checkboxes work on the operator listing sidebar.
8. Confirm "claim your listing" notice appears on at least one operator with empty phone and email.
9. Regenerate sitemap. Submit via IndexNow.
10. Run a build, confirm no TypeScript errors, no broken imports, no failed pages.

### Final report

End with a summary listing:

- Operators committed (slug + commit hash)
- New global features committed (badge, fields, filters, drone pages)
- Issues encountered (anything you couldn't safely complete)
- Duplicate sweep findings (any other duplicates beyond Kuhn's)
- Sitemap and IndexNow status
- Anything flagged for manual follow-up
