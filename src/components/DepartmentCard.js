import Link from "next/link";

export default function DepartmentCard({
  name,
  description,
  ctaHref = "/apply",
  ctaLabel = "Apply now",
}) {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div>
        <h3 className="text-xl font-bold text-navy">{name}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
      <Link
        href={ctaHref}
        className="mt-6 inline-block rounded bg-race-red px-4 py-2 text-center text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-md"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
