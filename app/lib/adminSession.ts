/**
 * Server-side admin session tokens.
 *
 * Stateless by design: the cookie carries an expiry plus an HMAC of that expiry,
 * signed with a server-only secret. Verification recomputes the HMAC, so there is
 * no session store to provision or expire.
 *
 * This module must never be imported by a client component — it reads secrets
 * from the server environment.
 */
import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE = 'ht-admin-session';

/** How long a login lasts. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getSecret(): string | null {
  // Fall back to the admin password so a deploy that sets only ADMIN_PASSWORD
  // still gets working sessions; ADMIN_SESSION_SECRET is preferred.
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

/** Compare two hex digests without leaking length or content through timing. */
function safeEqualHex(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'hex');
  const bufB = Buffer.from(b, 'hex');
  if (bufA.length !== bufB.length || bufA.length === 0) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Constant-time password check. */
export function verifyAdminPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  // Fail closed: with nothing configured, reject everything rather than
  // accepting an empty string.
  if (!expected) return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken(now: number = Date.now()): string | null {
  const secret = getSecret();
  if (!secret) return null;

  const expiresAt = String(now + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function verifySessionToken(
  token: string | undefined,
  now: number = Date.now()
): boolean {
  if (!token) return false;

  const secret = getSecret();
  if (!secret) return false;

  const separator = token.lastIndexOf('.');
  if (separator <= 0) return false;

  const expiresAt = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  if (!/^\d+$/.test(expiresAt)) return false;
  if (!safeEqualHex(signature, sign(expiresAt, secret))) return false;

  return Number(expiresAt) > now;
}
