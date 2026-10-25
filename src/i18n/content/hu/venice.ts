import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Velence",
  region: "Veneto, Dél-Európa",
  tagline: "Találd meg a saját csatornaparti ritmusodat.",
  description:
    "Járj a nagy városi nevezetességek és a kisebb lakóutcák között, időt hagyva a lagúnakörnyezet megértésére. A tudatos gyalogos útvonal és egy gondosan választott szigeti kirándulás jobb tervet ad a sietős programlistánál.",
  coordinateLabel:
    "Velence városi áttekintő pontja, nem vízibusz-megálló vagy helyszíni bejárat",
  attractions: {
    "venice-st-marks": {
      name: "Szent Márk-bazilika és tér",
      shortDescription:
        "Figyeld meg az építészet, a mozaikok és egy híres köztér találkozását.",
      detailedDescription:
        "Kívülről kezdd, hogy lásd, miként illeszkedik a bazilika a tér nagyobb együttesébe. A belső látogatás során a művészet mellett vallási szerepének is hagyj teret. Az elkülönülő látogatói részek feltételei eltérhetnek, ezért az aktuális hivatalos útmutatás alapján tervezz.",
      usefulTips: [
        "Ellenőrizd a jegyváltást, a hozzáférést és a szertartásokhoz kapcsolódó korlátozásokat.",
        "Tartsd be az öltözködési szabályokat, és ne etesd a tér madarait.",
      ],
    },
    "venice-doges-palace": {
      name: "Dózse-palota",
      shortDescription:
        "Ismerd meg a velencei kormányzás helyszínét termein és összekapcsolódó terein keresztül.",
      detailedDescription:
        "A palota segít megérteni az ünnepélyesség, a politikai hatalom és a vízpart kapcsolatát. Kövess áttekinthető útvonalat, és néhány termet nézz meg alaposan az összes díszítés befogadása helyett. A kiegészítő útvonalakra külön feltételek vonatkozhatnak.",
      usefulTips: [
        "A hivatalos múzeumnál ellenőrizd az útvonalakat és a jegy tartalmát.",
        "Érkezés előtt tisztázd az akadálymentességet és a csomagszabályokat.",
      ],
    },
    "venice-rialto": {
      name: "Rialto híd és piaci környéke",
      shortDescription:
        "Kösd össze a hídon átkelést a környező kereskedőnegyed megismerésével.",
      detailedDescription:
        "Átkelés előtt nézd meg a hidat egy közeli csatornapartról. A piaci környék akkor a legérdekesebb, ha működő helyszínként, nem díszletként közelítesz hozzá. A kereskedés az adott naptól függ; a híd meglátogatása nem garantál működő piacot.",
      usefulTips: [
        "Helyben ellenőrizd a piac kereskedési napjait.",
        "Hagyd szabadon a híd lépcsőit és az áruszállítás útvonalait.",
      ],
    },
    "venice-accademia": {
      name: "Gallerie dell’Accademia",
      shortDescription:
        "Kövesd a velencei festészet történetét a legforgalmasabb átkelőktől távolabb.",
      detailedDescription:
        "Válassz egy korszakot vagy témát a gyűjteményen átvezető vezérfonalnak. Figyeld a színeket és a város kapcsolatát a vízzel, valamint az ünnepélyességgel, majd kösd össze a látottakat a kinti utcákkal. Az aktuális teremrendhez igazítsd az útvonalat.",
      usefulTips: [
        "Ellenőrizd a múzeum nyitott termeit és a jegyfeltételeket.",
        "Tervezz pihenőt ahelyett, hogy egy napra túl sok múzeumot zsúfolnál.",
      ],
    },
    "venice-cannaregio": {
      name: "Cannaregio és a zsidó gettó",
      shortDescription:
        "Sétálj egy lakónegyedben, időt hagyva a zsidó történelemnek és az emlékezésnek.",
      detailedDescription:
        "A környék többet érdemel egy csatornák közötti sietős kitérőnél. Figyeld meg a terek, lakóépületek és vallási helyszínek kapcsolatát. A múzeum- és zsinagógalátogatások külön, szabályozott programok, amelyeket az aktuális látogatói útmutatás szerint kell tervezni.",
      usefulTips: [
        "Az egyes intézményeknél vedd figyelembe a vallási naptár korlátozásait.",
        "Beszélj halkan, és tiszteld az emlékhelyeket, valamint a helyieket.",
      ],
    },
    "venice-burano": {
      name: "Séta Buranóban",
      shortDescription:
        "Fedezz fel szigeti utcákat anélkül, hogy a magánházakat látogatható attrakciónak tekintenéd.",
      detailedDescription:
        "Burano lehet lassú séta színes utcákon és vízparti tereken, nem csupán verseny egyforma fényképekért. Nyitott műhelyekben kérdezz a kézműves hagyományokról, de ne feltételezd minden kiállított termékről, hogy helyben készült.",
      usefulTips: [
        "Utazás előtt ellenőrizd a visszainduló vízibuszokat.",
        "Ne lépj be magánudvarokba, és a helyiek fényképezéséhez kérj engedélyt.",
      ],
    },
    "venice-lido": {
      name: "Séta a Lido tengerpartján",
      shortDescription:
        "Válts a szűk csatornautcákról tágasabb szigeti sétára a tenger közelében.",
      detailedDescription:
        "A Lido más térélményt nyújt, mint Velence központja. Válassz kényelmes nyilvános útvonalat, és külön döntsd el, hogy aznapi körülmények mellett belefér-e a strandolás. Az egyes fürdőterületeknek és idényjellegű szolgáltatásoknak saját hozzáférési szabályaik lehetnek.",
      usefulTips: [
        "Magánstrandok használata helyett ellenőrizd a nyilvános megközelítési utakat.",
        "Fürdés fontolgatása előtt nézd meg az időjárást és a tenger állapotát.",
      ],
    },
    "venice-cicchetti": {
      name: "Velencei cicchetti-megálló",
      shortDescription:
        "Programötlet: válassz apró falatokat egy saját döntésed alapján felkeresett bacaróban.",
      detailedDescription:
        "Rendelés előtt olvasd el a pult kínálatát vagy az étlapot, és kérdezd meg, mit szolgálnak fel. Ez kötetlen étkezési ötlet, nem konkrét bár ajánlása vagy foglalt túra. Az adagokat és italokat az ízlésedhez, illetve költségkeretedhez igazítsd.",
      usefulTips: [
        "Rendelés előtt tisztázd a darabonkénti árakat és az allergéneket.",
        "Tartsd tiszteletben az állóhelyeket és az üzlet rendelési szokásait.",
      ],
    },
  },
} satisfies HungarianGuide;
