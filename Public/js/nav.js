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
  var userName = localStorage.getItem('userName');
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  var isActive = function(page) {
    return currentPage === page ? ' class="active"' : '';
  };

  var sections = [
    {
      name: 'Panel Principal',
      icon: 'fa-home',
      items: [
        { label: 'Inicio', page: 'biotec-dashboard.html', roles: null },
        { label: 'Noticias', page: 'noticias.html', roles: null }
      ]
    },
    {
      name: 'Investigaci&oacute;n y Datos Cient&iacute;ficos',
      icon: 'fa-flask',
      items: [
        { label: 'Investigadores', page: 'investigadores.html', roles: null },
        { label: 'Publicaciones', page: 'publicaciones.html', roles: null },
        { label: 'Caracterizaci&oacute;n', page: 'tipos.html', roles: null },
        { label: 'Semillas', page: 'semillas.html', roles: null },
        { label: 'Mapa', page: 'mapa.html', roles: null }
      ]
    },
    {
      name: 'Operaciones y Gesti&oacute;n de Campo',
      icon: 'fa-tractor',
      items: [
        { label: 'Fertirriego', page: 'fertirriego.html', roles: null },
        { label: 'Bioproductos', page: 'bioproductos.html', roles: null },
        { label: 'Pedidos', page: 'pedidos.html', roles: null }
      ]
    },
    {
      name: 'Configuraci&oacute;n y Usuario',
      icon: 'fa-cog',
      items: [
        { label: 'Perfil', page: 'perfil.html', roles: null },
        { label: 'Soporte', page: 'soporte.html', roles: null },
        { label: 'Mi Perfil Profesional', page: 'investigador-perfil.html', roles: ['investigador'] },
        { label: 'Admin', page: 'admin.html', roles: ['admin'] }
      ]
    }
  ];

  var lang = window.getLang ? getLang() : 'es';
  var codes = { es:'Español', en:'English', qu:'Kichwa', sh:'Shuar' };
  var langOptions = '';
  for (var c in codes) {
    langOptions += '<option value="' + c + '"' + (lang === c ? ' selected' : '') + '>' + codes[c] + '</option>';
  }

  var html = '<nav class="system-nav">';
  html += '<div class="system-nav-inner">';
  html += '<div class="system-nav-left">';
  html += '<i class="fas fa-leaf nav-leaf-icon"></i>';
  html += '<span class="nav-brand"><span class="nav-brand-white">PITAHAYA</span> <span class="nav-brand-yellow">BIOTEC</span></span>';
  html += '</div>';
  html += '<div class="system-nav-right">';
  html += '<select class="lang-switcher" onchange="if(window.switchLanguage)switchLanguage(this.value)" style="background:transparent;color:white;border:1px solid rgba(255,255,255,0.3);border-radius:6px;padding:4px 8px;font-size:0.8rem;cursor:pointer;">' + langOptions + '</select>';
  if (role) {
    html += '<span class="nav-user-badge"><i class="fas fa-user-circle"></i> ' + (userName || role) + '</span>';
  } else {
    html += '<a href="index.html" class="nav-login-link" data-i18n="nav.login"><i class="fas fa-sign-in-alt"></i> Iniciar Sesion</a>';
    html += '<a href="registro.html" class="nav-register-link" data-i18n="nav.register"><i class="fas fa-user-plus"></i> Registrarse</a>';
  }
  html += '</div>';
  html += '<button class="nav-toggle" id="navToggle" aria-label="Menu">';
  html += '<span></span><span></span><span></span>';
  html += '</button>';
  html += '</div>';
  html += '</nav>';
  html += '<div class="nav-overlay" id="navOverlay"></div>';
  html += '<ul class="nav-list" id="navList">';

  for (var s = 0; s < sections.length; s++) {
    var sec = sections[s];
    var hasVisible = false;
    for (var i = 0; i < sec.items.length; i++) {
      var item = sec.items[i];
      if (item.roles && (!role || item.roles.indexOf(role) === -1)) continue;
      hasVisible = true;
      break;
    }
    if (!hasVisible) continue;

    html += '<li class="nav-section-header"><i class="fas ' + sec.icon + '"></i> ' + sec.name + '</li>';

    for (var i = 0; i < sec.items.length; i++) {
      var item = sec.items[i];
      if (item.roles && (!role || item.roles.indexOf(role) === -1)) continue;
      html += '<li><a href="' + item.page + '"' + isActive(item.page) + '>' + item.label + '</a></li>';
    }
  }

  html += '<li class="nav-section-header" style="border-top:1px solid rgba(255,255,255,0.15);margin-top:6px;padding-top:12px;">&nbsp;</li>';
  if (role) {
    html += '<li><button id="logoutBtnNav" class="nav-logout-btn" onclick="cerrarSesion()"><i class="fas fa-sign-out-alt"></i> ' + (__.call ? __('nav.logout') : 'Salir') + '</button></li>';
  } else {
    html += '<li><a href="index.html" class="nav-login-btn" data-i18n="nav.login"><i class="fas fa-sign-in-alt"></i> Iniciar Sesion</a></li>';
    html += '<li><a href="registro.html" class="nav-register-btn" data-i18n="nav.register"><i class="fas fa-user-plus"></i> Registrarse</a></li>';
  }
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
