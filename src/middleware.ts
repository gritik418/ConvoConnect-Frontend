import { NextRequest, NextResponse } from "next/server";
import { CCToken } from "./constants/variables";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(CCToken);
  if (!authToken) return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/"],
};
