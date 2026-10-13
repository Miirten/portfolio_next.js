"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import sql from "@/lib/db";
import type { FormState } from "@/lib/form-state";

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().transform((value) =>
    value.toLowerCase()
  ),
  password: z
    .string()
    .min(12, "Use a password with at least 12 characters.")
    .max(72)
    .refine(
      (value) => new TextEncoder().encode(value).length <= 72,
      "Password must be no more than 72 bytes."
    ),
});

export async function register(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = registrationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid information.",
    };
  }

  try {
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    const inserted = await sql<{ id: string }[]>`
      INSERT INTO users (name, email, password_hash)
      VALUES (
        ${parsed.data.name},
        ${parsed.data.email},
        ${passwordHash}
      )
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;

    if (inserted.length === 0) {
      return {
        error: "Unable to create this account. Try signing in instead.",
      };
    }
  } catch (error) {
    console.error("Registration failed:", error);

    return {
      error: "Unable to create your account. Please try again.",
    };
  }

  redirect("/login?registered=1");
}

export async function login(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error:
          error.type === "CredentialsSignin"
            ? "Invalid email or password."
            : "Unable to sign in. Please try again.",
      };
    }

    // Successful Auth.js navigation also throws a redirect signal.
    throw error;
  }

  return { error: "" };
}

export async function logout() {
  await signOut({
    redirectTo: "/",
  });
}