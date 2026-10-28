-- Admin v1. No production execution or content promotion is performed by this file.
begin;
create table public.editorial_audit_log (
  id bigint generated always as identity primary key,
  occurred_at timestamptz not null default clock_timestamp(),
  actor_id uuid, entity_table text not null, entity_id text not null,
  operation text not null check(operation in ('INSERT','UPDATE','DELETE')),
  before_record jsonb, after_record jsonb
);
alter table public.editorial_audit_log enable row level security;
revoke all on public.editorial_audit_log from public, anon, authenticated;
grant select on public.editorial_audit_log to authenticated;
create policy audit_admin_read on public.editorial_audit_log for select to authenticated
using ((select travel_private.is_admin()));
create index editorial_audit_recent on public.editorial_audit_log(occurred_at desc,id desc);
create function travel_private.audit_editorial() returns trigger language plpgsql security definer set search_path='' as $$
begin
  insert into public.editorial_audit_log(actor_id,entity_table,entity_id,operation,before_record,after_record)
  values(auth.uid(),tg_table_schema||'.'||tg_table_name,
    coalesce(to_jsonb(new)->>'id',to_jsonb(old)->>'id',to_jsonb(new)->>'destination_id',to_jsonb(old)->>'destination_id',to_jsonb(new)->>'attraction_id',to_jsonb(old)->>'attraction_id',to_jsonb(new)->>'user_id',to_jsonb(old)->>'user_id','unknown'),
    tg_op,case when tg_op<>'INSERT' then to_jsonb(old) end,case when tg_op<>'DELETE' then to_jsonb(new) end);
  return coalesce(new,old);
end; $$;
revoke all on function travel_private.audit_editorial() from public,anon,authenticated;
create function public.admin_access() returns boolean language sql stable security invoker set search_path='' as $$
  select auth.uid() is not null and travel_private.is_admin();
$$;
revoke all on function public.admin_access() from public,anon;
grant execute on function public.admin_access() to authenticated;
alter table public.destinations
  add column version integer not null default 1 check(version>0),
  add column review_requested_at timestamptz,
  add column approved_at timestamptz,
  add column approved_by uuid,
  add column review_evidence_url text,
  add column review_note text not null default '';
alter table public.attractions
  add column version integer not null default 1 check(version>0),
  add column review_requested_at timestamptz,
  add column approved_at timestamptz,
  add column approved_by uuid,
  add column review_evidence_url text,
  add column review_note text not null default '';
alter table public.photos
  add column version integer not null default 1 check(version>0),
  add column review_requested_at timestamptz,
  add column approved_at timestamptz,
  add column approved_by uuid,
  add column review_evidence_url text,
  add column review_note text not null default '';
alter table public.photo_assignments
  add column version integer not null default 1 check(version>0),
  add column review_requested_at timestamptz,
  add column approved_at timestamptz,
  add column approved_by uuid,
  add column review_evidence_url text,
  add column review_note text not null default '';
alter table public.partner_links
  add column version integer not null default 1 check(version>0),
  add column review_requested_at timestamptz,
  add column approved_at timestamptz,
  add column approved_by uuid,
  add column review_evidence_url text,
  add column review_note text not null default '';
alter table public.photos add column storage_path text;
create unique index photos_storage_path_unique on public.photos(storage_path) where storage_path is not null;
create function travel_private.safe_https(value text) returns boolean language plpgsql immutable set search_path='' as $$
begin return coalesce(value ~ '^https://[a-zA-Z0-9.-]+(:443)?(/[^[:space:]\\]*)?$' and value !~ '[#@]',false); end; $$;
create function travel_private.valid_photo(p jsonb, provenance text, evidence text[]) returns boolean language plpgsql stable set search_path='' as $$
declare key text;
begin
  if p->>'kind' is distinct from 'photo' or p->>'authenticity' is distinct from 'photograph' or p->>'reviewStatus' is distinct from 'reviewed'
    or p->'commercialUseAllowed' is distinct from 'true'::jsonb then return false; end if;
  foreach key in array array['url','originalUrl','licenseUrl','sourceUrl'] loop
    if not travel_private.safe_https(p->>key) then return false; end if;
  end loop;
  foreach key in array array['author','attribution','subject','reviewedBy','provenanceNotes','modificationNotes'] loop
    if coalesce(length(trim(p->>key)),0)=0 then return false; end if;
  end loop;
  if coalesce(p->>'license','') not in ('CC0-1.0','Public-domain','CC-BY-4.0','CC-BY-SA-4.0','Permission-granted')
    or not travel_private.valid_review_date(p->>'verifiedAt') or not travel_private.valid_review_date(p->>'subjectVerifiedAt')
    or (p->>'verifiedAt')::date>current_date or (p->>'subjectVerifiedAt')::date>current_date
    or coalesce(length(trim(provenance)),0)=0 or coalesce(cardinality(evidence),0)=0 then return false; end if;
  if jsonb_typeof(p->'evidenceUrls') is distinct from 'array' then return false; end if;
  if jsonb_array_length(p->'evidenceUrls')=0 then return false; end if;
  if exists(select 1 from jsonb_array_elements_text(p->'evidenceUrls') e where not travel_private.safe_https(e))
    or exists(select 1 from unnest(evidence) e where not travel_private.safe_https(e)) then return false; end if;
  return true;
exception when others then return false;
end; $$;
create function travel_private.validate_editorial(kind text, item_id text) returns void language plpgsql security invoker set search_path='' as $$
declare item jsonb; rec jsonb; translations integer; expected_host text;
begin
  if kind not in ('destinations','attractions','photos','photo_assignments','partner_links') then raise exception 'Unsupported entity'; end if;
  execute format('select to_jsonb(t) from public.%I t where id=$1',kind) into item using item_id;
  if item is null then raise exception 'Entity missing'; end if;
  rec:=item->'record';
  if not travel_private.safe_https(item->>'review_evidence_url') or length(trim(item->>'review_note'))<20 then
    raise exception 'Provide a verified HTTPS evidence URL and a review note of at least 20 characters'; end if;
  if kind in ('destinations','attractions') then
    if item->>'last_verified_at' is null or (item->>'last_verified_at')::date>current_date then raise exception 'Valid source review date required'; end if;
    if jsonb_typeof(rec->'sourceUrls') is distinct from 'array' then raise exception 'Source URLs required'; end if;
    if jsonb_array_length(rec->'sourceUrls')=0 or exists(select 1 from jsonb_array_elements_text(rec->'sourceUrls') u where not travel_private.safe_https(u)) then raise exception 'Safe source URLs required'; end if;
    if kind='destinations' then
      select count(*) into translations from public.destination_translations where destination_id=item_id and language in ('en','hu');
    else
      select count(*) into translations from public.attraction_translations where attraction_id=item_id and language in ('en','hu');
      if rec->>'officialWebsite' is not null and (not travel_private.safe_https(rec->>'officialWebsite') or not travel_private.valid_review_date(rec->>'officialWebsiteVerifiedAt')) then raise exception 'Official website verification required'; end if;
    end if;
    if jsonb_typeof(rec->'sourceIds') is distinct from 'array' then raise exception 'Source organizations required'; end if;
    if jsonb_array_length(rec->'sourceIds')=0 or exists(select 1 from jsonb_array_elements_text(rec->'sourceIds') i where not exists(select 1 from public.content_sources where id=i)) then raise exception 'Known source organizations required'; end if;
    if translations<>2 then raise exception 'Complete English and Hungarian translations required'; end if;
    if kind='destinations' or item->>'latitude' is not null then
      if not travel_private.safe_https(rec->>'coordinateSourceUrl') or not travel_private.valid_review_date(rec->>'coordinatesVerifiedAt') then raise exception 'Coordinate provenance and review date required'; end if;
    end if;
  elsif kind='photos' then
    if not travel_private.valid_photo(rec,item->>'public_provenance',array(select jsonb_array_elements_text(item->'public_evidence_urls'))) then raise exception 'Genuine photo, subject verification and complete commercial rights required'; end if;
  elsif kind='photo_assignments' then
    if not exists(select 1 from public.photos where id=item->>'photo_id' and approval_status='approved' and publication_status='published') then raise exception 'Photo must be approved and published separately'; end if;
  else
    if item->>'affiliate'='true' then raise exception 'Affiliate activation is disabled'; end if;
    expected_host:=case item->>'provider_id' when 'booking' then 'www.booking.com' when 'viator' then 'www.viator.com' when 'tripadvisor' then 'www.tripadvisor.com' when 'getyourguide' then 'www.getyourguide.com' when 'google-maps' then 'www.google.com' end;
    if not travel_private.safe_https(item->>'url') or split_part(split_part(item->>'url','/',3),':',1) is distinct from expected_host
      or (item->>'url') ~ '[?]' or (item->>'url') ~* '/(redirect|search|url)(/|$)' or length(split_part(item->>'url','/',4))=0 then raise exception 'An exact canonical approved provider URL is required'; end if;
    if not travel_private.safe_https(item->>'documentation_url') or not travel_private.safe_https(item->>'evidence_url')
      or item->>'verified_at' is null or (item->>'verified_at')::date>current_date or coalesce(length(trim(item->>'reviewed_by')),0)=0 then raise exception 'Provider documentation and verification required'; end if;
  end if;
end; $$;
-- Mandatory workflow and immutable identifiers apply even to direct API writes.
create function travel_private.guard_editorial() returns trigger language plpgsql security invoker set search_path='' as $$
declare previous jsonb:=to_jsonb(old); current_row jsonb:=to_jsonb(new); changed boolean;
begin
  if tg_op='DELETE' then raise exception 'Archive editorial records instead of deleting them'; end if;
  if tg_op='INSERT' then
    if coalesce(current_row->>'publication_status','draft')<>'draft' or coalesce(current_row->>'approval_status','pending')<>'pending' or coalesce(current_row->>'enabled','false')<>'false' then raise exception 'New records must start as inactive drafts'; end if;
    new.version:=1; new.review_requested_at:=null; new.approved_at:=null; new.approved_by:=null; return new;
  end if;
  if new.id is distinct from old.id or (tg_table_name='attractions' and current_row->>'destination_id' is distinct from previous->>'destination_id') then raise exception 'Permanent IDs and attraction parents cannot change'; end if;
  if tg_table_name='photos' and previous->'record'->>'kind'='placeholder' and current_row->'record'->>'kind'='photo' then raise exception 'Create a new photo record; preserve the imported placeholder'; end if;
  changed := (current_row - array['updated_at','version','publication_status','approval_status','review_status','review_requested_at','approved_at','approved_by','enabled'])
    is distinct from (previous - array['updated_at','version','publication_status','approval_status','review_status','review_requested_at','approved_at','approved_by','enabled']);
  if changed then
    new.approval_status:='pending'; new.review_requested_at:=null; new.approved_at:=null; new.approved_by:=null;
    if tg_table_name='partner_links' then new:=jsonb_populate_record(new,'{"enabled":false}'::jsonb); else new:=jsonb_populate_record(new,'{"publication_status":"draft"}'::jsonb); end if;
    if tg_table_name in ('destinations','attractions') then new:=jsonb_populate_record(new,'{"review_status":"needs-review"}'::jsonb); end if;
  else
    if new.review_requested_at is distinct from old.review_requested_at then
      if new.review_requested_at is not null then new.review_requested_at:=clock_timestamp(); end if;
      new.approval_status:='pending'; new.approved_at:=null; new.approved_by:=null;
      if tg_table_name='partner_links' then new:=jsonb_populate_record(new,'{"enabled":false}'::jsonb); else new:=jsonb_populate_record(new,'{"publication_status":"draft"}'::jsonb); end if;
      if tg_table_name in ('destinations','attractions') then new:=jsonb_populate_record(new,'{"review_status":"needs-review"}'::jsonb); end if;
    end if;
    if new.approval_status='approved' and old.approval_status<>'approved' then
      if old.review_requested_at is null then raise exception 'Request review before approval'; end if;
      perform travel_private.validate_editorial(tg_table_name,new.id);
      new.approved_at:=clock_timestamp(); new.approved_by:=auth.uid();
      if tg_table_name in ('destinations','attractions') then new:=jsonb_populate_record(new,'{"review_status":"reviewed"}'::jsonb); end if;
    elsif new.approved_by is distinct from old.approved_by or new.approved_at is distinct from old.approved_at then
      if new.approval_status='approved' then raise exception 'Approval identity is immutable'; end if;
    end if;
    if (tg_table_name<>'partner_links' and current_row->>'publication_status'='published' and previous->>'publication_status' is distinct from 'published')
      or (tg_table_name='partner_links' and current_row->>'enabled'='true' and previous->>'enabled'='false') then
      if old.approval_status<>'approved' or old.approved_at is null then raise exception 'Approve separately before publishing'; end if;
      perform travel_private.validate_editorial(tg_table_name,new.id);
    end if;
  end if;
  new.version:=old.version+1;
  return new;
end; $$;
create trigger a_editorial_guard before insert or update or delete on public.destinations for each row execute function travel_private.guard_editorial();
create trigger a_editorial_guard before insert or update or delete on public.attractions for each row execute function travel_private.guard_editorial();
create trigger a_editorial_guard before insert or update or delete on public.photos for each row execute function travel_private.guard_editorial();
create trigger a_editorial_guard before insert or update or delete on public.photo_assignments for each row execute function travel_private.guard_editorial();
create trigger a_editorial_guard before insert or update or delete on public.partner_links for each row execute function travel_private.guard_editorial();
create trigger editorial_audit after insert or update or delete on public.destinations for each row execute function travel_private.audit_editorial();
create trigger editorial_audit after insert or update or delete on public.attractions for each row execute function travel_private.audit_editorial();
create trigger editorial_audit after insert or update or delete on public.photos for each row execute function travel_private.audit_editorial();
create trigger editorial_audit after insert or update or delete on public.photo_assignments for each row execute function travel_private.audit_editorial();
create trigger editorial_audit after insert or update or delete on public.partner_links for each row execute function travel_private.audit_editorial();
create trigger editorial_audit after insert or update or delete on public.destination_translations for each row execute function travel_private.audit_editorial();
create trigger editorial_audit after insert or update or delete on public.attraction_translations for each row execute function travel_private.audit_editorial();
create trigger editorial_audit after insert or update or delete on public.content_sources for each row execute function travel_private.audit_editorial();
create trigger editorial_audit after insert or update or delete on public.destination_sources for each row execute function travel_private.audit_editorial();
create trigger editorial_audit after insert or update or delete on public.attraction_sources for each row execute function travel_private.audit_editorial();
create trigger editorial_role_audit after insert or update or delete on travel_private.admin_roles for each row execute function travel_private.audit_editorial();
create function travel_private.translation_changed() returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if tg_table_name='destination_translations' then
    update public.destinations set publication_status='draft', approval_status='pending',review_status='needs-review',review_requested_at=null,approved_at=null,approved_by=null where id=coalesce(new.destination_id,old.destination_id);
  else
    update public.attractions set publication_status='draft', approval_status='pending',review_status='needs-review',review_requested_at=null,approved_at=null,approved_by=null where id=coalesce(new.attraction_id,old.attraction_id);
  end if;
  return coalesce(new,old);
end; $$;
create trigger translation_changed after insert or update or delete on public.destination_translations for each row execute function travel_private.translation_changed();
create trigger translation_changed after insert or update or delete on public.attraction_translations for each row execute function travel_private.translation_changed();
create function public.admin_transition(entity text,item_id text,expected_version integer,operation text) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare item jsonb; result jsonb; changes text;
begin
  if not public.admin_access() then raise exception 'Administrator access required' using errcode='42501'; end if;
  if entity not in ('destinations','attractions','photos','photo_assignments','partner_links') then raise exception 'Unsupported entity'; end if;
  execute format('select to_jsonb(t) from public.%I t where id=$1 for update',entity) into item using item_id;
  if item is null or (item->>'version')::integer<>expected_version then raise exception 'Conflict: reload before saving' using errcode='40001'; end if;
  changes:=case operation when 'review' then 'review_requested_at=clock_timestamp(),approval_status=''pending'''
    when 'approve' then 'approval_status=''approved'''
    when 'publish' then case when entity='partner_links' then 'enabled=true' else 'publication_status=''published''' end
    when 'archive' then case when entity='partner_links' then 'enabled=false' else 'publication_status=''archived''' end
    else null end;
  if changes is null then raise exception 'Unsupported operation'; end if;
  execute format('update public.%I t set %s where id=$1 returning to_jsonb(t)',entity,changes) into result using item_id;
  return result;
end; $$;
create function public.admin_save(entity text,payload jsonb,expected_version integer) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare item jsonb; item_id text:=payload->>'id'; rec jsonb:=payload->'record'; lang text; tr jsonb; result jsonb;
begin
  if not public.admin_access() then raise exception 'Administrator access required' using errcode='42501'; end if;
  if entity not in ('destinations','attractions','photos','partner_links') then raise exception 'Unsupported entity'; end if;
  execute format('select to_jsonb(t) from public.%I t where id=$1 for update',entity) into item using item_id;
  if (item is null and expected_version<>0) or (item is not null and (item->>'version')::integer<>expected_version) then raise exception 'Conflict: reload before saving' using errcode='40001'; end if;
  if entity='destinations' then
    if item is null then
      insert into public.destinations(id,category,country_code,latitude,longitude,record) values(item_id,payload->>'category',payload->>'country_code',(payload->>'latitude')::float8,(payload->>'longitude')::float8,rec);
    else
      update public.destinations set category=payload->>'category',country_code=payload->>'country_code',latitude=(payload->>'latitude')::float8,longitude=(payload->>'longitude')::float8,record=rec where id=item_id;
    end if;
  elsif entity='attractions' then
    if item is not null and payload->>'destination_id' is distinct from item->>'destination_id' then raise exception 'Attraction parent is permanent'; end if;
    if item is null then
      insert into public.attractions(id,destination_id,kind,category,admission_type,latitude,longitude,record) values(item_id,payload->>'destination_id',payload->>'kind',payload->>'category',payload->>'admission_type',(payload->>'latitude')::float8,(payload->>'longitude')::float8,rec);
    else
      update public.attractions set kind=payload->>'kind',category=payload->>'category',admission_type=payload->>'admission_type',latitude=(payload->>'latitude')::float8,longitude=(payload->>'longitude')::float8,record=rec where id=item_id;
    end if;
  elsif entity='photos' then
    if payload->>'storage_path' is not null and not exists(select 1 from storage.objects where bucket_id='travel-editorial' and name=payload->>'storage_path') then raise exception 'Upload object missing or inaccessible'; end if;
    insert into public.photos(id,record,storage_path,public_provenance,public_evidence_urls) values(item_id,rec,payload->>'storage_path',payload->>'public_provenance',array(select jsonb_array_elements_text(payload->'public_evidence_urls')))
      on conflict(id) do update set record=excluded.record,storage_path=excluded.storage_path,public_provenance=excluded.public_provenance,public_evidence_urls=excluded.public_evidence_urls;
  else
    insert into public.partner_links(id,destination_id,attraction_id,provider_id,action,language,url,verified_at,reviewed_by,evidence_url,documentation_url)
      values(item_id,payload->>'destination_id',nullif(payload->>'attraction_id',''),payload->>'provider_id',payload->>'action',payload->>'language',payload->>'url',(payload->>'verified_at')::date,payload->>'reviewed_by',payload->>'evidence_url',payload->>'documentation_url')
      on conflict(id) do update set url=excluded.url,verified_at=excluded.verified_at,reviewed_by=excluded.reviewed_by,evidence_url=excluded.evidence_url,documentation_url=excluded.documentation_url;
  end if;
  execute format('update public.%I set review_evidence_url=$2,review_note=$3%s where id=$1',entity,case when entity in ('destinations','attractions') then ',last_verified_at=($4)::date' else '' end)
    using item_id,payload->>'review_evidence_url',coalesce(payload->>'review_note',''),payload->>'last_verified_at';
  if entity in ('destinations','attractions') then
    foreach lang in array array['en','hu'] loop
      tr:=payload->'translations'->lang;
      if tr is null then raise exception 'Both translations required'; end if;
      if entity='destinations' then
        insert into public.destination_translations(destination_id,language,name,country,region,tagline,description,coordinate_label)
          values(item_id,lang,tr->>'name',tr->>'country',tr->>'region',tr->>'tagline',tr->>'description',tr->>'coordinate_label')
          on conflict(destination_id,language) do update set name=excluded.name,country=excluded.country,region=excluded.region,tagline=excluded.tagline,description=excluded.description,coordinate_label=excluded.coordinate_label;
      else
        insert into public.attraction_translations(attraction_id,language,name,short_description,detailed_description,estimated_duration,useful_tips)
          values(item_id,lang,tr->>'name',tr->>'short_description',tr->>'detailed_description',tr->>'estimated_duration',tr->'useful_tips')
          on conflict(attraction_id,language) do update set name=excluded.name,short_description=excluded.short_description,detailed_description=excluded.detailed_description,estimated_duration=excluded.estimated_duration,useful_tips=excluded.useful_tips;
      end if;
    end loop;
  end if;
  if entity='destinations' then insert into public.destination_sources(destination_id,source_id) select item_id,jsonb_array_elements_text(rec->'sourceIds') on conflict do nothing;
  elsif entity='attractions' then insert into public.attraction_sources(attraction_id,source_id) select item_id,jsonb_array_elements_text(rec->'sourceIds') on conflict do nothing; end if;
  execute format('select to_jsonb(t) from public.%I t where id=$1',entity) into result using item_id;
  return result;
end; $$;
create function public.admin_assign_photo(photo text,target text,target_kind text,expected_version integer) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare result jsonb; existing public.photo_assignments;
begin
  if not public.admin_access() then raise exception 'Administrator access required' using errcode='42501'; end if;
  if target_kind not in ('destination','attraction') then raise exception 'Invalid target'; end if;
  select * into existing from public.photo_assignments where slot='hero' and ((target_kind='destination' and destination_id=target) or (target_kind='attraction' and attraction_id=target)) for update;
  if (existing.id is null and expected_version<>0) or (existing.id is not null and existing.version<>expected_version) then raise exception 'Conflict: reload assignment' using errcode='40001'; end if;
  if existing.id is null then
    insert into public.photo_assignments(id,photo_id,destination_id,attraction_id,slot) values(target_kind||':'||target||':hero:0',photo,case when target_kind='destination' then target end,case when target_kind='attraction' then target end,'hero') returning to_jsonb(photo_assignments) into result;
  else update public.photo_assignments set photo_id=photo where id=existing.id returning to_jsonb(photo_assignments) into result;
  end if;
  update public.photo_assignments set review_evidence_url=p.review_evidence_url,review_note=p.review_note from public.photos p where photo_assignments.id=result->>'id' and p.id=photo;
  select to_jsonb(a) into result from public.photo_assignments a where a.id=result->>'id';
  return result;
end; $$;
-- A private bucket: public access is permitted only through published-photo RLS.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('travel-editorial','travel-editorial',false,10485760,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
do $$ begin if exists(select 1 from storage.buckets where id='travel-editorial' and public) then raise exception 'Editorial bucket must remain private'; end if; end $$;
create view public.travel_photo_delivery with (security_barrier=true) as
select p.id,p.storage_path from public.photos p join public.travel_photos safe on safe.id=p.id where p.storage_path is not null;
revoke all on public.travel_photo_delivery from public,anon,authenticated;
grant select on public.travel_photo_delivery to anon,authenticated;
create policy editorial_object_insert on storage.objects for insert to authenticated
with check(bucket_id='travel-editorial' and (select travel_private.is_admin()) and name ~ '^[0-9a-f-]{36}[.](jpg|png|webp)$');
create policy editorial_object_admin_read on storage.objects for select to authenticated
using(bucket_id='travel-editorial' and (select travel_private.is_admin()));
create policy editorial_object_published_read on storage.objects for select to anon,authenticated
using(bucket_id='travel-editorial' and name in (select storage_path from public.travel_photo_delivery));
revoke all on function travel_private.safe_https(text) from public,anon,authenticated;
grant execute on function travel_private.safe_https(text) to authenticated;
revoke all on function travel_private.valid_photo(jsonb,text,text[]) from public,anon,authenticated;
grant execute on function travel_private.valid_photo(jsonb,text,text[]) to authenticated;
revoke all on function travel_private.validate_editorial(text,text) from public,anon,authenticated;
grant execute on function travel_private.validate_editorial(text,text) to authenticated;
revoke all on function travel_private.guard_editorial() from public,anon,authenticated;
grant execute on function travel_private.guard_editorial() to authenticated;
revoke all on function travel_private.translation_changed() from public,anon,authenticated;
grant execute on function travel_private.translation_changed() to authenticated;
revoke all on function public.admin_transition(text,text,integer,text) from public,anon;
grant execute on function public.admin_transition(text,text,integer,text) to authenticated;
revoke all on function public.admin_save(text,jsonb,integer) from public,anon;
grant execute on function public.admin_save(text,jsonb,integer) to authenticated;
revoke all on function public.admin_assign_photo(text,text,text,integer) from public,anon;
grant execute on function public.admin_assign_photo(text,text,text,integer) to authenticated;
commit;
