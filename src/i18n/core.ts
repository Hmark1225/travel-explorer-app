import { en, hu, type MessageKey } from "./messages.ts";
import type { Language } from "./types";
export type { Language } from "./types";
export type TranslationKey =
  | MessageKey
  | {
      [K in MessageKey]: K extends `${infer Base}.one` ? Base : never;
    }[MessageKey];
export type Params = Record<string, string | number>;
export function isLanguage(value: unknown): value is Language {
  return value === "en" || value === "hu";
}
export function deviceLanguage(
  locales: readonly { languageCode?: string | null; languageTag?: string }[],
): Language {
  const primary = (locales[0]?.languageCode ?? locales[0]?.languageTag ?? "")
    .toLowerCase()
    .split(/[-_]/)[0];
  return primary === "hu" ? "hu" : "en";
}
/** Empty/missing future translations fall back to source English, never fabricated copy. */
export function translatedText(
  language: Language,
  source: string,
  translation?: string | null,
): string {
  return language === "hu" && translation?.trim() ? translation : source;
}
export function translate(
  language: Language,
  key: TranslationKey,
  params: Params = {},
): string {
  const pluralKey =
    `${key}.${params.count === 1 ? "one" : "other"}` as MessageKey;
  const actual = (Object.hasOwn(en, pluralKey) ? pluralKey : key) as MessageKey;
  const source = en[actual] ?? key;
  const template = translatedText(language, source, hu[actual]);
  return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) =>
    String(params[name] ?? `{{${name}}}`),
  );
}
export function formatDate(value: string, language: Language): string {
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(language === "hu" ? "hu-HU" : "en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }).format(date);
}

export function categoryLabel(
  language: Language,
  value:
    | import("../data/models").Category
    | import("../data/models").AttractionCategory,
): string {
  return translate(language, `category.${value}`);
}
