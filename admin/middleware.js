
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");
  return new TextEncoder().encode(secret);
}

export async function middleware(request) {
  const token = request.cookies.get("access_token")?.value;
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // If token not present
  if (!token) {
    if (pathname !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next(); // allow /login
  }

  // If token present
  try {
    const res = await jwtVerify(token, getJwtSecretKey());

    // Already logged in and trying to access login → redirect to dashboard
    if (pathname === "/login") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    // Invalid token → delete and redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("access_token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|logo.png).*)"],
};
