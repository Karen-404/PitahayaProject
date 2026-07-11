const { Pool } = require('pg');

const pool = new Pool({
  host: 'db.fnnktyymrkfwpxfcecni.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'uxLir0ALF4FDvQ1O',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    // Check if estado column exists in pedidos
    const { rows } = await pool.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name='pedidos' AND column_name='estado'"
    );
    if (rows.length === 0) {
      await pool.query("ALTER TABLE pedidos ADD COLUMN estado VARCHAR(20) DEFAULT 'pendiente'");
      console.log('✓ Columna estado agregada a pedidos');
    } else {
      console.log('✓ Columna estado ya existe en pedidos');
    }

    // Show all columns
    const { rows: cols } = await pool.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name='pedidos' ORDER BY ordinal_position"
    );
    console.log('Columnas en pedidos:', cols.map(c => c.column_name).join(', '));
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

run();
