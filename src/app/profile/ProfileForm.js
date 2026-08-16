"use client";

import { useActionState } from "react";
import { updateProfile } from "./actions";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy/20 px-3 py-2 text-sm shadow-soft focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const inputErrorClass =
  "mt-1 w-full rounded-lg border border-race-red px-3 py-2 text-sm shadow-soft focus:border-race-red focus:outline-none focus:ring-2 focus:ring-race-red/20";
const labelClass = "block text-sm font-semibold text-navy";
const fieldErrorClass = "mt-1 text-xs font-medium text-race-red";

const initialState = { error: null, fieldErrors: {}, success: false };

export default function ProfileForm({ profile }) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <div className="rounded-xl border border-navy/10 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-bold text-navy">Profile</h2>

      <form action={formAction} className="mt-4 max-w-md space-y-4">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-gold font-display text-2xl text-navy">
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
            ) : (
              (profile?.full_name || "?").charAt(0).toUpperCase()
            )}
          </span>
          <div className="min-w-0 flex-1">
            <label htmlFor="avatar" className={labelClass}>
              Profile Photo
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              aria-invalid={Boolean(fieldErrors.avatar)}
              aria-describedby={fieldErrors.avatar ? "avatar-error" : undefined}
              className={`${
                fieldErrors.avatar ? inputErrorClass : inputClass
              } file:mr-3 file:rounded file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white`}
            />
            {fieldErrors.avatar && (
              <p id="avatar-error" className={fieldErrorClass} role="alert">
                {fieldErrors.avatar}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="full_name" className={labelClass}>
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            defaultValue={profile?.full_name ?? ""}
            aria-invalid={Boolean(fieldErrors.full_name)}
            aria-describedby={fieldErrors.full_name ? "full-name-error" : undefined}
            className={fieldErrors.full_name ? inputErrorClass : inputClass}
          />
          {fieldErrors.full_name && (
            <p id="full-name-error" className={fieldErrorClass} role="alert">
              {fieldErrors.full_name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={profile?.phone ?? ""}
            className={inputClass}
          />
        </div>

        {state.success && (
          <p className="text-sm font-medium text-navy" role="status">
            Profile saved.
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
          className="rounded bg-race-red px-6 py-3 font-semibold text-white shadow-glow-red transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-glow-red-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {pending ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
