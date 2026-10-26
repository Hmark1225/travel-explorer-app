# Localization architecture

Travel Explorer supports `en` and `hu` throughout application-owned UI and travel content. English remains the source language. The current dataset has no missing Hungarian translations: 18 destinations, 156 attraction/program records, 312 individual tips, 19 duration phrases and 169 UI templates. See localization-report.json for the reproducible inventory. The previous travel-source review limitations remain unchanged.

## Data and display boundaries

- Existing `src/data/content/*.ts` records keep their English text, IDs and facts. `src/i18n/content/hu/*.ts` contains the Hungarian counterpart per destination, keyed by the same stable attraction IDs. Hungarian uses established names such as Rodosz, Róma, Firenze, Velence, Nápoly, Kréta, Korfu, Párizs, Lisszabon, Prága, Bécs and Isztambul. Original attraction names remain where appropriate; this is intentional, not a missing translation.
- `src/i18n/types.ts` defines complete `Localized<DestinationText>` and `Localized<AttractionText>` records. Builders attach `localized.en` and `localized.hu`; the old string fields remain source-English for existing repository consumers and audit tools. Categories/admission types remain stable codes and use translated UI labels. No price, opening hour, availability or verification claim is added by translation.
- `src/i18n/content.ts` materializes text and projects display records for `useTravel()`. Language projection preserves IDs, source URLs, coordinates, review flags and photo objects. Photos are shared by reference; neither attribution nor rights metadata is rewritten.
- Source prose is the fallback for a missing/empty future translation. This avoids inventing facts and keeps future partial development readable, but the completeness audit **fails** when current source records are missing translations. It checks blank fields, untranslated descriptive copies, missing/extra tips, orphan IDs, duration vocabulary and UI interpolation tokens.
- `src/i18n/messages.ts` supplies typed UI templates. `core.ts` handles interpolation, English singular/plural forms, Hungarian count wording, dates, category labels and safe English fallback. Hungarian accents are stored as UTF-8 and rendered with native system typography. Hungarian number-plus-noun phrases use singular nouns, for example `2 hely`.
- Both-language names/countries/regions and attraction names are added to display search aliases. Searching `Róma` in English or `Rome` in Hungarian remains possible. Normalization also supports `Becs`, `Toszkana` and other accent-free queries without changing canonical IDs or geographic metadata.

## Preference lifecycle

`LanguageProvider.tsx` reads the primary locale through Expo SDK 58's `expo-localization` and owns a testable `LanguageStore`. A Hungarian device starts in Hungarian, an English device in English, and other primary languages in English. Secondary device languages are not substituted for an unsupported primary language.

Only manual preferences are persisted, as plain `en` or `hu` under `travel-explorer:language:v1`. Stored manual choices override the current device locale. The app waits for the preference read before showing navigation to avoid a language flash. Without a stored manual preference, the device default is detected each launch; a running session does not continuously follow OS locale changes.

React `useSyncExternalStore` subscriptions apply a manual selection immediately. Storage writes are serialized, and hydration revision guards prevent stale reads from reverting a manual choice. Errors remain message keys until display, so already-recorded errors change language too. Read/write failures do not clear preferences or collections; selecting a language again retries saving it. Saved/Trips remain in the original `travel-explorer:v1` object, with the same destination ID arrays.

Routes keep their original internal names and params. Tab/header titles and accessibility labels are translated, and navigation containers are not keyed/remounted by language. Switching does not recreate the app or reset its navigation state.

## Deliberately preserved source text

Travel Explorer's brand, proper names where translation would mislead, URLs, geographic record IDs, author names, copyright attribution, license identifiers/terms, evidence and modification records remain verbatim. Photo-source/author/license controls, fallback labels and surrounding explanatory text are translated. Current photos are neutral placeholders, and their UI accessibility labels use the active language. Adding a future real photo requires its usual rights review and appropriate localized descriptive accessibility text; a language change must never alter its legal evidence.

External source pages, native OS dialogs and basemap-provider labels are outside the app catalog and may follow the provider/device language. This does not represent an incomplete application content translation. The report lists these intentional boundaries separately from missing fields.

## Current coverage

| Destination ID | English / Hungarian display name | Attraction translations |
| -------------- | -------------------------------- | ----------------------: |
| rhodes         | Rhodes / Rodosz                  |                   12/12 |
| rome           | Rome / Róma                      |                   12/12 |
| budapest       | Budapest / Budapest              |                   12/12 |
| florence       | Florence / Firenze               |                     8/8 |
| venice         | Venice / Velence                 |                     8/8 |
| naples         | Naples / Nápoly                  |                     8/8 |
| amalfi-coast   | Amalfi Coast / Amalfi-part       |                     8/8 |
| santorini      | Santorini / Szantorini           |                     8/8 |
| crete          | Crete / Kréta                    |                     8/8 |
| corfu          | Corfu / Korfu                    |                     8/8 |
| barcelona      | Barcelona / Barcelona            |                     8/8 |
| madrid         | Madrid / Madrid                  |                     8/8 |
| mallorca       | Mallorca / Mallorca              |                     8/8 |
| paris          | Paris / Párizs                   |                     8/8 |
| lisbon         | Lisbon / Lisszabon               |                     8/8 |
| prague         | Prague / Prága                   |                     8/8 |
| vienna         | Vienna / Bécs                    |                     8/8 |
| istanbul       | Istanbul / Isztambul             |                     8/8 |

Missing or incomplete application/UI/content translations: **0**. Translation coverage is not a claim that the underlying travel facts, photo rights or physical-device rendering have been independently verified.

## Adding another language

1. Extend `Language` and `Localized<T>` in `types.ts`; retain `en` as the source and fallback. Extend `isLanguage`, device-locale selection, template selection and date formatting in `core.ts`. Previously saved `en`/`hu` values must continue to work.
2. Add a complete UI dictionary keyed by the English `MessageKey` set. Preserve interpolation variable names and provide appropriate count forms; add catalog selection to `translate` rather than scattering conditions in screens.
3. Add per-destination content modules for the language, using existing IDs. Provide destination names/country/region/tagline/description/coordinate labels and every attraction name, summary, detailed description, duration phrase and tip. Add country/duration vocabulary. Preserve source meaning and uncertainty; do not invent details to fill a gap.
4. Extend the content materializers to build the new `localized` member, and add it to `localizeDestination` search aliases. Update the Profile chooser to expose the language. Do not mutate English fields, IDs, source URLs, coordinates or photo evidence.
5. Extend `createLocalizationReport` to audit the new raw dictionary/content, not only the fallback-filled display result. Add locale/selection/persistence/fallback and complete-content tests. Every current record must be covered before describing the language as complete.
6. Regenerate the report and run the checks below. Test instant switching, native navigation, long text, accents, accessibility, restart persistence and an unsupported device locale on actual devices. Use a fresh test installation for first-launch checks, not a destructive reset of real Saved/Trips data.

```sh
npm run typecheck
npm test
npm run audit:localization -- --write
npm run audit:localization -- --check
npm run audit:content -- --check
EXPO_OFFLINE=1 npm run export:check
```

The native dependency addition is limited to the SDK-compatible `expo-localization`; the existing framework, storage, navigation and photography-rights packages were not upgraded. Expo Go must support the repository's SDK 58.
