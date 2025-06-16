import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Check if the path starts with a language code (e.g., /es, /en)
  const parts = url.pathname.split('/');
  const hasLang = parts.length > 1 && (parts[1] === 'es' || parts[1] === 'en');

  // Check if the request is for a public file (e.g., .js, .css, .png)
  if (PUBLIC_FILE.test(url.pathname)) {
    return NextResponse.next();
  }

  // If no language is present and it's not a public file, redirect to default language (Spanish)
  if (!hasLang && url.pathname !== '/') {
    const newUrl = new URL(`/es${url.pathname}`, request.url);
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