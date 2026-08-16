"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function updateProfile(prevState, formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const fullName = formData.get("full_name")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const avatar = formData.get("avatar");
  const hasAvatar = avatar && typeof avatar === "object" && avatar.size > 0;

  const fieldErrors = {};
  if (!fullName) fieldErrors.full_name = "Full name is required.";
  if (hasAvatar) {
    if (!ALLOWED_AVATAR_TYPES.includes(avatar.type)) {
      fieldErrors.avatar = "Avatar must be a JPG, PNG, or WEBP image.";
    } else if (avatar.size > MAX_AVATAR_BYTES) {
      fieldErrors.avatar = "Avatar must be smaller than 2MB.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Please fix the errors below.", fieldErrors };
  }

  let avatarUrl;

  if (hasAvatar) {
    const path = `${user.id}/${crypto.randomUUID()}-${avatar.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, avatar, { upsert: true });

    if (uploadError) {
      return { error: "Avatar upload failed. Please try again." };
    }
    avatarUrl = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
  }

  const updatePayload = {
    full_name: fullName,
    phone: phone || null,
    profile_completed: true,
  };
  if (avatarUrl) updatePayload.avatar_url = avatarUrl;

  const { error } = await supabase.from("users").update(updatePayload).eq("id", user.id);

  if (error) {
    return { error: "Couldn't save your profile. Please try again." };
  }

  revalidatePath("/profile");
  return { error: null, success: true };
}

export async function updatePassword(prevState, formData) {
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirm_password")?.toString() ?? "";

  const fieldErrors = {};
  if (!password) fieldErrors.password = "New password is required.";
  else if (password.length < 8) fieldErrors.password = "Password must be at least 8 characters.";
  if (confirmPassword !== password) fieldErrors.confirm_password = "Passwords don't match.";

  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Please fix the errors below.", fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message || "Couldn't update your password. Please try again." };
  }

  return { error: null, success: true };
}
