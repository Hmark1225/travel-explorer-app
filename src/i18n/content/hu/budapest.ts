import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Budapest",
  region: "Közép-Magyarország, Közép-Európa",
  tagline: "Két oldal. Végtelen felfedezés.",
  description:
    "Kelj át a Dunán a nagyszabású sugárutak és a lombos várnegyedi utcák között. Pihenj termálfürdőkben, fedezz fel környékbeli kávézókat, és nézd meg, hogyan ragyog fel a folyópart napnyugta után.",
  coordinateLabel:
    "Budapest korábbi áttekintő úti célpontja; a földrajzi forrás ellenőrzésre vár",
  attractions: {
    bastion: {
      name: "Halászbástya",
      shortDescription:
        "Fedezd fel a Várhegy teraszait és a folyóra nyíló kilátást.",
      detailedDescription:
        "A Halászbástya árkádjai és lépcsői nem csupán egyetlen fotóhelyet adnak, hanem keretbe foglalják a várost. Járd be a hozzáférhető részeket, és nézz át a Dunán, hogy megértsd Buda és Pest kapcsolatát. Az egyes teraszokra eltérő belépési szabályok vonatkozhatnak.",
      usefulTips: [
        "Ellenőrizd a teraszok aktuális hozzáférési és jegyszabályait.",
        "Számolj lépcsőkkel és emelkedőkkel; az akadálymentes útvonalról helyben érdeklődj.",
      ],
    },
    szechenyi: {
      name: "Széchenyi Gyógyfürdő",
      shortDescription:
        "Szánj időt Budapest fürdőkultúrájára egy nagyszabású fürdőegyüttesben.",
      detailedDescription:
        "A fürdőlátogatás a jó tempóról szól: érkezz meg, tájékozódj, majd alakíts ki kényelmes ritmust a fürdés és pihenés között. Olvasd el az egyes medencék szabályait, ne feltételezz mindenhol azonos feltételeket. A létesítményeket, korhatárokat és elérhető medencéket az üzemeltetőnél ellenőrizd.",
      usefulTips: [
        "Vigyél megfelelő fürdőruhát, és ellenőrizd a lábbelire, törölközőre és szekrényre vonatkozó szabályokat.",
        "Foglalás előtt nézd meg az egészségügyi tanácsokat, korhatárokat és az aktuálisan használható medencéket.",
      ],
    },
    "hungarian-parliament": {
      name: "Országház",
      shortDescription:
        "Figyeld meg a Duna-part meghatározó épületét, és tájékozódj a hivatalos belső látogatásról.",
      detailedDescription:
        "A hosszú homlokzatot a folyópart felől és a közeli utcákból is érdemes nézni. A belső látogatás külön, szabályozott program, ezért a ténylegesen kínált nyelv és belépési feltételek alapján válassz hivatalos vezetést. A külső séta nem jelent belépést a működő épületbe.",
      usefulTips: [
        "Csak a hivatalos látogatási tájékoztató ellenőrzése után foglalj.",
        "Ellenőrizd az azonosítási, biztonsági és lemondási feltételeket.",
      ],
    },
    "buda-castle-walk": {
      name: "Séta a budai Várnegyedben",
      shortDescription:
        "Fedezd fel a hegytető városrészét udvarokon, utcákon és kilátópontokon át.",
      detailedDescription:
        "A Várnegyedre városrész méretű programként gondolj, ne egyetlen jegyes palotaként. Válassz kényelmes útvonalat, pihenj a kilátópontoknál, és csak akkor térj be múzeumba, ha belefér az idődbe. Munkálatok és változó hozzáférés befolyásolhatják az udvarok és utak kapcsolatait.",
      usefulTips: [
        "Ellenőrizd a helyi hozzáférési tájékoztatókat, és számolj emelkedőkkel.",
        "A negyeden belüli múzeumoknak és közlekedési lehetőségeknek külön díjaik lehetnek.",
      ],
    },
    "st-stephens-basilica": {
      name: "Szent István-bazilika",
      shortDescription:
        "Látogass meg egy jelentős vallási épületet, figyelemmel az elkülönülő látogatói részekre.",
      detailedDescription:
        "A bazilika más léptékű Budapestet mutat a tágas folyóparti nézetek után. A belső térben csendesen, figyelmesen nézelődj, majd fedezd fel a környező teret. A torony és más látogatói részek külön működhetnek; a bejárathoz jutás nem jelent hozzáférést az épület minden részéhez.",
      usefulTips: [
        "Ellenőrizd a szertartások időpontjait és a látogatói jegyek feltételeit.",
        "Öltözz tiszteletteljesen, és a kilátóhoz vezető lift vagy lépcső használatáról előre tájékozódj.",
      ],
    },
    "budapest-fine-arts": {
      name: "Szépművészeti Múzeum",
      shortDescription:
        "Válassz elmélyült útvonalat egy jelentős művészeti gyűjteményben, a Hősök tere mellett.",
      detailedDescription:
        "Érkezés előtt válassz korszakot, témát vagy kiállítást, hogy áttekinthető maradjon a látogatás. Néhány műnél időzz hosszabban az összes terem bejárása helyett. A múzeumot közeli sétával is összekötheted, de az időszaki tárlatok és az állandó gyűjtemény jegye eltérhet.",
      usefulTips: [
        "Ellenőrizd a múzeumnál az aktuális termeket és a kiállítások jegyfeltételeit.",
        "Nézd meg a ruhatári és fényképezési szabályokat.",
      ],
    },
    "margaret-island": {
      name: "Séta a Margitszigeten",
      shortDescription:
        "Keress zöld tereket és nyugodtabb sétaritmust a két folyópart között.",
      detailedDescription:
        "A sziget lehetőséget ad arra, hogy a városi napot ráérős szabadtéri szünettel bővítsd. Az energiádhoz illő sétát válassz, és a táj kedvéért állj meg, ne egy adott attrakció működésére alapozz. Ez parki program, nem ajánlás a Dunában fürdésre.",
      usefulTips: [
        "Hagyd szabadon a kerékpáros és gyalogos útvonalakat.",
        "Látogatás előtt ellenőrizd a közlekedési kapcsolatokat és az idényjellegű létesítmények működését.",
      ],
    },
    "city-park": {
      name: "Városliget és Vajdahunyad vára kívülről",
      shortDescription:
        "Kösd össze a parki sétát különböző építészeti stílusok játékos együttesével.",
      detailedDescription:
        "A program a nyílt park és a vár változatos külső formái közötti különbségről szól. Nézd az épületeket több irányból, és hagyj időt a sétára a következő időpontra rohanás helyett. A környék múzeumai, csónakázása és más szolgáltatásai külön programok.",
      usefulTips: [
        "Helyben ellenőrizd az aktuális munkálatokat és útlezárásokat.",
        "A múzeumok és idényjellegű programok feltételeit közvetlenül ellenőrizd; elérhetőségük nem garantált.",
      ],
    },
    "budapest-zoo": {
      name: "Fővárosi Állat- és Növénykert",
      shortDescription:
        "Tervezz családi napot állatmegfigyeléssel és kerti terekkel.",
      detailedDescription:
        "Hagyd, hogy a gyerekek lassabb tempót diktáljanak, és válasszatok néhány alaposabban megismert területet. A történelmi állatkerti építészet és a növényzet az állatok élőhelyei mellett is az élmény része lehet. Az aktuális bemutatók és napi programok az intézménytől függnek; annak térképét és útmutatását kövesd.",
      usefulTips: [
        "Ellenőrizd az aktuális jegyeket, belépési időpontokat és akadálymentességet.",
        "Tartsd tiszteletben a korlátokat, és csak kifejezett engedéllyel etess állatot.",
      ],
    },
    "great-market-hall": {
      name: "Gasztronómiai nézelődés a Nagyvásárcsarnokban",
      shortDescription:
        "Programötlet: fedezz fel egy működő piacot, és körültekintően válassz ennivalót.",
      detailedDescription:
        "Vásárlás előtt figyeld meg a terményeket és a mindennapi bevásárlást. Hasonlíts össze standokat, és kérdezz az összetevőkről vagy eredetről ahelyett, hogy minden emléktárgyról helyi készítést feltételeznél. Ez önálló piaclátogatás, nem konkrét árus ajánlása vagy garantált kóstoló.",
      usefulTips: [
        "Külön utazás előtt ellenőrizd a kereskedési napokat.",
        "Rendelés előtt tisztázd az árakat, allergéneket és az esetleges csomagolási díjat.",
      ],
    },
    "danube-promenade": {
      name: "Duna-parti séta",
      shortDescription:
        "Ismerd meg Budapestet a folyópart és a két oldal kapcsolata felől.",
      detailedDescription:
        "Válassz gyalogos szakaszt a pesti folyóparton, és hagyd, hogy a szemközti domboldal adja a hátteret. Nem minden híd érintése a cél, hanem a lelassulás és a változó nézőpontok megfigyelése. Az emlékműveknél állj meg tisztelettel, és figyelj a vízpart egyes részei mellett futó közlekedési útvonalakra.",
      usefulTips: [
        "A villamossíneknél és utaknál a kijelölt átkelőket használd.",
        "Maradj biztonságos távolságban a folyó szélétől, és ellenőrizd az időjárást.",
      ],
    },
    "dohany-synagogue": {
      name: "Dohány utcai zsinagóga",
      shortDescription:
        "Közelíts egy jelentős zsidó örökségi helyszínhez a történelem és az emlékezés számára is időt hagyva.",
      detailedDescription:
        "A látogatás adjon teret a zsinagóga vallási szerepének és a környező emlékhelyek összefüggéseinek. Olvasd el figyelmesen az ismertetőket, ne csupán építészeti megállóként tekints az épületre. A kapcsolódó területek és vezetések hozzáférését az üzemeltetőnél ellenőrizd.",
      usefulTips: [
        "Ellenőrizd a vallási naptár miatti zárásokat, a biztonsági és öltözködési szabályokat.",
        "Az emlékhelyeken légy csendes, és kövesd az aktuális fényképezési előírásokat.",
      ],
    },
  },
} satisfies HungarianGuide;
