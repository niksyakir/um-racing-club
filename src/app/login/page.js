"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const nextFieldErrors = {};
    if (!email.trim()) nextFieldErrors.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) nextFieldErrors.email = "Enter a valid email address.";
    if (!password) nextFieldErrors.password = "Password is required.";

    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) return;

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 md:px-6">
      <h1 className="font-display text-4xl tracking-wide text-navy md:text-5xl">
        Sign In
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Sign in with your UM Racing team account.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-navy">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-soft focus:outline-none focus:ring-2 ${
              fieldErrors.email
                ? "border-race-red focus:border-race-red focus:ring-race-red/20"
                : "border-navy/20 focus:border-navy focus:ring-navy/20"
            }`}
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1 text-xs font-medium text-race-red" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-navy">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-soft focus:outline-none focus:ring-2 ${
              fieldErrors.password
                ? "border-race-red focus:border-race-red focus:ring-race-red/20"
                : "border-navy/20 focus:border-navy focus:ring-navy/20"
            }`}
          />
          {fieldErrors.password && (
            <p id="password-error" className="mt-1 text-xs font-medium text-race-red" role="alert">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm font-medium text-race-red" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-race-red px-6 py-3 font-semibold text-white shadow-glow-red transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-glow-red-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-500">
        Don&apos;t have an account? Ask a team admin to create one for you.
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Forgot your password? Ask a team admin to reset it for you.
      </p>
    </main>
  );
}
