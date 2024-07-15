import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
