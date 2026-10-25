import { test } from "node:test";
import assert from "node:assert/strict";
import { destinations } from "../src/data/destinations.ts";
import { createContentAudit } from "../src/data/contentAudit.ts";
test("audit distinguishes authored content, geographic scope and outstanding photo reviews", () => {
  const a = createContentAudit(destinations);
  assert.deepEqual(a.totals, {
    destinations: 18,
    attractions: 156,
    reviewedAttractions: 0,
    sourcedDestinationPoints: 15,
    townOverviewPoints: 12,
    entrancePoints: 0,
    photoSlots: 174,
    photoSlotsWithReviewMetadata: 0,
    uniqueReviewedPhotoSources: 0,
  });
  assert.equal(a.inventory.length, 174);
  assert.ok(a.inventory.every((i) => i.issues.length > 0));
  assert.match(a.scope, /do not guarantee/);
});
