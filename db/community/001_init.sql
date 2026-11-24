-- Community CRM schema for Found For AI + Fripse AI.
-- The application source of truth is the JSON document in community_state.
-- When DATABASE_URL is set, the app creates community_state if needed and
-- mirrors rows into the tables below. Run this file yourself after you
-- provision Postgres (Neon or another provider). Do not commit credentials.
--
-- psql "$DATABASE_URL" -f db/community/001_init.sql

create table if not exists community_state (
  id text primary key,
  doc jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists community_events (
  id text primary key,
  title text not null,
  description text not null,
  host_brand text not null check (host_brand in ('foundforai', 'fripse')),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  time_zone text not null default 'America/Denver',
  venue text,
  online_url text,
  capacity integer,
  registration_status text not null check (registration_status in ('open', 'closed')),
  topic text not null,
  instructor text not null,
  image text,
  registration_url text
);

create table if not exists community_organizations (
  id text primary key,
  name text not null,
  category text,
  source_brand text not null,
  created_at timestamptz not null
);

create table if not exists community_contacts (
  id text primary key,
  email text not null,
  email_normalized text not null unique,
  name text not null,
  business_name text,
  business_category text,
  organization_id text,
  source_brand text not null,
  created_at timestamptz not null,
  updated_at timestamptz not null
);

create table if not exists community_registrations (
  id text primary key,
  contact_id text not null,
  event_id text not null,
  learning_goals text,
  source_brand text not null,
  created_at timestamptz not null,
  unique (contact_id, event_id)
);

create table if not exists community_attendance (
  id text primary key,
  registration_id text not null unique,
  status text not null check (status in ('unknown', 'attended', 'no_show')),
  updated_at timestamptz not null
);

create table if not exists community_interests (
  id text primary key,
  contact_id text not null,
  kind text not null,
  value text not null,
  source_brand text not null,
  created_at timestamptz not null
);

create table if not exists community_partners (
  id text primary key,
  name text not null,
  organization_type text not null,
  status text not null,
  notes text not null default '',
  source_brand text not null,
  created_at timestamptz not null,
  updated_at timestamptz not null
);

create table if not exists community_follow_ups (
  id text primary key,
  contact_id text not null unique,
  status text not null,
  note text not null default '',
  updated_at timestamptz not null
);

create table if not exists community_consents (
  id text primary key,
  contact_id text not null,
  registration_id text,
  hosting_request_id text,
  consent_type text not null,
  granted boolean not null,
  source_brand text not null,
  created_at timestamptz not null,
  withdrawn_at timestamptz,
  token text not null unique
);

create table if not exists community_assessment_requests (
  id text primary key,
  contact_id text,
  name text not null,
  email text not null,
  business_name text,
  notes text not null default '',
  originating_brand text not null,
  created_at timestamptz not null
);

create table if not exists community_hosting_requests (
  id text primary key,
  contact_id text not null,
  name text not null,
  email text not null,
  business_name text,
  message text not null,
  source_brand text not null,
  created_at timestamptz not null
);

create table if not exists community_testimonials (
  id text primary key,
  quote text not null,
  attribution text not null,
  detail text,
  approved boolean not null default false,
  publishing_permission boolean not null default false,
  source_brand text not null,
  created_at timestamptz not null
);

-- Commercial records stay in their own table. Do not insert a row here
-- because someone registered for a workshop.
create table if not exists community_opportunities (
  id text primary key,
  originating_brand text not null,
  kind text not null,
  status text not null,
  title text not null,
  notes text not null default '',
  contact_email text,
  created_at timestamptz not null,
  updated_at timestamptz not null
);

create table if not exists community_feedback (
  id text primary key,
  event_id text,
  note text not null,
  source_brand text not null,
  created_at timestamptz not null
);

create table if not exists community_outcomes (
  id text primary key,
  note text not null,
  source_brand text not null,
  created_at timestamptz not null
);
