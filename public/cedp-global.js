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
    var TB = '<div class="tb"><div style="display:flex;align-items:center;gap:14px"><span>&#9742; Need help now?</span> <a href="tel:3038381200">(303) 838-1200</a></div><div style="font-size:11px;color:rgba(255,255,255,.5)">English | Espa&ntilde;ol</div></div>';
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
      '<a class="btn-d" href="/#donateSection">Donate</a><a class="btn-h '+act('/get-help').trim()+'" href="/get-help">Get help</a>'+
      '</div></nav>';

    // Only inject if not the home page (home already has its own canonical nav)
    var isHome = path === '/' || /cedp-home\.html$/.test(location.pathname);
    if (!isHome) {
      var existingNav = document.querySelector('body > nav, body > header > nav');
      if (!existingNav) existingNav = document.querySelector('nav');
      var existingTb  = document.querySelector('body > .tb');
      if (existingNav) {
        if (existingTb) existingTb.outerHTML = TB + NAV;
        else existingNav.outerHTML = TB + NAV;
        if (existingTb && existingNav.parentNode) existingNav.remove();
      }
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
