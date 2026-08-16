import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center md:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-race-red">
        403
      </p>
      <h1 className="font-display mt-2 text-4xl tracking-wide text-navy md:text-5xl">
        Not Authorized
      </h1>
      <p className="mt-4 text-sm text-gray-600">
        Your account doesn&apos;t have access to this page. If you think
        this is a mistake, contact a team admin.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded bg-navy px-6 py-3 font-semibold text-white shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
      >
        Back to Home
      </Link>
    </main>
  );
}
