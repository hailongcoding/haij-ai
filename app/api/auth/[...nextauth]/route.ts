import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log("Auth.js loaded - GOOGLE_ID:", process.env.AUTH_GOOGLE_ID ? "present" : "MISSING");
console.log("Auth.js loaded - GOOGLE_SECRET:", process.env.AUTH_GOOGLE_SECRET ? "present" : "MISSING");
console.log("Auth.js loaded - SECRET:", process.env.AUTH_SECRET ? "present" : "MISSING");

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  debug: true, // <--- enable debug logs
});

export { handlers as GET, handlers as POST };
