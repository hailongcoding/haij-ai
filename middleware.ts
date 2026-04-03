import { auth } from "@/app/(auth)/auth";
import { NextResponse } from "next/server";

export default auth((req: any) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth?.user;

  // Never touch these — auth endpoints, static files, health check
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname === "/ping"
  ) {
    return NextResponse.next();
  }

  // Not logged in → redirect to guest auto-login
  if (!isLoggedIn) {
    const guestUrl = new URL("/api/auth/guest", req.nextUrl.origin);
    guestUrl.searchParams.set("redirectUrl", req.url);
    return NextResponse.redirect(guestUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
