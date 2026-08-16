"use client";

import { useActionState } from "react";

const initialState = { error: null };

export default function DeleteButton({ action, id, label = "item" }) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div>
      <form
        action={formAction}
        onSubmit={(event) => {
          if (!window.confirm(`Delete this ${label}? This can't be undone.`)) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          disabled={pending}
          className="font-semibold text-race-red hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Deleting..." : "Delete"}
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
