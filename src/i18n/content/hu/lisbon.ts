import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Lisszabon",
  region: "Lisszaboni régió, Dél-Európa",
  tagline: "Kövesd a dombokat le a folyóig.",
  description:
    "Válassz kényelmes városrészi sétákat, néhány múzeumi vagy műemléki látogatást és időt a Tejo partján. A szintkülönbségek a kényelmes nap tervezésének részei, a vízparti megállók pedig más léptéket kínálnak.",
  coordinateLabel: "Lisszabon városi áttekintő pontja, nem helyszíni bejárat",
  attractions: {
    "lisbon-jeronimos": {
      name: "Jeromos-kolostor",
      shortDescription:
        "Figyelj meg egy jelentős belémi műemléket, elkülönítve látogatói területeit.",
      detailedDescription:
        "Kívülről kezdd, hogy érzékeld az épület méreteit és faragott részleteit. A belső látogatás a templom, kerengő vagy más részek aktuális rendjét kövesse; ne feltételezd, hogy egyetlen útvonal mindenre kiterjed. A vallási használat befolyásolhatja a programot.",
      usefulTips: [
        "Ellenőrizd a hivatalos jegyváltást és aktuális belépési útvonalakat.",
        "Tisztázd az akadálymentességet, és kövesd az öltözködési, illetve vallási útmutatást.",
      ],
    },
    "lisbon-belem-tower": {
      name: "Belém-torony és folyópart",
      shortDescription:
        "Értsd meg a tornyot folyóparti helyzete felől, a belső látogatást külön ellenőrizve.",
      detailedDescription:
        "A torony egy tágabb vízparti sétában is értelmet nyer, nem csupán önálló fénykép témájaként. Figyeld meg a folyóhoz és történelmi megközelítésekhez való viszonyát. Munkálatok, körülmények vagy látogatásszervezés korlátozhatják a nyilvános külső részen túli hozzáférést.",
      usefulTips: [
        "Ellenőrizd, jelenleg lehetséges-e belső látogatás.",
        "Maradj az engedélyezett vízparti utakon, és tartsd tiszteletben a biztonsági korlátokat.",
      ],
    },
    "lisbon-sao-jorge": {
      name: "Szent György vára",
      shortDescription:
        "Fedezz fel egy dombtetői nevezetességet, a látogatói útvonalra és városi kilátásokra figyelve.",
      detailedDescription:
        "A megközelítésre és a nyitott belső területekre is hagyj időt. Az erődített terek és kilátópontok egyenetlen felületekkel és szintkülönbségekkel járhatnak. A tágabb környezet is része az élménynek, de a belépést aktuális információ alapján tervezd.",
      usefulTips: [
        "Nézd meg a hivatalos belépési és akadálymentes útvonalakról szóló útmutatást.",
        "Viselj emelkedőkre és kőburkolatra alkalmas cipőt.",
      ],
    },
    "lisbon-alfama": {
      name: "Séta Alfamában",
      shortDescription:
        "Kövess kényelmesen teljesíthető útvonalat meredek utcákon és kisebb köztereken.",
      detailedDescription:
        "Alfama lakónegyed, nem üres, festői utcák sora. Olyan lassan sétálj, hogy észrevedd a részleteket, de hagyj teret a helyieknek. Rövid útvonal hasznosabb lehet minden kilátópont összekötésénél.",
      usefulTips: [
        "Tartsd tiszteletben a bejáratokat, és engedély nélkül ne fényképezd a helyieket.",
        "Számolj lépcsőkkel, és szükség esetén ellenőrizd a közlekedési alternatívákat.",
      ],
    },
    "lisbon-tile-museum": {
      name: "Nemzeti Csempemúzeum",
      shortDescription:
        "Fedezd fel a díszcsempéket tárgyként, építészeti felületként és képi történetként.",
      detailedDescription:
        "Válassz néhány tárlatot, amely bemutatja a csempék készítését és használatát, majd figyelj a kapcsolódó városi részletekre. A múzeumlátogatás különbözik a magánépületek csempéinek megtekintésétől. Külön utazás előtt ellenőrizd a nyitott termeket és hozzáférést.",
      usefulTips: [
        "Ellenőrizd az aktuális működést és a gyűjtemény hozzáférését.",
        "Kövesd a fényképezési szabályokat, és ne érj a kiállított felületekhez.",
      ],
    },
    "lisbon-oceanario": {
      name: "Oceanário de Lisboa",
      shortDescription:
        "Tervezz figyelmes tengeri élővilág-látogatást az intézmény aktuális bemutatói alapján.",
      detailedDescription:
        "Hagyj időt a társaságodnak a viselkedés megfigyelésére az üvegfelületek közötti sietség helyett. A tengeri program élőhelyekről és természetvédelemről indíthat beszélgetést, de itt sem adott állatot, sem előadást, sem kiegészítő programot nem ígérünk.",
      usefulTips: [
        "Ellenőrizd az aktuális jegyeket, kiállításokat és akadálymentességet.",
        "Tartsd tiszteletben a korlátokat, és ne kopogtasd az üveget.",
      ],
    },
    "lisbon-tejo-walk": {
      name: "Folyóparti séta Belémben",
      shortDescription:
        "Válassz nyilvános vízparti szakaszt és kényelmes visszafordulási pontot.",
      detailedDescription:
        "A folyó másfajta Lisszabont mutat, mint a domboldali utcák. Aktuális helyi térképen válassz összefüggő gyalogos útvonalat; a műemlékeket és frissítőket külön választható megállóként kezeld. Az időjárás és munkálatok befolyásolhatják az élményt.",
      usefulTips: [
        "Hagyd szabadon a kerékpáros útvonalakat, és a kijelölt átkelőket használd.",
        "Ellenőrizd a szelet és hőséget, és tervezd meg a visszautat.",
      ],
    },
    "lisbon-lisbon-food": {
      name: "Süteményes és kávés megálló Lisszabonban",
      shortDescription:
        "Programötlet: válassz önállóan egy cukrászdát vagy pékséget, és kérdezz a termékeiről.",
      detailedDescription:
        "Nézd meg az aktuális kínálatot, és válassz olyasmit, amit szívesen megismernél vagy megkóstolnál. Ez nem konkrét üzlet ajánlása, és nem garantál adott süteményt. Egy rövid étkezési szünet természetesen kapcsolódhat a városrészi sétához.",
      usefulTips: [
        "Az összetevőket és allergéneket az üzlettel tisztázd.",
        "Rendelés előtt ellenőrizd az elviteles és asztali kiszolgálási árakat.",
      ],
    },
  },
} satisfies HungarianGuide;
