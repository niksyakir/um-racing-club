"use client";

import { useActionState } from "react";
import { updateApplicationStatus } from "./actions";

const STATUSES = ["pending", "under_review", "accepted", "rejected", "waitlisted"];

const STATUS_STYLE = {
  pending: "bg-gray-100 text-gray-600",
  under_review: "bg-navy/10 text-navy",
  accepted: "bg-gradient-gold text-navy shadow-glow-gold",
  rejected: "bg-race-red/10 text-race-red",
  waitlisted: "bg-navy/10 text-navy",
};

const initialState = { error: null };

export default function StatusForm({ id, status }) {
  const updateWithId = updateApplicationStatus.bind(null, id);
  const [state, formAction, pending] = useActionState(updateWithId, initialState);

  return (
    <div>
      <form action={formAction} className="flex flex-wrap items-center gap-2">
        <select
          name="status"
          defaultValue={status}
          className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLE[status] ?? STATUS_STYLE.pending}`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending}
          className="text-xs font-semibold text-navy hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Saving..." : "Update"}
        </button>
      </form>
      {state?.error && (
        <p className="mt-1 text-xs font-medium text-race-red" role="alert">
          {state.error}
        </p>
      )}
    </div>
  );
}
