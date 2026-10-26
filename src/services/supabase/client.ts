import { createClient } from "@supabase/supabase-js";
import type { CatalogTransport } from "./repository";
export function createCatalogTransport(settings: { url: string; key: string }, fetcher?: typeof fetch): CatalogTransport {
  // Public browsing only: no auth persistence, login, realtime subscriptions or user-data writes.
  const client = createClient(settings.url, settings.key, {
    ...(fetcher ? { global: { fetch: fetcher } } : {}),
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return {
    async page(from, to, signal) {
      return client.from("travel_destinations").select("id,payload").order("sort_order").order("id").range(from, to).abortSignal(signal);
    },
  };
}
