"use client";

import { useEffect } from "react";

export default function DashboardErrorBoundary({ error, unstable_retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-xl border border-race-red/30 bg-race-red/5 px-6 py-10 text-center">
      <p className="font-semibold text-race-red">Something went wrong</p>
      <p className="mt-1 text-sm text-gray-600">
        We couldn&apos;t load this section of the dashboard. Please try
        again.
      </p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-4 rounded bg-navy px-5 py-2 text-sm font-semibold text-white shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
      >
        Try Again
      </button>
    </div>
  );
}
