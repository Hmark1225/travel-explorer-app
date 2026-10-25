import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Prága",
  region: "Csehország (Bohémia), Közép-Európa",
  tagline: "Város, amelyet utcánként érdemes olvasni.",
  description:
    "Fedezz fel történelmi köztereket gondosan választott gyűjtemények és csendesebb domboldali séták mellett. A nagy látogatói együtteseket különítsd el a köztük lévő mindennapi utcáktól, és a kilátás mellett az összefüggéseknek is hagyj időt.",
  coordinateLabel: "Prága városi áttekintő pontja, nem helyszíni bejárat",
  attractions: {
    "prague-castle": {
      name: "A prágai vár együttese",
      shortDescription:
        "Tervezz elmélyült útvonalat egy nagy együttesben, elkülönülő látogatói területekkel.",
      detailedDescription:
        "Először döntsd el, mely épületek és udvarok a legfontosabbak neked. A nyilvános megközelítések, vallási terek és jegyes részek nem egyetlen, egységes attrakciót alkotnak. Rövidebb, gondosan bejárt útvonal jobb lehet minden elérhető kör teljesítésénél.",
      usefulTips: [
        "Ellenőrizd a hivatalos látogatói köröket, biztonsági szabályokat és a jegyek tartalmát.",
        "Számolj lejtőkkel, egyenetlen burkolattal és a hozzáférés esetleges változásával.",
      ],
    },
    "prague-charles-bridge": {
      name: "Séta a Károly hídon",
      shortDescription:
        "Nézd meg a hidat mindkét folyópartról, mielőtt átkelnél rajta.",
      detailedDescription:
        "A híd a tágabb folyóparti látvány része, de a szobrok és városi sziluett tanulmányozásának helye is. Kényelmes tempóban haladj, és ott állj meg, ahol nem akadályozod a forgalmat. A közterületi hozzáférés nem terjed ki minden szomszédos toronyra vagy épületre.",
      usefulTips: [
        "Hagyd szabadon a középső gyalogos útvonalat.",
        "A tornyok bejutását külön ellenőrizd, és tömegben figyelj az értékeidre.",
      ],
    },
    "prague-old-town-square": {
      name: "Óvárosi tér",
      shortDescription:
        "Ismerj meg egy városi teret eltérő homlokzatain és nyilvános szélein keresztül.",
      detailedDescription:
        "Járd körbe a teret ahelyett, hogy csak az óra legforgalmasabb oldalán gyülekeznél. Különböző korszakok építészete áll egymás mellett, az apró részletek is figyelmet érdemelnek. A templomok és tornyok belső látogatásának saját feltételei vannak.",
      usefulTips: [
        "Ellenőrizd minden épület aktuális bejutását, amelybe betérnél.",
        "A téren kávézóasztal elfoglalása előtt olvasd el az étlapot.",
      ],
    },
    "prague-jewish-quarter": {
      name: "Örökségi látogatás a prágai zsidó negyedben",
      shortDescription:
        "Közelíts a zsidó örökségi helyszínekhez a történelemnek és emlékezésnek időt hagyva.",
      detailedDescription:
        "Aktuális hivatalos információ alapján válaszd ki a konkrét múzeumi vagy vallási helyszíneket. Ezek nem egyszerűen felcserélhető megállók egy utcai sétában. Az értelmezésre is hagyj időt, a temetőket és emlékhelyeket pedig kezeld tisztelettel.",
      usefulTips: [
        "Ellenőrizd a vallási naptár miatti zárásokat és a jegy tartalmát.",
        "Kövesd a biztonsági, öltözködési és fényképezési útmutatást.",
      ],
    },
    "prague-petrin": {
      name: "Séta a Petřín-dombon",
      shortDescription:
        "Válassz zöld domboldali útvonalat, a látogatható attrakciókról külön döntve.",
      detailedDescription:
        "Az utak és növényes terek nyugodtabb ritmust adhatnak a történelmi központ után. A csoporthoz illő felmenetelt válassz, és tisztázd a visszajutást. Tornyok, közlekedési eszközök és más létesítmények külön programok, saját működési feltételekkel.",
      usefulTips: [
        "Ellenőrizd az aktuális út- és közlekedési tájékoztatókat.",
        "Számolj emelkedőkkel, és ne feltételezd minden út akadálymentességét.",
      ],
    },
    "prague-national-museum": {
      name: "Prágai Nemzeti Múzeum",
      shortDescription:
        "Válassz áttekinthető gyűjteményi útvonalat jelentős múzeumi környezetben.",
      detailedDescription:
        "Érkezés előtt dönts gyűjteményi témáról, ne feltételezd, hogy egy látogatás minden épületre és bemutatóra elég. Az építészet is része lehet az élménynek, de a kiállítások és helyszínek feltételei eltérhetnek.",
      usefulTips: [
        "Ellenőrizd az aktuális tárlatokat, épületeket és a jegy tartalmát.",
        "Tisztázd az akadálymentességet és a csomagmegőrzési követelményeket.",
      ],
    },
    "prague-vysehrad": {
      name: "Séta Vyšehrad területén",
      shortDescription:
        "Fedezz fel dombtetői történelmi környezetet engedélyezett utakon és kilátásokon át.",
      detailedDescription:
        "A séta a tájat, erődítéseket és a város rétegeit kapcsolhatja össze anélkül, hogy minden beltéri helyszínre betérnél. Válassz rövid útvonalat, és hagyj helyet a csendes elmélyülésnek. A vallási épületek, emlékhelyek és kezelt területek külön figyelmet igényelnek.",
      usefulTips: [
        "Tartsd tiszteletben a csendes részeket, és az emlékhelyek hozzáférését belépés előtt ellenőrizd.",
        "Viselj lejtőkre és burkolt felületekre alkalmas cipőt.",
      ],
    },
    "prague-prague-food": {
      name: "Cseh gasztronómiai felfedező étkezés",
      shortDescription:
        "Programötlet: étlap és kérdések segítségével fedezz fel egy étkezést Prágában.",
      detailedDescription:
        "Olyan üzletet válassz, amelynek aktuális étlapja illik az ízlésedhez, ne kötelező ételek rögzített listájára hagyatkozz. Kérdezz az adagokról és összetevőkről. Az ötlet nem tartalmaz vagy ajánl konkrét éttermet, kóstolót vagy italfogyasztást.",
      usefulTips: [
        "Tisztázd az allergéneket, valamint a hús- és alkoholtartalmú összetevőket.",
        "Rendelés előtt ellenőrizd az árakat és az esetleges kiszolgálási feltételeket.",
      ],
    },
  },
} satisfies HungarianGuide;
