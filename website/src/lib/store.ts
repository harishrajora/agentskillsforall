import { sql } from "./db";

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  event: string;
  source?: string;
  skills?: string;
  agents?: string;
  global?: string;
  v?: string;
  ci?: string;
  skillCategories?: string;
  [key: string]: string | undefined;
}

export interface SkillRecord {
  id: string;
  name: string;
  source: string;
  installCount: number;
  category?: string;
}

function skillKey(source: string, skillName: string): string {
  return `${source}:${skillName}`.toLowerCase();
}

export async function addEvent(params: Record<string, string | undefined>): Promise<void> {
  // Log the event to audit table
  const eventId = crypto.randomUUID();
  const eventType = params.event ?? "unknown";

  try {
    await sql`
      INSERT INTO events (id, event_type, source, skills, agents, global_flag, ci, version)
      VALUES (
        ${eventId},
        ${eventType},
        ${params.source ?? null},
        ${params.skills ?? null},
        ${params.agents ?? null},
        ${params.global === "1"},
        ${params.ci === "1"},
        ${params.v ?? null}
      )
    `;
  } catch {
    // Don't fail the whole request if audit logging fails
  }

  if (eventType !== "install" || !params.source || !params.skills) {
    return;
  }

  // Parse categories if provided
  let categories: Record<string, string> = {};
  if (params.skillCategories) {
    try {
      categories = JSON.parse(params.skillCategories);
    } catch {
      // ignore
    }
  }

  const skillNames = params.skills.split(",").map((s) => s.trim()).filter(Boolean);

  for (const name of skillNames) {
    const id = skillKey(params.source, name);
    const category = categories[name] ?? null;
    await sql`
      INSERT INTO skills (id, name, source, install_count, category, last_install)
      VALUES (${id}, ${name}, ${params.source}, 1, ${category}, NOW())
      ON CONFLICT (source, name) DO UPDATE SET
        install_count = skills.install_count + 1,
        last_install = NOW(),
        category = COALESCE(skills.category, EXCLUDED.category)
    `;
  }
}

export async function getTotalSkillsCount(): Promise<number> {
  const rows = (await sql`SELECT COUNT(*) as count FROM skills`) as Array<{ count: string | number }>;
  return Number(rows[0]?.count ?? 0);
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  const rows = (await sql`
    SELECT COALESCE(category, 'community') as category, COUNT(*) as count
    FROM skills
    GROUP BY category
  `) as Array<{ category: string; count: string | number }>;
  const result: Record<string, number> = {};
  for (const row of rows) {
    result[row.category] = Number(row.count);
  }
  return result;
}

export async function getAllInstalledSkills(limit = 100): Promise<SkillRecord[]> {
  const rows = (await sql`
    SELECT id, name, source, install_count, category
    FROM skills
    ORDER BY install_count DESC
    LIMIT ${limit}
  `) as Array<{ id: string; name: string; source: string; install_count: number; category: string | null }>;

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    source: r.source,
    installCount: r.install_count,
    category: r.category ?? undefined,
  }));
}

export async function searchSkills(q: string, limit: number, offset = 0): Promise<SkillRecord[]> {
  const query = q.trim().toLowerCase();
  const rows = query
    ? ((await sql`
        SELECT id, name, source, install_count, category
        FROM skills
        WHERE LOWER(name) LIKE ${`%${query}%`} OR LOWER(source) LIKE ${`%${query}%`}
        ORDER BY install_count DESC
        LIMIT ${limit} OFFSET ${offset}
      `) as Array<{ id: string; name: string; source: string; install_count: number; category: string | null }>)
    : ((await sql`
        SELECT id, name, source, install_count, category
        FROM skills
        ORDER BY install_count DESC
        LIMIT ${limit} OFFSET ${offset}
      `) as Array<{ id: string; name: string; source: string; install_count: number; category: string | null }>);

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    source: r.source,
    installCount: r.install_count,
    category: r.category ?? undefined,
  }));
}
