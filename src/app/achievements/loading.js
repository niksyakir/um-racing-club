import Skeleton from "@/components/Skeleton";

export default function AchievementsLoading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-3 h-4 w-full max-w-2xl" />

      <Skeleton className="mt-10 h-8 w-52" />
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
      <Skeleton className="mt-12 h-8 w-44" />
      <Skeleton className="mt-5 h-32 w-full rounded-xl" />
    </main>
  );
}
