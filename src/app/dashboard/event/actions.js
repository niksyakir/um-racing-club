"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveEvent(prevState, formData) {
  const name = formData.get("name")?.toString().trim() ?? "";
  const localDateTime = formData.get("event_at")?.toString() ?? "";

  if (!name) return { error: "Event name is required." };
  if (!localDateTime) return { error: "Event date and time is required." };

  // datetime-local inputs carry no timezone; the club operates on
  // Malaysia time, so pin it to +08:00 explicitly rather than letting
  // the server's own timezone silently decide (e.g. Vercel defaults to UTC).
  const eventAt = `${localDateTime}:00+08:00`;

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("event_countdown")
    .select("id")
    .limit(1)
    .maybeSingle();

  const { error } = existing
    ? await supabase
        .from("event_countdown")
        .update({ name, event_at: eventAt, updated_at: new Date().toISOString() })
        .eq("id", existing.id)
    : await supabase.from("event_countdown").insert({ name, event_at: eventAt });

  if (error) {
    return { error: "Couldn't save the event. Please try again." };
  }

  revalidatePath("/dashboard/event");
  revalidatePath("/");
  return { error: null };
}
