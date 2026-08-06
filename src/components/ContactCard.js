import Card from "@/components/Card";

export default function ContactCard({ name, role, phone, email }) {
  return (
    <Card className="text-center">
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
    </Card>
  );
}
