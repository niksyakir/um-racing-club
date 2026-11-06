function placementTier(placement) {
  const label = placement?.trim().toLowerCase() ?? "";

  if (/\b(bronze|3rd place|third place|2nd runner[ -]?up|second runner[ -]?up)\b/.test(label)) {
    return "bronze";
  }
  if (/\b(runner[ -]?up|2nd place|second place|silver)\b/.test(label)) {
    return "silver";
  }
  if (/\b(champion|winner|1st place|first place|gold)\b/.test(label)) {
    return "gold";
  }
  return "neutral";
}

const badgeTones = {
  gold: "bg-[linear-gradient(135deg,#fff5c7_0%,#ffd35a_0%,#d79a0b_40%,#ffe28a_90%)] text-navy shadow-soft",
  silver: "bg-[linear-gradient(135deg,#ffffff_0%,#d2dae5_0%,#9ca9bb_40%,#e9edf4_90%)] text-navy shadow-soft",
  bronze: "bg-[linear-gradient(135deg,#fff0dc_0%,#e7b98a_0%,#c78a5a_40%,#edc39c_90%)] text-navy shadow-soft",
  neutral: "bg-gray-100 text-gray-700",
};

function AchievementCard({ row }) {
  const placement = row.placement?.trim();
  const tier = placementTier(placement);
  const year = /^\d{4}-\d{2}-\d{2}/.exec(row.date_achieved ?? "")?.[0].slice(0, 4);
  const description = row.description?.trim();

  return (
    <div className="group relative h-full overflow-hidden rounded-xl border border-navy/10 bg-white p-6 shadow-elevated transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-gold before:content-[''] hover:-translate-y-1 hover:shadow-premium motion-reduce:transform-none motion-reduce:transition-none">
      <div className="flex h-full flex-col">
        {year && <p className="text-sm font-bold tracking-widest text-race-red">{year}</p>}
        <h3 className="mt-2 font-display text-2xl leading-tight tracking-wide text-navy">
          {row.competition_name || row.title}
        </h3>
        {row.category && (
          <p className="mt-2 text-sm font-medium text-gray-600">{row.category}</p>
        )}
        {description && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-600">{description}</p>
        )}
        {placement && (
          <div className="mt-auto pt-5">
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${badgeTones[tier]}`}>
              {placement}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AchievementCards({ data }) {
  if (data.length === 0) {
    return (
      <p className="rounded-xl border border-navy/10 bg-white px-6 py-8 text-center text-gray-600 shadow-soft">
        No achievements yet.
      </p>
    );
  }

  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {data.map((row) => (
        <li key={row.id}>
          <AchievementCard row={row} />
        </li>
      ))}
    </ul>
  );
}
