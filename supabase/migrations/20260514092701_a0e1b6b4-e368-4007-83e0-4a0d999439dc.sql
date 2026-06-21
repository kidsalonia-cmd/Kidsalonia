-- Sessions table first so the helper function can reference it
create table public.seo_admin_sessions (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  ip text,
  user_agent text
);
alter table public.seo_admin_sessions enable row level security;

-- Helper: validate admin session token from request header
create or replace function public.is_seo_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1 from public.seo_admin_sessions
    where token = nullif(current_setting('request.headers', true)::jsonb->>'x-admin-token', '')
      and expires_at > now()
  )
$$;

create policy "admin can read own sessions"
  on public.seo_admin_sessions for select
  using (public.is_seo_admin());

create table public.seo_settings (
  id integer primary key default 1,
  blog_approval_required boolean not null default true,
  last_auto_run_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint seo_settings_singleton check (id = 1)
);
alter table public.seo_settings enable row level security;
create policy "seo admin all" on public.seo_settings for all
  using (public.is_seo_admin()) with check (public.is_seo_admin());
insert into public.seo_settings (id, blog_approval_required) values (1, true) on conflict (id) do nothing;

create table public.seo_tasks (
  id uuid primary key default gen_random_uuid(),
  scheduled_date date,
  week integer not null default 1,
  section text not null,
  category text not null,
  deliverable_type text,
  priority text not null default 'medium',
  effort_minutes integer not null default 30,
  title text not null,
  description text,
  target_url text,
  target_keyword text,
  secondary_keywords text[],
  page_title text,
  meta_description text,
  content_brief text,
  status text not null default 'todo',
  completed_at timestamptz,
  completed_by text,
  notes text,
  blog_slug text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index seo_tasks_scheduled on public.seo_tasks(scheduled_date);
alter table public.seo_tasks enable row level security;
create policy "seo admin all" on public.seo_tasks for all
  using (public.is_seo_admin()) with check (public.is_seo_admin());

create table public.seo_blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  url text not null,
  title text not null,
  meta_description text,
  primary_keyword text,
  secondary_keywords text[],
  body_md text not null default '',
  scheduled_date date,
  status text not null default 'draft',
  client_notes text,
  internal_notes text,
  approved_at timestamptz,
  approved_by text,
  deployed_at timestamptz,
  read_minutes integer,
  created_at timestamptz not null default now()
);
alter table public.seo_blog_posts enable row level security;
create policy "seo admin all" on public.seo_blog_posts for all
  using (public.is_seo_admin()) with check (public.is_seo_admin());