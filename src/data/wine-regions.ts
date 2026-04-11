export interface WineRegion {
  slug: string;
  name: string;
  counties: string[]; // county slugs
  vineyardHa: number;
  lat: number;
  lng: number;
  description: string;
  mainGrapes: string[];
  knownFor: string;
  droneServiceAdvantage: string;
}

export const wineRegions: WineRegion[] = [
  {
    slug: 'dealu-mare',
    name: 'Dealu Mare',
    counties: ['prahova', 'buzau', 'dambovita'],
    vineyardHa: 18000,
    lat: 45.1,
    lng: 26.4,
    description:
      'Cea mai renumită regiune viticolă din Muntenia, celebră pentru vinuri roșii de calitate superioară.',
    mainGrapes: ['Cabernet Sauvignon', 'Merlot', 'Fetească Neagră', 'Pinot Noir'],
    knownFor: 'Vinuri roșii complexe cu potențial de îmbătrânire',
    droneServiceAdvantage:
      'Terenul deluros al regiunii Dealu Mare face tratamentele cu utilaje terestre dificile. Dronele pot trata uniform rândurile de vie pe versanți cu înclinații de până la 45°, reducând costurile cu 40% față de tractorul cu motofasol.',
  },
  {
    slug: 'murfatlar',
    name: 'Murfatlar',
    counties: ['constanta'],
    vineyardHa: 18000,
    lat: 44.17,
    lng: 28.41,
    description:
      'Cea mai mare regiune viticolă din Dobrogea, cu climate unic influențat de Marea Neagră.',
    mainGrapes: ['Chardonnay', 'Merlot', 'Pinot Gris', 'Muscat Ottonel'],
    knownFor: 'Vinuri albe aromatice și Cabernet Sauvignon cu structură elegantă',
    droneServiceAdvantage:
      'Podgoriile Murfatlar au loturi mari și uniform, ideale pentru pulverizare eficientă cu drona. Clima uscată sporadic necesită intervenții precise pentru mana viței, drona asigurând acoperire 100%.',
  },
  {
    slug: 'cotnari',
    name: 'Cotnari',
    counties: ['iasi'],
    vineyardHa: 5000,
    lat: 47.55,
    lng: 27.01,
    description:
      'Una dintre cele mai vechi regiuni viticole din România, cu soiuri autohtone unice.',
    mainGrapes: ['Grasă de Cotnari', 'Fetească Albă', 'Frâncușă', 'Tămâioasă Românească'],
    knownFor: 'Vinul Grasă de Cotnari, vin dulce natural de renume internațional',
    droneServiceAdvantage:
      'Viticultura tradițională din Cotnari beneficiază de precizia dronei pentru tratamente preventive împotriva manei și putregaiului cenușiu, frecvente în climatul mai umed al Moldovei.',
  },
  {
    slug: 'dragasani',
    name: 'Drăgășani',
    counties: ['valcea'],
    vineyardHa: 5500,
    lat: 44.66,
    lng: 24.26,
    description:
      'Regiune viticolă din Oltenia, renumită pentru soiurile autohtone și vinurile albe.',
    mainGrapes: ['Crâmpoșia Selecționată', 'Fetească Regală', 'Tămâioasă Românească', 'Novac'],
    knownFor: 'Crâmpoșia selecționată, soi autohton revigorat, acum apreciat internațional',
    droneServiceAdvantage:
      'Viile de pe dealurile Drăgășanilor sunt dispersate pe suprafețe accidentate. Dronele agricole permit accesul facil și tratamente uniforme indiferent de configurația terenului.',
  },
  {
    slug: 'odobesti-panciu',
    name: 'Odobești-Panciu',
    counties: ['vrancea'],
    vineyardHa: 17000,
    lat: 45.75,
    lng: 27.07,
    description:
      'Una dintre cele mai mari podgorii din Moldova istorică, cu tradiție viticolă de secole.',
    mainGrapes: ['Fetească Albă', 'Fetească Regală', 'Galbenă de Odobești', 'Merlot'],
    knownFor: 'Galbenă de Odobești, soi autohton cu aromă distinctivă, vin ușor și plăcut',
    droneServiceAdvantage:
      'Județul Vrancea are una dintre cele mai mari suprafețe viticole din România. Drona reduce dramatic timpul de intervenție în cazul presiunii bolilor fungice.',
  },
  {
    slug: 'recas-timis',
    name: 'Recaș-Timiș',
    counties: ['timis', 'arad'],
    vineyardHa: 7000,
    lat: 45.77,
    lng: 21.49,
    description:
      'Cea mai importantă regiune viticolă din vestul României, cu podgorii moderne și investiții masive.',
    mainGrapes: ['Cabernet Sauvignon', 'Merlot', 'Pinot Gris', 'Riesling Italian'],
    knownFor: 'Vinuri accesibile cu raport calitate-preț excelent, producție în creștere',
    droneServiceAdvantage:
      'Viile din Banat sunt adesea pe terenuri plane sau ușor deluroase, perfecte pentru operații eficiente cu dronele de mare capacitate (DJI T50, XAG P100) la 15–20 ha/h.',
  },
];

export const wineRegionBySlug: Record<string, WineRegion> = Object.fromEntries(
  wineRegions.map((r) => [r.slug, r])
);

export function getWineRegionBySlug(slug: string): WineRegion | undefined {
  return wineRegionBySlug[slug];
}
