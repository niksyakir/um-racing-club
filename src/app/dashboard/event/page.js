import { redirect } from "next/navigation";
import { getRoles } from "@/lib/auth/getRole";
import { EVENT_ROLES, hasAnyRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import EventForm from "./EventForm";
import ErrorState from "@/components/ErrorState";

export default async function DashboardEventPage() {
  const { user, roles } = await getRoles();
  if (!user) redirect("/login");
  if (!hasAnyRole(roles, EVENT_ROLES)) redirect("/unauthorized");

  const supabase = await createClient();
  const { data: event, error } = await supabase
    .from("event_countdown")
    .select("*")
    .limit(1)
    .maybeSingle();

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-navy">Event Countdown</h1>
      <p className="mt-2 text-sm text-gray-600">
        Set the event shown in the countdown on the Home page.
      </p>

      {error ? (
        <div className="mt-6">
          <ErrorState description="Couldn't load the current event. Please try refreshing the page." />
        </div>
      ) : (
        <EventForm event={event} />
      )}
    </div>
  );
}
