import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(
  "postgresql://fzl96:52NPyuqovMAR@ep-wild-night-a1pg0ys0.ap-southeast-1.aws.neon.tech/zaidbintsabit?sslmode=require"
);
export const db = drizzle(sql, { schema });
