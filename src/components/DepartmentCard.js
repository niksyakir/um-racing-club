import Link from "next/link";
import Card from "@/components/Card";

export default function DepartmentCard({
  name,
  description,
  ctaHref = "/apply",
  ctaLabel = "Apply now",
  onCtaClick,
}) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-navy">{name}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
      <Link
        href={ctaHref}
        onClick={onCtaClick}
        className="mt-6 inline-block rounded bg-race-red px-4 py-2 text-center text-sm font-semibold text-white shadow-glow-red transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-glow-red-lg"
      >
        {ctaLabel}
      </Link>
    </Card>
  );
}
