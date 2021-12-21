import type { NextFetchEvent, NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export default async function middleware(
  request: NextRequest,

  event: NextFetchEvent,
) {
  const { pathname } = request.nextUrl;

  if (
    !pathname.includes('.') && // exclude all files in the public folder
    !pathname.startsWith('/api') // exclude all API routes
  ) {
    // Will rewrite to headers dump file
    const res = NextResponse.rewrite(
      'https://quick-dump-codetaromiura.vercel.app/api/hello',
    );

    // Setting custom headers – Used for testing
    res.headers.set('Referer', 'referer-value');
    res.headers.set('Referrer-Policy', 'unsafe-url');
    res.headers.set('x-custom-header', 'custom-value');
    return res;
  } else {
    return NextResponse.next();
  }
}
