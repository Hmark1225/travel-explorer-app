import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "mallorca-palma-cathedral",
    name: "Palma Cathedral",
    category: "Architecture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Look at a major Gothic landmark and its relationship with the waterfront.",
    detailedDescription:
      "Start outside to understand the building’s scale and position, then decide about an interior visit from current information. Religious use and separate visitor areas can affect access. A waterfront walk is independent of cathedral admission.",
    usefulTips: [
      "Check visitor hours, dress guidance and current ticket arrangements.",
      "Do not assume terrace or special-route access is included.",
    ],
    kind: "place",
    sourceIds: ["mallorcaTourism"],
  },
  {
    id: "mallorca-bellver",
    name: "Bellver Castle",
    category: "History & culture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Explore a hilltop castle and the way its form relates to the city below.",
    detailedDescription:
      "The circular structure and elevated setting offer different ways to look at a castle. Allow time for the approach as well as the building. Current interior routes and any museum displays need checking separately from the surrounding landscape.",
    usefulTips: [
      "Confirm current admission and open areas.",
      "Allow for the uphill approach or check transport alternatives.",
    ],
    kind: "place",
    sourceIds: ["mallorcaTourism"],
  },
  {
    id: "mallorca-soller",
    name: "Sóller Town Walk",
    category: "Local experiences",
    estimatedDuration: "1½–2 hours plus transport",
    shortDescription:
      "Explore a town square and its surrounding public streets.",
    detailedDescription:
      "Choose a compact route and let time in the square set the pace. The town is a lived-in place, while transport attractions and private gardens are separate experiences. The sourced point identifies the town rather than a tour start.",
    usefulTips: [
      "Confirm onward transport before making a day trip.",
      "Respect private courtyards and workshop boundaries.",
    ],
    kind: "experience",
    sourceIds: ["mallorcaTourism"],
    coordinateRef: "soller",
  },
  {
    id: "mallorca-valldemossa",
    name: "Valldemossa Village Walk",
    category: "Architecture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Look at stone streets and the relationship between village buildings and the hills.",
    detailedDescription:
      "A short walk can be enough to appreciate the settlement without entering every visitor venue. Slow down for small details and leave room for everyday life. The overview marker is not an entrance to a monastery or museum.",
    usefulTips: [
      "Check individual monument admission separately.",
      "Wear shoes suited to slopes and stone surfaces.",
    ],
    kind: "experience",
    sourceIds: ["mallorcaTourism"],
    coordinateRef: "valldemossa",
  },
  {
    id: "mallorca-alcudia",
    name: "Alcúdia Old Town Walk",
    category: "History & culture",
    estimatedDuration: "1½–2 hours",
    shortDescription: "Explore public streets around a walled historic town.",
    detailedDescription:
      "Notice the transition between gateways, lanes and open squares rather than focusing only on a single wall view. Public street access does not imply that all fortification sections or archaeological areas can be entered. The marker identifies the town.",
    usefulTips: [
      "Check permitted wall routes before climbing steps.",
      "Confirm market days rather than expecting stalls on every visit.",
    ],
    kind: "experience",
    sourceIds: ["mallorcaTourism"],
    coordinateRef: "alcudia",
  },
  {
    id: "mallorca-mondrago",
    name: "Mondragó Natural Park Coastal Walk",
    category: "Nature & beaches",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Plan a defined walk through a protected coastal landscape.",
    detailedDescription:
      "Choose a route suited to the conditions and treat beach time as an optional part of the outing. Protected status brings responsibilities as well as scenery. Access, parking and any seasonal restrictions should be checked through current local guidance.",
    usefulTips: [
      "Stay on designated paths and respect conservation notices.",
      "Check sea conditions and carry water without leaving litter.",
    ],
    kind: "experience",
    sourceIds: ["mallorcaTourism"],
  },
  {
    id: "mallorca-serra-tramuntana",
    name: "Serra de Tramuntana Walking Experience",
    category: "Outdoor activities",
    estimatedDuration: "2–4 hours; route-dependent",
    shortDescription:
      "A mountain walking category that requires selecting and reviewing a specific trail.",
    detailedDescription:
      "The range is too broad to treat as one hike. Choose an actual route using current local information, assess terrain and weather, and plan how to return. A short duration estimate is not a guarantee of easy conditions.",
    usefulTips: [
      "Verify the exact trail, closures and transport before setting out.",
      "Carry appropriate footwear, water and navigation.",
    ],
    kind: "experience",
    sourceIds: ["mallorcaTourism"],
  },
  {
    id: "mallorca-palma-market",
    name: "Mercat de l’Olivar Food Browse",
    category: "Food & drink",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Browse a Palma food market and choose purchases from current offers.",
    detailedDescription:
      "Observe everyday shopping and compare stalls before deciding what to try. This is a self-guided market visit rather than an organized tasting or a vendor endorsement. Ask about origins and ingredients instead of assuming every product is locally made.",
    usefulTips: [
      "Check trading days before a dedicated trip.",
      "Confirm prices, allergy information and portion sizes.",
    ],
    kind: "experience",
    sourceIds: ["mallorcaTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "mallorca",
    name: "Mallorca",
    country: "Spain",
    countryCode: "ES",
    region: "Balearic Islands, Southern Europe",
    searchAliases: ["Majorca", "Palma", "Balearics", "Illes Balears"],
    category: "Coast",
    tagline: "City streets, mountain paths, coastal pauses.",
    description:
      "Balance a Palma visit with a few town or landscape outings chosen for your time and ability. The island is not one continuous beach, and mountain walks and protected coastal areas need specific local planning.",
    sourceIds: ["mallorcaTourism"],
    coordinateLabel: "Palma town overview for Mallorca; not an island centroid",
    coordinateRef: "mallorca",
  },
  entries.map((entry) => buildAttraction(entry)),
);
