// ESPERAR A QUE CARGUE EL DOM
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SISTEMA DE TRADUCCIÓN (20 IDIOMAS)
    // ==========================================
    const translations = {
        "es": {
            "hero_title": "Gestión Sostenible de la Pitahaya",
            "hero_subtitle": "Conservación, Mejora y Agroindustria (Hylocereus spp)",
            "login_title": "Iniciar Sesión",
            "label_email": "Correo Electrónico",
            "label_pass": "Contraseña",
            "btn_login": "Ingresar al Sistema",
            "reg_text": "¿Eres un nuevo productor?",
            "reg_link": "Regístrate aquí",
            "nav_home": "🏠 Inicio / Mapa",
            "nav_bio": "🌿 Bioproductos",
            "nav_logout": "Cerrar Sesión",
            "welcome": "Bienvenido al Sistema Pitahaya"
        },
        "en": {
            "hero_title": "Sustainable Pitahaya Management",
            "hero_subtitle": "Conservation, Improvement and Agro-industry",
            "login_title": "Login",
            "label_email": "Email Address",
            "label_pass": "Password",
            "btn_login": "Enter System",
            "reg_text": "New producer?",
            "reg_link": "Register here",
            "nav_home": "🏠 Home / Map",
            "nav_bio": "🌿 Bioproducts",
            "nav_logout": "Logout",
            "welcome": "Welcome to Pitahaya System"
        },
        "kic": { // Kichwa
            "hero_title": "Pitahaya Sumak Kawsay Rikuy",
            "login_title": "Yaykuna",
            "label_email": "Antanikik chaski",
            "btn_login": "Antañanikiman yaykuy",
            "nav_home": "🏠 Kallari / Mapa",
            "nav_logout": "Wichkana",
            "welcome": "Alli shamushka"
        }
        // Nota: Los demás idiomas indígenas usan un fallback a 'es' si no se definen aquí
    };

    window.changeLanguage = function(lang) {
        const texts = translations[lang] || translations['es'];
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (texts[key]) el.innerText = texts[key];
        });
        localStorage.setItem('selectedLang', lang);
    };

    // Cargar idioma preferido al inicio
    const savedLang = localStorage.getItem('selectedLang') || 'es';
    const langSelector = document.getElementById('langSelect');
    if (langSelector) {
        langSelector.value = savedLang;
        changeLanguage(savedLang);
    }

    // ==========================================
    // 2. LOGIN (CON CORRECCIÓN DE SINTAXIS)
    // ==========================================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            // 🔥 ADMIN FIJO
            if (email === "admin" && password === "admin") {
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userName', 'Administrador');
                window.location.href = 'inicio.html';
                return;
            }

            // 🔹 USUARIOS REGISTRADOS EN LOCALSTORAGE
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioValido = usuarios.find(user => user.correo === email && user.password === password);

            if (usuarioValido) {
                localStorage.setItem('userRole', usuarioValido.role || 'user');
                localStorage.setItem('userName', usuarioValido.nombre);
                window.location.href = 'inicio.html';
            } else {
                alert("❌ Usuario o contraseña incorrectos");
            }
        });
    }

    // ==========================================
    // 3. REGISTRO
    // ==========================================
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const password = document.getElementById('passwordReg').value.trim();

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            if (usuarios.find(user => user.correo === correo)) {
                alert("⚠️ Este usuario ya está registrado");
                return;
            }

            usuarios.push({ nombre, correo, password, role: "user" });
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert("✅ Registro exitoso");
            window.location.href = 'index.html';
        });
    }

    // ==========================================
    // 4. MAPA (LA BELLEZA - ESPOCH)
    // ==========================================
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        const lat = -0.6357312;
        const lon = -77.0409702;
        const miMapa = L.map('map').setView([lat, lon], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ESPOCH - Pitahaya Biotec'
        }).addTo(miMapa);

        L.marker([lat, lon])
            .addTo(miMapa)
            .bindPopup("<b>Finca Experimental La Belleza 🌱</b><br>ESPOCH")
            .openPopup();

        setTimeout(() => miMapa.invalidateSize(), 400);
    }
});

// ==========================================
// 5. ASISTENTE VIRTUAL (BOT)
// ==========================================
function toggleChat() {
    const chat = document.getElementById("chatContainer");
    if (chat) chat.classList.toggle("oculto");
}

function responder() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chatBox");
    if (!input || !chat) return;

    const texto = input.value.toLowerCase().trim();
    if (texto === "") return;

    chat.innerHTML += `<div class="mensaje usuario" style="text-align:right; margin: 10px 0; color: #E8275A;"><b>Tú:</b> ${input.value}</div>`;

    let respuesta = "No entendí tu pregunta 🤔 Intenta preguntar sobre precios, beneficios o tipos.";
    
    if (texto.includes("hola")) respuesta = "Hola 👋 ¿En qué puedo ayudarte sobre la pitahaya?";
    if (texto.includes("precio")) respuesta = "El precio de la pitahaya amarilla (Palora) es generalmente superior por su grado Brix.";
    if (texto.includes("beneficios")) respuesta = "Es rica en fibra, vitamina C y captura radicales libres con sus antioxidantes.";
    if (texto.includes("fao")) respuesta = "Estamos trabajando bajo descriptores FAO para la caracterización morfológica.";

    setTimeout(() => {
        chat.innerHTML += `<div class="mensaje bot" style="background:#E6F4EC; padding:8px; border-radius:10px; margin: 10px 0;"><b>Bot:</b> ${respuesta}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 500);

    input.value = "";
}

// LOGOUT
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        window.location.href = 'index.html';
    });
}