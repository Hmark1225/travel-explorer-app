import { createHash } from "node:crypto";
import { destinations } from "../../src/data/destinations.ts";
import { sources } from "../../src/data/sources.ts";
import { partnerConfiguration } from "../../src/partners/config.ts";
import type { Photo } from "../../src/data/models";

export type SeedRow = Record<string, unknown>;
export function buildSeed() {
  const tables: Record<string, SeedRow[]> = Object.fromEntries([
    "content_sources", "destinations", "destination_translations", "attractions", "attraction_translations",
    "destination_sources", "attraction_sources", "photos", "photo_assignments", "partner_links",
  ].map((table) => [table, []]));
  const photos = new Set<string>();
  function assign(photo: Photo, destinationId: string | null, attractionId: string | null, slot: string, position: number) {
    const id = `photo:${createHash("sha256").update(JSON.stringify(photo)).digest("hex")}`;
    if (!photos.has(id)) { tables.photos.push({ id, record: photo }); photos.add(id); }
    tables.photo_assignments.push({ id: `${destinationId ? "destination" : "attraction"}:${destinationId ?? attractionId}:${slot}:${position}`,
      photo_id: id, destination_id: destinationId, attraction_id: attractionId, slot, position });
  }
  for (const [id, source] of Object.entries(sources)) tables.content_sources.push({ id, name: source.name, url: source.url, access_status: source.status });
  for (const [destinationOrder, d] of destinations.entries()) {
    const { localized, attractions, heroImage, galleryImages, photo, ...record } = d;
    tables.destinations.push({ id: d.id, sort_order: destinationOrder, category: d.category, country_code: d.countryCode,
      latitude: d.coordinates.latitude, longitude: d.coordinates.longitude, record,
      review_status: d.reviewStatus, last_verified_at: d.lastVerifiedAt });
    for (const [language, t] of Object.entries(localized)) tables.destination_translations.push({
      destination_id: d.id, language, name: t.name, country: t.country, region: t.region,
      tagline: t.tagline, description: t.description, coordinate_label: t.coordinateLabel,
    });
    for (const source_id of d.sourceIds) tables.destination_sources.push({ destination_id: d.id, source_id });
    assign(heroImage, d.id, null, "hero", 0);
    galleryImages?.forEach((p, i) => assign(p, d.id, null, "gallery", i));
    for (const [attractionOrder, a] of attractions.entries()) {
      const { localized, heroImage, galleryImages, photo, ...record } = a;
      tables.attractions.push({ id: a.id, sort_order: attractionOrder, destination_id: d.id, kind: a.kind, category: a.category,
        admission_type: a.admissionType, latitude: a.latitude, longitude: a.longitude, record,
        review_status: a.reviewStatus, last_verified_at: a.lastVerifiedAt });
      for (const [language, t] of Object.entries(localized)) tables.attraction_translations.push({
        attraction_id: a.id, language, name: t.name, short_description: t.shortDescription,
        detailed_description: t.detailedDescription, estimated_duration: t.estimatedDuration, useful_tips: t.usefulTips,
      });
      for (const source_id of a.sourceIds) tables.attraction_sources.push({ attraction_id: a.id, source_id });
      assign(heroImage, null, a.id, "hero", 0);
      galleryImages?.forEach((p, i) => assign(p, null, a.id, "gallery", i));
    }
  }
  // Exact existing mapping records only; database links always start disabled and pending.
  for (const m of [...partnerConfiguration.destinations, ...partnerConfiguration.attractions]) {
    for (const [language, url] of Object.entries(m.link.urls)) tables.partner_links.push({
      id: `${m.providerId}:${m.destinationId}:${"attractionId" in m ? m.attractionId : "destination"}:${m.action}:${language}`,
      destination_id: m.destinationId, attraction_id: "attractionId" in m ? m.attractionId : null,
      provider_id: m.providerId, action: m.action, language, url, enabled: false,
      approval_status: "pending", affiliate: m.link.affiliate === true,
      verified_at: m.link.verifiedAt || null, reviewed_by: m.link.reviewedBy || null,
      evidence_url: m.link.evidenceUrl || null, documentation_url: m.link.documentationUrl || null,
    });
  }
  const quote = (value: unknown) => value === null ? "null" : typeof value === "number" || typeof value === "boolean"
    ? String(value) : `'${(typeof value === "string" ? value : JSON.stringify(value)).replaceAll("'", "''")}'`;
  const sql = "-- Generated from the checked-in content. Insert-only; never promotes or overwrites.\nbegin;\n" +
    Object.entries(tables).flatMap(([table, rows]) => rows.map((row) =>
      `insert into public.${table} (${Object.keys(row).join(",")}) values (${Object.values(row).map(quote).join(",")}) on conflict do nothing;`,
    )).join("\n") + "\ncommit;\n";
  const report = {
    mode: "insert-only", remoteDeployment: "not-attempted", importedContentPublication: "draft",
    expected: Object.fromEntries(Object.entries(tables).map(([name, rows]) => [name, rows.length])),
    destinationIds: destinations.map((d) => d.id), attractionIds: destinations.flatMap((d) => d.attractions.map((a) => a.id)),
    sha256: createHash("sha256").update(sql).digest("hex"),
  };
  const keys: Record<string, string[]> = {
    destination_translations: ["destination_id", "language"], attraction_translations: ["attraction_id", "language"],
    destination_sources: ["destination_id", "source_id"], attraction_sources: ["attraction_id", "source_id"],
  };
  const verificationParts = Object.entries(tables).map(([table, rows]) => {
    if (!rows.length) return `select jsonb_build_object('table', '${table}', 'expected', 0, 'imported', 0, 'missing', 0, 'conflicts', 0) as report`;
    const identity = (keys[table] ?? ["id"])[0];
    const match = (keys[table] ?? ["id"]).map((key) => `to_jsonb(t)->'${key}' = e.value->'${key}'`).join(" and ");
    const projection = `jsonb_build_object(${Object.keys(rows[0]).map((key) => `'${key}',t.${key}`).join(",")})`;
    return `select jsonb_build_object('table','${table}','expected',count(*),'imported',count(t.${identity}),
      'missing',count(*) filter (where t.${identity} is null),
      'conflicts',count(*) filter (where t.${identity} is not null and ${projection} <> e.value)) as report
      from jsonb_array_elements(${quote(rows)}::jsonb) e(value) left join public.${table} t on ${match}`;
  });
  const verificationSql = "-- Privileged read-only verification; reports conflicts without overwriting edits.\nselect jsonb_agg(report) as verification from (" + verificationParts.join("\nunion all\n") + ") results;\n";
  return { tables, sql, report, verificationSql };
}
