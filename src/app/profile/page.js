import { redirect } from "next/navigation";
import { getRoles } from "@/lib/auth/getRole";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import ErrorState from "@/components/ErrorState";

export const metadata = {
  title: "My Profile",
};

export default async function ProfilePage() {
  const { user } = await getRoles();
  if (!user) redirect("/login");

  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("users")
    .select("full_name, phone, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-display text-5xl tracking-wide text-navy md:text-6xl">
        My Profile
      </h1>
      <p className="mt-3 text-gray-600">
        Signed in as {user.email}.
      </p>

      {error ? (
        <div className="mt-8">
          <ErrorState description="Couldn't load your profile. Please try refreshing the page." />
        </div>
      ) : (
        <div className="mt-8">
          <ProfileForm profile={profile} />
          <PasswordForm />
        </div>
      )}
    </main>
  );
}
