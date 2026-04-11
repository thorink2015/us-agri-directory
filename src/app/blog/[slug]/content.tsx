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
        Piața operatorilor de drone agricole din România a explodat în ultimii 2 ani, cu peste 20 de companii
        active la nivel național și zeci de operatori regionali. În acest articol prezentăm top 10 operatori
        verificați, clasați după hectarele tratate cumulat și anvergura flotei.
      </p>
      <h2>1. <Op slug="riagro">RIAGRO (droneagricole.ro)</Op></h2>
      <p>
        Liderul incontestabil al pieței românești. Cu sediul în Brașov și acoperire națională, RIAGRO deține
        un record impresionant: 1.000 de hectare tratate într-o singură noapte. Flotă de peste 20 de drone DJI
        Agras și parteneriat oficial cu producătorul.
      </p>
      <h2>2. <Op slug="agridrone-romania">Agridrone România</Op></h2>
      <p>
        Bucureștean, Agridrone România operează la nivel național cu echipe specializate pentru fiecare mare
        regiune. Oferă pachete integrate: pulverizare, monitorizare NDVI și consultanță.
      </p>
      <h2>3. <Op slug="skygrid">SkyGrid</Op></h2>
      <p>
        Cluj-Napoca. Unul dintre pionierii industriei, SkyGrid s-a făcut cunoscut prin tehnici inovative și
        colaborarea cu cercetători. Specializat pe Transilvania.
      </p>
      <h2>4. <Op slug="appia-drones">Appia Drones</Op></h2>
      <p>
        Din Târgu Mureș, Appia Drones este singurul operator român care produce și drone proprii (ADT Falcon),
        eligibile AFIR.
      </p>
      <h2>5. <Op slug="titan-machinery-drone">Titan Machinery România</Op></h2>
      <p>
        Divizie de drone a uneia dintre cele mai mari companii de utilaje agricole din România. Distribuție
        DJI oficială.
      </p>
      <h2>6. <Op slug="landtech">LandTech</Op></h2>
      <p>Spraying și închiriere drone agricole, o opțiune flexibilă pentru fermieri mici.</p>
      <h2>7. <Op slug="agro-drona">Agro Drona</Op></h2>
      <p>Cunoscut pentru productivitate ridicată: 20 ha/h în condiții optime.</p>
      <h2>8. <Op slug="nik-ro">Nik-ro</Op></h2>
      <p>Principalul distribuitor XAG în România, cu sediu la București.</p>
      <h2>9. <Op slug="agronix">Agronix</Op></h2>
      <p>Combină pulverizarea cu cursurile de formare, excelent pentru începători.</p>
      <h2>10. <Op slug="hortidrones">Hortidrones</Op></h2>
      <p>Specializat pe horticultură, livezi și viticultură.</p>
      <p className="mt-6">
        Vezi lista completă cu <Link href="/operatori" className="text-green-700 hover:underline font-medium">toți operatorii din România</Link>.
      </p>
    </div>
  ),

  'top-5-moldova': (
    <div className="space-y-5">
      <p>
        Republica Moldova are o piață de drone agricole mai mică decât cea a României, dar în creștere rapidă.
        Programele UNDP și EU4Moldova au accelerat adoptarea tehnologiei în ultimii 3 ani.
      </p>
      <h2>1. <Op slug="dron-assistance-moldova">DRON Assistance (DroneAgro.md)</Op></h2>
      <p>
        Lider absolut. 16 drone de pulverizare, 14 piloți certificați, centre regionale în Edineț, Căușeni,
        Bălți, Comrat și Ungheni. Susținut de UNDP Moldova.
      </p>
      <h2>2. <Op slug="bosal-solutions">BOSAL Solutions</Op></h2>
      <p>Distribuitor oficial DJI Moldova. Service complet și cursuri de pilotaj.</p>
      <h2>3. <Op slug="agrodron-md">AgroDron.md</Op></h2>
      <p>Servicii de pulverizare și consultanță pentru ferme moldovenești de dimensiuni medii.</p>
      <h2>4. <Op slug="dronex-md">DroneX Moldova</Op></h2>
      <p>Furnizor multi-sector cu divizie agricolă confirmată.</p>
      <p className="mt-6">
        Vezi toți operatorii din <Link href="/moldova" className="text-green-700 hover:underline font-medium">Republica Moldova</Link>.
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
