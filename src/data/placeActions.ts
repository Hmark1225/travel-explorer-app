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
/** Evidence completeness checks only. They do not establish rights or legal compliance. */
export function photoMetadataIssues(photo: Photo): string[] {
  const issues: string[] = [];
  if (photo.kind !== "photo" || photo.authenticity !== "photograph")
    issues.push("No reviewed authentic photograph");
  if (photo.reviewStatus !== "reviewed" || !photo.reviewedBy?.trim())
    issues.push("Human rights/subject review missing");
  for (const [label, value] of [
    ["display URL", photo.url],
    ["original URL", photo.originalUrl],
    ["source page", photo.sourceUrl],
    ["license URL", photo.licenseUrl],
  ] as const)
    if (!isHttpsUrl(value)) issues.push(`Missing or unsafe ${label}`);
  if (!photo.author?.trim() || !photo.attribution?.trim())
    issues.push("Author/attribution missing");
  if (!photo.subject?.trim() || !isReviewDate(photo.subjectVerifiedAt))
    issues.push("Subject evidence missing");
  if (!isReviewDate(photo.verifiedAt))
    issues.push("Rights review date missing");
  if (photo.commercialUseAllowed !== true)
    issues.push("Commercial-use approval missing");
  if (
    ![
      "CC0-1.0",
      "Public-domain",
      "CC-BY-4.0",
      "CC-BY-SA-4.0",
      "Permission-granted",
    ].includes(photo.license ?? "")
  )
    issues.push("License requires editorial policy review");
  if (!photo.modificationNotes?.trim() || !photo.provenanceNotes?.trim())
    issues.push("Provenance/modification record missing");
  if (!photo.evidenceUrls?.length || !photo.evidenceUrls.every(isHttpsUrl))
    issues.push("Evidence URLs missing or unsafe");
  return issues;
}
export function isLicensedPhoto(photo: Photo): boolean {
  return photoMetadataIssues(photo).length === 0;
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
