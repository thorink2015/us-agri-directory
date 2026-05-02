import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, FileCheck, HelpCircle, Sprout } from 'lucide-react';
import { counties, getCountyBySlug } from '@/data/counties';
import { services, getServiceBySlug } from '@/data/services';
import { getStateData } from '@/data/states';
import { getOperatorsByCounty } from '@/data/operators';
import { SERVICE_LABELS, ServiceType } from '@/data/types';
import { formatPrice } from '@/lib/utils';
import {
  composeStateServiceFAQs,
  composeStateServiceIntro,
  countOperatorsForServiceInState,
  getServiceStateNoindexBreakdown,
  getStateCropsForService,
  shouldNoindexStateService,
  stateServiceFAQSchema,
} from '@/lib/state-service-content';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { SITE } from '@/data/author';

interface Props {
  params: { slug: string; service: string };
}

// Build-time logging of the noindex gate distribution.
let logged = false;
function logNoindexBreakdownOnce() {
  if (logged) return;
  logged = true;
  const { total, totalCombos, perService } = getServiceStateNoindexBreakdown();
  // eslint-disable-next-line no-console
  console.log(
    `[state-services] ${total} of ${totalCombos} combos gated as noindex,follow. ` +
      `Per service: ${Object.entries(perService)
        .map(([k, v]) => `${k}=${v.length}`)
        .join(', ')}`,
  );
}

export async function generateStaticParams() {
  logNoindexBreakdownOnce();
  return counties.flatMap((county) =>
    services.map((service) => ({ slug: county.slug, service: service.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const county = getCountyBySlug(params.slug);
  const service = getServiceBySlug(params.service as ServiceType);
  if (!county || !service) return {};

  const noindex = shouldNoindexStateService(params.slug, params.service);

  return {
    title: `${service.name}: ${county.name} 2026`,
    description: `${service.name} drone services in ${county.name}. Compare rates from verified operators and contact them directly for your ${county.name} fields.`,
    alternates: {
      canonical: `/states/${params.slug}/services/${params.service}`,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'website',
      locale: 'en_US',
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

  const state = getStateData(county.slug);
  const opCount = countOperatorsForServiceInState(county.slug, service.slug as ServiceType);
  const cropAffinity = getStateCropsForService(county, state, service);
  const intro = composeStateServiceIntro(county, service, state, opCount, cropAffinity);
  const faqs = composeStateServiceFAQs(county, service, state, opCount, cropAffinity);
  const faqSchema = stateServiceFAQSchema(faqs);

  const allCountyOps = getOperatorsByCounty(county.slug);
  const serviceOps = allCountyOps.filter((op) => op.services.includes(service.slug as ServiceType));
  const displayOps = serviceOps.length > 0 ? serviceOps : allCountyOps;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
          {state?.regionSlug ? (
            <Link href={`/regions/${state.regionSlug}`} className="hover:underline">
              {state.regionName}
            </Link>
          ) : (
            <span>{county.region}</span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {service.name} in {county.name}
        </h1>
        <p className="text-gray-600 text-lg">{service.description}</p>
      </div>

      {/* State-specific intro paragraph (template enrichment) */}
      <div className="bg-green-50 border-l-4 border-green-600 px-5 py-4 rounded-r-xl mb-8">
        <p className="text-sm text-gray-700 leading-relaxed">{intro}</p>
      </div>

      {/* Service AEO block (national context, supplements the state intro) */}
      {service.aeoBlock && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
          <h2 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
            {service.name} — quick facts
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{service.aeoBlock}</p>
        </div>
      )}

      {/* Service info card — uses service.longDescription */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0">{service.icon}</span>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900 mb-2 text-lg">
              How {service.name.toLowerCase()} works
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">{service.longDescription}</p>
            {(service.priceMinUsd || service.priceMaxUsd) && (
              <div className="text-sm">
                <span className="text-gray-500">Typical rate: </span>
                <span className="font-semibold text-green-700">
                  {formatPrice(service.priceMinUsd, service.priceMaxUsd)}
                </span>
                {service.priceUnit && service.priceUnit !== 'per acre' && (
                  <span className="text-gray-500 ml-1">({service.priceUnit})</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Crop affinity callout (template enrichment) */}
      {cropAffinity.length > 0 && (
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
            <Sprout className="w-5 h-5 text-green-600" />
            {service.name} on top {county.name} crops
          </h2>
          <p className="text-sm text-gray-700 mb-3">
            In {county.name}, {service.name.toLowerCase()} is most commonly used on:
          </p>
          <ul className="space-y-2">
            {cropAffinity.map((c) => (
              <li
                key={c.slug}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 text-sm border-b border-gray-100 pb-2 last:border-b-0 last:pb-0"
              >
                <Link
                  href={`/states/${county.slug}/crops/${c.slug}`}
                  className="font-semibold text-gray-900 hover:text-green-700 hover:underline"
                >
                  {c.name} in {county.name}
                </Link>
                {(c.priceMinUsd !== undefined && c.priceMaxUsd !== undefined) && (
                  <span className="font-semibold text-green-700 whitespace-nowrap">
                    ${c.priceMinUsd} to ${c.priceMaxUsd} per acre
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Prices reflect 2026 industry-typical drone spraying rates by crop. Pair with the
            operator-stated rates below for a quote tailored to your fields.
          </p>
        </section>
      )}

      {/* State licensing block (template enrichment) */}
      {state?.aerialCategory && state.licensingAgency && (
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-green-600" />
            Aerial pesticide licensing in {county.name}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            {county.name} requires{' '}
            <span className="font-medium text-gray-900">{state.aerialCategory}</span>{' '}
            for aerial pesticide application. The licensing authority is{' '}
            <span className="font-medium text-gray-900">{state.licensingAgency}</span>.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Full agency, exam and renewal-cycle details:{' '}
            <Link
              href={`/states/${county.slug}`}
              className="text-green-700 underline hover:text-green-800"
            >
              {county.name} state page
            </Link>
            {' · '}
            <Link
              href="/regulations/state-licensing"
              className="text-green-700 underline hover:text-green-800"
            >
              50-state licensing reference
            </Link>
            {state.extensionUrl && (
              <>
                {' · '}
                <a
                  href={state.extensionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline hover:text-green-800"
                >
                  state extension service
                </a>
              </>
            )}
            .
          </p>
        </section>
      )}

      {/* Operators */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {service.name} drone operators in {county.name}
          {serviceOps.length === 0 && allCountyOps.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              (all operators in state)
            </span>
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

      {/* Authority links (per-service primary sources) */}
      {service.authorityLinks && service.authorityLinks.length > 0 && (
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-3 text-lg">
            Primary sources for {service.name.toLowerCase()}
          </h2>
          <p className="text-xs text-gray-500 mb-3">
            Federal regulators and industry references that govern {service.name.toLowerCase()} in
            {' '}{county.name} and across the United States.
          </p>
          <ul className="space-y-1.5 text-sm">
            {service.authorityLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline hover:text-green-800"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ — combined state-service generic + service.faqs */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-green-600" />
          FAQ: {service.name.toLowerCase()} in {county.name}
        </h2>
        <FAQAccordion faqs={faqs} />
      </div>

      {/* Other services in state */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Other drone services in {county.name}
        </h2>
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
