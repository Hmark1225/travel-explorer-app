begin;
-- Private items may reference only publicly available content when inserted or moved.
-- Owners can still read/remove their own old items after content is unpublished.
drop policy own_data on public.user_saved_items;
create policy saved_read on public.user_saved_items for select to authenticated using (user_id = (select auth.uid()));
create policy saved_delete on public.user_saved_items for delete to authenticated using (user_id = (select auth.uid()));
create policy saved_insert on public.user_saved_items for insert to authenticated with check (
  user_id = (select auth.uid()) and (
    destination_id in (select id from public.travel_destinations) or attraction_id in (select id from public.travel_attractions)
  )
);
create policy saved_update on public.user_saved_items for update to authenticated using (user_id = (select auth.uid())) with check (
  user_id = (select auth.uid()) and (
    destination_id in (select id from public.travel_destinations) or attraction_id in (select id from public.travel_attractions)
  )
);
drop policy own_data on public.user_trip_items;
create policy item_read on public.user_trip_items for select to authenticated using (user_id = (select auth.uid()));
create policy item_delete on public.user_trip_items for delete to authenticated using (user_id = (select auth.uid()));
create policy item_insert on public.user_trip_items for insert to authenticated with check (
  user_id = (select auth.uid()) and (
    destination_id in (select id from public.travel_destinations) or attraction_id in (select id from public.travel_attractions)
  )
);
create policy item_update on public.user_trip_items for update to authenticated using (user_id = (select auth.uid())) with check (
  user_id = (select auth.uid()) and (
    destination_id in (select id from public.travel_destinations) or attraction_id in (select id from public.travel_attractions)
  )
);
-- Explicit server-only grants. Never use the service-role credential in Expo.
grant usage on schema travel_private to service_role;
grant all on public.content_sources, public.destinations, public.destination_translations, public.attractions, public.attraction_translations, public.destination_sources, public.attraction_sources, public.photos, public.photo_assignments, public.partner_links, public.profiles, public.user_saved_items, public.user_trips, public.user_trip_items to service_role;
grant select on public.travel_destinations, public.travel_attractions, public.travel_photos to service_role;
grant all on all tables in schema travel_private to service_role;
grant execute on all functions in schema travel_private to service_role;
commit;
