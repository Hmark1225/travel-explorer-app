# Future Supabase Edge Functions proposal (not deployed)

The interfaces in `src/partners/types.ts` reserve `PartnerOffer`, `PartnerProvider`, `PartnerAttractionMapping`, `PartnerDestinationMapping`, `PartnerLink`, `PartnerAttribution`, `PartnerApiAdapter` and `PartnerTrackingEvent`. They do not call APIs. Phase 1 renders no prices, ratings, discounts, reviews, availability or fabricated API data.

## Request boundary

Mobile app → authenticated/rate-limited Edge Function `/partner-offers` → provider-specific `PartnerApiAdapter` → authorized partner API. Request only allowlisted provider, existing destination/attraction IDs, action and language; never accept an arbitrary upstream URL. Resolve approved internal mappings server-side. Validate IDs, locale, maximum response size and upstream schemas; apply timeouts/cancellation, quota limits, backoff and circuit breakers. Return normalized offers with source attribution, fetchedAt and expiresAt. Keep providers optional; hide expired or failed offers without breaking guides or collections. Never use editorial estimates as live offers.

Use Supabase secrets for provider keys, signed-request credentials, refresh tokens and service-role keys. Never use EXPO_PUBLIC variables or a mobile .env for secrets. The app may hold only a public Supabase project URL and publishable key when that integration is actually added. Verify JWTs where authenticated; public discovery needs explicit abuse protection. Use RLS for any client-readable table. Only trusted service code may write approvals, mappings and cache entries. Deny public writes to those tables; separate approved public projections from private agreement/credential records. Audit configuration changes. Do not log upstream authorization headers or full tracked URLs.

Suggested tables: partner_providers (flags, approval), partner_destination_mappings and partner_attraction_mappings (stable IDs, reviewed localized URLs, evidence/version), partner_offer_cache (provider, mapped ID, locale, request variant, fetched/expiry time, attribution), and optional aggregate partner_click_daily after privacy approval. No new tables or migrations are required in Phase 1.

## Cache and licensing gates

Do not assume a universal TTL. Each adapter needs a reviewed policy recording contract/version, allowed fields, permitted uses, locale, attribution requirements, TTL, refresh/revalidation rules, deletion policy and whether persistence is allowed. Disable persistence when uncertain; do not serve stale prices or availability. Cache keys must distinguish provider, locale, currency if supported, mapped product, date/party parameters when authorized, and contract/policy version. Purge on revocation or licensing changes. Dates and party details should be sent only for a user-requested quote with the required privacy review. Do not store them for analytics.

| Provider | Review before API activation / caching |
| --- | --- |
| Booking.com | Confirm eligibility and agreement for the applicable Demand/affiliate product, accommodation content and rate display rules, refresh obligations, price/currency completeness, booking handoff and permitted cache periods. No rate or photo storage before written entitlement. |
| Viator | Review Partner API access tier and agreement, product-content versus availability/pricing refresh rules, redistribution limitations, booking links and required supplier/Viator attribution. Do not assume reviews/photos have the same licence as product data. |
| Tripadvisor | Review Content API agreement for approved fields, attribution and branding, review excerpts, links back and retention limits. Do not copy traveller reviews, rating bubbles, photos or logos from the website. |
| GetYourGuide | Confirm authorized partner/API access and current agreement; review content redistribution, images, price/availability TTL, deep-link format and attribution requirements. No inferred API eligibility from ordinary links. |
| Google Maps | Phase 1 uses Maps URLs only, with no Places/Routes/Maps data cache. Future Google Maps Platform APIs require separate enabled APIs and server restrictions; review service-specific storage, place ID exceptions, display and attribution obligations. Never assume all Places fields can be cached or displayed on another map. |

Authoritative starting points for human review (not a claim that current terms were retrieved in this environment): Booking https://developers.booking.com/demand/ ; Viator https://docs.viator.com/partner-api/ ; Tripadvisor https://tripadvisor-content-api.readme.io/ ; GetYourGuide https://partner.getyourguide.com/ ; Google https://developers.google.com/maps/terms . Verify the exact product's current contract and technical documentation before implementation; do not invent numeric TTLs or licence permissions.

## Outbound analytics and attribution

`tracking.ts` only creates a typed data object on explicit invocation; no application code invokes it and there is no transport, persistence or analytics SDK. Both enabled and privacyReviewApproved are false. Future collection must gate on configuration, required consent/legal basis, purpose, reviewed retention, opt-out and data-subject handling. Aggregate by day/provider/action/scope/language; omit identifiers, search text, location, IP, full URL, saved lists and trips. Review backend/proxy logs too: omission from an event payload does not prevent infrastructure from processing IP addresses. Restrict analytics table access and avoid small cohorts.

`outbound_open_requested` means the user confirmed. `outbound_open_succeeded` means the OS accepted the URL, not that a page loaded or purchase happened. `failed` is a local handoff failure. Without partner reporting, only opt-in aggregate handoff requests/results can be measured; page views, bookings, revenue, commissions, cancellations, conversion rates and attribution accuracy cannot be established. Future verified affiliate reports/webhooks require signature verification, replay protection, minimal retention, reconciliation and agreement-approved attribution windows. Do not invent reports or claim that a click generated commission.
