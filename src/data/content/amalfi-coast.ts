import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "amalfi-coast-amalfi-town",
    name: "Amalfi Town Walk",
    category: "Local experiences",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore the streets around the cathedral square and the town’s public waterfront.",
    detailedDescription:
      "Treat Amalfi as a small coastal town rather than a transport interchange between photo stops. Follow a few lanes away from the busiest square and pause where public space allows. The overview marker identifies the town, not a verified walking-tour start.",
    usefulTips: [
      "Keep steps and delivery routes clear.",
      "Confirm onward transport before setting out along the coast.",
    ],
    kind: "experience",
    sourceIds: ["italyTourism"],
    coordinateRef: "amalfi-town",
  },
  {
    id: "amalfi-coast-cathedral",
    name: "Amalfi Cathedral Complex",
    category: "Architecture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Consider the cathedral’s monumental approach and its different visitor spaces.",
    detailedDescription:
      "The relationship between the square and the broad staircase is part of the experience. Look at the exterior before deciding which parts of the complex to enter. Religious use and separate visitor areas can affect access.",
    usefulTips: [
      "Check current religious-service and visitor arrangements.",
      "Expect steps and ask about alternative access if needed.",
    ],
    kind: "place",
    sourceIds: ["italyTourism"],
  },
  {
    id: "amalfi-coast-paper-museum",
    name: "Amalfi Paper Museum",
    category: "Museums",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "Learn about a craft tradition that shaped the town’s working history.",
    detailedDescription:
      "The paper-making story offers a useful counterpoint to coastal scenery. Focus on how water, materials and labor connect rather than treating the museum as only an indoor weather option. Demonstrations or guided formats depend on the venue.",
    usefulTips: [
      "Confirm the current visitor format and any demonstration schedule.",
      "Ask about accessibility and whether reservations are needed.",
    ],
    kind: "place",
    sourceIds: ["italyTourism"],
  },
  {
    id: "amalfi-coast-ravello",
    name: "Ravello Village Walk",
    category: "Local experiences",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore a hilltop town with time for small squares and outward views.",
    detailedDescription:
      "Ravello rewards a compact walk rather than a hurried transfer between gardens. Notice how lanes and terraces relate to the slopes around them. This is a town overview, with individual villas and events treated as separate visits.",
    usefulTips: [
      "Allow time for the journey up and down the hillside.",
      "Do not assume access to private gardens or event spaces.",
    ],
    kind: "experience",
    sourceIds: ["italyTourism"],
    coordinateRef: "ravello",
  },
  {
    id: "amalfi-coast-villa-rufolo",
    name: "Villa Rufolo",
    category: "Architecture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Look at the relationship between historic buildings, gardens and the coastal setting.",
    detailedDescription:
      "Take time to move between architectural details and broader views rather than only visiting one photographic spot. The experience may vary with garden access, works or events. Confirm what is included in a standard visit before travelling.",
    usefulTips: [
      "Check current opening, admission and event-related restrictions.",
      "Confirm step-free routes and avoid leaning over terrace barriers.",
    ],
    kind: "place",
    sourceIds: ["italyTourism"],
  },
  {
    id: "amalfi-coast-positano",
    name: "Positano Public-Lanes Walk",
    category: "Architecture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Experience a steep coastal settlement through its public streets and viewpoints.",
    detailedDescription:
      "A walk here is shaped by gradients and stairs as much as by colorful buildings. Choose a route you can comfortably reverse and leave time to pause. Public lanes are not permission to enter hotels, terraces or private beach facilities.",
    usefulTips: [
      "Wear shoes suited to steps and slopes.",
      "Check return transport rather than relying on a late connection.",
    ],
    kind: "experience",
    sourceIds: ["italyTourism"],
    coordinateRef: "positano",
  },
  {
    id: "amalfi-coast-path-of-gods",
    name: "Path of the Gods Hike",
    category: "Outdoor activities",
    estimatedDuration: "3–5 hours",
    shortDescription:
      "A hiking experience category along a celebrated coastal trail, subject to route review.",
    detailedDescription:
      "This is a substantial outdoor outing rather than a casual viewpoint stop. Choose a specific start, end and escape plan from current local guidance. Terrain, exposure and weather can make a nominal walking time a poor guide to actual effort.",
    usefulTips: [
      "Check current trail closures, weather and local safety advice.",
      "Carry water and suitable equipment; do not start without a return plan.",
    ],
    kind: "experience",
    sourceIds: ["italyTourism"],
  },
  {
    id: "amalfi-coast-lemon-food",
    name: "A Coastal Lemon-Flavored Food Stop",
    category: "Food & drink",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "An experience category: ask about local citrus products at a chosen food business.",
    detailedDescription:
      "Explore the coast’s food identity through a product or dish that genuinely interests you. Ask where ingredients come from and compare labels instead of assuming every souvenir is locally made. This is not a promised farm visit, tasting or vendor endorsement.",
    usefulTips: [
      "Confirm ingredients, alcohol content and allergy information.",
      "Check prices and purchasing conditions before accepting a tasting.",
    ],
    kind: "experience",
    sourceIds: ["italyTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    countryCode: "IT",
    region: "Campania, Southern Europe",
    searchAliases: ["Costiera Amalfitana", "Amalfi", "Positano", "Ravello"],
    category: "Coast",
    tagline: "Small towns, a wide horizon.",
    description:
      "Choose a few coastal and hill-town experiences rather than trying to cover the entire coastline in one day. Streets, gardens and walking routes reward time, while steep terrain and transport deserve careful planning.",
    sourceIds: ["italyTourism"],
    coordinateLabel:
      "Amalfi town overview for the Amalfi Coast region; not the entire coast or a trailhead",
    coordinateRef: "amalfi-coast",
  },
  entries.map((entry) => buildAttraction(entry)),
);
