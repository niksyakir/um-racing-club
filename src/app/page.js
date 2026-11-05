import Image from "next/image";
import Link from "next/link";
import Card from "@/components/Card";
import DepartmentCard from "@/components/DepartmentCard";
import Reveal from "@/components/Reveal";
import CountdownTimer from "@/components/CountdownTimer";
import { createClient } from "@/lib/supabase/server";
import { departments } from "@/app/apply/data";
import { prizeWinnings } from "@/app/achievements/data";

const highlights = [
  {
    title: "Student-Led Engineering",
    description:
      "Designed, built, and raced entirely by Universiti Malaya students.",
  },
  {
    title: "Sustainable Mobility",
    description:
      "Advancing energy-efficient, eco-friendly electric vehicle engineering.",
  },
  {
    title: "Real-World Experience",
    description:
      "Bridging classroom theory with hands-on Formula Student competition.",
  },
  {
    title: "Industry Collaboration",
    description:
      "Partnering with sponsors across the automotive and engineering industries.",
  },
];

const milestones = [
  {
    year: "2025",
    title: "NxGV Challenge 2025",
    description:
      "The team achieved significant success at the Next Generation Vehicle (NxGV) Challenge 2025, earning 1st Runner-up in Efficiency and Best Design (Styling). Additional honors included 2nd Runner-up in Engineering Design and Business Presentation, contributing to a strong 4th Place Overall finish.",
  },
  {
    year: "2026",
    title: "Formula Student Malaysia 2026",
    description:
      "The team took 1st Place in the FSAE EV category at Formula Student Malaysia 2026, building on the momentum from our NxGV Challenge 2025 result.",
  },
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data: sponsors, error: sponsorsError } = await supabase
    .from("sponsors")
    .select("*")
    .eq("is_active", true)
    .order("name");
  const sponsorList = sponsors ?? [];

  const { data: event } = await supabase
    .from("event_countdown")
    .select("*")
    .limit(1)
    .maybeSingle();

  const stats = [
    { value: "1st", label: "FSAE EV — FSM 2026" },
    { value: prizeWinnings, label: "NxGV 2025 Prize Winnings" },
    { value: String(departments.length), label: "Engineering Departments" },
    { value: String(sponsorList.length), label: "Industry Sponsors" },
  ];

  return (
    <>
      <section
        id="home-hero"
        className="relative -mt-16 overflow-hidden bg-navy text-white"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 92%)" }}
      >
        <Image
          src="/image/team.jpeg"
          alt="UM Racing Team celebrating 1st Place, FSAE EV category, at Formula Student Malaysia 2026"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 pb-32 pt-40 md:px-6 md:pb-40 md:pt-48">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            UM Racing Team
          </p>
          <h1 className="font-display max-w-2xl text-5xl leading-[0.95] tracking-wide md:text-7xl">
            Building Universiti Malaya&apos;s first Formula Student EV car
          </h1>
          <Link
            href="/apply"
            className="rounded bg-race-red px-6 py-3 font-semibold text-white shadow-glow-red transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-glow-red-lg"
          >
            Discover open positions
          </Link>
          <p className="max-w-md text-sm text-white/70">
            1st Place, FSAE EV Category — Formula Student Malaysia 2026,
            building on our NxGV Challenge 2025 result.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-12 max-w-5xl px-4 md:-mt-16 md:px-6">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-gradient-navy px-6 py-8 shadow-premium md:grid-cols-4 md:px-10">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <div className="text-center text-white">
                <p className="font-display text-4xl tracking-wide text-gold md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/70">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {event && (
        <section className="bg-navy py-16 text-white">
          <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">
                Next Event
              </p>
              <h2 className="font-display mt-1 text-4xl tracking-wide md:text-5xl">
                {event.name}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-10">
                <CountdownTimer eventAt={event.event_at} eventName={event.name} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-white pb-16 pt-8">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl tracking-wide text-navy md:text-5xl">
                About Us
              </h2>
              <p className="mt-3 text-gray-600">
                UM Racing Team is an engineering club formed by students of
                the Faculty of Engineering, Universiti Malaya. We apply the
                knowledge from our courses to solve real-world engineering
                challenges as a team, with one goal: building a car to
                compete in the Formula Student Malaysia (FSM) NxGV
                Challenge.
              </p>
              <Link
                href="/about"
                className="mt-4 inline-block font-semibold text-race-red hover:underline"
              >
                Learn more →
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {highlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 100}>
                <Card className="h-full !p-5">
                  <h3 className="font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-gold py-24"
        style={{ clipPath: "polygon(0 6%, 100% 0, 100% 94%, 0 100%)" }}
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <h2 className="font-display text-4xl tracking-wide text-navy md:text-5xl">
              Our Parts
            </h2>
            <p className="mt-2 max-w-2xl text-navy/70">
              The departments driving UM Racing forward.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {departments.map((dept, index) => (
              <Reveal key={dept.name} delay={index * 100}>
                <DepartmentCard name={dept.name} description={dept.description} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <h2 className="font-display text-4xl tracking-wide text-navy md:text-5xl">
              The Car
            </h2>
            <p className="mt-2 max-w-2xl text-gray-600">
              Follow the build, and where we&apos;re headed next.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal>
              <DepartmentCard
                name="Current Car"
                description="Take a look at our current build — chassis, suspension, and powertrain."
                ctaHref="/current-car"
                ctaLabel="View Current Car"
              />
            </Reveal>
            <Reveal delay={100}>
              <DepartmentCard
                name="Future Car Plans"
                description="Our five-year roadmap toward an internationally competitive Formula Student EV."
                ctaHref="/future-car"
                ctaLabel="View Roadmap"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-4xl tracking-wide text-navy md:text-5xl">
                  Our Sponsors
                </h2>
                <p className="mt-2 max-w-2xl text-gray-600">
                  Proud to be supported by the following partners.
                </p>
              </div>
              <Link
                href="/sponsors"
                className="font-semibold text-race-red hover:underline"
              >
                View All Sponsors →
              </Link>
            </div>
          </Reveal>
          {sponsorsError ? (
            <p className="mt-8 text-sm text-race-red">
              Couldn&apos;t load sponsors right now. Please check back later.
            </p>
          ) : (
            <Reveal delay={150} className="mt-8 overflow-hidden">
              <div className="flex w-max gap-6 animate-marquee">
                {[...sponsorList, ...sponsorList].map((sponsor, i) => (
                  <div
                    key={`${sponsor.id}-${i}`}
                    className="flex h-24 w-40 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-navy/10 bg-white p-3 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-navy font-display text-sm text-gold">
                      {sponsor.name.charAt(0)}
                    </span>
                    <span className="text-xs font-bold text-navy">
                      {sponsor.name}
                    </span>
                  </div>
                ))}
                {sponsorList.length === 0 && (
                  <p className="text-sm text-gray-500">Sponsor listings coming soon.</p>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-race-red">
              Milestones
            </p>
            <h2 className="font-display mt-1 text-4xl tracking-wide text-navy md:text-5xl">
              Club History: Achievements &amp; Records
            </h2>
          </Reveal>

          <div className="relative mt-12">
            <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-navy/15 md:block" />
            <div className="space-y-10 md:space-y-16">
              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <Reveal key={milestone.title} delay={index * 150}>
                    <div
                      className={`md:flex md:items-center md:gap-10 ${
                        isEven ? "" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="md:w-1/2">
                        <div className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-elevated transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
                          <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-navy/10 bg-gradient-navy text-sm font-medium text-white/70">
                            <div className="absolute inset-0 bg-[image:var(--gradient-navy-radial)]" />
                            <span className="relative">{milestone.title} — Photo Placeholder</span>
                          </div>
                          <div className="p-6">
                            <p className="text-sm font-semibold text-race-red">
                              {milestone.year} | {milestone.title}
                            </p>
                            <p className="mt-2 text-sm text-gray-600">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center">
                        <span className="h-4 w-4 rounded-full border-4 border-gold bg-white" />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={milestones.length * 150}>
            <Link
              href="/achievements"
              className="mt-12 inline-block rounded bg-gradient-navy px-6 py-3 font-semibold text-white shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
            >
              View Full Achievements
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
