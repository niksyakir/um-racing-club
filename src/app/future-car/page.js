import RoadmapCard from "@/components/RoadmapCard";
import Reveal from "@/components/Reveal";
import { roadmap } from "./data";

export default function FutureCarPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Reveal>
        <h1 className="font-display text-5xl tracking-wide text-navy md:text-6xl">
          Future Car Plans
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Our five-year roadmap toward a competition-ready, internationally
          competitive Formula Student EV.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {roadmap.map((item, index) => (
          <Reveal key={item.year} delay={index * 100}>
            <RoadmapCard
              year={item.year}
              title={item.title}
              technicalFocus={item.technicalFocus}
              teamGoals={item.teamGoals}
            />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
