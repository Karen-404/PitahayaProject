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
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        correo VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✓ Tabla usuarios creada');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS puntos_monitoreo (
        id SERIAL PRIMARY KEY,
        nombre_finca VARCHAR(255) NOT NULL,
        latitud DOUBLE PRECISION NOT NULL,
        longitud DOUBLE PRECISION NOT NULL,
        variedad VARCHAR(100),
        estado_salud VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✓ Tabla puntos_monitoreo creada');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bioproductos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10,2) NOT NULL,
        stock INT DEFAULT 0,
        imagen_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✓ Tabla bioproductos creada');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id SERIAL PRIMARY KEY,
        usuario_id INT REFERENCES usuarios(id),
        producto VARCHAR(255) NOT NULL,
        cantidad INT NOT NULL,
        mensaje TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✓ Tabla pedidos creada');

    // Insert sample data for bioproductos
    await pool.query(`
      INSERT INTO bioproductos (nombre, descripcion, precio, stock, imagen_url)
      VALUES 
        ('Bioestimulante Orgánico', 'Estimula el crecimiento natural de la pitahaya', 25.50, 100, 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400'),
        ('Fertilizante NPK 10-30-10', 'Fórmula equilibrada para floración y fruto', 18.75, 75, 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400'),
        ('Control Biológico Trichoderma', 'Control natural de hongos patógenos', 32.00, 50, 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400'),
        ('Enraizante Natural', 'Promueve el desarrollo radicular', 15.90, 120, 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400'),
        ('Fungicida Ecológico', 'Protección contra mildiu y oídio', 22.40, 60, 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400')
      ON CONFLICT DO NOTHING;
    `);
    console.log('✓ Datos de bioproductos insertados');

    // Insert sample data for puntos_monitoreo
    await pool.query(`
      INSERT INTO puntos_monitoreo (nombre_finca, latitud, longitud, variedad, estado_salud)
      VALUES
        ('Finca El Rosario', -1.4567, -78.2345, 'Pitahaya Roja', 'Sano'),
        ('Finca La Esperanza', -1.7890, -78.5678, 'Pitahaya Amarilla', 'Sano'),
        ('Finca San José', -2.1234, -78.9012, 'Pitahaya Roja', 'Enfermo'),
        ('Finca Santa María', -1.2345, -78.3456, 'Pitahaya Blanca', 'Sano'),
        ('Finca Los Laureles', -1.5678, -78.4567, 'Pitahaya Amarilla', 'Sano')
      ON CONFLICT DO NOTHING;
    `);
    console.log('✓ Datos de puntos_monitoreo insertados');

    console.log('\n✓ Base de datos configurada exitosamente');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

setup();
