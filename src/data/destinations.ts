export type Category = "All" | "Coast" | "Culture" | "City breaks";
export interface Attraction {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: string;
  image: string;
}
export interface Destination {
  id: string;
  name: string;
  country: string;
  category: Exclude<Category, "All">;
  tagline: string;
  description: string;
  image: string;
  rating: string;
  coordinates: { latitude: number; longitude: number };
  attractions: Attraction[];
}
const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
export const destinations: Destination[] = [
  {
    id: "rhodes",
    name: "Rhodes",
    country: "Greece",
    category: "Coast",
    tagline: "A little closer to paradise.",
    description:
      "Follow sunlit lanes through a medieval old town, swim in turquoise coves and linger over long lunches by the Aegean. Rhodes brings slow island days and centuries of history together.",
    image: photo("photo-1495696816485-3c404c1ca00b"),
    rating: "4.9",
    coordinates: { latitude: 36.4341, longitude: 28.2176 },
    attractions: [
      {
        id: "rhodes-old-town",
        name: "Medieval Old Town",
        category: "History",
        description:
          "Wander the cobbled Street of the Knights and discover the walled city’s Byzantine, Ottoman and medieval layers. Visit early for quiet streets and softer light.",
        duration: "2–3 hours",
        price: "Free to explore",
        image: photo("photo-1495696816485-3c404c1ca00b"),
      },
      {
        id: "lindos",
        name: "Lindos Acropolis",
        category: "Culture",
        description:
          "Climb above the whitewashed village to an ancient sanctuary overlooking St Paul’s Bay. Bring water and shoes with good grip.",
        duration: "2 hours",
        price: "Check local admission",
        image: photo("photo-1613395877344-13d4a8e0d49e"),
      },
    ],
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    category: "Culture",
    tagline: "Every street tells a story.",
    description:
      "Ancient wonders, neighborhood trattorias and golden evening light. Find your own rhythm in the Eternal City, from monumental ruins to a perfect espresso in a quiet piazza.",
    image: photo("photo-1552832230-c0197dd311b5"),
    rating: "4.8",
    coordinates: { latitude: 41.8902, longitude: 12.4922 },
    attractions: [
      {
        id: "colosseum",
        name: "The Colosseum",
        category: "History",
        description:
          "Explore the monumental amphitheater at the heart of ancient Rome. Reserve timed tickets through the official venue and allow time for security.",
        duration: "2–3 hours",
        price: "Timed ticket required",
        image: photo("photo-1552832230-c0197dd311b5"),
      },
      {
        id: "trevi",
        name: "Trevi Fountain",
        category: "Architecture",
        description:
          "See Rome’s theatrical Baroque fountain tucked into a lively square. Early morning is a lovely time to appreciate the sculpture.",
        duration: "30 minutes",
        price: "Check current access rules",
        image: photo("photo-1525874684015-58379d421a52"),
      },
    ],
  },
  {
    id: "budapest",
    name: "Budapest",
    country: "Hungary",
    category: "City breaks",
    tagline: "Two sides. Endless discoveries.",
    description:
      "Cross the Danube between grand boulevards and leafy castle streets. Unwind in thermal baths, discover neighborhood cafés and watch the riverfront glow after sunset.",
    image: photo("photo-1549923746-c502d488b3ea"),
    rating: "4.9",
    coordinates: { latitude: 47.507, longitude: 19.045 },
    attractions: [
      {
        id: "bastion",
        name: "Fisherman’s Bastion",
        category: "Architecture",
        description:
          "Take in panoramic views of Parliament and the Danube from the storybook terraces of Castle Hill. Some upper terraces may require admission.",
        duration: "1–2 hours",
        price: "Some terraces free",
        image: photo("photo-1549923746-c502d488b3ea"),
      },
      {
        id: "szechenyi",
        name: "Széchenyi Thermal Baths",
        category: "Wellness",
        description:
          "Spend a leisurely afternoon in Budapest’s famous thermal pools in City Park. Bring swimwear, a towel and slippers; check the venue’s current entry policies.",
        duration: "3 hours",
        price: "Check local admission",
        image: photo("photo-1551867633-194f125bddfa"),
      },
    ],
  },
];
export function filterDestinations(
  items: Destination[],
  query: string,
  category: Category,
): Destination[] {
  const term = query.trim().toLowerCase();
  return items.filter(
    (d) =>
      (category === "All" || d.category === category) &&
      `${d.name} ${d.country} ${d.attractions.map((a) => a.name).join(" ")}`
        .toLowerCase()
        .includes(term),
  );
}
