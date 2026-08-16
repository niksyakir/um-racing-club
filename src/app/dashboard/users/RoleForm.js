"use client";

import { useActionState } from "react";
import { updateUserRoles } from "./actions";

const initialState = { error: null };

export default function RoleForm({ userId, allRoles, currentRoles }) {
  const updateWithId = updateUserRoles.bind(null, userId);
  const [state, formAction, pending] = useActionState(updateWithId, initialState);

  return (
    <div>
      <form action={formAction} className="mt-3 flex flex-wrap items-center gap-4">
        {allRoles.map((roleOption) => (
          <label key={roleOption.id} className="flex items-center gap-2 text-sm text-navy">
            <input
              type="checkbox"
              name="roles"
              value={roleOption.name}
              defaultChecked={currentRoles.includes(roleOption.name)}
              className="h-4 w-4 rounded border-navy/30"
            />
            {roleOption.name}
          </label>
        ))}
        <button
          type="submit"
          disabled={pending}
          className="ml-auto rounded bg-navy px-4 py-1.5 text-xs font-semibold text-white shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {pending ? "Saving..." : "Save Roles"}
        </button>
      </form>
      {state?.error && (
        <p className="mt-2 text-xs font-medium text-race-red" role="alert">
          {state.error}
        </p>
      )}
    </div>
  );
}
