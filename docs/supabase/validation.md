# Validation and import scope

The checked-in manifest lists deterministic expected IDs/counts and the generated seed checksum. `local-import-verification.json` records actual local PostgreSQL imports with matching counts, not a remote Supabase deployment. All seed content is draft/pending, existing review flags remain unchanged, and private account tables are empty after import.

Run:

```sh
npm ci
npm run db:seed:generate
npm run typecheck
npm test
npm run test:database
npm run audit:localization -- --check
npm run audit:content -- --check
EXPO_OFFLINE=1 npm run export:check
```

The database suite applies all migrations to a clean PGlite PostgreSQL instance with a test-only Supabase Auth role/UID boundary, applies the seed twice, verifies exact imported values/counts/FKs/IDs, and repeats migrations/import on a second clean instance. It tests anonymous denials, ordinary authenticated denials, administrator content access, denial of profile-role escalation, positive public publication and bilingual filtering, hidden draft parents/children, photo licensing/provenance/date guards, ownership and cross-user read/write/delete denials, composite trip ownership, disabled/unverified partner links and the non-destructive emergency revoke.

The adapter suite tests public configuration and secret-key rejection, opt-in/default behavior, bilingual DTO reconstruction, stable IDs and parent association, map/provider behavior, unsafe-photo placeholders, unavailable/timeout/error/empty/partial/draft/malformed responses, retry and pagination. Existing component/state tests continue to verify Saved/Trips restoration, toggles and persistence across a link handoff and language change.

Automated PostgreSQL coverage is local; it does not prove a hosted API or JWT configuration works. Native exports compile Expo bundles but do not establish device behavior. Manual staging checks remain: apply/verify migrations on a disposable real Supabase project; test public views with its actual publishable key as guest and with representative JWTs; verify administrator revocation; test a completely published dataset and network loss in Expo Go on iOS/Android; verify bilingual fallback notices, large text/accessibility, return navigation and unchanged local collections. No remote project or API success is claimed.

## Recorded workspace results

TypeScript, all nine test files, content/localization audits and offline iOS/Android Hermes exports passed in the managed Linux workspace. The database suite also passed when run directly, including a second clean database and emergency-revoke recovery checks. The complete approved SQL view payload was parsed by the actual mobile DTO adapter to verify translation, ordering and stable-ID compatibility. Import-conflict tests confirm human revisions survive repeated imports and are reported instead of overwritten.

The Expo bundle grew from approximately 2.9 MB to 4.2 MB per platform with the Supabase SDK and runtime validator. No new native module was introduced. Existing Node MODULE_TYPELESS_PACKAGE_JSON warnings are non-failing. SQL/remote tests use no live project credentials; real hosted-project/physical-device checks remain pending.
