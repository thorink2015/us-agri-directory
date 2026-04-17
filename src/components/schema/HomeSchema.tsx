import { SITE, personSchema, organizationSchema } from '@/data/author';

export default function HomeSchema() {
  // Canonical Organization + Person, @ids referenced by every Article schema
  // on the site (crops, services, regions, guides). Single source of truth
  // is src/data/author.ts.
  const org = organizationSchema();
  const person = personSchema();

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.domain}/#website`,
    name: SITE.name,
    url: SITE.domain,
    publisher: { '@id': org['@id'] },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.domain}/operators?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
