import { writeFileSync } from "node:fs";
import { buildSeed } from "./seed.ts";
const { sql, report, verificationSql } = buildSeed();
writeFileSync(new URL("../../supabase/seed.sql", import.meta.url), sql);
writeFileSync(new URL("../../supabase/verify-import.sql", import.meta.url), verificationSql);
writeFileSync(new URL("../../docs/supabase/import-manifest.json", import.meta.url), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report.expected, null, 2));
console.log("Generated insert-only seed.sql and manifest; no database connection was made.");
