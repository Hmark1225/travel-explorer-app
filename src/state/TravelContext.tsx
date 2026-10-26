import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Destination } from "../data/destinations";
import { travelRepository } from "../services/travelRepository";
import { useLanguage } from "../i18n/LanguageProvider";
import { localizeDestination } from "../i18n/content";
import type { MessageKey } from "../i18n/messages";
type State = {
  destinations: Destination[];
  saved: string[];
  trips: string[];
  loading: boolean;
  error: MessageKey | "";
  contentNotice: MessageKey | "";
  toggleSaved: (id: string) => void;
  toggleTrip: (id: string) => void;
  retry: () => void;
};
const Context = createContext<State | null>(null);
export function TravelProvider({ children }: React.PropsWithChildren) {
  const [destinations, setDestinations] = useState<Destination[]>([]),
    [saved, setSaved] = useState<string[]>([]),
    [trips, setTrips] = useState<string[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState<MessageKey | "">(""),
    [attempt, setAttempt] = useState(0);
  const [contentNotice, setContentNotice] = useState<MessageKey | "">("");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    travelRepository
      .listDestinations()
      .then((d) => {
        if (active) {
          if (d.length) setDestinations(d);
          setContentNotice(travelRepository.notice ?? "");
        }
      })
      .catch(() => {
        if (active) setError("error.destinations");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  useEffect(() => {
    AsyncStorage.getItem("travel-explorer:v1")
      .then((raw) => {
        if (raw) {
          const v = JSON.parse(raw);
          if (
            Array.isArray(v.saved) &&
            v.saved.every((x: unknown) => typeof x === "string")
          )
            setSaved(v.saved);
          if (
            Array.isArray(v.trips) &&
            v.trips.every((x: unknown) => typeof x === "string")
          )
            setTrips(v.trips);
        }
      })
      .catch(() => setError("error.restore"))
      .finally(() => setHydrated(true));
  }, []);
  useEffect(() => {
    if (hydrated)
      AsyncStorage.setItem(
        "travel-explorer:v1",
        JSON.stringify({ saved, trips }),
      ).catch(() => setError("error.save"));
  }, [saved, trips, hydrated]);
  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    id: string,
  ) =>
    setter((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id],
    );
  return (
    <Context.Provider
      value={{
        destinations,
        saved,
        trips,
        loading: loading || !hydrated,
        error,
        contentNotice,
        toggleSaved: (id) => toggle(setSaved, id),
        toggleTrip: (id) => toggle(setTrips, id),
        retry: () => setAttempt((x) => x + 1),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useTravel() {
  const state = useContext(Context);
  const { language, t } = useLanguage();
  const destinations = useMemo(
    () =>
      state?.destinations.map((d) => localizeDestination(d, language)) ?? [],
    [state?.destinations, language],
  );
  if (!state) throw new Error("TravelProvider is required");
  return { ...state, destinations, error: state.error ? t(state.error) : state.contentNotice ? t(state.contentNotice) : "" };
}
