"use server";

import sql from "@/lib/db";
import type {
  Article,
  ArticleSummary,
  Result,
} from "@/lib/types";

export async function getArticles(): Promise<
  Result<ArticleSummary[]>
> {
  try {
    const articles = await sql<ArticleSummary[]>`
      SELECT id, slug, title, excerpt
      FROM articles
      ORDER BY created_at DESC, id DESC
    `;

    return {
      success: true,
      data: articles,
    };
  } catch (error) {
    console.error("Failed to fetch articles:", error);

    return {
      success: false,
      error: "Unable to load articles. Please try again later.",
    };
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<Result<Article | null>> {
  try {
    const articles = await sql<Article[]>`
      SELECT id, slug, title, excerpt, body
      FROM articles
      WHERE slug = ${slug}
      LIMIT 1
    `;

    return {
      success: true,
      data: articles[0] ?? null,
    };
  } catch (error) {
    console.error("Failed to fetch article:", error);

    return {
      success: false,
      error: "Unable to load this article. Please try again later.",
    };
  }
}