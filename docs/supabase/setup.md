# Supabase foundation and staged cutover

This branch prepares the database and optional public-read adapter. **No Supabase project, credentials or remote deployment was available or used.** The committed import verification describes a local PostgreSQL test run, not a hosted deployment. This is still the existing Expo SDK 58 application, with all editorial content and local collections preserved.

## Current implementation

The inspected source is latest main at `83d2b9a` (including Phase 1 provider links). Its models contain 18 destination string IDs, 156 attraction string IDs, complete en/hu content, 24 source organizations, coordinate provenance, and 174 neutral hero placeholders. There are no rights-reviewed photographs or configured commercial mappings. Source `reviewStatus` values are `needs-review` and are preserved. Imported database rows default to `draft` / `pending`; nothing is automatically approved or published.

Three timestamped migrations create the normalized tables, constraints, timestamps, FK indexes, administrator RLS, owner RLS and allowlisted public views. `destination_sources` and `attraction_sources` provide additional source FKs. Parent foreign keys use RESTRICT for editorial content so a deletion cannot silently remove referenced content or collection items. Auth account deletion cascades only to that account's private rows. Photo assignments support one hero and ordered gallery slots for either kind of place. Photo originals remain in an admin-only JSON record, including full evidence, rights status, attribution and reviewer records. Public photo provenance/evidence must be separately approved for disclosure.

## 1. Create an actual project

1. Create a Supabase project in your own organization and choose the region/database password according to your policies. Record the project reference from that actual project; this repository supplies none. Review billing, backups, data region, API settings and operational access.
2. Use a current Supabase CLI with PostgreSQL 17 support. Authenticate with your account. Keep login tokens, the database password and any service-role/secret keys in protected server/CI storage. They do not belong in `.env.example`, the mobile app, git, logs or public Expo variables.
3. Install dependencies with `npm ci`. Generate the insert-only seed and verification SQL with `npm run db:seed:generate`. The generated files are intentionally ignored; they are reproducible from checked-in source and the lockfile. Check `docs/supabase/import-manifest.json` before applying anything.
4. For an isolated local Supabase stack, run `supabase start` then `supabase db reset` **only against that disposable local stack**. Reset deletes local database data; do not run it against any database containing user data. `project_id = "travel-explorer-local"` in config.toml is a local CLI workspace name, not a claimed hosted project ID. The automated test suite also runs without Docker or a Supabase account using PGlite PostgreSQL and an explicit auth test double.
5. For a real project, use `supabase link --project-ref YOUR_ACTUAL_PROJECT_REF`, inspect the target, then `supabase db push --dry-run`. Review migrations and backups before `supabase db push`. Apply the generated seed through a privileged database connection or the project's SQL editor; do not assume CLI seed flags behave the same across versions. For psql use `psql "$TRAVEL_DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase/seed.sql` with the protected variable configured in your shell/CI. Do not print it or put it in mobile configuration.
6. Run the generated `supabase/verify-import.sql` through the same privileged connection. It returns expected/imported counts plus missing and conflicting seed rows for every table. Store that actual project's verification results in your private deployment records. Local report counts are not proof of a remote import.

The migration ledger makes migrations repeatable across new databases and prevents reapplying an existing version. Raw CREATE migrations are deliberately not silently re-run with IF NOT EXISTS. Never edit an already deployed migration; add a forward migration instead. The seed may be applied repeatedly: all inserts use ON CONFLICT DO NOTHING, with no updates, deletes, status changes, account insertion or private-data uploads. Conflicts are reported by verification and require human reconciliation; the importer never overwrites newer editorial work.

## 2. Review and publish

A trusted operator grants an editor access by inserting that **real Auth user UUID** into `travel_private.admin_roles` using a privileged SQL connection, with a meaningful `granted_by` audit value. Never put role controls in `profiles`, editable user metadata or an unrestricted signup trigger. Revoke access by deleting that private role row. The current app has no login, account sync or editor UI.

Use the secure SQL/admin tooling to inspect translations, travel sources and rights. Each destination and attraction needs approved review, a last-verified date, and both translations before public visibility. Publish parent destinations first and then reviewed attractions; draft children stay hidden. A published parent can temporarily have zero approved children in SQL, but the current mobile cutover guard rejects an incomplete catalog.

For photographs, publication of the photo and its assignment must be separately approved, genuine-photograph status and commercial-use rights must be present, dates valid, permitted licence and required provenance complete. Explicitly populate public_provenance and public_evidence_urls with material safe for public disclosure. Original reviewer identity and internal evidence/notes stay private. A placeholder is not upgraded by import or by changing a single approval flag. Public payloads keep author/credit/source/license/modification fields but replace the private reviewer identity with a generic review marker. The app independently validates photo metadata and displays a neutral placeholder for unsafe images. Automated evidence checks do not guarantee rights or legal compliance.

`partner_links` is admin-only, defaults disabled, rejects enabled affiliate rows, and is not consumed by the app in this phase. Existing bundled partner configuration and Google Maps searches continue unchanged. Future database link activation requires a separately reviewed, sanitized public API projection and the existing provider URL validator; a database enabled flag alone cannot activate mobile affiliate links. Keep all partner API keys in server secrets.

## 3. Connect Expo public browsing

Copy `.env.example` to `.env`. Supply only your real project's HTTPS URL and **publishable** `sb_publishable_...` key:

```dotenv
EXPO_PUBLIC_CONTENT_SOURCE=supabase
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

The blanks must be filled from the actual project. Never substitute a service-role/secret key or legacy JWT key. Expo embeds every EXPO_PUBLIC value in the bundle even if unused: runtime checks cannot undo disclosure. `app.config.js` blocks export/start when the supplied key is not a publishable key, and errors never print its value. Local HTTP project URLs are intentionally unsupported by this mobile adapter; use an explicitly reviewed HTTPS endpoint for device tests.

With the flag absent or `bundled`, the app uses bundled content and creates no Supabase client. Invalid opt-in configuration keeps the bundled guide with a localized configuration notice. Correct opt-in reads only `travel_destinations`, explicitly selecting `id,payload`, ordered and paginated. There is an eight-second aborting timeout, bounded pagination and complete runtime DTO validation. No sign-in is needed. Auth persistence, refresh, URL session detection, realtime and collection writes are disabled. The URL polyfill is loaded at the app entrypoint; all added runtime dependencies are JavaScript compatible with Expo Go.

Cutover is deliberately conservative in this foundation: only a validated published catalog that retains **every existing destination and attraction ID under its original parent** can replace bundled content. Empty responses, partial publication, missing translations, schema errors and network failures produce a localized fallback notice with the existing retry control. This lets content be imported/reviewed gradually without losing routes or collection targets. It does not mix server drafts into the public catalog. The original bundled editorial guide remains an explicitly identified legacy offline fallback, with its existing review warnings; it is not a claim that database drafts are published. No remote draft edits ever flow into the bundle.

Remote content is not persisted in this first phase; this avoids caching later-revoked publications. Offline fallback is the validated checked-in dataset, not a failed response. A later cache needs versioning, publication revocation and expiry policies. Setting the flag back to `bundled` requires restarting/re-exporting Expo as appropriate because public environment values are build-time configuration.

## 4. Private Saved/Trips and future sync

The AsyncStorage key stays exactly `travel-explorer:v1` with the same destination-ID arrays and behavior. No database import reads it, no client sends it, and the new private tables are initially empty. Their RLS is preparation only. Future sync requires explicit user login and opt-in, a preview of uploaded data, ownership-scoped writes, a stable mapping from legacy trip shortlists to trips, conflict/idempotency handling, deletion/opt-out and account removal policies. Never silently convert a local guest into a synchronized account. See [admin/security design](./security.md), [rollback](./rollback.md) and [validation](./validation.md).
