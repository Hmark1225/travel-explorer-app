import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Szantorini",
  region: "Kükládok, Dél-Európa",
  tagline: "Nézz a képeslap mögé is.",
  description:
    "Kösd össze a régészeti összefüggéseket a falusi utcákkal, parti időtöltéssel és átgondolt sétákkal. A sziget lakott táj; a nyilvános hozzáférés, tengeri körülmények és gyalogutak alakítsák az egyes napokat.",
  coordinateLabel:
    "Firá települési áttekintő pontja Szantorinihez; nem a sziget középpontja vagy sziklaparti út bejárata",
  attractions: {
    "santorini-akrotiri": {
      name: "Akrotiri régészeti lelőhelye",
      shortDescription:
        "Fedezz fel egy védőépület alatt feltárt bronzkori települést.",
      detailedDescription:
        "Egyetlen nézőpontból az egész ősi várost elképzelni helyett figyeld az utcák és épületek szerveződését. Ez szabályozott régészeti látogatás, külön az azonos nevű mai falutól.",
      usefulTips: [
        "Ellenőrizd az aktuális hozzáférést és a jegyváltás feltételeit.",
        "Kövesd a járófelületeket, és ne lépj be az ásatási területekre.",
      ],
    },
    "santorini-prehistoric-museum": {
      name: "Őskori Théra Múzeuma",
      shortDescription:
        "Régészeti tárgyak segítségével értsd meg a sziget ókori településeinek összefüggéseit.",
      detailedDescription:
        "Ez jó alkalom a lelassulásra egy tájra összpontosító kirándulás után. Válassz néhány tárgyat vagy kiállítási témát, és kapcsold őket a sziget ásatási helyszíneihez. Az aktuális termeket és tárlatokat a múzeumnál ellenőrizd.",
      usefulTips: [
        "Közvetlenül ellenőrizd a nyitott termeket és a belépést.",
        "Hagyj időt az ismertetőkre, ne csak rövid megállóként kezeld a múzeumot.",
      ],
    },
    "santorini-fira": {
      name: "Séta Firában",
      shortDescription:
        "Fedezd fel a sziget központi települését rugalmas útvonallal és nyilvános kilátópontokkal.",
      detailedDescription:
        "Válts a forgalmas bevásárlóutcák és csendesebb közutcák között, de ne feltételezd, hogy minden kalderára néző terasz látogatható. A térképpont forrásból származó települési áttekintés, nem ellenőrzött bejárat vagy útvonal.",
      usefulTips: [
        "Maradj a nyilvános utakon, és tartsd tiszteletben a magánteraszokat.",
        "Ellenőrizd a helyi közlekedést, és a zsúfolt megközelítésekre hagyj több időt.",
      ],
    },
    "santorini-oia": {
      name: "Séta Oiában",
      shortDescription:
        "Figyeld meg a sziklaoldali épületek, utcák és a tágabb környezet kapcsolatát.",
      detailedDescription:
        "Oia utcáin hagyj időt az építészeti részletekre is a távoli panorámák mellett. A település utcái ma is lakott környezet részei. Az áttekintő pont a falut azonosítja; nem foglal kilátóhelyet, és nem igazol sétaútvonalat.",
      usefulTips: [
        "Fényképért ne mássz tetőkre, és ne lépj magánlépcsőkre.",
        "Hagyd szabadon a szűk átjárókat, és kövesd a helyi tömegkezelési útmutatást.",
      ],
    },
    "santorini-pyrgos": {
      name: "Séta Pyrgos faluban",
      shortDescription:
        "Fedezz fel egy dombon fekvő falut a lejtős utcákhoz illő tempóban.",
      detailedDescription:
        "Ne siess pusztán a legmagasabb elérhető pontra: figyeld meg, hogyan követik az épületek és átjárók a dombot. A kis közterek jó pihenőhelyek lehetnek. Az egyes templomoknak és üzleteknek saját látogatási feltételeik vannak.",
      usefulTips: [
        "Számolj lépcsőkkel és egyenetlen felületekkel.",
        "Templomba belépés előtt kérdezz, és tartsd tiszteletben a szertartások idejét.",
      ],
    },
    "santorini-kamari": {
      name: "Kamari strand",
      shortDescription:
        "Válassz tengerparti sétát vagy strandolós szünetet a sziget keleti oldalán.",
      detailedDescription:
        "Rugalmas parti programként gondolj rá, ne a fürdési körülmények vagy díjban foglalt strandszolgáltatások ígéreteként. Keress nyilvános lejáratot, és a tényleges időjárás, illetve körülmények alapján döntsd el, meddig maradsz.",
      usefulTips: [
        "Ellenőrizd a helyi fürdési útmutatást és a tenger állapotát.",
        "A forró vagy egyenetlen parti felületeken használj megfelelő lábbelit.",
      ],
    },
    "santorini-fira-imerovigli": {
      name: "Gyalogos program Firá és Imerovigli között",
      shortDescription:
        "Tervezz meg egy konkrét szakaszt a kaldera menti gyalogúthálózaton.",
      detailedDescription:
        "Saját képességeidhez illő induló- és végpontot válassz, ne feltételezd, hogy a teljes út könnyű séta. Lépcsők, kitett szakaszok és változó körülmények is előfordulhatnak. Indulás előtt ellenőrizni kell a nyilvános út hozzáférhetőségét.",
      usefulTips: [
        "Ellenőrizd az út állapotát; nem megfelelő időben kerüld a kitett részeket.",
        "Vigyél vizet, és tervezd meg a hazajutást a választott végpontról.",
      ],
    },
    "santorini-island-food": {
      name: "Szigeti alapanyagokra épülő étkezés",
      shortDescription:
        "Programötlet: kérdezz a sziget alapanyagairól egy általad választott vendéglátóhelyen.",
      detailedDescription:
        "A szezonális terményekről feltett kérdések alakítsák az étkezést, ne egy garantált kóstolómenüt keress. Érdeklődj a helyi beszerzésről és az elkészítés módjáról. Az ötlet nem ajánl vagy ígér konkrét éttermet, borászatot vagy gazdaságot.",
      usefulTips: [
        "A hozzávalókat és allergének kezelését a személyzettel tisztázd.",
        "Rendelés előtt ellenőrizd az árakat és az esetleges kóstolási feltételeket.",
      ],
    },
  },
} satisfies HungarianGuide;
