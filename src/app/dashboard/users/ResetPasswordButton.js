"use client";

import { useActionState } from "react";
import { resetTeamMemberPassword } from "./actions";

const initialState = { error: null, success: false, newPassword: null };

export default function ResetPasswordButton({ userId }) {
  const resetWithId = resetTeamMemberPassword.bind(null, userId);
  const [state, formAction, pending] = useActionState(resetWithId, initialState);

  if (state.success) {
    return (
      <div className="mt-1 rounded-lg border border-gold bg-gold/10 p-3 text-xs">
        <p className="font-semibold text-navy">New password:</p>
        <p className="mt-1 font-mono font-bold text-navy">{state.newPassword}</p>
        <p className="mt-1 text-gray-500">
          Copy this now and share it with them — it won&apos;t be shown again.
        </p>
      </div>
    );
  }

  return (
    <div>
      <form
        action={formAction}
        onSubmit={(event) => {
          if (
            !window.confirm(
              "Reset this member's password? Their current password will stop working immediately."
            )
          ) {
            event.preventDefault();
          }
        }}
      >
        <button
          type="submit"
          disabled={pending}
          className="font-semibold text-navy hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {state.error && (
        <p className="mt-1 text-xs font-medium text-race-red" role="alert">
          {state.error}
        </p>
      )}
    </div>
  );
}
