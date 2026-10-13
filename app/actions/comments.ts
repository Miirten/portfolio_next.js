"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import sql from "@/lib/db";
import type { ArticleComment, Result } from "@/lib/types";
import type { FormState } from "@/lib/form-state";

const uuidSchema = z.string().uuid();
const bodySchema = z.string().trim().min(1).max(2000);

export async function getComments(
  articleId: string
): Promise<Result<ArticleComment[]>> {
  if (!uuidSchema.safeParse(articleId).success) {
    return { success: false, error: "Invalid article." };
  }

  try {
    const comments = await sql<ArticleComment[]>`
      SELECT
        c.id,
        c.user_id,
        u.name AS author_name,
        c.body
      FROM comments c
      JOIN users u ON u.id = c.user_id
      WHERE c.article_id = ${articleId}
      ORDER BY c.created_at DESC, c.id DESC
    `;

    return { success: true, data: comments };
  } catch (error) {
    console.error("Unable to read comments:", error);

    return {
      success: false,
      error: "Unable to load comments.",
    };
  }
}

export async function createComment(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = z.object({
    articleId: uuidSchema,
    body: bodySchema,
  }).safeParse({
    articleId: formData.get("articleId"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return { error: "Enter a comment between 1 and 2,000 characters." };
  }

  let slug: string;

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Sign in before adding a comment." };
    }

    const articles = await sql<{ slug: string }[]>`
      SELECT slug
      FROM articles
      WHERE id = ${parsed.data.articleId}
      LIMIT 1
    `;

    if (!articles[0]) {
      return { error: "Article not found." };
    }

    slug = articles[0].slug;

    await sql`
      INSERT INTO comments (article_id, user_id, body)
      VALUES (
        ${parsed.data.articleId},
        ${session.user.id},
        ${parsed.data.body}
      )
    `;
  } catch (error) {
    console.error("Unable to create comment:", error);
    return { error: "Unable to save your comment." };
  }

  revalidatePath(`/articles/${slug}`);
  return { error: "" };
}

export async function updateComment(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = z.object({
    commentId: uuidSchema,
    body: bodySchema,
  }).safeParse({
    commentId: formData.get("commentId"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return { error: "Invalid comment or comment text." };
  }

  let slug: string;

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Sign in before editing a comment." };
    }

    const updated = await sql<{ slug: string }[]>`
      UPDATE comments AS c
      SET body = ${parsed.data.body}, updated_at = NOW()
      FROM articles AS a
      WHERE c.id = ${parsed.data.commentId}
        AND c.user_id = ${session.user.id}
        AND a.id = c.article_id
      RETURNING a.slug
    `;

    if (!updated[0]) {
      return {
        error: "Comment not found, or you do not own this comment.",
      };
    }

    slug = updated[0].slug;
  } catch (error) {
    console.error("Unable to update comment:", error);
    return { error: "Unable to update your comment." };
  }

  revalidatePath(`/articles/${slug}`);
  return { error: "" };
}

export async function deleteComment(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = uuidSchema.safeParse(formData.get("commentId"));

  if (!parsed.success) {
    return { error: "Invalid comment." };
  }

  let slug: string;

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Sign in before deleting a comment." };
    }

    const deleted = await sql<{ slug: string }[]>`
      DELETE FROM comments AS c
      USING articles AS a
      WHERE c.id = ${parsed.data}
        AND c.user_id = ${session.user.id}
        AND a.id = c.article_id
      RETURNING a.slug
    `;

    if (!deleted[0]) {
      return {
        error: "Comment not found, or you do not own this comment.",
      };
    }

    slug = deleted[0].slug;
  } catch (error) {
    console.error("Unable to delete comment:", error);
    return { error: "Unable to delete your comment." };
  }

  revalidatePath(`/articles/${slug}`);
  return { error: "" };
}