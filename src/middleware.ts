import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for route protection
 * Runs before requests are completed to check authentication
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get authentication token from cookies
  const accessToken = request.cookies.get("accessToken");

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    if (!accessToken) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // TODO: Add role-based check here
    // You might want to decode the JWT to check if user has admin role
    // For now, just check if token exists

    return NextResponse.next();
  }

  // User routes protection (home, profile, etc.)
  if (pathname.startsWith("/home") || pathname.startsWith("/profile")) {
    if (!accessToken) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  // Redirect authenticated users away from login/register pages
  if (
    isPublicRoute &&
    accessToken &&
    (pathname === "/login" || pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}

/**
 * Configure which routes should run the middleware
 * Using matcher for better performance
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};
