import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Isztambul",
  region: "Márvány-tengeri régió, Európa és Ázsia",
  tagline: "Átkelések formálta város.",
  description:
    "A nagy műemlékeket jelenlegi vallási és közéleti szerepükön át közelítsd meg, majd hagyj helyet a környékbeli kereskedelemnek és nyilvános vízparti időtöltésnek. A nagy távolságok és külön látogatási feltételek szelektív tervezést kívánnak.",
  coordinateLabel:
    "Isztambul városi áttekintő pontja, nem helyszíni bejárat vagy kompkikötő",
  attractions: {
    "istanbul-hagia-sophia": {
      name: "Aja Szófia (Hagia Sophia)",
      shortDescription:
        "Az aktuális vallási és látogatási útmutatás alapján tervezz tiszteletteljes programot.",
      detailedDescription:
        "Az épület hosszú története többet kíván egy rövid építészeti pillantásnál. Először ismerd meg jelenlegi vallási szerepét és a ténylegesen hozzáférhető látogatói részeket. A régi utazási tanácsok nem feltétlenül tükrözik a mostani jegyváltást, útvonalakat vagy vallási rendet.",
      usefulTips: [
        "Utazás előtt ellenőrizd az aktuális hivatalos látogatási szabályokat.",
        "Kövesd az öltözködésre, lábbelire és imaidő alatti hozzáférésre vonatkozó útmutatást.",
      ],
    },
    "istanbul-topkapi": {
      name: "Topkapı palota",
      shortDescription:
        "Válassz elmélyült útvonalat egy nagy palotaegyüttesben és gyűjteményeiben.",
      detailedDescription:
        "A palotára udvarok és látogatói terek összefüggő csoportjaként gondolj, ne egyetlen szobasorként. Döntsd el, mely részek a legfontosabbak neked, és vásárlás előtt ellenőrizd a külön belépési jogosultságokat.",
      usefulTips: [
        "Nézd meg a hivatalos jegyek tartalmát és az aktuálisan nyitott részeket.",
        "Hagyj időt a biztonsági ellenőrzésre, és a választott útvonal akadálymentességéről érdeklődj.",
      ],
    },
    "istanbul-blue-mosque": {
      name: "Ahmed szultán mecsete, Kék mecset",
      shortDescription:
        "Közelíts egy jelentős mecsethez imádság helyeként, a látogatói felelősségeket is figyelembe véve.",
      detailedDescription:
        "A belső látogatás előtt szánj időt a külső részre és a környező köztérre. A látogatás a vallási használathoz és helyi szervezéshez igazodik, nem a városnéző menetrendhez. Csak az engedélyezett látogatói útvonalon lépj be.",
      usefulTips: [
        "Ellenőrizd az aktuális látogatási és imaidőhöz kapcsolódó hozzáférési rendet.",
        "Kövesd a helyi öltözködési, lábbeli- és fényképezési útmutatást.",
      ],
    },
    "istanbul-basilica-cistern": {
      name: "Elsüllyedt Palota, Bazilika-ciszterna",
      shortDescription:
        "Ismerj meg egy föld alatti víztárolót látogatói ismertetésein keresztül.",
      detailedDescription:
        "Figyeld meg a tér méretét, az oszlopok ritmusát, valamint a mérnöki megoldások és a hangulat kapcsolatát. A kijelölt járófelületek határozzák meg az útvonalat; a világítás és kiállítások változhatnak. Aktuális látogatási formát ellenőrizz, ne feltételezz adott bemutatót vagy előadást.",
      usefulTips: [
        "Tisztázd az aktuális jegyváltási és belépési feltételeket.",
        "Gyengén megvilágított utakon járj óvatosan, és tartsd tiszteletben a korlátokat.",
      ],
    },
    "istanbul-archaeology-museums": {
      name: "Isztambuli Régészeti Múzeumok",
      shortDescription:
        "Válassz gyűjteményi útvonalat, amely tágabb történelmi összefüggésbe helyezi a tárgyakat.",
      detailedDescription:
        "A múzeumi környezet más tempót ad, mint a legforgalmasabb műemlékek felkeresése. Néhány témára összpontosíts, és figyelmesen olvasd az ismertetőket. Munkálatok vagy gyűjteményi változások során az egyes épületek és termek hozzáférése eltérhet.",
      usefulTips: [
        "Ellenőrizd, mely épületek és termek látogathatók jelenleg.",
        "Tisztázd az akadálymentességet, csomagszabályokat és fényképezési feltételeket.",
      ],
    },
    "istanbul-grand-bazaar": {
      name: "Nézelődés a Nagy Bazárban",
      shortDescription:
        "Fedezz fel működő kereskedelmi környezetet rögzített bevásárlótúra helyett.",
      detailedDescription:
        "Válassz kényelmes szakaszt, és hagyj időt az anyagok, valamint a megmunkálás megfigyelésére. Az üzletek önálló vállalkozások; a termékek eredetét és a vásárlás feltételeit sem szabad magától értetődőnek venni. A nézelődés nem jelent kedvező árra vonatkozó ígéretet.",
      usefulTips: [
        "Megállapodás előtt tisztázd az árakat, a pénznemet és a vásárlási feltételeket.",
        "Dolgozók vagy kirakatok fényképezése előtt kérj engedélyt.",
      ],
    },
    "istanbul-bosphorus-waterfront": {
      name: "Séta a Boszporusz partján",
      shortDescription:
        "Válassz meghatározott nyilvános partszakaszt, ne feltételezz folyamatos vízparti útvonalat.",
      detailedDescription:
        "A szorost hajókirándulás nélkül, szárazföldről is megismerheted. Aktuális térképen válassz biztonságos gyalogos szakaszt és közlekedéshez közeli végpontot. Magánterületek és utak megszakíthatják a hozzáférést, ezért ne gondold, hogy minden partszakasz összekapcsolódik.",
      usefulTips: [
        "Ellenőrizd a tényleges gyalogos útvonalat és a visszajutást.",
        "Maradj távol a munkavégzésre használt rakpartoktól, rossz időben pedig a kitett szélektől.",
      ],
    },
    "istanbul-kadikoy-food": {
      name: "Gasztronómiai séta Kadıköy piaci környékén",
      shortDescription:
        "Programötlet: fedezz fel egy ételes városrészt, és önállóan válassz vásárlási megállókat.",
      detailedDescription:
        "Figyeld a mindennapi kereskedést, és hasonlíts össze nyitott standokat vagy étlapokat. Az összetevőkről és eredetről kérdezz garantált kóstolósor keresése helyett. Ez nem ajánlott árusok listája vagy közlekedést tartalmazó szervezett túra.",
      usefulTips: [
        "Hosszabb időzés előtt ellenőrizd a városon átvezető visszautat.",
        "Az árakat és allergéneket minden üzletnél közvetlenül tisztázd.",
      ],
    },
  },
} satisfies HungarianGuide;
