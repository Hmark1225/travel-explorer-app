import type { Destination } from "../data/models";
import { hungarianGuides } from "./content/index.ts";
import { hungarianCountries, hungarianDurations } from "./contentShared.ts";
import { en, hu, type MessageKey } from "./messages.ts";
/** Completeness inventory, not a guarantee of translation quality or fact verification. */
export function createLocalizationReport(destinations: Destination[]) {
  const issues: string[] = [];
  let tips = 0;
  const check = (path: string, value: unknown) => {
    if (typeof value !== "string" || !value.trim()) issues.push(path);
  };
  const placeholders = (text: string) =>
    [...text.matchAll(/\{\{(\w+)\}\}/g)]
      .map((m) => m[1])
      .sort()
      .join(",");
  for (const key of Object.keys(en) as MessageKey[]) {
    check(`ui.hu.${key}`, hu[key]);
    if (placeholders(en[key]) !== placeholders(hu[key] ?? ""))
      issues.push(`ui.hu.${key}.interpolation`);
  }
  for (const key of Object.keys(hu))
    if (!Object.hasOwn(en, key)) issues.push(`ui.hu.${key}.orphan`);
  for (const d of destinations) {
    const text = hungarianGuides[d.id];
    for (const field of [
      "name",
      "region",
      "tagline",
      "description",
      "coordinateLabel",
    ] as const)
      check(`${d.id}.hu.${field}`, text?.[field]);
    check(`${d.id}.hu.country`, hungarianCountries[d.countryCode]);
    for (const field of ["tagline", "description", "coordinateLabel"] as const)
      if (text?.[field] === d[field])
        issues.push(`${d.id}.hu.${field}.source-copy`);
    for (const a of d.attractions) {
      const translated = text?.attractions[a.id];
      for (const field of [
        "name",
        "shortDescription",
        "detailedDescription",
      ] as const)
        check(`${a.id}.hu.${field}`, translated?.[field]);
      for (const field of ["shortDescription", "detailedDescription"] as const)
        if (translated?.[field] === a[field])
          issues.push(`${a.id}.hu.${field}.source-copy`);
      check(
        `${a.id}.hu.estimatedDuration`,
        hungarianDurations[a.estimatedDuration],
      );
      tips += a.usefulTips.length;
      if (translated?.usefulTips.length !== a.usefulTips.length)
        issues.push(`${a.id}.hu.usefulTips.count`);
      a.usefulTips.forEach((source, i) => {
        check(`${a.id}.hu.usefulTips.${i}`, translated?.usefulTips[i]);
        if (source === translated?.usefulTips[i])
          issues.push(`${a.id}.hu.usefulTips.${i}.source-copy`);
      });
    }
    for (const id of Object.keys(text?.attractions ?? {}))
      if (!d.attractions.some((a) => a.id === id))
        issues.push(`${d.id}.hu.attractions.${id}.orphan`);
  }
  for (const id of Object.keys(hungarianGuides))
    if (!destinations.some((d) => d.id === id)) issues.push(`${id}.hu.orphan`);
  return {
    sourceLanguage: "en",
    supportedLanguages: ["en", "hu"],
    counts: {
      destinations: destinations.length,
      attractions: destinations.reduce((n, d) => n + d.attractions.length, 0),
      practicalTips: tips,
      durationPhrases: new Set(
        destinations.flatMap((d) =>
          d.attractions.map((a) => a.estimatedDuration),
        ),
      ).size,
      uiMessages: Object.keys(en).length,
    },
    missingOrIncomplete: issues.length,
    issues,
    preservedVerbatim: [
      "Travel Explorer brand",
      "Proper names where translation would mislead",
      "Source URLs and identifiers",
      "Photo author, attribution, license, provenance and modification records",
      "Geographic source attribution and record identifiers",
    ],
    scope:
      "All current destination and attraction display fields have en/hu variants. Translation does not verify the underlying travel facts. System/vendor basemap labels and source/legal documents retain their provider language.",
  };
}
