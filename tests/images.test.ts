import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { destinations } from "../src/data/destinations.ts";
import { neutralPhoto } from "../src/data/media.ts";
import {
  isLicensedPhoto,
  photoMetadataIssues,
} from "../src/data/placeActions.ts";
import type { Photo } from "../src/data/models";
const slots = destinations.flatMap((d) => [d, ...d.attractions]);
test("all 174 hero slots are neutral pending review, with no generated artwork shipped", () => {
  assert.equal(slots.length, 174);
  for (const entry of slots) {
    assert.equal(entry.heroImage.kind, "placeholder");
    assert.equal(entry.heroImage.url, null);
    assert.equal(entry.heroImage.verifiedAt, null);
    assert.ok(entry.heroImage.altText);
    assert.deepEqual(entry.photo, entry.heroImage);
    assert.equal(isLicensedPhoto(entry.heroImage), false);
    for (const p of entry.galleryImages ?? [])
      assert.ok(p.kind === "placeholder" || isLicensedPhoto(p));
  }
  for (const filename of ["rhodes.jpg", "rome.jpg", "budapest.jpg"])
    assert.equal(
      existsSync(new URL(`../assets/guides/${filename}`, import.meta.url)),
      false,
    );
});
// Deliberately synthetic metadata. This does not represent a verified real photo.
const fixture: Photo = {
  ...neutralPhoto("Test"),
  kind: "photo",
  url: "https://example.com/display.jpg",
  originalUrl: "https://example.com/original.jpg",
  author: "Example photographer",
  attribution: "Example photographer, CC BY 4.0",
  sourceUrl: "https://example.com/source",
  license: "CC-BY-4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  commercialUseAllowed: true,
  verifiedAt: "2026-10-25",
  authenticity: "photograph",
  subject: "Test fixture only",
  subjectVerifiedAt: "2026-10-25",
  modificationNotes: "None",
  provenanceNotes: "Synthetic test evidence only",
  reviewedBy: "Test reviewer",
  reviewStatus: "reviewed",
  evidenceUrls: ["https://example.com/source"],
};
test("photo gate requires recorded human review, authentic subject and complete provenance", () => {
  assert.ok(isLicensedPhoto(fixture));
  assert.deepEqual(photoMetadataIssues(fixture), []);
  for (const mutation of [
    { author: null },
    { attribution: null },
    { originalUrl: null },
    { sourceUrl: null },
    { url: "http://example.com/a.jpg" },
    { licenseUrl: null },
    { verifiedAt: "2026-02-30" },
    { subject: null },
    { subjectVerifiedAt: null },
    { authenticity: "unknown" },
    { commercialUseAllowed: false },
    { reviewedBy: null },
    { reviewStatus: "needs-review" },
    { modificationNotes: null },
    { provenanceNotes: null },
    { evidenceUrls: [] },
    { license: "CC-BY-NC-4.0" },
    { kind: "illustration" },
  ])
    assert.equal(
      isLicensedPhoto({ ...fixture, ...mutation } as Photo),
      false,
      JSON.stringify(mutation),
    );
});
test("unsafe source and evidence URLs fail closed rather than making a legal-compliance claim", () => {
  assert.equal(
    isLicensedPhoto({ ...fixture, sourceUrl: "javascript:alert(1)" }),
    false,
  );
  assert.equal(
    isLicensedPhoto({
      ...fixture,
      evidenceUrls: ["https://user:password@example.com/"],
    }),
    false,
  );
  assert.ok(photoMetadataIssues(neutralPhoto("Missing")).length > 0);
});
