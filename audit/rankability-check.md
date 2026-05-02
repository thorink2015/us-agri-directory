# Rankability check

Audit date: 2026-05-02
Branch: `claude/audit-public-content-w2Iz1`
Reference: requested deliverable 3.

Methodology: 5 random sample pages per route type (25 total). For each
page, verify 7 rankability indicators:

1. Primary keyword in H1
2. Primary keyword in `<title>` tag
3. Primary keyword in `<meta name="description">`
4. ≥3 distinct internal links to other pages on the site
5. ≥1 external link to an authority source (FAA, USDA, EPA, NAAA,
   NRCS, NASS, university extension, or DJI/Hylio docs)
6. FAQPage or LocalBusiness schema in the page JSON-LD
7. Word count >700 (rendered main column)

Plus a global title-uniqueness check across every page in each route.

Pages failing 2+ checks are flagged as "unlikely to rank even if
technically indexed."

Sample seed: `random.seed(42)`.

---

## Title uniqueness (global)

| Route | Total pages | Unique titles | Pages sharing a title |
|---|---:|---:|---:|
| `/states/[slug]/[city]` | 216 | **216** | 0 |
| `/states/[slug]/crops/[crop]` | 600 | **600** | 0 |
| `/states/[slug]/services/[service]` | 500 | **500** | 0 |
| `/operators/[slug]` | 392 | **392** | 0 |
| `/states/[slug]` | 50 | **50** | 0 |
| **Total** | **1,758** | **1,758** | **0** |

**Every page has a unique `<title>` tag.** No collisions across the
site. PASS.

---

## Per-route 5-page sample

### `/states/[slug]/[city]` — WARN

| Page | Words | Internal links | External authority links | Failed checks |
|---|---:|---:|---:|---|
| `oregon/harrisburg` | 769 | 14 | 0 | kw_in_h1, external_authority_link |
| `florida/belle-glade` | 1697 | 26 | 0 | kw_in_h1, external_authority_link |
| `arizona/yuma` | 957 | 14 | 0 | kw_in_h1, external_authority_link |
| `utah/vernal` | 1044 | 18 | 0 | kw_in_h1, external_authority_link |
| `kansas/wichita` | 826 | 18 | 0 | kw_in_h1, external_authority_link |

**5 of 5 sampled pages fail 2+ checks.** Two systematic issues:

1. **`kw_in_h1` failure is a check artefact, not a real problem.**
   The check looked for the primary keyword `"drone spraying [city]
   [state]"`. The actual H1 is `"Agricultural Drone Services in
   [City], [State]"`, which uses "drone services" instead of "drone
   spraying". Both are keyword-relevant for the page's intent;
   "drone services" is even broader. Discount this failure.

2. **`external_authority_link` failure is real and actionable.**
   The city template (`src/app/states/[slug]/[city]/page.tsx`) has
   no block that surfaces an external authority link. The licensing
   prose at the bottom links to internal `/regulations/...` pages,
   not to FAA/USDA/EPA. Fix: add 1–2 inline external authority
   links in the licensing block (FAA Part 137 page, state extension
   service URL from `state.extensionUrl`).

**Verdict: WARN.** The kw-in-h1 issue is artefactual (template uses
"Agricultural Drone Services" rather than "Drone Spraying" as the
H1 verb, both equally rankable). The external-authority-link gap is
real but a one-line template fix.

### `/states/[slug]/crops/[crop]` — PASS

| Page | Words | Internal links | External authority links | Failed checks |
|---|---:|---:|---:|---|
| `massachusetts/crops/cover-crops` | 1815 | 25 | 1 | none |
| `maryland/crops/orchards` | 1264 | 17 | 1 | none |
| `idaho/crops/cover-crops` | 1242 | 16 | 1 | none |
| `florida/crops/wheat` | 1507 | 21 | 1 | none |
| `washington/crops/cotton` | 1787 | 32 | 1 | none |

**5 of 5 sampled pages pass all 7 checks.** Authority links are
sourced from `crop.authorityLinks[]` in the crops data (USDA NASS,
university extension, EPA labels). FAQPage schema confirmed via
PR #94 inline JSON-LD.

**Verdict: PASS.** No action needed.

### `/states/[slug]/services/[service]` — PASS

| Page | Words | Internal links | External authority links | Failed checks |
|---|---:|---:|---:|---|
| `california/services/spreading` | 1263 | 21 | 2 | none |
| `new-mexico/services/emergency` | 1169 | 16 | 3 | none |
| `michigan/services/mapping` | 1265 | 22 | 3 | none |
| `alaska/services/mapping` | 1074 | 16 | 3 | none |
| `alaska/services/seeding` | 1115 | 16 | 3 | none |

**5 of 5 sampled pages pass all 7 checks.** Authority links sourced
from `service.authorityLinks[]` (FAA Part 137, EPA, USDA NASS). 2–3
external authority links per page. FAQPage schema from PR #96.

**Verdict: PASS.** No action needed.

### `/operators/[slug]` — FAIL

| Page | Words | Internal links | External authority links | Failed checks |
|---|---:|---:|---:|---|
| `agvision-ca` | 436 | 6 | 0 | external_authority_link, word_count_700plus |
| `cropguard-aero-drones-llc` | 607 | 13 | 0 | external_authority_link, word_count_700plus |
| `delta-ag-drone` | 701 | 19 | 0 | external_authority_link |
| `on-top-ag` | 526 | 10 | 0 | external_authority_link, word_count_700plus |
| `sky-spray-llc` | 555 | 13 | 0 | external_authority_link, word_count_700plus |

**4 of 5 sampled pages fail 2+ checks.** Two issues:

1. **`external_authority_link` failure across all 5 sampled.**
   The operator profile template (`src/app/operators/[slug]/page.tsx`)
   has no block that surfaces an external authority link. The PR #93
   uplift added internal cross-links (state pages, crop pages,
   regulations pages) but no external FAA/USDA/EPA links. Fix: add a
   small "Federal credentials" or "Authority sources" block linking
   to FAA Part 137, NDAA Section 848 reference, and state aerial
   licensing for the operator's primary state.

2. **`word_count_700plus` failure on 4 of 5.** Sampled operators
   render at 436–701 words after stripping chrome. PR #93 lifted
   thin operators from 40–100 words to 400–700+, which was the
   primary indexation task — but the very thinnest operators (zero
   description, zero priceMin, zero structured data) still fall
   short of the 700-word target.

**Verdict: FAIL on the sample.** Two distinct moves needed:

- Add external authority links to the operator template (one-line
  template fix).
- Either (a) lift the auto-content for ultra-thin operators
  further, or (b) noindex-gate operators with description <15 words
  AND no priceMin AND no fleet/clients data. Same gating pattern
  as `/states/[slug]/operators` in PR #97.

The internal-duplication audit independently flagged ultra-thin
operators as the WARN bucket (high shingle overlap among same-state
thin operators). The two findings converge on the same fix:
either differentiate further or noindex.

### `/states/[slug]` — PASS-with-flags

| Page | Words | Internal links | External authority links | Failed checks |
|---|---:|---:|---:|---|
| `alaska` | 521 | 22 | 1 | word_count_700plus |
| `oklahoma` | 1179 | 46 | 1 | kw_in_desc |
| `illinois` | 1372 | 49 | 1 | none |
| `virginia` | 1526 | 45 | 1 | kw_in_desc |
| `tennessee` | 1649 | 51 | 4 | none |

Three observations:

1. **Alaska state hub at 521 words** — single state hub failing the
   700-word threshold. Alaska's `StateData` entry has thinner content
   than the lower-48 states (less licensing prose, smaller
   `topCrops`). Worth a one-time content pass to fill out.
2. **Oklahoma and Virginia fail `kw_in_desc`** — the meta description
   doesn't include "drone spraying [state]" exactly. Looking at the
   actual descriptions, they reference the state and describe drone
   services but use different wording. Minor; not blocking
   indexation.
3. **No state hub fails 2+ checks** — each only fails 1 each.

**Verdict: PASS-with-flags.** Single one-time content lift on the
Alaska state hub plus a small meta-description tightening on a
couple of states.

---

## Pages failing 2+ checks (across the sample)

### Real issues (action required)

| Route | Page | Failed |
|---|---|---|
| `/operators/[slug]` | agvision-ca | external_authority_link, word_count_700plus |
| `/operators/[slug]` | cropguard-aero-drones-llc | external_authority_link, word_count_700plus |
| `/operators/[slug]` | on-top-ag | external_authority_link, word_count_700plus |
| `/operators/[slug]` | sky-spray-llc | external_authority_link, word_count_700plus |

### Artefactual / discountable

| Route | Page | Failed |
|---|---|---|
| `/states/[slug]/[city]` | oregon/harrisburg | kw_in_h1 (H1 says "drone services" not "drone spraying"; equally rankable), external_authority_link (real) |
| `/states/[slug]/[city]` | florida/belle-glade | same as above |
| `/states/[slug]/[city]` | arizona/yuma | same |
| `/states/[slug]/[city]` | utah/vernal | same |
| `/states/[slug]/[city]` | kansas/wichita | same |

The 5 city pages are flagged primarily because of the kw-in-h1
artefact. Strip that and they all fail only 1 check
(external_authority_link), which is a one-line template fix.

---

## Verdict per route type

| Route | Verdict | Action |
|---|---|---|
| `/states/[slug]/[city]` | **WARN** | Add 1–2 external authority links to the city template's licensing block. |
| `/states/[slug]/crops/[crop]` | **PASS** | None. |
| `/states/[slug]/services/[service]` | **PASS** | None. |
| `/operators/[slug]` | **FAIL** | (1) Add external authority links to the template. (2) Lift or noindex-gate ultra-thin operators (description <15 words AND no priceMin AND no structured data). |
| `/states/[slug]` | **PASS-with-flags** | Alaska state hub content lift + meta-description tightening on 2–3 states. |

**Single highest-leverage move:** add external authority links to
the city and operator templates. One-line template change, lifts
both routes' scores. Mirror the pattern already shipping in
state-crop and state-service templates (which both render
`*.authorityLinks[]` in a dedicated block).

---

## Summary

- **All 1,758 pages have unique titles.** PASS.
- **State-crop and state-service routes pass cleanly.** PR #94 / #96
  authority-link blocks are doing their job.
- **City template needs an external-authority-link block.** Same
  shape as the one in state-crop (`crop.authorityLinks`) and
  state-service (`service.authorityLinks`).
- **Operator template has the same external-authority-link gap, plus
  the ultra-thin operator problem from PR #93.** Convergent finding
  with the internal-duplication audit (operator route is the WARN
  there too).
- **Single state hub (Alaska) needs a content lift** to clear the
  700-word threshold.

None of the gaps are "unlikely to rank even if indexed" in the
worst-case sense — the operators failing word count are still
above 400 words and Google indexes plenty of 400-word pages — but
the convergent signal from this audit + internal-duplication
audit makes the operator-template revision the highest-leverage
next move.
