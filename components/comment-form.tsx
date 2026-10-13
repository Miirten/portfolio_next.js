"use client";

import { useActionState } from "react";
import {
  createComment,
  updateComment,
} from "@/app/actions/comments";

type CommentFormProps =
  | {
      mode: "create";
      articleId: string;
    }
  | {
      mode: "edit";
      commentId: string;
      body: string;
    };

export default function CommentForm(props: CommentFormProps) {
  const [state, formAction, pending] = useActionState(
    props.mode === "create" ? createComment : updateComment,
    { error: "" }
  );

  const fieldId =
    props.mode === "create"
      ? `new-comment-${props.articleId}`
      : `edit-comment-${props.commentId}`;

  return (
    <form action={formAction} className="space-y-3">
      {props.mode === "create" ? (
        <input
          type="hidden"
          name="articleId"
          value={props.articleId}
        />
      ) : (
        <input
          type="hidden"
          name="commentId"
          value={props.commentId}
        />
      )}

      <label htmlFor={fieldId} className="block text-sm">
        {props.mode === "create" ? "Your comment" : "Edit your comment"}
      </label>

      <textarea
        id={fieldId}
        name="body"
        defaultValue={props.mode === "edit" ? props.body : ""}
        required
        maxLength={2000}
        rows={4}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-slate-100"
      />

      {state.error && (
        <p role="alert" className="text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50"
      >
        {pending
          ? "Saving..."
          : props.mode === "create"
            ? "Post comment"
            : "Save changes"}
      </button>
    </form>
  );
}