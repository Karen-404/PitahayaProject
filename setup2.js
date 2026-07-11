const { Pool } = require('pg');

const pool = new Pool({
  host: 'db.fnnktyymrkfwpxfcecni.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'uxLir0ALF4FDvQ1O',
  ssl: { rejectUnauthorized: false }
});

async function setup() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS noticias (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        contenido TEXT NOT NULL,
        imagen_url VARCHAR(500),
        fecha DATE DEFAULT CURRENT_DATE,
        autor_id INT REFERENCES usuarios(id),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✓ Tabla noticias creada');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        noticia_id INT REFERENCES noticias(id) ON DELETE CASCADE,
        usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(noticia_id, usuario_id)
      );
    `);
    console.log('✓ Tabla likes creada');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS semillas (
        id SERIAL PRIMARY KEY,
        usuario_id INT REFERENCES usuarios(id),
        variedad VARCHAR(100) NOT NULL,
        cantidad INT NOT NULL,
        direccion TEXT,
        estado VARCHAR(20) DEFAULT 'pendiente',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✓ Tabla semillas creada');

    console.log('\n✓ Nuevas tablas configuradas exitosamente');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

setup();
