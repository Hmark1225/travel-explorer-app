import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Destination } from "../data/destinations";
import { travelRepository } from "../services/travelRepository";
type State = {
  destinations: Destination[];
  saved: string[];
  trips: string[];
  loading: boolean;
  error: string;
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
    [error, setError] = useState(""),
    [attempt, setAttempt] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    travelRepository
      .listDestinations()
      .then((d) => {
        if (active) setDestinations(d);
      })
      .catch(() => {
        if (active)
          setError("We couldn’t load destinations. Please try again.");
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
      .catch(() => setError("Your local collection could not be restored."))
      .finally(() => setHydrated(true));
  }, []);
  useEffect(() => {
    if (hydrated)
      AsyncStorage.setItem(
        "travel-explorer:v1",
        JSON.stringify({ saved, trips }),
      ).catch(() => setError("Changes could not be saved on this device."));
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
  if (!state) throw new Error("TravelProvider is required");
  return state;
}
