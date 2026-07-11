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
    await pool.query(`
      CREATE TABLE IF NOT EXISTS perfiles_investigador (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
        foto_url TEXT DEFAULT '',
        nombres VARCHAR(255) DEFAULT '',
        apellidos VARCHAR(255) DEFAULT '',
        titulo VARCHAR(255) DEFAULT '',
        especialidad VARCHAR(255) DEFAULT '',
        institucion VARCHAR(255) DEFAULT '',
        correo_contacto VARCHAR(255) DEFAULT '',
        ubicacion VARCHAR(255) DEFAULT '',
        biografia TEXT DEFAULT '',
        areas_investigacion TEXT DEFAULT '',
        enlace_orcid VARCHAR(255) DEFAULT '',
        enlace_google_scholar VARCHAR(255) DEFAULT '',
        enlace_researchgate VARCHAR(255) DEFAULT '',
        enlace_linkedin VARCHAR(255) DEFAULT '',
        titulos_obtenidos JSONB DEFAULT '[]'::jsonb,
        logros JSONB DEFAULT '[]'::jsonb,
        reconocimientos JSONB DEFAULT '[]'::jsonb,
        publicaciones JSONB DEFAULT '[]'::jsonb,
        proyectos JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Tabla perfiles_investigador creada');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS investigaciones (
        id SERIAL PRIMARY KEY,
        perfil_id INTEGER REFERENCES perfiles_investigador(id) ON DELETE CASCADE,
        titulo VARCHAR(255) NOT NULL,
        descripcion TEXT DEFAULT '',
        fecha DATE DEFAULT CURRENT_DATE,
        estado VARCHAR(50) DEFAULT 'en_curso',
        area_investigacion VARCHAR(255) DEFAULT '',
        participantes TEXT DEFAULT '',
        documento_url TEXT DEFAULT '',
        imagen_url TEXT DEFAULT '',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Tabla investigaciones creada');

    console.log('Configuracion completada');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

run();
