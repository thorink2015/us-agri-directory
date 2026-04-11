export interface FAQ {
  question: string;
  answer: string;
}

export const pricingFAQs: FAQ[] = [
  {
    question: 'Cât costă stropitul cu drona pe hectar?',
    answer:
      'Prețul mediu pentru stropitul cu drona este de 100 RON/ha (~€20/ha) în România pentru culturi de câmp (grâu, porumb, rapiță, floarea soarelui). Pentru vii și livezi prețul ajunge la 120–200 RON/ha datorită dificultății sporite. Fermele mici sub 50 ha plătesc 120–150 RON/ha, fermele medii 100–500 ha plătesc 85–110 RON/ha, iar contractele industriale peste 1.000 ha pot coborî la 65–70 RON/ha. În Moldova prețurile sunt 170–240 MDL/ha.',
  },
  {
    question: 'Câte hectare poate stropi o dronă agricolă într-o zi?',
    answer:
      'DJI Agras T100 (rezervor 100L) poate acoperi până la 300 ha/zi în condiții de operare continuă. DJI Agras T50 (40L) acoperă 150–180 ha/zi pe teren plan. Media practică pentru un operator solo pe culturi de câmp este de 80–120 ha/zi, incluzând timpii de umplere și deplasare. În vii și livezi productivitatea scade la 20–40 ha/zi.',
  },
  {
    question: 'În cât timp se amortizează o dronă agricolă?',
    answer:
      'Pentru o fermă proprie de peste 500 ha care efectuează 3–4 tratamente pe an, investiția se amortizează în 2–3 sezoane agricole. Un operator de servicii care tratează 3.000–5.000 ha/sezon la 100 RON/ha poate recupera investiția într-un singur sezon. Beneficiile indirecte (fără tasare sol, recuperare 5–8% din recoltă pierduți la tractor) accelerează amortizarea.',
  },
  {
    question: 'Este mai eficientă drona decât tractorul cu bara de stropit?',
    answer:
      'Drona are avantaje clare față de tractorul cu bara de stropit: nu tasează solul (tractorul distruge 5–8% din cultură prin călcare), poate intra pe câmp oricând indiferent de umiditate, tratează suprafețe accidentate sau greu accesibile, aplică substanța cu normă ULV (8–20 L/ha față de 200–300 L/ha la tractor), și poate opera pe timp de noapte. Dezavantajul dronei este costul mai ridicat/ha față de tractorul propriu și rezervorul mai mic.',
  },
  {
    question: 'Cât durează bateria la o dronă agricolă?',
    answer:
      'Autonomia de zbor cu rezervorul plin este de 8–12 minute. Procesul este optimizat prin schimbarea bateriei în sub 1 minut și încărcare ultra-rapidă în 9–12 minute (cu generator DJI C12000). Strategia standard este 3 baterii per dronă: una în zbor, una la încărcat, una în răcire. Bateriile DJI inteligente (DB2160) sunt garantate pentru ~1.500 cicluri de încărcare.',
  },
  {
    question: 'Ce factori influențează prețul pulverizării cu drona?',
    answer:
      'Principalii factori sunt: tipul de cultură (câmp vs. vie/livadă), suprafața totală (suprafețele mari beneficiază de tarife mai mici), distanța față de baza operatorului, tipul de substanță aplicată și condițiile de teren (pantă, obstacole). Fermele cu suprafețe de peste 200 ha pot negocia prețuri de 70–80 RON/ha.',
  },
  {
    question: 'Este mai ieftină drona față de avionul agricol?',
    answer:
      'Drona costă ~100 RON/ha față de avionul agricol care costă ~80 RON/ha în medie. Avantajul dronei este precizia ridicată, capacitatea de a trata suprafețe mici și fragmentate, posibilitatea de a lucra dimineața devreme și accesibilitatea în zone cu obstacole. Avionul rămâne competitiv pentru ferme mari și uniforme de peste 5.000 ha.',
  },
  {
    question: 'Se pot stropi pomii fructiferi și vița de vie cu drona agricolă?',
    answer:
      'Da, drona este ideală pentru vii și livezi. DJI Agras T50 are terrain follow mode care adaptează înălțimea de zbor la relieful terasat. Curentul de aer al elicelor (downwash) ajută la penetrarea coronamentului și acoperirea frunzelor pe ambele fețe. Norma de aplicare este 40–90 L/ha pentru vii față de 8–20 L/ha pentru culturile de câmp.',
  },
];

export const legalFAQs: FAQ[] = [
  {
    question: 'Este legală drona agricolă în România?',
    answer:
      'Da, utilizarea dronelor pentru tratamente fitosanitare este legală în România. Legea L494/2025 a clarificat cadrul legal. Operatorii au nevoie de autorizație AACR (pentru zbor SPECIFIC/STS01-STS02) și aviz ANF (Agenția Națională Fitosanitară) pentru aplicarea pesticidelor. Substanțele aplicate trebuie să fie autorizate pentru administrare aeriană.',
  },
  {
    question: 'Ce autorizații trebuie să aibă un operator de drone agricole?',
    answer:
      'Un operator de drone agricole din România trebuie să dețină: (1) certificat de competență pilot AACR categoria A2 sau SPECIFIC, (2) autorizație de operare AACR pentru categoria SPECIFIC/STS01, (3) aviz ANF pentru aplicarea tratamentelor fitosanitare, (4) asigurare de răspundere civilă pentru dronă, (5) drona înregistrată la AACR.',
  },
  {
    question: 'Cât costă obținerea licenței de pilot de dronă agricolă?',
    answer:
      'Costurile pentru certificatul de pilot dronă în 2026: test online A1/A3 gratuit, examen A2 costă 250 RON taxa AACR. Cursul complet STS-01 (recomandat pentru drone agricole >25 kg) variază între 1.500–5.000 RON la centrele autorizate. Înregistrarea ca operator UAS costă 120 RON. Asigurarea RCA pentru dronă este 1.500–4.000 RON/an.',
  },
];

export const generalFAQs: FAQ[] = [
  {
    question: 'Cum găsesc un operator de drone agricole în județul meu?',
    answer:
      'Folosește filtrul de județ din directorul nostru pentru a găsi toți operatorii care acoperă zona ta. Mulți operatori naționali acoperă mai multe județe și se deplasează la fermă. Poți contacta direct operatorul prin formularul de pe profilul său sau prin telefon.',
  },
  {
    question: 'Merită să cumpăr propria dronă agricolă sau mai bine apelez la un prestator de servicii?',
    answer:
      'Pentru ferme sub 200 ha, apelarea la un prestator de servicii (100 RON/ha) este mai economică decât achiziția propriei drone (investiție 50.000–100.000 EUR). Achiziția proprie devine rentabilă dacă ai suprafețe de peste 300–500 ha, aplici minimum 3–4 tratamente/an sau oferi servicii și altor fermieri din zonă. Poți folosi fonduri AFIR pentru 50–65% rambursare.',
  },
  {
    question: 'Cum adaug afacerea mea în director?',
    answer:
      'Listarea în directorul nostru este complet gratuită. Completează formularul de pe pagina „Adaugă Operator" cu datele companiei tale: servicii oferite, județele acoperite, tipul dronelor și prețurile. Echipa noastră va verifica informațiile și va publica profilul în maxim 48 de ore.',
  },
];
