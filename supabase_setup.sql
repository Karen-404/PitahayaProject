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
  coll_code TEXT,
  bred_code TEXT,
  donor_code TEXT,
  donor_numb TEXT,
  other_numb TEXT,
  dupl_site TEXT,
  storage TEXT,
  genero TEXT,
  especie TEXT,
  sp_authority TEXT,
  subtaxa TEXT,
  subtauthor TEXT,
  nombre_comun TEXT,
  nombre_accesion TEXT,
  fecha_adquisicion TEXT,
  coll_date TEXT,
  pais TEXT,
  ubicacion TEXT,
  latitud TEXT,
  longitud TEXT,
  altitud DOUBLE PRECISION,
  clim_zone TEXT,
  soil_type TEXT,
  estado_biologico TEXT,
  fuente_colecta TEXT,
  ancest TEXT,
  remarks TEXT,
  dis_res TEXT,
  self_comp TEXT,
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

-- Migracion: nuevas columnas MCPD para fao_passport
-- ALTER TABLE fao_passport ADD COLUMN coll_code TEXT;
-- ALTER TABLE fao_passport ADD COLUMN bred_code TEXT;
-- ALTER TABLE fao_passport ADD COLUMN donor_code TEXT;
-- ALTER TABLE fao_passport ADD COLUMN donor_numb TEXT;
-- ALTER TABLE fao_passport ADD COLUMN other_numb TEXT;
-- ALTER TABLE fao_passport ADD COLUMN dupl_site TEXT;
-- ALTER TABLE fao_passport ADD COLUMN storage TEXT;
-- ALTER TABLE fao_passport ADD COLUMN sp_authority TEXT;
-- ALTER TABLE fao_passport ADD COLUMN subtauthor TEXT;
-- ALTER TABLE fao_passport ADD COLUMN coll_date TEXT;
-- ALTER TABLE fao_passport ADD COLUMN clim_zone TEXT;
-- ALTER TABLE fao_passport ADD COLUMN soil_type TEXT;
-- ALTER TABLE fao_passport ADD COLUMN ancest TEXT;
-- ALTER TABLE fao_passport ADD COLUMN remarks TEXT;
-- ALTER TABLE fao_passport ADD COLUMN dis_res TEXT;
-- ALTER TABLE fao_passport ADD COLUMN self_comp TEXT;
-- ALTER TABLE fao_passport ALTER COLUMN latitud TYPE TEXT;
-- ALTER TABLE fao_passport ALTER COLUMN longitud TYPE TEXT;

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
