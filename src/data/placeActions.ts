import type { Attraction, Photo } from "./models";
export function isHttpsUrl(value: string | null): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}
export function isReviewDate(value: string | null): boolean {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}
export function isLicensedPhoto(photo: Photo): boolean {
  return (
    photo.kind === "photo" &&
    photo.commercialUseAllowed === true &&
    isHttpsUrl(photo.url) &&
    !!photo.attribution?.trim() &&
    !!photo.license?.trim() &&
    isHttpsUrl(photo.licenseUrl) &&
    isHttpsUrl(photo.sourceUrl) &&
    isReviewDate(photo.verifiedAt)
  );
}
export function verifiedCoordinates(
  place: Attraction,
): { latitude: number; longitude: number } | null {
  if (
    !isReviewDate(place.coordinatesVerifiedAt) ||
    !isHttpsUrl(place.coordinateSourceUrl) ||
    place.latitude === null ||
    place.longitude === null ||
    !Number.isFinite(place.latitude) ||
    !Number.isFinite(place.longitude) ||
    Math.abs(place.latitude) > 90 ||
    Math.abs(place.longitude) > 180
  )
    return null;
  return { latitude: place.latitude, longitude: place.longitude };
}
export function officialWebsiteUrl(place: Attraction): string | null {
  return isReviewDate(place.officialWebsiteVerifiedAt) &&
    isHttpsUrl(place.officialWebsite)
    ? place.officialWebsite
    : null;
}
export function externalMapUrl(
  place: Attraction,
  platform: "ios" | "android" | "other",
): string | null {
  const point = verifiedCoordinates(place);
  if (!point) return null;
  const coordinates = `${point.latitude},${point.longitude}`;
  return platform === "ios"
    ? `https://maps.apple.com/?ll=${coordinates}&q=${encodeURIComponent(place.name)}`
    : `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
}

/** A labelled provider search, never a claim of a reviewed entrance location.
 * Broad experiences search only the destination, not an invented business.
 */
export function externalMapSearchUrl(
  place: Attraction,
  destination: { name: string; country: string },
  platform: "ios" | "android",
): string {
  const query = encodeURIComponent(
    [
      place.kind === "place" ? place.name : null,
      destination.name,
      destination.country,
    ]
      .filter(Boolean)
      .join(", "),
  );
  return platform === "ios"
    ? `https://maps.apple.com/?q=${query}`
    : `https://www.google.com/maps/search/?api=1&query=${query}`;
}
