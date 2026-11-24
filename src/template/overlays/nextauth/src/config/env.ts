import { z } from "zod";

/**
 * Your .env variables will be parsed here
 */
const envSchema = z.object({
  WELCOME_MESSAGE: z
    .string()
    .min(1)
    .default('We are here to help you with your Next.js project'),
  // Auth.js — optional so the app boots without OAuth configured.
  // Signing in will fail until AUTH_GITHUB_ID/SECRET are set.
  AUTH_SECRET: z.string().optional(),
  AUTH_GITHUB_ID: z.string().optional(),
  AUTH_GITHUB_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
