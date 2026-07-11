document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');

    if (!userRole) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('welcomeMsg').innerText = `Panel de Control: ${userName}`;
    document.getElementById('roleBadge').innerText = userRole.toUpperCase();

    if (userRole !== 'admin') {
        document.getElementById('adminOnly').style.display = 'none';
    }

    const map = L.map('map').setView([-1.70, -77.96], 8); 
const mapSection = document.querySelector('.map-section');
const productsGrid = document.createElement('div'); // Creamos el contenedor del grid
productsGrid.className = 'products-grid';
document.querySelector('.main-content').appendChild(productsGrid);

document.querySelectorAll('.sidebar-nav a').forEach(link => {
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
    productsGrid.innerHTML = 'Cargando bioproductos...';
    try {
        const response = await fetch('/api/bioproductos');
        const productos = await response.json();
        
        productsGrid.innerHTML = ''; 
        productos.forEach(prod => {
            productsGrid.innerHTML += `
                <div class="product-card">
                    <img src="${prod.imagen_url}" alt="${prod.nombre}">
                    <span class="badge-stock">Stock: ${prod.stock}</span>
                    <h3>${prod.nombre}</h3>
                    <p style="font-size: 0.85rem; color: #666;">${prod.descripcion}</p>
                    <p class="price">$${prod.precio.toFixed(2)}</p>
                    <button class="btn-mini" style="background: var(--verde-hoja); color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                        Solicitar Cotización
                    </button>
                </div>
            `;
        });
    } catch (error) {
        productsGrid.innerHTML = 'Error al cargar los productos.';
    }
}
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© ESPOCH - INIAP | Datos de Cultivos'
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

            marker.bindPopup(`
                <b>Finca:</b> ${punto.nombre_finca}<br>
                <b>Variedad:</b> ${punto.variedad}<br>
                <b>Estado:</b> ${punto.estado_salud}<br>
                <button onclick="verDetalles(${punto.id})" class="btn-mini">Ver Análisis</button>
            `);
        });
    } catch (error) {
        console.error("Error cargando los puntos del mapa:", error);
    }
}

cargarPuntos();

function verDetalles(id) {
    alert("Cargando análisis biotecnológico para el punto ID: " + id);
}

    const fincaEjemplo = L.marker([-1.701, -77.965]).addTo(map);
    fincaEjemplo.bindPopup("<b>Finca Experimental Palora</b><br>Variedad: Pitahaya Amarilla.");

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'index.html';
    });
});