import DepartmentCard from "@/components/DepartmentCard";
import { departments } from "./data";

const APPLY_EMAIL = "recruitment@umracing.my";

export default function ApplyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-bold text-navy md:text-4xl">
        Apply / Recruitment
      </h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        We&apos;re always looking for driven students to join UM Racing.
        Pick a department below and reach out to apply.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {departments.map((dept) => (
          <DepartmentCard
            key={dept.name}
            name={dept.name}
            description={dept.description}
            ctaHref={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
              `Application — ${dept.name}`
            )}`}
            ctaLabel="Apply Now"
          />
        ))}
      </div>
    </main>
  );
}
