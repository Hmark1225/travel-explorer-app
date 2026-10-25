import { readFileSync, writeFileSync } from "node:fs";
import { destinations } from "../src/data/destinations.ts";
import { createLocalizationReport } from "../src/i18n/audit.ts";
const report = createLocalizationReport(destinations);
const text = JSON.stringify(report, null, 2) + "\n";
if (report.missingOrIncomplete)
  throw new Error(`Incomplete localization:\n${report.issues.join("\n")}`);
const path = new URL("../docs/localization-report.json", import.meta.url);
if (process.argv.includes("--write")) writeFileSync(path, text);
else if (process.argv.includes("--check")) {
  if (readFileSync(path, "utf8") !== text)
    throw new Error(
      "Stale localization report; run audit:localization -- --write",
    );
} else process.stdout.write(text);
