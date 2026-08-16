import Link from "next/link";
import { redirect } from "next/navigation";
import { getRoles } from "@/lib/auth/getRole";
import { ACHIEVEMENTS_ROLES, hasAnyRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import ErrorState from "@/components/ErrorState";

export default async function DashboardAchievementsPage() {
  const { user, roles } = await getRoles();
  if (!user) redirect("/login");
  if (!hasAnyRole(roles, ACHIEVEMENTS_ROLES)) redirect("/unauthorized");

  const supabase = await createClient();
  const { data: achievements, error } = await supabase
    .from("achievements")
    .select("*")
    .order("date_achieved", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl tracking-wide text-navy">Achievements</h1>
        <Link
          href="/dashboard/achievements/new"
          className="rounded bg-race-red px-4 py-2 text-sm font-semibold text-white shadow-glow-red transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-glow-red-lg"
        >
          Add Achievement
        </Link>
      </div>

      {error ? (
        <div className="mt-6">
          <ErrorState description="Couldn't load achievements. Please try refreshing the page." />
        </div>
      ) : (
      <div className="mt-6 overflow-x-auto rounded-xl border border-navy/10 shadow-elevated">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-gradient-navy text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Competition</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Placement</th>
              <th className="px-4 py-3 font-semibold">Published</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(achievements ?? []).map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3 text-gray-700">{row.competition_name ?? row.title}</td>
                <td className="px-4 py-3 text-gray-700">{row.category ?? "—"}</td>
                <td className="px-4 py-3 text-gray-700">{row.placement ?? "—"}</td>
                <td className="px-4 py-3 text-gray-700">{row.is_published ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/dashboard/achievements/${row.id}/edit`}
                    className="font-semibold text-navy hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {(achievements ?? []).length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
                  No achievements yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
