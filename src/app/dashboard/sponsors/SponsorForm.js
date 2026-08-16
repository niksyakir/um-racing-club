"use client";

import { useActionState } from "react";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy/20 px-3 py-2 text-sm shadow-soft focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const labelClass = "block text-sm font-semibold text-navy";

const initialState = { error: null };

export default function SponsorForm({ action, sponsor }) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="mt-6 max-w-xl space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={sponsor?.name}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="tier" className={labelClass}>
          Tier
        </label>
        <select id="tier" name="tier" defaultValue={sponsor?.tier ?? ""} className={inputClass}>
          <option value="">— None —</option>
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
          <option value="in-kind">In-kind</option>
        </select>
      </div>

      <div>
        <label htmlFor="website_url" className={labelClass}>
          Website URL
        </label>
        <input
          id="website_url"
          name="website_url"
          type="url"
          defaultValue={sponsor?.website_url ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={sponsor?.description ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact_name" className={labelClass}>
            Contact Name
          </label>
          <input
            id="contact_name"
            name="contact_name"
            type="text"
            defaultValue={sponsor?.contact_name ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact_email" className={labelClass}>
            Contact Email
          </label>
          <input
            id="contact_email"
            name="contact_email"
            type="email"
            defaultValue={sponsor?.contact_email ?? ""}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="amount_contributed" className={labelClass}>
          Amount Contributed (RM)
        </label>
        <input
          id="amount_contributed"
          name="amount_contributed"
          type="number"
          step="0.01"
          defaultValue={sponsor?.amount_contributed ?? ""}
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="is_active"
          name="is_active"
          type="checkbox"
          defaultChecked={sponsor?.is_active ?? true}
          className="h-4 w-4 rounded border-navy/30"
        />
        <label htmlFor="is_active" className="text-sm font-semibold text-navy">
          Active (visible on the public Sponsors page)
        </label>
      </div>

      {state?.error && (
        <p className="rounded-lg bg-race-red/10 px-4 py-3 text-sm font-medium text-race-red" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-race-red px-6 py-3 font-semibold text-white shadow-glow-red transition-all duration-200 hover:-translate-y-0.5 hover:bg-race-red/90 hover:shadow-glow-red-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {pending ? "Saving..." : sponsor ? "Save Changes" : "Add Sponsor"}
      </button>
    </form>
  );
}
