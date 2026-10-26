import type { PartnerLink, PartnerTrackingEvent } from "./types";

export const partnerAnalytics = { enabled: false, privacyReviewApproved: false } as const;
/** Model only. No sink, network request, persistence or automatic collection in Phase 1. */
export function createPartnerTrackingEvent(
  link: PartnerLink,
  type: PartnerTrackingEvent["type"],
  now = new Date(),
): PartnerTrackingEvent {
  return { type, providerId: link.providerId, action: link.action, language: link.language,
    scope: link.scope, affiliate: link.affiliate, day: now.toISOString().slice(0, 10) };
}
