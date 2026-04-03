import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { createGuestUser, getUser } from "@/lib/db/queries";
import { generateHashedPassword } from "@/lib/db/utils";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user } from "@/lib/db/schema";

export type UserType = "guest" | "regular" | "admin";

const ADMIN_EMAIL = "hailongcoding@gmail.com";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      type: UserType;
    };
  }
  interface User {
    type?: UserType;
  }
}

async function ensureGoogleUserInDB(email: string, googleId: string) {
  const existing = await getUser(email);
  if (existing.length > 0) return existing[0];

  // Create user in DB for first-time Google login
  const client = postgres(process.env.POSTGRES_URL!);
  const db = drizzle(client);
  const [newUser] = await db
    .insert(user)
    .values({
      email,
      password: generateHashedPassword(googleId), // use googleId as password hash
    })
    .returning({ id: user.id, email: user.email });
  await client.end();
  return newUser;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.type = user.type ?? "regular";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.type = token.email === ADMIN_EMAIL
          ? "admin"
          : (token.type as UserType) ?? "regular";
      }
      return session;
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      async profile(profile) {
        const dbUser = await ensureGoogleUserInDB(profile.email, profile.sub);
        return {
          id: dbUser.id,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          type: profile.email === ADMIN_EMAIL ? "admin" : "regular",
        };
      },
    }),
    Credentials({
      id: "guest",
      name: "Guest",
      credentials: {},
      async authorize() {
        try {
          const [guestUser] = await createGuestUser();
          return {
            id: guestUser.id,
            email: guestUser.email,
            type: "guest" as UserType,
          };
        } catch (e) {
          console.error("Guest user creation failed:", e);
          return null;
        }
      },
    }),
    Credentials({
      id: "credentials",
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const users = await getUser(credentials.email as string);
        if (users.length === 0) return null;
        const u = users[0];
        const hashed = generateHashedPassword(credentials.password as string);
        if (u.password !== hashed) return null;
        return {
          id: u.id,
          email: u.email,
          type: u.email === ADMIN_EMAIL ? "admin" : "regular",
        };
      },
    }),
  ],
});
