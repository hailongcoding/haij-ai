import NextAuth from "next-auth";

console.log("Auth route loaded - SECRET present:", !!process.env.AUTH_SECRET);

export const { handlers } = NextAuth({
  providers: [], // empty on purpose
  secret: process.env.AUTH_SECRET || "fallback-secret",
  debug: true,
});

export const { GET, POST } = handlers;
