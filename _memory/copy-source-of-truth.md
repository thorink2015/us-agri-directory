# Copy source-of-truth rule

> Hard rule. Read at the start of every session. Violating this breaks
> the no-hallucination guarantee the site depends on for E-E-A-T.

## The rule

**All page body copy on this site comes from research-cited deliverables
produced in Eugen's chat sessions with Claude in browser.** Claude Code
does NOT write page body copy from memory.

If a page needs copy and no deliverable exists for it:

1. Mark the page as pending in `_memory/pending-items.md`
2. Explain to Eugen what deliverable is needed
3. **Stop.** Do not fill the gap with invented copy.

## What counts as "body copy" (must come from a deliverable)

- Long-form prose (paragraphs, narrative sections)
- Regulatory facts, pricing claims, statistics, quotes
- Bullet lists of substantive claims (insights, advantages, warnings)
- FAQ answers with factual content
- Any text that could be fact-checked

## What Claude Code may write directly (no deliverable needed)

- **AEO blocks** — may be drafted from deliverable source material, but
  if no deliverable exists, request one. Never fabricate numbers.
- **Schema / JSON-LD** — always fine (it's structural, not factual)
- **UI microcopy** — button labels, form placeholders, loading states,
  empty states, error messages
- **Navigation labels** and **breadcrumb labels**
- **Code comments** and **commit messages**
- **Component scaffolding** — layout, styling, Tailwind classes,
  props interfaces
- **Type definitions** and **data interface shapes** (without
  populating content)
- **Icons, accessibility attributes, `alt` text** for non-content images
- **Pattern-based strings** that interpolate real data
  (e.g. `` `${crop.name} operators in ${state.name}` ``)

## Deliverable source locations

| Where | Contents |
|---|---|
| `_research/research-01-faa-regulations.md` | FAA Part 107/137 facts, certification details |
| `_research/research-02-epa-pesticide-rules.md` | EPA FIFRA, label compliance, WPS facts |
| `_research/operators-batch-*-*.md` | Regional operator seed data for `src/data/operators.ts` |
| `_research/build-plan-v2.md` | Page structure specs and section-by-section briefs |
| `_research/author-eeat-spec.md` | Author bio (already canonicalized in `src/data/author.ts`) |

**Still missing (blocks new page creation):**
- `research-03-state-licensing.md` → blocks `/regulations/state-licensing` and 50 state pages
- `research-04-usda-programs.md` → blocks grants, insurance, training, `/pricing` rewrite
- `research-05-keyword-map.md` → blocks homepage rewrite, `/pricing` pillar
- `operators-batch-2-southeast.md` → blocks Southeast operator seed data

## What to do when Eugen asks for copy without a deliverable

Correct response:

> "This page needs research-03 / research-04 / [specific deliverable]
> which hasn't been uploaded yet. I can scaffold the page structure
> (schema, byline, author card, section placeholders) now, but I
> won't fill the body copy until the deliverable lands. Drop the
> file in `_research/` and I'll populate."

Incorrect response (do NOT do this):

> "Here's a draft based on what I know about the topic…"

This is the hallucination trap. Eugen's site ranks on primary-source
citation. Made-up copy breaks that.

## Exceptions

None. If in doubt, stop and ask.
