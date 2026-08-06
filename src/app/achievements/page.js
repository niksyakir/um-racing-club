import AchievementsTable from "@/components/AchievementsTable";
import Reveal from "@/components/Reveal";
import { achievements, prizeWinnings } from "./data";

export default function AchievementsPage() {
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
          <AchievementsTable data={achievements} />
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
