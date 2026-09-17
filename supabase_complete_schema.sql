-- =======================================================================================
-- AFRIESTATE — COMPLETE BACKEND SUPABASE DATABASE SCHEMA
-- =======================================================================================
-- INSTRUCTIONS:
-- 1. Open your Supabase Dashboard (https://supabase.com).
-- 2. Go to the "SQL Editor" tab from the left sidebar.
-- 3. Click "New Query" and paste the ENTIRE contents of this file.
-- 4. Click the "Run" button to execute and provision all enums, tables, and policies.
-- =======================================================================================

-- --------------------------------------------------
-- A. CASCADE DROP EXISTING SCHEMAS (CLEAN INITIALIZATION)
-- --------------------------------------------------
DROP TABLE IF EXISTS public.property_alerts CASCADE;
DROP TABLE IF EXISTS public.user_documents CASCADE;
DROP TABLE IF EXISTS public.investment_requests CASCADE;
DROP TABLE IF EXISTS public.investor_settings CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.calendar_events CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.tour_requests CASCADE;
DROP TABLE IF EXISTS public.saved_searches CASCADE;
DROP TABLE IF EXISTS public.saved_properties CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.agent_profiles CASCADE;
DROP TABLE IF EXISTS public.properties CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.car_rentals CASCADE;
DROP TABLE IF EXISTS public.wellness_services CASCADE;

DROP TYPE IF EXISTS public.role_type CASCADE;
DROP TYPE IF EXISTS public.listing_type_enum CASCADE;
DROP TYPE IF EXISTS public.property_type_enum CASCADE;
DROP TYPE IF EXISTS public.property_status_enum CASCADE;
DROP TYPE IF EXISTS public.notification_type CASCADE;
DROP TYPE IF EXISTS public.service_status CASCADE;
DROP TYPE IF EXISTS public.vehicle_transmission CASCADE;

-- --------------------------------------------------
-- B. CREATE CUSTOM TYPES & ENUMS
-- --------------------------------------------------
CREATE TYPE public.role_type AS ENUM ('super_admin', 'agent', 'client', 'investor');
CREATE TYPE public.listing_type_enum AS ENUM ('All', 'For Rent', 'For Sale', 'For Investment');
CREATE TYPE public.property_type_enum AS ENUM (
  'All Types', 'Apartment', 'House', 'Commercial', 'Student Housing', 
  'Township Home', 'Rural Property', 'Land', 'Luxury Estate', 
  'In Construction', 'Short-term Stay', 'Hotel', 'Transport Rental', 'Wellness Retreat'
);
CREATE TYPE public.property_status_enum AS ENUM ('Active', 'Draft', 'Pending Approval', 'Expired', 'Sold');
CREATE TYPE public.notification_type AS ENUM ('info', 'alert', 'message', 'tour');
CREATE TYPE public.service_status AS ENUM ('pending_review', 'active', 'suspended', 'archived');
CREATE TYPE public.vehicle_transmission AS ENUM ('auto', 'manual');

-- --------------------------------------------------
-- C. TABLES PROVISIONING
-- --------------------------------------------------

-- 1. Profiles Table
CREATE TABLE public.profiles (
  username text NOT NULL PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  role public.role_type NOT NULL DEFAULT 'client',
  phone text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Properties Table
CREATE TABLE public.properties (
  id text NOT NULL PRIMARY KEY,
  title text NOT NULL,
  listing_type public.listing_type_enum NOT NULL DEFAULT 'All',
  property_type public.property_type_enum NOT NULL DEFAULT 'All Types',
  address jsonb NOT NULL DEFAULT '{}'::jsonb,
  coordinates jsonb NOT NULL DEFAULT '{}'::jsonb,
  price numeric NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  description text NOT NULL,
  neighborhood_info text,
  amenities text[] DEFAULT '{}'::text[],
  images text[] DEFAULT '{}'::text[],
  virtual_tour_url text,
  vr_tour_url text,
  agent_name text,
  featured boolean NOT NULL DEFAULT false,
  verified boolean NOT NULL DEFAULT false,
  smart_contract_ready boolean DEFAULT false,
  views integer NOT NULL DEFAULT 0,
  status public.property_status_enum NOT NULL DEFAULT 'Active',
  date_listed bigint NOT NULL,
  saves integer NOT NULL DEFAULT 0,
  purchase_price numeric,
  price_history jsonb[] DEFAULT '{}'::jsonb[],
  occupancy_rate numeric,
  market_roi numeric,
  financials jsonb[] DEFAULT '{}'::jsonb[],
  guests integer,
  vehicle_type text,
  package_includes text[] DEFAULT '{}'::text[],
  per_night_price boolean DEFAULT false
);

-- 3. Agent Profiles Table
CREATE TABLE public.agent_profiles (
  username text NOT NULL PRIMARY KEY REFERENCES public.profiles(username) ON DELETE CASCADE,
  bio text,
  email text,
  phone text,
  profile_picture text,
  socials jsonb DEFAULT '{}'::jsonb,
  listings_count integer DEFAULT 0,
  sales_completed integer DEFAULT 0,
  active_since text
);

-- 4. Reviews Table
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_name text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  reviewer_username text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 5. Saved Properties Table
CREATE TABLE public.saved_properties (
  username text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  property_id text NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (username, property_id)
);

-- 6. Saved Searches Table
CREATE TABLE public.saved_searches (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  name text,
  filters jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 7. Tour Requests Table
CREATE TABLE public.tour_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id text NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  property_title text NOT NULL,
  client_username text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text,
  tour_date text NOT NULL,
  tour_time text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 8. Messages Table
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id text REFERENCES public.properties(id) ON DELETE SET NULL,
  property_title text,
  sender text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  receiver text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  message text NOT NULL,
  timestamp bigint NOT NULL,
  is_read boolean NOT NULL DEFAULT false
);

-- 9. Calendar Events Table
CREATE TABLE public.calendar_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  title text NOT NULL,
  date text NOT NULL,
  start_time text NOT NULL,
  end_time text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 10. Notifications Table
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  type public.notification_type NOT NULL DEFAULT 'info',
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 11. Investor Settings Table
CREATE TABLE public.investor_settings (
  username text NOT NULL PRIMARY KEY REFERENCES public.profiles(username) ON DELETE CASCADE,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb
);

-- 12. Investment Requests Table
CREATE TABLE public.investment_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  investor_username text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  request_details text NOT NULL,
  timestamp bigint NOT NULL,
  status text NOT NULL DEFAULT 'pending'
);

-- 13. User Documents Table
CREATE TABLE public.user_documents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  upload_date text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  url text NOT NULL
);

-- 14. Property Alerts Table
CREATE TABLE public.property_alerts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  name text NOT NULL,
  criteria jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 15. Car Rentals Table
CREATE TABLE public.car_rentals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  business_name varchar(255) NOT NULL,
  trading_name varchar(255),
  registration_number varchar(100),
  vat_number varchar(100),
  business_type varchar(100) NOT NULL,
  contact_person varchar(255) NOT NULL,
  mobile_number varchar(50) NOT NULL,
  whatsapp_number varchar(50) NOT NULL,
  email_address varchar(255) NOT NULL,
  website varchar(255),
  country varchar(100) NOT NULL,
  province varchar(100) NOT NULL,
  city varchar(100) NOT NULL,
  pickup_address text NOT NULL,
  vehicle_title varchar(255) NOT NULL,
  vehicle_category varchar(100) NOT NULL,
  vehicle_make_model varchar(255) NOT NULL,
  vehicle_year integer NOT NULL,
  transmission public.vehicle_transmission NOT NULL DEFAULT 'auto',
  daily_rate decimal(12, 2) NOT NULL,
  currency varchar(10) DEFAULT 'ZAR',
  description text NOT NULL,
  images text[] DEFAULT '{}'::text[],
  is_verified boolean DEFAULT false,
  status public.service_status DEFAULT 'pending_review',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 16. Wellness Services Table
CREATE TABLE public.wellness_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL REFERENCES public.profiles(username) ON DELETE CASCADE,
  business_name varchar(255) NOT NULL,
  trading_name varchar(255),
  registration_number varchar(100),
  wellness_category varchar(100) NOT NULL,
  contact_person varchar(255) NOT NULL,
  mobile_number varchar(50) NOT NULL,
  whatsapp_number varchar(50) NOT NULL,
  email_address varchar(255) NOT NULL,
  website varchar(255),
  country varchar(100) NOT NULL,
  province varchar(100),
  city varchar(100) NOT NULL,
  physical_address text,
  description text NOT NULL,
  images text[] DEFAULT '{}'::text[],
  is_verified boolean DEFAULT false,
  status public.service_status DEFAULT 'pending_review',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------
-- D. ROW LEVEL SECURITY (RLS) & SECURE POLICIES
-- --------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_services ENABLE ROW LEVEL SECURITY;

-- Helper function to get the current authenticated user's username
-- This function returns the email from auth.users which serves as the username
CREATE OR REPLACE FUNCTION public.current_username()
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT email FROM auth.users WHERE id = auth.uid()
$$;

-- Profiles: Users can only read and update their own profile
-- Note: Profile creation should be handled by an auth trigger, not directly by users
CREATE POLICY "profiles: read own" ON public.profiles FOR SELECT TO authenticated 
  USING (username = public.current_username());
CREATE POLICY "profiles: update own" ON public.profiles FOR UPDATE TO authenticated 
  USING (username = public.current_username()) 
  WITH CHECK (username = public.current_username());

-- Properties: Public can read active properties, agents can manage their own listings
CREATE POLICY "properties: public active read" ON public.properties FOR SELECT 
  USING (status = 'Active');
CREATE POLICY "properties: agent manage own" ON public.properties FOR ALL TO authenticated
  USING (agent_name = public.current_username()) 
  WITH CHECK (agent_name = public.current_username());

-- Agent Profiles: Public can read, agents can manage their own profile
CREATE POLICY "agent_profiles: public read" ON public.agent_profiles FOR SELECT 
  USING (true);
CREATE POLICY "agent_profiles: owner manage" ON public.agent_profiles FOR ALL TO authenticated
  USING (username = public.current_username()) 
  WITH CHECK (username = public.current_username());

-- Reviews: Public can read, authenticated users can create reviews under their own identity
CREATE POLICY "reviews: public read" ON public.reviews FOR SELECT 
  USING (true);
CREATE POLICY "reviews: author creates" ON public.reviews FOR INSERT TO authenticated 
  WITH CHECK (reviewer_username = public.current_username());

-- Saved Properties: Users can only access their own saved properties
CREATE POLICY "saved_properties: owner only" ON public.saved_properties FOR ALL TO authenticated
  USING (username = public.current_username()) 
  WITH CHECK (username = public.current_username());

-- Saved Searches: Users can only access their own saved searches
CREATE POLICY "saved_searches: owner only" ON public.saved_searches FOR ALL TO authenticated
  USING (username = public.current_username()) 
  WITH CHECK (username = public.current_username());

-- Tour Requests: Requester and property agent can read/update, requester can create
CREATE POLICY "tours: requester or listing agent reads" ON public.tour_requests FOR SELECT TO authenticated 
  USING (
    client_username = public.current_username() OR EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND p.agent_name = public.current_username()
    )
  );
CREATE POLICY "tours: requester creates" ON public.tour_requests FOR INSERT TO authenticated
  WITH CHECK (client_username = public.current_username());
CREATE POLICY "tours: requester or listing agent updates" ON public.tour_requests FOR UPDATE TO authenticated 
  USING (
    client_username = public.current_username() OR EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND p.agent_name = public.current_username()
    )
  );

-- Messages: Participants can read, sender can create, receiver can update (mark as read)
CREATE POLICY "messages: participants read" ON public.messages FOR SELECT TO authenticated
  USING (sender = public.current_username() OR receiver = public.current_username());
CREATE POLICY "messages: sender creates" ON public.messages FOR INSERT TO authenticated
  WITH CHECK (sender = public.current_username());
CREATE POLICY "messages: receiver updates" ON public.messages FOR UPDATE TO authenticated
  USING (receiver = public.current_username()) 
  WITH CHECK (receiver = public.current_username());

-- Calendar Events: Users can only access their own calendar events
CREATE POLICY "calendar: owner only" ON public.calendar_events FOR ALL TO authenticated
  USING (username = public.current_username()) 
  WITH CHECK (username = public.current_username());

-- Notifications: Users can only read their own notifications and update read status
CREATE POLICY "notifications: recipient only" ON public.notifications FOR SELECT TO authenticated 
  USING (username = public.current_username());
CREATE POLICY "notifications: recipient read state" ON public.notifications FOR UPDATE TO authenticated 
  USING (username = public.current_username()) 
  WITH CHECK (username = public.current_username());

-- Investor Settings: Users can only access their own settings
CREATE POLICY "settings: owner only" ON public.investor_settings FOR ALL TO authenticated
  USING (username = public.current_username()) 
  WITH CHECK (username = public.current_username());

-- Investment Requests: Investor can access their own requests
CREATE POLICY "investment_requests: investor only" ON public.investment_requests FOR ALL TO authenticated
  USING (investor_username = public.current_username()) 
  WITH CHECK (investor_username = public.current_username());

-- User Documents: Users can only access their own documents
CREATE POLICY "documents: owner only" ON public.user_documents FOR ALL TO authenticated
  USING (username = public.current_username()) 
  WITH CHECK (username = public.current_username());

-- Property Alerts: Users can only access their own alerts
CREATE POLICY "alerts: owner only" ON public.property_alerts FOR ALL TO authenticated
  USING (username = public.current_username()) 
  WITH CHECK (username = public.current_username());

-- Car Rentals: Public can read active/verified rentals, owners can manage their own
CREATE POLICY "car_rentals: public read active" ON public.car_rentals FOR SELECT 
  USING (status = 'active' AND is_verified = true);
CREATE POLICY "car_rentals: owner manage" ON public.car_rentals FOR ALL TO authenticated
  USING (user_id = public.current_username()) 
  WITH CHECK (user_id = public.current_username());

-- Wellness Services: Public can read active/verified services, owners can manage their own
CREATE POLICY "wellness_services: public read active" ON public.wellness_services FOR SELECT 
  USING (status = 'active' AND is_verified = true);
CREATE POLICY "wellness_services: owner manage" ON public.wellness_services FOR ALL TO authenticated
  USING (user_id = public.current_username()) 
  WITH CHECK (user_id = public.current_username());

-- =======================================================================================
-- SYSTEM INITIATION COMPLETE
-- =======================================================================================
