import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Debug logs (will show in Vercel logs)
console.log("Auth route loaded")
console.log("AUTH_GOOGLE_ID:", process.env.AUTH_GOOGLE_ID ? "present" : "MISSING")
console.log("AUTH_GOOGLE_SECRET:", process.env.AUTH_GOOGLE_SECRET ? "present" : "MISSING")
console.log("AUTH_SECRET:", process.env.AUTH_SECRET ? "present" : "MISSING")

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  secret: process.env.AUTH_SECRET || "fallback-secret-for-debug", // fallback to avoid undefined crash
  debug: true, // enables detailed Auth.js logs in Vercel
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  // Disable guest mode explicitly
  experimental: {
    enableGuest: false,
  },
})

export { handlers as GET, handlers as POST }
