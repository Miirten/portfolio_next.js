import AuthForm from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold">Create account</h1>
        <AuthForm mode="register" />
      </div>
    </main>
  );
}