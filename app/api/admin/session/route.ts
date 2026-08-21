/**
 * Admin login/logout.
 *
 * Replaces the previous client-side check against NEXT_PUBLIC_ADMIN_PASSWORD,
 * which was readable by anyone in the client bundle. The password is now compared
 * on the server and never leaves it; the browser only ever holds an httpOnly
 * session cookie it cannot read from JavaScript.
 */
import { NextRequest, NextResponse } from 'next/server';

import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifyAdminPassword,
  verifySessionToken,
} from '@/app/lib/adminSession';

export async function POST(request: NextRequest) {
  let password: unknown;
  try {
    ({ password } = await request.json());
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 400 });
  }

  if (typeof password !== 'string' || !verifyAdminPassword(password)) {
    // Same response for a wrong password and an unconfigured server, so the
    // endpoint does not report whether admin access is set up at all.
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const token = createSessionToken();
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

/** Report whether the caller currently holds a valid session. */
export async function GET(request: NextRequest) {
  const authenticated = verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  return NextResponse.json({ authenticated }, { status: authenticated ? 200 : 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
  return response;
}
