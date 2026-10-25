import type { Category, Destination } from "./models";
export type { Category, Destination, Attraction, Photo } from "./models";
import {
  rhodesAttractions,
  romeAttractions,
  budapestAttractions,
  placeholderPhoto,
} from "./attractions.ts";
export const destinations: Destination[] = [
  {
    id: "rhodes",
    name: "Rhodes",
    country: "Greece",
    category: "Coast",
    tagline: "A little closer to paradise.",
    description:
      "Follow sunlit lanes through a medieval old town, swim in turquoise coves and linger over long lunches by the Aegean. Rhodes brings slow island days and centuries of history together.",
    image: null,
    photo: placeholderPhoto,
    rating: null,
    coordinates: { latitude: 36.4341, longitude: 28.2176 },
    attractions: rhodesAttractions,
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    category: "Culture",
    tagline: "Every street tells a story.",
    description:
      "Ancient wonders, neighborhood trattorias and golden evening light. Find your own rhythm in the Eternal City, from monumental ruins to a perfect espresso in a quiet piazza.",
    image: null,
    photo: placeholderPhoto,
    rating: null,
    coordinates: { latitude: 41.8902, longitude: 12.4922 },
    attractions: romeAttractions,
  },
  {
    id: "budapest",
    name: "Budapest",
    country: "Hungary",
    category: "City breaks",
    tagline: "Two sides. Endless discoveries.",
    description:
      "Cross the Danube between grand boulevards and leafy castle streets. Unwind in thermal baths, discover neighborhood cafés and watch the riverfront glow after sunset.",
    image: null,
    photo: placeholderPhoto,
    rating: null,
    coordinates: { latitude: 47.507, longitude: 19.045 },
    attractions: budapestAttractions,
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
