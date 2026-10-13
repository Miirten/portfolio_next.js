"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, register } from "@/app/actions/auth";

type AuthFormProps = {
  mode: "login" | "register";
};

const inputClasses =
  "mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none";

export default function AuthForm({ mode }: AuthFormProps) {
  const isRegistration = mode === "register";

  const [state, formAction, pending] = useActionState(
    isRegistration ? register : login,
    { error: "" }
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      {isRegistration && (
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            className={inputClasses}
          />
        </div>
      )}

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={
            isRegistration ? "new-password" : "current-password"
          }
          required
          minLength={isRegistration ? 12 : 1}
          maxLength={72}
          className={inputClasses}
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-cyan-400 px-4 py-3 font-semibold text-slate-950 disabled:opacity-50"
      >
        {pending
          ? "Please wait..."
          : isRegistration
            ? "Create account"
            : "Sign in"}
      </button>

      <Link
        href={isRegistration ? "/login" : "/register"}
        className="block text-sm text-cyan-400 hover:underline"
      >
        {isRegistration
          ? "Already have an account? Sign in"
          : "Need an account? Register"}
      </Link>
    </form>
  );
}