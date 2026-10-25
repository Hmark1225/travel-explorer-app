"""Reproduce only the named overview-point extracts; never infer venue entrances.
Run from repository root. Source digests and country-qualified unique matches are
checked before writing. A future source update needs a reviewed commit/digest change.
"""
import hashlib
import json
from pathlib import Path
import urllib.request
import sys
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SOURCES = {
    'naturalEarth': {
        'url': 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/ca96624a56bd078437bca8184e78163e5039ad19/geojson/ne_10m_populated_places.geojson',
        'sha256': '9b8e3de09048ef00dfc70357dbb9fa324493f214b5e0ae4daf1aa79a8d10116b',
        'attribution': 'Natural Earth — public domain',
        'licenseUrl': 'https://github.com/nvkelso/natural-earth-vector/blob/ca96624a56bd078437bca8184e78163e5039ad19/README.md',
        'cachedFile': '/tmp/travel-natural-earth-pinned.json',
    },
    'geoNames': {
        'url': 'https://raw.githubusercontent.com/lutangar/cities.json/c05addfe79dce8a87076ef3fd487eab7e5fe4abd/cities.json',
        'sha256': '9026f0201668325205be9e6299c317b3aad10d1b5f584524fdee718ee70282a3',
        'attribution': 'GeoNames contributors / lutangar cities.json — CC BY 4.0',
        'licenseUrl': 'https://github.com/lutangar/cities.json/blob/c05addfe79dce8a87076ef3fd487eab7e5fe4abd/LICENSE',
        'cachedFile': '/tmp/travel-cities-pinned.json',
    },
}
# Reference, record name, and country. Reject missing or ambiguous matches.
NATURAL_EARTH = [
    ('florence', 'Florence', 'Italy'), ('venice', 'Venice', 'Italy'),
    ('naples', 'Naples', 'Italy'), ('barcelona', 'Barcelona', 'Spain'),
    ('madrid', 'Madrid', 'Spain'), ('paris', 'Paris', 'France'),
    ('lisbon', 'Lisbon', 'Portugal'), ('prague', 'Prague', 'Czechia'),
    ('vienna', 'Vienna', 'Austria'), ('istanbul', 'Istanbul', 'Turkey'),
    ('crete', 'Iraklio', 'Greece'), ('corfu', 'Corfu', 'Greece'),
    ('mallorca', 'Palma', 'Spain'), ('corfu-town', 'Corfu', 'Greece'),
]
GEONAMES = [
    ('amalfi-coast', 'Amalfi', 'IT'), ('santorini', 'Firá', 'GR'),
    ('burano', 'Burano', 'IT'), ('amalfi-town', 'Amalfi', 'IT'),
    ('ravello', 'Ravello', 'IT'), ('positano', 'Positano', 'IT'),
    ('fira', 'Firá', 'GR'), ('oia', 'Oía', 'GR'),
    ('chania', 'Chaniá', 'GR'), ('rethymno', 'Rethymno', 'GR'),
    ('soller', 'Sóller', 'ES'), ('valldemossa', 'Valldemossa', 'ES'),
    ('alcudia', 'Alcúdia', 'ES'),
]

def load(source):
    cache = Path(source['cachedFile'])
    raw = cache.read_bytes() if cache.exists() else urllib.request.urlopen(source['url'], timeout=60).read()
    if hashlib.sha256(raw).hexdigest() != source['sha256']:
        raise ValueError('Source checksum mismatch; stop for review')
    return json.loads(raw)

def main():
    points = {}
    ne = load(SOURCES['naturalEarth'])['features']
    gn = load(SOURCES['geoNames'])
    for key, name, country in NATURAL_EARTH:
        matches = [f for f in ne if (f['properties']['NAME'] == name or f['properties'].get('NAME_EN') == name) and f['properties']['ADM0NAME'] == country]
        if len(matches) != 1:
            raise ValueError(f'{key}: not a unique country-qualified record')
        f = matches[0]
        lon, lat = f['geometry']['coordinates']
        points[key] = dict(latitude=lat, longitude=lon, recordName=name, recordCountry=country, recordId=str(f['properties']['NE_ID']), sourceId='naturalEarth')
    for key, name, country in GEONAMES:
        matches = [f for f in gn if f['name'] == name and f['country'] == country]
        if len(matches) != 1:
            raise ValueError(f'{key}: not a unique country-qualified record')
        f = matches[0]
        points[key] = dict(latitude=float(f['lat']), longitude=float(f['lng']), recordName=name, recordCountry=country, recordId=f"{country}:{f['admin1']}:{f['admin2']}:{name}", sourceId='geoNames')
    metadata = {k: {x: v for x, v in s.items() if x != 'cachedFile'} for k, s in SOURCES.items()}
    if '--check' in sys.argv:
        result = subprocess.run(['node', '--experimental-strip-types', '--input-type=module', '-e',
            'import {geographySources,overviewPoints} from "./src/data/geography.ts"; process.stdout.write(JSON.stringify({geographySources,overviewPoints}));'],
            cwd=ROOT, check=True, capture_output=True, text=True)
        actual = json.loads(result.stdout)
        if actual['overviewPoints'] != points or actual['geographySources'] != metadata:
            raise ValueError('Geography extract differs from checked source records')
        print('27 named overview records match the checksum-pinned sources')
        return

    data = 'export const geographySources = ' + json.dumps(metadata, ensure_ascii=False, indent=2) + ' as const;\n'
    data += 'export const overviewPoints = ' + json.dumps(points, ensure_ascii=False, indent=2) + ' as const;\n'
    data += 'export type OverviewPointId = keyof typeof overviewPoints;\n'
    data += 'export const geographyRetrievedAt = "2026-10-25"; // Named-record extraction, not an entrance survey.\n'
    (ROOT / 'src/data/geography.ts').write_text(data)

if __name__ == '__main__':
    main()
