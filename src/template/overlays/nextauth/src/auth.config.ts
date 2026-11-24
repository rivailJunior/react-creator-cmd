import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-safe auth config shared between middleware (src/middleware.ts)
 * and the main NextAuth instance (src/auth.ts).
 *
 * Keep this free of Node-only providers and adapters so it can run
 * on the Edge runtime inside middleware.
 */
export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = nextUrl.pathname.startsWith('/protected');
      if (isProtectedRoute && !isLoggedIn) {
        // Redirect unauthenticated users to the sign-in page
        return false;
      }
      return true;
    },
  },
  // Providers are added in src/auth.ts — they run in the Node runtime
  providers: [],
} satisfies NextAuthConfig;
