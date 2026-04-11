import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
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
    title: `${service.nameRo} | Drone Agricole România 2026`,
    description: `${service.description} Găsește operatori verificați de drone pentru ${service.name.toLowerCase()} în toate județele din România.`,
    alternates: {
      canonical: `/servicii/${params.slug}`,
    },
    keywords: service.keywords.join(', '),
  };
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug as ServiceType);
  if (!service) notFound();

  const serviceOps = operators.filter((op) => op.services.includes(service.slug));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Servicii', href: '/servicii' },
          { label: service.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="text-4xl mb-3">{service.icon}</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{service.nameRo}</h1>
        <p className="text-gray-600 text-lg">{service.description}</p>
      </div>

      {/* About */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3">Despre serviciu</h2>
        <p className="text-gray-700 leading-relaxed mb-4">{service.longDescription}</p>
        {(service.priceMinRon || service.priceMaxRon) && (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700">
              Preț orientativ:{' '}
              <span className="font-semibold text-green-700">{formatPrice(service.priceMinRon, service.priceMaxRon)} {service.priceUnit.split('/')[1] ? '' : ''}</span>
            </span>
          </div>
        )}
      </div>

      {/* Keywords / SEO chips */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Caută și după</p>
        <div className="flex flex-wrap gap-2">
          {service.keywords.map((kw) => (
            <span key={kw} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Operators offering this service */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Operatori care oferă {service.name.toLowerCase()} cu drona
          <span className="text-sm font-normal text-gray-500 ml-2">({serviceOps.length})</span>
        </h2>

        {serviceOps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceOps.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 font-medium mb-3">
              Nu avem operatori specializați în {service.name.toLowerCase()} momentan.
            </p>
            <Link
              href="/operatori"
              className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
            >
              Toți operatorii
            </Link>
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Întrebări frecvente despre {service.name.toLowerCase()}
        </h2>
        <FAQAccordion faqs={service.faqs} />
      </div>

      {/* Other services */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Alte servicii drone agricole</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SERVICE_LABELS)
            .filter(([key]) => key !== service.slug)
            .map(([key, label]) => (
              <Link
                key={key}
                href={`/servicii/${key}`}
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
