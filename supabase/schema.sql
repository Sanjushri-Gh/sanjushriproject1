-- Run this in the Supabase SQL editor after creating your project.
create table public.supporter_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text,
  created_at timestamptz not null default now()
);

alter table public.supporter_messages enable row level security;

-- The public website may submit a message, but cannot read supporter details.
create policy "Allow public message submissions"
on public.supporter_messages
for insert
to anon
with check (true);
