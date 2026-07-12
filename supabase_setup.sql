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
