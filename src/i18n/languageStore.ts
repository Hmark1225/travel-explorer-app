import { isLanguage } from "./core.ts";
import type { Language } from "./types";
export const LANGUAGE_STORAGE_KEY = "travel-explorer:language:v1";
export interface LanguageStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
}
export type LanguageSnapshot = {
  language: Language;
  hydrated: boolean;
  error: "language.readError" | "language.saveError" | null;
};
/** Injection keeps persistence/race tests independent of native modules. */
export class LanguageStore {
  private snapshot: LanguageSnapshot;
  private listeners = new Set<() => void>();
  private revision = 0;
  private manualChosen = false;
  private hydration: Promise<void> | undefined;
  private writes: Promise<void> = Promise.resolve();
  private storage: LanguageStorage;
  constructor(storage: LanguageStorage, initial: Language) {
    this.storage = storage;
    this.snapshot = { language: initial, hydrated: false, error: null };
  }
  getSnapshot = () => this.snapshot;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  private update(change: Partial<LanguageSnapshot>) {
    this.snapshot = { ...this.snapshot, ...change };
    this.listeners.forEach((fn) => fn());
  }
  hydrate = (): Promise<void> => {
    if (this.manualChosen) return Promise.resolve();
    if (this.hydration) return this.hydration;
    const revision = this.revision;
    this.hydration = this.storage
      .getItem(LANGUAGE_STORAGE_KEY)
      .then((value) => {
        if (revision === this.revision)
          this.update({
            language: isLanguage(value) ? value : this.snapshot.language,
            hydrated: true,
          });
      })
      .catch(() => {
        if (revision === this.revision)
          this.update({ hydrated: true, error: "language.readError" });
      });
    return this.hydration;
  };
  setLanguage = (language: Language): Promise<void> => {
    if (!isLanguage(language)) return Promise.resolve();
    this.manualChosen = true;
    const revision = ++this.revision;
    this.update({ language, hydrated: true, error: null });
    this.writes = this.writes
      .catch(() => {})
      .then(() => this.storage.setItem(LANGUAGE_STORAGE_KEY, language))
      .then(() => {
        if (revision === this.revision) this.update({ error: null });
      })
      .catch(() => {
        if (revision === this.revision)
          this.update({ error: "language.saveError" });
      });
    return this.writes;
  };
}
