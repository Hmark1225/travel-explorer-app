import { z } from 'zod';
export const destinationCategories = ['Coast','Culture','City breaks'] as const;
export const attractionCategories = ['History & culture','Architecture','Nature & beaches','Food & drink','Outdoor activities','Museums','Family activities','Local experiences','Wellness'] as const;
export const providerNames = { booking: 'Booking.com', viator: 'Viator', tripadvisor: 'Tripadvisor', getyourguide: 'GetYourGuide' };
export type Entity = 'destinations' | 'attractions' | 'photos' | 'partner_links';
export type Row = { id: string; version: number; record?: Record<string, unknown>; [key: string]: unknown };
export type Translation = Record<string, string | string[]>;
export function safeHttps(value: unknown): value is string {
  if (typeof value !== 'string' || /[\s\\]/.test(value)) return false;
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password && !u.hash; } catch { return false; }
}
export function providerUrl(provider: string, value: string) {
  const host = ({ booking:'www.booking.com', viator:'www.viator.com', tripadvisor:'www.tripadvisor.com', getyourguide:'www.getyourguide.com' } as Record<string,string>)[provider];
  if (!safeHttps(value)) return false;
  const u = new URL(value);
  return !!host && u.hostname === host && !u.port && !u.search && u.pathname !== '/' && !/\/(redirect|search|url)(\/|$)/i.test(u.pathname);
}
export const permanentId = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use a permanent lowercase ID with hyphens.');
export function validatePayload(entity: Entity, payload: Record<string, unknown>) {
  if (entity === 'destinations' || entity === 'attractions') {
    permanentId.parse(payload.id);
    const translations = payload.translations as Record<string,Translation>;
    const required = entity === 'destinations' ? ['name','country','region','tagline','description','coordinate_label'] : ['name','short_description','detailed_description','estimated_duration'];
    for (const lang of ['en','hu']) {
      for (const key of required) z.string().trim().min(1,`${lang.toUpperCase()}: ${key} is required.`).parse(translations?.[lang]?.[key]);
      if (entity === 'attractions') z.array(z.string().trim().min(1)).min(1).parse(translations[lang].useful_tips);
    }
    for (const [field, bound] of [['latitude',90],['longitude',180]] as const) {
      const value = payload[field];
      if (value === null && entity === 'attractions') continue;
      z.number().min(-bound).max(bound).parse(value);
    }
    if ((payload.latitude === null) !== (payload.longitude === null)) throw new Error('Supply both coordinates or neither.');
  } else if (entity === 'partner_links' && !providerUrl(String(payload.provider_id),String(payload.url))) {
    throw new Error('Use a canonical HTTPS URL on the exact provider domain, without query tracking or redirects.');
  }
  const record = payload.record as Record<string,unknown> | undefined;
  for (const field of ['coordinateSourceUrl','coordinateLicenseUrl','officialWebsite','sourceUrl','originalUrl','licenseUrl','url']) {
    if (record?.[field] && !safeHttps(record[field])) throw new Error(`${field} must be a safe HTTPS URL.`);
  }
  if (record?.sourceUrls && (!Array.isArray(record.sourceUrls) || record.sourceUrls.some((url) => !safeHttps(url)))) throw new Error('Source URLs must use safe HTTPS.');
  return payload;
}
export function photoIssues(record: Record<string, unknown>, provenance: unknown, evidence: unknown): string[] {
  const issues: string[] = [];
  if (record.kind !== 'photo' || record.authenticity !== 'photograph') issues.push('Confirm a genuine location photograph.');
  if (record.commercialUseAllowed !== true) issues.push('Commercial-use permission is required.');
  if (!['CC0-1.0','Public-domain','CC-BY-4.0','CC-BY-SA-4.0','Permission-granted'].includes(String(record.license))) issues.push('Review the licence.');
  for (const key of ['author','attribution','subject','reviewedBy','modificationNotes','provenanceNotes']) if (!String(record[key] ?? '').trim()) issues.push(`${key} is required.`);
  for (const key of ['url','originalUrl','sourceUrl','licenseUrl']) if (!safeHttps(record[key])) issues.push(`${key} needs a safe HTTPS URL.`);
  for (const key of ['verifiedAt','subjectVerifiedAt']) {
    const value = String(record[key] ?? '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0,10) !== value || Date.parse(value) > Date.now()) issues.push(`${key} needs a valid review date.`);
  }
  if (record.reviewStatus !== 'reviewed') issues.push('Rights and subject review must be marked complete.');
  if (!provenance || !Array.isArray(evidence) || !evidence.length || evidence.some((url) => !safeHttps(url))) issues.push('Public provenance and evidence are required.');
  if (!Array.isArray(record.evidenceUrls) || !record.evidenceUrls.length || record.evidenceUrls.some((url) => !safeHttps(url))) issues.push('Original review evidence is required.');
  return issues;
}
export async function validateUpload(file: File) {
  if (file.size > 10485760 || file.size === 0) throw new Error('Choose a JPEG, PNG or WebP file up to 10 MB.');
  const bytes = new Uint8Array(await file.slice(0,16).arrayBuffer());
  const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const png = [137,80,78,71,13,10,26,10].every((b,i) => bytes[i] === b);
  const webp = new TextDecoder().decode(bytes.slice(0,4)) === 'RIFF' && new TextDecoder().decode(bytes.slice(8,12)) === 'WEBP';
  const ext = jpeg ? 'jpg' : png ? 'png' : webp ? 'webp' : null;
  const mime = jpeg ? 'image/jpeg' : png ? 'image/png' : 'image/webp';
  if (!ext || file.type !== mime) throw new Error('Image bytes and MIME type must match JPEG, PNG or WebP. SVG is not supported.');
  return { ext, mime };
}
