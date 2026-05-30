
-- Team Members
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL DEFAULT '',
  department text NOT NULL DEFAULT 'executive',
  photo_url text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  linkedin_url text NOT NULL DEFAULT '',
  is_leadership boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO anon, authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "team open read"  ON public.team_members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "team open write" ON public.team_members FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "team open update" ON public.team_members FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "team open delete" ON public.team_members FOR DELETE TO anon, authenticated USING (true);

-- Job Listings
CREATE TABLE public.job_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL DEFAULT 'legal',
  location text NOT NULL DEFAULT 'Denver, CO',
  type text NOT NULL DEFAULT 'Full-time',
  status text NOT NULL DEFAULT 'open',
  posted_date date NOT NULL DEFAULT current_date,
  apply_url text NOT NULL DEFAULT '#',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_listings TO anon, authenticated;
GRANT ALL ON public.job_listings TO service_role;
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "jobs open read"   ON public.job_listings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "jobs open insert" ON public.job_listings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "jobs open update" ON public.job_listings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "jobs open delete" ON public.job_listings FOR DELETE TO anon, authenticated USING (true);

-- Legislative Wins
CREATE TABLE public.legislative_wins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_number text NOT NULL,
  title text NOT NULL,
  year integer NOT NULL DEFAULT 2024,
  short_description text NOT NULL DEFAULT '',
  full_description text NOT NULL DEFAULT '',
  bill_url text NOT NULL DEFAULT '',
  factsheet_url text NOT NULL DEFAULT '',
  photo_url text NOT NULL DEFAULT '',
  is_spotlight boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legislative_wins TO anon, authenticated;
GRANT ALL ON public.legislative_wins TO service_role;
ALTER TABLE public.legislative_wins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leg open read"   ON public.legislative_wins FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "leg open insert" ON public.legislative_wins FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "leg open update" ON public.legislative_wins FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "leg open delete" ON public.legislative_wins FOR DELETE TO anon, authenticated USING (true);
