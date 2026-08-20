// Basic authentication for admin panel
// This is a simple implementation for MVP purposes
//
// SECURITY NOTE: this is not a real authentication boundary. The comparison below
// runs in the browser, and NEXT_PUBLIC_* values are inlined into the client bundle
// at build time, so the password is readable by anyone who opens devtools. Moving
// it here only keeps it out of the git repository. Gating anything that actually
// matters requires server-side auth (a route handler or middleware validating a
// session), which this module deliberately does not attempt.
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

// Check if the password is correct
export function validateAdminPassword(password: string): boolean {
  // Fail closed: with no password configured, reject everything rather than
  // letting an empty string through.
  if (!ADMIN_PASSWORD) {
    console.error('NEXT_PUBLIC_ADMIN_PASSWORD is not set - admin login is disabled.');
    return false;
  }
  return password === ADMIN_PASSWORD;
}

// Check if the user is authenticated on the client side
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('admin-auth') === 'true';
}

// Log in the user
export function loginAdmin(password: string): boolean {
  if (validateAdminPassword(password)) {
    localStorage.setItem('admin-auth', 'true');
    return true;
  }
  return false;
}

// Log out the user
export function logoutAdmin(): void {
  localStorage.removeItem('admin-auth');
}