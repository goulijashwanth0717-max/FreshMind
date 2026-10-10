-- FreshMind - Zero-Waste Grocery Agentic AI
-- Supabase Schema: fm_users & fm_logs

create extension if not exists "pgcrypto";

-- Table: fm_users
create table if not exists public.fm_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  mobile text not null,
  password_hash text not null,
  store_id text default 'Store_1_HYD',
  role text default 'Perishables Planner',
  created_at timestamp default now(),
  last_login timestamp,
  login_count int default 0
);

-- Enable RLS
alter table public.fm_users enable row level security;

-- Policy for anon (Hackathon speed)
drop policy if exists "allow all for anon" on public.fm_users;
create policy "allow all for anon" on public.fm_users for all using (true) with check (true);

-- Table: fm_logs
create table if not exists public.fm_logs (
  id uuid primary key default gen_random_uuid(),
  user_email text,
  action text,
  alert_id text,
  details jsonb,
  created_at timestamp default now()
);

-- Enable RLS for logs
alter table public.fm_logs enable row level security;

-- Policy for anon on fm_logs
drop policy if exists "allow all for anon on logs" on public.fm_logs;
create policy "allow all for anon on logs" on public.fm_logs for all using (true) with check (true);
