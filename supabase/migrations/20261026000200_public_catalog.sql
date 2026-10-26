-- Security-definer, security-barrier API views: explicit public projections only.
-- Do not change these to SELECT * or grant raw content access to public policies.
begin;
create function travel_private.valid_review_date(value text) returns boolean
language plpgsql immutable set search_path = '' as $$
begin
  if value is null or value !~ '^\d{4}-\d{2}-\d{2}$' then return false; end if;
  return to_char(value::date, 'YYYY-MM-DD') = value;
exception when others then return false;
end;
$$;
revoke all on function travel_private.valid_review_date(text) from public, anon, authenticated;
-- Called through the view, not through an exposed API schema; contains no data lookup.
grant execute on function travel_private.valid_review_date(text) to anon, authenticated;


create view public.travel_photos with (security_barrier = true) as
select p.id, jsonb_build_object('url', p.record->'url',
'altText', p.record->'altText',
'attribution', p.record->'attribution',
'author', p.record->'author',
'originalUrl', p.record->'originalUrl',
'license', p.record->'license',
'commercialUseAllowed', p.record->'commercialUseAllowed',
'licenseUrl', p.record->'licenseUrl',
'sourceUrl', p.record->'sourceUrl',
'verifiedAt', p.record->'verifiedAt',
'subject', p.record->'subject',
'subjectVerifiedAt', p.record->'subjectVerifiedAt',
'modificationNotes', p.record->'modificationNotes',
'kind', 'photo',
'authenticity', 'photograph',
'reviewStatus', 'reviewed',
'reviewedBy', 'Editorial review',
'provenanceNotes', to_jsonb(p.public_provenance),
'evidenceUrls', to_jsonb(p.public_evidence_urls)) as payload
from public.photos p
where p.publication_status = 'published' and p.approval_status = 'approved'
  and p.record->>'kind' = 'photo' and p.record->>'authenticity' = 'photograph'
  and p.record->>'reviewStatus' = 'reviewed' and p.record->>'commercialUseAllowed' = 'true'
  and p.record->>'license' in ('CC0-1.0','Public-domain','CC-BY-4.0','CC-BY-SA-4.0','Permission-granted')
  and (case when jsonb_typeof(p.record->'evidenceUrls') = 'array' then jsonb_array_length(p.record->'evidenceUrls') > 0 else false end)
  and not exists (select 1 from jsonb_array_elements_text(case when jsonb_typeof(p.record->'evidenceUrls') = 'array' then p.record->'evidenceUrls' else '[]'::jsonb end) e where e is null or e !~ '^https://[^[:space:]@]+$')
  and coalesce(length(trim(p.record->>'reviewedBy')),0) > 0
  and coalesce(length(trim(p.record->>'author')),0) > 0
  and coalesce(length(trim(p.record->>'attribution')),0) > 0
  and coalesce(length(trim(p.record->>'subject')),0) > 0
  and coalesce(length(trim(p.record->>'provenanceNotes')),0) > 0
  and coalesce(length(trim(p.record->>'modificationNotes')),0) > 0
  and travel_private.valid_review_date(p.record->>'verifiedAt')
  and travel_private.valid_review_date(p.record->>'subjectVerifiedAt')
  and p.record->>'url' ~ '^https://[^[:space:]@]+$'
  and p.record->>'originalUrl' ~ '^https://[^[:space:]@]+$'
  and p.record->>'sourceUrl' ~ '^https://[^[:space:]@]+$'
  and p.record->>'licenseUrl' ~ '^https://[^[:space:]@]+$'
  and coalesce(length(trim(p.public_provenance)),0) > 0
  and cardinality(p.public_evidence_urls) > 0
  and not exists (select 1 from unnest(p.public_evidence_urls) u where u is null or u !~ '^https://[^[:space:]@]+$')
  and exists (
    select 1 from public.photo_assignments pa
    left join public.destinations d on d.id = pa.destination_id
    left join public.attractions a on a.id = pa.attraction_id
    left join public.destinations ad on ad.id = a.destination_id
    where pa.photo_id = p.id and pa.publication_status = 'published' and pa.approval_status = 'approved'
      and ((d.publication_status = 'published' and d.approval_status = 'approved' and d.review_status = 'reviewed' and d.last_verified_at is not null) or (a.publication_status = 'published' and a.approval_status = 'approved' and a.review_status = 'reviewed' and a.last_verified_at is not null and ad.publication_status = 'published' and ad.approval_status = 'approved' and ad.review_status = 'reviewed' and ad.last_verified_at is not null))
  );
create view public.travel_attractions with (security_barrier = true) as select x.id, x.destination_id, x.sort_order, jsonb_build_object('coordinateSourceUrl', x.record->'coordinateSourceUrl',
'coordinateLicenseUrl', x.record->'coordinateLicenseUrl',
'coordinateRecordId', x.record->'coordinateRecordId',
'coordinateAttribution', x.record->'coordinateAttribution',
'coordinatesVerifiedAt', x.record->'coordinatesVerifiedAt',
'sourceUrls', x.record->'sourceUrls',
'sourceIds', x.record->'sourceIds',
'id', x.id,
'category', x.category,
'reviewStatus', x.review_status,
'lastVerifiedAt', x.last_verified_at,
'localized', (select jsonb_object_agg(t.language, jsonb_build_object('name', t.name,
'shortDescription', t.short_description,
'detailedDescription', t.detailed_description,
'estimatedDuration', t.estimated_duration,
'usefulTips', t.useful_tips)) from public.attraction_translations t where t.attraction_id = x.id),
'heroImage', (select p.payload from public.photo_assignments pa join public.travel_photos p on p.id = pa.photo_id where pa.attraction_id = x.id and pa.slot = 'hero' and pa.publication_status = 'published' and pa.approval_status = 'approved' limit 1),
'galleryImages', coalesce((select jsonb_agg(p.payload order by pa.position) from public.photo_assignments pa join public.travel_photos p on p.id = pa.photo_id where pa.attraction_id = x.id and pa.slot = 'gallery' and pa.publication_status = 'published' and pa.approval_status = 'approved'), '[]'::jsonb),
'coordinatePrecision', x.record->'coordinatePrecision',
'officialWebsite', x.record->'officialWebsite',
'officialWebsiteVerifiedAt', x.record->'officialWebsiteVerifiedAt',
'kind', x.kind,
'admissionType', x.admission_type,
'latitude', x.latitude,
'longitude', x.longitude) as payload from public.attractions x join public.destinations d on d.id = x.destination_id where x.publication_status = 'published' and x.approval_status = 'approved' and x.review_status = 'reviewed' and x.last_verified_at is not null and (select count(*) = 2 from public.attraction_translations t where t.attraction_id = x.id and t.language in ('en','hu')) and d.publication_status = 'published' and d.approval_status = 'approved' and d.review_status = 'reviewed' and d.last_verified_at is not null and (select count(*) = 2 from public.destination_translations t where t.destination_id = d.id and t.language in ('en','hu'));
create view public.travel_destinations with (security_barrier = true) as select x.id, x.sort_order, jsonb_build_object('coordinateSourceUrl', x.record->'coordinateSourceUrl',
'coordinateLicenseUrl', x.record->'coordinateLicenseUrl',
'coordinateRecordId', x.record->'coordinateRecordId',
'coordinateAttribution', x.record->'coordinateAttribution',
'coordinatesVerifiedAt', x.record->'coordinatesVerifiedAt',
'sourceUrls', x.record->'sourceUrls',
'sourceIds', x.record->'sourceIds',
'id', x.id,
'category', x.category,
'reviewStatus', x.review_status,
'lastVerifiedAt', x.last_verified_at,
'localized', (select jsonb_object_agg(t.language, jsonb_build_object('name', t.name,
'country', t.country,
'region', t.region,
'tagline', t.tagline,
'description', t.description,
'coordinateLabel', t.coordinate_label)) from public.destination_translations t where t.destination_id = x.id),
'heroImage', (select p.payload from public.photo_assignments pa join public.travel_photos p on p.id = pa.photo_id where pa.destination_id = x.id and pa.slot = 'hero' and pa.publication_status = 'published' and pa.approval_status = 'approved' limit 1),
'galleryImages', coalesce((select jsonb_agg(p.payload order by pa.position) from public.photo_assignments pa join public.travel_photos p on p.id = pa.photo_id where pa.destination_id = x.id and pa.slot = 'gallery' and pa.publication_status = 'published' and pa.approval_status = 'approved'), '[]'::jsonb),
'searchAliases', x.record->'searchAliases',
'countryCode', x.country_code,
'coordinates', jsonb_build_object('latitude', x.latitude,
'longitude', x.longitude),
'rating', null,
'attractions', coalesce((select jsonb_agg(a.payload order by a.sort_order, a.id) from public.travel_attractions a where a.destination_id = x.id), '[]'::jsonb)) as payload from public.destinations x where x.publication_status = 'published' and x.approval_status = 'approved' and x.review_status = 'reviewed' and x.last_verified_at is not null and (select count(*) = 2 from public.destination_translations t where t.destination_id = x.id and t.language in ('en','hu'));
revoke all on public.travel_photos from public, anon, authenticated;
grant select on public.travel_photos to anon, authenticated;
revoke all on public.travel_attractions from public, anon, authenticated;
grant select on public.travel_attractions to anon, authenticated;
revoke all on public.travel_destinations from public, anon, authenticated;
grant select on public.travel_destinations to anon, authenticated;
commit;
