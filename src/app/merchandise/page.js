import Reveal from "@/components/Reveal";

export default function MerchandisePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center md:px-6">
      <Reveal>
        <div className="relative flex w-full flex-col items-center overflow-hidden rounded-2xl bg-gradient-navy px-8 py-16 text-white shadow-premium">
          <div className="absolute inset-0 bg-[image:var(--gradient-navy-radial)]" />
          <div className="relative flex flex-col items-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <svg
                className="h-8 w-8 text-gold"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7h12l1 13H5L6 7zM9 7a3 3 0 116 0"
                />
              </svg>
            </span>
            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-gold">
              UM Racing Team
            </p>
            <h1 className="font-display mt-2 text-5xl tracking-wide md:text-6xl">
              Merchandise
            </h1>
            <p className="mt-4 max-w-md text-white/70">
              Our merchandise store is coming soon. Check back later for UM
              Racing apparel and gear.
            </p>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
