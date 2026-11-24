import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { authConfig } from '@/auth.config';

/**
 * Auth.js (NextAuth v5) instance.
 *
 * The GitHub provider reads AUTH_GITHUB_ID and AUTH_GITHUB_SECRET
 * from your .env automatically — create an OAuth app at
 * https://github.com/settings/developers
 * (callback URL: http://localhost:3000/api/auth/callback/github)
 *
 * Generate AUTH_SECRET with: npx auth secret
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [GitHub],
});
