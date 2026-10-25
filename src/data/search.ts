import type { Category, Destination } from "./models";
/** Accent-insensitive, token-based local search over regions, countries and places. */
export function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}
const index = new WeakMap<Destination, string[]>();
function termsFor(destination: Destination): string[] {
  let terms = index.get(destination);
  if (!terms) {
    terms = normalizeSearch(
      [
        destination.name,
        destination.country,
        destination.countryCode,
        destination.region,
        ...destination.searchAliases,
        ...destination.attractions.map((a) => a.name),
      ].join(" "),
    ).split(/\s+/);
    index.set(destination, terms);
  }
  return terms;
}
export function filterDestinations(
  items: Destination[],
  query: string,
  category: Category,
): Destination[] {
  const tokens = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const countryQuery =
    tokens.length === 1 &&
    items.some((d) => d.countryCode.toLowerCase() === tokens[0])
      ? tokens[0]
      : null;
  return items.filter(
    (d) =>
      (category === "All" || d.category === category) &&
      (countryQuery
        ? d.countryCode.toLowerCase() === countryQuery
        : tokens.every((token) =>
            termsFor(d).some((word) => word.startsWith(token)),
          )),
  );
}
