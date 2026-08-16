"use client";

import { useActionState } from "react";
import { updatePassword } from "./actions";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy/20 px-3 py-2 text-sm shadow-soft focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const inputErrorClass =
  "mt-1 w-full rounded-lg border border-race-red px-3 py-2 text-sm shadow-soft focus:border-race-red focus:outline-none focus:ring-2 focus:ring-race-red/20";
const labelClass = "block text-sm font-semibold text-navy";
const fieldErrorClass = "mt-1 text-xs font-medium text-race-red";

const initialState = { error: null, fieldErrors: {}, success: false };

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState(updatePassword, initialState);
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <div className="mt-6 rounded-xl border border-navy/10 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-bold text-navy">Change Password</h2>

      <form action={formAction} className="mt-4 max-w-md space-y-4">
        <div>
          <label htmlFor="password" className={labelClass}>
            New Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? "new-password-error" : undefined}
            className={fieldErrors.password ? inputErrorClass : inputClass}
          />
          {fieldErrors.password && (
            <p id="new-password-error" className={fieldErrorClass} role="alert">
              {fieldErrors.password}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirm_password" className={labelClass}>
            Confirm New Password
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            required
            autoComplete="new-password"
            aria-invalid={Boolean(fieldErrors.confirm_password)}
            aria-describedby={fieldErrors.confirm_password ? "confirm-password-error" : undefined}
            className={fieldErrors.confirm_password ? inputErrorClass : inputClass}
          />
          {fieldErrors.confirm_password && (
            <p id="confirm-password-error" className={fieldErrorClass} role="alert">
              {fieldErrors.confirm_password}
            </p>
          )}
        </div>

        {state.success && (
          <p className="text-sm font-medium text-navy" role="status">
            Password updated.
          </p>
        )}
        {state.error && (
          <p className="text-sm font-medium text-race-red" role="alert">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded bg-navy px-6 py-3 font-semibold text-white shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {pending ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
