import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "corfu-old-town",
    name: "Corfu Old Town Walk",
    category: "History & culture",
    estimatedDuration: "1½–2½ hours",
    shortDescription:
      "Explore the compact street network of the island’s main town.",
    detailedDescription:
      "Move between broad public spaces and narrow lanes to appreciate how the town works at different scales. Look up at the building fronts, but leave room for residents and deliveries. The point is a sourced town overview rather than a walking-tour entrance.",
    usefulTips: [
      "Keep doorways and narrow routes clear.",
      "Check access separately for churches, museums and fortifications.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
    coordinateRef: "corfu-town",
  },
  {
    id: "corfu-old-fortress",
    name: "Old Fortress of Corfu",
    category: "Architecture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Understand the town’s setting through its prominent defensive landmark.",
    detailedDescription:
      "The fortress is useful for thinking about how the town relates to the sea and its approaches. A visit can involve exposed surfaces and changes in level. Confirm which areas are open rather than assuming access throughout the complex.",
    usefulTips: [
      "Check current admission and permitted routes.",
      "Wear shoes with grip and take care on exposed paths.",
    ],
    kind: "place",
    sourceIds: ["greekTourism"],
  },
  {
    id: "corfu-asian-art",
    name: "Corfu Museum of Asian Art",
    category: "Museums",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore a museum collection within a distinctive historic building.",
    detailedDescription:
      "Choose a small number of collection areas and pay attention to both objects and their interpretation. The building itself is part of the experience, but temporary displays and room access should be confirmed from current museum information.",
    usefulTips: [
      "Check the museum’s current galleries and visitor rules.",
      "Confirm accessibility and photography arrangements.",
    ],
    kind: "place",
    sourceIds: ["greekTourism"],
  },
  {
    id: "corfu-mon-repos",
    name: "Mon Repos Estate Walk",
    category: "Nature & beaches",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Plan a leafy estate outing with separate decisions about indoor visits.",
    detailedDescription:
      "Treat the grounds as a landscape walk rather than assuming all associated buildings are open. A short route can provide a quieter change from town streets. Individual museum or archaeological areas may operate separately.",
    usefulTips: [
      "Check current public entrances and any route restrictions.",
      "Use designated paths and confirm access to indoor spaces separately.",
    ],
    kind: "place",
    sourceIds: ["greekTourism"],
  },
  {
    id: "corfu-paleokastritsa",
    name: "Paleokastritsa Coastal Visit",
    category: "Nature & beaches",
    estimatedDuration: "2–3 hours plus transport",
    shortDescription:
      "Choose a public coastal viewpoint or beach stop in a varied bay setting.",
    detailedDescription:
      "Decide whether walking, looking at the coastline or time on a beach is your main aim. Boat services and swimming opportunities depend on conditions and operators; they are not included or guaranteed by this suggestion.",
    usefulTips: [
      "Confirm public access and local sea conditions.",
      "Do not assume boat trips or beach services are operating.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
  },
  {
    id: "corfu-saint-spyridon",
    name: "Saint Spyridon Church",
    category: "Architecture",
    estimatedDuration: "30–60 minutes",
    shortDescription:
      "Approach a town church as a working religious place as well as a landmark.",
    detailedDescription:
      "Allow the visit to follow the rhythm of worship rather than treating the interior as a display space. Observe exterior details first, then enter only when visitor access is appropriate. Religious events can change the experience.",
    usefulTips: [
      "Check current visitor guidance and service arrangements.",
      "Dress respectfully and follow local photography rules.",
    ],
    kind: "place",
    sourceIds: ["greekTourism"],
  },
  {
    id: "corfu-kanoni",
    name: "Kanoni Viewpoint Walk",
    category: "Outdoor activities",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "Make a short public-space outing around a recognizable waterside view.",
    detailedDescription:
      "Choose a safe pedestrian position and take time to notice the wider landscape rather than competing for one photograph. Road traffic and private terraces affect where you can stop. Access to nearby religious sites is a separate question.",
    usefulTips: [
      "Use pedestrian routes and avoid stopping in roadways.",
      "Check weather and respect private terrace boundaries.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
  },
  {
    id: "corfu-corfiot-food",
    name: "A Corfiot Food Discovery Meal",
    category: "Food & drink",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "An experience category: ask about Corfu’s cooking at a chosen restaurant.",
    detailedDescription:
      "Compare a few menus and ask which dishes reflect the kitchen’s approach to island food. This does not certify a vendor as traditional or guarantee particular recipes. An attentive conversation can be more useful than a predetermined tasting list.",
    usefulTips: [
      "Confirm meat, fish, alcohol and allergen ingredients directly.",
      "Check menu prices before sitting down.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "corfu",
    name: "Corfu",
    country: "Greece",
    countryCode: "GR",
    region: "Ionian Islands, Southern Europe",
    searchAliases: ["Kerkyra", "Kerkira", "Ionian Islands"],
    category: "Coast",
    tagline: "Island days with a town at their heart.",
    description:
      "Use Corfu Town as one part of an island visit, with time for heritage, leafy grounds and carefully chosen coastal stops. Public viewpoints and independent food discoveries can complement managed monument visits.",
    sourceIds: ["greekTourism"],
    coordinateLabel:
      "Corfu / Kerkira town overview for the island; not an island centroid",
    coordinateRef: "corfu",
  },
  entries.map((entry) => buildAttraction(entry)),
);
