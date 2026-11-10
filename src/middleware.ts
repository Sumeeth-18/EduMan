import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/login", "/signup", "/privacy-policy", "/terms-of-use", "/forgot-password", "/reset-password"];
const authRoutes = ["/login", "/signup"];

const roleDashboards: Record<string, string> = {
  super_admin: "/super-admin",
  owner: "/dashboard",
  admin: "/dashboard",
  principal: "/dashboard",
  manager: "/dashboard",
  teacher: "/teacher",
  parent: "/parent",
  accountant: "/accountant",
  receptionist: "/receptionist",
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith("/api/");

  // Allow public routes and API routes
  if (isPublicRoute || isApiRoute) {
    return NextResponse.next();
  }

  // Redirect logged in users away from auth pages
  if (isAuthRoute && isLoggedIn && req.auth?.user) {
    const role = req.auth.user.role || "parent";
    const dashboard = roleDashboards[role] || "/dashboard";
    return NextResponse.redirect(new URL(dashboard, nextUrl));
  }

  // Require authentication for protected routes
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control for specific routes
  const role = req.auth?.user?.role;
  const organisationId = req.auth?.user?.organisationId;

  // Super admin routes
  if (nextUrl.pathname.startsWith("/super-admin") && role !== "super_admin") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Owner/Admin/Principal/Manager routes
  if (nextUrl.pathname.startsWith("/dashboard") && !["owner", "admin", "principal", "manager", "super_admin"].includes(role || "")) {
    return NextResponse.redirect(new URL(roleDashboards[role || "parent"] || "/dashboard", nextUrl));
  }

  // Teacher routes
  if (nextUrl.pathname.startsWith("/teacher") && role !== "teacher" && !["owner", "admin", "principal", "manager", "super_admin"].includes(role || "")) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Parent routes
  if (nextUrl.pathname.startsWith("/parent") && role !== "parent") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Accountant routes
  if (nextUrl.pathname.startsWith("/accountant") && role !== "accountant" && !["owner", "admin", "principal", "manager", "super_admin"].includes(role || "")) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Receptionist routes
  if (nextUrl.pathname.startsWith("/receptionist") && role !== "receptionist" && !["owner", "admin", "principal", "manager", "super_admin"].includes(role || "")) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Ensure organisation context for org-scoped routes
  const orgScopedRoutes = ["/dashboard", "/teacher", "/accountant", "/receptionist"];
  const isOrgScoped = orgScopedRoutes.some(route => nextUrl.pathname.startsWith(route));

  if (isOrgScoped && !organisationId && role !== "super_admin") {
    // User needs to select an organisation
    return NextResponse.redirect(new URL("/select-organisation", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};