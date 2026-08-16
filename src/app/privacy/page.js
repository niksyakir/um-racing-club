import Card from "@/components/Card";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Privacy Policy",
  description: "How UM Racing Team collects, uses, and protects the personal data submitted through this site.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:px-6">
      <Reveal>
        <h1 className="font-display text-5xl tracking-wide text-navy md:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-gray-600">
          This page explains what personal data UM Racing Team collects
          through this website, why we collect it, and who can access it —
          in line with Malaysia&apos;s Personal Data Protection Act (PDPA)
          2010.
        </p>
      </Reveal>

      <div className="mt-10 space-y-6">
        <Reveal>
          <Card>
            <h2 className="text-xl font-bold text-navy">What We Collect</h2>
            <p className="mt-3 text-sm text-gray-600">
              When you submit an application through our{" "}
              <a href="/apply" className="text-race-red hover:underline">
                Apply page
              </a>
              , we collect your full name, email address, student ID (if
              provided), the department you&apos;re applying to, your
              motivation statement, and an optional resume file (PDF).
            </p>
          </Card>
        </Reveal>

        <Reveal delay={100}>
          <Card>
            <h2 className="text-xl font-bold text-navy">Why We Collect It</h2>
            <p className="mt-3 text-sm text-gray-600">
              This information is used solely to review and process your
              application to join UM Racing Team — evaluating your fit for
              the department you&apos;ve applied to and contacting you about
              the outcome.
            </p>
          </Card>
        </Reveal>

        <Reveal delay={150}>
          <Card>
            <h2 className="text-xl font-bold text-navy">Who Can Access It</h2>
            <p className="mt-3 text-sm text-gray-600">
              Application data is only visible to UM Racing Team admins and
              department heads through our access-controlled internal
              dashboard. Resume files are stored privately and are never
              publicly accessible.
            </p>
          </Card>
        </Reveal>

        <Reveal delay={200}>
          <Card>
            <h2 className="text-xl font-bold text-navy">Data Retention &amp; Your Rights</h2>
            <p className="mt-3 text-sm text-gray-600">
              We retain application data for as long as needed to run our
              recruitment cycle. You may request access to, correction of,
              or deletion of your data at any time by contacting us at{" "}
              <a href="mailto:akium.fs@gmail.com" className="text-race-red hover:underline">
                akium.fs@gmail.com
              </a>
              .
            </p>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
