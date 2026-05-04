# Service-state combo feasibility audit

Audit date: 2026-05-02
Branch: `claude/audit-public-content-w2Iz1`
Reference: requested deliverable 2.

---

## Headline (override)

**The service-state route already ships and builds 500 pages.** Route is `/states/[slug]/services/[service]/page.tsx` (187 lines, all 50 states × 10 services = 500). Rendered word counts average **1002, median 893, min 585, max 2691** — already substantively above the 300-word indexation floor. The real questions are (1) per-page **uniqueness**, not raw word count, and (2) which combos have **enough operator coverage** to keep the page from being mostly empty.

Subsequent sections answer those.

---

## 1. Service inventory — `/services/[slug]` exists

All 10 services are defined in `src/data/services.ts` and have a corresponding `/services/[slug]` page at `src/app/services/[slug]/page.tsx`:

| Slug | Display name | Per-acre rate range |
|---|---|---|
| `spraying` | Drone Pesticide Spraying | $12–$22 |
| `seeding` | Aerial Cover Crop Seeding | $12–$18 |
| `mapping` | Agricultural Drone Mapping | $2–$8 |
| `monitoring` | Crop Health Monitoring | $3–$10 |
| `spreading` | Dry Granular Spreading | $10–$18 |
| `training` | Ag Drone Pilot Training | $500–$4,500/course |
| `rental` | Agricultural Drone Rental | $2,000–$8,000/week |
| `sales` | Agricultural Drone Sales | $22,000+/unit |
| `consultancy` | Ag Drone Business Consultancy | $100–$300/hr |
| `emergency` | Emergency Spray Services | $18–$35 |

The 10 services hub pages render an average of 1,127 words each (range 970–1,202).

---

## 2. State-service route — already exists

**Route:** `src/app/states/[slug]/services/[service]/page.tsx` (187 lines).
**Page count:** `counties.length × services.length = 50 × 10 = **500 pages**`. All buildable today.

### Current rendered output (full main column, header/footer/breadcrumb/sidebar/scripts excluded)

```
/states/[slug]/services/[service]   500 pages
  avg     1002 words
  median   893 words
  min      585 words   (e.g. arizona/rental)
  max     2691 words   (e.g. tennessee/spraying)
```

### What it currently renders (skim)

- Breadcrumb + H1 (`${service.name} in ${county.name}`)
- Generic service-state metadata (title + description with state name + service name interpolated)
- Service description and per-acre rate range from `services.ts`
- Operators in that state offering that service (filtered from `getOperatorsByCounty(stateSlug)`)
- Generic FAQ block (3 FAQs interpolating state and service)

### Lift opportunity (matches the patterns we shipped in PRs #93 and #94)

If word count averages 1,002 already, the page isn't thin in raw text. The risk is **per-page uniqueness across the 500 combos** — the same template-bound copy gets reused for every state for a given service, with only the state name interpolated. The state-crop uplift in PR #94 solved exactly this by threading state-specific data (sprayWindows, topCrops, licensing). The same pattern transfers cleanly here:

1. **Inject `state.sprayWindows[]` filtered to service-relevant entries** — e.g. for `spraying`, list every state spray window; for `seeding`, list "Cover crop seeding" entries from `sprayWindows`.
2. **State licensing block** matching `services` legal requirements — same `aerialCategory` + `licensingAgency` block as the state-crop pages.
3. **State `aeoBlock`** (3-4 sentences of state-specific drone-ag context) — already on every `StateData` entry.
4. **Crop-pricing context for the state's `topCrops`** — only when the service is rate-relevant (spraying, seeding, monitoring, spreading, emergency).
5. **Combine the existing 3 generic state-service FAQs with `service.faqs[]`** — the service entry already has FAQs in `services.ts`.
6. **FAQPage JSON-LD** — same inline `<script type="application/ld+json">` pattern from the state-crop and operator pages.
7. **Noindex gate on weak combos** — the next section quantifies these.

A `state-service-content.ts` helper module mirroring `state-crop-content.ts` would land this in one short PR.

---

## 3. Operator coverage matrix: states with ≥3 operators per service

Built from `operators[]`. For each `(operator, state-it-covers, service-it-offers)` tuple, count.

### Compact summary

| Service | States with ≥3 operators | States with ≥2 | States with ≥1 |
|---|---:|---:|---:|
| `spraying` | **46** | 46 | 47 |
| `seeding` | **43** | — | — |
| `sales` | **42** | — | — |
| `training` | **39** | — | — |
| `spreading` | **33** | — | — |
| `monitoring` | **31** | — | — |
| `mapping` | **26** | — | — |
| `consultancy` | **12** | — | — |
| `rental` | **4** | — | — |
| `emergency` | **0** | 0 | small |
| **Total combos at ≥3** | **276** | **320** | **386** |

The `≥2` and `≥1` columns are thresholds run for context; the per-service split for those isn't enumerated here, only the totals.

### State-by-state, service-by-service (≥3 operators)

| Service | States covered (abbrev) |
|---|---|
| `spraying` (46) | IA, IL, IN, OH, MO, MN, WI, KS, OK, NE, TX, CO, MS, AR, LA, TN, AL, CA, SD, ND, WY, MI, KY, GA, FL, SC, NC, WA, OR, ID, VA, WV, MD, PA, NY, NJ, CT, DE, NH, MA, VT, ME, NM, MT, UT, HI |
| `seeding` (43) | IA, IL, IN, OH, MO, MN, WI, KS, OK, NE, TX, CO, MS, AR, LA, TN, AL, SD, ND, WY, MI, KY, VA, NC, SC, GA, WV, FL, MD, VT, NH, ME, MA, PA, NY, NJ, CT, MT, ID, WA, OR, UT, CA |
| `mapping` (26) | CA, WA, OR, ID, GA, AL, FL, NC, SC, TN, VA, KY, MS, NY, PA, NJ, NH, MA, VT, ME, OH, IA, MI, KS, TX, HI |
| `monitoring` (31) | IA, IL, IN, OH, MO, MN, WI, KS, OK, NE, TX, CA, MI, KY, GA, AL, FL, SC, NC, TN, WA, OR, ID, VA, WV, MS, AR, LA, NY, ND, SD |
| `spreading` (33) | NE, SD, ND, KS, VA, NC, SC, GA, TN, KY, WV, AL, MS, FL, LA, AR, TX, IA, IL, IN, OH, MD, OK, NM, MI, MN, MO, WI, ID, WA, OR, MT, CA |
| `training` (39) | GA, AL, FL, NC, TN, MS, TX, KY, VA, AR, LA, KS, NE, IA, IL, OH, WV, MO, OK, NJ, NY, DE, RI, ME, VT, MA, MD, PA, CT, NH, MI, MN, CO, MT, ID, UT, OR, WA, CA |
| `rental` (4) | ID, CA, OR, WA |
| `sales` (42) | GA, AL, FL, NC, SC, TN, MS, VA, TX, AR, LA, KS, NE, IA, IL, IN, OH, CA, MO, OK, NJ, NY, DE, RI, ME, VT, MA, MD, PA, CT, NH, WV, SD, MI, MN, ND, CO, MT, ID, UT, OR, WA |
| `consultancy` (12) | CA, GA, AL, FL, NC, SC, TN, MS, VA, WV, MD, LA |
| `emergency` (0) | none with ≥3 operators |

### Coverage gaps worth flagging

- **`emergency` has zero states with ≥3 operators.** This service is functionally absent from the operator dataset. The 50 `/states/[slug]/services/emergency` pages all render with a "no operators in this state offering this service" fallback. Strong noindex candidate across all 50.
- **`rental` has only 4 states** with ≥3 operators. The other 46 emergency-rental combos are thin operator coverage.
- **`consultancy` has 12 states** — about a quarter coverage.
- **`spraying`, `seeding`, `sales`, `training` are nearly universal** (39–46 of 50 states each). These are the core combos to prioritize for content uplift.

---

## 4. Total realistic service-state pages

### At each operator-coverage threshold

| Threshold | Total combos | % of 500 | Recommendation |
|---:|---:|---:|---|
| **≥1 operator** | 386 | 77% | Indexable with template uplift; the other 114 should noindex |
| **≥2 operators** | 320 | 64% | Comfortable coverage |
| **≥3 operators** | **276** | **55%** | Sweet spot — strong signal, room to write defensible state-specific copy |

### Recommended approach (mirrors PR #94 state-crop)

- **Build all 500 pages** in `generateStaticParams` — every URL stays resolvable from internal links and the related-services chip row.
- **Apply a noindex gate** at the page metadata level: `<meta name="robots" content="noindex, follow"/>` when (a) `state.topCrops` doesn't suggest this service is relevant to the state's ag mix AND (b) zero operators in the state offer this service.
- **Estimated noindex count:** ~120–150 of 500. Distribution will skew heavily to `emergency` (50 of 50), `rental` (46 of 50), `consultancy` (~38 of 50), with a tail across other services in non-ag states (Alaska, Hawaii, RI, DE, etc.).
- **Estimated indexable count after gating:** **~350–380 pages**, each backed by either operator coverage or a state-curated topCrops signal.

---

## Summary

- The route exists, builds 500 pages, and averages 1,002 words rendered. Raw word count is not the bottleneck — **per-page uniqueness across 500 near-identical templates is**.
- **276 of 500** combos have ≥3 operators offering the service in the state. **320** at ≥2. **386** at ≥1.
- **Strongest service coverage:** `spraying` (46 states), `seeding` (43), `sales` (42), `training` (39).
- **Weakest:** `emergency` (0 states ≥3), `rental` (4), `consultancy` (12).
- **Recommended next move:** apply the same template uplift + noindex gate pattern from PR #94 (state-crop). Build the helper at `src/lib/state-service-content.ts`, thread `state.sprayWindows[]`, `state.aeoBlock`, `state.aerialCategory`, `state.licensingAgency`, and `service.faqs[]` into the page. Gate weak combos at metadata level.
- **Realistic indexable target after gating:** ~350–380 service-state pages, each with state-specific copy and either operator or curator-confirmed signal.
