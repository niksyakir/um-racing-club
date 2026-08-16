export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try refreshing the page.",
  className = "",
}) {
  return (
    <div
      role="alert"
      className={`rounded-xl border border-race-red/30 bg-race-red/5 px-6 py-10 text-center ${className}`}
    >
      <p className="font-semibold text-race-red">{title}</p>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  );
}
