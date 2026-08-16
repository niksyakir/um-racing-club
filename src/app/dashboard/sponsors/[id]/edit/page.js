import { notFound, redirect } from "next/navigation";
import { getRoles } from "@/lib/auth/getRole";
import { SPONSORS_ROLES, hasAnyRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { updateSponsor } from "../../actions";
import SponsorForm from "../../SponsorForm";
import ErrorState from "@/components/ErrorState";

export default async function EditSponsorPage({ params }) {
  const { user, roles } = await getRoles();
  if (!user) redirect("/login");
  if (!hasAnyRole(roles, SPONSORS_ROLES)) redirect("/unauthorized");

  const { id } = await params;
  const supabase = await createClient();
  const { data: sponsor, error } = await supabase.from("sponsors").select("*").eq("id", id).single();

  if (error && error.code !== "PGRST116") {
    return (
      <div>
        <h1 className="font-display text-3xl tracking-wide text-navy">Edit Sponsor</h1>
        <div className="mt-6">
          <ErrorState description="Couldn't load this sponsor. Please try again." />
        </div>
      </div>
    );
  }

  if (!sponsor) notFound();

  const updateSponsorWithId = updateSponsor.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-navy">Edit Sponsor</h1>
      <SponsorForm action={updateSponsorWithId} sponsor={sponsor} />
    </div>
  );
}
