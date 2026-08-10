-- AfriEstate production hardening migration.
-- Apply after supabase_complete_schema.sql or to an existing project with equivalent tables.

-- 0) Align role enum with application roles.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_type') THEN
    ALTER TYPE public.role_type ADD VALUE IF NOT EXISTS 'user';
  END IF;
END $$;

-- 1) Remove legacy plaintext password auth surface.
ALTER TABLE IF EXISTS public.profiles DROP COLUMN IF EXISTS password;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS is_verified boolean NOT NULL DEFAULT false;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS office_address text;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS company_name text;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS profile_picture text;

-- 2) Normalize frontend/backend column names used by the React data layer.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tour_requests' AND column_name = 'client_username') THEN
    ALTER TABLE public.tour_requests RENAME COLUMN client_username TO username;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tour_requests' AND column_name = 'tour_date') THEN
    ALTER TABLE public.tour_requests RENAME COLUMN tour_date TO date;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tour_requests' AND column_name = 'tour_time') THEN
    ALTER TABLE public.tour_requests RENAME COLUMN tour_time TO time;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'messages' AND column_name = 'sender') THEN
    ALTER TABLE public.messages RENAME COLUMN sender TO sender_username;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'messages' AND column_name = 'receiver') THEN
    ALTER TABLE public.messages RENAME COLUMN receiver TO receiver_username;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'messages' AND column_name = 'message') THEN
    ALTER TABLE public.messages RENAME COLUMN message TO text;
  END IF;
END $$;

-- 3) Deal/portfolio foundations for investor-agent data sharing.
CREATE TABLE IF NOT EXISTS public.investment_deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id text REFERENCES public.properties(id) ON DELETE CASCADE,
  agent_username text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'open', 'funding', 'closed', 'archived')),
  minimum_commitment numeric NOT NULL DEFAULT 0,
  target_raise numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.investor_commitments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid NOT NULL REFERENCES public.investment_deals(id) ON DELETE CASCADE,
  investor_username text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  amount numeric NOT NULL CHECK (amount > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'funded', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (deal_id, investor_username)
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_username text REFERENCES public.profiles(username) ON DELETE SET NULL,
  action text NOT NULL,
  entity_table text NOT NULL,
  entity_id text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.investment_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_commitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 4) Replace prototype public policies with role-aware RLS.
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', pol.policyname, pol.schemaname, pol.tablename);
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION public.current_username()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(auth.jwt() ->> 'email', auth.uid()::text)
$$;

CREATE OR REPLACE FUNCTION public.current_role()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(auth.jwt() -> 'user_metadata' ->> 'role', 'user')
$$;

-- Profiles
CREATE POLICY profiles_select_own_or_public_agents ON public.profiles
  FOR SELECT USING (username = public.current_username() OR role IN ('agent', 'investor'));
CREATE POLICY profiles_insert_own ON public.profiles
  FOR INSERT WITH CHECK (username = public.current_username() OR id = auth.uid());
CREATE POLICY profiles_update_own ON public.profiles
  FOR UPDATE USING (username = public.current_username() OR id = auth.uid())
  WITH CHECK (username = public.current_username() OR id = auth.uid());

-- Properties: public can read active listings; agents own writes by agent_name.
CREATE POLICY properties_select_active ON public.properties
  FOR SELECT USING (status = 'Active' OR agent_name = public.current_username());
CREATE POLICY properties_insert_agent_own ON public.properties
  FOR INSERT WITH CHECK (public.current_role() = 'agent' AND agent_name = public.current_username());
CREATE POLICY properties_update_agent_own ON public.properties
  FOR UPDATE USING (agent_name = public.current_username()) WITH CHECK (agent_name = public.current_username());
CREATE POLICY properties_delete_agent_own ON public.properties
  FOR DELETE USING (agent_name = public.current_username());

-- Per-user private tables.
CREATE POLICY own_saved_properties ON public.saved_properties FOR ALL USING (username = public.current_username()) WITH CHECK (username = public.current_username());
CREATE POLICY own_saved_searches ON public.saved_searches FOR ALL USING (username = public.current_username()) WITH CHECK (username = public.current_username());
CREATE POLICY own_calendar_events ON public.calendar_events FOR ALL USING (username = public.current_username()) WITH CHECK (username = public.current_username());
CREATE POLICY own_notifications ON public.notifications FOR ALL USING (username = public.current_username()) WITH CHECK (username = public.current_username());
CREATE POLICY own_investor_settings ON public.investor_settings FOR ALL USING (username = public.current_username()) WITH CHECK (username = public.current_username());
CREATE POLICY own_user_documents ON public.user_documents FOR ALL USING (username = public.current_username()) WITH CHECK (username = public.current_username());
CREATE POLICY own_property_alerts ON public.property_alerts FOR ALL USING (username = public.current_username()) WITH CHECK (username = public.current_username());

-- Reviews: authenticated users create their own reviews; agents can read their reviews.
CREATE POLICY reviews_read_relevant ON public.reviews FOR SELECT USING (agent_name = public.current_username() OR reviewer_username = public.current_username());
CREATE POLICY reviews_insert_own ON public.reviews FOR INSERT WITH CHECK (reviewer_username = public.current_username());

-- Agent profiles.
CREATE POLICY agent_profiles_read ON public.agent_profiles FOR SELECT USING (true);
CREATE POLICY agent_profiles_write_own ON public.agent_profiles FOR ALL USING (username = public.current_username()) WITH CHECK (username = public.current_username());

-- Tour requests: requester and property owner can see them.
CREATE POLICY tour_requests_read_relevant ON public.tour_requests FOR SELECT USING (
  username = public.current_username()
  OR EXISTS (SELECT 1 FROM public.properties p WHERE p.id = tour_requests.property_id AND p.agent_name = public.current_username())
);
CREATE POLICY tour_requests_insert_own ON public.tour_requests FOR INSERT WITH CHECK (username = public.current_username());
CREATE POLICY tour_requests_update_relevant ON public.tour_requests FOR UPDATE USING (
  username = public.current_username()
  OR EXISTS (SELECT 1 FROM public.properties p WHERE p.id = tour_requests.property_id AND p.agent_name = public.current_username())
);

-- Messages: sender and receiver only.
CREATE POLICY messages_read_participants ON public.messages FOR SELECT USING (sender_username = public.current_username() OR receiver_username = public.current_username());
CREATE POLICY messages_insert_sender ON public.messages FOR INSERT WITH CHECK (sender_username = public.current_username());
CREATE POLICY messages_update_participants ON public.messages FOR UPDATE USING (sender_username = public.current_username() OR receiver_username = public.current_username());

-- Investment requests: investors own creates; agents can read/respond.
CREATE POLICY investment_requests_read_investor_or_agent ON public.investment_requests FOR SELECT USING (investor_username = public.current_username() OR public.current_role() = 'agent');
CREATE POLICY investment_requests_insert_investor ON public.investment_requests FOR INSERT WITH CHECK (public.current_role() = 'investor' AND investor_username = public.current_username());
CREATE POLICY investment_requests_update_agent ON public.investment_requests FOR UPDATE USING (public.current_role() = 'agent');

-- Investment deals and commitments.
CREATE POLICY investment_deals_read_open_or_owner ON public.investment_deals FOR SELECT USING (status IN ('open', 'funding', 'closed') OR agent_username = public.current_username());
CREATE POLICY investment_deals_write_agent_own ON public.investment_deals FOR ALL USING (agent_username = public.current_username()) WITH CHECK (public.current_role() = 'agent' AND agent_username = public.current_username());
CREATE POLICY investor_commitments_read_relevant ON public.investor_commitments FOR SELECT USING (
  investor_username = public.current_username()
  OR EXISTS (SELECT 1 FROM public.investment_deals d WHERE d.id = investor_commitments.deal_id AND d.agent_username = public.current_username())
);
CREATE POLICY investor_commitments_insert_own ON public.investor_commitments FOR INSERT WITH CHECK (public.current_role() = 'investor' AND investor_username = public.current_username());
CREATE POLICY investor_commitments_update_agent_or_owner ON public.investor_commitments FOR UPDATE USING (
  investor_username = public.current_username()
  OR EXISTS (SELECT 1 FROM public.investment_deals d WHERE d.id = investor_commitments.deal_id AND d.agent_username = public.current_username())
);

-- Service listings remain public-read but owner-write where username/user_id is available.
CREATE POLICY car_rentals_public_read ON public.car_rentals FOR SELECT USING (true);
CREATE POLICY wellness_services_public_read ON public.wellness_services FOR SELECT USING (true);
CREATE POLICY audit_logs_select_actor ON public.audit_logs FOR SELECT USING (actor_username = public.current_username());
CREATE POLICY audit_logs_insert_actor ON public.audit_logs FOR INSERT WITH CHECK (actor_username = public.current_username());

-- Biometric KYC verification records for FaceOnLive-backed identity checks.
-- The FaceOnLive Windows SDK should run in a private backend worker/service; the browser stores only
-- provider references and normalized scores so raw biometric templates are never exposed to clients.
create table if not exists public.kyc_verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  username text not null unique,
  role text not null check (role in ('user', 'agent', 'investor')),
  status text not null default 'Pending Review' check (status in ('Not Started', 'Pending Review', 'Needs Manual Review', 'Approved', 'Rejected')),
  provider text not null default 'FaceOnLive Face Recognition SDK for Windows',
  repository_url text not null default 'https://github.com/FaceOnLive/Face-Recognition-SDK-Windows.git',
  face_match_score numeric(5,4),
  liveness_score numeric(5,4),
  provider_reference text,
  document_type text,
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.kyc_verifications enable row level security;

drop policy if exists "kyc owner can read own verification" on public.kyc_verifications;
create policy "kyc owner can read own verification"
  on public.kyc_verifications for select
  using (auth.uid() = user_id or auth.jwt() ->> 'email' = username);

drop policy if exists "kyc owner can submit own verification" on public.kyc_verifications;
create policy "kyc owner can submit own verification"
  on public.kyc_verifications for insert
  with check (auth.uid() = user_id and auth.jwt() ->> 'email' = username);

drop policy if exists "kyc owner can refresh pending verification" on public.kyc_verifications;
create policy "kyc owner can refresh pending verification"
  on public.kyc_verifications for update
  using (auth.uid() = user_id and status in ('Not Started', 'Pending Review', 'Needs Manual Review'))
  with check (auth.uid() = user_id and username = auth.jwt() ->> 'email');

create index if not exists idx_kyc_verifications_username on public.kyc_verifications(username);
create index if not exists idx_kyc_verifications_user_id on public.kyc_verifications(user_id);
create index if not exists idx_kyc_verifications_status on public.kyc_verifications(status);

alter table public.profiles
  add column if not exists kyc_status text not null default 'Not Started'
  check (kyc_status in ('Not Started', 'Pending Review', 'Needs Manual Review', 'Approved', 'Rejected'));
