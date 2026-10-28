import type { SupabaseClient } from '@supabase/supabase-js';
import type { Entity, Row } from './domain';
const workflow = 'id,version,approval_status,review_requested_at,approved_at,approved_by,review_evidence_url,review_note,updated_at';
export const columns = {
  destinations: `${workflow},record,publication_status,review_status,last_verified_at,sort_order,category,country_code,latitude,longitude`,
  attractions: `${workflow},record,publication_status,review_status,last_verified_at,sort_order,destination_id,kind,category,admission_type,latitude,longitude`,
  photos: `${workflow},record,publication_status,public_provenance,public_evidence_urls,storage_path`,
  partner_links: `${workflow},destination_id,attraction_id,provider_id,action,language,url,verified_at,reviewed_by,evidence_url,documentation_url,enabled,affiliate`,
  photo_assignments: `${workflow},photo_id,destination_id,attraction_id,slot,position,publication_status`,
};
export type Inventory = Record<Entity,Row[]> & { photo_assignments: Row[]; destination_translations: Record<string,unknown>[]; attraction_translations: Record<string,unknown>[]; content_sources: Record<string,unknown>[]; editorial_audit_log: Record<string,unknown>[] };
export async function inventory(client: SupabaseClient): Promise<Inventory> {
  const tables: Record<string,string> = { ...columns,
    destination_translations:'destination_id,language,name,country,region,tagline,description,coordinate_label',
    attraction_translations:'attraction_id,language,name,short_description,detailed_description,estimated_duration,useful_tips',
    content_sources:'id,name,url,access_status',editorial_audit_log:'id,occurred_at,actor_id,entity_table,entity_id,operation',
  };
  const results = await Promise.all(Object.entries(tables).map(async ([table,select]) => {
    const rows: unknown[] = [];
    for(let start=0;start<10000;start+=500) {
      let query = client.from(table).select(select).order(table==='editorial_audit_log'?'id':table.endsWith('_translations')?'language':'id',{ascending:table!=='editorial_audit_log'});
      if(table.endsWith('_translations')) query=query.order(table==='destination_translations'?'destination_id':'attraction_id');
      const {data,error}=await query.range(start,table==='editorial_audit_log'?49:start+499);
      if(error) throw new Error('Could not load editorial data. Check membership, migrations and connection.');
      rows.push(...(data??[]));
      if(table==='editorial_audit_log' || (data?.length??0)<500) return [table,rows];
    }
    throw new Error('Inventory limit reached. Add server pagination before growing this catalog.');
  }));
  return Object.fromEntries(results) as Inventory;
}
export function emptyRecord(entity: Entity, id: string): Record<string,unknown> {
  if(entity==='photos')return {kind:'placeholder',url:null,authenticity:'unknown',reviewStatus:'needs-review',commercialUseAllowed:false,evidenceUrls:[]};
  return {id,sourceUrls:[],sourceIds:[],coordinateSourceUrl:null,coordinateLicenseUrl:null,coordinateRecordId:null,coordinateAttribution:null,coordinatesVerifiedAt:null,officialWebsite:null,officialWebsiteVerifiedAt:null,coordinatePrecision:null,searchAliases:[]};
}
