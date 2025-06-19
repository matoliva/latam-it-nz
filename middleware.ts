import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Check if the request is for a public file (e.g., .js, .css, .png)
  if (PUBLIC_FILE.test(url.pathname)) {
    return NextResponse.next();
  }

  // Supported languages
  const supportedLangs = ['es', 'en']; // Add more if needed
  const pathSegments = url.pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  // If the first segment is not a supported language, redirect to default lang
  if (!supportedLangs.includes(firstSegment)) {
    const newPath = ['/es', ...pathSegments].join('/').replace(/\/+/g, '/');
    const newUrl = new URL(newPath.startsWith('/') ? newPath : '/' + newPath, request.url);
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