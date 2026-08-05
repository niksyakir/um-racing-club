import AchievementsTable from "@/components/AchievementsTable";
import { achievements, prizeWinnings } from "./data";

export default function AchievementsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-bold text-navy md:text-4xl">
        Achievements
      </h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        A look at how UM Racing has performed on the competition stage.
      </p>
      <div className="mt-8">
        <AchievementsTable data={achievements} />
      </div>
      <div className="mt-6 inline-block rounded-lg border border-gold bg-gold/10 px-6 py-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-navy">
          NxGV Challenge 2025 Prize Winnings
        </p>
        <p className="mt-1 text-2xl font-bold text-race-red">
          {prizeWinnings}
        </p>
      </div>
    </main>
  );
}
