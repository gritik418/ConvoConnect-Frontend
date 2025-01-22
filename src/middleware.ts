import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CC_TOKEN } from "./constants/variables";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicPath =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/forgot-password");

  const token = request.cookies.get(CC_TOKEN);

  if (token?.value && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token?.value && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/chat/:path*",
    "/group/:path*",
    "/profile/:path*",
    "/signup/:path*",
    "/verify/:path*",
    "/reset-password/:path*",
    "/forgot-password/:path*",
  ],
};
