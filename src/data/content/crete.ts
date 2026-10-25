import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "crete-knossos",
    name: "Knossos Archaeological Site",
    category: "History & culture",
    estimatedDuration: "1½–2½ hours",
    shortDescription:
      "Read an important archaeological landscape with attention to reconstruction and interpretation.",
    detailedDescription:
      "Look for differences between excavated fabric and later reconstruction, using the site’s interpretation to guide you. It is better to understand a few connected spaces than to hurry past every structure. Plan the visit separately from the city museum.",
    usefulTips: [
      "Check official entry arrangements and current accessible routes.",
      "Bring sun protection and stay within permitted paths.",
    ],
    kind: "place",
    sourceIds: ["greekTourism"],
  },
  {
    id: "crete-heraklion-museum",
    name: "Heraklion Archaeological Museum",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Explore objects that give context to Crete’s archaeological sites.",
    detailedDescription:
      "Choose a theme such as daily life, exchange or ritual and follow it through a manageable part of the collection. Comparing objects with the places they came from can be more useful than trying to see every case.",
    usefulTips: [
      "Confirm current galleries and ticket conditions.",
      "Plan a break between the museum and a separate visit to Knossos.",
    ],
    kind: "place",
    sourceIds: ["greekTourism"],
  },
  {
    id: "crete-chania",
    name: "Chania Old Town Walk",
    category: "Local experiences",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore harbor streets and residential lanes in western Crete.",
    detailedDescription:
      "Move between the waterfront and smaller streets to notice the neighborhood’s changing scale. A café pause can be part of the walk, but public access does not extend into private courtyards. The point shown is a town overview, not a verified tour start.",
    usefulTips: [
      "Respect working quays and residents’ doorways.",
      "Check transport if combining Chania with another part of the island.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
    coordinateRef: "chania",
  },
  {
    id: "crete-rethymno",
    name: "Rethymno Old Town Walk",
    category: "Architecture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Look for architectural layers in a compact old-town walking experience.",
    detailedDescription:
      "Choose a few lanes and public squares rather than crossing the town on a strict timetable. Individual buildings may be working religious spaces, homes or businesses, not open attractions. The sourced marker identifies the town only.",
    usefulTips: [
      "Ask permission before entering courtyards or photographing residents.",
      "Expect uneven surfaces and check heat conditions before a long walk.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
    coordinateRef: "rethymno",
  },
  {
    id: "crete-elafonisi",
    name: "Elafonisi Coastal Visit",
    category: "Nature & beaches",
    estimatedDuration: "2–4 hours plus transport",
    shortDescription:
      "Approach a distinctive coastal landscape with conservation and conditions in mind.",
    detailedDescription:
      "The appeal is the shoreline and its changing colors, not a guarantee of a particular water level or uncrowded beach. Use designated access and treat the place as a sensitive landscape. Travel time should be considered separately from time on the coast.",
    usefulTips: [
      "Check local access, weather and any conservation restrictions.",
      "Leave sand, shells and plants where they are.",
    ],
    kind: "place",
    sourceIds: ["greekTourism"],
  },
  {
    id: "crete-samaria",
    name: "Samaria Gorge Hiking Experience",
    category: "Outdoor activities",
    estimatedDuration: "A substantial day; route-dependent",
    shortDescription:
      "A demanding gorge outing that needs current operating and safety information.",
    detailedDescription:
      "Do not plan this hike from a generic duration alone. Choose the actual route and transport sequence using current park guidance, considering terrain, ability and weather. A scenic reputation does not establish that the gorge is open or appropriate for your group.",
    usefulTips: [
      "Confirm park operation, closures and transport before committing.",
      "Carry suitable hiking equipment and assess your fitness honestly.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
  },
  {
    id: "crete-crete-aquarium",
    name: "CRETAquarium",
    category: "Family activities",
    estimatedDuration: "1½–2 hours",
    shortDescription: "Consider an indoor marine-themed visit near Heraklion.",
    detailedDescription:
      "Let children choose a habitat or animal to learn about, then connect that discussion with the surrounding sea. Exhibits, talks and facilities can change, so use the venue’s current information rather than expecting a fixed program.",
    usefulTips: [
      "Check current visitor arrangements and accessibility.",
      "Do not tap glass or assume feeding activities are available.",
    ],
    kind: "place",
    sourceIds: ["greekTourism"],
  },
  {
    id: "crete-cretan-table",
    name: "A Cretan Taverna Table",
    category: "Food & drink",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "An experience category: share a meal and ask about the season’s ingredients.",
    detailedDescription:
      "Use a taverna stop to learn through questions about vegetables, olive oil, bread and the kitchen’s own cooking. This is an independent dining suggestion, not a named venue or a promised cooking demonstration.",
    usefulTips: [
      "Explain dietary requirements and confirm ingredients directly.",
      "Read menu prices and ask about any service or cover charges.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "crete",
    name: "Crete",
    country: "Greece",
    countryCode: "GR",
    region: "Crete, Southern Europe",
    searchAliases: ["Kriti", "Heraklion", "Iraklio", "Chania"],
    category: "Coast",
    tagline: "An island worth taking slowly.",
    description:
      "Crete is large enough to reward a regional plan rather than constant cross-island travel. Combine ancient history, town walks and a chosen coastal or outdoor outing, leaving time for food and the journey between stops.",
    sourceIds: ["greekTourism"],
    coordinateLabel:
      "Heraklion / Iraklio overview for Crete; not an island centroid",
    coordinateRef: "crete",
  },
  entries.map((entry) => buildAttraction(entry)),
);
