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

  const refreshToken = request.cookies.get("refreshToken");

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
  matcher: ["/booking", "/admin/:path*"],
};
