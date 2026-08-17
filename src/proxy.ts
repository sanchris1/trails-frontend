import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const protectedRoutes = ["/booking", "/admin"];

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some(
    (item) => pathname === item || pathname.startsWith(`${item}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = request.cookies.get("better-auth.session_token");

  console.log("PROXY:", {
    pathname,
    hasSession: !!session,
    cookies: request.cookies.getAll().map((cookie) => cookie.name),
  });

  if (session) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/auth/login", request.url);

  loginUrl.searchParams.set(
    "callbackUrl",
    `${pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/booking/:path*", "/admin/:path*"],
};
