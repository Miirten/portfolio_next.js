import Link from "next/link";
import { auth } from "@/auth";
import { getComments } from "@/app/actions/comments";
import CommentForm from "@/components/comment-form";
import DeleteCommentButton from "@/components/delete-comment-button";
import type { CommentsSectionProps } from "@/lib/types";

export default async function CommentsSection({
  articleId,
}: CommentsSectionProps) {
  const [session, result] = await Promise.all([
    auth(),
    getComments(articleId),
  ]);

  return (
    <section
      aria-labelledby="comments-heading"
      className="mt-16 border-t border-slate-800 pt-10"
    >
      <h2 id="comments-heading" className="mb-6 text-2xl font-bold">
        Comments
      </h2>

      {session?.user?.id ? (
        <CommentForm mode="create" articleId={articleId} />
      ) : (
        <p className="text-slate-400">
          <Link href="/login" className="text-cyan-400 hover:underline">
            Sign in
          </Link>{" "}
          to leave a comment.
        </p>
      )}

      {!result.success ? (
        <p role="alert" className="mt-8 text-red-300">
          {result.error}
        </p>
      ) : result.data.length === 0 ? (
        <p className="mt-8 text-slate-400">
          No comments yet.
        </p>
      ) : (
        <ul className="mt-8 space-y-6">
          {result.data.map((comment) => (
            <li
              key={comment.id}
              className="rounded-xl border border-slate-800 p-5"
            >
              <p className="font-semibold">{comment.author_name}</p>

              <p className="mt-3 whitespace-pre-wrap text-slate-300">
                {comment.body}
              </p>

              {session?.user?.id === comment.user_id && (
                <div className="mt-5">
                  <details>
                    <summary className="cursor-pointer text-sm text-cyan-400">
                      Edit comment
                    </summary>

                    <div className="mt-4">
                      <CommentForm
                        mode="edit"
                        commentId={comment.id}
                        body={comment.body}
                      />
                    </div>
                  </details>

                  <DeleteCommentButton commentId={comment.id} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}