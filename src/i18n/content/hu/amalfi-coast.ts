import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Amalfi-part",
  region: "Campania, Dél-Európa",
  tagline: "Kisvárosok, tágas horizont.",
  description:
    "Válassz néhány tengerparti és hegytetői települési élményt a teljes partvidék egy napba zsúfolása helyett. Az utcák, kertek és sétautak meghálálják az időt, a meredek terep és közlekedés pedig gondos tervezést kíván.",
  coordinateLabel:
    "Amalfi városának áttekintő pontja az Amalfi-part térségében; nem a teljes partvidék vagy egy túraút kezdőpontja",
  attractions: {
    "amalfi-coast-amalfi-town": {
      name: "Séta Amalfi városában",
      shortDescription:
        "Fedezd fel a székesegyház tere körüli utcákat és a város nyilvános vízpartját.",
      detailedDescription:
        "Amalfira kis tengerparti városként tekints, ne csupán fotómegállók közötti közlekedési csomópontként. Térj be néhány utcába a legforgalmasabb téren túl, és állj meg ott, ahol a köztér engedi. Az áttekintő jelölő a várost mutatja, nem ellenőrzött sétakezdőpontot.",
      usefulTips: [
        "Hagyd szabadon a lépcsőket és az áruszállítás útvonalait.",
        "Part menti indulás előtt ellenőrizd a továbbutazás lehetőségeit.",
      ],
    },
    "amalfi-coast-cathedral": {
      name: "Amalfi székesegyházának együttese",
      shortDescription:
        "Figyeld meg a székesegyház monumentális megközelítését és különböző látogatói tereit.",
      detailedDescription:
        "A tér és a széles lépcsősor kapcsolata is az élmény része. Először a külső részt nézd meg, majd döntsd el, az együttes mely részeit keresed fel. A vallási használat és a különálló látogatói területek befolyásolhatják a hozzáférést.",
      usefulTips: [
        "Ellenőrizd az aktuális szertartási és látogatási rendet.",
        "Számolj lépcsőkkel, és szükség esetén kérdezz az alternatív megközelítésről.",
      ],
    },
    "amalfi-coast-paper-museum": {
      name: "Amalfi Papírmúzeum",
      shortDescription:
        "Ismerj meg egy kézműves hagyományt, amely alakította a város munkás múltját.",
      detailedDescription:
        "A papírkészítés története érdekes ellenpontja a tengerparti tájnak. A víz, az anyagok és a munka kapcsolatára összpontosíts, ne csupán rossz időre tartogatott beltéri programként kezeld a múzeumot. A bemutatók vagy vezetések az intézménytől függnek.",
      usefulTips: [
        "Ellenőrizd az aktuális látogatási formát és az esetleges bemutatók rendjét.",
        "Érdeklődj az akadálymentességről és az előzetes foglalás szükségességéről.",
      ],
    },
    "amalfi-coast-ravello": {
      name: "Séta Ravellóban",
      shortDescription:
        "Fedezz fel egy hegytetői települést, időt hagyva kis terekre és kilátásokra.",
      detailedDescription:
        "Ravello rövid, figyelmes sétával többet adhat, mint a kertek közötti sietős áthaladással. Figyeld meg az utcák és teraszok kapcsolatát a környező lejtőkkel. Ez települési áttekintés; az egyes villák és rendezvények külön látogatások.",
      usefulTips: [
        "Hagyj időt a domboldalon fel- és levezető utazásra.",
        "Ne feltételezz hozzáférést magánkertekhez vagy rendezvényterekhez.",
      ],
    },
    "amalfi-coast-villa-rufolo": {
      name: "Villa Rufolo",
      shortDescription:
        "Figyeld meg a történelmi épületek, a kertek és a tengerparti környezet kapcsolatát.",
      detailedDescription:
        "Mozogj ráérősen az építészeti részletek és a tágabb látképek között, ne csak egy fotópontra koncentrálj. A kert hozzáférése, munkálatok vagy rendezvények módosíthatják az élményt. Utazás előtt ellenőrizd, mit tartalmaz egy szokásos látogatás.",
      usefulTips: [
        "Ellenőrizd a nyitvatartást, belépést és a rendezvények miatti korlátozásokat.",
        "Tisztázd az akadálymentes útvonalakat, és ne hajolj át a teraszkorlátokon.",
      ],
    },
    "amalfi-coast-positano": {
      name: "Séta Positano nyilvános utcáin",
      shortDescription:
        "Ismerj meg egy meredek tengerparti települést közutcáin és kilátópontjain át.",
      detailedDescription:
        "A sétát az emelkedők és lépcsők ugyanúgy alakítják, mint a színes épületek. Olyan utat válassz, amelyen kényelmesen vissza is tudsz menni, és hagyj időt megállásokra. A közutak használata nem jogosít szállodák, teraszok vagy magánstrandok területére belépni.",
      usefulTips: [
        "Viselj lépcsőzésre és lejtőkre alkalmas cipőt.",
        "Ellenőrizd a visszautat, ne csak egy késői járatra hagyatkozz.",
      ],
    },
    "amalfi-coast-path-of-gods": {
      name: "Túra az Istenek ösvényén",
      shortDescription:
        "Túraprogram egy ismert tengerparti útvonalon, amelyhez az aktuális útviszonyokat ellenőrizni kell.",
      detailedDescription:
        "Ez jelentősebb szabadtéri túra, nem könnyed kilátómegálló. Aktuális helyi útmutatás alapján válassz konkrét induló- és végpontot, valamint menekülési lehetőséget. A terep, kitettség és időjárás miatt a névleges menetidő félrevezető lehet a tényleges erőkifejtéshez képest.",
      usefulTips: [
        "Ellenőrizd a lezárásokat, az időjárást és a helyi biztonsági tanácsokat.",
        "Vigyél vizet és megfelelő felszerelést; visszajutási terv nélkül ne indulj el.",
      ],
    },
    "amalfi-coast-lemon-food": {
      name: "Citromos gasztronómiai megálló a partvidéken",
      shortDescription:
        "Programötlet: kérdezz a helyi citrusos termékekről egy választott élelmiszerüzletben.",
      detailedDescription:
        "Olyan terméken vagy fogáson át ismerd meg a partvidék gasztronómiáját, amely valóban érdekel. Kérdezz az alapanyagok eredetéről, és hasonlíts össze címkéket ahelyett, hogy minden emléktárgyról helyi készítést feltételeznél. Ez nem garantált gazdaságlátogatás, kóstoló vagy árusajánlás.",
      usefulTips: [
        "Ellenőrizd az összetevőket, alkoholtartalmat és allergéneket.",
        "Kóstoló elfogadása előtt tisztázd az árakat és a vásárlási feltételeket.",
      ],
    },
  },
} satisfies HungarianGuide;
