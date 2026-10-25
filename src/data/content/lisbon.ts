import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "lisbon-jeronimos",
    name: "Jerónimos Monastery",
    category: "Architecture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Look at a major Belém monument and distinguish its different visitor spaces.",
    detailedDescription:
      "Begin with the exterior to appreciate the building’s scale and carved detail. Any interior visit should follow current arrangements for the church, cloister or other areas rather than assuming one route covers everything. Religious use can affect the visit.",
    usefulTips: [
      "Check official ticketing and current entry routes.",
      "Confirm accessibility and follow dress or worship guidance.",
    ],
    kind: "place",
    sourceIds: ["lisbonTourism"],
  },
  {
    id: "lisbon-belem-tower",
    name: "Belém Tower and Riverside",
    category: "History & culture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Understand the tower through its riverside position, with interior access checked separately.",
    detailedDescription:
      "The tower makes sense within a wider waterfront walk, not only as a stand-alone photograph. Look at its relationship with the river and historic approaches. Works, conditions or visitor management can limit access beyond the public exterior.",
    usefulTips: [
      "Confirm whether interior visits are currently possible.",
      "Stay on permitted waterfront paths and respect safety barriers.",
    ],
    kind: "place",
    sourceIds: ["lisbonTourism"],
  },
  {
    id: "lisbon-sao-jorge",
    name: "São Jorge Castle",
    category: "History & culture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore a hilltop landmark with attention to the visitor route and city views.",
    detailedDescription:
      "Allow time for the approach as well as the interior areas that are open. Fortified spaces and viewpoints can involve uneven surfaces and changes of level. The castle’s broader setting is part of the experience, but access should be planned from current information.",
    usefulTips: [
      "Check official admission and accessible-route guidance.",
      "Wear shoes suited to slopes and stone surfaces.",
    ],
    kind: "place",
    sourceIds: ["lisbonTourism"],
  },
  {
    id: "lisbon-alfama",
    name: "Alfama Neighborhood Walk",
    category: "Local experiences",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Follow a manageable route through steep streets and small public spaces.",
    detailedDescription:
      "Alfama is a residential neighborhood rather than a set of empty scenic lanes. Walk slowly enough to notice details while keeping space for residents. A short route can be more useful than trying to link every viewpoint.",
    usefulTips: [
      "Respect doorways and avoid photographing residents without permission.",
      "Plan for steps and check transport alternatives if needed.",
    ],
    kind: "experience",
    sourceIds: ["lisbonTourism"],
  },
  {
    id: "lisbon-tile-museum",
    name: "National Tile Museum",
    category: "Museums",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore decorative tiles as objects, architectural surfaces and visual stories.",
    detailedDescription:
      "Choose a few displays that show how tiles are made and used, then notice related details elsewhere in the city. The museum visit is distinct from looking at tiles on private buildings. Current galleries and access need checking before a special trip.",
    usefulTips: [
      "Confirm current opening and collection access.",
      "Follow photography rules and do not touch displayed surfaces.",
    ],
    kind: "place",
    sourceIds: ["lisbonTourism"],
  },
  {
    id: "lisbon-oceanario",
    name: "Oceanário de Lisboa",
    category: "Family activities",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Plan an attentive marine-life visit based on the venue’s current displays.",
    detailedDescription:
      "Give your group time to observe behavior rather than moving quickly between windows. A marine visit can encourage questions about habitats and conservation, but no particular animal, talk or additional activity is promised here.",
    usefulTips: [
      "Check current tickets, exhibits and accessibility.",
      "Respect barriers and do not tap glass.",
    ],
    kind: "place",
    sourceIds: ["lisbonTourism"],
  },
  {
    id: "lisbon-tejo-walk",
    name: "Belém Riverside Walk",
    category: "Outdoor activities",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Choose a public waterfront stretch and a comfortable turning point.",
    detailedDescription:
      "The river gives a different sense of Lisbon from its hill streets. Use a current local map to choose a connected pedestrian route, and treat monument visits or refreshments as optional separate stops. Weather and works can affect the experience.",
    usefulTips: [
      "Keep cycling routes clear and use designated crossings.",
      "Check wind and heat conditions and plan transport back.",
    ],
    kind: "experience",
    sourceIds: ["lisbonTourism"],
  },
  {
    id: "lisbon-lisbon-food",
    name: "A Lisbon Pastry and Coffee Stop",
    category: "Food & drink",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "An experience category: choose a pastry business independently and ask about its products.",
    detailedDescription:
      "Read the available selection and choose something you want to learn about or enjoy. This is not a recommendation for a particular shop or a guarantee of a named pastry. A short food pause can fit naturally into a neighborhood walk.",
    usefulTips: [
      "Confirm ingredients and allergies with the business.",
      "Check takeaway versus table-service prices before ordering.",
    ],
    kind: "experience",
    sourceIds: ["lisbonTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    countryCode: "PT",
    region: "Lisbon Region, Southern Europe",
    searchAliases: ["Lisboa", "Tejo", "Tagus"],
    category: "City breaks",
    tagline: "Follow the hills down to the river.",
    description:
      "Choose manageable neighborhood walks, a few museum or monument visits and time along the Tejo. The city’s gradients are part of planning a comfortable day, and waterfront stops offer a change of scale.",
    sourceIds: ["lisbonTourism"],
    coordinateLabel: "Lisbon city overview, not a venue entrance",
    coordinateRef: "lisbon",
  },
  entries.map((entry) => buildAttraction(entry)),
);
