import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/Reveal";
import { sponsors, visibilityExamples } from "./data";

export default function SponsorsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Reveal>
        <h1 className="font-display text-5xl tracking-wide text-navy md:text-6xl">
          Current Sponsors
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          UM Racing Team is proud to be supported by the following partners.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 rounded-xl bg-gradient-navy p-6 shadow-elevated md:p-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl bg-white p-4 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-navy font-display text-lg text-gold">
                  {sponsor.name.charAt(0)}
                </span>
                <span className="text-sm font-bold text-navy">
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <h2 className="text-xl font-bold text-navy">
            Example of Sponsorship Visibility
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            A look at where your brand appears when you partner with us.
          </p>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {visibilityExamples.map((example, index) => (
            <Reveal key={example.label} delay={index * 100}>
              <ImagePlaceholder label={example.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
