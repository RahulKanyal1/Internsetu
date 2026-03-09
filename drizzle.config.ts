import { type Config } from "drizzle-kit";
import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL || env.DATABASE_URL || "postgresql://localhost:5432/corporate_internships",
  },
  tablesFilter: ["corporate_*"], // Changed from "gitdiagram_*" to "corporate_*"
} satisfies Config;
