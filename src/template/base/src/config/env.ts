import { z } from "zod";

/**
 * Your .env variables will be parsed here
 */
const envSchema = z.object({
  WELCOME_MESSAGE: z
    .string()
    .min(1)
    .default('We are here to help you with your Next.js project'),
});

export const env = envSchema.parse(process.env);
