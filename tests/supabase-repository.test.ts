import { test } from "node:test";
import assert from "node:assert/strict";
import { destinations } from "../src/data/destinations.ts";
import { parseCatalog } from "../src/services/supabase/catalog.ts";
import { FallbackTravelRepository, SupabaseTravelRepository } from "../src/services/supabase/repository.ts";
import { supabaseSettings } from "../src/services/supabase/config.ts";
import { localizeDestination } from "../src/i18n/content.ts";
import { resolvePartnerLinks } from "../src/partners/links.ts";

function approvedCatalog() {
  return destinations.map((d) => ({ ...d, reviewStatus: "reviewed" as const, lastVerifiedAt: "2026-10-26",
    attractions: d.attractions.map((a) => ({ ...a, reviewStatus: "reviewed" as const, lastVerifiedAt: "2026-10-26" })),
  }));
}
const transport = (payloads: unknown[]) => ({ async page() { return { data: payloads.map((payload: any) => ({ id: payload.id, payload })), error: null }; } });
test("configuration is opt-in and accepts only HTTPS/public publishable credentials", () => {
  const config = { source: "supabase", url: "https://example.supabase.co", publishableKey: "sb_publishable_TEST_ONLY_NO_REAL_CREDENTIAL" };
  assert.deepEqual(supabaseSettings(config), { url: config.url, key: config.publishableKey });
  for (const change of [{ source: "bundled" }, { source: undefined }, { publishableKey: "sb_secret_test" },
    { publishableKey: "service_role" }, { publishableKey: "eyJhbGciOiJIUzI1NiJ9" }, { url: "http://example.supabase.co" },
    { url: "https://user:password@example.supabase.co" }, { url: "https://example.supabase.co/path" }, { url: "https://example.supabase.co/?url=bad" }]) {
    assert.equal(supabaseSettings({ ...config, ...change }), null);
  }
});
test("bundled source remains default and invalid opt-in configuration reports a localized notice", async () => {
  const bundled = new FallbackTravelRepository(null, destinations);
  assert.equal(await bundled.listDestinations(), destinations);
  assert.equal(bundled.notice, "");
  const invalid = new FallbackTravelRepository(null, destinations, true);
  assert.equal(await invalid.listDestinations(), destinations);
  assert.equal(invalid.notice, "error.contentConfiguration");
});
test("public DTO adapter preserves IDs/localization/coordinates and partner behavior; unsafe photos are neutral", async () => {
  const payloads = approvedCatalog();
  const result = await new SupabaseTravelRepository(transport(payloads)).listDestinations();
  const repository = new FallbackTravelRepository({ async listDestinations() { return result; } }, destinations);
  const content = await repository.listDestinations();
  assert.equal(repository.notice, "");
  for (const [i, d] of content.entries()) {
    assert.equal(d.id, destinations[i].id);
    assert.deepEqual(d.localized, destinations[i].localized);
    assert.deepEqual(d.coordinates, destinations[i].coordinates);
    assert.deepEqual(d.sourceUrls, destinations[i].sourceUrls);
    assert.equal(d.heroImage.kind, "placeholder");
    for (const [j, a] of d.attractions.entries()) {
      assert.equal(a.id, destinations[i].attractions[j].id);
      assert.deepEqual(a.localized, destinations[i].attractions[j].localized);
      assert.equal(a.latitude, destinations[i].attractions[j].latitude);
    }
    const hu = localizeDestination(d, "hu");
    assert.equal(hu.name, d.localized.hu.name);
    assert.equal(resolvePartnerLinks(hu, hu.attractions[0], "hu")[0].providerId, "google-maps");
  }
  payloads[0].heroImage = { ...payloads[0].heroImage, kind: "photo", url: "https://example.com/unapproved.jpg" };
  assert.equal(parseCatalog(payloads)[0].heroImage.url, null);
});
test("draft, malformed and missing translations retain the validated bundled guide", async () => {
  const valid = approvedCatalog();
  const mutations = [destinations,
    [{ ...valid[0], localized: { en: valid[0].localized.en } }, ...valid.slice(1)],
    [{ ...valid[0], coordinates: { latitude: 99, longitude: 1 } }, ...valid.slice(1)],
    [{ ...valid[0], coordinateSourceUrl: "javascript:bad" }, ...valid.slice(1)],
    [valid[0], valid[0], ...valid.slice(1)],
  ];
  for (const payloads of mutations) {
    const repo = new FallbackTravelRepository(new SupabaseTravelRepository(transport(payloads)), destinations);
    assert.equal(await repo.listDestinations(), destinations);
    assert.equal(repo.notice, "error.contentFallback");
  }
  for (const page of [async () => { throw Error("offline"); }, async () => ({ data: null, error: { message: "no network" } }),
    async () => ({ data: [{ id: "mismatch", payload: valid[0] }], error: null })]) {
    const repo = new FallbackTravelRepository(new SupabaseTravelRepository({ page }), destinations);
    assert.equal(await repo.listDestinations(), destinations);
    assert.equal(repo.notice, "error.contentFallback");
  }
});

test("one published destination updates both languages without removing bundled attractions or collections", async () => {
  const update = approvedCatalog()[0];
  update.localized = { en: { ...update.localized.en, description: "Published English update" },
    hu: { ...update.localized.hu, description: "Közzétett magyar frissítés" } };
  update.attractions = [];
  const repo = new FallbackTravelRepository(new SupabaseTravelRepository(transport([update])), destinations);
  const result = await repo.listDestinations();
  assert.equal(result.length, destinations.length);
  assert.equal(result[0].description, "Published English update");
  assert.equal(localizeDestination(result[0], "hu").description, "Közzétett magyar frissítés");
  assert.deepEqual(result[0].attractions, destinations[0].attractions);
  assert.deepEqual(result.map((d) => d.id), destinations.map((d) => d.id));
  assert.equal(repo.notice, "");
  assert.equal(repo.contentStatus, "content.online");
  assert.equal(resolvePartnerLinks(result[0], result[0].attractions[0], "hu")[0].providerId, "google-maps");
});

test("partial attraction updates and new places merge without collisions or reparenting stable IDs", async () => {
  const update = approvedCatalog()[0];
  const first = update.attractions[0];
  first.localized = { en: { ...first.localized.en, shortDescription: "Updated attraction" }, hu: first.localized.hu };
  update.attractions = [first, { ...first, id: "new-rhodes-place" }];
  const added = { ...approvedCatalog()[1], id: "new-destination", attractions: [] };
  const repo = new FallbackTravelRepository(new SupabaseTravelRepository(transport([update, added])), destinations);
  const result = await repo.listDestinations();
  assert.equal(result[0].attractions[0].shortDescription, "Updated attraction");
  assert.equal(result[0].attractions.length, destinations[0].attractions.length + 1);
  assert.equal(result.at(-1)!.id, "new-destination");
  assert.equal(result.length, destinations.length + 1);
  for (const bad of [
    { ...update, id: destinations[1].id },
    { ...update, id: destinations[0].attractions[0].id },
    { ...update, attractions: [{ ...first, id: destinations[1].id }] },
  ]) {
    const rejected = new FallbackTravelRepository(new SupabaseTravelRepository(transport([bad])), destinations);
    assert.equal(await rejected.listDestinations(), destinations);
    assert.equal(rejected.notice, "error.contentFallback");
  }
});

test("network failure keeps the last valid session guide; successful withdrawal reverts to shipped content", async () => {
  let payloads: unknown[] = [approvedCatalog()[0]];
  let offline = false;
  const repo = new FallbackTravelRepository(new SupabaseTravelRepository({ async page() {
    if (offline) throw Error("offline");
    return transport(payloads).page();
  } }), destinations);
  const good = await repo.listDestinations();
  offline = true;
  assert.equal(await repo.listDestinations(), good);
  assert.equal(repo.notice, "error.contentFallback");
  offline = false;
  payloads = [];
  assert.equal(await repo.listDestinations(), destinations);
  assert.equal(repo.notice, "");
  assert.equal(repo.contentStatus, "content.awaitingPublication");
});

test("overlapping refreshes share one public request and cannot overwrite each other", async () => {
  let calls = 0;
  let complete!: (value: ReturnType<typeof approvedCatalog>) => void;
  const response = new Promise<ReturnType<typeof approvedCatalog>>(resolve => { complete = resolve; });
  const repo = new FallbackTravelRepository({async listDestinations() { calls++; return response; }}, destinations);
  const first = repo.listDestinations();
  const second = repo.listDestinations();
  complete([approvedCatalog()[0]]);
  assert.equal(await first, await second);
  assert.equal(calls, 1);
  assert.equal(repo.contentStatus, "content.online");
});
test("timeouts are bounded, abort requests, and recover on retry without persisting empty data", async () => {
  let signal: AbortSignal | undefined;
  const remote = new SupabaseTravelRepository({ async page(_from, _to, input) { signal = input; return new Promise(() => {}); } }, 10);
  const repo = new FallbackTravelRepository(remote, destinations);
  assert.equal(await repo.listDestinations(), destinations);
  assert.equal(signal?.aborted, true);
  assert.equal(repo.notice, "error.contentFallback");
  let fail = true;
  const recovering = new FallbackTravelRepository({ async listDestinations() { if (fail) throw Error("offline"); return parseCatalog(approvedCatalog()); } }, destinations);
  assert.equal(await recovering.listDestinations(), destinations);
  fail = false;
  assert.notEqual(await recovering.listDestinations(), destinations);
  assert.equal(recovering.notice, "");
});
test("pagination uses explicit pages and never accepts a repeated or unbounded catalog", async () => {
  const dto = approvedCatalog()[0];
  const calls: number[] = [];
  const repo = new SupabaseTravelRepository({ async page(from) {
    calls.push(from);
    return { data: from === 0 ? Array.from({ length: 50 }, (_, i) => ({ id: `new-${i}`, payload: { ...dto, id: `new-${i}`, attractions: [] } })) : [], error: null };
  } });
  assert.equal((await repo.listDestinations()).length, 50);
  assert.deepEqual(calls, [0, 50]);
});

test("Expo configuration blocks accidentally bundled secret or legacy keys before export", async () => {
  const { readFileSync } = await import("node:fs");
  const { runInNewContext } = await import("node:vm");
  const source = readFileSync(new URL("../app.config.js", import.meta.url), "utf8");
  for (const key of ["sb_secret_TEST_ONLY", "eyJhbGciOiJIUzI1NiJ9.TEST_ONLY", "service_role"]) {
    const module = { exports: undefined as any };
    runInNewContext(source, { module, URL, process: { env: { EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: key } } });
    assert.throws(() => module.exports({ config: {} }), /publishable key only/);
  }
  const module = { exports: undefined as any };
  runInNewContext(source, { module, URL, process: { env: {} } });
  const config = { name: "Travel Explorer" };
  assert.equal(module.exports({ config }), config);
});

test("real Supabase client reads only the explicit public catalog projection with no login or private upload", async () => {
  const { createCatalogTransport } = await import("../src/services/supabase/client.ts");
  const requests: { url: URL; init?: RequestInit }[] = [];
  const fetcher: typeof fetch = async (input, init) => {
    requests.push({ url: new URL(String(input)), init });
    return new Response(JSON.stringify([{ id: "rhodes", payload: approvedCatalog()[0] }]), { status: 200, headers: { "content-type": "application/json" } });
  };
  const transport = createCatalogTransport({ url: "https://example.supabase.co", key: "sb_publishable_TEST_ONLY_NO_REAL_CREDENTIAL" }, fetcher);
  const result = await transport.page(0, 49, new AbortController().signal);
  assert.equal(result.error, null);
  assert.equal(result.data?.length, 1);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url.pathname, "/rest/v1/travel_destinations");
  assert.equal(requests[0].url.searchParams.get("select"), "id,payload");
  assert.equal(requests[0].url.searchParams.get("order"), "sort_order.asc,id.asc");
  assert.equal(requests[0].init?.method, "GET");
  assert.equal(requests[0].init?.body, undefined);
});
