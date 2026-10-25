# Geographic source record

The geographic work completed on 2026-10-25 was a named-record extraction, not a site survey or verification of venue operations. It supplies **15 new destination overviews and 12 town-walk overviews**. The original Rhodes, Rome and Budapest numerical points are unchanged and still await source review. There are no reviewed venue-entrance coordinates.

## Sources actually retrieved and read

1. **Natural Earth populated places**, public domain. The pinned repository README explicitly describes Natural Earth as a public-domain map dataset. The source was matched by `NAME` or `NAME_EN` **and** country, not just a place-name string.
   - Data: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/ca96624a56bd078437bca8184e78163e5039ad19/geojson/ne_10m_populated_places.geojson
   - SHA-256: `9b8e3de09048ef00dfc70357dbb9fa324493f214b5e0ae4daf1aa79a8d10116b`
   - Source/terms statement: https://github.com/nvkelso/natural-earth-vector/blob/ca96624a56bd078437bca8184e78163e5039ad19/README.md
2. **GeoNames-derived cities.json**, published by lutangar under **CC BY 4.0**. Its README identifies the GeoNames Gazetteer as the source; the repository license text was retrieved and preserved. These are populated-place records, not monument entrance coordinates.
   - Data: https://raw.githubusercontent.com/lutangar/cities.json/c05addfe79dce8a87076ef3fd487eab7e5fe4abd/cities.json
   - SHA-256: `9026f0201668325205be9e6299c317b3aad10d1b5f584524fdee718ee70282a3`
   - Source description: https://github.com/lutangar/cities.json/blob/c05addfe79dce8a87076ef3fd487eab7e5fe4abd/README.md
   - License: https://github.com/lutangar/cities.json/blob/c05addfe79dce8a87076ef3fd487eab7e5fe4abd/LICENSE
   - Retained license: [CC BY 4.0 text](licenses/cities-json-CC-BY-4.0.txt)
   - Credit: **GeoNames contributors / lutangar cities.json — CC BY 4.0**. Changes: extracted selected records, converted latitude/longitude strings to numbers, added app reference IDs and overview labels. No entrance was inferred and no claim of endorsement is made.

Attribution and source/license links appear in the corresponding guide and map selection. Natural Earth record IDs and the GeoNames name/country/admin tuple are retained in `src/data/geography.ts`; source files are pinned by commit and digest. `scripts/import_geography.py --check` reproduces all 27 selected reference records. It rejects missing or non-unique name-and-country matches.

## Scope and rejected assumptions

- Santorini is anchored at **Firá**, Amalfi Coast at **Amalfi town**, Crete at **Heraklion / Iraklio**, Corfu at **Corfu / Kerkira town**, and Mallorca at **Palma**. Those points do not claim to be island/region centroids or route starts.
- Twelve experiences use town points: Burano; Amalfi, Ravello and Positano; Firá and Oía; Chaniá and Rethymno; Corfu town; Sóller, Valldemossa and Alcúdia. They identify the named settlement only. Review the actual route before travelling.
- The retrieved Greek `Pýrgos` records describe the Peloponnese and Crete, **not Santorini's Pyrgos**. They were rejected for that experience; its coordinates remain null. Matching only a name or choosing a nearby-looking result would be unsafe.
- Precise visitor entrances, accessibility routes, trailheads and public access remain unverified. Overview points are unsuitable for turn-by-turn directions to a venue.
- Gazetteer source review is distinct from tourism-content review. All travel-entry `lastVerifiedAt` values remain null. A source checksum proves reproducibility, not present-day geographic truth or legal compliance.
