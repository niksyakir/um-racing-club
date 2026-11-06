import AchievementCards from "@/components/AchievementCards";
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
        <section aria-labelledby="competition-results-heading" className="mt-10">
          <h2 id="competition-results-heading" className="font-display text-3xl tracking-wide text-navy">
            Competition Results
          </h2>
          <div className="mt-5">
            {error ? (
              <ErrorState description="Couldn't load achievements right now. Please check back later." />
            ) : (
              <AchievementCards data={achievements ?? []} />
            )}
          </div>
        </section>
      </Reveal>
      <Reveal delay={200}>
        <section aria-labelledby="prize-winnings-heading" className="mt-12">
          <h2 id="prize-winnings-heading" className="font-display text-3xl tracking-wide text-navy">
            Prize Winnings
          </h2>
          <div className="mt-5 overflow-hidden rounded-xl border border-navy/10 shadow-elevated">
            <table className="w-full text-left text-sm">
              <thead className="bg-gradient-navy text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold md:px-6">Competition</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold md:px-6">Prize</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                <tr className="border-b border-navy/10">
                  <th scope="row" className="px-4 py-4 font-medium md:px-6">NxGV Challenge 2025</th>
                  <td className="px-4 py-4 text-right font-semibold text-race-red md:px-6">{prizeWinnings}</td>
                </tr>
              </tbody>
              <tfoot className="bg-gold/10 text-navy">
                <tr>
                  <th scope="row" className="px-4 py-4 text-left font-bold md:px-6">Total</th>
                  <td className="px-4 py-4 text-right font-bold md:px-6">{prizeWinnings}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
