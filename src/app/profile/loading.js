import Skeleton from "@/components/Skeleton";

export default function ProfileLoading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <Skeleton className="h-10 w-56" />
      <Skeleton className="mt-3 h-4 w-64" />

      <div className="mt-8 space-y-6">
        <div className="rounded-xl border border-navy/10 bg-white p-5 shadow-soft">
          <Skeleton className="h-5 w-24" />
          <div className="mt-4 flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-10 flex-1 rounded-lg" />
          </div>
          <Skeleton className="mt-4 h-10 w-full rounded-lg" />
          <Skeleton className="mt-4 h-10 w-full rounded-lg" />
        </div>
        <div className="rounded-xl border border-navy/10 bg-white p-5 shadow-soft">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-4 h-10 w-full rounded-lg" />
          <Skeleton className="mt-4 h-10 w-full rounded-lg" />
        </div>
      </div>
    </main>
  );
}
