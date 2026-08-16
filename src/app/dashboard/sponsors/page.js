import Link from "next/link";
import { redirect } from "next/navigation";
import { getRoles } from "@/lib/auth/getRole";
import { SPONSORS_ROLES, hasAnyRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { deleteSponsor } from "./actions";
import DeleteButton from "@/components/dashboard/DeleteButton";
import ErrorState from "@/components/ErrorState";

export default async function DashboardSponsorsPage() {
  const { user, roles } = await getRoles();
  if (!user) redirect("/login");
  if (!hasAnyRole(roles, SPONSORS_ROLES)) redirect("/unauthorized");

  const supabase = await createClient();
  const { data: sponsors, error } = await supabase.from("sponsors").select("*").order("name");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl tracking-wide text-navy">Sponsors</h1>
        <Link
          href="/dashboard/sponsors/new"
          className="rounded bg-race-red px-4 py-2 text-sm font-semibold text-white shadow-glow-red transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-glow-red-lg"
        >
          Add Sponsor
        </Link>
      </div>

      {error ? (
        <div className="mt-6">
          <ErrorState description="Couldn't load sponsors. Please try refreshing the page." />
        </div>
      ) : (
      <div className="mt-6 overflow-x-auto rounded-xl border border-navy/10 shadow-elevated">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-gradient-navy text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Tier</th>
              <th className="px-4 py-3 font-semibold">Contact</th>
              <th className="px-4 py-3 font-semibold">Active</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(sponsors ?? []).map((sponsor, i) => (
              <tr key={sponsor.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3 font-semibold text-navy">{sponsor.name}</td>
                <td className="px-4 py-3 text-gray-700">{sponsor.tier ?? "—"}</td>
                <td className="px-4 py-3 text-gray-700">{sponsor.contact_email ?? "—"}</td>
                <td className="px-4 py-3 text-gray-700">{sponsor.is_active ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/dashboard/sponsors/${sponsor.id}/edit`}
                      className="font-semibold text-navy hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteSponsor} id={sponsor.id} label="sponsor" />
                  </div>
                </td>
              </tr>
            ))}
            {(sponsors ?? []).length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
                  No sponsors yet.
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
