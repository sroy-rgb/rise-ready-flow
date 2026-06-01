/* CEDP page-content loader.
 * - Pulls a single JSON blob from public.page_content (keyed by `page`)
 * - Replaces text/attrs on elements tagged with data-cms="path.to.field"
 * - Wires the EN/ES language toggle (persisted in localStorage)
 *
 * Tag elements like:
 *   <h1 data-cms="hero.title">fallback</h1>
 *   <a data-cms="hero.after_hours_label" data-cms-href="hero.after_hours_href">..</a>
 *   <span data-cms-card="0.title" data-cms-card-mobile="0.title_mobile">..</span>
 *
 * data-cms supports two forms:
 *   "section.field"      -> reads {en,es} object and picks current lang
 *   "section.field|raw"  -> reads plain string (no language pick)
 */
(function(){
  var SUPA_URL = "https://dynyrkucykktpqptywlx.supabase.co";
  var SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5bnlya3VjeWtrdHBxcHR5d2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNTQ4NTgsImV4cCI6MjA5NTczMDg1OH0.MTjen-l4L4QtMxdJ82-Wz-ng7-brzIZQ6weLwhuUOrA";
  var PAGE = (document.body && document.body.getAttribute('data-cms-page')) || 'get-help';
  var IS_MOBILE = document.body && document.body.hasAttribute('data-cms-mobile');

  function getLang(){
    try { return localStorage.getItem('cedp_lang') === 'es' ? 'es' : 'en'; } catch(e){ return 'en'; }
  }
  function setLang(l){
    try { localStorage.setItem('cedp_lang', l); } catch(e){}
    apply(window.__cedpContent);
    updateToggleUI();
  }

  function get(obj, path){
    if(!obj || !path) return undefined;
    var parts = path.split('.');
    var v = obj;
    for(var i=0;i<parts.length;i++){
      if(v == null) return undefined;
      v = v[parts[i]];
    }
    return v;
  }

  function pick(val, lang){
    if(val == null) return '';
    if(typeof val === 'string') return val;
    if(typeof val === 'object'){
      if(lang in val) return val[lang] || val.en || '';
      return val.en || '';
    }
    return String(val);
  }

  function resolveKey(key){
    // mobile-aware fallback: try "section.x_mobile" then "section.x"
    if(!IS_MOBILE) return key;
    var parts = key.split('.');
    var last = parts[parts.length-1];
    if(last.indexOf('_mobile') >= 0) return key;
    var mobileKey = parts.slice(0,-1).concat(last+'_mobile').join('.');
    return mobileKey;
  }

  function readContent(content, key, lang){
    // Try mobile-specific then fallback to base
    if(IS_MOBILE){
      var mob = get(content, resolveKey(key));
      if(mob !== undefined && mob !== null && mob !== ''){
        if(typeof mob === 'object'){
          var v = pick(mob, lang);
          if(v) return v;
        } else if(typeof mob === 'string'){
          return mob;
        }
      }
    }
    var raw = get(content, key);
    if(raw === undefined) return undefined;
    return typeof raw === 'object' ? pick(raw, lang) : raw;
  }

  function apply(content){
    if(!content) return;
    var lang = getLang();
    document.documentElement.setAttribute('lang', lang);

    // text content
    document.querySelectorAll('[data-cms]').forEach(function(el){
      var key = el.getAttribute('data-cms');
      var val = readContent(content, key, lang);
      if(val !== undefined && val !== null) el.textContent = val;
    });

    // raw HTML
    document.querySelectorAll('[data-cms-html]').forEach(function(el){
      var key = el.getAttribute('data-cms-html');
      var val = readContent(content, key, lang);
      if(val !== undefined && val !== null) el.innerHTML = val;
    });

    // href attribute
    document.querySelectorAll('[data-cms-href]').forEach(function(el){
      var key = el.getAttribute('data-cms-href');
      var val = get(content, key);
      if(typeof val === 'string' && val) el.setAttribute('href', val);
    });

    // tel: links built from contact.phone_tel
    var phoneTel = get(content, 'contact.phone_tel');
    var phoneDisplay = get(content, 'contact.phone_display');
    if(phoneTel){
      document.querySelectorAll('[data-cms-phone]').forEach(function(el){
        el.setAttribute('href', 'tel:' + phoneTel);
      });
    }
    if(phoneDisplay){
      document.querySelectorAll('[data-cms-phone-text]').forEach(function(el){
        el.textContent = phoneDisplay;
      });
    }

    // Hide elements whose CTA label is empty (avoid empty buttons)
    document.querySelectorAll('[data-cms-hide-if-empty]').forEach(function(el){
      var label = (el.textContent || '').trim();
      el.style.display = label ? '' : 'none';
    });
  }

  function updateToggleUI(){
    var lang = getLang();
    document.querySelectorAll('[data-lang-btn]').forEach(function(btn){
      var t = btn.getAttribute('data-lang-btn');
      btn.classList.toggle('act', t === lang);
      btn.setAttribute('aria-pressed', t === lang ? 'true' : 'false');
    });
    // single-button mobile toggle text
    document.querySelectorAll('[data-lang-toggle]').forEach(function(btn){
      btn.textContent = lang === 'en' ? 'ES' : 'EN';
    });
  }

  function wireToggle(){
    document.querySelectorAll('[data-lang-btn]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var t = btn.getAttribute('data-lang-btn');
        if(t === 'en' || t === 'es') setLang(t);
      });
    });
    document.querySelectorAll('[data-lang-toggle]').forEach(function(btn){
      btn.addEventListener('click', function(){
        setLang(getLang() === 'en' ? 'es' : 'en');
      });
    });
  }

  function fetchContent(){
    var url = SUPA_URL + '/rest/v1/page_content?select=content&page=eq.' + encodeURIComponent(PAGE);
    return fetch(url, { headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY } })
      .then(function(r){ return r.json(); })
      .then(function(rows){ return (rows && rows[0] && rows[0].content) || null; });
  }

  function init(){
    wireToggle();
    updateToggleUI();
    fetchContent().then(function(c){
      if(!c) return;
      window.__cedpContent = c;
      apply(c);
    }).catch(function(e){ /* offline / blocked - keep static fallback */ });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();