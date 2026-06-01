ALTER PUBLICATION supabase_realtime ADD TABLE public.job_listings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.legislative_wins;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_members;
ALTER TABLE public.job_listings REPLICA IDENTITY FULL;
ALTER TABLE public.legislative_wins REPLICA IDENTITY FULL;
ALTER TABLE public.team_members REPLICA IDENTITY FULL;