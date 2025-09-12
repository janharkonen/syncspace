import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'


const isProtectedRoute = createRouteMatcher(["/server"]);

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated } = await auth()

  const url = new URL(req.url);
  const pathname = url.pathname;
  if (!isAuthenticated && pathname === "/spaces") {
    return NextResponse.redirect(new URL('/', req.url))
  } else if (isAuthenticated && pathname === "/") {
    return NextResponse.redirect(new URL('/spaces', req.url))
  } else {
    return NextResponse.next()
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
