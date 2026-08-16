import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { getRoles } from "@/lib/auth/getRole";

export default async function DashboardLayout({ children }) {
  const { user, roles } = await getRoles();

  if (!user) redirect("/login");

  return (
    <div className="mx-auto flex max-w-6xl flex-col md:flex-row">
      <Sidebar roles={roles} email={user.email} />
      <div className="min-w-0 flex-1 px-4 py-8 md:px-8">{children}</div>
    </div>
  );
}
