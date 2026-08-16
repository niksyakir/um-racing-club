# UM Racing Team — Database Schema Proposal (Draft for Review)

Status: **proposal only** — no migrations, no SQL DDL, nothing applied to Supabase. This document exists to align on tables, columns, and relationships before any implementation.

## Resolved decisions

- **A user can hold more than one role at once** (e.g. `dept_head` +
  `finance`) — confirmed. `users` / `roles` / `user_roles` are
  implemented as drafted below (not a single `role` column), specifically
  to support this. See the SQL appendix for the finalized DDL, trigger,
  and baseline RLS — implemented as part of the RBAC/`/dashboard` gating
  work (`src/proxy.js`, `src/lib/auth/getRole.js`).

- **`applications` stores resumes in Supabase Storage** — confirmed. A
  private `resumes` bucket, uploaded by the `submitApplication` Server
  Action (`src/app/apply/actions.js`), read via 10-minute signed URLs
  generated in `src/app/dashboard/applications/page.js`. See the
  appendix for the bucket + storage policies.

## Open questions (need a decision before implementation)

- Is `car_updates` a chronological build-log/feed (multiple posts over time) or a single editable page per car? This draft assumes a **feed**.
- Does `sponsors.amount_contributed` need row/column-level restriction beyond role-based table access (e.g. hidden from `dept_head`, visible only to `finance`/`admin`/`director`)?

---

## Tables

### `users`
Public-schema profile row, extending Supabase's built-in `auth.users`.

| Column | Notes |
|---|---|
| `id` | PK, FK → `auth.users.id` |
| `full_name` | |
| `email` | |
| `student_id` | university student ID |
| `department_id` | FK → `departments.id`, nullable (home department) |
| `avatar_url` | |
| `phone` | |
| `is_active` | boolean |
| `joined_at` | |
| `created_at` / `updated_at` | |

### `roles`
Lookup table (not a Postgres enum — see RBAC notes).

| Column | Notes |
|---|---|
| `id` | PK |
| `name` | unique — `admin`, `director`, `finance`, `dept_head`, `member` |
| `description` | |
| `created_at` | |

### `user_roles`
Join table connecting `users` ↔ `roles` (many-to-many).

| Column | Notes |
|---|---|
| `user_id` | FK → `users.id` |
| `role_id` | FK → `roles.id` |
| `assigned_at` | |
| `assigned_by` | FK → `users.id`, nullable |

Composite PK: `(user_id, role_id)`.

### `departments`

| Column | Notes |
|---|---|
| `id` | PK |
| `name` | unique, e.g. "Chassis", "Powertrain", "Business" |
| `description` | |
| `dept_head_id` | FK → `users.id`, nullable |
| `created_at` / `updated_at` | |

### `sponsors`

| Column | Notes |
|---|---|
| `id` | PK |
| `name` | |
| `tier` | check constraint: `platinum` / `gold` / `silver` / `bronze` / `in-kind` |
| `logo_url` | |
| `website_url` | |
| `description` | |
| `contact_name` / `contact_email` | |
| `contract_start_date` / `contract_end_date` | |
| `amount_contributed` | numeric — finance-sensitive, see open questions |
| `department_id` | FK → `departments.id`, nullable |
| `is_active` | boolean |
| `created_by` | FK → `users.id` |
| `created_at` / `updated_at` | |

### `achievements`

| Column | Notes |
|---|---|
| `id` | PK |
| `title` | |
| `description` | |
| `category` | e.g. competition, award, milestone |
| `date_achieved` | |
| `competition_name` | |
| `placement` | e.g. "1st", "Top 10" |
| `department_id` | FK → `departments.id`, nullable |
| `image_url` | |
| `is_published` | boolean — gates public visibility |
| `created_by` | FK → `users.id` |
| `created_at` / `updated_at` | |

### `applications`
Recruitment submissions from the public `/apply` page.

| Column | Notes |
|---|---|
| `id` | PK |
| `applicant_name` | |
| `applicant_email` | |
| `student_id` | |
| `department_applied_id` | FK → `departments.id` |
| `motivation_text` | |
| `resume_url` | Supabase Storage reference |
| `status` | `pending` / `under_review` / `accepted` / `rejected` / `waitlisted` |
| `reviewed_by` | FK → `users.id`, nullable |
| `reviewed_at` | |
| `submitted_at` | |
| `created_at` / `updated_at` | |

### `car_updates`
Build-log content backing `/current-car` and `/future-car`.

| Column | Notes |
|---|---|
| `id` | PK |
| `title` | |
| `content` | |
| `car_type` | `current` / `future` |
| `department_id` | FK → `departments.id`, nullable |
| `author_id` | FK → `users.id` |
| `image_urls` | array/jsonb |
| `is_published` | boolean — gates public visibility |
| `published_at` | |
| `created_at` / `updated_at` | |

---

## Relationships

- `users.department_id → departments.id`
- `departments.dept_head_id → users.id`
- `user_roles` bridges `users ↔ roles` (many-to-many)
- `sponsors.department_id`, `achievements.department_id`, `car_updates.department_id → departments.id`
- `applications.department_applied_id → departments.id`
- `applications.reviewed_by → users.id`
- `car_updates.author_id → users.id`

---

## RBAC notes

**Roles:** `admin`, `director`, `finance`, `dept_head`, `member`, `public`.

- `roles` is a **lookup table + join table**, not a Postgres enum. This lets new roles be added later without an `ALTER TYPE` migration, and lets one user hold multiple roles (e.g. a department head who is also on the finance team) — something a single enum column on `users` can't represent cleanly.
- `public` is **not a row in any table**. It represents unauthenticated access via Supabase's `anon` key, enforced entirely through Row Level Security (RLS) policies that expose only published/public rows (e.g. `sponsors`, `achievements`, `car_updates` where `is_published = true`). It never appears as a foreign key value.
- Actual RLS policy design (per-table policies, helper functions like `has_role(role_name)`) is intentionally **out of scope for this document** — a follow-up phase once the table shapes above are agreed on.

---

## Next steps (not part of this session)

1. Review and resolve the remaining open question above (`car_updates` shape).
2. Translate `departments`, `sponsors`, `achievements`, `applications`, `car_updates` into actual SQL migrations.
3. Design RLS policies for those tables per role (draft examples for `sponsors`/`achievements` proposed alongside the RBAC work below — not yet applied).

`users` / `roles` / `user_roles` and a server-side Supabase client
(`src/lib/supabase/server.js`) are done — see the appendix below.

---

## Appendix: finalized RBAC SQL (`users` / `roles` / `user_roles`)

Status: **proposed, not yet applied to Supabase** — written alongside
`src/proxy.js` and `src/lib/auth/getRole.js`, which gate `/dashboard` to
`admin`/`director`/`finance`/`dept_head` (`member` is signed-in but
redirected to `/unauthorized`). Run this in the Supabase SQL editor when
ready. Scoped to what RBAC needs today — `student_id`, `department_id`,
`avatar_url`, `phone` from the `users` table above can be added later
once `departments` exists (`department_id` is an FK to a table that
doesn't exist yet, so it's omitted here to keep this block runnable
standalone).

```sql
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

insert into public.roles (name, description) values
  ('admin', 'Full administrative access'),
  ('director', 'Team director'),
  ('finance', 'Finance/treasury access'),
  ('dept_head', 'Department head'),
  ('member', 'General team member');

create table public.user_roles (
  user_id uuid not null references public.users(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  assigned_by uuid references public.users(id),
  primary key (user_id, role_id)
);
```

**Trigger** — auto-create a `users` row + default `member` role on signup:

```sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');

  insert into public.user_roles (user_id, role_id)
  select new.id, id from public.roles where name = 'member';

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

Elevated roles (`admin`/`director`/`finance`/`dept_head`) are assigned by
adding extra `user_roles` rows manually — there's no self-service signup
flow for those, matching the "create accounts manually in Supabase"
pattern already used for auth.

**One-time backfill** — the trigger only fires on new `auth.users`
inserts. Any account created via the dashboard *before* the trigger
existed won't have a matching `public.users`/`user_roles` row. Run this
once after creating the trigger to catch up any existing accounts:

```sql
insert into public.users (id, email, full_name)
select id, email, raw_user_meta_data->>'full_name'
from auth.users
where id not in (select id from public.users);

insert into public.user_roles (user_id, role_id)
select u.id, r.id
from public.users u
join public.roles r on r.name = 'member'
where u.id not in (select user_id from public.user_roles);
```

Then promote specific accounts out of the default `member` role as
needed, e.g.:

```sql
update public.user_roles
set role_id = (select id from public.roles where name = 'admin')
where user_id = (select id from auth.users where email = 'your-test-email@example.com');
```

**Baseline RLS**:

```sql
alter table public.users enable row level security;
alter table public.roles enable row level security;
alter table public.user_roles enable row level security;

create policy "users can view own profile"
  on public.users for select using (id = auth.uid());

create policy "roles are readable by authenticated users"
  on public.roles for select to authenticated using (true);

create policy "users can view own role assignments"
  on public.user_roles for select using (user_id = auth.uid());
```

**Role-check helper** (used by future RLS policies on other tables to
avoid recursive RLS lookups):

```sql
create or replace function public.user_has_role(role_names text[])
returns boolean
language sql security definer set search_path = public stable
as $$
  select exists (
    select 1 from public.user_roles ur
    join public.roles r on r.id = ur.role_id
    where ur.user_id = auth.uid() and r.name = any(role_names)
  );
$$;
```

### Proposed RLS for `sponsors` / `achievements` (not yet applied)

These tables don't exist in Supabase yet — current data is hardcoded in
`src/app/sponsors/data.js` / `src/app/achievements/data.js`. The `create
table` statements below must run **before** the RLS policies further
down (the policies reference these tables, and `sponsors.created_by` /
`achievements.created_by` reference `public.users`, so the RBAC
appendix above needs to be applied first too). `department_id` is
omitted from both tables for the same reason it's omitted from `users`
— `departments` doesn't exist yet; add it later with `alter table ...
add column department_id uuid references departments(id)`.

```sql
create table public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tier text check (tier in ('platinum','gold','silver','bronze','in-kind')),
  logo_url text,
  website_url text,
  description text,
  contact_name text,
  contact_email text,
  contract_start_date date,
  contract_end_date date,
  amount_contributed numeric,
  is_active boolean not null default true,
  created_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  date_achieved date,
  competition_name text,
  placement text,
  image_url text,
  is_published boolean not null default true,
  created_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Reads stay public (marketing/results data); writes are role-gated via
`user_has_role()`:

```sql
alter table public.sponsors enable row level security;

create policy "sponsors are publicly readable"
  on public.sponsors for select using (true);

create policy "admins, directors, and finance can add sponsors"
  on public.sponsors for insert
  with check (public.user_has_role(array['admin','director','finance']));

create policy "admins, directors, and finance can update sponsors"
  on public.sponsors for update
  using (public.user_has_role(array['admin','director','finance']))
  with check (public.user_has_role(array['admin','director','finance']));

create policy "admins can delete sponsors"
  on public.sponsors for delete
  using (public.user_has_role(array['admin']));
```

```sql
alter table public.achievements enable row level security;

create policy "achievements are publicly readable"
  on public.achievements for select using (true);

create policy "admins and directors can add achievements"
  on public.achievements for insert
  with check (public.user_has_role(array['admin','director']));

create policy "admins and directors can update achievements"
  on public.achievements for update
  using (public.user_has_role(array['admin','director']))
  with check (public.user_has_role(array['admin','director']));

create policy "admins can delete achievements"
  on public.achievements for delete
  using (public.user_has_role(array['admin']));
```

Resolved: `finance` can add/update `sponsors` alongside `admin`/`director`
(contributions are finance-adjacent) — delete stays `admin`-only.

---

## Appendix 2: dashboard build SQL (not yet applied)

Written alongside the admin dashboard (`src/app/dashboard/*`) and the
real Apply form (`src/app/apply/actions.js`). Run in the Supabase SQL
editor when ready — nothing here has been applied automatically.

### Fix: `achievements` policies need `dept_head`, not `director`

The dashboard's Achievements section is role-gated to `admin`/`dept_head`
(`ACHIEVEMENTS_ROLES` in `src/lib/auth/roles.js`), but the policies
written earlier only grant insert/update to `admin`/`director`. Update
them:

```sql
drop policy "admins and directors can add achievements" on public.achievements;
create policy "admins and dept heads can add achievements"
  on public.achievements for insert
  with check (public.user_has_role(array['admin','dept_head']));

drop policy "admins and directors can update achievements" on public.achievements;
create policy "admins and dept heads can update achievements"
  on public.achievements for update
  using (public.user_has_role(array['admin','dept_head']))
  with check (public.user_has_role(array['admin','dept_head']));
```

### `applications` table + RLS

Doesn't exist yet — only described in the draft table list above.
`department_applied` is plain text (matching the department *names*
already in `src/app/apply/data.js`), not a FK — no `departments` table
exists yet, same reasoning as `sponsors.department_id`/
`achievements.department_id` above.

```sql
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  applicant_name text not null,
  applicant_email text not null,
  student_id text,
  department_applied text not null,
  motivation_text text,
  resume_url text,
  status text not null default 'pending'
    check (status in ('pending','under_review','accepted','rejected','waitlisted')),
  reviewed_by uuid references public.users(id),
  reviewed_at timestamptz,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.applications enable row level security;

create policy "anyone can submit an application"
  on public.applications for insert to public with check (true);

create policy "admins and dept heads can view applications"
  on public.applications for select
  using (public.user_has_role(array['admin','dept_head']));

create policy "admins and dept heads can update applications"
  on public.applications for update
  using (public.user_has_role(array['admin','dept_head']))
  with check (public.user_has_role(array['admin','dept_head']));

create policy "admins can delete applications"
  on public.applications for delete
  using (public.user_has_role(array['admin']));
```

Insert is open to `public` (anon + authenticated) deliberately —
applying to join the team must work for people who don't have an
account yet.

### Storage bucket for resumes

Private bucket — only `admin`/`dept_head` can read uploaded resumes;
anyone can upload (submitting an application).

```sql
insert into storage.buckets (id, name, public) values ('resumes', 'resumes', false);

create policy "anyone can upload a resume"
  on storage.objects for insert to public
  with check (bucket_id = 'resumes');

create policy "admins and dept heads can view resumes"
  on storage.objects for select
  using (bucket_id = 'resumes' and public.user_has_role(array['admin','dept_head']));

create policy "admins can delete resumes"
  on storage.objects for delete
  using (bucket_id = 'resumes' and public.user_has_role(array['admin']));
```

### Admin-wide access to `users` / `user_roles`

The baseline RLS in Appendix 1 only lets each user see their own
`users`/`user_roles` row. The dashboard's Users & Roles section
(`admin`-only) needs to see and manage *every* account. Postgres RLS
OR's multiple permissive policies together per command, so these add
admin-wide access without touching the existing self-only policies:

```sql
create policy "admins can view all profiles"
  on public.users for select
  using (public.user_has_role(array['admin']));

create policy "admins can assign roles"
  on public.user_roles for insert
  with check (public.user_has_role(array['admin']));

create policy "admins can remove role assignments"
  on public.user_roles for delete
  using (public.user_has_role(array['admin']));
```

Role changes in the dashboard are full-replace (delete all of a user's
`user_roles` rows, then re-insert the checked ones) rather than
diffed updates, so no `update` policy on `user_roles` is needed.

### `event_countdown` (Home page countdown widget)

Singleton-style table — the dashboard's Event Countdown section
(`dept_head`/`director`/`admin`) always edits the one existing row; the
Server Action (`src/app/dashboard/event/actions.js`) inserts it on first
save if no row exists yet, otherwise updates it. The Home page reads it
publicly to render the countdown; if the table is empty, that section of
the Home page simply doesn't render.

```sql
create table public.event_countdown (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  event_at timestamptz not null,
  updated_at timestamptz not null default now()
);

alter table public.event_countdown enable row level security;

create policy "anyone can view the event countdown"
  on public.event_countdown for select
  using (true);

create policy "dept heads and above can manage the event countdown"
  on public.event_countdown for all
  using (public.user_has_role(array['admin','director','dept_head']))
  with check (public.user_has_role(array['admin','director','dept_head']));
```

Optional: seed an initial row so the countdown shows something before
anyone edits it via the dashboard (edit the name/date to taste, or skip
this and just set it from `/dashboard/event` after logging in):

```sql
insert into public.event_countdown (name, event_at)
values ('NxGV Challenge 2026', '2026-11-01T09:00:00+08:00');
```

### Self-service profile (name, phone, avatar, password)

New columns on `public.users`, plus a same-block backfill so existing
accounts aren't retroactively nagged by the new "complete your profile"
banner — only accounts created *after* this migration (via
`createTeamMember`) start at the new default `profile_completed = false`:

```sql
alter table public.users
  add column phone text,
  add column avatar_url text,
  add column profile_completed boolean not null default false;

update public.users set profile_completed = true;
```

Today `public.users` only has a self-`select` policy — members can't
update their own row yet. This is safe as a blanket per-row policy
because the only code path that writes to it (`src/app/profile/actions.js`)
controls exactly which columns get sent — never `is_active`, `email`,
or anything role-related:

```sql
create policy "users can update own profile"
  on public.users for update
  using (id = auth.uid()) with check (id = auth.uid());
```

New `avatars` storage bucket — **public**, unlike the private `resumes`
bucket, since a profile photo isn't sensitive the way application PII
is, and public avoids needing signed-URL refresh logic everywhere a
photo is displayed. Uploads are written to `{user_id}/filename`, so the
per-folder policy scopes each user to only their own files:

```sql
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

create policy "anyone can view avatars"
  on storage.objects for select using (bucket_id = 'avatars');

create policy "users can manage their own avatar"
  on storage.objects for all to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
```
