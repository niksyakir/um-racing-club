import RoadmapCard from "@/components/RoadmapCard";
import { roadmap } from "./data";

export default function FutureCarPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-bold text-navy md:text-4xl">
        Future Car Plans
      </h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        Our five-year roadmap toward a competition-ready, internationally
        competitive Formula Student EV.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {roadmap.map((item) => (
          <RoadmapCard
            key={item.year}
            year={item.year}
            title={item.title}
            technicalFocus={item.technicalFocus}
            teamGoals={item.teamGoals}
          />
        ))}
      </div>
    </main>
  );
}
