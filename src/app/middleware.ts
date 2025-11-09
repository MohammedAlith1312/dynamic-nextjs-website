import createMiddleware from 'next-intl/middleware';
import { routing } from '../i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req:any) {
  const url = req.nextUrl.clone();


   if (url.pathname === '/') {
    url.pathname = '/ar';
    return NextResponse.redirect(url);
  }
console.log("Middleware hit:", req.nextUrl.pathname);
return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(en|ar)/:path*'],
};
