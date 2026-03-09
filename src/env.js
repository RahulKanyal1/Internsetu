import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables schema
   */
  server: {
    // Existing variables (keep these)
    POSTGRES_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    
    // NEW - Add these backend variables:
    BACKEND_API_URL: z.string().url().default("http://localhost:8000"),
    OPENAI_API_KEY: z.string().min(1).optional(),
    UPLOADTHING_SECRET: z.string().optional(),
    UPLOADTHING_APP_ID: z.string().optional(),
  },

  /**
   * Client-side environment variables schema
   */
  client: {
    // Your existing client variables
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * Runtime environment variables
   * IMPORTANT: Must be destructured manually (not from process.env directly)
   */
  runtimeEnv: {
    // Existing variables (keep these as they are)
    POSTGRES_URL: process.env.POSTGRES_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    
    // NEW - Add these lines:
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    
    // Your existing NEXT_PUBLIC_ variables
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },

  /**
   * Skip validation during build
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  
  /**
   * Makes emptyStringAsUndefined work properly
   */
  emptyStringAsUndefined: true,
});

// Post-validation guard: fail fast if no database configuration is provided
if (!env.POSTGRES_URL && !env.DATABASE_URL) {
  throw new Error("Missing DB config: set POSTGRES_URL or DATABASE_URL");
}
