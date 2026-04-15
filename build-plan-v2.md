# US Ag Drone Directory — Build Plan v2 (Fixed)

Site: usss-terra.netlify.app
Audience: US farmers and ag drone operators
Goal: Rank in Google, Bing, and AI engines for thousands of US English ag drone keywords. Become the cited industry resource.

This v2 fixes the 14 weak points found in v1.

---

## Section A — What changed from v1

| Weak point in v1 | Fix in v2 |
|---|---|
| No feedback loop | Approval gate after every pillar session before scaling that template |
| No data-layer awareness | Each page deliverable separates static copy from dynamic slots |
| No URL migration plan | Session 4.5 produces a 301 redirect map before any URL change ships |
| No E-E-A-T plan | Author + reviewer system defined, applied across every page |
| Calculators too late | Calculators ship in week 1, alongside pricing page |
| Naive 50-state batching | State pages split into 5 regional batches of 10, not one batch of 50 |
| No image plan | Image sourcing rules + alt-text standard set in Session 4 |
| No acceptance criteria | Per-page checklist required before Claude Code accepts handoff |
| Stage 0 overloaded | Stage 0 expanded from 4 to 6 sessions |
| Blog briefs vs full posts | Blog posts written in full by me, not handed off as briefs |
| No AI Overviews format | "AEO block" required on every page (defined below) |
| No measurement setup | Session 0 covers GSC, Bing Webmaster, analytics, rank tracking |
| No maintenance plan | Quarterly refresh cycle defined |
| Session 1 missing scope | Add Section 44807 + sUAS reading of Part 137 |

---

## Section B — Foundational principles (apply to every session)

1. **No memory, only sources.** Every fact in every deliverable cites a research file or a primary source URL.
2. **No double dashes anywhere.** Use commas, periods, or rewording.
3. **Romanian-free.** Strip every Romanian word, currency (RON), and regulator (AFIR, AACR) from US copy.
4. **AEO block on every page.** Every page contains a 2-3 sentence "definitive answer" block at the top under H1, written in a way that Perplexity, ChatGPT, and Google AI Overviews can lift verbatim. Citable single sentences with concrete numbers.
5. **Schema on every page.** Minimum: BreadcrumbList. Page-type-specific: LocalBusiness, Service, FAQPage, Article, HowTo, GovernmentService.
6. **Internal links are intentional, not decorative.** Every page links to 3-5 other pages by exact-match or partial-match anchor.
7. **One H1, clear H2 tree, no orphan H3s.**
8. **Dynamic slots marked clearly.** Anywhere copy depends on database data (operator count, average price, top operators in state) gets a `{{slot_name}}` placeholder that Claude Code wires up.

---

## Section C — Author / E-E-A-T system

Without this, all 200 pages read as anonymous AI content and rank poorly.

**Required setup:**
- Pick one human "managing editor" name + photo + LinkedIn (could be Eugen, could be a pseudonym with a real LinkedIn profile and Twitter/X)
- Pick one or two "expert reviewers" who can be credited on regulation-heavy pages (a Part 137 operator willing to be named in exchange for free featured listing, plus an ag attorney or extension agent)
- Build `/about` with full bios, credentials, and a clear "How we research" methodology page
- Every page footer: "Last reviewed [date] by [name]"
- Schema: Person + Organization, with `sameAs` pointing to LinkedIn

This is non-negotiable for ranking in a regulation-adjacent vertical.

---

## Section D — Acceptance criteria (per-page checklist)

Claude Code does not ship a page until every box is checked. I include this checklist at the bottom of every page deliverable.

```
[ ] URL slug correct (English, hyphens, lowercase)
[ ] Title tag <= 60 chars, primary keyword in first 40 chars
[ ] Meta description <= 155 chars, includes CTA verb
[ ] H1 unique on the site, contains primary keyword
[ ] AEO block present, 2-3 sentences, contains a number
[ ] Heading tree is H1 > H2 > H3, no skips
[ ] Minimum 3 internal links, anchor text varied
[ ] Minimum 2 external links to authority sources (FAA, USDA, EPA, .edu)
[ ] Schema JSON-LD validates at validator.schema.org
[ ] FAQ block present (3-5 Q&A) with FAQPage schema
[ ] Image alt-text written for every image slot
[ ] Mobile readability verified (line length, button size)
[ ] No Romanian words, no double dashes
[ ] Author + last-reviewed date present
```

---

## Section E — Image plan

Three sources, ranked by preference:
1. Operator-supplied (request when they claim a free listing)
2. USDA / Extension service photos (public domain, citation required)
3. AI-generated (clearly disclosed in alt-text, only for hero/atmosphere, never for "this is a DJI Agras T50" specificity)

Stock photos of DJI drones flying over wheat are banned. They are everywhere and Google demotes them.

Every image: descriptive alt-text under 125 chars, includes primary keyword once where natural.

---

## Section F — Revised session plan

### Stage 0: Setup and research (6 sessions)

| # | Session | Deliverable | Status |
|---|---|---|---|
| 0 | Measurement + author setup | GSC, Bing Webmaster, Plausible/GA4, rank tracker, author bios, methodology page draft | Pending |
| 1 | FAA regs | `research-01-faa-regulations.md` | **In progress** (you started) |
| 2 | EPA + FIFRA + label law | `research-02-epa-pesticide-rules.md` | Pending |
| 3 | 50-state pesticide applicator licensing matrix | `research-03-state-licensing.md` (table format, one row per state, links to each state Dept of Ag) | Pending |
| 4 | USDA programs + insurance + drone specs + 2026 pricing | `research-04-usda-insurance-drones-pricing.md` | Pending |
| 5 | Keyword map + competitor gap analysis + AEO question harvest | `research-05-keyword-map.md` (every page mapped to primary + 5 secondary keywords, plus the 10 most-asked questions per topic from AlsoAsked / People Also Ask / Reddit) | Pending |

**Add to your in-progress Session 1 prompt:**
> Also cover: (a) Section 44807 exemption pathway as an alternative to Part 137, including which operators use it and why, (b) how Part 137 originally written for crewed aircraft is interpreted for sUAS, including FAA exemption requirements specific to drones over 55 lb, (c) the relationship between Part 107, Part 137, and the optional Remote Pilot Certificate.

### Stage 1: Pillar pages and templates (sessions 6 to 12)

Each is a single chat. After each one I stop. You review. You approve. Only then we scale that template.

| # | Session | Deliverable | Gate |
|---|---|---|---|
| 6 | Homepage | Full rewrite, all sections | Your approval |
| 7 | Pricing guide pillar | `/pricing` (long-form, the most important commercial page) | Your approval |
| 8 | 3 calculators (cost-per-acre, ROI buy-vs-hire, coverage time) | Full spec: formulas, input ranges, defaults, edge cases, output copy, schema | Claude Code builds, you test |
| 9 | Service template + all 6 service pages | One template proven across 6 instances | Your approval of template |
| 10 | Crop template + all 8 crop pages | One template, 8 instances | Your approval |
| 11 | State template + 3 sample states (Iowa, Texas, California, chosen for diversity) | Template proof | **Hard gate** before scaling to 50 |
| 12 | Drone model template + all ~10 drone pages | DJI Agras T50, T40, T25, Hylio AG-272, AG-230, XAG P100, XAG V40, Guardian SC1, plus any new 2026 models found in research | Your approval |

### Stage 2: Scaled state pages (sessions 13 to 17)

50 states split by region, 10 per session. This avoids context overload and lets each batch share regional context (Corn Belt states share crops, Great Plains shares wheat focus, etc).

| # | Session | States | 
|---|---|---|
| 13 | Corn Belt | IA, IL, IN, OH, MO, MI, WI, MN, KY, TN |
| 14 | Great Plains | KS, NE, ND, SD, MT, WY, CO, OK, NM, TX |
| 15 | Delta + Southeast | MS, AR, LA, AL, GA, FL, SC, NC, VA, WV |
| 16 | West Coast + Mountain | CA, OR, WA, ID, NV, UT, AZ, AK, HI |
| 17 | Northeast | PA, NY, MD, NJ, CT, DE, RI, MA, VT, NH, ME |

(That is 51 because some lists drift, normalize to 50 in execution.)

### Stage 3: Authority + resource pages (sessions 18 to 22)

| # | Session | Deliverable |
|---|---|---|
| 18 | Regulations hub + 4 sub-pages | `/regulations`, `/regulations/faa-part-107`, `/regulations/faa-part-137`, `/regulations/state-licensing`, `/regulations/ndaa-compliance` |
| 19 | Grants + insurance + training | `/grants-and-subsidies`, `/insurance`, `/training-and-certification` |
| 20 | Start-a-drone-business pillar (long-form, 4000+ words) | `/start-a-drone-business` |
| 21 | Buyer's guide + 2 comparison pages | `/buyers-guide`, `/comparisons/drone-vs-ground-rig`, `/comparisons/drone-vs-airplane` |
| 22 | 5 regional hub pages | `/regions/corn-belt`, `/regions/great-plains`, `/regions/delta`, `/regions/california`, `/regions/southeast` |

### Stage 4: Glue, blog, legal, handoff (sessions 23 to 27)

| # | Session | Deliverable |
|---|---|---|
| 23 | About + Contact + List-your-business + Glossary | 4 pages |
| 24 | Blog launch: 5 full articles (not briefs) | 5 fully written posts of 1500-2500 words each |
| 25 | Blog launch: 5 more full articles | 5 more posts |
| 26 | Privacy + Terms + List-your-business legal language | 3 pages |
| 27 | Final handoff doc for Claude Code | Build order, redirect map, sitemap.xml plan, robots.txt, internal linking master map, post-launch checklist |

### Session 4.5 (between Stage 0 and Stage 1)

URL migration plan: every Romanian slug mapped to its English replacement, with a 301 redirect rule for each one. This ships before any new URL goes live so we don't lose existing crawl signals.

---

## Section G — Per-page deliverable format (standardized)

Every page chat produces a markdown file with these sections in this order:

```
# [Page Name]

## Meta
- URL slug: 
- Primary keyword: 
- Secondary keywords (5): 
- Title tag (60 char): 
- Meta description (155 char): 
- Author: 
- Reviewer: 
- Last reviewed: 

## AEO block (top of page, under H1)
[2-3 sentences, definitive answer, contains a number, written for AI engines to lift]

## Page copy
[Full body, sectioned by H2/H3, dynamic slots marked {{slot_name}}]

## FAQ block
[3-5 Q&A, FAQPage schema-ready]

## Internal links
- [Anchor text] -> [URL]
- ...

## External authority links
- [Anchor text] -> [URL]
- ...

## Schema JSON-LD
[Block, validates at validator.schema.org]

## Image slots
- Slot 1: [purpose, alt-text, source preference]
- ...

## Acceptance checklist
[Copy of the standard checklist with boxes]

## Sources cited
- [Research file or external URL]
- ...
```

This is the contract. Claude Code knows exactly what to expect every time.

---

## Section H — URL migration map (drafted in Session 4.5)

| Old (Romanian) | New (English) | Redirect |
|---|---|---|
| /operatori | /operators | 301 |
| /operatori/[slug] | /operators/[slug] | 301 |
| /judete | /states | 301 |
| /judete/[slug] | /states/[slug] | 301 |
| /culturi | /crops | 301 |
| /culturi/[slug] | /crops/[slug] | 301 |
| /servicii | /services | 301 |
| /servicii/[slug] | /services/[slug] | 301 |
| /preturi-pulverizare-drona | /pricing | 301 |
| /adauga-operator | /list-your-business | 301 |
| /despre | /about | 301 |
| /drone | /drones | 301 |
| /drone/[slug] | /drones/[slug] | 301 |

Implemented via Netlify `_redirects` file. Claude Code handles.

---

## Section I — Maintenance plan (post-launch)

| Cadence | Task | Owner |
|---|---|---|
| Weekly | Search Console: check coverage errors, manual actions, new keywords | You |
| Monthly | Pricing page: confirm per-acre rates against latest forum/operator data | Me, in a refresh chat |
| Quarterly | Regulations pages: re-check FAA, EPA, state changes | Me, refresh research files first |
| Quarterly | State pages: refresh operator counts, top counties data | Me |
| Annually | Full content audit, identify decayed pages, prune or update | Me |

Every page's "last reviewed" date updates on refresh. This is also a ranking signal.

---

## Section J — What ships in week 1 vs later

**Week 1 (commercial intent, fastest revenue path):**
- Homepage rewrite
- /pricing
- 3 calculators
- 6 service pages
- 8 crop pages

**Week 2:**
- 50 state pages

**Week 3:**
- Regulations hub + sub-pages
- Grants, insurance, training
- Start-a-drone-business pillar
- Buyer's guide, comparisons
- Regional hubs

**Week 4:**
- About, contact, list-your-business, glossary
- 10 blog launch posts
- Legal pages
- Final handoff doc to Claude Code

---

## Section K — How to start each new chat

Open a fresh chat in this same project. Paste the session number, the goal, and a one-line scope. Example:

> Session 7. Goal: produce `/pricing` pillar page deliverable using the per-page format from build-plan-v2.md Section G. Source: research-04-usda-insurance-drones-pricing.md and research-05-keyword-map.md. Audience: US farmer comparing drone application against ground rig and airplane. Length: comprehensive, this is the highest-value commercial page on the site.

Keep one session per chat. Token budget stays clean, output stays focused.

---

End of plan v2.
