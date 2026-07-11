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

// ==================== CHATBOT (IA) ====================
app.post('/api/chat', async (req, res) => {
  const { mensaje } = req.body;
  if (!mensaje) return res.status(400).json({ error: 'Mensaje requerido' });

  const fetch = (url, opts) => new Promise((resolve, reject) => {
    const { request } = require(url.startsWith('https') ? 'https' : 'http');
    const u = new URL(url);
    const req2 = request({ hostname: u.hostname, path: u.pathname + u.search, method: opts?.method || 'GET', headers: opts?.headers }, (res2) => {
      let d = [];
      res2.on('data', (c) => d.push(c));
      res2.on('end', () => resolve({ json: () => { try { return Promise.resolve(JSON.parse(Buffer.concat(d).toString())); } catch(e) { return Promise.reject(e); } }, status: res2.statusCode }));
    });
    req2.on('error', reject);
    if (opts?.body) req2.write(opts.body);
    req2.end();
  });

  // Try Gemini first, fallback to Hugging Face
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const body = JSON.stringify({
        contents: [{ parts: [{ text: `Eres un asistente experto en pitahaya (Hylocereus spp), biotecnología agrícola, agricultura sostenible y el proyecto Pitahaya Biotec de Ecuador. Responde en español de forma clara y concisa.\n\nUsuario: ${mensaje}\n\nAsistente:` }] }]
      });
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      const d = await r.json();
      const t = d?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (t) return res.json({ respuesta: t });
    } catch (e) { /* fallback */ }
  }

  // Fallback: Hugging Face free inference
  try {
    const prompt = `<s>[INST] Eres un asistente experto en pitahaya, biotecnología agrícola y el proyecto Pitahaya Biotec de Ecuador. Responde en español. Si la pregunta no es del tema, responde cordialmente que solo puedes ayudar en temas agrícolas.

  ${mensaje} [/INST]`;
    const body = JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 200, temperature: 0.7 } });
    const r = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    const d = await r.json();
    const t = Array.isArray(d) ? d[0]?.generated_text : d?.generated_text;
    if (t) {
      const respuesta = t.split('[/INST]').pop()?.trim() || t;
      return res.json({ respuesta });
    }
  } catch (e) { /* fallback */ }

  // Ultra fallback: respuestas basicas
  const resp = {
    hola: 'Hola 👋 soy tu asistente de pitahaya. Pregúntame lo que quieras.',
    precio: 'El precio varía según tipo y temporada. La pitahaya amarilla suele ser más cara que la roja.',
    beneficio: 'Rica en fibra, vitamina C, antioxidantes y magnesio. Favorece la digestión 💪',
    comprar: 'Puedes hacer pedidos desde la sección Pedidos del menú 🛒',
    tipo: 'Variedades: roja (Hylocereus undatus), amarilla (H. megalanthus) y blanca.',
    ecuador: 'Ecuador es el 3er exportador mundial. Palora es la zona productora líder 🌎',
    gracias: '¡Con gusto! 😊'
  };
  const txt = mensaje.toLowerCase();
  for (const [k, v] of Object.entries(resp)) { if (txt.includes(k)) return res.json({ respuesta: v }); }
  res.json({ respuesta: 'Soy un asistente básico en modo offline. Para respuestas con IA, configura GEMINI_API_KEY o espera a que Hugging Face responda.' });
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
