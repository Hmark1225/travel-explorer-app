import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { destinations, filterDestinations } from "../src/data/destinations.ts";
import {
  translate,
  translatedText,
  deviceLanguage,
  categoryLabel,
  formatDate,
} from "../src/i18n/core.ts";
import {
  LanguageStore,
  LANGUAGE_STORAGE_KEY,
  type LanguageStorage,
} from "../src/i18n/languageStore.ts";
import { localizeDestination, attractionText } from "../src/i18n/content.ts";
import { createLocalizationReport } from "../src/i18n/audit.ts";
import { en, hu, type MessageKey } from "../src/i18n/messages.ts";
function memoryStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  const writes: string[] = [];
  const storage: LanguageStorage = {
    async getItem(key) {
      return data.get(key) ?? null;
    },
    async setItem(key, value) {
      writes.push(key);
      data.set(key, value);
    },
  };
  return { data, writes, storage };
}
function deferred<T>() {
  let resolve!: (value: T) => void, reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
test("primary device language selects hu/en and all unsupported or absent locales default to English", () => {
  assert.equal(
    deviceLanguage([{ languageCode: "hu", languageTag: "hu-HU" }]),
    "hu",
  );
  assert.equal(deviceLanguage([{ languageCode: "en" }]), "en");
  assert.equal(deviceLanguage([{ languageTag: "HU_hu" }]), "hu");
  assert.equal(
    deviceLanguage([{ languageCode: "fr" }, { languageCode: "hu" }]),
    "en",
  );
  assert.equal(deviceLanguage([]), "en");
  assert.equal(deviceLanguage([{ languageCode: null }]), "en");
});
test("manual preference persists across restarts and overrides a different device language without touching collections", async () => {
  const original = JSON.stringify({
    saved: ["rhodes", "budapest"],
    trips: ["rome", "florence"],
  });
  const m = memoryStorage({ "travel-explorer:v1": original });
  const a = new LanguageStore(m.storage, "en");
  await a.hydrate();
  await a.setLanguage("hu");
  assert.equal(m.data.get(LANGUAGE_STORAGE_KEY), "hu");
  const b = new LanguageStore(m.storage, "en");
  await b.hydrate();
  assert.equal(b.getSnapshot().language, "hu");
  await b.setLanguage("en");
  const c = new LanguageStore(m.storage, "hu");
  await c.hydrate();
  assert.equal(c.getSnapshot().language, "en");
  assert.equal(m.data.get("travel-explorer:v1"), original);
  assert.ok(m.writes.every((key) => key === LANGUAGE_STORAGE_KEY));
});
test("switching notifies subscribers and updates labels and content synchronously before persistence finishes", async () => {
  const save = deferred<void>();
  const storage: LanguageStorage = {
    async getItem() {
      return null;
    },
    setItem() {
      return save.promise;
    },
  };
  const store = new LanguageStore(storage, "en");
  await store.hydrate();
  const renders: string[] = [];
  const unsub = store.subscribe(() =>
    renders.push(translate(store.getSnapshot().language, "tabs.Explore")),
  );
  const pending = store.setLanguage("hu");
  assert.equal(store.getSnapshot().language, "hu");
  assert.equal(renders[0], "Felfedezés");
  assert.equal(
    localizeDestination(destinations[1], store.getSnapshot().language).name,
    "Róma",
  );
  save.resolve();
  await pending;
  unsub();
});
test("a late preference read cannot overwrite a newer manual selection, even if selected before hydration starts", async () => {
  const read = deferred<string | null>();
  const m = memoryStorage();
  const store = new LanguageStore(
    { ...m.storage, getItem: () => read.promise },
    "en",
  );
  const hydration = store.hydrate();
  await store.setLanguage("hu");
  read.resolve("en");
  await hydration;
  assert.equal(store.getSnapshot().language, "hu");
  let reads = 0;
  const preselected = new LanguageStore(
    {
      ...m.storage,
      async getItem() {
        reads++;
        return "en";
      },
    },
    "en",
  );
  await preselected.setLanguage("hu");
  await preselected.hydrate();
  assert.equal(preselected.getSnapshot().language, "hu");
  assert.equal(reads, 0);
});
test("rapid choices serialize writes so the final visible and stored language agree", async () => {
  const first = deferred<void>();
  const calls: string[] = [];
  let stored = "";
  const store = new LanguageStore(
    {
      async getItem() {
        return null;
      },
      async setItem(_key, value) {
        calls.push(value);
        if (calls.length === 1) await first.promise;
        stored = value;
      },
    },
    "en",
  );
  await store.hydrate();
  const a = store.setLanguage("hu"),
    b = store.setLanguage("en");
  assert.equal(store.getSnapshot().language, "en");
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.deepEqual(calls, ["hu"]);
  first.resolve();
  await Promise.all([a, b]);
  assert.deepEqual(calls, ["hu", "en"]);
  assert.equal(stored, "en");
  assert.equal(store.getSnapshot().language, "en");
});
test("corrupt preferences fall back to the device default; read/write failures remain localized and recoverable", async () => {
  const corrupt = new LanguageStore(
    memoryStorage({ [LANGUAGE_STORAGE_KEY]: "de" }).storage,
    "hu",
  );
  await corrupt.hydrate();
  assert.equal(corrupt.getSnapshot().language, "hu");
  const unreadable = new LanguageStore(
    {
      async getItem() {
        throw Error("unavailable");
      },
      async setItem() {},
    },
    "en",
  );
  await unreadable.hydrate();
  assert.equal(unreadable.getSnapshot().hydrated, true);
  assert.equal(unreadable.getSnapshot().error, "language.readError");
  let fail = true;
  const writer = new LanguageStore(
    {
      async getItem() {
        return null;
      },
      async setItem() {
        if (fail) throw Error("full");
      },
    },
    "en",
  );
  await writer.hydrate();
  await writer.setLanguage("hu");
  assert.equal(writer.getSnapshot().language, "hu");
  assert.equal(writer.getSnapshot().error, "language.saveError");
  assert.match(translate("hu", writer.getSnapshot().error!), /mentés/);
  fail = false;
  await writer.setLanguage("hu");
  assert.equal(writer.getSnapshot().error, null);
});
test("all 18 destinations, 156 attractions, 312 tips and every UI template have complete Hungarian translations", () => {
  const report = createLocalizationReport(destinations);
  assert.deepEqual(report.issues, []);
  assert.equal(report.missingOrIncomplete, 0);
  assert.equal(report.counts.destinations, 18);
  assert.equal(report.counts.attractions, 156);
  assert.equal(report.counts.practicalTips, 312);
  assert.equal(report.counts.durationPhrases, 19);
  assert.deepEqual(Object.keys(en).sort(), Object.keys(hu).sort());
  for (const key of Object.keys(en) as MessageKey[]) {
    assert.ok(en[key].trim() && hu[key].trim());
    assert.ok(!hu[key].includes("\uFFFD"));
  }
  const missing = createLocalizationReport([
    { ...destinations[0], id: "missing-language-destination" },
  ]);
  assert.ok(
    missing.issues.some(
      (path) => path === "missing-language-destination.hu.description",
    ),
  );
});
test("localized content changes display text only and preserves English, IDs, geography, sources and photo-rights metadata", () => {
  for (const d of destinations) {
    const english = localizeDestination(d, "en"),
      hungarian = localizeDestination(d, "hu");
    for (const field of [
      "name",
      "country",
      "region",
      "tagline",
      "description",
      "coordinateLabel",
    ] as const) {
      assert.equal(english[field], d[field]);
      assert.equal(hungarian[field], d.localized.hu[field]);
    }
    for (const field of [
      "id",
      "countryCode",
      "coordinates",
      "coordinateSourceUrl",
      "coordinateLicenseUrl",
      "coordinateRecordId",
      "coordinatesVerifiedAt",
      "coordinateAttribution",
      "sourceUrls",
      "sourceIds",
      "heroImage",
      "photo",
      "galleryImages",
      "reviewStatus",
      "lastVerifiedAt",
    ] as const)
      assert.deepEqual(hungarian[field], d[field]);
    assert.equal(hungarian.heroImage, d.heroImage);
    d.attractions.forEach((a, i) => {
      const huA = hungarian.attractions[i],
        enA = english.attractions[i];
      assert.equal(enA.detailedDescription, a.detailedDescription);
      assert.equal(enA.shortDescription, a.shortDescription);
      assert.deepEqual(enA.usefulTips, a.usefulTips);
      assert.equal(huA.id, a.id);
      assert.equal(huA.detailedDescription, a.localized.hu.detailedDescription);
      assert.deepEqual(huA.usefulTips, a.localized.hu.usefulTips);
      assert.equal(huA.duration, a.localized.hu.estimatedDuration);
      for (const field of [
        "latitude",
        "longitude",
        "coordinateSourceUrl",
        "coordinateRecordId",
        "coordinatesVerifiedAt",
        "sourceUrls",
        "heroImage",
        "photo",
        "galleryImages",
        "officialWebsite",
        "admissionType",
        "reviewStatus",
        "lastVerifiedAt",
      ] as const)
        assert.deepEqual(huA[field], a[field]);
    });
  }
});
test("Hungarian names, accents, durations, categories, admissions and bilingual search work together", () => {
  const huData = destinations.map((d) => localizeDestination(d, "hu"));
  const names = Object.fromEntries(huData.map((d) => [d.id, d.name]));
  assert.equal(names.rome, "Róma");
  assert.equal(names.vienna, "Bécs");
  assert.equal(names.florence, "Firenze");
  assert.equal(names.prague, "Prága");
  assert.equal(names.rhodes, "Rodosz");
  assert.equal(names.crete, "Kréta");
  assert.equal(
    categoryLabel("hu", "History & culture"),
    "Történelem és kultúra",
  );
  assert.match(translate("hu", "admission.unknown"), /nincsenek ellenőrizve/);
  assert.equal(huData[1].attractions[0].estimatedDuration, "2–3 óra");
  assert.deepEqual(
    filterDestinations(huData, "Rome", "All").map((d) => d.id),
    ["rome"],
  );
  assert.deepEqual(
    filterDestinations(huData, "Becs", "All").map((d) => d.id),
    ["vienna"],
  );
  assert.deepEqual(
    filterDestinations(huData, "Olaszorszag", "Coast").map((d) => d.id),
    ["amalfi-coast"],
  );
  assert.deepEqual(
    filterDestinations(
      destinations.map((d) => localizeDestination(d, "en")),
      "Róma",
      "All",
    ).map((d) => d.id),
    ["rome"],
  );
  assert.match(formatDate("2026-10-25", "hu"), /2026.*október.*25/);
});
test("fallback retains source facts and interpolation/pluralization never leaves template tokens in rendered messages", () => {
  assert.equal(translatedText("hu", "Source fact", undefined), "Source fact");
  assert.equal(translatedText("hu", "Source fact", "  "), "Source fact");
  assert.equal(
    translatedText("en", "Source fact", "Magyar fordítás"),
    "Source fact",
  );
  const original = {
    name: "Unknown future place",
    shortDescription: "Source summary",
    detailedDescription: "Source description",
    estimatedDuration: "Unknown source estimate",
    usefulTips: ["Source tip"],
  };
  assert.deepEqual(attractionText(original, "missing-id").hu, original);
  assert.equal(translate("en", "search.count", { count: 1 }), "1 place");
  assert.equal(translate("en", "search.count", { count: 2 }), "2 places");
  assert.equal(translate("hu", "search.count", { count: 2 }), "2 hely");
  assert.ok(translate("en", "explore.title").includes("\n"));
  for (const key of Object.keys(en) as MessageKey[]) {
    const params = Object.fromEntries(
      [...en[key].matchAll(/\{\{(\w+)\}\}/g)].map((m) => [
        m[1],
        m[1] === "count" ? 2 : "Próba",
      ]),
    );
    assert.ok(!translate("hu", key, params).includes("{{"));
  }
});
test("application-owned JSX labels and alert copy are translation expressions, not hardcoded text", () => {
  const files = [
    "App.tsx",
    "src/screens/Screens.tsx",
    "src/screens/MapScreen.tsx",
    "src/components/ui.tsx",
    "src/components/DestinationFeed.tsx",
    "src/components/PartnerPlanning.tsx",
    "src/i18n/LanguageProvider.tsx",
  ];
  const findings: string[] = [];
  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      readFileSync(new URL("../" + file, import.meta.url), "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const note = (node: ts.Node, value: string) => {
      if (/\p{L}/u.test(value))
        findings.push(
          `${file}:${source.getLineAndCharacterOfPosition(node.getStart()).line + 1}: ${value}`,
        );
    };
    const walk = (node: ts.Node) => {
      if (ts.isJsxText(node)) note(node, node.text.trim());
      if (
        ts.isJsxAttribute(node) &&
        ["label", "title", "placeholder", "accessibilityLabel"].includes(
          node.name.getText(source),
        ) &&
        node.initializer &&
        ts.isStringLiteral(node.initializer)
      )
        note(node, node.initializer.text);
      if (
        ts.isJsxExpression(node) &&
        node.expression &&
        ts.isStringLiteral(node.expression)
      )
        note(node, node.expression.text);
      if (
        ts.isCallExpression(node) &&
        node.expression.getText(source) === "Alert.alert"
      )
        for (const arg of node.arguments)
          if (ts.isStringLiteral(arg)) note(arg, arg.text);
      ts.forEachChild(node, walk);
    };
    walk(source);
  }
  assert.deepEqual(findings, []);
});
