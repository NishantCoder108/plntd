import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    // DATABASE_URL: z.string().url(),
    NEXT_CHART_API_URL: z.string().url(),
    NEXT_SOCKET_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    // NEXTAUTH_URL: z.preprocess(
    //   // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    //   // Since NextAuth.js automatically uses the VERCEL_URL if present.
    //   (str) => process.env.VERCEL_URL ?? str,
    //   // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    //   process.env.VERCEL ? z.string() : z.string().url()
    // ),
    // RPC_URL: z.string().url(),
    // NEXT_PUBLIC_PARA_API_KEY: z.string(),
    // SPORTSDATA_API_KEY: z.string(),
    // PRIVATE_KEY: z.string(),
    // CRON_SECRET: z.string(),
    // TOKEN_MINT_ADDRESS: z.string(),
    // MINTER_PUBLIC_KEY: z.string(),
    // WEBHOOK_URL: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_RPC_URL: z.string().url().optional(),
    NEXT_PUBLIC_TOKEN_MINT_ADDRESS: z.string(),
    NEXT_PUBLIC_MINTER_PUBLIC_KEY: z.string(),
    NEXT_PUBLIC_WEBHOOK_URL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_TOKEN_MINT_ADDRESS: process.env.NEXT_PUBLIC_TOKEN_MINT_ADDRESS,
    NEXT_PUBLIC_MINTER_PUBLIC_KEY: process.env.NEXT_PUBLIC_MINTER_PUBLIC_KEY,
    NEXT_PUBLIC_WEBHOOK_URL: process.env.NEXT_PUBLIC_WEBHOOK_URL,
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    // DATABASE_URL: process.env.DATABASE_URL,
    NEXT_CHART_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
    // RPC_URL: process.env.RPC_URL,
    // NEXT_PUBLIC_PARA_API_KEY: process.env.NEXT_PUBLIC_PARA_API_KEY,
    // SPORTSDATA_API_KEY: process.env.SPORTSDATA_API_KEY,
    // PRIVATE_KEY: process.env.PRIVATE_KEY,
    // CRON_SECRET: process.env.CRON_SECRET,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
