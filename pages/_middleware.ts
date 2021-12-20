import type { NextFetchEvent, NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export default async function middleware(
  request: NextRequest,

  event: NextFetchEvent,
) {
  const { pathname } = request.nextUrl;

  const path = request.url ?? pathname;
  if (path === '/') {
    // Will rewrite to headers dump file
    const res = NextResponse.rewrite(
      'https://quick-dump-codetaromiura.vercel.app',
    );

    // Setting custom headers – Used for testing
    res.headers.set('Referer', 'referer-value');
    res.headers.set('Referrer-Policy', 'unsafe-url');
    return res;
  } else {
    return NextResponse.next();
  }
}
