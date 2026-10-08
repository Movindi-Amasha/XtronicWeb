// HTTP Basic auth check shared by the /admin middleware and the admin Server
// Actions. Server Actions are reachable by direct POST from any route, so they
// can't rely on the middleware matcher alone.
export function isAdminAuthorization(header: string | null | undefined): boolean {
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUser || !adminPassword || !header?.startsWith("Basic ")) return false;

  const decoded = atob(header.slice(6));
  const separator = decoded.indexOf(":");
  if (separator === -1) return false;
  return decoded.slice(0, separator) === adminUser && decoded.slice(separator + 1) === adminPassword;
}
