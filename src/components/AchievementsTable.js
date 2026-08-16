function PlacementBadge({ placement }) {
  const isFirst = /^1st Place$/i.test(placement);
  const isRunnerUp = /Runner-up/i.test(placement);
  const tone = isFirst
    ? "bg-gradient-gold text-navy shadow-glow-gold"
    : isRunnerUp
      ? "bg-navy/10 text-navy"
      : "bg-gray-100 text-gray-600";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${tone}`}
    >
      {isFirst && (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M12 2l2.4 5.5 6 .5-4.5 4 1.4 5.8L12 15l-5.3 2.8L8.1 12l-4.5-4 6-.5L12 2z" />
        </svg>
      )}
      {placement}
    </span>
  );
}

export default function AchievementsTable({ data }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-navy/10 shadow-elevated">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead className="bg-gradient-navy text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">Competition</th>
            <th className="px-4 py-3 font-semibold">Category</th>
            <th className="px-4 py-3 font-semibold">Placement</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id}
              className={`transition-colors hover:bg-gold/10 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="px-4 py-3 text-gray-700">{row.competition_name}</td>
              <td className="px-4 py-3 text-gray-700">{row.category}</td>
              <td className="px-4 py-3">
                <PlacementBadge placement={row.placement} />
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-gray-500" colSpan={3}>
                No achievements yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
