"use client";

import { useActionState } from "react";
import { deleteComment } from "@/app/actions/comments";

export default function DeleteCommentButton({
  commentId,
}: {
  commentId: string;
}) {
  const [state, formAction, pending] = useActionState(
    deleteComment,
    { error: "" }
  );

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("Delete this comment?")) {
          event.preventDefault();
        }
      }}
      className="mt-4"
    >
      <input type="hidden" name="commentId" value={commentId} />

      <button
        type="submit"
        disabled={pending}
        className="text-sm text-red-300 disabled:opacity-50"
      >
        {pending ? "Deleting..." : "Delete comment"}
      </button>

      {state.error && (
        <p role="alert" className="mt-2 text-sm text-red-300">
          {state.error}
        </p>
      )}
    </form>
  );
}