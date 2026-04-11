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
    name: `Operatori drone agricole în județul ${county.name}`,
    description: `Lista completă a operatorilor de drone agricole din ${county.name}. ${ops.length} operatori disponibili.`,
    url: `https://terradron.ro/judete/${county.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Operatori drone agricole ${county.name}`,
      numberOfItems: ops.length,
      itemListElement: ops.map((op, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'LocalBusiness',
          name: op.name,
          url: `https://terradron.ro/operatori/${op.slug}`,
          telephone: op.phone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: op.city,
            addressCountry: 'RO',
          },
        },
      })),
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://terradron.ro' },
      { '@type': 'ListItem', position: 2, name: 'Județe', item: 'https://terradron.ro/judete' },
      { '@type': 'ListItem', position: 3, name: county.name, item: `https://terradron.ro/judete/${county.slug}` },
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
