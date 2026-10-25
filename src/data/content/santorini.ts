import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "santorini-akrotiri",
    name: "Akrotiri Archaeological Site",
    category: "History & culture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore an excavated Bronze Age settlement beneath a protective structure.",
    detailedDescription:
      "Look for the organization of streets and buildings rather than trying to imagine the entire ancient town from a single viewpoint. The site is a managed archaeological visit, separate from the modern village of the same name.",
    usefulTips: [
      "Confirm current site access and ticket arrangements.",
      "Follow walkways and do not enter excavation areas.",
    ],
    kind: "place",
    sourceIds: ["greekTourism"],
  },
  {
    id: "santorini-prehistoric-museum",
    name: "Museum of Prehistoric Thera",
    category: "Museums",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Use archaeological objects to place the island’s ancient settlements in context.",
    detailedDescription:
      "This is a chance to slow down after a landscape-focused outing. Choose a few objects or display themes and connect them with the island’s excavation sites. Current rooms and exhibitions need checking with the museum.",
    usefulTips: [
      "Check current galleries and admission directly.",
      "Allow time to read interpretation rather than treating the museum as a brief stop.",
    ],
    kind: "place",
    sourceIds: ["greekTourism"],
  },
  {
    id: "santorini-fira",
    name: "Fira Town Walk",
    category: "Local experiences",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Explore the island’s main town with a flexible route and public viewpoints.",
    detailedDescription:
      "Move between busy shopping streets and quieter public lanes without assuming every caldera-facing terrace is open to visitors. The map point is a sourced town overview, not a verified entrance or route.",
    usefulTips: [
      "Stay on public paths and respect private terraces.",
      "Check local transport and allow extra time on crowded approaches.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
    coordinateRef: "fira",
  },
  {
    id: "santorini-oia",
    name: "Oia Village Walk",
    category: "Architecture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Look at the relationship between cliffside buildings, lanes and the wider setting.",
    detailedDescription:
      "A walk through Oia is more rewarding when it leaves room for architectural details as well as distant views. Its streets are part of a lived-in settlement. The overview point identifies the village; it does not reserve a viewpoint or verify a walking route.",
    usefulTips: [
      "Do not climb onto roofs or enter private stairways for photographs.",
      "Keep narrow passages clear and follow local crowd-management guidance.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
    coordinateRef: "oia",
  },
  {
    id: "santorini-pyrgos",
    name: "Pyrgos Village Walk",
    category: "History & culture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Explore a hill village at a pace suited to its sloping lanes.",
    detailedDescription:
      "Notice how buildings and passages follow the hill rather than rushing to the highest available point. Small public spaces can provide a useful place to pause. Individual churches and businesses have their own visitor arrangements.",
    usefulTips: [
      "Expect steps and uneven surfaces.",
      "Ask before entering church interiors and respect service times.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
  },
  {
    id: "santorini-kamari",
    name: "Kamari Beach Walk",
    category: "Nature & beaches",
    estimatedDuration: "1–3 hours",
    shortDescription:
      "Choose a seafront walk or beach pause on the island’s eastern side.",
    detailedDescription:
      "Think of this as a flexible coastal outing rather than a promise of swimming conditions or included beach services. Find a public access point and decide how long to stay based on the weather and the conditions you actually encounter.",
    usefulTips: [
      "Check local swimming guidance and sea conditions.",
      "Use suitable footwear on hot or uneven beach surfaces.",
    ],
    kind: "place",
    sourceIds: ["greekTourism"],
  },
  {
    id: "santorini-fira-imerovigli",
    name: "Fira to Imerovigli Walking Experience",
    category: "Outdoor activities",
    estimatedDuration: "1½–3 hours",
    shortDescription:
      "Plan a defined section of the caldera-side walking network.",
    detailedDescription:
      "Choose a start and finish that suit your ability rather than assuming the entire island-side route is a casual stroll. Paths can involve steps, exposed sections and changing conditions. Public route access needs confirming before the outing.",
    usefulTips: [
      "Check current path conditions and avoid exposed stretches in unsuitable weather.",
      "Carry water and plan transport back from your chosen endpoint.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
  },
  {
    id: "santorini-island-food",
    name: "A Santorini Produce-Focused Meal",
    category: "Food & drink",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "An experience category: ask about island ingredients at a business you select.",
    detailedDescription:
      "Let questions about seasonal produce guide a meal rather than seeking a guaranteed tasting menu. Ask what is locally sourced and how dishes are prepared. No restaurant, winery or farm is endorsed or promised as part of this suggestion.",
    usefulTips: [
      "Confirm ingredients and allergy handling with staff.",
      "Check menu prices and any tasting conditions before ordering.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    countryCode: "GR",
    region: "Cyclades, Southern Europe",
    searchAliases: ["Thira", "Thera", "Fira", "Cyclades"],
    category: "Coast",
    tagline: "Look beyond the postcard view.",
    description:
      "Pair archaeological context with village streets, coastal time and thoughtful walks. The island is a lived-in landscape, and public access, sea conditions and walking routes should shape each day.",
    sourceIds: ["greekTourism"],
    coordinateLabel:
      "Firá town overview for Santorini; not an island centroid or cliff-path entrance",
    coordinateRef: "santorini",
  },
  entries.map((entry) => buildAttraction(entry)),
);
