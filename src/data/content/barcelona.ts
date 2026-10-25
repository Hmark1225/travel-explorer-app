import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "barcelona-sagrada-familia",
    name: "Sagrada Família",
    category: "Architecture",
    estimatedDuration: "1½–2½ hours",
    shortDescription:
      "Study a major architectural work through its exterior and a separately arranged interior visit.",
    detailedDescription:
      "Walk around the public exterior first to notice how the facades differ. An interior visit is a controlled experience whose format and included areas need checking. The building’s religious role should be respected alongside its architectural interest.",
    usefulTips: [
      "Use current official ticket and entry information.",
      "Check dress, bag and tower-access conditions rather than assuming inclusion.",
    ],
    kind: "place",
    sourceIds: ["barcelonaTourism"],
  },
  {
    id: "barcelona-park-guell",
    name: "Park Güell",
    category: "Architecture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Look at the interaction of designed structures, paths and hillside views.",
    detailedDescription:
      "Choose a route that balances the best-known features with time to notice materials and planting. A park setting does not imply that all areas are freely accessible or step-free. Confirm the visitor arrangements for the area you intend to see.",
    usefulTips: [
      "Check official admission and access zones before travelling.",
      "Allow for slopes and ask about accessible routes.",
    ],
    kind: "place",
    sourceIds: ["barcelonaTourism"],
  },
  {
    id: "barcelona-gothic-quarter",
    name: "Gothic Quarter Walk",
    category: "History & culture",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore public streets and squares in the historic center.",
    detailedDescription:
      "Treat the quarter as a lived-in neighborhood with a long and sometimes reconstructed architectural story. Choose a few public spaces and look carefully rather than expecting every old-looking feature to date from the same period.",
    usefulTips: [
      "Respect residents and keep narrow lanes clear.",
      "Check individual religious or museum entry conditions separately.",
    ],
    kind: "experience",
    sourceIds: ["barcelonaTourism"],
  },
  {
    id: "barcelona-mnac",
    name: "National Art Museum of Catalonia",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Choose a focused path through Catalan art in a monumental museum setting.",
    detailedDescription:
      "Pick a period or medium rather than attempting the full collection in one pass. The building’s hilltop setting can form part of the outing, but exhibitions, terraces and collections may have distinct access arrangements.",
    usefulTips: [
      "Check current galleries and ticket inclusions.",
      "Plan an accessible approach or allow for uphill walking.",
    ],
    kind: "place",
    sourceIds: ["barcelonaTourism"],
  },
  {
    id: "barcelona-montjuic",
    name: "Montjuïc Gardens Walk",
    category: "Outdoor activities",
    estimatedDuration: "1½–3 hours",
    shortDescription:
      "Plan a defined hillside walk between public garden spaces.",
    detailedDescription:
      "Montjuïc is a broad area rather than one attraction with a single route. Choose a start and finish that fit your energy, and make separate decisions about museums or other venues. Transport services and individual garden access can vary.",
    usefulTips: [
      "Check current path access and transport connections.",
      "Carry water and do not assume every connecting path is step-free.",
    ],
    kind: "experience",
    sourceIds: ["barcelonaTourism"],
  },
  {
    id: "barcelona-barceloneta",
    name: "Barceloneta Seafront Walk",
    category: "Nature & beaches",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Explore a section of the urban waterfront at an unhurried pace.",
    detailedDescription:
      "A public seafront walk can be worthwhile even when swimming is not suitable. Notice the relationship between neighborhood streets and the beach, and choose a comfortable turning point. Beach facilities and conditions must be checked on the day.",
    usefulTips: [
      "Follow posted swimming flags and local guidance.",
      "Keep belongings secure and respect cycling lanes.",
    ],
    kind: "experience",
    sourceIds: ["barcelonaTourism"],
  },
  {
    id: "barcelona-boqueria",
    name: "La Boqueria Market Browse",
    category: "Food & drink",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "Browse a working food market without relying on a particular vendor.",
    detailedDescription:
      "Look beyond the first display and compare ingredients and offers where stalls are open. This is an independent visit, not a guaranteed tasting or food tour. Shopping and photographs should leave room for people doing their everyday trade.",
    usefulTips: [
      "Check trading days and ask before photographing stall staff.",
      "Confirm prices and allergy information before purchasing.",
    ],
    kind: "experience",
    sourceIds: ["barcelonaTourism"],
  },
  {
    id: "barcelona-cosmocaixa",
    name: "CosmoCaixa Barcelona",
    category: "Family activities",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Consider a science-focused family visit with time for curiosity and questions.",
    detailedDescription:
      "Let your group choose a few themes rather than racing between every display. Interactive elements, special sessions and additional activities depend on current operation. Read the venue’s guidance to decide what suits the ages and interests of your group.",
    usefulTips: [
      "Check current exhibitions and any separate session reservations.",
      "Confirm accessibility and age guidance for additional activities.",
    ],
    kind: "place",
    sourceIds: ["barcelonaTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    countryCode: "ES",
    region: "Catalonia, Southern Europe",
    searchAliases: ["Catalunya", "Catalonia"],
    category: "City breaks",
    tagline: "Architecture, neighborhoods, sea air.",
    description:
      "Connect distinctive buildings with a focused art visit, a neighborhood walk and time near the water. Choose a few areas each day so that transport and hills do not crowd out the experience of the city itself.",
    sourceIds: ["barcelonaTourism"],
    coordinateLabel: "Barcelona city overview, not a venue entrance",
    coordinateRef: "barcelona",
  },
  entries.map((entry) => buildAttraction(entry)),
);
