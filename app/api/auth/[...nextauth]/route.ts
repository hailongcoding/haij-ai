import NextAuth from "next-auth";

console.log("Auth route loaded - SECRET present:", !!process.env.AUTH_SECRET);

/*
// This is the original NextAuth setup - commented out to disable auth calls
export const { handlers } = NextAuth({
  providers: [], // empty on purpose
  secret: process.env.AUTH_SECRET || "fallback-secret",
  debug: true,
});

export const { GET, POST } = handlers;
*/

// Instead: return 404 for ALL auth requests so frontend doesn't crash on /api/auth/guest etc.
export async function GET() {
  return new Response("Auth endpoints disabled", { status: 404 });
}

export async function POST() {
  return new Response("Auth endpoints disabled", { status: 404 });
}
