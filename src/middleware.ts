import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedApiRoutesAdmin = [
  "api/category/*",
  "api/event/*/delete",
  "api/event/*/update",
  "api/group/*/update",
  "api/role/create",
  "api/role/*/update",
  "api/role/*/delete",
];

const protectedApiRoutesUser = [
  "api/driver/create",
  "api/driver/*/update",
  "api/driver/*/delete",
  "api/driver/*/join",
  "api/driver/*/leave",
  "api/event/create",
  "api/group/create",
  "api/group/*/delete",
  "api/group/*/join",
  "api/group/*/leave",
  "api/host/create",
  "api/host/*/update",
  "api/host/*/delete",
  "api/host/*/join",
  "api/host/*/leave",
  "api/user/*/update",
  "api/user/*/delete",
];

function isProtectedRoute(req: NextRequest): boolean {
  return (
    protectedApiRoutesAdmin.some((route) => {
      if (route.endsWith("/*")) {
        return req.nextUrl.pathname.startsWith(route.slice(0, -1));
      }
      return req.nextUrl.pathname === route;
    }) ||
    protectedApiRoutesUser.some((route) => {
      if (route.endsWith("/*")) {
        return req.nextUrl.pathname.startsWith(route.slice(0, -1));
      }
      return req.nextUrl.pathname === route;
    })
  );
}

function isProtectedRouteAdmin(req: NextRequest): boolean {
  return protectedApiRoutesAdmin.some((route) => {
    if (route.endsWith("/*")) {
      return req.nextUrl.pathname.startsWith(route.slice(0, -1));
    }
    return req.nextUrl.pathname === route;
  });
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const restrictedPages = ["/signin", "/signup"];

  if (token && restrictedPages.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protection des pages d'administration
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute) {
    if (!token) {
      // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    const userRoleId = token.roleId;

    if (userRoleId !== 2) {
      // Si l'utilisateur n'a pas le rôle d'administrateur, redirigez-le vers la page d'accueil ou affichez une erreur 403
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  const isApiRoute = req.nextUrl.pathname.startsWith("/api");

  if (isApiRoute) {
    if (isProtectedRoute(req) && !token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (token) {
      const userRoleId = token.roleId;
      if (userRoleId !== 2) {
        if (isProtectedRouteAdmin(req)) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/admin/:path*", "/api/:path*"],
};
