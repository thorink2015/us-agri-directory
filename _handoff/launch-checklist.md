# Launch Checklist

Reference for Eugen and Claude Code as a post-launch checklist. Not built
by Next.js (outside `src/`).

## Part 1: Build verification checklist

```
PAGES (verify each renders, has correct schema, no build errors):

Core pages:
[ ] / (homepage)
[ ] /about
[ ] /contact
[ ] /list-your-business
[ ] /privacy
[ ] /terms
[ ] /glossary

Content pillar pages:
[ ] /pricing
[ ] /start-a-drone-business
[ ] /buyers-guide
[ ] /comparisons/drone-vs-ground-rig
[ ] /comparisons/drone-vs-airplane

Regulations:
[ ] /regulations
[ ] /regulations/faa-part-107
[ ] /regulations/faa-part-137
[ ] /regulations/state-licensing
[ ] /regulations/ndaa-compliance

Authority pages:
[ ] /grants-and-subsidies
[ ] /insurance
[ ] /training-and-certification

Tools:
[ ] /tools
[ ] /tools/spray-cost-calculator
[ ] /tools/roi-calculator
[ ] /tools/coverage-calculator
[ ] /tools/acreage-converter
[ ] /tools/drone-comparison
[ ] /tools/treatment-calendar

Data-driven pages:
[ ] /services (index)
[ ] /services/spraying (and all 9 other service slugs)
[ ] /crops (index)
[ ] /crops/corn (and all 7 other crop slugs)
[ ] /drones (index)
[ ] /drones/dji-agras-t50 (and all 8 other drone slugs)
[ ] /regions (index)
[ ] /regions/corn-belt (and all 4 other region slugs)
[ ] /states (index with 50-state grid)
[ ] /states/iowa (and all 49 other state slugs)

Blog:
[ ] /blog (index)
[ ] /blog/corn-fungicide-drone-spraying-guide
[ ] /blog/faa-part-137-drone-guide
[ ] /blog/cover-crop-seeding-drone-guide
[ ] /blog/dji-vs-hylio-which-spray-drone
[ ] /blog/drone-spraying-state-license-guide
[ ] /blog/drone-spraying-pricing-trends-2026
[ ] /blog/ndaa-chinese-drones-what-farmers-need-to-know
[ ] /blog/drone-spraying-rice-guide
[ ] /blog/vineyard-drone-spraying-guide
[ ] /blog/first-1000-acres-drone-operator

TOTAL: ~120+ pages
```

## Part 2: Schema validation

Run every page type through validator.schema.org:

- Organization + Person + WebSite (homepage)
- Article + FAQPage + BreadcrumbList (all content pages)
- SoftwareApplication (6 tool pages)
- HowTo (start-a-drone-business)
- ItemList (state pages with operators, services index, crops index)
- DefinedTermSet (glossary)

## Part 3: Technical SEO checklist

```
[ ] sitemap.xml generates correctly with all ~120+ URLs
[ ] robots.txt allows all crawlers, references sitemap
[ ] IndexNow pings Bing/Yandex on deploy
[ ] Google Search Console: submit sitemap, verify ownership
[ ] Bing Webmaster Tools: submit sitemap
[ ] Canonical URLs correct on every page (https://agdronedirectory.com/...)
[ ] No duplicate title tags across the site
[ ] No duplicate meta descriptions
[ ] All H1s unique
[ ] All images have alt text
[ ] No broken internal links (run a crawler: Screaming Frog or similar)
[ ] No broken external authority links
[ ] Core Web Vitals: LCP < 2.0s, CLS < 0.05, INP < 100ms
[ ] Mobile responsive on all pages
[ ] HTTPS enforced (Cloudflare)
[ ] _memory/ and _research/ folders removed from production build
[ ] {{placeholder}} slots all resolved (no literal curly braces rendering)
```

## Part 4: Content consistency pass (the standing TODO from memory)

This is the integration pass noted in memory item #9. Go through every
page and verify:

```
[ ] Keywords from research-05 keyword map applied to title tags and H1s
[ ] Internal links: every page links to 8+ other pages minimum
[ ] Authority links: every content page has 2+ external .gov or .edu links
[ ] AEO blocks: every content page has a green callout with numbers
[ ] FAQ schema: every content page has FAQPage markup
[ ] Byline + author card: every content page has both
[ ] Last reviewed date: every page shows a date
[ ] No double dashes anywhere on the site
[ ] No em dashes anywhere on the site
[ ] No Romanian words anywhere on the site
[ ] Operator count consistent (single source of truth, no 113 vs 131 mismatch)
[ ] Price ranges consistent between pricing page, crop pages, service pages, and state pages
[ ] Drone specs consistent between drone pages, buyer's guide, comparison tool, and blog posts
```

## Part 5: Post-launch maintenance schedule

| Cadence | Task | Owner |
|---|---|---|
| Weekly | Search Console: coverage errors, manual actions, new keywords | Eugen |
| Monthly | Pricing page: confirm rates against latest operator/survey data | Claude (refresh chat) |
| Quarterly | Regulations pages: re-check FAA, EPA, state changes | Claude (research refresh) |
| Quarterly | State pages: refresh operator counts, licensing changes | Claude |
| Quarterly | Blog: publish 2 to 3 new posts per quarter | Claude (content chat) |
| Annually | Full content audit: identify decayed pages, prune or update | Claude |
| As needed | Drone specs: update when manufacturers release new models | Claude |
| As needed | New state legislation affecting drone licensing | Claude (research) |

## Part 6: Redirect map (if any old URLs remain)

If any Romanian URLs from the original site are still indexed:

```
/operatori -> /operators (or /states)
/culturi -> /crops
/culturi/[slug] -> /crops/[slug]
/servicii -> /services
/servicii/[slug] -> /services/[slug]
/preturi-pulverizare-drona -> /pricing
/adauga-operator -> /list-your-business
/despre -> /about
/drone -> /drones
/drone/[slug] -> /drones/[slug]
/unelte -> /tools
/ghid -> /start-a-drone-business
```

Implement via Netlify `_redirects` file with 301 status codes.

## Part 7: Future content roadmap (post-launch)

| Priority | Page/Feature | Notes |
|---|---|---|
| High | Operator profiles (real operators submit listings) | The directory's core value. Promote /list-your-business. |
| High | 5 more blog posts per quarter | Maintain fresh content signal |
| Medium | County-level pages (programmatic) | /states/iowa/polk-county pattern. Only when operator data supports it. |
| Medium | Operator reviews/ratings | User-generated content. Adds E-E-A-T. |
| Low | Spanish language pages | For Texas, California, Florida markets |
| Low | Video embeds on crop and drone pages | YouTube tutorials, field demos |
