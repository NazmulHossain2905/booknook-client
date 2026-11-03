import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isLoggedIn = !!session;

  const isAuthPage = ["/login", "/register"].includes(pathname);

  // Protected routes
  const isProtectedRoute =
    ["/add-book", "/my-books", "/my-borrows", "/profile"].includes(pathname) ||
    pathname.startsWith("/books/");

  // Logged-in users cannot access login/register
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Unauthenticated users cannot access protected routes
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/add-book",
    "/my-books",
    "/my-borrows",
    "/books/:path+",
    "/profile",
  ],
};
