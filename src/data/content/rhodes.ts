import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "rhodes-old-town",
    name: "Medieval Old Town",
    category: "History & culture",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Walk through a living walled town, from quiet lanes to the Street of the Knights.",
    detailedDescription:
      "Rhodes Old Town rewards wandering rather than a straight route between monuments. Notice the changes from broad stone streets to small residential lanes, then pause outside the great buildings of the Knights. Treat it as a neighborhood as well as a historic place: people live and work behind these walls.",
    usefulTips: [
      "Wear shoes that grip uneven cobbles.",
      "Keep voices low in residential lanes and leave room for deliveries.",
    ],
    kind: "place",
    sourceIds: ["rhodesTourism", "greekCulture"],
  },
  {
    id: "lindos",
    name: "Lindos Acropolis",
    category: "History & culture",
    estimatedDuration: "1½–2½ hours",
    shortDescription:
      "Climb above Lindos for ancient remains and a wide view of the coast.",
    detailedDescription:
      "The acropolis makes sense as part of a visit to the village below. Its elevated setting helps explain why this headland mattered long before modern beach holidays. Allow time to look at the surviving structures without rushing straight to the viewpoint; the climb is part of the outing.",
    usefulTips: [
      "Carry drinking water and protection from the sun.",
      "Confirm ticketing and step-free access before setting off; the approach involves a climb.",
    ],
    kind: "place",
    sourceIds: ["greekCulture", "rhodesTourism"],
  },
  {
    id: "palace-grand-master",
    name: "Palace of the Grand Master",
    category: "Architecture",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "See the monumental fortified palace at the top of the medieval town.",
    detailedDescription:
      "The palace is an imposing counterpoint to the narrow streets around it. Look for the relationship between its defensive exterior and ceremonial spaces, and keep in mind that restoration is part of the building’s story. Combine it with the Street of the Knights rather than trying to cross the island on the same afternoon.",
    usefulTips: [
      "Check which interior rooms or exhibitions are open.",
      "Do not assume an Old Town walking tour includes palace admission.",
    ],
    kind: "place",
    sourceIds: ["greekCulture", "rhodesTourism"],
  },
  {
    id: "rhodes-archaeological-museum",
    name: "Archaeological Museum of Rhodes",
    category: "Museums",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore island archaeology inside the former hospital of the Knights.",
    detailedDescription:
      "This is a chance to put the island’s ruins into context rather than seeing them as isolated stops. Move between objects and the historic building that houses them, noticing how the architecture shapes the visit. Choose a few displays to study closely instead of trying to absorb every label.",
    usefulTips: [
      "Confirm current galleries and admission with the museum.",
      "For children, choose a small object-finding challenge rather than a full gallery marathon.",
    ],
    kind: "place",
    sourceIds: ["greekCulture", "rhodesTourism"],
  },
  {
    id: "mandraki-harbor",
    name: "Mandraki Harbor Walk",
    category: "Outdoor activities",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "Follow the waterfront for boats, harbor views and a gentler pace.",
    detailedDescription:
      "A harbor walk offers a change of scale after the enclosed streets of the Old Town. Watch working boats and look back toward the waterfront architecture. This is a flexible outing rather than a fixed guided route: choose a comfortable section and turn back when you want a break.",
    usefulTips: [
      "Stay clear of working quays and vehicle access.",
      "Bring a wind layer if you plan to linger by the water.",
    ],
    kind: "experience",
    sourceIds: ["rhodesTourism"],
  },
  {
    id: "elli-beach",
    name: "Elli Beach",
    category: "Nature & beaches",
    estimatedDuration: "1–3 hours",
    shortDescription:
      "Pair a city visit with time beside the sea at Rhodes Town’s beach.",
    detailedDescription:
      "Elli is a practical option when you want a beach break without making a separate cross-island trip. Think of it as an urban seafront rather than a secluded cove. Choose your spot based on conditions on the day and leave time for a relaxed walk along the water.",
    usefulTips: [
      "Check local swimming advice and sea conditions before entering.",
      "Do not assume loungers, facilities or supervised swimming are available.",
    ],
    kind: "place",
    sourceIds: ["rhodesTourism", "greekTourism"],
  },
  {
    id: "anthony-quinn-bay",
    name: "Anthony Quinn Bay",
    category: "Nature & beaches",
    estimatedDuration: "1½–3 hours",
    shortDescription:
      "Discover a compact rocky bay on the island’s east coast.",
    detailedDescription:
      "The appeal here is the relationship between rocky shoreline and clear-looking water, not a long promenade of attractions. Allow time to find a safe place to sit and appreciate the cove from land. Swimming should be a decision based on actual conditions, your ability and local guidance.",
    usefulTips: [
      "Rocky approaches call for suitable footwear.",
      "Check access, parking and any seasonal services locally; carry out litter.",
    ],
    kind: "place",
    sourceIds: ["rhodesTourism", "greekTourism"],
  },
  {
    id: "butterfly-valley",
    name: "Valley of the Butterflies",
    category: "Nature & beaches",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Choose a shaded woodland outing with an emphasis on quiet observation.",
    detailedDescription:
      "The valley is a different side of Rhodes from its open beaches and stone towns. Follow designated paths and take time to notice the woodland environment. The insects associated with the valley are seasonal, so this should be planned as a nature walk rather than a guaranteed wildlife display.",
    usefulTips: [
      "Confirm seasonal access and whether sightings are likely before travelling.",
      "Do not clap, shake branches or disturb resting insects.",
    ],
    kind: "place",
    sourceIds: ["rhodesTourism", "greekTourism"],
  },
  {
    id: "kallithea-springs",
    name: "Kallithea Springs",
    category: "Architecture",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Look at seaside architecture, courtyards and the setting of a historic spa complex.",
    detailedDescription:
      "Kallithea offers a visit focused on the built environment beside the sea. Slow down for patterns, framed views and transitions between indoor and outdoor spaces. The historic spa identity should not be read as a promise of a working thermal bathing experience.",
    usefulTips: [
      "Check which parts of the complex are accessible on your date.",
      "Ask separately about beach access and any event-related restrictions.",
    ],
    kind: "place",
    sourceIds: ["rhodesTourism"],
  },
  {
    id: "rhodes-aquarium",
    name: "Aquarium of Rhodes",
    category: "Family activities",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "Plan a compact marine-themed visit at the northern end of Rhodes Town.",
    detailedDescription:
      "For families, a smaller indoor stop can provide a useful change from long walks in the sun. Let children choose a marine habitat or animal to learn about, then connect that conversation with the coastline outside. Exhibits and access need checking rather than being assumed from older guides.",
    usefulTips: [
      "Check current operation, tickets and exhibit availability first.",
      "Ask the venue about stroller and step-free access.",
    ],
    kind: "place",
    sourceIds: ["rhodesTourism"],
  },
  {
    id: "rhodes-taverna-table",
    name: "A Rhodian Taverna Table",
    category: "Food & drink",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "An experience category: share a meal and ask what is locally made and in season.",
    detailedDescription:
      "This is a way to approach dining, not an endorsement of a specific restaurant. Read the menu before sitting down and ask which dishes reflect the island’s cooking. Sharing a few plates can make a leisurely meal, but portions, ingredients and availability depend on the kitchen.",
    usefulTips: [
      "Tell staff about allergies and confirm ingredients rather than relying on dish names.",
      "Check menu prices and any cover charges before ordering.",
    ],
    kind: "experience",
    sourceIds: ["greekTourism", "rhodesTourism"],
  },
  {
    id: "koskinou-village",
    name: "Koskinou Village Walk",
    category: "Local experiences",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Explore a traditional village at a respectful, unhurried walking pace.",
    detailedDescription:
      "Look for the small-scale details of village streets and house fronts rather than treating private homes as attractions to enter. A visit works best as a short wander with a café stop if a suitable place is open. Keep space for everyday life and ask permission before photographing residents.",
    usefulTips: [
      "Do not enter courtyards or homes without an invitation.",
      "Check onward transport before leaving Rhodes Town.",
    ],
    kind: "experience",
    sourceIds: ["rhodesTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "rhodes",
    name: "Rhodes",
    country: "Greece",
    countryCode: "GR",
    region: "Dodecanese, Southern Europe",
    searchAliases: ["Dodecanese"],
    category: "Coast",
    tagline: "A little closer to paradise.",
    description:
      "Follow sunlit lanes through a medieval old town, swim in turquoise coves and linger over long lunches by the Aegean. Rhodes brings slow island days and centuries of history together.",
    sourceIds: ["rhodesTourism"],
    coordinateLabel:
      "Rhodes legacy destination overview; location source review pending",
    legacyCoordinates: {
      latitude: 36.4341,
      longitude: 28.2176,
    },
  },
  entries.map((entry) => buildAttraction(entry)),
);
