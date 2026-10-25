import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "prague-castle",
    name: "Prague Castle Complex",
    category: "History & culture",
    estimatedDuration: "2–4 hours",
    shortDescription:
      "Plan a focused route through a large complex with separate visitor areas.",
    detailedDescription:
      "Start by deciding which buildings or courtyards matter most to your visit. Public approaches, religious spaces and ticketed areas should not be treated as one uniform attraction. A smaller route explored carefully may be preferable to covering every available circuit.",
    usefulTips: [
      "Check official visitor circuits, security and ticket inclusions.",
      "Allow for slopes, uneven paving and possible access changes.",
    ],
    kind: "place",
    sourceIds: ["pragueTourism"],
  },
  {
    id: "prague-charles-bridge",
    name: "Charles Bridge Walk",
    category: "Architecture",
    estimatedDuration: "45–60 minutes",
    shortDescription:
      "Look at the bridge from both riverbanks before crossing it.",
    detailedDescription:
      "The bridge is part of a wider river landscape as well as a place to study sculpture and skyline views. Move at a comfortable pace and pause where you do not obstruct the flow. Public access does not extend to every adjacent tower or building.",
    usefulTips: [
      "Keep the central pedestrian route clear.",
      "Confirm tower access separately and watch belongings in crowds.",
    ],
    kind: "experience",
    sourceIds: ["pragueTourism"],
  },
  {
    id: "prague-old-town-square",
    name: "Old Town Square",
    category: "History & culture",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "Read a civic space through its different building fronts and public edges.",
    detailedDescription:
      "Walk around the square rather than gathering only at its busiest clock-side point. Different periods of architecture sit close together, and small details reward attention. Church or tower interiors have their own visitor arrangements.",
    usefulTips: [
      "Check current access for any building you intend to enter.",
      "Read café menus before taking a table in the square.",
    ],
    kind: "place",
    sourceIds: ["pragueTourism"],
  },
  {
    id: "prague-jewish-quarter",
    name: "Prague Jewish Quarter Heritage Visit",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Approach Jewish heritage spaces with time for history and remembrance.",
    detailedDescription:
      "Choose the particular museum or religious sites you intend to visit from current official information. They are not simply interchangeable stops on a street walk. Give the interpretation enough time, and treat cemeteries and memorial settings with care.",
    usefulTips: [
      "Confirm religious-calendar closures and ticket inclusions.",
      "Follow security, dress and photography guidance.",
    ],
    kind: "place",
    sourceIds: ["pragueTourism"],
  },
  {
    id: "prague-petrin",
    name: "Petřín Hill Walk",
    category: "Nature & beaches",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Choose a green hillside route with separate decisions about visitor attractions.",
    detailedDescription:
      "Paths and planted spaces can provide a slower change from the historic center. Select an ascent that suits your group and confirm how you will return. Towers, transport or other facilities are separate experiences with their own operating conditions.",
    usefulTips: [
      "Check current path and transport notices.",
      "Allow for slopes and do not assume every route is step-free.",
    ],
    kind: "experience",
    sourceIds: ["pragueTourism"],
  },
  {
    id: "prague-national-museum",
    name: "National Museum Prague",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Choose a manageable collection route within a prominent museum setting.",
    detailedDescription:
      "Decide on a collection theme before arrival rather than assuming a single visit can cover every building and display. The architecture can be part of the experience, but exhibitions and venues may have separate arrangements.",
    usefulTips: [
      "Check current displays, buildings and ticket inclusions.",
      "Confirm accessibility and bag-storage requirements.",
    ],
    kind: "place",
    sourceIds: ["pragueTourism"],
  },
  {
    id: "prague-vysehrad",
    name: "Vyšehrad Grounds Walk",
    category: "Outdoor activities",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore a hilltop historic area through permitted paths and outward views.",
    detailedDescription:
      "A walk here can connect landscape, fortifications and the city’s layers without requiring a visit to every indoor venue. Choose a compact route and leave space for quiet reflection. Religious buildings, memorial areas and managed sites need separate consideration.",
    usefulTips: [
      "Respect quiet areas and check access before entering memorial spaces.",
      "Wear shoes suited to slopes and paving.",
    ],
    kind: "experience",
    sourceIds: ["pragueTourism"],
  },
  {
    id: "prague-prague-food",
    name: "A Czech Food Discovery Meal",
    category: "Food & drink",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "An experience category: use a menu and questions to explore a meal in Prague.",
    detailedDescription:
      "Choose a business whose current menu suits your preferences rather than relying on a fixed list of essential dishes. Ask how portions and ingredients are handled. No restaurant, tasting or beverage purchase is included or endorsed.",
    usefulTips: [
      "Confirm allergy information and meat or alcohol ingredients.",
      "Check prices and any service conditions before ordering.",
    ],
    kind: "experience",
    sourceIds: ["pragueTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "prague",
    name: "Prague",
    country: "Czechia",
    countryCode: "CZ",
    region: "Bohemia, Central Europe",
    searchAliases: ["Praha", "Czech Republic"],
    category: "Culture",
    tagline: "A city to read one street at a time.",
    description:
      "Explore historic public spaces alongside thoughtfully chosen collections and quieter hill walks. Separate the large visitor complexes from the everyday streets between them, leaving time for context as well as views.",
    sourceIds: ["pragueTourism"],
    coordinateLabel: "Prague city overview, not a venue entrance",
    coordinateRef: "prague",
  },
  entries.map((entry) => buildAttraction(entry)),
);
