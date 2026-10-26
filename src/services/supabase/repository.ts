import type { Destination } from "../../data/models";
import type { MessageKey } from "../../i18n/messages";
import type { TravelRepository } from "../travelRepository";
import { parseCatalog, preservesBundledIds } from "./catalog.ts";

/** Narrow boundary for deterministic testing without network access or credentials. */
export interface CatalogTransport {
  page(from: number, to: number, signal: AbortSignal): Promise<{ data: unknown[] | null; error: unknown }>;
}
export class SupabaseTravelRepository implements TravelRepository {
  private transport: CatalogTransport;
  private timeoutMs: number;
  constructor(transport: CatalogTransport, timeoutMs = 8000) { this.transport = transport; this.timeoutMs = timeoutMs; }
  async listDestinations(): Promise<Destination[]> {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([
        this.load(controller.signal),
        new Promise<never>((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error("Content request timed out")); }, this.timeoutMs); }),
      ]);
    } finally { if (timer) clearTimeout(timer); }
  }
  private async load(signal: AbortSignal): Promise<Destination[]> {
    const rows: unknown[] = [];
    const size = 50;
    for (let from = 0; from < 5000; from += size) {
      const result = await this.transport.page(from, from + size - 1, signal);
      if (result.error || !Array.isArray(result.data)) throw new Error("Public catalog unavailable");
      for (const row of result.data) {
        if (!row || typeof row !== "object" || !("payload" in row) || !("id" in row)) throw new Error("Invalid public row");
        const payload = row.payload;
        if (!payload || typeof payload !== "object" || !("id" in payload) || row.id !== payload.id) throw new Error("Public row ID mismatch");
        rows.push(payload);
      }
      if (result.data.length < size) return parseCatalog(rows);
    }
    throw new Error("Public catalog limit exceeded");
  }
}
export class FallbackTravelRepository implements TravelRepository {
  notice: MessageKey | "" = "";
  private remote: TravelRepository | null;
  private bundled: Destination[];
  private unavailableConfiguration: boolean;
  constructor(remote: TravelRepository | null, bundled: Destination[], unavailableConfiguration = false) {
    // Validate the checked-in dataset too; it remains the offline source of truth in this phase.
    parseCatalog(bundled, false);
    this.remote = remote; this.bundled = bundled; this.unavailableConfiguration = unavailableConfiguration;
  }
  async listDestinations(): Promise<Destination[]> {
    if (!this.remote) {
      this.notice = this.unavailableConfiguration ? "error.contentConfiguration" : "";
      return this.bundled;
    }
    try {
      const data = parseCatalog(await this.remote.listDestinations());
      if (!preservesBundledIds(data, this.bundled)) throw new Error("Incomplete published catalog");
      this.notice = "";
      return data;
    } catch {
      this.notice = "error.contentFallback";
      // Never persist partial/empty responses, remove stable IDs or replace the bundled guide on failure.
      return this.bundled;
    }
  }
}
