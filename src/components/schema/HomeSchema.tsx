export default function HomeSchema() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'US Agricultural Drone Directory',
    url: 'https://usagdronedirectory.com',
    description: 'The largest directory of agricultural drone services in America. Connecting farmers with verified drone operators in all 50 states.',
    areaServed: 'US',
    sameAs: [],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'US Ag Drone Directory',
    url: 'https://usagdronedirectory.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://usagdronedirectory.com/operatori?q={search_term_string}',
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
