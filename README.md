# Travel Explorer

An English-language iOS and Android travel discovery app built with Expo SDK 58, React Native and TypeScript. Warm ivory surfaces, forest-green accents, generous typography and destination photography frame a small, curated travel collection.

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
2. Open a destination, review its description, open both attractions and navigate back using the header or Android back button.
3. Tap a heart, then open **Saved**. Unsave it and verify the empty state. Save another destination.
4. Tap **Add to trip plan** in a destination. Open **Trips**, view the destination and remove a stop. Trip plans are destination shortlists, not bookings or dated itineraries.
5. **Map:** pan and zoom the native map, tap the Rome or Budapest marker, then open the selected destination. Map tiles need internet access; no device location permission is requested.
6. **Profile:** check the guest profile and Saved/Trips counts. Close and reopen the app to confirm saved destinations and trip stops persist on that device.
7. Repeat on iOS and Android, including a small screen and increased system text size. Check scrolling, tab navigation and screen-reader button labels.

Photos are illustrative Unsplash images. Images and native basemap tiles require internet; bundled mock destination information and local collections do not require a backend. Admission information is deliberately approximate and should be confirmed with venues. No sign-in, remote sync, booking or real-time travel data is implemented.

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
- `src/data/destinations.ts`: typed destination/attraction records and pure search/filter logic.
- `src/services/travelRepository.ts`: asynchronous repository contract and mock adapter. Screens consume context rather than importing mock records.
- `src/state/TravelContext.tsx`: loading/error handling and device-local Saved/Trips persistence using AsyncStorage.
- `tests/`: data and filtering checks.

For Supabase, implement `TravelRepository.listDestinations()` using a separate Supabase client and map database rows into the existing `Destination` shape. Use destination and attraction tables with stable IDs and a destination foreign key. Add authenticated saved-destination and trip-stop tables and a separate collection repository before replacing local storage. Apply row-level security scoped to `auth.uid()`, add migration files and loading/error integration tests. Future public client configuration can use `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; public Expo variables are bundled into the app. Never put a service-role key in the mobile app. No Supabase dependency or credentials are required for this mock version.

## Cloud validation performed

TypeScript checking, all three data/filter tests, SDK-bundled dependency compatibility checking, and Hermes exports for **both iOS and Android** passed. Metro startup, its status endpoint, the iOS Expo manifest and a full Android development JavaScript bundle were verified. Online Expo metadata checks were restricted, so compatibility was checked using the installed SDK table. React Native DevTools used its fallback because its optional download cache was not writable. No physical device, simulator, tunnel or native map interaction has been tested here; use the checklist above on both platforms.
