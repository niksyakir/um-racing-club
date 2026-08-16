import { redirect } from "next/navigation";
import { getRoles } from "@/lib/auth/getRole";
import { ACHIEVEMENTS_ROLES, hasAnyRole } from "@/lib/auth/roles";
import { createAchievement } from "../actions";
import AchievementForm from "../AchievementForm";

export default async function NewAchievementPage() {
  const { user, roles } = await getRoles();
  if (!user) redirect("/login");
  if (!hasAnyRole(roles, ACHIEVEMENTS_ROLES)) redirect("/unauthorized");

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-navy">Add Achievement</h1>
      <AchievementForm action={createAchievement} />
    </div>
  );
}
