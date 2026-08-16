"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function sponsorFromFormData(formData) {
  return {
    name: formData.get("name"),
    tier: formData.get("tier") || null,
    website_url: formData.get("website_url") || null,
    description: formData.get("description") || null,
    contact_name: formData.get("contact_name") || null,
    contact_email: formData.get("contact_email") || null,
    amount_contributed: formData.get("amount_contributed") || null,
    is_active: formData.get("is_active") === "on",
  };
}

function revalidateSponsors() {
  revalidatePath("/dashboard/sponsors");
  revalidatePath("/sponsors");
  revalidatePath("/");
}

export async function createSponsor(prevState, formData) {
  const supabase = await createClient();
  const { error } = await supabase.from("sponsors").insert(sponsorFromFormData(formData));

  if (error) {
    return { error: "Couldn't save this sponsor. Please try again." };
  }

  revalidateSponsors();
  redirect("/dashboard/sponsors");
}

export async function updateSponsor(id, prevState, formData) {
  const supabase = await createClient();
  const { error } = await supabase.from("sponsors").update(sponsorFromFormData(formData)).eq("id", id);

  if (error) {
    return { error: "Couldn't save changes. Please try again." };
  }

  revalidateSponsors();
  redirect("/dashboard/sponsors");
}

export async function deleteSponsor(prevState, formData) {
  const id = formData.get("id");
  const supabase = await createClient();
  const { error } = await supabase.from("sponsors").delete().eq("id", id);

  if (error) {
    return { error: "Couldn't delete this sponsor. Please try again." };
  }

  revalidateSponsors();
  return { error: null };
}
