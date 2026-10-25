import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Madrid",
  region: "Madridi autonóm közösség, Dél-Európa",
  tagline: "Hagyj időt művészetre és mindennapi életre.",
  description:
    "Építsd a városi tartózkodást tudatosan választott gyűjteményekre, közterekre és zöld területekre. Egy étkezési megálló és folyóparti séta más tempót adhat a napnak a nagyobb reprezentatív épületek mellett.",
  coordinateLabel: "Madrid városi áttekintő pontja, nem helyszíni bejárat",
  attractions: {
    "madrid-prado": {
      name: "Prado Múzeum",
      shortDescription:
        "Építs elmélyült látogatást néhány kiválasztott festmény köré.",
      detailedDescription:
        "Válassz néhány alkotót vagy témát, és hagyj időt a művek összehasonlítására. Az áttekinthető útvonal többet adhat annál, mint minden termet kötelező megállónak tekinteni. Az időszaki kiállítások és gyűjteményi bemutatók látogatási feltételei eltérhetnek.",
      usefulTips: [
        "Ellenőrizd a múzeum aktuális jegy- és kiállítási tájékoztatását.",
        "Tisztázd a csomagmegőrzési és fényképezési szabályokat.",
      ],
    },
    "madrid-reina-sofia": {
      name: "Reina Sofía Múzeum",
      shortDescription:
        "Fedezd fel a modern művészetet gondosan választott útvonalon, történelmi összefüggésekkel.",
      detailedDescription:
        "Hagyj elég időt az ismertetőkre, hogy a műveket keletkezési korszakukhoz kapcsolhasd. Ne csupán egy híres kép köré tervezz: keress kapcsolódó termeket, amelyek mélyítik az élményt. Utazás előtt ellenőrizd, mely terek vannak nyitva.",
      usefulTips: [
        "Nézd meg az aktuális terem- és belépési tájékoztatást.",
        "Tervezz szünetet, és az elkülönülő kiállítási épületek hozzáférését külön tisztázd.",
      ],
    },
    "madrid-royal-palace": {
      name: "Madridi Királyi Palota",
      shortDescription:
        "Ismerj meg egy reprezentatív épületet a ténylegesen látogatható részekre figyelve.",
      detailedDescription:
        "Belső látogatás előtt nézd meg a palota és a környező közterek kapcsolatát. Hivatalos szerepe befolyásolhatja a hozzáférést, ezért nélkülözhetetlen az aktuális látogatói tájékoztatás. Ne feltételezd, hogy a szomszédos gyűjtemények és kertek ugyanazzal a jeggyel látogathatók.",
      usefulTips: [
        "Ellenőrizd az aktuális lezárásokat és a jegy tartalmát.",
        "Hagyj időt a biztonsági ellenőrzésre, és tisztázd az akadálymentes hozzáférést.",
      ],
    },
    "madrid-retiro": {
      name: "Séta az El Retiro parkban",
      shortDescription: "Válassz nyugodt útvonalat egy nagy városi parkban.",
      detailedDescription:
        "A park rugalmas pihenőként működik a legjobban, nem kötelező látnivalók soraként. Figyeld meg a széles utak és csendesebb növényes területek különbségét. A park épületeinek, csónakjainak és más szolgáltatásainak külön feltételeik vannak.",
      usefulTips: [
        "Ellenőrizd az időjárással kapcsolatos hozzáférési tájékoztatókat.",
        "Ne feltételezd, hogy a kölcsönzések vagy kiállítások a park látogatásához tartoznak.",
      ],
    },
    "madrid-plaza-mayor": {
      name: "Plaza Mayor és történelmi belvárosi séta",
      shortDescription:
        "Használj egy ismert teret egy rövid, közutcákon vezető felfedezés kiindulópontjaként.",
      detailedDescription:
        "Járd körbe a tér széleit, hogy érzékeld zárt formáját, majd válassz néhány környező utcát. Az élményt a városi tér és a mindennapi élet adja, nem a környező épületekbe való belépés. A kávézós megálló külön választható szolgáltatás.",
      usefulTips: [
        "Kávézóasztal elfoglalása előtt ellenőrizd az étlapot.",
        "Hagyd szabadon az átjárókat, és forgalmas helyeken figyelj az értékeidre.",
      ],
    },
    "madrid-sorolla": {
      name: "Sorolla Múzeum",
      shortDescription:
        "Egy művész otthonában működő múzeumot csak aktuális működésének ellenőrzése után tervezz be.",
      detailedDescription:
        "A művész egykori otthona más találkozást adhat a festészettel, mint egy nagy nemzeti gyűjtemény. Amikor nyitva vannak, a termeket, kerteket és műveket együtt érdemes szemlélni. Felújítás vagy más változás miatt ellenőrizni kell, valóban lehetséges-e a látogatás.",
      usefulTips: [
        "Külön utazás előtt győződj meg arról, hogy a múzeum nyitva van.",
        "Ellenőrizd a foglalást, a kert hozzáférését és az akadálymentességet.",
      ],
    },
    "madrid-madrid-tapas": {
      name: "Tapasmegálló Madridban",
      shortDescription:
        "Programötlet: az aktuális étlapok és saját ízlésed alapján válassz étkezési megállót.",
      detailedDescription:
        "Hasonlíts össze néhány lehetőséget ahelyett, hogy egy forgalmas bárt egyetlen hiteles stílus képviselőjének tekintenél. Kérdezz az adagokról és a rendelés menetéről, majd a társaságodhoz illő tempót válassz. Az ötlet nem nevez meg és nem ajánl konkrét vendéglátóhelyet.",
      usefulTips: [
        "Rendelés előtt tisztázd az árakat és adagméreteket.",
        "Az allergiákról és alkoholmentes lehetőségekről közvetlenül érdeklődj.",
      ],
    },
    "madrid-madrid-rio": {
      name: "Séta a Madrid Río folyópartján",
      shortDescription:
        "Válassz kényelmes szakaszt a város folyó menti közterülethálózatából.",
      detailedDescription:
        "A program a sétáról és annak megfigyeléséről szól, hogyan találkozik a város a folyó folyosójával. A teljes hálózat bejárása helyett közlekedési kapcsolathoz közeli végpontot válassz. A játszóterek és más létesítmények alkalmasságát egyenként ellenőrizd.",
      usefulTips: [
        "Hagyd szabadon a közös kerékpáros és gyalogos útvonalakat.",
        "Ellenőrizd a hőséget, és jelölj ki visszajutási lehetőséget.",
      ],
    },
  },
} satisfies HungarianGuide;
