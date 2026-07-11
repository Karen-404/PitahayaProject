(function() {
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
    { label: 'Bioproductos', page: 'bioproductos.html', roles: null },
    { label: 'Pedidos', page: 'pedidos.html', roles: null },
    { label: 'Semillas', page: 'semillas.html', roles: null },
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
  html += '<button class="nav-toggle" onclick="document.getElementById(\'navList\').classList.toggle(\'open\')" aria-label="Men\u00fa"><i class="fas fa-bars"></i></button>';
  html += '<ul class="nav-list" id="navList">';

  for (var i = 0; i < navItems.length; i++) {
    var item = navItems[i];
    if (item.roles && (!role || item.roles.indexOf(role) === -1)) continue;
    html += '<li><a href="' + item.page + '"' + isActive(item.page) + '>' + item.label + '</a></li>';
  }

  html += '<li><button id="logoutBtnNav" class="nav-logout-btn" onclick="cerrarSesion()"><i class="fas fa-sign-out-alt"></i> Salir</button></li>';
  html += '</ul>';
  html += '</div>';
  html += '</nav>';

  var placeholder = document.getElementById('app-nav');
  if (placeholder) {
    placeholder.innerHTML = html;
  }

  // Close nav on link click (mobile)
  var links = document.querySelectorAll('#navList a');
  for (var j = 0; j < links.length; j++) {
    links[j].addEventListener('click', function() {
      document.getElementById('navList').classList.remove('open');
    });
  }
})();

function cerrarSesion() {
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
  window.location.href = 'index.html';
}
