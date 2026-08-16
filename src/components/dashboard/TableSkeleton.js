import Skeleton from "@/components/Skeleton";

export default function TableSkeleton({ columns = 4, rows = 5 }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-32" />
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-navy/10 shadow-elevated">
        <div className="h-11 bg-navy/5" />
        <div className="divide-y divide-navy/5">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-6 px-4 py-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
