import AchievementsTable from "@/components/AchievementsTable";
import Reveal from "@/components/Reveal";
import ErrorState from "@/components/ErrorState";
import { createClient } from "@/lib/supabase/server";
import { prizeWinnings } from "./data";

export const metadata = {
  title: "Achievements",
  description: "A look at how UM Racing has performed on the competition stage.",
};

export default async function AchievementsPage() {
  const supabase = await createClient();
  const { data: achievements, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("is_published", true)
    .order("date_achieved", { ascending: false });

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Reveal>
        <h1 className="font-display text-5xl tracking-wide text-navy md:text-6xl">
          Achievements
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          A look at how UM Racing has performed on the competition stage.
        </p>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-8">
          {error ? (
            <ErrorState description="Couldn't load achievements right now. Please check back later." />
          ) : (
            <AchievementsTable data={achievements ?? []} />
          )}
        </div>
      </Reveal>
      <Reveal delay={200}>
        <div className="mt-6 inline-block rounded-xl border border-gold bg-gold/10 px-6 py-4 shadow-elevated">
          <p className="text-sm font-semibold uppercase tracking-wide text-navy">
            NxGV Challenge 2025 Prize Winnings
          </p>
          <p className="font-display mt-1 text-4xl tracking-wide text-race-red">
            {prizeWinnings}
          </p>
        </div>
      </Reveal>
    </main>
  );
}
