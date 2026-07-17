import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "ceven_admin_session";
const PUBLIC_PATHS = [
  "/",
  "/about",
  "/for-creches",
  "/for-parents",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/data-and-children",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/caregiver") || pathname.startsWith("/parent")) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.get(SESSION_COOKIE)?.value === "active";

  if (!hasSession) {
    const response = NextResponse.redirect(new URL("/admin/v1/dashboard", request.url));
    response.cookies.set(SESSION_COOKIE, "active", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.\\w+$).*)"],
};
