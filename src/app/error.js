"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalErrorBoundary({ error, unstable_retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center md:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-race-red">
        Error
      </p>
      <h1 className="font-display mt-2 text-4xl tracking-wide text-navy md:text-5xl">
        Something Went Wrong
      </h1>
      <p className="mt-4 text-sm text-gray-600">
        We ran into a problem loading this page. Please try again, or head
        back to the homepage.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="rounded bg-race-red px-6 py-3 font-semibold text-white shadow-glow-red transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-glow-red-lg"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded bg-navy px-6 py-3 font-semibold text-white shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
