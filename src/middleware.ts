import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes using route matching
const protectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/payment",
  "/payment(.*)",
]);

// Middleware function with proper handling
export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth(); // Await the auth object

  // Check if the route matches any protected routes
  if (protectedRoute(req) && !authObject.userId) {
    // Redirect to sign-in if user is not authenticated
    return authObject.redirectToSignIn();
  }
});

// Configuration for the Next.js route matcher
export const config = {
  matcher: [
    // Skip Next.js internals and static files unless in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};