const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured.');
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
  }
  return pool;
}

let initialized = false;
async function ensureTable(db) {
  if (!initialized) {
    await db.query('CREATE TABLE IF NOT EXISTS mvc_site_data (id INTEGER PRIMARY KEY, payload JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');
    initialized = true;
  }
}

async function readSiteData() {
  const db = getPool();
  await ensureTable(db);
  const result = await db.query('SELECT payload FROM mvc_site_data WHERE id = 1');
  return result.rows[0] ? result.rows[0].payload : null;
}

async function writeSiteData(payload) {
  const db = getPool();
  await ensureTable(db);
  await db.query(
    'INSERT INTO mvc_site_data (id, payload, updated_at) VALUES (1, $1::jsonb, NOW()) ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()',
    [JSON.stringify(payload)]
  );
}

module.exports = { readSiteData, writeSiteData };

