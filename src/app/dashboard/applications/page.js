import { redirect } from "next/navigation";
import { getRoles } from "@/lib/auth/getRole";
import { APPLICATIONS_ROLES, hasAnyRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import StatusForm from "./StatusForm";
import ErrorState from "@/components/ErrorState";

export default async function DashboardApplicationsPage() {
  const { user, roles } = await getRoles();
  if (!user) redirect("/login");
  if (!hasAnyRole(roles, APPLICATIONS_ROLES)) redirect("/unauthorized");

  const supabase = await createClient();
  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .order("submitted_at", { ascending: false });

  const rows = error
    ? []
    : await Promise.all(
        (applications ?? []).map(async (application) => {
          let resumeUrl = null;
          if (application.resume_url) {
            const { data } = await supabase.storage
              .from("resumes")
              .createSignedUrl(application.resume_url, 600);
            resumeUrl = data?.signedUrl ?? null;
          }
          return { ...application, resumeUrl };
        })
      );

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-navy">Applications</h1>
      <p className="mt-2 text-sm text-gray-600">Recruitment submissions from the public Apply page.</p>

      {error ? (
        <div className="mt-6">
          <ErrorState description="Couldn't load applications. Please try refreshing the page." />
        </div>
      ) : (
      <div className="mt-6 overflow-x-auto rounded-xl border border-navy/10 shadow-elevated">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="bg-gradient-navy text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Applicant</th>
              <th className="px-4 py-3 font-semibold">Department</th>
              <th className="px-4 py-3 font-semibold">Motivation</th>
              <th className="px-4 py-3 font-semibold">Resume</th>
              <th className="px-4 py-3 font-semibold">Submitted</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3">
                  <p className="font-semibold text-navy">{row.applicant_name}</p>
                  <p className="text-xs text-gray-500">{row.applicant_email}</p>
                </td>
                <td className="px-4 py-3 text-gray-700">{row.department_applied}</td>
                <td
                  className="max-w-[220px] truncate px-4 py-3 text-gray-700"
                  title={row.motivation_text ?? ""}
                >
                  {row.motivation_text ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {row.resumeUrl ? (
                    <a
                      href={row.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-navy hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {new Date(row.submitted_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <StatusForm id={row.id} status={row.status} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                  No applications yet.
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
