import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { counties, getCountyBySlug } from '@/data/counties';
import { services, getServiceBySlug } from '@/data/services';
import { getOperatorsByCounty } from '@/data/operators';
import { SERVICE_LABELS, ServiceType } from '@/data/types';
import { formatPrice } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { SITE } from '@/data/author';

interface Props {
  params: { slug: string; service: string };
}

export async function generateStaticParams() {
  return counties.flatMap((county) =>
    services.map((service) => ({ slug: county.slug, service: service.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const county = getCountyBySlug(params.slug);
  const service = getServiceBySlug(params.service as ServiceType);
  if (!county || !service) return {};

  return {
    title: `${service.name} in ${county.name}: 2026 Operators`,
    description: `${service.name} drone services in ${county.name}. Compare rates from verified operators and contact them directly for your ${county.name} fields.`,
    alternates: {
      canonical: `/states/${params.slug}/services/${params.service}`,
    },
    openGraph: {
      type: 'website',
      title: `${service.name} in ${county.name} | US Ag Drone Directory`,
      description: `${service.name} drone services in ${county.name}. Compare rates from verified operators and contact them directly for your ${county.name} fields.`,
      url: `${SITE.domain}/states/${params.slug}/services/${params.service}`,
      siteName: 'US Ag Drone Directory',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${service.name} in ${county.name}`,
        },
      ],
    },
  };
}

export default function CountyServicePage({ params }: Props) {
  const county = getCountyBySlug(params.slug);
  const service = getServiceBySlug(params.service as ServiceType);
  if (!county || !service) notFound();

  const allCountyOps = getOperatorsByCounty(county.slug);
  const serviceOps = allCountyOps.filter((op) => op.services.includes(service.slug as ServiceType));
  const displayOps = serviceOps.length > 0 ? serviceOps : allCountyOps;

  const faqs = [
    ...(service.faqs ?? []),
    {
      question: `How many operators offer ${service.name.toLowerCase()} in ${county.name}?`,
      answer:
        serviceOps.length > 0
          ? `There ${serviceOps.length === 1 ? 'is' : 'are'} ${serviceOps.length} operator${serviceOps.length !== 1 ? 's' : ''} offering ${service.name.toLowerCase()} drone services in ${county.name}: ${serviceOps.map((o) => o.name).join(', ')}.`
          : `We don't currently have operators specialized in ${service.name.toLowerCase()} listed directly in ${county.name}. Many national operators cover multiple states, contact them for availability.`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'States', href: '/states' },
          { label: county.name, href: `/states/${county.slug}` },
          { label: service.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
          <MapPin className="w-4 h-4" />
          <span>{county.region}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {service.name} in {county.name}
        </h1>
        <p className="text-gray-600 text-lg">{service.description}</p>
      </div>

      {/* Service info card */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{service.icon}</span>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900 mb-2">How {service.name.toLowerCase()} works</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">{service.longDescription}</p>
            {(service.priceMinUsd || service.priceMaxUsd) && (
              <div className="text-sm">
                <span className="text-gray-500">Typical rate: </span>
                <span className="font-semibold text-green-700">
                  {formatPrice(service.priceMinUsd, service.priceMaxUsd)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Operators */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {service.name} drone operators in {county.name}
          {serviceOps.length === 0 && allCountyOps.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">(all operators in state)</span>
          )}
        </h2>

        {displayOps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {displayOps.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 font-medium mb-3">
              No operators listed in {county.name} yet
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/operators"
                className="px-4 py-2 bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
              >
                All US operators
              </Link>
              <Link
                href="/list-your-business"
                className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
              >
                List your business free
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          FAQ: {service.name.toLowerCase()} in {county.name}
        </h2>
        <FAQAccordion faqs={faqs} />
      </div>

      {/* Other services in state */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Other drone services in {county.name}</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SERVICE_LABELS)
            .filter(([key]) => key !== service.slug)
            .map(([key, label]) => (
              <Link
                key={key}
                href={`/states/${county.slug}/services/${key}`}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
              >
                {label}
              </Link>
            ))}
          <Link
            href={`/states/${county.slug}`}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-600"
          >
            ← Back to {county.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
