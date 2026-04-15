import { ReactNode } from 'react';
import Link from 'next/link';

const Op = ({ slug, children }: { slug: string; children: ReactNode }) => (
  <Link href={`/operatori/${slug}`} className="text-green-700 hover:underline font-medium">
    {children}
  </Link>
);

const Cnt = ({ slug, children }: { slug: string; children: ReactNode }) => (
  <Link href={`/judete/${slug}`} className="text-green-700 hover:underline font-medium">
    {children}
  </Link>
);

export const blogContent: Record<string, ReactNode> = {
  'top-10-operatori-ro': (
    <div className="space-y-5">
      <p>
        The US agricultural drone market has grown rapidly in the past two years, with hundreds of
        commercial operators now active nationwide. In this article we rank the top 10 verified
        operators by acres treated, fleet size, and geographic coverage in 2026.
      </p>
      <h2>1. <Op slug="hylio-national">Hylio</Op></h2>
      <p>
        The leading American-made, NDAA-compliant ag drone manufacturer and nationwide operator network.
        Based in Houston, Hylio produces the AG-272 and supports federal and defense-adjacent buyers
        requiring US-manufactured equipment.
      </p>
      <h2>2. <Op slug="rantizo">Rantizo</Op></h2>
      <p>
        Iowa-based nationwide ag drone network with one of the largest operator fleets in America.
        Strong coverage across the Corn Belt and Great Plains, with FAA Part 137 operations in
        dozens of states.
      </p>
      <h2>3. <Op slug="agri-spray-drones">Agri Spray Drones</Op></h2>
      <p>
        Missouri-headquartered with a nationwide dealer and applicator network. Offers both
        equipment sales and service applications for corn, soybean, and cotton fungicide programs.
      </p>
      <h2>4. <Op slug="osprey-agri-drone-national">Osprey Agri Drones</Op></h2>
      <p>
        National operator network focused on the Southeast and mid-Atlantic. Multi-drone fleet
        covering Virginia, the Carolinas, Georgia, Kentucky, and Tennessee.
      </p>
      <h2>5. <Op slug="flyingag">FlyingAg</Op></h2>
      <p>
        Nebraska-based operator with deep Corn Belt coverage. Specializes in VT corn fungicide and
        R3 soybean applications.
      </p>
      <h2>6. <Op slug="avary-drone">Avary Drone</Op></h2>
      <p>
        National network and marketplace connecting growers with vetted local operators across
        the Southeast, Midwest, and mid-Atlantic.
      </p>
      <h2>7. <Op slug="texas-ag-drones">Texas Ag Drones</Op></h2>
      <p>
        One of the largest operations in Texas, covering cotton, sorghum, winter wheat, and
        brush control across the Rolling Plains and South Texas.
      </p>
      <h2>8. <Op slug="pegasus-robotics-ag">Pegasus Robotics</Op></h2>
      <p>
        Atlanta-headquartered platform combining advanced ag drone technology with commercial
        application services across the Southeast.
      </p>
      <h2>9. <Op slug="kdb-land-and-air">KDB Land and Air</Op></h2>
      <p>
        Multi-state operator serving Alabama, Georgia, and Florida row-crop and peanut producers
        with full-season fungicide and defoliant programs.
      </p>
      <h2>10. <Op slug="talos-drones-ag">Talos Drones</Op></h2>
      <p>
        High-capacity operator covering the Gulf Coast and Delta, specializing in large-acreage
        rice, cotton, and soybean applications.
      </p>
      <p className="mt-6">
        See the full list of <Link href="/operatori" className="text-green-700 hover:underline font-medium">all verified US operators</Link>.
      </p>
    </div>
  ),

  'top-5-moldova': (
    <div className="space-y-5">
      <p>
        The US agricultural drone industry is organized around distinct regional markets — the
        Corn Belt, Mississippi Delta, Southeast, Great Plains, and Pacific Northwest. Here are
        the leading operators serving each.
      </p>
      <h2>Southeast — <Op slug="osprey-agri-drone-national">Osprey Agri Drones</Op></h2>
      <p>
        Multi-state fleet covering Virginia, the Carolinas, Georgia, Tennessee, and Kentucky.
        Core services: corn VT fungicide, soybean R3, peanut late-season disease programs.
      </p>
      <h2>Corn Belt — <Op slug="rantizo">Rantizo</Op></h2>
      <p>
        Iowa-headquartered with the largest operator network across Illinois, Iowa, Indiana,
        Ohio, and Missouri. Specializes in corn and soybean programs.
      </p>
      <h2>Mississippi Delta — <Op slug="agri-spray-drones-leland">Agri Spray Drones Leland</Op></h2>
      <p>
        Delta-based location of the Agri Spray Drones network serving rice, soybean, and cotton
        producers across the Yazoo-Mississippi Delta.
      </p>
      <h2>Great Plains — <Op slug="texas-ag-drones">Texas Ag Drones</Op></h2>
      <p>
        Largest Texas-based operation, handling cotton defoliation, grain sorghum, winter wheat,
        and rangeland brush control.
      </p>
      <h2>Gulf Coast — <Op slug="talos-drones-ag">Talos Drones</Op></h2>
      <p>
        High-capacity heavy-lift spray drones for large-acreage rice and cotton across Louisiana,
        Mississippi, and Arkansas.
      </p>
      <p className="mt-6">
        Browse <Link href="/operatori" className="text-green-700 hover:underline font-medium">all US operators</Link> by state.
      </p>
    </div>
  ),

  'top-drone-2026': (
    <div className="space-y-5">
      <p>
        În 2026, piața dronelor agricole este dominată de 5 modele principale. În acest articol comparăm
        specificațiile, prețurile și recomandările pentru fiecare.
      </p>
      <h2>1. DJI Agras T50</h2>
      <p>
        Rezervor 40L, 40 ha/oră, preț 15.000–19.000 EUR (fără accesorii). Cea mai vândută dronă agricolă din
        România în 2025–2026. Avantaj: service excelent prin Nik-ro, RIAGRO și BOSAL.
      </p>
      <h2>2. DJI Agras T100</h2>
      <p>
        Rezervor 80L, 70 ha/oră. Pentru ferme mari (peste 500 ha). Preț 28.000–35.000 EUR.
      </p>
      <h2>3. DJI Agras T25P</h2>
      <p>
        Rezervor 20L. Pentru ferme sub 100 ha. Preț 8.000–11.000 EUR, cea mai bună opțiune pentru începători.
      </p>
      <h2>4. XAG P100 Pro</h2>
      <p>Rezervor 50L, AI integrat. Alternativă tehnică serioasă la DJI, cu preț similar.</p>
      <h2>5. ADT Falcon 50P (Appia)</h2>
      <p>Dronă produsă parțial în România, eligibilă AFIR. 50L, 18 ha/h.</p>
      <p className="mt-6">
        Deschide <Link href="/unelte/comparator-drone" className="text-green-700 hover:underline font-medium">comparatorul nostru interactiv</Link> pentru
        o analiză detaliată.
      </p>
    </div>
  ),

  'vita-de-vie-ghid': (
    <div className="space-y-5">
      <p>
        Viticultura este sectorul cu cea mai rapidă adopție a dronelor agricole în România. Din cele 180.000
        hectare de viță de vie, peste 30% sunt tratate anual cu drona în 2026.
      </p>
      <h2>De ce drona pentru viță de vie?</h2>
      <ul>
        <li>Terenurile în pantă sunt dificile pentru utilajele terestre</li>
        <li>Viță de vie necesită 8–12 tratamente/sezon</li>
        <li>Economie de 30–50% de apă și substanțe active</li>
        <li>Acces imediat după ploaie (solul este încă umed pentru tractoare)</li>
      </ul>
      <h2>Preț mediu în România</h2>
      <p>
        Pulverizarea viței de vie cu drona costă 120–200 RON/ha în 2026, în funcție de regiune și operator.
        Vezi <Link href="/preturi-pulverizare-drona" className="text-green-700 hover:underline font-medium">pagina noastră de prețuri</Link>.
      </p>
      <h2>Program de tratamente</h2>
      <ol>
        <li>Martie: cupru + sulf (preventiv)</li>
        <li>Aprilie: primul tratament fungicid</li>
        <li>Mai: 2 tratamente contra manei</li>
        <li>Iunie: 2–3 tratamente contra manei și făinării</li>
        <li>Iulie: 1–2 tratamente preventive finale</li>
      </ol>
      <h2>Operatori recomandați</h2>
      <p>
        <Op slug="hortidrones">Hortidrones</Op>, <Op slug="riagro">RIAGRO</Op>, <Op slug="agronix">Agronix</Op> sunt
        specializați pe viticultură.
      </p>
    </div>
  ),

  'top-judete-viticole': (
    <div className="space-y-5">
      <p>
        România este al 5-lea producător de vin din UE, cu peste 180.000 ha de vie. Iată top 10 județe
        viticole și operatorii de drone cei mai activi în fiecare.
      </p>
      <ol className="space-y-3">
        <li><strong><Cnt slug="vrancea">1. Vrancea</Cnt></strong>: ~24.000 ha vie. Cea mai mare regiune viticolă a României.</li>
        <li><strong><Cnt slug="prahova">2. Prahova</Cnt></strong>: ~10.000 ha, regiunea Dealu Mare.</li>
        <li><strong><Cnt slug="buzau">3. Buzău</Cnt></strong>: ~9.000 ha, cunoscută pentru vinuri roșii.</li>
        <li><strong><Cnt slug="iasi">4. Iași</Cnt></strong>: ~8.000 ha, regiunea Cotnari.</li>
        <li><strong><Cnt slug="galati">5. Galați</Cnt></strong>: ~7.500 ha.</li>
        <li><strong><Cnt slug="tulcea">6. Tulcea</Cnt></strong>: ~7.000 ha, Sarica Niculițel.</li>
        <li><strong><Cnt slug="alba">7. Alba</Cnt></strong>: ~6.500 ha, Târnave.</li>
        <li><strong><Cnt slug="constanta">8. Constanța</Cnt></strong>: ~6.000 ha, Murfatlar.</li>
        <li><strong><Cnt slug="bihor">9. Bihor</Cnt></strong>: ~5.000 ha.</li>
        <li><strong><Cnt slug="vaslui">10. Vaslui</Cnt></strong>: ~4.500 ha.</li>
      </ol>
    </div>
  ),

  'cat-costa-drona': (
    <div className="space-y-5">
      <p>
        Prețurile dronelor agricole au scăzut cu 15–20% față de 2024, iar concurența între DJI și XAG a făcut
        piața mai accesibilă pentru fermierii români. Iată prețurile actualizate pentru 2026.
      </p>
      <h2>DJI Agras: Lider de piață</h2>
      <ul>
        <li>DJI Agras T25P: 8.000–11.000 EUR (fără accesorii)</li>
        <li>DJI Agras T50: 15.000–19.000 EUR</li>
        <li>DJI Agras T100: 28.000–35.000 EUR</li>
      </ul>
      <h2>XAG: Alternativă</h2>
      <ul>
        <li>XAG P100 Pro: 16.000–20.000 EUR</li>
        <li>XAG V40: 9.000–12.000 EUR</li>
      </ul>
      <h2>Cost total real (cu accesorii)</h2>
      <p>
        Prețul dronei este doar începutul. Un pachet complet (dronă + 4 baterii + încărcător rapid + generator +
        suport tehnic primul an) costă 1,5–2x prețul nominal al dronei.
      </p>
      <h2>Finanțare AFIR</h2>
      <p>
        Toate modelele de mai sus sunt eligibile pentru fonduri AFIR cu rambursare 50–65%. Vezi{' '}
        <Link href="/ghid/fonduri-afir-drone" className="text-green-700 hover:underline font-medium">ghidul nostru AFIR</Link>.
      </p>
    </div>
  ),

  'top-regiuni-viticole-moldova': (
    <div className="space-y-5">
      <p>
        Republica Moldova are peste 100.000 ha de viță de vie, iar principalele regiuni viticole sunt tratate
        intens cu drone începând cu 2023.
      </p>
      <h2>1. <Link href="/moldova/stefan-voda" className="text-green-700 hover:underline font-medium">Ștefan Vodă</Link></h2>
      <p>~6.800 ha vie. Zonă de producție pentru vinuri premium (Purcari, Et Cetera).</p>
      <h2>2. <Link href="/moldova/cahul" className="text-green-700 hover:underline font-medium">Cahul</Link></h2>
      <p>~8.500 ha. Regiunea sudică cu cele mai mari suprafețe viticole.</p>
      <h2>3. <Link href="/moldova/gagauzia" className="text-green-700 hover:underline font-medium">UTA Găgăuzia</Link></h2>
      <p>~9.200 ha. Regiune autonomă cu tradiție viticolă de secole.</p>
      <h2>4. <Link href="/moldova/hincesti" className="text-green-700 hover:underline font-medium">Hîncești</Link></h2>
      <p>~8.500 ha. Centru viticol important în regiunea Centru.</p>
      <h2>5. <Link href="/moldova/straseni" className="text-green-700 hover:underline font-medium">Strășeni</Link></h2>
      <p>~6.500 ha. Aproape de Chișinău, cu acces ușor la servicii.</p>
      <p className="mt-6">
        <Op slug="dron-assistance-moldova">DRON Assistance</Op> și <Op slug="bosal-solutions">BOSAL Solutions</Op> sunt principalii operatori.
      </p>
    </div>
  ),

  'tratamente-cereale': (
    <div className="space-y-5">
      <p>
        Cerealele (grâu, porumb, orz) ocupă peste 4 milioane de hectare în România. Drona devine tot mai
        populară pentru tratamentele la cereale, în special pentru ferme sub 500 ha.
      </p>
      <h2>Avantaje dronă vs. tractor pe cereale</h2>
      <ul>
        <li>Acces imediat după ploaie (sol neuscat)</li>
        <li>Tratamente tardive (spicul format, tractorul tasează)</li>
        <li>Economie apă și substanțe (30–40%)</li>
        <li>Preț mai mic per hectar pentru suprafețe peste 50 ha</li>
      </ul>
      <h2>Preț mediu</h2>
      <p>70–130 RON/ha pentru cereale, în funcție de regiune și operator.</p>
      <h2>Operatori recomandați</h2>
      <p>
        Pentru cereale recomandăm operatorii cu capacitate mare: <Op slug="riagro">RIAGRO</Op>,{' '}
        <Op slug="agridrone-romania">Agridrone România</Op>, <Op slug="agro-drona">Agro Drona</Op>.
      </p>
    </div>
  ),

  'top-dobrogea': (
    <div className="space-y-5">
      <p>
        Dobrogea și zona sud-estică a României (Constanța, Tulcea, Brăila, Galați) au sole mari de cereale și
        vii importante la Murfatlar și Sarica Niculițel. Iată top operatori activi în zonă:
      </p>
      <ol>
        <li><Op slug="riagro">RIAGRO</Op>: acoperire națională, prezență puternică în Dobrogea</li>
        <li><Op slug="agro-drona">Agro Drona</Op>: productivitate înaltă, ideal pentru cereale</li>
        <li><Op slug="agridrone-romania">Agridrone România</Op>: Bucureștean cu echipe mobile</li>
        <li><Op slug="landtech">LandTech</Op>: flexibilitate prin închiriere</li>
        <li><Op slug="nik-ro">Nik-ro</Op>: distribuție XAG, servicii pentru viticultori</li>
      </ol>
      <p>
        Vezi toți operatorii din <Cnt slug="constanta">Constanța</Cnt>, <Cnt slug="tulcea">Tulcea</Cnt>,{' '}
        <Cnt slug="braila">Brăila</Cnt> și <Cnt slug="galati">Galați</Cnt>.
      </p>
    </div>
  ),

  'legislatie-2026': (
    <div className="space-y-5">
      <p>
        Anul 2026 aduce câteva schimbări importante în legislația dronelor agricole din România. Iată cele
        mai importante aspecte.
      </p>
      <h2>1. Autorizația STS-01 este acum obligatorie</h2>
      <p>
        Pentru pulverizare comercială cu drone &gt; 25 kg (T50, T100, XAG P100), este necesară autorizația
        STS-01 eliberată de AACR.
      </p>
      <h2>2. Asigurarea RCA obligatorie 1 mil. EUR</h2>
      <p>Pragul a crescut de la 500.000 la 1 milion EUR pentru operații comerciale.</p>
      <h2>3. Înregistrare obligatorie ANCOM</h2>
      <p>
        Toate dronele cu transmisie radio trebuie înregistrate la ANCOM pentru a utiliza frecvențele oficiale.
      </p>
      <h2>4. Taxă operator actualizată</h2>
      <p>Taxa de înregistrare la AACR rămâne 100 RON, dar examenul STS-01 costă acum 500 RON.</p>
      <p className="mt-6">
        Vezi <Link href="/ghid/legislatie-drone-agricole" className="text-green-700 hover:underline font-medium">ghidul nostru complet de legislație</Link>.
      </p>
    </div>
  ),

  'top-transilvania': (
    <div className="space-y-5">
      <p>
        Transilvania este a doua regiune ca adopție a dronelor agricole din România, după Dobrogea. Iată cei
        mai activi operatori:
      </p>
      <ol>
        <li><Op slug="skygrid">SkyGrid</Op> (Cluj): pionier regional, tehnologie inovatoare</li>
        <li><Op slug="appia-drones">Appia Drones</Op> (Târgu Mureș): producător ADT Falcon</li>
        <li><Op slug="riagro">RIAGRO</Op> (Brașov): lider național cu sediu în Transilvania</li>
        <li><Op slug="agronix">Agronix</Op>: cursuri + pulverizare</li>
      </ol>
      <p>
        Județele cu cea mai mare cerere: <Cnt slug="cluj">Cluj</Cnt>, <Cnt slug="mures">Mureș</Cnt>,{' '}
        <Cnt slug="brasov">Brașov</Cnt>, <Cnt slug="sibiu">Sibiu</Cnt>, <Cnt slug="bihor">Bihor</Cnt>.
      </p>
    </div>
  ),

  'afir-cazuri-succes': (
    <div className="space-y-5">
      <p>
        5 fermieri români care au obținut cu succes finanțare AFIR pentru drone agricole în perioada 2024–2025.
        Poveștile lor arată că procesul este accesibil, dar necesită pregătire.
      </p>
      <h2>Cazul 1: Vasile I., fermă cereale 400 ha (Teleorman)</h2>
      <p>
        A obținut 55% rambursare pentru un DJI Agras T50 (total 85.000 EUR, rambursare 46.750 EUR). Proces: 4
        luni de la depunere la semnarea contractului.
      </p>
      <h2>Cazul 2: Ana M., podgorie 50 ha (Vrancea)</h2>
      <p>
        Tânără fermieră, a beneficiat de pachetul DR-30 pentru tineri fermieri: 70.000 EUR forfetar + bonus
        10%, folosiți pentru o DJI Agras T25P și accesorii.
      </p>
      <h2>Cazul 3: Cooperativa AgroFlor (Timiș)</h2>
      <p>
        O cooperativă de 12 fermieri a obținut finanțare pentru 2 drone DJI T50 și 1 DJI T100, total proiect
        280.000 EUR, rambursare 154.000 EUR (55%).
      </p>
      <h2>Cazul 4: Mihai P., livezi 80 ha (Argeș)</h2>
      <p>
        Rambursare 65% pentru T25P + echipamente, total 45.000 EUR, rambursare 29.250 EUR. A folosit drona și
        pentru închiriere către vecini.
      </p>
      <h2>Cazul 5: Ferma de Legume BioVerde (Giurgiu)</h2>
      <p>
        Fermă bio cu 120 ha, a obținut rambursare 60% pentru XAG P100 Pro. Proiectul a inclus și un sistem de
        monitorizare NDVI.
      </p>
      <p className="mt-6">
        Citește <Link href="/ghid/fonduri-afir-drone" className="text-green-700 hover:underline font-medium">ghidul complet pentru fondurile AFIR</Link>{' '}
        pentru a-ți pregăti propriul proiect.
      </p>
    </div>
  ),
};
