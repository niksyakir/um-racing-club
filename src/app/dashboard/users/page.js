import { redirect } from "next/navigation";
import { getRoles } from "@/lib/auth/getRole";
import { USERS_ROLES, hasAnyRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import RoleForm from "./RoleForm";
import CreateUserForm from "./CreateUserForm";
import { deleteTeamMember } from "./actions";
import DeleteButton from "@/components/dashboard/DeleteButton";
import ResetPasswordButton from "./ResetPasswordButton";
import ErrorState from "@/components/ErrorState";

export default async function DashboardUsersPage() {
  const { user, roles } = await getRoles();
  if (!user) redirect("/login");
  if (!hasAnyRole(roles, USERS_ROLES)) redirect("/unauthorized");

  const supabase = await createClient();
  const [
    { data: users, error: usersError },
    { data: allRoles, error: rolesError },
    { data: assignments, error: assignmentsError },
  ] = await Promise.all([
    supabase.from("users").select("*").order("email"),
    supabase.from("roles").select("*").order("name"),
    supabase.from("user_roles").select("user_id, roles(name)"),
  ]);

  const error = usersError || rolesError || assignmentsError;

  const rolesByUser = new Map();
  for (const assignment of assignments ?? []) {
    const list = rolesByUser.get(assignment.user_id) ?? [];
    list.push(assignment.roles.name);
    rolesByUser.set(assignment.user_id, list);
  }

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-navy">Users & Roles</h1>
      <p className="mt-2 text-sm text-gray-600">
        Create team accounts and assign roles.
      </p>

      <div className="mt-6 max-w-xl">
        <CreateUserForm />
      </div>

      {error ? (
        <div className="mt-6">
          <ErrorState description="Couldn't load users and roles. Please try refreshing the page." />
        </div>
      ) : (
      <div className="mt-6 space-y-4">
        {(users ?? []).map((account) => {
          const currentRoles = rolesByUser.get(account.id) ?? [];
          return (
            <div key={account.id} className="rounded-xl border border-navy/10 bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-navy">{account.full_name || account.email}</p>
                  <p className="text-xs text-gray-500">{account.email}</p>
                </div>
                {account.id !== user.id && (
                  <div className="flex shrink-0 items-start gap-4 text-sm">
                    <ResetPasswordButton userId={account.id} />
                    <DeleteButton action={deleteTeamMember} id={account.id} label="team member" />
                  </div>
                )}
              </div>

              <RoleForm userId={account.id} allRoles={allRoles ?? []} currentRoles={currentRoles} />
            </div>
          );
        })}
        {(users ?? []).length === 0 && (
          <p className="text-sm text-gray-500">No user accounts found.</p>
        )}
      </div>
      )}
    </div>
  );
}
