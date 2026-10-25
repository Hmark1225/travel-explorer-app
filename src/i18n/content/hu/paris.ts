import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Párizs",
  region: "Île-de-France, Nyugat-Európa",
  tagline: "Nézd közelebbről az ismerős várost.",
  description:
    "Köss össze egy elmélyült gyűjteményi látogatást közterekkel, városrészi részletekkel és tudatos kávészünettel. A külső nevezetességi sétákat különítsd el a foglalt belső látogatásoktól, és a városon átjutásra is hagyj időt.",
  coordinateLabel: "Párizs városi áttekintő pontja, nem helyszíni bejárat",
  attractions: {
    "paris-louvre": {
      name: "Louvre",
      shortDescription:
        "Válassz rövid gyűjteményi útvonalat a teljes múzeum bejárásának kísérlete helyett.",
      detailedDescription:
        "Érkezés előtt dönts egy korszak, régió vagy anyag mellett, amely érdekel. Néhány alaposan megismert terem többet adhat a híres művekhez vezető összes tábla követésénél. A palota környezete is az élmény része, de a látogatói útvonalak és kiállítások változhatnak.",
      usefulTips: [
        "Ellenőrizd az aktuális belépési foglalást és a termek hozzáférését.",
        "Válasszatok találkozópontot a csoportnak, és nézzétek meg a csomagszabályokat.",
      ],
    },
    "paris-orsay": {
      name: "Musée d’Orsay",
      shortDescription:
        "Ismerj meg műalkotásokat egy egykori pályaudvaron, az építészeti környezetre is időt hagyva.",
      detailedDescription:
        "A művek mellett az átalakított pályaudvar léptékére is figyelj. Néhány terem elmélyült megismerése összekapcsolhatja a festészetet, szobrászatot és a korszak változó társadalmát. Az időszaki kiállításokra külön feltételek vonatkozhatnak.",
      usefulTips: [
        "Ellenőrizd az aktuális jegyeket és a kiállításokkal kapcsolatos jogosultságokat.",
        "Tervezz szüneteket, és nézd meg a fényképezési korlátozásokat.",
      ],
    },
    "paris-eiffel-tower": {
      name: "Eiffel-torony és Champ-de-Mars",
      shortDescription:
        "Különítsd el a külső városnéző sétát az esetleges foglalt toronylátogatástól.",
      detailedDescription:
        "Több nyilvános nézőpontból is nézd meg a tornyot, mielőtt eldöntöd, beleillik-e a feljutás a tervedbe. A park és a környező utcák összefüggést adnak, de nem garantálnak belépést magába az építménybe. Az ellenőrzött látogatói területekhez aktuális hivatalos útmutatás szükséges.",
      usefulTips: [
        "Feljutáshoz ellenőrizd a hivatalos jegyeket és biztonsági feltételeket.",
        "Kövesd a korlátokat, és rendezvények idején ne feltételezz hozzáférést az egész parkhoz.",
      ],
    },
    "paris-notre-dame": {
      name: "Notre-Dame és Île de la Cité",
      shortDescription:
        "Fedezd fel a székesegyház környezetét, és a belső látogatást külön ellenőrizd.",
      detailedDescription:
        "A sziget körüli séta segít elhelyezni a székesegyházat a folyó és a város korai központjának összefüggésében. A helyreállítás, vallási használat és látogatásszervezés befolyásolhatja a hozzáférést. A külső programot és a belső foglalást külön döntésként kezeld.",
      usefulTips: [
        "Ellenőrizd a székesegyház aktuális hivatalos látogatási rendjét.",
        "Tartsd tiszteletben a szertartásokat, és ne hagyatkozz régi hozzáférési tanácsokra.",
      ],
    },
    "paris-montmartre": {
      name: "Séta a Montmartre-on",
      shortDescription:
        "Fedezz fel domboldali utcákat, helyet hagyva az itt élőknek.",
      detailedDescription:
        "Olyan útvonalat válassz, amely kisebb utcákat és nyilvános kilátópontokat is érint, ne egyetlen térnek tekintsd az egész városrészt. A lejtők és lépcsők alakítják a tempót. Az alkotók standjai, vallási terek és magánépületek nem tartoznak a közutcák szabad használatához.",
      usefulTips: [
        "A mozgásképességedhez illő megközelítést tervezz.",
        "Emberek vagy eladásra kínált művek fényképezése előtt kérj engedélyt.",
      ],
    },
    "paris-luxembourg": {
      name: "Luxembourg-kert",
      shortDescription:
        "Tarts nyugodt kerti szünetet hosszabb városnéző programok között.",
      detailedDescription:
        "Válassz egy padot vagy rövid utat, és figyeld meg a szabályos növényültetés és a mindennapi használat együttélését. Pihenőként működik, nem látványosságok menetrendjeként. Az egyes programoknak, játszótereknek és épületeknek saját hozzáférési feltételeik vannak.",
      usefulTips: [
        "Tartsd be a kiírt kerti szabályokat és idényjellegű tájékoztatókat.",
        "Ne feltételezd a programok vagy eszközkölcsönzés működését.",
      ],
    },
    "paris-natural-history": {
      name: "Jardin des Plantes és természettudományi látogatás",
      shortDescription:
        "Köss össze egy kerti sétát egy gondosan választott természettudományi intézménnyel.",
      detailedDescription:
        "Válassz egy beltéri gyűjteményt vagy családi témát, ne egyetlen, mindenre kiterjedő attrakcióként kezeld az egész együttest. A kert ritmusváltást adhat a kiállítások között. Az egyes intézmények jegyei, hozzáférési szabályai és nyitvatartása eltérhetnek.",
      usefulTips: [
        "Ellenőrizd a nyitott galériákat és az egyes jegyek tartalmát.",
        "Programválasztás előtt tisztázd a korosztályi megfelelést és az akadálymentességet.",
      ],
    },
    "paris-paris-bakery": {
      name: "Pékségi és kávézós megálló Párizsban",
      shortDescription:
        "Programötlet: válassz péksüteményt és pihenőt egy saját döntésed szerinti üzletben.",
      detailedDescription:
        "Hasonlítsd össze a készülő termékeket, és kérdezz az összetevőkről ahelyett, hogy egyetlen kötelező címet keresnél. A pékségi vásárlás és a leülős kávézás eltérő szolgáltatás lehet. Az ötlet nem garantál konkrét üzletet vagy termékkínálatot.",
      usefulTips: [
        "Rendelés előtt tisztázd az összetevőket és az allergének kezelését.",
        "Ellenőrizd, különbözik-e az elviteles és helyben fogyasztási ár.",
      ],
    },
  },
} satisfies HungarianGuide;
