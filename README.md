# Travel Explorer

An English/Hungarian Expo SDK 58 / React Native / TypeScript app for iOS and Android, with Explore, Map, Saved, Trips and Profile tabs. The offline guide now contains **18 destinations and 156 authored attractions/experiences**. The original three destinations retain 12 entries each; the 15 additions have eight each.

**Editorial status:** no travel entry or destination summary is fully source-reviewed. Official tourism and Wikimedia requests were blocked in this environment. There are **zero reviewed photographs**, so all 174 hero slots show neutral placeholders. Previous AI-generated images have been removed. Fifteen new destination overview points and 12 town-walk overview points were extracted from named, checksum-pinned gazetteer records; these do **not** verify venue entrances, walking routes, current operations or admission.

See [the per-destination inventory](docs/content-audit.md), [machine-readable content/photo inventory](docs/content-inventory.json), [editorial checklist](docs/editorial-review.md) and [geography provenance](docs/geography-sources.md). Authoring complete does not mean editorial review or commercial publication clearance is complete.

## Run in Expo Go

Use Node.js 24 and npm. Install Expo Go compatible with **SDK 58** on your iPhone or Android device.

```sh
npm ci
npx expo start --go
```

On the same local network, scan the QR code with Camera on iOS or Expo Go on Android, and allow local-network access when prompted. A cloud localhost address is not a phone-accessible preview. For a remote host, use a permitted Expo tunnel (`npx expo start --go --tunnel`) or run a local checkout. Tunneling may require Expo's optional tunnel tool and network permission; it has not been tested here. If the installed Expo Go does not support SDK 58, use an official compatible client where available or a matching development build.

`npm run android` opens an available Android emulator. `npm run ios` needs macOS and an installed iOS Simulator. No paid API, external database, backend credential or sign-in is required. The app targets mobile; web maps are not implemented.

## What to try

- Search destinations, countries and regions locally: `Spain`, `Tuscany`, `Central Europe`, `Firenze`, `Czech Republic`, `Türkiye`, `Ile de France`, `Soller`, or `France Louvre`. Country codes such as `GR` work as exact country queries. Combine a query with Coast, Culture or City breaks. Search ignores accents and matches word prefixes, so `Rome` does not match the middle of another word.
- Open all 18 destination guides. Explore the eight new entries in each addition and the 12 retained entries in Rhodes, Rome and Budapest. Read descriptions, tips, approximate editorial durations and review status. No prices, hours, ratings, bookings or live availability are invented.
- Save destinations and add/remove trip-plan stops. These are local destination shortlists, not bookings or dated itineraries. Existing `travel-explorer:v1` Saved/Trips arrays and all original IDs are preserved; there is no data reset or migration.
- On Map, green pins are destination overviews. Amber pins represent sourced town overviews, **not venue entrances or verified routes**. Coincident town/destination points share the destination pin; the town walk remains reachable through its guide. Islands and the Amalfi Coast use explicitly named town anchors, not asserted region centroids. The original three destination pins remain labelled legacy points pending source review.
- Unverified venues can be searched by name in external Maps; broad experiences search only their destination area. Sourced town walks can open their overview point. Confirm provider results before travelling. Official venue website actions remain unavailable until their URLs are reviewed.

## Checks and audit tools

```sh
npm run typecheck
npm test
EXPO_OFFLINE=1 npm run export:check
npm run audit:content -- --check
npm run audit:localization -- --check
```

Tests cover counts, global IDs, preservation of all 36 original editorial records, source/review distinctions, search, geography bounds/provenance, rejection of ambiguous geography and photo metadata policy. Native Hermes exports compile both iOS and Android; they do not establish device behavior or legal compliance. The existing dependency versions remain pinned; `expo-localization` was added using the SDK 58 compatibility table.

To inspect or regenerate the content/photo audit:

```sh
npm run audit:content
npm run audit:content -- --write
```

The audit reports authored versus reviewed entries, geographic scope, photo provenance and outstanding metadata. It does not authenticate a photograph, identify its actual author or determine copyright, privacy, property, trademark or commercial-use rights.

Geographic extracts can be checked or reproduced with Python's standard library:

```sh
python3 scripts/import_geography.py --check
python3 scripts/import_geography.py
```

The importer uses pinned source commits, SHA-256 checks and unique name-and-country matches. It uses a matching cache when present or downloads the same pinned data. A checksum proves file identity, not real-world accuracy. Source or matcher changes need editorial review; never substitute a similarly named town automatically.

## Content architecture

- `src/data/content/<destination>.ts`: one editable module per destination; namespaced new IDs and original IDs retained unchanged.
- `src/data/builders.ts`: common defaults and legacy read aliases (`description`, `duration`, `price`, `photo`, `image`); missing facts remain unknown/null.
- `src/data/destinations.ts`: ordered registry and compatible exports. `TravelRepository.listDestinations(): Promise<Destination[]>` is unchanged; screens still read through context.
- `src/data/search.ts`: a weakly cached, accent-insensitive index of names, region, country, aliases and attraction names. Treat published data objects as immutable; replace an object rather than mutating it in place.
- `src/data/sources.ts`: candidate official research leads with access status, not citations for claims that have not been reviewed.
- `src/data/geography.ts`: narrow named-record extracts with source snapshots, hashes, attribution and record identifiers. `coordinatesVerifiedAt` means checked against the recorded geographic source; `lastVerifiedAt` is the separate travel-content review date.
- `src/data/media.ts` and `placeActions.ts`: neutral photo defaults, evidence-completeness checks and guarded external links.
- `src/components/DestinationFeed.tsx`: virtualized Explore, Saved and Trips lists. The initial render and batch sizes are bounded; there is no vertical ScrollView nesting. Detail pages render only their current destination's 8–12 entries.
- `src/state/TravelContext.tsx`: unchanged local persistence and loading/error handling. No Supabase integration or paid service was added.

## Authentic photography policy

Only authentic photographs with a recorded subject and rights review can be published. Use neutral placeholders until evidence is available; do not use AI-generated images or an unrelated photo as the location. Current `heroImage: Photo` objects are placeholders, and optional `galleryImages` arrays are empty. The legacy `photo` field aliases the hero; `image` is its remote URL or null.

A photo record stores the display URL, original URL, source page, author, credit, license identifier and URL, commercial-use review decision, subject and subject-review date, rights-review date, reviewer, evidence URLs, provenance notes and modification notes (including an explicit `None` if unchanged). Prefer public-domain, CC0 or suitable commercial-use licenses. The publication gate recognizes a small documented policy set; adding other licenses needs human review rather than changing a flag to force display. Share-alike obligations and attribution conditions still apply where relevant.

`PlaceImage` rejects incomplete records, keeps a neutral frame while loading, handles native load errors and resets failure state on URL changes. Reviewed photos show credit/author, modification information, and links to the source and license in the app; detail pages expose the full credit context even when a compact preview is used. Remote photos should be pre-sized for mobile (normally at most 1200 px wide, aiming for 250 KB or less), without stripping or obscuring required attribution. Do not bundle original oversized downloads or load a whole remote gallery eagerly. Metadata tests are a release aid, **not a guarantee of legal compliance or photographic authenticity**.

## Physical-device regression checklist

These checks remain pending on this branch; the previously reported seven iPhone tests describe the earlier version only.

1. Update an existing installation with saved destinations and trip stops. Confirm they survive the update and restart; test saving/removing both old and new destinations.
2. Scroll Explore through all 18 destinations; search region, country, aliases and attractions; combine filters and reset an empty result. Confirm the keyboard and input remain usable while typing and the lists do not jump or nest-scroll unexpectedly.
3. Open the first, middle and last entry of every guide, including the last-added Istanbul guide. Check all 8/12 entries, English copy, durations, tips, review labels and back navigation. Check `lindos`, `trevi` and `szechenyi` still resolve.
4. Inspect destination/town markers, initial Europe-wide framing, source and license links, duplicate-point handling and the scrollable selection card. Confirm town anchors are never called exact entrances; no pin is assigned to Santorini's Pyrgos from the mainland/Cretan records.
5. Test external Maps searches and sourced town-point actions, returning to the app afterward. Test a source-link failure offline. Gazetteer credit/source/license links should remain readable.
6. Confirm neutral placeholders across Explore, details, Saved, Trips and Map with no generated artwork or unreviewed photo. A developer may use a **synthetic test fixture only** to exercise a failing photo URL and source-change recovery; it is not a publishable rights record. A real photo's credits and links need device review after its evidence has actually been approved.
7. Check small-screen layout, increased system text, VoiceOver/TalkBack, safe areas and Android hardware back. Offline guide/search/collections should work after the bundle is cached; basemap tiles and external links need connectivity.

## English and Hungarian

Open **Profile → Language** (Hungarian: **Profil → Nyelv**) to choose English or Hungarian. Tabs, headings, filters, search, errors, map markers, accessibility labels and all destination/attraction display content change immediately. A separate AsyncStorage key, `travel-explorer:language:v1`, stores the manual choice; Saved/Trips remain under the unchanged `travel-explorer:v1` key. No collection reset or migration occurs.

On startup, Expo's `expo-localization` supplies the primary device locale: Hungarian selects `hu`, English selects `en`, and all other languages default to `en`. A stored manual choice takes precedence, including a manually selected English preference on a Hungarian device. Without a manual choice the device default is detected each launch. A short localized loading indicator prevents a flash of the device language before the saved choice is read. Language changes apply synchronously; serialized writes and revision guards prevent older reads/writes from undoing a newer selection. Storage failures are reported in the selected language and can be retried by selecting it again.

The app uses a small typed translation catalog and React context, with no translation backend or heavyweight localization dependency. `src/i18n/messages.ts` holds the complete English/Hungarian UI templates. Existing English travel modules remain the source; `src/i18n/content/hu/<destination>.ts` holds authored Hungarian names, descriptions and tips, and shared country/duration vocabulary lives in `contentShared.ts`. Builders attach `localized: { en, hu }` objects. The repository remains source-English; `useTravel()` projects only display fields into the active language. Canonical IDs, category codes, coordinate/source values and photo metadata are unchanged. Both English and Hungarian search names remain available in either interface language.

[Localization architecture and future-language instructions](docs/localization.md) · [Completeness report](docs/localization-report.json)

```sh
npm run audit:localization
npm run audit:localization -- --write
npm run audit:localization -- --check
```

The current catalog covers **167 UI templates, 18 destinations, 156 attractions, 312 tips and 19 duration phrases**, with **zero missing/incomplete translations**. Proper names may intentionally remain in their original form. Brand text, legal photo credits/licenses/provenance, source URLs and geographic attribution remain verbatim; their surrounding UI is translated. Vendor basemap labels, external websites and operating-system dialogs remain controlled by their provider/system locale. Translation does not change the underlying travel-source review status or photo-rights policy.

Device checks remain pending: toggle languages in Profile and verify the current tab and all navigation labels change without restarting; open old/new destinations and first/middle/last attraction entries in both languages; test Hungarian names and accent-free search; close/reopen to verify the manual choice persists; confirm old Saved/Trips survive both switching and restart. Check long Hungarian text and `á é í ó ö ő ú ü ű` on a small iPhone with larger system text and VoiceOver, then repeat navigation/back behavior on Android. On a fresh test installation verify Hungarian/English/unsupported primary device locales, without deleting real user collections. Authored content is fully translated; this automated coverage report does not substitute for device or independent linguistic QA.

## Travel partner integration — Phase 1

Destination details now include **Plan your trip**, and attraction details include **Plan your visit**, in English and Hungarian. Maps handoffs use documented Google Maps URLs and show an external-service confirmation. Place/area searches are explicitly labelled; directions require a reviewed entrance. Saved/Trips storage, all guide records, photos and attribution remain intact.

Booking.com, Viator, Tripadvisor and GetYourGuide have modular provider definitions but stay disabled until their exact URLs and configuration are reviewed. There are no active affiliate links, analytics, live partner API calls or invented offers. The provider layer supports verified localized mappings, feature flags, approval checks and safe navigation.

[Configuration and activation gates](docs/partners/README.md) · [Future Supabase APIs and cache/licence policy](docs/partners/supabase-architecture.md) · [Draft human review checklist](docs/partners/review-checklist.md) · [Validation results](docs/partners/validation.md)
