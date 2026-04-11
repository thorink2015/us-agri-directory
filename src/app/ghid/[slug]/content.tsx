import { ReactNode } from 'react';

const ExtLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="text-green-700 hover:underline font-medium">
    {children} ↗
  </a>
);

export const guideContent: Record<string, ReactNode> = {
  'cum-sa-devii-operator': (
    <div className="space-y-6">
      <p>
        Piața dronelor agricole din România crește cu peste 40% anual, iar cererea de operatori specializați
        depășește oferta. În acest ghid detaliat vei găsi toți pașii necesari pentru a începe o afacere de
        succes cu drone agricole în 2026.
      </p>

      <h2>1. Înțelege piața și cererea</h2>
      <p>
        România are aproximativ 8,5 milioane de hectare de teren arabil, iar mai puțin de 5% este tratat anual
        cu drone. Fermele cu suprafețe între 50–500 ha sunt principalii clienți, în special pentru viticultură
        (150.000 ha), livezi (200.000 ha) și cereale păioase.
      </p>

      <h2>2. Alegerea formei juridice</h2>
      <ul>
        <li><strong>SRL</strong>: recomandat pentru activitate comercială (răspundere limitată)</li>
        <li><strong>PFA</strong>: viabil pentru operatori individuali cu cifră de afaceri sub 100.000 EUR</li>
        <li><strong>Cooperativă agricolă</strong>: avantaje fiscale și eligibilitate AFIR extinsă</li>
      </ul>
      <p>
        Înregistrarea unei SRL se face online la{' '}
        <ExtLink href="https://portal.onrc.ro">Oficiul Național al Registrului Comerțului (ONRC)</ExtLink>,
        durează 3–5 zile lucrătoare.
      </p>

      <h2>3. Autorizarea AACR</h2>
      <p>
        Orice operator comercial de drone agricole trebuie înregistrat la{' '}
        <ExtLink href="https://www.caa.ro">Autoritatea Aeronautică Civilă Română (AACR)</ExtLink>. Pentru
        dronele mai mari de 25 kg (DJI Agras T50, T100), este necesară autorizația de clasă{' '}
        <em>Specific</em> și pilotul trebuie să dețină certificat de competență avansat (A2 sau STS).
      </p>
      <ul>
        <li>Taxă înregistrare operator: 100 RON</li>
        <li>Curs pilot + examen: 1.500–3.000 RON</li>
        <li>Asigurare RCA obligatorie: 1.500–4.000 RON/an</li>
      </ul>

      <h2>4. Bugetul inițial (2026)</h2>
      <ul>
        <li>Dronă DJI Agras T25P: 45.000–55.000 EUR</li>
        <li>Dronă DJI Agras T50: 75.000–95.000 EUR</li>
        <li>Generator portabil + stație încărcare: 4.000–8.000 EUR</li>
        <li>Echipament protecție + EPP: 1.000 EUR</li>
        <li>Autovehicul transport: 10.000+ EUR</li>
        <li><strong>Total estimativ:</strong> 90.000–150.000 EUR</li>
      </ul>

      <h2>5. Fonduri nerambursabile (AFIR)</h2>
      <p>
        Prin <ExtLink href="https://portal.afir.info">AFIR (submăsura 4.1)</ExtLink>, fermierii eligibili pot
        obține până la 65% rambursare din costul dronei. Consultă și{' '}
        <a href="/ghid/fonduri-afir-drone" className="text-green-700 hover:underline font-medium">ghidul nostru complet pentru AFIR</a>.
      </p>

      <h2>6. Găsirea primilor clienți</h2>
      <p>
        Cele mai eficiente canale de achiziție clienți în 2026:
      </p>
      <ul>
        <li>Listare în directoare de operatori (precum <a href="/adauga-operator" className="text-green-700 hover:underline font-medium">TerraDron.ro</a>: gratuit)</li>
        <li>Grupuri Facebook de fermieri (ex: &quot;Agricultori România&quot;)</li>
        <li>Colaborare cu magazine agro (Agrosem, Agro Rural)</li>
        <li>Parteneriate cu consultanți fitosanitari</li>
      </ul>

      <h2>7. Preț și rentabilitate</h2>
      <p>
        Prețul mediu al serviciului este de 80–150 RON/ha pentru cereale, 120–200 RON/ha pentru viticultură.
        O echipă cu o dronă T50 poate trata 100 ha/zi, ceea ce înseamnă venituri de aproximativ 10.000–15.000
        RON/zi. Costurile operaționale (combustibil, reparații, deprecieri) se ridică la 3.000–5.000 RON/zi.
      </p>

      <h2>Resurse oficiale</h2>
      <ul>
        <li><ExtLink href="https://www.caa.ro">AACR: Autoritatea Aeronautică Civilă Română</ExtLink></li>
        <li><ExtLink href="https://portal.afir.info">AFIR: Agenția pentru Finanțarea Investițiilor Rurale</ExtLink></li>
        <li><ExtLink href="https://www.madr.ro">MADR: Ministerul Agriculturii</ExtLink></li>
        <li><ExtLink href="https://portal.onrc.ro">ONRC: Registrul Comerțului</ExtLink></li>
      </ul>
    </div>
  ),

  'legislatie-drone-agricole': (
    <div className="space-y-6">
      <p>
        Operarea dronelor agricole în România este reglementată de{' '}
        <strong>Regulamentul UE 2019/947</strong> (direct aplicabil) și normele complementare ale{' '}
        <ExtLink href="https://www.caa.ro">AACR</ExtLink>. Acest ghid sintetizează toate obligațiile legale pentru operatori.
      </p>

      <h2>Clasificarea operațiilor</h2>
      <ul>
        <li><strong>Clasa Open</strong>: drone &lt; 25 kg, zboruri până la 120 m, fără autorizație specială</li>
        <li><strong>Clasa Specific</strong>: obligatorie pentru drone &gt; 25 kg sau operații comerciale de pulverizare: necesită autorizație AACR</li>
        <li><strong>Clasa Certified</strong>: aplicabilă dronelor de transport pasageri (nu vizează agricultura)</li>
      </ul>

      <h2>Cerințe pentru operatori comerciali</h2>
      <ol>
        <li>Înregistrare ca operator la AACR (gratuit online)</li>
        <li>Obținerea numărului de operator: trebuie afișat pe dronă</li>
        <li>Pilotul trebuie să dețină certificat de competență A1/A3 sau A2</li>
        <li>Pentru pulverizare comercială: autorizație STS-01 sau autorizație Specific individuală</li>
        <li>Asigurare de răspundere civilă obligatorie (min. 1 mil. EUR)</li>
      </ol>

      <h2>Distanțe și restricții</h2>
      <ul>
        <li>Interzisă operarea peste aglomerări urbane fără autorizație specială</li>
        <li>Distanță minimă 50 m față de persoane neimplicate</li>
        <li>Interzisă în zone de aeroport (CTR) fără permisiunea prealabilă a ATC</li>
        <li>Respectarea zonelor NOTAM și <ExtLink href="https://airspace.caa.ro">hărții AACR</ExtLink></li>
      </ul>

      <h2>Documente obligatorii în timpul operării</h2>
      <ul>
        <li>Certificat de competență pilot</li>
        <li>Autorizație de operator (dacă este cazul)</li>
        <li>Polița de asigurare RCA</li>
        <li>Manual de operare al dronei</li>
        <li>Jurnal de zbor (obligatoriu pentru Specific)</li>
      </ul>

      <h2>Sancțiuni</h2>
      <p>
        Operarea fără autorizație se sancționează cu amenzi de la 1.500 RON la 30.000 RON și posibilă
        confiscare a echipamentului (conform Codului Aerian: Legea 21/2020).
      </p>

      <h2>Resurse oficiale</h2>
      <ul>
        <li><ExtLink href="https://www.caa.ro">AACR: Legislație drone</ExtLink></li>
        <li><ExtLink href="https://www.easa.europa.eu/en/domains/civil-drones">EASA: Reglementări drone UE</ExtLink></li>
        <li><ExtLink href="https://legislatie.just.ro">legislatie.just.ro: Codul Aerian</ExtLink></li>
      </ul>
    </div>
  ),

  'fonduri-afir-drone': (
    <div className="space-y-6">
      <p>
        <ExtLink href="https://portal.afir.info">AFIR</ExtLink> (Agenția pentru Finanțarea Investițiilor Rurale)
        oferă finanțare nerambursabilă pentru achiziția de drone agricole prin mai multe submăsuri ale PNDR și
        PNS 2023–2027. În acest ghid găsești tot ce trebuie să știi pentru a obține fonduri europene pentru o
        dronă în 2026.
      </p>

      <h2>Intervențiile PNS 2023–2027 aplicabile dronelor</h2>
      <ul>
        <li><strong>DR-12 (Modernizarea exploatațiilor agricole)</strong>: până la 80% finanțare nerambursabilă pentru tineri fermieri (sub 41 ani), buget max. 200.000 EUR. Ideal pentru prima dronă agricolă.</li>
        <li><strong>DR-14 (Investiții în exploatații mici)</strong>: pentru ferme cu 4.000–12.000 SO. Finanțare 80%, buget forfetar 75.000 EUR. Potrivit pentru DJI Agras T25P.</li>
        <li><strong>DR-16 (Investiții în sectorul legumicol)</strong>: finanțare 65–80% pentru producători de legume și cartofi care achiziționează drone pentru monitorizare și tratamente.</li>
        <li><strong>DR-29 (Investiții în exploatații agricole)</strong>: intensitate ajutor 50–65%, buget max. 300.000 EUR. Cel mai accesibil pentru ferme medii și mari.</li>
        <li><strong>DR-30 (Tineri fermieri)</strong>: pachet forfetar 60.000–70.000 EUR + bonus 10% pentru fermierii sub 41 de ani care se instalează pentru prima dată.</li>
        <li><strong>Submăsura 4.1 (PNDR)</strong>: pentru cereri depuse anterior 2023, cu dosare în evaluare sau rambursare.</li>
      </ul>

      <h2>Condiții de eligibilitate</h2>
      <ul>
        <li>Solicitant: fermă cu minim 8.000 SO (standard output) — pentru DR-29, DR-12</li>
        <li>DR-14: ferme între 4.000–12.000 SO</li>
        <li>Înregistrat la APIA și ONRC</li>
        <li>Ferma activă de minim 12 luni</li>
        <li>Fără datorii la bugetul de stat</li>
        <li>Drona trebuie să fie nouă, certificată CE, cu factura de la dealer autorizat</li>
      </ul>

      <h2>Pașii procesului</h2>
      <ol>
        <li>Verificare eligibilitate la <ExtLink href="https://portal.afir.info">portalul AFIR</ExtLink></li>
        <li>Elaborare plan de afaceri + buget (consultanță recomandată: 3–5% din valoarea proiectului)</li>
        <li>Depunere cerere online pe portalul AFIR (în sesiunile anuale)</li>
        <li>Evaluare tehnică și financiară (60–90 zile)</li>
        <li>Contractare și începerea investiției</li>
        <li>Depunere cereri de plată (rambursare pe tranșe)</li>
      </ol>

      <h2>Ce drone sunt eligibile?</h2>
      <p>
        Toate dronele marcate CE și certificate pentru uz agricol sunt eligibile. Cele mai populare modele
        AFIR-eligible în 2026:
      </p>
      <ul>
        <li><a href="/drone/dji-agras-t25p" className="text-green-700 hover:underline font-medium">DJI Agras T25P</a>: 50.000 EUR</li>
        <li><a href="/drone/dji-agras-t50" className="text-green-700 hover:underline font-medium">DJI Agras T50</a>: 85.000 EUR</li>
        <li><a href="/drone/dji-agras-t100" className="text-green-700 hover:underline font-medium">DJI Agras T100</a>: 115.000 EUR</li>
      </ul>

      <h2>Sfaturi pentru aprobarea proiectului</h2>
      <ul>
        <li>Lucrează cu un consultant AFIR acreditat</li>
        <li>Include cursul de pilot în bugetul proiectului</li>
        <li>Justifică nevoia prin analize tehnico-economice</li>
        <li>Include și echipamente conexe (stații încărcare, baterii de rezervă)</li>
      </ul>

      <h2>Resurse oficiale</h2>
      <ul>
        <li><ExtLink href="https://portal.afir.info">Portalul AFIR</ExtLink></li>
        <li><ExtLink href="https://www.madr.ro/pndr-2014-2020.html">MADR: Program Național de Dezvoltare Rurală</ExtLink></li>
        <li><ExtLink href="https://www.apia.org.ro">APIA: Agenția de Plăți și Intervenție</ExtLink></li>
      </ul>
    </div>
  ),

  'licenta-pilot-drona': (
    <div className="space-y-6">
      <p>
        Pentru a opera o dronă agricolă în scop comercial în România, pilotul trebuie să dețină un certificat
        de competență eliberat de AACR. Acest ghid detaliază cursurile, examenul și costurile aferente.
      </p>

      <h2>Tipuri de certificate</h2>
      <ul>
        <li><strong>A1/A3 (Open)</strong>: test online gratuit pe <ExtLink href="https://dronetest.caa.ro">dronetest.caa.ro</ExtLink></li>
        <li><strong>A2 (Open)</strong>: curs teoretic + examen + autoverificare (250 RON taxa examen)</li>
        <li><strong>STS-01 / Specific</strong>: curs complet + examen practic la un centru autorizat</li>
      </ul>

      <h2>Pași pentru certificat STS-01 (recomandat pentru agricultură)</h2>
      <ol>
        <li>Înscriere la un <a href="/operatori?service=training" className="text-green-700 hover:underline font-medium">centru autorizat AACR</a></li>
        <li>Parcurgere curs teoretic (25–40 ore): legislație, meteorologie, operațiuni</li>
        <li>Curs practic pe drona agricolă (8–16 ore): pe teren</li>
        <li>Examen teoretic (60 întrebări, min. 75% corect)</li>
        <li>Examen practic (demonstrație de zbor și proceduri de siguranță)</li>
        <li>Obținere certificat AACR (valid 5 ani)</li>
      </ol>

      <h2>Costuri estimate (2026)</h2>
      <ul>
        <li>Curs teoretic A2: 500–1.200 RON</li>
        <li>Curs STS-01 complet: 2.000–4.500 RON</li>
        <li>Curs DJI Agras avansat: 1.500–3.000 RON</li>
        <li>Taxă examen AACR: 250 RON</li>
        <li>Re-certificare la 5 ani: 500–1.000 RON</li>
      </ul>

      <h2>Centre de formare recomandate</h2>
      <p>
        Vezi lista noastră cu <a href="/operatori?service=training" className="text-green-700 hover:underline font-medium">operatori care oferă cursuri</a>,
        inclusiv Agronix, BOSAL Solutions, La Înălțime Academy.
      </p>

      <h2>Resurse oficiale</h2>
      <ul>
        <li><ExtLink href="https://www.caa.ro">AACR: Certificare piloți drone</ExtLink></li>
        <li><ExtLink href="https://dronetest.caa.ro">DroneTest: Examen online A1/A3</ExtLink></li>
      </ul>
    </div>
  ),

  'alegerea-dronei-agricole': (
    <div className="space-y-6">
      <p>
        Alegerea dronei agricole depinde de suprafața fermei, tipul de cultură, bugetul disponibil și
        disponibilitatea service-ului local. În 2026, piața este dominată de DJI Agras (90% cotă), urmată de
        XAG (6%) și ADT Falcon (3%).
      </p>

      <h2>DJI Agras: Opțiunea populară</h2>
      <ul>
        <li><strong>T25P</strong>: 20L, 17 ha/oră, 45–55.000 EUR. Pentru ferme mici și medii.</li>
        <li><strong>T50</strong>: 40L, 40 ha/oră, 75–95.000 EUR. Cea mai vândută dronă în România.</li>
        <li><strong>T100</strong>: 75L, 70 ha/oră, 110–130.000 EUR. Pentru ferme mari (&gt; 500 ha).</li>
      </ul>
      <p>
        Avantaje DJI: service excelent în România (Nik-ro, BOSAL, RIAGRO), rețea de piese de schimb, software
        matur. Dezavantaje: preț mai mare decât XAG.
      </p>

      <h2>XAG: Alternativa tehnică</h2>
      <ul>
        <li><strong>P100 Pro</strong>: 50L, 32 ha/oră, 70–85.000 EUR. Tehnologie avansată.</li>
        <li><strong>V40</strong>: 16L, 16 ha/oră, 40–50.000 EUR. Pentru începători.</li>
      </ul>
      <p>
        Avantaje XAG: AI integrat, planificare automată, preț mai bun. Dezavantaje: service mai slab în
        România, piese de schimb greu de găsit.
      </p>

      <h2>ADT Falcon: Opțiunea robustă</h2>
      <p>
        Producător chinez mai puțin cunoscut, dar cu drone robuste și prețuri competitive (40–70.000 EUR).
        Reprezentat în România de LandTech și câțiva dealeri regionali.
      </p>

      <h2>Matrice decizională</h2>
      <table className="w-full text-sm border border-gray-200 rounded">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left">Suprafață</th>
            <th className="p-2 text-left">Dronă recomandată</th>
            <th className="p-2 text-left">Investiție</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t"><td className="p-2">&lt; 100 ha</td><td className="p-2">DJI T25P / XAG V40</td><td className="p-2">45–55K EUR</td></tr>
          <tr className="border-t"><td className="p-2">100–500 ha</td><td className="p-2">DJI T50</td><td className="p-2">75–95K EUR</td></tr>
          <tr className="border-t"><td className="p-2">500–2000 ha</td><td className="p-2">DJI T50 (2 buc) sau T100</td><td className="p-2">150–200K EUR</td></tr>
          <tr className="border-t"><td className="p-2">&gt; 2000 ha</td><td className="p-2">Flotă DJI T100</td><td className="p-2">300K+ EUR</td></tr>
        </tbody>
      </table>

      <h2>Recomandare finală</h2>
      <p>
        Pentru majoritatea fermelor din România, DJI Agras T50 este alegerea optimă: rețea de service extinsă,
        capacitate suficientă, eligibilă AFIR. Cumpără de la dealeri autorizați precum{' '}
        <a href="/operatori/nik-ro" className="text-green-700 hover:underline font-medium">Nik-ro</a> sau{' '}
        <a href="/operatori/riagro" className="text-green-700 hover:underline font-medium">RIAGRO</a>.
      </p>
    </div>
  ),

  'subventii-moldova-aipa': (
    <div className="space-y-6">
      <p>
        Agenția de Intervenție și Plăți pentru Agricultură (<ExtLink href="https://aipa.gov.md">AIPA</ExtLink>)
        oferă subvenții pentru achiziția de drone agricole în Republica Moldova prin Fondul Național de
        Dezvoltare a Agriculturii și Mediului Rural (FNDAMR).
      </p>

      <h2>Programul principal: Anexa 3</h2>
      <p>
        Fermierii moldoveni pot beneficia de o subvenție de <strong>50% din costul dronei agricole</strong>,
        plafonată la 200.000 MDL (~10.000 EUR) per beneficiar. Programul este finanțat parțial de UE prin
        <ExtLink href="https://www.eu4moldova.md">EU4Moldova</ExtLink>.
      </p>

      <h2>Eligibilitate</h2>
      <ul>
        <li>Gospodărie țărănească sau SRL agricol înregistrat în Moldova</li>
        <li>Cifra de afaceri &lt; 5 mil. MDL</li>
        <li>Activitate agricolă de minim 12 luni</li>
        <li>Fără datorii la buget</li>
      </ul>

      <h2>Documente necesare</h2>
      <ol>
        <li>Cerere la biroul regional AIPA</li>
        <li>Plan de afaceri simplificat</li>
        <li>Ofertă de la un dealer autorizat</li>
        <li>Copie CUI / extras ONRC (Moldova)</li>
        <li>Certificat ANSA pentru tratamente fitosanitare</li>
      </ol>

      <h2>Dealeri autorizați în Moldova</h2>
      <ul>
        <li><a href="/operatori/bosal-solutions" className="text-green-700 hover:underline font-medium">BOSAL Solutions</a>: dealer oficial DJI</li>
        <li><a href="/operatori/dron-assistance-moldova" className="text-green-700 hover:underline font-medium">DRON Assistance</a>: vânzări + servicii integrate</li>
      </ul>

      <h2>Sfaturi</h2>
      <ul>
        <li>Depune cererea în primele luni ale anului (bugetul se epuizează rapid)</li>
        <li>Folosește consultanți AIPA acreditați</li>
        <li>Asigură-te că drona are certificat ANSA pentru aplicarea pesticidelor</li>
      </ul>

      <h2>Resurse oficiale</h2>
      <ul>
        <li><ExtLink href="https://aipa.gov.md">AIPA: Subvenții agricole Moldova</ExtLink></li>
        <li><ExtLink href="https://www.eu4moldova.md">EU4Moldova: Programul UE</ExtLink></li>
        <li><ExtLink href="https://maia.gov.md">Ministerul Agriculturii și Industriei Alimentare</ExtLink></li>
      </ul>
    </div>
  ),

  'legislatie-ansa-moldova': (
    <div className="space-y-6">
      <p>
        Operarea dronelor agricole în Republica Moldova este reglementată de <strong>ANSA</strong> (Agenția Națională
        pentru Siguranța Alimentelor) și de Autoritatea Aeronautică Civilă a Moldovei (AAC). Spre deosebire de
        România (care aplică regulamentul EASA), Moldova are propriul cadru legislativ adaptat.
      </p>

      <h2>Cadrul legal de bază</h2>
      <ul>
        <li><strong>Hotărârea Guvernului nr. 647/2020</strong>: regulamentul general pentru UAS în Moldova</li>
        <li><strong>ANSA</strong>: autorizează aplicarea produselor fitosanitare cu drona</li>
        <li><strong>AAC Moldova</strong>: înregistrarea și licențierea operatorilor de zbor comercial</li>
      </ul>

      <h2>Autorizarea ANSA pentru tratamente fitosanitare</h2>
      <p>
        Orice operator care dorește să aplice pesticide, fungicide sau fertilizatori cu drona în Moldova
        trebuie să obțină autorizare de la ANSA. Documentele necesare:
      </p>
      <ul>
        <li>Cerere tip ANSA</li>
        <li>Certificat de înregistrare a dronei la AAC</li>
        <li>Licență pilot (sau certificat de competență)</li>
        <li>Contractul cu producătorul/importatorul de drone</li>
        <li>Lista produselor fitosanitare autorizate în Moldova</li>
      </ul>

      <h2>Înregistrarea dronei la AAC Moldova</h2>
      <p>Toate aparatele de zbor cu greutatea peste 250 g trebuie înregistrate. Taxele sunt simbolice (200–500 MDL).</p>

      <h2>Zone restricționate</h2>
      <ul>
        <li>5 km în jurul aeroporturilor (Chișinău, Bălți, Cahul)</li>
        <li>Zonele de frontieră (fâșia de 5 km)</li>
        <li>Zonele Transnistria</li>
      </ul>

      <h2>Diferențe față de România (AACR/EASA)</h2>
      <ul>
        <li>Moldova nu aplică regulamentul european EASA: are cadru propriu</li>
        <li>Nu există clasele Open/Specific/Certified ca în UE</li>
        <li>Autorizarea ANSA pentru pesticide este obligatorie (în RO este MADR)</li>
        <li>Produsele fitosanitare trebuie să fie pe lista ANSA, nu EFSA</li>
      </ul>

      <h2>Resurse oficiale</h2>
      <ul>
        <li><ExtLink href="https://ansa.gov.md">ANSA: Agenția Națională pentru Siguranța Alimentelor</ExtLink></li>
        <li><ExtLink href="https://www.caa.md">AAC Moldova: Autoritatea Aeronautică Civilă</ExtLink></li>
        <li><ExtLink href="https://maia.gov.md">Ministerul Agriculturii Moldova</ExtLink></li>
      </ul>
    </div>
  ),

  'cum-sa-devii-operator-moldova': (
    <div className="space-y-6">
      <p>
        Piața de drone agricole din Republica Moldova este la început, dar crește rapid. Fermele mari de viticultură
        (100.000+ ha) și câmpurile de cereale din nordul și centrul țării reprezintă o oportunitate reală. În 2026,
        mai puțin de 5% din suprafața agricolă este tratată cu drone: restul este piața ta.
      </p>

      <h2>1. Înțelege piața moldovenească</h2>
      <ul>
        <li>1,8 milioane ha teren agricol (câmpuri de cereale, viță de vie, livezi)</li>
        <li>100.000+ ha de viticultură: principala piață pentru drone</li>
        <li>Prețuri: 170–240 MDL/ha (€8.50–12/ha)</li>
        <li>Principali clienți: exploatații mari 200–2000 ha, vinării, asociații agricole</li>
      </ul>

      <h2>2. Forma juridică</h2>
      <ul>
        <li><strong>SRL</strong>: forma recomandată, capital minim 5.400 MDL</li>
        <li><strong>Î.I.</strong> (Întreprindere Individuală): pentru operatori singuri, mai simplu fiscal</li>
        <li>Înregistrare la <ExtLink href="https://egov.md">ASP (Agenția Servicii Publice)</ExtLink>, online sau la ghișeu</li>
      </ul>

      <h2>3. Autorizările necesare</h2>
      <ul>
        <li>Înregistrare dronă la <strong>AAC Moldova</strong></li>
        <li>Autorizare <strong>ANSA</strong> pentru aplicarea produselor fitosanitare</li>
        <li>Curs pilot (cursuri disponibile în Chișinău și Cluj pentru cetățenii moldoveni)</li>
      </ul>

      <h2>4. Finanțarea: subvenție AIPA 50%</h2>
      <p>
        Cel mai important avantaj față de alte piețe: AIPA subvenționează 50% din prețul dronei, cu plafon
        200.000 MDL (~€10.000). O dronă DJI T25P costă ~€45.000 → plătești €22.500, AIPA returnează €10.000.
      </p>
      <ul>
        <li>Depune cerere la AIPA înainte de achiziție</li>
        <li>Drona trebuie să fie pe lista echipamentelor eligibile</li>
        <li>Plata se face după achiziție și prezentarea facturilor</li>
      </ul>

      <h2>5. Primii clienți</h2>
      <ul>
        <li>Contactează direct vinăriile mari (Purcari, Cricova, Mileștii Mici, Château Vartely)</li>
        <li>Asociațiile agricole din nordul Moldovei (Bălți, Edineț, Soroca)</li>
        <li>Postează pe platformele agricole locale și grupurile Facebook de fermieri</li>
        <li>Colaborează cu DRON Assistance pentru subcontractare la început</li>
      </ul>

      <h2>6. Concurența</h2>
      <p>
        Principalii operatori activi: DRON Assistance (lider național), BOSAL Solutions, AgroDron.md.
        Piața are loc pentru mulți operatori noi, în special în zonele rurale și raioanele de sud.
      </p>

      <h2>Resurse oficiale Moldova</h2>
      <ul>
        <li><ExtLink href="https://aipa.gov.md">AIPA: Subvenții pentru echipamente</ExtLink></li>
        <li><ExtLink href="https://ansa.gov.md">ANSA: Autorizare fitosanitară</ExtLink></li>
        <li><ExtLink href="https://asp.gov.md">ASP: Înregistrare firmă</ExtLink></li>
        <li><ExtLink href="https://maia.gov.md">Ministerul Agriculturii Moldova</ExtLink></li>
      </ul>
    </div>
  ),

  'roi-drona-agricola': (
    <div className="space-y-6">
      <p>
        Cea mai frecventă întrebare pe care o pun fermierii este: <strong>merită să cumpăr propria dronă sau
        mai bine apelez la un prestator de servicii?</strong> Răspunsul depinde de suprafața ta, numărul de
        tratamente pe an și disponibilitatea operatorilor din zonă.
      </p>

      <h2>Scenariul 1: Fermă de 200 ha, 3 tratamente/an</h2>
      <ul>
        <li><strong>Cost serviciu extern:</strong> 200 ha × 3 tratamente × 100 RON/ha = <strong>60.000 RON/an</strong></li>
        <li><strong>Investiție DJI Agras T25P:</strong> ~200.000 RON (50.000 EUR)</li>
        <li><strong>Costuri operare anuale:</strong> ~15.000 RON (baterii, mentenanță, asigurare)</li>
        <li><strong>Economie anuală netă:</strong> ~45.000 RON</li>
        <li><strong>Amortizare estimată: 4–5 sezoane</strong></li>
        <li><strong>Beneficiu adăugat:</strong> fără tasare sol (recuperezi 5–8% din recoltă)</li>
      </ul>
      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
        Concluzie: la 200 ha, drona proprie devine rentabilă dacă tratezi și suprafețele altor fermieri
        din zonă. Poți acoperi 1.000 ha/sezon cu T25P, generând 100.000 RON venituri suplimentare.
      </p>

      <h2>Scenariul 2: Fermă de 500 ha, 3–4 tratamente/an</h2>
      <ul>
        <li><strong>Cost serviciu extern:</strong> 500 ha × 4 × 100 RON/ha = <strong>200.000 RON/an</strong></li>
        <li><strong>Investiție DJI Agras T50 (pachet complet):</strong> ~350.000 RON (85.000 EUR)</li>
        <li><strong>Costuri operare anuale:</strong> ~30.000 RON</li>
        <li><strong>Economie anuală netă:</strong> ~170.000 RON</li>
        <li><strong>Amortizare estimată: 2 sezoane</strong></li>
        <li><strong>Fond AFIR DR-29 (50%):</strong> reducere investiție la ~175.000 RON</li>
      </ul>

      <h2>Scenariul 3: Operator de servicii profesionist</h2>
      <ul>
        <li><strong>Suprafața tratată/sezon:</strong> 3.000 ha (100 ha/zi × 30 zile lucrătoare)</li>
        <li><strong>Venituri brute:</strong> 3.000 ha × 100 RON/ha = <strong>300.000 RON/sezon</strong></li>
        <li><strong>Costuri totale (operare + depreciere):</strong> ~80.000 RON/sezon</li>
        <li><strong>Profit net estimat:</strong> ~220.000 RON/sezon</li>
        <li><strong>Amortizare DJI T50: 1–2 sezoane</strong></li>
      </ul>

      <h2>Beneficii necontabilizate ale dronei proprii</h2>
      <ul>
        <li><strong>Eliminarea tasării solului:</strong> tractorul cu bara de stropit distruge 5–8% din cultură prin călcare. La 500 ha grâu cu recoltă medie de 5 t/ha × 600 RON/t, pierderile sunt 7.500–12.000 RON/sezon.</li>
        <li><strong>Normă ULV:</strong> drona folosește 8–20 L/ha față de 200–300 L/ha la tractor, economie de apă și timp de umplere.</li>
        <li><strong>Flexibilitate maximă:</strong> drona poate trata oricând (noapte, după ploaie, câmpuri izolate) fără dependența de disponibilitatea unui operator extern.</li>
        <li><strong>Date NDVI:</strong> cu o cameră multispectrală atașată, poți monitoriza sănătatea culturilor și aplica tratamente diferențiate (VRA).</li>
      </ul>

      <h2>Când NU merită drona proprie</h2>
      <ul>
        <li>Suprafața sub 150 ha cu un singur tip de cultură</li>
        <li>Nu ai personal instruit sau nu vrei să investești în cursuri pilot AACR</li>
        <li>Există operatori de servicii calificați disponibili rapid în zona ta</li>
        <li>Nu ești eligibil pentru fonduri AFIR și nu ai capital pentru investiție</li>
      </ul>

      <h2>Fonduri AFIR disponibile pentru achiziție dronă</h2>
      <p>
        Prin intervențiile PNS 2023–2027, poți obține 50–80% rambursare din costul dronei. Citește{' '}
        <a href="/ghid/fonduri-afir-drone" className="text-green-700 hover:underline font-medium">ghidul complet AFIR pentru drone agricole</a>{' '}
        și consultă{' '}
        <a href="/operatori?service=consultancy" className="text-green-700 hover:underline font-medium">un consultant AFIR din directorul nostru</a>.
      </p>

      <h2>Resurse utile</h2>
      <ul>
        <li><a href="/drone" className="text-green-700 hover:underline font-medium">Comparator drone agricole: DJI, XAG, ADT</a></li>
        <li><a href="/preturi-pulverizare-drona" className="text-green-700 hover:underline font-medium">Prețuri pulverizare cu drona în România 2026</a></li>
        <li><a href="/ghid/fonduri-afir-drone" className="text-green-700 hover:underline font-medium">Ghid fonduri AFIR pentru drone</a></li>
      </ul>
    </div>
  ),
};
