"use client";

import { useActionState } from "react";
import { submitContactMessage } from "@/app/actions/contact";

const inputClasses =
  "mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactMessage,
    { error: "" }
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium">
          Name
        </label>

        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          placeholder="Your name"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium">
          Email
        </label>

        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@example.com"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>

        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={2000}
          placeholder="Tell me what you have in mind..."
          className={`${inputClasses} resize-y`}
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
        className="w-full rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-300 disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}