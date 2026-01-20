import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "./types/user/enums";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // ✅ Not logged-in users trying to access protected routes
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Logged-in users trying to access login/register
  if (
    token &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    switch (token.role) {
      case UserRole.MEMBER:
        return NextResponse.redirect(new URL("/dashboard", request.url));
      case UserRole.ADMIN:
        return NextResponse.redirect(new URL("/admin", request.url));
      case UserRole.SUPER_ADMIN:
        return NextResponse.redirect(new URL("/super-admin", request.url));
    }
  }

  // ✅ Role-based route protection example (optional)
  // if (token?.role === UserRole.MEMBER && pathname.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }
  if (
    token?.role !== UserRole.SUPER_ADMIN &&
    pathname.startsWith("/super-admin")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/super-admin/:path*",
  ],
};
