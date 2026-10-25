import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "naples-archaeological-museum",
    name: "National Archaeological Museum of Naples",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Use ancient objects to put the region’s archaeological sites in context.",
    detailedDescription:
      "Choose a few collection themes and look closely at how objects were used rather than treating them as isolated treasures. The museum can prepare you for a later archaeological outing, but its displays and surrounding sites are separate visits.",
    usefulTips: [
      "Check the museum for current rooms and ticket arrangements.",
      "Leave time for a break instead of planning every gallery.",
    ],
    kind: "place",
    sourceIds: ["naplesTourism"],
  },
  {
    id: "naples-spaccanapoli",
    name: "Spaccanapoli Historic-Center Walk",
    category: "History & culture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Follow a lively historic-center route with room for short detours.",
    detailedDescription:
      "The experience lies in the relationship between narrow streets, church fronts and daily commerce. Move at neighborhood pace and choose a few stopping points. Entering a church, workshop or other venue requires checking that place’s own conditions.",
    usefulTips: [
      "Stay alert to delivery vehicles and scooters.",
      "Ask before photographing people or the inside of workshops.",
    ],
    kind: "experience",
    sourceIds: ["naplesTourism"],
  },
  {
    id: "naples-sansevero",
    name: "Sansevero Chapel",
    category: "Architecture",
    estimatedDuration: "45–60 minutes",
    shortDescription:
      "Plan an attentive visit to a concentrated sculptural interior.",
    detailedDescription:
      "This is a small-scale visit where close looking matters more than distance covered. Notice the way sculpture, materials and the room’s decorative program work together. Arrange access from current official information rather than assuming you can walk in.",
    usefulTips: [
      "Check reservation and photography rules directly with the chapel.",
      "Allow time for the stated entry procedure without blocking nearby streets.",
    ],
    kind: "place",
    sourceIds: ["naplesTourism"],
  },
  {
    id: "naples-castel-dell-ovo",
    name: "Castel dell’Ovo and Borgo Marinari Exteriors",
    category: "Architecture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Walk the waterfront setting of a prominent coastal castle.",
    detailedDescription:
      "The castle’s position explains much of its visual impact, even on an exterior-only walk. Explore the public waterfront approaches where permitted and look back at the city. Do not treat the exterior itinerary as a promise that the castle interior is open.",
    usefulTips: [
      "Confirm current works and access restrictions.",
      "Use designated pedestrian routes around waterfront traffic.",
    ],
    kind: "experience",
    sourceIds: ["naplesTourism"],
  },
  {
    id: "naples-lungomare",
    name: "Lungomare Seafront Walk",
    category: "Outdoor activities",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Take a slower city break along a stretch of the waterfront.",
    detailedDescription:
      "Choose a manageable section and use the changing shoreline views as the main attraction. A café stop is optional and independent of the walk. Conditions vary with weather and events, so a flexible return route is more useful than a fixed schedule.",
    usefulTips: [
      "Check weather and avoid exposed edges in rough conditions.",
      "Keep cycle lanes and pedestrian crossings clear.",
    ],
    kind: "experience",
    sourceIds: ["naplesTourism"],
  },
  {
    id: "naples-capodimonte",
    name: "Capodimonte Museum and Park",
    category: "Museums",
    estimatedDuration: "2–4 hours",
    shortDescription:
      "Combine a focused art visit with a separate walk in the surrounding grounds.",
    detailedDescription:
      "Decide whether the museum or the park is your main goal before arriving. The collections invite close looking, while the grounds offer a change of pace. They should not be assumed to share identical opening arrangements or access conditions.",
    usefulTips: [
      "Confirm which galleries and park entrances are currently open.",
      "Plan transport back and check step-free access if needed.",
    ],
    kind: "place",
    sourceIds: ["naplesTourism"],
  },
  {
    id: "naples-san-gennaro",
    name: "Catacombs of San Gennaro",
    category: "History & culture",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "Approach an underground heritage site through its historical and religious context.",
    detailedDescription:
      "A visit should give time to the interpretation of burial spaces and changing religious traditions. Access to an underground site is a distinct managed experience, not simply a walk through a neighborhood. Confirm the actual visitor format before making plans.",
    usefulTips: [
      "Check current tour, language and reservation arrangements.",
      "Ask about steps, surfaces and accessibility before booking.",
    ],
    kind: "place",
    sourceIds: ["naplesTourism"],
  },
  {
    id: "naples-pizza",
    name: "A Neapolitan Pizza Meal",
    category: "Food & drink",
    estimatedDuration: "1–1½ hours",
    shortDescription:
      "An experience category: compare menus and enjoy a pizza at your chosen pizzeria.",
    detailedDescription:
      "Pay attention to dough, toppings and the pace of the meal without chasing a single supposedly essential venue. This guide does not endorse a business or guarantee a queue-free table. Choose a place whose menu and arrangements suit you.",
    usefulTips: [
      "Check the menu and any cover or service charges before ordering.",
      "Discuss allergies directly; a traditional recipe is not a dietary guarantee.",
    ],
    kind: "experience",
    sourceIds: ["naplesTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "naples",
    name: "Naples",
    country: "Italy",
    countryCode: "IT",
    region: "Campania, Southern Europe",
    searchAliases: ["Napoli"],
    category: "City breaks",
    tagline: "A city with an unmistakable pulse.",
    description:
      "Connect archaeological collections, layered streets and a working waterfront. Leave space for a meal you choose on the day, and plan indoor visits separately from the lively public spaces around them.",
    sourceIds: ["naplesTourism"],
    coordinateLabel: "Naples city overview, not a venue entrance",
    coordinateRef: "naples",
  },
  entries.map((entry) => buildAttraction(entry)),
);
