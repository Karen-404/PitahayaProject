-- =============================================
-- Crear tablas necesarias para Pitahaya Biotec
-- Ejecutar en Supabase Dashboard > SQL Editor
-- =============================================

-- 1. FAO PASSPORT (estandar MCPD)
CREATE TABLE IF NOT EXISTS fao_passport (
  id SERIAL PRIMARY KEY,
  codigo TEXT,
  numero_acceso TEXT,
  numero_colecta TEXT,
  genero TEXT,
  especie TEXT,
  subtaxa TEXT,
  nombre_comun TEXT,
  nombre_accesion TEXT,
  fecha_adquisicion TEXT,
  pais TEXT,
  ubicacion TEXT,
  latitud DOUBLE PRECISION,
  longitud DOUBLE PRECISION,
  altitud DOUBLE PRECISION,
  estado_biologico TEXT,
  fuente_colecta TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COMENTARIOS
CREATE TABLE IF NOT EXISTS comentarios (
  id SERIAL PRIMARY KEY,
  noticia_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  contenido TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LOGS DE ACTIVIDAD (auditoria RF-03)
CREATE TABLE IF NOT EXISTS logs_actividad (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER,
  accion TEXT,
  tabla TEXT,
  registro_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. VARIEDADES DE PITABAYA (CRUD con info completa)
CREATE TABLE IF NOT EXISTS variedades (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  nombre_cientifico TEXT,
  descripcion TEXT,
  imagen_url TEXT,
  beneficios TEXT,
  localidad TEXT,
  produccion TEXT,
  caracteristicas TEXT,
  fao_passport_id INTEGER REFERENCES fao_passport(id) ON DELETE SET NULL,
  recolector_nombre TEXT,
  recolector_usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  finca TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Para tablas existentes:
-- ALTER TABLE variedades ADD COLUMN recolector_nombre TEXT;
-- ALTER TABLE variedades ADD COLUMN recolector_usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL;
-- ALTER TABLE variedades ADD COLUMN finca TEXT;
-- ALTER TABLE variedades ADD COLUMN propietario TEXT;

-- 5. PUBLICACIONES CIENTIFICAS (tesis y articulos)
CREATE TABLE IF NOT EXISTS publicaciones (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  autores TEXT,
  revista TEXT,
  tipo TEXT DEFAULT 'articulo',
  año INTEGER,
  doi TEXT,
  resumen TEXT,
  archivo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Si ya existe la tabla variedades sin fao_passport_id:
-- ALTER TABLE variedades ADD COLUMN fao_passport_id INTEGER REFERENCES fao_passport(id) ON DELETE SET NULL;

-- 6. SOPORTE TECNICO (chat de ayuda)
CREATE TABLE IF NOT EXISTS soporte_mensajes (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  mensaje TEXT NOT NULL,
  respuesta TEXT,
  respondido_por INTEGER,
  estado TEXT DEFAULT 'abierto',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  responded_at TIMESTAMPTZ
);
