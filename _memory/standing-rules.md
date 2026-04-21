# Standing rules for every task on agdronedirectory.com

> Read at the start of every task. Every rule here is tailored to this
> repo, not a generic template. Confirm with "Standing rules loaded"
> before starting work on anything non-trivial.
>
> Last reviewed: 2026-04-21

---

## 0. Read order at session start

1. `_memory/copy-source-of-truth.md` — hard rule on what Claude Code may
   write vs. what must come from Eugen's research deliverables
2. `_memory/project-facts.md` — verified facts (author, domain, env,
   schema @ids, IndexNow key)
3. `_memory/standing-rules.md` — this file
4. `_memory/pending-items.md` — blockers and ready items
5. `_memory/code-patterns.md` — copy these for AEO, byline, schema,
   calculator tools, FAQ
6. `_memory/known-issues.md` — gotchas and fixes
7. `_memory/session-history.md` — what's been shipped

---

## 1. Repo shape (verified, 2026-04-21)

- Domain: `https://agdronedirectory.com`
- Stack: Next.js 14 App Router, TypeScript strict, Tailwind, Netlify
- Data: TypeScript modules in `src/data/` — no database, no CMS
  - `operators.ts` (391 today; use `operators.length`, never hard-code)
  - `counties.ts` (50 US states — includes Alaska + Hawaii, no DC)
  - `crops.ts` (9 crops)
  - `drone-model.ts` (9 models; exported as `drones`)
  - `blog-posts.ts`, `guides.ts`, `services.ts`, `regions.ts`
  - `author.ts` — SINGLE source of truth. Import `SITE`, `AUTHOR`,
    `personSchema()`, `organizationSchema()`. Never paraphrase the bio.
  - `types.ts` — `SERVICE_LABELS` drives the 10 service keys in the
    sitemap's 50 × 10 state+service matrix
- Branch: working branch name is set per session by the harness
  (currently `claude/add-drone-operators-directory-SBZ6P`). CLAUDE.md
  still references an older `T0YnN` — the session-specified branch wins.
  Always run `git branch --show-current` before the first commit.
- Never push to `main`. Main holds the old Romanian `droneagricol.ro`
  codebase plus raw research uploads; merging main in would reintroduce
  Romanian URLs.

## 2. No-hallucination rules (from `copy-source-of-truth.md`)

- Long-form body copy (regulatory facts, pricing claims, statistics,
  quotes, substantive FAQ answers) must come from a deliverable in
  `_research/`. If none exists, scaffold the page + schema and flag the
  gap in `_memory/pending-items.md`. Don't invent.
- Numbers on the site come from real data files or cited primary
  sources (FAA, EPA, USDA, land-grant extension). Headline benchmarks
  already canonicalized on the site:
  - **$12.50/acre** Iowa State 2026 Custom Rate Survey average
  - **10.3M acres** American Spray Drone Coalition 2024 total
  - **980 acres/year** University of Missouri G1274 breakeven
  - **47 operator responses** in the Iowa State 2026 survey
  Use these verbatim. Do not re-estimate or round.
- Read the homepage (`src/app/page.tsx`) and `/about` once per session
  to recalibrate voice before writing new body copy. Direct sentences,
  farmer-first framing, no marketing fluff, no em dashes.

## 3. After adding or removing ANY page

All four must pass before commit:

1. **Sitemap.** `src/app/sitemap.ts` is a MANUAL list for top-level
   static pages. Auto-generated sections only cover operators, states,
   state+crop, state+service, state/operators, crops, services, drones,
   regions, blog posts, guides and the 6 tool calculators. New top-level
   static routes (e.g. `/advertise`, `/newsletter`) MUST be appended to
   `staticPages`. **Known gap to fix:** `/advertise` (merged in PR #58)
   is NOT in the sitemap yet.
2. **Robots.** `src/app/robots.ts` disallows `/api/`, `/_memory/`,
   `/_research/`, `/_handoff/` only. Never widen the disallow list.
   Never shrink the 27-AI-crawler allowlist (GPTBot, ClaudeBot,
   PerplexityBot, OAI-SearchBot, ChatGPT-User, Perplexity-User,
   Google-Extended, Googlebot, Googlebot-Image, anthropic-ai,
   Claude-Web, cohere-ai, CCBot, Diffbot, Applebot, Applebot-Extended,
   Bytespider, YouBot, meta-externalagent, FacebookBot, Amazonbot,
   Bingbot, DuckDuckBot, MistralAI-User, xAI-Bot, Grok, Timpibot).
3. **Schema.** Every page emits `BreadcrumbList` JSON-LD with the full
   hierarchy `Home > Section > Page`. Plus a page-type schema:
   - `Article` — blog posts, guides, crop/service/region pages, pricing
   - `FAQPage` — any page with a Q&A section (rendered with
     `FAQAccordion`); use the existing pattern in `code-patterns.md`
   - `SoftwareApplication` — tool calculator pages
   - `ProfessionalService` or `LocalBusiness` — operator profiles
   - `AboutPage` — `/about`; `ContactPage` — `/contact`
   - `WebPage` — generic static pages like `/advertise`, `/pricing` hub
   - Always reference author + publisher by `@id`, never inline:
     `author: { '@id': AUTHOR.personId }` and
     `publisher: { '@id': AUTHOR.organizationId }`. The canonical Person
     and Organization blocks are emitted once from the homepage.
4. **Internal linking.** Link TO the new page from ≥2 related pages and
   FROM it to ≥2 related pages. No orphans. Everything within 3 clicks
   of `/`. Every route appears in the footer, a hub page, or a content
   page's in-text link set.

## 4. H1, title, meta, URL

- Exactly one `<h1>` per page, containing the primary keyword, unique
  across the site. H2 → H3, no skips.
- Meta title < 60 chars, primary keyword in the first 40.
- Meta description < 155 chars, includes a CTA verb (Find, See, Compare,
  Get). Always include a real number when possible (operator count,
  state count, price).
- `alternates.canonical` is a relative path (`'/advertise'`), never
  absolute. Next.js expands via `metadataBase` in
  `src/app/layout.tsx`.
- URLs: lowercase, hyphen-separated, no trailing slash, no query strings
  for indexable routes.
- No duplicate titles or descriptions. If two pages risk colliding, vary
  by state/crop/service variable.

## 5. AEO answer block (when to add)

Add if the page has substantial body copy (any crop, service, region,
regulation, pricing, comparison, or concept page). Pattern is fixed in
`_memory/code-patterns.md`:

```tsx
<div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
  <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
</div>
```

- 130–160 words (short answer pages can go to 80)
- Contains ≥1 specific number (price, acreage, %, count)
- Sits directly under `<Byline>` and above body content
- Must be quotable verbatim by Google AI Overviews / Perplexity without
  breaking mid-sentence

## 6. Bylines + author card on content pages

Every page with body copy renders `<Byline lastUpdated={...} />` under
the H1 and `<AuthorCard />` at the end. Drives E-E-A-T and Google's
last-updated parser. Fallback constant: `const LAST_REVIEWED =
'YYYY-MM-DD';` per page.

## 7. Forms

- All forms POST to `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  as JSON.
- Every form MUST include `<input type="hidden" name="_form_type" value="..." />`
  so Formspree submissions are categorizable. Existing values in use:
  `contact`, `list-your-business`, `newsletter`, `exit-intent-lead`.
  Reuse before inventing new ones.
- Emails on pages use `<MailtoLink email={AUTHOR.publicEmail}>...</MailtoLink>`,
  never a raw `<a href="mailto:...">`. The component defers the `href`
  to client mount so Cloudflare's Email Address Obfuscation doesn't
  rewrite the SSR HTML to `/cdn-cgi/l/email-protection` (which 404s
  to crawlers). See `src/components/ui/MailtoLink.tsx`.

## 8. Performance (PageSpeed is 99+, keep it there)

- No synchronous external scripts. Use `next/script` with
  `strategy="afterInteractive"` or `"lazyOnload"`. GA4 and AdSense are
  already wired this way in `src/app/layout.tsx`.
- Dynamic-import any module >50KB (client-only charts, heavy editors).
- `next/image` or equivalent for every image. Always supply width,
  height, alt text. No raw `<img>`.
- No layout-shifting inline styles. Reserve space for dynamic content
  (placeholders, skeleton).
- Build check after each batch: `npm run build` (or confirm Netlify
  preview is green on the PR before asking for merge).

## 9. Voice, content, and what's forbidden in output

- No em dashes (—), no en dashes (–), no double hyphens (--). Use a
  period, a comma, a colon or "and".
- No Romanian words, no RON, no lei, no Moldova, no TerraDron,
  no "droneagricol". All prices in USD.
- Direct, data-driven, farmer-friendly tone. Match the homepage and
  `/about`. No "in today's fast-paced world" style intros.
- Use real counts: `operators.length`, `counties.length`, `crops.length`,
  `blogPosts.length`. Write them as `${n}+` to match the homepage
  pattern.
- No generic "partner with us" or "take your business to the next level"
  language anywhere. Every sentence should only make sense on this site.

## 10. Commit and push discipline

- 1–3 items per batch, commit, push, report, wait for "next".
- Conventional commit subject: `feat(pages):`, `fix(schema):`,
  `content(state-iowa):`, `chore(memory):`, etc. Subject ≤72 chars.
  Optional body of 2–3 lines explaining the why, not the what.
- No `Co-Authored-By` unless asked.
- Never `--no-verify`, never `--amend` pushed commits, never force-push.
- After push, always create the PR as a draft if none exists (per
  session harness instructions). Do not merge yourself.
- Update `_memory/session-history.md` in the same commit as the work
  it describes.

## 11. What must not be touched without explicit instruction

- `src/data/author.ts` — identity + schema @ids are canonical. Bio is
  frozen.
- `netlify/plugins/indexnow/` + `scripts/ping-indexnow.mjs` + the
  IndexNow key file `public/199aa73a01c74f6786948b45aaec2d17.txt`.
  IndexNow pings on every successful production deploy.
- `public/llms.txt`, `public/llms-full.txt`, `public/ads.txt`.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` wiring in `src/app/layout.tsx` or
  `src/components/analytics/`.
- The 27-crawler allowlist in `src/app/robots.ts` (see §3).

## 12. When a rule conflicts with a request

Tell the user the conflict. Cite the rule and the specific line.
Don't silently do one or the other. Examples:

- "That page would have body copy without a deliverable — copy-source-
  of-truth.md §1 blocks this. I can scaffold structure now, or you can
  drop a research file in `_research/`."
- "That change widens the robots disallow to `/tools/`, which violates
  standing-rules §3.2. Confirm you want that?"

---

*Adjust this file when a rule is actually broken or a new convention
emerges. Don't grow it from taste.*
