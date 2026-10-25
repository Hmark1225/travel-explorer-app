import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Mallorca",
  region: "Baleár-szigetek, Dél-Európa",
  tagline: "Városi utcák, hegyi utak, parti pihenők.",
  description:
    "A palmai városnézést idődhöz és képességeidhez illő települési vagy táji kirándulásokkal egyensúlyozd. A sziget nem egyetlen összefüggő strand; a hegyi séták és védett partszakaszok konkrét helyi tervezést kívánnak.",
  coordinateLabel:
    "Palma városi áttekintő pontja Mallorcához; nem a sziget középpontja",
  attractions: {
    "mallorca-palma-cathedral": {
      name: "Palmai székesegyház",
      shortDescription:
        "Figyelj meg egy jelentős gótikus épületet és kapcsolatát a vízparttal.",
      detailedDescription:
        "Kívülről kezdd a méretek és elhelyezkedés megértését, majd aktuális információ alapján dönts a belső látogatásról. A vallási használat és az elkülönülő látogatói területek befolyásolhatják a hozzáférést. A vízparti séta független a székesegyház belépésétől.",
      usefulTips: [
        "Ellenőrizd a látogatási rendet, az öltözködési útmutatást és az aktuális jegyeket.",
        "Ne feltételezd, hogy a teraszok vagy külön útvonalak a jegyhez tartoznak.",
      ],
    },
    "mallorca-bellver": {
      name: "Bellver vára",
      shortDescription:
        "Fedezz fel egy dombtetői várat és formájának kapcsolatát az alatta fekvő várossal.",
      detailedDescription:
        "A kör alaprajz és a magas fekvés két külön nézőpontot kínál egy vár megismeréséhez. A megközelítésre ugyanúgy hagyj időt, mint az épületre. A belső útvonalakat és múzeumi bemutatókat a környező tájtól külön kell ellenőrizni.",
      usefulTips: [
        "Tisztázd az aktuális belépést és nyitott területeket.",
        "Számolj a felvezető emelkedővel, vagy nézd meg a közlekedési lehetőségeket.",
      ],
    },
    "mallorca-soller": {
      name: "Séta Sóllerben",
      shortDescription:
        "Fedezd fel a település terét és a környező közutcákat.",
      detailedDescription:
        "Válassz rövid útvonalat, és hagyd, hogy a téren töltött idő adja meg a tempót. A város élő település; a közlekedési attrakciók és magánkertek külön programok. A forrásolt pont a települést azonosítja, nem túrakezdő helyet.",
      usefulTips: [
        "Egynapos kirándulás előtt ellenőrizd a továbbutazási lehetőségeket.",
        "Tartsd tiszteletben a magánudvarok és műhelyek határait.",
      ],
    },
    "mallorca-valldemossa": {
      name: "Séta Valldemossában",
      shortDescription:
        "Figyeld meg a kőburkolatú utcákat és a falusi épületek kapcsolatát a dombokkal.",
      detailedDescription:
        "Rövid séta is elég lehet a település megismeréséhez anélkül, hogy minden látogatható helyre betérnél. Lassíts az apró részletek kedvéért, és hagyj helyet a mindennapi életnek. Az áttekintő jelölő nem kolostor vagy múzeum bejárata.",
      usefulTips: [
        "Az egyes műemlékek belépési feltételeit külön ellenőrizd.",
        "Viselj lejtőkre és kőburkolatra alkalmas cipőt.",
      ],
    },
    "mallorca-alcudia": {
      name: "Séta Alcúdia óvárosában",
      shortDescription:
        "Fedezz fel közutcákat egy fallal övezett történelmi településen.",
      detailedDescription:
        "Ne csak egy falnézetre összpontosíts: figyeld meg a kapuk, utcák és nyitott terek közötti átmenetet. A közutcák hozzáférése nem jelenti, hogy az összes erődfalszakasz vagy régészeti terület is bejárható. A jelölő a települést azonosítja.",
      usefulTips: [
        "Lépcsőre felmenetel előtt ellenőrizd az engedélyezett fali útvonalakat.",
        "A piaci napokat nézd meg, ne számíts standokra minden látogatáskor.",
      ],
    },
    "mallorca-mondrago": {
      name: "Parti séta a Mondragó Természeti Parkban",
      shortDescription:
        "Tervezz meghatározott útvonalat védett tengerparti környezetben.",
      detailedDescription:
        "A körülményekhez illő utat válassz, és a strandolást a kirándulás választható részének tekintsd. A védett terület a látvány mellett felelősséggel is jár. Az aktuális helyi útmutatásban ellenőrizd a hozzáférést, parkolást és idényjellegű korlátozásokat.",
      usefulTips: [
        "Maradj a kijelölt utakon, és tartsd be a természetvédelmi tájékoztatókat.",
        "Ellenőrizd a tenger állapotát, vigyél vizet, és ne hagyj szemetet.",
      ],
    },
    "mallorca-serra-tramuntana": {
      name: "Gyalogtúra a Serra de Tramuntanában",
      shortDescription:
        "Hegyi programötlet, amelyhez konkrét útvonalat kell kiválasztani és ellenőrizni.",
      detailedDescription:
        "A hegység túl nagy ahhoz, hogy egyetlen túraként kezeld. Aktuális helyi információ alapján válassz útvonalat, mérd fel a terepet és időjárást, majd tervezd meg a visszajutást. A rövid időbecslés nem garantál könnyű körülményeket.",
      usefulTips: [
        "Indulás előtt ellenőrizd a pontos ösvényt, lezárásokat és közlekedést.",
        "Vigyél megfelelő cipőt, vizet és tájékozódási eszközt.",
      ],
    },
    "mallorca-palma-market": {
      name: "Nézelődés a Mercat de l’Olivar piacon",
      shortDescription:
        "Fedezz fel egy palmai élelmiszerpiacot, és az aktuális kínálatból vásárolj.",
      detailedDescription:
        "Figyeld meg a mindennapi bevásárlást, és döntés előtt hasonlíts össze standokat. Ez önálló piaclátogatás, nem szervezett kóstoló vagy árusajánlás. Kérdezz az eredetről és összetevőkről ahelyett, hogy minden termékről helyi készítést feltételeznél.",
      usefulTips: [
        "Külön kirándulás előtt ellenőrizd a kereskedési napokat.",
        "Tisztázd az árakat, allergéneket és adagméreteket.",
      ],
    },
  },
} satisfies HungarianGuide;
