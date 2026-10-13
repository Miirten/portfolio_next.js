import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/app/actions/auth";

export default async function AccountControls() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/login" className="text-sm text-cyan-400">
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="text-slate-300">
        {session.user.name ?? "Signed in"}
      </span>

      <form action={logout}>
        <button type="submit" className="text-cyan-400">
          Sign out
        </button>
      </form>
    </div>
  );
}