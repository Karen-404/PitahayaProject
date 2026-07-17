function toggleMenu() {
  const menu = document.getElementById('mainMenu');
  if (menu) menu.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // INIT
    // =========================
    const role = localStorage.getItem('userRole');
    const adminLink = document.getElementById('adminLink');
    if (adminLink && role === 'admin') adminLink.style.display = 'block';

    // =========================
    // LOGIN
    // =========================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (email === "admin" && password === "admin") {
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userName', 'Administrador');
                localStorage.setItem('userId', '0');
                window.location.href = 'inicio.html';
                return;
            }

            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ correo: email, password })
                });
                const data = await res.json();
                if (!res.ok) {
                    alert('❌ ' + data.error);
                    return;
                }
                localStorage.setItem('userRole', data.role);
                localStorage.setItem('userName', data.nombre);
                localStorage.setItem('userId', data.id);
                localStorage.setItem('userEmail', data.correo);
                if (data.token) localStorage.setItem('userToken', data.token);
                window.location.href = 'inicio.html';
            } catch (err) {
                alert('❌ Error de conexión');
            }
        });
    }

    // =========================
    // REGISTRO
    // =========================
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const password = document.getElementById('passwordReg').value.trim();
            const role = document.getElementById('roleReg') ? document.getElementById('roleReg').value : 'productor';

            try {
                const res = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, correo, password, role })
                });
                const data = await res.json();
                if (!res.ok) {
                    alert('⚠️ ' + data.error);
                    return;
                }
                if (data.token) {
                    localStorage.setItem('userToken', data.token);
                    localStorage.setItem('userRole', data.role);
                    localStorage.setItem('userName', data.nombre);
                    localStorage.setItem('userId', data.id);
                }
                alert('✅ Registro exitoso');
                window.location.href = 'inicio.html';
            } catch (err) {
                alert('❌ Error de conexión');
            }
        });
    }

    // =========================
    // PERFIL
    // =========================
    const nombreUsuario = document.getElementById('nombreUsuario');
    if (nombreUsuario) {
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const userRole = localStorage.getItem('userRole');

        if (userName) document.getElementById('nombreUsuario').textContent = userName;
        if (userEmail) document.getElementById('correoUsuario').textContent = userEmail;
        if (userRole) document.getElementById('rolUsuario').textContent = userRole;
    }

    // =========================
    // NAVEGACIÓN
    // =========================
    document.querySelectorAll('.menu a[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.dataset.section;
            document.querySelectorAll('.seccion').forEach(sec => {
                sec.classList.remove('activa');
            });
            document.getElementById(section).classList.add('activa');
        });
    });

});

// =========================
// LOGOUT
// =========================
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userToken');
        window.location.href = 'index.html';
    });
}

// =========================
// MAPA (LA BELLEZA)
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        const lat = -0.6357312;
        const lon = -77.0409702;
        window.miMapa = L.map('map').setView([lat, lon], 16);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(window.miMapa);
        L.marker([lat, lon])
            .addTo(window.miMapa)
            .bindPopup("<b>Finca Experimental La Belleza 🌱</b><br>ESPOCH")
            .openPopup();
        setTimeout(() => {
            window.miMapa.invalidateSize();
        }, 300);
    }
});

// =========================
// BOT ASISTENTE (IA)
// =========================
async function responder() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chatBox");
    const mensaje = input.value.trim();
    if (!mensaje) return;
    chat.innerHTML += `<div class="mensaje usuario">${mensaje}</div>`;
    input.value = "";
    chat.innerHTML += `<div class="mensaje bot" id="chatPensando"><i>Escribiendo...</i></div>`;
    chat.scrollTop = chat.scrollHeight;
    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mensaje })
        });
        const data = await res.json();
        const pensando = document.getElementById('chatPensando');
        if (pensando) pensando.remove();
        chat.innerHTML += `<div class="mensaje bot">${data.respuesta}</div>`;
    } catch (e) {
        const pensando = document.getElementById('chatPensando');
        if (pensando) pensando.remove();
        chat.innerHTML += `<div class="mensaje bot">Error de conexi\u00f3n. Intenta de nuevo.</div>`;
    }
    chat.scrollTop = chat.scrollHeight;
}

document.getElementById("userInput")
    .addEventListener("keypress", function (e) {
        if (e.key === "Enter") responder();
    });

window.onload = () => {
    const chat = document.getElementById("chatBox");
    if (chat) chat.innerHTML += `<div class="mensaje bot">Hola 👋 soy tu asistente de pitahaya ¿En qué puedo ayudarte?</div>`;
};

function toggleChat() {
    const chat = document.getElementById("chatContainer");
    chat.classList.toggle("oculto");
}

function toggleFicha(btn) {
    const ficha = btn.nextElementSibling;
    ficha.classList.toggle('oculto');
}

const buscador = document.getElementById('buscar');
if (buscador) {
    buscador.addEventListener('keyup', function () {
        let filtro = buscador.value.toLowerCase();
        let cards = document.querySelectorAll('.card, .content-card');
        cards.forEach(card => {
            let texto = card.innerText.toLowerCase();
            card.style.display = texto.includes(filtro) ? '' : 'none';
        });
    });
}

function irPedido(producto) {
  window.location.href = 'pedidos.html';
}

function ir(pagina) {
    window.location.href = pagina;
}

// Datos de pitahayas
const pitahayas = {
    roja: { nombre: "Pitahaya Roja", imagen: "../img/pitahaya-roja.png" },
    rosa: { nombre: "Pitahaya Rosa", imagen: "../img/pitahaya-rosa.png" },
    amarilla: { nombre: "Pitahaya Amarilla", imagen: "../img/pitahaya-amarilla.png" },
    golden: { nombre: "Pitahaya Golden", imagen: "../img/pitahaya-golden.png" }
};

const ruta = window.location.pathname;
const archivo = ruta.split("/").pop().replace(".html", "");
const data = pitahayas[archivo];
if (data) {
    const img = document.querySelector(".card-img img");
    const title = document.querySelector(".card-img h2");
    if (img) img.src = data.imagen;
    if (title) title.innerText = data.nombre;
}
