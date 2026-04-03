import { signIn } from "@/app/(auth)/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl") ?? "/";

  try {
    // Sign in as guest - this creates a new guest user in DB each time
    await signIn("guest", { redirect: false });
  } catch {
    // signIn throws a redirect - that's normal, ignore it
  }

  return Response.redirect(new URL(redirectUrl, request.url));
}

export async function POST() {
  try {
    await signIn("guest", { redirect: false });
  } catch {}
  return Response.json({ ok: true });
}
