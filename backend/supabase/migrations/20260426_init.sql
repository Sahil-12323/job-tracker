create extension if not exists "pgcrypto";

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_name text not null,
  role text not null,
  status text not null check (status in ('Applied', 'Screening', 'Interview', 'Offer', 'Rejected')),
  applied_date date not null,
  job_link text,
  notes text,
  resume_version text,
  follow_up_date date,
  source text not null check (source in ('manual', 'email', 'share', 'screenshot')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.detection_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null check (source in ('email', 'share', 'screenshot')),
  raw_text text not null,
  parsed_company text not null,
  parsed_role text not null,
  parsed_date date not null,
  created_at timestamptz not null default now()
);

alter table public.applications enable row level security;
alter table public.detection_events enable row level security;

create policy "users read own applications"
  on public.applications for select
  using (auth.uid() = user_id);

create policy "users write own applications"
  on public.applications for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users read own detections"
  on public.detection_events for select
  using (auth.uid() = user_id);

create policy "users write own detections"
  on public.detection_events for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_applications_updated
before update on public.applications
for each row
execute function public.set_updated_at();
