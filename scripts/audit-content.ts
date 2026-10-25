import { readFileSync, writeFileSync } from "node:fs";
import { destinations } from "../src/data/destinations.ts";
import { createContentAudit } from "../src/data/contentAudit.ts";
const audit = createContentAudit(destinations);
const md = [
  "# Content and photo inventory",
  "",
  audit.scope,
  "",
  "This is a reproducible inventory of authored content, not a statement that source review is finished. Each new destination has eight drafted entries; the original three retain twelve each. All operational travel content currently requires editorial review.",
  "",
  "| Destination | Country | Entries authored | Entries reviewed | Sourced town overviews | Reviewed photo slots* |",
  "| --- | --- | ---: | ---: | ---: | ---: |",
  ...audit.destinations.map(
    (r) =>
      `| ${r.name} | ${r.country} | ${r.entries} | ${r.reviewedEntries} | ${r.townOverviewPoints} | ${r.photoSlotsWithReviewMetadata} |`,
  ),
  "",
  `Totals: **${audit.totals.destinations} destinations; ${audit.totals.attractions} authored entries; ${audit.totals.reviewedAttractions} reviewed entries; ${audit.totals.sourcedDestinationPoints} sourced destination overview points; ${audit.totals.townOverviewPoints} town overview points; ${audit.totals.entrancePoints} reviewed venue entrances.**`,
  "",
  `**${audit.totals.photoSlotsWithReviewMetadata} reviewed photo slots / ${audit.totals.uniqueReviewedPhotoSources} unique recorded photo sources; ${audit.totals.photoSlots} neutral hero placeholders.** All previous AI-generated artwork has been removed from the app and repository assets. No new photograph, image source, author or license is claimed as verified.`,
  "",
  "*“Reviewed photo slots” means metadata satisfies the publication gate; this check does not authenticate evidence or guarantee legal compliance. The current count is zero, so no real photo has passed even that metadata gate.*",
  "",
  "Outstanding: source-review all 156 travel entries and all 18 destination summaries; review all 174 photo slots or deliberately retain placeholders; obtain entrance coordinates for individual venues where useful; review the original three legacy destination points. Twelve town points are not precise entrances or reviewed walking routes.",
  "",
  "Official tourism and Wikimedia requests were denied by the environment proxy on 2026-10-25. Candidate tourism URLs are review leads, not citations. Gazetteer source files and their license/readme were accessible; named-record geography extraction is documented separately in geography-sources.md.",
  "",
  "Run `npm run audit:content -- --write` to regenerate this document and content-inventory.json. Run `npm run audit:content -- --check` to detect stale inventory. See editorial-review.md for the review process and per-entry checklist.",
  "",
].join("\n");
const outputs = [
  ["../docs/content-audit.md", md],
  ["../docs/content-inventory.json", JSON.stringify(audit, null, 2) + "\n"],
] as const;
if (process.argv.includes("--write"))
  for (const [path, text] of outputs)
    writeFileSync(new URL(path, import.meta.url), text);
else if (process.argv.includes("--check"))
  for (const [path, text] of outputs) {
    if (readFileSync(new URL(path, import.meta.url), "utf8") !== text)
      throw new Error(`Stale inventory: ${path}; regenerate with --write`);
  }
else process.stdout.write(md);
