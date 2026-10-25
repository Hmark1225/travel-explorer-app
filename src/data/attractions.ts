import type { Attraction } from "./models";
import { sources } from "./sources.ts";
export const placeholderPhoto = {
  kind: "placeholder",
  url: null,
  attribution: null,
  license: null,
  commercialUseAllowed: null,
  licenseUrl: null,
  sourceUrl: null,
  verifiedAt: null,
} as const;
export const admissionLabels = {
  free: "Free admission — confirm current conditions",
  paid: "Paid admission — check current tickets",
  varies: "Admission varies by area or activity",
  unknown: "Admission not verified — check before visiting",
} as const;
/** Each record can acquire reviewed fields independently without changing the adapter. */
type Entry = Pick<
  Attraction,
  | "id"
  | "name"
  | "category"
  | "estimatedDuration"
  | "shortDescription"
  | "detailedDescription"
  | "usefulTips"
  | "kind"
  | "sourceIds"
> &
  Partial<
    Pick<
      Attraction,
      | "admissionType"
      | "latitude"
      | "longitude"
      | "coordinatesVerifiedAt"
      | "coordinateSourceUrl"
      | "officialWebsite"
      | "officialWebsiteVerifiedAt"
      | "lastVerifiedAt"
      | "reviewStatus"
      | "photo"
    >
  >;
function build(entry: Entry): Attraction {
  const place = {
    admissionType: "unknown" as Attraction["admissionType"],
    latitude: null as number | null,
    longitude: null as number | null,
    coordinatesVerifiedAt: null as string | null,
    coordinateSourceUrl: null as string | null,
    officialWebsite: null as string | null,
    officialWebsiteVerifiedAt: null as string | null,
    lastVerifiedAt: null as string | null,
    reviewStatus: "needs-review" as Attraction["reviewStatus"],
    photo: placeholderPhoto as Attraction["photo"],
    ...entry,
  };
  return {
    ...place,
    sourceUrls: entry.sourceIds.map((id) => sources[id].url),
    description: entry.detailedDescription,
    duration: entry.estimatedDuration,
    price: admissionLabels[place.admissionType],
    image: place.photo.url,
  };
}
export const rhodesAttractions: Attraction[] = (
  [
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
  ] satisfies Entry[]
).map(build);
export const romeAttractions: Attraction[] = (
  [
    {
      id: "colosseum",
      name: "The Colosseum",
      category: "History & culture",
      estimatedDuration: "2–3 hours",
      shortDescription:
        "Read the scale and structure of Rome’s great amphitheater from inside and out.",
      detailedDescription:
        "Walk around the exterior before going in to understand how the arches and tiers fit together. Inside, focus on the organization of spectators and the machinery of spectacle rather than only the famous arena view. Different visit products may include different areas; a ticket should be checked carefully before purchase.",
      usefulTips: [
        "Use the park’s official ticket information and check entry requirements.",
        "Leave time for security and do not assume every ticket includes the underground areas.",
      ],
      kind: "place",
      sourceIds: ["colosseum", "romeTourism"],
    },
    {
      id: "trevi",
      name: "Trevi Fountain",
      category: "Architecture",
      estimatedDuration: "30–45 minutes",
      shortDescription:
        "Study a dramatic Baroque fountain where sculpture and street life meet.",
      detailedDescription:
        "The fountain is best appreciated as a whole stage set: rock, figures, water and the building behind them work together. Give yourself a moment away from the most crowded photo position to take it in. Access arrangements can change, so a familiar public square should not be treated as evidence of current entry rules.",
      usefulTips: [
        "Check current approach and access rules before your visit.",
        "Keep bags close in crowded areas and follow barriers and steward instructions.",
      ],
      kind: "place",
      sourceIds: ["romeTourism"],
    },
    {
      id: "roman-forum",
      name: "Roman Forum and Palatine Hill",
      category: "History & culture",
      estimatedDuration: "2–3 hours",
      shortDescription:
        "Trace the remains of civic and imperial Rome across an expansive archaeological area.",
      detailedDescription:
        "This is a landscape of fragments rather than a single building. Choose a small number of landmarks and use their positions to imagine the public spaces between them. Combining the Forum and Palatine can be rewarding, but long distances and exposed stretches make pacing more useful than a packed checklist.",
      usefulTips: [
        "Bring water and shoes suitable for uneven archaeological paths.",
        "Check your ticket’s included areas and re-entry rules.",
      ],
      kind: "place",
      sourceIds: ["colosseum", "romeTourism"],
    },
    {
      id: "pantheon",
      name: "The Pantheon",
      category: "Architecture",
      estimatedDuration: "45–60 minutes",
      shortDescription:
        "Look up into a remarkable domed interior organized around an open oculus.",
      detailedDescription:
        "Start by noticing the transition from the busy square to the portico, then the sudden scale of the interior. The circular space and changing light are the main experience. It remains a religious setting, so a visit should accommodate worship and the rules in force on the day.",
      usefulTips: [
        "Check official ticket and religious-service arrangements.",
        "Dress respectfully and follow photography and quiet-area guidance.",
      ],
      kind: "place",
      sourceIds: ["romeTourism"],
    },
    {
      id: "capitoline-museums",
      name: "Capitoline Museums",
      category: "Museums",
      estimatedDuration: "2–3 hours",
      shortDescription:
        "Give Roman sculpture and civic history a focused museum visit.",
      detailedDescription:
        "The Capitoline setting links the city’s identity with collections assembled across centuries. Pick a theme such as portraiture or public monuments, then follow it through a manageable part of the museum. Leave time to look at the square outside; the approach is part of the experience.",
      usefulTips: [
        "Consult the museum for current exhibitions and ticket inclusions.",
        "Choose a few priority rooms rather than combining too many museums in one day.",
      ],
      kind: "place",
      sourceIds: ["capitoline", "romeTourism"],
    },
    {
      id: "galleria-borghese",
      name: "Galleria Borghese",
      category: "Museums",
      estimatedDuration: "1½–2 hours",
      shortDescription:
        "Plan a concentrated encounter with sculpture and painting in a villa setting.",
      detailedDescription:
        "The intimacy of rooms filled with major works makes this a visit for close looking. Allow time to move around sculpture where permitted, and notice the relationship between artworks and the decorated interiors. Treat entry as something to arrange in advance, with the actual booking conditions confirmed by the gallery.",
      usefulTips: [
        "Confirm reservation requirements directly with the gallery.",
        "Check bag-storage rules and arrive in time for the stated entry procedure.",
      ],
      kind: "place",
      sourceIds: ["borghese", "romeTourism"],
    },
    {
      id: "villa-borghese",
      name: "Villa Borghese Park Walk",
      category: "Outdoor activities",
      estimatedDuration: "1–2 hours",
      shortDescription:
        "Trade busy streets for paths, trees and a flexible park outing.",
      detailedDescription:
        "The park offers breathing room between indoor visits and historic-center walks. Choose a manageable loop and pause when a view or shaded seat appeals. This is a self-guided outdoor experience; rentals, attractions and other services within the park have their own arrangements.",
      usefulTips: [
        "Use a current local map to choose an exit near your next stop.",
        "Do not assume park services or rentals are included with any museum ticket.",
      ],
      kind: "experience",
      sourceIds: ["romeTourism"],
    },
    {
      id: "piazza-navona",
      name: "Piazza Navona",
      category: "Architecture",
      estimatedDuration: "30–60 minutes",
      shortDescription:
        "Look at fountains, church fronts and the shape of a celebrated Roman square.",
      detailedDescription:
        "Walk the length of the square to notice its elongated form before focusing on individual monuments. A few minutes at the edges can reveal more than joining the busiest photo cluster. Cafés are independent businesses, so sitting at a table is a separate choice from enjoying the public space.",
      usefulTips: [
        "Check a menu before taking a café table.",
        "Follow local rules around fountains; they are monuments, not bathing places.",
      ],
      kind: "place",
      sourceIds: ["romeTourism"],
    },
    {
      id: "trastevere-walk",
      name: "Trastevere Neighborhood Walk",
      category: "Local experiences",
      estimatedDuration: "1½–2 hours",
      shortDescription:
        "Explore neighborhood streets with time for small discoveries and a café break.",
      detailedDescription:
        "This is a self-guided neighborhood experience rather than a promise of an untouched secret district. Move beyond the busiest corners, notice church exteriors and residential streets, and pause somewhere that suits your pace. Keep the visit considerate: evening crowds share the area with people who live there.",
      usefulTips: [
        "Keep noise down late in the day.",
        "Confirm individual church access and dress requirements before entering.",
      ],
      kind: "experience",
      sourceIds: ["romeTourism"],
    },
    {
      id: "testaccio-food",
      name: "A Taste of Testaccio",
      category: "Food & drink",
      estimatedDuration: "1½–2 hours",
      shortDescription:
        "An experience category: explore a food neighborhood and choose a meal on the day.",
      detailedDescription:
        "Use Testaccio as a place to ask questions about Roman cooking rather than chasing a single must-eat item. Compare menus or stalls where open, and choose a small selection that fits your appetite. This is not a booked food tour or a named-vendor recommendation.",
      usefulTips: [
        "Check market or business opening days before making a special trip.",
        "Discuss allergies and check prices before ordering; availability is not guaranteed.",
      ],
      kind: "experience",
      sourceIds: ["romeTourism"],
    },
    {
      id: "appian-way",
      name: "Appian Way Walk",
      category: "Outdoor activities",
      estimatedDuration: "2–3 hours",
      shortDescription:
        "Follow a manageable stretch of Rome’s historic road landscape.",
      detailedDescription:
        "Choose a defined section of the Appian Way instead of trying to cover the entire route. Stone surfaces, roadside monuments and open space make the journey the main attraction. Some stretches and nearby sites have separate access conditions, so plan a return route before starting.",
      usefulTips: [
        "Check local traffic restrictions and walking conditions.",
        "Wear supportive shoes and plan transport back; nearby archaeological sites may need separate tickets.",
      ],
      kind: "experience",
      sourceIds: ["romeTourism"],
    },
    {
      id: "rome-bioparco",
      name: "Bioparco di Roma",
      category: "Family activities",
      estimatedDuration: "2–3 hours",
      shortDescription:
        "Consider a family visit focused on animals and conservation interpretation.",
      detailedDescription:
        "A zoo visit works best when children have time to watch a few animals rather than rush between enclosures. Let the current site map and welfare guidance shape your route. Individual animals, talks and activities should never be treated as guaranteed parts of a visit.",
      usefulTips: [
        "Check the venue’s current opening, tickets and visitor rules.",
        "Plan rest stops and follow all feeding and barrier restrictions.",
      ],
      kind: "place",
      sourceIds: ["romeTourism"],
    },
  ] satisfies Entry[]
).map(build);
export const budapestAttractions: Attraction[] = (
  [
    {
      id: "bastion",
      name: "Fisherman’s Bastion",
      category: "Architecture",
      estimatedDuration: "1–1½ hours",
      shortDescription: "Take in terraces and river views on Castle Hill.",
      detailedDescription:
        "The bastion’s arcades and stairs frame the city rather than simply providing one photo point. Walk around its accessible parts and look across the Danube to understand how Buda and Pest face one another. Different terrace sections can have different access arrangements.",
      usefulTips: [
        "Check current terrace access and ticket rules.",
        "Allow for stairs and slopes; ask locally about step-free routes.",
      ],
      kind: "place",
      sourceIds: ["budapestTourism"],
    },
    {
      id: "szechenyi",
      name: "Széchenyi Thermal Baths",
      category: "Wellness",
      estimatedDuration: "2–4 hours",
      shortDescription:
        "Make time for Budapest’s bathing culture in a grand bath complex.",
      detailedDescription:
        "A bath visit is about pacing: arrive, orient yourself and choose a comfortable rhythm of bathing and rest. Read the rules for each pool instead of assuming one set of conditions applies everywhere. Facilities, age restrictions and pool availability need checking with the operator.",
      usefulTips: [
        "Bring appropriate swimwear and check footwear, towel and locker requirements.",
        "Review health advice, age restrictions and current pool availability before booking.",
      ],
      kind: "place",
      sourceIds: ["baths", "budapestTourism"],
    },
    {
      id: "hungarian-parliament",
      name: "Hungarian Parliament Building",
      category: "Architecture",
      estimatedDuration: "1–1½ hours",
      shortDescription:
        "Study the riverfront landmark and investigate an official interior tour.",
      detailedDescription:
        "The long façade is worth viewing from the riverbank as well as from nearby streets. An interior visit is a separate, controlled experience, so choose an official tour based on the language and entry conditions actually offered. An exterior walk does not imply access to the working building.",
      usefulTips: [
        "Book only after checking the official visitor information.",
        "Confirm identification, security and cancellation requirements.",
      ],
      kind: "place",
      sourceIds: ["parliament", "budapestTourism"],
    },
    {
      id: "buda-castle-walk",
      name: "Buda Castle District Walk",
      category: "History & culture",
      estimatedDuration: "2–3 hours",
      shortDescription:
        "Explore the hilltop district through courtyards, streets and outward views.",
      detailedDescription:
        "Think of the Castle District as a neighborhood-sized visit rather than a single ticketed palace. Walk a comfortable route, pause at viewpoints and choose an individual museum only if time allows. Works and changing access can affect how the courtyards and paths connect.",
      usefulTips: [
        "Check local access notices and allow for hills.",
        "Museums and transport within the district have separate admission arrangements.",
      ],
      kind: "experience",
      sourceIds: ["budapestTourism"],
    },
    {
      id: "st-stephens-basilica",
      name: "St Stephen’s Basilica",
      category: "Architecture",
      estimatedDuration: "1–1½ hours",
      shortDescription:
        "Visit a major religious landmark and consider its separate visitor areas.",
      detailedDescription:
        "The basilica introduces another scale of Budapest, away from the broad river views. Give the interior a quiet, attentive visit, then explore the surrounding square. Tower or other visitor areas may operate separately; do not assume that reaching the entrance includes every part of the building.",
      usefulTips: [
        "Check service times and visitor ticket arrangements.",
        "Dress respectfully and confirm lift or stair access for any viewpoint.",
      ],
      kind: "place",
      sourceIds: ["budapestTourism"],
    },
    {
      id: "budapest-fine-arts",
      name: "Museum of Fine Arts",
      category: "Museums",
      estimatedDuration: "2–3 hours",
      shortDescription:
        "Choose a focused route through an important art collection beside Heroes’ Square.",
      detailedDescription:
        "Make the visit manageable by choosing a period, theme or exhibition before arriving. Spend time with a few works rather than trying to cover every gallery. The museum can pair well with a short outdoor walk nearby, but temporary exhibitions and permanent displays may have different tickets.",
      usefulTips: [
        "Consult the museum for current galleries and exhibition inclusions.",
        "Check cloakroom and photography rules.",
      ],
      kind: "place",
      sourceIds: ["fineArts", "budapestTourism"],
    },
    {
      id: "margaret-island",
      name: "Margaret Island Walk",
      category: "Nature & beaches",
      estimatedDuration: "1½–3 hours",
      shortDescription:
        "Find green space and a slower walking rhythm between the riverbanks.",
      detailedDescription:
        "The island offers room to stretch a city day into an unhurried outdoor break. Choose a walk that suits your energy and stop for the landscape rather than relying on a specific attraction operating. This is a park outing, not a recommendation to swim in the river.",
      usefulTips: [
        "Keep cycling and pedestrian routes clear.",
        "Check transport connections and seasonal facility operation before visiting.",
      ],
      kind: "experience",
      sourceIds: ["budapestTourism"],
    },
    {
      id: "city-park",
      name: "City Park and Vajdahunyad Castle Exteriors",
      category: "Outdoor activities",
      estimatedDuration: "1½–2 hours",
      shortDescription:
        "Combine park paths with a look at a playful collection of architectural styles.",
      detailedDescription:
        "This outing is about the contrast between open parkland and the castle’s varied exterior forms. Look at the buildings from different angles and leave time to wander rather than rushing to another timed entry. Museums, boating or other services in the area are separate activities.",
      usefulTips: [
        "Check current works and route closures locally.",
        "Confirm any museum or seasonal activity directly; no availability is promised.",
      ],
      kind: "experience",
      sourceIds: ["budapestTourism"],
    },
    {
      id: "budapest-zoo",
      name: "Budapest Zoo and Botanical Garden",
      category: "Family activities",
      estimatedDuration: "3–4 hours",
      shortDescription:
        "Plan a family day around animal observation and garden spaces.",
      detailedDescription:
        "Allow children to set a slower pace and choose a few areas to explore well. Historic zoo architecture and planting can be part of the visit alongside the animal habitats. Current exhibits and daily activities depend on the venue, so use its own map and guidance rather than a fixed checklist.",
      usefulTips: [
        "Confirm current tickets, entry times and accessibility.",
        "Respect barriers and do not feed animals unless explicitly permitted.",
      ],
      kind: "place",
      sourceIds: ["zoo", "budapestTourism"],
    },
    {
      id: "great-market-hall",
      name: "Great Market Hall Food Browse",
      category: "Food & drink",
      estimatedDuration: "1–1½ hours",
      shortDescription:
        "An experience category: browse a working market and choose food with care.",
      detailedDescription:
        "Look at produce and everyday shopping before making a purchase. Compare stalls and ask about ingredients or origins instead of assuming every souvenir is locally made. This is an independent market visit, not a recommendation for a particular vendor or a guarantee of tasting opportunities.",
      usefulTips: [
        "Check trading days before a special trip.",
        "Confirm prices, allergy information and any packaging charges before ordering.",
      ],
      kind: "experience",
      sourceIds: ["budapestTourism"],
    },
    {
      id: "danube-promenade",
      name: "Danube Riverside Walk",
      category: "Local experiences",
      estimatedDuration: "45–90 minutes",
      shortDescription:
        "Read Budapest through its riverfront and the relationship between its two banks.",
      detailedDescription:
        "Choose a pedestrian stretch along the Pest riverfront and let the opposite hillside set the scene. The point is to slow down and notice changing viewpoints rather than cover every bridge. Pause respectfully at memorials and be aware that transport corridors run close to parts of the waterfront.",
      usefulTips: [
        "Use designated crossings around tram lines and roads.",
        "Stay back from the river edge and check weather conditions.",
      ],
      kind: "experience",
      sourceIds: ["budapestTourism"],
    },
    {
      id: "dohany-synagogue",
      name: "Dohány Street Synagogue",
      category: "History & culture",
      estimatedDuration: "1½–2 hours",
      shortDescription:
        "Approach a major Jewish heritage site with time for history and remembrance.",
      detailedDescription:
        "A visit should give space to the synagogue’s religious role and to the memorial context around it. Read the interpretation carefully rather than treating the building as only an architectural stop. Access to associated areas and tours must be confirmed with the operator.",
      usefulTips: [
        "Check religious-calendar closures, security and dress requirements.",
        "Treat memorial areas quietly and follow current photography rules.",
      ],
      kind: "place",
      sourceIds: ["budapestTourism"],
    },
  ] satisfies Entry[]
).map(build);
