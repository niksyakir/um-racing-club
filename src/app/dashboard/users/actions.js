"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getRoles } from "@/lib/auth/getRole";
import { USERS_ROLES, hasAnyRole } from "@/lib/auth/roles";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = new Uint32Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (n) => chars[n % chars.length]).join("");
}

export async function createTeamMember(prevState, formData) {
  // The admin client bypasses RLS entirely, so this check is the only
  // authorization boundary for this action — it must happen here, not
  // just at the page level.
  const { roles } = await getRoles();
  if (!hasAnyRole(roles, USERS_ROLES)) {
    return { error: "You don't have permission to do this." };
  }

  const fullName = formData.get("full_name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const fieldErrors = {};
  if (!email) fieldErrors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (!password) fieldErrors.password = "Temporary password is required.";
  else if (password.length < 8) fieldErrors.password = "Password must be at least 8 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Please fix the errors below.", fieldErrors };
  }

  let error;
  try {
    const admin = createAdminClient();
    ({ error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: fullName ? { full_name: fullName } : undefined,
    }));
  } catch (thrown) {
    // The Supabase SDK can throw synchronously (e.g. a malformed
    // SUPABASE_SERVICE_ROLE_KEY) instead of resolving with { error }.
    // Catch that here so a misconfigured key shows a friendly message
    // instead of crashing the whole dashboard page.
    return { error: "Server isn't configured to create accounts yet (check SUPABASE_SERVICE_ROLE_KEY)." };
  }

  if (error) {
    return { error: error.message || "Couldn't create this account. Please try again." };
  }

  revalidatePath("/dashboard/users");
  return { error: null, success: true, createdEmail: email, createdPassword: password };
}

export async function deleteTeamMember(prevState, formData) {
  const id = formData.get("id");

  // Same reasoning as createTeamMember: the admin client bypasses RLS,
  // so this check is the only authorization boundary for this action.
  const { user, roles } = await getRoles();
  if (!hasAnyRole(roles, USERS_ROLES)) {
    return { error: "You don't have permission to do this." };
  }
  if (id === user?.id) {
    return { error: "You can't delete your own account." };
  }

  try {
    const admin = createAdminClient();
    const { error } = await admin.auth.admin.deleteUser(id);
    if (error) {
      return { error: error.message || "Couldn't delete this account. Please try again." };
    }
  } catch (thrown) {
    return { error: "Server isn't configured to delete accounts yet (check SUPABASE_SERVICE_ROLE_KEY)." };
  }

  revalidatePath("/dashboard/users");
  return { error: null };
}

export async function resetTeamMemberPassword(userId, prevState, formData) {
  // Same reasoning as createTeamMember/deleteTeamMember: the admin
  // client bypasses RLS, so this check is the only authorization
  // boundary for this action.
  const { roles } = await getRoles();
  if (!hasAnyRole(roles, USERS_ROLES)) {
    return { error: "You don't have permission to do this." };
  }

  const newPassword = generatePassword();

  try {
    const admin = createAdminClient();
    const { error } = await admin.auth.admin.updateUserById(userId, { password: newPassword });
    if (error) {
      return { error: error.message || "Couldn't reset this password. Please try again." };
    }
  } catch (thrown) {
    return { error: "Server isn't configured to reset passwords yet (check SUPABASE_SERVICE_ROLE_KEY)." };
  }

  return { error: null, success: true, newPassword };
}

export async function updateUserRoles(userId, prevState, formData) {
  const selectedRoleNames = formData.getAll("roles");
  const supabase = await createClient();

  const { data: roles, error: rolesError } = await supabase.from("roles").select("id, name");
  if (rolesError) {
    return { error: "Couldn't update roles. Please try again." };
  }

  const roleIds = (roles ?? [])
    .filter((role) => selectedRoleNames.includes(role.name))
    .map((role) => role.id);

  const { error: deleteError } = await supabase.from("user_roles").delete().eq("user_id", userId);
  if (deleteError) {
    return { error: "Couldn't update roles. Please try again." };
  }

  if (roleIds.length > 0) {
    const { error: insertError } = await supabase
      .from("user_roles")
      .insert(roleIds.map((roleId) => ({ user_id: userId, role_id: roleId })));
    if (insertError) {
      return { error: "Couldn't update roles. Please try again." };
    }
  }

  revalidatePath("/dashboard/users");
  return { error: null };
}
