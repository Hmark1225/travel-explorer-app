import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Barcelona",
  region: "Katalónia, Dél-Európa",
  tagline: "Építészet, városrészek, tengeri levegő.",
  description:
    "Kapcsold össze a jellegzetes épületeket egy elmélyült művészeti látogatással, városrészi sétával és vízparti idővel. Naponta csak néhány területet válassz, hogy a közlekedés és emelkedők ne szorítsák háttérbe a város megélését.",
  coordinateLabel: "Barcelona városi áttekintő pontja, nem helyszíni bejárat",
  attractions: {
    "barcelona-sagrada-familia": {
      name: "Sagrada Família",
      shortDescription:
        "Ismerj meg egy jelentős építészeti alkotást kívülről és külön megszervezett belső látogatással.",
      detailedDescription:
        "Először a nyilvános külső oldalakat járd körbe, hogy megfigyeld a homlokzatok különbségeit. A belső látogatás szabályozott program, amelynek formáját és hozzáférhető részeit ellenőrizni kell. Az építészeti érdeklődés mellett tartsd tiszteletben az épület vallási szerepét.",
      usefulTips: [
        "Az aktuális hivatalos jegy- és belépési információt használd.",
        "Az öltözködés, csomagok és tornyok feltételeit ellenőrizd, ne feltételezz automatikus hozzáférést.",
      ],
    },
    "barcelona-park-guell": {
      name: "Güell park",
      shortDescription:
        "Figyeld meg az épített formák, utak és domboldali kilátások kölcsönhatását.",
      detailedDescription:
        "Olyan útvonalat válassz, amely a legismertebb elemek mellett az anyagok és növényzet megfigyelésére is hagy időt. A parki környezet nem jelenti, hogy minden terület szabadon vagy akadálymentesen hozzáférhető. A felkeresni kívánt rész látogatási feltételeit külön tisztázd.",
      usefulTips: [
        "Utazás előtt ellenőrizd a hivatalos belépési és hozzáférési zónákat.",
        "Számolj emelkedőkkel, és érdeklődj az akadálymentes útvonalakról.",
      ],
    },
    "barcelona-gothic-quarter": {
      name: "Séta a Gótikus negyedben",
      shortDescription: "Fedezd fel a történelmi központ közutcáit és tereit.",
      detailedDescription:
        "A negyedre élő lakókörnyezetként tekints, hosszú, részben helyreállításokkal alakított építészeti történettel. Válassz néhány közteret, és nézz körül figyelmesen ahelyett, hogy minden régies részletet ugyanabból a korszakból származónak gondolnál.",
      usefulTips: [
        "Tartsd tiszteletben a lakókat, és hagyd szabadon a szűk utcákat.",
        "A vallási épületek és múzeumok belépési feltételeit külön ellenőrizd.",
      ],
    },
    "barcelona-mnac": {
      name: "Katalán Nemzeti Művészeti Múzeum",
      shortDescription:
        "Válassz elmélyült útvonalat a katalán művészetben, monumentális múzeumi környezetben.",
      detailedDescription:
        "Válassz korszakot vagy műfajt a teljes gyűjtemény egyszerre történő bejárása helyett. A domboldali környezet is része lehet a programnak, de a kiállításoknak, teraszoknak és gyűjteményeknek eltérő hozzáférési feltételeik lehetnek.",
      usefulTips: [
        "Ellenőrizd a nyitott termeket és a jegy tartalmát.",
        "Tervezz akadálymentes megközelítést, vagy hagyj időt az emelkedőre.",
      ],
    },
    "barcelona-montjuic": {
      name: "Séta a Montjuïc kertjeiben",
      shortDescription:
        "Tervezz meghatározott domboldali sétát nyilvános kertek között.",
      detailedDescription:
        "A Montjuïc nagy terület, nem egyetlen látnivaló egyetlen útvonallal. Energiádhoz illő induló- és végpontot válassz, és a múzeumokról vagy más intézményekről külön dönts. A közlekedési szolgáltatások és az egyes kertek hozzáférése változhat.",
      usefulTips: [
        "Ellenőrizd az utak hozzáférését és a közlekedési kapcsolatokat.",
        "Vigyél vizet, és ne feltételezd, hogy minden összekötő út akadálymentes.",
      ],
    },
    "barcelona-barceloneta": {
      name: "Séta Barceloneta tengerpartján",
      shortDescription:
        "Fedezd fel a városi vízpart egy szakaszát kényelmes tempóban.",
      detailedDescription:
        "A nyilvános parti séta akkor is értékes lehet, ha az idő nem alkalmas fürdésre. Figyeld meg a városrészi utcák és a strand kapcsolatát, majd válassz kényelmes visszafordulási pontot. A strandszolgáltatásokat és körülményeket aznap kell ellenőrizni.",
      usefulTips: [
        "Kövesd a fürdési zászlókat és a helyi útmutatást.",
        "Vigyázz az értékeidre, és tartsd tiszteletben a kerékpársávokat.",
      ],
    },
    "barcelona-boqueria": {
      name: "Nézelődés a La Boqueria piacon",
      shortDescription:
        "Fedezz fel egy működő élelmiszerpiacot konkrét árusra hagyatkozás nélkül.",
      detailedDescription:
        "Nézz az első kirakaton túlra, és a nyitott standoknál hasonlíts össze alapanyagokat, ajánlatokat. Ez önálló látogatás, nem garantált kóstoló vagy gasztrotúra. Vásárlás és fényképezés közben hagyj helyet a mindennapi munkájukat végző embereknek.",
      usefulTips: [
        "Ellenőrizd a kereskedési napokat, és a dolgozók fényképezése előtt kérj engedélyt.",
        "Vásárlás előtt tisztázd az árakat és az allergéneket.",
      ],
    },
    "barcelona-cosmocaixa": {
      name: "CosmoCaixa Barcelona",
      shortDescription:
        "Válassz tudományos családi látogatást, időt hagyva a kíváncsiságnak és kérdéseknek.",
      detailedDescription:
        "A csoport válasszon néhány témát ahelyett, hogy minden kiállítási elem között rohanna. Az interaktív eszközök, külön foglalkozások és további programok az aktuális működéstől függnek. Az intézmény útmutatása alapján döntsd el, mi illik a társaság korához és érdeklődéséhez.",
      usefulTips: [
        "Ellenőrizd az aktuális kiállításokat és a külön foglalkozások foglalását.",
        "A kiegészítő programoknál tisztázd az akadálymentességet és korhatárokat.",
      ],
    },
  },
} satisfies HungarianGuide;
