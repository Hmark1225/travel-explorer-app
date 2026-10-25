import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Firenze",
  region: "Toszkána, Dél-Európa",
  tagline: "Művészet a következő sarkon.",
  description:
    "Fedezz fel egy jól bejárható várost reneszánsz gyűjteményekkel, folyami átkelőkkel és környékbeli műhelyekkel. Az elmélyült múzeumlátogatást kerti időtöltéssel és az Arnótól délre vezető nyugodtabb sétával egyensúlyozd.",
  coordinateLabel: "Firenze városi áttekintő pontja, nem helyszíni bejárat",
  attractions: {
    "florence-uffizi": {
      name: "Uffizi Képtár",
      shortDescription:
        "Kövesd a festészet fejlődését néhány gondosan kiválasztott reneszánsz alkotáson keresztül.",
      detailedDescription:
        "Válassz néhány képet, amelynél hosszabban időzöl, ne rohanj végig az összes termen. Hasonlítsd össze az alakok és tájak ábrázolását a különböző korszakokban, majd egy ablaknál megállva kösd össze a gyűjteményt a kinti Firenzével.",
      usefulTips: [
        "Ellenőrizd a galéria aktuális foglalási és belépési feltételeit.",
        "Hagyj időt a biztonsági ellenőrzésre, és nézd meg a csomagmegőrzés szabályait.",
      ],
    },
    "florence-duomo": {
      name: "Firenzei dóm és Piazza del Duomo",
      shortDescription:
        "Ismerd meg a székesegyház együttesét márványhomlokzata és a környező tér felől.",
      detailedDescription:
        "Járd körbe az együttest, mielőtt eldöntöd, mely belső részeket látogatod meg. A székesegyház, a kupola, a harangtorony és a többi terület külön élmény; a külső séta nem jelent hozzáférést az emlékmű minden részéhez.",
      usefulTips: [
        "Vásárlás előtt ellenőrizd, a jegy mely részekre érvényes.",
        "Nézd meg a lépcsőzési követelményeket és a vallási helyszínek öltözködési útmutatását.",
      ],
    },
    "florence-accademia": {
      name: "Galleria dell’Accademia",
      shortDescription:
        "Nézz közelről szobrokat, és a legismertebb alkotáson túlra is hagyj időt.",
      detailedDescription:
        "A galériában összevetheted a kész formákat a faragás folyamatával. Adj időt magadnak a szobortér befogadására, majd keresd fel a többi nyitott kiállítást is, ne egyetlen fényképre szűkítsd a látogatást.",
      usefulTips: [
        "A galériánál ellenőrizd az aktuális belépési és foglalási szabályokat.",
        "Tartsd be a fényképezési korlátozásokat, és hagyd szabadon a közlekedési útvonalakat.",
      ],
    },
    "florence-ponte-vecchio": {
      name: "Ponte Vecchio és az Arno",
      shortDescription:
        "Nézd meg a hidat a folyópartokról, mielőtt üzletei között átsétálnál.",
      detailedDescription:
        "Az Arno menti megközelítés segít megérteni a híd különleges, beépített formáját. Kényelmes tempóban kelj át, majd a túlpartról is nézz vissza. Ez köztéri séta, külön a vásárlástól vagy a híd feletti ellenőrzött hozzáférésű útvonaltól.",
      usefulTips: [
        "A folyóparti kilátópontokat a gyalogos út akadályozása nélkül használd.",
        "Ne feltételezd, hogy a kapcsolódó történelmi folyosók is látogathatók.",
      ],
    },
    "florence-boboli": {
      name: "Boboli-kert",
      shortDescription:
        "Fedezz fel lejtőkkel, szobrokkal és változó nézőpontokkal alakított kertet.",
      detailedDescription:
        "A Boboli inkább kerti sétaként érdekes, mint a látnivalók közötti rövidítésként. Válassz kényelmes útvonalat, és figyeld meg, hogyan keretezi a növényzet és az építészet a várost. A domborzatot és a kitett szakaszokat vedd figyelembe a program hosszánál.",
      usefulTips: [
        "Ellenőrizd az aktuális hozzáférést és az időjárás miatti lezárásokat.",
        "Vigyél vizet, és indulás előtt tisztázd az akadálymentes útvonalakat.",
      ],
    },
    "florence-piazzale-michelangelo": {
      name: "Séta a Piazzale Michelangelóhoz",
      shortDescription:
        "A városra nyíló széles panorámához vezető emelkedőt is tedd a séta részévé.",
      detailedDescription:
        "Az élményt az utcák szintjéről a háztetők és dombok tágabb látványába való fokozatos átmenet adja. A mozgásképességedhez illő utat válassz, és menet közben is állj meg visszanézni. A tér közös köztér, nem lefoglalt kilátóhely.",
      usefulTips: [
        "Számolj emelkedővel, vagy ellenőrizd a helyi közlekedési alternatívákat.",
        "Fényképezés közben se állj az úttestre.",
      ],
    },
    "florence-oltrarno": {
      name: "Séta Oltrarnóban",
      shortDescription:
        "Fedezz fel műhelyeket, kis utcákat és mindennapi életet a folyó déli oldalán.",
      detailedDescription:
        "Hagyj rugalmasságot egy nyitott műhelynél vagy csendes téren való megállásra. A kézművesek munkahelyei üzletek, nem kiállítások, ezért belépés és fényképezés előtt kérj engedélyt. Rövid útvonal kávészünettel gyakran többet ad, mint egy hosszú ellenőrzőlista.",
      usefulTips: [
        "Kérj engedélyt az alkotók és munkáik fényképezéséhez.",
        "Ellenőrizd az egyes műhelyek nyitvatartását és vásárlási feltételeit.",
      ],
    },
    "florence-sant-ambrogio": {
      name: "Nézelődés a Sant’Ambrogio piacon",
      shortDescription:
        "Fedezz fel egy környékbeli élelmiszerpiacot, és aznapi kínálatból válassz étkezést.",
      detailedDescription:
        "A nyitva tartó standoknál hasonlítsd össze az idényterményeket és készételeket. Ez önálló piaclátogatás, nem konkrét árus ajánlása vagy garantált kóstoló. A megállót az összetevőkre vonatkozó kérdéseid és az étvágyad alakítsák.",
      usefulTips: [
        "Külön utazás előtt ellenőrizd a kereskedési napokat.",
        "Az árakat és allergéneket minden árusnál közvetlenül tisztázd.",
      ],
    },
  },
} satisfies HungarianGuide;
