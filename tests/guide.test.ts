import { test } from "node:test";
import assert from "node:assert/strict";
import { destinations } from "../src/data/destinations.ts";
import { sources } from "../src/data/sources.ts";
import {
  isLicensedPhoto,
  isReviewDate,
  externalMapSearchUrl,
  externalMapUrl,
  officialWebsiteUrl,
  verifiedCoordinates,
} from "../src/data/placeActions.ts";
const all = destinations.flatMap((d) => d.attractions);
test("36 complete records with stable original IDs and a varied editorial mix", () => {
  assert.equal(all.length, 36);
  const old: Record<string, string[]> = {
    rhodes: ["rhodes-old-town", "lindos"],
    rome: ["colosseum", "trevi"],
    budapest: ["bastion", "szechenyi"],
  };
  for (const d of destinations) {
    assert.ok(d.id in old);
    assert.equal(d.attractions.length, 12);
    for (const id of old[d.id])
      assert.ok(d.attractions.some((a) => a.id === id));
    assert.ok(new Set(d.attractions.map((a) => a.category)).size >= 7);
  }
  assert.equal(new Set(all.map((a) => a.id)).size, 36);
  for (const a of all) {
    assert.match(a.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(a.name.length > 4);
    assert.ok(a.shortDescription.length >= 40);
    assert.ok(a.detailedDescription.length >= 200);
    assert.ok(a.estimatedDuration);
    assert.ok(a.usefulTips.length >= 2);
    assert.ok(a.usefulTips.every((t) => t.length > 25));
    assert.ok(["free", "paid", "varies", "unknown"].includes(a.admissionType));
    assert.ok(["place", "experience"].includes(a.kind));
    assert.equal(a.description, a.detailedDescription);
    assert.equal(a.duration, a.estimatedDuration);
  }
});
test("source references resolve and unreviewed claims never masquerade as verified", () => {
  for (const a of all) {
    assert.ok(a.sourceIds.length > 0);
    assert.deepEqual(
      a.sourceUrls,
      a.sourceIds.map((id) => sources[id as keyof typeof sources].url),
    );
    for (const u of a.sourceUrls) assert.equal(new URL(u).protocol, "https:");
    if (a.reviewStatus === "needs-review") {
      assert.equal(a.lastVerifiedAt, null);
      assert.equal(a.admissionType, "unknown");
    } else {
      assert.match(a.lastVerifiedAt ?? "", /^\d{4}-\d{2}-\d{2}$/);
    }
    if (a.officialWebsite) {
      assert.ok(a.officialWebsiteVerifiedAt);
      assert.equal(officialWebsiteUrl(a), a.officialWebsite);
    }
  }
});
test("coordinates are paired, bounded and backed by a source and review date", () => {
  for (const a of all) {
    assert.equal(a.latitude === null, a.longitude === null);
    if (a.latitude !== null) {
      assert.ok(Number.isFinite(a.latitude) && Math.abs(a.latitude) <= 90);
      assert.ok(Number.isFinite(a.longitude) && Math.abs(a.longitude!) <= 180);
      assert.ok(a.coordinateSourceUrl);
      assert.ok(a.coordinatesVerifiedAt);
      assert.ok(verifiedCoordinates(a));
    } else {
      assert.equal(verifiedCoordinates(a), null);
      assert.equal(externalMapUrl(a, "ios"), null);
    }
  }
});
test("maps and website actions reject unverified or unsafe data and support reviewed records", () => {
  const place = all[0];
  assert.equal(externalMapUrl(place, "ios"), null);
  assert.equal(
    officialWebsiteUrl({ ...place, officialWebsite: "https://example.com/" }),
    null,
  );
  const reviewed = {
    ...place,
    latitude: 36.4,
    longitude: 28.2,
    coordinatesVerifiedAt: "2026-10-25",
    coordinateSourceUrl: "https://example.com/coordinate-evidence",
  };
  assert.deepEqual(verifiedCoordinates(reviewed), {
    latitude: 36.4,
    longitude: 28.2,
  });
  assert.match(externalMapUrl(reviewed, "ios")!, /^https:\/\/maps.apple.com\//);
  assert.match(externalMapUrl(reviewed, "android")!, /query=36.4,28.2/);
  assert.equal(verifiedCoordinates({ ...reviewed, latitude: NaN }), null);
  assert.equal(verifiedCoordinates({ ...reviewed, latitude: 91 }), null);
  assert.equal(verifiedCoordinates({ ...reviewed, longitude: -181 }), null);
  assert.equal(
    verifiedCoordinates({ ...reviewed, coordinateSourceUrl: null }),
    null,
  );
  assert.equal(
    officialWebsiteUrl({
      ...place,
      officialWebsite: "javascript:alert(1)",
      officialWebsiteVerifiedAt: "2026-10-25",
    }),
    null,
  );
  assert.equal(
    officialWebsiteUrl({
      ...place,
      officialWebsite: "https://example.com/",
      officialWebsiteVerifiedAt: "2026-10-25",
    }),
    "https://example.com/",
  );
});
test("placeholder art makes no photographic or license claim; future photos require rights evidence", () => {
  for (const d of destinations) {
    assert.equal(d.rating, null);
    for (const p of [d.photo, ...d.attractions.map((a) => a.photo)]) {
      if (p.kind === "placeholder") {
        assert.equal(p.url, null);
        assert.equal(p.license, null);
      } else {
        assert.ok(
          p.url &&
            p.attribution &&
            p.license &&
            p.licenseUrl &&
            p.sourceUrl &&
            p.verifiedAt,
        );
        assert.equal(new URL(p.url).protocol, "https:");
      }
    }
  }
});

test("photo and review guards require real dates and explicit commercial-use evidence", () => {
  assert.equal(isReviewDate("2026-02-30"), false);
  assert.equal(isReviewDate("yesterday"), false);
  assert.equal(isReviewDate("2026-10-25"), true);
  const photo = {
    ...all[0].photo,
    kind: "photo" as const,
    url: "https://example.com/location.jpg",
    attribution: "Photographer",
    license: "CC BY 4.0",
    commercialUseAllowed: true,
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://example.com/original",
    verifiedAt: "2026-10-25",
  };
  assert.ok(isLicensedPhoto(photo));
  assert.equal(
    isLicensedPhoto({ ...photo, commercialUseAllowed: false }),
    false,
  );
  assert.equal(isLicensedPhoto({ ...photo, licenseUrl: null }), false);
  assert.equal(isLicensedPhoto({ ...photo, sourceUrl: null }), false);
  assert.equal(
    isLicensedPhoto({ ...photo, url: "http://example.com/location.jpg" }),
    false,
  );
  assert.equal(isLicensedPhoto({ ...photo, attribution: " " }), false);
});

test("unverified map fallback searches by name and never invents an experience business or coordinates", () => {
  const d = destinations[0],
    place = d.attractions[0],
    experience = d.attractions.find((a) => a.kind === "experience")!;
  const url = new URL(externalMapSearchUrl(place, d, "ios"));
  assert.equal(url.searchParams.get("q"), `${place.name}, Rhodes, Greece`);
  assert.equal(url.searchParams.has("ll"), false);
  const area = new URL(externalMapSearchUrl(experience, d, "android"));
  assert.equal(area.searchParams.get("query"), "Rhodes, Greece");
});
