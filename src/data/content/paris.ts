import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "paris-louvre",
    name: "Louvre Museum",
    category: "Museums",
    estimatedDuration: "2–4 hours",
    shortDescription:
      "Choose a small collection route instead of trying to see the whole museum.",
    detailedDescription:
      "Decide on a period, region or material that interests you before arriving. A few rooms explored carefully can be more rewarding than following every famous-work sign. The palace setting is part of the experience, but visitor routes and displays can change.",
    usefulTips: [
      "Confirm current entry reservations and gallery access.",
      "Choose a meeting point for your group and check bag rules.",
    ],
    kind: "place",
    sourceIds: ["parisTourism"],
  },
  {
    id: "paris-orsay",
    name: "Musée d’Orsay",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Explore art in a former station building with time for its architectural setting.",
    detailedDescription:
      "Pay attention to both the works and the scale of the converted station. A focused route through a few rooms can reveal connections between painting, sculpture and the period’s changing society. Temporary exhibitions may have separate arrangements.",
    usefulTips: [
      "Check current ticket and exhibition inclusions.",
      "Plan breaks and confirm photography restrictions.",
    ],
    kind: "place",
    sourceIds: ["parisTourism"],
  },
  {
    id: "paris-eiffel-tower",
    name: "Eiffel Tower and Champ de Mars",
    category: "Architecture",
    estimatedDuration: "1–3 hours",
    shortDescription:
      "Separate an exterior landmark walk from any reserved tower visit.",
    detailedDescription:
      "Look at the tower from more than one public viewpoint before deciding whether an ascent suits your plans. The park and surrounding streets provide context without guaranteeing access to the structure itself. Controlled visitor areas require current official guidance.",
    usefulTips: [
      "Check official tickets and security arrangements for an ascent.",
      "Follow barriers and do not assume all park areas are accessible during events.",
    ],
    kind: "place",
    sourceIds: ["parisTourism"],
  },
  {
    id: "paris-notre-dame",
    name: "Notre-Dame and Île de la Cité",
    category: "History & culture",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Explore the cathedral’s setting and confirm any interior visit independently.",
    detailedDescription:
      "A walk around the island helps place the cathedral within the river and the city’s earlier core. Restoration, worship and visitor management can affect access. Treat the exterior outing and any interior reservation as separate decisions.",
    usefulTips: [
      "Check the cathedral’s current official visitor arrangements.",
      "Respect worship and avoid relying on older access advice.",
    ],
    kind: "place",
    sourceIds: ["parisTourism"],
  },
  {
    id: "paris-montmartre",
    name: "Montmartre Neighborhood Walk",
    category: "Local experiences",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore hill streets while leaving room for the neighborhood’s residents.",
    detailedDescription:
      "Choose a route with both small streets and public viewpoints, rather than treating one square as the entire district. Slopes and stairs influence the pace. Artists’ stalls, religious spaces and private buildings are distinct from public street access.",
    usefulTips: [
      "Plan an approach that suits your mobility.",
      "Ask permission before photographing people or artwork for sale.",
    ],
    kind: "experience",
    sourceIds: ["parisTourism"],
  },
  {
    id: "paris-luxembourg",
    name: "Luxembourg Gardens",
    category: "Nature & beaches",
    estimatedDuration: "1–1½ hours",
    shortDescription: "Take a relaxed garden pause between longer city visits.",
    detailedDescription:
      "Choose a seat or a short path and notice how formal planting and everyday use coexist. This works as a break rather than a timetable of attractions. Individual activities, play areas or buildings have their own access conditions.",
    usefulTips: [
      "Follow posted garden rules and seasonal access notices.",
      "Do not assume activities or equipment hire are operating.",
    ],
    kind: "place",
    sourceIds: ["parisTourism"],
  },
  {
    id: "paris-natural-history",
    name: "Jardin des Plantes and Natural History Visit",
    category: "Family activities",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Combine a garden walk with a carefully selected natural-history venue.",
    detailedDescription:
      "Choose one indoor collection or family focus rather than treating the whole campus as a single included attraction. The garden can provide a change of pace between exhibits. Each venue may have different tickets, access rules and opening arrangements.",
    usefulTips: [
      "Check which galleries are open and what each ticket includes.",
      "Confirm age suitability and accessibility before choosing activities.",
    ],
    kind: "place",
    sourceIds: ["parisTourism"],
  },
  {
    id: "paris-paris-bakery",
    name: "A Paris Bakery and Café Stop",
    category: "Food & drink",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "An experience category: choose baked goods and a pause at a business you select.",
    detailedDescription:
      "Compare what is being made and ask about ingredients rather than following a supposedly essential address. A bakery purchase and a seated café visit may be different transactions. No vendor or product availability is guaranteed by this suggestion.",
    usefulTips: [
      "Confirm ingredients and allergy handling before ordering.",
      "Check whether prices differ for takeaway and table service.",
    ],
    kind: "experience",
    sourceIds: ["parisTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "paris",
    name: "Paris",
    country: "France",
    countryCode: "FR",
    region: "Île-de-France, Western Europe",
    searchAliases: ["Ile de France"],
    category: "Culture",
    tagline: "Give the familiar city a closer look.",
    description:
      "Combine one focused collection visit with public spaces, neighborhood details and a deliberate café pause. Separate exterior landmark walks from reserved interior experiences, and allow time to cross the city.",
    sourceIds: ["parisTourism"],
    coordinateLabel: "Paris city overview, not a venue entrance",
    coordinateRef: "paris",
  },
  entries.map((entry) => buildAttraction(entry)),
);
