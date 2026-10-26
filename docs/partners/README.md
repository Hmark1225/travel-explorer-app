# Phase 1 provider configuration

The planning sections are additive to the existing guide. Saved/Trips storage, identifiers, bilingual content, media and attribution records are unchanged. The old attraction map buttons are consolidated into the planning section; map provenance remains visible. No partner SDK, native module, API request, scraping, paid content, logo or secret was added. React Native Linking and Modal work in Expo Go.

## What is enabled

`src/partners/config.ts` is the explicit public configuration. Google Maps ordinary outbound URLs are enabled under its documented Maps URL API: https://developers.google.com/maps/documentation/urls/guide . This is an application decision to use public URLs, not a claim of a commercial relationship or API access approval.

All 18 destinations and their attractions have a Maps fallback using localized place/country text. Broad experiences search the destination, never a fictional vendor. Town overview coordinates do not imply an entrance. Only a place with verified entrance coordinates gets “Get directions”; other links explicitly say “Find on Google Maps” or “Explore the area”. We omit origin: the app does not request location permission or send the user's location. Maps may independently request location after the user leaves.

Booking.com (accommodation), Viator and GetYourGuide (experiences), and Tripadvisor (reviews) are registered but **disabled, unavailable and pending**. There are no verified commercial mappings, agreements, affiliate IDs, development URLs or API offers. Their action labels are implemented in English and Hungarian; actions stay hidden until verified configuration exists. No unsupported generic commercial search URL is generated.

## Adding a verified link

1. Review the provider's current linking/trademark rules and permission to use the specific URL. Establish availability and whether the action is relevant. `approval` is your application's editorial approval record, not automatically partner authorization.
2. Copy the exact canonical HTTPS URL from an authorized provider source. Never derive a product ID from Travel Explorer IDs, guess a booking path or use a shortener/redirect. Confirm final destination and redirects manually. Record the documentation URL proving that path is supported, verification date, reviewer and evidence URL. Runtime checks validate structure and review completeness; they cannot independently establish the truth of human evidence or downstream redirects.
3. Add a `PartnerDestinationMapping` with the existing destination ID or `PartnerAttractionMapping` with both destination and attraction IDs. Supply `link.urls`, `defaultLanguage`, `approval: "approved"`, `verifiedAt` (YYYY-MM-DD), `reviewedBy`, `evidenceUrl`, and `documentationUrl`. Use exact separately reviewed `en`/`hu` URLs where offered. Missing language variants use the explicitly configured default; arbitrary language parameters are never appended.
4. Set the provider `enabled: true`, `availability: "available"`, `approval: "approved"` only after review. Test with the production resolver and add tests for the real mapping. Feature flags and availability are checked again immediately before navigation. Revoke flags or mappings when stale; schedule regular human re-verification.
5. Attraction tours/reviews/directions require attraction mappings. Accommodation alone may fall back to a reviewed destination mapping, labelled as destination accommodation. Invalid attraction links can fall back to another valid mapping only within that policy. Maps may fall back to its documented search. Others hide if no valid mapping exists. Rejected, pending, missing, disabled, unavailable and development-only records fail closed.

Allowed hosts are exact: `www.booking.com`, `www.viator.com`, `www.tripadvisor.com`, `www.getyourguide.com`, `www.google.com`. Add another domain only after documenting provider ownership and URL rules and extending security tests. HTTPS only; credentials, nonstandard ports, fragments, whitespace, backslashes, open-redirect/search endpoints and unexpected query keys are rejected. Commercial links without affiliate tracking accept no query parameters. Commercial path support is established by the exact reviewed mapping's evidence/documentation, not by guessing IDs or accepting a provider's entire catalogue. Maps accepts only documented `/maps/search/?api=1&query=...` and `/maps/dir/?api=1&destination=...`, with no additional parameters.

## Optional affiliate configuration (inactive)

Only after human verification of an actual agreement: configure the provider's affiliate `approval`, public `trackingId`, `approvedAt`, `reviewedBy` and documented `allowedQueryKeys`. Mark the individual mapping `affiliate: true` and store the complete approved tracked URL. The validator requires the configured identifier in an allowed query value. It never appends anything. No user ID or per-user sub-ID is supported. Providers requiring alternate redirect hosts or other tracking formats remain unsupported until a separately reviewed implementation exists.

An affiliate record cannot silently fall back to its raw untracked version. It is hidden if approval/tracking validation fails. Development examples must be marked `developmentOnly: true`; `allowDevelopmentExamples` is false in production. Do not enable it in a release. No affiliate examples containing invented identifiers are shipped.

Users see the service name, external/commercial label and, where applicable, commission disclosure both on the action and confirmation. A modal shows the provider hostname and permits cancellation before Linking is called. Unsupported URLs and OS failures show localized recovery text. Screen reader roles, hints, headers and disabled states are present. Provider language is not guaranteed: Maps supports localized query text here; its UI language may follow browser/account settings. No undocumented `hl` parameter is appended.

See [future backend](./supabase-architecture.md), [privacy/licensing review](./review-checklist.md), and [validation](./validation.md).
