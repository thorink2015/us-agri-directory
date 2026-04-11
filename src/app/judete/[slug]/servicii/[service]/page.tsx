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
    title: `${service.nameRo} ${county.name} | Operatori Drone Agricole 2026`,
    description: `Servicii de ${service.name.toLowerCase()} cu drona în județul ${county.name}. Preț: ${formatPrice(service.priceMinRon, service.priceMaxRon, service.priceUnit.replace('RON/', '') === 'ha' ? 'RON' : 'RON')}, operatori verificați, contact direct.`,
    alternates: {
      canonical: `/judete/${params.slug}/servicii/${params.service}`,
    },
  };
}

export default function CountyServicePage({ params }: Props) {
  const county = getCountyBySlug(params.slug);
  const service = getServiceBySlug(params.service as ServiceType);
  if (!county || !service) notFound();

  const allCountyOps = getOperatorsByCounty(county.slug);
  const serviceOps = allCountyOps.filter((op) => op.services.includes(service.slug));
  const displayOps = serviceOps.length > 0 ? serviceOps : allCountyOps;

  const faqs = [
    ...service.faqs,
    {
      question: `Câți operatori oferă ${service.name.toLowerCase()} cu drona în ${county.name}?`,
      answer:
        serviceOps.length > 0
          ? `Există ${serviceOps.length} operator${serviceOps.length !== 1 ? 'i' : ''} care oferă servicii de ${service.name.toLowerCase()} cu drona în județul ${county.name}: ${serviceOps.map((o) => o.name).join(', ')}.`
          : `Momentan nu avem operatori specializați în ${service.name.toLowerCase()} listați direct în ${county.name}. Mulți operatori naționali acoperă întreaga țară, contactează-i pentru disponibilitate.`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Județe', href: '/judete' },
          { label: county.name, href: `/judete/${county.slug}` },
          { label: service.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
          <MapPin className="w-4 h-4" />
          <span>{county.region}, România</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {service.nameRo} în {county.name}
        </h1>
        <p className="text-gray-600 text-lg">{service.description}</p>
      </div>

      {/* Service info card */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{service.icon}</span>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900 mb-2">Cum funcționează {service.name.toLowerCase()} cu drona</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">{service.longDescription}</p>
            {(service.priceMinRon || service.priceMaxRon) && (
              <div className="text-sm">
                <span className="text-gray-500">Preț orientativ: </span>
                <span className="font-semibold text-green-700">
                  {formatPrice(service.priceMinRon, service.priceMaxRon)} {service.priceUnit.includes('/') ? '' : service.priceUnit}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Operators */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Operatori {service.name.toLowerCase()} cu drona în {county.name}
          {serviceOps.length === 0 && allCountyOps.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">(toți operatorii din județ)</span>
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
              Nu avem operatori listați în {county.name} momentan
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/operatori"
                className="px-4 py-2 bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
              >
                Toți operatorii naționali
              </Link>
              <Link
                href="/adauga-operator"
                className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
              >
                Adaugă-te gratuit
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Întrebări frecvente despre {service.name.toLowerCase()} cu drona în {county.name}
        </h2>
        <FAQAccordion faqs={faqs} />
      </div>

      {/* Other services in county */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Alte servicii drone în {county.name}</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SERVICE_LABELS)
            .filter(([key]) => key !== service.slug)
            .map(([key, label]) => (
              <Link
                key={key}
                href={`/judete/${county.slug}/servicii/${key}`}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
              >
                {label}
              </Link>
            ))}
          <Link
            href={`/judete/${county.slug}`}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-600"
          >
            ← Înapoi la {county.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
