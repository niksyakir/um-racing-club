import { notFound, redirect } from "next/navigation";
import { getRoles } from "@/lib/auth/getRole";
import { ACHIEVEMENTS_ROLES, hasAnyRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { updateAchievement } from "../../actions";
import AchievementForm from "../../AchievementForm";
import ErrorState from "@/components/ErrorState";

export default async function EditAchievementPage({ params }) {
  const { user, roles } = await getRoles();
  if (!user) redirect("/login");
  if (!hasAnyRole(roles, ACHIEVEMENTS_ROLES)) redirect("/unauthorized");

  const { id } = await params;
  const supabase = await createClient();
  const { data: achievement, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    return (
      <div>
        <h1 className="font-display text-3xl tracking-wide text-navy">Edit Achievement</h1>
        <div className="mt-6">
          <ErrorState description="Couldn't load this achievement. Please try again." />
        </div>
      </div>
    );
  }

  if (!achievement) notFound();

  const updateAchievementWithId = updateAchievement.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-navy">Edit Achievement</h1>
      <AchievementForm action={updateAchievementWithId} achievement={achievement} />
    </div>
  );
}
