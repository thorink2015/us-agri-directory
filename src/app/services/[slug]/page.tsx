import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { services, getServiceBySlug } from '@/data/services';
import { operators } from '@/data/operators';
import { ServiceType, SERVICE_LABELS } from '@/data/types';
import { formatPrice } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug as ServiceType);
  if (!service) return {};

  return {
    title: `${service.name} Services | Agricultural Drone Operators US 2026`,
    description: service.aeoBlock.slice(0, 155),
    alternates: { canonical: `/services/${params.slug}` },
    keywords: service.keywords.join(', '),
    openGraph: {
      title: `${service.name} | US Agricultural Drone Directory`,
      description: service.description,
      url: `https://usagdronedirectory.com/services/${params.slug}`,
    },
  };
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug as ServiceType);
  if (!service) notFound();

  const serviceOps = operators.filter((op) => op.services.includes(service.slug));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.longDescription,
    url: `https://usagdronedirectory.com/services/${service.slug}`,
    provider: { '@type': 'Organization', name: 'US Ag Drone Directory', url: 'https://usagdronedirectory.com' },
    ...(service.priceMinUsd && {
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: service.priceMinUsd,
        highPrice: service.priceMaxUsd,
        priceCurrency: 'USD',
        offerCount: serviceOps.length,
      },
    }),
    areaServed: { '@type': 'Country', name: 'United States' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://usagdronedirectory.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://usagdronedirectory.com/services' },
      { '@type': 'ListItem', position: 3, name: service.name, item: `https://usagdronedirectory.com/services/${service.slug}` },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb
        items={[
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
      />

      {/* Header */}
      <div className="mb-6">
        <div className="text-4xl mb-3">{service.icon}</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{service.name}</h1>
        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-4">
          <p className="text-sm text-gray-700 leading-relaxed">{service.aeoBlock}</p>
        </div>
        <p className="text-gray-600">{service.description}</p>
      </div>

      {/* About */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3">About this service</h2>
        <p className="text-gray-700 leading-relaxed mb-4">{service.longDescription}</p>
        {(service.priceMinUsd || service.priceMaxUsd) && (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700">
              Typical rate:{' '}
              <span className="font-semibold text-green-700">{formatPrice(service.priceMinUsd, service.priceMaxUsd)}</span>
              {' '}<span className="text-gray-400">({service.priceUnit})</span>
            </span>
          </div>
        )}
      </div>

      {/* Authority links */}
      {service.authorityLinks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Official resources</h2>
          <div className="flex flex-col gap-2">
            {service.authorityLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-700 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Operators offering this service */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Operators offering {service.name.toLowerCase()}
          <span className="text-sm font-normal text-gray-500 ml-2">({serviceOps.length})</span>
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          All operators are independently verified. <Link href="/operators" className="text-green-700 hover:underline">View all operators</Link> or{' '}
          <Link href="/states" className="text-green-700 hover:underline">search by state</Link>.
        </p>

        {serviceOps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceOps.slice(0, 6).map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 font-medium mb-3">
              No operators specializing in {service.name.toLowerCase()} are listed yet.
            </p>
            <Link
              href="/operators"
              className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
            >
              All operators
            </Link>
          </div>
        )}
      </div>

      {/* Keywords */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Also searched as</p>
        <div className="flex flex-wrap gap-2">
          {service.keywords.map((kw) => (
            <span key={kw} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Frequently asked questions
        </h2>
        <FAQAccordion faqs={service.faqs} />
      </div>

      {/* Internal links to calculators */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3 text-sm">Related tools</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/tools/spray-cost-calculator" className="text-sm text-green-700 hover:underline">Spray Cost Calculator</Link>
          <span className="text-gray-300">|</span>
          <Link href="/tools/roi-calculator" className="text-sm text-green-700 hover:underline">ROI Buy vs. Hire</Link>
          <span className="text-gray-300">|</span>
          <Link href="/tools/coverage-calculator" className="text-sm text-green-700 hover:underline">Coverage Time Estimator</Link>
          <span className="text-gray-300">|</span>
          <Link href="/pricing" className="text-sm text-green-700 hover:underline">Full Pricing Guide</Link>
        </div>
      </div>

      {/* Other services */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Other agricultural drone services</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SERVICE_LABELS)
            .filter(([key]) => key !== service.slug)
            .map(([key, label]) => (
              <Link
                key={key}
                href={`/services/${key}`}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
              >
                {label}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
