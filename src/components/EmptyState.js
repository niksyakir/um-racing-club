export default function EmptyState({ title, description, className = "" }) {
  return (
    <div className={`rounded-xl border border-dashed border-navy/20 bg-gray-50 px-6 py-10 text-center ${className}`}>
      <p className="font-semibold text-navy">{title}</p>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </div>
  );
}
