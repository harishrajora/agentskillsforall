import { readFileSync } from "fs";
import { join } from "path";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

const connectionString =
  process.env.SKILL_STORAGE_DB_DATABASE_URL ||
  process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL not set. Run: npx vercel env pull .env.local");
  process.exit(1);
}

const sql = neon(connectionString);

async function run() {
  const schema = readFileSync(join(process.cwd(), "src/lib/db/schema.sql"), "utf-8");
  // Strip comment lines, then split
  const cleaned = schema
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");
  const statements = cleaned
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  console.log(`Running ${statements.length} migration statements...`);
  for (const stmt of statements) {
    await sql.query(stmt);
    const preview = stmt.slice(0, 60).replace(/\s+/g, " ");
    console.log(`  ✓ ${preview}...`);
  }
  console.log("Migration complete.");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
