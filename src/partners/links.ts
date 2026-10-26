import type { Attraction, Destination } from "../data/models";
import { isHttpsUrl, isReviewDate, verifiedCoordinates } from "../data/placeActions.ts";
import type { Language } from "../i18n/types";
import type { MessageKey } from "../i18n/messages";
import { partnerConfiguration } from "./config.ts";
import type { PartnerAction, PartnerConfiguration, PartnerLink, PartnerProvider, ProviderId, VerifiedPartnerUrl } from "./types";

const hosts: Record<ProviderId, string> = {
  booking: "www.booking.com",
  viator: "www.viator.com",
  tripadvisor: "www.tripadvisor.com",
  getyourguide: "www.getyourguide.com",
  "google-maps": "www.google.com",
};
export const actionLabels: Record<PartnerAction, MessageKey> = {
  accommodation: "partner.accommodation", tours: "partner.tours",
  reviews: "partner.reviews", directions: "partner.directions",
};
export function providerAvailable(provider: PartnerProvider): boolean {
  return provider.enabled && provider.approval === "approved" && provider.availability === "available";
}
/** Fail closed. Commercial URLs must additionally match an exact reviewed mapping. */
export function validateProviderUrl(value: string, provider: PartnerProvider, affiliate = false): boolean {
  if (!providerAvailable(provider) || !isHttpsUrl(value) || /[\\\s\u0000-\u001f\u007f]/.test(value)) return false;
  try {
    const url = new URL(value);
    if (url.hostname !== hosts[provider.id] || url.port || url.hash) return false;
    if (provider.id === "google-maps") {
      const directions = url.pathname === "/maps/dir/";
      const search = url.pathname === "/maps/search/";
      const key = directions ? "destination" : "query";
      return !affiliate && (directions || search) && url.searchParams.get("api") === "1" &&
        !!url.searchParams.get(key)?.trim() && [...url.searchParams.keys()].length === 2 &&
        [...url.searchParams.keys()].every((k) => k === "api" || k === key);
    }
    // No generic commercial search or redirect endpoint is supported in Phase 1.
    if (url.pathname === "/" || /(?:redirect|\/url\b|\/search\b)/i.test(url.pathname)) return false;
    if (!affiliate) return !url.search;
    const config = provider.affiliate;
    if (!config || config.approval !== "approved" || !config.trackingId.trim() ||
      !config.reviewedBy.trim() || !isReviewDate(config.approvedAt) || !config.allowedQueryKeys.length) return false;
    const keys = [...url.searchParams.keys()];
    return keys.length > 0 && keys.length === new Set(keys).size &&
      keys.every((key) => config.allowedQueryKeys.includes(key) &&
        !/redirect|url|next|target|return|continue/i.test(key)) &&
      [...url.searchParams.values()].includes(config.trackingId);
  } catch { return false; }
}
function reviewedUrl(record: VerifiedPartnerUrl, provider: PartnerProvider, language: Language, config: PartnerConfiguration): string | null {
  if (record.approval !== "approved" || !isReviewDate(record.verifiedAt) ||
    !record.reviewedBy.trim() || !isHttpsUrl(record.evidenceUrl) || !isHttpsUrl(record.documentationUrl) ||
    (record.developmentOnly && !config.allowDevelopmentExamples)) return null;
  const url = record.urls[language] ?? record.urls[record.defaultLanguage];
  return url && validateProviderUrl(url, provider, record.affiliate === true) ? url : null;
}
export function resolvePartnerLinks(
  destination: Destination,
  attraction: Attraction | undefined,
  language: Language,
  config: PartnerConfiguration = partnerConfiguration,
): PartnerLink[] {
  // IDs must belong to the requested destination. No mapping fallback across places.
  if (attraction && !destination.attractions.some((a) => a.id === attraction.id)) return [];
  const links: PartnerLink[] = [];
  for (const provider of config.providers) {
    if (!providerAvailable(provider)) continue;
    for (const action of provider.actions) {
      if (!(action in actionLabels)) continue;
      const destinationRecords = config.destinations.filter((m) => m.destinationId === destination.id && m.providerId === provider.id && m.action === action);
      const attractionRecords = attraction ? config.attractions.filter((m) => m.destinationId === destination.id && m.attractionId === attraction.id && m.providerId === provider.id && m.action === action) : [];
      // Stay relevant: reviews/tours for an attraction require its own verified record.
      const candidates = attraction ? [...attractionRecords, ...(action === "accommodation" ? destinationRecords : [])] : destinationRecords;
      let found = false;
      for (const mapping of candidates) {
        const url = reviewedUrl(mapping.link, provider, language, config);
        if (!url) continue;
        links.push({ providerId: provider.id, action, url, language, labelKey: actionLabels[action],
          scope: "attractionId" in mapping ? "attraction" : "destination", affiliate: mapping.link.affiliate === true });
        found = true;
        break;
      }
      if (found || provider.id !== "google-maps" || action !== "directions") continue;
      // Maps URL API supports text destinations. Never use the user's location or an unreviewed entrance coordinate.
      const area = attraction?.kind === "experience";
      const query = [attraction && !area ? attraction.localized[language].name : null,
        destination.localized[language].name, destination.localized[language].country].filter(Boolean).join(", ");
      const point = attraction?.kind === "place" && attraction.coordinatePrecision === "entrance" ? verifiedCoordinates(attraction) : null;
      const url = point
        ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${point.latitude},${point.longitude}`)}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      if (validateProviderUrl(url, provider)) links.push({ providerId: provider.id, action, url, language,
        labelKey: point ? "partner.directions" : area ? "partner.areaSearch" : "partner.mapSearch", scope: point ? "attraction" : area ? "area-search" : "search", affiliate: false });
    }
  }
  return links;
}

/** Resolve again immediately before opening, so stale or forged UI links cannot bypass configuration. */
export async function openPartnerLink(
  link: PartnerLink,
  context: { destination: Destination; attraction?: Attraction; language: Language },
  linking: { canOpenURL(url: string): Promise<boolean>; openURL(url: string): Promise<unknown> },
  config: PartnerConfiguration = partnerConfiguration,
): Promise<"opened" | "unavailable" | "failed"> {
  const current = resolvePartnerLinks(context.destination, context.attraction, context.language, config)
    .find((candidate) => candidate.providerId === link.providerId && candidate.action === link.action &&
      candidate.url === link.url && candidate.affiliate === link.affiliate && candidate.scope === link.scope);
  if (!current) return "unavailable";
  try {
    if (!await linking.canOpenURL(current.url)) return "unavailable";
    await linking.openURL(current.url);
    return "opened";
  } catch { return "failed"; }
}
