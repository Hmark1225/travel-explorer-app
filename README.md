# Travel Explorer

An English-language iOS and Android travel discovery app built with Expo SDK 58, React Native and TypeScript. Warm ivory surfaces, forest-green accents, generous typography and clearly labelled placeholder illustrations frame a curated collection of 36 guide entries.

## Run with Expo Go

Use Node.js 24 (the version validated here) and npm. Install the current **Expo Go** app on your iPhone or Android phone; it must support SDK 58.

```sh
npm ci
npx expo start --go
```

Keep your computer and phone on the same Wi-Fi network. Scan the terminal QR code with Camera on iOS or the scanner in Expo Go on Android. Allow local network access if prompted. No Apple developer account, backend credentials or Android Studio is needed for Expo Go. If the installed Expo Go release does not yet support SDK 58, use a compatible Expo Go build from Expo's official downloads where available, or an SDK 58 development build.

From a remote/cloud machine, LAN addresses generally cannot be reached by your phone. Run locally, or use `npx expo start --go --tunnel` when your environment permits Expo tunnel traffic (the CLI may offer to install `@expo/ngrok`). A tunnel needs network access and has not been verified in this environment. Do not treat an internal localhost address as a phone-accessible preview.

`npm run android` opens an available Android emulator; `npm run ios` requires macOS and an installed iOS Simulator. Native device/emulator validation is still required before release. The app targets mobile; a web map implementation is not included.

## Try the app

1. **Explore:** view Rhodes, Rome and Budapest. Search `Rome`, `Hungary` or `Lindos`; combine search with Coast, Culture or City breaks. Try an unmatched query and reset filters.
2. Open a destination, review its description, scroll through all 12 entries and open attraction details and navigate back using the header or Android back button.
3. Tap a heart, then open **Saved**. Unsave it and verify the empty state. Save another destination.
4. Tap **Add to trip plan** in a destination. Open **Trips**, view the destination and remove a stop. Trip plans are destination shortlists, not bookings or dated itineraries.
5. **Map:** pan and zoom the native map, tap the Rome or Budapest marker, then open the selected destination. Map tiles need internet access; no device location permission is requested.
6. **Profile:** check the guest profile and Saved/Trips counts. Close and reopen the app to confirm saved destinations and trip stops persist on that device.
7. Repeat on iOS and Android, including a small screen and increased system text size. Check scrolling, tab navigation and screen-reader button labels.

All 39 image slots (3 destinations and 36 entries) use local placeholder illustrations: no photograph is presented as a location without confirmed rights. Native basemap tiles require internet; bundled guide information and local collections do not require a backend. All 36 entries await official-source review; admission is explicitly unknown and exact place coordinates and official website actions remain unavailable; clearly labelled external map searches are available. No sign-in, remote sync, booking or real-time travel data is implemented.

## Checks

```sh
npm run typecheck
npm test
npm run export:check
npx expo install --check
```

The Node test runner requires Node 22.18+ (Node 24 recommended). Tests exercise data completeness, destination/attraction identity, search normalization, attraction/country search and combined category filters. Export checks compile and bundle both native platforms; they do not replace device interaction testing. When Expo's metadata endpoints are restricted, `EXPO_OFFLINE=1 npx expo install --check` uses the SDK's bundled compatibility table, and `EXPO_OFFLINE=1 npm run export:check` bundles without metadata requests.

## Project layout and Supabase path

- `App.tsx`: typed native stack and five bottom tabs.
- `src/screens/`: discovery, collections, profile, native map and details screens.
- `src/components/ui.tsx`: shared visual primitives and theme.
- `src/data/destinations.ts`: destination records and pure search/filter logic. `models.ts`, `attractions.ts`, `sources.ts` and `placeActions.ts` hold the guide schema, editorial content, review leads and verified-action guards.
- `src/services/travelRepository.ts`: asynchronous repository contract and mock adapter. Screens consume context rather than importing mock records.
- `src/state/TravelContext.tsx`: loading/error handling and device-local Saved/Trips persistence using AsyncStorage.
- `tests/`: data and filtering checks.

For Supabase, implement `TravelRepository.listDestinations()` using a separate Supabase client and map database rows into the existing `Destination` shape. Use destination and attraction tables with stable IDs and a destination foreign key. Add authenticated saved-destination and trip-stop tables and a separate collection repository before replacing local storage. Apply row-level security scoped to `auth.uid()`, add migration files and loading/error integration tests. Future public client configuration can use `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; public Expo variables are bundled into the app. Never put a service-role key in the mobile app. No Supabase dependency or credentials are required for this local guide.

## Content management workflow

See [the content review ledger](docs/content-review.md) for every entry and its outstanding checks. The 36 original English descriptions are editorial drafts based on general place knowledge, **not live research results**. Official tourism requests returned proxy HTTP 403 during preparation on 2026-10-25. `sourceUrls` are candidate official research leads, usually homepages, not claim-level citations. `lastVerifiedAt` is null for every entry. Durations are explicitly editorial planning estimates, not verified operating facts. There are no numeric admission prices, opening hours, availability promises or travel ratings.

1. Edit `src/data/attractions.ts`. Preserve the six original attraction IDs (`rhodes-old-town`, `lindos`, `colosseum`, `trevi`, `bastion`, `szechenyi`) and all destination IDs. Never reset the `travel-explorer:v1` storage key or mutate Saved/Trips to publish content. Local collections still store destination ID arrays; no storage migration is required.
2. Research the official tourism, monument, museum or operator sites listed in `src/data/sources.ts`. Open the actual relevant pages; replace homepage leads with exact supporting URLs only after visiting them. Add source IDs to the entry and document which fields each source supports in the review ledger. A successful HTTP response alone does not verify a claim. Record redirects, conflicting guidance and unavailable evidence rather than guessing.
3. Confirm descriptions, accessibility advice and admission classification (`free`, `paid`, `varies`, `unknown`). Keep `unknown` when evidence is missing. Do not infer admission policy from a building’s public location. Experiences such as neighborhood walks or meals are labelled as self-guided categories, not named vendors, bookable products or guaranteed services. Keep hours and prices out unless there is a future dated maintenance process.
4. For an individual place, obtain its visitor entrance coordinates from authoritative published location information, corroborate them on a map and check latitude/longitude order and bounds. Save both coordinates, `coordinateSourceUrl` and `coordinatesVerifiedAt` together. Otherwise keep them null. Do not place a single exact pin on a broad neighborhood/food experience unless its defined starting point has been reviewed. `verifiedCoordinates()` gates both place markers and external map links. Existing green destination markers are retained overview points, **not newly verified entrances**. No new attraction pin is currently enabled.
5. Confirm the operator’s HTTPS website and destination after redirects. Set `officialWebsite` and `officialWebsiteVerifiedAt` only after review; otherwise keep both null. The app shows an official website action only for reviewed HTTPS links. Exact-location map actions open Apple Maps on iOS or Google Maps on Android only for reviewed coordinates. Unreviewed places offer a clearly labelled name search instead; broad experiences search only the destination area, not a fictional vendor. Search results are not verified entrances or routes. Link failures display a recoverable alert.
6. After all factual fields have been reviewed, set `reviewStatus` to `reviewed` and `lastVerifiedAt` to the actual ISO review date (`YYYY-MM-DD`), not the authoring date. Keep unresolved fields unknown. Update the ledger with per-field evidence and reviewer notes. Revisit dynamic admission/access guidance before each content release and whenever a source changes.
7. Use the existing placeholders until a location-specific photo has a confirmed commercial-use license. Record the original source page, photographer/required attribution, license name, license URL, image URL, explicit `commercialUseAllowed: true` and rights review date in `photo`. Check license conditions (including required attribution and modification restrictions) and the actual subject depicted. Do not copy images from tourism sites just because the text is public, and do not use unrelated stock as the location. `PlaceImage` requires rights metadata before displaying a photo and otherwise uses a labelled local illustration. Its `image` legacy alias should match the reviewed photo URL. Attribution is rendered beneath photographs.
8. Run `npm run typecheck`, `npm test` and `EXPO_OFFLINE=1 npm run export:check`. Review the diff, perform the physical-device checklist below and submit a content PR. The asynchronous `TravelRepository.listDestinations()` contract and legacy `description`, `duration`, `price`, `image` read fields remain available; do not bypass that service with screen-level data imports.

## Device regression checklist for this change

The previous version passed seven core iPhone functional tests (reported by the owner); that is the baseline, not verification of this branch. Re-run the original seven checks on an **existing installation with saved data**, then:

- Confirm Saved and Trips retain prior destinations after an update and after closing/reopening the app. Verify save/unsave and add/remove still work.
- For each destination, scroll through all 12 cards, open the first, middle and final entries, and go back. Check category, illustration label, summary, estimated duration, detailed text and tips. Verify `lindos`, `trevi` and `szechenyi` still resolve through the existing detail routes.
- Confirm all current entries explicitly show unverified admission, website and location status; no fabricated price, star rating or “last verified” date appears. Verify labelled placeholders work without image network requests.
- Search `Lindos`, `Hungary` and `Rome`, combine category filters and test empty results. Open a newly added destination result through its attraction-name search.
- On Map, confirm all three original green destination markers still open their destinations. This content release intentionally has **zero** reviewed attraction markers. When a future entry is reviewed, check its amber pin, selected-place panel and attraction navigation; verify the exact location externally before publishing it.
- Try the current name-search/area-search map buttons on both platforms and confirm the UI does not claim a reviewed entrance. After adding an actually reviewed entry, test “Open official website” and “Open location in Maps” on both platforms, including returning to the app and handling a failed link. The guarded positive path is unit-tested with synthetic coordinates only; it has not been tried on a device.
- Check long names and tips on a small screen, large system text, VoiceOver/TalkBack and Android hardware back. Verify iOS safe areas and portrait scrolling. Map imagery needs a connection; editorial content and collection persistence do not.

## Validation scope

This branch retains Expo SDK 58 and changes no dependencies, lockfile, Supabase configuration or paid services. Automated validation covers data completeness, stable identities, category coverage, references, coordinate/website guards and photo rights metadata. Native bundle exports verify compilation, not maps, external app launches or persistent storage on a physical device. Current test and export results are reported in the PR; device checks above remain pending.
