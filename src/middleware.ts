import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const protectedRoutes = ["/booking", "/admin", "/profile", "/bookings"];
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get("refreshToken")?.value;

  console.log("Refresh token in prod:", refreshToken);

  if (!refreshToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      `${pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/booking/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/bookings/:path*",
  ],
};
