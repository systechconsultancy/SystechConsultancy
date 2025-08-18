import { NextResponse } from "next/server";

export function middleware(request) {
  // Routes that should only be accessible to logged-out users
  const publicOnlyRoutes = ['/login', '/signup'];
  
  // Routes that require a user to be logged in
  const protectedRoutes = ['/dashboard', '/profile', '/profile/edit'];

  const token = request.cookies.get("refresh_token")?.value;
  const { pathname } = request.nextUrl;

  // --- Redirect logged-in users away from login/signup ---
  if (token && publicOnlyRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // --- Redirect logged-out users away from protected pages ---
  if (!token && (protectedRoutes.includes(pathname) || pathname.startsWith('/workshops/payment'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Config to specify on which routes the middleware should run
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/dashboard/:path*',
    '/counselling/:path*',
    '/profile/:path*',
    '/workshops/:slug/register',
    '/workshops/payment/:slug'
  ],
};