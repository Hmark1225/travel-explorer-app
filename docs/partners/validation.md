# Phase 1 validation results

Validated in the managed Linux workspace on 2026-10-26 with Node 24.19.0, the repository's pinned Expo SDK 58 dependencies and TypeScript 6. No package.json, lockfile, native configuration or dependency changes were required.

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm test` | Passed, all seven test files |
| `node --experimental-strip-types tests/partners.test.ts` | Passed, 10 provider/security tests |
| `node --experimental-strip-types tests/partner-ui.test.ts` | Passed, 3 interaction/state tests |
| `npm run audit:localization -- --check` | Passed; 167 UI templates, zero missing/incomplete translations |
| `npm run audit:content -- --check` | Passed; existing content/review/photo inventory unchanged |
| `EXPO_OFFLINE=1 npm run export:check` | Passed; iOS and Android Hermes bundles exported to ignored `dist/` |
| `git diff --check` | Passed |

Provider tests exercise all 18 destinations and 156 attractions in both languages, exact domains, hostile schemes/credentials/ports/fragments/redirect parameters, duplicate or unexpected Maps query keys, missing/pending/rejected/unavailable/disabled/development configurations, exact localized URL fallback, attraction relevance, verified entrance versus area search, affiliate approval gates, forged/stale outbound URLs and OS handoff failures. Test-only synthetic mapping fixtures do not establish verification of real provider pages and are not imported by application code. No real affiliate identifier is present.

The component tests execute actual PartnerPlanning TSX with native-host/hook test doubles: confirmation before navigation, cancellation and Android-style modal back callback, displayed hostname, bilingual accessibility labels, duplicate-tap prevention, busy state and localized accessible failure. A test also executes the unchanged TravelProvider using in-memory AsyncStorage, verifying restoration and persistence of Saved/Trips across a partner handoff, language change and collection toggles. Existing tests continue to protect the original content, localization, geography and photo-rights systems.

These automated checks and native bundle exports do not establish physical-device behavior. Expo Go on actual iOS/Android, VoiceOver/TalkBack focus, large-text layout, offline browser behavior, return-to-app behavior and independent Hungarian copy review remain manual release checks in [the checklist](./review-checklist.md). No new native module was introduced. Ordinary Google Maps URL generation is based on its documented URL API; commercial links and live APIs remain disabled pending actual review. Provider websites and agreements were not scraped or claimed to be independently verified.

The initial type check found the workspace's existing `expo-localization` package missing. A clean install with a writable temporary npm cache and network access resolved this environment setup issue. Node emits the repository's existing MODULE_TYPELESS_PACKAGE_JSON warning for TypeScript scripts; checks still pass. The native export is an offline compilation check and does not call partner services.
