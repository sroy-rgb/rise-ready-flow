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
      '<a class="btn-d" href="/#donateSection" target="_top">Donate</a><a class="btn-h '+act('/get-help').trim()+'" href="/get-help">Get help</a>'+
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
          '<a href="/get-help#eviction" target="_top">Eviction</a><a href="/get-help#foreclosure" target="_top">Foreclosure</a><a href="/get-help#towing" target="_top">Towing</a><a href="/get-help#debt" target="_top">Debt</a><a href="/our-work#programsGrid" target="_top">Disaster relief</a>'+
          '</div>'+
          '<div><h4>About</h4>'+
          '<a href="/about" target="_top">Our purpose</a><a href="/team" target="_top">Our team</a><a href="/about#leadership" target="_top">Leadership</a><a href="/careers" target="_top">Careers</a><a href="/careers#positions" target="_top">Join Us</a><a href="/ced-law" target="_top">CED Law</a><a href="mailto:info@cedproject.org">Contact</a>'+
          '</div>'+
          '<div><h4>Impact</h4>'+
          '<a href="/legislative-wins" target="_top">Legislative wins</a><a href="/research" target="_top">Research</a><a href="/news" target="_top">News &amp; press</a><a href="/about#faq" target="_top">FAQ</a><a href="/#donateSection" target="_top">Donate</a><a href="/news" target="_top">Events</a>'+
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

  // Footer: mark active link based on parent URL (handles iframe context)
  try {
    var parentLoc = (window.top && window.top.location) ? window.top.location : window.location;
    var pPath = (parentLoc.pathname || '/').replace(/\/$/, '') || '/';
    var pHash = parentLoc.hash || '';
    var current = pPath + pHash;
    document.querySelectorAll('footer a').forEach(function(a){
      var href = a.getAttribute('href') || '';
      if(!href || href === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      var normalized = href.replace(/\/$/, '') || '/';
      if(normalized === current || (pHash && href.indexOf(pHash) !== -1 && href.indexOf(pPath) !== -1)){
        a.classList.add('is-active');
      }
      a.addEventListener('click', function(){
        document.querySelectorAll('footer a.is-active').forEach(function(x){ x.classList.remove('is-active'); });
        a.classList.add('is-active');
      });
    });
  } catch(e) {}

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
  var DONATE_HASH = '#donateSection';
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

      // Donate / Give buttons -> homepage Support our mission section
      var isDonate = a.classList.contains('btn-d') || /\b(donate|donar|give)\b/.test(txt);
      if (isDonate) {
        var onHome = (location.pathname === '/' || /cedp-home\.html$/.test(location.pathname));
        var target = onHome ? DONATE_HASH : '/' + DONATE_HASH;
        if (href !== target) {
          a.setAttribute('href', target);
          a.setAttribute('target', '_top');
          a.removeAttribute('rel');
          href = target;
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

// ==================== Donate scroll handler (iframe-aware) ====================
(function(){
  function isDonateHref(h){
    if (!h) return false;
    return h === '#donateSection' || h === '/#donateSection'
      || /\/?#donateSection$/.test(h);
  }
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (!isDonateHref(href)) return;
    var el = document.getElementById('donateSection');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try { history.replaceState(null, '', '#donateSection'); } catch(_){}
      return;
    }
    // Not on home iframe — navigate top to home and remember to scroll
    e.preventDefault();
    try { (window.top || window).localStorage.setItem('cedp_scroll_donate', '1'); } catch(_){}
    try { (window.top || window).location.href = '/'; } catch(_){ location.href = '/'; }
  }, true);

  // On home iframe load, honor the deferred scroll request
  function maybeScrollDonate(){
    var el = document.getElementById('donateSection');
    if (!el) return;
    var flag = null;
    try { flag = (window.top || window).localStorage.getItem('cedp_scroll_donate'); } catch(_){}
    if (flag === '1') {
      try { (window.top || window).localStorage.removeItem('cedp_scroll_donate'); } catch(_){}
      setTimeout(function(){ el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 250);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', maybeScrollDonate);
  } else {
    maybeScrollDonate();
  }
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
    "Our teams are on the ground across Colorado right now — in courtrooms, communities, and the legislature.": "Nuestros equipos están trabajando en todo Colorado ahora mismo: en tribunales, comunidades y la legislatura.",
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

// === Massive translation additions ===
var ADD = {
  // Quotes & testimonials
  "\"I've never worked at a place where every single person — from the receptionist to the CEO — genuinely cares about the same mission.\"": "\"Nunca he trabajado en un lugar donde cada persona — desde la recepcionista hasta el CEO — se preocupe genuinamente por la misma misión.\"",
  "I had three days before I was on the street with my kids. CEDP's legal team stopped the eviction and helped me get rental assistance.": "Me quedaban tres días antes de estar en la calle con mis hijos. El equipo legal de CEDP detuvo el desalojo y me ayudó a obtener asistencia de alquiler.",
  "They towed my car from my own parking spot. CEDP got my car back and helped change the law so it won't happen to others.": "Remolcaron mi auto de mi propio espacio de estacionamiento. CEDP recuperó mi auto y ayudó a cambiar la ley para que no le pase a otros.",
  "After the Marshall Fire, CEDP was the first call we made. They helped us navigate insurance and find housing.": "Después del incendio de Marshall, CEDP fue la primera llamada que hicimos. Nos ayudaron a navegar el seguro y encontrar vivienda.",
  "— CEDP Team Member": "— Miembro del equipo de CEDP",
  "— Co-Founder & Co-CEO": "— Cofundador y co-director ejecutivo",

  // Donate / amounts
  "$ Other Amount": "$ Otra cantidad",
  "Custom amount": "Cantidad personalizada",
  "Donate Today →": "Donar hoy →",
  "Donate →": "Donar →",
  "Your $1,000 donation can keep a family housed for three months": "Su donación de $1,000 puede mantener a una familia con vivienda durante tres meses",
  "Your $1,000 donation can keep a family housed for three months. Every dollar goes directly to defending Colorado communities.": "Su donación de $1,000 puede mantener a una familia con vivienda durante tres meses. Cada dólar va directamente a defender a las comunidades de Colorado.",
  ". Every dollar goes directly to defending Colorado communities.": ". Cada dólar va directamente a defender a las comunidades de Colorado.",
  "Your donation funds free legal representation for families who can't afford a lawyer.": "Su donación financia representación legal gratuita para familias que no pueden pagar un abogado.",
  "Your gift helps Coloradans stay housed, protect their cars, and fight unfair debt collection. Every dollar lands directly with families in crisis.": "Su regalo ayuda a los habitantes de Colorado a mantener su vivienda, proteger sus autos y combatir el cobro injusto de deudas. Cada dólar llega directamente a las familias en crisis.",
  "Have questions? Read donor FAQs →": "¿Tiene preguntas? Lea las preguntas frecuentes para donantes →",
  "Tax deductibility, how funds are used, recurring gifts, and more.": "Deducibilidad de impuestos, uso de fondos, donaciones recurrentes y más.",
  "How your donation is used, tax deductibility, recurring gifts, and more": "Cómo se utiliza su donación, deducibilidad de impuestos, donaciones recurrentes y más",

  // Stats
  "$1M Wyatts Towing settlement": "Acuerdo de $1M con Wyatts Towing",
  "$280M+ in emergency assistance distributed": "Más de $280M en asistencia de emergencia distribuidos",
  "$840K federally funded mobile office bringing legal aid to rural communities": "Oficina móvil con fondos federales de $840K llevando ayuda legal a comunidades rurales",
  "$840K for Just Bus mobile aid": "$840K para la ayuda móvil Just Bus",
  "1,000+ Families Served": "1,000+ familias atendidas",
  "100+ professionals · 4 offices across Colorado": "100+ profesionales · 4 oficinas en Colorado",
  "12+ state laws passed · Cited by White House & HUD": "12+ leyes estatales aprobadas · Citadas por la Casa Blanca y HUD",
  "2 landmark laws · $1M settlement": "2 leyes históricas · acuerdo de $1M",
  "200 people. 68,000 families.": "200 personas. 68,000 familias.",
  "5 years": "5 años",
  "59 of 64 Colorado counties": "59 de los 64 condados de Colorado",
  "68,000+ Coloradans served · $280M+ distributed": "68,000+ habitantes de Colorado atendidos · más de $280M distribuidos",
  "68,000+ Coloradans served · 54 counties": "68,000+ habitantes de Colorado atendidos · 54 condados",
  "68,000+ served. $280M+ distributed. Fair Housing Unit established. $840K federal funding for Just Bus. Nearly 200 team members.": "68,000+ atendidos. Más de $280M distribuidos. Unidad de Vivienda Justa establecida. $840K en fondos federales para Just Bus. Casi 200 miembros del equipo.",
  "Coloradans served across 54 counties": "Habitantes de Colorado atendidos en 54 condados",
  "Colorado counties served": "Condados de Colorado atendidos",
  "Cases handled": "Casos manejados",
  "Cases in 2025": "Casos en 2025",
  "Defense across 59 counties": "Defensa en 59 condados",
  "Emergency assistance distributed": "Asistencia de emergencia distribuida",
  "Assistance distributed": "Asistencia distribuida",
  "Evictions prevented": "Desalojos prevenidos",
  "evictions prevented in 2025": "desalojos prevenidos en 2025",
  "Families defended": "Familias defendidas",
  "Families receive legal aid, financial assistance, and resource navigation every month": "Familias reciben ayuda legal, asistencia financiera y navegación de recursos cada mes",
  "homes saved": "hogares salvados",
  "appeals filed": "apelaciones presentadas",
  "debt collection cases defended": "casos de cobro de deudas defendidos",
  "vehicles recovered": "vehículos recuperados",
  "Laws changed": "Leyes cambiadas",
  "Low-income Coloradans served across 54 counties — from eviction defense to disaster relief": "Habitantes de Colorado de bajos ingresos atendidos en 54 condados — desde defensa contra desalojo hasta ayuda por desastre",
  "Monthly reach": "Alcance mensual",
  "Mission": "Misión",
  "team members": "miembros del equipo",
  "Team members": "Miembros del equipo",
  "Clients are BIPOC or Hispanic/Latino": "Los clientes son BIPOC o hispanos/latinos",
  "In emergency rental, mortgage, and financial assistance keeping families housed": "En asistencia de emergencia para alquiler, hipoteca y asistencia financiera para mantener a las familias con vivienda",
  "State laws passed to protect renters, stop predatory towing, and defend mobile home residents": "Leyes estatales aprobadas para proteger inquilinos, detener el remolque depredador y defender a los residentes de casas móviles",

  // Addresses & office info
  "1600 N. Downing St., Suite 600": "1600 N. Downing St., Suite 600",
  "Denver, CO": "Denver, CO",
  "Denver, CO 80218": "Denver, CO 80218",
  "Office": "Oficina",
  "Offices": "Oficinas",
  "Denver": "Denver",
  "Colorado Springs": "Colorado Springs",
  "Durango": "Durango",
  "Fort Morgan": "Fort Morgan",
  "Durango / Fort Morgan": "Durango / Fort Morgan",
  "Remote / Denver": "Remoto / Denver",
  "4 offices: Denver, Colorado Springs, Durango, Fort Morgan. Hybrid options available. Serve your own community.": "4 oficinas: Denver, Colorado Springs, Durango, Fort Morgan. Opciones híbridas disponibles. Sirva a su propia comunidad.",
  "We serve 59 of 64 Colorado counties from offices in Denver, Colorado Springs, Durango, and Fort Morgan.": "Atendemos 59 de los 64 condados de Colorado desde oficinas en Denver, Colorado Springs, Durango y Fort Morgan.",

  // Hours
  "Mon–Fri, 8:30 AM – 5:30 PM MT": "Lun–Vie, 8:30 AM – 5:30 PM MT",
  "Mon–Fri, 8:30am–5:30pm MT": "Lun–Vie, 8:30am–5:30pm MT",
  "— Mon–Fri, 8:30 AM – 5:30 PM MT": "— Lun–Vie, 8:30 AM – 5:30 PM MT",
  "Monday–Friday, 8:30 AM – 5:30 PM MT. After hours, submit an intake form online.": "Lunes a viernes, 8:30 AM – 5:30 PM MT. Fuera de horario, envíe un formulario de admisión en línea.",
  "CARE Center · Mon–Fri 8:30am–5:30pm MT": "Centro CARE · Lun–Vie 8:30am–5:30pm MT",
  "After hours or weekends": "Fuera de horario o fines de semana",
  "After hours →": "Fuera de horario →",
  "After hours? Submit intake online →": "¿Fuera de horario? Envíe la admisión en línea →",
  "During business hours": "Durante horario laboral",
  "This month": "Este mes",

  // Triage / get help
  "Facing a crisis? You're not alone.": "¿Enfrenta una crisis? No está solo.",
  "Facing eviction, foreclosure, towing, debt, or economic crisis? Start here for immediate support.": "¿Enfrenta desalojo, ejecución hipotecaria, remolque, deuda o crisis económica? Comience aquí para obtener apoyo inmediato.",
  "Select your situation": "Seleccione su situación",
  "Select your situation below. We'll show you exactly how we can help and the fastest way to reach us.": "Seleccione su situación a continuación. Le mostraremos exactamente cómo podemos ayudar y la forma más rápida de contactarnos.",
  "I'm facing eviction": "Estoy enfrentando un desalojo",
  "I'm facing eviction or at risk of being evicted": "Estoy enfrentando un desalojo o en riesgo de ser desalojado/a",
  "I'm facing foreclosure": "Estoy enfrentando una ejecución hipotecaria",
  "I'm facing foreclosure or at risk of losing my home": "Estoy enfrentando una ejecución hipotecaria o en riesgo de perder mi hogar",
  "I'm dealing with debt collection": "Estoy lidiando con cobro de deudas",
  "I'm dealing with debt collection or financial hardship": "Estoy lidiando con cobro de deudas o dificultades financieras",
  "I'm a homeowner or mobile homeowner seeking legal info": "Soy propietario de vivienda o casa móvil buscando información legal",
  "My car was towed or I'm dealing with a towing issue": "Mi auto fue remolcado o estoy lidiando con un problema de remolque",
  "I need help paying my utility bills": "Necesito ayuda para pagar mis facturas de servicios",
  "I need help with utility bills": "Necesito ayuda con las facturas de servicios",
  "I need help with a foreclosure": "Necesito ayuda con una ejecución hipotecaria",
  "I need other help or resources": "Necesito otra ayuda o recursos",
  "I need": "Necesito",
  "I Need Help": "Necesito ayuda",
  "I want to": "Quiero",
  "Car was towed": "Mi auto fue remolcado",
  "Collection": "Cobro",
  "Family": "Familia",
  "Apartment": "Apartamento",
  "Storm": "Tormenta",
  "Disaster": "Desastre",
  "Disaster Response": "Respuesta a desastres",
  "Triage": "Triaje",
  "Calendar": "Calendario",
  "Events &": "Eventos y",
  "Events & Calendar": "Eventos y calendario",
  "Have you received a formal notice?": "¿Ha recibido un aviso formal?",
  "How can we help you?": "¿Cómo podemos ayudarle?",
  "Find what you're looking for": "Encuentre lo que está buscando",
  "Find resources near me": "Encontrar recursos cerca de mí",
  "Get help with this →": "Obtener ayuda con esto →",
  "Get foreclosure help": "Obtener ayuda con ejecución hipotecaria",
  "Get utility assistance": "Obtener asistencia para servicios",
  "Call for debt help": "Llamar para ayuda con deudas",
  "Call for towing help": "Llamar para ayuda con remolque",
  "Call CARE Center Now": "Llamar al Centro CARE ahora",
  "Call Now: (303) 838-1200": "Llamar ahora: (303) 838-1200",
  "Call now: (303) 838-1200": "Llamar ahora: (303) 838-1200",
  "Call our CARE Center": "Llame a nuestro Centro CARE",
  "Call (303) 838-1200 for referrals to legal aid in your state.": "Llame al (303) 838-1200 para referencias a ayuda legal en su estado.",
  "Call the CARE Center directly. A navigator will assess your situation and connect you with the right support — legal, financial, or both.": "Llame directamente al Centro CARE. Un navegador evaluará su situación y lo conectará con el apoyo adecuado — legal, financiero o ambos.",
  "Call the CARE Center. A navigator will connect you with the right support.": "Llame al Centro CARE. Un navegador lo conectará con el apoyo adecuado.",
  "Need help? Call": "¿Necesita ayuda? Llame",
  "Connect with CARE Center instantly": "Conéctese con el Centro CARE al instante",
  "Connect with the CARE Center team instantly. Available during business hours.": "Conéctese al instante con el equipo del Centro CARE. Disponible durante horario laboral.",
  "Chat with us now": "Chatee con nosotros ahora",
  "Chat": "Chatear",
  "Live": "En vivo",
  "Live now": "En vivo ahora",
  "Submit Intake Form": "Enviar formulario de admisión",
  "Submit Intake →": "Enviar admisión →",
  "Submit intake form online": "Enviar formulario de admisión en línea",
  "Submit intake form →": "Enviar formulario de admisión →",
  "Submit online intake form →": "Enviar formulario de admisión en línea →",
  "Submit an online intake form and a team member will contact you on the next business day. For emergencies, dial 911.": "Envíe un formulario de admisión en línea y un miembro del equipo lo contactará el siguiente día hábil. Para emergencias, llame al 911.",
  "Submit an online intake form. A team member will contact you on the next business day.": "Envíe un formulario de admisión en línea. Un miembro del equipo lo contactará el siguiente día hábil.",
  "Start Intake": "Comenzar admisión",
  "Stand With Us": "Apóyenos",
  "Thank you. A team member will contact you within one business day.": "Gracias. Un miembro del equipo lo contactará en un día hábil.",
  "Tell us what's happening": "Cuéntenos qué está pasando",
  "What's happening?": "¿Qué está pasando?",
  "Brief description": "Descripción breve",
  "Full name": "Nombre completo",
  "Email": "Correo",
  "Your email address": "Su correo electrónico",
  "Your information is confidential. CEDP never charges fees.": "Su información es confidencial. CEDP nunca cobra honorarios.",
  "CEDP never charges fees.": "CEDP nunca cobra honorarios.",
  "Cars": "Autos",

  // Fraud / safety
  "CEDP will never...": "CEDP nunca...",
  "CEDP does not charge fees for assistance. All official communications come from @cedproject.org or @cedlaw.org. We do not use WhatsApp or personal email.": "CEDP no cobra honorarios por asistencia. Todas las comunicaciones oficiales provienen de @cedproject.org o @cedlaw.org. No usamos WhatsApp ni correo personal.",
  "Charge you fees": "Cobrarle honorarios",
  "Ask for bank details by email": "Pedir información bancaria por correo",
  "Ask for sensitive info by email": "Pedir información sensible por correo",
  "Contact you via WhatsApp": "Contactarlo por WhatsApp",
  "We will never request Social Security numbers, bank details, or payment information via email or text message.": "Nunca solicitaremos números de Seguro Social, información bancaria o información de pago por correo electrónico o mensaje de texto.",
  "We never request SSN, bank info, or payments via email or text.": "Nunca solicitamos SSN, información bancaria o pagos por correo o texto.",
  "All CEDP services — legal representation, financial assistance, navigation — are completely free. We will never ask for payment.": "Todos los servicios de CEDP — representación legal, asistencia financiera, navegación — son completamente gratuitos. Nunca pediremos pago.",
  "All services are 100% free — legal aid, financial assistance, everything.": "Todos los servicios son 100% gratuitos — ayuda legal, asistencia financiera, todo.",
  "Official communications come from @cedproject.org or @cedlaw.org email addresses only. Never personal email or messaging ap": "Las comunicaciones oficiales provienen solo de correos @cedproject.org o @cedlaw.org. Nunca de correo personal o aplicaciones de mensajería",

  // CED Law eligibility
  "A CED Law attorney can represent you at no cost.": "Un abogado de CED Law puede representarlo sin costo.",
  "CED Law currently serves Colorado residents only.": "CED Law actualmente atiende solo a residentes de Colorado.",
  "Never. All legal services are 100% free. CED Law is a nonprofit funded by donors, grants, and legal awards — never by clients.": "Nunca. Todos los servicios legales son 100% gratuitos. CED Law es una organización sin fines de lucro financiada por donantes, subvenciones y premios legales — nunca por los clientes.",
  "Yes. Bilingual services available. ¿Necesita ayuda en español? Llame al (303) 838-1200.": "Sí. Servicios bilingües disponibles. ¿Necesita ayuda en español? Llame al (303) 838-1200.",
  "If you're a Colorado resident facing eviction, foreclosure, towing, or debt collection, you likely qualify. Use our eligibility checker above or call us.": "Si es residente de Colorado y enfrenta desalojo, ejecución hipotecaria, remolque o cobro de deudas, probablemente califique. Use nuestro verificador de elegibilidad arriba o llámenos.",
  "If you've received an eviction notice or are behind on rent, call us immediately. Our housing lawyers provide free legal representation and can connect you with emergency rental assistance.": "Si ha recibido un aviso de desalojo o está atrasado en el alquiler, llámenos de inmediato. Nuestros abogados de vivienda proporcionan representación legal gratuita y pueden conectarlo con asistencia de emergencia para el alquiler.",
  "If you've received an eviction notice or are behind on rent, call us immediately. Our housing lawyers provide free legal representation and our team can connect you with emergency rental assistance.": "Si ha recibido un aviso de desalojo o está atrasado en el alquiler, llámenos de inmediato. Nuestros abogados de vivienda proporcionan representación legal gratuita y nuestro equipo puede conectarlo con asistencia de emergencia para el alquiler.",
  "Any paperwork you've received — eviction notices, court summons, towing receipts, debt collection letters, lease agreements, or anything from your landlord or lender.": "Cualquier documento que haya recibido — avisos de desalojo, citaciones judiciales, recibos de remolque, cartas de cobro de deudas, contratos de arrendamiento o cualquier cosa de su arrendador o prestamista.",
  "For urgent matters like active evictions, we prioritize same-day or next-day response. Less time-sensitive matters are typically reviewed within a week.": "Para asuntos urgentes como desalojos activos, priorizamos respuesta el mismo día o al siguiente. Los asuntos menos urgentes se revisan típicamente dentro de una semana.",
  "Yes. We can help with wrongful eviction claims, security deposit recovery, and rehousing support.": "Sí. Podemos ayudar con reclamos por desalojo injusto, recuperación de depósitos de seguridad y apoyo de reubicación.",
  "We offer free virtual legal information sessions covering property rights, mobile home evictions, the foreclosure process, and HOA issues. Learn about your rights as a homeowner.": "Ofrecemos sesiones virtuales gratuitas de información legal que cubren derechos de propiedad, desalojos de casas móviles, el proceso de ejecución hipotecaria y problemas con HOAs. Aprenda sobre sus derechos como propietario.",
  "Learn about my rights": "Aprender sobre mis derechos",
  "Check Eligibility ↓": "Verificar elegibilidad ↓",
  "Asked Questions": "preguntas",
  "Frequently": "Frecuentes",
  "Free legal aid, financial assistance, and resource navigation for eviction, foreclosure, towing, debt, and economic crisis.": "Ayuda legal gratuita, asistencia financiera y navegación de recursos para desalojo, ejecución hipotecaria, remolque, deuda y crisis económica.",
  "Free legal aid, financial assistance, and resource navigation. All services are free. Available in English and Spanish.": "Ayuda legal gratuita, asistencia financiera y navegación de recursos. Todos los servicios son gratuitos. Disponible en inglés y español.",
  "Free legal guidance to challenge unfair debt collection and find financial stability.": "Orientación legal gratuita para desafiar el cobro injusto de deudas y encontrar estabilidad financiera.",
  "Free legal representation and emergency rental assistance for tenants facing eviction.": "Representación legal gratuita y asistencia de emergencia para el alquiler para inquilinos que enfrentan desalojo.",
  "FREE LEGAL DEFENSE.": "DEFENSA LEGAL GRATUITA.",
  "BECAUSE JUSTICE SHOULDN'T HAVE A PRICE TAG.": "PORQUE LA JUSTICIA NO DEBERÍA TENER PRECIO.",
  "INJUSTICE DOESN'T WAIT.": "LA INJUSTICIA NO ESPERA.",
  "NEITHER DO WE.": "NOSOTROS TAMPOCO.",
  "EXPLORE OUR PROGRAMS": "EXPLORE NUESTROS PROGRAMAS",
  "Legal Defense": "Defensa legal",
  "Legal team": "Equipo legal",
  "Legal — CED Law": "Legal — CED Law",
  "Housing lawyers, economists, data analysts, policy experts, organizers, and technologists": "Abogados de vivienda, economistas, analistas de datos, expertos en políticas, organizadores y tecnólogos",
  "Housing lawyers provide free representation": "Los abogados de vivienda brindan representación gratuita",

  // Programs / model
  "A financial emergency room": "Una sala de emergencias financiera",
  "A financial emergency room for families in crisis": "Una sala de emergencias financiera para familias en crisis",
  "Based on client feedback, CEDP built a model that gives people facing crisis a single point of contact — integrating intake, navigation, rapid financial aid, legal defense, and rehousing support. A financial emergency room.": "Basado en los comentarios de los clientes, CEDP construyó un modelo que da a las personas que enfrentan crisis un único punto de contacto — integrando admisión, navegación, ayuda financiera rápida, defensa legal y apoyo de reubicación. Una sala de emergencias financiera.",
  "CEDP integrates legal defense, financial aid, and resource navigation into a single point of contact. We don't send people to five different offices. We meet them where they are.": "CEDP integra defensa legal, ayuda financiera y navegación de recursos en un único punto de contacto. No enviamos a las personas a cinco oficinas diferentes. Nos encontramos con ellos donde están.",
  "When someone comes to us in crisis, we don't send them to five different offices. We meet them where they are and stay with them through the solution.": "Cuando alguien llega a nosotros en crisis, no lo enviamos a cinco oficinas diferentes. Nos encontramos con ellos donde están y los acompañamos hasta la solución.",
  "When someone comes to us in crisis, we don't send them to five different offices. We meet them where they are.": "Cuando alguien llega a nosotros en crisis, no lo enviamos a cinco oficinas diferentes. Nos encontramos con ellos donde están.",
  "We integrate legal defense with financial aid and resource navigation — a single point of contact, not five different offices.": "Integramos defensa legal con ayuda financiera y navegación de recursos — un único punto de contacto, no cinco oficinas diferentes.",
  "We run a financial emergency room — integrating legal defense, financial aid, and resource navigation in a single point of contact.": "Operamos una sala de emergencias financiera — integrando defensa legal, ayuda financiera y navegación de recursos en un único punto de contacto.",
  "Single point of contact for all CEDP services. Call (303) 838-1200.": "Único punto de contacto para todos los servicios de CEDP. Llame al (303) 838-1200.",
  "Call Comes In": "Llamada entrante",
  "Client reaches CARE Center via phone, chat, or walk-in": "El cliente llega al Centro CARE por teléfono, chat o en persona",
  "Client reaches the CARE Center via phone, chat, or walk-in. A navigator assesses urgency and identifies all needs.": "El cliente llega al Centro CARE por teléfono, chat o en persona. Un navegador evalúa la urgencia e identifica todas las necesidades.",
  "Navigator assesses urgency and identifies all needs": "El navegador evalúa la urgencia e identifica todas las necesidades",
  "Navigator evaluates the situation and connects the client with the right combination of legal, financial, and navigation support.": "El navegador evalúa la situación y conecta al cliente con la combinación adecuada de apoyo legal, financiero y de navegación.",
  "Consultation": "Consulta",
  "Financial Aid": "Ayuda financiera",
  "Emergency rental assistance, utility payments, mortgage support, and other direct financial intervention.": "Asistencia de emergencia para alquiler, pagos de servicios, apoyo hipotecario y otra intervención financiera directa.",
  "Emergency rental, mortgage, or towing assistance": "Asistencia de emergencia para alquiler, hipoteca o remolque",
  "Emergency housing, financial navigation, and legal aid for disaster-affected families.": "Vivienda de emergencia, navegación financiera y ayuda legal para familias afectadas por desastres.",
  "Emergency rental assistance and free legal representation": "Asistencia de emergencia para alquiler y representación legal gratuita",
  "Connected to local resources and ongoing support": "Conectado con recursos locales y apoyo continuo",
  "Connected to local resources, ongoing case management, and community support for long-term stability.": "Conectado con recursos locales, gestión continua de casos y apoyo comunitario para estabilidad a largo plazo.",
  "Connection to local services — jobs, medical, childcare, food, transportation.": "Conexión con servicios locales — empleos, médicos, cuidado infantil, alimentos, transporte.",
  "Looking for community resources? Need help finding a job, medical services, childcare, food, or bus passes? We can connect you with local services.": "¿Busca recursos comunitarios? ¿Necesita ayuda para encontrar empleo, servicios médicos, cuidado infantil, alimentos o pases de autobús? Podemos conectarlo con servicios locales.",
  "Community support": "Apoyo comunitario",
  "Community outreach": "Alcance comunitario",
  "Community events, fundraisers, advocacy days, and volunteer opportunities": "Eventos comunitarios, recaudación de fondos, días de defensa y oportunidades de voluntariado",
  "Community events, fundraisers, advocacy days, and volunteer opportunities.": "Eventos comunitarios, recaudación de fondos, días de defensa y oportunidades de voluntariado.",
  "Community": "Comunidad",
  "Mobile legal aid bringing free services to rural and disaster-affected communities across Colorado. $840K federally funded.": "Ayuda legal móvil que lleva servicios gratuitos a comunidades rurales y afectadas por desastres en Colorado. Financiada federalmente con $840K.",
  "We partner with Energy Outreach Colorado to help eligible households with utility payments — electricity, natural gas, propane, oil, kerosene, coal, firewood, and pellets. Currently processing applications for Xcel Energy, Atmos Energy, Colorado Natural Gas, and Black Hills Energy.": "Nos asociamos con Energy Outreach Colorado para ayudar a hogares elegibles con pagos de servicios — electricidad, gas natural, propano, petróleo, queroseno, carbón, leña y pellets. Actualmente procesando solicitudes para Xcel Energy, Atmos Energy, Colorado Natural Gas y Black Hills Energy.",
  "We partner with Energy Outreach Colorado to help with electricity, natural gas, propane, and other utility payments.": "Nos asociamos con Energy Outreach Colorado para ayudar con electricidad, gas natural, propano y otros pagos de servicios.",
  "We partner with low-income and working people to build economic and racial equity. We do this by confronting economic abuse and investing in community wealth — using legal, economic, and advocacy tools to challenge unjust systems.": "Nos asociamos con personas de bajos ingresos y trabajadores para construir equidad económica y racial. Lo hacemos confrontando el abuso económico e invirtiendo en la riqueza comunitaria — utilizando herramientas legales, económicas y de defensa para desafiar sistemas injustos.",
  "We provide financial assistance and legal guidance for households at risk of or in the midst of a foreclosure.": "Brindamos asistencia financiera y orientación legal para hogares en riesgo o en medio de una ejecución hipotecaria.",
  "We provide financial assistance for households at risk of or in the midst of a foreclosure. Our team can help you understand your options and connect you with legal support.": "Brindamos asistencia financiera para hogares en riesgo o en medio de una ejecución hipotecaria. Nuestro equipo puede ayudarle a entender sus opciones y conectarlo con apoyo legal.",
  "We're here to help when things get tough — whether that's an eviction, foreclosure, or an unexpected tow. Free legal help and financial assistance for Colorado families.": "Estamos aquí para ayudar cuando las cosas se ponen difíciles — ya sea un desalojo, una ejecución hipotecaria o un remolque inesperado. Ayuda legal y asistencia financiera gratuita para familias de Colorado.",
  "Whether you're facing an eviction, foreclosure, or economic crisis — we provide free legal help and financial assistance.": "Ya sea que enfrente un desalojo, una ejecución hipotecaria o una crisis económica — brindamos ayuda legal y asistencia financiera gratuita.",
  "Whether you need help now or want to support our mission, there's a place for you here.": "Ya sea que necesite ayuda ahora o quiera apoyar nuestra misión, hay un lugar para usted aquí.",
  "Financial assistance and legal guidance for homeowners at risk of losing their home.": "Asistencia financiera y orientación legal para propietarios en riesgo de perder su hogar.",
  "Legal guidance and financial intervention for homeowners facing foreclosure.": "Orientación legal e intervención financiera para propietarios que enfrentan ejecución hipotecaria.",
  "Legal guidance against aggressive debt collectors": "Orientación legal contra cobradores de deudas agresivos",
  "Mortgage assistance and legal defense to protect homeowners": "Asistencia hipotecaria y defensa legal para proteger a los propietarios",
  "Eviction defense, foreclosure prevention, towing recovery across Colorado": "Defensa contra desalojo, prevención de ejecución hipotecaria, recuperación de vehículos en Colorado",
  "CED Law attorneys provide free legal representation — eviction defense, foreclosure prevention, towing recovery, debt collection.": "Los abogados de CED Law brindan representación legal gratuita — defensa contra desalojo, prevención de ejecución hipotecaria, recuperación de vehículos, cobro de deudas.",
  "Recover your vehicle and fight predatory towing": "Recupere su vehículo y combata el remolque depredador",
  "Vehicle recovery and consumer rights under Colorado's Towing Bill of Rights (HB22-1314).": "Recuperación de vehículos y derechos del consumidor bajo la Declaración de Derechos sobre Remolques de Colorado (HB22-1314).",
  "Vehicle recovery, consumer protection, and rights education under Colorado's Towing Bill of Rights.": "Recuperación de vehículos, protección al consumidor y educación sobre derechos bajo la Declaración de Derechos sobre Remolques de Colorado.",
  "Challenging unfair debt collection practices and protecting clients' financial stability.": "Desafiando prácticas injustas de cobro de deudas y protegiendo la estabilidad financiera de los clientes.",
  "Taking critical housing cases to higher courts to establish precedent and expand tenant protections.": "Llevando casos críticos de vivienda a tribunales superiores para establecer precedentes y ampliar las protecciones para inquilinos.",
  "Strategic cases targeting systemic abuses. Including the $1M Wyatts Towing AG settlement.": "Casos estratégicos dirigidos a abusos sistémicos. Incluyendo el acuerdo de $1M con Wyatts Towing del Fiscal General.",
  "Active legislation": "Legislación activa",

  // Page titles
  "About — Community Economic Defense Project": "Acerca de — Proyecto de Defensa Económica Comunitaria",
  "Careers — Community Economic Defense Project": "Empleos — Proyecto de Defensa Económica Comunitaria",
  "Get Help — CEDP": "Obtener ayuda — CEDP",
  "Get Help — Community Economic Defense Project": "Obtener ayuda — Proyecto de Defensa Económica Comunitaria",
  "Legislative Wins — Community Economic Defense Project": "Logros legislativos — Proyecto de Defensa Económica Comunitaria",
  "News & Press — Community Economic Defense Project": "Noticias y prensa — Proyecto de Defensa Económica Comunitaria",
  "Research — Community Economic Defense Project": "Investigación — Proyecto de Defensa Económica Comunitaria",
  "CED Law — Free Legal Defense for Coloradans": "CED Law — Defensa legal gratuita para los habitantes de Colorado",
  "CEDP Homepage — Font A/B Comparison": "Página principal de CEDP — Comparación de fuentes A/B",
  "CEDP Team": "Equipo de CEDP",
  "The CEDP": "El CEDP",
  "The CEDP Team": "El equipo de CEDP",
  "We Are CEDP": "Somos CEDP",
  "Welcome to CEDP": "Bienvenido a CEDP",
  "CEDP": "CEDP",
  "CEDP by the numbers": "CEDP en números",
  "CEDP / CED Law": "CEDP / CED Law",
  "CEDP / Census Bureau": "CEDP / Oficina del Censo",
  "CEDP / Medium": "CEDP / Medium",
  "CEDP + CED Law logos": "Logos de CEDP + CED Law",
  "A program of the Community Economic Defense Project": "Un programa del Proyecto de Defensa Económica Comunitaria",

  // History / origin
  "The beginning": "El comienzo",
  "Born from a": "Nacido de una",
  "Born from a Facebook post. Built into Colorado's economic defense.": "Nacido de una publicación de Facebook. Convertido en la defensa económica de Colorado.",
  "facebook post.": "publicación de facebook.",
  "Built into a": "Convertido en un",
  "Built into a movement.": "Convertido en un movimiento.",
  "movement.": "movimiento.",
  "From case to cause.": "De caso a causa.",
  "From client to law.": "De cliente a ley.",
  "From case to cause. From client to law.": "De caso a causa. De cliente a ley.",
  "change systems.": "cambiar sistemas.",
  "The stories that": "Las historias que",
  "The data behind": "Los datos detrás",
  "of impact": "de impacto",
  "Stories of impact": "Historias de impacto",
  "Story": "Historia",
  "Eviction prevented · $4,200 in rental assistance": "Desalojo prevenido · $4,200 en asistencia de alquiler",
  "Vehicle recovered · Contributed to HB24-1051": "Vehículo recuperado · Contribuyó a HB24-1051",
  "Marshall Fire response · Emergency housing": "Respuesta al incendio de Marshall · Vivienda de emergencia",
  "Founded as COVID-19 Eviction Defense Project. All-volunteer effort serves first clients facing pandemic evictions.": "Fundado como Proyecto de Defensa contra Desalojos por COVID-19. Esfuerzo totalmente voluntario atiende a los primeros clientes que enfrentan desalojos por la pandemia.",
  "Team grows to 50+. Serves 31,000 people and distributes $100 million in rental assistance during the pandemic.": "El equipo crece a más de 50. Atiende a 31,000 personas y distribuye $100 millones en asistencia de alquiler durante la pandemia.",
  "Launches foreclosure, debt collection, and disaster response programs. Expands to 54 counties. Team grows to 123.": "Lanza programas de ejecución hipotecaria, cobro de deudas y respuesta a desastres. Se expande a 54 condados. El equipo crece a 123.",
  "Five years of defending communities": "Cinco años defendiendo comunidades",
  "Since a Facebook post in March 2020, we've grown into one of the most comprehensive economic justice organizations in the country.": "Desde una publicación en Facebook en marzo de 2020, hemos crecido hasta convertirnos en una de las organizaciones de justicia económica más completas del país.",
  "In April 2020, two Colorado lawyers — Zach Neumann and Sam Gilman — posted on Facebook asking who needed help with eviction. Within weeks, thousands responded.": "En abril de 2020, dos abogados de Colorado — Zach Neumann y Sam Gilman — publicaron en Facebook preguntando quién necesitaba ayuda con desalojos. En semanas, miles respondieron.",
  "In April 2020, two lawyers asked on Facebook who needed help with eviction. Thousands responded. What started as a volunteer effort has grown into a team of 200 serving 68,000 people across 59 counties.": "En abril de 2020, dos abogados preguntaron en Facebook quién necesitaba ayuda con desalojos. Miles respondieron. Lo que comenzó como un esfuerzo voluntario se ha convertido en un equipo de 200 personas que atiende a 68,000 personas en 59 condados.",
  "What started as an all-volunteer community organizing effort during the pandemic has grown into a team of nearly 200 people serving 68,000 Coloradans across 59 counties, distributing more than $280 million in emergency assistance.": "Lo que comenzó como un esfuerzo totalmente voluntario de organización comunitaria durante la pandemia se ha convertido en un equipo de casi 200 personas que atiende a 68,000 habitantes de Colorado en 59 condados, distribuyendo más de $280 millones en asistencia de emergencia.",
  "Eviction and debt defense attorney. Nonresident fellow at the Urban Institute and lecturer in law and policy at the University of Colorado. In March 2020, his Facebook post offering free legal help received hundreds of responses overnight — the crystalizing moment that launched CEDP.": "Abogado de defensa contra desalojos y deudas. Becario no residente en el Urban Institute y profesor de derecho y política en la Universidad de Colorado. En marzo de 2020, su publicación en Facebook ofreciendo ayuda legal gratuita recibió cientos de respuestas durante la noche — el momento cristalizador que lanzó CEDP.",
  "Key Moments From Our History": "Momentos clave de nuestra historia",
  "CEDP was built by people who refused to accept that eviction was inevitable. That urgency is in everything we do.": "CEDP fue construido por personas que se negaron a aceptar que el desalojo era inevitable. Esa urgencia está en todo lo que hacemos.",
  "Co-Founder & Co-CEO": "Cofundador y co-director ejecutivo",

  // Careers
  "Work that": "Trabajo que",
  "Join the fight.": "Únete a la lucha.",
  "Join the team that turned a Facebook post into Colorado's most comprehensive economic defense organization. Every role here directly prevents homelessness.": "Únete al equipo que convirtió una publicación de Facebook en la organización de defensa económica más completa de Colorado. Cada puesto aquí previene directamente la falta de vivienda.",
  "View Open Positions →": "Ver posiciones abiertas →",
  "View Open Positions ↓": "Ver posiciones abiertas ↓",
  "Explore careers in housing law, advocacy, policy, data, and community organizing.": "Explora carreras en derecho de vivienda, defensa, política, datos y organización comunitaria.",
  "All positions are based in Colorado unless noted. Click any role for full details.": "Todas las posiciones están basadas en Colorado a menos que se indique. Haga clic en cualquier rol para ver los detalles completos.",
  "Current openings": "Vacantes actuales",
  "Animated": "Animado",
  "Static": "Estático",
  "Your work directly prevents eviction, defends families, and changes laws. Not metrics on a dashboard — real impact you can see.": "Su trabajo previene directamente desalojos, defiende familias y cambia leyes. No son métricas en un tablero — impacto real que puede ver.",
  "From 3 volunteers in 2020 to ~200 in 2024. A startup pace with nonprofit purpose. Build something that didn't exist before.": "De 3 voluntarios en 2020 a ~200 en 2024. Un ritmo de startup con propósito sin fines de lucro. Construya algo que no existía antes.",
  "We don't just serve clients — we pass laws. The Towing Bill of Rights, expanded renters' protections, and the $1M Wyatts settlement all started here.": "No solo servimos a clientes — aprobamos leyes. La Declaración de Derechos sobre Remolques, las protecciones ampliadas para inquilinos y el acuerdo de $1M con Wyatts comenzaron aquí.",
  "Apply": "Solicitar",
  "Submit your application via BambooHR": "Envíe su solicitud a través de BambooHR",
  "Phone Screen": "Entrevista telefónica",
  "30-minute conversation with HR": "Conversación de 30 minutos con Recursos Humanos",
  "Interview": "Entrevista",
  "Meet the team and discuss the role": "Conozca al equipo y discuta el rol",
  "Offer": "Oferta",
  "Don't see the right role?": "¿No ve la posición adecuada?",
  "Stay connected with our work": "Manténgase conectado con nuestro trabajo",
  "Stay": "Manténgase",
  "Subscribe →": "Suscribirse →",
  "Join Us →": "Únete →",

  // Benefits
  "Health & dental": "Salud y dental",
  "Comprehensive coverage for employees and dependents.": "Cobertura integral para empleados y dependientes.",
  "Employer-sponsored plan with organizational contribution.": "Plan patrocinado por el empleador con contribución organizacional.",
  "CEDP covers 90% of employee premiums and 75% of dependent premiums. Plans include medical, dental, and vision. Coverage starts on your first day — no waiting period. FSA and HSA options available.": "CEDP cubre el 90% de las primas de empleados y el 75% de las primas de dependientes. Los planes incluyen médico, dental y visión. La cobertura comienza el primer día — sin período de espera. Opciones FSA y HSA disponibles.",
  "Time off": "Tiempo libre",
  "15 days PTO in year one, increasing to 20 days by year three. Unlimited sick leave. 11 federal holidays plus a week-long office closure between Christmas and New Year's. Paid parental leave for all parents.": "15 días de PTO en el primer año, aumentando a 20 días para el tercer año. Licencia por enfermedad ilimitada. 11 días festivos federales más una semana de cierre de oficina entre Navidad y Año Nuevo. Licencia parental pagada para todos los padres.",
  "Coverage": "Cobertura",
  "Retirement": "Jubilación",
  "401(k) with 4% employer match starting day one. No vesting period — the match is yours immediately. Access to financial wellness workshops and one-on-one financial planning sessions.": "401(k) con aporte del 4% del empleador desde el primer día. Sin período de adquisición — el aporte es suyo de inmediato. Acceso a talleres de bienestar financiero y sesiones individuales de planificación financiera.",
  "Growth": "Crecimiento",
  "CLE credits, training budgets, conference attendance, and growth paths.": "Créditos CLE, presupuestos de capacitación, asistencia a conferencias y rutas de crecimiento.",
  "$2,000 annual professional development stipend per employee. Full CLE credit coverage for attorneys. Annual team retreats. Leadership development track for managers. Cross-department rotation opportunities.": "Estipendio anual de desarrollo profesional de $2,000 por empleado. Cobertura completa de créditos CLE para abogados. Retiros anuales del equipo. Ruta de desarrollo de liderazgo para gerentes. Oportunidades de rotación entre departamentos.",
  "Flexible work": "Trabajo flexible",
  "Flexible work arrangements depending on role and team.": "Acuerdos de trabajo flexible según el rol y el equipo.",
  "Most roles offer 2-3 days remote per week. Fully remote available for select positions. Home office stipend for equipment. Core collaboration hours 10am-3pm MT — flex outside that window.": "La mayoría de los roles ofrecen 2-3 días remotos por semana. Completamente remoto disponible para posiciones seleccionadas. Estipendio para oficina en casa para equipos. Horas centrales de colaboración de 10am-3pm MT — flexible fuera de esa ventana.",
  "Salaries reviewed annually using Colorado nonprofit compensation surveys. We publish salary ranges in all job postings. Pay equity audits conducted yearly. Signing bonuses available for hard-to-fill legal roles.": "Salarios revisados anualmente usando encuestas de compensación de organizaciones sin fines de lucro de Colorado. Publicamos rangos salariales en todas las ofertas de trabajo. Auditorías de equidad salarial realizadas anualmente. Bonos de contratación disponibles para roles legales difíciles de cubrir.",
  "Benchmarked annually against Colorado nonprofit and legal sector standards.": "Comparado anualmente con los estándares del sector legal y sin fines de lucro de Colorado.",
  "Mission-driven work": "Trabajo con propósito",
  "Unprecedented growth": "Crecimiento sin precedentes",
  "Rapid scale": "Escala rápida",
  "Colorado-based": "Con sede en Colorado",
  "Systemic change": "Cambio sistémico",

  // Culture
  "CED Law team meeting": "Reunión del equipo de CED Law",
  "Just Bus Mobile Legal Aid": "Ayuda legal móvil Just Bus",
  "Just Bus": "Just Bus",
  "CEDP bill signing": "Firma de proyecto de ley de CEDP",
  "CEDP bill signing ceremony": "Ceremonia de firma de proyecto de ley de CEDP",
  "CEDP renters rights workshop": "Taller de derechos de inquilinos de CEDP",
  "CED Law team meeting · Denver HQ": "Reunión del equipo de CED Law · Sede Denver",
  "Team strategy session · Denver HQ": "Sesión de estrategia del equipo · Sede Denver",
  "Leadership photos": "Fotos del liderazgo",
  "Leadership": "Liderazgo",
  "Funders": "Patrocinadores",
  "Funders &": "Patrocinadores y",
  "Partners": "Socios",
  "partners": "socios",
  "Recognized by": "Reconocido por",
  "Government": "Gobierno",
  "agencies": "agencias",
  "donors": "donantes",
  "media": "medios",
  "Stay connected with our work": "Manténgase conectado con nuestro trabajo",

  // Legislative
  "Changing the law to": "Cambiando la ley para",
  "protect communities": "proteger comunidades",
  "Client experiences inform legislation. From case to cause — CEDP changes the systems that create injustice. During 2024, all eight of our priority bills passed and became Colorado law.": "Las experiencias de los clientes informan la legislación. De caso a causa — CEDP cambia los sistemas que crean injusticia. Durante 2024, los ocho proyectos de ley prioritarios fueron aprobados y se convirtieron en ley de Colorado.",
  "Client experiences inform legislation. From case to cause — changing the systems that create injustice.": "Las experiencias de los clientes informan la legislación. De caso a causa — cambiando los sistemas que crean injusticia.",
  "Client experiences inform legislation to prevent future harm": "Las experiencias de los clientes informan la legislación para prevenir daños futuros",
  "Bills passed in 2024": "Leyes aprobadas en 2024",
  "Wyatts settlement": "Acuerdo con Wyatts",
  "Cost to clients": "Costo para clientes",
  "Explore Wins ↓": "Explorar logros ↓",
  "Landmark Wins": "Logros históricos",
  "All legislative wins": "Todos los logros legislativos",
  "By session year": "Por año de sesión",
  "Fact Sheet": "Hoja informativa",
  "Fact Sheet →": "Hoja informativa →",
  "Bill Text": "Texto del proyecto",
  "Bill Text →": "Texto del proyecto →",
  "View Full Details": "Ver detalles completos",
  "View Full Details →": "Ver detalles completos →",
  "View all legislative wins →": "Ver todos los logros legislativos →",
  "Legislative wins →": "Logros legislativos →",
  "View impact →": "Ver impacto →",
  "View our impact data →": "Ver nuestros datos de impacto →",
  "View Programs ↓": "Ver programas ↓",
  "Impact data": "Datos de impacto",
  "See our full impact →": "Ver nuestro impacto completo →",
  "See outcomes, explore investment opportunities, and support our mission.": "Vea los resultados, explore oportunidades de inversión y apoye nuestra misión.",
  "Click any bill to expand details. Arrow links to the full bill text on leg.colorado.gov.": "Haga clic en cualquier proyecto de ley para expandir los detalles. La flecha enlaza al texto completo del proyecto en leg.colorado.gov.",
  "What this law does:": "Lo que hace esta ley:",
  "Signed by Governor Jared Polis · April 2024": "Firmado por el gobernador Jared Polis · abril de 2024",
  "Signed into law April 2024. Protects thousands of tenants from unjust evictions, prevents racial and gender discrimination in housing, and creates long-term stability for renters and landlords alike.": "Convertido en ley en abril de 2024. Protege a miles de inquilinos de desalojos injustos, previene la discriminación racial y de género en la vivienda y crea estabilidad a largo plazo para inquilinos y arrendadores por igual.",
  "Signed into law May 2024. Ensures Colorado tenants can more easily use the Warranty of Habitability Law to address health and safety hazards. Sets repair timeframes, clarifies alternative lodging requirements, and establishes cooling protections in extreme heat.": "Convertido en ley en mayo de 2024. Garantiza que los inquilinos de Colorado puedan usar más fácilmente la Ley de Garantía de Habitabilidad para abordar peligros de salud y seguridad. Establece plazos de reparación, aclara los requisitos de alojamiento alternativo y establece protecciones de enfriamiento en calor extremo.",
  "Signed into law May 2024. Gives the PUC authority to revoke towing licenses, prohibits for-profit towing patrols on residential lots, requires written authorization for tows, and creates enforcement mechanisms for the AG.": "Convertido en ley en mayo de 2024. Otorga a la PUC autoridad para revocar licencias de remolque, prohíbe patrullas de remolque con fines de lucro en lotes residenciales, requiere autorización escrita para los remolques y crea mecanismos de aplicación para el Fiscal General.",
  "Signed into law · May 2024": "Convertido en ley · mayo de 2024",
  "Signed into law · May 2024 · Effective immediately": "Convertido en ley · mayo de 2024 · Vigente de inmediato",
  "Reduces the number of evictions in Colorado and protects against gentrification": "Reduce el número de desalojos en Colorado y protege contra la gentrificación",
  "Saves Colorado families money by keeping a roof over their heads": "Ahorra dinero a las familias de Colorado al mantener un techo sobre sus cabezas",
  "Creates long-term stability for both tenants and landlords": "Crea estabilidad a largo plazo tanto para inquilinos como para arrendadores",
  "Strengthened eviction protections including longer notice periods and right to cure": "Protecciones reforzadas contra desalojos, incluidos períodos de notificación más largos y derecho a subsanar",
  "For Cause Eviction": "Desalojo por causa",
  "For Cause Eviction bill signing": "Firma del proyecto de ley sobre desalojo por causa",
  "For Cause Eviction of a Tenant": "Desalojo por causa de un inquilino",
  "For Cause Eviction — Colorado's Landmark Tenant Protection": "Desalojo por causa — La protección histórica para inquilinos de Colorado",
  "Safe Housing bill signing": "Firma del proyecto de ley sobre vivienda segura",
  "Safe Housing for Residential Tenants": "Vivienda segura para inquilinos residenciales",
  "Expanded Renters' Rights": "Derechos ampliados para inquilinos",
  "Expanded Renters' Rights Legislation": "Legislación de derechos ampliados para inquilinos",
  "Expanded mandate": "Mandato ampliado",
  "Expanding into New Mexico in 2026.": "Expandiéndose a Nuevo México en 2026.",
  "Extending CEDP's model beyond Colorado for the first time": "Extendiendo el modelo de CEDP más allá de Colorado por primera vez",
  "Launching 2025": "Lanzamiento en 2025",
  "New Mexico Operations": "Operaciones en Nuevo México",
  "New expansion": "Nueva expansión",
  "National model": "Modelo nacional",
  "Towing Bill of Rights": "Declaración de Derechos sobre Remolques",
  "Towing Bill of Rights — Colorado's First Towing Consumer Protection": "Declaración de Derechos sobre Remolques — Primera protección al consumidor sobre remolques en Colorado",
  "Towing Carrier Regulation": "Regulación de empresas de remolque",
  "Towing Carrier Regulation — Ending Predatory Towing": "Regulación de empresas de remolque — Acabando con el remolque depredador",
  "Towing Reform & Fair Housing": "Reforma de remolques y vivienda justa",
  "Towing reform": "Reforma de remolques",
  "Towing industry investigation": "Investigación de la industria de remolques",
  "Towing": "Remolque",
  "Unjust": "Injusto",
  "Towing in Colorado is out of control. Over the past two years, our clients have had their vehicles repeatedly towed from the apartment complexes and mobile home parks where they live, often without warning or justification. This investigation led directly to the Towing Bill of Rights and HB24-1051.": "El remolque en Colorado está fuera de control. Durante los últimos dos años, nuestros clientes han tenido sus vehículos remolcados repetidamente de los complejos de apartamentos y parques de casas móviles donde viven, a menudo sin advertencia ni justificación. Esta investigación condujo directamente a la Declaración de Derechos sobre Remolques y a HB24-1051.",
  "Banned automatic tows, established Fair Housing Unit. Wyatts Towing settled for $1M.": "Prohibió los remolques automáticos, estableció la Unidad de Vivienda Justa. Wyatts Towing llegó a un acuerdo por $1M.",
  "First statewide towing consumer protection law in Colorado": "Primera ley estatal de protección al consumidor sobre remolques en Colorado",
  "Gives the PUC authority to revoke towing licenses for violations. Prohibits for-profit towing companies from patrolling residential lots. Requires written authorization for tows. Creates enforcement mechanisms for DAs and the AG.": "Otorga a la PUC autoridad para revocar licencias de remolque por violaciones. Prohíbe a las empresas de remolque con fines de lucro patrullar lotes residenciales. Requiere autorización escrita para los remolques. Crea mecanismos de aplicación para los fiscales de distrito y el Fiscal General.",
  "Gives the Public Utilities Commission (PUC) authority to revoke towing carrier licenses for specific violations": "Otorga a la Comisión de Servicios Públicos (PUC) autoridad para revocar licencias de empresas de remolque por violaciones específicas",
  "Requires landlords and property managers to direct tows in writing via a signed form": "Requiere que los arrendadores y administradores de propiedades dirijan los remolques por escrito mediante un formulario firmado",
  "Creates additional enforcement mechanisms for District Attorneys and the Colorado AG": "Crea mecanismos adicionales de aplicación para los fiscales de distrito y el Fiscal General de Colorado",
  "Addresses a growing problem CEDP encountered serving clients: Colorado's towing system needs reform. Investigations by the Colorado Attorney General's office found that one of the biggest towing companies in the state violated numerous regulations, including the Towing Bill of Rights — a CEDP priority bill passed in 2022.": "Aborda un problema creciente que CEDP encontró al servir a clientes: el sistema de remolques de Colorado necesita reforma. Las investigaciones de la oficina del Fiscal General de Colorado encontraron que una de las compañías de remolque más grandes del estado violó numerosas regulaciones, incluida la Declaración de Derechos sobre Remolques — un proyecto de ley prioritario de CEDP aprobado en 2022.",
  "CEDP's first major legislative achievement. Created Colorado's first consumer protections for people whose vehicles are towed. Established rights around notification, pricing transparency, and vehicle retrieval. This law became the foundation for the $1M Wyatts Towing settlement and subsequent HB24-1051 reforms.": "El primer gran logro legislativo de CEDP. Creó las primeras protecciones al consumidor de Colorado para personas cuyos vehículos son remolcados. Estableció derechos sobre notificación, transparencia de precios y recuperación de vehículos. Esta ley se convirtió en la base del acuerdo de $1M con Wyatts Towing y las reformas posteriores de HB24-1051.",
  "Ensures tenants can use the Warranty of Habitability Law to address health and safety hazards. Sets repair timeframes, clarifies alternative lodging, and establishes cooling protections in extreme heat.": "Garantiza que los inquilinos puedan usar la Ley de Garantía de Habitabilidad para abordar peligros de salud y seguridad. Establece plazos de reparación, aclara el alojamiento alternativo y establece protecciones de enfriamiento en calor extremo.",
  "Establishes policies allowing tenants to use appropriate cooling in extreme heat": "Establece políticas que permiten a los inquilinos usar enfriamiento apropiado en calor extremo",
  "Sets reasonable notice requirements so tenants don't need an attorney to ask for repairs": "Establece requisitos razonables de notificación para que los inquilinos no necesiten un abogado para solicitar reparaciones",
  "Sets presumptive timeframes for completing repairs with flexibility for landlords": "Establece plazos presuntivos para completar reparaciones con flexibilidad para los arrendadores",
  "Clarifies when landlords must provide alternative lodging during repairs": "Aclara cuándo los arrendadores deben proporcionar alojamiento alternativo durante las reparaciones",
  "HOA Foreclosure Protections": "Protecciones contra ejecuciones hipotecarias de HOA",
  "Requires HOAs to exhaust all options before initiating foreclosure. Limits homeowner liability for attorney's fees. Introduces right of redemption allowing homeowners or nonprofits to purchase at auction price — keeping community wealth in the community.": "Requiere que las HOAs agoten todas las opciones antes de iniciar una ejecución hipotecaria. Limita la responsabilidad del propietario por honorarios de abogados. Introduce el derecho de redención que permite a propietarios u organizaciones sin fines de lucro comprar al precio de subasta — manteniendo la riqueza comunitaria en la comunidad.",
  "Metro District Foreclosure Protections": "Protecciones contra ejecuciones hipotecarias del distrito metropolitano",
  "Companion bill to HB24-1337. Requires covenant-enforcing metro districts to adopt written policies on fines and fees. Prevents metro districts from initiating foreclosures based on unpaid charges.": "Proyecto de ley acompañante de HB24-1337. Requiere que los distritos metropolitanos que hacen cumplir convenios adopten políticas escritas sobre multas y honorarios. Evita que los distritos metropolitanos inicien ejecuciones hipotecarias basadas en cargos no pagados.",
  "Advocating for expanded renter protections and disaster preparedness": "Abogando por protecciones ampliadas para inquilinos y preparación para desastres",
  "2026 Legislative Session": "Sesión legislativa de 2026",
  "Sponsors: House Majority Leader Monica Duran, Rep. Javier Mabrey, Sens. Julie Gonzales and Nick Hinrichsen": "Patrocinadores: la líder de la mayoría de la Cámara Monica Duran, el representante Javier Mabrey, los senadores Julie Gonzales y Nick Hinrichsen",
  "Sponsors: Reps. Andrew Boesenecker and Tisha Mauro; Sens. Julie Gonzalez and Kevin Priola": "Patrocinadores: los representantes Andrew Boesenecker y Tisha Mauro; los senadores Julie Gonzalez y Kevin Priola",
  "Sponsors: Sens. Julie Gonzales and Tony Exum; Reps. Mandy Lindsay and Meg Froelich": "Patrocinadores: los senadores Julie Gonzales y Tony Exum; los representantes Mandy Lindsay y Meg Froelich",
  "Governor Jared Polis signed House Majority Leader Monica Duran, Rep. Javier Mabrey, and Sens. Julie Gonzales and Nick Hinrichsen's For Cause Eviction legislation into law in April 2024. This legislation protects thousands of Colorado tenants who face unjust evictions and helps stabilize more households in their communities.": "El gobernador Jared Polis convirtió en ley en abril de 2024 la legislación de Desalojo por Causa de la líder de la mayoría de la Cámara Monica Duran, el representante Javier Mabrey y los senadores Julie Gonzales y Nick Hinrichsen. Esta legislación protege a miles de inquilinos de Colorado que enfrentan desalojos injustos y ayuda a estabilizar a más hogares en sus comunidades.",
  "Sponsored by Sens. Julie Gonzales and Tony Exum, along with Reps. Mandy Lindsay and Meg Froelich, SB24-094 ensures Colorado tenants can more easily use the state's Warranty of Habitability Law to address health and safety hazards in their housing.": "Patrocinado por los senadores Julie Gonzales y Tony Exum, junto con los representantes Mandy Lindsay y Meg Froelich, SB24-094 garantiza que los inquilinos de Colorado puedan usar más fácilmente la Ley de Garantía de Habitabilidad del estado para abordar peligros de salud y seguridad en sus viviendas.",
  "CEDP contributed to multiple pieces of legislation expanding protections for Colorado renters during the 2023 session. Details to be populated from CEDP's legislative archive.": "CEDP contribuyó a múltiples piezas de legislación que ampliaron las protecciones para los inquilinos de Colorado durante la sesión de 2023. Los detalles se completarán a partir del archivo legislativo de CEDP.",
  "In a landmark 4-2 decision, the Colorado Supreme Court ruled that tenants have the right to a jury trial in eviction cases — a victory CEDP and CED Law attorneys fought for through appellate litigation.": "En una decisión histórica de 4-2, la Corte Suprema de Colorado dictaminó que los inquilinos tienen derecho a un juicio con jurado en casos de desalojo — una victoria por la que los abogados de CEDP y CED Law lucharon a través de litigios de apelación.",
  "Federal Eviction Moratorium": "Moratoria federal sobre desalojos",
  "CEDP research underpinned the federal moratorium and the $46 billion national investment in emergency rental assistance": "La investigación de CEDP sustentó la moratoria federal y la inversión nacional de $46 mil millones en asistencia de emergencia para alquiler",
  "Mass evictions during the pandemic have profound economic ramifications that substantially affect interstate commerce.": "Los desalojos masivos durante la pandemia tienen profundas ramificaciones económicas que afectan sustancialmente al comercio interestatal.",
  "Amicus Brief: Terkel v. CDC": "Escrito amicus: Terkel v. CDC",
  "Colorado Supreme Court ruling": "Fallo de la Corte Suprema de Colorado",
  "Colorado justices rule tenants have right to a jury trial in eviction cases": "Los jueces de Colorado dictaminan que los inquilinos tienen derecho a un juicio con jurado en casos de desalojo",
  "Colorado's mobile home crisis: Rising rent, contaminated water, sewage leaks": "La crisis de las casas móviles de Colorado: alquileres en aumento, agua contaminada, fugas de aguas residuales",
  "Colorado's Towing Crisis: The Human Cost": "La crisis de los remolques en Colorado: el costo humano",
  "Affluent Denver suburb accused of bullying disabled homeless guests": "Suburbio acomodado de Denver acusado de acosar a huéspedes sin hogar con discapacidades",
  "Crow secures $840K for mobile eviction aid bus": "Crow asegura $840K para el autobús móvil de ayuda contra desalojos",
  "Denver eviction cases are up 80 percent compared to pre-pandemic": "Los casos de desalojo en Denver han aumentado un 80 por ciento en comparación con la prepandemia",
  "Eviction filings in Denver continue increasing, worrying organizations": "Las presentaciones de desalojo en Denver continúan aumentando, preocupando a las organizaciones",
  "Inside Colorado's Private Property Towing Industry": "Dentro de la industria de remolques de propiedad privada de Colorado",
  "Inside Colorado's private property towing industry": "Dentro de la industria de remolques de propiedad privada de Colorado",
  "Motel sues Greenwood Village over ability to rent rooms to homeless people": "Motel demanda a Greenwood Village por la capacidad de alquilar habitaciones a personas sin hogar",
  "How predatory towing pushes families into eviction. The investigation that sparked the Towing Bill of Rights.": "Cómo el remolque depredador empuja a las familias al desalojo. La investigación que dio origen a la Declaración de Derechos sobre Remolques.",

  // News & Press
  "CEDP in the news": "CEDP en las noticias",
  "In the news": "En las noticias",
  "Read Coverage": "Leer cobertura",
  "Selected stories featuring CEDP staff, clients, leadership, and legislative impact.": "Historias seleccionadas con personal, clientes, liderazgo e impacto legislativo de CEDP.",
  "All coverage": "Toda la cobertura",
  "For media": "Para medios",
  "Press resources": "Recursos de prensa",
  "Logo Pack": "Paquete de logos",
  "Headshots": "Fotos de perfil",
  "Media Contact": "Contacto de prensa",
  "Access impact data, leadership contacts, press materials, and media resources.": "Acceda a datos de impacto, contactos de liderazgo, materiales de prensa y recursos para medios.",
  "For interview requests, data inquiries, and media questions": "Para solicitudes de entrevistas, consultas de datos y preguntas de medios",
  "Refer clients, learn about our services, and find the right point of contact.": "Refiera clientes, conozca nuestros servicios y encuentre el punto de contacto correcto.",
  "The CEDP Dispatch": "El Despacho de CEDP",
  "Dispatch": "Despacho",
  "Monthly updates on housing policy, legislative wins, client stories, and how you can help defend communities.": "Actualizaciones mensuales sobre política de vivienda, logros legislativos, historias de clientes y cómo puede ayudar a defender comunidades.",
  "Join 5,000+ subscribers. Unsubscribe anytime.": "Únase a más de 5,000 suscriptores. Cancele en cualquier momento.",
  "Join 5,000+ subscribers. Unsubscribe anytime. Powered by Substack.": "Únase a más de 5,000 suscriptores. Cancele en cualquier momento. Desarrollado por Substack.",
  "The stories that change systems.": "Las historias que cambian sistemas.",
  "Related:": "Relacionado:",
  "Aug 2024": "Ago 2024",
  "Sep 2024": "Sep 2024",
  "October 2024": "Octubre de 2024",
  "Subscribe": "Suscribirse",

  // Research
  "Research & Publications": "Investigación y publicaciones",
  "The data behind the fight": "Los datos detrás de la lucha",
  "Analysis from CEDP leadership on eviction, towing, housing policy, and economic justice.": "Análisis del liderazgo de CEDP sobre desalojo, remolque, política de vivienda y justicia económica.",
  "Analysis from CEDP leadership on eviction, towing, housing policy, and economic justice. Our research informs legislation and has been cited by the White House, Urban Institute, and Aspen Institute.": "Análisis del liderazgo de CEDP sobre desalojo, remolque, política de vivienda y justicia económica. Nuestra investigación informa la legislación y ha sido citada por la Casa Blanca, el Urban Institute y el Aspen Institute.",
  "Featured Investigation": "Investigación destacada",
  "All publications": "Todas las publicaciones",
  "Read on Medium": "Leer en Medium",
  "Our research has been cited by": "Nuestra investigación ha sido citada por",
  "Cited as a national best practice by the White House, HUD, and the Urban Institute": "Citado como mejor práctica nacional por la Casa Blanca, HUD y el Urban Institute",
  "Best Practices": "Mejores prácticas",
  "Investigation": "Investigación",
  "Amicus Brief": "Escrito amicus",
  "Data Analysis": "Análisis de datos",
  "Data Report": "Informe de datos",
  "Census Bureau states nearly 1 in 6 tenants are behind on rent. CEDP tabulations and analysis.": "La Oficina del Censo afirma que casi 1 de cada 6 inquilinos está atrasado en el alquiler. Tabulaciones y análisis de CEDP.",
  "Design and administration guidance for rental assistance programs. For states, localities, and nonprofit partners.": "Orientación sobre diseño y administración para programas de asistencia de alquiler. Para estados, localidades y socios sin fines de lucro.",
  "Early September Eviction Risk and Rental Aid Uptake": "Riesgo de desalojo a principios de septiembre y aceptación de ayuda para el alquiler",
  "Emerging Best Practices for COVID-19 Emergency Rental Assistance": "Mejores prácticas emergentes para la asistencia de emergencia para alquiler por COVID-19",
  "Estimated Number of Renters Behind on Rent in Colorado": "Número estimado de inquilinos atrasados en el alquiler en Colorado",
  "Eviction risk by Metropolitan Statistical Area. Directional methodology to localize risk for decision makers.": "Riesgo de desalojo por área estadística metropolitana. Metodología direccional para localizar el riesgo para los tomadores de decisiones.",
  "Four Options to Support Vulnerable Renters": "Cuatro opciones para apoyar a inquilinos vulnerables",
  "HH Pulse Data: Debt & Housing Insecurity": "Datos del HH Pulse: deuda e inseguridad habitacional",
  "How universal rental assistance should be administered as emergency measures end. Four potential options analyzed.": "Cómo se debe administrar la asistencia universal para el alquiler a medida que terminan las medidas de emergencia. Se analizan cuatro opciones potenciales.",
  "Renters behind on rent struggle to access rental assistance. Weekly eviction risk tracking data.": "Los inquilinos atrasados en el alquiler luchan por acceder a la asistencia de alquiler. Datos semanales de seguimiento del riesgo de desalojo.",
  "Support Our Research →": "Apoye nuestra investigación →",
  "Support Our Work →": "Apoye nuestro trabajo →",
  "Support our mission": "Apoye nuestra misión",

  // Team / Titles
  "Lawyers, navigators, economists, advocates, and policy experts — united in our shared passion to defend communities against economic injustice. Meet the faces behind the work.": "Abogados, navegadores, economistas, defensores y expertos en políticas — unidos en nuestra pasión compartida por defender comunidades contra la injusticia económica. Conozca los rostros detrás del trabajo.",
  "The people behind the mission": "Las personas detrás de la misión",
  "Want to be part": "Quiere ser parte",
  "of this team?": "de este equipo?",
  "Appellate Attorney": "Abogado de apelaciones",
  "Appellate Program Supervisor": "Supervisor del programa de apelaciones",
  "Appellate Supervisor": "Supervisor de apelaciones",
  "Bilingual Intake Specialist": "Especialista bilingüe de admisión",
  "CARE Agent": "Agente CARE",
  "CARE Center Agent": "Agente del Centro CARE",
  "CARE Center Navigator": "Navegador del Centro CARE",
  "Case Manager": "Gestor de casos",
  "Case Manager — Bilingual": "Gestor de casos — Bilingüe",
  "Compliance Specialist": "Especialista en cumplimiento",
  "Data & Impact Analyst": "Analista de datos e impacto",
  "Equal Justice Fellow": "Becario de Igualdad de Justicia",
  "Equal Justice Works Fellow": "Becario de Equal Justice Works",
  "Housing Attorney": "Abogado de vivienda",
  "Just Bus Field Navigator": "Navegador de campo de Just Bus",
  "SVP, Housing Stability": "Vicepresidente sénior, Estabilidad de vivienda",
  "SVP, Housing Stability Programs": "Vicepresidente sénior, Programas de estabilidad de vivienda",
  "Senior Supervisor, Community Services": "Supervisor sénior, Servicios comunitarios",
  "Sr. Supervisor": "Supervisor sénior",
  "Temporary Case Manager": "Gestor de casos temporal",
  "Tenant Advocate": "Defensor de inquilinos",
  "Confront": "Confrontar",
  "Defense": "Defensa",
  "Informed": "Informado",
  "Coverage": "Cobertura",
  "Documents": "Documentos",
  "Economic": "Económico",
  "Relief": "Ayuda",
  "Where we're working": "Dónde trabajamos",
  "How to access": "Cómo acceder",
  "Click any program to learn more and access help.": "Haga clic en cualquier programa para obtener más información y acceder a la ayuda.",
  "Explore our model, research, policy work, and programmatic impact data.": "Explore nuestro modelo, investigación, trabajo de políticas y datos de impacto programático.",

  // CTAs/labels
  "What we do →": "Lo que hacemos →",
  "How we work →": "Cómo trabajamos →",
  "Learn more about CEDP →": "Conozca más sobre CEDP →",
  "Contact us": "Contáctenos",
  "Get involved": "Involúcrese",
  "Close menu": "Cerrar menú",
  "Close": "Cerrar",
  "Yes": "Sí",
  "Toque aquí para español": "Toque aquí para español",
  "Cambie a Español": "Cambie a Español",
  "MODEL": "MODELO",
  "FAMILIES": "FAMILIAS",
  "SERVED": "ATENDIDOS",
  "ing": "ando",
  "ing eviction": "desalojo",
  "injustice": "injusticia",
  "help now": "ayuda ahora",
  "today": "hoy",
  "the fight.": "la lucha.",
  "face this alone": "enfrentar esto solo",
  "You don't have to": "No tiene que",
  "You don't have to face this alone.": "No tiene que enfrentar esto solo.",
  "© 2026 Community Economic Defense Project": "© 2026 Proyecto de Defensa Económica Comunitaria",
  "info@cedproject.org": "info@cedproject.org",
  "press@cedproject.org": "press@cedproject.org"
};
Object.keys(ADD).forEach(function(k){ EN_TO_ES[norm(k)] = ADD[k]; });
EN_TO_ES[norm("Watch: The CEDP Story")] = "Ver: La historia de CEDP";

// === Giant text-link / CTA explicit overrides (ensure every casing is covered) ===
var GIANT = {
  "Get help now": "Obtener ayuda ahora",
  "Get Help Now": "Obtener ayuda ahora",
  "GET HELP NOW": "Obtener ayuda ahora",
  "Our programs": "Nuestros programas",
  "Our Programs": "Nuestros programas",
  "OUR PROGRAMS": "Nuestros programas",
  "Explore our programs": "Explore nuestros programas",
  "EXPLORE OUR PROGRAMS": "Explore nuestros programas",
  "Policymakers": "Formuladores de políticas",
  "POLICYMAKERS": "Formuladores de políticas",
  "About CEDP": "Acerca de CEDP",
  "ABOUT CEDP": "Acerca de CEDP",
  "Meet CED Law": "Conozca CED Law",
  "MEET CED LAW": "Conozca CED Law",
  "Meet the team": "Conozca el equipo",
  "MEET THE TEAM": "Conozca el equipo",
  "Legislative wins": "Logros legislativos",
  "Legislative Wins": "Logros legislativos",
  "LEGISLATIVE WINS": "Logros legislativos",
  "Research": "Investigación",
  "RESEARCH": "Investigación",
  "View careers": "Ver empleos",
  "View Careers": "Ver empleos",
  "VIEW CAREERS": "Ver empleos",
  "Support Our Work": "Apoya nuestro trabajo",
  "Support our work": "Apoya nuestro trabajo",
  "SUPPORT OUR WORK": "Apoya nuestro trabajo",
  "Support Our Work →": "Apoya nuestro trabajo →",
  "Support Our Research →": "Apoya nuestra investigación →",
  "Donate today": "Donar hoy",
  "Donate Today": "Donar hoy",
  "DONATE TODAY": "Donar hoy",
  "Donate Today →": "Donar hoy →",
  "View open positions": "Ver posiciones abiertas",
  "View Open Positions": "Ver posiciones abiertas",
  "VIEW OPEN POSITIONS": "Ver posiciones abiertas",
  "View Open Positions ↓": "Ver posiciones abiertas ↓",
  "View Open Positions →": "Ver posiciones abiertas →"
};
Object.keys(GIANT).forEach(function(k){ EN_TO_ES[norm(k)] = GIANT[k]; });


  var originals = []; // {node, text} for text nodes
  var attrOrig = []; // {el, attr, text}
  var collected = false;
  var isTranslating = false;

  function collect(){
    if (collected) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = (p.nodeName||'').toLowerCase();
        if (tag==='script' || tag==='style' || tag==='noscript') return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('.lang-toggle')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      if (!n.__cedpOriginalText) n.__cedpOriginalText = n.nodeValue;
      originals.push({node:n, text:n.__cedpOriginalText});
    }
    // attribute-bearing elements
    document.querySelectorAll('[placeholder],[alt],[title],[aria-label]').forEach(function(el){
      ['placeholder','alt','title','aria-label'].forEach(function(a){
        if (el.hasAttribute(a)) {
          if (!el.__cedpAttrOriginals) el.__cedpAttrOriginals = {};
          if (!el.__cedpAttrOriginals[a]) el.__cedpAttrOriginals[a] = el.getAttribute(a);
          attrOrig.push({el:el, attr:a, text:el.__cedpAttrOriginals[a]});
        }
      });
    });
    collected = true;
  }

  function translateTextPreservingDecor(text){
    var direct = EN_TO_ES[norm(text)];
    if (direct) return direct;
    var trimmed = text.replace(/\s+/g,' ').trim();
    var leading = trimmed.match(/^([^A-Za-zÁÉÍÓÚáéíóúÑñ¿¡]*)([\s\S]*)$/);
    var prefix = leading ? leading[1] : '';
    var rest = leading ? leading[2] : trimmed;
    var trailing = rest.match(/^([\s\S]*?)([^A-Za-zÁÉÍÓÚáéíóúÑñ?.!)]*)$/);
    var core = trailing ? trailing[1].trim() : rest.trim();
    var suffix = trailing ? trailing[2] : '';
    var translated = EN_TO_ES[norm(core)];
    return translated ? prefix + translated + suffix : null;
  }

  function translateOnce(lang){
    isTranslating = true;
    try {
      collect();
      originals.forEach(function(o){
        if (lang === 'es') {
          var translated = translateTextPreservingDecor(o.text);
          if (translated) {
            // preserve leading/trailing whitespace
            var m = o.text.match(/^(\s*)([\s\S]*?)(\s*)$/);
            var nextText = (m?m[1]:'') + translated + (m?m[3]:'');
            if (o.node.nodeValue !== nextText) o.node.nodeValue = nextText;
          } else if (o.node.nodeValue !== o.text) {
            o.node.nodeValue = o.text;
          }
        } else {
          if (o.node.nodeValue !== o.text) o.node.nodeValue = o.text;
        }
      });
      attrOrig.forEach(function(o){
        var nextAttr = lang === 'es' ? (translateTextPreservingDecor(o.text) || o.text) : o.text;
        if (o.el.getAttribute(o.attr) !== nextAttr) o.el.setAttribute(o.attr, nextAttr);
      });
      document.documentElement.setAttribute('lang', lang);
    } finally {
      isTranslating = false;
    }
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

  function rerunTranslations(){
    try {
      collected = false; originals = []; attrOrig = [];
      wireToggle();
      var s='en'; try{s=localStorage.getItem('cedp_lang')||'en';}catch(_){}
      setLang(s);
    } catch(_) {}
  }

  // Run after nav/footer injection (which is synchronous above) and again
  // after a tick to catch late-rendered DOM.
  try { init(); } catch(e) { console.warn('i18n init failed', e); }
  setTimeout(rerunTranslations, 400);
  setTimeout(rerunTranslations, 1500);
  setTimeout(rerunTranslations, 3500);
  try {
    var i18nTimer = null;
    new MutationObserver(function(){
      if (isTranslating) return;
      clearTimeout(i18nTimer);
      i18nTimer = setTimeout(rerunTranslations, 80);
    }).observe(document.body, { childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:['placeholder','alt','title','aria-label'] });
  } catch(_) {}
})();

// ---- Lucide icon system (loaded from CDN, rendered into [data-lucide]) ----
(function(){
  try {
    // Inject base icon styling once
    if (!document.getElementById('cedp-lucide-css')) {
      var st = document.createElement('style');
      st.id = 'cedp-lucide-css';
      st.textContent = [
        '[data-lucide]{display:inline-flex;vertical-align:middle;line-height:0}',
        '.icon-inline{width:20px;height:20px;stroke-width:1.5;vertical-align:middle;margin-right:6px;opacity:.6}',
        '.icon-card{width:28px;height:28px;stroke-width:1.5;color:var(--gold,#E8B960);margin-bottom:12px;display:block}',
        '.icon-hero{width:48px;height:48px;stroke-width:1.25;color:var(--red,#C53030);margin-bottom:16px;display:block}',
        '.wc-icon [data-lucide], .wc-icon svg{width:36px;height:36px;stroke-width:1.5;color:var(--gold,#E8B960)}',
        '.m-fraud-icon [data-lucide], .m-fraud-icon svg{width:18px;height:18px;stroke-width:1.5;color:var(--red,#C53030)}',
        '.fraud-txt [data-lucide]{width:16px;height:16px;stroke-width:1.5;color:var(--red,#C53030);margin-right:4px}',
        'h3 [data-lucide]{width:18px;height:18px;stroke-width:1.5;margin-right:6px;opacity:.7}',
        'svg.lucide{stroke-width:1.5}'
      ].join('\n');
      document.head.appendChild(st);
    }
    function render(){
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        try { window.lucide.createIcons(); } catch(_) {}
      }
    }
    function loadLucide(cb){
      if (window.lucide) return cb();
      if (document.getElementById('cedp-lucide-js')) {
        var t = setInterval(function(){ if (window.lucide){ clearInterval(t); cb(); } }, 50);
        return;
      }
      var s = document.createElement('script');
      s.id = 'cedp-lucide-js';
      s.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
      s.async = true;
      s.onload = cb;
      document.head.appendChild(s);
    }
    function start(){
      loadLucide(function(){
        render();
        // Re-render on DOM mutations (i18n / dynamic content)
        try {
          var mo = new MutationObserver(function(muts){
            for (var i=0;i<muts.length;i++){
              var m = muts[i];
              for (var j=0;j<m.addedNodes.length;j++){
                var n = m.addedNodes[j];
                if (n.nodeType===1 && (n.matches && n.matches('[data-lucide]') || n.querySelector && n.querySelector('[data-lucide]'))){
                  render(); return;
                }
              }
            }
          });
          mo.observe(document.body, {childList:true, subtree:true});
        } catch(_){}
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else { start(); }
  } catch(e) { /* no-op */ }
})();
