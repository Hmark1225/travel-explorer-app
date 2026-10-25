import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { destinations, filterDestinations } from "../src/data/destinations.ts";
const expected = [
  "rhodes",
  "rome",
  "budapest",
  "florence",
  "venice",
  "naples",
  "amalfi-coast",
  "santorini",
  "crete",
  "corfu",
  "barcelona",
  "madrid",
  "mallorca",
  "paris",
  "lisbon",
  "prague",
  "vienna",
  "istanbul",
];
test("contains exactly the requested 18 destinations and 156 uniquely identified entries", () => {
  assert.deepEqual(
    destinations.map((d) => d.id),
    expected,
  );
  const ids = new Set<string>();
  const places = new Set<string>();
  for (const d of destinations) {
    assert.ok(!ids.has(d.id));
    ids.add(d.id);
    assert.equal(
      d.attractions.length,
      ["rhodes", "rome", "budapest"].includes(d.id) ? 12 : 8,
    );
    assert.ok(d.region && d.country && /^[A-Z]{2}$/.test(d.countryCode));
    assert.ok(d.tagline && d.description.length > 100);
    assert.ok(d.coordinateLabel);
    for (const a of d.attractions) {
      assert.ok(!ids.has(a.id));
      ids.add(a.id);
      const key = `${d.id}:${a.name.normalize("NFC").toLowerCase()}`;
      assert.ok(!places.has(key));
      places.add(key);
    }
  }
  assert.equal(places.size, 156);
});
test("original 36 IDs, names, descriptions, estimates, tips and sources remain unchanged", () => {
  const legacy = JSON.parse(
    readFileSync(
      new URL("./fixtures/legacy-content.json", import.meta.url),
      "utf8",
    ),
  );
  for (const [id, entries] of Object.entries(legacy)) {
    const actual = destinations.find((d) => d.id === id)!;
    for (const old of entries as Record<string, unknown>[]) {
      const current = actual.attractions.find((a) => a.id === old.id)!;
      assert.ok(current);
      for (const field of Object.keys(old))
        assert.deepEqual(
          current[field as keyof typeof current],
          old[field],
          `${old.id}.${field}`,
        );
    }
  }
  assert.deepEqual(destinations[0].coordinates, {
    latitude: 36.4341,
    longitude: 28.2176,
  });
  assert.deepEqual(destinations[1].coordinates, {
    latitude: 41.8902,
    longitude: 12.4922,
  });
  assert.deepEqual(destinations[2].coordinates, {
    latitude: 47.507,
    longitude: 19.045,
  });
});
test("region, country, country code, destination and attraction search work locally", () => {
  const find = (q: string, c: "All" | "Coast" = "All") =>
    filterDestinations(destinations, q, c).map((d) => d.id);
  assert.deepEqual(find("  ROME "), ["rome"]);
  assert.deepEqual(find("Hungary"), ["budapest"]);
  assert.deepEqual(find("Lindos"), ["rhodes"]);
  assert.deepEqual(find("Tuscany"), ["florence"]);
  assert.deepEqual(find("Central Europe"), ["budapest", "prague", "vienna"]);
  assert.deepEqual(find("Spain"), ["barcelona", "madrid", "mallorca"]);
  assert.deepEqual(find("Spain", "Coast"), ["mallorca"]);
  assert.deepEqual(find("GR"), ["rhodes", "santorini", "crete", "corfu"]);
  assert.deepEqual(find("Ile de France"), ["paris"]);
  assert.deepEqual(find("Firenze"), ["florence"]);
  assert.deepEqual(find("Czech Republic"), ["prague"]);
  assert.deepEqual(find("Türkiye"), ["istanbul"]);
  assert.deepEqual(find("Turkey"), ["istanbul"]);
  assert.deepEqual(find("Soller"), ["mallorca"]);
  assert.deepEqual(find("France Louvre"), ["paris"]);
  assert.equal(find("Atlantis").length, 0);
  assert.equal(find("Rome", "Coast").length, 0);
  assert.equal(find("").length, 18);
});
