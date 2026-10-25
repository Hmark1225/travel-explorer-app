import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Bécs",
  region: "Bécs, Közép-Európa",
  tagline: "Nagyszabású terek, ráérős pillanatok.",
  description:
    "A jelentős gyűjteményeket és reprezentatív építészetet körúti sétával és kávéházi pihenővel egyensúlyozd. Gondosan válassz konkrét helyszínt és jegytartalmat ahelyett, hogy a nagy palota- vagy parkegyütteseket egyetlen attrakcióként kezelnéd.",
  coordinateLabel: "Bécs városi áttekintő pontja, nem helyszíni bejárat",
  attractions: {
    "vienna-schonbrunn": {
      name: "Schönbrunni kastély és park",
      shortDescription:
        "Válassz kastélyra vagy kertre összpontosító látogatást, ne feltételezd, hogy egy jegy mindenre érvényes.",
      detailedDescription:
        "A belépés megszervezése előtt döntsd el, az együttes mely része a fő célod. A dísztermek, kertek és további attrakciók külön élmények. Kezelhető válogatással több idő jut a környezet megértésére, mint egy zsúfolt programlistával.",
      usefulTips: [
        "Ellenőrizd a hivatalos jegyek tartalmát és az időpontra szóló belépést.",
        "Tisztázd az akadálymentes útvonalakat és az egyes kertrészek külön feltételeit.",
      ],
    },
    "vienna-belvedere": {
      name: "Belvedere",
      shortDescription:
        "Fedezz fel művészetet és palotaépítészetet tudatosan megválasztott látogatással.",
      detailedDescription:
        "Figyeld meg, hogyan keretezi egymást a gyűjtemény és az épület. Az elnevezés több látogatói teret takar, ezért a ténylegesen felkeresni kívánt helyszínt és tárlatot válaszd ki. A kert hozzáférése nem jelent belépést minden belső térbe.",
      usefulTips: [
        "Ellenőrizd, mely épületet és kiállításokat tartalmazza a jegy.",
        "Nézd meg az aktuális hozzáférési és fényképezési útmutatást.",
      ],
    },
    "vienna-kunsthistorisches": {
      name: "Szépművészeti Múzeum, Bécs",
      shortDescription:
        "Építs művészeti látogatást egy választott gyűjteményi téma köré nagyszabású belső térben.",
      detailedDescription:
        "Válassz néhány érdeklődésedhez kapcsolódó termet, és hagyj időt az alapos szemlélődésre. A díszített belső tér figyelmet érdemel, de ne változtassa a látogatást minden terem közötti rohanássá. Az aktuális bemutatók alakítsák az útvonalat.",
      usefulTips: [
        "Ellenőrizd a nyitott termeket és az időszaki kiállítások feltételeit.",
        "Tisztázd a csomagmegőrzési és fényképezési szabályokat.",
      ],
    },
    "vienna-st-stephens": {
      name: "Bécsi Szent István-székesegyház",
      shortDescription:
        "Közelíts egy központi nevezetességhez működő székesegyházként, külön látogatói területekkel.",
      detailedDescription:
        "Először a külső részt és a környező utcákban elfoglalt helyét nézd meg. A belső vagy toronylátogatás igazodjon a vallási használathoz és az érvényes hozzáférési szabályokhoz. Ne feltételezd, hogy egyetlen belépési feltétel az épület minden részére vonatkozik.",
      usefulTips: [
        "Ellenőrizd az aktuális szertartási, látogatási és toronybelépési rendet.",
        "Öltözz tiszteletteljesen, és a kilátók lépcsőzési követelményeit tisztázd.",
      ],
    },
    "vienna-ringstrasse": {
      name: "Építészeti séta a Ringstrassén",
      shortDescription:
        "Válassz egy körútszakaszt középületek és városi terek összehasonlítására.",
      detailedDescription:
        "A Ringstrasséra saját tervezésű útvonalként tekints, ne egyetlen teljesítendő látnivalóként. Válassz kényelmes szakaszt, és figyeld meg a középületek körúthoz való viszonyát. A belső látogatások, előadások és vezetések a sétától külön programok.",
      usefulTips: [
        "A forgalom és villamossínek környékén a kijelölt átkelőket használd.",
        "Ne feltételezz szabad belépést: az egyes épületek hozzáférését külön ellenőrizd.",
      ],
    },
    "vienna-prater": {
      name: "Séta a Práterben",
      shortDescription:
        "A társaság érdeklődése alapján válassz zöldterületi vagy vidámparki programot.",
      detailedDescription:
        "A Práter különféle élményeket kínál a sétától az önállóan üzemeltetett attrakciókig. Döntsd el, mi illik a csoporthoz, és minden játékot vagy programot külön választásként kezelj. Itt nem garantáljuk egyetlen játék működését, árát vagy korosztályi alkalmasságát.",
      usefulTips: [
        "Ellenőrizd az egyes attrakciók szabályait és aktuális működését.",
        "Egyeztessetek találkozópontot, és szükség esetén tisztázzátok az akadálymentességet.",
      ],
    },
    "vienna-naschmarkt": {
      name: "Nézelődés a Naschmarkton",
      shortDescription:
        "Járd be az élelmiszeres standokat és üzleteket, időt hagyva az ajánlatok összevetésére.",
      detailedDescription:
        "Olvasd el az étlapokat és címkéket ahelyett, hogy minden terméket vagy standot egyetlen helyi hagyomány képviselőjének gondolnál. Ez önálló piaclátogatás, nem kóstolócsomag. Vásárlás előtt kérdezz az alapanyagokról és az eredetről.",
      usefulTips: [
        "A kereskedési napokat és üzleti nyitvatartást külön ellenőrizd.",
        "Tisztázd az árakat, adagméreteket és az allergéneket.",
      ],
    },
    "vienna-coffeehouse": {
      name: "Bécsi kávéházi pihenő",
      shortDescription:
        "Programötlet: válassz kávézót, és szánj időt egy lassabb megállóra.",
      detailedDescription:
        "A kávéházi látogatás legyen pihenő, ne egyetlen jóváhagyott cím keresése. Olvasd el az étlapot, kérdezz az ismeretlen tételekről, és döntsd el, italt, ételt vagy mindkettőt szeretnél. Az útikalauz nem ajánl konkrét intézményt.",
      usefulTips: [
        "Ellenőrizd az étlap árait és az asztali kiszolgálás feltételeit.",
        "Tiszteld a többi vendéget, és belső fénykép készítése előtt kérj engedélyt.",
      ],
    },
  },
} satisfies HungarianGuide;
