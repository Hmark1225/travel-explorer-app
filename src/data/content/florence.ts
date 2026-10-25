import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "florence-uffizi",
    name: "Uffizi Gallery",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Follow the development of painting through a focused selection of Renaissance works.",
    detailedDescription:
      "Choose a small group of paintings to spend time with rather than racing through every room. Compare the treatment of figures and landscape across periods, then pause at a window to reconnect the collection with Florence outside.",
    usefulTips: [
      "Check the gallery’s current reservation and entry arrangements.",
      "Allow for security and confirm bag-storage requirements.",
    ],
    kind: "place",
    sourceIds: ["florenceTourism"],
  },
  {
    id: "florence-duomo",
    name: "Florence Cathedral and Piazza del Duomo",
    category: "Architecture",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Read the cathedral complex from its marble exterior and surrounding square.",
    detailedDescription:
      "Walk around the complex before deciding which interior elements to visit. The cathedral, dome, bell tower and other areas are different experiences; an exterior walk should not be confused with access to every part of the monument.",
    usefulTips: [
      "Confirm which elements a ticket covers before purchasing.",
      "Check stair requirements and dress guidance for religious spaces.",
    ],
    kind: "place",
    sourceIds: ["florenceTourism"],
  },
  {
    id: "florence-accademia",
    name: "Accademia Gallery",
    category: "Museums",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Look closely at sculpture, with time for more than the best-known work.",
    detailedDescription:
      "The gallery offers an opportunity to compare finished forms with the process of carving. Give the sculpture room time to settle around you, then explore the other displays that are open rather than turning the visit into a single photograph.",
    usefulTips: [
      "Consult the gallery for current entry and reservation rules.",
      "Follow photography restrictions and keep circulation routes clear.",
    ],
    kind: "place",
    sourceIds: ["florenceTourism"],
  },
  {
    id: "florence-ponte-vecchio",
    name: "Ponte Vecchio and the Arno",
    category: "Architecture",
    estimatedDuration: "45–60 minutes",
    shortDescription:
      "See the bridge from the riverbanks before walking through its shops.",
    detailedDescription:
      "Approaching along the Arno makes the bridge’s unusual built form easier to understand. Cross at a comfortable pace and look back from the opposite bank. The walk is a public-space experience, separate from shopping or any controlled-access route above.",
    usefulTips: [
      "Use river viewpoints without blocking the pedestrian path.",
      "Do not assume access to adjoining historic corridors.",
    ],
    kind: "experience",
    sourceIds: ["florenceTourism"],
  },
  {
    id: "florence-boboli",
    name: "Boboli Gardens",
    category: "Nature & beaches",
    estimatedDuration: "1½–2½ hours",
    shortDescription:
      "Explore a designed landscape of slopes, sculpture and changing viewpoints.",
    detailedDescription:
      "Boboli is more rewarding as a garden walk than as a shortcut between landmarks. Choose a manageable route and notice how planting and architecture frame the city. Hills and exposed stretches matter when deciding how much to include.",
    usefulTips: [
      "Check current garden access and any weather-related closures.",
      "Bring water and confirm accessible routes before visiting.",
    ],
    kind: "place",
    sourceIds: ["florenceTourism"],
  },
  {
    id: "florence-piazzale-michelangelo",
    name: "Piazzale Michelangelo Walk",
    category: "Outdoor activities",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Make the climb part of a walk to a broad view over the city.",
    detailedDescription:
      "The appeal is the gradual change from street-level Florence to a wider view of roofs and hills. Choose a route that suits your mobility and stop to look back along the way. The square itself is shared public space, not a reserved viewing platform.",
    usefulTips: [
      "Allow for uphill walking or check local transport alternatives.",
      "Avoid standing in roadways while taking photographs.",
    ],
    kind: "experience",
    sourceIds: ["florenceTourism"],
  },
  {
    id: "florence-oltrarno",
    name: "Oltrarno Neighborhood Walk",
    category: "Local experiences",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore workshops, small streets and everyday life south of the river.",
    detailedDescription:
      "Wander with enough flexibility to stop at an open workshop or a quiet square. Craftspeople’s workspaces are businesses rather than exhibits, so ask before entering or taking photographs. A short route with a café pause is often more satisfying than a long checklist.",
    usefulTips: [
      "Ask permission before photographing makers or their work.",
      "Check individual workshop opening and purchasing conditions.",
    ],
    kind: "experience",
    sourceIds: ["florenceTourism"],
  },
  {
    id: "florence-sant-ambrogio",
    name: "Sant’Ambrogio Market Browse",
    category: "Food & drink",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Browse a neighborhood food market and choose a meal on the day.",
    detailedDescription:
      "Compare seasonal produce and prepared food where stalls are trading. This is an independent market visit, not a recommendation for a particular vendor or a guaranteed tasting. Let ingredient questions and your appetite guide the stop.",
    usefulTips: [
      "Check trading days before making a special trip.",
      "Confirm prices and allergy information directly with each vendor.",
    ],
    kind: "experience",
    sourceIds: ["florenceTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "florence",
    name: "Florence",
    country: "Italy",
    countryCode: "IT",
    region: "Tuscany, Southern Europe",
    searchAliases: ["Firenze"],
    category: "Culture",
    tagline: "Art around the next corner.",
    description:
      "Explore a compact city of Renaissance collections, river crossings and neighborhood workshops. Balance a focused museum visit with garden time and a slower walk south of the Arno.",
    sourceIds: ["florenceTourism"],
    coordinateLabel: "Florence city overview, not a venue entrance",
    coordinateRef: "florence",
  },
  entries.map((entry) => buildAttraction(entry)),
);
