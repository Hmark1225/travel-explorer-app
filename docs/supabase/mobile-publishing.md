# Progressive admin-to-mobile publishing

The mobile app can now overlay individually published Supabase destinations and attractions onto the shipped guide. The default remains `bundled`; changing the Vercel admin configuration does not configure Expo. No schema migration, new credentials, automatic publication, account sync or partner activation is introduced.

## Windows / Expo Go setup

Download the branch containing this change, extract it to a separate folder, and open a command prompt in the **repository root**, alongside `package.json` and `admin/`.

```bat
npm ci
copy .env.example .env.local
notepad .env.local
```

Set these three lines. Copy the real project URL and publishable key from your existing `admin/.env.local` or Supabase project settings; do not include placeholder text or the admin environment-variable names:

```dotenv
EXPO_PUBLIC_CONTENT_SOURCE=supabase
EXPO_PUBLIC_SUPABASE_URL=YOUR_HTTPS_PROJECT_URL
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SB_PUBLISHABLE_KEY
```

Never use secret/service-role keys or Apple/admin credentials. Keep this file local; actual environment files are ignored. Expo public values are included in the mobile bundle. Restart Metro after changes:

```bat
npx expo start --clear
```

Scan the QR code with the iPhone camera and open Expo Go. In **Profile → Guide updates / Profil → Útikalauz frissítése**, inspect the current status and tap **Refresh guide / Útikalauz frissítése** to fetch subsequent admin publications without restarting Metro. The refresh button is disabled during loading; changing the environment still requires a Metro restart.

## Editorial acceptance check

1. In the admin, save a meaningful, fact-checked change in both languages. Saving alone is private: the database resets that record's approval/publication. Verify the draft wording does not appear on the phone after refresh.
2. Fill required source/coordinate/review dates and human evidence/note. Follow the existing separate **Request review → Approve → Publish** workflow. Do not invent evidence, licences or verification dates just to pass validation.
3. Refresh the guide on the phone. The changed destination should appear in both languages. Only the public allowlisted projection is read; no admin login is needed in mobile.
4. For an attraction, publish both its parent destination and the attraction. A published attraction under a draft parent is intentionally absent. Photos and photo assignments have their own independent approval/publication/rights checks.
5. Verify unchanged destinations and attractions remain present, including Saved/Trips targets. Toggle both languages and existing ordinary Google Maps actions.
6. Disconnect the phone from the network and refresh. The last validated session guide stays available with a translated notice. On a new offline launch, the shipped guide is the fallback. Remote images are not downloaded for offline use.

## Merge and withdrawal semantics

- A valid published destination replaces the matching bundled destination fields. Its published attractions individually override matching children; missing children retain their **shipped** versions. New published destinations/attractions append after shipped entries.
- String IDs, bundled ordering, and attraction-parent ownership are preserved. Duplicate IDs, reused destination/attraction IDs, attempted reparenting, malformed DTOs and incomplete EN/HU translations reject the whole update. Unapproved photos become neutral placeholders, never guessed replacements.
- A successful empty public query is a valid "connected, awaiting publication" state, not a network error. It uses the shipped guide. A network/validation failure retains the last good guide in memory, never an empty result. Concurrent refreshes share one bounded request.
- Every successful fetch rebuilds from the shipped baseline, **not** from previous online content. Archiving/unpublishing a remote-only record therefore removes it at the next successful refresh. An existing bundled record reverts to its shipped version. Archiving is **not a global deletion/takedown mechanism for already distributed bundled content**. Removing shipped content requires a separately planned release/withdrawal mechanism.
- A client that is offline can keep previously public content for the current session. Instant revocation of already delivered content is not promised. No remote catalog is persisted across restarts in this phase, avoiding a durable stale editorial cache.
- `travel-explorer:v1` is unchanged. Saved/Trips stay private, local and never uploaded. This change makes no Auth, Storage upload, realtime or partner API calls and no database writes.

To roll back, set `EXPO_PUBLIC_CONTENT_SOURCE=bundled` and restart/rebuild Expo. Do not reset/delete the database or AsyncStorage. The separate admin continues to function.

## Validation boundaries

Automated repository tests cover partial publication, bilingual overlays, safe ID merging, malformed/draft rejection, session fallback, successful withdrawal and bounded pagination/timeouts. The local PostgreSQL suite exercises the actual anonymous public view after the admin review/approve/publish workflow and confirms other draft items stay absent from that view while bundled items remain usable.

Hosted inspection on 2026-10-29 found **0 published destinations and 0 published attractions** in the existing public views. No hosted content was published or changed by this work. A real iPhone publication/refresh test requires the owner's reviewed publication and Expo configuration above; it has not been claimed as completed.

Checks completed on 2026-10-29: TypeScript passed; all **66 tests across 10 root test files** passed, including existing partner handoff and Saved/Trips persistence tests; content and bilingual localization audits passed (176 UI messages, no missing translations); both Expo iOS and Android exports completed. Export used one Metro worker in this environment after the initial default-worker attempt stopped before completion. Successful output bundles: iOS `index-f139455bbf56f9b96dca4cefc518a7d5.hbc`, Android `index-667237d9ba6210073747f80d38ae182f.hbc`.
