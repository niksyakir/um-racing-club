"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function achievementFromFormData(formData) {
  return {
    title: formData.get("title"),
    description: formData.get("description") || null,
    category: formData.get("category") || null,
    date_achieved: formData.get("date_achieved") || null,
    competition_name: formData.get("competition_name") || null,
    placement: formData.get("placement") || null,
    is_published: formData.get("is_published") === "on",
  };
}

function revalidateAchievements() {
  revalidatePath("/dashboard/achievements");
  revalidatePath("/achievements");
  revalidatePath("/");
}

export async function createAchievement(prevState, formData) {
  const supabase = await createClient();
  const { error } = await supabase.from("achievements").insert(achievementFromFormData(formData));

  if (error) {
    return { error: "Couldn't save this achievement. Please try again." };
  }

  revalidateAchievements();
  redirect("/dashboard/achievements");
}

export async function updateAchievement(id, prevState, formData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("achievements")
    .update(achievementFromFormData(formData))
    .eq("id", id);

  if (error) {
    return { error: "Couldn't save changes. Please try again." };
  }

  revalidateAchievements();
  redirect("/dashboard/achievements");
}
