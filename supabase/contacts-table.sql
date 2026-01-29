-- Run this in Supabase SQL Editor to create the contacts table.
-- Dashboard → SQL Editor → New query → paste and run.

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  agreed_newsletter boolean not null default false,
  agreed_personal_data boolean not null default false,
  created_at timestamptz not null default now()
);

-- Optional: disable public read/write; API uses service_role which bypasses RLS
alter table public.contacts enable row level security;

create policy "No public access"
  on public.contacts
  for all
  using (false)
  with check (false);
