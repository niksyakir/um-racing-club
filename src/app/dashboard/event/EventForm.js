"use client";

import { useActionState } from "react";
import { saveEvent } from "./actions";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy/20 px-3 py-2 text-sm shadow-soft focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const labelClass = "block text-sm font-semibold text-navy";

const initialState = { error: null };

function toMalaysiaLocalInputValue(isoString) {
  if (!isoString) return "";
  // Pure UTC-instant math so this is correct regardless of the
  // server/browser's own timezone: shift the absolute instant by the
  // fixed Malaysia (+08:00) offset, then read it back out as if it
  // were UTC to get the Malaysia wall-clock string.
  const malaysiaMs = new Date(isoString).getTime() + 8 * 60 * 60 * 1000;
  return new Date(malaysiaMs).toISOString().slice(0, 16);
}

export default function EventForm({ event }) {
  const [state, formAction, pending] = useActionState(saveEvent, initialState);

  return (
    <form action={formAction} className="mt-6 max-w-xl space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>
          Event Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={event?.name}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="event_at" className={labelClass}>
          Event Date &amp; Time (Malaysia time, UTC+8)
        </label>
        <input
          id="event_at"
          name="event_at"
          type="datetime-local"
          required
          defaultValue={toMalaysiaLocalInputValue(event?.event_at)}
          className={inputClass}
        />
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
        {pending ? "Saving..." : "Save Event"}
      </button>
    </form>
  );
}
