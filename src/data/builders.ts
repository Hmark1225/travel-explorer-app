import type { Attraction, Destination } from "./models";
import { sources, type SourceId } from "./sources.ts";
import {
  geographySources,
  overviewPoints,
  geographyRetrievedAt,
  type OverviewPointId,
} from "./geography.ts";
import { neutralPhoto } from "./media.ts";
export const admissionLabels = {
  free: "Free admission — confirm current conditions",
  paid: "Paid admission — check current tickets",
  varies: "Admission varies by area or activity",
  unknown: "Admission not verified — check before visiting",
} as const;
export type AttractionEntry = Pick<
  Attraction,
  | "id"
  | "name"
  | "kind"
  | "category"
  | "shortDescription"
  | "detailedDescription"
  | "estimatedDuration"
  | "usefulTips"
  | "sourceIds"
> &
  Partial<
    Pick<
      Attraction,
      | "admissionType"
      | "officialWebsite"
      | "officialWebsiteVerifiedAt"
      | "lastVerifiedAt"
      | "reviewStatus"
      | "heroImage"
      | "galleryImages"
    >
  > & { coordinateRef?: OverviewPointId };
export function buildAttraction(entry: AttractionEntry): Attraction {
  const { coordinateRef, ...content } = entry;
  const point = coordinateRef ? overviewPoints[coordinateRef] : null;
  const hero = entry.heroImage ?? neutralPhoto(entry.name);
  return {
    ...content,
    admissionType: entry.admissionType ?? "unknown",
    latitude: point?.latitude ?? null,
    longitude: point?.longitude ?? null,
    coordinatesVerifiedAt: point ? geographyRetrievedAt : null,
    coordinateSourceUrl: point ? geographySources[point.sourceId].url : null,
    coordinatePrecision: point ? "town-overview" : null,
    coordinateRecordId: point?.recordId ?? null,
    coordinateLicenseUrl: point
      ? geographySources[point.sourceId].licenseUrl
      : null,
    coordinateAttribution: point
      ? geographySources[point.sourceId].attribution
      : null,
    officialWebsite: entry.officialWebsite ?? null,
    officialWebsiteVerifiedAt: entry.officialWebsiteVerifiedAt ?? null,
    lastVerifiedAt: entry.lastVerifiedAt ?? null,
    reviewStatus: entry.reviewStatus ?? "needs-review",
    sourceUrls: entry.sourceIds.map((id) => sources[id].url),
    heroImage: hero,
    photo: hero,
    galleryImages: entry.galleryImages ?? [],
    image: hero.url,
    description: entry.detailedDescription,
    duration: entry.estimatedDuration,
    price: admissionLabels[entry.admissionType ?? "unknown"],
  };
}
export type DestinationEntry = Pick<
  Destination,
  | "id"
  | "name"
  | "country"
  | "countryCode"
  | "region"
  | "searchAliases"
  | "category"
  | "tagline"
  | "description"
> & {
  sourceIds: SourceId[];
  coordinateRef?: OverviewPointId;
  legacyCoordinates?: Destination["coordinates"];
  coordinateLabel: string;
};
export function buildDestination(
  entry: DestinationEntry,
  attractions: Attraction[],
): Destination {
  const { coordinateRef, legacyCoordinates, ...content } = entry;
  const point = coordinateRef ? overviewPoints[coordinateRef] : null;
  if (!point && !legacyCoordinates)
    throw new Error(`Missing overview point for ${entry.id}`);
  const hero = neutralPhoto(entry.name);
  return {
    ...content,
    coordinates: point
      ? { latitude: point.latitude, longitude: point.longitude }
      : legacyCoordinates!,
    coordinatesVerifiedAt: point ? geographyRetrievedAt : null,
    coordinateSourceUrl: point ? geographySources[point.sourceId].url : null,
    coordinateRecordId: point?.recordId ?? null,
    coordinateLicenseUrl: point
      ? geographySources[point.sourceId].licenseUrl
      : null,
    coordinateAttribution: point
      ? geographySources[point.sourceId].attribution
      : null,
    sourceUrls: entry.sourceIds.map((id) => sources[id].url),
    reviewStatus: "needs-review",
    lastVerifiedAt: null,
    heroImage: hero,
    photo: hero,
    image: null,
    galleryImages: [],
    rating: null,
    attractions,
  };
}
