import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
import { services, getServiceBySlug } from '@/data/services';
import { operators } from '@/data/operators';
import { ServiceType, SERVICE_LABELS } from '@/data/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';

interface Props {
  params: { slug: string };
}

// MDL prices and Moldova-specific info per service
const MD_SERVICE_DATA: Record<string, {
  priceLabel: string;
  noteAnsa: string;
  faqs: { question: string; answer: string }[];
}> = {
  spraying: {
    priceLabel: '170–240 MDL/ha',
    noteAnsa: 'Operatorul trebuie autorizat ANSA pentru aplicarea produselor fitosanitare cu drona.',
    faqs: [
      {
        question: 'Cât costă pulverizarea cu drona în Moldova?',
        answer: 'Tariful standard este 170–240 MDL/ha (~€8.50–12/ha). Prețul mediu pentru cereale este 200 MDL/ha, iar pentru viță de vie poate ajunge la 240–280 MDL/ha.',
      },
      {
        question: 'Ce autorizații sunt necesare pentru pulverizare cu drona în Moldova?',
        answer: 'Operatorul trebuie autorizat de ANSA (Agenția Națională pentru Siguranța Alimentelor). Suplimentar, drona trebuie înregistrată la AAC Moldova (Autoritatea Aeronautică Civilă).',
      },
      {
        question: 'Ce suprafață poate trata o dronă pe zi în Moldova?',
        answer: 'O dronă DJI Agras T50 tratează 80–150 ha/zi în condiții optime. DRON Assistance, liderul pieței moldovenești, operează 16 drone simultan.',
      },
    ],
  },
  spreading: {
    priceLabel: '150–220 MDL/ha',
    noteAnsa: 'Fertilizanții aplicați aerian trebuie să fie autorizați ANSA pentru utilizare agricolă în Moldova.',
    faqs: [
      {
        question: 'Cât costă fertilizarea cu drona în Moldova?',
        answer: 'Tariful pentru fertilizarea foliară cu drona este de 150–220 MDL/ha (~€7.50–11/ha), în funcție de cultură și cantitatea de produs aplicat.',
      },
      {
        question: 'Ce tipuri de îngrășăminte se pot aplica cu drona în Moldova?',
        answer: 'Fertilizanți lichizi (foliare), granule fine (uree, DAP, MAP) și produse biologice autorizate ANSA. Granulele trebuie să aibă 1–4 mm pentru compatibilitate cu sistemul centrifugal.',
      },
    ],
  },
  monitoring: {
    priceLabel: '100–180 MDL/ha',
    noteAnsa: 'Monitorizarea nu implică aplicarea de produse, deci nu necesită autorizație ANSA specifică pentru fitosanitare.',
    faqs: [
      {
        question: 'Cât costă monitorizarea NDVI cu drona în Moldova?',
        answer: 'Tariful pentru monitorizare este 100–180 MDL/ha (~€5–9/ha), incluzând raportul NDVI. Pachetele sezoniere sunt mai avantajoase.',
      },
      {
        question: 'Ce beneficii aduce monitorizarea NDVI fermierilor din Moldova?',
        answer: 'Hărțile NDVI identifică zonele cu stres hidric, boli sau deficit de nutrienți înainte ca acestea să fie vizibile. Fermierii pot economisi 20–40% din costul tratamentelor prin intervenție țintită.',
      },
    ],
  },
  mapping: {
    priceLabel: '120–200 MDL/ha',
    noteAnsa: 'Cartografierea nu necesită autorizație ANSA, doar înregistrarea dronei la AAC Moldova.',
    faqs: [
      {
        question: 'Cât costă cartografierea cu drona în Moldova?',
        answer: 'Tariful pentru cartografiere ortofoto este 120–200 MDL/ha (~€6–10/ha), incluzând fișierele GeoTIFF și raportul topografic. Proiectele mari beneficiază de reduceri.',
      },
      {
        question: 'Ce precizie au hărțile realizate cu drona în Moldova?',
        answer: 'Hărțile cu drone echipate GPS RTK/PPK ating 1–3 cm orizontal și 2–5 cm vertical, suficientă pentru aplicații cadastrale conforme cu standardele ARFC Moldova.',
      },
    ],
  },
  training: {
    priceLabel: '3.000–8.000 MDL/curs',
    noteAnsa: 'Cursurile de formare trebuie să includă modulul de autorizare ANSA și AAC Moldova.',
    faqs: [
      {
        question: 'Cât costă un curs de pilot de dronă agricolă în Moldova?',
        answer: 'Un curs complet (teorie + practică + autorizare AAC + modul ANSA) costă 3.000–8.000 MDL (~€150–400), în funcție de furnizor și durata cursului.',
      },
      {
        question: 'Ce autorizații obții după cursul de pilot în Moldova?',
        answer: 'Certificat de pilot eliberat de AAC Moldova pentru categoria dronei (sub/peste 25 kg) și autorizarea ANSA pentru aplicarea fitosanitarelor. Ambele sunt necesare pentru activitate comercială.',
      },
    ],
  },
  rental: {
    priceLabel: 'La cerere (zi / sezon)',
    noteAnsa: 'La închirierea fără pilot, operatorul (chiriaș) trebuie să fie autorizat AAC și ANSA.',
    faqs: [
      {
        question: 'Unde pot închiria o dronă agricolă în Moldova?',
        answer: 'Principalii operatori care oferă închiriere sunt DRON Assistance și BOSAL Solutions. Contactați direct pentru disponibilitate și tarife MDL pe zi sau pe sezon.',
      },
      {
        question: 'Pot închiria o dronă fără a fi pilot autorizat?',
        answer: 'Nu. La închirierea fără pilot, chiriaşul trebuie să dețină autorizație AAC Moldova și autorizare ANSA. La închirierea cu pilot, operatorul asigură echipajul autorizat.',
      },
    ],
  },
  sales: {
    priceLabel: 'De la €40.000 (AIPA 50%)',
    noteAnsa: 'Drona achiziționată trebuie înregistrată la AAC Moldova. Subvenție AIPA disponibilă prin Anexa 3.',
    faqs: [
      {
        question: 'Care sunt prețurile dronelor agricole în Moldova (2026)?',
        answer: 'DJI Agras T25P costă ~45.000–55.000 EUR, DJI Agras T50 ~75.000–95.000 EUR. Cu subvenția AIPA de 50% (max 200.000 MDL ≈ €10.000), costul net scade semnificativ.',
      },
      {
        question: 'Cum obțin subvenția AIPA pentru cumpărarea unei drone în Moldova?',
        answer: 'Depui cerere la AIPA, cumperi drona de la un dealer autorizat (BOSAL Solutions sau DRON Assistance), și primești rambursarea de 50% din cost, plafonată la 200.000 MDL.',
      },
    ],
  },
  seeding: {
    priceLabel: '160–210 MDL/ha',
    noteAnsa: 'Semănatul cu drona nu necesită autorizație ANSA specific fitosanitară, dar drona trebuie înregistrată la AAC.',
    faqs: [
      {
        question: 'Cât costă semănatul cu drona în Moldova?',
        answer: 'Tariful pentru semănat de precizie cu drona este 160–210 MDL/ha, în funcție de cultură (rapiță, iarbă, culturi intermediare) și densitatea de semănat.',
      },
      {
        question: 'Ce culturi pot fi semănate cu drona în Moldova?',
        answer: 'Rapiță, iarbă, trifoi, muștar, culturi intermediare, orez și semințe forestiere pentru reîmpădurire. Ideal pentru terenuri umede sau greu accesibile.',
      },
    ],
  },
  consultancy: {
    priceLabel: 'La cerere (sesiune)',
    noteAnsa: 'Consultanța include și asistență pentru completarea cererilor AIPA și obținerea autorizației ANSA.',
    faqs: [
      {
        question: 'Ce include consultanța pentru drone agricole în Moldova?',
        answer: 'Elaborarea cererilor AIPA, asistență autorizare ANSA, selecția echipamentelor potrivite, planificarea tratamentelor și analiza NDVI pentru optimizarea culturilor.',
      },
      {
        question: 'Cât costă consultanța pentru fonduri AIPA?',
        answer: 'Tariful variază între 500–2.000 MDL per sesiune, sau 2–4% din valoarea subvenției AIPA pentru asistență completă la dosar.',
      },
    ],
  },
  emergency: {
    priceLabel: '220–290 MDL/ha (+20–30%)',
    noteAnsa: 'Intervenția de urgență necesită aceleași autorizații ANSA ca orice pulverizare. Operatorul trebuie să fie autorizat.',
    faqs: [
      {
        question: 'Cât costă intervenția de urgență cu drona în Moldova?',
        answer: 'Tariful de urgență este cu 20–30% mai mare față de prețul standard: 220–290 MDL/ha față de 170–240 MDL/ha. Unii operatori au echipe disponibile în 24–48 ore.',
      },
      {
        question: 'În cât timp ajunge un operator de urgență în Moldova?',
        answer: 'DRON Assistance garantează intervenție națională în 24–48 ore. Operatorii locali din raionul afectat pot ajunge mai rapid (câteva ore).',
      },
    ],
  },
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug as ServiceType);
  if (!service) return {};
  const mdData = MD_SERVICE_DATA[service.slug];
  return {
    title: `${service.nameRo} Moldova 2026 | ${mdData?.priceLabel ?? 'Servicii dronă'}`,
    description: `${service.description.replace('România', 'Moldova')} Prețuri în MDL, operatori autorizați ANSA.`,
    alternates: { canonical: `/moldova/servicii/${params.slug}` },
    keywords: service.keywords.join(', '),
  };
}

export default function MoldovaServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug as ServiceType);
  if (!service) notFound();

  const mdData = MD_SERVICE_DATA[service.slug];
  const mdOps = operators.filter(
    (op) => op.country === 'MD' && op.services.includes(service.slug)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Moldova', href: '/moldova' },
          { label: 'Servicii', href: '/moldova/servicii' },
          { label: service.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
          Republica Moldova
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.nameRo} în Moldova</h1>
        <p className="text-gray-600 text-lg">
          {service.description.replace('România', 'Moldova')} Prețuri în MDL, operatori autorizați ANSA.
        </p>
      </div>

      {/* Service info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3">Despre serviciu în Moldova</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          {service.longDescription
            .replace(/România/g, 'Moldova')
            .replace(/AACR/g, 'ANSA / AAC')
            .replace(/AFIR/g, 'AIPA')
            .replace(/RON/g, 'MDL')}
        </p>
        {mdData && (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">
              Preț orientativ Moldova:{' '}
              <span className="font-semibold text-blue-700">{mdData.priceLabel}</span>
            </span>
          </div>
        )}
        {mdData?.noteAnsa && (
          <div className="flex items-start gap-2 mt-2">
            <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600">{mdData.noteAnsa}</span>
          </div>
        )}
      </div>

      {/* Moldova operators */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Operatori din Moldova care oferă {service.name.toLowerCase()}
          <span className="text-sm font-normal text-gray-500 ml-2">({mdOps.length})</span>
        </h2>

        {mdOps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {mdOps.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 font-medium mb-3">
              Nu avem operatori specializați în {service.name.toLowerCase()} listați momentan în Moldova.
            </p>
            <Link
              href="/moldova/operatori"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              Toți operatorii Moldova
            </Link>
          </div>
        )}
      </div>

      {/* FAQ */}
      {mdData?.faqs && mdData.faqs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Întrebări frecvente despre {service.name.toLowerCase()} în Moldova
          </h2>
          <FAQAccordion faqs={mdData.faqs} />
        </div>
      )}

      {/* Other services */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Alte servicii disponibile în Moldova</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SERVICE_LABELS)
            .filter(([key]) => key !== service.slug)
            .map(([key, label]) => (
              <Link
                key={key}
                href={`/moldova/servicii/${key}`}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:border-blue-300 hover:text-blue-700 transition-colors text-gray-700"
              >
                {label}
              </Link>
            ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white border border-blue-200 rounded-xl p-6 text-center">
        <h2 className="font-bold text-gray-900 mb-2">Adaugă serviciul tău în Moldova</h2>
        <p className="text-sm text-gray-600 mb-4">
          Ești operator cu servicii de {service.name.toLowerCase()} în Moldova? Listare 100% gratuită.
        </p>
        <Link
          href="/adauga-operator"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-sm"
        >
          Adaugă operator Moldova →
        </Link>
      </div>
    </div>
  );
}
