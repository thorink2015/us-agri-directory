# _research — internal reference material

**This folder is NOT part of the live site.** It holds research documents, build
plans, and implementation specs used by Claude Code to build out the
directory. Delete the entire folder before (or on) the go-live cut.

Root-prefix `_research/` intentionally uses an underscore — Next.js App Router
only routes files under `src/app/`, so nothing in this folder is ever served,
rendered, or reachable via URL. It exists purely as reference material for
the build sessions.

## Contents

### Plans & specifications

| File | Purpose |
|---|---|
| `build-plan-v2.md` | 27-session SEO build roadmap authored in Claude browser. Master plan driving every Claude Code batch. |
| `author-eeat-spec.md` | Eugen's E-E-A-T implementation spec: author identity, bylines, Person/Organization schema, `/about` structure, footer credit. |

### Regulatory research (for content pages not yet built)

| File | Covers |
|---|---|
| `research-01-faa-regulations.md` | FAA Part 107, Part 137 (Agricultural Aircraft Operator), Remote Pilot Certificate, Remote ID, airspace authorization. Primary source for `/regulations/faa` pillar. |
| `research-01-faa-part-137-section-44807.md` | Detail sheet on 44807 exemptions and their relationship to Part 137. Appendix to research-01. |
| `research-02-epa-pesticide-rules.md` | EPA FIFRA, pesticide labels, drone-specific aerial application restrictions, Worker Protection Standard. Primary source for `/regulations/epa` pillar. |

### Operator directory research (seed data for operators.ts)

| File | Region covered |
|---|---|
| `operators-batch-1-northeast.md` | Northeast — 46 entities |
| `operators-batch-3-midwest-corn-belt.md` | Midwest / Corn Belt — 97 entities |
| `operators-batch-4a-great-plains.md` | Great Plains (KS, NE, ND, OK, SD, TX) — 126 entities |
| `operators-batch-4b-mountain-west.md` | Mountain West v1 — 60 entities |
| `operators-batch-4b-mountain-west-v2.md` | Mountain West v2 (newer pass) — 55 entities |
| `operators-batch-5-west-coast-pacific.md` | West Coast & Pacific overview — 67 entities |
| `operators-batch-5a-california.md` | California detail — 51 entities |
| `operators-batch-5b-pnw-ak-hi.md` | Oregon, Washington, Alaska, Hawaii — 36 entities |

### Research files not yet uploaded

Per `build-plan-v2.md`, still expected from Eugen:

- `research-03-state-licensing.md` — state-by-state pesticide applicator rules (unblocks 50 state pages)
- `research-04-usda-programs.md` — EQIP, FSA loans, grants, insurance (unblocks grants/pricing pillar)
- `research-05-keyword-map.md` — keyword map for homepage + pricing rewrite
- `operators-batch-2-southeast.md` — Southeast operators (not yet uploaded)

## Cleanup before production

```bash
# From repo root:
rm -rf _research
git add -A && git commit -m "Remove internal research folder before launch"
```

This is safe — nothing in `src/` imports from `_research/`.
