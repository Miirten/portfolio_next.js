import AuthForm from "@/components/auth-form";
import Link from "next/link";


export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const { registered } = await searchParams;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="text-sm text-cyan-400 hover:underline"
        >
          ← Back to portfolio
        </Link>

        <h1 className="mt-8 text-3xl font-bold">Sign in</h1>

        {registered === "1" && (
          <p className="mt-4 text-cyan-300">
            Account created. You can now sign in.
          </p>
        )}

        <AuthForm mode="login" />
      </div>
    </main>
  );
}