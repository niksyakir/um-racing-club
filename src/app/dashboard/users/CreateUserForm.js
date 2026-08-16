"use client";

import { useActionState, useState } from "react";
import { createTeamMember } from "./actions";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy/20 px-3 py-2 text-sm shadow-soft focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const inputErrorClass =
  "mt-1 w-full rounded-lg border border-race-red px-3 py-2 text-sm shadow-soft focus:border-race-red focus:outline-none focus:ring-2 focus:ring-race-red/20";
const labelClass = "block text-sm font-semibold text-navy";
const fieldErrorClass = "mt-1 text-xs font-medium text-race-red";

const initialState = { error: null, fieldErrors: {}, success: false };

function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = new Uint32Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (n) => chars[n % chars.length]).join("");
}

export default function CreateUserForm() {
  const [state, formAction, pending] = useActionState(createTeamMember, initialState);
  const fieldErrors = state.fieldErrors ?? {};
  const [password, setPassword] = useState("");

  return (
    <div className="rounded-xl border border-navy/10 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-bold text-navy">Add Team Member</h2>
      <p className="mt-1 text-sm text-gray-600">
        Creates their account directly here — no need to go into Supabase.
        Share the temporary password with them so they can log in.
      </p>

      {state.success ? (
        <div className="mt-4 rounded-lg border border-gold bg-gold/10 p-4">
          <p className="font-semibold text-navy">
            Account created for {state.createdEmail}
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Temporary password:{" "}
            <span className="font-mono font-bold text-navy">{state.createdPassword}</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Copy this now — it won&apos;t be shown again. They&apos;ve been
            given the default &quot;member&quot; role; assign more below.
          </p>
          <a
            href="/dashboard/users"
            className="mt-3 inline-block text-sm font-semibold text-navy hover:underline"
          >
            Add another member
          </a>
        </div>
      ) : (
        <form action={formAction} className="mt-4 space-y-4">
          <div>
            <label htmlFor="full_name" className={labelClass}>
              Full Name (optional)
            </label>
            <input id="full_name" name="full_name" type="text" className={inputClass} />
          </div>

          <div>
            <label htmlFor="new_email" className={labelClass}>
              Email
            </label>
            <input
              id="new_email"
              name="email"
              type="email"
              required
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "new-email-error" : undefined}
              className={fieldErrors.email ? inputErrorClass : inputClass}
            />
            {fieldErrors.email && (
              <p id="new-email-error" className={fieldErrorClass} role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="new_password" className={labelClass}>
              Temporary Password
            </label>
            <div className="mt-1 flex gap-2">
              <input
                id="new_password"
                name="password"
                type="text"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? "new-password-error" : undefined}
                className={fieldErrors.password ? inputErrorClass : inputClass}
              />
              <button
                type="button"
                onClick={() => setPassword(generatePassword())}
                className="shrink-0 rounded border border-navy/20 px-3 text-xs font-semibold text-navy transition-colors hover:bg-navy/5"
              >
                Generate
              </button>
            </div>
            {fieldErrors.password && (
              <p id="new-password-error" className={fieldErrorClass} role="alert">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {state.error && (
            <p className="text-sm font-medium text-race-red" role="alert">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="rounded bg-race-red px-6 py-3 font-semibold text-white shadow-glow-red transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-glow-red-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {pending ? "Creating..." : "Create Account"}
          </button>
        </form>
      )}
    </div>
  );
}
