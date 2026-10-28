# Travel Explorer Admin Dashboard v1

A separate Next.js/TypeScript application in `admin/`. The Expo app remains in the repository root, with its existing models, IDs, translations, photo policy, provider configuration and local `travel-explorer:v1` Saved/Trips data. No account sync or collection upload is added.

## Local setup and first administrator

1. In `admin/`, run `npm ci`, copy `.env.example` to `.env.local`, and fill in the actual project's HTTPS URL and **publishable** `sb_publishable_...` key. Set `NEXT_PUBLIC_ADMIN_ORIGIN` to the real HTTPS deployment origin when uploaded photos will be published. No live URL or credentials are supplied here. Never use database passwords, service-role/secret keys, legacy JWT keys or partner API secrets in browser configuration. Next validates public key/URL formats before build.
2. Review the new `20261027042327_admin_dashboard.sql` migration and apply it to an isolated staging database first. The CLI created this migration file; it has **not** been applied to production by this change. Do not run `db reset` on an existing project.
3. Verify migration history before pushing. The inspected hosted project lists the foundation migrations under versions `20261026205938`, `20261026205942`, `20261026205946`, while repository filenames use their original versions. Do not blindly replay them. A trusted operator must reconcile the migration ledger against the already applied SQL using the installed CLI's documented migration-repair process, or apply only the reviewed new migration through the chosen controlled deployment workflow. Back up first; do not edit/re-run already applied foundation SQL.
4. Create or invite an actual Auth user in Supabase Dashboard → Authentication and verify their email and identity. Disable public signup for this private workspace if not needed elsewhere. No signup or automatic first-user promotion is implemented in the app. Account creation alone grants no editorial access.
5. Using a privileged database console, manually insert the verified Auth UUID into `travel_private.admin_roles`. Use the actual UUID, not an email supplied by an unverified requester:

```sql
insert into travel_private.admin_roles (user_id, granted_by)
values ('VERIFIED_AUTH_USER_UUID'::uuid, 'Named operator / reviewed access ticket')
on conflict (user_id) do nothing;
```

The UUID is an instruction placeholder, not a fabricated account. Do not run it until the real user is verified. Admin membership is not stored in profiles or user-editable metadata. Only a trusted database operator can grant/revoke membership. Role changes after the migration are audited. No membership was assigned by this implementation.

6. Run `npm run dev` inside `admin/`; use the local address printed by Next. Sign in with that real Auth user's email/password. A signed-in non-admin sees access denied. Auth is verified with `getUser()` and database `admin_access()`; every query/write still uses the user's JWT and RLS. The browser stores the session in sessionStorage, not a shared server cookie or mobile storage. Sign out on shared devices. The UI rechecks on focus and periodically; revoked membership also takes effect immediately on database access. Already issued signed image URLs can remain usable for up to five minutes.

## Editorial workflow

The dashboard counts actual authorized rows, translations, publication states, photos awaiting review and recent audit changes. There is no production demo-data fallback. Destinations and attractions support search/status filtering, draft creation, immutable IDs, bilingual fields, categories, coordinates, practical tips and source metadata. Attraction parents cannot be changed after creation, preserving old links and collection identity.

Saving is one atomic `admin_save` transaction with row locking and a version compare-and-swap. A stale version yields a conflict instead of overwriting another editor. Invalid/missing translations roll back the whole save. Source IDs are validated and source-junction references inserted; previous source associations are retained as provenance history rather than destructively deleted. The record's source ID/URL list is the current public projection. No existing content is automatically published.

Separate actions are **Save draft → Request review → Approve → Publish**. Edits invalidate approval/publication. The database requires a specific HTTPS evidence URL, a meaningful review note, valid review dates, complete English/Hungarian text and source/coordinate verification before approval. Official websites require verification. IDs cannot be renamed, and editorial records are archived rather than deleted. The same checks apply to direct API writes. V1 permits the same authorized administrator to review and publish; it does not claim four-eyes separation. Add narrower reviewer/publisher roles before adopting that organizational requirement.

## Photographs and Storage

`travel-editorial` is a **private** bucket with a 10 MB limit and JPEG/PNG/WebP MIME restrictions. Only admins can upload and preview draft objects. Uploads use random filenames and `upsert:false`; browser byte/MIME checks reject SVG and basic mismatches. Client checks do not prove image authenticity or defeat a malicious administrator: human review must confirm the actual location, genuine photography, copyright and subject evidence.

Imported placeholders remain placeholders. Uploading from an existing placeholder editor creates a new photo record; a database trigger forbids promoting the original placeholder into a photo. New uploads have unknown authenticity/needs-review status. Record source/creator, licence/URL, credit, original evidence, subject verification, commercial rights, dates and public-safe provenance. Photo approval/publication and hero-assignment approval/publication are independent. Assigning a photo does not approve it. Assignment review references the photo evidence and still needs explicit review/approve/publish actions. Existing placeholder records are retained.

Private previews expire after five minutes. Public delivery uses `/api/photos/[id]`: a server-side **publishable anonymous** client reads the allowlisted `travel_photo_delivery` view, then requests a five-minute Storage URL under RLS. It never uses a service key. Draft/unapproved/unassigned photos cannot be delivered anonymously; archiving removes new access, while previously signed URLs expire within five minutes. The route is not cached and is a Vercel server function. Use a real configured HTTPS origin for uploaded-photo URL generation before publishing; without one, uploads remain privately reviewable but cannot pass the required public URL verification. External approved photo URLs remain possible with appropriate rights. Never make the bucket public.

The editor shows original source/licence links and attribution fields. The mobile public payload continues to expose allowed credit/licence/source metadata while withholding private reviewer names and notes.

## Partners and audit

Booking.com, Viator, Tripadvisor and GetYourGuide records require exact canonical HTTPS provider URLs, mapping IDs, evidence, documented URL rules and review dates. Search/redirect/tracking parameters are rejected. Activation is a separate approved transition; affiliate activation is blocked in the database. No invented agreements, IDs, prices or live API responses are used. Database records do not yet activate mobile commercial provider actions; that needs a separately reviewed public integration adapter.

`editorial_audit_log` records before/after changes and authenticated actor UUIDs via a private trigger. Administrators can read it but cannot insert, change or delete entries. This is append-only against application roles, not an absolute guarantee against the database owner or service-role operator. It contains private editorial details; no public grants exist. Saved/Trips/private profiles are not included in editorial audit triggers.

See [security review](security-review.md), [deployment](deployment.md), and [validation](validation.md).
