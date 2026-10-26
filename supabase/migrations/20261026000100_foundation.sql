-- Travel Explorer foundation. Apply once through the Supabase migration ledger.
-- All imported editorial content stays draft; no keys or API credentials belong here.
begin;
revoke create on schema public from public, anon, authenticated;
grant usage on schema public to anon, authenticated;
create schema travel_private;
revoke all on schema travel_private from public, anon, authenticated;
grant usage on schema travel_private to authenticated;

create table travel_private.admin_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  granted_at timestamptz not null default now(),
  granted_by text not null check (length(trim(granted_by)) > 0)
);
alter table travel_private.admin_roles enable row level security;
revoke all on travel_private.admin_roles from public, anon, authenticated;
create function travel_private.is_admin() returns boolean language sql stable security definer
set search_path = '' as $$
  select exists (select 1 from travel_private.admin_roles where user_id = (select auth.uid()));
$$;
revoke all on function travel_private.is_admin() from public, anon;
grant execute on function travel_private.is_admin() to authenticated;

create function travel_private.touch_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
revoke all on function travel_private.touch_updated_at() from public, anon, authenticated;

create table public.content_sources (
  id text primary key check (id ~ '^[a-zA-Z0-9_-]+$'),
  name text not null check (length(trim(name)) > 0),
  url text not null check (url ~ '^https://[^[:space:]@]+$'),
  access_status text not null check (access_status in ('blocked','not-accessed','reviewed')),
  editorial_notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.destinations (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  sort_order integer not null default 0 check (sort_order >= 0),
  category text not null check (category in ('Coast','Culture','City breaks')),
  country_code text not null check (country_code ~ '^[A-Z]{2}$'),
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  publication_status text not null default 'draft' check (publication_status in ('draft','published','archived')),
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','rejected')),
  review_status text not null default 'needs-review' check (review_status in ('needs-review','reviewed')),
  last_verified_at date,
  record jsonb not null check (jsonb_typeof(record) = 'object' and (record->>'id' = id) is true),
  editorial_notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (publication_status <> 'published' or (approval_status = 'approved' and review_status = 'reviewed' and last_verified_at is not null))
);
create table public.destination_translations (
  destination_id text not null references public.destinations(id) on delete restrict,
  language text not null check (language in ('en','hu')),
  name text not null check (length(trim(name)) > 0),
  country text not null check (length(trim(country)) > 0),
  region text not null check (length(trim(region)) > 0),
  tagline text not null check (length(trim(tagline)) > 0),
  description text not null check (length(trim(description)) > 0),
  coordinate_label text not null check (length(trim(coordinate_label)) > 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  primary key (destination_id, language)
);
create table public.attractions (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  destination_id text not null references public.destinations(id) on delete restrict,
  sort_order integer not null default 0 check (sort_order >= 0),
  kind text not null check (kind in ('place','experience')),
  category text not null check (category in ('History & culture','Architecture','Nature & beaches','Food & drink','Outdoor activities','Museums','Family activities','Local experiences','Wellness')),
  admission_type text not null check (admission_type in ('free','paid','varies','unknown')),
  latitude double precision check (latitude between -90 and 90),
  longitude double precision check (longitude between -180 and 180),
  publication_status text not null default 'draft' check (publication_status in ('draft','published','archived')),
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','rejected')),
  review_status text not null default 'needs-review' check (review_status in ('needs-review','reviewed')),
  last_verified_at date,
  record jsonb not null check (jsonb_typeof(record) = 'object' and (record->>'id' = id) is true),
  editorial_notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (id, destination_id),
  check ((latitude is null) = (longitude is null)),
  check (publication_status <> 'published' or (approval_status = 'approved' and review_status = 'reviewed' and last_verified_at is not null))
);
create table public.attraction_translations (
  attraction_id text not null references public.attractions(id) on delete restrict,
  language text not null check (language in ('en','hu')),
  name text not null check (length(trim(name)) > 0),
  short_description text not null check (length(trim(short_description)) > 0),
  detailed_description text not null check (length(trim(detailed_description)) > 0),
  estimated_duration text not null check (length(trim(estimated_duration)) > 0),
  useful_tips jsonb not null check (jsonb_typeof(useful_tips) = 'array' and jsonb_array_length(useful_tips) > 0 and not jsonb_path_exists(useful_tips, '$[*] ? (@.type() != "string" || @ == "")')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  primary key (attraction_id, language)
);
create table public.destination_sources (
  destination_id text not null references public.destinations(id) on delete restrict,
  source_id text not null references public.content_sources(id) on delete restrict,
  primary key(destination_id, source_id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.attraction_sources (
  attraction_id text not null references public.attractions(id) on delete restrict,
  source_id text not null references public.content_sources(id) on delete restrict,
  primary key(attraction_id, source_id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.photos (
  id text primary key check (length(trim(id)) > 0),
  record jsonb not null check (jsonb_typeof(record) = 'object'),
  publication_status text not null default 'draft' check (publication_status in ('draft','published','archived')),
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','rejected')),
  -- Separate, deliberately approved public provenance; original review evidence remains private in record.
  public_provenance text,
  public_evidence_urls text[] not null default '{}',
  editorial_notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.photo_assignments (
  id text primary key,
  photo_id text not null references public.photos(id) on delete restrict,
  destination_id text references public.destinations(id) on delete restrict,
  attraction_id text references public.attractions(id) on delete restrict,
  slot text not null check (slot in ('hero','gallery')),
  position integer not null default 0 check (position >= 0),
  publication_status text not null default 'draft' check (publication_status in ('draft','published','archived')),
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (num_nonnulls(destination_id, attraction_id) = 1),
  check (slot <> 'hero' or position = 0)
);
create unique index photo_destination_slot on public.photo_assignments(destination_id, slot, position) where destination_id is not null;
create unique index photo_attraction_slot on public.photo_assignments(attraction_id, slot, position) where attraction_id is not null;
create table public.partner_links (
  id text primary key,
  destination_id text not null references public.destinations(id) on delete restrict,
  attraction_id text,
  provider_id text not null check (provider_id in ('booking','viator','tripadvisor','getyourguide','google-maps')),
  action text not null check (action in ('accommodation','tours','reviews','directions')),
  language text not null check (language in ('en','hu')),
  url text not null check (url ~ '^https://[^[:space:]@]+$'),
  enabled boolean not null default false,
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','rejected')),
  verified_at date, reviewed_by text, evidence_url text, documentation_url text,
  affiliate boolean not null default false,
  -- Public identifier configuration only; secrets belong in server secret storage, never this table.
  tracking_config jsonb,
  editorial_notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  foreign key (attraction_id, destination_id) references public.attractions(id, destination_id) on delete restrict,
  check (not enabled or ((approval_status = 'approved' and verified_at is not null and length(trim(reviewed_by)) > 0 and evidence_url ~ '^https://' and documentation_url ~ '^https://') is true)),
  -- Affiliate activation is deliberately unsupported by this database foundation.
  check (not enabled or not affiliate),
  check (not enabled or url ~ (case provider_id
    when 'booking' then '^https://www[.]booking[.]com/'
    when 'viator' then '^https://www[.]viator[.]com/'
    when 'tripadvisor' then '^https://www[.]tripadvisor[.]com/'
    when 'getyourguide' then '^https://www[.]getyourguide[.]com/'
    when 'google-maps' then '^https://www[.]google[.]com/maps/' end)),
  check ((provider_id = 'booking' and action = 'accommodation') or (provider_id in ('viator','getyourguide') and action = 'tours') or (provider_id = 'tripadvisor' and action = 'reviews') or (provider_id = 'google-maps' and action = 'directions'))
);
create unique index partner_destination_action on public.partner_links(destination_id, provider_id, action, language) where attraction_id is null;
create unique index partner_attraction_action on public.partner_links(attraction_id, provider_id, action, language) where attraction_id is not null;
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (char_length(display_name) between 1 and 80),
  preferred_language text not null default 'en' check (preferred_language in ('en','hu')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.user_saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  destination_id text references public.destinations(id) on delete restrict,
  attraction_id text references public.attractions(id) on delete restrict,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (num_nonnulls(destination_id, attraction_id) = 1)
);
create unique index saved_destination_unique on public.user_saved_items(user_id, destination_id) where destination_id is not null;
create unique index saved_attraction_unique on public.user_saved_items(user_id, attraction_id) where attraction_id is not null;
create table public.user_trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 120),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (id,user_id)
);
create table public.user_trip_items (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null,
  user_id uuid not null,
  destination_id text references public.destinations(id) on delete restrict,
  attraction_id text references public.attractions(id) on delete restrict,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  foreign key (trip_id,user_id) references public.user_trips(id,user_id) on delete cascade,
  check (num_nonnulls(destination_id, attraction_id) = 1),
  unique(trip_id,position)
);
create unique index trip_destination_unique on public.user_trip_items(trip_id,destination_id) where destination_id is not null;
create unique index trip_attraction_unique on public.user_trip_items(trip_id,attraction_id) where attraction_id is not null;

alter table public.content_sources enable row level security;
revoke all on public.content_sources from public, anon, authenticated;
grant select, insert, update, delete on public.content_sources to authenticated;
create trigger touch_updated_at before update on public.content_sources for each row execute function travel_private.touch_updated_at();

alter table public.destinations enable row level security;
revoke all on public.destinations from public, anon, authenticated;
grant select, insert, update, delete on public.destinations to authenticated;
create trigger touch_updated_at before update on public.destinations for each row execute function travel_private.touch_updated_at();

alter table public.destination_translations enable row level security;
revoke all on public.destination_translations from public, anon, authenticated;
grant select, insert, update, delete on public.destination_translations to authenticated;
create trigger touch_updated_at before update on public.destination_translations for each row execute function travel_private.touch_updated_at();

alter table public.attractions enable row level security;
revoke all on public.attractions from public, anon, authenticated;
grant select, insert, update, delete on public.attractions to authenticated;
create trigger touch_updated_at before update on public.attractions for each row execute function travel_private.touch_updated_at();

alter table public.attraction_translations enable row level security;
revoke all on public.attraction_translations from public, anon, authenticated;
grant select, insert, update, delete on public.attraction_translations to authenticated;
create trigger touch_updated_at before update on public.attraction_translations for each row execute function travel_private.touch_updated_at();

alter table public.destination_sources enable row level security;
revoke all on public.destination_sources from public, anon, authenticated;
grant select, insert, update, delete on public.destination_sources to authenticated;
create trigger touch_updated_at before update on public.destination_sources for each row execute function travel_private.touch_updated_at();

alter table public.attraction_sources enable row level security;
revoke all on public.attraction_sources from public, anon, authenticated;
grant select, insert, update, delete on public.attraction_sources to authenticated;
create trigger touch_updated_at before update on public.attraction_sources for each row execute function travel_private.touch_updated_at();

alter table public.photos enable row level security;
revoke all on public.photos from public, anon, authenticated;
grant select, insert, update, delete on public.photos to authenticated;
create trigger touch_updated_at before update on public.photos for each row execute function travel_private.touch_updated_at();

alter table public.photo_assignments enable row level security;
revoke all on public.photo_assignments from public, anon, authenticated;
grant select, insert, update, delete on public.photo_assignments to authenticated;
create trigger touch_updated_at before update on public.photo_assignments for each row execute function travel_private.touch_updated_at();

alter table public.partner_links enable row level security;
revoke all on public.partner_links from public, anon, authenticated;
grant select, insert, update, delete on public.partner_links to authenticated;
create trigger touch_updated_at before update on public.partner_links for each row execute function travel_private.touch_updated_at();

alter table public.profiles enable row level security;
revoke all on public.profiles from public, anon, authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
create trigger touch_updated_at before update on public.profiles for each row execute function travel_private.touch_updated_at();

alter table public.user_saved_items enable row level security;
revoke all on public.user_saved_items from public, anon, authenticated;
grant select, insert, update, delete on public.user_saved_items to authenticated;
create trigger touch_updated_at before update on public.user_saved_items for each row execute function travel_private.touch_updated_at();

alter table public.user_trips enable row level security;
revoke all on public.user_trips from public, anon, authenticated;
grant select, insert, update, delete on public.user_trips to authenticated;
create trigger touch_updated_at before update on public.user_trips for each row execute function travel_private.touch_updated_at();

alter table public.user_trip_items enable row level security;
revoke all on public.user_trip_items from public, anon, authenticated;
grant select, insert, update, delete on public.user_trip_items to authenticated;
create trigger touch_updated_at before update on public.user_trip_items for each row execute function travel_private.touch_updated_at();
create policy admin_content on public.content_sources for all to authenticated
using ((select travel_private.is_admin())) with check ((select travel_private.is_admin()));
create policy admin_content on public.destinations for all to authenticated
using ((select travel_private.is_admin())) with check ((select travel_private.is_admin()));
create policy admin_content on public.destination_translations for all to authenticated
using ((select travel_private.is_admin())) with check ((select travel_private.is_admin()));
create policy admin_content on public.attractions for all to authenticated
using ((select travel_private.is_admin())) with check ((select travel_private.is_admin()));
create policy admin_content on public.attraction_translations for all to authenticated
using ((select travel_private.is_admin())) with check ((select travel_private.is_admin()));
create policy admin_content on public.destination_sources for all to authenticated
using ((select travel_private.is_admin())) with check ((select travel_private.is_admin()));
create policy admin_content on public.attraction_sources for all to authenticated
using ((select travel_private.is_admin())) with check ((select travel_private.is_admin()));
create policy admin_content on public.photos for all to authenticated
using ((select travel_private.is_admin())) with check ((select travel_private.is_admin()));
create policy admin_content on public.photo_assignments for all to authenticated
using ((select travel_private.is_admin())) with check ((select travel_private.is_admin()));
create policy admin_content on public.partner_links for all to authenticated
using ((select travel_private.is_admin())) with check ((select travel_private.is_admin()));
create policy own_data on public.profiles for all to authenticated
using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy own_data on public.user_saved_items for all to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy own_data on public.user_trips for all to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy own_data on public.user_trip_items for all to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create index attractions_destination_id_idx on public.attractions(destination_id);
create index destination_sources_source_id_idx on public.destination_sources(source_id);
create index attraction_sources_source_id_idx on public.attraction_sources(source_id);
create index photo_assignments_photo_id_idx on public.photo_assignments(photo_id);
create index photo_assignments_attraction_id_idx on public.photo_assignments(attraction_id);
create index partner_links_attraction_id_idx on public.partner_links(attraction_id);
create index user_saved_items_user_id_idx on public.user_saved_items(user_id);
create index user_trips_user_id_idx on public.user_trips(user_id);
create index user_trip_items_user_id_idx on public.user_trip_items(user_id);
create index user_saved_items_destination_id_idx on public.user_saved_items(destination_id);
create index user_saved_items_attraction_id_idx on public.user_saved_items(attraction_id);
create index user_trip_items_destination_id_idx on public.user_trip_items(destination_id);
create index user_trip_items_attraction_id_idx on public.user_trip_items(attraction_id);
create index destinations_publication_idx on public.destinations(publication_status,approval_status);
create index attractions_publication_idx on public.attractions(destination_id,publication_status,approval_status);
-- Prevent newly added tables/functions from inheriting broad API grants.
alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;
commit;
