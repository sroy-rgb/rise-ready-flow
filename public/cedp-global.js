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
