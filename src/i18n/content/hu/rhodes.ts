import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Rodosz",
  region: "Dodekanészosz, Dél-Európa",
  tagline: "Egy kicsit közelebb a paradicsomhoz.",
  description:
    "Kövesd a napsütötte utcákat a középkori óvárosban, mártózz meg türkizkék öblökben, és időzz el egy hosszú ebéd mellett az Égei-tengernél. Rodoszon a ráérős szigeti napok évszázadok történelmével találkoznak.",
  coordinateLabel:
    "Rodosz korábbi áttekintő úti célpontja; a földrajzi forrás ellenőrzésre vár",
  attractions: {
    "rhodes-old-town": {
      name: "Rodosz középkori óvárosa",
      shortDescription:
        "Sétálj egy ma is élő, fallal körülvett városrészben, a csendes sikátoroktól a Lovagok utcájáig.",
      detailedDescription:
        "Rodosz óvárosát érdemes céltalanul is felfedezni, nem csupán a műemlékek közötti legrövidebb utat követni. Figyeld meg, hogyan váltják fel a széles kőburkolatú utcákat a szűk lakóutcák, majd időzz el a lovagok nagy épületei előtt. Történelmi helyszín és lakónegyed egyszerre: a falak mögött ma is élnek és dolgoznak.",
      usefulTips: [
        "Viselj az egyenetlen macskakövön is jól tapadó cipőt.",
        "A lakóutcákban beszélj halkan, és hagyj helyet az áruszállításnak.",
      ],
    },
    lindos: {
      name: "Lindoszi akropolisz",
      shortDescription:
        "Kapaszkodj fel Lindosz fölé az ókori emlékekhez és a tengerparti panorámához.",
      detailedDescription:
        "Az akropoliszt az alatta fekvő faluval együtt érdemes megismerni. Magas fekvése segít megérteni, miért volt fontos ez a földnyelv már jóval a modern tengerparti nyaralások előtt is. Szánj időt a fennmaradt építményekre, ne csak a kilátóhoz siess; a felvezető út is az élmény része.",
      usefulTips: [
        "Vigyél ivóvizet és napvédelmet.",
        "Indulás előtt ellenőrizd a jegyváltást és az akadálymentes megközelítést; az út emelkedővel jár.",
      ],
    },
    "palace-grand-master": {
      name: "A Nagymester palotája",
      shortDescription:
        "Fedezd fel a középkori város felső részének monumentális, erődített palotáját.",
      detailedDescription:
        "A palota tekintélyes ellenpontja a környező szűk utcáknak. Figyeld meg a védelmi jellegű külső és az ünnepélyes terek kapcsolatát, és ne feledd, hogy a helyreállítás is az épület történetéhez tartozik. A Lovagok utcájával érdemes összekötni, nem pedig ugyanarra a délutánra szigeten átívelő utazást tervezni.",
      usefulTips: [
        "Ellenőrizd, mely belső termek és kiállítások látogathatók.",
        "Ne feltételezd, hogy egy óvárosi séta tartalmazza a palota belépőjét.",
      ],
    },
    "rhodes-archaeological-museum": {
      name: "Rodoszi Régészeti Múzeum",
      shortDescription:
        "Ismerd meg a sziget régészetét a lovagok egykori kórházában.",
      detailedDescription:
        "A múzeum segít összefüggéseiben látni a sziget romjait, nem csupán különálló megállóként. Figyeld meg a tárgyak és az őket befogadó történelmi épület kapcsolatát, valamint azt, hogyan alakítja az építészet a látogatást. Válassz néhány tárlót, amelyet alaposabban megnézel, ahelyett hogy minden feliratot egyszerre próbálnál befogadni.",
      usefulTips: [
        "Ellenőrizd a múzeumnál az aktuálisan megnyitott termeket és a belépés feltételeit.",
        "Gyerekekkel válassz rövid tárgykereső feladatot a teljes múzeumi maraton helyett.",
      ],
    },
    "mandraki-harbor": {
      name: "Séta a Mandraki kikötőben",
      shortDescription:
        "Kövesd a vízpartot hajók, kikötői látképek és nyugodtabb pillanatok kedvéért.",
      detailedDescription:
        "A kikötői séta kellemes léptékváltás az óváros zárt utcái után. Nézd a dolgozó hajókat, és tekints vissza a vízpart épületeire. Ez kötetlen program, nem rögzített vezetett útvonal: válassz kényelmes szakaszt, és fordulj vissza, amikor pihenni szeretnél.",
      usefulTips: [
        "Maradj távol a munkavégzésre használt rakpartoktól és a járműbejáróktól.",
        "Vigyél szél ellen védő felsőt, ha hosszabban időznél a víznél.",
      ],
    },
    "elli-beach": {
      name: "Elli strand",
      shortDescription:
        "Kösd össze a városnézést egy tengerparti szünettel Rodosz városánál.",
      detailedDescription:
        "Az Elli praktikus választás, ha külön, szigeten átvezető kirándulás nélkül szeretnél a partra menni. Városi tengerpartként gondolj rá, ne eldugott öbölként. Az aznapi körülmények alapján válassz helyet, és hagyj időt egy nyugodt vízparti sétára is.",
      usefulTips: [
        "Vízbe lépés előtt ellenőrizd a helyi fürdési tanácsokat és a tenger állapotát.",
        "Ne feltételezd, hogy napágyak, szolgáltatások vagy felügyelt fürdőzés rendelkezésre állnak.",
      ],
    },
    "anthony-quinn-bay": {
      name: "Anthony Quinn-öböl",
      shortDescription:
        "Fedezz fel egy kisebb, sziklás öblöt a sziget keleti partján.",
      detailedDescription:
        "Itt a sziklás part és a tisztának tűnő víz együttese a vonzerő, nem a látnivalókkal szegélyezett hosszú sétány. Szánj időt biztonságos pihenőhely keresésére és az öböl szárazföldről való megfigyelésére. A fürdésről a tényleges körülmények, saját képességeid és a helyi útmutatás alapján dönts.",
      usefulTips: [
        "A sziklás megközelítéshez megfelelő lábbeli szükséges.",
        "Helyben ellenőrizd a megközelítést, parkolást és idényjellegű szolgáltatásokat; a szemetet vidd magaddal.",
      ],
    },
    "butterfly-valley": {
      name: "Pillangók völgye",
      shortDescription:
        "Válassz árnyas erdei kirándulást, amelynek középpontjában a csendes megfigyelés áll.",
      detailedDescription:
        "A völgy Rodosz másik arcát mutatja a nyílt strandok és kővárosok után. Kövesd a kijelölt utakat, és figyeld meg az erdei környezetet. A völgyhöz kapcsolódó rovarok szezonálisan láthatók, ezért természetjárásként tervezz vele, ne garantált állatbemutatóként.",
      usefulTips: [
        "Utazás előtt ellenőrizd a szezonális hozzáférést és a megfigyelés várható esélyét.",
        "Ne tapsolj, ne rázd az ágakat, és ne zavard a pihenő rovarokat.",
      ],
    },
    "kallithea-springs": {
      name: "Kallithea forrásai",
      shortDescription:
        "Figyeld meg egy történelmi fürdőegyüttes tengerparti építészetét és udvarait.",
      detailedDescription:
        "Kallitheában a tenger melletti épített környezet kerül előtérbe. Lassíts le a mintázatok, keretezett látképek és a belső-külső terek átmenetei kedvéért. A történelmi fürdőjelleg nem jelenti azt, hogy ma is működő termálfürdőzésre számíthatsz.",
      usefulTips: [
        "Ellenőrizd, a látogatás napján mely részek hozzáférhetők.",
        "A strand megközelítéséről és a rendezvények miatti korlátozásokról külön érdeklődj.",
      ],
    },
    "rhodes-aquarium": {
      name: "Rodoszi Akvárium",
      shortDescription:
        "Tervezz rövidebb, tengeri élővilággal foglalkozó programot Rodosz városának északi végén.",
      detailedDescription:
        "Családoknak egy kisebb beltéri megálló jó változatosság lehet a hosszú, napsütéses séták mellett. A gyerekek válasszanak egy tengeri élőhelyet vagy állatot, majd kapcsoljátok a beszélgetést a kinti tengerparthoz. A kiállításokat és a bejutást ellenőrizni kell, nem érdemes régebbi útikalauzokra hagyatkozni.",
      usefulTips: [
        "Először ellenőrizd az aktuális működést, jegyeket és kiállításokat.",
        "A babakocsis és akadálymentes megközelítésről az intézménynél érdeklődj.",
      ],
    },
    "rhodes-taverna-table": {
      name: "Egy rodoszi taverna asztalánál",
      shortDescription:
        "Programötlet: osszatok meg egy étkezést, és kérdezzetek a helyi, szezonális fogásokról.",
      detailedDescription:
        "Ez étkezési megközelítés, nem egy konkrét étterem ajánlása. Leülés előtt olvasd el az étlapot, és kérdezd meg, mely ételek tükrözik a sziget konyháját. Néhány közösen választott fogásból kellemes, ráérős étkezés lehet, de az adagok, hozzávalók és elérhetőség az adott konyhától függnek.",
      usefulTips: [
        "Jelezd az allergiákat, és ellenőrizd a hozzávalókat ahelyett, hogy az étel nevére hagyatkoznál.",
        "Rendelés előtt nézd meg az árakat és az esetleges terítékdíjat.",
      ],
    },
    "koskinou-village": {
      name: "Séta Koskinou faluban",
      shortDescription:
        "Fedezz fel hagyományos falusi utcákat tisztelettel és kényelmes tempóban.",
      detailedDescription:
        "Az utcák és házfrontok apró részleteit keresd, ne látogatható attrakcióként kezeld a magánházakat. Rövid séta lehet belőle kávézós megállóval, ha találsz nyitva megfelelő helyet. Hagyj teret a mindennapi életnek, és a helyiek fényképezése előtt kérj engedélyt.",
      usefulTips: [
        "Meghívás nélkül ne lépj be udvarokba vagy otthonokba.",
        "Még Rodosz városának elhagyása előtt ellenőrizd a továbbutazási lehetőségeket.",
      ],
    },
  },
} satisfies HungarianGuide;
