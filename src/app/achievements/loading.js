import Skeleton from "@/components/Skeleton";

export default function AchievementsLoading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-3 h-4 w-full max-w-2xl" />

      <div className="mt-8 overflow-hidden rounded-xl border border-navy/10 shadow-elevated">
        <div className="h-11 bg-navy/5" />
        <div className="divide-y divide-navy/5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-4 py-4">
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <Skeleton className="mt-6 h-24 w-72 rounded-xl" />
    </main>
  );
}
