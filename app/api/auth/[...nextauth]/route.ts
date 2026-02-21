import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Log env vars to see if they are available
console.log("Auth route: AUTH_GOOGLE_ID =", process.env.AUTH_GOOGLE_ID || "MISSING")
console.log("Auth route: AUTH_GOOGLE_SECRET =", process.env.AUTH_GOOGLE_SECRET || "MISSING")
console.log("Auth route: AUTH_SECRET =", process.env.AUTH_SECRET || "MISSING")

if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET || !process.env.AUTH_SECRET) {
  console.error("Auth.js env vars missing - cannot initialize")
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  secret: process.env.AUTH_SECRET || "fallback-secret-for-debug", // temporary fallback
  debug: true, // enable verbose logs
  logger: {
    error: (code, ...message) => console.error(code, message),
    warn: (code) => console.warn(code),
    debug: (code, ...message) => console.log(code, message),
  },
})

export { handlers as GET, handlers as POST }
