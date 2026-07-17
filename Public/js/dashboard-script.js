document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');

    if (!userRole) {
        window.location.href = 'index.html';
        return;
    }

    function translateDashboard() {
        var welcomeEl = document.getElementById('welcomeMsg');
        if (welcomeEl) {
            welcomeEl.innerText = (typeof __ === 'function' ? __('dashboard.welcome') : 'Panel de Control') + ': ' + userName;
        }
    }

    translateDashboard();

    var roleBadge = document.getElementById('roleBadge');
    if (roleBadge) roleBadge.innerText = userRole.toUpperCase();

    if (userRole !== 'admin') {
        var adminOnly = document.getElementById('adminOnly');
        if (adminOnly) adminOnly.style.display = 'none';
    }

    const map = L.map('map').setView([-1.70, -77.96], 8); 
var mapSection = document.querySelector('.map-section');
var productsGrid = document.createElement('div');
productsGrid.className = 'products-grid';
document.querySelector('.main-content').appendChild(productsGrid);

function updateSidebarLabels() {
    var sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        var key = link.getAttribute('data-i18n');
        if (key && typeof __ === 'function') {
            var t = __(key);
            if (t && t !== key) link.innerText = t;
        }
    });
}

var sidebarLinks = document.querySelectorAll('.sidebar-nav a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const text = e.target.innerText;

        if (text.includes("Bioproductos")) {
            mapSection.style.display = 'none';
            productsGrid.style.display = 'grid';
            cargarBioproductos();
        } else if (text.includes("Mapa")) {
            mapSection.style.display = 'block';
            productsGrid.style.display = 'none';
        }
    });
});

async function cargarBioproductos() {
    productsGrid.innerHTML = typeof __ === 'function' ? __('common.loading') : 'Cargando...';
    try {
        const response = await fetch('/api/bioproductos');
        const productos = await response.json();

        productsGrid.innerHTML = ''; 
        var quoteText = typeof __ === 'function' ? __('dashboard.request_quote') : 'Solicitar Cotizaci\u00f3n';
        productos.forEach(prod => {
            productsGrid.innerHTML += `
                <div class="product-card">
                    <img src="${prod.imagen_url}" alt="${prod.nombre}">
                    <span class="badge-stock">Stock: ${prod.stock}</span>
                    <h3>${prod.nombre}</h3>
                    <p style="font-size: 0.85rem; color: #666;">${prod.descripcion}</p>
                    <p class="price">$${prod.precio.toFixed(2)}</p>
                    <button class="btn-mini" style="background: var(--verde-hoja); color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                        ${quoteText}
                    </button>
                </div>
            `;
        });
    } catch (error) {
        productsGrid.innerHTML = typeof __ === 'function' ? __('common.error_loading') : 'Error al cargar los productos.';
    }
}
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '\u00a9 ESPOCH - INIAP | Datos de Cultivos'
}).addTo(map);

async function cargarPuntos() {
    try {
        const response = await fetch('/api/puntos');
        const puntos = await response.json();

        puntos.forEach(punto => {
            const color = punto.estado_salud === 'Sano' ? 'green' : 'red';
            const marker = L.circleMarker([punto.latitud, punto.longitud], {
                color: color,
                radius: 8,
                fillOpacity: 0.8
            }).addTo(map);

            var farmLabel = typeof __ === 'function' ? __('map.farm') : 'Finca';
            var varietyLabel = typeof __ === 'function' ? __('map.variety') : 'Variedad';
            var statusLabel = typeof __ === 'function' ? __('map.status') : 'Estado';
            var viewLabel = typeof __ === 'function' ? __('map.view_analysis') : 'Ver An\u00e1lisis';
            marker.bindPopup(`
                <b>${farmLabel}:</b> ${punto.nombre_finca}<br>
                <b>${varietyLabel}:</b> ${punto.variedad}<br>
                <b>${statusLabel}:</b> ${punto.estado_salud}<br>
                <button onclick="verDetalles(${punto.id})" class="btn-mini">${viewLabel}</button>
            `);
        });
    } catch (error) {
        console.error("Error cargando los puntos del mapa:", error);
    }
}

cargarPuntos();

function verDetalles(id) {
    var msg = typeof __ === 'function' ? __('map.loading_analysis') : 'Cargando an\u00e1lisis biotecnol\u00f3gico para el punto ID: ';
    alert(msg + id);
}

    var exampleFarmLabel = typeof __ === 'function' ? __('map.example_farm') : 'Finca Experimental Palora';
    var exampleVarietyLabel = typeof __ === 'function' ? __('map.example_variety') : 'Variedad: Pitahaya Amarilla.';
    const fincaEjemplo = L.marker([-1.701, -77.965]).addTo(map);
    fincaEjemplo.bindPopup('<b>' + exampleFarmLabel + '</b><br>' + exampleVarietyLabel);

    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'index.html';
        });
    }

    document.addEventListener('languageChanged', function() {
        translateDashboard();
        updateSidebarLabels();
    });
});