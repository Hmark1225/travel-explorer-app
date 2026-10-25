import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Nápoly",
  region: "Campania, Dél-Európa",
  tagline: "Egy város összetéveszthetetlen lüktetéssel.",
  description:
    "Kapcsold össze a régészeti gyűjteményeket, történelmi rétegeket őrző utcákat és a működő vízpartot. Hagyj helyet egy aznap választott étkezésnek, és a beltéri látogatásokat a körülöttük zajló köztéri élettől külön tervezd.",
  coordinateLabel: "Nápoly városi áttekintő pontja, nem helyszíni bejárat",
  attractions: {
    "naples-archaeological-museum": {
      name: "Nápolyi Nemzeti Régészeti Múzeum",
      shortDescription:
        "Ősi tárgyakon keresztül helyezd összefüggésbe a környék régészeti helyszíneit.",
      detailedDescription:
        "Válassz néhány gyűjteményi témát, és nézd meg, hogyan használták a tárgyakat, ne elszigetelt kincsként kezeld őket. A múzeum előkészíthet egy későbbi régészeti kirándulást, de kiállításai és a környező lelőhelyek külön látogatások.",
      usefulTips: [
        "Ellenőrizd a múzeumnál az aktuális termeket és jegyfeltételeket.",
        "Hagyj időt szünetre az összes terem előre megtervezése helyett.",
      ],
    },
    "naples-spaccanapoli": {
      name: "Séta Spaccanapoli történelmi környékén",
      shortDescription:
        "Kövess nyüzsgő óvárosi útvonalat, rövidebb kitérőknek is helyet hagyva.",
      detailedDescription:
        "Az élményt a szűk utcák, templomfrontok és mindennapi kereskedelem kapcsolata adja. A negyed ritmusában haladj, és válassz néhány megállót. Templomba, műhelybe vagy más intézménybe belépéskor az adott hely feltételeit külön ellenőrizni kell.",
      usefulTips: [
        "Figyelj az áruszállító járművekre és robogókra.",
        "Emberek vagy műhelybelsők fényképezése előtt kérj engedélyt.",
      ],
    },
    "naples-sansevero": {
      name: "Sansevero-kápolna",
      shortDescription:
        "Tervezz figyelmes látogatást egy szobrászati alkotásokkal sűrűn berendezett belső térbe.",
      detailedDescription:
        "Itt a közeli szemlélődés fontosabb, mint a megtett távolság. Figyeld meg, hogyan hatnak együtt a szobrok, az anyagok és a terem díszítései. A hozzáférést aktuális hivatalos információ alapján szervezd, ne feltételezz azonnali bejutást.",
      usefulTips: [
        "A kápolnánál ellenőrizd a foglalás és a fényképezés szabályait.",
        "Hagyj időt a megadott belépési folyamatra, a közeli utcák akadályozása nélkül.",
      ],
    },
    "naples-castel-dell-ovo": {
      name: "Castel dell’Ovo és Borgo Marinari kívülről",
      shortDescription:
        "Járd be egy meghatározó tengerparti vár vízparti környezetét.",
      detailedDescription:
        "A vár elhelyezkedése a látvány nagy részét akkor is megmagyarázza, ha csak kívülről nézed meg. Ahol engedélyezett, fedezd fel a nyilvános vízparti megközelítéseket, és tekints vissza a városra. A külső útvonal nem ígéret a vár belsejének látogathatóságára.",
      usefulTips: [
        "Ellenőrizd az aktuális munkálatokat és hozzáférési korlátozásokat.",
        "A vízparti forgalom környékén a kijelölt gyalogos útvonalakat használd.",
      ],
    },
    "naples-lungomare": {
      name: "Séta a Lungomare vízpartján",
      shortDescription:
        "Tarts lassabb városi szünetet a vízpart egy választott szakaszán.",
      detailedDescription:
        "Válassz kényelmes szakaszt, amelyen a változó partvonal látványa a fő élmény. A kávészünet választható, a sétától független megálló. Az időjárás és rendezvények alakíthatják a körülményeket, ezért a rugalmas visszaút többet ér egy merev menetrendnél.",
      usefulTips: [
        "Ellenőrizd az időjárást, és rossz körülmények között kerüld a kitett partszéleket.",
        "Hagyd szabadon a kerékpársávokat és gyalogátkelőket.",
      ],
    },
    "naples-capodimonte": {
      name: "Capodimonte múzeuma és parkja",
      shortDescription:
        "Köss össze egy elmélyült művészeti látogatást a környező park külön sétájával.",
      detailedDescription:
        "Érkezés előtt döntsd el, hogy a múzeum vagy a park a fő célod. A gyűjtemények közeli szemlélődésre hívnak, a kert pedig ritmusváltást adhat. Nem szabad feltételezni, hogy azonos a nyitvatartásuk vagy a hozzáférésük.",
      usefulTips: [
        "Ellenőrizd, mely termek és parki bejáratok vannak nyitva.",
        "Tervezd meg a visszajutást, és szükség esetén tisztázd az akadálymentességet.",
      ],
    },
    "naples-san-gennaro": {
      name: "San Gennaro-katakombák",
      shortDescription:
        "Közelíts egy föld alatti örökségi helyszínhez történelmi és vallási összefüggésein keresztül.",
      detailedDescription:
        "Hagyj időt a temetkezési terek és a változó vallási hagyományok értelmezésére. Egy föld alatti helyszín felkeresése külön, szervezett látogatás, nem pusztán városrészi séta. Tervezés előtt ellenőrizd a tényleges látogatási formát.",
      usefulTips: [
        "Nézd meg az aktuális vezetések, nyelvek és foglalások feltételeit.",
        "Foglalás előtt kérdezz a lépcsőkről, burkolatokról és akadálymentességről.",
      ],
    },
    "naples-pizza": {
      name: "Egy nápolyi pizzaétkezés",
      shortDescription:
        "Programötlet: hasonlíts össze étlapokat, és pizzázz egy általad választott helyen.",
      detailedDescription:
        "Figyelj a tésztára, feltétekre és az étkezés ritmusára ahelyett, hogy egyetlen kötelező vendéglőt hajszolnál. Az útikalauz nem ajánl konkrét üzletet, és nem garantál sorban állás nélküli asztalt. Olyan helyet válassz, amelynek étlapja és feltételei megfelelnek neked.",
      usefulTips: [
        "Rendelés előtt ellenőrizd az étlapot, valamint az esetleges teríték- és szervizdíjat.",
        "Az allergiákról közvetlenül beszélj a személyzettel; a hagyományos recept nem étrendi garancia.",
      ],
    },
  },
} satisfies HungarianGuide;
