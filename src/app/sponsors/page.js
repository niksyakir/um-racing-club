import { sponsors, visibilityExamples } from "./data";

export default function SponsorsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-bold text-navy md:text-4xl">
        Current Sponsors
      </h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        UM Racing Team is proud to be supported by the following partners.
      </p>

      <div className="mt-10 rounded-lg bg-navy p-6 md:p-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex aspect-video flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-center shadow-sm"
            >
              <span className="text-sm font-bold text-navy">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-bold text-navy">
          Example of Sponsorship Visibility
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          A look at where your brand appears when you partner with us.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {visibilityExamples.map((example) => (
            <div
              key={example.label}
              className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-navy/30 bg-gray-50 text-sm font-medium text-gray-400"
            >
              {example.label}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
