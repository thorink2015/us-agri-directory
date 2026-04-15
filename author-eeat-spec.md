# Author and E-E-A-T Implementation Spec

For Claude Code. Implement these changes site-wide. Single source of truth for author identity, bylines, schema, and reviewer infrastructure.

---

## 1. Author identity (single author site)

**Name:** Eugen [Last Name]
**Role:** Founder and Editor
**Photo:** [path to photo, square, 400x400 minimum, friendly natural light, no stock]
**Email (public):** [eugen@yourdomain.com]
**LinkedIn:** [https://linkedin.com/in/...]
**X / Twitter (optional):** [https://x.com/...]

Replace the bracketed placeholders before pushing to production. Use the same name and photo everywhere on the site, no variations.

---

## 2. Author bio (canonical version)

This bio appears on the `/about` page and is referenced by Person schema. One canonical version, do not paraphrase across pages.

> Eugen is the founder and editor of [Site Name]. He grew up in an agricultural family in [country/region], studied [field] at university, and has worked hands-on with agricultural drone technology in European markets. He built this directory after seeing how scattered and incomplete US ag drone information was for the farmers who need it most. Every page on this site is written or edited by him personally.

Eugen edits this paragraph once with real specifics, then it is locked. No fabricated credentials. No claim to be a Part 137 operator or US licensed applicator.

**Short bio (for byline cards, max 220 chars):**
> Eugen is the founder and editor of [Site Name]. He built this directory to give US farmers a single trusted place to find verified ag drone operators, regulations, and pricing.

---

## 3. Byline implementation (every content page)

**Render at top of every content page**, directly under H1, before the AEO block:

```html
<div class="byline">
  <img src="/images/eugen-author.jpg" alt="Eugen, Founder and Editor" width="40" height="40">
  <span>By <a href="/about">Eugen</a>, Founder | Last updated <time datetime="YYYY-MM-DD">[Month DD, YYYY]</time></span>
</div>
```

**Render at bottom of every content page**, before the footer:

```html
<aside class="author-card">
  <img src="/images/eugen-author.jpg" alt="Eugen, Founder and Editor">
  <div>
    <strong>About the author</strong>
    <p>[short bio from section 2]</p>
    <a href="/about">More about Eugen →</a>
  </div>
</aside>
```

The `<time>` `datetime` attribute pulls from the page's `lastUpdated` field in the CMS or frontmatter. This is what Google reads.

---

## 4. Reviewer slot (deferred, not rendered yet)

Future-proof the template now so reviewer credit can be added later without rebuilding pages.

**Add to every content page template (HTML comment for now, hidden):**

```html
<!-- reviewer slot, do not render until populated -->
<div class="reviewer" data-reviewer-name="" data-reviewer-credentials="" data-reviewer-date="" hidden>
  Technically reviewed by <span class="reviewer-name"></span>, <span class="reviewer-credentials"></span> on <time class="reviewer-date"></time>.
</div>
```

When a real reviewer is secured, populate the data attributes and remove `hidden`. CSS to display when populated:

```css
.reviewer:not([hidden]) { display: block; }
```

Same in the JSON-LD: include `reviewedBy` field commented out, ready to enable.

---

## 5. Schema markup (required on every page)

### Person schema (homepage and /about, can also be referenced by `@id` from other pages)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://[yourdomain].com/about#eugen",
  "name": "Eugen [Last Name]",
  "jobTitle": "Founder and Editor",
  "image": "https://[yourdomain].com/images/eugen-author.jpg",
  "url": "https://[yourdomain].com/about",
  "sameAs": [
    "https://linkedin.com/in/...",
    "https://x.com/..."
  ],
  "worksFor": {
    "@type": "Organization",
    "@id": "https://[yourdomain].com/#organization"
  },
  "description": "[short bio from section 2]"
}
```

### Organization schema (homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://[yourdomain].com/#organization",
  "name": "[Site Name]",
  "url": "https://[yourdomain].com",
  "logo": "https://[yourdomain].com/images/logo.png",
  "founder": { "@id": "https://[yourdomain].com/about#eugen" },
  "description": "Directory of verified US agricultural drone operators, with regulations, pricing, and resources for farmers.",
  "sameAs": [
    "https://linkedin.com/company/...",
    "https://x.com/..."
  ]
}
```

### Article schema (every blog post, guide page, regulation page)

Add `author` and `publisher` referencing the Person and Organization above by `@id`:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[page H1]",
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "author": { "@id": "https://[yourdomain].com/about#eugen" },
  "publisher": { "@id": "https://[yourdomain].com/#organization" },
  "image": "[page hero image URL]",
  "mainEntityOfPage": "[page URL]"
}
```

`reviewedBy` field stays out for now. Add when reviewer secured.

---

## 6. About page structure

Replace whatever exists at `/about` with this structure:

1. **H1:** About [Site Name]
2. **AEO block** (3 sentences): What the site is, who runs it, why it exists. Contains a number (operator count or year founded).
3. **H2:** Why this directory exists (founder story, 2-3 paragraphs)
4. **H2:** Who runs this site (Eugen bio + photo + LinkedIn link)
5. **H2:** How we research (methodology paragraph: every regulatory fact cited to FAA, EPA, USDA primary sources; pricing data from operator surveys and public listings; updated quarterly)
6. **H2:** What this site is not (honest limitations: not a Part 137 operator, not a law firm, recommend independent verification of regulations)
7. **H2:** How operators get listed (free verified listing, requirements)
8. **H2:** Contact (email, contact form link)

Plain language throughout. No "team" language, no "experts" language, no anonymous "we" except where it naturally means the site as a whole.

---

## 7. Footer credit (every page)

Replace whatever footer credit exists with:

> © 2026 [Site Name]. Edited by Eugen [Last Name]. Every page personally researched and updated.

---

## 8. What Eugen needs to fill in before Claude Code ships this

Before pushing to production, Eugen provides:

```
[ ] Real last name (or decision to use first name only)
[ ] Country/region grew up in
[ ] University field of study
[ ] Author photo (square, 400x400+, real photo)
[ ] LinkedIn URL
[ ] X/Twitter URL (optional)
[ ] Public contact email
[ ] Final site name (currently "US Ag Drone Directory")
[ ] Final domain (production URL)
```

Once these are filled in, the spec is ready to ship.

---

End of spec.
