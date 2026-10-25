import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "venice-st-marks",
    name: "St Mark’s Basilica and Square",
    category: "Architecture",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Look at the meeting of architecture, mosaics and a famous public square.",
    detailedDescription:
      "Begin outside to notice how the basilica sits within the larger ensemble of the square. Any interior visit should allow for its religious role as well as its art. Separate visitor areas may have different arrangements, so plan from current official guidance.",
    usefulTips: [
      "Confirm ticketing, access and religious-service restrictions.",
      "Respect dress rules and do not feed birds in the square.",
    ],
    kind: "place",
    sourceIds: ["veniceTourism"],
  },
  {
    id: "venice-doges-palace",
    name: "Doge’s Palace",
    category: "History & culture",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Explore the setting of Venetian government through rooms and connected spaces.",
    detailedDescription:
      "The palace helps explain the relationship between ceremony, political authority and the waterfront. Follow a manageable route and read a few rooms carefully rather than trying to absorb every decoration. Additional routes may have separate conditions.",
    usefulTips: [
      "Check the official museum for route and ticket inclusions.",
      "Confirm accessibility and bag rules before arrival.",
    ],
    kind: "place",
    sourceIds: ["veniceTourism"],
  },
  {
    id: "venice-rialto",
    name: "Rialto Bridge and Market Area",
    category: "Local experiences",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Pair a bridge crossing with a look at the surrounding trading neighborhood.",
    detailedDescription:
      "Look at the bridge from a nearby canal edge before crossing it. The market area is most interesting when approached as a working place, not a stage set. Trading depends on the day, and a bridge visit does not guarantee a market in operation.",
    usefulTips: [
      "Check market trading days locally.",
      "Keep bridge steps and delivery routes clear.",
    ],
    kind: "experience",
    sourceIds: ["veniceTourism"],
  },
  {
    id: "venice-accademia",
    name: "Gallerie dell’Accademia",
    category: "Museums",
    estimatedDuration: "1½–2½ hours",
    shortDescription:
      "Trace Venetian painting in a museum setting away from the busiest crossings.",
    detailedDescription:
      "Choose a period or subject to follow through the collection. Pay attention to color and the city’s relationship with water and ceremony, then connect what you have seen with the streets outside. Current gallery arrangements should guide the route.",
    usefulTips: [
      "Check the museum’s current galleries and ticket arrangements.",
      "Plan rest time rather than combining too many museums in one day.",
    ],
    kind: "place",
    sourceIds: ["veniceTourism"],
  },
  {
    id: "venice-cannaregio",
    name: "Cannaregio and the Jewish Ghetto",
    category: "History & culture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Walk a residential district with time for Jewish history and remembrance.",
    detailedDescription:
      "The neighborhood deserves more than a hurried detour between canals. Notice the relationship between squares, residential buildings and places of worship. Museums or synagogue visits are separate, controlled experiences and should be arranged through current visitor guidance.",
    usefulTips: [
      "Observe religious-calendar restrictions for individual venues.",
      "Keep voices low and respect memorial spaces and residents.",
    ],
    kind: "experience",
    sourceIds: ["veniceTourism"],
  },
  {
    id: "venice-burano",
    name: "Burano Village Walk",
    category: "Local experiences",
    estimatedDuration: "2–3 hours plus transport",
    shortDescription:
      "Explore island streets without treating private homes as visitor attractions.",
    detailedDescription:
      "Burano can be a slow walk through colorful lanes and waterside spaces rather than a race for matching photographs. Ask questions about craft traditions where workshops are open, but do not assume every displayed product is made locally.",
    usefulTips: [
      "Check return waterbus connections before travelling.",
      "Do not enter private courtyards or photograph residents without permission.",
    ],
    kind: "experience",
    sourceIds: ["veniceTourism"],
    coordinateRef: "burano",
  },
  {
    id: "venice-lido",
    name: "Lido Seafront Walk",
    category: "Nature & beaches",
    estimatedDuration: "1½–2 hours plus transport",
    shortDescription:
      "Trade narrow canal streets for a wider island walk near the sea.",
    detailedDescription:
      "The Lido provides a different sense of space from central Venice. Choose a comfortable public route and decide separately whether beach time suits conditions on the day. Individual bathing areas and seasonal services may have their own access rules.",
    usefulTips: [
      "Confirm public access routes rather than entering private beach areas.",
      "Check weather and sea conditions before considering a swim.",
    ],
    kind: "experience",
    sourceIds: ["veniceTourism"],
  },
  {
    id: "venice-cicchetti",
    name: "A Venetian Cicchetti Stop",
    category: "Food & drink",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "An experience category: choose small bites at an independently selected bacaro.",
    detailedDescription:
      "Read the counter or menu and ask what is being served before ordering. This is an approach to a relaxed food stop, not a named bar recommendation or a booked tour. Choose quantities and drinks to suit your preferences and budget.",
    usefulTips: [
      "Confirm per-item prices and allergy information.",
      "Respect standing space and the business’s ordering customs.",
    ],
    kind: "experience",
    sourceIds: ["veniceTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "venice",
    name: "Venice",
    country: "Italy",
    countryCode: "IT",
    region: "Veneto, Southern Europe",
    searchAliases: ["Venezia", "Venetian Lagoon"],
    category: "Culture",
    tagline: "Find your own canal-side rhythm.",
    description:
      "Move between major civic landmarks and smaller residential lanes, with time to understand the lagoon setting. A deliberate walking route and a carefully chosen island outing make a better plan than a rushed checklist.",
    sourceIds: ["veniceTourism"],
    coordinateLabel:
      "Venice city overview, not a waterbus stop or venue entrance",
    coordinateRef: "venice",
  },
  entries.map((entry) => buildAttraction(entry)),
);
