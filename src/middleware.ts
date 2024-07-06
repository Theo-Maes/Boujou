import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = [
  "/api/category/create",
  "/api/category/*/update",
  "/api/category/*/delete",
  "/api/driver/create",
  "/api/driver/*/update",
  "/api/driver/*/delete",
  "/api/event/*/create",
  "/api/event/*/update",
  "/api/event/*/delete",
  "/api/group/create",
  "/api/group/*/update",
  "/api/group/*/delete",
  "/api/host/create",
  "/api/host/*/update",
  "/api/host/*/delete",
  "/api/role/create",
  "/api/role/*/update",
  "/api/role/*/delete",
  "/api/user/*/update",
  "/api/user/*/delete",
];

function isProtectedRoute(req: NextRequest): boolean {
  return protectedRoutes.some((route) => {
    // Simple pattern matching logic, can be expanded for more complex patterns
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
  } else {
    // if (isProtectedRoute(req)) {
    //   if (token) {
    //     return NextResponse.redirect(new URL("/signin", req.url));
    //   }
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/admin/:path*", "/api/:path*"],
};
