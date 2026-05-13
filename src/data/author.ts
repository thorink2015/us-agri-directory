// ─── Single source of truth for author identity (E-E-A-T) ─────────────────
// All bylines, Person schema, footer credit and author cards reference
// this file. Do NOT paraphrase the bio elsewhere, import from here.
// ───────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: 'US Ag Drone Directory',
  domain: 'https://agdronedirectory.com',
  logoUrl: 'https://agdronedirectory.com/images/logo.png',
};

export const AUTHOR = {
  // Identity
  firstName: 'Eugen',
  lastName: 'Manoli',
  get fullName() {
    return this.lastName.startsWith('{{')
      ? this.firstName
      : `${this.firstName} ${this.lastName}`;
  },
  jobTitle: 'Founder and Editor',

  // Media
  photoUrl: 'https://agdronedirectory.com/images/eugen-author.jpg',
  photoAlt: 'Eugen, Founder and Editor of US Ag Drone Directory',

  // Contact
  publicEmail: 'eugen@agdronedirectory.com',

  // Social (for Person schema sameAs array + author card)
  linkedin: 'https://www.linkedin.com/in/manoli-eugen/',
  x: '',

  // Bio, canonical, do NOT paraphrase. Eugen-approved 153-word first-person
  // narrative dropped on 2026-05-13. Used by reference where a long bio is
  // needed; short third-person variant lives in AUTHOR.shortBio below for
  // Person JSON-LD description and AuthorCard.
  bio:
    "I'm Eugen. Solo founder, Florida-based, this is a side project I run after my 9-to-5.\n\nI grew up in an agricultural family. Spent enough time around fields and equipment to know what a hard year does to people. A few years back I started messing around with drones, more out of curiosity than anything, and it hit. I flew commercially for a couple of years and sat on both sides of the transaction, as the operator taking calls and as the buyer trying to find someone reliable in peak season. The two views taught me different things.\n\nI also have about ten years in marketing, mostly B2B and ag tech. That's the angle I bring here. Operators need farmers. Farmers need verified operators. They don't always find each other in time.\n\nThis directory is my attempt to close that gap. Free for farmers, free baseline listing for operators, verification done by hand.",

  shortBio:
    'Eugen is the founder and editor of US Ag Drone Directory. He built this directory to give US farmers a single trusted place to find verified ag drone operators, regulations and pricing.',

  // Schema @id anchors
  get personId() {
    return `${SITE.domain}/about#eugen`;
  },
  get organizationId() {
    return `${SITE.domain}/#organization`;
  },
};

// Returns an array of sameAs URLs with placeholders filtered out so
// Schema.org output is never polluted with {{PLACEHOLDER}} strings.
export function authorSameAs(): string[] {
  return [AUTHOR.linkedin, AUTHOR.x].filter((u) => u && !u.startsWith('{{'));
}

// Canonical Person JSON-LD object (for spread into page schema)
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': AUTHOR.personId,
    name: AUTHOR.fullName,
    jobTitle: AUTHOR.jobTitle,
    image: AUTHOR.photoUrl,
    url: `${SITE.domain}/about`,
    sameAs: authorSameAs(),
    worksFor: { '@type': 'Organization', '@id': AUTHOR.organizationId },
    description: AUTHOR.shortBio,
  };
}

// Canonical Organization JSON-LD object.
// `address` + `email` + `foundingDate` are emitted here (not in a separate
// component) so the same canonical Organization @id carries the postal
// address site-wide via the existing emit points on `/` and `/about`. Adding
// a second component in layout.tsx would render two Organization blocks per
// page and confuse Google's Knowledge Graph.
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': AUTHOR.organizationId,
    name: SITE.name,
    alternateName: 'agdronedirectory.com',
    url: SITE.domain,
    logo: SITE.logoUrl,
    email: AUTHOR.publicEmail,
    foundingDate: '2025',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2351 Sunset Boulevard, Ste. 170-716',
      addressLocality: 'Rocklin',
      addressRegion: 'CA',
      postalCode: '95765',
      addressCountry: 'US',
    },
    founder: { '@id': AUTHOR.personId },
    description:
      'Directory of verified US agricultural drone operators, with regulations, pricing and resources for farmers.',
    sameAs: [], // TODO: add company LinkedIn + X when ready
  };
}
