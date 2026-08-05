# UM Racing Team — Database Schema Proposal (Draft for Review)

Status: **proposal only** — no migrations, no SQL DDL, nothing applied to Supabase. This document exists to align on tables, columns, and relationships before any implementation.

## Open questions (need a decision before implementation)

- Can a user hold more than one role at once (e.g. `dept_head` + `finance`)? This draft assumes **yes** (see RBAC notes).
- Is `car_updates` a chronological build-log/feed (multiple posts over time) or a single editable page per car? This draft assumes a **feed**.
- Does `sponsors.amount_contributed` need row/column-level restriction beyond role-based table access (e.g. hidden from `dept_head`, visible only to `finance`/`admin`/`director`)?
- Should `applications` store a resume file directly in Supabase Storage (`resume_url` pointing at a storage bucket) — assumed yes here — or collect resume info as plain text?

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

1. Review and resolve the open questions above.
2. Translate this into actual SQL migrations / Supabase schema.
3. Design RLS policies per table per role.
4. Wire up a server-side Supabase client (`src/lib/`) for privileged operations (e.g. using `SUPABASE_SERVICE_ROLE_KEY`).
