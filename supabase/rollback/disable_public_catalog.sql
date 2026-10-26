-- Non-destructive emergency stop. First release/configure the app to use bundled content.
-- Run through a privileged database connection after reviewing operational impact.
-- Does not delete or alter content, translations, approvals, accounts or private collections.
begin;
revoke select on public.travel_destinations, public.travel_attractions, public.travel_photos from anon, authenticated;
commit;
