export default function ContactCard({ name, role, phone, email }) {
  return (
    <div className="rounded-lg border border-navy/10 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-lg font-bold text-navy">{name}</h3>
      <p className="text-sm font-semibold text-race-red">{role}</p>
      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>{phone}</p>
        <p>
          <a href={`mailto:${email}`} className="hover:text-navy hover:underline">
            {email}
          </a>
        </p>
      </div>
    </div>
  );
}
