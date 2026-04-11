import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Info } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Prețuri Drone Agricole Moldova 2026 | Tarife MDL/ha',
  description:
    'Prețurile actuale ale serviciilor drone agricole în Republica Moldova: pulverizare 170–240 MDL/ha, fertilizare, monitorizare NDVI. Comparație MDL și EUR.',
  alternates: { canonical: '/moldova/preturi' },
};

const pricingTable = [
  { service: 'Pulverizare cereale (grâu, porumb, orz)', min: 170, max: 220, note: 'Tarif standard' },
  { service: 'Pulverizare floarea-soarelui, soia', min: 180, max: 230, note: '' },
  { service: 'Pulverizare rapiță', min: 175, max: 225, note: '' },
  { service: 'Pulverizare viță de vie', min: 200, max: 280, note: 'Teren accidentat +20%' },
  { service: 'Pulverizare livezi', min: 200, max: 280, note: 'Pomicultură intensivă' },
  { service: 'Fertilizare foliară', min: 150, max: 220, note: 'Orice cultură' },
  { service: 'Monitorizare NDVI', min: 100, max: 180, note: 'Raport PDF inclus' },
  { service: 'Cartografiere ortofoto', min: 120, max: 200, note: 'Fișiere GeoTIFF' },
  { service: 'Semănat cu drona', min: 160, max: 210, note: 'Rapiță, iarbă, reîmpădurire' },
  { service: 'Intervenție de urgență', min: 220, max: 290, note: '+20–30% față de standard' },
];

const factors = [
  {
    title: 'Suprafața totală',
    desc: 'Loturile de 100+ ha beneficiază de reduceri de 10–20% față de tariful standard per hectar.',
  },
  {
    title: 'Distanța de deplasare',
    desc: 'Operatorii adaugă transport pentru deplasări >50 km. Lucrează cu operatori locali din raionul tău.',
  },
  {
    title: 'Tipul culturii',
    desc: 'Viticultura și pomicultura sunt cu 30–60 MDL/ha mai scumpe față de cerealele de câmp.',
  },
  {
    title: 'Urgența intervenției',
    desc: 'Tratamentele de urgență (24–48h) costă cu 20–30% mai mult față de programările standard.',
  },
  {
    title: 'Tipul produsului aplicat',
    desc: 'Produsele vâscoase sau cu densitate mare pot crește marginal tariful de aplicare.',
  },
  {
    title: 'Autorizarea ANSA',
    desc: 'Operatorii autorizați ANSA pot percepe tarife puțin mai mari, dar garantează legalitate deplină.',
  },
];

const faqs = [
  {
    q: 'Cât costă în medie pulverizarea cu drona în Moldova?',
    a: 'Prețul mediu este 200 MDL/ha (~€10/ha). Intervalul obișnuit este 170–240 MDL/ha pentru cereale și culturi de câmp, în funcție de cultură, raion și volum.',
  },
  {
    q: 'Se poate obține subvenție AIPA pentru servicii de pulverizare?',
    a: 'Subvenția AIPA se aplică la achiziția dronei agricole (50%, maxim 200.000 MDL), nu la serviciile de pulverizare. Fermierii care cumpără propria dronă beneficiază de subvenție prin Anexa 3.',
  },
  {
    q: 'Există diferențe de preț între raioane?',
    a: 'Da. Operatorii din Chișinău pot percepe cu 15–20 MDL/ha mai mult față de cei locali. Recomandăm să contactezi operatori din raionul tău sau din raioanele adiacente pentru tarife mai bune.',
  },
  {
    q: 'Cum se compară prețurile din Moldova cu cele din România?',
    a: 'Prețurile moldovenești sunt mai accesibile în EUR (~€8.50–12/ha față de €14–25/ha în România). Această diferență reflectă costurile de operare mai reduse și puterea de cumpărare diferită.',
  },
];

export default function MoldovaPricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Moldova', href: '/moldova' },
          { label: 'Prețuri MDL/ha' },
        ]}
      />

      <header className="mb-8 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
          Republica Moldova
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Prețuri drone agricole în Moldova (MDL/ha)
        </h1>
        <p className="text-gray-600">
          Tarifare actualizată 2026 pentru servicii de drone agricole în Republica Moldova.
          Prețuri în lei moldovenești (MDL). Subvenție AIPA 50% disponibilă la achiziția dronei.
        </p>
      </header>

      {/* Quick answer capsule */}
      <div className="bg-blue-700 text-white rounded-2xl p-6 mb-8">
        <div className="text-xs text-blue-200 mb-1 uppercase tracking-wider font-semibold">
          Răspuns rapid
        </div>
        <p className="text-lg font-semibold leading-snug">
          Pulverizarea cu drona în Moldova costă între{' '}
          <span className="text-yellow-300">170 și 240 MDL/ha</span> (~€8.50–12/ha).
          Prețul mediu este{' '}
          <span className="text-yellow-300">200 MDL/ha</span> pentru cereale și culturi de câmp.
        </p>
      </div>

      {/* Pricing table */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Tarife pe tip de serviciu și cultură (2026)
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Serviciu / Cultură</th>
                  <th className="text-right p-4 font-semibold text-gray-700 whitespace-nowrap">
                    Minim MDL
                  </th>
                  <th className="text-right p-4 font-semibold text-gray-700 whitespace-nowrap">
                    Maxim MDL
                  </th>
                  <th className="text-right p-4 font-semibold text-gray-700 hidden sm:table-cell">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pricingTable.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{row.service}</td>
                    <td className="p-4 text-right text-blue-700 font-semibold">{row.min}</td>
                    <td className="p-4 text-right text-blue-700 font-semibold">{row.max}</td>
                    <td className="p-4 text-right text-gray-500 hidden sm:table-cell text-xs">
                      {row.note || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          Prețurile sunt orientative. Contactează direct operatorul pentru ofertă personalizată pe raionul tău.
        </p>
      </section>

      {/* Factors */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Factori care influențează prețul
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {factors.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl"
            >
              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900 text-sm mb-0.5">{f.title}</div>
                <div className="text-xs text-gray-600 leading-relaxed">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MDL → EUR */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Conversie MDL → EUR (curs 2026)</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-gray-700">
          <p className="mb-3 text-gray-600">La cursul de schimb din 2026 (~20 MDL/EUR):</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <span className="font-semibold text-gray-900 w-28">170 MDL/ha</span>
              <span className="text-gray-500">≈ €8.50/ha</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="font-semibold text-gray-900 w-28">200 MDL/ha</span>
              <span className="text-gray-500">≈ €10/ha</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="font-semibold text-gray-900 w-28">240 MDL/ha</span>
              <span className="text-gray-500">≈ €12/ha</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="font-semibold text-gray-900 w-28">280 MDL/ha</span>
              <span className="text-gray-500">≈ €14/ha (viticultură)</span>
            </li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">
            Comparativ: în România prețul mediu este 100–150 RON/ha (~€20–30/ha), semnificativ mai mare.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Întrebări frecvente despre prețuri
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="font-semibold text-gray-900 mb-2 text-sm">{faq.q}</div>
              <div className="text-sm text-gray-600 leading-relaxed">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-white border border-blue-200 rounded-xl p-6 text-center">
        <h2 className="font-bold text-gray-900 mb-2">Găsește operatori cu cel mai bun preț</h2>
        <p className="text-sm text-gray-600 mb-4">
          Compară ofertele operatorilor verificați din Moldova și contactează-i direct pentru ofertă.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/moldova/operatori"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-sm"
          >
            Vezi toți operatorii Moldova
          </Link>
          <Link
            href="/moldova/ghid"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-blue-300 text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm"
          >
            Subvenție AIPA 50% →
          </Link>
        </div>
      </div>
    </div>
  );
}
