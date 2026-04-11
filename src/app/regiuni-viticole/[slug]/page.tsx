import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, CheckCircle } from 'lucide-react';
import { wineRegions, getWineRegionBySlug } from '@/data/wine-regions';
import { operators } from '@/data/operators';
import { formatPrice } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return wineRegions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = getWineRegionBySlug(params.slug);
  if (!region) return {};

  return {
    title: `Drone Agricole ${region.name} | Pulverizare Viță de Vie 2026`,
    description: `Operatori de drone agricole în podgoria ${region.name}. Tratamente fungicide viță de vie, preț ${formatPrice(120, 200)}. Contacte directe.`,
    alternates: {
      canonical: `/regiuni-viticole/${params.slug}`,
    },
  };
}

export default function WineRegionPage({ params }: Props) {
  const region = getWineRegionBySlug(params.slug);
  if (!region) notFound();

  // Operators that cover any county in this wine region
  const regionOps = operators.filter((op) =>
    op.counties.some((c) => region.counties.includes(c)) && op.crops.includes('vita-de-vie')
  );
  const fallbackOps = operators.filter((op) =>
    op.counties.some((c) => region.counties.includes(c))
  );
  const displayOps = regionOps.length > 0 ? regionOps : fallbackOps;

  const faqs = [
    {
      question: `De ce este drona ideală pentru viticultura din ${region.name}?`,
      answer: region.droneServiceAdvantage,
    },
    {
      question: `Cât costă pulverizarea cu drona în via de vie din podgoria ${region.name}?`,
      answer: `Prețul pentru tratamentele cu drona în viile din ${region.name} variază între ${formatPrice(120, 200)}. Prețul exact depinde de suprafața totală, configurația terenului și tipul de tratament (fungicid, insecticid, foliar).`,
    },
    {
      question: `Câte tratamente necesită via de vie pe sezon în ${region.name}?`,
      answer: `Via de vie necesită în medie 8–12 tratamente pe sezon (aprilie–septembrie). Drona permite intervenție rapidă și uniformă, esențială în special după ploile de primăvară care favorizează mana și putregaiul cenușiu.`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Regiuni viticole', href: '/regiuni-viticole' },
          { label: region.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
          <MapPin className="w-4 h-4" />
          <span>🍇 Podgorie cu {region.vineyardHa.toLocaleString('ro')} ha viță de vie</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Drone agricole în podgoria {region.name}
        </h1>
        <p className="text-gray-600 text-lg">{region.description}</p>
      </div>

      {/* Region info */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Soiuri principale</h2>
            <div className="flex flex-wrap gap-2">
              {region.mainGrapes.map((grape) => (
                <span key={grape} className="px-2.5 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                  {grape}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Recunoscut pentru</h2>
            <p className="text-sm text-gray-700">{region.knownFor}</p>
          </div>
        </div>
      </div>

      {/* Why drones */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">De ce drona în {region.name}?</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{region.droneServiceAdvantage}</p>
            <div className="mt-3 text-sm">
              <span className="text-gray-500">Preț tratament viță de vie: </span>
              <span className="font-semibold text-green-700">{formatPrice(120, 200)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operators */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Operatori drone pentru viticultură în {region.name}
          {regionOps.length === 0 && displayOps.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">(operatori din județele podgoriei)</span>
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
              Nu avem operatori listați în această podgorie momentan.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/operatori" className="px-4 py-2 bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors">
                Toți operatorii naționali
              </Link>
              <Link href="/adauga-operator" className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
                Adaugă-te gratuit
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Întrebări frecvente despre drone în viticultura {region.name}
        </h2>
        <FAQAccordion faqs={faqs} />
      </div>

      {/* County links */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Județe din podgorie:</p>
        <div className="flex flex-wrap gap-2">
          {region.counties.map((countySlug) => (
            <Link
              key={countySlug}
              href={`/judete/${countySlug}/culturi/vita-de-vie`}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
            >
              Drone viță de vie {countySlug.charAt(0).toUpperCase() + countySlug.slice(1).replace(/-/g, ' ')}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
