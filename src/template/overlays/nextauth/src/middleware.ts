import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

// Auth middleware built from the edge-safe config only —
// no Node-only providers are imported here.
export default NextAuth(authConfig).auth;

export const config = {
  // Run on everything except auth api routes, Next internals, and static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
