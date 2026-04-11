import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Wheat, TrendingUp, Users } from 'lucide-react';
import { counties, getCountyBySlug, getAdjacentCounties, getCountyOperatorCount } from '@/data/counties';
import { getOperatorsByCounty } from '@/data/operators';
import { CROP_NAME_MAP } from '@/data/crops';
import { buildCountyMetadata } from '@/lib/seo';
import { formatHa } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import CountyPageSchema from '@/components/schema/CountyPageSchema';
import FAQAccordion from '@/components/ui/FAQAccordion';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return counties.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const county = getCountyBySlug(params.slug);
  if (!county) return {};
  const count = getCountyOperatorCount(params.slug);
  return buildCountyMetadata(county, count);
}

export default function CountyPage({ params }: Props) {
  const county = getCountyBySlug(params.slug);
  if (!county) notFound();

  const ops = getOperatorsByCounty(county.slug);
  const adjacent = getAdjacentCounties(county, 5);
  const crops = county.mainCrops.map((c) => CROP_NAME_MAP[c] || c);

  const faqs = [
    {
      question: `Câți operatori de drone agricole sunt în ${county.name}?`,
      answer: ops.length > 0
        ? `În prezent există ${ops.length} operatori activi de drone agricole listați în județul ${county.name}: ${ops.map(o => o.name).join(', ')}. Contactează-i direct pentru oferte și disponibilitate.`
        : `Momentan nu avem operatori listați direct în județul ${county.name}. Mulți operatori naționali acoperă întreaga țară, vezi operatorii din județele vecine sau contactează-ne pentru a adăuga un operator local.`,
    },
    {
      question: `Cât costă pulverizarea cu drona în ${county.name}?`,
      answer: `Prețurile pentru pulverizarea cu drona în județul ${county.name} sunt similare cu media națională: 70–120 RON/ha pentru culturi de câmp (grâu, porumb, rapiță) și 120–200 RON/ha pentru vii și livezi. Contactează operatorii listați pentru oferte exacte în funcție de suprafața și cultura ta.`,
    },
    {
      question: `Ce culturi se tratează cu drona în ${county.name}?`,
      answer: `Principalele culturi din județul ${county.name} care beneficiază de tratamente cu drona sunt: ${crops.join(', ')}. Drona este ideală pentru aplicarea fungicidelor, insecticidelor, fertilizanților și erbicidelor cu precizie ridicată.`,
    },
  ];

  return (
    <>
      <CountyPageSchema county={county} operators={ops} faqs={faqs} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Județe', href: '/judete' },
            { label: county.name },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
            <MapPin className="w-4 h-4" />
            <span>{county.region}, România</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Drone agricole în județul {county.name}
          </h1>
          <p className="text-gray-600 text-lg">
            {ops.length > 0
              ? `${ops.length} operator${ops.length !== 1 ? 'i' : ''} de drone agricole activi în ${county.name}.`
              : `Fii primul operator de drone agricole din ${county.name}.`}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, value: `${ops.length}`, label: 'Operatori' },
            { icon: TrendingUp, value: formatHa(county.agriculturalLandHa), label: 'Teren arabil' },
            { icon: Wheat, value: crops.slice(0, 2).join(', '), label: 'Culturi principale' },
            ...(county.vineyardHa ? [{ icon: MapPin, value: formatHa(county.vineyardHa), label: 'Suprafață vii' }] : [
              { icon: MapPin, value: county.region, label: 'Regiune' },
            ]),
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <stat.icon className="w-5 h-5 text-green-600 mb-2" />
              <div className="font-bold text-gray-900 text-sm truncate">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Operators */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Operatori drone agricole în {county.name}
          </h2>

          {ops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ops.map((op) => (
                <OperatorCard key={op.slug} operator={op} />
              ))}
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
              <p className="text-amber-800 font-medium mb-2">
                Nu avem operatori listați în {county.name} momentan
              </p>
              <p className="text-amber-700 text-sm mb-4">
                Mulți operatori naționali acoperă toată România. Verifică județele vecine sau adaugă-te dacă ești operator local.
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

        {/* Crops in this county */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Culturi tratate cu drona în {county.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {county.mainCrops.map((crop) =>
              CROP_NAME_MAP[crop] ? (
                <Link
                  key={crop}
                  href={`/culturi/${crop}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
                >
                  {CROP_NAME_MAP[crop]}
                </Link>
              ) : (
                <span
                  key={crop}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600"
                >
                  {crop}
                </span>
              )
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Întrebări frecvente despre drone agricole în {county.name}
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>

        {/* Adjacent counties */}
        {adjacent.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Județe vecine</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {adjacent.map((c) => (
                <Link
                  key={c.slug}
                  href={`/judete/${c.slug}`}
                  className="text-center p-3 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:text-green-700 transition-all text-sm font-medium text-gray-700"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
