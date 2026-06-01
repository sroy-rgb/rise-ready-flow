-- 1. Roles infrastructure
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2. team_members — public read, admin write
DROP POLICY IF EXISTS "team open read"   ON public.team_members;
DROP POLICY IF EXISTS "team open write"  ON public.team_members;
DROP POLICY IF EXISTS "team open update" ON public.team_members;
DROP POLICY IF EXISTS "team open delete" ON public.team_members;

CREATE POLICY "team public read"
ON public.team_members FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "team admin insert"
ON public.team_members FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "team admin update"
ON public.team_members FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "team admin delete"
ON public.team_members FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. job_listings — public read, admin write
DROP POLICY IF EXISTS "jobs open read"   ON public.job_listings;
DROP POLICY IF EXISTS "jobs open insert" ON public.job_listings;
DROP POLICY IF EXISTS "jobs open update" ON public.job_listings;
DROP POLICY IF EXISTS "jobs open delete" ON public.job_listings;

CREATE POLICY "jobs public read"
ON public.job_listings FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "jobs admin insert"
ON public.job_listings FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "jobs admin update"
ON public.job_listings FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "jobs admin delete"
ON public.job_listings FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4. legislative_wins — public read, admin write
DROP POLICY IF EXISTS "leg open read"   ON public.legislative_wins;
DROP POLICY IF EXISTS "leg open insert" ON public.legislative_wins;
DROP POLICY IF EXISTS "leg open update" ON public.legislative_wins;
DROP POLICY IF EXISTS "leg open delete" ON public.legislative_wins;

CREATE POLICY "leg public read"
ON public.legislative_wins FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "leg admin insert"
ON public.legislative_wins FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "leg admin update"
ON public.legislative_wins FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "leg admin delete"
ON public.legislative_wins FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 5. page_content — public read, admin write
DROP POLICY IF EXISTS "page_content public read"   ON public.page_content;
DROP POLICY IF EXISTS "page_content public insert" ON public.page_content;
DROP POLICY IF EXISTS "page_content public update" ON public.page_content;
DROP POLICY IF EXISTS "page_content public delete" ON public.page_content;

CREATE POLICY "page_content public read"
ON public.page_content FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "page_content admin insert"
ON public.page_content FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "page_content admin update"
ON public.page_content FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "page_content admin delete"
ON public.page_content FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 6. Realtime — deny all channel subscriptions by default
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "deny all realtime by default" ON realtime.messages;
CREATE POLICY "deny all realtime by default"
ON realtime.messages
FOR SELECT
TO anon, authenticated
USING (false);
