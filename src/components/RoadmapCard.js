export default function RoadmapCard({ year, title, technicalFocus, teamGoals }) {
  return (
    <div className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <p className="text-sm font-semibold uppercase tracking-wide text-race-red">
        Year {year}
      </p>
      <h3 className="mt-1 text-lg font-bold text-navy">{title}</h3>
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
    </div>
  );
}
