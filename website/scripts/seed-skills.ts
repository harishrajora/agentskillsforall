import { readFileSync } from "fs";
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

interface ScrapedSkill {
  id: string;
  skillId: string;
  name: string;
  installs: number;
  source: string;
}

const BATCH_SIZE = 500;

async function run() {
  const jsonPath = process.argv[2];
  if (!jsonPath) {
    console.error("Usage: tsx scripts/seed-skills.ts <path-to-skills.json>");
    process.exit(1);
  }

  console.log(`Reading ${jsonPath}...`);
  const raw = readFileSync(jsonPath, "utf-8");
  const parsed = JSON.parse(raw);
  const skills: ScrapedSkill[] = Array.isArray(parsed) ? parsed : parsed.skills;
  if (!Array.isArray(skills)) {
    console.error("Could not find skills array in JSON (expected root array or .skills field)");
    process.exit(1);
  }
  console.log(`Loaded ${skills.length.toLocaleString()} skills. Seeding in batches of ${BATCH_SIZE}...`);

  let inserted = 0;
  for (let i = 0; i < skills.length; i += BATCH_SIZE) {
    const batch = skills.slice(i, i + BATCH_SIZE);

    // Build a single multi-row INSERT with ON CONFLICT
    const values = batch.map((s) => ({
      id: `${s.source}:${s.name}`.toLowerCase(),
      name: s.name,
      source: s.source,
      install_count: s.installs,
    }));

    // Use query() with parameterized inputs
    const placeholders: string[] = [];
    const params: (string | number)[] = [];
    values.forEach((v, idx) => {
      const base = idx * 4;
      placeholders.push(`($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`);
      params.push(v.id, v.name, v.source, v.install_count);
    });

    const query = `
      INSERT INTO skills (id, name, source, install_count)
      VALUES ${placeholders.join(", ")}
      ON CONFLICT (source, name) DO UPDATE
        SET install_count = GREATEST(skills.install_count, EXCLUDED.install_count)
    `;

    await sql.query(query, params);
    inserted += batch.length;
    if (inserted % 5000 === 0 || inserted === skills.length) {
      console.log(`  ${inserted.toLocaleString()} / ${skills.length.toLocaleString()}`);
    }
  }

  console.log(`\nSeeded ${inserted.toLocaleString()} skills successfully.`);

  // Show top 5 for sanity check
  const top = await sql`SELECT name, source, install_count FROM skills ORDER BY install_count DESC LIMIT 5`;
  console.log("\nTop 5 by install count:");
  for (const row of top as Array<{ name: string; source: string; install_count: number }>) {
    console.log(`  ${row.install_count.toLocaleString().padStart(10)} | ${row.source}/${row.name}`);
  }
}

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
