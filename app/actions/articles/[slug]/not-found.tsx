import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-center text-slate-100">
      <h1 className="text-4xl font-bold">Article not found</h1>

      <p className="mt-4 text-slate-400">
        This article does not exist.
      </p>

      <Link
        href="/articles"
        className="mt-8 inline-block rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950"
      >
        Browse articles
      </Link>
    </main>
  );
}