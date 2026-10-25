import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { destinations } from "../src/data/destinations.ts";
import {
  atlasFrame,
  guideIllustration,
  illustrationAssets,
  illustrationOrder,
  isBundledIllustration,
} from "../src/data/images.ts";
import { isLicensedPhoto } from "../src/data/placeActions.ts";

test("all 3 destinations and 36 attractions have credited, described hero images", () => {
  for (const d of destinations) {
    assert.ok(d.galleryImages?.length);
    for (const place of [d, ...d.attractions]) {
      assert.ok(
        isBundledIllustration(place.heroImage) ||
          isLicensedPhoto(place.heroImage),
      );
      assert.ok(place.heroImage.altText);
      assert.ok(place.heroImage.attribution);
      assert.ok(place.heroImage.sourceDescription || place.heroImage.sourceUrl);
      assert.deepEqual(place.photo, place.heroImage);
      for (const photo of place.galleryImages ?? [])
        assert.ok(isBundledIllustration(photo) || isLicensedPhoto(photo));
    }
  }
});
test("every attraction has its own stable tile and assignments survive reordering", () => {
  for (const d of destinations) {
    const tiles = new Set<string>();
    assert.deepEqual(
      [...illustrationOrder[d.id as keyof typeof illustrationOrder]].sort(),
      d.attractions.map((a) => a.id).sort(),
    );
    for (const a of [...d.attractions].reverse()) {
      const p = a.heroImage;
      assert.equal(p.assetId, `${d.id}-guide`);
      const key = `${p.crop?.row}:${p.crop?.column}`;
      assert.ok(!tiles.has(key));
      tiles.add(key);
    }
    assert.equal(tiles.size, 12);
  }
});
test("bundled image files exist, are JPEGs, and stay within the mobile payload budget", () => {
  let total = 0;
  for (const key of Object.keys(illustrationAssets)) {
    const path = new URL(
      `../assets/guides/${key.replace("-guide", "")}.jpg`,
      import.meta.url,
    );
    const bytes = readFileSync(path);
    assert.equal(bytes[0], 0xff);
    assert.equal(bytes[1], 0xd8);
    const size = statSync(path).size;
    assert.ok(size > 50000 && size < 700000);
    total += size;
  }
  assert.ok(total < 2_000_000);
});
test("missing URLs and invalid local tiles are rejected so the renderer uses a placeholder", () => {
  const p = guideIllustration("rhodes", 0, "Rhodes");
  assert.ok(isBundledIllustration(p));
  assert.equal(isLicensedPhoto({ ...p, kind: "photo", url: null }), false);
  assert.equal(isBundledIllustration({ ...p, assetId: undefined }), false);
  assert.equal(
    isBundledIllustration({
      ...p,
      crop: { column: 3, row: 0, columns: 3, rows: 4 },
    }),
    false,
  );
  assert.equal(
    isBundledIllustration({
      ...p,
      crop: { column: 0, row: 4, columns: 3, rows: 4 },
    }),
    false,
  );
  assert.equal(
    isBundledIllustration({
      ...p,
      crop: { column: 0.5, row: 0, columns: 3, rows: 4 },
    }),
    false,
  );
  assert.equal(isBundledIllustration({ ...p, altText: "" }), false);
});
test("responsive crop geometry fills the viewport and excludes neighboring panels", () => {
  for (const width of [240, 342, 720])
    for (const height of [80, 150, 290])
      for (let i = 0; i < 12; i++) {
        const crop = guideIllustration("rome", i, "Rome").crop!;
        const f = atlasFrame(width, height, 1024, 1536, crop);
        const scale = f.width / 1024;
        const left = f.left + (crop.column * (1024 / 3) + 2) * scale;
        const top = f.top + (crop.row * 384 + 2) * scale;
        const right = left + (1024 / 3 - 4) * scale,
          bottom = top + 380 * scale;
        assert.ok(left <= 0.00001 && top <= 0.00001);
        assert.ok(right >= width - 0.00001 && bottom >= height - 0.00001);
        assert.ok(Number.isFinite(f.width) && f.width > 0);
      }
});
