import { redirect } from "next/navigation";
import { getRoles } from "@/lib/auth/getRole";
import { SPONSORS_ROLES, hasAnyRole } from "@/lib/auth/roles";
import { createSponsor } from "../actions";
import SponsorForm from "../SponsorForm";

export default async function NewSponsorPage() {
  const { user, roles } = await getRoles();
  if (!user) redirect("/login");
  if (!hasAnyRole(roles, SPONSORS_ROLES)) redirect("/unauthorized");

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-navy">Add Sponsor</h1>
      <SponsorForm action={createSponsor} />
    </div>
  );
}
