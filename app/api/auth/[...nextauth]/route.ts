import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

console.log("Auth route loaded - GOOGLE_ID:", process.env.AUTH_GOOGLE_ID ? "present" : "MISSING")
console.log("Auth route loaded - GOOGLE_SECRET:", process.env.AUTH_GOOGLE_SECRET ? "present" : "MISSING")
console.log("Auth route loaded - SECRET:", process.env.AUTH_SECRET ? "present" : "MISSING")

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  debug: true,
  experimental: {
    enableGuest: false,  // ← disables /api/auth/guest completely
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
})

export { handlers as GET, handlers as POST }
