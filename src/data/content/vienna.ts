import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "vienna-schonbrunn",
    name: "Schönbrunn Palace and Grounds",
    category: "History & culture",
    estimatedDuration: "2–4 hours",
    shortDescription:
      "Select a palace or garden-focused visit rather than assuming one ticket covers everything.",
    detailedDescription:
      "Decide which part of the complex is your priority before arranging admission. Ceremonial rooms, gardens and additional attractions are distinct experiences. A manageable selection leaves more time to understand the setting than a packed checklist.",
    usefulTips: [
      "Check official ticket inclusions and timed-entry arrangements.",
      "Confirm accessible routes and separate garden-area conditions.",
    ],
    kind: "place",
    sourceIds: ["viennaTourism"],
  },
  {
    id: "vienna-belvedere",
    name: "Belvedere",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Explore art and palace architecture through a deliberately chosen visit.",
    detailedDescription:
      "Pay attention to how the collection and the building frame one another. The name covers more than one visitor space, so choose the actual venue and displays you want to see. Garden access does not imply admission to every interior.",
    usefulTips: [
      "Confirm which building and exhibitions a ticket includes.",
      "Check current access and photography guidance.",
    ],
    kind: "place",
    sourceIds: ["viennaTourism"],
  },
  {
    id: "vienna-kunsthistorisches",
    name: "Kunsthistorisches Museum",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Build an art visit around a focused collection theme in a grand museum interior.",
    detailedDescription:
      "Choose a few rooms that connect with your interests and allow time to look closely. The decorated interior is worth noticing without allowing it to turn the visit into a race through every gallery. Current displays should shape your route.",
    usefulTips: [
      "Check current galleries and temporary-exhibition arrangements.",
      "Confirm bag storage and photography rules.",
    ],
    kind: "place",
    sourceIds: ["viennaTourism"],
  },
  {
    id: "vienna-st-stephens",
    name: "St Stephen’s Cathedral Vienna",
    category: "Architecture",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "Approach a central landmark as a working cathedral with distinct visitor areas.",
    detailedDescription:
      "Start with the exterior and its place in the surrounding streets. Any interior or tower visit should respect worship and the particular access rules in force. Do not assume one admission arrangement covers every part of the building.",
    usefulTips: [
      "Check current service, visitor and tower arrangements.",
      "Dress respectfully and confirm stair requirements for viewpoints.",
    ],
    kind: "place",
    sourceIds: ["viennaTourism"],
  },
  {
    id: "vienna-ringstrasse",
    name: "Ringstrasse Architecture Walk",
    category: "Architecture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Choose a section of the boulevard to compare public buildings and urban spaces.",
    detailedDescription:
      "The Ringstrasse is best treated as a route you design, not a single attraction to complete. Pick a manageable stretch and notice how civic buildings face the boulevard. Interiors, performances and guided tours are separate from the walk.",
    usefulTips: [
      "Use designated crossings around traffic and tram lines.",
      "Check individual building access rather than assuming public entry.",
    ],
    kind: "experience",
    sourceIds: ["viennaTourism"],
  },
  {
    id: "vienna-prater",
    name: "Prater Park Walk",
    category: "Family activities",
    estimatedDuration: "1½–3 hours",
    shortDescription:
      "Choose a green-space or amusement-area outing based on your group’s interests.",
    detailedDescription:
      "The Prater contains different kinds of experiences, from walking to independently operated attractions. Decide what suits your group and treat every ride or activity as a separate choice. No ride operation, price or age suitability is guaranteed here.",
    usefulTips: [
      "Check individual attraction rules and current operation.",
      "Agree on a meeting point and confirm accessibility where needed.",
    ],
    kind: "experience",
    sourceIds: ["viennaTourism"],
  },
  {
    id: "vienna-naschmarkt",
    name: "Naschmarkt Food Browse",
    category: "Food & drink",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Browse food stalls and businesses with time to compare offers.",
    detailedDescription:
      "Read menus and labels instead of assuming every product or stall represents one local tradition. This is a self-guided market visit, not a tasting package. Ask questions about ingredients and origins before choosing what to buy.",
    usefulTips: [
      "Check trading days and business opening independently.",
      "Confirm prices, portion sizes and allergy information.",
    ],
    kind: "experience",
    sourceIds: ["viennaTourism"],
  },
  {
    id: "vienna-coffeehouse",
    name: "A Viennese Coffeehouse Pause",
    category: "Local experiences",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "An experience category: choose a café and make time for a slower stop.",
    detailedDescription:
      "Let a coffeehouse visit be a pause rather than a search for a single approved address. Read the menu, ask about unfamiliar choices and decide whether you want a drink, food or both. This guide does not endorse a particular establishment.",
    usefulTips: [
      "Check menu prices and table-service arrangements.",
      "Respect other guests and ask before taking interior photographs.",
    ],
    kind: "experience",
    sourceIds: ["viennaTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "vienna",
    name: "Vienna",
    country: "Austria",
    countryCode: "AT",
    region: "Vienna, Central Europe",
    searchAliases: ["Wien"],
    category: "Culture",
    tagline: "Grand spaces, unhurried moments.",
    description:
      "Balance major collections and ceremonial architecture with a boulevard walk and a coffeehouse pause. Choose actual venues and ticket inclusions carefully instead of treating large palace or park complexes as single attractions.",
    sourceIds: ["viennaTourism"],
    coordinateLabel: "Vienna city overview, not a venue entrance",
    coordinateRef: "vienna",
  },
  entries.map((entry) => buildAttraction(entry)),
);
