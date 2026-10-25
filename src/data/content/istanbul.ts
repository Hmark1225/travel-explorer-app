import {
  buildAttraction,
  buildDestination,
  type AttractionEntry,
} from "../builders.ts";
const entries = [
  {
    id: "istanbul-hagia-sophia",
    name: "Hagia Sophia",
    category: "History & culture",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Plan a respectful visit using current religious and visitor-access guidance.",
    detailedDescription:
      "The building’s long history needs more than an architectural glance. Begin by understanding its current religious role and which visitor areas are actually accessible. Older travel advice may not reflect present ticketing, route or worship arrangements.",
    usefulTips: [
      "Check current official visitor rules before travelling.",
      "Follow dress, footwear and prayer-related access guidance.",
    ],
    kind: "place",
    sourceIds: ["istanbulTourism"],
  },
  {
    id: "istanbul-topkapi",
    name: "Topkapı Palace",
    category: "Museums",
    estimatedDuration: "2–4 hours",
    shortDescription:
      "Choose a focused route through a large palace complex and its collections.",
    detailedDescription:
      "Think of the palace as a connected group of courtyards and visitor spaces rather than a single room sequence. Decide which areas matter most to your visit, and confirm any separate inclusions before purchasing admission.",
    usefulTips: [
      "Check official ticket inclusions and current open sections.",
      "Allow for security and ask about accessibility of your chosen route.",
    ],
    kind: "place",
    sourceIds: ["istanbulTourism"],
  },
  {
    id: "istanbul-blue-mosque",
    name: "Sultan Ahmed Mosque",
    category: "Architecture",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "Approach a major mosque as a place of worship with visitor responsibilities.",
    detailedDescription:
      "Take time to observe the exterior and the surrounding public space before considering an interior visit. The visitor experience follows religious use and local management, not a sightseeing timetable. Enter only through the permitted visitor route.",
    usefulTips: [
      "Confirm current visitor and prayer-related access arrangements.",
      "Follow local dress, footwear and photography guidance.",
    ],
    kind: "place",
    sourceIds: ["istanbulTourism"],
  },
  {
    id: "istanbul-basilica-cistern",
    name: "Basilica Cistern",
    category: "Architecture",
    estimatedDuration: "45–90 minutes",
    shortDescription:
      "Look at an underground water-storage space through its visitor interpretation.",
    detailedDescription:
      "Notice the scale, rhythm of columns and the relationship between engineering and atmosphere. Managed walkways define the route, and lighting or exhibitions can change. Check the current visitor format rather than assuming a particular display or performance.",
    usefulTips: [
      "Confirm current ticketing and entry arrangements.",
      "Take care on low-light routes and follow all barriers.",
    ],
    kind: "place",
    sourceIds: ["istanbulTourism"],
  },
  {
    id: "istanbul-archaeology-museums",
    name: "Istanbul Archaeological Museums",
    category: "Museums",
    estimatedDuration: "2–3 hours",
    shortDescription:
      "Choose a collection route that puts objects into their wider historical context.",
    detailedDescription:
      "The museum setting offers a different pace from the busiest monument visits. Focus on a small number of themes and read the interpretation closely. Individual buildings or galleries may have different access during works or collection changes.",
    usefulTips: [
      "Check which buildings and galleries are currently open.",
      "Confirm accessibility, bag rules and photography conditions.",
    ],
    kind: "place",
    sourceIds: ["istanbulTourism"],
  },
  {
    id: "istanbul-grand-bazaar",
    name: "Grand Bazaar Browse",
    category: "Local experiences",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "Explore a working trading environment without treating it as a fixed shopping tour.",
    detailedDescription:
      "Choose a manageable section and allow time to look at materials and workmanship. Shops are independent businesses, and neither product origins nor purchasing conditions should be assumed. Browsing is separate from any promise of a bargain.",
    usefulTips: [
      "Confirm prices, currency and any purchase conditions before agreeing.",
      "Ask before photographing workers or displays.",
    ],
    kind: "experience",
    sourceIds: ["istanbulTourism"],
  },
  {
    id: "istanbul-bosphorus-waterfront",
    name: "Bosphorus Waterfront Walk",
    category: "Outdoor activities",
    estimatedDuration: "1–2 hours",
    shortDescription:
      "Choose a defined public waterfront section rather than an assumed continuous route.",
    detailedDescription:
      "The strait can be appreciated from land without arranging a boat trip. Use a current map to select a safe pedestrian stretch and an endpoint near transport. Private properties and roads can interrupt access, so do not assume every shoreline segment connects.",
    usefulTips: [
      "Verify the actual pedestrian route and return transport.",
      "Stay away from working quays and exposed edges in poor weather.",
    ],
    kind: "experience",
    sourceIds: ["istanbulTourism"],
  },
  {
    id: "istanbul-kadikoy-food",
    name: "Kadıköy Market-Neighborhood Food Walk",
    category: "Food & drink",
    estimatedDuration: "1½–2 hours",
    shortDescription:
      "An experience category: explore a food neighborhood and select purchases independently.",
    detailedDescription:
      "Look at everyday trade and compare menus or stalls where open. Ask about ingredients and origins rather than expecting a guaranteed tasting sequence. This is not an endorsed vendor list or an organized tour with transport included.",
    usefulTips: [
      "Check your return transport across the city before lingering.",
      "Confirm prices and allergy information directly with each business.",
    ],
    kind: "experience",
    sourceIds: ["istanbulTourism"],
  },
] satisfies AttractionEntry[];
export const destination = buildDestination(
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Türkiye",
    countryCode: "TR",
    region: "Marmara, Europe and Asia",
    searchAliases: ["Istanbul", "İstanbul", "Turkey", "Eastern Thrace"],
    category: "Culture",
    tagline: "A city shaped by crossings.",
    description:
      "Approach major monuments through their current religious and civic roles, then make room for neighborhood trade and public waterfront time. Long distances and separate visitor arrangements reward a selective plan.",
    sourceIds: ["istanbulTourism"],
    coordinateLabel:
      "Istanbul city overview, not a venue entrance or ferry terminal",
    coordinateRef: "istanbul",
  },
  entries.map((entry) => buildAttraction(entry)),
);
