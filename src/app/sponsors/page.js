import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/Reveal";
import SponsorLogo from "@/components/SponsorLogo";
import ErrorState from "@/components/ErrorState";
import { createClient } from "@/lib/supabase/server";
import { visibilityExamples } from "./data";

export const metadata = {
  title: "Current Sponsors",
  description: "UM Racing Team is proud to be supported by the following partners.",
};

export default async function SponsorsPage() {
  const supabase = await createClient();
  const { data: sponsors, error } = await supabase
    .from("sponsors")
    .select("*")
    .eq("is_active", true)
    .order("name");

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

      {error ? (
        <div className="mt-10">
          <ErrorState description="Couldn't load sponsors right now. Please check back later." />
        </div>
      ) : (
        <Reveal delay={100}>
          <div className="mt-10 rounded-xl bg-gradient-navy p-6 shadow-elevated md:p-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {(sponsors ?? []).map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl bg-white p-4 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
                >
                  <SponsorLogo
                    src={sponsor.logo_url}
                    alt={sponsor.name}
                    initial={sponsor.name.charAt(0)}
                  />
                  <span className="text-sm font-bold text-navy">{sponsor.name}</span>
                </div>
              ))}
              {(sponsors ?? []).length === 0 && (
                <p className="col-span-full py-6 text-center text-white/70">
                  Sponsor listings coming soon.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      )}

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
