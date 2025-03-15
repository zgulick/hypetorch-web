// Basic authentication for admin panel
// This is a simple implementation for MVP purposes

// The admin password (in production, use environment variables)
const ADMIN_PASSWORD = "LetsGoHype!101";

// Check if the password is correct
export function validateAdminPassword(password: string): boolean {
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