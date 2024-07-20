import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CC_TOKEN } from "./constants/variables";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(CC_TOKEN);
  const user: any = jwt.decode(token?.value!);
  if (user?.id) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/login/:path*", "/signup/:path*"],
};
