import Skeleton from "@/components/Skeleton";

export default function DashboardUsersLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-2 h-4 w-96" />
      <div className="mt-6 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-navy/10 bg-white p-5 shadow-soft">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-2 h-3 w-56" />
            <Skeleton className="mt-4 h-6 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
