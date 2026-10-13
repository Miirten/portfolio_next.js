import Link from "next/link";
import { getArticles } from "@/app/actions/articles";

export default async function ArticlesPage() {
  const result = await getArticles();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm text-cyan-400 hover:underline"
        >
          ← Back to portfolio
        </Link>

        <h1 className="mt-8 text-4xl font-bold">Articles</h1>

        <p className="mt-4 text-slate-400">
          Notes about my projects and what I am learning.
        </p>

        {!result.success ? (
          <p
            role="alert"
            className="mt-10 rounded-lg border border-red-900 bg-red-950/30 p-4 text-red-300"
          >
            {result.error}
          </p>
        ) : result.data.length === 0 ? (
          <p className="mt-10 text-slate-400">
            No articles have been published yet.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {result.data.map((article) => (
              <article
                key={article.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <h2 className="text-xl font-semibold">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="hover:text-cyan-400"
                  >
                    {article.title}
                  </Link>
                </h2>

                <p className="mt-4 leading-7 text-slate-400">
                  {article.excerpt}
                </p>

                <Link
                  href={`/articles/${article.slug}`}
                  className="mt-6 inline-block text-sm font-medium text-cyan-400 hover:underline"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}