import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "bastion",
    name: "Fisherman’s Bastion",
    category: "Architecture",
    estimatedDuration: "1–1½ hours",
    shortDescription: "Take in terraces and river views on Castle Hill.",
    detailedDescription:
      "The bastion’s arcades and stairs frame the city rather than simply providing one photo point. Walk around its accessible parts and look across the Danube to understand how Buda and Pest face one another. Different terrace sections can have different access arrangements.",
    usefulTips: [
      "Check current terrace access and ticket rules.",
      "Allow for stairs and slopes; ask locally about step-free routes.",
    ],
    kind: "place",
    sourceIds: ["budapestTourism"],
  },
  {
    id: "szechenyi",
    name: "Széchenyi Thermal Baths",
    category: "Wellness",
    estimatedDuration: "2–4 hours",
    shortDescription:
      "Make time for Budapest’s bathing culture in a grand bath complex.",
    detailedDescription:
      "A bath visit is about pacing: arrive, orient yourself and choose a comfortable rhythm of bathing and rest. Read the rules for each pool instead of assuming one set of conditions applies everywhere. Facilities, age restrictions and pool availability need checking with the operator.",
    usefulTips: [
      "Bring appropriate swimwear and check footwear, towel and locker requirements.",
      "Review health advice, age restrictions and current pool availability before booking.",
    ],
    kind: "place",
    sourceIds: ["baths", "budapestTourism"],
  },
  {
    id: "hungarian-parliament",
    name: "Hungarian Parliament Building",
    category: "Architecture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Study the riverfront landmark and investigate an official interior tour.",
    detailedDescription:
      "The long façade is worth viewing from the riverbank as well as from nearby streets. An interior visit is a separate, controlled experience, so choose an official tour based on the language and entry conditions actually offered. An exterior walk does not imply access to the working building.",
    usefulTips: [
      "Book only after checking the official visitor information.",
      "Confirm identification, security and cancellation requirements.",
    ],
    kind: "place",
    sourceIds: ["parliament", "budapestTourism"],
  },
  {
    id: "buda-castle-walk",
    name: "Buda Castle District Walk",
    category: "History & culture",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Explore the hilltop district through courtyards, streets and outward views.",
    detailedDescription:
      "Think of the Castle District as a neighborhood-sized visit rather than a single ticketed palace. Walk a comfortable route, pause at viewpoints and choose an individual museum only if time allows. Works and changing access can affect how the courtyards and paths connect.",
    usefulTips: [
      "Check local access notices and allow for hills.",
      "Museums and transport within the district have separate admission arrangements.",
    ],
    kind: "experience",
    sourceIds: ["budapestTourism"],
  },
  {
    id: "st-stephens-basilica",
    name: "St Stephen’s Basilica",
    category: "Architecture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Visit a major religious landmark and consider its separate visitor areas.",
    detailedDescription:
      "The basilica introduces another scale of Budapest, away from the broad river views. Give the interior a quiet, attentive visit, then explore the surrounding square. Tower or other visitor areas may operate separately; do not assume that reaching the entrance includes every part of the building.",
    usefulTips: [
      "Check service times and visitor ticket arrangements.",
      "Dress respectfully and confirm lift or stair access for any viewpoint.",
    ],
    kind: "place",
    sourceIds: ["budapestTourism"],
  },
  {
    id: "budapest-fine-arts",
    name: "Museum of Fine Arts",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Choose a focused route through an important art collection beside Heroes’ Square.",
    detailedDescription:
      "Make the visit manageable by choosing a period, theme or exhibition before arriving. Spend time with a few works rather than trying to cover every gallery. The museum can pair well with a short outdoor walk nearby, but temporary exhibitions and permanent displays may have different tickets.",
    usefulTips: [
      "Consult the museum for current galleries and exhibition inclusions.",
      "Check cloakroom and photography rules.",
    ],
    kind: "place",
    sourceIds: ["fineArts", "budapestTourism"],
  },
  {
    id: "margaret-island",
    name: "Margaret Island Walk",
    category: "Nature & beaches",
    estimatedDuration: "1½–3 hours",
    shortDescription:
      "Find green space and a slower walking rhythm between the riverbanks.",
    detailedDescription:
      "The island offers room to stretch a city day into an unhurried outdoor break. Choose a walk that suits your energy and stop for the landscape rather than relying on a specific attraction operating. This is a park outing, not a recommendation to swim in the river.",
    usefulTips: [
      "Keep cycling and pedestrian routes clear.",
      "Check transport connections and seasonal facility operation before visiting.",
    ],
    kind: "experience",
    sourceIds: ["budapestTourism"],
  },
  {
    id: "city-park",
    name: "City Park and Vajdahunyad Castle Exteriors",
    category: "Outdoor activities",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Combine park paths with a look at a playful collection of architectural styles.",
    detailedDescription:
      "This outing is about the contrast between open parkland and the castle’s varied exterior forms. Look at the buildings from different angles and leave time to wander rather than rushing to another timed entry. Museums, boating or other services in the area are separate activities.",
    usefulTips: [
      "Check current works and route closures locally.",
      "Confirm any museum or seasonal activity directly; no availability is promised.",
    ],
    kind: "experience",
    sourceIds: ["budapestTourism"],
  },
  {
    id: "budapest-zoo",
    name: "Budapest Zoo and Botanical Garden",
    category: "Family activities",
    estimatedDuration: "3–4 hours",
    shortDescription:
      "Plan a family day around animal observation and garden spaces.",
    detailedDescription:
      "Allow children to set a slower pace and choose a few areas to explore well. Historic zoo architecture and planting can be part of the visit alongside the animal habitats. Current exhibits and daily activities depend on the venue, so use its own map and guidance rather than a fixed checklist.",
    usefulTips: [
      "Confirm current tickets, entry times and accessibility.",
      "Respect barriers and do not feed animals unless explicitly permitted.",
    ],
    kind: "place",
    sourceIds: ["zoo", "budapestTourism"],
  },
  {
    id: "great-market-hall",
    name: "Great Market Hall Food Browse",
    category: "Food & drink",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "An experience category: browse a working market and choose food with care.",
    detailedDescription:
      "Look at produce and everyday shopping before making a purchase. Compare stalls and ask about ingredients or origins instead of assuming every souvenir is locally made. This is an independent market visit, not a recommendation for a particular vendor or a guarantee of tasting opportunities.",
    usefulTips: [
      "Check trading days before a special trip.",
      "Confirm prices, allergy information and any packaging charges before ordering.",
    ],
    kind: "experience",
    sourceIds: ["budapestTourism"],
  },
  {
    id: "danube-promenade",
    name: "Danube Riverside Walk",
    category: "Local experiences",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "Read Budapest through its riverfront and the relationship between its two banks.",
    detailedDescription:
      "Choose a pedestrian stretch along the Pest riverfront and let the opposite hillside set the scene. The point is to slow down and notice changing viewpoints rather than cover every bridge. Pause respectfully at memorials and be aware that transport corridors run close to parts of the waterfront.",
    usefulTips: [
      "Use designated crossings around tram lines and roads.",
      "Stay back from the river edge and check weather conditions.",
    ],
    kind: "experience",
    sourceIds: ["budapestTourism"],
  },
  {
    id: "dohany-synagogue",
    name: "Dohány Street Synagogue",
    category: "History & culture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Approach a major Jewish heritage site with time for history and remembrance.",
    detailedDescription:
      "A visit should give space to the synagogue’s religious role and to the memorial context around it. Read the interpretation carefully rather than treating the building as only an architectural stop. Access to associated areas and tours must be confirmed with the operator.",
    usefulTips: [
      "Check religious-calendar closures, security and dress requirements.",
      "Treat memorial areas quietly and follow current photography rules.",
    ],
    kind: "place",
    sourceIds: ["budapestTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "budapest",
    name: "Budapest",
    country: "Hungary",
    countryCode: "HU",
    region: "Central Hungary, Central Europe",
    searchAliases: ["Buda", "Pest"],
    category: "City breaks",
    tagline: "Two sides. Endless discoveries.",
    description:
      "Cross the Danube between grand boulevards and leafy castle streets. Unwind in thermal baths, discover neighborhood cafés and watch the riverfront glow after sunset.",
    sourceIds: ["budapestTourism"],
    coordinateLabel:
      "Budapest legacy destination overview; location source review pending",
    legacyCoordinates: {
      latitude: 47.507,
      longitude: 19.045,
    },
  },
  entries.map((entry) => buildAttraction(entry)),
);
