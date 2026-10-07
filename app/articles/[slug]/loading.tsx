export default function ArticleLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading article"
      className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100"
    >
      <div className="mx-auto max-w-3xl">
        <p role="status" className="sr-only">
          Loading article...
        </p>

        <div
          aria-hidden="true"
          className="space-y-8 motion-safe:animate-pulse"
        >
          {/* Back link placeholder */}
          <div className="h-4 w-32 rounded bg-slate-800" />

          {/* Title placeholder */}
          <div className="space-y-3">
            <div className="h-10 w-full rounded bg-slate-800" />
            <div className="h-10 w-2/3 rounded bg-slate-800" />
          </div>

          {/* Excerpt placeholder */}
          <div className="space-y-3">
            <div className="h-5 w-full rounded bg-slate-800" />
            <div className="h-5 w-3/4 rounded bg-slate-800" />
          </div>

          {/* Article body placeholder */}
          <div className="space-y-4 border-t border-slate-800 pt-10">
            <div className="h-4 w-full rounded bg-slate-800" />
            <div className="h-4 w-full rounded bg-slate-800" />
            <div className="h-4 w-5/6 rounded bg-slate-800" />
            <div className="h-4 w-full rounded bg-slate-800" />
            <div className="h-4 w-2/3 rounded bg-slate-800" />
          </div>
        </div>
      </div>
    </main>
  );
}