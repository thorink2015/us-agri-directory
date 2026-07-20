# Formspree processing batch — 2026-07-20

Triage of the 47 Formspree submissions Eugen dropped from the inbox
export. Files in this folder are the deliverables for that triage.

## What's in here

| File | What it is | Who reads it |
|---|---|---|
| `00-master-all-submissions.csv` | Every submission, one row, normalized columns, `action` column tells you what to do with each. | Eugen (quick scan of everything) |
| `01-list-your-business.csv` | Only "New listing" submissions (8). Includes existing-slug match where present. | Eugen + Claude Code (Phase 2) |
| `02-listing-update.csv` | Only owner-submitted updates on existing listings (3). Includes existing slug + line number in `operators.ts` + which fields to update. | Eugen + Claude Code (Phase 3) |
| `03-get-matched-lead.csv` | Only Get-Matched wizard leads (11). Route to operators in the matching state. | Eugen (lead routing) |
| `04-exit-intent-lead.csv` | Only exit-intent popup leads (16). Light-touch newsletter + potential lead follow-up. | Eugen |
| `05-premium-acre-signup.csv` | Only paid-newsletter founding-list signups (7). Import to beehiiv Premium Acre audience. | Eugen |
| `06-operator-quote-request.csv` | Only quote requests on operator profiles (1). Forward to the operator directly. | Eugen |
| `07-newsletter-import.csv` | Deduped list of every email across every form type (40 unique), tagged with source, ready for beehiiv import. | Eugen |
| `08-email-listing-live.md` | Reusable email template for "your listing is live" plus a ready-to-send queue. | Eugen |
| `09-dedup-audit.md` | Second-pass audit of every list-your-business + listing-update against `operators.ts` (name / email / phone / website / city). Includes SEO/sitemap/schema plumbing verification. **Overrides** the initial triage on Elevated Ag Drone Services + Volitant + Altitude. | Eugen + Claude Code (must-read before Phase 2) |

## Action summary (what needs building)

**Updated 2026-07-20 after `09-dedup-audit.md` — see that file for
the full per-candidate audit.**

### list-your-business (8 submissions)

- **Create new operator (4):** Viewpoint Agriculture (FL), EcoAg
  Aerial Imaging (NY), AG Fertilizer LLC (TX), Leigh Low Aerial
  Services LLC (WI). All zero-collision confirmed by second-pass
  audit.
- **FLAG — verify before creating (1):** Elevated Ag Drone Services
  (AL, Auburn). Existing `elevated-ag-solutions` is MN;
  `elevated-aerial-services-llc` is WI. But the blank
  `elevated-agriculture-llc` (line 10815) is a Part 137 docket record
  with NO state or contact info — possibly the same legal entity
  operating under a dba. Eugen must decide: enrich in place + rename,
  or create fresh + delete blank record. Do NOT auto-create until
  resolved. Use slug
  `elevated-ag-drone-services`.
- **Enrich existing thin record (2):** Heartland Sky (`heartland-sky`,
  line 8487) and Wolverine Drone Services LLC
  (`wolverine-drone-services-llc`, line 3446). Both are
  `pendingConfirmation: true` today with sparse contact info. Enrich
  with the form data and flip `pendingConfirmation: false` +
  `verified: true`.
- **Skip / route elsewhere (1):** Western Valley Insurance
  Associates, CA. Not a drone operator — insurance agency asking to
  write insurance for the directory. Eugen replies personally.

### listing-update (3 submissions)

- Altitude Agri Services (`altitude-agri-services`, line 6478) —
  Kurt B. Phone matches; **city conflict** (form Kennewick vs
  record Richland — both Tri-Cities WA). Safe additive edit: add
  email `kurt.b@altitudeagriservices.com`. Eugen replies to Kurt to
  confirm city + any other edits.
- CropTech Solutions (`croptech-solutions`, line 2018) — Randy
  Biebel. Phone + website match. Additive: email, +2 drones, +2
  services, expanded crops, price $15.
- Volitant Technologies (`volitant-technologies`, line 366) —
  **location correction** (existing city Birmingham AL with 7
  Southeast counties → owner-submitted Dunbar NE, counties ['nebraska']).
  Owner used the `?claim=` update link, strong ownership signal.
  Overwrite city + counties, add phone/email/website, expand fields.
  Description prose preserved.

### Leads (get-matched-lead + exit-intent-lead + operator-quote-request)

- 11 Get-Matched leads → route each to operators in the matching
  state via Eugen's normal lead-flow. Not a page-building task.
- 16 Exit-intent leads → same. Some overlap with Get-Matched (Jody
  Fannin appears in both).
- 1 Quote request → forward Gary Langford's Embry-Riddle quote to
  the Embry-Riddle operator contact.

### Premium Acre founding list (7 signups)

- Import all 7 emails to the beehiiv Premium Acre audience. These
  paid $17 or are on the founding-list.
- Note: Isaiah Borgos (Heartland Sky) submitted both a Premium Acre
  signup AND a new listing.
- David Shirley (David@flyingpiguas.com) matches the existing thin
  `flying-pig-uas-llc` operator (line 10831) — separate signal.

### Newsletter (Tank Mix) import

`07-newsletter-import.csv` has 40 unique emails across all form
types. Import to the Tank Mix general audience in beehiiv (not
Premium Acre — that's the paid list).

## Phase plan

- **Phase 1 (this commit):** deliverables above. No `operators.ts`
  changes.
- **Phase 2 (next):** create the 5 new operator records + enrich the
  2 existing thin records (7 total). Batch 1–3 per commit per the
  CLAUDE.md hard rule.
- **Phase 3 (next):** apply the 3 owner-submitted updates.
- **Phase 4 (Eugen):** import `07-newsletter-import.csv` into
  beehiiv Tank Mix audience and `05-premium-acre-signup.csv` into
  Premium Acre audience.
- **Phase 5 (Eugen):** send the `08-email-listing-live.md` template
  to each of the 7 operators after Phase 2 + Phase 3 profiles ship.
- **Phase 6 (Eugen):** route the 27 farmer leads
  (`03-get-matched-lead.csv` + `04-exit-intent-lead.csv`) via the
  normal lead-flow to matched state operators. Forward the 1 quote
  request to Embry-Riddle.

## What Claude Code will NOT do here

- Send emails. Every email above (welcome, newsletter, lead
  handoff) is sent from Eugen's inbox or via beehiiv. Claude Code
  writes the CSV + template only.
- Import to beehiiv. Beehiiv is external. Eugen uploads the CSV in
  the beehiiv dashboard.
- Fabricate operator descriptions where the form left them blank.
  Empty description fields on new records stay empty (or lean on
  the template-level `composeAutoParagraph` helper in
  `src/lib/operator-content.ts`, which already lifts thin profiles
  without inventing facts).
