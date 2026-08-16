import { createClient } from "@/lib/supabase/server";

export async function getRoles() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, roles: [], profile: null };

  const [{ data: roleRows }, { data: profileRow }] = await Promise.all([
    supabase.from("user_roles").select("roles(name)").eq("user_id", user.id),
    supabase
      .from("users")
      .select("full_name, avatar_url, profile_completed")
      .eq("id", user.id)
      .maybeSingle(),
  ]);

  return {
    user,
    roles: (roleRows ?? []).map((row) => row.roles.name),
    profile: profileRow ?? null,
  };
}
