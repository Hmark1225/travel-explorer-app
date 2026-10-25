import type { Destination, Photo } from "./models";
import { isLicensedPhoto, photoMetadataIssues } from "./placeActions.ts";
/** Inventory and metadata checks only; no authenticity or legal guarantee. */
export function createContentAudit(destinations: Destination[]) {
  const rows = destinations.map((d) => {
    const entries = [d, ...d.attractions];
    const photos = entries.flatMap((e) => [
      e.heroImage,
      ...(e.galleryImages ?? []),
    ]);
    return {
      id: d.id,
      name: d.name,
      country: d.country,
      entries: d.attractions.length,
      reviewedEntries: d.attractions.filter(
        (a) => a.reviewStatus === "reviewed",
      ).length,
      destinationPointSourced: !!d.coordinatesVerifiedAt,
      townOverviewPoints: d.attractions.filter(
        (a) => a.coordinatePrecision === "town-overview",
      ).length,
      entrancePoints: d.attractions.filter(
        (a) => a.coordinatePrecision === "entrance",
      ).length,
      photoSlots: photos.length,
      photoSlotsWithReviewMetadata: photos.filter(isLicensedPhoto).length,
    };
  });
  const inventory = destinations.flatMap((d) =>
    [d, ...d.attractions].flatMap((e) =>
      [e.heroImage, ...(e.galleryImages ?? [])].map((photo: Photo, index) => ({
        destinationId: d.id,
        entityId: e.id,
        slot: index === 0 ? "hero" : `gallery-${index}`,
        photo,
        issues: photoMetadataIssues(photo),
      })),
    ),
  );
  return {
    scope:
      "Metadata inventory only; automated checks do not guarantee photographic authenticity, copyright ownership, commercial rights or legal compliance.",
    destinations: rows,
    totals: {
      destinations: rows.length,
      attractions: rows.reduce((n, r) => n + r.entries, 0),
      reviewedAttractions: rows.reduce((n, r) => n + r.reviewedEntries, 0),
      sourcedDestinationPoints: rows.filter((r) => r.destinationPointSourced)
        .length,
      townOverviewPoints: rows.reduce((n, r) => n + r.townOverviewPoints, 0),
      entrancePoints: rows.reduce((n, r) => n + r.entrancePoints, 0),
      photoSlots: inventory.length,
      photoSlotsWithReviewMetadata: inventory.filter((i) =>
        isLicensedPhoto(i.photo),
      ).length,
      uniqueReviewedPhotoSources: new Set(
        inventory
          .filter((i) => isLicensedPhoto(i.photo))
          .map((i) => i.photo.originalUrl),
      ).size,
    },
    inventory,
  };
}
