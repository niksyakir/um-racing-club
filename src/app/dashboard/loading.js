import Skeleton from "@/components/Skeleton";

export default function DashboardLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-2 h-4 w-64" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
