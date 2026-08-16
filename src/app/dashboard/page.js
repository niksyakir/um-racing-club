import { redirect } from "next/navigation";
import Link from "next/link";
import Card from "@/components/Card";
import { getRoles } from "@/lib/auth/getRole";
import {
  DASHBOARD_ROLES,
  SPONSORS_ROLES,
  ACHIEVEMENTS_ROLES,
  APPLICATIONS_ROLES,
  USERS_ROLES,
  EVENT_ROLES,
  hasAnyRole,
} from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";

const SECTION_DEFS = [
  { href: "/dashboard/sponsors", title: "Sponsors", key: "sponsors", roles: SPONSORS_ROLES },
  { href: "/dashboard/achievements", title: "Achievements", key: "achievements", roles: ACHIEVEMENTS_ROLES },
  { href: "/dashboard/applications", title: "Applications", key: "applications", roles: APPLICATIONS_ROLES },
  { href: "/dashboard/event", title: "Event Countdown", key: "event", roles: EVENT_ROLES },
  { href: "/dashboard/users", title: "Users & Roles", key: "users", roles: USERS_ROLES },
];

async function safeCount(supabase, table, applyFilter) {
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (applyFilter) query = applyFilter(query);
  const { count, error } = await query;
  return error ? null : count;
}

function daysUntil(dateString) {
  const diff = new Date(dateString).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

export default async function DashboardPage() {
  const { user, roles } = await getRoles();

  if (!user) redirect("/login");
  if (!hasAnyRole(roles, DASHBOARD_ROLES)) redirect("/unauthorized");

  const sections = SECTION_DEFS.filter((section) => hasAnyRole(roles, section.roles));
  const supabase = await createClient();
  const stats = {};

  await Promise.all(
    sections.map(async (section) => {
      switch (section.key) {
        case "sponsors":
          stats.sponsors = await safeCount(supabase, "sponsors", (q) => q.eq("is_active", true));
          break;
        case "achievements":
          stats.achievements = await safeCount(supabase, "achievements");
          break;
        case "applications":
          stats.applications = await safeCount(supabase, "applications", (q) => q.eq("status", "pending"));
          break;
        case "users":
          stats.users = await safeCount(supabase, "users");
          break;
        case "event": {
          const { data: event } = await supabase
            .from("event_countdown")
            .select("*")
            .limit(1)
            .maybeSingle();
          stats.event = event ?? null;
          break;
        }
      }
    })
  );

  function statFor(key) {
    switch (key) {
      case "sponsors":
        return { value: stats.sponsors ?? "—", label: "Active Sponsors" };
      case "achievements":
        return { value: stats.achievements ?? "—", label: "Results Logged" };
      case "applications":
        return { value: stats.applications ?? "—", label: "Pending Review" };
      case "users":
        return { value: stats.users ?? "—", label: "Team Accounts" };
      case "event":
        return stats.event
          ? { value: daysUntil(stats.event.event_at), label: `Days to ${stats.event.name}` }
          : { value: "—", label: "No Event Set" };
      default:
        return { value: "—", label: "" };
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-navy">Dashboard</h1>
      <p className="mt-2 text-sm text-gray-600">Signed in as {user.email}.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const stat = statFor(section.key);
          return (
            <Link key={section.href} href={section.href}>
              <Card className="h-full">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  {section.title}
                </p>
                <p className="font-display mt-2 text-4xl text-navy">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
