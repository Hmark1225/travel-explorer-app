import type { Attraction, Destination } from "../data/models";
import type {
  AttractionText,
  DestinationText,
  Localized,
  Language,
} from "./types";
import { hungarianGuides } from "./content/index.ts";
import { hungarianCountries, hungarianDurations } from "./contentShared.ts";
import { translatedText, translate } from "./core.ts";
export function attractionText(
  source: AttractionText,
): Localized<AttractionText>;
export function attractionText(
  source: AttractionText,
  id: string,
): Localized<AttractionText>;
export function attractionText(
  source: AttractionText,
  id?: string,
): Localized<AttractionText> {
  const hu = Object.values(hungarianGuides)
    .map((g) => g.attractions[id ?? ""])
    .find(Boolean);
  return {
    en: source,
    hu: {
      name: translatedText("hu", source.name, hu?.name),
      shortDescription: translatedText(
        "hu",
        source.shortDescription,
        hu?.shortDescription,
      ),
      detailedDescription: translatedText(
        "hu",
        source.detailedDescription,
        hu?.detailedDescription,
      ),
      estimatedDuration: translatedText(
        "hu",
        source.estimatedDuration,
        hungarianDurations[source.estimatedDuration],
      ),
      usefulTips: source.usefulTips.map((tip, i) =>
        translatedText("hu", tip, hu?.usefulTips[i]),
      ),
    },
  };
}
export function destinationText(
  source: DestinationText,
  id: string,
  countryCode: string,
): Localized<DestinationText> {
  const hu = hungarianGuides[id];
  return {
    en: source,
    hu: {
      name: translatedText("hu", source.name, hu?.name),
      country: translatedText(
        "hu",
        source.country,
        hungarianCountries[countryCode],
      ),
      region: translatedText("hu", source.region, hu?.region),
      tagline: translatedText("hu", source.tagline, hu?.tagline),
      description: translatedText("hu", source.description, hu?.description),
      coordinateLabel: translatedText(
        "hu",
        source.coordinateLabel,
        hu?.coordinateLabel,
      ),
    },
  };
}
/** Project display text only; IDs, sources, coordinates, photos and legal records stay intact. */
export function localizeAttraction(
  source: Attraction,
  language: Language,
): Attraction {
  const text = source.localized[language];
  return {
    ...source,
    ...text,
    description: text.detailedDescription,
    duration: text.estimatedDuration,
    price: translate(language, `admission.${source.admissionType}`),
  };
}
export function localizeDestination(
  source: Destination,
  language: Language,
): Destination {
  const text = source.localized[language];
  const aliases = new Set([
    ...source.searchAliases,
    ...Object.values(source.localized).flatMap((t) => [
      t.name,
      t.country,
      t.region,
    ]),
    ...source.attractions.flatMap((a) => [
      a.localized.en.name,
      a.localized.hu.name,
    ]),
  ]);
  return {
    ...source,
    ...text,
    searchAliases: [...aliases],
    attractions: source.attractions.map((a) => localizeAttraction(a, language)),
  };
}
