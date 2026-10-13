"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import sql from "@/lib/db";
import type { FormState } from "@/lib/form-state";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(2000),
});

export async function submitContactMessage(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message ??
        "Please complete the form correctly.",
    };
  }

  try {
    await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (
        ${parsed.data.name},
        ${parsed.data.email},
        ${parsed.data.message}
      )
    `;
  } catch (error) {
    console.error("Unable to save contact message:", error);

    return {
      error: "Unable to send your message. Please try again.",
    };
  }

  revalidatePath("/");

  return {
    error: "",
  };
}