import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Korfu",
  region: "Jón-szigetek, Dél-Európa",
  tagline: "Szigeti napok, középpontban a várossal.",
  description:
    "Korfu városát a szigeti látogatás egyik részeként tervezd, időt hagyva örökségre, lombos kertekre és gondosan választott parti megállókra. Nyilvános kilátópontok és önálló gasztronómiai felfedezések egészíthetik ki a szervezett műemléki látogatásokat.",
  coordinateLabel:
    "Korfu / Kerkira városának áttekintő pontja a szigethez; nem a sziget középpontja",
  attractions: {
    "corfu-old-town": {
      name: "Séta Korfu óvárosában",
      shortDescription:
        "Fedezd fel a sziget központi településének sűrű utcahálózatát.",
      detailedDescription:
        "A tágabb közterek és szűk utcák között járva érzékelheted a város különböző léptékeit. Nézz fel a homlokzatokra, de hagyj helyet a lakóknak és az áruszállításnak. A pont forrásolt települési áttekintés, nem egy gyalogtúra bejárata.",
      usefulTips: [
        "Tartsd szabadon a kapualjakat és szűk útvonalakat.",
        "A templomok, múzeumok és erődítmények hozzáférését külön ellenőrizd.",
      ],
    },
    "corfu-old-fortress": {
      name: "Korfu Régi Erődje",
      shortDescription:
        "Értsd meg a város fekvését meghatározó védelmi építményén keresztül.",
      detailedDescription:
        "Az erőd segít átgondolni, hogyan kapcsolódik a város a tengerhez és a megközelítési irányokhoz. A látogatás kitett felületekkel és szintkülönbségekkel járhat. Ellenőrizd a nyitott részeket, ne feltételezz teljes hozzáférést az egész együtteshez.",
      usefulTips: [
        "Nézd meg az aktuális belépést és engedélyezett útvonalakat.",
        "Viselj jól tapadó cipőt, és figyelmesen közlekedj a kitett utakon.",
      ],
    },
    "corfu-asian-art": {
      name: "Korfu Ázsiai Művészeti Múzeuma",
      shortDescription:
        "Ismerj meg egy múzeumi gyűjteményt jellegzetes történelmi épületben.",
      detailedDescription:
        "Válassz néhány gyűjteményi területet, és a tárgyak mellett értelmezésükre is figyelj. Maga az épület is az élmény része, de az időszaki bemutatókat és a hozzáférhető termeket aktuális múzeumi információ alapján ellenőrizd.",
      usefulTips: [
        "Nézd meg a múzeum aktuális termeit és látogatási szabályait.",
        "Tisztázd az akadálymentesség és a fényképezés feltételeit.",
      ],
    },
    "corfu-mon-repos": {
      name: "Séta a Mon Repos birtokon",
      shortDescription:
        "Tervezz lombos környezetben kirándulást, a belső látogatásokról külön döntve.",
      detailedDescription:
        "Táji sétaként kezeld a kertet, ne feltételezd, hogy minden kapcsolódó épület nyitva van. Rövid útvonal is csendes ritmusváltást adhat a városi utcák után. Az egyes múzeumi vagy régészeti területek külön működhetnek.",
      usefulTips: [
        "Ellenőrizd a nyilvános bejáratokat és az esetleges útvonalkorlátozásokat.",
        "Kövesd a kijelölt utakat, és a belső terek hozzáférését külön tisztázd.",
      ],
    },
    "corfu-paleokastritsa": {
      name: "Paleokastritsa tengerpartja",
      shortDescription:
        "Válassz nyilvános parti kilátópontot vagy strandmegállót változatos öblök környezetében.",
      detailedDescription:
        "Döntsd el, hogy a séta, a partvonal megfigyelése vagy a strandolás a fő célod. A hajós szolgáltatások és fürdési lehetőségek az időjárástól, körülményektől és üzemeltetőktől függnek; az ötlet nem tartalmazza és nem garantálja őket.",
      usefulTips: [
        "Ellenőrizd a nyilvános megközelítést és a helyi tengeri körülményeket.",
        "Ne feltételezd a hajókirándulások vagy strandszolgáltatások működését.",
      ],
    },
    "corfu-saint-spyridon": {
      name: "Szent Szpiridon-templom",
      shortDescription:
        "Egy városi templomot működő vallási helyszínként és nevezetességként is közelíts meg.",
      detailedDescription:
        "A látogatás alkalmazkodjon az istentisztelet ritmusához; a belső tér nem pusztán kiállítóhely. Először a külső részleteket nézd meg, és csak megfelelő látogatói hozzáférés esetén lépj be. Vallási események módosíthatják az élményt.",
      usefulTips: [
        "Ellenőrizd az aktuális látogatói útmutatást és szertartási rendet.",
        "Öltözz tiszteletteljesen, és kövesd a helyi fényképezési szabályokat.",
      ],
    },
    "corfu-kanoni": {
      name: "Séta Kanoni kilátópontjaihoz",
      shortDescription:
        "Tervezz rövid köztéri programot egy jellegzetes vízparti látkép köré.",
      detailedDescription:
        "Válassz biztonságos gyalogos helyet, és az egyetlen fényképért versengés helyett a tágabb környezetre is figyelj. A közúti forgalom és magánteraszok korlátozzák, hol állhatsz meg. A közeli vallási helyszínek látogathatósága külön kérdés.",
      usefulTips: [
        "Gyalogos útvonalakat használj, és ne állj meg az úttesten.",
        "Ellenőrizd az időjárást, és tartsd tiszteletben a magánteraszok határait.",
      ],
    },
    "corfu-corfiot-food": {
      name: "Gasztronómiai felfedező étkezés Korfun",
      shortDescription:
        "Programötlet: kérdezz Korfu konyhájáról egy saját választású étteremben.",
      detailedDescription:
        "Hasonlíts össze néhány étlapot, és kérdezd meg, mely fogások tükrözik az adott konyha szigeti ételekhez való viszonyát. Ez nem minősít egy vendéglőt hagyományosnak, és nem garantál adott recepteket. A figyelmes beszélgetés többet adhat egy előre rögzített kóstolólistánál.",
      usefulTips: [
        "A hús-, hal-, alkohol- és allergénösszetevőket közvetlenül tisztázd.",
        "Leülés előtt nézd meg az étlap árait.",
      ],
    },
  },
} satisfies HungarianGuide;
