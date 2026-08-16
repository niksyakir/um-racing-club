"use client";

import { useActionState } from "react";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy/20 px-3 py-2 text-sm shadow-soft focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const labelClass = "block text-sm font-semibold text-navy";

const initialState = { error: null };

export default function AchievementForm({ action, achievement }) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="mt-6 max-w-xl space-y-4">
      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={achievement?.title}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="competition_name" className={labelClass}>
          Competition
        </label>
        <input
          id="competition_name"
          name="competition_name"
          type="text"
          defaultValue={achievement?.competition_name ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            defaultValue={achievement?.category ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="placement" className={labelClass}>
            Placement
          </label>
          <input
            id="placement"
            name="placement"
            type="text"
            placeholder='e.g. "1st Place", "2nd Runner-up"'
            defaultValue={achievement?.placement ?? ""}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-gray-500">
            Use this exact phrasing so the placement badge on the public page
            styles it correctly.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="date_achieved" className={labelClass}>
          Date Achieved
        </label>
        <input
          id="date_achieved"
          name="date_achieved"
          type="date"
          defaultValue={achievement?.date_achieved ?? ""}
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
          defaultValue={achievement?.description ?? ""}
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="is_published"
          name="is_published"
          type="checkbox"
          defaultChecked={achievement?.is_published ?? true}
          className="h-4 w-4 rounded border-navy/30"
        />
        <label htmlFor="is_published" className="text-sm font-semibold text-navy">
          Published (visible on the public Achievements page)
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
        {pending ? "Saving..." : achievement ? "Save Changes" : "Add Achievement"}
      </button>
    </form>
  );
}
