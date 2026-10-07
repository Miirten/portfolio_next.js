import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/app/actions/articles";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);

  if (!result.success) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/articles"
            className="text-cyan-400 hover:underline"
          >
            ← Back to articles
          </Link>

          <p role="alert" className="mt-8 text-red-300">
            {result.error}
          </p>
        </div>
      </main>
    );
  }

  if (!result.data) {
    notFound();
  }

  const article = result.data;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/articles"
          className="text-sm text-cyan-400 hover:underline"
        >
          ← Back to articles
        </Link>

        <h1 className="mt-8 text-4xl font-bold leading-tight sm:text-5xl">
          {article.title}
        </h1>

        <p className="mt-6 text-xl leading-8 text-slate-400">
          {article.excerpt}
        </p>

        <div className="mt-10 whitespace-pre-wrap border-t border-slate-800 pt-10 text-lg leading-8 text-slate-300">
          {article.body}
        </div>
      </article>
    </main>
  );
}