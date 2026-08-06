import Card from "@/components/Card";

export default function RoadmapCard({ year, title, technicalFocus, teamGoals }) {
  return (
    <Card accent="red">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-5xl leading-none text-race-red">
          {year}
        </span>
        <span className="text-sm font-semibold uppercase tracking-wide text-navy/60">
          Year
        </span>
      </div>
      <h3 className="mt-2 text-lg font-bold text-navy">{title}</h3>
      <div className="mt-4 space-y-3 text-sm text-gray-600">
        <p>
          <span className="font-semibold text-navy">Technical Focus: </span>
          {technicalFocus}
        </p>
        <p>
          <span className="font-semibold text-navy">Team Goals: </span>
          {teamGoals}
        </p>
      </div>
    </Card>
  );
}
