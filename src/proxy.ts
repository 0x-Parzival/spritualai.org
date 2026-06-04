import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes that require authentication
// NOTE: /api/blockplain/save and /api/blockplain/init-user are NOT here
// They handle their own auth checks so they can be called during the onboarding flow
const isProtectedRoute = createRouteMatcher([
  "/chat(.*)",
  "/profile(.*)",
  "/api/chat(.*)",
  "/api/spiritual(.*)",
  // Blockplain routes that need protection (management/internal):
  "/api/blockplain/cluster(.*)",
  "/api/blockplain/user-chain(.*)",
  "/api/blockplain/verify(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
