import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.SKILL_STORAGE_DB_DATABASE_URL ||
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("SKILL_STORAGE_DB_DATABASE_URL is not set. Run `npx vercel env pull .env.local`.");
}

export const sql = neon(connectionString);
