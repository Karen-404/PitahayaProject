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
      dashboard: {
        welcome: 'Panel de Control',
        request_quote: 'Solicitar Cotización'
      },
      chat: {
        welcome: 'Hola 👋 soy tu asistente de pitahaya ¿En qué puedo ayudarte?',
        typing: 'Escribiendo...',
        write: 'Escribe...',
        send: 'Enviar'
      },
      map: {
        farm: 'Finca',
        variety: 'Variedad',
        status: 'Estado',
        view_analysis: 'Ver Análisis',
        loading_analysis: 'Cargando análisis biotecnológico para el punto ID: ',
        example_farm: 'Finca Experimental Palora',
        example_variety: 'Variedad: Pitahaya Amarilla.',
        belleza_farm: 'Finca Experimental La Belleza'
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
        no: 'No',
        error_loading: 'Error al cargar los datos.'
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
        farm: 'Finca / Predio',
        search: 'Buscar variedad...',
        sort_recent: 'Más recientes',
        sort_name: 'Nombre A-Z',
        sort_location: 'Localidad',
        export_csv: 'Exportar CSV',
        export_csv_title: 'Exportar CSV para investigación',
        tab_ident: 'Ident.',
        tab_taxo: 'Taxo.',
        tab_origen: 'Origen',
        tab_colec: 'Colecta',
        tab_general: 'General',
        tab_vegetativa: 'Veget.',
        tab_floral: 'Floral',
        tab_fruto: 'Fruto',
        tab_sanidad: 'Sanidad',
        tab_propietario: 'Propiet.',
        agronomic_characterization: 'Caracterización Agronómica',
        description: 'Descripción',
        benefits: 'Beneficios',
        location: 'Localidad',
        production: 'Producción',
        tech_sheet: 'Ficha Técnica',
        vegetative_char: 'Caracterización Vegetativa',
        floral_char: 'Caracterización Floral',
        fruit_char: 'Caracterización del Fruto',
        health_sanidad: 'Sanidad y Resistencia',
        edit_title: 'Editar Caracterización',
        no_records: 'No hay registros. Crea la primera caracterización.',
        error_load: 'Error al cargar.',
        error_network: 'Error de conexión',
        user_not_found: 'Usuario no encontrado',
        collector_label: 'Recolector',
        registro_label: 'Registro',
        export_error: 'Error al exportar'
      },
      noticias: {
        title: 'Noticias e Investigaciones',
        new: 'Nueva Noticia',
        title_field: 'Titulo',
        content: 'Contenido',
        images: 'Imágenes (hasta 10)',
        uploading: 'Subiendo imágenes...',
        publish: 'Publicar',
        edit_title: 'Editar Noticia',
        update: 'Actualizar',
        max_images: 'Máximo 10 imágenes',
        wait_upload: 'Espera a que terminen de subir las imágenes',
        confirm_delete: '¿Eliminar esta noticia?',
        error_network: 'Error de conexión',
        error_load: 'Error al cargar noticias',
        no_comments: 'Sin comentarios',
        error_comments: 'Error al cargar comentarios',
        error_send: 'Error al enviar comentario',
        comment_heading: 'Comentarios',
        comment_placeholder: 'Escribe un comentario...',
        author_anon: 'Anónimo',
        anon: 'Anónimo'
      },
      admin: {
        title: 'Panel de Administración',
        users: 'Usuarios',
        seeds: 'Solicitudes de Semillas',
        orders: 'Pedidos de Clientes',
        support: 'Solicitudes de Soporte',
        create_user: 'Crear Nuevo Usuario'
      },
      soporte: { title: 'Soporte Técnico' },
      semillas: { title: 'Semillas Gratuitas' },
      publicaciones: { title: 'Publicaciones Científicas' },
      perfil: { title: 'Mi Perfil' },
      pedidos: { title: 'Pedidos y Cotizaciones' },
      investigadores: { title: 'Investigadores' },
      investigador_perfil: { title: 'Mi Perfil Profesional' },
      fertirriego: { title: 'Fertirriego' },
      fao: { title: 'Pasaporte FAO' },
      bioproductos: { title: 'Bioproductos' },
      inicio: {
        welcome: 'Bienvenido al Sistema Pitahaya',
        description: 'Gestión biotecnológica, monitoreo y comercialización.',
        dashboard_btn: 'Dashboard Biotec',
        news_btn: 'Noticias',
        map_title: 'Mapa de Monitoreo',
        map_desc: 'Puntos de monitoreo con información de salud y variedad.',
        map_btn: 'Ir al Mapa',
        varieties_title: 'Variedades',
        varieties_desc: 'Catálogo completo de variedades de pitahaya.',
        varieties_btn: 'Ver Variedades',
        bioproducts_title: 'Bioproductos',
        bioproducts_desc: 'Productos biotecnológicos para el cultivo.',
        bioproducts_btn: 'Ver Productos'
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
      dashboard: {
        welcome: 'Control Panel',
        request_quote: 'Request Quote'
      },
      chat: {
        welcome: 'Hi 👋 I\'m your pitahaya assistant. How can I help you?',
        typing: 'Typing...',
        write: 'Write...',
        send: 'Send'
      },
      map: {
        farm: 'Farm',
        variety: 'Variety',
        status: 'Status',
        view_analysis: 'View Analysis',
        loading_analysis: 'Loading biotechnological analysis for point ID: ',
        example_farm: 'Palora Experimental Farm',
        example_variety: 'Variety: Yellow Pitahaya.',
        belleza_farm: 'La Belleza Experimental Farm'
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
        no: 'No',
        error_loading: 'Error loading data.'
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
        subtitle: 'FAO Passport + Characterization of pitahaya varieties',
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
        farm: 'Farm / Estate',
        search: 'Search variety...',
        sort_recent: 'Most recent',
        sort_name: 'Name A-Z',
        sort_location: 'Location',
        export_csv: 'Export CSV',
        export_csv_title: 'Export CSV for research',
        tab_ident: 'Ident.',
        tab_taxo: 'Taxo.',
        tab_origen: 'Origin',
        tab_colec: 'Collection',
        tab_general: 'General',
        tab_vegetativa: 'Veget.',
        tab_floral: 'Floral',
        tab_fruto: 'Fruit',
        tab_sanidad: 'Health',
        tab_propietario: 'Owner',
        agronomic_characterization: 'Agronomic Characterization',
        description: 'Description',
        benefits: 'Benefits',
        location: 'Location',
        production: 'Production',
        tech_sheet: 'Technical Sheet',
        vegetative_char: 'Vegetative Characterization',
        floral_char: 'Floral Characterization',
        fruit_char: 'Fruit Characterization',
        health_sanidad: 'Health and Resistance',
        edit_title: 'Edit Characterization',
        no_records: 'No records. Create the first characterization.',
        error_load: 'Error loading.',
        error_network: 'Connection error',
        user_not_found: 'User not found',
        collector_label: 'Collector',
        registro_label: 'Registration',
        export_error: 'Export error'
      },
      noticias: {
        title: 'News and Research',
        new: 'New News',
        title_field: 'Title',
        content: 'Content',
        images: 'Images (up to 10)',
        uploading: 'Uploading images...',
        publish: 'Publish',
        edit_title: 'Edit News',
        update: 'Update',
        max_images: 'Maximum 10 images',
        wait_upload: 'Wait for images to finish uploading',
        confirm_delete: 'Delete this news?',
        error_network: 'Connection error',
        error_load: 'Error loading news',
        no_comments: 'No comments',
        error_comments: 'Error loading comments',
        error_send: 'Error sending comment',
        comment_heading: 'Comments',
        comment_placeholder: 'Write a comment...',
        author_anon: 'Anonymous',
        anon: 'Anonymous'
      },
      admin: {
        title: 'Administration Panel',
        users: 'Users',
        seeds: 'Seed Requests',
        orders: 'Customer Orders',
        support: 'Support Requests',
        create_user: 'Create New User'
      },
      soporte: { title: 'Technical Support' },
      semillas: { title: 'Free Seeds' },
      publicaciones: { title: 'Scientific Publications' },
      perfil: { title: 'My Profile' },
      pedidos: { title: 'Orders & Quotes' },
      investigadores: { title: 'Researchers' },
      investigador_perfil: { title: 'My Professional Profile' },
      fertirriego: { title: 'Fertirrigation' },
      fao: { title: 'FAO Passport' },
      bioproductos: { title: 'Bioproducts' },
      inicio: {
        welcome: 'Welcome to Pitahaya System',
        description: 'Biotechnological management, monitoring and commercialization.',
        dashboard_btn: 'Biotec Dashboard',
        news_btn: 'News',
        map_title: 'Monitoring Map',
        map_desc: 'Monitoring points with health and variety information.',
        map_btn: 'Go to Map',
        varieties_title: 'Varieties',
        varieties_desc: 'Complete catalog of pitahaya varieties.',
        varieties_btn: 'View Varieties',
        bioproducts_title: 'Bioproducts',
        bioproducts_desc: 'Biotechnological products for cultivation.',
        bioproducts_btn: 'View Products'
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
      dashboard: {
        welcome: 'Kamachik Tawka',
        request_quote: 'Ma' + String.fromCharCode(0x79) + 'llana'
      },
      chat: {
        welcome: 'Ima shuk yanapaitak?',
        typing: 'Killkachkan...',
        write: 'Killkay...',
        send: 'Kachana'
      },
      map: {
        farm: 'Chakra',
        variety: 'Rikuchina',
        status: 'Kawsay',
        view_analysis: 'Rikuna',
        loading_analysis: 'Yachayta kargachkan ID: ',
        example_farm: 'Palora Yachay Chakra',
        example_variety: 'Rikuchina: Pitahaya Amarilla.',
        belleza_farm: 'La Belleza Yachay Chakra'
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
        no: 'Ama',
        error_loading: 'Pantashka'
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
        farm: 'Chakra',
        search: 'Maskana...',
        sort_recent: 'Mushuk',
        sort_name: 'Suti A-Z',
        sort_location: 'Llakta',
        export_csv: 'CSV Kachana',
        export_csv_title: 'CSV kachana yachay',
        tab_ident: 'Ri' + String.fromCharCode(0x6b) + 'uchi',
        tab_taxo: 'Taxo.',
        tab_origen: 'Patsa',
        tab_colec: 'Pallana',
        tab_general: 'Tukuy',
        tab_vegetativa: 'Wi' + String.fromCharCode(0x6e) + 'ay',
        tab_floral: 'Sisa',
        tab_fruto: 'Ruru',
        tab_sanidad: 'Alli',
        tab_propietario: 'Kamamuk',
        agronomic_characterization: 'Allpa Rikuchina',
        description: 'Willana',
        benefits: 'Alli',
        location: 'Llakta',
        production: 'Rurana',
        tech_sheet: 'Yachay Killka',
        vegetative_char: 'Wi' + String.fromCharCode(0x6e) + 'ay Rikuchina',
        floral_char: 'Sisa Rikuchina',
        fruit_char: 'Ruru Rikuchina',
        health_sanidad: 'Alli Kawsay',
        edit_title: 'Rikuchinata Allichiy',
        no_records: 'Na killkashkachu. Shuk rikuchinata ruray.',
        error_load: 'Pantashka kargachka.',
        error_network: 'Pantashka',
        user_not_found: 'Mana riksishka',
        collector_label: 'Pallak',
        registro_label: 'Killkakuna',
        export_error: 'Kachay pantashka'
      },
      noticias: {
        title: 'Willaykuna',
        new: 'Mushuk Willay',
        title_field: 'Shuti',
        content: 'Willana',
        images: 'Rikchakuna (10 kam)',
        uploading: 'Rikchakuna kargachkan...',
        publish: 'Kachana',
        edit_title: 'Willayta Allichiy',
        update: 'Kunanchay',
        max_images: '10 rikchakunamanta ashtawan',
        wait_upload: 'Rikchakuna kargachun shuyay',
        confirm_delete: 'Kay willayta pichanachu?',
        error_network: 'Pantashka',
        error_load: 'Willaykuna pantashka',
        no_comments: 'Na killkashkachu',
        error_comments: 'Killkakuna pantashka',
        error_send: 'Killkata kachay pantashka',
        comment_heading: 'Killkakuna',
        comment_placeholder: 'Killkay...',
        author_anon: 'Mana riksishka',
        anon: 'Mana riksishka'
      },
      admin: {
        title: 'Kamachik Tawka',
        users: 'Runakuna',
        seeds: 'Muhu Ma' + String.fromCharCode(0x79) + 'llakuna',
        orders: 'Rantik Ma' + String.fromCharCode(0x79) + 'llakuna',
        support: 'Yanapana Ma' + String.fromCharCode(0x79) + 'llakuna',
        create_user: 'Mushuk Runata Ruray'
      },
      soporte: { title: 'Yanapana' },
      semillas: { title: 'Muhu Kuna' },
      publicaciones: { title: 'Killkashkakuna' },
      perfil: { title: 'Rikuchik' },
      pedidos: { title: 'Ma\u00f1ay' },
      investigadores: { title: 'Tukuchikkuna' },
      investigador_perfil: { title: '\u00d1uka Kawsay' },
      fertirriego: { title: 'Yaku Mit\u2019ay' },
      fao: { title: 'FAO Pasaporte' },
      bioproductos: { title: 'Kawsay Mikuna' },
      inicio: {
        welcome: 'Pitahaya Sistemaman Alli Shamushka',
        description: 'Kawsay allichiy, rikuchina, rantikuna.',
        dashboard_btn: 'Kamachik Tawka',
        news_btn: 'Willaykuna',
        map_title: 'Rikuchina Mapa',
        map_desc: 'Alli kawsay rikuchina punkukuna.',
        map_btn: 'Mapaman Ri',
        varieties_title: 'Rikuchina',
        varieties_desc: 'Pitahaya rikuchina tukuy.',
        varieties_btn: 'Rikuchinakunata Riku',
        bioproducts_title: 'Kawsay Mikuna',
        bioproducts_desc: 'Yapimiat kawsay mikuna.',
        bioproducts_btn: 'Rikuna'
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
      dashboard: {
        welcome: 'Uunt Kuntuts',
        request_quote: 'Awajsamu'
      },
      chat: {
        welcome: 'Wari itiursamta?',
        typing: 'Karakchatai...',
        write: 'Aujmattsa...',
        send: 'Awe'
      },
      map: {
        farm: 'Yapimiat',
        variety: 'Nekatin',
        status: 'Kuitamiat',
        view_analysis: 'Nekapratai',
        loading_analysis: 'Nekatin karakchatai ID: ',
        example_farm: 'Palora Yapimiat',
        example_variety: 'Nekatin: Pitahaya Amarilla.',
        belleza_farm: 'La Belleza Yapimiat'
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
        no: 'Atse',
        error_loading: 'Nekasa karakchatai'
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
        farm: 'Yapimiat',
        search: 'Pujustin...',
        sort_recent: 'Yamaram',
        sort_name: 'Neka A-Z',
        sort_location: 'Pujutai',
        export_csv: 'CSK Awe',
        export_csv_title: 'CSV awe nekatin',
        tab_ident: 'Nekatin',
        tab_taxo: 'Taxo.',
        tab_origen: 'Nekapratai',
        tab_colec: 'Uwejai',
        tab_general: 'Iwiaku',
        tab_vegetativa: 'Najanmatai',
        tab_floral: 'Tsapau',
        tab_fruto: 'Nuka',
        tab_sanidad: 'Kuitamiat',
        tab_propietario: 'Uunt',
        agronomic_characterization: 'Nekatin Yapimiat',
        description: 'Chicham',
        benefits: 'Kuitamiat',
        location: 'Pujutai',
        production: 'Najanmatai',
        tech_sheet: 'Nekatin Papeartai',
        vegetative_char: 'Najanmatai Nekatin',
        floral_char: 'Tsapau Nekatin',
        fruit_char: 'Nuka Nekatin',
        health_sanidad: 'Kuitamiat',
        edit_title: 'Nekatin Nekapratai',
        no_records: 'Atse nekapratai. Yamaram nekatin najanatai.',
        error_load: 'Nekasa.',
        error_network: 'Nekasa',
        user_not_found: 'Aents nekasa',
        collector_label: 'Uwejai',
        registro_label: 'Aentramu',
        export_error: 'Awe nekasa'
      },
      noticias: {
        title: 'Nekapmatai',
        new: 'Yamaram Nekapmatai',
        title_field: 'Neka',
        content: 'Chicham',
        images: 'Nekapratai (10 kam)',
        uploading: 'Nekapratai karakchatai...',
        publish: 'Awe',
        edit_title: 'Nekapmatai Nekapratai',
        update: 'Kuitamiat',
        max_images: '10 nekapratai yaunchuk',
        wait_upload: 'Nekapratai karakchatin shuyay',
        confirm_delete: 'Yamaik pachimiatashtam?',
        error_network: 'Nekasa',
        error_load: 'Nekapmatai nekasa',
        no_comments: 'Atse chicham',
        error_comments: 'Chicham nekasa',
        error_send: 'Chicham awe nekasa',
        comment_heading: 'Chicham ainau',
        comment_placeholder: 'Aujmattsa...',
        author_anon: 'Nekasa',
        anon: 'Nekasa'
      },
      admin: {
        title: 'Uunt Kuntuts',
        users: 'Aents ainau',
        seeds: 'Nuka Awajsamu',
        orders: 'Chicham Awajsamu',
        support: 'Yanapamuri Awajsamu',
        create_user: 'Yamaram Aents Najanatai'
      },
      soporte: { title: 'Yanapamuri' },
      semillas: { title: 'Nuka' },
      publicaciones: { title: 'Papeartai' },
      perfil: { title: 'Nekamuri' },
      pedidos: { title: 'Awajsamu' },
      investigadores: { title: 'Nekainiuri' },
      investigador_perfil: { title: 'Wii Nekamuri' },
      fertirriego: { title: 'Yumi Yapimiat' },
      fao: { title: 'FAO Pasaporte' },
      bioproductos: { title: 'Yurumkramu' },
      inicio: {
        welcome: 'Pitahaya Sistemnum Weti',
        description: 'Tuke yapimiat, nekatin, awajsamu.',
        dashboard_btn: 'Uunt Kuntuts',
        news_btn: 'Nekapmatai',
        map_title: 'Mapa Kuitamiat',
        map_desc: 'Kuitamiat nekatin nuka ainau.',
        map_btn: 'Mapanum Wet',
        varieties_title: 'Nekatin',
        varieties_desc: 'Pitahaya nekatin iwiaku.',
        varieties_btn: 'Nekatin Nekapratai',
        bioproducts_title: 'Yurumkramu',
        bioproducts_desc: 'Yapimiat yurumkramu.',
        bioproducts_btn: 'Nekapratai'
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
    var loginSwitcher = document.getElementById('loginLangSwitcher');
    if (loginSwitcher) loginSwitcher.value = lang;
    var evt = new CustomEvent('languageChanged', { detail: { lang: lang } });
    document.dispatchEvent(evt);
  };

  document.addEventListener('DOMContentLoaded', function() {
    translateDOM();
  });
})();
