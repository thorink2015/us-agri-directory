import { Operator } from '@/data/types';
import { County } from '@/data/types';

interface Props {
  county: County;
  operators: Operator[];
  faqs?: { question: string; answer: string }[];
}

export default function CountyPageSchema({ county, operators: ops, faqs }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Agricultural Drone Operators in ${county.name}`,
    description: `Complete list of agricultural drone operators in ${county.name}. ${ops.length} operators available.`,
    url: `https://usagdronedirectory.com/states/${county.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Agricultural Drone Operators in ${county.name}`,
      numberOfItems: ops.length,
      itemListElement: ops.map((op, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'LocalBusiness',
          name: op.name,
          url: `https://usagdronedirectory.com/operators/${op.slug}`,
          telephone: op.phone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: op.city,
            addressCountry: 'US',
          },
        },
      })),
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://usagdronedirectory.com' },
      { '@type': 'ListItem', position: 2, name: 'States', item: 'https://usagdronedirectory.com/states' },
      { '@type': 'ListItem', position: 3, name: county.name, item: `https://usagdronedirectory.com/states/${county.slug}` },
    ],
  };

  const faqSchema = faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
    </>
  );
}
