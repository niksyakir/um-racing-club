import Skeleton from "@/components/Skeleton";

export default function SponsorsLoading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Skeleton className="h-10 w-72" />
      <Skeleton className="mt-3 h-4 w-full max-w-2xl" />

      <div className="mt-10 rounded-xl bg-gradient-navy p-6 shadow-elevated md:p-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-video rounded-xl bg-white/10" />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Skeleton className="h-6 w-64" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-video rounded-xl" />
          ))}
        </div>
      </div>
    </main>
  );
}
