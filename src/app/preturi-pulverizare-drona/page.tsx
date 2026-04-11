import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, Info } from 'lucide-react';
import { pricingFAQs } from '@/data/faqs';
import { getFeaturedOperators } from '@/data/operators';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import OperatorCard from '@/components/operators/OperatorCard';

export const metadata: Metadata = {
  title: 'Cât Costă Pulverizarea cu Drona Agricolă? | Prețuri 2026',
  description:
    'Prețurile pulverizării cu drona în România: 70–120 RON/ha pentru culturi de câmp și 120–200 RON/ha pentru vii și livezi. Ghid complet cu tabele și factori de influență.',
  alternates: { canonical: '/preturi-pulverizare-drona' },
  openGraph: {
    title: 'Prețuri Pulverizare Dronă 2026 | 70–200 RON/ha | TerraDron.ro',
    description: 'Cât costă pulverizarea cu drona? Tabele complete cu prețuri RON/ha pe culturi, regiuni și factori de influență.',
    url: 'https://terradron.ro/preturi-pulverizare-drona',
  },
};

const pricingData = [
  { cultura: 'Grâu', min: 70, med: 90, max: 120, note: 'Sezon: martie–mai' },
  { cultura: 'Porumb', min: 70, med: 95, max: 130, note: 'Sezon: iunie–august' },
  { cultura: 'Rapiță', min: 70, med: 90, max: 120, note: 'Sezon: mart.–apr., sept.–oct.' },
  { cultura: 'Floarea soarelui', min: 70, med: 90, max: 120, note: 'Sezon: iun.–septembrie' },
  { cultura: 'Soia', min: 75, med: 95, max: 125, note: 'Sezon: iunie–august' },
  { cultura: 'Viță de vie', min: 120, med: 150, max: 200, note: 'Sezon: apr.–septembrie' },
  { cultura: 'Livezi (pomi fructiferi)', min: 120, med: 160, max: 200, note: 'Sezon: mar.–august' },
  { cultura: 'Moldova (general, MDL)', min: 170, med: 200, max: 240, note: 'Tarif în MDL/ha' },
];

const factors = [
  { factor: 'Suprafața totală', impact: 'Suprafețele > 200 ha primesc reduceri de 10–20%', icon: '📐' },
  { factor: 'Tipul de cultură', impact: 'Vii și livezi costă 50–70% mai mult decât câmpul', icon: '🌿' },
  { factor: 'Distanța față de baza operatorului', impact: 'Distanțele > 50 km pot adăuga 10–15% cost', icon: '🗺️' },
  { factor: 'Tipul de substanță', impact: 'Substanțele vâscoase sau corozive pot crește prețul', icon: '🧪' },
  { factor: 'Condiții de teren', impact: 'Terenurile cu obstacole sau pantă majoră cresc costul', icon: '⛰️' },
  { factor: 'Sezonul de aplicare', impact: 'Perioadele de vârf (mai, iulie) pot fi mai scumpe', icon: '📅' },
];

export default function PricingPage() {
  const featured = getFeaturedOperators().slice(0, 3);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pricingFAQs.map((faq) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Prețuri pulverizare cu drona', item: 'https://terradron.ro/preturi-pulverizare-drona' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Prețuri pulverizare cu drona' }]} />

        {/* Hero answer capsule */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Cât costă pulverizarea cu drona agricolă în România?
          </h1>
          <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-r-xl">
            <p className="text-gray-800 text-lg leading-relaxed">
              <strong>Prețul mediu pentru pulverizarea cu drona este de 100 RON/ha (~€20/ha)</strong> pentru culturi de câmp (grâu, porumb, rapiță, floarea soarelui). Pentru vii și livezi prețul ajunge la 120–200 RON/ha. În Moldova prețurile sunt 170–240 MDL/ha (~€8.50–12/ha).
            </p>
          </div>
        </div>

        {/* Pricing table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-gray-900">Prețuri pulverizare cu drona 2026, pe tip de cultură</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50">
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">Cultură</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Preț minim</th>
                  <th className="text-center px-4 py-3 font-semibold text-green-800 bg-green-100">Preț mediu</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Preț maxim</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Sezon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pricingData.map((row) => (
                  <tr key={row.cultura} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{row.cultura}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{row.min} {row.cultura.includes('MDL') ? 'MDL' : 'RON'}/ha</td>
                    <td className="px-4 py-3 text-center font-bold text-green-700 bg-green-50">{row.med} {row.cultura.includes('MDL') ? 'MDL' : 'RON'}/ha</td>
                    <td className="px-4 py-3 text-center text-gray-600">{row.max} {row.cultura.includes('MDL') ? 'MDL' : 'RON'}/ha</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-5 py-3 text-xs text-gray-500 border-t border-gray-100 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Prețuri orientative bazate pe date de piață din 2026. Contactați operatorul pentru ofertă exactă.
          </p>
        </div>

        {/* Factors */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Factori care influențează prețul</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {factors.map((f) => (
              <div key={f.factor} className="flex gap-3 p-4 bg-white border border-gray-200 rounded-xl">
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{f.factor}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{f.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farm-size tiered pricing */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Preț pulverizare dronă în funcție de suprafață</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { segment: 'Fermă mică', size: 'sub 50 ha', price: '120–150 RON/ha', note: 'Suprafețe fragmentate, teren dificil' },
              { segment: 'Fermă medie', size: '100–500 ha', price: '85–110 RON/ha', note: 'Prețul standard al pieței' },
              { segment: 'Fermă mare', size: '500–1.000 ha', price: '70–85 RON/ha', note: 'Contract sezonier avantajos' },
              { segment: 'Industrial', size: 'peste 1.000 ha', price: '65–75 RON/ha', note: 'Contract anual, prioritate la programare' },
            ].map((row) => (
              <div key={row.segment} className="flex items-center gap-3 px-5 py-3.5 text-sm">
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">{row.segment}</span>
                  <span className="text-gray-500 ml-2">({row.size})</span>
                </div>
                <div className="font-bold text-green-700 text-right">{row.price}</div>
                <div className="text-xs text-gray-400 hidden sm:block w-48 text-right">{row.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI / amortizare section */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-3">Merită drona agricolă? Calcul ROI rapid</h2>
          <p className="text-sm text-gray-700 mb-4">
            Pentru o fermă de 500 ha cu 3 tratamente/an, costul stropitului cu prestator este de <strong>150.000 RON/an</strong> (100 RON/ha × 500 ha × 3). O dronă DJI T50 costă ~85.000 EUR (350.000 RON). Fără tasare sol, recuperezi 5–8% din recoltă (valoare estimată: 50.000–80.000 RON/an). <strong>Amortizare estimată: 2–3 sezoane.</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            {[
              { label: 'Economie apă', value: '90%', sub: 'ULV vs. tractor clasic' },
              { label: 'Câștig recoltă', value: '+5–8%', sub: 'fără tasare sol' },
              { label: 'Amortizare', value: '2–3 sez.', sub: 'fermă 500+ ha' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg p-3 border border-green-100">
                <div className="font-bold text-green-700 text-xl">{stat.value}</div>
                <div className="text-xs text-gray-600 mt-0.5">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Calcul orientativ. Rentabilitatea reală depinde de numărul de hectare tratate, culturi și sezon.{' '}
            <a href="/ghid/fonduri-afir-drone" className="text-green-700 hover:underline">Fonduri AFIR 50–65% pentru achiziția dronei →</a>
          </p>
        </div>

        {/* Comparison: drone vs airplane */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Dronă vs. avion agricol vs. tractor cu bară</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Criteriu</th>
                  <th className="text-center px-3 py-3 font-semibold text-green-800 bg-green-50">Dronă agricolă</th>
                  <th className="text-center px-3 py-3 font-semibold text-gray-700">Avion agricol</th>
                  <th className="text-center px-3 py-3 font-semibold text-gray-700">Tractor cu bară</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Preț mediu/ha (serviciu)', '100 RON', '80 RON', '50–70 RON'],
                  ['Normă apă', '8–20 L/ha', '20–40 L/ha', '200–300 L/ha'],
                  ['Tasare sol', '✅ Zero', '✅ Zero', '❌ 5–8% cultură distrusă'],
                  ['Suprafața minimă', 'Orice', '> 50 ha', 'Orice'],
                  ['Condiții ploioase', '✅ Da', '✅ Da', '❌ Nu (noroi)'],
                  ['Precizie GPS', '> 95%', '85–90%', '> 98%'],
                  ['Vii și livezi', '✅ Da', '❌ Nu', '❌ Dificil'],
                  ['Culturi înalte (porumb)', '✅ Da', '✅ Da', '❌ Nu'],
                  ['Disponibilitate rapidă', '1–2 zile', '1–2 săptămâni', 'Imediat (dacă ai)'],
                ].map(([criteriu, drona, avion, tractor]) => (
                  <tr key={criteriu} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700 font-medium text-sm">{criteriu}</td>
                    <td className="px-3 py-3 text-center text-green-700 bg-green-50/50 font-medium">{drona}</td>
                    <td className="px-3 py-3 text-center text-gray-600">{avion}</td>
                    <td className="px-3 py-3 text-center text-gray-600">{tractor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Întrebări frecvente despre prețuri</h2>
          <FAQAccordion faqs={pricingFAQs} />
        </div>

        {/* Featured operators */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Solicită ofertă de la operatori</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featured.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/operatori" className="text-green-700 font-medium text-sm hover:underline">
              Vezi toți operatorii →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
