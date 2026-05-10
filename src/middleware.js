import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the auth token from cookies
  const authToken = request.cookies.get('auth_token')?.value;

  // Paths that require authentication
  const protectedPaths = [
    '/dashboard',
    '/database-kerja-sama',
    '/kebijakan-prioritas',
    '/progress-dokumen'
  ];

  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // If trying to access protected route without token, redirect to login
  if (isProtectedPath && !authToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access login while already authenticated, redirect to dashboard
  if (request.nextUrl.pathname === '/login' && authToken) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
