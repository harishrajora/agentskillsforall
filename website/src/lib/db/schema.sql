-- Skills table: one row per (source, name) pair
CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  source TEXT NOT NULL,
  install_count INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_install TIMESTAMPTZ,
  UNIQUE (source, name)
);

CREATE INDEX IF NOT EXISTS idx_skills_install_count ON skills (install_count DESC);
CREATE INDEX IF NOT EXISTS idx_skills_name ON skills (LOWER(name));
CREATE INDEX IF NOT EXISTS idx_skills_source ON skills (LOWER(source));
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills (category);

-- Events table: audit log of install/remove events (for trending calculations)
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  source TEXT,
  skills TEXT,
  agents TEXT,
  global_flag BOOLEAN DEFAULT FALSE,
  ci BOOLEAN DEFAULT FALSE,
  version TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_created_at ON events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_type ON events (event_type);
