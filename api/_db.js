const { neon } = require('@neondatabase/serverless');
let initialized;
function getSql() { if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured.'); return neon(process.env.DATABASE_URL); }
async function ensureTable(sql) { if (!initialized) { await sql.query('CREATE TABLE IF NOT EXISTS mvc_site_data (id INTEGER PRIMARY KEY, payload JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())'); initialized = true; } }
async function readSiteData() { const sql = getSql(); await ensureTable(sql); const rows = await sql.query('SELECT payload FROM mvc_site_data WHERE id = 1'); return rows[0] ? rows[0].payload : null; }
async function writeSiteData(payload) { const sql = getSql(); await ensureTable(sql); await sql.query('INSERT INTO mvc_site_data (id, payload, updated_at) VALUES (1, $1::jsonb, NOW()) ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()', [JSON.stringify(payload)]); }
module.exports = { readSiteData, writeSiteData };
