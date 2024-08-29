import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check if the path starts with /admin
  if (pathname.startsWith('/admin')) {
    // Get the token from cookies
    const token = req.cookies.get('token')?.value;

    // If no token, redirect to login pages
    if (!token) {
      console.log(`No token found for path ${pathname}. Redirecting to login page...`);
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify the token
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    } catch (err) {
      // If the token is invalid or expired, redirect to login
      console.log(`Invalid token for path ${pathname}. Redirecting to login page...`);
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Continue the request if token is valid or not accessing /admin/*
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply this middleware to all /admin routes
};
