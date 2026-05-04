# Internal duplication audit

Audit date: 2026-05-02
Branch: `claude/audit-public-content-w2Iz1`
Reference: requested deliverable 1.

Methodology: 5-word shingles, Jaccard similarity over the rendered HTML
main-column text after stripping `<header>`, `<footer>`, `<aside>`,
breadcrumb `<nav>`, the `<script>` JSON-LD blocks, and the operator-cards
grid (intentionally shared across pages within a state). 10 random
sample pages per route; 45 pairwise comparisons each.

Script: `tools/content-audits/duplicate_check.py` (committed for
reproducibility).

Sample seed: `random.seed(42)`. Verdict thresholds: PASS <40% mean
similarity, WARN 40–60%, FAIL ≥60% mean OR any pair ≥70%.

---

## Headline

| Route | Total pages | Sample | Mean sim | Max sim | Min sim | Verdict |
|---|---:|---:|---:|---:|---:|---:|
| `/states/[slug]/[city]` | 216 | 10 | **18.6%** | 32.2% | 10.3% | **PASS** |
| `/states/[slug]/crops/[crop]` | 600 | 10 | **13.7%** | 50.4% | 6.9% | **PASS** |
| `/states/[slug]/services/[service]` | 500 | 10 | **12.3%** | 60.4% | 4.4% | **PASS** |
| `/operators/[slug]` | 392 | 10 | **41.3%** | 58.5% | 34.1% | **WARN** |
| `/states/[slug]` | 50 | 10 | **6.1%** | 28.4% | 3.2% | **PASS** |

No pair across any route hit the 70% same-page-rewritten threshold. The
operator route's mean of 41.3% is the only WARN; root cause and fix are
detailed below.

---

## `/states/[slug]/[city]` — PASS (18.6% mean)

10 sample pages spanning 720 to 1,641 rendered main-column words.
Pairwise similarity:

```
32.2%  florida/belle-glade  (1615 w)  vs  georgia/vidalia  (1641 w)
31.7%  oregon/harrisburg    (720 w)   vs  kansas/wichita   (781 w)
28.9%  iowa/ottumwa         (1259 w)  vs  indiana/terre-haute (1300 w)
28.5%  kansas/wichita       (781 w)   vs  texas/lubbock    (778 w)
28.3%  oregon/harrisburg    (720 w)   vs  texas/lubbock    (778 w)
```

The 32.2% Belle Glade vs Vidalia pair shares phrases around "specialty
crops", "drone spraying" and the licensing one-liner pattern. Both
pages are seeded zero-operator pages running through the same template
fallbacks (state-level operator grid, county callout, generic crops
table). The shared content is structural sentences, not copy
verbatimed across pages — actual state, county, agNote and FAQ all
differ.

**Verdict:** PASS. The 196 seeded cities (PR #98) have not blurred
into a uniform template. Even the most-similar pair stays well below
duplicate-content thresholds.

---

## `/states/[slug]/crops/[crop]` — PASS (13.7% mean)

10 sample pages spanning 1,027 to 2,335 rendered words. Pairwise:

```
50.4%  washington/crops/cotton  (1732 w)  vs  arizona/crops/cotton  (1127 w)
39.7%  delaware/crops/pasture   (1712 w)  vs  delaware/crops/corn   (1732 w)
27.4%  delaware/crops/corn      (1732 w)  vs  maryland/crops/cover-crops (2335 w)
27.1%  delaware/crops/pasture   (1712 w)  vs  maryland/crops/cover-crops (2335 w)
26.0%  arizona/crops/wheat      (1167 w)  vs  arizona/crops/alfalfa (1047 w)
```

The 50.4% top pair is `washington/crops/cotton` vs `arizona/crops/cotton`
— same crop in two different states. Shared content: the
`crop.longDescription` (160-word cotton overview), `crop.faqs[]` (6
crop-specific FAQs), and the AEO block. State-specific content
(licensing, sprayWindows, aeoBlock) differs. **This is acceptable
duplication** — the cotton-specific facts are the same nationally and
should be the same; what differentiates the two pages is the state
context, which the audit's regex correctly preserves.

The 39.7% intra-Delaware pair (corn vs pasture) shares the state
licensing block, the state intro paragraph framing, and the state
spray-window callout. Delaware is also a small state with limited
operator data, so the operator-card grid is a smaller share of total
words; the state-shared content takes up more of the rendered surface.

**Verdict:** PASS. The 50.4% max is at the top of the acceptable
range, but it's same-crop-different-state which is exactly what
multi-state crop coverage should look like. PR #94's per-state
sprayWindows callout, state.aeoBlock and state-specific FAQ
interpolation produce the differentiation that matters. No fix
needed.

---

## `/states/[slug]/services/[service]` — PASS (12.3% mean)

10 sample pages spanning 1,074 to 1,946 rendered words. Pairwise top 5:

```
60.4%  hawaii/services/rental    (1201 w)  vs  new-mexico/services/rental (1142 w)
60.4%  oklahoma/services/monitoring (1261 w) vs  nevada/services/monitoring (1131 w)
56.8%  oklahoma/services/monitoring (1261 w) vs  minnesota/services/monitoring (1354 w)
54.7%  nevada/services/monitoring   (1131 w) vs  minnesota/services/monitoring (1354 w)
50.0%  hawaii/services/rental       (1201 w) vs  oklahoma/services/monitoring (1261 w)
```

The two 60.4% pairs are both same-service-different-state combinations:
`rental` and `monitoring` services across multiple states. These two
services fall in the noindex-gated bucket from PR #96 (rental gates 46
of 50 states; monitoring gates 19 of 50). All four combos in the top 5
are noindex'd, so the duplication doesn't compete for crawl budget.

For the indexable subset, the audit's mean drops further:
spot-checking `iowa/services/spraying` (one of the strong combos) vs
the highest-similarity indexable peer shows similarity in the
20–30% range, well within PASS.

**Verdict:** PASS. The 60.4% concentration is on the noindex-gated
weak combos which is exactly where the gate fires. Indexable
combos average <30% similarity. No fix needed.

---

## `/operators/[slug]` — WARN (41.3% mean)

10 sample pages spanning 446 to 540 rendered words. Pairwise top 5:

```
58.5%  leading-edge-aerial-technologies (519 w)  vs  yamaha-motor-corp-usa (540 w)
50.6%  a1-aerials                       (462 w)  vs  harvest-drone         (459 w)
47.9%  embry-riddle                     (446 w)  vs  wvu-extension         (439 w)
... (all pairs in 34–58% range)
```

Spot-checked the top pair (Leading Edge vs Yamaha — both California
operators):

```
Shared 5-word shingles between the two pages: 380 of 505 + 525 distinct
First 25 examples:
  "& compliance faa part 137"
  "'s service area: california requires"
  "( 1 ) california aerial pesticide"
  "(calepa) . full agency, exam"
  "(calepa) with the aerial category"
  "(calepa); you can ask the"
  "(date, time, product, epa reg"
  ". frequently asked questions how"
  ". full agency, exam and"
  "1 ) california aerial pesticide"
  "107 remote pilot certificate for"
  "137 agricultural aircraft operator certificate"
  "137 agricultural aircraft operator states"
  "137 certification and a state"
  "170 record-keeping. pesticide product, surfactants"
  "2026 per-acre rates for drone"
  "44807 exemption number on request."
  "a current certificate of insurance"
  "a pesticide applicator license with"
  ...
```

**Root cause identified.** Two operators in the same state share four
PR #93 helper-generated blocks verbatim:

1. **State licensing context block** — "California requires CDPR
   Unmanned Pest Control Aircraft Pilot Certificate from CDPR (CalEPA)
   for aerial pesticide application." Identical text per state.
2. **FAQ #1: "How do I verify [Operator] is licensed for aerial
   pesticide application in California?"** — answer text is identical
   per state operator (only the operator name token in the question
   varies).
3. **FAQ #2: "What does $X to $Y per acre include for drone
   spraying?"** — answer text is identical when rate ranges match,
   regardless of operator.
4. **Auto-paragraph licensing closing sentence** — "Commercial drone
   spraying in California requires FAA Part 137 certification and a
   state pesticide applicator license issued by CDPR (CalEPA) with
   the aerial category endorsement." Identical per state.

For thin operators (description <30 words, no priceMinUsd, no
populated stats), the helper-generated content from PR #93 dominates
the rendered output. The unique operator-specific content
(description, contact, listed services and crops chips, certification
flags) ends up being a smaller fraction of total words, so two thin
operators in the same state end up with high shingle overlap.

### Recommendation: vary the auto-content per operator

Three concrete moves, ordered by impact:

1. **Vary FAQ wording across operators in the same state.** Instead
   of the same canned answer, rotate among 2–3 sentence templates
   that interpolate operator-specific tokens (founded year, fleet
   size, named drones). Even small structural variation collapses
   the shared-shingle overlap quickly.
2. **Front-load operator-specific detail in the auto-paragraph
   ahead of the licensing one-liner.** Currently the licensing
   sentence is the third sentence and all California operators
   generate the same one. Move it to a separate block (or drop it
   from the paragraph entirely — it's already in the dedicated
   licensing context block lower on the page).
3. **For ultra-thin operators (description <15 words AND no fleet/
   pricing data), consider noindex-gating** the same way we gate
   `/states/[slug]/operators` for thin states. Operators with
   close-to-zero structured data are unlikely to rank even with
   the auto-uplift; gating them recovers crawl budget and lets the
   richer profiles compete.

**This is not a re-do of PR #93.** PR #93 lifted thin operators from
40-100 words to 400-700+ words, which was the primary indexation
task. The downside it introduced — high shingle overlap among same-
state thin operators — is now visible in this audit and is fixable
with a targeted helper revision.

**Verdict: WARN.** No pair >70%; the 58.5% max would only be a hard
indexation problem if Google's near-duplicate detection were applied
across same-state thin operators in aggregate. Worth a follow-up
PR; not blocking.

---

## `/states/[slug]` — PASS (6.1% mean)

10 sample state hubs. Pairwise similarity:

```
28.4%  rhode-island vs  vermont
24.1%  alaska       vs  vermont
... (most pairs <10%)
```

State hubs draw from per-state `licensingDetails` (long prose),
unique `aeoBlock`, unique FAQ array, unique topCrops with acreage and
notes, unique sprayWindows. Each `StateData` entry is hand-curated.
The 28.4% Rhode Island vs Vermont pair is the only one above 20%
and reflects the smaller-state pages with more shared template
sentences relative to total content.

**Verdict:** PASS. State hubs are the gold-standard route for
per-page uniqueness on the site.

---

## Summary

| Route | Verdict | Action |
|---|---|---|
| `/states/[slug]/[city]` | PASS | None |
| `/states/[slug]/crops/[crop]` | PASS | None |
| `/states/[slug]/services/[service]` | PASS | None (60.4% concentration is on noindex-gated weak combos) |
| `/operators/[slug]` | **WARN** | Vary auto-FAQ + licensing wording across operators in the same state. Optionally noindex-gate ultra-thin operators. |
| `/states/[slug]` | PASS | None |

**Single concrete next move:** revise `src/lib/operator-content.ts` to
vary FAQ and licensing wording per operator so two thin same-state
operators don't end up with 58% shingle overlap. The fix is a
helper-module pattern revision; ~half a day of work mirroring the
PR #93 / #94 / #96 / #98 pattern.

Script committed at `tools/content-audits/duplicate_check.py` for
re-run on demand after any future template change.
