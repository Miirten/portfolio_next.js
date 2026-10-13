import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import sql from "@/lib/db";

const loginSchema = z.object({
  email: z.string().trim().email().transform((value) =>
    value.toLowerCase()
  ),
  password: z.string().min(1).max(72),
});

type DatabaseUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        try {
          const users = await sql<DatabaseUser[]>`
            SELECT id, name, email, password_hash
            FROM users
            WHERE email = ${parsed.data.email}
            LIMIT 1
          `;

          const user = users[0];

          if (!user) {
            return null;
          }

          const passwordMatches = await bcrypt.compare(
            parsed.data.password,
            user.password_hash
          );

          if (!passwordMatches) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Authentication database error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
});