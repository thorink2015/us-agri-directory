# FULL SITE AUDIT AND REPAIR

You are auditing the entire US Ag Drone Directory codebase at github.com/thorink2015/usss-terra. Your job is to find every broken, missing, inconsistent, or incomplete thing and fix it, without breaking the live site at any point.

## RULES
- Read every file before changing it
- Never delete a working page or component without replacing it
- Commit after each fix category (not after each line change)
- Run `npm run build` after every commit to verify zero build errors
- If a build breaks, fix it immediately before moving to the next category
- Use /compact after every 3 to 4 commits to stay within context
- Do NOT batch more than 5 file changes per commit

## PHASE 1: INVENTORY (do not change anything yet)

1. Run `find src/ -name "*.tsx" -o -name "*.ts" | sort` and list every file
2. Run `find src/data/ -name "*.ts" | sort` and list every data file
3. Run `find src/app/ -type d | sort` and list every route directory
4. Read `package.json` for dependencies and scripts
5. Read `next.config.ts` or `next.config.js` for configuration
6. Read `CLAUDE.md` and any `_memory/*.md` files for project context
7. Read `tsconfig.json` for path aliases and compiler options
8. Run `npm run build 2>&1 | tail -100` and capture any current build errors or warnings

Output a summary: total files, total routes, total data files, current build status, any immediate errors.

## PHASE 2: TYPE SAFETY AUDIT

1. Read `src/data/types.ts` completely
2. For each data file (services.ts, crops.ts, drone-model.ts, regions.ts, states.ts, author.ts, glossary if exists):
   - Verify the exported array matches the TypeScript interface exactly
   - Check for missing required fields on any object
   - Check for typos in slug values (these become URLs)
   - Verify all slugs are lowercase, hyphenated, no spaces, no special chars
3. Fix any type mismatches, missing fields, or invalid slugs
4. Run `npx tsc --noEmit` to verify zero type errors
5. Commit: `audit(types): fix type mismatches and missing fields`

## PHASE 3: ROUTE AND PAGE AUDIT

For every directory under `src/app/`:
1. Verify `page.tsx` exists and exports a default component
2. Verify `generateMetadata` exists and returns title + description
3. Verify dynamic routes `[slug]` have `generateStaticParams`
4. Check for any page that imports from a data file that does not exist
5. Check for any page that references a component that does not exist
6. Check for broken imports (file path does not resolve)
7. Check for pages that render `{{placeholder}}` literally instead of resolving to a variable
8. Fix all issues found
9. Commit: `audit(routes): fix broken pages and imports`

## PHASE 4: COMPONENT AUDIT

1. List all components under `src/components/` or wherever components live
2. For each component:
   - Verify it is imported by at least one page (no orphan components)
   - Verify all props match their TypeScript interface
   - Verify `'use client'` directive exists on components using hooks, state, or browser APIs
   - Check for hardcoded strings that should be dynamic (especially operator counts, dates)
3. Fix all issues
4. Commit: `audit(components): fix broken components and props`

## PHASE 5: SCHEMA AUDIT

For every content page (not layout, not error pages):
1. Check that JSON-LD schema exists in the page
2. Verify schema type matches page purpose:
   - Content/article pages: Article + FAQPage + BreadcrumbList
   - Tool pages: SoftwareApplication + Article + FAQPage + BreadcrumbList
   - Homepage: Organization + Person + WebSite + SearchAction + FAQPage
   - State pages: Article + FAQPage + BreadcrumbList + ItemList
   - Glossary: DefinedTermSet + BreadcrumbList
   - Start-a-business: Article + HowTo + FAQPage + BreadcrumbList
3. Verify author and publisher reference @id values (not duplicated inline)
4. Verify BreadcrumbList has correct hierarchy
5. Fix missing or incorrect schema
6. Commit: `audit(schema): fix missing and incorrect JSON-LD`

## PHASE 6: SEO AUDIT

1. Check every page for:
   - Title tag exists and is <= 60 chars
   - Meta description exists and is <= 160 chars
   - H1 exists and is unique across the site (no two pages share an H1)
   - Canonical URL is set correctly
   - OpenGraph tags exist (og:title, og:description, og:url)
2. Check `robots.txt` exists and allows crawling
3. Check `sitemap.xml` generates and includes all public routes
4. Count total URLs in sitemap vs total pages built
5. Fix any gaps
6. Commit: `audit(seo): fix meta tags, titles, and sitemap gaps`

## PHASE 7: INTERNAL LINKS AUDIT

1. Grep all internal `href` values across the entire src/ directory
2. For each unique internal href, verify the target route exists
3. List any broken internal links (href points to a route that does not exist)
4. Check homepage for 25+ internal links (per spec)
5. Check pricing page for 20+ internal links
6. Check start-a-drone-business for 20+ internal links
7. Spot-check 5 state pages for 12+ internal links each
8. Fix broken links. Add missing links where pages fall below their minimum.
9. Commit: `audit(links): fix broken internal links and add missing ones`

## PHASE 8: DATA CONSISTENCY AUDIT

1. Price ranges: verify corn pricing ($12 to $18) is consistent across crops.ts, pricing page, services.ts spraying entry, corn state pages, and any blog post that mentions it. Repeat for soybeans, wheat, cotton, rice, grapes, orchards, cover crops.
2. Drone specs: verify T50 tank size (40L), MSRP ($22K to $28K post-tariff), and NDAA status (No) are consistent across drone-model.ts, buyers-guide, comparison tool data, blog posts, and any page that mentions the T50. Repeat for AG-272, T100, T25.
3. Operator count: verify a single dynamic source is used everywhere. No hardcoded numbers.
4. Fix any inconsistencies by updating to match the canonical data file value.
5. Commit: `audit(data): fix pricing, spec, and count inconsistencies`

## PHASE 9: STYLE AND COPY AUDIT

1. Search for double dashes: `grep -rn '\-\-' src/` (exclude node_modules, .next). Fix all.
2. Search for em dashes: `grep -rn '—\|–' src/`. Fix all.
3. Search for Romanian words: `grep -rn 'operatori\|servicii\|culturi\|judete\|despre\|preturi\|pulverizare\|tratament\|Acasă\|drona agricola' src/`. Fix all.
4. Search for AI giveaway phrases: `grep -rn 'delve\|it.s important to note\|game.changer\|revolutionize\|seamless\|cutting.edge\|robust\|leverage\|utilize' src/`. Reword all.
5. Search for unresolved placeholders: `grep -rn '{{' src/`. Fix all.
6. Commit: `audit(copy): fix dashes, Romanian, AI phrases, and placeholders`

## PHASE 10: DEPENDENCIES AND CONFIG AUDIT

1. Run `npm audit` and list vulnerabilities
2. Check for unused dependencies in package.json (installed but never imported)
3. Verify `next.config` has:
   - Image domains configured for any external images
   - Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
   - Redirects or rewrites if needed
4. Verify `.env.example` lists all required environment variables
5. Verify Netlify `_redirects` file exists with Romanian URL redirects
6. Fix issues
7. Commit: `audit(config): fix dependencies and configuration`

## PHASE 11: FINAL BUILD AND REPORT

1. Run `npm run build` and verify zero errors, zero warnings
2. Count total pages generated in the build output
3. Run `npx tsc --noEmit` and verify zero type errors
4. Output a final report:

```
AUDIT COMPLETE
==============
Total files audited: X
Total routes: X
Total pages in sitemap: X
Build status: PASS / FAIL
Type errors: 0
Broken internal links fixed: X
Schema issues fixed: X
Copy issues fixed: X
Data inconsistencies fixed: X
Commits made: X
```

5. If anything could not be fixed automatically, list it under "MANUAL ACTION REQUIRED" with the file path and issue description.
6. Final commit: `audit: complete full site audit and repair`
