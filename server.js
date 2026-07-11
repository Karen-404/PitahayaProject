const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'Public')));

let supabase;
try {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
} catch (e) {
  console.warn('Supabase no configurado:', e.message);
  supabase = null;
}

app.use('/api', (req, res, next) => {
  if (!supabase) return res.status(503).json({ error: 'Base de datos no disponible - configure SUPABASE_URL y SUPABASE_SERVICE_KEY' });
  next();
});

// Helper: verify role
async function requireRole(req, res, roles) {
  if (!supabase) return res.status(503).json({ error: 'Base de datos no disponible' });
  const { usuario_id } = req.body;
  if (!usuario_id && !req.query.usuario_id && !req.params.id) return res.status(401).json({ error: 'No autorizado' });
  const uid = req.body.usuario_id || req.query.usuario_id || req.params.id;
  const { data: user } = await supabase.from('usuarios').select('role').eq('id', uid).single();
  if (!user || !roles.includes(user.role)) return res.status(403).json({ error: 'Permiso denegado' });
  return user;
}

// ==================== AUTH ====================
app.post('/api/register', async (req, res) => {
  const { nombre, correo, password, role } = req.body;
  if (!nombre || !correo || !password) return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  const rolesValidos = ['productor', 'investigador', 'tecnico', 'admin'];
  const finalRole = rolesValidos.includes(role) ? role : 'productor';
  const { data: existe } = await supabase.from('usuarios').select('id').eq('correo', correo).maybeSingle();
  if (existe) return res.status(400).json({ error: 'El correo ya está registrado' });
  const { data, error } = await supabase.from('usuarios').insert({ nombre, correo, password, role: finalRole }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ id: data.id, nombre: data.nombre, correo: data.correo, role: data.role });
});

app.post('/api/login', async (req, res) => {
  const { correo, password } = req.body;
  const { data: user, error } = await supabase.from('usuarios').select('*').eq('correo', correo).eq('password', password).maybeSingle();
  if (error) return res.status(500).json({ error: error.message });
  if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });
  res.json({ id: user.id, nombre: user.nombre, correo: user.correo, role: user.role });
});

// ==================== USUARIOS (Admin) ====================
app.get('/api/usuarios', async (req, res) => {
  const { data, error } = await supabase.from('usuarios').select('id, nombre, correo, role, created_at').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.put('/api/usuarios/:id/role', async (req, res) => {
  const { role } = req.body;
  const { error } = await supabase.from('usuarios').update({ role }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.delete('/api/usuarios/:id', async (req, res) => {
  const { error } = await supabase.from('usuarios').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ==================== PERFIL ====================
app.get('/api/perfil/:id', async (req, res) => {
  const { data, error } = await supabase.from('usuarios').select('id, nombre, correo, role, created_at').eq('id', req.params.id).single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ==================== NOTICIAS ====================
app.get('/api/noticias', async (req, res) => {
  const usuario_id = req.query.usuario_id;
  const { data, error } = await supabase
    .from('noticias')
    .select('*, usuarios!inner(nombre), likes(count)')
    .order('fecha', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  // Add liked status for the requesting user
  if (usuario_id) {
    for (const n of data) {
      const { data: existing } = await supabase.from('likes').select('id').eq('noticia_id', n.id).eq('usuario_id', usuario_id).maybeSingle();
      n.liked = !!existing;
    }
  }
  res.json(data);
});

app.get('/api/noticias/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('noticias')
    .select('*, usuarios!inner(nombre), likes(count)')
    .eq('id', req.params.id)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/noticias', async (req, res) => {
  const user = await requireRole(req, res, ['admin', 'investigador']);
  if (!user) return;
  const { titulo, contenido, imagen_url } = req.body;
  if (!titulo || !contenido) return res.status(400).json({ error: 'Título y contenido son obligatorios' });
  const { data, error } = await supabase.from('noticias').insert({
    titulo, contenido, imagen_url: imagen_url || null,
    autor_id: req.body.usuario_id, fecha: new Date().toISOString().split('T')[0]
  }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.put('/api/noticias/:id', async (req, res) => {
  const user = await requireRole(req, res, ['admin', 'investigador']);
  if (!user) return;
  const { titulo, contenido, imagen_url } = req.body;
  const { data, error } = await supabase.from('noticias').update({ titulo, contenido, imagen_url }).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete('/api/noticias/:id', async (req, res) => {
  const user = await requireRole(req, res, ['admin', 'investigador']);
  if (!user) return;
  const { error } = await supabase.from('noticias').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ==================== LIKES ====================
app.post('/api/noticias/:id/like', async (req, res) => {
  const { usuario_id } = req.body;
  if (!usuario_id) return res.status(400).json({ error: 'usuario_id requerido' });
  // Check if already liked
  const { data: existing } = await supabase.from('likes').select('id').eq('noticia_id', req.params.id).eq('usuario_id', usuario_id).maybeSingle();
  if (existing) {
    await supabase.from('likes').delete().eq('id', existing.id);
    return res.json({ liked: false });
  }
  await supabase.from('likes').insert({ noticia_id: parseInt(req.params.id), usuario_id });
  res.json({ liked: true });
});

app.get('/api/noticias/:id/likes', async (req, res) => {
  const usuario_id = req.query.usuario_id;
  const { data: likes, error } = await supabase.from('likes').select('id', { count: 'exact' }).eq('noticia_id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  let liked = false;
  if (usuario_id) {
    const { data: existing } = await supabase.from('likes').select('id').eq('noticia_id', req.params.id).eq('usuario_id', usuario_id).maybeSingle();
    liked = !!existing;
  }
  res.json({ count: likes.length, liked });
});

// ==================== SEMILLAS (Productor) ====================
app.post('/api/semillas', async (req, res) => {
  const { usuario_id, variedad, cantidad, direccion } = req.body;
  if (!usuario_id || !variedad || !cantidad) return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  const { data, error } = await supabase.from('semillas').insert({ usuario_id, variedad, cantidad, direccion, estado: 'pendiente' }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, solicitud: data });
});

app.get('/api/semillas', async (req, res) => {
  const { data, error } = await supabase.from('semillas').select('*, usuarios(nombre, correo)').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.put('/api/semillas/:id', async (req, res) => {
  const { estado } = req.body;
  const { error } = await supabase.from('semillas').update({ estado }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.delete('/api/semillas/:id', async (req, res) => {
  const { error } = await supabase.from('semillas').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ==================== PUNTOS MONITOREO ====================
app.get('/api/puntos', async (req, res) => {
  const { data, error } = await supabase.from('puntos_monitoreo').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ==================== BIOPRODUCTOS ====================
app.get('/api/bioproductos', async (req, res) => {
  const { data, error } = await supabase.from('bioproductos').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ==================== PEDIDOS ====================
app.post('/api/pedidos', async (req, res) => {
  const { usuario_id, producto, cantidad, mensaje } = req.body;
  if (!producto || !cantidad) return res.status(400).json({ error: 'Producto y cantidad son obligatorios' });
  const { data, error } = await supabase.from('pedidos').insert({ usuario_id, producto, cantidad, mensaje, estado: 'pendiente' }).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, pedido: data[0] });
});

app.get('/api/pedidos/:usuario_id', async (req, res) => {
  const { data, error } = await supabase.from('pedidos').select('*').eq('usuario_id', req.params.usuario_id).order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/api/pedidos', async (req, res) => {
  const { data, error } = await supabase.from('pedidos').select('*, usuarios(nombre, correo)').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.put('/api/pedidos/:id/estado', async (req, res) => {
  const { estado } = req.body;
  if (!['pendiente','aceptado','enviado'].includes(estado)) return res.status(400).json({ error: 'Estado invalido' });
  const { error } = await supabase.from('pedidos').update({ estado }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ==================== PERFIL INVESTIGADOR ====================
app.get('/api/investigador/perfil/:usuario_id', async (req, res) => {
  const { data, error } = await supabase
    .from('perfiles_investigador')
    .select('*, investigaciones(*)')
    .eq('usuario_id', req.params.usuario_id)
    .maybeSingle();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || null);
});

app.put('/api/investigador/perfil', async (req, res) => {
  const { usuario_id, ...fields } = req.body;
  if (!usuario_id) return res.status(400).json({ error: 'usuario_id requerido' });
  // Verify investigator role
  const { data: user } = await supabase.from('usuarios').select('role').eq('id', usuario_id).single();
  if (!user || user.role !== 'investigador') return res.status(403).json({ error: 'Solo investigadores' });
  // Upsert
  const { data: existing } = await supabase.from('perfiles_investigador').select('id').eq('usuario_id', usuario_id).maybeSingle();
  if (existing) {
    const { data, error } = await supabase.from('perfiles_investigador').update({ ...fields, updated_at: new Date().toISOString() }).eq('usuario_id', usuario_id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } else {
    const { data, error } = await supabase.from('perfiles_investigador').insert({ usuario_id, ...fields }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }
});

app.post('/api/investigador/perfil/foto', async (req, res) => {
  const { usuario_id, foto_url } = req.body;
  if (!usuario_id || !foto_url) return res.status(400).json({ error: 'Datos incompletos' });
  const { data: existing } = await supabase.from('perfiles_investigador').select('id').eq('usuario_id', usuario_id).maybeSingle();
  if (existing) {
    const { error } = await supabase.from('perfiles_investigador').update({ foto_url }).eq('usuario_id', usuario_id);
    if (error) return res.status(500).json({ error: error.message });
  } else {
    const { error } = await supabase.from('perfiles_investigador').insert({ usuario_id, foto_url });
    if (error) return res.status(500).json({ error: error.message });
  }
  res.json({ success: true });
});

// ==================== INVESTIGACIONES ====================
app.post('/api/investigador/investigaciones', async (req, res) => {
  const { perfil_id, titulo, descripcion, fecha, estado, area_investigacion, participantes, documento_url, imagen_url } = req.body;
  if (!perfil_id || !titulo) return res.status(400).json({ error: 'perfil_id y titulo requeridos' });
  const { data, error } = await supabase.from('investigaciones').insert({
    perfil_id, titulo, descripcion, fecha, estado, area_investigacion, participantes, documento_url, imagen_url
  }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.put('/api/investigador/investigaciones/:id', async (req, res) => {
  const { titulo, descripcion, fecha, estado, area_investigacion, participantes, documento_url, imagen_url } = req.body;
  const { data, error } = await supabase.from('investigaciones').update({
    titulo, descripcion, fecha, estado, area_investigacion, participantes, documento_url, imagen_url
  }).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete('/api/investigador/investigaciones/:id', async (req, res) => {
  const { error } = await supabase.from('investigaciones').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ==================== INVESTIGADORES (Publico) ====================
app.get('/api/investigadores', async (req, res) => {
  const { data, error } = await supabase
    .from('perfiles_investigador')
    .select('id, usuario_id, foto_url, nombres, apellidos, titulo, especialidad, institucion, biografia, areas_investigacion, ubicacion, enlace_orcid, enlace_google_scholar, enlace_linkedin, updated_at, usuarios!inner(nombre)')
    .order('updated_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/api/investigadores/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('perfiles_investigador')
    .select('*, investigaciones(*), usuarios!inner(id, nombre, correo)')
    .eq('id', req.params.id)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ==================== REALTIME (SSE) ====================
app.get('/api/noticias/realtime', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  const interval = setInterval(async () => {
    const { data } = await supabase.from('noticias').select('*, usuarios(nombre), likes(count)').order('fecha', { ascending: false });
    // Add liked=false for SSE (client handles individual like states)
    if (data) data.forEach(n => n.liked = false);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 3000);

  req.on('close', () => clearInterval(interval));
});

// ==================== CHATBOT ====================
const CONOCIMIENTO = [
  { palabras: ['hola', 'buenas', 'buen día', 'buenas tardes'], respuesta: '¡Hola! 👋 Soy tu asistente virtual de Pitahaya Biotec. Pregúntame sobre la pitahaya, biotecnología, el proyecto, variedades, producción en Ecuador o cualquier tema relacionado.' },
  { palabras: ['qué es la pitahaya', 'que es pitahaya', 'que es la pitahaya', 'fruta', 'dragon fruit'], respuesta: 'La pitahaya (Hylocereus spp), también llamada fruta del dragón, es una cactácea epífita originaria de América tropical. Se cultiva en Ecuador por su fruto comestible de alto valor nutricional y comercial. Existen variedades roja (Hylocereus undatus), amarilla (H. megalanthus) y blanca.' },
  { palabras: ['variedad', 'tipo', 'clase', 'roja', 'amarilla', 'blanca'], respuesta: 'Tenemos 3 variedades principales:\n• Pitahaya Roja (Hylocereus undatus) - cáscara roja, pulpa blanca\n• Pitahaya Amarilla (Hylocereus megalanthus) - cáscara amarilla, pulpa blanca, más dulce\n• Pitahaya Blanca - variedad con pulpa blanca y alto contenido de azúcares\nLa amarilla suele alcanzar mejores precios por su mayor dulzor (18-22° Brix).' },
  { palabras: ['precio', 'costo', 'valor', 'vender', 'exportación', 'exportar'], respuesta: 'La pitahaya ecuatoriana se exporta a más de 50 destinos. La pitahaya amarilla (Palora) alcanza precios premium por su alta calidad. Estados Unidos y Hong Kong representan el 80% de la demanda. Ecuador es el 3er producto no tradicional de exportación. Los precios varían según temporada y calibre.' },
  { palabras: ['beneficio', 'salud', 'nutrición', 'vitamina', 'antioxidante', 'fibra', 'digestión'], respuesta: 'La pitahaya es rica en:\n• Fibra dietética - favorece la digestión\n• Vitamina C - refuerza el sistema inmune\n• Antioxidantes - combaten el envejecimiento celular\n• Magnesio y calcio - salud ósea\n• Bajo en calorías - ideal para dietas\nTambién se usa en cosmética natural por sus propiedades hidratantes.' },
  { palabras: ['pedido', 'comprar', 'adquirir', 'orden', 'producto'], respuesta: 'Puedes realizar pedidos desde la sección "Pedidos" en el menú principal. Allí puedes solicitar pitahaya fresca, bioproductos o semillas. Los pedidos son gestionados por productores asociados.' },
  { palabras: ['ecuador', 'país', 'producción', 'cultivo', 'agricultura', 'palora'], respuesta: 'Ecuador es líder mundial en producción de pitahaya amarilla. La región Amazónica (Palora, Morona Santiago) concentra la mayor producción con altos grados Brix (18-22°). La región Litoral (Santa Elena, Manabí) produce pitahaya roja con mayor infraestructura de empacadoras. Orellana alberga bancos de germoplasma para conservar variedades silvestres.' },
  { palabras: ['dónde se cultiva', 'región', 'zonas', 'lugares', 'provincia'], respuesta: 'Las principales zonas productoras en Ecuador:\n• Palora (Morona Santiago) - líder en pitahaya amarilla\n• Santa Elena - pitahaya roja\n• Manabí - pitahaya roja\n• Orellana - conservación de germoplasma\n• Naranjal - producción mixta\nLa Ruta de la Pitahaya integra turismo científico y agroturismo en Palora y Orellana.' },
  { palabras: ['biotecnología', 'biotec', 'laboratorio', 'investigación', 'genética', 'dna', 'adn'], respuesta: 'El proyecto Pitahaya Biotec aplica biotecnología agrícola con:\n• Descriptores FAO (WIEWS) para trazabilidad genética\n• Mejora de resistencia post-cosecha\n• Banco de germoplasma en Orellana\n• Análisis de grados Brix y calidad\n• Protocolo MCPD para inventario de accesiones\nCódigos de acceso: EI-PIT-26-001 (H. undatus), EI-PIT-26-002 (H. megalanthus).' },
  { palabras: ['atlas', 'dashboard', 'panel', 'estadística', 'dato', 'información'], respuesta: 'El Atlas de la Pitahaya Ecuatoriana contiene información estratégica:\n• Consumo interno: +25% crecimiento anual\n• Mercado global: exportación a 50+ destinos\n• Potencial turístico: Ruta de la Pitahaya\n• Biotecnología: trazabilidad genética FAO\n• Accesiones registradas con código MCPD\n• Distribución: Amazónica, Litoral y Zonas de Conservación' },
  { palabras: ['investigador', 'perfil', 'investigación', 'científico'], respuesta: 'Los investigadores pueden crear su perfil profesional con foto, biografía, títulos, logros, publicaciones y proyectos de investigación. El listado público está disponible en "Investigadores" del menú. Para acceder a tu perfil profesional, regístrate con rol "Investigador".' },
  { palabras: ['noticia', 'novedad', 'evento', 'actualidad'], respuesta: 'Las noticias e investigaciones son publicadas por administradores e investigadores. Puedes verlas en la sección "Noticias". Si eres investigador o admin, puedes crear, editar y eliminar noticias.' },
  { palabras: ['semilla', 'germoplasma', 'banco', 'conservación'], respuesta: 'El banco de germoplasma en Orellana preserva variedades silvestres de Hylocereus spp con potencial genético. Los productores pueden solicitar semillas desde la sección "Semillas" del menú.' },
  { palabras: ['bioproducto', 'cosmético', 'natural', 'derivado'], respuesta: 'Los bioproductos derivados de la pitahaya incluyen cosméticos naturales, pulpa congelada, helados, yogurt y suplementos. Consulta la sección "Bioproductos" para más información.' },
  { palabras: ['mapa', 'ubicación', 'dónde', 'georreferencia'], respuesta: 'El mapa interactivo muestra los puntos de monitoreo, zonas de producción y bancos de germoplasma a nivel nacional. Accede desde la sección "Mapa" del menú.' },
  { palabras: ['usuario', 'registro', 'cuenta', 'login', 'iniciar', 'sesión'], respuesta: 'Para registrarte, ve a la página de inicio y crea una cuenta. Puedes elegir entre Productor, Investigador o Técnico. Los investigadores tienen acceso a su perfil profesional y pueden publicar noticias.' },
  { palabras: ['admin', 'administrador', 'panel'], respuesta: 'El panel de administración permite gestionar usuarios, noticias, pedidos, semillas y más. Solo disponible para usuarios con rol Administrador.' },
  { palabras: ['gracias', 'thank', 'thanks', 'vale', 'ok'], respuesta: '¡Con gusto! 😊 Si tienes más preguntas sobre pitahaya, biotecnología o el proyecto, aquí estoy para ayudarte.' },
  { palabras: ['quien eres', 'quién eres', 'que eres', 'tu nombre', 'quien creo'], respuesta: 'Soy el asistente virtual de Pitahaya Biotec, un proyecto ecuatoriano de gestión biotecnológica sostenible de la pitahaya (Hylocereus spp). Puedo responder sobre variedades, cultivo, beneficios, exportación, biotecnología y más.' },
  { palabras: ['proyecto', 'pitahaya biotec', 'módulo', 'sistema'], respuesta: 'Pitahaya Biotec es un sistema de gestión biotecnológica que integra:\n• Atlas informativo de la pitahaya ecuatoriana\n• Gestión de productores e investigadores\n• Inventario de accesiones con código MCPD\n• Laboratorio virtual de clasificación\n• Pedidos y bioproductos\n• Chat con asistente IA\nDesarrollado para ESPOCH / INIAP.' }
];

app.post('/api/chat', async (req, res) => {
  const { mensaje } = req.body;
  if (!mensaje) return res.status(400).json({ error: 'Mensaje requerido' });

  // Try Gemini if available
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const https = require('https');
      const body = JSON.stringify({ contents: [{ parts: [{ text: `Eres un asistente experto en pitahaya (Hylocereus spp), biotecnología agrícola, agricultura sostenible y el proyecto Pitahaya Biotec de Ecuador. Responde en español de forma clara y concisa, máximo 3 párrafos.\n\nUsuario: ${mensaje}\n\nAsistente:` }] }] });
      const data = await new Promise((resolve, reject) => {
        const u = new URL(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${geminiKey}`);
        const r = https.request({ hostname: u.hostname, path: u.pathname + u.search, method: 'POST', headers: { 'Content-Type': 'application/json' } }, (r2) => { let d = []; r2.on('data', c => d.push(c)); r2.on('end', () => { try { resolve(JSON.parse(Buffer.concat(d).toString())); } catch(e) { reject(e); } }); });
        r.on('error', reject); r.write(body); r.end();
      });
      const t = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (t) return res.json({ respuesta: t });
    } catch (e) { /* fallback */ }
  }

  // Fallback: knowledge base
  const txt = mensaje.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  for (const item of CONOCIMIENTO) {
    for (const palabra of item.palabras) {
      if (txt.includes(palabra)) return res.json({ respuesta: item.respuesta });
    }
  }

  // Busqueda parcial: si alguna palabra clave aparece en el texto
  for (const item of CONOCIMIENTO) {
    for (const palabra of item.palabras) {
      const palabrasTxt = txt.split(/\s+/);
      for (const pt of palabrasTxt) {
        if (pt.length > 3 && palabra.includes(pt)) return res.json({ respuesta: item.respuesta });
      }
    }
  }

  res.json({ respuesta: 'No encontré información específica sobre eso 🤔 Puedes preguntarme sobre:\n• Variedades de pitahaya (roja, amarilla, blanca)\n• Beneficios y nutrición\n• Producción en Ecuador\n• Precios y exportación\n• Biotecnología e investigación\n• Cómo hacer pedidos\n• El proyecto Pitahaya Biotec\n¿O prefieres que hable con un administrador?' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor Pitahaya corriendo en http://localhost:${PORT}`);
  });
}
