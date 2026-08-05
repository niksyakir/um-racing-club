import ContactCard from "@/components/ContactCard";
import { teamContacts } from "./data";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-bold text-navy md:text-4xl">Contact</h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        Get in touch with the UM Racing Team.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:max-w-2xl">
        {teamContacts.map((contact) => (
          <ContactCard
            key={contact.email + contact.name}
            name={contact.name}
            role={contact.role}
            phone={contact.phone}
            email={contact.email}
          />
        ))}
      </div>
    </main>
  );
}
