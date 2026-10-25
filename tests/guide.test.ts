import { test } from "node:test";
import assert from "node:assert/strict";
import { destinations } from "../src/data/destinations.ts";
import { sources } from "../src/data/sources.ts";
import { geographySources, overviewPoints } from "../src/data/geography.ts";
import {
  externalMapSearchUrl,
  externalMapUrl,
  officialWebsiteUrl,
  verifiedCoordinates,
  isReviewDate,
} from "../src/data/placeActions.ts";
const all = destinations.flatMap((d) => d.attractions);
test("every guide entry is complete and has candidate sources distinct from verification", () => {
  for (const d of destinations) {
    assert.ok(new Set(d.attractions.map((a) => a.category)).size >= 4);
    for (const a of d.attractions) {
      assert.ok(a.shortDescription.length >= 40);
      assert.ok(a.detailedDescription.length >= 170);
      assert.ok(
        a.usefulTips.length >= 2 && a.usefulTips.every((t) => t.length > 20),
      );
      assert.ok(a.estimatedDuration);
      assert.equal(a.duration, a.estimatedDuration);
      assert.equal(a.description, a.detailedDescription);
      assert.ok(a.sourceIds.length);
      assert.deepEqual(
        a.sourceUrls,
        a.sourceIds.map((id) => sources[id].url),
      );
      assert.equal(a.reviewStatus, "needs-review");
      assert.equal(a.lastVerifiedAt, null);
      assert.equal(a.admissionType, "unknown");
      assert.equal(a.officialWebsite, null);
    }
  }
});
test("all destination and non-null attraction coordinates are bounded and provenance-backed", () => {
  for (const d of destinations) {
    assert.ok(
      Number.isFinite(d.coordinates.latitude) &&
        Math.abs(d.coordinates.latitude) <= 90,
    );
    assert.ok(
      Number.isFinite(d.coordinates.longitude) &&
        Math.abs(d.coordinates.longitude) <= 180,
    );
    if (d.coordinatesVerifiedAt) {
      assert.ok(isReviewDate(d.coordinatesVerifiedAt));
      assert.ok(
        d.coordinateSourceUrl && d.coordinateLicenseUrl && d.coordinateRecordId,
      );
      assert.ok(
        Object.values(overviewPoints).some(
          (p) =>
            p.latitude === d.coordinates.latitude &&
            p.longitude === d.coordinates.longitude &&
            p.recordId === d.coordinateRecordId,
        ),
      );
    }
  }
  let townPoints = 0;
  for (const a of all) {
    assert.equal(a.latitude === null, a.longitude === null);
    if (a.latitude !== null) {
      townPoints++;
      assert.ok(verifiedCoordinates(a));
      assert.equal(a.coordinatePrecision, "town-overview");
      assert.ok(
        a.coordinateAttribution &&
          a.coordinateLicenseUrl &&
          a.coordinateRecordId,
      );
      assert.ok(
        Object.values(overviewPoints).some(
          (p) =>
            p.latitude === a.latitude &&
            p.longitude === a.longitude &&
            p.recordId === a.coordinateRecordId,
        ),
      );
    } else {
      assert.equal(verifiedCoordinates(a), null);
      assert.equal(externalMapUrl(a, "ios"), null);
    }
  }
  assert.equal(townPoints, 12);
  assert.equal(destinations.filter((d) => d.coordinatesVerifiedAt).length, 15);
  for (const source of Object.values(geographySources)) {
    assert.match(source.sha256, /^[a-f0-9]{64}$/);
    assert.equal(new URL(source.url).protocol, "https:");
    assert.ok(
      source.url.includes(
        "/" +
          (source.url.includes("natural-earth")
            ? "ca96624a56bd078437bca8184e78163e5039ad19"
            : "c05addfe79dce8a87076ef3fd487eab7e5fe4abd") +
          "/",
      ),
    );
  }
});
test("map and website actions reject invalid evidence and retain reviewed positive paths", () => {
  const a = all[0];
  assert.equal(officialWebsiteUrl(a), null);
  assert.equal(externalMapUrl(a, "ios"), null);
  const point = {
    ...a,
    latitude: 36.4,
    longitude: 28.2,
    coordinatesVerifiedAt: "2026-10-25",
    coordinateSourceUrl: "https://example.com/record",
  };
  assert.deepEqual(verifiedCoordinates(point), {
    latitude: 36.4,
    longitude: 28.2,
  });
  assert.match(externalMapUrl(point, "ios")!, /^https:\/\/maps.apple.com/);
  assert.match(externalMapUrl(point, "android")!, /query=36.4,28.2/);
  for (const invalid of [
    { latitude: NaN },
    { latitude: 91 },
    { longitude: -181 },
    { latitude: null },
    { coordinateSourceUrl: null },
    { coordinatesVerifiedAt: "2026-02-30" },
  ])
    assert.equal(verifiedCoordinates({ ...point, ...invalid }), null);
  assert.equal(
    officialWebsiteUrl({
      ...a,
      officialWebsite: "javascript:alert(1)",
      officialWebsiteVerifiedAt: "2026-10-25",
    }),
    null,
  );
  assert.equal(
    officialWebsiteUrl({
      ...a,
      officialWebsite: "https://example.com/",
      officialWebsiteVerifiedAt: "2026-10-25",
    }),
    "https://example.com/",
  );
});
test("broad experience map searches identify areas rather than fictional vendors", () => {
  for (const d of destinations) {
    const a = d.attractions.find((a) => a.kind === "experience")!;
    assert.equal(
      new URL(externalMapSearchUrl(a, d, "android")).searchParams.get("query"),
      `${d.name}, ${d.country}`,
    );
  }
  assert.equal(
    new URL(
      externalMapSearchUrl(all[0], destinations[0], "ios"),
    ).searchParams.get("q"),
    `${all[0].name}, Rhodes, Greece`,
  );
});

test("geography never assigns the mainland or Cretan Pyrgos records to Santorini", () => {
  const pyrgos = destinations
    .find((d) => d.id === "santorini")!
    .attractions.find((a) => a.id === "santorini-pyrgos")!;
  assert.equal(pyrgos.latitude, null);
  assert.equal(pyrgos.longitude, null);
});
