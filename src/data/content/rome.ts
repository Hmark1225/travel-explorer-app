import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "colosseum",
    name: "The Colosseum",
    category: "History & culture",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Read the scale and structure of Rome’s great amphitheater from inside and out.",
    detailedDescription:
      "Walk around the exterior before going in to understand how the arches and tiers fit together. Inside, focus on the organization of spectators and the machinery of spectacle rather than only the famous arena view. Different visit products may include different areas; a ticket should be checked carefully before purchase.",
    usefulTips: [
      "Use the park’s official ticket information and check entry requirements.",
      "Leave time for security and do not assume every ticket includes the underground areas.",
    ],
    kind: "place",
    sourceIds: ["colosseum", "romeTourism"],
  },
  {
    id: "trevi",
    name: "Trevi Fountain",
    category: "Architecture",
    estimatedDuration: "30–45 minutes",
    shortDescription:
      "Study a dramatic Baroque fountain where sculpture and street life meet.",
    detailedDescription:
      "The fountain is best appreciated as a whole stage set: rock, figures, water and the building behind them work together. Give yourself a moment away from the most crowded photo position to take it in. Access arrangements can change, so a familiar public square should not be treated as evidence of current entry rules.",
    usefulTips: [
      "Check current approach and access rules before your visit.",
      "Keep bags close in crowded areas and follow barriers and steward instructions.",
    ],
    kind: "place",
    sourceIds: ["romeTourism"],
  },
  {
    id: "roman-forum",
    name: "Roman Forum and Palatine Hill",
    category: "History & culture",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Trace the remains of civic and imperial Rome across an expansive archaeological area.",
    detailedDescription:
      "This is a landscape of fragments rather than a single building. Choose a small number of landmarks and use their positions to imagine the public spaces between them. Combining the Forum and Palatine can be rewarding, but long distances and exposed stretches make pacing more useful than a packed checklist.",
    usefulTips: [
      "Bring water and shoes suitable for uneven archaeological paths.",
      "Check your ticket’s included areas and re-entry rules.",
    ],
    kind: "place",
    sourceIds: ["colosseum", "romeTourism"],
  },
  {
    id: "pantheon",
    name: "The Pantheon",
    category: "Architecture",
    estimatedDuration: "45–60 minutes",
    shortDescription:
      "Look up into a remarkable domed interior organized around an open oculus.",
    detailedDescription:
      "Start by noticing the transition from the busy square to the portico, then the sudden scale of the interior. The circular space and changing light are the main experience. It remains a religious setting, so a visit should accommodate worship and the rules in force on the day.",
    usefulTips: [
      "Check official ticket and religious-service arrangements.",
      "Dress respectfully and follow photography and quiet-area guidance.",
    ],
    kind: "place",
    sourceIds: ["romeTourism"],
  },
  {
    id: "capitoline-museums",
    name: "Capitoline Museums",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Give Roman sculpture and civic history a focused museum visit.",
    detailedDescription:
      "The Capitoline setting links the city’s identity with collections assembled across centuries. Pick a theme such as portraiture or public monuments, then follow it through a manageable part of the museum. Leave time to look at the square outside; the approach is part of the experience.",
    usefulTips: [
      "Consult the museum for current exhibitions and ticket inclusions.",
      "Choose a few priority rooms rather than combining too many museums in one day.",
    ],
    kind: "place",
    sourceIds: ["capitoline", "romeTourism"],
  },
  {
    id: "galleria-borghese",
    name: "Galleria Borghese",
    category: "Museums",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Plan a concentrated encounter with sculpture and painting in a villa setting.",
    detailedDescription:
      "The intimacy of rooms filled with major works makes this a visit for close looking. Allow time to move around sculpture where permitted, and notice the relationship between artworks and the decorated interiors. Treat entry as something to arrange in advance, with the actual booking conditions confirmed by the gallery.",
    usefulTips: [
      "Confirm reservation requirements directly with the gallery.",
      "Check bag-storage rules and arrive in time for the stated entry procedure.",
    ],
    kind: "place",
    sourceIds: ["borghese", "romeTourism"],
  },
  {
    id: "villa-borghese",
    name: "Villa Borghese Park Walk",
    category: "Outdoor activities",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Trade busy streets for paths, trees and a flexible park outing.",
    detailedDescription:
      "The park offers breathing room between indoor visits and historic-center walks. Choose a manageable loop and pause when a view or shaded seat appeals. This is a self-guided outdoor experience; rentals, attractions and other services within the park have their own arrangements.",
    usefulTips: [
      "Use a current local map to choose an exit near your next stop.",
      "Do not assume park services or rentals are included with any museum ticket.",
    ],
    kind: "experience",
    sourceIds: ["romeTourism"],
  },
  {
    id: "piazza-navona",
    name: "Piazza Navona",
    category: "Architecture",
    estimatedDuration: "30–60 minutes",
    shortDescription:
      "Look at fountains, church fronts and the shape of a celebrated Roman square.",
    detailedDescription:
      "Walk the length of the square to notice its elongated form before focusing on individual monuments. A few minutes at the edges can reveal more than joining the busiest photo cluster. Cafés are independent businesses, so sitting at a table is a separate choice from enjoying the public space.",
    usefulTips: [
      "Check a menu before taking a café table.",
      "Follow local rules around fountains; they are monuments, not bathing places.",
    ],
    kind: "place",
    sourceIds: ["romeTourism"],
  },
  {
    id: "trastevere-walk",
    name: "Trastevere Neighborhood Walk",
    category: "Local experiences",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore neighborhood streets with time for small discoveries and a café break.",
    detailedDescription:
      "This is a self-guided neighborhood experience rather than a promise of an untouched secret district. Move beyond the busiest corners, notice church exteriors and residential streets, and pause somewhere that suits your pace. Keep the visit considerate: evening crowds share the area with people who live there.",
    usefulTips: [
      "Keep noise down late in the day.",
      "Confirm individual church access and dress requirements before entering.",
    ],
    kind: "experience",
    sourceIds: ["romeTourism"],
  },
  {
    id: "testaccio-food",
    name: "A Taste of Testaccio",
    category: "Food & drink",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "An experience category: explore a food neighborhood and choose a meal on the day.",
    detailedDescription:
      "Use Testaccio as a place to ask questions about Roman cooking rather than chasing a single must-eat item. Compare menus or stalls where open, and choose a small selection that fits your appetite. This is not a booked food tour or a named-vendor recommendation.",
    usefulTips: [
      "Check market or business opening days before making a special trip.",
      "Discuss allergies and check prices before ordering; availability is not guaranteed.",
    ],
    kind: "experience",
    sourceIds: ["romeTourism"],
  },
  {
    id: "appian-way",
    name: "Appian Way Walk",
    category: "Outdoor activities",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Follow a manageable stretch of Rome’s historic road landscape.",
    detailedDescription:
      "Choose a defined section of the Appian Way instead of trying to cover the entire route. Stone surfaces, roadside monuments and open space make the journey the main attraction. Some stretches and nearby sites have separate access conditions, so plan a return route before starting.",
    usefulTips: [
      "Check local traffic restrictions and walking conditions.",
      "Wear supportive shoes and plan transport back; nearby archaeological sites may need separate tickets.",
    ],
    kind: "experience",
    sourceIds: ["romeTourism"],
  },
  {
    id: "rome-bioparco",
    name: "Bioparco di Roma",
    category: "Family activities",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Consider a family visit focused on animals and conservation interpretation.",
    detailedDescription:
      "A zoo visit works best when children have time to watch a few animals rather than rush between enclosures. Let the current site map and welfare guidance shape your route. Individual animals, talks and activities should never be treated as guaranteed parts of a visit.",
    usefulTips: [
      "Check the venue’s current opening, tickets and visitor rules.",
      "Plan rest stops and follow all feeding and barrier restrictions.",
    ],
    kind: "place",
    sourceIds: ["romeTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    countryCode: "IT",
    region: "Lazio, Southern Europe",
    searchAliases: ["Roma"],
    category: "Culture",
    tagline: "Every street tells a story.",
    description:
      "Ancient wonders, neighborhood trattorias and golden evening light. Find your own rhythm in the Eternal City, from monumental ruins to a perfect espresso in a quiet piazza.",
    sourceIds: ["romeTourism"],
    coordinateLabel:
      "Rome legacy destination overview; location source review pending",
    legacyCoordinates: {
      latitude: 41.8902,
      longitude: 12.4922,
    },
  },
  entries.map((entry) => buildAttraction(entry)),
);
