import Skeleton from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <>
      <div className="relative -mt-16 h-[520px] w-full animate-pulse bg-navy md:h-[600px]" />

      <div className="relative z-10 mx-auto -mt-12 max-w-5xl px-4 md:-mt-16 md:px-6">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-gradient-navy px-6 py-8 shadow-premium md:grid-cols-4 md:px-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-8 w-16 bg-white/20" />
              <Skeleton className="h-3 w-24 bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 md:px-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    </>
  );
}
