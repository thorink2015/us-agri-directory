export default function HomeSchema() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TerraDron.ro',
    url: 'https://terradron.ro',
    description: 'Directorul operatorilor de drone agricole din România și Moldova.',
    areaServed: ['RO', 'MD'],
    sameAs: [],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TerraDron.ro',
    url: 'https://terradron.ro',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://terradron.ro/operatori?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
