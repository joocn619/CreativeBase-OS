-- CreativeBase OS Phase 1 Core Schema
-- Safe to run multiple times (uses IF NOT EXISTS where possible)

begin;

create extension if not exists pgcrypto;

-- -----------------------------
-- 1) Core identity + workspace
-- -----------------------------

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text not null default 'owner' check (role in ('owner', 'admin', 'editor', 'viewer')),
  created_at timestamptz not null default now()
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references public.users(id) on delete cascade,
  stripe_customer_id text,
  subscription_plan text default 'free',
  subscription_status text default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('owner', 'admin', 'editor', 'viewer')),
  invited_at timestamptz not null default now(),
  unique (team_id, user_id)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

-- -----------------------------
-- 2) Content system
-- -----------------------------

create table if not exists public.folders (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  name text not null,
  parent_id uuid references public.folders(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.content (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  type text not null check (type in ('hook', 'script', 'caption', 'repurposed')),
  title text,
  data jsonb not null,
  folder_id uuid references public.folders(id) on delete set null,
  tags text[] default '{}',
  version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -----------------------------
-- 3) AI usage + billing
-- -----------------------------

create table if not exists public.ai_requests (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  feature text not null,
  credits_used int not null check (credits_used >= 0),
  input_summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null unique references public.teams(id) on delete cascade,
  stripe_subscription_id text,
  plan text not null default 'free',
  credit_limit int not null default 50,
  credits_used int not null default 0,
  period_start timestamptz,
  period_end timestamptz,
  status text not null default 'active',
  check (credit_limit >= 0),
  check (credits_used >= 0)
);

-- -----------------------------
-- 4) Utility trigger functions
-- -----------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_set_updated_at on public.content;
create trigger content_set_updated_at
before update on public.content
for each row execute function public.set_updated_at();

-- -----------------------------
-- 5) Helpful indexes
-- -----------------------------

create index if not exists idx_team_members_user_id on public.team_members(user_id);
create index if not exists idx_projects_team_id on public.projects(team_id);
create index if not exists idx_folders_team_id on public.folders(team_id);
create index if not exists idx_content_team_id on public.content(team_id);
create index if not exists idx_content_user_id on public.content(user_id);
create index if not exists idx_content_type on public.content(type);
create index if not exists idx_content_created_at on public.content(created_at desc);
create index if not exists idx_ai_requests_team_id on public.ai_requests(team_id);
create index if not exists idx_ai_requests_created_at on public.ai_requests(created_at desc);
create index if not exists idx_subscriptions_team_id on public.subscriptions(team_id);

-- -----------------------------
-- 6) RLS helper functions
-- -----------------------------

create or replace function public.is_team_member(target_team_id uuid, target_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.team_members tm
    where tm.team_id = target_team_id
      and tm.user_id = coalesce(target_user_id, auth.uid())
  );
$$;

create or replace function public.has_team_role(
  target_team_id uuid,
  allowed_roles text[],
  target_user_id uuid default auth.uid()
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.team_members tm
    where tm.team_id = target_team_id
      and tm.user_id = coalesce(target_user_id, auth.uid())
      and tm.role = any(allowed_roles)
  );
$$;

grant execute on function public.is_team_member(uuid, uuid) to authenticated;
grant execute on function public.has_team_role(uuid, text[], uuid) to authenticated;

-- -----------------------------
-- 7) Enable RLS
-- -----------------------------

alter table public.users enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.projects enable row level security;
alter table public.folders enable row level security;
alter table public.content enable row level security;
alter table public.ai_requests enable row level security;
alter table public.subscriptions enable row level security;

-- -----------------------------
-- 8) RLS policies
-- -----------------------------

-- users
drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
on public.users
for select
to authenticated
using (id = auth.uid());

drop policy if exists "users_insert_own" on public.users;
create policy "users_insert_own"
on public.users
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own"
on public.users
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- teams
drop policy if exists "teams_select_member" on public.teams;
create policy "teams_select_member"
on public.teams
for select
to authenticated
using (public.is_team_member(id));

drop policy if exists "teams_insert_owner" on public.teams;
create policy "teams_insert_owner"
on public.teams
for insert
to authenticated
with check (owner_id = auth.uid());

drop policy if exists "teams_update_admin_owner" on public.teams;
create policy "teams_update_admin_owner"
on public.teams
for update
to authenticated
using (public.has_team_role(id, array['owner','admin']))
with check (public.has_team_role(id, array['owner','admin']));

-- team_members
drop policy if exists "team_members_select_member" on public.team_members;
create policy "team_members_select_member"
on public.team_members
for select
to authenticated
using (public.is_team_member(team_id));

drop policy if exists "team_members_insert_admin_owner" on public.team_members;
create policy "team_members_insert_admin_owner"
on public.team_members
for insert
to authenticated
with check (public.has_team_role(team_id, array['owner','admin']));

drop policy if exists "team_members_update_admin_owner" on public.team_members;
create policy "team_members_update_admin_owner"
on public.team_members
for update
to authenticated
using (public.has_team_role(team_id, array['owner','admin']))
with check (public.has_team_role(team_id, array['owner','admin']));

drop policy if exists "team_members_delete_admin_owner" on public.team_members;
create policy "team_members_delete_admin_owner"
on public.team_members
for delete
to authenticated
using (public.has_team_role(team_id, array['owner','admin']));

-- projects
drop policy if exists "projects_select_member" on public.projects;
create policy "projects_select_member"
on public.projects
for select
to authenticated
using (public.is_team_member(team_id));

drop policy if exists "projects_insert_editor_plus" on public.projects;
create policy "projects_insert_editor_plus"
on public.projects
for insert
to authenticated
with check (public.has_team_role(team_id, array['owner','admin','editor']));

drop policy if exists "projects_update_editor_plus" on public.projects;
create policy "projects_update_editor_plus"
on public.projects
for update
to authenticated
using (public.has_team_role(team_id, array['owner','admin','editor']))
with check (public.has_team_role(team_id, array['owner','admin','editor']));

drop policy if exists "projects_delete_admin_owner" on public.projects;
create policy "projects_delete_admin_owner"
on public.projects
for delete
to authenticated
using (public.has_team_role(team_id, array['owner','admin']));

-- folders
drop policy if exists "folders_select_member" on public.folders;
create policy "folders_select_member"
on public.folders
for select
to authenticated
using (public.is_team_member(team_id));

drop policy if exists "folders_insert_editor_plus" on public.folders;
create policy "folders_insert_editor_plus"
on public.folders
for insert
to authenticated
with check (public.has_team_role(team_id, array['owner','admin','editor']));

drop policy if exists "folders_update_editor_plus" on public.folders;
create policy "folders_update_editor_plus"
on public.folders
for update
to authenticated
using (public.has_team_role(team_id, array['owner','admin','editor']))
with check (public.has_team_role(team_id, array['owner','admin','editor']));

drop policy if exists "folders_delete_admin_owner" on public.folders;
create policy "folders_delete_admin_owner"
on public.folders
for delete
to authenticated
using (public.has_team_role(team_id, array['owner','admin']));

-- content
drop policy if exists "content_select_member" on public.content;
create policy "content_select_member"
on public.content
for select
to authenticated
using (public.is_team_member(team_id));

drop policy if exists "content_insert_editor_plus" on public.content;
create policy "content_insert_editor_plus"
on public.content
for insert
to authenticated
with check (public.has_team_role(team_id, array['owner','admin','editor']));

drop policy if exists "content_update_editor_plus" on public.content;
create policy "content_update_editor_plus"
on public.content
for update
to authenticated
using (public.has_team_role(team_id, array['owner','admin','editor']))
with check (public.has_team_role(team_id, array['owner','admin','editor']));

drop policy if exists "content_delete_admin_owner" on public.content;
create policy "content_delete_admin_owner"
on public.content
for delete
to authenticated
using (public.has_team_role(team_id, array['owner','admin']));

-- ai_requests
drop policy if exists "ai_requests_select_member" on public.ai_requests;
create policy "ai_requests_select_member"
on public.ai_requests
for select
to authenticated
using (public.is_team_member(team_id));

drop policy if exists "ai_requests_insert_editor_plus" on public.ai_requests;
create policy "ai_requests_insert_editor_plus"
on public.ai_requests
for insert
to authenticated
with check (public.has_team_role(team_id, array['owner','admin','editor']));

-- subscriptions
drop policy if exists "subscriptions_select_member" on public.subscriptions;
create policy "subscriptions_select_member"
on public.subscriptions
for select
to authenticated
using (public.is_team_member(team_id));

drop policy if exists "subscriptions_insert_admin_owner" on public.subscriptions;
create policy "subscriptions_insert_admin_owner"
on public.subscriptions
for insert
to authenticated
with check (public.has_team_role(team_id, array['owner','admin']));

drop policy if exists "subscriptions_update_admin_owner" on public.subscriptions;
create policy "subscriptions_update_admin_owner"
on public.subscriptions
for update
to authenticated
using (public.has_team_role(team_id, array['owner','admin']))
with check (public.has_team_role(team_id, array['owner','admin']));

commit;
