import { Crop } from './types';

export const crops: Crop[] = [
  {
    slug: 'grau',
    name: 'Grâu',
    nameRo: 'Grâu',
    description:
      'Grâul este cea mai cultivată cereală în România, cu aproape 2 milioane de hectare. Tratamentele cu drona pentru grâu includ aplicarea fungicidelor (fuzarioză, septorioză, rugini), insecticidelor (păduchi de cereale, tripsuri) și foliarelor azotate. Dronele pot acoperi 100–250 ha/zi pe terenuri plane, fără să taseze solul în perioadele umede când tractorul nu poate intra pe câmp.',
    priceMinRon: 70,
    priceMaxRon: 120,
    treatmentMonths: [3, 4, 5],
    haRomania: 1900000,
    haMoldova: 280000,
    icon: '🌾',
    mainPests: ['Fuzarioză spic', 'Septorioză (Zymoseptoria tritici)', 'Păduchi de cereale (Sitobion avenae)', 'Rugină galbenă', 'Tripsuri'],
    uvlNormLHa: '8–15 L/ha',
    yieldGainPct: 5,
  },
  {
    slug: 'porumb',
    name: 'Porumb',
    nameRo: 'Porumb',
    description:
      'Porumbul ocupă peste 2,5 milioane ha în România. Drona este singura soluție viabilă pentru tratamentele tardive (stadiul 6–8 frunze și mai târziu), când plantele înalte blochează accesul tractoarelor. Elimină tasarea solului care distruge 5–8% din cultură. Principalele intervenții: sfredelitorul porumbului (Ostrinia nubilalis) și rățișoara (Tanymecus dilaticollis).',
    priceMinRon: 70,
    priceMaxRon: 130,
    treatmentMonths: [6, 7, 8],
    haRomania: 2500000,
    haMoldova: 420000,
    icon: '🌽',
    mainPests: ['Sfredelitorul porumbului (Ostrinia nubilalis)', 'Rățișoara porumbului (Tanymecus dilaticollis)', 'Viermele vestic al rădăcinilor (Diabrotica)', 'Păduchi de frunze', 'Putregai de tulpini'],
    uvlNormLHa: '10–20 L/ha',
    yieldGainPct: 8,
  },
  {
    slug: 'rapita',
    name: 'Rapiță',
    nameRo: 'Rapiță',
    description:
      'România a atins un record de 700.000 ha cultivate cu rapiță în 2025. Tratamentele cu drona sunt esențiale toamna (insecticide împotriva gândacului negru și a puricilor pământului la semănat) și primăvara în faza de buton floral (fungicide și insecticide). Drona poate interveni rapid la atingerea pragului de dăunare de gândacul lucios (Meligethes aeneus), evitând pierderile de 20–40% din recoltă.',
    priceMinRon: 70,
    priceMaxRon: 120,
    treatmentMonths: [3, 4, 9, 10],
    haRomania: 700000,
    haMoldova: 95000,
    icon: '🌼',
    mainPests: ['Gândacul lucios al rapiței (Meligethes aeneus)', 'Gărgărița tulpinilor de rapiță (Ceutorhynchus napi)', 'Sclerotinia (putregaiul alb)', 'Alternarioza', 'Puricii pământului (Phyllotreta)'],
    uvlNormLHa: '8–12 L/ha',
    yieldGainPct: 6,
  },
  {
    slug: 'floarea-soarelui',
    name: 'Floarea Soarelui',
    nameRo: 'Floarea Soarelui',
    description:
      'Floarea soarelui este principala cultură oleaginoasă din România, cu 1,2 milioane ha. Tratamentele cu drona includ fungicide contra manei și sclerotiniei și insecticide contra buhei semănaturilor. Un avantaj special: desicanții aplicați cu drona uniformizează maturarea și reduc pierderile la recoltă cu 2–4%, mai ales în parcele cu maturare inegală.',
    priceMinRon: 70,
    priceMaxRon: 120,
    treatmentMonths: [6, 7, 8, 9],
    haRomania: 1200000,
    haMoldova: 350000,
    icon: '🌻',
    mainPests: ['Mana florii soarelui (Plasmopara halstedii)', 'Sclerotinia (putregaiul cenușiu)', 'Buha semănaturilor (Agrotis segetum)', 'Botrytis', 'Phomopsis'],
    uvlNormLHa: '8–15 L/ha',
    yieldGainPct: 5,
  },
  {
    slug: 'vita-de-vie',
    name: 'Viță de Vie',
    nameRo: 'Viță de Vie',
    description:
      'Viticultura beneficiază enorm de pe urma dronelor agricole. Terenul accidentat, rândurile dese și necesitatea de tratamente frecvente (8–12 pe sezon) fac drona indispensabilă. Curentul de aer al elicelor (downwash) asigură penetrarea coronamentului și acoperirea frunzelor pe ambele fețe. Normă: 40–90 L/ha. Regiuni principale: Dealu Mare, Murfatlar, Vrancea, Cotnari.',
    priceMinRon: 120,
    priceMaxRon: 200,
    treatmentMonths: [4, 5, 6, 7, 8, 9],
    haRomania: 178000,
    haMoldova: 100000,
    icon: '🍇',
    mainPests: ['Mana viței de vie (Plasmopara viticola)', 'Făinarea viței de vie (Erysiphe necator/Oidium)', 'Botrytis (putregaiul cenușiu)', 'Cicada verde (Empoasca vitis)', 'Moliile strugurilor (Lobesia botrana)'],
    uvlNormLHa: '40–90 L/ha',
    yieldGainPct: 0,
  },
  {
    slug: 'livada',
    name: 'Livadă (Pomi Fructiferi)',
    nameRo: 'Livadă',
    description:
      'Pomicultura din județele Argeș, Vâlcea, Prahova și Dâmbovița beneficiază de tratamentele cu drona pentru meri, peri, pruni și cireși. Drona navighează precis între rânduri și aplică tratamentele în condiții de vânt redus, acoperind inclusiv partea inferioară a frunzelor unde dăunătorii se ascund. Downwash-ul elicelor asigură penetrarea în coronament. Normă: 30–60 L/ha.',
    priceMinRon: 120,
    priceMaxRon: 200,
    treatmentMonths: [3, 4, 5, 6, 7, 8],
    haRomania: 95000,
    haMoldova: 18000,
    icon: '🍎',
    mainPests: ['Pătarea brună a frunzelor (Marssonina mali)', 'Rapanul (Venturia inaequalis)', 'Păduchele din San Jose (Comstock mealybug)', 'Viermele merelor (Cydia pomonella)', 'Monilioza'],
    uvlNormLHa: '30–60 L/ha',
    yieldGainPct: 0,
  },
  {
    slug: 'cereale',
    name: 'Cereale (General)',
    nameRo: 'Cereale',
    description:
      'Categoria generală pentru culturi cerealiere: grâu, orz, secară, ovăz, triticale. Tratamentele cu drona sunt aplicabile pe toate cerealele de toamnă și de primăvară. Normă recomandată: 8–15 L/ha pentru tratamente foliare. România cultivă peste 5 milioane ha cereale anual, cu concentrare mare în Câmpia Dunării și Bărăgan.',
    priceMinRon: 70,
    priceMaxRon: 120,
    treatmentMonths: [3, 4, 5, 6],
    haRomania: 5000000,
    haMoldova: 800000,
    icon: '🌾',
    mainPests: ['Fuzarioze', 'Păduchi de cereale', 'Rugini', 'Orzul: rețea de pete (Pyrenophora teres)'],
    uvlNormLHa: '8–15 L/ha',
    yieldGainPct: 5,
  },
  {
    slug: 'soia',
    name: 'Soia',
    nameRo: 'Soia',
    description:
      'Soia câștigă tot mai mult teren în România datorită cererii crescute și prețurilor bune. Tratamentele cu drona vizează afidele, buha semănaturilor și bolile foliare. Dronele sunt ideale pentru aplicarea tratamentelor pe culturi înalte (1–1,2 m), fără tasarea solului. În perioadele ploioase, drona poate intra pe câmp când tractorul este blocat.',
    priceMinRon: 75,
    priceMaxRon: 125,
    treatmentMonths: [6, 7, 8],
    haRomania: 280000,
    haMoldova: 65000,
    icon: '🫘',
    mainPests: ['Afide de soia (Aphis glycines)', 'Buha semănaturilor (Agrotis)', 'Sclerotinia (putregaiul alb)', 'Mozaicul soiei (SMV)', 'Molia soiei'],
    uvlNormLHa: '10–20 L/ha',
    yieldGainPct: 6,
  },
];

export function getCropBySlug(slug: string): Crop | undefined {
  return crops.find((c) => c.slug === slug);
}

export const CROP_NAME_MAP: Record<string, string> = Object.fromEntries(
  crops.map((c) => [c.slug, c.name])
);
