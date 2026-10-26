import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { destinations } from "../src/data/destinations.ts";
import { translate } from "../src/i18n/core.ts";
import type { Language } from "../src/i18n/types";
import * as links from "../src/partners/links.ts";
import { partnerConfiguration } from "../src/partners/config.ts";

// Lightweight component interaction harness: renders the actual TSX with native host/hook
// doubles. Device focus, OS Linking behavior and layout still require Expo Go review.
type Element = { type: string; props: Record<string, any>; children: unknown[] };
function harness(language: Language, canOpen = true) {
  let index = 0;
  const values: any[] = [];
  const opened: string[] = [];
  let finish: (() => void) | undefined;
  const hook = (initial: unknown) => {
    const key = index++;
    if (!(key in values)) values[key] = initial;
    return [values[key], (value: unknown) => { values[key] = value; }];
  };
  const react = {
    createElement(type: string, props: Record<string, unknown>, ...children: unknown[]) { return { type, props: props ?? {}, children }; },
    useState: hook,
    useRef(initial: unknown) { return hook({ current: initial })[0]; },
  };
  const native = {
    ...Object.fromEntries(["View", "Text", "Pressable", "Modal", "ScrollView", "ActivityIndicator"].map((name) => [name, name])),
    StyleSheet: { create: (styles: unknown) => styles },
    Linking: {
      async canOpenURL() { return canOpen; },
      async openURL(url: string) { opened.push(url); await new Promise<void>((resolve) => { finish = resolve; }); },
    },
  };
  const mocks: Record<string, unknown> = {
    react: { __esModule: true, default: react, ...react }, "react-native": native,
    "../i18n/LanguageProvider": { useLanguage: () => ({ language, t: (key: any, params: any) => translate(language, key, params) }) },
    "../partners/config": { partnerConfiguration }, "../partners/links": links,
    "./ui": { colors: { ink: "black" }, s: {} },
  };
  const source = readFileSync(new URL("../src/components/PartnerPlanning.tsx", import.meta.url), "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText;
  const exports: Record<string, any> = {};
  runInNewContext(output, { exports, require: (id: string) => { assert.ok(id in mocks, id); return mocks[id]; }, URL });
  const render = () => { index = 0; return exports.PartnerPlanning({ destination: destinations[0], attraction: destinations[0].attractions[0] }) as Element; };
  return { render, opened, finish: () => finish?.() };
}
function elements(tree: unknown): Element[] {
  if (Array.isArray(tree)) return tree.flatMap(elements);
  if (!tree || typeof tree !== "object" || !("type" in tree)) return [];
  const node = tree as Element;
  return [node, ...node.children.flatMap(elements)];
}
function text(tree: unknown): string {
  if (Array.isArray(tree)) return tree.map(text).join(" ");
  if (typeof tree === "string") return tree;
  return tree && typeof tree === "object" && "children" in tree ? text((tree as Element).children) : "";
}
const tick = () => new Promise((resolve) => setImmediate(resolve));

test("planning UI confirms before opening, supports cancel/back and prevents duplicate handoffs in both languages", async () => {
  for (const language of ["en", "hu"] as const) {
    const h = harness(language);
    let tree = h.render();
    assert.ok(text(tree).includes(translate(language, "partner.visitTitle")));
    assert.equal(elements(tree).find((e) => e.type === "Modal")!.props.visible, false);
    const action = elements(tree).find((e) => e.props.accessibilityRole === "link")!;
    assert.ok(action.props.accessibilityLabel.includes(translate(language, "partner.externalBadge")));
    assert.ok(action.props.accessibilityHint);
    action.props.onPress();
    tree = h.render();
    assert.equal(elements(tree).find((e) => e.type === "Modal")!.props.visible, true);
    assert.ok(text(tree).includes("www.google.com"));
    assert.deepEqual(h.opened, []);
    elements(tree).find((e) => e.type === "Modal")!.props.onRequestClose();
    assert.equal(elements(h.render()).find((e) => e.type === "Modal")!.props.visible, false);
    action.props.onPress();
    tree = h.render();
    const buttons = elements(tree).filter((e) => e.props.accessibilityRole === "button");
    buttons.find((e) => text(e).includes(translate(language, "partner.cancel")))!.props.onPress();
    assert.equal(elements(h.render()).find((e) => e.type === "Modal")!.props.visible, false);
    action.props.onPress();
    tree = h.render();
    const proceed = elements(tree).find((e) => e.props.accessibilityRole === "button" && text(e).includes(translate(language, "partner.continue")))!;
    proceed.props.onPress();
    proceed.props.onPress();
    await tick();
    assert.equal(h.opened.length, 1);
    assert.ok(elements(h.render()).filter((e) => e.props.accessibilityRole === "button").every((e) => e.props.disabled));
    h.finish();
    await tick();
    assert.equal(elements(h.render()).find((e) => e.type === "Modal")!.props.visible, false);
  }
});

test("unsupported external navigation produces a localized accessible error", async () => {
  const h = harness("hu", false);
  elements(h.render()).find((e) => e.props.accessibilityRole === "link")!.props.onPress();
  elements(h.render()).find((e) => e.props.accessibilityRole === "button" && text(e).includes(translate("hu", "partner.continue")))!.props.onPress();
  await tick();
  const alert = elements(h.render()).find((e) => e.props.accessibilityRole === "alert")!;
  assert.equal(text(alert), translate("hu", "partner.openError"));
  assert.deepEqual(h.opened, []);
});

test("existing Saved and Trips hydrate, toggle and persist across partner handoff and language change", async () => {
  // Exercise the unchanged real TravelProvider with an in-memory AsyncStorage boundary.
  const stored = new Map([["travel-explorer:v1", JSON.stringify({ saved: [destinations[0].id], trips: [destinations[1].id] })]]);
  let index = 0;
  let language: Language = "en";
  let context: any;
  const slots: any[] = [];
  const pending: (() => void)[] = [];
  const react = {
    createElement(_type: unknown, props: any) { context = props.value; return null; },
    createContext() { return { Provider: "Provider" }; },
    useContext() { return context; },
    useMemo(fn: () => unknown) { return fn(); },
    useState(initial: unknown) {
      const key = index++;
      if (!(key in slots)) slots[key] = initial;
      return [slots[key], (value: any) => { slots[key] = typeof value === "function" ? value(slots[key]) : value; }];
    },
    useEffect(fn: () => void, deps: unknown[]) {
      const key = index++;
      if (!(key in slots) || deps.some((v, i) => !Object.is(v, slots[key][i]))) pending.push(fn);
      slots[key] = deps;
    },
  };
  const { localizeDestination } = await import("../src/i18n/content.ts");
  const mocks: Record<string, unknown> = {
    react: { __esModule: true, default: react, ...react },
    "@react-native-async-storage/async-storage": { __esModule: true, default: {
      async getItem(key: string) { return stored.get(key) ?? null; },
      async setItem(key: string, value: string) { stored.set(key, value); },
    } },
    "../services/travelRepository": { travelRepository: { async listDestinations() { return destinations; } } },
    "../i18n/LanguageProvider": { useLanguage: () => ({ language, t: (key: any) => translate(language, key) }) },
    "../i18n/content": { localizeDestination },
  };
  const source = readFileSync(new URL("../src/state/TravelContext.tsx", import.meta.url), "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText;
  const exports: Record<string, any> = {};
  runInNewContext(output, { exports, require: (id: string) => { assert.ok(id in mocks, id); return mocks[id]; } });
  const render = async () => {
    index = 0;
    exports.TravelProvider({});
    pending.splice(0).forEach((effect) => effect());
    await tick();
    return exports.useTravel();
  };
  await render();
  let state = await render();
  assert.equal(state.loading, false);
  assert.deepEqual([...state.saved], [destinations[0].id]);
  assert.deepEqual([...state.trips], [destinations[1].id]);
  const link = links.resolvePartnerLinks(state.destinations[0], undefined, language)[0];
  assert.equal(await links.openPartnerLink(link, { destination: state.destinations[0], language }, {
    async canOpenURL() { return true; }, async openURL() {},
  }), "opened");
  language = "hu";
  state = await render();
  assert.deepEqual([...state.saved], [destinations[0].id]);
  assert.deepEqual([...state.trips], [destinations[1].id]);
  state.toggleSaved(destinations[0].id);
  state.toggleSaved(destinations[2].id);
  state.toggleTrip(destinations[1].id);
  state.toggleTrip(destinations[3].id);
  state = await render();
  assert.deepEqual([...state.saved], [destinations[2].id]);
  assert.deepEqual([...state.trips], [destinations[3].id]);
  assert.deepEqual(JSON.parse(stored.get("travel-explorer:v1")!), { saved: [destinations[2].id], trips: [destinations[3].id] });
  assert.equal(stored.size, 1);
});
