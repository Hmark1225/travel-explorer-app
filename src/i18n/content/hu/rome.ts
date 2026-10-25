import type { HungarianGuide } from "../../types";
export const guide = {
  name: "Róma",
  region: "Lazio, Dél-Európa",
  tagline: "Minden utca történetet mesél.",
  description:
    "Ókori csodák, környékbeli trattoriák és aranyló esti fények. Találd meg saját ritmusodat az Örök Városban, a monumentális romoktól egy csendes téren elfogyasztott tökéletes eszpresszóig.",
  coordinateLabel:
    "Róma korábbi áttekintő úti célpontja; a földrajzi forrás ellenőrzésre vár",
  attractions: {
    colosseum: {
      name: "Colosseum",
      shortDescription:
        "Ismerd meg Róma nagy amfiteátrumának méreteit és szerkezetét kívülről és belülről.",
      detailedDescription:
        "Belépés előtt járd körbe a külső oldalt, hogy átlásd az ívek és szintek rendszerét. Bent ne csak a híres arénanézetre figyelj, hanem a nézők elhelyezésére és a látványosságok működtetésére is. A különböző látogatási lehetőségek eltérő részekre szólhatnak, ezért vásárlás előtt gondosan ellenőrizd a jegyet.",
      usefulTips: [
        "A park hivatalos jegyinformációit használd, és ellenőrizd a belépési követelményeket.",
        "Hagyj időt a biztonsági ellenőrzésre; nem minden jegy tartalmazza a föld alatti részeket.",
      ],
    },
    trevi: {
      name: "Trevi-kút",
      shortDescription:
        "Figyeld meg a látványos barokk kutat, ahol a szobrászat és az utcai élet találkozik.",
      detailedDescription:
        "A kutat egységes díszletként érdemes nézni: a sziklák, alakok, víz és a mögöttük álló épület együtt hatnak. Lépj kissé távolabb a legsűrűbb fotózóhelytől, hogy befogadhasd az összképet. A megközelítés szabályai változhatnak; egy ismerős köztér nem bizonyítja az aktuális belépési feltételeket.",
      usefulTips: [
        "Látogatás előtt ellenőrizd a megközelítés és a hozzáférés aktuális szabályait.",
        "Tömegben tartsd magad közelében a csomagjaidat, és kövesd a korlátokat, illetve a személyzet utasításait.",
      ],
    },
    "roman-forum": {
      name: "Forum Romanum és Palatinus",
      shortDescription:
        "Kövesd a polgári és császári Róma emlékeit egy kiterjedt régészeti területen.",
      detailedDescription:
        "Ez töredékekből összeálló táj, nem egyetlen épület. Válassz néhány fő pontot, és elhelyezkedésük alapján képzeld el a közöttük egykor lévő köztereket. A Forum és a Palatinus összekötése élmény lehet, de a távolságok és a kitett szakaszok miatt fontosabb a jó tempó, mint a zsúfolt programlista.",
      usefulTips: [
        "Vigyél vizet és az egyenetlen régészeti utakra alkalmas cipőt.",
        "Ellenőrizd a jeggyel látogatható területeket és az újbóli belépés szabályait.",
      ],
    },
    pantheon: {
      name: "Pantheon",
      shortDescription:
        "Nézz fel a nyitott oculus köré szervezett, különleges kupolás térbe.",
      detailedDescription:
        "Figyeld meg az átmenetet a nyüzsgő térről az előcsarnokba, majd a belső tér hirtelen kitágulását. A kör alakú tér és a változó fény jelentik az élmény középpontját. Az épület vallási helyszín is, ezért alkalmazkodj a szertartásokhoz és az aznapi szabályokhoz.",
      usefulTips: [
        "Ellenőrizd a hivatalos jegyinformációkat és a szertartások rendjét.",
        "Öltözz tiszteletteljesen, és kövesd a fényképezésre, valamint a csendes terekre vonatkozó útmutatást.",
      ],
    },
    "capitoline-museums": {
      name: "Capitoliumi Múzeumok",
      shortDescription:
        "Szánj elmélyült múzeumi időt a római szobrászatra és a város történetére.",
      detailedDescription:
        "A Capitolium környezete a város identitását kapcsolja össze az évszázadok során gyűjtött tárgyakkal. Válassz témát, például a portrét vagy a köztéri emlékműveket, és kövesd azt a múzeum kezelhető részén. A kinti térre is hagyj időt: a megérkezés az élmény része.",
      usefulTips: [
        "A múzeumnál ellenőrizd az aktuális kiállításokat és a jegy tartalmát.",
        "Jelölj ki néhány fontos termet ahelyett, hogy egy napra túl sok múzeumot terveznél.",
      ],
    },
    "galleria-borghese": {
      name: "Galleria Borghese",
      shortDescription:
        "Tervezz elmélyült találkozást a szobrászattal és festészettel egy villa környezetében.",
      detailedDescription:
        "A jelentős művekkel teli, bensőséges termek közeli szemlélődésre ösztönöznek. Ahol engedélyezett, járd körbe a szobrokat, és figyeld a művek és a díszített terek kapcsolatát. A belépést előre tisztázandó kérdésként kezeld, és a tényleges foglalási feltételeket a galériánál ellenőrizd.",
      usefulTips: [
        "A foglalási követelményeket közvetlenül a galériánál ellenőrizd.",
        "Nézd meg a csomagmegőrzés szabályait, és érkezz a megadott belépési eljáráshoz időben.",
      ],
    },
    "villa-borghese": {
      name: "Séta a Villa Borghese parkjában",
      shortDescription:
        "Cseréld a forgalmas utcákat fás ösvényekre és kötetlen parki időtöltésre.",
      detailedDescription:
        "A park levegőhöz juttat a beltéri látogatások és a történelmi központ sétái között. Válassz kényelmes kört, és állj meg, ha megtetszik egy látkép vagy árnyas pad. Ez önálló szabadtéri program; a parkon belüli kölcsönzőknek, látnivalóknak és szolgáltatásoknak saját feltételeik vannak.",
      usefulTips: [
        "Aktuális helyi térképen válassz a következő megállódhoz közeli kijáratot.",
        "Ne feltételezd, hogy egy múzeumi jegy parki szolgáltatást vagy kölcsönzést is tartalmaz.",
      ],
    },
    "piazza-navona": {
      name: "Piazza Navona",
      shortDescription:
        "Figyeld meg egy híres római tér szökőkútjait, templomfrontjait és formáját.",
      detailedDescription:
        "Először sétálj végig a téren, hogy érzékeld megnyúlt alakját, és csak utána összpontosíts az egyes emlékekre. A széleken töltött néhány perc többet mutathat, mint a legzsúfoltabb fotózócsoport. A kávézók különálló vállalkozások; az asztalhoz ülés nem része a köztér élvezetének.",
      usefulTips: [
        "Kávézóasztal elfoglalása előtt nézd meg az étlapot.",
        "Tartsd be a szökőkutak körüli helyi szabályokat: ezek műemlékek, nem fürdőhelyek.",
      ],
    },
    "trastevere-walk": {
      name: "Séta Trasteverében",
      shortDescription:
        "Fedezd fel a negyed utcáit apró felfedezésekkel és egy kávészünet lehetőségével.",
      detailedDescription:
        "Ez önálló városrészi séta, nem érintetlen, titkos negyed ígérete. Menj a legforgalmasabb sarkokon túlra, figyeld a templomok külső részét és a lakóutcákat, majd pihenj ott, ahol jól érzed magad. Légy figyelmes: az esti tömeg az itt élőkkel osztozik a környéken.",
      usefulTips: [
        "A nap későbbi részében különösen ügyelj a csendre.",
        "Belépés előtt ellenőrizd az egyes templomok látogathatóságát és öltözködési szabályait.",
      ],
    },
    "testaccio-food": {
      name: "Ízelítő Testaccióból",
      shortDescription:
        "Programötlet: fedezz fel egy ételes városrészt, és aznap válassz magadnak étkezést.",
      detailedDescription:
        "Testaccióban érdemes a római konyháról kérdezni, nem csupán egy kötelező fogást keresni. Hasonlíts össze étlapokat vagy nyitva tartó standokat, majd válassz az étvágyadhoz illő kisebb kínálatot. Ez nem foglalt gasztrotúra, és nem konkrét árus ajánlása.",
      usefulTips: [
        "Külön utazás előtt ellenőrizd a piac és az üzletek nyitvatartási napjait.",
        "Rendelés előtt beszélj az allergiákról, és ellenőrizd az árakat; az elérhetőség nem garantált.",
      ],
    },
    "appian-way": {
      name: "Séta a Via Appián",
      shortDescription:
        "Járd be Róma történelmi úthálózatának egy kényelmesen teljesíthető szakaszát.",
      detailedDescription:
        "Válassz meghatározott szakaszt a Via Appián a teljes út bejárása helyett. A kőburkolat, út menti emlékek és nyílt terek magát az utat teszik fő látnivalóvá. Egyes részeknek és közeli helyszíneknek külön hozzáférési feltételeik vannak, ezért indulás előtt tervezd meg a visszautat.",
      usefulTips: [
        "Ellenőrizd a helyi forgalmi korlátozásokat és a gyaloglási körülményeket.",
        "Viselj stabil cipőt, tervezd meg a visszajutást; a közeli régészeti helyszínekhez külön jegy kellhet.",
      ],
    },
    "rome-bioparco": {
      name: "Bioparco di Roma",
      shortDescription:
        "Válassz családi programot az állatok és a természetvédelmi ismeretek köré szervezve.",
      detailedDescription:
        "Az állatkerti látogatás akkor működik jól, ha a gyerekek néhány állatot hosszan figyelhetnek a kifutók közötti rohanás helyett. Az aktuális térkép és állatjóléti útmutatás szerint alakítsátok az útvonalat. Egyes állatok, előadások és programok nem tekinthetők garantált látogatási elemnek.",
      usefulTips: [
        "Ellenőrizd az intézmény aktuális működését, jegyeit és látogatási szabályait.",
        "Tervezz pihenőket, és tartsd be az etetési tilalmakat és a korlátokra vonatkozó előírásokat.",
      ],
    },
  },
} satisfies HungarianGuide;
