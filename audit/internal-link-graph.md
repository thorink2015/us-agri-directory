# Internal link graph audit (Deliverable 6 of 8)

## Headline

**Solid link graph baseline.** Zero broken internal links (re-confirmed via the same script that ran in PRs #91 and #95). Strong cross-linking density between hub and detail pages. **One MEDIUM finding:** 19 orphan pages — 17 of them are the new state-operators list pages from sparse states, and 2 are anomalies (`/operators/agnomy`, `/_not-found`). **Two LOW:** 53 pages with only 1-2 inbound links (mostly state-operators that don't sit on the main navigation), and `/drones/dji-agras-t50` has 195 outbound internal links (heavy hub page; review for dilution).

## 1. Average internal links per page

5-page sample per route. Outbound counts of distinct internal `/path` references:

| Route | Avg outbound | Notes |
|---|---:|---|
| `/operators/[slug]` | ~25 | post-PR #93/#99: state, crops, services, drones, regions, operator-specific |
| `/states/[slug]/[city]` | ~25-30 | post-PR #98: state, crops, services, nearby cities, related guides |
| `/states/[slug]/crops/[crop]` | ~30-50 | post-PR #94: state, crop, services, regions, neighbouring states |
| `/states/[slug]/services/[service]` | ~25-35 | post-PR #96: state, services, related crops, neighbouring states |
| `/states/[slug]` (state hub) | ~115 | high outbound — all topCrops, sprayWindows, operators, neighbouring states, regions |
| `/operators` (index) | ~400 | listing 392 operator profile cards |
| `/states` (index) | ~50 | listing 50 states |
| `/crops/[slug]` | ~60 | crops detail with operators in the crop |

State hubs dominate outbound count. Acceptable — these are designed to fan link equity to the rest of the site.

## 2. Orphan pages (zero inbound internal links)

**19 orphan pages found:**

| Category | Count | URLs |
|---|---:|---|
| Sparse-state operator list pages | **17** | wyoming/operators, north-dakota/operators, massachusetts/operators, rhode-island/operators, delaware/operators, new-mexico/operators, hawaii/operators, maine/operators, arizona/operators, alaska/operators, wisconsin/operators, new-hampshire/operators, connecticut/operators, south-dakota/operators, vermont/operators, utah/operators (note: `/states/iowa/operators` and other heavy-state versions DO have inbound links from the state hub) |
| Operator anomaly | 1 | `/operators/agnomy` (likely a stub or test entry; needs investigation) |
| Build artifact | 1 | `/_not-found` (Next.js 404 catcher; intentional) |

**The 17 state-operators orphans are post-PR #97 noindex'd pages.** They're correctly noindex'd, so orphan status reduces wasted crawl. But the operator-list pattern was added later than the state-hub link generator, and the state hub doesn't link to its `/operators` sub-page on sparse states.

**Recommendation:** ensure every state hub's main navigation links to `/states/[slug]/operators`, even when the page is noindex'd. Internal linking still passes equity to noindex'd pages and helps Google interpret site structure.

`/operators/agnomy` is the real anomaly. Worth a one-time check: is it a duplicate of another operator? A test entry? A typo? **MEDIUM finding.**

## 3. Pages with very few inbound links (1-2)

**53 pages found.** Top 20:

```
(1) /states/louisiana/operators       (1) /states/missouri/operators
(1) /states/oregon/operators          (1) /blog/dji-vs-hylio-which-spray-drone
(1) /states/florida/operators         (1) /states/minnesota/operators
(1) /states/ohio/operators            (1) /states/georgia/operators
(1) /states/new-jersey/operators      (1) /states/nebraska/operators
(1) /states/kentucky/operators        (1) /states/mississippi/operators
(1) /states/oklahoma/operators        (1) /states/pennsylvania/operators
(1) /states/north-carolina/operators  (1) /states/illinois/operators
(1) /states/tennessee/operators       (1) /states/new-york/operators
(1) /states/arkansas/operators        (1) /blog/ndaa-chinese-drones-what-farmers-need-to-know
```

Most are state-operators list pages (same root cause as the orphans above). Two blog posts also fall in the 1-inbound bucket — likely linked only from `/blog` index, not cross-linked from the related-content sections of related blog/guide pages. LOW.

## 4. Pages with very many outbound links (>100)

**48 pages.** Top 10:

```
(195) /drones/dji-agras-t50             ← single hub anchor for 195 distinct paths
(119) /states/kansas
(118) /states/illinois
(117) /states/michigan, /states/mississippi, /states/tennessee
(116) /states/indiana, /states/kentucky, /states/minnesota, /states/missouri
```

`/drones/dji-agras-t50` at 195 distinct outbound paths is the highest. The T50 is the most-flown drone in the directory and the page links to:

- Every operator that lists it (~50 operators)
- Every state with T50 operators (~30 states)
- Every crop the T50 is used on (~7 crops)
- Cross-references to T100, T25, T25P, AG-272, P100 Pro, Talos, Pyka
- 6 FAQs each potentially linking
- Authority links + comparison cross-links

195 outbound links on a single page is the upper edge of acceptable. Google's documented limit is roughly 100-150 before link equity per outbound starts to dilute meaningfully. **LOW finding** — review whether all 195 are necessary, or if some could move to a sub-section that's not the primary outbound surface.

State hubs at 116-119 outbound are within reasonable range.

## 5. Internal anchor text diversity

Sampled the operator-link rendering on 5 pages:

- `/operators` index — operator name as anchor text. ✅
- `/states/iowa` state hub — operator card with name + city + tagline. ✅
- `/states/iowa/operators` — operator card same as state hub. ✅
- `/states/iowa/crops/corn` — operator card. ✅
- `/operators/agriforce-drone` — links to other operators (in the related sections) use operator name. ✅

**No "View profile" or generic-anchor pattern.** Anchor diversity is good. **PASS.**

## 6. Hub page link health

| Hub | Links to children with descriptive anchors? |
|---|:-:|
| `/states` | ✅ each state name + region tag |
| `/operators` | ✅ each operator name + city + tagline |
| `/crops` | ✅ each crop name + 1-line description |
| `/services` | ✅ each service name + price-range |
| `/drones` | ✅ each drone name + manufacturer + key spec |
| `/regions` | ✅ each region name + state list |
| `/guides` | ✅ each guide title + 1-line description |
| `/blog` | ✅ each blog title + 1-line description |

**PASS.** All hub pages descriptively link to their children.

## 7. Broken internal links

Re-ran the link-check pattern from PR #91 and PR #95:

```
Total distinct internal hrefs: ~1,900
Built routes:                  ~1,908
Potentially broken:                  2  (/icon, /apple-icon — dynamic Next icon endpoints, not 404s)
```

**Zero new broken internal links.**

## 8. Cross-linking density

Spot-checked the cross-linking surface:

- **Operator pages → state-crop pages:** ✅ via the crop-pricing-context block (PR #93)
- **Operator pages → state-service pages:** partial — links to `/services/[slug]` (national hub) but not to `/states/[slug]/services/[service]`. Could add this in a future PR.
- **State-crop pages → operators in that state for that crop:** ✅ via the operator grid fallback (PR #94)
- **City pages → nearby cities:** ✅ via the "Other cities in [state]" chip row
- **State hubs → state-crop and state-service pages:** ✅ via the topCrops and sprayWindows sections

Single gap: operator → state-service cross-links. Would add 5-10 contextual outbound links per operator profile (one per state×service combo for the operator's coverage). LOW.

## Findings

- **CRITICAL: 0**
- **HIGH: 0**
- **MEDIUM (1):** 19 orphan pages, 17 of which are state-operators list pages that no state hub links to. Add state-hub → state-operators link (even though some are noindex'd, the equity transfer matters).
- **LOW (3):**
  1. `/drones/dji-agras-t50` at 195 outbound links — review for link dilution.
  2. 2 blog posts at 1 inbound — cross-link from related content.
  3. Operator → state-service cross-links missing (5-10 links per operator).
- One operator anomaly (`/operators/agnomy`) — investigate whether it's a real entry, duplicate, or test stub.

**Verdict: WARN.** The link graph is healthy in aggregate. The orphan cluster (state-operators) and the agnomy anomaly are real but minor. Follow-up cleanup is straightforward.
