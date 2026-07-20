# Dedup + SEO audit — 2026-07-20

Second-pass audit of every list-your-business and listing-update
submission against `src/data/operators.ts` (614 records). Grepped by
company name, contact-name variants, email, phone (with and without
dashes), website domain, and city. Also verified the sitemap /
schema / robots plumbing so new operator pages auto-flow through the
SEO pipeline once the record ships.

---

## Per-candidate audit results

Format: match confidence for each search dimension. `NONE` = zero
false-positive risk; `CLEAN` = matches only reference/coverage
mentions in other operators' descriptions; `MATCH` = confirmed same
record.

### Confirmed create-new (4)

| Candidate | Name | Email | Phone | Website | City | Verdict |
|---|---|---|---|---|---|---|
| Viewpoint Agriculture (Sebring, FL) | NONE | NONE | NONE | NONE | NONE | **CREATE NEW** — zero conflicts |
| EcoAg Aerial Imaging (Rochester, NY) | NONE | NONE | NONE | NONE | CLEAN (2 unrelated ops mention Rochester as coverage or a second office; different services and contact info) | **CREATE NEW** |
| AG Fertilizer, LLC. (Bastrop, TX) | NONE | NONE | NONE | NONE | NONE | **CREATE NEW** |
| Leigh Low Aerial Services LLC (Mauston, WI) | NONE | NONE | NONE | NONE | CLEAN (line 4661 has a `city: 'Leigh'` which is Nebraska, not our operator) | **CREATE NEW** |

### FLAGGED — possible collision (1)

| Candidate | Existing candidate | Reason for flag |
|---|---|---|
| Elevated Ag Drone Services (Auburn, AL — elevatedag2@gmail.com, elevatedagdrone.com, 205-332-2810) | `elevated-agriculture-llc` (line 10815, blank state, no contact) | Existing record was scaffolded from an FAA docket filing (description reads "Wide array of ag UAS application services. Multi-drone single control point.") with NO state, city, phone, email, or website. Very possibly the same legal entity operating under a dba `Elevated Ag Drone Services`. The three other Auburn AL operators (`harris-precision-solutions`, `hinterland-drones`, `auburn-university-extension`) are unrelated. **Recommend Eugen decide**: (a) enrich `elevated-agriculture-llc` in place and rename to "Elevated Ag Drone Services" (keeping the old slug to preserve any existing crawl equity) OR (b) create a new `elevated-ag-drone-services` slug and delete `elevated-agriculture-llc` OR (c) create both (only if they turn out to be genuinely separate LLCs). |

### Confirmed enrich-existing (2)

| Candidate | Existing slug | Match confidence |
|---|---|---|
| Heartland Sky LLC (Isaiah Borgos, Marshalltown IA) | `heartland-sky` (line 8487) | **MATCH** — existing record has `city: 'Marshalltown'`, `ownerName: 'Isaiah Borgos'`, `linkedin: 'https://linkedin.com/in/isaiah-borgos-3bb681220'`, `website: 'https://heartlandsky.com...'`. Owner submitted the enrichment via list-your-business form (rather than via listing-update). Merge in phone `641-352-9089`, email `heartlandskyllc@gmail.com`, full description, expand counties to add `nebraska`, add drones `['dji-agras-t50']`, services `['emergency', 'mapping', 'monitoring', 'sales', 'seeding', 'spraying', 'spreading']`, crops (7), price $14-18/ac. Flip `pendingConfirmation: true` → false, `verified: false` → true. |
| Wolverine Drone Services LLC (Jeff Whiting, Clyde MI) | `wolverine-drone-services-llc` (line 3446) | **MATCH** — existing phone `1-810-300-7809` matches form `18103007809`; existing website `wolverinedroneservices.com` matches. Merge in email `jeffwhiting@wolverinedroneservices.com`, `ownerName: 'Jeff Whiting'` (form mentions son Eric too), replace description with the fuller two-sentence form text, add crops `['alfalfa', 'corn', 'cover-crops', 'grapes', 'orchards', 'potatoes', 'row-crops', 'soybeans', 'wheat']`, priceMinUsd 15. Flip `pendingConfirmation` off, `verified` on. |

### Confirmed update-existing (3)

| Candidate | Existing slug | Notes |
|---|---|---|
| Altitude Agri Services (Kurt B, Kennewick WA) | `altitude-agri-services` (line 6478) | Phone `509-551-4774` matches. **Field conflict:** form says city `Kennewick`, record says city `Richland` (both Tri-Cities area, WA). Do NOT auto-overwrite city — record was likely scaffolded from research; Eugen should confirm with Kurt before flipping. Safe edits this pass: add email `kurt.b@altitudeagriservices.com`. |
| CropTech Solutions (Randy Biebel, Waterford PA) | `croptech-solutions` (line 2018) | Phone `(814) 823-2262` and website `https://croptech.us` match. Existing description already names Randy Biebel. Safe additive edits: add email `randy@croptech.us`, add `drones: ['dji-agras-t40', 'dji-agras-t50']` (existing says `['dji-agras-t50']` but description says "Operates DJI Agras T40"; owner-submitted list is authoritative), add services `spreading` + `training` on top of existing, expand crops list per form, add priceMinUsd 15. |
| Volitant Technologies (Dunbar NE) | `volitant-technologies` (line 366) | **Location conflict:** existing record has `city: 'Birmingham'` (AL) with counties spanning 7 Southeast states. Owner-submitted update says `Dunbar, Nebraska`. Owner used the `?claim=volitant-technologies` update link, which is a strong signal they are the same entity. Existing has NO website or email. **Recommendation:** treat the owner submission as authoritative — this is an owner correcting a research-scaffolded record. Overwrite `city` to `Dunbar`, replace `counties` with `['nebraska']`, add phone/email/website, expand drones, crops, services per form, add priceMinUsd 13. Preserve the existing description prose (it's still factually accurate about drone ag services). |

### Skip (1)

| Candidate | Verdict |
|---|---|
| Western Valley Insurance Associates, Inc. (donnac@westernvalley.com, CA) | Not a drone operator; insurance agency asking whether they can write insurance for the directory. Route to Eugen's inbox for a partnership reply. Do not create an operator record. |

---

## Cross-form-type dedup findings

Emails that appeared in more than one submission (already noted in
`07-newsletter-import.csv`):

| Email | Submissions |
|---|---|
| `heartlandskyllc@gmail.com` | list-your-business (Heartland Sky) + premium-acre-signup (Isaiah Borgos). Same person. Newsletter and directory both fine. |
| `Jodyfannin@hotmail.com` | exit-intent-lead (MS cover crops) + get-matched-lead (MS specialty / kudzu). Same person — MS farmer. One lead to route (matched, since it has more detail). |
| `matt@rvrcompany.com` and `matt@theankrgroup.com` | Two DIFFERENT AR pastures leads with the same first name — not duplicates. |
| `winseng@newulmtel.net` | 2 get-matched-lead submissions same day from Willis Runck (one bore a note "spray wheat before harvest to kill grass"). Merge into a single lead when routing. |
| `David@flyingpiguas.com` (premium-acre-signup) matches surname pattern for existing thin record `flying-pig-uas-llc` (line 10831). Not a duplicate — separate signal. Eugen can enrich the flying-pig-uas-llc record with David Shirley's contact info if the operator wants to be listed. |

Also worth calling out: **`brennecker@yahoo.com`** submitted two
identical exit-intent leads (`IL cover crops`) on 2026-07-10. Dedupe
when routing.

---

## SEO / sitemap / schema plumbing — no drift risk

Verified (grepped code):

1. **Sitemap.** `src/app/sitemap.ts:67-72` reads `operators` and emits
   `/operators/{slug}` for every operator that passes
   `shouldIndexOperator` (line 14 import). New operators auto-appear
   in the sitemap on the next deploy without any manual list edit.
2. **generateStaticParams.** `src/app/operators/[slug]/page.tsx:42-43`
   maps every operator to a static route. Netlify pre-renders on
   deploy.
3. **Noindex gate.** `src/lib/operator-content.ts:436-446` defines
   `shouldNoindexUltraThinOperator` — an operator is thin only if the
   description has <30 words AND all of city, phone, email, website,
   fleetSize, haTreated, priceMinUsd are empty. Every candidate on
   the new/enrich list satisfies at least 3 of {city, phone, email,
   website}, so none will be gated.
4. **OperatorSchema (LocalBusiness).** Auto-emitted from the page
   template with `hasCredential` set to the FAA Part 137 certificate
   only when `verified && certFAAPart137` are both true (per
   `code-patterns.md`). We should NOT set `certFAAPart137: true` on
   any of the 6 candidates unless the form actually said so:
   - Viewpoint Agriculture (form: "FAA 44807/137 licensed") → `certFAAPart137: true`
   - EcoAg Aerial Imaging (form: "FAA Part 107 certified") → `certFAAPart107: true` only
   - AG Fertilizer LLC (form: silent) → leave both false, let owner update later
   - Heartland Sky (form: "Certified and insured agricultural drone applicator") — ambiguous, likely 107 + 137; safest to keep the existing (blank) flags and add nothing until the owner confirms
   - Elevated Ag Drone Services (form: silent) → leave blank
   - Leigh Low (form: silent) → leave blank
   - Wolverine (form: "All the exemptions and certifications required by the FAA and state of Michigan") — ambiguous; keep existing (blank) flags for now
5. **FAQPage schema.** Auto-generated by `composeOperatorFAQs` from
   the operator's counties + services + primary state agency. Nothing
   to hand-author per record.
6. **Authority links.** Auto-rendered per operator (state regulator +
   extension + FAA Part 137 + NAAA + optional NDAA Section 848 link).
   Nothing to hand-author.
7. **Description auto-paragraph.** If the description word count is
   <30, `composeAutoParagraph(operator)` in
   `src/lib/operator-content.ts` lifts the profile using services +
   states + crops + region + licensing agency. **New records where
   the form left description empty (Viewpoint, AG Fertilizer, Leigh
   Low, Wolverine, Elevated Ag Drone) should leave `description: ''`
   or a very short one-line stub — the auto-paragraph helper will
   handle the rest at render time without fabricating facts.** Do NOT
   write invented long-form descriptions per copy-source-of-truth.
8. **Robots.** `src/app/robots.ts` disallows `/api/`, `/_memory/`,
   `/_research/`, `/_handoff/` only. New operator URLs at
   `/operators/{slug}` are always crawlable.
9. **State-operators pages.** New operators automatically appear in
   `/states/{state}/operators` via
   `getOperatorsByCounty(stateSlug)`. Wyoming, Utah, Wisconsin were
   noindex-gated at 7-8 ops each (`STATE_OPERATORS_NOINDEX_BELOW =
   9`). Adding Leigh Low (WI, also IL) flips **Wisconsin** to 8
   operators (still 1 short). Adding two thin-record enrichments
   doesn't change the count. Elevated Ag Drone Services adds 1 to
   AL, GA, MS (all already well above 9). No flips this batch.
10. **City auto-linking.** New operators auto-appear on their city
    page if the city already exists in `src/data/cities.ts`. Sebring
    (FL), Rochester (NY), Bastrop (TX), Mauston (WI), Auburn (AL)
    — probably some are in the seed data. Nothing to hand-author.

## Slug decisions (deterministic)

Slug rules (from operators.ts existing patterns): lowercase, hyphen-
separated, drop "LLC/Inc/,", drop legal suffixes, keep company name.

- `viewpoint-agriculture`
- `ecoag-aerial-imaging`
- `ag-fertilizer-llc` (keeping `-llc` to disambiguate from a
  generic "ag-fertilizer" concept)
- `leigh-low-aerial-services-llc` (matches existing convention of
  keeping -llc when the base is short/generic)
- `elevated-ag-drone-services` (only if Eugen confirms it is NOT
  the same as `elevated-agriculture-llc` per the flag above)

## Verification checklist for Phase 2/3 commits

Before pushing each batch:

- [ ] Grep `operators.ts` for the exact new slug — must return zero
      hits pre-commit.
- [ ] Grep for the phone (both `10digit` and `xxx-xxx-xxxx`
      variants) — must return zero hits.
- [ ] Grep for the email — must return zero hits.
- [ ] Grep for the website root domain — must return zero hits.
- [ ] `npm run build` locally to catch TS/ESLint errors; verify
      "generateStaticParams" prerenders the new slug.
- [ ] Confirm the new operator surfaces on its state's operators
      page (spot-check the rendered HTML from `.next/server/app/`).
- [ ] Confirm `sitemap.xml` in the build output contains the new
      operator URL.
