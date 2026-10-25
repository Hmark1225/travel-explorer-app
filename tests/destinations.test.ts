import { test } from "node:test";
import assert from "node:assert/strict";
import { destinations, filterDestinations } from "../src/data/destinations.ts";
test("includes complete Rhodes, Rome and Budapest destination and attraction records", () => {
  assert.deepEqual(
    destinations.map((d) => d.name),
    ["Rhodes", "Rome", "Budapest"],
  );
  const ids = new Set<string>();
  for (const d of destinations) {
    assert.ok(!ids.has(d.id));
    ids.add(d.id);
    assert.equal(d.attractions.length, 12);
    assert.ok(d.coordinates.latitude >= -90 && d.coordinates.latitude <= 90);
    assert.ok(
      d.coordinates.longitude >= -180 && d.coordinates.longitude <= 180,
    );
    for (const a of d.attractions) {
      assert.ok(!ids.has(a.id));
      ids.add(a.id);
      assert.ok(a.description && a.duration && a.price);
      assert.equal(a.image, null);
      assert.equal(a.photo.kind, "placeholder");
    }
  }
});
test("search is trimmed, case insensitive and includes countries and attractions", () => {
  assert.deepEqual(
    filterDestinations(destinations, "  ROME  ", "All").map((d) => d.id),
    ["rome"],
  );
  assert.deepEqual(
    filterDestinations(destinations, "Hungary", "All").map((d) => d.id),
    ["budapest"],
  );
  assert.deepEqual(
    filterDestinations(destinations, "Lindos", "All").map((d) => d.id),
    ["rhodes"],
  );
});
test("category and query combine and unmatched searches return no results", () => {
  assert.equal(filterDestinations(destinations, "", "All").length, 3);
  assert.deepEqual(
    filterDestinations(destinations, "", "Coast").map((d) => d.id),
    ["rhodes"],
  );
  assert.equal(filterDestinations(destinations, "Rome", "Coast").length, 0);
  assert.equal(filterDestinations(destinations, "Atlantis", "All").length, 0);
});
