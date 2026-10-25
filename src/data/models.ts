import type { Localized, AttractionText, DestinationText } from "../i18n/types";
import type { SourceId } from "./sources";
export type Category = "All" | "Coast" | "Culture" | "City breaks";
export type AttractionCategory =
  | "History & culture"
  | "Architecture"
  | "Nature & beaches"
  | "Food & drink"
  | "Outdoor activities"
  | "Museums"
  | "Family activities"
  | "Local experiences"
  | "Wellness";
export type AdmissionType = "free" | "paid" | "varies" | "unknown";
/** Metadata is an editorial record, not an automated guarantee of legal compliance. */
export interface Photo {
  kind: "placeholder" | "photo";
  url: string | null;
  altText?: string;
  caption?: string;
  sourceDescription?: string;
  attribution: string | null;
  author: string | null;
  originalUrl: string | null;
  license: string | null;
  commercialUseAllowed: boolean | null;
  licenseUrl: string | null;
  sourceUrl: string | null;
  verifiedAt: string | null;
  authenticity: "photograph" | "unknown";
  subject: string | null;
  subjectVerifiedAt: string | null;
  modificationNotes: string | null;
  provenanceNotes: string | null;
  reviewedBy: string | null;
  evidenceUrls: string[];
  reviewStatus: "needs-review" | "reviewed";
}
export interface Attraction {
  localized: Localized<AttractionText>;
  id: string;
  name: string;
  kind: "place" | "experience";
  category: AttractionCategory;
  shortDescription: string;
  detailedDescription: string;
  estimatedDuration: string;
  /** Editorial planning estimate, not an operator promise. */
  admissionType: AdmissionType;
  latitude: number | null;
  longitude: number | null;
  coordinatesVerifiedAt: string | null;
  coordinateSourceUrl: string | null;
  coordinatePrecision: "town-overview" | "entrance" | null;
  coordinateAttribution: string | null;
  coordinateLicenseUrl: string | null;
  coordinateRecordId: string | null;
  officialWebsite: string | null;
  officialWebsiteVerifiedAt: string | null;
  usefulTips: string[];
  /** Candidate official sources until lastVerifiedAt is set. */
  sourceUrls: string[];
  sourceIds: SourceId[];
  lastVerifiedAt: string | null;
  reviewStatus: "needs-review" | "reviewed";
  photo: Photo;
  heroImage: Photo;
  galleryImages?: Photo[];
  /** Legacy read aliases retained for repository consumers. */
  description: string;
  duration: string;
  price: string;
  image: string | null;
}
export interface Destination {
  localized: Localized<DestinationText>;
  id: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  searchAliases: string[];
  sourceIds: SourceId[];
  sourceUrls: string[];
  reviewStatus: "needs-review" | "reviewed";
  lastVerifiedAt: string | null;
  coordinateLabel: string;
  coordinateSourceUrl: string | null;
  coordinateAttribution: string | null;
  coordinateLicenseUrl: string | null;
  coordinateRecordId: string | null;
  coordinatesVerifiedAt: string | null;
  category: Exclude<Category, "All">;
  tagline: string;
  description: string;
  image: string | null;
  photo: Photo;
  heroImage: Photo;
  galleryImages?: Photo[];
  rating: string | null;
  /** Existing destination overview points, not reviewed attraction entrances. */
  coordinates: { latitude: number; longitude: number };
  attractions: Attraction[];
}
