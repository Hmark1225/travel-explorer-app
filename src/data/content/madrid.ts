import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "madrid-prado",
    name: "Prado Museum",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Build a focused visit around a small selection of paintings.",
    detailedDescription:
      "Choose a few artists or themes and allow time to compare works. A manageable route is more rewarding than treating every room as a compulsory stop. Temporary exhibitions and collection displays may have different visitor arrangements.",
    usefulTips: [
      "Check the museum’s current ticket and exhibition information.",
      "Confirm bag storage and photography rules.",
    ],
    kind: "place",
    sourceIds: ["madridTourism"],
  },
  {
    id: "madrid-reina-sofia",
    name: "Reina Sofía Museum",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Explore modern art through a carefully chosen route and its historical context.",
    detailedDescription:
      "Give the interpretation enough time to connect works with the period in which they were made. Rather than planning around one famous image alone, choose related rooms that deepen the visit. Check which spaces are open before travelling.",
    usefulTips: [
      "Consult current gallery and entry guidance.",
      "Plan breaks and confirm access to any separate exhibition buildings.",
    ],
    kind: "place",
    sourceIds: ["madridTourism"],
  },
  {
    id: "madrid-royal-palace",
    name: "Royal Palace of Madrid",
    category: "Architecture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore a ceremonial landmark with attention to the visitor areas actually available.",
    detailedDescription:
      "Look at the palace’s relationship with the surrounding public spaces before an interior visit. The building’s official role can affect access, so current visitor information is essential. Do not assume that adjacent collections or gardens share a ticket.",
    usefulTips: [
      "Confirm current closures and ticket inclusions.",
      "Allow time for security and check accessibility arrangements.",
    ],
    kind: "place",
    sourceIds: ["madridTourism"],
  },
  {
    id: "madrid-retiro",
    name: "El Retiro Park Walk",
    category: "Nature & beaches",
    estimatedDuration: "1½–2 hours",
    shortDescription: "Choose a relaxed route through a large city park.",
    detailedDescription:
      "The park works best as a flexible pause rather than a sequence of required sights. Notice the contrast between broad paths and quieter planted areas. Individual buildings, boats or other services within the park have separate arrangements.",
    usefulTips: [
      "Check weather-related access notices.",
      "Do not assume rentals or exhibitions are included with park access.",
    ],
    kind: "experience",
    sourceIds: ["madridTourism"],
  },
  {
    id: "madrid-plaza-mayor",
    name: "Plaza Mayor and Historic-Center Walk",
    category: "History & culture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Use a landmark square as the start of a short public-street exploration.",
    detailedDescription:
      "Walk the square’s edges to notice its enclosure, then choose a few surrounding lanes. The experience is about urban space and everyday activity rather than access to the buildings around it. A café stop is an optional business transaction.",
    usefulTips: [
      "Check a menu before taking a café table.",
      "Keep passageways clear and watch belongings in busy areas.",
    ],
    kind: "experience",
    sourceIds: ["madridTourism"],
  },
  {
    id: "madrid-sorolla",
    name: "Sorolla Museum",
    category: "Museums",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Consider an artist-house museum only after confirming current operation.",
    detailedDescription:
      "An artist’s domestic setting can offer a different encounter with painting from a large national collection. Rooms, gardens and works should be approached together when open. Renovations or other changes may affect whether a visit is currently possible.",
    usefulTips: [
      "Confirm that the museum is open before making a special trip.",
      "Check reservation, garden and accessibility arrangements.",
    ],
    kind: "place",
    sourceIds: ["madridTourism"],
  },
  {
    id: "madrid-madrid-tapas",
    name: "A Madrid Tapas Stop",
    category: "Food & drink",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "An experience category: choose a food stop through current menus and your own preferences.",
    detailedDescription:
      "Compare a few options rather than assuming a busy bar represents a single authentic style. Ask how portions and ordering work, and choose a pace that suits your group. This suggestion does not name or endorse a vendor.",
    usefulTips: [
      "Confirm prices and serving sizes before ordering.",
      "Discuss allergies and non-alcoholic options directly.",
    ],
    kind: "experience",
    sourceIds: ["madridTourism"],
  },
  {
    id: "madrid-madrid-rio",
    name: "Madrid Río Riverside Walk",
    category: "Outdoor activities",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Choose a manageable stretch of the city’s riverside public-space network.",
    detailedDescription:
      "This outing is about walking and observing how the city meets the river corridor. Select an endpoint near transport instead of trying to cover the entire network. Play areas and other facilities should be checked individually for suitability.",
    usefulTips: [
      "Keep shared cycling and pedestrian routes clear.",
      "Check heat conditions and identify a return connection.",
    ],
    kind: "experience",
    sourceIds: ["madridTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "madrid",
    name: "Madrid",
    country: "Spain",
    countryCode: "ES",
    region: "Community of Madrid, Southern Europe",
    searchAliases: ["Comunidad de Madrid"],
    category: "City breaks",
    tagline: "Make time for art and everyday life.",
    description:
      "Build a city stay around carefully chosen collections, public squares and green spaces. A food stop and a riverside walk can give the day a different pace from its larger ceremonial buildings.",
    sourceIds: ["madridTourism"],
    coordinateLabel: "Madrid city overview, not a venue entrance",
    coordinateRef: "madrid",
  },
  entries.map((entry) => buildAttraction(entry)),
);
