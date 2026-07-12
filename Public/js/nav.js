(function() {
  // Patch global fetch to include JWT Bearer token on API calls
  var origFetch = window.fetch;
  window.fetch = function(url, opts) {
    opts = opts || {};
    if (typeof url === 'string' && url.startsWith('/api/')) {
      var token = localStorage.getItem('userToken');
      var uid = localStorage.getItem('userId');
      opts.headers = opts.headers || {};
      if (token) {
        if (Array.isArray(opts.headers)) {
          opts.headers.push(['Authorization', 'Bearer ' + token]);
        } else {
          opts.headers['Authorization'] = 'Bearer ' + token;
        }
      } else if (uid) {
        if (Array.isArray(opts.headers)) {
          opts.headers.push(['x-usuario-id', uid]);
        } else {
          opts.headers['x-usuario-id'] = uid;
        }
      }
    }
    return origFetch.call(window, url, opts);
  };

  var role = localStorage.getItem('userRole');
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  var isActive = function(page) {
    return currentPage === page ? ' class="active"' : '';
  };

  var navItems = [
    { label: 'Dashboard Biotec', page: 'biotec-dashboard.html', roles: null },
    { label: 'Inicio', page: 'inicio.html', roles: null },
    { label: 'Noticias', page: 'noticias.html', roles: null },
    { label: 'Investigadores', page: 'investigadores.html', roles: null },
    { label: 'Mapa', page: 'mapa.html', roles: null },
    { label: 'FAO Passport', page: 'fao.html', roles: null },
    { label: 'Bioproductos', page: 'bioproductos.html', roles: null },
    { label: 'Pedidos', page: 'pedidos.html', roles: null },
    { label: 'Semillas', page: 'semillas.html', roles: null },
    { label: 'Publicaciones', page: 'publicaciones.html', roles: null },
    { label: 'Fertirriego', page: 'fertirriego.html', roles: null },
    { label: 'Soporte', page: 'soporte.html', roles: null },
    { label: 'Perfil', page: 'perfil.html', roles: null },
    { label: 'Tipos', page: 'tipos.html', roles: null },
    { label: 'Mi Perfil Profesional', page: 'investigador-perfil.html', roles: ['investigador'] },
    { label: 'Admin', page: 'admin.html', roles: ['admin'] }
  ];

  var html = '<nav class="system-nav">';
  html += '<div class="system-nav-inner">';
  html += '<div class="system-nav-left">';
  html += '<i class="fas fa-leaf nav-leaf-icon"></i>';
  html += '<span class="nav-brand"><span class="nav-brand-white">PITAHAYA</span> <span class="nav-brand-yellow">BIOTEC</span></span>';
  html += '</div>';
  html += '<button class="nav-toggle" id="navToggle" aria-label="Men\u00fa">';
  html += '<span></span><span></span><span></span>';
  html += '</button>';
  html += '</div>';
  html += '</nav>';
  html += '<div class="nav-overlay" id="navOverlay"></div>';
  html += '<ul class="nav-list" id="navList">';

  for (var i = 0; i < navItems.length; i++) {
    var item = navItems[i];
    if (item.roles && (!role || item.roles.indexOf(role) === -1)) continue;
    html += '<li><a href="' + item.page + '"' + isActive(item.page) + '>' + item.label + '</a></li>';
  }

  html += '<li><button id="logoutBtnNav" class="nav-logout-btn" onclick="cerrarSesion()"><i class="fas fa-sign-out-alt"></i> Salir</button></li>';
  html += '</ul>';

  var placeholder = document.getElementById('app-nav');
  if (placeholder) {
    placeholder.innerHTML = html;
  }

  var toggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');
  var overlay = document.getElementById('navOverlay');

  function toggleMenu() {
    toggle.classList.toggle('open');
    navList.classList.toggle('open');
    overlay.classList.toggle('visible');
    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    toggle.classList.remove('open');
    navList.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  if (toggle) {
    toggle.addEventListener('click', toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  var links = document.querySelectorAll('#navList a');
  for (var j = 0; j < links.length; j++) {
    links[j].addEventListener('click', closeMenu);
  }
})();

function cerrarSesion() {
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
  window.location.href = 'index.html';
}
