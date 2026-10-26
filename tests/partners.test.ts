import { test } from "node:test";
import assert from "node:assert/strict";
import { destinations } from "../src/data/destinations.ts";
import { localizeDestination } from "../src/i18n/content.ts";
import { en, hu, type MessageKey } from "../src/i18n/messages.ts";
import { translate } from "../src/i18n/core.ts";
import { partnerConfiguration } from "../src/partners/config.ts";
import { actionLabels, openPartnerLink, resolvePartnerLinks, validateProviderUrl } from "../src/partners/links.ts";
import { createPartnerTrackingEvent, partnerAnalytics } from "../src/partners/tracking.ts";
import type { PartnerConfiguration, PartnerProvider, VerifiedPartnerUrl } from "../src/partners/types.ts";

const d = destinations[0];
const a = d.attractions[0];
const maps = partnerConfiguration.providers.find((p) => p.id === "google-maps")!;
const booking: PartnerProvider = { ...partnerConfiguration.providers[0], enabled: true, availability: "available", approval: "approved" };
// Synthetic TEST fixtures only. Never imported by the application or claimed to be verified in production.
const reviewed: VerifiedPartnerUrl = {
  urls: { en: "https://www.booking.com/city/gr/rhodes.en-gb.html", hu: "https://www.booking.com/city/gr/rhodes.hu.html" },
  defaultLanguage: "en", approval: "approved", verifiedAt: "2026-10-26", reviewedBy: "test fixture",
  evidenceUrl: "https://example.com/test-evidence", documentationUrl: "https://example.com/test-documentation",
};
function configuration(link = reviewed, provider = booking): PartnerConfiguration {
  return { providers: [provider], destinations: [{ destinationId: d.id, providerId: provider.id, action: "accommodation", link }], attractions: [], allowDevelopmentExamples: false };
}

test("production enables only ordinary Maps links; no commercial or affiliate configuration", () => {
  assert.deepEqual(partnerConfiguration.destinations, []);
  assert.deepEqual(partnerConfiguration.attractions, []);
  assert.equal(partnerConfiguration.allowDevelopmentExamples, false);
  for (const p of partnerConfiguration.providers) {
    assert.equal(p.affiliate, undefined);
    if (p.id !== "google-maps") {
      assert.equal(p.enabled, false);
      assert.equal(p.approval, "pending");
    }
  }
  for (const destination of destinations) {
    for (const language of ["en", "hu"] as const) {
      const localized = localizeDestination(destination, language);
      for (const attraction of [undefined, ...localized.attractions]) {
        const links = resolvePartnerLinks(localized, attraction, language);
        assert.equal(links.length, 1);
        assert.equal(links[0].providerId, "google-maps");
        assert.equal(links[0].affiliate, false);
        assert.ok(validateProviderUrl(links[0].url, maps));
        const query = new URL(links[0].url).searchParams.get("query")!;
        assert.ok(query.includes(localized.name));
        if (attraction?.kind === "experience") {
          assert.equal(links[0].scope, "area-search");
          assert.equal(query, `${localized.name}, ${localized.country}`);
        }
      }
    }
  }
});

test("URL validation rejects schemes, spoofed domains, redirect parameters and malformed Maps URLs", () => {
  const invalid = [
    "javascript:alert(1)", "intent://www.google.com/maps/search/", "http://www.google.com/maps/search/?api=1&query=Rome",
    "https://www.google.com.evil.test/maps/search/?api=1&query=Rome",
    "https://evil.test/?url=https://www.google.com", "https://www.google.com@evil.test/maps/search/?api=1&query=Rome",
    "https://user:password@www.google.com/maps/search/?api=1&query=Rome",
    "https://www.google.com:444/maps/search/?api=1&query=Rome",
    "https://www.google.com/maps/search/?api=1&query=Rome#fragment",
    "https://www.google.com/url?api=1&query=Rome", "https://www.google.com/maps/search/?query=Rome",
    "https://www.google.com/maps/search/?api=2&query=Rome", "https://www.google.com/maps/search/?api=1&query=",
    "https://www.google.com/maps/search/?api=1&query=Rome&next=https://evil.test",
    "https://www.google.com/maps/search/?api=1&query=Rome&query=Paris",
    " https://www.google.com/maps/search/?api=1&query=Rome",
    "https://www.google.com\\evil.test/maps/search/?api=1&query=Rome",
    "https://www.google.com/maps/dir/?api=1&query=Rome",
  ];
  for (const url of invalid) assert.equal(validateProviderUrl(url, maps), false, url);
  assert.equal(validateProviderUrl("https://www.google.com/maps/dir/?api=1&destination=Rome", maps), true);
  assert.equal(validateProviderUrl(reviewed.urls.en!, booking), true);
  for (const path of ["/", "/redirect", "/search?ss=Rome", "/city/gr/rhodes.html?next=https://evil.test"]) {
    assert.equal(validateProviderUrl(`https://www.booking.com${path}`, booking), false);
  }
});

test("missing, unavailable, disabled, unapproved and incomplete records hide commercial actions", () => {
  const failures: PartnerConfiguration[] = [
    { ...configuration(), providers: [] },
    { ...configuration(), destinations: [] },
    configuration(reviewed, { ...booking, enabled: false }),
    configuration(reviewed, { ...booking, availability: "unavailable" }),
    configuration(reviewed, { ...booking, approval: "pending" }),
    configuration(reviewed, { ...booking, approval: "rejected" }),
    ...[
      { approval: "pending" as const }, { approval: "rejected" as const }, { verifiedAt: "2026-02-30" },
      { reviewedBy: " " }, { evidenceUrl: "javascript:bad" }, { documentationUrl: "" },
      { developmentOnly: true }, { urls: {} }, { affiliate: true }, { urls: { en: "https://evil.test/place" } },
    ].map((patch) => configuration({ ...reviewed, ...patch })),
  ];
  for (const config of failures) assert.deepEqual(resolvePartnerLinks(d, undefined, "en", config), []);
  assert.equal(resolvePartnerLinks(d, undefined, "en", configuration()).length, 1);
});

test("language variants are exact; missing variants fall back without invented parameters", () => {
  assert.equal(resolvePartnerLinks(d, undefined, "hu", configuration())[0].url, reviewed.urls.hu);
  assert.equal(resolvePartnerLinks(d, undefined, "hu", configuration({ ...reviewed, urls: { en: reviewed.urls.en } }))[0].url, reviewed.urls.en);
  for (const key of Object.keys(en).filter((k) => k.startsWith("partner.")) as MessageKey[]) {
    assert.ok(en[key].trim());
    assert.ok(hu[key].trim());
    assert.ok(!translate("hu", key, { provider: "Google Maps" }).includes("{{"));
  }
  assert.equal(translate("en", actionLabels.accommodation), "Find accommodation");
  assert.equal(translate("hu", actionLabels.accommodation), "Szállás keresése");
  assert.equal(translate("hu", actionLabels.tours), "Túrák és belépőjegyek");
  assert.equal(translate("hu", actionLabels.reviews), "Utazói vélemények");
  assert.equal(translate("hu", actionLabels.directions), "Útvonaltervezés");
});

test("attraction relevance, destination accommodation fallback and wrong-destination rejection", () => {
  assert.equal(resolvePartnerLinks(d, a, "en", configuration())[0].scope, "destination");
  const viator: PartnerProvider = { ...booking, id: "viator", name: "Viator", actions: ["tours"], categories: ["experiences"] };
  const link = { ...reviewed, urls: { en: "https://www.viator.com/tours/test/fixture" } };
  const config: PartnerConfiguration = { ...configuration(link, viator), destinations: [{ providerId: "viator", destinationId: d.id, action: "tours", link }] };
  assert.equal(resolvePartnerLinks(d, undefined, "en", config).length, 1);
  assert.deepEqual(resolvePartnerLinks(d, a, "en", config), []);
  config.attractions = [{ providerId: "viator", destinationId: d.id, attractionId: a.id, action: "tours", link }];
  assert.equal(resolvePartnerLinks(d, a, "en", config)[0].scope, "attraction");
  assert.deepEqual(resolvePartnerLinks(destinations[1], a, "en", config), []);
});

test("directions require a verified entrance; town overviews and invalid coordinates stay labelled searches", () => {
  const entrance = { ...a, latitude: 36.4, longitude: 28.2, coordinatePrecision: "entrance" as const,
    coordinatesVerifiedAt: "2026-10-26", coordinateSourceUrl: "https://example.com/test-coordinate-evidence" };
  assert.equal(resolvePartnerLinks(d, entrance, "en")[0].labelKey, "partner.directions");
  assert.equal(new URL(resolvePartnerLinks(d, entrance, "en")[0].url).searchParams.get("destination"), "36.4,28.2");
  assert.equal(resolvePartnerLinks(d, { ...entrance, latitude: 99 }, "en")[0].scope, "search");
  assert.equal(resolvePartnerLinks(d, { ...entrance, coordinatePrecision: "town-overview" }, "en")[0].scope, "search");
});

test("affiliate URL is never synthesized and needs both agreement approval and exact tracked mapping", () => {
  // No invented affiliate IDs: use an opaque test value computed only in the test process.
  const token = crypto.randomUUID();
  const provider: PartnerProvider = { ...booking, affiliate: { approval: "approved", trackingId: token, approvedAt: "2026-10-26", reviewedBy: "test fixture", allowedQueryKeys: ["aid"] } };
  const link = { ...reviewed, affiliate: true, urls: { en: `${reviewed.urls.en}?aid=${token}` } };
  assert.equal(resolvePartnerLinks(d, undefined, "en", configuration(link, provider))[0].affiliate, true);
  assert.deepEqual(resolvePartnerLinks(d, undefined, "en", configuration(link)), []);
  assert.deepEqual(resolvePartnerLinks(d, undefined, "en", configuration(link, { ...provider, affiliate: { ...provider.affiliate!, approval: "pending" } })), []);
  assert.deepEqual(resolvePartnerLinks(d, undefined, "en", configuration({ ...link, affiliate: false }, provider)), []);
  assert.equal(validateProviderUrl(`${link.urls.en}&next=https://evil.test`, provider, true), false);
});

test("external opening revalidates and handles unsupported OS, rejection and revoked configuration", async () => {
  const context = { destination: d, language: "en" as const };
  const link = resolvePartnerLinks(d, undefined, "en")[0];
  const opened: string[] = [];
  const linking = { async canOpenURL() { return true; }, async openURL(url: string) { opened.push(url); } };
  assert.equal(await openPartnerLink(link, context, linking), "opened");
  assert.deepEqual(opened, [link.url]);
  opened.length = 0;
  for (const forged of [{ ...link, url: "javascript:bad" }, { ...link, affiliate: true }, { ...link, scope: "attraction" as const }]) {
    assert.equal(await openPartnerLink(forged, context, linking), "unavailable");
  }
  assert.equal(await openPartnerLink(link, context, linking, { ...partnerConfiguration, providers: [] }), "unavailable");
  assert.equal(await openPartnerLink(link, context, { ...linking, async canOpenURL() { return false; } }), "unavailable");
  assert.deepEqual(opened, []);
  assert.equal(await openPartnerLink(link, context, { ...linking, async openURL() { throw Error("OS error"); } }), "failed");
  assert.equal(await openPartnerLink(link, context, { ...linking, async canOpenURL() { throw Error("OS error"); } }), "failed");
});

test("resolver does not mutate content, collections, geography, localization or photo attribution", () => {
  const collections = { saved: [d.id, destinations[1].id], trips: [destinations[2].id] };
  const before = JSON.stringify({ destinations, collections });
  for (const language of ["en", "hu"] as const) for (const destination of destinations) {
    resolvePartnerLinks(destination, undefined, language);
    for (const attraction of destination.attractions) resolvePartnerLinks(destination, attraction, language);
  }
  assert.equal(JSON.stringify({ destinations, collections }), before);
});

test("tracking is disabled and event model excludes identifiers, URLs and location", () => {
  assert.deepEqual(partnerAnalytics, { enabled: false, privacyReviewApproved: false });
  const link = resolvePartnerLinks(d, undefined, "en")[0];
  const event = createPartnerTrackingEvent(link, "outbound_open_requested", new Date("2026-10-26T10:00:00Z"));
  assert.deepEqual(Object.keys(event).sort(), ["type", "providerId", "action", "language", "scope", "affiliate", "day"].sort());
  assert.equal(event.day, "2026-10-26");
});
