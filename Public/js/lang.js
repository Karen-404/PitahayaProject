(function() {
  var LANG_KEY = 'appLang';

  var translations = {
    es: {
      name: 'Español',
      nav: {
        home: 'Inicio',
        news: 'Noticias',
        researchers: 'Investigadores',
        publications: 'Publicaciones',
        characterization: 'Caracterización',
        seeds: 'Semillas',
        map: 'Mapa',
        fertirrigation: 'Fertirriego',
        bioproducts: 'Bioproductos',
        orders: 'Pedidos',
        profile: 'Perfil',
        support: 'Soporte',
        myProfile: 'Mi Perfil Profesional',
        admin: 'Admin',
        login: 'Iniciar Sesión',
        register: 'Registrarse',
        logout: 'Salir',
        panel: 'Panel Principal',
        research: 'Investigación y Datos Científicos',
        operations: 'Operaciones y Gestión de Campo',
        config: 'Configuración y Usuario'
      },
      common: {
        loading: 'Cargando...',
        error: 'Error',
        save: 'Guardar',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        edit: 'Editar',
        create: 'Crear',
        search: 'Buscar',
        confirm_delete: '¿Eliminar esta caracterización?',
        confirm: 'Confirmar',
        close: 'Cerrar',
        send: 'Enviar',
        yes: 'Sí',
        no: 'No'
      },
      index: {
        title: 'Gestión Sostenible de la Pitahaya',
        subtitle: 'Conservación, Mejora y Agroindustria (Hylocereus spp)',
        login_title: 'Iniciar Sesión',
        email: 'Correo Electrónico',
        password: 'Contraseña',
        login_btn: 'Ingresar al Sistema',
        new_producer: '¿Eres un nuevo productor?',
        register_here: 'Regístrate aquí',
        guest: 'Ingresar como invitado',
        brand: 'PITAHAYA BIOTEC',
        footer: 'ESPOCH / INIAP — Proyecto de Gestión Biotecnológica'
      },
      registro: {
        title: 'Crear Cuenta',
        name: 'Nombre Completo',
        email: 'Correo Electrónico',
        password: 'Contraseña',
        register_btn: 'Registrarse',
        have_account: '¿Ya tienes cuenta?',
        login: 'Inicia sesión',
        success: 'Registro exitoso',
        brand: 'PITAHAYA BIOTEC',
        footer: 'ESPOCH / INIAP — Proyecto de Gestión Biotecnológica'
      },
      tipos: {
        title: 'Caracterización Agronómica',
        subtitle: 'Pasaporte FAO + Caracterización de variedades de pitahaya',
        new: 'Nueva Caracterización',
        detail: 'Detalle de Variedad',
        save: 'Guardar Variedad',
        edit: 'Editar Caracterización',
        general_tab: 'General',
        fao_tab: 'Pasaporte FAO',
        vegetative_tab: 'Vegetativa',
        floral_tab: 'Floral',
        fruit_tab: 'Fruto',
        health_tab: 'Sanidad',
        collector: 'Nombre del Recolector',
        farm: 'Finca / Predio'
      },
      admin: {
        title: 'Panel de Administración',
        users: 'Usuarios',
        seeds: 'Solicitudes de Semillas',
        orders: 'Pedidos de Clientes',
        support: 'Solicitudes de Soporte',
        create_user: 'Crear Nuevo Usuario'
      }
    },

    en: {
      name: 'English',
      nav: {
        home: 'Home',
        news: 'News',
        researchers: 'Researchers',
        publications: 'Publications',
        characterization: 'Characterization',
        seeds: 'Seeds',
        map: 'Map',
        fertirrigation: 'Fertirrigation',
        bioproducts: 'Bioproducts',
        orders: 'Orders',
        profile: 'Profile',
        support: 'Support',
        myProfile: 'My Professional Profile',
        admin: 'Admin',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        panel: 'Main Panel',
        research: 'Research & Scientific Data',
        operations: 'Field Operations & Management',
        config: 'Settings & User'
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        create: 'Create',
        search: 'Search',
        confirm_delete: 'Delete this characterization?',
        confirm: 'Confirm',
        close: 'Close',
        send: 'Send',
        yes: 'Yes',
        no: 'No'
      },
      index: {
        title: 'Sustainable Pitahaya Management',
        subtitle: 'Conservation, Improvement and Agroindustry (Hylocereus spp)',
        login_title: 'Login',
        email: 'Email',
        password: 'Password',
        login_btn: 'Enter System',
        new_producer: 'Are you a new producer?',
        register_here: 'Register here',
        guest: 'Browse as guest',
        brand: 'PITAHAYA BIOTEC',
        footer: 'ESPOCH / INIAP — Biotechnology Management Project'
      },
      registro: {
        title: 'Create Account',
        name: 'Full Name',
        email: 'Email',
        password: 'Password',
        register_btn: 'Register',
        have_account: 'Already have an account?',
        login: 'Login',
        success: 'Registration successful',
        brand: 'PITAHAYA BIOTEC',
        footer: 'ESPOCH / INIAP — Biotechnology Management Project'
      },
      tipos: {
        title: 'Agronomic Characterization',
        subtitle: 'FAO Passport + Pitahaya variety characterization',
        new: 'New Characterization',
        detail: 'Variety Detail',
        save: 'Save Variety',
        edit: 'Edit Characterization',
        general_tab: 'General',
        fao_tab: 'FAO Passport',
        vegetative_tab: 'Vegetative',
        floral_tab: 'Floral',
        fruit_tab: 'Fruit',
        health_tab: 'Health',
        collector: 'Collector Name',
        farm: 'Farm / Estate'
      },
      admin: {
        title: 'Administration Panel',
        users: 'Users',
        seeds: 'Seed Requests',
        orders: 'Customer Orders',
        support: 'Support Requests',
        create_user: 'Create New User'
      }
    },

    qu: {
      name: 'Kichwa',
      nav: {
        home: 'Wasi',
        news: 'Willaykuna',
        researchers: 'Tukuchik',
        publications: 'Killkashkakuna',
        characterization: 'Rikuchina',
        seeds: 'Muhukuna',
        map: 'Mapa',
        fertirrigation: 'Yaku mit' + String.fromCharCode(0x73) + 'y',
        bioproducts: 'Kawsay mikuna',
        orders: 'Ma' + String.fromCharCode(0x79) + 'llakuna',
        profile: 'Rikuchik',
        support: 'Yanapana',
        myProfile: '' + String.fromCharCode(0x4e) + 'uka kawsay',
        admin: 'Kamachik',
        login: 'Yaykuy',
        register: 'Killkakuy',
        logout: 'Lluksiy',
        panel: 'Hatun tawka',
        research: 'Tukuchik yachay',
        operations: 'Llankay kamachiy',
        config: 'Allichiy'
      },
      common: {
        loading: 'Kargachkan...',
        error: 'Panta',
        save: 'Waqaychay',
        cancel: 'Kutichiy',
        delete: 'Pichana',
        edit: 'Allichiy',
        create: 'Ruray',
        search: 'Maskana',
        confirm_delete: 'Kayta pichanachu?',
        confirm: 'Takyachiy',
        close: 'Wichkana',
        send: 'Kachana',
        yes: 'Ari',
        no: 'Ama'
      },
      index: {
        title: 'Pitahaya Alli Kawsay',
        subtitle: 'Waqaychay, Allichiy, Rurana (Hylocereus spp)',
        login_title: 'Yaykuy',
        email: 'Elektroniku chaski',
        password: 'Pakallu shimi',
        login_btn: 'Sistemaman yaykuy',
        new_producer: 'Mushuk rurakchu kanki?',
        register_here: 'Kaypi killkakuy',
        guest: 'Wak mallkita rikuy',
        brand: 'PITAHAYA BIOTEC',
        footer: 'ESPOCH / INIAP — Kawsay Allichiy'
      },
      registro: {
        title: 'Killkakuna',
        name: 'Sutiyuk',
        email: 'Elektroniku chaski',
        password: 'Pakallu shimi',
        register_btn: 'Killkakuy',
        have_account: '' + String.fromCharCode(0x4e) + 'a killkashkachu?',
        login: 'Yaykuy',
        success: 'Alli killkakushka',
        brand: 'PITAHAYA BIOTEC',
        footer: 'ESPOCH / INIAP — Kawsay Allichiy'
      },
      tipos: {
        title: 'Allpa Rikuchina',
        subtitle: 'FAO Pasaporte + Pitahaya rikuchina',
        new: 'Mushuk Rikuchina',
        detail: 'Rikuchina',
        save: 'Waqaychay',
        edit: 'Allichiy',
        general_tab: 'Tukuy',
        fao_tab: 'FAO Pasaporte',
        vegetative_tab: 'Wi' + String.fromCharCode(0x6e) + 'ay',
        floral_tab: 'Sisa',
        fruit_tab: 'Ruru',
        health_tab: 'Alli kawsay',
        collector: 'Pallak shuti',
        farm: 'Chakra'
      },
      admin: {
        title: 'Kamachik Tawka',
        users: 'Runakuna',
        seeds: 'Muhu Ma' + String.fromCharCode(0x79) + 'llakuna',
        orders: 'Rantik Ma' + String.fromCharCode(0x79) + 'llakuna',
        support: 'Yanapana Ma' + String.fromCharCode(0x79) + 'llakuna',
        create_user: 'Mushuk Runata Ruray'
      }
    },

    sh: {
      name: 'Shuar',
      nav: {
        home: 'Etsa',
        news: 'Nekapmatai',
        researchers: 'Nekainiuri',
        publications: 'Papeartai',
        characterization: 'Nekatin',
        seeds: 'Nuka',
        map: 'Mapa',
        fertirrigation: 'Yumi yapimiat',
        bioproducts: 'Yurumkramu',
        orders: 'Awajsamu',
        profile: 'Nekamuri',
        support: 'Yanapamuri',
        myProfile: 'Wii Nekamuri',
        admin: 'Uunt',
        login: 'Wet',
        register: 'Aentramu',
        logout: 'Tsuwaktin',
        panel: 'Kuntuts ainau',
        research: 'Nekainiuri Tuke',
        operations: 'Yapimiat Jintiatai',
        config: 'Nekapratai'
      },
      common: {
        loading: 'Karakchatai...',
        error: 'Nekasa',
        save: 'Waketai',
        cancel: 'Kuitamiat',
        delete: 'Pachimiatai',
        edit: 'Nekapratai',
        create: 'Aujmattsa',
        search: 'Pujustin',
        confirm_delete: 'Yamaik pachimiatashtam?',
        confirm: 'Tuke',
        close: 'Uwitat',
        send: 'Awe',
        yes: 'Ee',
        no: 'Atse'
      },
      index: {
        title: 'Pitahaya Kuitamiat',
        subtitle: 'Nekapratai, Aujmattsa, Yapimiat (Hylocereus spp)',
        login_title: 'Wet',
        email: 'Chicham aents',
        password: 'Kakaram chicham',
        login_btn: 'Sistemnum wet',
        new_producer: 'Yamaram aentsmeka?',
        register_here: 'Kaa aentramu',
        guest: 'Wari ni neka',
        brand: 'PITAHAYA BIOTEC',
        footer: 'ESPOCH / INIAP — Tuke Yapimiat'
      },
      registro: {
        title: 'Aentramu',
        name: 'Nekas ainau',
        email: 'Chicham aents',
        password: 'Kakaram chicham',
        register_btn: 'Aentramu',
        have_account: 'Yamaik aenstamka?',
        login: 'Wet',
        success: 'Aentramu nekas',
        brand: 'PITAHAYA BIOTEC',
        footer: 'ESPOCH / INIAP — Tuke Yapimiat'
      },
      tipos: {
        title: 'Nekatin Yapimiat',
        subtitle: 'FAO Pasaporte + Pitahaya nekatin',
        new: 'Yamaram Nekatin',
        detail: 'Nekatin chicham',
        save: 'Waketai',
        edit: 'Nekapratai',
        general_tab: 'Iwiaku',
        fao_tab: 'FAO Pasaporte',
        vegetative_tab: 'Najanmatai',
        floral_tab: 'Tsapau',
        fruit_tab: 'Nuka',
        health_tab: 'Kuitamiat',
        collector: 'Uwejai nekamu',
        farm: 'Yapimiat'
      },
      admin: {
        title: 'Uunt Kuntuts',
        users: 'Aents ainau',
        seeds: 'Nuka Awajsamu',
        orders: 'Chicham Awajsamu',
        support: 'Yanapamuri Awajsamu',
        create_user: 'Yamaram Aents Najanatai'
      }
    }
  };

  function getLang() {
    return localStorage.getItem(LANG_KEY) || 'es';
  }

  function setLang(lang) {
    if (translations[lang]) {
      localStorage.setItem(LANG_KEY, lang);
    }
  }

  function __(key) {
    var lang = getLang();
    var parts = key.split('.');
    var obj = translations[lang];
    for (var i = 0; i < parts.length; i++) {
      if (!obj || !obj[parts[i]]) {
        // Fallback to Spanish
        obj = translations['es'];
        for (var j = 0; j < parts.length; j++) {
          if (!obj || !obj[parts[j]]) return key;
          obj = obj[parts[j]];
        }
        return obj;
      }
      obj = obj[parts[i]];
    }
    return obj;
  }

  function translateDOM() {
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var key = el.getAttribute('data-i18n');
      if (key) {
        var text = __(key);
        if (text && text !== key) {
          el.innerHTML = text;
        }
      }
    }
    var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    for (var i = 0; i < placeholders.length; i++) {
      var el = placeholders[i];
      var key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        var text = __(key);
        if (text && text !== key) {
          el.placeholder = text;
        }
      }
    }
    document.documentElement.lang = getLang() === 'qu' ? 'qu' : getLang() === 'sh' ? 'sh' : getLang();
  }

  function renderLangSwitcher() {
    var container = document.querySelector('.system-nav-right');
    if (!container) return;
    var current = getLang();
    var html = '<select class="lang-switcher" onchange="switchLanguage(this.value)" style="background:transparent;color:white;border:1px solid rgba(255,255,255,0.3);border-radius:6px;padding:4px 8px;font-size:0.8rem;cursor:pointer;">';
    var codes = { es:'Español', en:'English', qu:'Kichwa', sh:'Shuar' };
    for (var code in codes) {
      html += '<option value="' + code + '"' + (current === code ? ' selected' : '') + ' style="color:#000;">' + codes[code] + '</option>';
    }
    html += '</select>';
    var el = document.createElement('span');
    el.innerHTML = html;
    container.insertBefore(el.firstChild, container.firstChild);
  }

  window.__ = __;
  window.getLang = getLang;
  window.setLang = setLang;
  window.switchLanguage = function(lang) {
    setLang(lang);
    translateDOM();
    var switchers = document.querySelectorAll('.lang-switcher');
    for (var i = 0; i < switchers.length; i++) {
      switchers[i].value = lang;
    }
  };
  window.renderLangSwitcher = renderLangSwitcher;

  document.addEventListener('DOMContentLoaded', function() {
    translateDOM();
    renderLangSwitcher();
  });
})();
