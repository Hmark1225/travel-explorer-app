import type { Photo } from "./models";
/** Original AI-generated artwork. Interpretive illustration, never venue evidence.
 * Each city sheet has twelve full-bleed panels in attraction order.
 */
export const illustrationAssets = {
  "rhodes-guide": { columns: 3, rows: 4 },
  "rome-guide": { columns: 3, rows: 4 },
  "budapest-guide": { columns: 3, rows: 4 },
} as const;
export function guideIllustration(
  city: "rhodes" | "rome" | "budapest",
  index: number,
  subject: string,
): Photo {
  return {
    kind: "illustration",
    url: null,
    assetId: `${city}-guide`,
    crop: {
      column: index % 3,
      row: Math.floor(index / 3),
      columns: 3,
      rows: 4,
    },
    altText: `Original travel illustration inspired by ${subject}; not a documentary photograph.`,
    caption: "Illustrative artwork · Not a location photograph",
    sourceDescription:
      "Original artwork generated for Travel Explorer; bundled in assets/guides.",
    attribution: "Travel Explorer · AI-generated illustration",
    license: "Original project artwork (AI-generated)",
    commercialUseAllowed: true,
    licenseUrl: null,
    sourceUrl: null,
    verifiedAt: "2026-10-25",
  };
}
export function isBundledIllustration(photo: Photo): boolean {
  const { assetId, crop } = photo;
  if (
    photo.kind !== "illustration" ||
    !assetId ||
    !Object.hasOwn(illustrationAssets, assetId) ||
    !crop
  )
    return false;
  const grid = illustrationAssets[assetId];
  return (
    crop.columns === grid.columns &&
    crop.rows === grid.rows &&
    Number.isInteger(crop.column) &&
    Number.isInteger(crop.row) &&
    crop.column >= 0 &&
    crop.column < grid.columns &&
    crop.row >= 0 &&
    crop.row < grid.rows &&
    !!photo.altText?.trim() &&
    !!photo.attribution?.trim()
  );
}
/** Cover one tile, keeping all neighboring panels outside the clipped viewport. */
export function atlasFrame(
  width: number,
  height: number,
  sourceWidth: number,
  sourceHeight: number,
  crop: NonNullable<Photo["crop"]>,
) {
  // Two source pixels keep sheet separators and JPEG edge bleed outside the crop.
  const cellWidth = sourceWidth / crop.columns,
    cellHeight = sourceHeight / crop.rows,
    inset = 2;
  const tileWidth = cellWidth - inset * 2,
    tileHeight = cellHeight - inset * 2;
  const scale = Math.max(width / tileWidth, height / tileHeight);
  return {
    width: sourceWidth * scale,
    height: sourceHeight * scale,
    left:
      (width - tileWidth * scale) / 2 -
      (crop.column * cellWidth + inset) * scale,
    top:
      (height - tileHeight * scale) / 2 -
      (crop.row * cellHeight + inset) * scale,
  };
}

/** IDs, rather than array position, keep artwork stable when the guide is reordered. */
export const illustrationOrder = {
  rhodes: [
    "rhodes-old-town",
    "lindos",
    "palace-grand-master",
    "rhodes-archaeological-museum",
    "mandraki-harbor",
    "elli-beach",
    "anthony-quinn-bay",
    "butterfly-valley",
    "kallithea-springs",
    "rhodes-aquarium",
    "rhodes-taverna-table",
    "koskinou-village",
  ],
  rome: [
    "colosseum",
    "trevi",
    "roman-forum",
    "pantheon",
    "capitoline-museums",
    "galleria-borghese",
    "villa-borghese",
    "piazza-navona",
    "trastevere-walk",
    "testaccio-food",
    "appian-way",
    "rome-bioparco",
  ],
  budapest: [
    "bastion",
    "szechenyi",
    "hungarian-parliament",
    "buda-castle-walk",
    "st-stephens-basilica",
    "budapest-fine-arts",
    "margaret-island",
    "city-park",
    "budapest-zoo",
    "great-market-hall",
    "danube-promenade",
    "dohany-synagogue",
  ],
};
export function attractionIllustration(
  city: keyof typeof illustrationOrder,
  id: string,
  name: string,
): Photo {
  return guideIllustration(city, illustrationOrder[city].indexOf(id), name);
}
