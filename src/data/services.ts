import { ServiceType } from './types';

export interface ServiceDefinition {
  slug: ServiceType;
  name: string;
  nameRo: string;
  description: string;
  longDescription: string;
  icon: string;
  priceMinRon?: number;
  priceMaxRon?: number;
  priceUnit: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
}

export const services: ServiceDefinition[] = [
  {
    slug: 'spraying',
    name: 'Pulverizare',
    nameRo: 'Pulverizare cu dronă',
    description: 'Tratamente fitosanitare cu drona agricolă: fungicide, insecticide, erbicide.',
    longDescription:
      'Pulverizarea cu drona agricolă este cea mai eficientă metodă de aplicare a produselor fitosanitare pe culturi. Dronele agricole moderne pot trata între 10 și 20 de hectare pe oră, cu o precizie de centimetri. Sistemul de pulverizare centrifugal asigură o acoperire uniformă și reduce consumul de substanțe active cu până la 30% față de metodele tradiționale.',
    icon: '💧',
    priceMinRon: 70,
    priceMaxRon: 200,
    priceUnit: 'RON/ha',
    keywords: [
      'pulverizare drona',
      'tratament fitosanitar drona',
      'stropit cu drona',
      'pulverizare aeriana',
      'drona agricola pret',
    ],
    faqs: [
      {
        question: 'Cât costă pulverizarea cu drona agricolă?',
        answer:
          'Prețul variază între 70 și 200 RON/ha în funcție de cultură și regiune. Viticultura și pomicultura sunt mai scumpe (120–200 RON/ha) față de cerealele păioase (70–130 RON/ha).',
      },
      {
        question: 'Ce suprafață poate trata o dronă pe zi?',
        answer:
          'O dronă agricolă modernă (DJI T50, XAG P100) poate trata 80–150 ha/zi în condiții optime, cu o echipă de 2 operatori.',
      },
      {
        question: 'Este necesară o autorizație pentru pulverizarea cu drona?',
        answer:
          'Da, operatorul trebuie să fie autorizat AACR (Autoritatea Aeronautică Civilă Română) pentru operații în clasa Open sau Specific, în funcție de greutatea dronei.',
      },
    ],
  },
  {
    slug: 'spreading',
    name: 'Fertilizare',
    nameRo: 'Fertilizare cu dronă',
    description: 'Aplicare îngrășăminte granulare și foliare cu precizie maximă.',
    longDescription:
      'Fertilizarea cu drona permite aplicarea uniformă a îngrășămintelor granulare sau lichide pe suprafețe mari. Sistemul de împrăștiere centrifugal acoperă uniform 5–10 metri lățime. Ideal pentru aplicări de toamnă (fosfat, potasiu) și primăvară (azot), precum și pentru tratamente foliare.',
    icon: '🌱',
    priceMinRon: 80,
    priceMaxRon: 150,
    priceUnit: 'RON/ha',
    keywords: [
      'fertilizare drona',
      'imprastiere ingrasaminte drona',
      'fertilizare aeriana',
      'imprastiere granule drona',
    ],
    faqs: [
      {
        question: 'Ce tipuri de îngrășăminte se pot aplica cu drona?',
        answer:
          'Dronele agricole pot aplica fertilizanți lichizi (foliare), granule fine (uree, DAP, MAP) și produse biologice. Granulele trebuie să aibă dimensiuni de 1–4 mm pentru compatibilitate cu sistemul centrifugal.',
      },
      {
        question: 'Este mai eficientă fertilizarea cu drona față de cea mecanică?',
        answer:
          'Pe terenuri accidentate, în plantații sau în zone cu acces dificil, drona este net superioară. Pe câmpii mari și plane, utilajele terestre rămân mai economice ca preț/ha.',
      },
    ],
  },
  {
    slug: 'monitoring',
    name: 'Monitorizare',
    nameRo: 'Monitorizare culturi',
    description: 'Supraveghere și inspecție culturi cu camere multispectrale și termale.',
    longDescription:
      'Monitorizarea culturilor cu dronă utilizează camere RGB, multispectrale (NDVI) și termale pentru a detecta stresul hidric, bolile și dăunătorii înainte ca acestea să devină vizibile cu ochiul liber. Rapoartele NDVI identifică zonele cu probleme și permit intervenție țintită, reducând costurile cu tratamentele cu până la 40%.',
    icon: '👁️',
    priceMinRon: 100,
    priceMaxRon: 300,
    priceUnit: 'RON/ha',
    keywords: [
      'monitorizare culturi drona',
      'inspectie culturi drona',
      'ndvi drona',
      'supraveghere camp drona',
      'drona multispectral',
    ],
    faqs: [
      {
        question: 'Ce este analiza NDVI și cum ajută fermierii?',
        answer:
          'NDVI (Normalized Difference Vegetation Index) măsoară sănătatea vegetației folosind spectrul infraroșu. Valorile scăzute indică stres hidric, boli sau lipsă de nutrienți, permițând intervenție precisă înainte de pierderi majore de recoltă.',
      },
      {
        question: 'Cât de des trebuie monitorizate culturile?',
        answer:
          'Recomandarea standard este monitorizarea la 2–3 săptămâni în sezon. Culturile sensibile (viță de vie, legume) pot necesita monitorizare săptămânală în perioadele critice.',
      },
    ],
  },
  {
    slug: 'mapping',
    name: 'Cartografiere',
    nameRo: 'Cartografiere și fotogrammetrie',
    description: 'Hărți de precizie, modele 3D și planuri cadastrale cu drone.',
    longDescription:
      'Cartografierea cu drona produce hărți ortofoto de înaltă rezoluție (2–5 cm/pixel), modele digitale de teren (DTM) și modele 3D ale culturilor sau infrastructurii agricole. Livrabilele includ fișiere GeoTIFF, KML, DXF pentru integrare în platformele de agricultură de precizie.',
    icon: '🗺️',
    priceMinRon: 150,
    priceMaxRon: 500,
    priceUnit: 'RON/ha',
    keywords: [
      'cartografiere drona',
      'fotogrammetrie drona',
      'harta 3d drona',
      'model digital teren drona',
      'ortofoto drona',
    ],
    faqs: [
      {
        question: 'Ce precizie au hărțile realizate cu drona?',
        answer:
          'Hărțile realizate cu drone echipate cu GPS RTK/PPK ating precizie de 1–3 cm orizontal și 2–5 cm vertical, suficientă pentru aplicații cadastrale și de precizie agricolă.',
      },
      {
        question: 'Cât timp durează cartografierea unui teren?',
        answer:
          'O dronă de cartografiere acoperă 50–200 ha/oră în zbor. Procesarea datelor (fotogrammetrie) durează 2–8 ore suplimentar, în funcție de complexitate.',
      },
    ],
  },
  {
    slug: 'training',
    name: 'Formare piloți',
    nameRo: 'Formare piloți drone agricole',
    description: 'Cursuri autorizate pentru piloți de drone agricole, AACR și practic.',
    longDescription:
      'Cursurile de formare pentru piloți de drone agricole acoperă legislația aviației civile, operarea practică a dronelor agricole DJI și XAG, planificarea misiunilor, calibrarea echipamentelor și proceduri de siguranță. La absolvire se obține brevetul AACR pentru operații în clasa Open A1/A3 sau clasa Specific.',
    icon: '🎓',
    priceMinRon: 1500,
    priceMaxRon: 5000,
    priceUnit: 'RON/curs',
    keywords: [
      'curs drona agricola',
      'formare pilot drona',
      'brevet drona aacr',
      'autorizatie pilot drona',
      'training drona agricola',
    ],
    faqs: [
      {
        question: 'Ce autorizații sunt necesare pentru a opera o dronă agricolă?',
        answer:
          'În România, operatorii de drone trebuie înregistrați la AACR. Dronele sub 25 kg (clasa Open A1/A3) necesită certificat de competență. Dronele mai mari sau operațiile comerciale necesită autorizație Specific.',
      },
      {
        question: 'Cât durează un curs de pilot de dronă agricolă?',
        answer:
          'Un curs complet (teorie + practică + examen AACR) durează 3–5 zile. Cursurile specializate pe drone agricole DJI sau XAG pot fi completate în 2–3 zile pentru piloți cu experiență.',
      },
    ],
  },
  {
    slug: 'rental',
    name: 'Închiriere drone',
    nameRo: 'Închiriere drone agricole',
    description: 'Închiriere drone agricole cu sau fără operator: DJI, XAG, ADT.',
    longDescription:
      'Închirierea dronelor agricole este o alternativă viabilă pentru fermierii care doresc să opereze propriile echipamente fără a investi în achiziție. Dronele de închiriat sunt disponibile cu sau fără operator, pe zi sau pe sezon. Tariful include asigurarea echipamentului și suport tehnic.',
    icon: '🚁',
    priceMinRon: 500,
    priceMaxRon: 2000,
    priceUnit: 'RON/zi',
    keywords: [
      'inchiriere drona agricola',
      'rent drona agricola',
      'drona agricola de inchiriat',
      'inchiriere dji t50',
    ],
    faqs: [
      {
        question: 'Cât costă închirierea unei drone agricole pe zi?',
        answer:
          'Tariful de închiriere variază între 500 și 2.000 RON/zi, în funcție de modelul dronei și dacă include sau nu operator. Pachetele pe sezon sunt semnificativ mai avantajoase.',
      },
      {
        question: 'Ce dronă agricolă este disponibilă pentru închiriere?',
        answer:
          'Cele mai comune drone de închiriat sunt DJI T25P (16L, 16ha/h) și DJI T50 (40L, 43ha/h). Unii operatori oferă și XAG P100 sau modele ADT Falcon.',
      },
    ],
  },
  {
    slug: 'sales',
    name: 'Vânzare drone',
    nameRo: 'Vânzare drone agricole',
    description: 'Vânzare drone agricole DJI, XAG, ADT prin dealeri autorizați din România și Moldova.',
    longDescription:
      'Dealerii autorizați DJI Agras, XAG și ADT din România și Moldova comercializează drone agricole noi cu garanție producător, service post-vânzare și consultanță pentru eligibilitatea AFIR. Prețurile variază de la 45.000 EUR (DJI Agras T25P) până la 120.000 EUR (pachete complete DJI Agras T100 + stații de încărcare).',
    icon: '🛒',
    priceMinRon: 200000,
    priceMaxRon: 600000,
    priceUnit: 'RON/unitate',
    keywords: [
      'vanzare drona agricola',
      'dealer dji romania',
      'xag romania',
      'drona t50 pret',
      'drona afir',
    ],
    faqs: [
      {
        question: 'Care sunt prețurile dronelor agricole în 2026?',
        answer:
          'În 2026, DJI Agras T25P costă aproximativ 45.000–55.000 EUR, DJI Agras T50 între 75.000–95.000 EUR, iar DJI Agras T100 depășește 110.000 EUR. Prețurile includ baterii, încărcător rapid și controler. Sunt eligibile pentru fonduri AFIR.',
      },
      {
        question: 'Cum beneficiez de fonduri AFIR pentru cumpărarea unei drone?',
        answer:
          'Fondurile AFIR (submăsura 4.1, intervenția DR-29) acoperă 50–65% din costul dronei pentru fermele eligibile. Depui proiectul la AFIR, obții aprobarea, cumperi drona de la un dealer autorizat și primești rambursarea.',
      },
    ],
  },
  {
    slug: 'seeding',
    name: 'Semănat cu drona',
    nameRo: 'Semănat și însămânțare cu dronă',
    description: 'Semănat de culturi intermediare, ierburi, orez și reîmpădurire cu drona.',
    longDescription:
      'Semănatul cu drona este ideal pentru culturi intermediare (muștar, facelia, rapiță), ierburi, orez și proiecte de reîmpădurire. Dronele cu sistem de împrăștiere centrifugal pot însămânța 5–10 hectare pe oră cu o densitate controlată. Metoda este foarte eficientă pentru zone greu accesibile, terenuri umede sau culturi intercalate.',
    icon: '🌾',
    priceMinRon: 80,
    priceMaxRon: 150,
    priceUnit: 'RON/ha',
    keywords: [
      'semanat drona',
      'insamantare drona',
      'drona semanat orez',
      'reimpadurire drona',
      'culturi intermediare drona',
    ],
    faqs: [
      {
        question: 'Ce culturi pot fi semănate cu drona?',
        answer:
          'Dronele agricole pot însămânța eficient culturi cu semințe mici: muștar, facelia, trifoi, ierburi, orez, rapiță, amestecuri pentru culturi intermediare și semințe forestiere pentru reîmpădurire.',
      },
      {
        question: 'Care este productivitatea dronei la semănat?',
        answer:
          'O dronă DJI Agras T50 cu încărcătură de 50 kg poate semăna 5–10 ha pe oră, în funcție de densitatea de semănat și terenul zburat.',
      },
    ],
  },
  {
    slug: 'consultancy',
    name: 'Consultanță agricolă',
    nameRo: 'Consultanță agricolă drone',
    description: 'Consultanță pentru agricultură de precizie, fonduri AFIR și implementare drone.',
    longDescription:
      'Consultanța agricolă pentru drone include elaborarea proiectelor AFIR, analize NDVI, planificarea tratamentelor, selecția echipamentelor și formarea echipelor. Consultanții colaborează cu fermierii pentru a implementa strategii de agricultură de precizie care reduc costurile cu 25–40% și cresc randamentul.',
    icon: '📋',
    priceMinRon: 300,
    priceMaxRon: 2500,
    priceUnit: 'RON/sesiune',
    keywords: [
      'consultanta drona agricola',
      'proiect afir drona',
      'consultanta agricultura precizie',
      'analiza ndvi consultanta',
    ],
    faqs: [
      {
        question: 'Ce include consultanța pentru fonduri AFIR pe drone?',
        answer:
          'Consultanța AFIR include: analiza eligibilității, alegerea dronei potrivite, întocmirea studiului de fezabilitate, depunerea cererii, asistență în evaluare și decontare. Tariful este de 3–5% din valoarea proiectului.',
      },
      {
        question: 'Cât costă un proiect de agricultură de precizie?',
        answer:
          'Un proiect complet (analiza inițială, planul tratamentelor, raportul NDVI, formarea personalului) pornește de la 1.500 RON pentru ferme mici și poate depăși 10.000 RON pentru exploatații de peste 500 ha.',
      },
    ],
  },
  {
    slug: 'emergency',
    name: 'Intervenție rapidă',
    nameRo: 'Intervenție rapidă drone 24/7',
    description: 'Tratamente de urgență pentru atacuri de dăunători și boli, intervenție în 24–48h.',
    longDescription:
      'Serviciul de intervenție rapidă cu drone este disponibil 24/7 pentru situații critice: atacuri masive de dăunători (gândac, omidă), infestări fungice rapide (mană, făinare) sau dezastre naturale. Echipele mobile ajung la fermă în maximum 24–48 ore și aplică tratamentele necesare pe suprafețe mari în câteva ore.',
    icon: '🚨',
    priceMinRon: 150,
    priceMaxRon: 350,
    priceUnit: 'RON/ha',
    keywords: [
      'interventie rapida drona',
      'tratament urgenta drona',
      'drona daunatori urgent',
      'stropit urgent drona',
    ],
    faqs: [
      {
        question: 'În cât timp se face intervenția de urgență?',
        answer:
          'Operatorii specializați în intervenții de urgență garantează deplasarea în 24–48 ore pentru situații critice. În sezon, unii operatori au echipe de gardă disponibile 24/7.',
      },
      {
        question: 'Cât costă intervenția de urgență cu drona?',
        answer:
          'Tariful este cu 30–70% mai mare decât prețul standard, în funcție de distanță, urgență și suprafață. Prețul mediu este de 200 RON/ha pentru cereale și 300 RON/ha pentru viticultură.',
      },
    ],
  },
];

export const serviceBySlug: Record<string, ServiceDefinition> = Object.fromEntries(
  services.map((s) => [s.slug, s])
);

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return serviceBySlug[slug];
}
