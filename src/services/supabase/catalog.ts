import { z } from "zod";
import type { Destination, Photo } from "../../data/models";
import { neutralPhoto } from "../../data/media.ts";
import { isHttpsUrl, isLicensedPhoto, isReviewDate } from "../../data/placeActions.ts";
import { translate } from "../../i18n/core.ts";
import { sources, type SourceId } from "../../data/sources.ts";

const text = z.string().trim().min(1);
const https = z.string().refine(isHttpsUrl, "Expected a safe HTTPS URL");
const date = z.string().refine(isReviewDate, "Expected an ISO review date");
const destinationText = z.object({ name: text, country: text, region: text, tagline: text, description: text, coordinateLabel: text });
const attractionText = z.object({ name: text, shortDescription: text, detailedDescription: text, estimatedDuration: text, usefulTips: z.array(text).min(1) });
const common = {
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  reviewStatus: z.enum(["needs-review", "reviewed"]), lastVerifiedAt: date.nullable(),
  coordinatesVerifiedAt: date.nullable(), coordinateSourceUrl: https.nullable(),
  coordinateLicenseUrl: https.nullable(), coordinateRecordId: text.nullable(), coordinateAttribution: text.nullable(),
  sourceIds: z.array(z.enum(Object.keys(sources) as [SourceId, ...SourceId[]])).min(1), sourceUrls: z.array(https).min(1),
  heroImage: z.unknown(), galleryImages: z.array(z.unknown()).default([]),
};
const attraction = z.object({ ...common, kind: z.enum(["place", "experience"]),
  category: z.enum(["History & culture", "Architecture", "Nature & beaches", "Food & drink", "Outdoor activities", "Museums", "Family activities", "Local experiences", "Wellness"]),
  admissionType: z.enum(["free", "paid", "varies", "unknown"]),
  latitude: z.number().min(-90).max(90).nullable(), longitude: z.number().min(-180).max(180).nullable(),
  coordinatePrecision: z.enum(["town-overview", "entrance"]).nullable(),
  officialWebsite: https.nullable(), officialWebsiteVerifiedAt: date.nullable(),
  localized: z.object({ en: attractionText, hu: attractionText }),
}).refine((a) => (a.latitude === null) === (a.longitude === null));
const destination = z.object({ ...common,
  category: z.enum(["Coast", "Culture", "City breaks"]), countryCode: z.string().regex(/^[A-Z]{2}$/),
  coordinates: z.object({ latitude: z.number().min(-90).max(90), longitude: z.number().min(-180).max(180) }),
  searchAliases: z.array(text), localized: z.object({ en: destinationText, hu: destinationText }),
  attractions: z.array(attraction),
});
const photo = z.object({ kind: z.enum(["photo", "placeholder"]), url: https.nullable(), altText: text.optional(),
  caption: text.optional(), sourceDescription: text.optional(), attribution: text.nullable(), author: text.nullable(),
  originalUrl: https.nullable(), license: text.nullable(), commercialUseAllowed: z.boolean().nullable(), licenseUrl: https.nullable(),
  sourceUrl: https.nullable(), verifiedAt: date.nullable(), authenticity: z.enum(["photograph", "unknown"]), subject: text.nullable(),
  subjectVerifiedAt: date.nullable(), modificationNotes: text.nullable(), provenanceNotes: text.nullable(), reviewedBy: text.nullable(),
  evidenceUrls: z.array(https), reviewStatus: z.enum(["needs-review", "reviewed"]),
});
function publicPhoto(value: unknown, name: string): Photo {
  const parsed = photo.safeParse(value);
  return parsed.success && isLicensedPhoto(parsed.data) ? parsed.data : neutralPhoto(name);
}
/** Parse an allowlisted public DTO, reconstruct legacy aliases, and validate before replacing any local content. */
export function parseCatalog(payloads: unknown[], remote = true): Destination[] {
  const parsed = z.array(destination).min(1).parse(payloads);
  const ids = new Set<string>();
  return parsed.map((d): Destination => {
    if (ids.has(d.id)) throw new Error("Duplicate destination ID");
    ids.add(d.id);
    if (remote && (d.reviewStatus !== "reviewed" || !d.lastVerifiedAt)) throw new Error("Unapproved remote destination");
    const hero = publicPhoto(d.heroImage, d.localized.en.name);
    return { ...d, ...d.localized.en, photo: hero, heroImage: hero, image: hero.url, rating: null,
      galleryImages: d.galleryImages.map((p) => publicPhoto(p, d.localized.en.name)).filter((p) => p.kind === "photo"),
      attractions: d.attractions.map((a) => {
        if (ids.has(a.id)) throw new Error("Duplicate attraction ID");
        ids.add(a.id);
        if (remote && (a.reviewStatus !== "reviewed" || !a.lastVerifiedAt)) throw new Error("Unapproved remote attraction");
        const hero = publicPhoto(a.heroImage, a.localized.en.name);
        return { ...a, ...a.localized.en, photo: hero, heroImage: hero, image: hero.url,
          description: a.localized.en.detailedDescription, duration: a.localized.en.estimatedDuration,
          price: translate("en", `admission.${a.admissionType}`),
          galleryImages: a.galleryImages.map((p) => publicPhoto(p, a.localized.en.name)).filter((p) => p.kind === "photo"),
        };
      }),
    };
  });
}
export function preservesBundledIds(remote: Destination[], bundled: Destination[]): boolean {
  return bundled.every((d) => {
    const replacement = remote.find((candidate) => candidate.id === d.id);
    return replacement && d.attractions.every((a) => replacement.attractions.some((candidate) => candidate.id === a.id));
  });
}

/** Published records override the shipped guide individually; absent rows never delete it. */
export function mergePublishedCatalog(remote: Destination[], bundled: Destination[]): Destination[] {
  const destinationIds = new Set(bundled.map((d) => d.id));
  const owners = new Map(bundled.flatMap((d) => d.attractions.map((a) => [a.id, d.id] as const)));
  for (const d of remote) {
    if (owners.has(d.id)) throw new Error("Destination ID conflicts with a bundled attraction");
    for (const a of d.attractions) {
      if (destinationIds.has(a.id) || (owners.has(a.id) && owners.get(a.id) !== d.id)) {
        throw new Error("Published attraction conflicts with a stable bundled ID");
      }
    }
  }
  const updates = new Map(remote.map((d) => [d.id, d]));
  return [
    ...bundled.map((d) => {
      const update = updates.get(d.id);
      if (!update) return d;
      const attractions = new Map(update.attractions.map((a) => [a.id, a]));
      const oldIds = new Set(d.attractions.map((a) => a.id));
      return { ...update, attractions: [
        ...d.attractions.map((a) => attractions.get(a.id) ?? a),
        ...update.attractions.filter((a) => !oldIds.has(a.id)),
      ] };
    }),
    ...remote.filter((d) => !destinationIds.has(d.id)),
  ];
}
