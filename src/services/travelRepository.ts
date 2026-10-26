import { destinations, type Destination } from "../data/destinations.ts";
import type { MessageKey } from "../i18n/messages";
import { FallbackTravelRepository, SupabaseTravelRepository } from "./supabase/repository.ts";
import { createCatalogTransport } from "./supabase/client.ts";
import { supabaseSettings } from "./supabase/config.ts";
export interface TravelRepository {
  readonly notice?: MessageKey | "";
  listDestinations(): Promise<Destination[]>;
}
// Expo replaces these exact static expressions at bundle time. They are PUBLIC configuration only.
const source = process.env.EXPO_PUBLIC_CONTENT_SOURCE;
const settings = supabaseSettings({ source, url: process.env.EXPO_PUBLIC_SUPABASE_URL,
  publishableKey: process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY });
export const travelRepository: TravelRepository = new FallbackTravelRepository(
  settings ? new SupabaseTravelRepository(createCatalogTransport(settings)) : null,
  destinations,
  source === "supabase" && !settings,
);
