import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Kréta",
  region: "Kréta, Dél-Európa",
  tagline: "Sziget, amelyet érdemes ráérősen megismerni.",
  description:
    "Kréta elég nagy ahhoz, hogy az állandó keresztülszelése helyett térségenként érdemes tervezni. Az ókori történelmet, városi sétákat és egy választott parti vagy szabadtéri programot étkezési idővel és a megállók közötti utazással együtt alakítsd.",
  coordinateLabel:
    "Héraklion / Iraklio városi áttekintő pontja Krétához; nem a sziget középpontja",
  attractions: {
    "crete-knossos": {
      name: "Knósszosz régészeti lelőhelye",
      shortDescription:
        "Ismerj meg egy jelentős régészeti környezetet a helyreállítás és értelmezés kérdéseire is figyelve.",
      detailedDescription:
        "A helyszíni ismertetők segítségével keresd a különbséget a feltárt maradványok és a későbbi rekonstrukciók között. Néhány összekapcsolódó tér megértése többet adhat, mint minden építmény melletti sietős elhaladás. A városi múzeumot külön látogatásként tervezd.",
      usefulTips: [
        "Ellenőrizd a hivatalos belépési rendet és az aktuális akadálymentes útvonalakat.",
        "Vigyél napvédelmet, és maradj az engedélyezett utakon.",
      ],
    },
    "crete-heraklion-museum": {
      name: "Héraklioni Régészeti Múzeum",
      shortDescription:
        "Fedezz fel tárgyakat, amelyek összefüggésbe helyezik Kréta régészeti helyszíneit.",
      detailedDescription:
        "Válassz például mindennapi élethez, cserekapcsolatokhoz vagy szertartásokhoz kötődő témát, és kövesd a gyűjtemény kezelhető részén. A tárgyak és eredeti helyszíneik összevetése hasznosabb lehet, mint az összes vitrin végignézése.",
      usefulTips: [
        "Ellenőrizd az aktuális termeket és jegyfeltételeket.",
        "A múzeum és Knósszosz külön látogatása közé tervezz szünetet.",
      ],
    },
    "crete-chania": {
      name: "Séta Chania óvárosában",
      shortDescription:
        "Fedezz fel kikötői utcákat és lakónegyedi sikátorokat Kréta nyugati részén.",
      detailedDescription:
        "Járj a vízpart és a kisebb utcák között, hogy érzékeld a környék változó léptékét. Kávézós megálló is beleférhet, de a közterület használata nem jogosít magánudvarokba belépni. A jelölő a település áttekintő pontja, nem ellenőrzött túrakezdő hely.",
      usefulTips: [
        "Tartsd tiszteletben a munkavégzésre használt rakpartokat és a lakók bejáratait.",
        "Ellenőrizd a közlekedést, ha Chaniát a sziget más részével kötöd össze.",
      ],
    },
    "crete-rethymno": {
      name: "Séta Rethymno óvárosában",
      shortDescription:
        "Keress építészeti rétegeket egy jól bejárható óvárosi sétán.",
      detailedDescription:
        "Válassz néhány utcát és közteret ahelyett, hogy szigorú menetrend szerint vágnál át a városon. Az egyes épületek működő vallási helyszínek, lakóházak vagy üzletek is lehetnek, nem nyitott látványosságok. A forrásolt jelölő csak a települést azonosítja.",
      usefulTips: [
        "Udvarba belépés és a lakók fényképezése előtt kérj engedélyt.",
        "Számolj egyenetlen felületekkel, és hosszabb séta előtt ellenőrizd a hőséget.",
      ],
    },
    "crete-elafonisi": {
      name: "Elafonisi tengerpartja",
      shortDescription:
        "Fedezz fel különleges parti tájat a természetvédelem és a körülmények figyelembevételével.",
      detailedDescription:
        "A partvonal és változó színei jelentik a vonzerőt, nem egy meghatározott vízállás vagy üres strand ígérete. A kijelölt megközelítést használd, és érzékeny természeti területként kezeld a helyet. Az utazási időt külön számold a parton töltött időtől.",
      usefulTips: [
        "Ellenőrizd a helyi hozzáférést, az időjárást és a természetvédelmi korlátozásokat.",
        "A homokot, kagylókat és növényeket hagyd a helyükön.",
      ],
    },
    "crete-samaria": {
      name: "Túraprogram a Szamaria-szurdokban",
      shortDescription:
        "Megterhelő szurdoktúra, amelyhez aktuális működési és biztonsági információ szükséges.",
      detailedDescription:
        "Ne pusztán általános időbecslés alapján tervezz. Az aktuális parki útmutatással válaszd ki az útvonalat és a közlekedés menetét, figyelembe véve a terepet, saját képességeidet és az időjárást. A szép táj híre nem bizonyítja, hogy a szurdok nyitva van vagy alkalmas a csoportodnak.",
      usefulTips: [
        "Mielőtt elköteleződsz a túra mellett, ellenőrizd a park működését, a lezárásokat és a közlekedést.",
        "Vigyél megfelelő túrafelszerelést, és őszintén mérd fel az erőnlétedet.",
      ],
    },
    "crete-crete-aquarium": {
      name: "CRETAquarium",
      shortDescription:
        "Válassz beltéri, tengeri témájú látogatást Héraklion közelében.",
      detailedDescription:
        "A gyerekek válasszanak élőhelyet vagy állatot, amelyről többet szeretnének tudni, majd kapcsoljátok a témát a környező tengerhez. A kiállítások, ismertetők és létesítmények változhatnak, ezért rögzített program helyett az intézmény aktuális tájékoztatásából indulj ki.",
      usefulTips: [
        "Ellenőrizd az aktuális látogatási feltételeket és az akadálymentességet.",
        "Ne kopogtasd az üveget, és ne feltételezd etetési programok elérhetőségét.",
      ],
    },
    "crete-cretan-table": {
      name: "Egy krétai taverna asztalánál",
      shortDescription:
        "Programötlet: osszatok meg egy étkezést, és kérdezzetek az idény alapanyagairól.",
      detailedDescription:
        "A tavernában zöldségekről, olívaolajról, kenyérről és a konyha saját főzéséről kérdezve is tanulhatsz. Ez önálló étkezési ötlet, nem név szerinti helyajánlás vagy ígért főzőbemutató.",
      usefulTips: [
        "Jelezd az étrendi igényeket, és közvetlenül tisztázd a hozzávalókat.",
        "Olvasd el az étlap árait, és kérdezz az esetleges szerviz- vagy terítékdíjról.",
      ],
    },
  },
} satisfies HungarianGuide;
