import ContactCard from "@/components/ContactCard";
import Reveal from "@/components/Reveal";
import { teamContacts } from "./data";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <Reveal>
        <h1 className="font-display text-5xl tracking-wide text-navy md:text-6xl">
          Contact
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Get in touch with the UM Racing Team.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:max-w-2xl">
        {teamContacts.map((contact, index) => (
          <Reveal key={contact.email + contact.name} delay={index * 100}>
            <ContactCard
              name={contact.name}
              role={contact.role}
              phone={contact.phone}
              email={contact.email}
            />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
