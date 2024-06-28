import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/admin/:path*"],
};
