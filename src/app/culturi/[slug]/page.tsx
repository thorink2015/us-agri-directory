import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, TrendingUp, Plane } from 'lucide-react';
import { crops, getCropBySlug } from '@/data/crops';
import { operators } from '@/data/operators';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';

interface Props {
  params: { slug: string };
}

const MONTH_NAMES = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export async function generateStaticParams() {
  return crops.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const crop = getCropBySlug(params.slug);
  if (!crop) return {};
  return {
    title: `Tratamente cu Drona pentru ${crop.name}: Ghid Complet 2026`,
    description: `Ghid complet pentru tratamentele cu drona agricolă pe ${crop.name.toLowerCase()}. Prețuri ${crop.priceMinRon}–${crop.priceMaxRon} RON/ha, calendar de tratamente, operatori disponibili.`,
    alternates: { canonical: `/culturi/${params.slug}` },
  };
}

export default function CropPage({ params }: Props) {
  const crop = getCropBySlug(params.slug);
  if (!crop) notFound();

  const cropOperators = operators.filter((op) => op.crops.includes(crop.slug)).slice(0, 6);

  const faqs = [
    {
      question: `Cât costă tratamentele cu drona pentru ${crop.name.toLowerCase()}?`,
      answer: `Prețul mediu pentru tratamentele cu drona pe ${crop.name.toLowerCase()} este de ${crop.priceMinRon}–${crop.priceMaxRon} RON/ha. Prețul variază în funcție de suprafața totală, distanța față de baza operatorului și tipul de substanță aplicată. Fermele cu suprafețe de peste 200 ha pot negocia prețuri mai avantajoase.`,
    },
    {
      question: `Când se fac tratamentele cu drona pentru ${crop.name.toLowerCase()}?`,
      answer: `Perioada optimă pentru tratamentele pe ${crop.name.toLowerCase()} este: ${crop.treatmentMonths.map((m) => MONTH_NAMES[m - 1]).join(', ')}. Tratamentele cu drona se fac la viteză redusă a vântului (sub 6 m/s), dimineața devreme sau seara, pentru o aderență maximă a substanței.`,
    },
    {
      question: `Ce avantaje are drona față de utilajele terestre pentru ${crop.name.toLowerCase()}?`,
      answer: `Principalele avantaje ale dronei față de utilajele terestre: (1) nu tasează solul, (2) poate intra pe câmp chiar și pe timp ploios, (3) precizie GPS ridicată cu uniformitate > 95%, (4) poate trata suprafețe fragmentate sau inaccesibile, (5) viteza de lucru de până la 21 ha/oră. Dezavantajul principal este rezervorul mai mic față de un utilaj terestr.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://terradron.ro' },
      { '@type': 'ListItem', position: 2, name: 'Culturi', item: 'https://terradron.ro/culturi' },
      { '@type': 'ListItem', position: 3, name: crop.name, item: `https://terradron.ro/culturi/${crop.slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Tratamente cu drona pentru ${crop.name}: Ghid 2026`,
    description: crop.description,
    url: `https://terradron.ro/culturi/${crop.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'TerraDron.ro',
      url: 'https://terradron.ro',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Culturi', href: '/culturi' },
          { label: crop.name },
        ]}
      />

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <span className="text-5xl">{crop.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tratamente cu drona pentru {crop.name}: Ghid 2026
          </h1>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              {crop.priceMinRon}–{crop.priceMaxRon} RON/ha
            </span>
            {crop.haRomania && (
              <span className="flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <Plane className="w-3.5 h-3.5 rotate-45" />
                {(crop.haRomania / 1000).toFixed(0)}K ha cultivate în România
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <p className="text-gray-700 leading-relaxed">{crop.description}</p>
        {crop.uvlNormLHa && (
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              Normă ULV: {crop.uvlNormLHa}
            </span>
            {crop.yieldGainPct && crop.yieldGainPct > 0 ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Câștig producție: +{crop.yieldGainPct}% (fără tasare sol)
              </span>
            ) : null}
          </div>
        )}
      </div>

      {/* Pests / diseases */}
      {crop.mainPests && crop.mainPests.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">Dăunători și boli principale</h2>
          <ul className="space-y-1.5">
            {crop.mainPests.map((pest) => (
              <li key={pest} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-500 mt-0.5 flex-shrink-0">⚠</span>
                {pest}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Drona poate interveni rapid la apariția oricăruia din acești dăunători, chiar și pe câmpuri cu acces dificil.
          </p>
        </div>
      )}

      {/* Treatment calendar */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          Calendar tratamente
        </h2>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {MONTH_NAMES.map((month, i) => {
            const active = crop.treatmentMonths.includes(i + 1);
            return (
              <div
                key={month}
                className={`p-2 rounded-lg text-center text-xs font-medium ${
                  active
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {month}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Verde = perioadă optimă pentru tratamente cu drona
        </p>
      </div>

      {/* Pricing */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Prețuri tratamente drona 2026</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="pb-2 text-gray-600 font-medium">Tip serviciu</th>
                <th className="pb-2 text-gray-600 font-medium">Preț minim</th>
                <th className="pb-2 text-gray-600 font-medium">Preț mediu</th>
                <th className="pb-2 text-gray-600 font-medium">Preț maxim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100">
              <tr>
                <td className="py-2 font-medium text-gray-900">{crop.name}: pulverizare</td>
                <td className="py-2 text-green-700">{crop.priceMinRon} RON/ha</td>
                <td className="py-2 text-green-700 font-semibold">{Math.round((crop.priceMinRon + crop.priceMaxRon) / 2)} RON/ha</td>
                <td className="py-2 text-green-700">{crop.priceMaxRon} RON/ha</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link
          href="/preturi-pulverizare-drona"
          className="inline-block mt-3 text-sm text-green-700 hover:underline"
        >
          Vezi ghidul complet de prețuri →
        </Link>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Întrebări frecvente</h2>
        <FAQAccordion faqs={faqs} />
      </div>

      {/* Operators for this crop */}
      {cropOperators.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Operatori disponibili pentru {crop.name.toLowerCase()}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cropOperators.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/operatori" className="text-green-700 font-medium text-sm hover:underline">
              Vezi toți operatorii →
            </Link>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
