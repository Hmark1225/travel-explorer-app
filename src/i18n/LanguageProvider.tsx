import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import {
  deviceLanguage,
  translate,
  formatDate,
  type Params,
  type TranslationKey,
  categoryLabel,
} from "./core";
import { LanguageStore, type LanguageSnapshot } from "./languageStore";
import type { Language } from "./types";
type ContextValue = LanguageSnapshot & {
  setLanguage: (language: Language) => Promise<void>;
};
const Context = createContext<ContextValue | null>(null);
function initialLanguage(): Language {
  try {
    return deviceLanguage(getLocales());
  } catch {
    return "en";
  }
}
export function LanguageProvider({ children }: React.PropsWithChildren) {
  const [store] = useState(
    () => new LanguageStore(AsyncStorage, initialLanguage()),
  );
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot,
  );
  useEffect(() => {
    void store.hydrate();
  }, [store]);
  return (
    <Context.Provider value={{ ...snapshot, setLanguage: store.setLanguage }}>
      {snapshot.hydrated ? (
        children
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#FAFAF5",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            color="#167568"
            accessibilityLabel={translate(
              snapshot.language,
              "language.loading",
            )}
          />
        </View>
      )}
    </Context.Provider>
  );
}
export function useLanguage() {
  const context = useContext(Context);
  if (!context) throw new Error("LanguageProvider is required");
  return {
    ...context,
    t: (key: TranslationKey, params?: Params) =>
      translate(context.language, key, params),
    date: (value: string) => formatDate(value, context.language),
    category: (
      value:
        | import("../data/models").Category
        | import("../data/models").AttractionCategory,
    ) => categoryLabel(context.language, value),
  };
}
