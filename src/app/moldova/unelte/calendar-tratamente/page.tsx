import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Calendar tratamente agricole Moldova 2026: Când să stropești? | MDL',
  description:
    'Calendar lunar cu tratamentele recomandate pentru culturi din Moldova: grâu, porumb, rapiță, viță de vie, livezi. Produse autorizate ANSA.',
  alternates: { canonical: '/moldova/unelte/calendar-tratamente' },
};

interface Treatment {
  month: string;
  monthNumber: number;
  crops: { crop: string; treatment: string; urgency: 'low' | 'medium' | 'high' }[];
}

const CALENDAR: Treatment[] = [
  {
    month: 'Ianuarie', monthNumber: 1,
    crops: [
      { crop: 'Livezi', treatment: 'Tratament de iarnă (cupru) contra bolilor de scoarță', urgency: 'low' },
    ],
  },
  {
    month: 'Februarie', monthNumber: 2,
    crops: [
      { crop: 'Viță de vie', treatment: 'Tăieri + tratament cupru preventiv', urgency: 'low' },
      { crop: 'Livezi', treatment: 'Stropire preflorală cu cupru', urgency: 'medium' },
    ],
  },
  {
    month: 'Martie', monthNumber: 3,
    crops: [
      { crop: 'Grâu / Orz', treatment: 'Erbicidare de primăvară + fungicid preventiv', urgency: 'high' },
      { crop: 'Rapiță', treatment: 'Tratament contra gândacului lucios', urgency: 'high' },
      { crop: 'Livezi', treatment: 'Stropiri preventive fungice', urgency: 'medium' },
    ],
  },
  {
    month: 'Aprilie', monthNumber: 4,
    crops: [
      { crop: 'Viță de vie', treatment: 'Primul tratament cu cupru + sulf', urgency: 'high' },
      { crop: 'Grâu', treatment: 'Fungicid T1 (fuzarioză, pătare frunze)', urgency: 'high' },
      { crop: 'Porumb', treatment: 'Semănat + erbicide preemergente', urgency: 'high' },
      { crop: 'Livezi', treatment: 'Tratamente contra afidelor și păduchelui', urgency: 'medium' },
    ],
  },
  {
    month: 'Mai', monthNumber: 5,
    crops: [
      { crop: 'Viță de vie', treatment: 'Tratamente contra manei + făinării (critice)', urgency: 'high' },
      { crop: 'Grâu', treatment: 'Fungicid T2 (protecția spicului, fuzarioze)', urgency: 'high' },
      { crop: 'Rapiță', treatment: 'Tratament contra gărgăriței silicvei', urgency: 'high' },
      { crop: 'Floarea-soarelui', treatment: 'Erbicide postemergente', urgency: 'medium' },
    ],
  },
  {
    month: 'Iunie', monthNumber: 6,
    crops: [
      { crop: 'Viță de vie', treatment: 'Tratamente contra manei + făinării (2× la 10–12 zile)', urgency: 'high' },
      { crop: 'Porumb', treatment: 'Erbicide postemergente + insecticid sfredelitor', urgency: 'high' },
      { crop: 'Livezi', treatment: 'Tratamente contra viermilor din fructe', urgency: 'high' },
    ],
  },
  {
    month: 'Iulie', monthNumber: 7,
    crops: [
      { crop: 'Viță de vie', treatment: 'Tratamente finale preventive contra putregaiului', urgency: 'medium' },
      { crop: 'Porumb', treatment: 'Tratament contra sfredelitorului + stres hidric', urgency: 'high' },
      { crop: 'Floarea-soarelui', treatment: 'Fungicid contra sclerotiniei + phomopsis', urgency: 'medium' },
    ],
  },
  {
    month: 'August', monthNumber: 8,
    crops: [
      { crop: 'Livezi', treatment: 'Tratamente pre-recoltare (respectă timp de pauză)', urgency: 'medium' },
      { crop: 'Rapiță', treatment: 'Pregătire teren + semănat toamnă', urgency: 'high' },
    ],
  },
  {
    month: 'Septembrie', monthNumber: 9,
    crops: [
      { crop: 'Rapiță', treatment: 'Erbicide preemergente + insecticide afide', urgency: 'high' },
      { crop: 'Grâu', treatment: 'Pregătire teren + semănat', urgency: 'high' },
      { crop: 'Viță de vie', treatment: 'Culegere + tratamente pre-iernare (cupru)', urgency: 'low' },
    ],
  },
  {
    month: 'Octombrie', monthNumber: 10,
    crops: [
      { crop: 'Grâu', treatment: 'Erbicid postemergent (combatere buruieni)', urgency: 'medium' },
      { crop: 'Livezi', treatment: 'Tratament de toamnă (cupru) contra bolilor', urgency: 'medium' },
    ],
  },
  {
    month: 'Noiembrie', monthNumber: 11,
    crops: [
      { crop: 'Livezi', treatment: 'Tratament cupru după căderea frunzelor', urgency: 'medium' },
    ],
  },
  {
    month: 'Decembrie', monthNumber: 12,
    crops: [
      {
        crop: '—',
        treatment: 'Planificare sezonul următor + depunere cerere AIPA + revizie echipament',
        urgency: 'low',
      },
    ],
  },
];

const URGENCY_STYLE: Record<string, string> = {
  high:   'bg-red-50    border-red-200    text-red-900',
  medium: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  low:    'bg-blue-50   border-blue-200   text-blue-900',
};

const URGENCY_LABEL: Record<string, string> = {
  high:   'Urgent',
  medium: 'Important',
  low:    'Planificat',
};

export default function MdlTreatmentCalendarPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Moldova', href: '/moldova' },
          { label: 'Unelte', href: '/moldova/unelte' },
          { label: 'Calendar tratamente' },
        ]}
      />

      <header className="mb-8 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
          Republica Moldova
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Calendar tratamente agricole Moldova 2026
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Ghid lunar cu tratamentele recomandate pentru principalele culturi din Republica Moldova.
          Folosiți exclusiv produse fitosanitare <strong>autorizate ANSA</strong>. Perioadele exacte variază
          în funcție de condițiile meteorologice ale raionului.
        </p>
      </header>

      {/* ANSA note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-gray-700">
        <strong className="text-blue-800">Important ANSA:</strong> Toate produsele fitosanitare aplicate
        cu drona trebuie să fie autorizate de Agenția Națională pentru Siguranța Alimentelor (ANSA) pentru
        aplicare aeriană în Moldova. Operatorul de dronă trebuie să fie autorizat ANSA separat.{' '}
        <Link href="/moldova/ghid/legislatie-ansa-moldova" className="text-blue-700 font-medium hover:underline">
          Vezi cerințele complete →
        </Link>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6 text-xs">
        {(['high', 'medium', 'low'] as const).map((u) => (
          <span key={u} className={`border rounded-full px-3 py-1 font-medium ${URGENCY_STYLE[u]}`}>
            {URGENCY_LABEL[u]}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {CALENDAR.map((month) => (
          <section
            key={month.monthNumber}
            className="bg-white border border-gray-200 rounded-xl p-5"
          >
            <h2 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {month.monthNumber}
              </span>
              {month.month}
            </h2>
            <div className="space-y-2">
              {month.crops.map((c, i) => (
                <div
                  key={i}
                  className={`border rounded-lg p-3 text-sm ${URGENCY_STYLE[c.urgency]}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold">{c.crop}</div>
                    <span className="text-xs opacity-70 flex-shrink-0">{URGENCY_LABEL[c.urgency]}</span>
                  </div>
                  <div className="text-xs mt-0.5 opacity-90">{c.treatment}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="bg-white border border-blue-200 rounded-xl p-6 text-center">
        <h2 className="font-bold text-gray-900 mb-2">Cauți un operator pentru tratamentele tale?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Programează tratamentele cu operatorii autorizați ANSA din Moldova.
        </p>
        <Link
          href="/moldova/operatori"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-sm"
        >
          Găsește un operator Moldova →
        </Link>
      </div>
    </div>
  );
}
