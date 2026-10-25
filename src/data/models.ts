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
export interface Photo {
  kind: "placeholder" | "photo" | "illustration";
  altText?: string;
  caption?: string;
  sourceDescription?: string;
  assetId?: "rhodes-guide" | "rome-guide" | "budapest-guide";
  /** Tile in a bundled image sheet; rendering crops without extra downloads. */
  crop?: { column: number; row: number; columns: number; rows: number };
  url: string | null;
  attribution: string | null;
  license: string | null;
  commercialUseAllowed: boolean | null;
  licenseUrl: string | null;
  sourceUrl: string | null;
  verifiedAt: string | null;
}
export interface Attraction {
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
  id: string;
  name: string;
  country: string;
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
