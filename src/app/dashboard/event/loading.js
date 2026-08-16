import Skeleton from "@/components/Skeleton";

export default function EventLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-2 h-4 w-72" />
      <div className="mt-6 max-w-xl space-y-4">
        <div>
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-1 h-10 w-full rounded-lg" />
        </div>
        <div>
          <Skeleton className="h-3 w-48" />
          <Skeleton className="mt-1 h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
