// Client-side helpers for the admin session.
//
// The password check used to happen here, in the browser, against
// NEXT_PUBLIC_ADMIN_PASSWORD — which Next inlines into the client bundle, so it
// was readable by anyone with devtools. It now happens on the server in
// app/api/admin/session/route.ts, and the browser holds only an httpOnly cookie
// it cannot read. That cookie is what authorises mutations through the API proxy.

// Purely a UI affordance: lets the navbar decide whether to render the admin
// link without an auth probe on every public page load. It is trivially
// forgeable and grants nothing — the real boundary is the httpOnly session
// cookie checked server-side in app/api/ht/[...path]/route.ts. Never gate
// anything that matters on this.
const UI_HINT_KEY = 'admin-ui-hint';

function setUiHint(present: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (present) localStorage.setItem(UI_HINT_KEY, 'true');
    else localStorage.removeItem(UI_HINT_KEY);
  } catch {
    // Private browsing or blocked storage; the hint is optional.
  }
}

/** Synchronous, non-authoritative check for rendering admin UI affordances. */
export function hasAdminUiHint(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(UI_HINT_KEY) === 'true';
  } catch {
    return false;
  }
}

/** Submit a password. Resolves true when the server issued a session. */
export async function loginAdmin(password: string): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setUiHint(response.ok);
    return response.ok;
  } catch (error) {
    console.error('Admin login failed:', error);
    return false;
  }
}

/**
 * Ask the server whether the current cookie is a valid session.
 *
 * Necessarily async: the session cookie is httpOnly, so it cannot be inspected
 * from JavaScript. Callers must await rather than branching synchronously.
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/session', { cache: 'no-store' });
    setUiHint(response.ok);
    return response.ok;
  } catch {
    return false;
  }
}

export async function logoutAdmin(): Promise<void> {
  setUiHint(false);
  try {
    await fetch('/api/admin/session', { method: 'DELETE' });
  } catch (error) {
    console.error('Admin logout failed:', error);
  }
}
