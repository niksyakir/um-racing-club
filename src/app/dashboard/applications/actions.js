"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateApplicationStatus(id, prevState, formData) {
  const status = formData.get("status");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("applications")
    .update({
      status,
      reviewed_by: user?.id ?? null,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { error: "Couldn't update status. Please try again." };
  }

  revalidatePath("/dashboard/applications");
  return { error: null };
}
