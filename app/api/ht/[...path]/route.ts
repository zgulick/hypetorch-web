/**
 * Server-side proxy to the HypeTorch API.
 *
 * The browser calls this same-origin route with no credentials; the key is
 * attached here, on the server, and never reaches the client bundle. This is
 * what lets `NEXT_PUBLIC_API_KEY` go away — see app/lib/api_v2.ts.
 *
 * GET is open, because it serves the public dashboard. Everything that mutates
 * requires a valid admin session cookie: forwarding mutations unconditionally
 * would let any visitor POST/DELETE entities with no key, which is the same hole
 * being closed on the API side.
 */
import { NextRequest, NextResponse } from 'next/server';

import { ADMIN_COOKIE, verifySessionToken } from '@/app/lib/adminSession';

// NEXT_PUBLIC_API_URL already ends in /api; API_URL is the server-only override.
const API_ORIGIN = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://hypetorch-api.onrender.com/api'
).replace(/\/+$/, '');

const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || '';

/** Headers worth passing upstream. Host/cookie/content-length must not leak through. */
const FORWARDED_REQUEST_HEADERS = ['content-type', 'accept'];

async function forward(
  request: NextRequest,
  path: string[],
  { withBody }: { withBody: boolean }
) {
  const target = `${API_ORIGIN}/${path.join('/')}${request.nextUrl.search}`;

  const headers = new Headers();
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  if (API_KEY) headers.set('X-API-Key', API_KEY);

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      // Reading the body as a stream requires duplex mode; the payloads here are
      // small JSON documents and file uploads, so buffering is fine.
      body: withBody ? await request.arrayBuffer() : undefined,
      cache: 'no-store',
    });

    const body = await upstream.text();

    return new NextResponse(body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json',
      },
    });
  } catch (error) {
    console.error(`API proxy failed for ${request.method} ${path.join('/')}:`, error);
    return NextResponse.json(
      { status: 'error', detail: 'Upstream API request failed' },
      { status: 502 }
    );
  }
}

function requireAdmin(request: NextRequest): NextResponse | null {
  if (verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value)) return null;
  return NextResponse.json(
    { status: 'error', detail: 'Admin session required' },
    { status: 401 }
  );
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  return forward(request, path, { withBody: false });
}

async function mutate(request: NextRequest, { params }: RouteContext) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const { path } = await params;
  return forward(request, path, { withBody: true });
}

export const POST = mutate;
export const PUT = mutate;
export const PATCH = mutate;

export async function DELETE(request: NextRequest, context: RouteContext) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const { path } = await context.params;
  return forward(request, path, { withBody: false });
}
