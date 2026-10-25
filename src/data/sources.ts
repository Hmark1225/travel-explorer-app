/** Known official organizations; URLs are review leads, not fetched evidence.
 * A homepage is not evidence for every claim about a place. Replace/add exact
 * supporting pages after opening them and recording the fields they support.
 */
export const sources = {
  rhodesTourism: {
    name: "Rhodes official tourism",
    url: "https://www.visitrhodes.com/",
    status: "blocked",
  },
  greekTourism: {
    name: "Greek National Tourism Organisation",
    url: "https://www.visitgreece.gr/",
    status: "not-accessed",
  },
  greekCulture: {
    name: "Hellenic Ministry of Culture",
    url: "https://www.culture.gov.gr/",
    status: "not-accessed",
  },
  romeTourism: {
    name: "Roma Capitale tourism",
    url: "https://www.turismoroma.it/en",
    status: "blocked",
  },
  colosseum: {
    name: "Colosseum Archaeological Park",
    url: "https://colosseo.it/en/",
    status: "not-accessed",
  },
  capitoline: {
    name: "Capitoline Museums",
    url: "https://www.museicapitolini.org/",
    status: "not-accessed",
  },
  borghese: {
    name: "Galleria Borghese",
    url: "https://galleriaborghese.beniculturali.it/",
    status: "not-accessed",
  },
  budapestTourism: {
    name: "Budapest official tourism",
    url: "https://www.budapestinfo.hu/",
    status: "blocked",
  },
  parliament: {
    name: "Hungarian National Assembly",
    url: "https://www.parlament.hu/",
    status: "not-accessed",
  },
  fineArts: {
    name: "Museum of Fine Arts Budapest",
    url: "https://www.mfab.hu/",
    status: "not-accessed",
  },
  zoo: {
    name: "Budapest Zoo",
    url: "https://zoobudapest.com/",
    status: "not-accessed",
  },
  baths: {
    name: "Széchenyi Thermal Bath",
    url: "https://www.szechenyibath.hu/",
    status: "not-accessed",
  },
} as const;
export type SourceId = keyof typeof sources;
