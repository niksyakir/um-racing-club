import Link from "next/link";

function ImagePlaceholder({ label }) {
  return (
    <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-navy/30 bg-gray-50 text-sm font-medium text-gray-400">
      {label}
    </div>
  );
}

export default function CurrentCarPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-bold text-navy md:text-4xl">
        Current Car
      </h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        Our current build, developed and refined by the Chassis, Suspension,
        and Drivers Dynamic departments.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">
        <ImagePlaceholder label="Full Car — Front 3/4" />
        <div>
          <h2 className="text-xl font-bold text-navy">Overview</h2>
          <p className="mt-3 text-sm text-gray-600">
            Our current vehicle is a lightweight, tubular-chassis electric
            single-seater, designed and built in-house to meet Formula
            Student regulations while prioritizing driveability, efficiency,
            and reliability on track.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <ImagePlaceholder label="Chassis" />
        <ImagePlaceholder label="Suspension" />
        <ImagePlaceholder label="Powertrain" />
      </div>

      <div className="mt-16 rounded-lg border border-navy/10 bg-gray-50 p-6 text-center">
        <h2 className="text-lg font-bold text-navy">
          Curious where we&apos;re headed next?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          See our five-year roadmap toward an internationally competitive
          Formula Student EV.
        </p>
        <Link
          href="/future-car"
          className="mt-4 inline-block rounded bg-race-red px-6 py-3 font-semibold text-white transition-colors hover:bg-race-red/90"
        >
          View Future Car Plans
        </Link>
      </div>
    </main>
  );
}
