import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Check if the request is for a public file (e.g., .js, .css, .png)
  if (PUBLIC_FILE.test(url.pathname)) {
    return NextResponse.next();
  }

  // Only redirect the root path '/' to '/es'
  if (url.pathname === '/') {
    const newUrl = new URL('/es', request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};