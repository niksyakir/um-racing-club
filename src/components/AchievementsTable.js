export default function AchievementsTable({ data }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-navy/10">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead className="bg-navy text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">Competition</th>
            <th className="px-4 py-3 font-semibold">Category</th>
            <th className="px-4 py-3 font-semibold">Placement</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={`${row.competition}-${row.category}`}
              className={`transition-colors hover:bg-gold/10 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="px-4 py-3 text-gray-700">{row.competition}</td>
              <td className="px-4 py-3 text-gray-700">{row.category}</td>
              <td className="px-4 py-3 font-semibold text-race-red">
                {row.placement}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
