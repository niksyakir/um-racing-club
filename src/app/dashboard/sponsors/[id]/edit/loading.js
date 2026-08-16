import Skeleton from "@/components/Skeleton";

export default function EditSponsorLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-48" />
      <div className="mt-6 max-w-xl space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-1 h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
