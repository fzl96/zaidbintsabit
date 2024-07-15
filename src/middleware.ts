import NextAuth from "next-auth";
import authConfig from "./auth.config";

import {
  DEFAULT_LOGIN_REDIRECT,
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

// @ts-expect-error - `req` is not defined in the Next.js types
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  let isPublicRoute;
  if (nextUrl.pathname === "/") {
    isPublicRoute = true;
  } else if (
    nextUrl.pathname !== "/" &&
    publicRoutes
      .filter((route) => route !== "/")
      .some((route) => nextUrl.pathname.startsWith(route))
  ) {
    isPublicRoute = true;
  } else {
    isPublicRoute = false;
  }
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/auth/masuk", nextUrl));
    }
    if (
      req.auth?.user.role !== "ADMIN" &&
      req.auth?.user.role !== "PENGURUS" &&
      req.auth?.user.role !== "USER"
    ) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/masuk", nextUrl));
  }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
