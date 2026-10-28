# Validation scope

The local PostgreSQL tests use PGlite and a test-only minimal Supabase Auth/Storage metadata boundary. They exercise actual migration functions/triggers/RLS, not mocked authorization decisions. Foundation tests deliberately retain their original three-migration contract; the admin database suite applies all migrations and tests the new workflow separately. Never deploy `supabase/tests/*bootstrap.sql` to a real project.

Checks include anon/non-admin denial, real membership authorization, stable IDs and attraction parents, atomic bilingual saves/rollback, stale version conflicts, request-review/approval/publication gates, mandatory verification, approval invalidation on translation edits, placeholder preservation, genuine-photo and licensing checks, private uploads, separate assignment publication, public withdrawal on archive, affiliate activation denial, canonical provider URLs and append-only audit access.

The web unit tests validate bilingual payloads, coordinate bounds, URL schemes/domains/redirects/tracking, photo review metadata and raster file size/MIME/bytes. Browser interaction checks, where recorded, use explicit HTTP/Auth test fixtures and are not evidence of a real Auth account signing in or a production database write. No administrator was created/granted by the implementation. Real hosted Auth, Storage service upload/signing and deployment checks remain staging tasks after a human-reviewed migration.

Commands:

```sh
# Repository root: mobile and actual local PostgreSQL checks
npm run typecheck
npm test
npm run audit:content -- --check
npm run audit:localization -- --check
EXPO_OFFLINE=1 npm run export:check

# Separate admin app
cd admin
npm ci
npm run typecheck
npm test
npm run build
```

Next 16.4.3's default TypeScript CLI configuration probe failed in this execution environment. The supported `experimental.useTypeScriptCli: false` option uses the pinned TypeScript 6 compiler API; type checks remain enabled. No ignoreBuildErrors workaround is used. Public project credentials are intentionally absent from the repository.

## Recorded results

- Mobile TypeScript check: passed.
- Repository tests: all 10 test files passed, including the new PostgreSQL admin workflow suite.
- Admin TypeScript and production Next.js build: passed.
- Admin input-validation unit tests: passed.
- Content and localization audits: passed with the existing guide unchanged.
- Browser interaction harness: prepared, but **not completed in this execution environment**. Its fixture server cannot start from a Node child process here: even `spawnSync(process.execPath, ["-e", "console.log(123)"])` returns status 0 and empty output. Two startup approaches were investigated; no browser pass or screenshot is claimed. On a normal local development machine, after installing both package lockfiles, run `npm run test:browser` from `admin/`. It uses explicit Auth/HTTP fixtures and a packaged Chromium, never a real account or project write. Review login, dashboard, bilingual editing, conflict recovery and small-screen layout manually as well.
- Offline iOS and Android Hermes exports: passed; bundle hashes match the pre-admin mobile build.
- Real hosted Auth login, Storage upload/signing, administrator onboarding and Vercel deployment remain human staging checks; the migration was not applied remotely.
