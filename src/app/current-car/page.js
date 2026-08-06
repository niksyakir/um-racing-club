import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/Reveal";

export default function CurrentCarPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Reveal>
        <h1 className="font-display text-5xl tracking-wide text-navy md:text-6xl">
          Current Car
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Our current build, developed and refined by the Chassis, Suspension,
          and Drivers Dynamic departments.
        </p>
      </Reveal>

      <Reveal>
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
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {["Chassis", "Suspension", "Powertrain"].map((label, index) => (
          <Reveal key={label} delay={index * 100}>
            <ImagePlaceholder label={label} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 rounded-xl border border-navy/10 bg-gray-50 p-6 text-center shadow-elevated">
          <h2 className="text-lg font-bold text-navy">
            Curious where we&apos;re headed next?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            See our five-year roadmap toward an internationally competitive
            Formula Student EV.
          </p>
          <Link
            href="/future-car"
            className="mt-4 inline-block rounded bg-race-red px-6 py-3 font-semibold text-white shadow-glow-red transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-glow-red-lg"
          >
            View Future Car Plans
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
