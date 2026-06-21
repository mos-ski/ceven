import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "ceven_admin_session";
const AUTH_PATHS = ["/login", "/signup", "/reset-password", "/verify-email"];

export function proxy(request: NextRequest) {
  const hasSession = request.cookies.get(SESSION_COOKIE)?.value === "active";
  const { pathname } = request.nextUrl;
  const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if (!hasSession && !isAuthPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasSession && isAuthPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.\\w+$).*)"],
};
