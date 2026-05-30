// CEDP global JS fixes — runs in iframe content
(function(){
  // ---- Unified Top Bar + Nav injection (all pages) ----
  try {
    var path = (location.pathname || '/').replace(/\/$/, '') || '/';
    var IMPACT_PATHS = ['/news','/research','/legislative-wins','/impact'];
    function act(p){
      if(p==='/' && path==='/') return ' act';
      if(p!=='/' && path.indexOf(p)===0) return ' act';
      return '';
    }
    var impactAct = IMPACT_PATHS.indexOf(path)>=0 ? ' act' : '';
    var TB = '<div class="tb"><div style="display:flex;align-items:center;gap:14px"><span>&#9742; <span data-i18n="topbar_help">Need help now?</span></span> <a href="tel:3038381200">(303) 838-1200</a></div><div class="lang-toggle" style="font-size:11px;color:rgba(255,255,255,.5)"><a href="#" data-lang="en" style="color:inherit;text-decoration:none">English</a> <span style="opacity:.5">|</span> <a href="#" data-lang="es" style="color:inherit;text-decoration:none">Espa&ntilde;ol</a></div></div>';
    var NAV = '<nav><div><a href="/"><img src="https://cedproject.org/wp-content/uploads/2022/10/CEDP_2022Logo_Horizontal_RGBWeb-01-e1670360921367.png" alt="CEDP"/></a></div><div class="nl">'+
      '<div class="ni"><a href="/" class="'+act('/').trim()+'">Home</a></div>'+
      '<div class="ni"><a href="/about" class="'+act('/about').trim()+'">About</a>'+
        '<div class="mega mega-sm"><div class="mega-inner">'+
          '<div class="mega-links"><div class="mega-label">About CEDP</div>'+
            '<a href="/about">Our purpose</a><a href="/team">Our team</a><a href="/ced-law">CED Law</a><a href="/careers">Careers</a>'+
          '</div>'+
          '<div class="mega-img"><img src="https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=440&h=520&fit=crop" alt="" loading="lazy"/></div>'+
        '</div><div class="mega-stat">100+ professionals &middot; 4 offices across Colorado</div></div>'+
      '</div>'+
      '<div class="ni"><a href="/our-work" class="'+act('/our-work').trim()+'">Our work</a>'+
        '<div class="mega"><div class="mega-inner">'+
          '<div class="mega-2col">'+
            '<div class="mega-links"><div class="mega-label">Services</div>'+
              '<a href="/our-work">Eviction defense</a><a href="/our-work">Foreclosure</a><a href="/our-work">Unjust towing</a><a href="/our-work">Debt collection</a><a href="/our-work">Disaster relief</a><a href="/our-work">Resource navigation</a>'+
            '</div>'+
            '<div class="mega-links"><div class="mega-label">Programs</div>'+
              '<a href="/our-work">Programs overview</a><a href="/our-work">CARE Center</a><a href="/our-work">Just Bus mobile aid</a><a href="/our-work">Statewide coverage</a>'+
            '</div>'+
          '</div>'+
          '<div class="mega-img"><img src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=440&h=520&fit=crop" alt="" loading="lazy"/></div>'+
        '</div><div class="mega-stat">68,000+ Coloradans served &middot; $280M+ distributed</div></div>'+
      '</div>'+
      '<div class="ni"><a href="/legislative-wins" class="'+impactAct.trim()+'">Impact</a>'+
        '<div class="mega mega-sm"><div class="mega-inner">'+
          '<div class="mega-links"><div class="mega-label">Our impact</div>'+
            '<a href="/legislative-wins">Legislative wins</a><a href="/research">Research</a><a href="/news">News &amp; press</a>'+
          '</div>'+
          '<div class="mega-img"><img src="https://images.pexels.com/photos/8761744/pexels-photo-8761744.jpeg?auto=compress&cs=tinysrgb&w=440&h=520&fit=crop" alt="" loading="lazy"/></div>'+
        '</div><div class="mega-stat">12+ state laws passed &middot; Cited by White House &amp; HUD</div></div>'+
      '</div>'+
      '<div class="ni"><a href="/careers" class="'+act('/careers').trim()+'">Careers</a>'+
        '<div class="mega mega-sm"><div class="mega-inner">'+
          '<div class="mega-links"><div class="mega-label">Join CEDP</div>'+
            '<a href="/careers">Why CEDP</a><a href="/careers">Open positions</a><a href="/careers">Culture &amp; benefits</a>'+
          '</div>'+
          '<div class="mega-img"><img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=440&h=520&fit=crop" alt="" loading="lazy"/></div>'+
        '</div></div>'+
      '</div>'+
      '<a class="btn-d" href="https://cedproject.org/donate/" target="_blank" rel="noopener">Donate</a><a class="btn-h '+act('/get-help').trim()+'" href="/get-help">Get help</a>'+
      '</div></nav>';

    // Inject unified nav on every page (including home) for consistency.
    // Skip dot-nav <nav> elements.
    var existingNav = document.querySelector('body > nav:not(.dot-nav), body > header > nav:not(.dot-nav)');
    if (!existingNav) existingNav = document.querySelector('nav:not(.dot-nav)');
    var existingTb  = document.querySelector('body > .tb');
    if (existingNav) {
      if (existingTb) existingTb.outerHTML = TB + NAV;
      else existingNav.outerHTML = TB + NAV;
      if (existingTb && existingNav.parentNode) existingNav.remove();
    }
  } catch(e) { console.warn('nav inject failed', e); }

  // ---- Inject sticky dot-nav on all non-home pages ----
  try {
    var p = (location.pathname || '/').replace(/\/$/, '') || '/';
    var isHomePage = p === '/' || /cedp-home\.html$/.test(location.pathname);
    if (!isHomePage && !document.getElementById('dotNav')) {
      var dn = document.createElement('nav');
      dn.className = 'dot-nav';
      dn.id = 'dotNav';
      dn.innerHTML =
        '<div class="dot-top" id="dotTop"><svg viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg></div>'+
        '<a href="/#whoSection" target="_top"><span class="dot-label">Who We Are</span><span class="dot"></span></a>'+
        '<a href="/#hlpSection" target="_top"><span class="dot-label">How We Can Help</span><span class="dot"></span></a>'+
        '<a href="/#modelSection" target="_top"><span class="dot-label">How We Work</span><span class="dot"></span></a>'+
        '<a href="/#impactSection" target="_top"><span class="dot-label">Our Impact</span><span class="dot"></span></a>'+
        '<a href="/#pathsSection" target="_top"><span class="dot-label">What You\'re Looking For</span><span class="dot"></span></a>'+
        '<a href="/#donateSection" target="_top"><span class="dot-label">Donate</span><span class="dot"></span></a>';
      document.body.appendChild(dn);
      var top = dn.querySelector('#dotTop');
      top.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });
      window.addEventListener('scroll', function(){
        if (window.scrollY > 400) top.classList.add('show'); else top.classList.remove('show');
      }, { passive: true });
    }
  } catch(e) { console.warn('dot-nav inject failed', e); }

  // ---- Unified Footer injection (all non-home pages) ----
  try {
    var fp = (location.pathname || '/').replace(/\/$/, '') || '/';
    var isHomeF = fp === '/' || /cedp-home\.html$/.test(location.pathname);
    var isMobileHelp = /cedp-gethelp-mobile\.html$/.test(location.pathname);
    if (!isHomeF && !isMobileHelp) {
      var FOOTER = '<footer><div class="ft-warm"><span class="ft-warm-txt">You don\'t have to face this <em>alone.</em></span></div>'+
        '<div class="ft-g">'+
          '<div><a href="/" target="_top" class="ft-b" style="text-decoration:none;color:inherit;display:block">Community Economic<br/><em>Defense Project</em></a>'+
            '<div class="ft-d">We partner with low-income and working people to build economic and racial equity by confronting economic abuse and investing in community wealth.</div>'+
            '<div class="ft-c">1600 N. Downing St., Suite 600<br/>Denver, CO 80218<br/><a href="mailto:info@cedproject.org" style="color:inherit">info@cedproject.org</a><br/><a href="tel:3038381200" style="color:inherit">(303) 838-1200</a></div>'+
          '</div>'+
          '<div><h4>Get help</h4>'+
            '<a href="/get-help" target="_top">Eviction</a><a href="/get-help" target="_top">Foreclosure</a><a href="/get-help" target="_top">Towing</a><a href="/get-help" target="_top">Debt</a><a href="/get-help" target="_top">Disaster relief</a>'+
          '</div>'+
          '<div><h4>About</h4>'+
            '<a href="/about" target="_top">Our purpose</a><a href="/team" target="_top">Our team</a><a href="/careers" target="_top">Careers</a><a href="/ced-law" target="_top">CED Law</a><a href="mailto:info@cedproject.org">Contact</a>'+
          '</div>'+
          '<div><h4>Impact</h4>'+
            '<a href="/legislative-wins" target="_top">Legislative wins</a><a href="/research" target="_top">Research</a><a href="/news" target="_top">News &amp; press</a><a href="https://cedproject.org/donate/" target="_blank" rel="noopener">Donate</a><a href="#" title="Coming soon">Events</a>'+
          '</div>'+
        '</div>'+
        '<div class="brand-mark"><img src="https://i0.wp.com/cedproject.org/wp-content/uploads/2022/10/cropped-CEDP_2022Logo_HouseIcons_RGBWeb-01.png?fit=270%2C270&quality=100&ssl=1" alt="CEDP"/><div class="brand-mark-text">Community<br/>Economic<br/>Defense Project</div></div>'+
        '<div class="ft-bt"><span>&copy; 2026 Community Economic Defense Project</span><span><a href="#" title="Coming soon">Privacy policy</a> &bull; <a href="#" title="Coming soon">Terms of use</a> &bull; <a href="#" title="Coming soon">Accessibility</a></span></div>'+
      '</footer>';
      var existingFooter = document.querySelector('body > footer') || document.querySelector('footer');
      if (existingFooter) existingFooter.outerHTML = FOOTER;
      else document.body.insertAdjacentHTML('beforeend', FOOTER);
    }
  } catch(e) { console.warn('footer inject failed', e); }

  // Fix accordion arrow SVG to full down arrow (line + head)
  document.querySelectorAll('.cl-acc-circle svg').forEach(function(svg){
    svg.setAttribute('viewBox','0 0 24 24');
    svg.innerHTML = '<path d="M12 5v14M6 13l6 6 6-6" />';
  });
  // Ensure mission punch defaults to navy variant
  document.querySelectorAll('.cl-punch,.ow-punch,.punch').forEach(function(p){
    if(!p.classList.contains('v-g') && !p.classList.contains('v-r') && !p.classList.contains('v-n')){
      p.classList.add('v-n');
    }
    var tog = p.querySelector('.cl-punch-tog,.ow-punch-tog,.punch-tog');
    if(tog){
      var nbtn = tog.querySelector('[data-v="n"]');
      if(nbtn && !tog.querySelector('.on')) nbtn.classList.add('on');
    }
  });
})();

// ---- Global link normalizer (runs after injections) ----
(function(){
  var HTML_MAP = {
    'cedp-home.html': '/',
    'cedp-about.html': '/about',
    'cedp-our-work.html': '/our-work',
    'cedp-ced-law.html': '/ced-law',
    'cedp-gethelp.html': '/get-help',
    'cedp-gethelp-mobile.html': '/get-help',
    'cedp-careers.html': '/careers',
    'cedp-legislative-wins.html': '/legislative-wins',
    'cedp-news.html': '/news',
    'cedp-research.html': '/research',
    'cedp-team.html': '/team'
  };
  var DONATE_URL = 'https://cedproject.org/donate/';
  var HOST = location.hostname;

  function normalize(){
    document.querySelectorAll('a[href]').forEach(function(a){
      if (a.closest('.dot-nav')) return;
      var href = a.getAttribute('href') || '';
      var txt = (a.textContent || '').trim().toLowerCase();

      // .html -> route
      Object.keys(HTML_MAP).forEach(function(k){
        if (href === k || href === '/' + k || href.indexOf(k) === 0 || href.indexOf('/' + k) === 0) {
          var rest = href.split(k)[1] || '';
          a.setAttribute('href', HTML_MAP[k] + rest);
          href = a.getAttribute('href');
        }
      });

      // tel: normalize
      if (href.indexOf('tel:') === 0) {
        a.setAttribute('href', 'tel:3038381200');
        href = 'tel:3038381200';
      }
      // mailto normalize (only if obviously CEDP-related or empty mailto)
      if (href === 'mailto:' || href === 'mailto:info@') {
        a.setAttribute('href', 'mailto:info@cedproject.org');
        href = 'mailto:info@cedproject.org';
      }

      // Donate buttons -> external
      var isDonate = a.classList.contains('btn-d') || /\bdonate\b/.test(txt);
      if (isDonate && href !== DONATE_URL && !/cedproject\.org\/donate/.test(href)) {
        // Only rewrite when href looks like a donate placeholder/anchor
        if (href === '#' || /donateSection/.test(href) || href.indexOf('#') === 0 || href.indexOf('/#') === 0 || href.indexOf('cedp-') >= 0) {
          a.setAttribute('href', DONATE_URL);
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener');
          href = DONATE_URL;
        }
      }

      // Get Help buttons -> /get-help (when text says "get help" and not already there)
      if (a.classList.contains('btn-h') || /^get help( now)?$/.test(txt)) {
        if (href === '#' || /cedp-gethelp/.test(href)) {
          a.setAttribute('href', '/get-help');
          href = '/get-help';
        }
      }

      // External links -> new tab
      if (/^https?:\/\//i.test(href)) {
        try {
          var u = new URL(href);
          if (u.hostname && u.hostname !== HOST) {
            if (!a.getAttribute('target')) a.setAttribute('target', '_blank');
            var rel = (a.getAttribute('rel') || '').split(/\s+/);
            if (rel.indexOf('noopener') < 0) rel.push('noopener');
            a.setAttribute('rel', rel.filter(Boolean).join(' '));
          }
        } catch(_){}
      }
    });
  }

  // Run now and again shortly after to catch any late DOM mutations
  try { normalize(); } catch(e) { console.warn('link normalize failed', e); }
  setTimeout(function(){ try { normalize(); } catch(_){} }, 300);
  setTimeout(function(){ try { normalize(); } catch(_){} }, 1200);
})();

// ==================== Bilingual EN/ES translation engine ====================
(function(){
  // Dictionary: English text -> Spanish text. Matched case-insensitively after
  // trimming and collapsing whitespace. Numbers, proper nouns, names, bill IDs
  // are intentionally absent so they remain unchanged.
  var DICT = {
    // Top bar / nav
    "Need help now?": "¿Necesita ayuda ahora?",
    "Home": "Inicio",
    "About": "Acerca de",
    "Our work": "Nuestro trabajo",
    "Our Work": "Nuestro trabajo",
    "CED Law": "CED Law",
    "Impact": "Impacto",
    "News": "Noticias",
    "News & press": "Noticias y prensa",
    "News & Press": "Noticias y prensa",
    "Careers": "Empleos",
    "Donate": "Donar",
    "Get help": "Obtener ayuda",
    "Get Help": "Obtener ayuda",
    "Get Help Now": "Obtener ayuda ahora",
    "Get help now": "Obtener ayuda ahora",
    // Footer
    "You don't have to face this": "No tiene que enfrentar esto",
    "You don\u2019t have to face this": "No tiene que enfrentar esto",
    "alone.": "solo.",
    "Community Economic Defense Project": "Proyecto de Defensa Económica Comunitaria",
    "Community Economic": "Proyecto de Defensa",
    "Defense Project": "Económica Comunitaria",
    "We partner with low-income and working people to build economic and racial equity by confronting economic abuse and investing in community wealth.": "Nos asociamos con personas de bajos ingresos y trabajadores para construir equidad económica y racial confrontando el abuso económico e invirtiendo en la riqueza comunitaria.",
    "Eviction": "Desalojo",
    "Foreclosure": "Ejecución hipotecaria",
    "Towing": "Remolque",
    "Debt": "Deuda",
    "Disaster relief": "Ayuda por desastre",
    "Our purpose": "Nuestro propósito",
    "Our team": "Nuestro equipo",
    "Contact": "Contacto",
    "Legislative wins": "Logros legislativos",
    "Legislative Wins": "Logros legislativos",
    "Research": "Investigación",
    "Events": "Eventos",
    "Privacy policy": "Política de privacidad",
    "Terms of use": "Términos de uso",
    "Accessibility": "Accesibilidad",
    "About CEDP": "Acerca de CEDP",
    "Join CEDP": "Únete a CEDP",
    "Services": "Servicios",
    "Programs": "Programas",
    "Programs overview": "Resumen de programas",
    "CARE Center": "Centro CARE",
    "Just Bus mobile aid": "Just Bus ayuda móvil",
    "Statewide coverage": "Cobertura estatal",
    "Eviction defense": "Defensa contra desalojo",
    "Unjust towing": "Remolque injusto",
    "Debt collection": "Cobro de deudas",
    "Resource navigation": "Navegación de recursos",
    "Our impact": "Nuestro impacto",
    "Why CEDP": "Por qué CEDP",
    "Open positions": "Posiciones abiertas",
    "Culture & benefits": "Cultura y beneficios",
    // Homepage
    "When the system satisfies fails,": "Cuando el sistema falla,",
    "When the system fails,": "Cuando el sistema falla,",
    "we show up.": "nosotros aparecemos.",
    "CEDP partners with low-income and working people to confront economic abuse and invest in community wealth.": "CEDP se asocia con personas de bajos ingresos y trabajadores para confrontar el abuso económico e invertir en la riqueza comunitaria.",
    "Learn More": "Conocer más",
    "Families Served": "Familias atendidas",
    "Distributed": "Distribuidos",
    "Counties Covered": "Condados cubiertos",
    "Served Monthly": "Atendidos mensualmente",
    "Who we are": "Quiénes somos",
    "From a Facebook post to Colorado's most comprehensive economic defense organization": "De una publicación de Facebook a la organización de defensa económica más completa de Colorado",
    "In April 2020, CEDP co-founders Zach Neumann and Sam Gilman posted on Facebook offering free legal help to families facing eviction during the pandemic. Within weeks, thousands responded. Today, CEDP serves 68,000+ families across 59 of 64 Colorado counties.": "En abril de 2020, los cofundadores de CEDP, Zach Neumann y Sam Gilman, publicaron en Facebook ofreciendo ayuda legal gratuita a familias que enfrentaban desalojo durante la pandemia. En semanas, miles respondieron. Hoy, CEDP atiende a más de 68,000 familias en 59 de los 64 condados de Colorado.",
    "How we can help": "Cómo podemos ayudar",
    "How We Can Help": "Cómo podemos ayudar",
    "How we work": "Cómo trabajamos",
    "How We Work": "Cómo trabajamos",
    "Explore more": "Explorar más",
    "What You're Looking For": "Lo que está buscando",
    "Support the Fight": "Apoya la lucha",
    "Your donation funds free legal representation, emergency financial aid, and the policy work that changes systems.": "Su donación financia representación legal gratuita, ayuda financiera de emergencia y el trabajo de políticas que cambia los sistemas.",
    "Donate Today": "Donar hoy",
    "Support Our Work": "Apoya nuestro trabajo",
    // Get Help
    "Call the CARE Center": "Llame al Centro CARE",
    "Free, confidential help for eviction, foreclosure, towing, and debt.": "Ayuda gratuita y confidencial para desalojo, ejecución hipotecaria, remolque y deuda.",
    "Mon–Fri, 8:30am–5:30pm MT": "Lun–Vie, 8:30am–5:30pm MT",
    "After hours? Submit an intake form.": "¿Fuera de horario? Envíe un formulario de admisión.",
    "What are you facing?": "¿Qué situación enfrenta?",
    "Eviction & Housing": "Desalojo y vivienda",
    "My Car Was Towed": "Mi auto fue remolcado",
    "Debt Collection": "Cobro de deudas",
    "Disaster Relief": "Ayuda por desastre",
    "Something Else": "Otra situación",
    "Call Now": "Llamar ahora",
    "Chat with us": "Chatear con nosotros",
    "I can't call right now": "No puedo llamar ahora",
    "Fraud Alert": "Alerta de fraude",
    "Your name": "Su nombre",
    "Phone number": "Número de teléfono",
    "Email address": "Correo electrónico",
    "Describe your situation": "Describa su situación",
    "Preferred language": "Idioma preferido",
    "Submit": "Enviar",
    "Your safety matters": "Su seguridad importa",
    // CED Law
    "Free Legal Defense for Coloradans Facing Economic Abuse": "Defensa legal gratuita para los habitantes de Colorado que enfrentan abuso económico",
    "CED Law is CEDP's nonprofit law firm. Our attorneys provide free legal representation to people facing eviction, foreclosure, predatory towing, and debt collection. You never pay anything.": "CED Law es el bufete de abogados sin fines de lucro de CEDP. Nuestros abogados proporcionan representación legal gratuita a personas que enfrentan desalojo, ejecución hipotecaria, remolque depredador y cobro de deudas. Usted nunca paga nada.",
    "Call (303) 838-1200": "Llamar (303) 838-1200",
    "Check Eligibility": "Verificar elegibilidad",
    "Can CED Law help you?": "¿Puede CED Law ayudarle?",
    "Check your eligibility": "Verifique su elegibilidad",
    "Are you a Colorado resident?": "¿Es usted residente de Colorado?",
    "Yes, I live in Colorado": "Sí, vivo en Colorado",
    "No, I live outside Colorado": "No, vivo fuera de Colorado",
    "Eviction or housing loss": "Desalojo o pérdida de vivienda",
    "My car was towed": "Mi auto fue remolcado",
    "Something else": "Otra situación",
    "Have you received a formal notice or paperwork?": "¿Ha recibido un aviso formal o documentos?",
    "Yes, I have paperwork": "Sí, tengo documentos",
    "No, but I'm worried": "No, pero estoy preocupado/a",
    "I'm not sure": "No estoy seguro/a",
    "You likely qualify for free legal help.": "Es probable que califique para ayuda legal gratuita.",
    "A CED Law attorney can represent you at no cost. Call us now or submit an intake form.": "Un abogado de CED Law puede representarlo sin costo. Llámenos ahora o envíe un formulario de admisión.",
    "CED Law currently serves Colorado residents.": "CED Law actualmente atiende a residentes de Colorado.",
    "What we do": "Lo que hacemos",
    "Practice Areas": "Áreas de práctica",
    "Eviction Defense": "Defensa contra desalojo",
    "Foreclosure Prevention": "Prevención de ejecución hipotecaria",
    "Towing Recovery": "Recuperación de vehículos",
    "Debt Defense": "Defensa contra deudas",
    "Appellate Program": "Programa de apelaciones",
    "Affirmative Litigation": "Litigio afirmativo",
    "Our attorneys": "Nuestros abogados",
    "The people defending your rights": "Las personas que defienden sus derechos",
    "Track record": "Trayectoria",
    "Results that change systems": "Resultados que cambian sistemas",
    "Frequently Asked Questions": "Preguntas frecuentes",
    "Does CED Law charge fees?": "¿CED Law cobra honorarios?",
    "Never. All legal services are 100% free.": "Nunca. Todos los servicios legales son 100% gratuitos.",
    "Do I qualify for help?": "¿Califico para recibir ayuda?",
    "What should I bring to my first call?": "¿Qué debo tener para mi primera llamada?",
    "How quickly can you help?": "¿Qué tan rápido pueden ayudarme?",
    "Do you help in Spanish?": "¿Ayudan en español?",
    "Yes. Bilingual services available in English and Spanish.": "Sí. Servicios bilingües disponibles en inglés y español.",
    "What areas of Colorado do you cover?": "¿Qué áreas de Colorado cubren?",
    "Can you help if I've already been evicted?": "¿Pueden ayudarme si ya fui desalojado/a?",
    "How is CED Law different from other legal aid?": "¿En qué se diferencia CED Law de otros servicios legales?",
    "Free legal defense. Because justice shouldn't have a price tag.": "Defensa legal gratuita. Porque la justicia no debería tener precio.",
    "Support CED Law": "Apoye a CED Law",
    // Careers
    "Work": "Trabajo",
    "That": "Que",
    "Defends": "Defiende",
    "Communities": "Comunidades",
    "Join the team that turned a Facebook post into Colorado's most comprehensive economic defense organization.": "Únete al equipo que convirtió una publicación de Facebook en la organización de defensa económica más completa de Colorado.",
    "View Open Positions": "Ver posiciones abiertas",
    "Why join us": "Por qué unirse",
    "Why people choose CEDP": "Por qué la gente elige CEDP",
    "Mission-driven work": "Trabajo con propósito",
    "Unprecedented growth": "Crecimiento sin precedentes",
    "Colorado-based": "Con sede en Colorado",
    "Systemic change": "Cambio sistémico",
    "Culture": "Cultura",
    "What it's like here": "Cómo es trabajar aquí",
    "Benefits": "Beneficios",
    "What we offer": "Lo que ofrecemos",
    "Competitive salary": "Salario competitivo",
    "Health & dental insurance": "Seguro médico y dental",
    "Generous PTO": "Tiempo libre generoso",
    "Hybrid / remote options": "Opciones híbridas / remotas",
    "Professional development": "Desarrollo profesional",
    "401(k) retirement": "Jubilación 401(k)",
    "tap to learn more": "toque para más información",
    "tap to flip back": "toque para voltear",
    "Current openings": "Vacantes actuales",
    "All": "Todos",
    "Legal": "Legal",
    "Navigation": "Navegación",
    "Policy": "Política",
    "Operations": "Operaciones",
    "Full-time": "Tiempo completo",
    "How it works": "Cómo funciona",
    "Application process": "Proceso de solicitud",
    "Apply": "Solicitar",
    "Phone Screen": "Entrevista telefónica",
    "Interview": "Entrevista",
    "Offer": "Oferta",
    "Don't see the right role?": "¿No ve la posición adecuada?",
    "Join our talent community. We'll notify you when new positions open.": "Únase a nuestra comunidad de talento. Le notificaremos cuando se abran nuevas posiciones.",
    "Subscribe": "Suscribirse",
    "200 people. 68,000 families. Join the fight.": "200 personas. 68,000 familias. Únete a la lucha.",
    "Join Us": "Únete",
    "JOIN US": "ÚNETE",
    // Legislative Wins
    "Changing the law to": "Cambiando la ley para",
    "protect communities": "proteger comunidades",
    "Client experiences inform legislation. From case to cause — CEDP changes the systems that create injustice.": "Las experiencias de los clientes informan la legislación. De caso a causa — CEDP cambia los sistemas que crean injusticia.",
    "Bills passed in 2024": "Leyes aprobadas en 2024",
    "Wyatts settlement": "Acuerdo Wyatts",
    "Cost to clients": "Costo para clientes",
    "Explore Wins": "Explorar logros",
    "Landmark Wins": "Logros históricos",
    "All legislative wins": "Todos los logros legislativos",
    "By session year": "Por año de sesión",
    "Fact Sheet": "Hoja informativa",
    "Bill Text": "Texto del proyecto",
    "View Full Details": "Ver detalles completos",
    "From case to cause. From client to law.": "De caso a causa. De cliente a ley.",
    // News
    "CEDP in the news": "CEDP en las noticias",
    "Selected stories featuring CEDP staff, clients, leadership, and legislative impact.": "Historias seleccionadas sobre el personal, clientes, liderazgo e impacto legislativo de CEDP.",
    "All coverage": "Toda la cobertura",
    "Read Coverage": "Leer cobertura",
    "For media": "Para medios",
    "Press resources": "Recursos de prensa",
    "Logo Pack": "Paquete de logos",
    "Headshots": "Fotos de perfil",
    "Media Contact": "Contacto de prensa",
    "The CEDP Dispatch": "El Despacho CEDP",
    "Monthly updates on housing policy, legislative wins, client stories, and how you can help defend communities.": "Actualizaciones mensuales sobre política de vivienda, logros legislativos, historias de clientes y cómo puede ayudar a defender comunidades.",
    "Join 5,000+ subscribers. Unsubscribe anytime.": "Únase a más de 5,000 suscriptores. Cancele en cualquier momento.",
    "The stories that change systems.": "Las historias que cambian sistemas.",
    // Research
    "Research & Publications": "Investigación y publicaciones",
    "The data behind the fight": "Los datos detrás de la lucha",
    "Analysis from CEDP leadership on eviction, towing, housing policy, and economic justice.": "Análisis del liderazgo de CEDP sobre desalojo, remolque, política de vivienda y justicia económica.",
    "Featured Investigation": "Investigación destacada",
    "All publications": "Todas las publicaciones",
    "Read on Medium": "Leer en Medium",
    "Our research has been cited by": "Nuestra investigación ha sido citada por",
    "The data behind the fight.": "Los datos detrás de la lucha.",
    // Team
    "Our": "Nuestro",
    "Team": "Equipo",
    "Lawyers, navigators, economists, advocates, and policy experts — united in our shared passion to defend communities against economic injustice. Meet the faces behind the work.": "Abogados, navegadores, economistas, defensores y expertos en políticas — unidos en nuestra pasión compartida por defender comunidades contra la injusticia económica. Conozca los rostros detrás del trabajo.",
    "Want to be part of this team?": "¿Quiere ser parte de este equipo?",
    "We're always looking for people who believe injustice doesn't have to be inevitable.": "Siempre buscamos personas que creen que la injusticia no tiene que ser inevitable.",
    // About
    "About us": "Sobre nosotros",
    "Our origin": "Nuestro origen",
    "Co-founders": "Cofundadores",
    "Our values": "Nuestros valores",
    // Giant text links
    "Our programs": "Nuestros programas",
    "Meet CED Law": "Conozca CED Law",
    "Meet the team": "Conozca el equipo",
    "View careers": "Ver empleos",
    // Departments
    "Executive": "Ejecutivo",
    "Customer Care": "Atención al cliente",
    "Community Services": "Servicios comunitarios",
    "Eviction Diversion": "Prevención de desalojo",
    "Benefit Enrollment": "Inscripción de beneficios",
    "Communications": "Comunicaciones",
    "Finance": "Finanzas",
    "People": "Recursos humanos",
    "Resource Equity": "Equidad de recursos",
    "Strategy": "Estrategia",
    "Supportive Housing": "Vivienda de apoyo",
    "CEDP Board": "Junta de CEDP"
  };

  // Build normalized lookup (lowercase + collapse whitespace)
  function norm(s){ return s.replace(/\s+/g,' ').trim().toLowerCase(); }
  var EN_TO_ES = {};
  Object.keys(DICT).forEach(function(k){ EN_TO_ES[norm(k)] = DICT[k]; });

  var originals = []; // {node, text} for text nodes
  var attrOrig = []; // {el, attr, text}
  var collected = false;

  function collect(){
    if (collected) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = (p.nodeName||'').toLowerCase();
        if (tag==='script' || tag==='style' || tag==='noscript') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) originals.push({node:n, text:n.nodeValue});
    // attribute-bearing elements
    document.querySelectorAll('[placeholder],[alt],[title],[aria-label]').forEach(function(el){
      ['placeholder','alt','title','aria-label'].forEach(function(a){
        if (el.hasAttribute(a)) attrOrig.push({el:el, attr:a, text:el.getAttribute(a)});
      });
    });
    collected = true;
  }

  function translateOnce(lang){
    collect();
    originals.forEach(function(o){
      if (lang === 'es') {
        var key = norm(o.text);
        if (EN_TO_ES[key]) {
          // preserve leading/trailing whitespace
          var m = o.text.match(/^(\s*)([\s\S]*?)(\s*)$/);
          o.node.nodeValue = (m?m[1]:'') + EN_TO_ES[key] + (m?m[3]:'');
        } else {
          o.node.nodeValue = o.text;
        }
      } else {
        o.node.nodeValue = o.text;
      }
    });
    attrOrig.forEach(function(o){
      if (lang === 'es') {
        var key = norm(o.text);
        o.el.setAttribute(o.attr, EN_TO_ES[key] || o.text);
      } else {
        o.el.setAttribute(o.attr, o.text);
      }
    });
    document.documentElement.setAttribute('lang', lang);
  }

  function updateToggleUI(lang){
    document.querySelectorAll('.lang-toggle a[data-lang]').forEach(function(a){
      var on = a.getAttribute('data-lang') === lang;
      a.style.color = on ? '#fff' : 'rgba(255,255,255,.5)';
      a.style.fontWeight = on ? '700' : '400';
    });
  }

  function setLang(lang){
    if (lang !== 'es') lang = 'en';
    try { localStorage.setItem('cedp_lang', lang); } catch(_){}
    translateOnce(lang);
    updateToggleUI(lang);
  }

  function wireToggle(){
    document.querySelectorAll('.lang-toggle a[data-lang]').forEach(function(a){
      if (a.__wired) return; a.__wired = true;
      a.addEventListener('click', function(e){
        e.preventDefault();
        setLang(a.getAttribute('data-lang'));
      });
    });
  }

  function init(){
    var saved = 'en';
    try { saved = localStorage.getItem('cedp_lang') || 'en'; } catch(_){}
    wireToggle();
    setLang(saved);
  }

  // Run after nav/footer injection (which is synchronous above) and again
  // after a tick to catch late-rendered DOM.
  try { init(); } catch(e) { console.warn('i18n init failed', e); }
  setTimeout(function(){ try { collected = false; originals = []; attrOrig = []; wireToggle(); var s='en'; try{s=localStorage.getItem('cedp_lang')||'en';}catch(_){} setLang(s);} catch(_){} }, 400);
  setTimeout(function(){ try { collected = false; originals = []; attrOrig = []; wireToggle(); var s='en'; try{s=localStorage.getItem('cedp_lang')||'en';}catch(_){} setLang(s);} catch(_){} }, 1500);
})();
