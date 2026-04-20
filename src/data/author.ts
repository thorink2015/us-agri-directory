// ─── Single source of truth for author identity (E-E-A-T) ─────────────────
// All bylines, Person schema, footer credit and author cards reference
// this file. Do NOT paraphrase the bio elsewhere, import from here.
//
// TODO before launch: replace every {{PLACEHOLDER}} with a real value.
// Eugen's spec (implementation-spec v1) lists the required fields.
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
  photoUrl: 'https://agdronedirectory.com/images/eugen-author.jpg', // TODO: upload real headshot
  photoAlt: 'Eugen, Founder and Editor of US Ag Drone Directory',

  // Contact
  publicEmail: 'eugen@agdronedirectory.com', // TODO: confirm real address

  // Social (for Person schema sameAs array + author card)
  linkedin: 'https://www.linkedin.com/in/manoli-eugen/',
  x: '',

  // Bio, canonical, do NOT paraphrase
  bio:
    'Eugen is the founder and editor of US Ag Drone Directory. He grew up in an agricultural family in Florida, United States, studied Agricultural Economics at university, and has worked hands-on with agricultural drone technology in European markets. He built this directory after seeing how scattered and incomplete US ag drone information was for the farmers who need it most. Every page on this site is written or edited by him personally.',

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

// Canonical Organization JSON-LD object
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': AUTHOR.organizationId,
    name: SITE.name,
    url: SITE.domain,
    logo: SITE.logoUrl,
    founder: { '@id': AUTHOR.personId },
    description:
      'Directory of verified US agricultural drone operators, with regulations, pricing and resources for farmers.',
    sameAs: [], // TODO: add company LinkedIn + X when ready
  };
}
