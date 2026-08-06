import DepartmentCard from "@/components/DepartmentCard";
import Reveal from "@/components/Reveal";
import { departments } from "./data";

const APPLY_EMAIL = "recruitment@umracing.my";

export default function ApplyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Reveal>
        <h1 className="font-display text-5xl tracking-wide text-navy md:text-6xl">
          Apply / Recruitment
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          We&apos;re always looking for driven students to join UM Racing.
          Pick a department below and reach out to apply.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {departments.map((dept, index) => (
          <Reveal key={dept.name} delay={index * 100}>
            <DepartmentCard
              name={dept.name}
              description={dept.description}
              ctaHref={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
                `Application — ${dept.name}`
              )}`}
              ctaLabel="Apply Now"
            />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
