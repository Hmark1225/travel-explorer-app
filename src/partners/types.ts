import type { Language } from "../i18n/types";
import type { MessageKey } from "../i18n/messages";

export type ProviderId = "booking" | "viator" | "tripadvisor" | "getyourguide" | "google-maps";
export type PartnerCategory = "accommodation" | "experiences" | "reviews" | "navigation";
export type PartnerAction = "accommodation" | "tours" | "reviews" | "directions";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface PartnerAttribution {
  text: string;
  sourceUrl: string;
  licenseUrl?: string;
}
/** Exact, human-reviewed URLs. Never derive product IDs from our editorial IDs. */
export interface VerifiedPartnerUrl {
  urls: Partial<Record<Language, string>>;
  defaultLanguage: Language;
  approval: ApprovalStatus;
  verifiedAt: string;
  reviewedBy: string;
  evidenceUrl: string;
  documentationUrl: string;
  affiliate?: boolean;
  developmentOnly?: boolean;
}
export interface PartnerProvider {
  id: ProviderId;
  name: string;
  categories: readonly PartnerCategory[];
  actions: readonly PartnerAction[];
  enabled: boolean;
  availability: "available" | "unavailable";
  approval: ApprovalStatus;
  /** Public configuration only; never credentials. The full approved URL is stored in the mapping. */
  affiliate?: {
    approval: ApprovalStatus;
    trackingId: string;
    reviewedBy: string;
    approvedAt: string;
    allowedQueryKeys: readonly string[];
  };
}
export interface PartnerDestinationMapping {
  destinationId: string;
  providerId: ProviderId;
  action: PartnerAction;
  link: VerifiedPartnerUrl;
}
export interface PartnerAttractionMapping extends PartnerDestinationMapping {
  attractionId: string;
}
export interface PartnerConfiguration {
  providers: readonly PartnerProvider[];
  destinations: readonly PartnerDestinationMapping[];
  attractions: readonly PartnerAttractionMapping[];
  allowDevelopmentExamples: boolean;
}
export interface PartnerLink {
  providerId: ProviderId;
  action: PartnerAction;
  url: string;
  language: Language;
  labelKey: MessageKey;
  scope: "destination" | "attraction" | "search" | "area-search";
  affiliate: boolean;
}
/** Future server response only; Phase 1 never requests or displays offers. */
export interface PartnerOffer {
  id: string;
  providerId: ProviderId;
  title: string;
  link: PartnerLink;
  fetchedAt: string;
  expiresAt: string;
  attribution: PartnerAttribution[];
  price?: { amount: number; currency: string };
}
/** Implement on Supabase Edge Functions, never with secrets in the app. */
export interface PartnerApiAdapter {
  providerId: ProviderId;
  getOffers(request: {
    destinationId: string;
    attractionId?: string;
    language: Language;
    signal?: AbortSignal;
  }): Promise<readonly PartnerOffer[]>;
}
/** No user/device/session IDs, coordinates, search terms, URL or trip data. */
export interface PartnerTrackingEvent {
  type: "outbound_open_requested" | "outbound_open_succeeded" | "outbound_open_failed";
  providerId: ProviderId;
  action: PartnerAction;
  language: Language;
  scope: PartnerLink["scope"];
  affiliate: boolean;
  day: string;
}
