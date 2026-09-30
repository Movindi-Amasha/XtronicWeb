import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // If no admin credentials are configured, the admin area stays inaccessible
  // rather than silently open.
  if (!adminUser || !adminPassword) {
    return new NextResponse("Admin area not configured", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6));
    const [user, password] = decoded.split(":");
    if (user === adminUser && password === adminPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="XTRONIC Admin"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
